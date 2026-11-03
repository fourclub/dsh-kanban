/**
 * Task detail panel rendered in the right Sidebar.
 *
 * One panel instance is shared by every board: the board writes the selected
 * task (or a blank draft) into the task-panel store and opens the sidebar tab.
 * Editing a draft keeps it out of the agent's workflow until the human presses
 * "Можно делать"; the host then moves it to To Do and the agent driver picks it up.
 */
import { useCallback, useEffect, useMemo, useState } from "react"
import { callFlow } from "@/lib/api"
import { relTime } from "@/lib/activity"
import { COLUMN_IDS, COLUMN_TITLES, PRIORITIES, PRIORITY_LABELS, type Board, type ColumnId, type Item, type Priority } from "@/lib/types"
import { closeTaskPanel, requestTaskPanel, useTaskPanel } from "@/lib/task-panel"

interface SessionsService {
  open(sessionId: string): void
}

interface TaskPanelProps {
  sessions?: SessionsService
}

function StatChip({ icon, value, title }: { icon: string; value: number; title: string }) {
  if (!value) return null
  return (
    <span className="kf-stat-chip" title={title}>
      <span aria-hidden="true">{icon}</span> {value}
    </span>
  )
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="kf-field">
      <span className="kf-field-label">{label}</span>
      {children}
    </label>
  )
}

export function TaskPanel({ sessions }: TaskPanelProps) {
  const request = useTaskPanel()
  const [board, setBoard] = useState<Board | null>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("normal")
  const [labels, setLabels] = useState("")
  const [moveTo, setMoveTo] = useState<ColumnId>("todo")

  const item: Item | undefined = useMemo(() => {
    if (!board || !request.itemId) return undefined
    return board.items.find((candidate) => candidate.id === request.itemId)
  }, [board, request.itemId])

  const load = useCallback(async () => {
    if (!request.workspaceId) return
    const response = await callFlow("get", {}, request.workspaceId)
    if (response && response.board) {
      setBoard(response.board)
      setError("")
    } else if (response && response.error) {
      setError(response.error)
    }
  }, [request.workspaceId])

  useEffect(() => {
    if (!request.workspaceId) return
    let disposed = false
    void load()
    const timer = window.setInterval(() => {
      if (!disposed) void load()
    }, 3000)
    return () => {
      disposed = true
      window.clearInterval(timer)
    }
  }, [request.workspaceId, request.requestId, load])

  // Reset the form when the panel points at another task.
  useEffect(() => {
    if (request.mode === "new") {
      setName("")
      setDescription("")
      setPriority("normal")
      setLabels("")
      return
    }
    if (item) {
      setName(item.name)
      setDescription(item.description || "")
      setPriority(item.priority || "normal")
      setLabels((item.labels || []).join(", "))
    }
  }, [request.requestId, request.mode, item?.id])

  const save = useCallback(async () => {
    if (!name.trim() || busy) return
    setBusy(true)
    try {
      if (request.mode === "new") {
        const response = await callFlow(
          "createItem",
          {
            name: name.trim(),
            description,
            columnId: request.columnId || "backlog",
            draft: true,
            priority,
            labels: labels.split(",").map((value) => value.trim()).filter(Boolean),
          },
          request.workspaceId,
        )
        if (response && response.ok === false) {
          setError(response.error || "Не удалось создать задачу")
        } else if (response && response.item) {
          requestTaskPanel({
            mode: "edit",
            workspaceId: request.workspaceId,
            workspaceTitle: request.workspaceTitle,
            itemId: response.item.id,
          })
        }
      } else if (item) {
        const response = await callFlow(
          "updateItem",
          {
            id: item.id,
            name: name.trim(),
            description,
            priority,
            labels: labels.split(",").map((value) => value.trim()).filter(Boolean),
          },
          request.workspaceId,
        )
        if (response && response.ok === false) setError(response.error || "Не удалось сохранить")
      }
      await load()
    } finally {
      setBusy(false)
    }
  }, [busy, description, item, labels, load, name, priority, request, setError])

  const ready = useCallback(async () => {
    if (!item || busy) return
    setBusy(true)
    try {
      const response = await callFlow("setDraft", { id: item.id, draft: false }, request.workspaceId)
      if (response && response.ok === false) setError(response.error || "Не удалось передать в работу")
      await load()
    } finally {
      setBusy(false)
    }
  }, [busy, item, load, request.workspaceId])

  const move = useCallback(async () => {
    if (!item || busy || moveTo === item.columnId) return
    setBusy(true)
    try {
      const response = await callFlow("moveItem", { id: item.id, toColumn: moveTo }, request.workspaceId)
      if (response && response.ok === false) setError(response.error || "Не удалось переместить")
      await load()
    } finally {
      setBusy(false)
    }
  }, [busy, item, load, moveTo, request.workspaceId])

  const remove = useCallback(async () => {
    if (!item || busy) return
    if (!window.confirm("Удалить задачу " + item.id + "? Сессия задачи будет архивирована.")) return
    setBusy(true)
    try {
      const response = await callFlow("deleteItem", { id: item.id }, request.workspaceId)
      if (response && response.ok === false) setError(response.error || "Не удалось удалить")
      closeTaskPanel()
    } finally {
      setBusy(false)
    }
  }, [busy, item, request.workspaceId])

  const activities = useMemo(() => {
    if (!board || !item) return []
    return board.activities.filter((activity) => activity.itemId === item.id).slice(-8).reverse()
  }, [board, item])

  if (!request.workspaceId) {
    return <div className="kf-panel-empty">Выберите задачу на доске «Канбан».</div>
  }

  return (
    <div className="kf-task-panel">
      <div className="kf-task-panel-head">
        <div className="kf-task-panel-title">
          <span className="kf-task-panel-code">{item ? item.id : "Новая задача"}</span>
          {item && <span className={item.draft ? "kf-pill kf-pill-draft" : "kf-pill kf-pill-ready"}>{item.draft ? "Черновик" : "Можно делать"}</span>}
        </div>
        {item && (
          <div className="kf-task-panel-stats">
            <StatChip icon="🤖" value={item.stats?.agents || 0} title="Агенты, участвующие в задаче" />
            <StatChip icon="👥" value={item.stats?.subagents || 0} title="Субагенты" />
            <StatChip icon="⚙" value={item.stats?.jobs || 0} title="Фоновые job" />
          </div>
        )}
      </div>

      {error && <div className="kf-panel-error">{error}</div>}

      {request.mode === "new" && (
        <div className="kf-panel-hint">Задача сохранится как черновик. Отредактируйте её и нажмите «Можно делать», когда будете готовы отдать агенту.</div>
      )}

      <Field label="Заголовок">
        <input className="kf-input" value={name} placeholder="Коротко: что нужно сделать" onChange={(event) => setName(event.target.value)} />
      </Field>

      <Field label="Описание">
        <textarea className="kf-textarea" rows={5} value={description} placeholder="Детали, критерии приёмки, ссылки" onChange={(event) => setDescription(event.target.value)} />
      </Field>

      <div className="kf-field-row">
        <Field label="Приоритет">
          <select className="kf-input" value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
            {PRIORITIES.map((value) => (
              <option key={value} value={value}>{PRIORITY_LABELS[value]}</option>
            ))}
          </select>
        </Field>
        <Field label="Метки">
          <input className="kf-input" value={labels} placeholder="ui, backend" onChange={(event) => setLabels(event.target.value)} />
        </Field>
      </div>

      {item && (
        <>
          <div className="kf-task-panel-meta">
            <span>Колонка: <b>{COLUMN_TITLES[item.columnId as ColumnId]}</b></span>
            <span>
              Исполнитель: <b>{item.assignee || "не назначен"}</b>
              {item.assignedAt ? " · назначен " + relTime(item.assignedAt) : ""}
            </span>
            {item.startedAt && <span>В работе: <b>{fmtElapsed(item.startedAt)}</b></span>}
            <span>Шагов: <b>{activities.length}</b></span>
            {item.createdBy === "agent" ? <span>Создал агент</span> : <span>Создали вы</span>}
            {item.updatedAt && <span>Изменено {relTime(item.updatedAt)}</span>}
          </div>
          {item.statusNote && (
            <div className="kf-task-note">
              <div className="kf-task-note-title">Статус агента · {relTime(item.statusAt)}</div>
              <div>{item.statusNote}</div>
            </div>
          )}
        </>
      )}

      <div className="kf-task-actions">
        <button type="button" className="kf-btn kf-primary" disabled={busy || !name.trim()} onClick={() => void save()}>
          {request.mode === "new" ? "Создать черновик" : "Сохранить"}
        </button>
        {item && item.draft && (
          <button type="button" className="kf-btn kf-success" disabled={busy} onClick={() => void ready()}>
            Можно делать
          </button>
        )}
        {item && !item.draft && item.columnId !== "todo" && (
          <button
            type="button"
            className="kf-btn kf-ghost"
            disabled={busy}
            onClick={() => {
              void callFlow("setDraft", { id: item.id, draft: true }, request.workspaceId).then(() => load())
            }}
          >
            В черновик
          </button>
        )}
        {item && item.sessionId && sessions && (
          <button type="button" className="kf-btn kf-ghost" onClick={() => sessions.open(item.sessionId as string)}>
            Открыть сессию
          </button>
        )}
      </div>

      {item && (
        <div className="kf-task-move">
          <select className="kf-input" value={moveTo} onChange={(event) => setMoveTo(event.target.value as ColumnId)}>
            {COLUMN_IDS.map((column) => (
              <option key={column} value={column}>{COLUMN_TITLES[column]}</option>
            ))}
          </select>
          <button type="button" className="kf-btn kf-ghost" disabled={busy || moveTo === item.columnId} onClick={() => void move()}>
            Переместить
          </button>
          <button type="button" className="kf-btn kf-danger" disabled={busy} onClick={() => void remove()}>
            Удалить
          </button>
        </div>
      )}

      {item && activities.length > 0 && (
        <div className="kf-task-activity">
          <div className="kf-task-activity-title">История</div>
          {activities.map((activity) => (
            <div className="kf-task-activity-row" key={activity.id}>
              <span className="kf-task-activity-icon" aria-hidden="true">
                {activity.type === "item_assigned" ? "👤" : activity.type === "item_status" ? "💬" : activity.type === "item_moved" ? "➜" : activity.type === "item_created" ? "＋" : "•"}
              </span>
              <span className="kf-task-activity-time">{relTime(activity.ts)}</span>
              <span className="kf-task-activity-text">
                {activity.type === "item_moved"
                  ? `перемещено ${COLUMN_TITLES[activity.from as ColumnId] || activity.from} → ${COLUMN_TITLES[activity.to as ColumnId] || activity.to}`
                  : activity.type === "item_created"
                    ? "задача создана"
                    : activity.type === "item_draft"
                      ? activity.to === "ready" ? "передано в работу" : "возвращено в черновик"
                      : activity.type === "item_status"
                        ? "статус агента обновлён"
                        : activity.type === "item_assigned"
                          ? "назначен исполнитель: " + (activity.text || "снят")
                          : activity.type === "item_updated"
                          ? "задача отредактирована"
                          : activity.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
