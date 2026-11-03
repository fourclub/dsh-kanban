/**
 * dsh-kanban — DSH bundle host plugin (standard Cordis function plugin).
 *
 * Mounted via package.json `dsh.bundle.patch` -> cordis.patch.yml, which inserts
 * this plugin's layer row into the profile composition; the loader resolves this
 * file by package name dsh-kanban.
 *
 * Responsibilities:
 *  - One board per workspace, persisted to <workspace.path>/.dsh-kanban.json
 *  - Model tools registered via ctx.tools.register (kanban_*)
 *  - Browser data layer at /api/kanban via ctx.get('webServer')
 *  - Workflow state machine enforcement with actor tracking (human vs agent)
 *
 * Board schema lives in lib/core.js (schemaVersion 1).
 */
import {
  SCHEMA_VERSION,
  COLUMN_IDS,
  COLUMN_TITLES,
  parseBoardText,
  emptyBoard,
  cloneBoard,
  summarizeBoard,
  workflowRules,
  createItem,
  updateItem,
  deleteItem,
  moveItem,
  setCode,
  setConfirmRequired,
  setStatus,
  setDraft,
  deriveCode,
} from './lib/core.js'

export const name = 'dsh-kanban'
export const inject = ['tools']

const BOARD_FILE = '.dsh-kanban.json'

export function apply(ctx) {
  const getFs = () => ctx.get('fs')
  const getPolicy = () => ctx.get('sandboxPolicy')
  const getWorkspaceRegistry = () => ctx.get('workspaceRegistry')

  const boards = new Map() // workspaceKey -> board object
  const fileTargets = new Map() // workspaceKey -> FsTarget | null
  const meta = new Map() // workspaceKey -> { warnings: [] }

  const workspaceKey = (workspace) => String(workspace.id || workspace.path)
  const writePolicyFor = (workspace, session) => {
    const policy = getPolicy()
    const resolved =
      policy && typeof policy.resolve === 'function'
        ? policy.resolve(session ? { session } : {})
        : { mode: (policy && policy.defaultMode) || 'workspace-write' }
    return { ...resolved, workspaceRoot: workspace.path }
  }
  const resolveFile = async (workspace) => {
    const fs = getFs()
    if (!fs) return null
    try {
      return await fs.resolve(BOARD_FILE, { cwd: workspace.path })
    } catch (err) {
      console.log('dsh-kanban: failed to resolve board file for ' + workspaceKey(workspace) + ': ' + ((err && err.message) || err))
      return null
    }
  }
  const targetOf = async (workspace) => {
    const key = workspaceKey(workspace)
    if (!fileTargets.has(key)) fileTargets.set(key, await resolveFile(workspace))
    return fileTargets.get(key)
  }
  const persistedFlag = (workspace) => {
    const key = workspaceKey(workspace)
    return fileTargets.has(key) && fileTargets.get(key) !== null
  }

  const backupFile = async (workspace, suffix, session) => {
    const fs = getFs()
    const target = await targetOf(workspace)
    if (!fs || !target) return null
    try {
      const text = await fs.readText(target)
      const backupTarget = await fs.resolve(BOARD_FILE + '.' + suffix, { cwd: workspace.path })
      await fs.writeText(backupTarget, text, undefined, undefined, writePolicyFor(workspace, session))
      return backupTarget
    } catch (err) {
      console.log('dsh-kanban: backup failed (' + suffix + '): ' + ((err && err.message) || err))
      return null
    }
  }

  const warn = (workspace, message) => {
    const key = workspaceKey(workspace)
    if (!meta.has(key)) meta.set(key, { warnings: [] })
    meta.get(key).warnings.push(message)
    console.log('dsh-kanban: ' + message)
  }
  const takeWarnings = (workspace) => {
    const key = workspaceKey(workspace)
    const m = meta.get(key)
    if (!m) return []
    const w = m.warnings
    m.warnings = []
    return w
  }
  const timestamp = () => new Date().toISOString().replace(/[:.]/g, '-')

  const boardOf = async (workspace, session) => {
    const key = workspaceKey(workspace)
    let board = boards.get(key)
    if (board) return board
    board = emptyBoard(deriveCode(workspace.title || key))
    boards.set(key, board)
    const fs = getFs()
    const target = await targetOf(workspace)
    let migrated = false
    if (fs && target) {
      try {
        const text = await fs.readText(target)
        const parsed = parseBoardText(text)
        for (const w of parsed.warnings) warn(workspace, w)
        if (parsed.ok) {
          Object.assign(board, parsed.data)
          migrated = parsed.migrated
          if (parsed.migrated) await backupFile(workspace, 'bak-v' + parsed.fromVersion, session)
        } else {
          const suffix = parsed.kind === 'unsupported' ? 'unsupported-v' + parsed.version : 'corrupt-' + timestamp()
          await backupFile(workspace, suffix, session)
        }
      } catch (err) {
        console.log('dsh-kanban: read failed for ' + key + ': ' + ((err && err.message) || err))
      }
    }
    if (migrated && fs && target) await save(workspace, session)
    return board
  }

  const save = async (workspace, session) => {
    const fs = getFs()
    const target = await targetOf(workspace)
    const key = workspaceKey(workspace)
    const board = boards.get(key)
    if (!fs || !target || !board) return
    try {
      await fs.writeText(
        target,
        JSON.stringify({ schemaVersion: SCHEMA_VERSION, ...cloneBoard(board) }),
        undefined,
        undefined,
        writePolicyFor(workspace, session),
      )
    } catch (err) {
      console.log('dsh-kanban: save failed for ' + key + ': ' + ((err && err.message) || err))
    }
  }

  // ---- shared dispatch: tools (agent) and HTTP (human) ----
  const dispatch = async (workspace, method, args, source, session) => {
    const board = await boardOf(workspace, session)
    const a = args || {}
    const actor = source === 'agent' ? 'agent' : 'human'
    const ok = (extra) => ({
      ok: true,
      board: cloneBoard(board),
      persisted: persistedFlag(workspace),
      warnings: takeWarnings(workspace),
      ...extra,
    })
    const fail = (error) => ({ ok: false, error, board: cloneBoard(board), warnings: takeWarnings(workspace) })

    // Actor-based guards live HERE (the single choke point every caller goes
    // through — tool wrapper, HTTP route, future callers alike).
    if (actor === 'agent' && method === 'createItem' && a.columnId === 'todo') {
      return fail('Move rejected: agents never place items into To Do. Create in Backlog and let the human triage.')
    }

    const statsOf = async (sessionId) => {
      const stats = { agents: 0, subagents: 0, jobs: 0 }
      if (!sessionId) return stats
      const jobs = ctx.get('jobs')
      if (jobs && typeof jobs.list === 'function') {
        try {
          const list = jobs.list(sessionId) || []
          stats.jobs = list.filter((j) => j.status === 'running' || j.status === 'stopping').length
        } catch { /* jobs unavailable for this session */ }
      }
      const subagents = ctx.get('subagents')
      if (subagents && typeof subagents.listChildren === 'function') {
        try {
          const children = await subagents.listChildren(sessionId)
          stats.subagents = Array.isArray(children) ? children.filter((c) => c.kind === 'child').length : 0
        } catch { /* subagent catalog unavailable */ }
      }
      stats.agents = stats.subagents > 0 ? stats.subagents + 1 : 0
      return stats
    }
    const withStats = async (value) => {
      for (const it of value.items) it.stats = await statsOf(it.sessionId)
      return value
    }

    if (actor === 'agent' && ['updateItem', 'moveItem', 'deleteItem', 'setStatus'].includes(method)) {
      const target = board.items.find((i) => i.id === String(a.id || ''))
      if (target && target.draft === true && target.columnId === 'backlog') {
        return fail('This item is a draft and belongs to the human. Never edit, move or report status on drafts; only items marked ready (To Do) are actionable.')
      }
    }

    switch (method) {
      case 'get':

        return ok({ message: 'Board loaded', board: await withStats(cloneBoard(board)), summary: summarizeBoard(board) })
      case 'getMeta':
        return ok({
          message: 'Meta loaded',
          meta: { code: board.code, codeConfirmed: board.codeConfirmed === true, confirmRequired: !!(board.settings && board.settings.confirmRequired), derived: deriveCode(workspace.title || workspaceKey(workspace)) },
        })
      case 'getItem': {
        const item = board.items.find((i) => i.id === String(a.id || ''))
        if (!item) return fail('Item not found: ' + String(a.id || ''))
        const itemOut = { ...item, stats: await statsOf(item.sessionId) }
        return ok({ item: itemOut, message: 'Item ' + item.id })
      }
      case 'createItem': {
        const r = createItem(board, {
          name: a.name,
          description: a.description,
          columnId: a.columnId,
          actor,
          draft: a.draft === true,
          priority: a.priority,
          labels: a.labels,
        })
        if (r.error) return fail(r.error)
        await save(workspace, session)
        return ok({ item: r.item, message: r.message })
      }
      case 'updateItem': {
        const r = updateItem(board, {
          id: a.id,
          name: a.name,
          description: a.description,
          priority: a.priority,
          labels: a.labels,
          actor,
        })
        if (r.error) return fail(r.error)
        await save(workspace, session)
        return ok({ message: r.message })
      }
      case 'deleteItem': {
        const r = deleteItem(board, String(a.id || ''), actor)
        if (r.error) return fail(r.error)
        await save(workspace, session)
        return ok({ message: r.message })
      }
      case 'moveItem': {
        const r = moveItem(board, { id: a.id, toColumn: a.toColumn, actor })
        if (r.error) return fail(r.error)
        if (typeof a.sessionId === 'string' && a.sessionId) {
          const item = board.items.find((i) => i.id === a.id)
          if (item && !item.sessionId) item.sessionId = a.sessionId
        }
        await save(workspace, session)
        return ok({ message: r.message })
      }
      case 'setSession': {
        const item = board.items.find((i) => i.id === String(a.id || ''))
        if (!item) return fail('Item not found: ' + String(a.id || ''))
        item.sessionId = String(a.sessionId || '') || null
        await save(workspace, session)
        return ok({ message: 'Session linked to ' + item.id })
      }
      case 'setCode': {
        const r = setCode(board, String(a.code || ''), true)
        if (r.error) return fail(r.error)
        await save(workspace, session)
        return ok({ message: r.message })
      }
      case 'setDraft': {
        const r = setDraft(board, { id: String(a.id || ''), draft: a.draft === true })
        if (r.error) return fail(r.error)
        await save(workspace, session)
        return ok({ message: r.message })
      }
      case 'setStatus': {
        const r = setStatus(board, { id: String(a.id || ''), note: a.note, actor })
        if (r.error) return fail(r.error)
        await save(workspace, session)
        return ok({ message: r.message })
      }
      case 'setConfirmRequired': {
        const r = setConfirmRequired(board, a.value === true)
        await save(workspace, session)
        return ok({ message: r.message })
      }
      default:
        return fail('Unknown kanban-flow method: ' + method)
    }
  }

  // ---- tool execution context -> workspace ----
  const workspaceOfExec = async (exec) => {
    const agent = exec && exec.agent
    const session = agent && agent.session
    const cwd = session && session.header && session.header.cwd
    if (typeof cwd !== 'string' || !cwd) return null
    const registry = getWorkspaceRegistry()
    if (registry) {
      try {
        const workspace = await registry.resolveByPath(cwd)
        if (workspace) return workspace
      } catch (err) {
        console.log('dsh-kanban: workspace resolve failed: ' + ((err && err.message) || err))
      }
    }
    return { id: 'cwd:' + cwd, path: cwd, title: cwd }
  }
  const workspaceOfId = (id) => {
    const registry = getWorkspaceRegistry()
    return registry && typeof registry.get === 'function' ? registry.get(id) : undefined
  }

  const runTool = async (method, args, exec) => {
    const workspace = await workspaceOfExec(exec)
    if (!workspace) {
      return { ok: false, message: 'Cannot determine the current workspace from the tool execution context', warnings: [] }
    }
    const session = exec && exec.agent && exec.agent.session
    const r = await dispatch(workspace, method, args, 'agent', session)
    // NOTE: never include undefined-valued keys — DSH's tool-output snapshotter
    // rejects values that don't survive a JSON round-trip losslessly.
    const out = {
      ok: r.ok !== false,
      message: r.error || r.message || 'Done',
      warnings: Array.isArray(r.warnings) ? r.warnings : [],
    }
    if (r.summary) out.summary = r.summary
    if (r.item) out.item = r.item
    else if (r.ok !== false) out.board = summarizeBoard(r.board)
    return out
  }

  const output = (render) => ({
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean' },
        message: { type: 'string' },
        warnings: { type: 'array', items: { type: 'string' } },
        summary: { type: 'object' },
        item: { type: 'object' },
        board: { type: 'object' },
        rules: { type: 'string' },
      },
      required: ['ok', 'message'],
      additionalProperties: false,
    },
    render,
  })

  const renderSummary = (args, maybeValue) => {
    // The tool runtime calls render(args, value); older single-argument
    // renderers may still be invoked as render(value). Accept both.
    const value = maybeValue && typeof maybeValue === 'object' ? maybeValue : args
    const lines = []
    if (Array.isArray(value && value.warnings)) for (const w of value.warnings) lines.push('⚠ ' + w)
    lines.push(String((value && value.message) || ''))
    const it = value && value.item
    if (it) {
      lines.push('Задача: ' + it.id + ' — ' + it.name)
      if (it.priority && it.priority !== 'normal') lines.push('Приоритет: ' + it.priority)
      if (it.columnId) lines.push('Колонка: ' + it.columnId)
      if (it.description) lines.push('Описание: ' + it.description)
    }
    const b = value && (value.summary || value.board)
    if (b && Array.isArray(b.columns)) {
      for (const col of b.columns) {
        lines.push('')
        lines.push(col.title + ' (' + col.count + '):')
        if (!col.items.length) lines.push('  (empty)')
        for (const it of col.items) lines.push('  ' + it.id + ' — ' + it.name)
      }
    }
    return [{ type: 'text', text: lines.join('\n') }]
  }

  const tools = [
    {
      name: 'kanban_get',
      description: 'Read the kanban board of the current workspace: columns, items, ids, settings and the mandatory workflow rules. Call this before touching any item.',
      parameters: { type: 'object', properties: {}, additionalProperties: false },
      output: output(renderSummary),
      async execute(args, exec) {
        const workspace = await workspaceOfExec(exec)
        if (!workspace) return { ok: false, message: 'Cannot determine the current workspace from the tool execution context', warnings: [] }
        const session = exec && exec.agent && exec.agent.session
        const board = await boardOf(workspace, session)
        const r = await dispatch(workspace, 'get', args, 'agent', session)
        const rules = workflowRules(board)
        return {
          ok: true,
          message: r.message + ' (code ' + board.code + ')',
          summary: r.summary,
          rules,
          warnings: Array.isArray(r.warnings) ? r.warnings : [],
        }
      },
    },
    {
      name: 'kanban_get_item',
      description: 'Read one kanban item: name, description, column and its task-session link.',
      parameters: { type: 'object', properties: { id: { type: 'string', description: 'Item id, e.g. KANBAN-1' } }, required: ['id'], additionalProperties: false },
      output: output((args, value) => {
        const lines = []
        if (Array.isArray(value && value.warnings)) for (const w of value.warnings) lines.push('⚠ ' + w)
        lines.push(String((value && value.message) || ''))
        const it = value && value.item
        if (it) {
          lines.push('Column: ' + COLUMN_TITLES[it.columnId])
          lines.push('Name: ' + it.name)
          if (it.description) lines.push('Description: ' + it.description)
          if (it.statusNote) lines.push('Status: ' + it.statusNote + (it.statusAt ? ' (' + it.statusAt + ')' : ''))
        }
        return [{ type: 'text', text: lines.join('\n') }]
      }),
      async execute(args, exec) { return runTool('getItem', args, exec) },
    },
    {
      name: 'kanban_create_item',
      description: 'Create a kanban item on the current workspace board. Items are created in Backlog by default and wait for the human to move them to To Do.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Short, actionable item name' },
          description: { type: 'string', description: 'Background, acceptance criteria or breakdown (optional)' },
          columnId: { type: 'string', enum: COLUMN_IDS, description: 'Target column; defaults to backlog. Agents must not use todo.' },
        },
        required: ['name'],
        additionalProperties: false,
      },
      output: output(renderSummary),
      async execute(args, exec) {
        if (args && args.columnId === 'todo') {
          return { ok: false, message: 'Move rejected: agents never place items into To Do. Create in Backlog and let the human triage.', warnings: [] }
        }
        return runTool('createItem', args, exec)
      },
    },
    {
      name: 'kanban_update_item',
      description: "Update an item's name or description.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Item id' },
          name: { type: 'string', description: 'New name (optional)' },
          description: { type: 'string', description: 'New description (optional)' },
        },
        required: ['id'],
        additionalProperties: false,
      },
      output: output(renderSummary),
      async execute(args, exec) { return runTool('updateItem', args, exec) },
    },
    {
      name: 'kanban_delete_item',
      description: 'Delete an item from the board (permanent). Its task session is archived automatically. Only delete when the human asks.',
      parameters: { type: 'object', properties: { id: { type: 'string', description: 'Item id' } }, required: ['id'], additionalProperties: false },
      output: output(renderSummary),
      async execute(args, exec) { return runTool('deleteItem', args, exec) },
    },
    {
      name: 'kanban_move_item',
      description: 'Move an item between columns. Agent transitions are enforced: To Do -> In Progress (confirm pickup), In Progress -> Review, In Progress -> Done (only when completion confirmation is off), Review -> In Progress (after human feedback), Done -> In Progress (human replied on a finished item). Agents never move anything into To Do or Done-from-Review.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Item id' },
          toColumn: { type: 'string', enum: COLUMN_IDS, description: 'Target column id' },
        },
        required: ['id', 'toColumn'],
        additionalProperties: false,
      },
      output: output(renderSummary),
      async execute(args, exec) { return runTool('moveItem', args, exec) },
    },
    {
      name: 'kanban_next',
      description: 'Take the next ready task from the To Do column of the current workspace board. Moves it To Do -> In Progress, links it to this session and returns the item plus the workflow rules. Call this when you are asked to work on the board and there is ready work.',
      parameters: { type: 'object', properties: {}, additionalProperties: false },
      output: output((args, value) => {
        const lines = []
        if (Array.isArray(value && value.warnings)) for (const w of value.warnings) lines.push('⚠ ' + w)
        lines.push(String((value && value.message) || ''))
        if (value && value.item) {
          lines.push('Item: ' + value.item.id + ' — ' + value.item.name)
          if (value.item.description) lines.push('Description: ' + value.item.description)
        }
        if (value && value.rules) lines.push('', value.rules)
        return [{ type: 'text', text: lines.join('\n') }]
      }),
      async execute(args, exec) {
        const workspace = await workspaceOfExec(exec)
        if (!workspace) return { ok: false, message: 'Cannot determine the current workspace from the tool execution context', warnings: [] }
        const session = exec && exec.agent && exec.agent.session
        const board = await boardOf(workspace, session)
        const candidate = board.items.find((i) => i.columnId === 'todo' && i.draft !== true)
        if (!candidate) {
          return { ok: true, message: 'No ready tasks in To Do. Draft items in Backlog are waiting for the human.', warnings: [] }
        }
        const moved = moveItem(board, { id: candidate.id, toColumn: 'in_progress', actor: 'agent' })
        if (moved.error) return { ok: false, message: moved.error, warnings: [] }
        const item = board.items.find((i) => i.id === candidate.id)
        if (item && session && !item.sessionId) item.sessionId = session.id
        await save(workspace, session)
        return {
          ok: true,
          message: 'Picked up ' + candidate.id + ': ' + candidate.name,
          item: { ...item, stats: { agents: 0, subagents: 0, jobs: 0 } },
          rules: workflowRules(board),
          warnings: takeWarnings(workspace),
        }
      },
    },
    {
      name: 'kanban_set_status',
      description: "Set the item's short status note (shown to the human on the board card on hover). Call this at the end of every turn: max 2 sentences — what is done, what is next or what you need from the human.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Item id' },
          note: { type: 'string', description: 'Short status text (max ~400 chars); empty string clears it' },
        },
        required: ['id', 'note'],
        additionalProperties: false,
      },
      output: output(renderSummary),
      async execute(args, exec) { return runTool('setStatus', args, exec) },
    },
    {
      name: 'kanban_set_code',
      description: 'Change the board code (2-6 chars A-Z0-9) that prefixes item ids, e.g. API-3. Existing item ids are kept stable.',
      parameters: { type: 'object', properties: { code: { type: 'string', description: 'New board code' } }, required: ['code'], additionalProperties: false },
      output: output(renderSummary),
      async execute(args, exec) { return runTool('setCode', args, exec) },
    },
  ]

  for (const tool of tools) ctx.tools.register(tool)

  // Tell every agent that the workspace kanban exists and how the workflow works.
  const systemPrompt = ctx.get('systemPrompt')
  if (systemPrompt && typeof systemPrompt.section === 'function') {
    const registerSection = () =>
      systemPrompt.section({
        name: 'dsh-kanban',
        order: 55,
        text: [
          'The workspace has a Kanban board (plugin dsh-kanban).',
          'At the start of a turn where board work is relevant, call kanban_get to inspect it.',
          'Only items in "Можно делать" (To Do, draft=false) are actionable: use kanban_next to pick the next one, or kanban_move_item to confirm pickup (To Do -> In Progress).',
          'Never touch draft items in Backlog: the human edits drafts and marks them ready.',
          'Keep the item status current: In Progress -> Review when the human must decide, In Progress -> Done only when completion is allowed by the board.',
          'At the end of every turn call kanban_set_status with a short note so the human sees progress on the card.',
        ].join('\n'),
      })
    if (typeof ctx.effect === 'function') ctx.effect(registerSection, 'dsh-kanban: system prompt')
    else registerSection()
  }

  // ---- browser data layer: /api/kanban ----
  const httpHandler = async (req, res) => {
    try {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const raw = Buffer.concat(chunks).toString('utf8')
      const body = raw ? JSON.parse(raw) : {}
      const method = typeof body.method === 'string' ? body.method : 'get'
      const args = body.args || {}
      const workspaceId = typeof args.workspaceId === 'string' ? args.workspaceId : ''
      const workspace = workspaceId ? workspaceOfId(workspaceId) : undefined
      if (!workspace) {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ ok: false, error: 'Unknown workspace: ' + (workspaceId || '(missing)') }))
        return
      }
      const result = await dispatch(workspace, method, args, 'human')
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch (err) {
      res.writeHead(500, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: String((err && err.message) || err) }))
    }
  }

  const routeState = { registered: false, timer: null, attempts: 0 }
  const registerRoute = () => {
    if (routeState.registered) return
    const webServer = ctx.get('webServer')
    if (webServer === undefined) return
    try {
      webServer.register({ kind: 'prefix', path: '/api/kanban', handler: httpHandler })
      routeState.registered = true
      console.log('dsh-kanban: /api/kanban route registered')
    } catch (err) {
      console.log('dsh-kanban: route registration failed: ' + ((err && err.message) || err))
    }
  }
  registerRoute()
  if (!routeState.registered) {
    routeState.timer = setInterval(() => {
      routeState.attempts += 1
      registerRoute()
      if (routeState.registered || routeState.attempts >= 30) clearInterval(routeState.timer)
    }, 2000)
  }
}
