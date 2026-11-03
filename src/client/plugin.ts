/**
 * dsh-kanban client plugin.
 *
 *  - conversation.view       "Канбан" tab: the workspace board inside a chat
 *  - sidebar.right.pane.tab  task details in the application's right Sidebar
 *  - settings.plugins.tab    board preferences
 *  - sidebar.footer.action   board opener, sidebar workspace icons, agent driver
 */
import { createElement as h, useEffect, useSyncExternalStore } from "react"
import { KanbanBoard } from "./KanbanBoard"
import { SettingsTab } from "./SettingsPanel"
import { TaskPanel } from "./TaskPanel"
import { ArchiveSync, BoardDismiss, BoardOpener, BoardTabToggle, ClickMode, SidebarIcons, getBoardOverride, setBoardOverride, subscribeBoardOverride } from "./Controllers"
import { initAgentDriver } from "./lib/AgentDriver"
import { resolveBoardWorkspace } from "./lib/resolve"
import { requestTaskPanel } from "./lib/task-panel"

interface WorkspaceSnapshot {
  items: Array<{ workspaceId: string; title: string; sessionIds: string[] }>
  recentWorkspaceId?: string
}

interface WorkspacesService {
  list: { getSnapshot(): any; subscribe(fn: () => void): () => void }
  startSession(workspaceId?: string): void
  archiveSession?(sessionId: string): Promise<void>
}
interface SessionsServiceFull {
  list: { getSnapshot(): any; subscribe(fn: () => void): () => void }
  open(sessionId: string): void
  create(opts?: { workspaceId?: string }): Promise<string>
  binding(id: string): { session: { rename(title: string): Promise<any>; prompt(content: Array<{ type: string; text: string }>, mode?: string): Promise<any> } } | undefined
}

interface OpenTaskRequest {
  mode: "new" | "edit"
  workspaceId: string
  workspaceTitle?: string
  itemId?: string
  columnId?: any
}

function useWorkspaceSnapshot(workspaces: WorkspacesService | undefined): WorkspaceSnapshot {
  const fallback: WorkspaceSnapshot = { items: [] }
  if (!workspaces || !workspaces.list || typeof workspaces.list.getSnapshot !== "function") return fallback
  return useSyncExternalStore(
    (fn) => workspaces.list.subscribe(fn),
    () => workspaces.list.getSnapshot() as WorkspaceSnapshot,
  )
}

/**
 * The current session id from the sessions list (a primitive snapshot, so
 * useSyncExternalStore is safe). The conversation.view slot passes no session
 * identity in its props — this subscription is the reliable source.
 */
function useCurrentSession(sessions: SessionsServiceFull | undefined): string | undefined {
  if (!sessions || !sessions.list || typeof sessions.list.getSnapshot !== "function") return undefined
  return useSyncExternalStore(
    (fn) => sessions.list.subscribe(fn),
    () => (sessions.list.getSnapshot() as { current?: string }).current,
  )
}

/** Board tab inside a conversation (session-scoped props carry sessionId). */
function BoardTabView(props: { sessionId?: string; workspaces?: WorkspacesService; sessions?: SessionsServiceFull; onOpenTask?: (request: OpenTaskRequest) => void }) {
  const snap = useWorkspaceSnapshot(props.workspaces)
  const override = useSyncExternalStore(subscribeBoardOverride, getBoardOverride)
  const currentSessionId = useCurrentSession(props.sessions) ?? props.sessionId
  const resolved = resolveBoardWorkspace({
    override,
    currentSessionId,
    workspaceItems: Array.isArray(snap.items) ? snap.items : [],
    recentWorkspaceId: snap.recentWorkspaceId,
  })

  useEffect(() => {
    if (override && resolved.nativeWorkspaceId === override.workspaceId) setBoardOverride(null)
  }, [override, resolved.nativeWorkspaceId])

  const archiveSession = props.workspaces?.archiveSession
    ? (sessionId: string) => { void props.workspaces!.archiveSession!(sessionId) }
    : undefined
  return h(KanbanBoard, {
    workspaceId: resolved.workspaceId,
    workspaceTitle: resolved.pinned
      ? resolved.workspaceTitle || resolved.workspaceId
      : resolved.workspaceTitle,
    sessions: props.sessions,
    archiveSession,
    onOpenTask: props.onOpenTask,
  })
}

function SettingsTabView() {
  return h(SettingsTab)
}

function RootControllers(props: { workspaces?: WorkspacesService; sessions?: SessionsServiceFull }) {
  useEffect(() => {
    const sessions = props.sessions
    if (!sessions) return
    initAgentDriver({
      createSession: (workspaceId) => sessions.create({ workspaceId }),
      renameSession: async (sessionId, title) => {
        const binding = sessions.binding(sessionId)
        const r = await binding?.session.rename(title)
        if (r && r.ok === false) console.warn("dsh-kanban: rename failed", r.error)
      },
      promptSession: async (sessionId, text) => {
        const binding = sessions.binding(sessionId)
        if (!binding) throw new Error("session binding unavailable: " + sessionId)
        const r = await binding.session.prompt([{ type: "text", text }], "queue")
        if (r && r.ok === false) throw new Error("prompt failed: " + (r.error && r.error.message))
      },
      archiveSession: async (sessionId) => {
        const archive = props.workspaces?.archiveSession
        if (!archive) throw new Error("workspaces.archiveSession unavailable")
        await archive(sessionId)
      },
    })
  }, [props.sessions, props.workspaces])
  return h("div", { style: { display: "contents" } },
    h(BoardOpener, { workspaces: props.workspaces, sessions: props.sessions }),
    h(BoardDismiss, { workspaces: props.workspaces, sessions: props.sessions }),
    h(BoardTabToggle),
    h(ArchiveSync, { workspaces: props.workspaces }),
    h(SidebarIcons, { workspaces: props.workspaces }),
    h(ClickMode, { workspaces: props.workspaces }),
  )
}

const TASK_TAB_ID = "dsh-kanban/task"
const TASK_TAB_KIND = "dsh-kanban-task"

export const KanbanPlugin = {
  name: "dsh-kanban",
  inject: ["slots", "workspaces", "sessions", "sidebarRightTabs"],
  apply(ctx: any) {
    const slots = ctx.get("slots")
    if (slots === undefined) return
    const workspaces: WorkspacesService | undefined = ctx.get("workspaces")
    const sessions: SessionsServiceFull | undefined = ctx.get("sessions")

    const openTask = (request: OpenTaskRequest) => {
      requestTaskPanel({
        mode: request.mode,
        workspaceId: request.workspaceId,
        workspaceTitle: request.workspaceTitle,
        itemId: request.itemId,
        columnId: request.columnId,
      })
      const sidebarRight = ctx.get("sidebarRight")
      if (sidebarRight && typeof sidebarRight.openTab === "function") {
        try {
          sidebarRight.openTab(TASK_TAB_KIND)
        } catch (error) {
          console.warn("dsh-kanban: cannot open task panel", error)
        }
      }
    }

    slots.inject("conversation.view", () =>
      slots.register(
        { name: "conversation.view", id: "kanban", order: 20, label: "Канбан" },
        (props: any) => h(BoardTabView, { ...props, workspaces, sessions, onOpenTask: openTask }),
      ),
    )

    const sidebarRightTabs = ctx.get("sidebarRightTabs")
    if (sidebarRightTabs && typeof sidebarRightTabs.register === "function") {
      const registerType = () =>
        sidebarRightTabs.register({
          id: TASK_TAB_ID,
          kind: TASK_TAB_KIND,
          title: () => "Задача",
          guide: [{ id: "task", order: 70, title: () => "Задача канбана", description: () => "Детали выбранной задачи" }],
        })
      if (typeof ctx.effect === "function") ctx.effect(registerType, "dsh-kanban: sidebar tab")
      else registerType()
    }
    slots.inject("sidebar.right.pane.tab", () =>
      slots.register(
        { name: "sidebar.right.pane.tab", key: TASK_TAB_ID },
        () => h(TaskPanel, { sessions }),
      ),
    )

    slots.inject("settings.plugins.tab", () =>
      slots.register(
        { name: "settings.plugins.tab", id: "dsh-kanban", order: 10, label: "Канбан" },
        () => h(SettingsTabView),
      ),
    )

    slots.inject("sidebar.footer.action", () =>
      slots.register(
        { name: "sidebar.footer.action", id: "kanban-controllers", order: 90 },
        () => h(RootControllers, { workspaces, sessions }),
      ),
    )
  },
}
