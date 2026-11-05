/**
 * The kanban board UI: five fixed columns, dnd-kit drag & drop, item cards,
 * per-task session badges, board code dialog, settings popover and the
 * 3s poll that keeps agent changes flowing in while a board is visible.
 */
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  pointerWithin,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { callFlow } from "@/lib/api"
import { notifyBoard } from "@/lib/AgentDriver"
import { activityParts, relTime } from "@/lib/activity"
import { getConfirmArchive, subscribeArchiveConfirm } from "@/lib/store"
import { dismissBoardTab } from "./Controllers"
import { COLUMN_IDS, COLUMN_TITLES, PRIORITY_LABELS, type Board, type ColumnId, type Item } from "@/lib/types"
import { ArchiveDialog } from "./ArchiveDialog"
import { CardDialog, type CardFormValues } from "./CardDialog"
import { ItemDialog } from "./ItemDialog"
import { CodeDialog } from "./CodeDialog"
import { SettingsPopover } from "./SettingsPanel"

export interface SessionsService {
  open(sessionId: string): void
  list?: { getSnapshot?: () => { current?: string } | undefined }
}

export interface KanbanBoardProps {
  workspaceId: string
  workspaceTitle?: string
  sessions?: SessionsService
  archiveSession?: (sessionId: string) => void
  onOpenTask?: (request: { mode: "new" | "edit" | "view"; workspaceId: string; workspaceTitle?: string; itemId?: string; columnId?: ColumnId }) => void
}

const combinationCollision: CollisionDetection = (args) => {
  const pointer = pointerWithin(args)
  if (pointer.length > 0) return pointer
  const intersections = rectIntersection(args)
  if (intersections.length > 0) return intersections
  return closestCorners(args)
}

function Icon({ path, size = 15 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
const PENCIL = "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
const PLUS = "M5 12h14M12 5v14"
const GEAR = "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
const CHAT = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
const ARCHIVE = "M2 4h20v4H2zM3 8v12h18V8 M10 12h4"

interface ActivityParts {
  phrase: string
  time: string
}

interface CardProps {
  item: Item
  flash: boolean
  lastActivity?: ActivityParts
  stepCount: number
  onOpenSession: () => void
  onView: () => void
  onDetails: () => void
  onReady: () => void
  onArchive: () => void
}

function fmtElapsed(from: string | null | undefined): string {
  if (!from) return ""
  const ms = Date.now() - new Date(from).getTime()
  if (!Number.isFinite(ms) || ms < 0) return ""
  const minutes = Math.floor(ms / 60000)
  if (minutes < 1) return "<1 мин"
  if (minutes < 60) return minutes + " мин"
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours + " ч " + (minutes % 60) + " мин"
  return Math.floor(hours / 24) + " д " + (hours % 24) + " ч"
}

function KfCard({ item, flash, lastActivity, stepCount, onOpenSession, onView, onDetails, onReady, onArchive }: CardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: item.id })
  // Hover status tooltip: shows ONLY the agent's statusNote after a short
  // delay; suppressed while dragging. Rendered through a portal because
  // .kf-card clips overflow.
  const [showTip, setShowTip] = useState(false)
  const [tipPos, setTipPos] = useState<{ left: number; top: number; width: number } | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const tipTimer = useRef<number | null>(null)
  const tip = item.statusNote
    ? { title: "Status", body: item.statusNote, time: relTime(item.statusAt) }
    : null
  const tipOn = () => {
    if (isDragging || !tip) return
    if (tipTimer.current !== null) window.clearTimeout(tipTimer.current)
    tipTimer.current = window.setTimeout(() => {
      const el = cardRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setTipPos({ left: r.left, top: r.top, width: r.width })
      setShowTip(true)
    }, 300)
  }
  const tipOff = () => {
    if (tipTimer.current !== null) {
      window.clearTimeout(tipTimer.current)
      tipTimer.current = null
    }
    setShowTip(false)
  }
  useEffect(() => () => {
    if (tipTimer.current !== null) window.clearTimeout(tipTimer.current)
  }, [])
  useEffect(() => {
    if (isDragging) tipOff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging])
  return (
    <div
      ref={(node) => {
        cardRef.current = node
        setNodeRef(node)
      }}
      {...attributes}
      {...listeners}
      className={
        "kf-card" + (flash ? " kf-agent-flash" : "") +
        (item.sessionId ? " kf-has-session" : "") +
        (isDragging ? " kf-dragging" : "") +
        " kf-priority-" + (item.priority || "normal")
      }
      style={{ ["--kf-card-accent" as string]: "var(--kf-accent, var(--dsw-alias-label-secondary))" }}
      onMouseEnter={tipOn}
      onMouseLeave={tipOff}
      onFocus={tipOn}
      onBlur={tipOff}
      onClick={(e) => {
        if ((e.target as Element).closest(".kf-edit-fab, .kf-archive-fab, .kf-ready-btn, .kf-session-badge")) return
        onView()
      }}
    >
      <button type="button" className="kf-edit-fab" title="Детали" aria-label={"Детали " + item.id} onClick={(e) => { e.stopPropagation(); onDetails() }}>
        <Icon path={PENCIL} size={13} />
      </button>
      <button type="button" className="kf-archive-fab" title="Archive item" aria-label={"Archive " + item.id} onClick={(e) => { e.stopPropagation(); onArchive() }}>
        <Icon path={ARCHIVE} size={13} />
      </button>
      <div className="kf-card-id">
        {item.id}
        {item.sessionId && (
          <button type="button" className="kf-session-badge" title={"Открыть сессию задачи " + item.sessionId} onClick={(e) => { e.stopPropagation(); onOpenSession() }}>
            <Icon path={CHAT} size={11} />
          </button>
        )}
        {item.draft && <span className="kf-pill kf-pill-draft">Черновик</span>}
        {item.priority && item.priority !== "normal" && (
          <span className={"kf-prio kf-prio-" + item.priority}>{PRIORITY_LABELS[item.priority as keyof typeof PRIORITY_LABELS]}</span>
        )}
      </div>
      <div className="kf-card-name">{item.name}</div>
      <div className="kf-card-owner">
        <span className={"kf-owner-dot" + (item.assignee ? " kf-owner-set" : "")} />
        <span className="kf-owner-name" title={item.assignee ? "Исполнитель: " + item.assignee : "Исполнитель ещё не назначен"}>
          {item.assignee || (item.draft ? "Черновик — не назначен" : "Ожидает агента")}
        </span>
        {item.startedAt && <span className="kf-card-timer" title="В работе">⏱ {fmtElapsed(item.startedAt)}</span>}
        {stepCount > 0 && <span className="kf-card-steps" title="Шагов по задаче">{stepCount} шаг(ов)</span>}
      </div>
      {item.stats && (item.stats.agents > 0 || item.stats.subagents > 0 || item.stats.jobs > 0) && (
        <div className="kf-card-stats">
          {item.stats.agents > 0 && <span className="kf-stat-chip" title="Агенты, участвующие в задаче">🤖 {item.stats.agents}</span>}
          {item.stats.subagents > 0 && <span className="kf-stat-chip" title="Субагенты">👥 {item.stats.subagents}</span>}
          {item.stats.jobs > 0 && <span className="kf-stat-chip" title="Фоновые job">⚙ {item.stats.jobs}</span>}
        </div>
      )}
      {item.draft && (
        <button type="button" className="kf-ready-btn" onClick={(e) => { e.stopPropagation(); onReady() }}>Можно делать</button>
      )}
      {lastActivity && (
        <div className="kf-card-activity">
          <span className="kf-card-activity-phrase">{lastActivity.phrase}</span>
          <span className="kf-card-activity-time">{lastActivity.time}</span>
        </div>
      )}
      {showTip && tip && tipPos && createPortal(
        <div
          className="kf-card-tip"
          role="tooltip"
          style={{ left: tipPos.left, top: tipPos.top, width: tipPos.width, transform: "translateY(calc(-100% - 6px))" }}
        >
          <div className="kf-card-tip-title">{tip.title}{tip.time ? " · " + tip.time : ""}</div>
          <div className="kf-card-tip-body">{tip.body}</div>
          {item.sessionId && <div className="kf-card-tip-hint">Click to open the task session</div>}
        </div>,
        document.body,
      )}
    </div>
  )
}

interface NewItemProps {
  columnId: ColumnId
  onAdd: (name: string, description: string) => void
  onCancel: () => void
}

function NewItemForm({ columnId, onAdd, onCancel }: NewItemProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  return (
    <div className="kf-newitem">
      <input
        className="kf-input"
        autoFocus
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) onAdd(name, description)
          if (e.key === "Escape") onCancel()
        }}
      />
      <textarea
        className="kf-textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="kf-newitem-row">
        <button type="button" className="kf-btn kf-ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="kf-btn kf-primary" disabled={!name.trim()} onClick={() => onAdd(name, description)}>
          Add to {COLUMN_TITLES[columnId]}
        </button>
      </div>
    </div>
  )
}

interface ColumnProps {
  colId: ColumnId
  highlighted: boolean
  /** Only the backlog column hosts the inline creation form. */
  adding: boolean
  items: Item[]
  flashIds: Set<string>
  lastLines: Map<string, ActivityParts>
  stepCounts: Map<string, number>
  onAdd: (name: string, description: string) => void
  onCancelAdd: () => void
  onOpenSession: (item: Item) => void
  onView: (item: Item) => void
  onDetails: (item: Item) => void
  onReady: (item: Item) => void
  onArchive: (item: Item) => void
}

function KfColumn({ colId, highlighted, adding, items, flashIds, lastLines, stepCounts, onAdd, onCancelAdd, onOpenSession, onView, onDetails, onReady, onArchive }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: colId })
  return (
    <div className={"kf-column kf-" + colId + (highlighted ? " kf-over" : "")}>
      <div className="kf-column-head">
        <span className="kf-column-dot" />
        <span className="kf-column-title">{COLUMN_TITLES[colId]}</span>
      </div>
      <div className="kf-column-list" ref={setNodeRef}>
        {adding && <NewItemForm columnId={colId} onAdd={onAdd} onCancel={onCancelAdd} />}
        {items.length === 0 && !adding && <div className="kf-column-empty">No items</div>}
        {items.map((item) => (
          <KfCard
            key={item.id}
            item={item}
            flash={flashIds.has(item.id)}
            lastActivity={lastLines.get(item.id)}
            stepCount={stepCounts.get(item.id) || 0}
            onOpenSession={() => onOpenSession(item)}
            onView={() => onView(item)}
            onDetails={() => onDetails(item)}
            onReady={() => onReady(item)}
            onArchive={() => onArchive(item)}
          />
        ))}
      </div>
    </div>
  )
}

export function KanbanBoard(props: KanbanBoardProps) {
  const { workspaceId, workspaceTitle, sessions, archiveSession, onOpenTask } = props
  const [board, setBoard] = useState<Board | null>(null)
  const [error, setError] = useState("")
  const [warnings, setWarnings] = useState<string[]>([])
  const [dialog, setDialog] = useState<{ item: Item | null; columnId: ColumnId } | null>(null)
  const [viewItemId, setViewItemId] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  // The conversation view around the board is not a fixed-height flex box: the
  // whole app page scrolls, so `height: 100%` on the board resolves to auto and
  // the columns stretch instead of scrolling internally. Size the board to the
  // visible area between its own top edge and the composer, then let each
  // column scroll its own list.
  useEffect(() => {
    const syncHeight = () => {
      const element = rootRef.current
      if (!element) return
      const top = element.getBoundingClientRect().top
      const composer = document.querySelector<HTMLElement>('[class*="composer"]')
      const limit = composer
        ? Math.min(window.innerHeight, composer.getBoundingClientRect().top)
        : window.innerHeight - 92
      const available = Math.floor(limit - top - 10)
      element.style.height = Math.max(320, available) + "px"
    }

    syncHeight()
    const timer = window.setInterval(syncHeight, 1000)
    window.addEventListener("resize", syncHeight)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener("resize", syncHeight)
    }
  }, [])
  const [adding, setAdding] = useState<ColumnId | null>(null)
  const [codeDialog, setCodeDialog] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dragItem, setDragItem] = useState<Item | null>(null)
  const [archiveTarget, setArchiveTarget] = useState<Item | null>(null)
  const confirmArchive = useSyncExternalStore(subscribeArchiveConfirm, getConfirmArchive)
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null)
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set())
  const prevItemsRef = useRef<Map<string, string> | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const applyBoard = useCallback(
    (res: any) => {
      if (res && res.board) {
        const next: Board = { ...res.board, activities: Array.isArray(res.board.activities) ? res.board.activities : [] }
        // Detect agent-driven changes since the previous snapshot -> pulse flash.
        const prev = prevItemsRef.current
        if (prev) {
          const changed = new Set<string>()
          for (const it of next.items) {
            const p = prev.get(it.id)
            if (!p) continue
            if (p !== it.columnId + "|" + it.name + "|" + it.description) changed.add(it.id)
          }
          if (changed.size > 0) {
            setFlashIds(changed)
            window.setTimeout(() => setFlashIds(new Set()), 1500)
          }
        }
        prevItemsRef.current = new Map(next.items.map((i) => [i.id, i.columnId + "|" + i.name + "|" + i.description]))
        setBoard(next)
        setError("")
        notifyBoard(workspaceId, next)
      }
      if (res && typeof res.error === "string" && res.error) setError(res.error)
      if (Array.isArray(res && res.warnings) && res.warnings.length > 0) {
        setWarnings((w) => [...w, ...res.warnings])
      }
    },
    [workspaceId],
  )

  const act = useCallback(
    (method: string, args: Record<string, unknown> = {}) => callFlow(method, args, workspaceId).then(applyBoard),
    [workspaceId, applyBoard],
  )

  const viewItem = board && viewItemId ? board.items.find((i) => i.id === viewItemId) ?? null : null

  const closeView = useCallback(() => setViewItemId(null), [])

  const startEdit = useCallback(
    (item: Item) => {
      setViewItemId(null)
      if (onOpenTask) {
        onOpenTask({ mode: "edit", workspaceId, workspaceTitle, itemId: item.id })
      } else {
        setDialog({ item, columnId: item.columnId as ColumnId })
      }
    },
    [onOpenTask, workspaceId, workspaceTitle],
  )

  const commentItem = useCallback(
    async (id: string, text: string): Promise<string | null> => {
      const response = await callFlow("commentItem", { id, text }, workspaceId)
      if (response && response.ok === false) {
        const raw = String(response.error || "")
        if (raw.includes("Unknown kanban-flow method")) {
          return "Комментарии станут доступны после перезапуска Harness: обновилась хост-часть плагина."
        }
        return raw || "Не удалось добавить комментарий"
      }
      applyBoard(response)
      return null
    },
    [workspaceId, applyBoard],
  )
  // initial load + poll while mounted
  useEffect(() => {
    let disposed = false
    const load = () => callFlow("get", {}, workspaceId).then((r) => { if (!disposed) applyBoard(r) })
    load()
    const timer = window.setInterval(load, 3000)
    return () => {
      disposed = true
      window.clearInterval(timer)
    }
  }, [workspaceId, applyBoard])

  // first-open code dialog (board used but code never confirmed)
  useEffect(() => {
    if (board && !board.codeConfirmed && !codeDialog) setCodeDialog(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board && board.codeConfirmed])

  const openSession = useCallback(
    (item: Item) => {
      if (!item.sessionId || !sessions) return
      // Opening the CURRENT session is a no-op (no selection change fires, so
      // the dismiss-on-navigation controller never runs): treat it as "close
      // the board and return to the conversation" instead.
      const current = sessions.list?.getSnapshot?.()?.current
      if (current !== undefined && current === item.sessionId) {
        dismissBoardTab()
        return
      }
      sessions.open(item.sessionId)
    },
    [sessions],
  )

  const onDragStart = (e: DragStartEvent) => {
    const item = board?.items.find((i) => i.id === String(e.active.id))
    if (item) setDragItem(item)
  }

  const onDragOver = (e: { over: { id: string | number } | null }) => {
    const overId = e.over ? String(e.over.id) : null
    setOverColumn(COLUMN_IDS.includes(overId as ColumnId) ? (overId as ColumnId) : null)
  }

  const onDragEnd = (e: DragEndEvent) => {
    setDragItem(null)
    const { active, over } = e
    if (!over || !board) return
    const itemId = String(active.id)
    const overId = String(over.id)
    const overIsColumn = COLUMN_IDS.includes(overId as ColumnId)
    const targetColumn = overIsColumn
      ? (overId as ColumnId)
      : board.items.find((i) => i.id === overId)?.columnId
    if (!targetColumn) return
    const item = board.items.find((i) => i.id === itemId)
    if (!item || item.columnId === targetColumn) return
    void act("moveItem", { id: itemId, toColumn: targetColumn })
  }

  const saveCard = (values: CardFormValues) => {
    if (!dialog) return
    if (dialog.item) {
      void act("updateItem", { id: dialog.item.id, name: values.name, description: values.description })
    } else {
      void act("createItem", { name: values.name, description: values.description, columnId: dialog.columnId })
    }
    setDialog(null)
  }

  // Quick-archive from the card: same behavior as the delete button in the
  // card dialog (deleteItem + archive the task session). Guarded by the
  // global "Require confirmation to archive items" preference (default on):
  // when on, an in-app confirmation dialog replaces the old native alert.
  const archiveItem = (item: Item) => {
    if (confirmArchive) {
      setArchiveTarget(item)
      return
    }
    runArchive(item)
  }

  const runArchive = (item: Item) => {
    void act("deleteItem", { id: item.id })
    if (item.sessionId && archiveSession) archiveSession(item.sessionId)
  }

  // Latest activity per item: phrase line ("harness moved to Done") with the
  // relative time ("3 seconds ago") on its own line underneath for visibility.
  const lastLines = useMemo(() => {
    const m = new Map<string, ActivityParts>()
    for (const a of board?.activities ?? []) {
      if (!a.itemId) continue
      m.set(a.itemId, activityParts(a))
    }
    return m
  }, [board])

  const stepCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const a of board?.activities ?? []) {
      if (!a.itemId) continue
      if (["item_status", "item_assigned", "item_moved", "item_updated", "item_draft"].includes(a.type)) {
        m.set(a.itemId, (m.get(a.itemId) || 0) + 1)
      }
    }
    return m
  }, [board])

  const header = board && (
    <div className="kf-header">
      <span className="kf-header-title">
        <span className="kf-code-chip">{board.code}</span>
        {workspaceTitle ? workspaceTitle : "Канбан"}
      </span>
      <span className="kf-count-chip">{board.items.length} задач</span>
      <button
        type="button"
        className="kf-btn kf-primary kf-new-item-btn"
        title="Новая задача в беклоге"
        aria-label="Создать новую задачу в беклоге"
        onClick={() => onOpenTask
          ? onOpenTask({ mode: "new", workspaceId, workspaceTitle, columnId: "backlog" })
          : setAdding("backlog")}
      >
        <Icon path={PLUS} size={15} />
        Новая задача
      </button>
      <span className="kf-spacer" />
      <button type="button" className="kf-iconbtn" title="Refresh" aria-label="Refresh board" onClick={() => act("get")}>
        <Icon path="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
      </button>
      <button type="button" className="kf-iconbtn" title="Board settings" aria-label="Board settings" onClick={() => setSettingsOpen((v) => !v)}>
        <Icon path={GEAR} />
      </button>
      {settingsOpen && (
        <SettingsPopover
          board={board}
          onCode={(code) => act("setCode", { code }).then(() => setCodeDialog(false))}
          onConfirmRequired={(v) => act("setConfirmRequired", { value: v })}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )

  const content = board && (
    <div className="kf-body">
      <div className="kf-columns">
        {COLUMN_IDS.map((colId) => {
          const items = (board.items ?? []).filter((i) => i.columnId === colId)
          return (
            <KfColumn
              key={colId}
              colId={colId}
              highlighted={overColumn === colId && dragItem !== null}
              adding={adding === colId && colId === "backlog"}
              items={items}
              flashIds={flashIds}
              lastLines={lastLines}
              stepCounts={stepCounts}
              onAdd={(name, description) => {
                void act("createItem", { name, description, columnId: "backlog" })
                setAdding(null)
              }}
              onCancelAdd={() => setAdding(null)}
              onOpenSession={openSession}
              onView={(item) => {
                if (onOpenTask) {
                  onOpenTask({ mode: "view", workspaceId, workspaceTitle, itemId: item.id })
                } else {
                  setViewItemId(item.id)
                }
              }}
              onDetails={(item) => setViewItemId(item.id)}
              onReady={(item) => { void act("setDraft", { id: item.id, draft: false }) }}
              onArchive={archiveItem}
            />
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="kf-root" ref={rootRef}>
      {warnings.length > 0 && (
        <div className="kf-warning">
          {warnings.map((w, i) => <div key={i}>{w}</div>)}
          <button type="button" className="kf-btn kf-ghost" onClick={() => setWarnings([])}>Dismiss</button>
        </div>
      )}
      {header}
      {error && <div className="kf-error kf-loading">{error}</div>}
      {board ? (
        <DndContext sensors={sensors} collisionDetection={combinationCollision} onDragStart={onDragStart} onDragOver={onDragOver as any} onDragEnd={onDragEnd}>
          {content}
          <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
            {dragItem ? (
              <div className="kf-card kf-drag-ghost" style={{ width: 240, ["--kf-card-accent" as string]: "var(--kf-accent, var(--dsw-alias-label-secondary))" }}>
                <div className="kf-card-id">{dragItem.id}</div>
                <div className="kf-card-name">{dragItem.name}</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        !error && <div className="kf-loading">Loading board…</div>
      )}
      {board && viewItem && (
        <ItemDialog
          item={viewItem}
          board={board}
          onClose={closeView}
          onEdit={() => startEdit(viewItem)}
          onComment={(text) => commentItem(viewItem.id, text)}
          onOpenSession={openSession}
          canOpenSession={Boolean(sessions)}
        />
      )}      {board && dialog && !onOpenTask && (
        <CardDialog
          item={dialog.item}
          board={board}
          onOpenChange={(open) => { if (!open) setDialog(null) }}
          onSave={saveCard}
          onDelete={(id) => {
            const target = board.items.find((i) => i.id === id)
            void act("deleteItem", { id })
            // Deleting an item archives its task session (driver also catches
            // it via the activity log; this covers the closed-board case).
            if (target && target.sessionId && archiveSession) archiveSession(target.sessionId)
            setDialog(null)
          }}
          onOpenSession={openSession}
        />
      )}
      {archiveTarget && (
        <ArchiveDialog
          item={archiveTarget}
          onConfirm={() => {
            runArchive(archiveTarget)
            setArchiveTarget(null)
          }}
          onCancel={() => setArchiveTarget(null)}
        />
      )}
      {board && codeDialog && (
        <CodeDialog
          code={board.code}
          itemCount={board.items.length}
          onConfirm={(code) => act("setCode", { code }).then(() => setCodeDialog(false))}
          onDismiss={() => setCodeDialog(false)}
        />
      )}
    </div>
  )
}
