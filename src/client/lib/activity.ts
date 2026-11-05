/** Compact activity presentation: "harness moved to Done (3 seconds ago)". */
import type { Activity } from "./types"
import { COLUMN_TITLES } from "./types"

const columnLabel = (id: string | null | undefined) =>
  (COLUMN_TITLES as Record<string, string>)[String(id)] || String(id || "")

/** Relative, human-friendly time ("just now" … "3 days ago"). */
export function relTime(ts: string | null | undefined): string {
  if (!ts) return ""
  const t = new Date(ts).getTime()
  if (!Number.isFinite(t)) return ""
  const s = Math.max(0, (Date.now() - t) / 1000)
  if (s < 5) return "just now"
  if (s < 60) return `${Math.floor(s)} seconds ago`
  if (s < 120) return "1 minute ago"
  if (s < 3600) return `${Math.floor(s / 60)} minutes ago`
  if (s < 7200) return "1 hour ago"
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`
  return `${Math.floor(s / 86400)} days ago`
}

/** One-line summary of an activity ("you moved to To Do"). */
export function activityPhrase(a: Activity): string {
  const who = a.source === "agent" ? "harness" : "you"
  switch (a.type) {
    case "item_moved":
      return `${who} moved to ${columnLabel(a.to)}`
    case "item_created":
      return `${who} created`
    case "item_updated":
      return `${who} edited`
    case "item_deleted":
      return `${who} deleted`
    default:
      return `${who} ${a.type.replace(/_/g, " ")}`
  }
}

/** Full compact line: "harness moved to Done (3 seconds ago)". */
export function activityLine(a: Activity): string {
  return `${activityPhrase(a)} (${relTime(a.ts)})`
}

/** Card presentation parts: phrase and relative time rendered on separate lines. */
export function activityParts(a: Activity): { phrase: string; time: string } {
  return { phrase: activityPhrase(a), time: relTime(a.ts) }
}

// ---------------------------------------------------------------- русский лог

/** Дата и время события в локальном формате: "05.11.2026, 10:41". */
export function absTime(ts: string | null | undefined): string {
  if (!ts) return ""
  const t = new Date(ts)
  if (!Number.isFinite(t.getTime())) return ""
  return t.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

/** Кто сделал: "вы" (человек) или "агент". */
export function actorLabel(a: Activity): string {
  return a.source === "agent" ? "агент" : "вы"
}

/** Текст события по-русски: "перемещена в «Готово»". */
export function activityPhraseRu(a: Activity): string {
  switch (a.type) {
    case "item_created":
      return "создана"
    case "item_updated":
      return "изменена"
    case "item_moved":
      return a.from && a.to
        ? `перемещена из «${columnLabel(a.from)}» в «${columnLabel(a.to)}»`
        : `перемещена в «${columnLabel(a.to)}»`
    case "item_assigned":
      return a.to ? `исполнитель: ${a.to}` : "исполнитель снят"
    case "item_draft":
      return a.to === "true" ? "переведена в черновики" : "готова к работе"
    case "item_status":
      return a.text ? `статус: ${a.text}` : "статус очищен"
    case "item_commented":
      return "комментарий"
    case "item_deleted":
      return "удалена"
    case "code_changed":
      return `код доски: ${a.from || ""} → ${a.to || ""}`
    case "confirm_required_changed":
      return a.to === "true" ? "включено подтверждение архивации" : "выключено подтверждение архивации"
    default:
      return String(a.type || "").replace(/_/g, " ")
  }
}
