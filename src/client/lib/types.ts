/** Shared client-side types mirroring the host board schema (lib/core.js, v3). */

export type Actor = "human" | "agent"

export interface Item {
  id: string
  columnId: string
  name: string
  description: string
  sessionId: string | null
  createdAt: string | null
  createdBy: Actor
  draft: boolean
  priority: "low" | "normal" | "high" | "urgent"
  labels: string[]
  updatedAt?: string | null
  /** Live task-session counters computed by the host (agents / subagents / background jobs). */
  stats?: { agents: number; subagents: number; jobs: number }
  /** Short agent status note shown on hover (null when never set). */
  statusNote?: string | null
  statusAt?: string | null
}

export interface Activity {
  id: string
  ts: string
  itemId: string | null
  type: string
  source: Actor
  from?: string | null
  to?: string | null
  text?: string | null
  sessionId?: string | null
}

export interface Board {
  schemaVersion: number
  code: string
  codeConfirmed: boolean
  seq: number
  settings: { confirmRequired: boolean }
  items: Item[]
  activities: Activity[]
}

export interface FlowResponse {
  ok?: boolean
  error?: string
  message?: string
  board?: Board
  item?: Item
  persisted?: boolean
  warnings?: string[]
}

export interface WorkspaceItem {
  workspaceId: string
  title: string
  path?: string
  sessionIds: string[]
}

export const COLUMN_IDS = ["backlog", "todo", "in_progress", "review", "done"] as const
export type ColumnId = (typeof COLUMN_IDS)[number]

export const COLUMN_TITLES: Record<ColumnId, string> = {
  backlog: "Беклог",
  todo: "Можно делать",
  in_progress: "В работе",
  review: "На проверке",
  done: "Готово",
}

export const PRIORITIES = ["low", "normal", "high", "urgent"] as const
export type Priority = (typeof PRIORITIES)[number]
export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Низкий",
  normal: "Обычный",
  high: "Высокий",
  urgent: "Срочно",
}
