/**
 * Read-only task view for the right sidebar task panel (mode "view").
 * Mirrors the board's ItemDialog: grouped meta, description and the
 * "Комментарии" / "Лог" tabs, with an "Редактировать" switch on top.
 */
import { useMemo, useState } from "react"
import { absTime, activityPhraseRu, actorLabel, relTime } from "@/lib/activity"
import { COLUMN_TITLES, PRIORITY_LABELS, type Activity, type Board, type Item } from "@/lib/types"

export interface TaskViewProps {
  item: Item
  board: Board
  busy: boolean
  onEdit: () => void
  onComment: (text: string) => Promise<void>
  onOpenSession?: (item: Item) => void
  canOpenSession?: boolean
}

type TabId = "comments" | "log"

const COLUMN_LABEL = (id: string) => (COLUMN_TITLES as Record<string, string>)[id] || id

export function TaskView({ item, board, busy, onEdit, onComment, onOpenSession, canOpenSession = false }: TaskViewProps) {
  const [tab, setTab] = useState<TabId>("comments")
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)

  const activities = useMemo(() => board.activities.filter((a) => a.itemId === item.id), [board.activities, item.id])
  const comments = useMemo(() => activities.filter((a) => a.type === "item_commented"), [activities])
  const log = useMemo(() => activities.slice().reverse(), [activities])

  const submit = async () => {
    const text = draft.trim()
    if (!text || sending) return
    setSending(true)
    try {
      await onComment(text)
      setDraft("")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="kf-task-view">
      <div className="kf-task-view-actions">
        <button type="button" className="kf-btn kf-primary" disabled={busy} onClick={onEdit}>
          Редактировать
        </button>
        {item.sessionId && canOpenSession && onOpenSession && (
          <button type="button" className="kf-btn kf-ghost" onClick={() => onOpenSession(item)}>
            Открыть сессию
          </button>
        )}
      </div>

      <div className="kf-item-meta">
        <MetaCell label="Колонка">
          <span className="kf-chip">{COLUMN_LABEL(item.columnId)}</span>
        </MetaCell>
        <MetaCell label="Приоритет">{PRIORITY_LABELS[item.priority] || item.priority}</MetaCell>
        <MetaCell label="Исполнитель">{item.assignee || "—"}</MetaCell>
        <MetaCell label="Создана">{absTime(item.createdAt) || "—"}</MetaCell>
        <MetaCell label="Обновлена">{absTime(item.updatedAt) || "—"}</MetaCell>
        <MetaCell label="Черновик">{item.draft ? "да" : "нет"}</MetaCell>
      </div>

      {item.statusNote && (
        <div className="kf-status-box">
          <div className="kf-fieldlabel">Статус{item.statusAt ? " · " + relTime(item.statusAt) : ""}</div>
          <div className="kf-pre">{item.statusNote}</div>
        </div>
      )}

      {item.labels.length > 0 && (
        <div>
          <div className="kf-fieldlabel">Метки</div>
          <div className="kf-chip-row">
            {item.labels.map((label) => (
              <span key={label} className="kf-chip">
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="kf-fieldlabel">Описание</div>
        {item.description.trim() ? <div className="kf-pre kf-item-description">{item.description}</div> : <div className="kf-muted">Без описания.</div>}
      </div>

      <div className="kf-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "comments"} className={"kf-tab" + (tab === "comments" ? " kf-tab-active" : "")} onClick={() => setTab("comments")}>
          Комментарии <span className="kf-tab-count">{comments.length}</span>
        </button>
        <button type="button" role="tab" aria-selected={tab === "log"} className={"kf-tab" + (tab === "log" ? " kf-tab-active" : "")} onClick={() => setTab("log")}>
          Лог <span className="kf-tab-count">{log.length}</span>
        </button>
      </div>

      {tab === "comments" ? (
        <div className="kf-tab-panel">
          <div className="kf-comment-list">
            {comments.length === 0 && <div className="kf-muted">Комментариев пока нет.</div>}
            {comments
              .slice()
              .reverse()
              .map((comment) => (
                <div key={comment.id} className="kf-comment">
                  <div className="kf-comment-head">
                    <span className="kf-comment-author">{actorLabel(comment)}</span>
                    <span className="kf-comment-time">{absTime(comment.ts)}</span>
                  </div>
                  <div className="kf-pre">{comment.text}</div>
                </div>
              ))}
          </div>
          <div className="kf-comment-form">
            <textarea
              className="kf-textarea"
              rows={3}
              placeholder="Написать комментарий… (Ctrl+Enter — отправить)"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                  event.preventDefault()
                  void submit()
                }
              }}
            />
            <div className="kf-comment-actions">
              <button type="button" className="kf-btn kf-primary" disabled={!draft.trim() || sending} onClick={() => void submit()}>
                {sending ? "Отправка…" : "Добавить комментарий"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="kf-tab-panel">
          <div className="kf-log">
            {log.length === 0 && <div className="kf-muted">Событий пока нет.</div>}
            {log.map((entry) => (
              <LogRow key={entry.id} activity={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MetaCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="kf-item-meta-cell">
      <div className="kf-fieldlabel">{label}</div>
      <div>{children}</div>
    </div>
  )
}

function LogRow({ activity }: { activity: Activity }) {
  const note = activity.text && activity.type !== "item_created" ? activity.text : ""
  return (
    <div className="kf-log-row">
      <span className={"kf-log-dot kf-log-" + (activity.source === "agent" ? "agent" : "human")} />
      <div className="kf-log-main">
        <div className="kf-log-line">
          <span className="kf-log-actor">{actorLabel(activity)}</span>
          <span className="kf-log-phrase">{activityPhraseRu(activity)}</span>
        </div>
        {note ? <div className="kf-log-note kf-pre">{note}</div> : null}
      </div>
      <span className="kf-log-time" title={absTime(activity.ts)}>
        {absTime(activity.ts)}
      </span>
    </div>
  )
}
