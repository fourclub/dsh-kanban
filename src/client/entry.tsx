import css from "./styles.css"
import { KanbanPlugin } from "./plugin"

// Build stamp: proves which bundle the browser actually executes.
try {
  // eslint-disable-next-line no-console
  console.info(`[dsh-kanban] client bundle loaded (build ${__KF_BUILD__})`)
} catch {
  /* console unavailable */
}

// Inject the plugin's namespaced CSS once per document.
const STYLE_TAG = "data-dsh-kanban-style"
if (typeof document !== "undefined" && !document.querySelector("style[" + STYLE_TAG + "]")) {
  const el = document.createElement("style")
  el.setAttribute(STYLE_TAG, "")
  el.textContent = css
  document.head.appendChild(el)
}

export default KanbanPlugin
