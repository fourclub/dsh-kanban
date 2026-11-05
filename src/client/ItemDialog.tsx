/**
 * Item view dialog (read-only): grouped task meta, description, tabs
 * "Комментарии" / "Лог". Editing lives in CardDialog / the right-sidebar task
 * panel — this dialog only shows the task and lets you comment.
 */
import { useEffect, useMemo, useRef, useState } from "react"
import { absTime, activityPhraseRu, actorLabel, relTime } from "@/lib/activity"
import { COLUMN_TITLES, PRIORITY_LABELS, type Activity, type Board, type Item } from "@/lib/types"

export interface ItemDialogProps {
  item: Item
  board: Board
  onClose: () => void
  onEdit: () => void
  onComment: (text: string) => Promise<void>
  onOpenSession: (item: Item) => void
  canOpenSession?: boolean
}

type TabId = "comments" | "log"

const COLUMN_LABEL = (id: string) => (COLUMN_TITLES as Record<string, string>)[id] || id

export function ItemDialog({ item, board, onClose, onEdit, onComment, onOpenSession, canOpenSession = false }: ItemDialogProps) {
  const [tab, setTab] = useState<TabId>("comments")
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    setTab("comments")
    setDraft("")
    closeRef.current?.focus()
  }, [item.id])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const activities = useMemo(
    () => board.activities.filter((a) => a.itemId === item.id),
    [board.activities, item.id],
  )
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
      textRef.current?.focus()
    }
  }

  return (
    <div
      className="kf-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="kf-dialog kf-item-view" role="dialog" aria-modal="true" aria-label={"Задача " + item.id}>
        <div className="kf-dialog-head">
          <span className="kf-code-chip">{item.id}</span>
          <span className="kf-dialog-title">{item.name}</span>
          <span className="kf-spacer" />
          <button type="button" className="kf-btn kf-primary" onClick={onEdit}>
            Редактировать
          </button>
          <button ref={closeRef} type="button" className="kf-iconbtn" title="Закрыть" aria-label="Закрыть окно задачи" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="kf-dialog-body kf-item-view-body">
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

          {item.sessionId && (
            <div className="kf-item-session">
              <span className="kf-muted">Задача привязана к сессии</span>
              {canOpenSession && (
                <button type="button" className="kf-btn kf-ghost" onClick={() => onOpenSession(item)}>
                  Открыть сессию
                </button>
              )}
            </div>
          )}

          {item.statusNote && (
            <div className="kf-status-box">
              <div className="kf-fieldlabel">
                Статус{item.statusAt ? " · " + relTime(item.statusAt) : ""}
              </div>
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
            {item.description.trim() ? (
              <div className="kf-pre kf-item-description">{item.description}</div>
            ) : (
              <div className="kf-muted">Без описания.</div>
            )}
          </div>

          <div className="kf-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "comments"}
              className={"kf-tab" + (tab === "comments" ? " kf-tab-active" : "")}
              onClick={() => setTab("comments")}
            >
              Комментарии <span className="kf-tab-count">{comments.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "log"}
              className={"kf-tab" + (tab === "log" ? " kf-tab-active" : "")}
              onClick={() => setTab("log")}
            >
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
                  ref={textRef}
                  className="kf-textarea"
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
      </div>
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
  const note = activity.type === "item_commented" && activity.text ? activity.text : activity.text && activity.type === "item_status" ? activity.text : ""
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
