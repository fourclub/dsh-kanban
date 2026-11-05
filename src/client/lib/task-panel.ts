/**
 * Shared client state for the task detail side panel.
 *
 * The board view opens the panel by writing the requested task (or a blank
 * draft) here and asking the right Sidebar to open the task tab. The tab body
 * reads the same store, so one panel instance serves every board and session.
 */

import { useSyncExternalStore } from "react"
import type { ColumnId } from "./types"

export interface TaskPanelRequest {
  /** Monotonic request id: reopening the same task still refreshes the panel. */
  requestId: number
  mode: "new" | "edit" | "view"
  workspaceId: string
  workspaceTitle?: string
  itemId?: string
  columnId?: ColumnId
  open: boolean
}

let state: TaskPanelRequest = {
  requestId: 0,
  mode: "new",
  workspaceId: "",
  open: false,
}

const listeners = new Set<() => void>()

function emit(): void {
  for (const listener of listeners) listener()
}

export function requestTaskPanel(request: Omit<TaskPanelRequest, "requestId" | "open">): void {
  state = { ...request, requestId: state.requestId + 1, open: true }
  emit()
}

export function closeTaskPanel(): void {
  if (!state.open) return
  state = { ...state, open: false }
  emit()
}

export function getTaskPanel(): TaskPanelRequest {
  return state
}

export function subscribeTaskPanel(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useTaskPanel(): TaskPanelRequest {
  return useSyncExternalStore(subscribeTaskPanel, getTaskPanel, getTaskPanel)
}
