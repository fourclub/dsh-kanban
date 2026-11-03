window.__ModuleLoader__.load({
  id: "dsh-kanban",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";var Lo=Object.create;var Et=Object.defineProperty;var Po=Object.getOwnPropertyDescriptor;var Bo=Object.getOwnPropertyNames;var Mo=Object.getPrototypeOf,zo=Object.prototype.hasOwnProperty;var Wo=(e,t)=>{for(var n in t)Et(e,n,{get:t[n],enumerable:!0})},Fn=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Bo(t))!zo.call(e,o)&&o!==n&&Et(e,o,{get:()=>t[o],enumerable:!(r=Po(t,o))||r.enumerable});return e};var _n=(e,t,n)=>(n=e!=null?Lo(Mo(e)):{},Fn(t||!e||!e.__esModule?Et(n,"default",{value:e,enumerable:!0}):n,e)),Fo=e=>Fn(Et({},"__esModule",{value:!0}),e);var Ps={};Wo(Ps,{default:()=>Ls});module.exports=Fo(Ps);var qn=`/* dsh-kanban-flow client styles \u2014 kf-* namespace.
       Built on DSH --dsw-alias-* tokens so light/dark follow the shell automatically;
       column accents use light-dark() for per-mode tuning. */
    
    .kf-sidebar-icon {
      cursor: pointer;
      width: 18px;
      height: 18px;
      margin-right: 2px;
      color: var(--dsw-alias-label-tertiary);
      background: 0 0;
      border: none;
      border-radius: 4px;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: color 0.15s var(--ds-ease-in-out);
    }
    .kf-sidebar-icon:hover {
      color: var(--dsw-alias-label-primary);
    }
    
    /* ------------------------------------------------------------------ board */
    /* The board renders in-app inside the conversation view area (Board tab). */
    .kf-root {
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      color: var(--dsw-alias-label-primary);
      font-size: 14px;
    }
    .kf-header {
      flex: none;
      display: flex;
      align-items: center;
      flex-wrap: wrap; /* narrow screens: controls wrap to a second row */
      gap: 10px;
      padding: 14px 18px;
      border-bottom: 1px solid var(--dsw-alias-border-l2);
    }
    .kf-header-title {
      font-size: 15px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .kf-code-chip {
      font-family: var(--ds-font-family-code);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--dsw-alias-brand-text);
      background: var(--dsw-alias-interactive-bg-hover-accent);
      border-radius: 6px;
      padding: 2px 6px;
    }
    .kf-count-chip {
      color: var(--dsw-alias-label-secondary);
      font-size: 12px;
      white-space: nowrap;
    }
    .kf-spacer { flex: 1; }
    .kf-iconbtn {
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: none;
      background: 0 0;
      color: var(--dsw-alias-label-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s var(--ds-ease-in-out), color 0.15s var(--ds-ease-in-out);
    }
    .kf-iconbtn:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary);
    }
    .kf-close-btn { margin-left: 4px; }
    
    /* The shell's conversation view area grows with its content once a session is
       active (the shell sets flex-basis:auto + min-height:auto there), so a tall
       board stretches the entire page instead of scrolling inside its columns.
       While the board is mounted, clamp the view area (the direct parent of
       .kf-root \u2014 the slot wrapper is display:contents) back to a fixed height:
       the board then fills it and each column scrolls internally. Scoped by
       :has(> .kf-root) so the normal chat view is untouched. */
    div:has(> .kf-root) {
      flex: 1 1 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
    }
    
    /* The board renders in-app inside the conversation view area (Board tab).
       It is a query container for its own layout: the view area's width varies
       with the shell's sidebars, so the column layout must react to the board's
       actual width, not the viewport. */
    .kf-body {
      flex: 1;
      min-height: 0;
      padding: 14px 18px 18px;
      overflow-x: hidden;
      overflow-y: auto;
      container: kf-board / inline-size;
    }
    
    /* Column wrapper: mobile-first \u2014 columns stack full-width (phone, tablet);
       the container query below flips them to the 5-across row on wide boards. */
    .kf-columns {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    /* Wide boards: five equal columns that scale with the screen and together
       take up the entire width; each column keeps its own internal scroll.
       The flex override uses .kf-columns > .kf-column (higher specificity than
       the base .kf-column { flex: none } below) so it reliably wins the cascade. */
    @container kf-board (min-width: 900px) {
      .kf-columns {
        flex-direction: row;
        height: 100%;
      }
      .kf-columns > .kf-column {
        flex: 1 1 0;
        min-width: 0;
      }
    }
    
    /* ---------------------------------------------------------------- column */
    .kf-column {
      --kf-accent: var(--dsw-alias-label-secondary);
      flex: none;
      display: flex;
      flex-direction: column;
      min-height: 0;
      border-radius: 14px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-1);
      transition: border-color 0.15s var(--ds-ease-in-out), background 0.15s var(--ds-ease-in-out);
    }
    .kf-column.kf-over {
      border-color: color-mix(in oklab, var(--kf-accent) 55%, var(--dsw-alias-border-l2));
      background: color-mix(in oklab, var(--kf-accent) 8%, var(--dsw-alias-bg-layer-1));
    }
    .kf-column.kf-backlog     { --kf-accent: light-dark(#64748b, #94a3b8); }
    .kf-column.kf-todo        { --kf-accent: light-dark(#2563eb, #60a5fa); }
    .kf-column.kf-in_progress { --kf-accent: light-dark(#7c3aed, #a78bfa); }
    .kf-column.kf-review      { --kf-accent: light-dark(#d97706, #fbbf24); }
    .kf-column.kf-done        { --kf-accent: light-dark(#059669, #34d399); }
    
    .kf-column-head {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 12px 8px;
    }
    .kf-column-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--kf-accent);
      flex: none;
    }
    .kf-column-title {
      font-weight: 600;
      font-size: 13px;
      color: var(--dsw-alias-label-primary);
    }
    .kf-column-list {
      flex: 1;
      min-height: 80px;
      padding: 4px 8px 8px;
      overflow-y: auto;
      overscroll-behavior: contain;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .kf-column-empty {
      border: 1px dashed var(--dsw-alias-border-l3);
      border-radius: 10px;
      color: var(--dsw-alias-label-tertiary);
      font-size: 12px;
      padding: 14px 10px;
      text-align: center;
    }
    
    /* ------------------------------------------------------------------ card */
    .kf-card {
      position: relative;
      border-radius: 10px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-2);
      padding: 10px 10px 10px 14px;
      cursor: pointer;
      transition: border-color 0.15s var(--ds-ease-in-out), box-shadow 0.15s var(--ds-ease-in-out), transform 0.15s var(--ds-ease-in-out);
      animation: kf-card-in 0.22s var(--ds-ease-in-out);
      overflow: hidden;
    }
    .kf-card::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--kf-card-accent, var(--dsw-alias-label-secondary));
      opacity: 0.9;
    }
    .kf-card:hover {
      border-color: var(--dsw-alias-border-l3);
      box-shadow: 0 2px 10px light-dark(rgba(15, 23, 42, 0.08), rgba(0, 0, 0, 0.4));
    }
    .kf-card:active { transform: scale(0.985); }
    .kf-card.kf-dragging {
      opacity: 0.45;
      border-style: dashed;
    }
    .kf-card.kf-agent-flash { animation: kf-agent-flash 1.4s var(--ds-ease-in-out); }
    .kf-card-id {
      font-family: var(--ds-font-family-code);
      font-size: 10.5px;
      font-weight: 600;
      color: var(--dsw-alias-label-tertiary);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .kf-card-name {
      font-size: 13px;
      line-height: 1.4;
      color: var(--dsw-alias-label-primary);
      overflow-wrap: anywhere;
    }
    .kf-card-activity {
      margin-top: 6px;
      font-size: 11px;
      line-height: 1.4;
      color: var(--dsw-alias-label-tertiary);
    }
    .kf-card-activity-phrase {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .kf-card-activity-time {
      display: block;
      color: var(--dsw-alias-label-tertiary);
      opacity: 0.75;
    }
    /* Hover tooltip: the agent's latest status note (fallback: last activity).
       Portaled to body and fixed-positioned (cards clip their overflow). */
    .kf-card-tip {
      position: fixed;
      z-index: 1000;
      max-width: 320px;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-3, var(--dsw-alias-bg-layer-2));
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
      font-size: 11.5px;
      line-height: 1.45;
      color: var(--dsw-alias-label-primary);
      overflow-wrap: anywhere;
      pointer-events: none;
      animation: kf-tip-in 120ms ease-out;
    }
    @keyframes kf-tip-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .kf-card-tip-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--dsw-alias-label-tertiary);
      margin-bottom: 3px;
    }
    .kf-card-tip-body {
      white-space: pre-line;
    }
    .kf-card-tip-hint {
      margin-top: 5px;
      font-size: 10.5px;
      color: var(--dsw-alias-label-tertiary);
      opacity: 0.85;
    }
    /* Status note box in the item dialog. */
    .kf-status-box {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-2);
      font-size: 12px;
      line-height: 1.5;
      color: var(--dsw-alias-label-primary);
    }
    .kf-session-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--dsw-alias-label-secondary);
    }
    .kf-edit-fab, .kf-archive-fab {
      position: absolute;
      top: 6px;
      width: 22px;
      height: 22px;
      border: none;
      border-radius: 6px;
      background: 0 0;
      color: var(--dsw-alias-label-tertiary);
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .kf-archive-fab { right: 6px; }
    .kf-edit-fab { right: 32px; }
    .kf-card:hover .kf-edit-fab, .kf-card:hover .kf-archive-fab { display: inline-flex; }
    /* Touch screens have no hover to reveal the card actions \u2014 always show them. */
    @media (hover: none) {
      .kf-edit-fab, .kf-archive-fab { display: inline-flex; }
    }
    .kf-edit-fab:hover, .kf-archive-fab:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
    .kf-drag-ghost {
      box-shadow: 0 12px 32px light-dark(rgba(15, 23, 42, 0.22), rgba(0, 0, 0, 0.6));
      transform: rotate(2.5deg) scale(1.03);
      cursor: grabbing;
    }
    
    /* -------------------------------------------------------------- new item */
    .kf-newitem {
      border-radius: 10px;
      border: 1px solid var(--dsw-alias-border-l3);
      background: var(--dsw-alias-bg-layer-2);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: kf-card-in 0.18s var(--ds-ease-in-out);
    }
    .kf-input,
    .kf-textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--dsw-alias-border-l3);
      border-radius: 8px;
      background: var(--dsw-alias-bg-base);
      color: var(--dsw-alias-label-primary);
      font: inherit;
      font-size: 13px;
      padding: 6px 8px;
      outline: none;
    }
    .kf-textarea { min-height: 54px; resize: vertical; }
    .kf-input:focus,
    .kf-textarea:focus { border-color: var(--dsw-alias-brand-primary); }
    .kf-newitem-row { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
    
    .kf-btn {
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-button-elevated-fill);
      color: var(--dsw-alias-label-primary);
      font: inherit;
      font-size: 12.5px;
      font-weight: 500;
      padding: 5px 12px;
      transition: background 0.15s var(--ds-ease-in-out), border-color 0.15s var(--ds-ease-in-out);
    }
    .kf-btn:hover { background: var(--dsw-alias-button-floating-hover); }
    .kf-btn:disabled { opacity: 0.5; cursor: default; }
    .kf-btn.kf-primary {
      background: var(--dsw-alias-button-primary-fill);
      border-color: transparent;
      color: var(--dsw-alias-label-primary-foreground);
    }
    .kf-btn.kf-primary:hover { background: var(--dsw-alias-button-primary-hover); }
    .kf-btn.kf-ghost { background: 0 0; border-color: transparent; color: var(--dsw-alias-label-secondary); }
    .kf-btn.kf-ghost:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
    .kf-btn.kf-danger { color: var(--dsw-alias-state-error-primary); }
    
    /* Large "New item" button in the top header bar (creates in Backlog). */
    .kf-new-item-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13.5px;
      font-weight: 600;
      padding: 7px 16px;
      margin-left: 6px;
    }
    
    /* ---------------------------------------------------------------- dialog */
    .kf-dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 70;
      background: var(--dsw-alias-bg-mask-2);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: kf-fade-in 0.15s var(--ds-ease-in-out);
    }
    .kf-dialog {
      background: var(--dsw-alias-bg-base);
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 14px;
      box-shadow: 0 18px 60px light-dark(rgba(15, 23, 42, 0.2), rgba(0, 0, 0, 0.55));
      width: min(560px, calc(100vw - 48px));
      max-height: min(78vh, 720px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: kf-panel-in 0.2s var(--ds-ease-in-out);
    }
    .kf-dialog-head {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 16px 10px;
    }
    .kf-dialog-title { font-size: 14px; font-weight: 600; }
    .kf-dialog-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 4px 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .kf-fieldlabel {
      font-size: 12px;
      font-weight: 600;
      color: var(--dsw-alias-label-secondary);
      margin-bottom: 4px;
    }
    .kf-muted { color: var(--dsw-alias-label-tertiary); font-size: 12.5px; }
    .kf-activity-row {
      font-size: 12px;
      color: var(--dsw-alias-label-tertiary);
      display: flex;
      gap: 6px;
      padding: 2px 0;
    }
    
    /* --------------------------------------------------------------- settings */
    .kf-pop {
      position: absolute;
      top: 46px;
      right: 14px;
      z-index: 65;
      background: var(--dsw-alias-bg-base);
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 12px;
      box-shadow: 0 12px 40px light-dark(rgba(15, 23, 42, 0.18), rgba(0, 0, 0, 0.5));
      width: 300px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: kf-panel-in 0.16s var(--ds-ease-in-out);
    }
    .kf-toggle-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .kf-toggle-text { flex: 1; min-width: 0; }
    .kf-toggle-title { font-size: 13px; font-weight: 600; }
    .kf-toggle-sub { font-size: 11.5px; color: var(--dsw-alias-label-tertiary); margin-top: 2px; }
    .kf-switch {
      cursor: pointer;
      flex: none;
      width: 36px;
      height: 21px;
      border-radius: 12px;
      border: none;
      padding: 2px;
      background: var(--dsw-alias-interactive-bg-hover-solid);
      transition: background 0.18s var(--ds-ease-in-out);
      display: inline-flex;
      align-items: center;
    }
    .kf-switch.kf-on { background: var(--dsw-alias-brand-primary); }
    .kf-switch-thumb {
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.18s var(--ds-ease-in-out);
    }
    .kf-switch.kf-on .kf-switch-thumb { transform: translateX(15px); }
    .kf-code-row { display: flex; gap: 6px; align-items: center; }
    .kf-code-row .kf-input { width: 110px; font-family: var(--ds-font-family-code); text-transform: uppercase; }
    
    /* ----------------------------------------------------------- misc states */
    .kf-error {
      color: var(--dsw-alias-state-error-primary);
      font-size: 12.5px;
      padding: 4px 0;
    }
    .kf-warning {
      border: 1px solid var(--dsw-alias-state-warn-secondary, #f59e0b);
      border-radius: 10px;
      background: color-mix(in oklab, light-dark(#f59e0b, #fbbf24) 10%, var(--dsw-alias-bg-base));
      color: var(--dsw-alias-label-primary);
      font-size: 12px;
      padding: 8px 12px;
      margin: 8px 18px 0;
    }
    .kf-loading { padding: 40px; text-align: center; color: var(--dsw-alias-label-tertiary); }
    
    /* ------------------------------------------------------------ animations */
    @keyframes kf-fade-in { from { opacity: 0; } }
    @keyframes kf-panel-in {
      from { opacity: 0; transform: translateY(8px) scale(0.985); }
    }
    @keyframes kf-card-in {
      from { opacity: 0; transform: scale(0.92) translateY(6px); }
    }
    @keyframes kf-slide-in {
      from { opacity: 0; transform: translateX(-8px); }
    }
    @keyframes kf-agent-flash {
      0%, 100% { box-shadow: 0 0 0 0 transparent; }
      25% { box-shadow: 0 0 0 3px color-mix(in oklab, var(--kf-card-accent, #7c3aed) 45%, transparent); }
    }
    @media (prefers-reduced-motion: reduce) {
      .kf-card, .kf-newitem, .kf-comment, .kf-pop,
      .kf-card.kf-agent-flash, .kf-drag-ghost {
        animation: none !important;
        transition: none !important;
      }
    }
    
    
    /* ------------------------------------------------------------------ */
    /* dsh-kanban: draft, priority, stats and the right-Sidebar task panel */
    /* ------------------------------------------------------------------ */
    
    .kf-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-left: 6px;
      padding: 1px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.01em;
      vertical-align: middle;
    }
    
    .kf-pill-draft {
      color: var(--dsw-alias-label-secondary);
      background: color-mix(in srgb, var(--dsw-alias-label-secondary) 12%, transparent);
      border: 1px dashed color-mix(in srgb, var(--dsw-alias-label-secondary) 35%, transparent);
    }
    
    .kf-pill-ready {
      color: var(--dsw-alias-accent);
      background: color-mix(in srgb, var(--dsw-alias-accent) 12%, transparent);
    }
    
    .kf-prio {
      margin-left: 6px;
      padding: 1px 6px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    
    .kf-prio-low { color: var(--dsw-alias-label-secondary); }
    .kf-prio-high { color: #b7791f; background: color-mix(in srgb, #f6ad55 18%, transparent); }
    .kf-prio-urgent { color: #c53030; background: color-mix(in srgb, #f56565 20%, transparent); }
    
    .kf-card-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 6px;
    }
    
    .kf-stat-chip {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 1px 6px;
      border-radius: 6px;
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      color: var(--dsw-alias-label-secondary);
      background: color-mix(in srgb, var(--dsw-alias-label-secondary) 10%, transparent);
    }
    
    .kf-ready-btn {
      margin-top: 8px;
      width: 100%;
      padding: 5px 8px;
      border: 1px solid color-mix(in srgb, var(--dsw-alias-accent) 45%, transparent);
      border-radius: 8px;
      background: color-mix(in srgb, var(--dsw-alias-accent) 10%, transparent);
      color: var(--dsw-alias-accent);
      font: inherit;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }
    
    .kf-ready-btn:hover { background: color-mix(in srgb, var(--dsw-alias-accent) 18%, transparent); }
    
    .kf-session-badge {
      display: inline-flex;
      align-items: center;
      margin-left: 6px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--dsw-alias-label-secondary);
      cursor: pointer;
      vertical-align: middle;
    }
    
    .kf-session-badge:hover { color: var(--dsw-alias-accent); }
    
    /* Right Sidebar task panel */
    .kf-task-panel {
      display: flex;
      flex-direction: column;
      gap: 11px;
      height: 100%;
      min-height: 0;
      padding: 14px 14px 20px;
      overflow-y: auto;
      color: var(--dsw-alias-label-primary);
      font-size: 13px;
    }
    
    .kf-task-panel-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    
    .kf-task-panel-title { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
    .kf-task-panel-code { font-weight: 700; font-size: 13px; letter-spacing: 0.01em; }
    .kf-task-panel-stats { display: flex; flex-wrap: wrap; gap: 5px; }
    
    .kf-panel-empty,
    .kf-panel-hint {
      color: var(--dsw-alias-label-secondary);
      font-size: 12px;
      line-height: 1.5;
    }
    
    .kf-panel-empty { padding: 18px 14px; }
    .kf-panel-error {
      padding: 8px 10px;
      border-radius: 8px;
      color: #c53030;
      background: color-mix(in srgb, #f56565 12%, transparent);
      font-size: 12px;
    }
    
    .kf-field { display: flex; flex-direction: column; gap: 5px; }
    .kf-field-label { font-size: 11px; font-weight: 600; color: var(--dsw-alias-label-secondary); }
    .kf-field-row { display: flex; gap: 8px; }
    .kf-field-row .kf-field { flex: 1; min-width: 0; }
    
    .kf-task-panel .kf-input,
    .kf-task-panel .kf-textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--dsw-alias-border);
      border-radius: 8px;
      background: var(--dsw-alias-bg-primary);
      color: var(--dsw-alias-label-primary);
      padding: 7px 9px;
      font: inherit;
      font-size: 12px;
    }
    
    .kf-task-panel .kf-textarea { resize: vertical; line-height: 1.45; }
    
    .kf-task-panel-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 12px;
      color: var(--dsw-alias-label-secondary);
      font-size: 11px;
    }
    
    .kf-task-note {
      padding: 8px 10px;
      border-left: 2px solid var(--dsw-alias-accent);
      border-radius: 6px;
      background: color-mix(in srgb, var(--dsw-alias-accent) 7%, transparent);
      font-size: 12px;
      line-height: 1.45;
    }
    
    .kf-task-note-title { color: var(--dsw-alias-label-secondary); font-size: 10px; margin-bottom: 3px; }
    
    .kf-task-actions { display: flex; flex-wrap: wrap; gap: 6px; }
    .kf-task-move { display: flex; align-items: center; gap: 6px; }
    .kf-task-move .kf-input { flex: 1; }
    
    .kf-btn.kf-success {
      border-color: color-mix(in srgb, #38a169 45%, transparent);
      background: color-mix(in srgb, #38a169 14%, transparent);
      color: #2f855a;
    }
    
    .kf-btn.kf-danger {
      border-color: color-mix(in srgb, #e53e3e 40%, transparent);
      background: color-mix(in srgb, #e53e3e 10%, transparent);
      color: #c53030;
    }
    
    .kf-task-activity { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
    .kf-task-activity-title { font-size: 11px; font-weight: 600; color: var(--dsw-alias-label-secondary); margin-bottom: 2px; }
    .kf-task-activity-row { display: flex; gap: 8px; font-size: 11px; color: var(--dsw-alias-label-secondary); line-height: 1.4; }
    .kf-task-activity-time { flex: 0 0 auto; opacity: 0.75; }
    .kf-task-activity-text { color: var(--dsw-alias-label-primary); }
    
    
    /* assignee / timer / priority card layout */
    .kf-card { position: relative; }
    .kf-card::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      width: 3px;
      border-radius: 3px;
      background: var(--dsw-alias-border);
      opacity: 0.6;
    }
    .kf-priority-high::before { background: #dd6b20; opacity: 1; }
    .kf-priority-urgent::before { background: #e53e3e; opacity: 1; }
    .kf-priority-low::before { background: var(--dsw-alias-label-secondary); opacity: 0.5; }
    
    .kf-card-owner {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 5px;
      font-size: 10px;
      color: var(--dsw-alias-label-secondary);
    }
    
    .kf-owner-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--dsw-alias-border);
      flex: 0 0 auto;
    }
    .kf-owner-dot.kf-owner-set { background: #38a169; }
    
    .kf-owner-name {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .kf-card-timer { color: var(--dsw-alias-accent); font-variant-numeric: tabular-nums; }
    .kf-card-steps { opacity: 0.8; }
    
    .kf-task-activity-icon { flex: 0 0 14px; text-align: center; }
    `;var z=require("react");var E=require("react"),po=require("react-dom");var d=_n(require("react")),Me=require("react-dom");var _=require("react");var st=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Oe(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function Tt(e){return"nodeType"in e}function V(e){var t,n;return e?Oe(e)?e:Tt(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Rt(e){let{Document:t}=V(e);return e instanceof t}function He(e){return Oe(e)?!1:e instanceof V(e).HTMLElement}function rn(e){return e instanceof V(e).SVGElement}function Le(e){return e?Oe(e)?e.document:Tt(e)?Rt(e)?e:He(e)||rn(e)?e.ownerDocument:document:document:document}var me=st?_.useLayoutEffect:_.useEffect;function at(e){let t=(0,_.useRef)(e);return me(()=>{t.current=e}),(0,_.useCallback)(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function jn(){let e=(0,_.useRef)(null),t=(0,_.useCallback)((r,o)=>{e.current=setInterval(r,o)},[]),n=(0,_.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function Ye(e,t){t===void 0&&(t=[e]);let n=(0,_.useRef)(e);return me(()=>{n.current!==e&&(n.current=e)},t),n}function Ue(e,t){let n=(0,_.useRef)();return(0,_.useMemo)(()=>{let r=e(n.current);return n.current=r,r},[...t])}function lt(e){let t=at(e),n=(0,_.useRef)(null),r=(0,_.useCallback)(o=>{o!==n.current&&t?.(o,n.current),n.current=o},[]);return[n,r]}function ct(e){let t=(0,_.useRef)();return(0,_.useEffect)(()=>{t.current=e},[e]),t.current}var nn={};function dt(e,t){return(0,_.useMemo)(()=>{if(t)return t;let n=nn[e]==null?0:nn[e]+1;return nn[e]=n,e+"-"+n},[e,t])}function Kn(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((i,s)=>{let a=Object.entries(s);for(let[l,u]of a){let f=i[l];f!=null&&(i[l]=f+e*u)}return i},{...t})}}var Pe=Kn(1),ut=Kn(-1);function qo(e){return"clientX"in e&&"clientY"in e}function Ot(e){if(!e)return!1;let{KeyboardEvent:t}=V(e.target);return t&&e instanceof t}function $o(e){if(!e)return!1;let{TouchEvent:t}=V(e.target);return t&&e instanceof t}function ft(e){if($o(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return qo(e)?{x:e.clientX,y:e.clientY}:null}var Ke=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[Ke.Translate.toString(e),Ke.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),$n="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function Hn(e){return e.matches($n)?e:e.querySelector($n)}var Be=_n(require("react")),jo={display:"none"};function Yn(e){let{id:t,value:n}=e;return Be.default.createElement("div",{id:t,style:jo},n)}function Un(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e,o={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return Be.default.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function Vn(){let[e,t]=(0,Be.useState)("");return{announce:(0,Be.useCallback)(r=>{r!=null&&t(r)},[]),announcement:e}}var sr=(0,d.createContext)(null);function Ko(e){let t=(0,d.useContext)(sr);(0,d.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function Ho(){let[e]=(0,d.useState)(()=>new Set),t=(0,d.useCallback)(r=>(e.add(r),()=>e.delete(r)),[e]);return[(0,d.useCallback)(r=>{let{type:o,event:i}=r;e.forEach(s=>{var a;return(a=s[o])==null?void 0:a.call(s,i)})},[e]),t]}var Yo={draggable:`
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      `},Uo={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function Vo(e){let{announcements:t=Uo,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=Yo}=e,{announce:i,announcement:s}=Vn(),a=dt("DndLiveRegion"),[l,u]=(0,d.useState)(!1);if((0,d.useEffect)(()=>{u(!0)},[]),Ko((0,d.useMemo)(()=>({onDragStart(c){let{active:v}=c;i(t.onDragStart({active:v}))},onDragMove(c){let{active:v,over:m}=c;t.onDragMove&&i(t.onDragMove({active:v,over:m}))},onDragOver(c){let{active:v,over:m}=c;i(t.onDragOver({active:v,over:m}))},onDragEnd(c){let{active:v,over:m}=c;i(t.onDragEnd({active:v,over:m}))},onDragCancel(c){let{active:v,over:m}=c;i(t.onDragCancel({active:v,over:m}))}}),[i,t])),!l)return null;let f=d.default.createElement(d.default.Fragment,null,d.default.createElement(Yn,{id:r,value:o.draggable}),d.default.createElement(Un,{id:a,announcement:s}));return n?(0,Me.createPortal)(f,n):f}var $;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})($||($={}));function Pt(){}function ar(e,t){return(0,d.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function lr(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,d.useMemo)(()=>[...t].filter(r=>r!=null),[...t])}var ce=Object.freeze({x:0,y:0});function cr(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Xo(e,t){let n=ft(e);if(!n)return"0 0";let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function dr(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function Go(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function ln(e){let{left:t,top:n,height:r,width:o}=e;return[{x:t,y:n},{x:t+o,y:n},{x:t,y:n+r},{x:t+o,y:n+r}]}function Jo(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}var ur=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=ln(t),i=[];for(let s of r){let{id:a}=s,l=n.get(a);if(l){let u=ln(l),f=o.reduce((v,m,x)=>v+cr(u[x],m),0),c=Number((f/4).toFixed(4));i.push({id:a,data:{droppableContainer:s,value:c}})}}return i.sort(dr)};function Zo(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),s=o-r,a=i-n;if(r<o&&n<i){let l=t.width*t.height,u=e.width*e.height,f=s*a,c=f/(l+u-f);return Number(c.toFixed(4))}return 0}var gn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=[];for(let i of r){let{id:s}=i,a=n.get(s);if(a){let l=Zo(a,t);l>0&&o.push({id:s,data:{droppableContainer:i,value:l}})}}return o.sort(Go)};function Qo(e,t){let{top:n,left:r,bottom:o,right:i}=t;return n<=e.y&&e.y<=o&&r<=e.x&&e.x<=i}var fr=e=>{let{droppableContainers:t,droppableRects:n,pointerCoordinates:r}=e;if(!r)return[];let o=[];for(let i of t){let{id:s}=i,a=n.get(s);if(a&&Qo(r,a)){let u=ln(a).reduce((c,v)=>c+cr(r,v),0),f=Number((u/4).toFixed(4));o.push({id:s,data:{droppableContainer:i,value:f}})}}return o.sort(dr)};function ei(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function pr(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:ce}function ti(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return o.reduce((s,a)=>({...s,top:s.top+e*a.y,bottom:s.bottom+e*a.y,left:s.left+e*a.x,right:s.right+e*a.x}),{...n})}}var ni=ti(1);function gr(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function ri(e,t,n){let r=gr(t);if(!r)return e;let{scaleX:o,scaleY:i,x:s,y:a}=r,l=e.left-s-(1-o)*parseFloat(n),u=e.top-a-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,c=i?e.height/i:e.height;return{width:f,height:c,top:u,right:l+f,bottom:u+c,left:l}}var oi={ignoreTransform:!1};function ht(e,t){t===void 0&&(t=oi);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:u,transformOrigin:f}=V(e).getComputedStyle(e);u&&(n=ri(n,u,f))}let{top:r,left:o,width:i,height:s,bottom:a,right:l}=n;return{top:r,left:o,width:i,height:s,bottom:a,right:l}}function Xn(e){return ht(e,{ignoreTransform:!0})}function ii(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function si(e,t){return t===void 0&&(t=V(e).getComputedStyle(e)),t.position==="fixed"}function ai(e,t){t===void 0&&(t=V(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{let i=t[o];return typeof i=="string"?n.test(i):!1})}function mn(e,t){let n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(Rt(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!He(o)||rn(o)||n.includes(o))return n;let i=V(e).getComputedStyle(o);return o!==e&&ai(o,i)&&n.push(o),si(o,i)?n:r(o.parentNode)}return e?r(e):n}function mr(e){let[t]=mn(e,1);return t??null}function on(e){return!st||!e?null:Oe(e)?e:Tt(e)?Rt(e)||e===Le(e).scrollingElement?window:He(e)?e:null:null}function vr(e){return Oe(e)?e.scrollX:e.scrollLeft}function hr(e){return Oe(e)?e.scrollY:e.scrollTop}function cn(e){return{x:vr(e),y:hr(e)}}var K;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(K||(K={}));function br(e){return!st||!e?!1:e===document.scrollingElement}function kr(e){let t={x:0,y:0},n=br(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,i=e.scrollLeft<=t.x,s=e.scrollTop>=r.y,a=e.scrollLeft>=r.x;return{isTop:o,isLeft:i,isBottom:s,isRight:a,maxScroll:r,minScroll:t}}var li={x:.2,y:.2};function ci(e,t,n,r,o){let{top:i,left:s,right:a,bottom:l}=n;r===void 0&&(r=10),o===void 0&&(o=li);let{isTop:u,isBottom:f,isLeft:c,isRight:v}=kr(e),m={x:0,y:0},x={x:0,y:0},k={height:t.height*o.y,width:t.width*o.x};return!u&&i<=t.top+k.height?(m.y=K.Backward,x.y=r*Math.abs((t.top+k.height-i)/k.height)):!f&&l>=t.bottom-k.height&&(m.y=K.Forward,x.y=r*Math.abs((t.bottom-k.height-l)/k.height)),!v&&a>=t.right-k.width?(m.x=K.Forward,x.x=r*Math.abs((t.right-k.width-a)/k.width)):!c&&s<=t.left+k.width&&(m.x=K.Backward,x.x=r*Math.abs((t.left+k.width-s)/k.width)),{direction:m,speed:x}}function di(e){if(e===document.scrollingElement){let{innerWidth:i,innerHeight:s}=window;return{top:0,left:0,right:i,bottom:s,width:i,height:s}}let{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function wr(e){return e.reduce((t,n)=>Pe(t,cn(n)),ce)}function ui(e){return e.reduce((t,n)=>t+vr(n),0)}function fi(e){return e.reduce((t,n)=>t+hr(n),0)}function yr(e,t){if(t===void 0&&(t=ht),!e)return;let{top:n,left:r,bottom:o,right:i}=t(e);mr(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var pi=[["x",["left","right"],ui],["y",["top","bottom"],fi]],gt=class{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let r=mn(n),o=wr(r);this.rect={...t},this.width=t.width,this.height=t.height;for(let[i,s,a]of pi)for(let l of s)Object.defineProperty(this,l,{get:()=>{let u=a(r),f=o[i]-u;return this.rect[l]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},ze=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}};function gi(e){let{EventTarget:t}=V(e);return e instanceof t?e:Le(e)}function sn(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var ie;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(ie||(ie={}));function Gn(e){e.preventDefault()}function mi(e){e.stopPropagation()}var B;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(B||(B={}));var xr={start:[B.Space,B.Enter],cancel:[B.Esc],end:[B.Space,B.Enter,B.Tab]},vi=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case B.Right:return{...n,x:n.x+25};case B.Left:return{...n,x:n.x-25};case B.Down:return{...n,y:n.y+25};case B.Up:return{...n,y:n.y-25}}},Bt=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:n}}=t;this.props=t,this.listeners=new ze(Le(n)),this.windowListeners=new ze(V(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ie.Resize,this.handleCancel),this.windowListeners.add(ie.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(ie.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&yr(r),n(ce)}handleKeyDown(t){if(Ot(t)){let{active:n,context:r,options:o}=this.props,{keyboardCodes:i=xr,coordinateGetter:s=vi,scrollBehavior:a="smooth"}=o,{code:l}=t;if(i.end.includes(l)){this.handleEnd(t);return}if(i.cancel.includes(l)){this.handleCancel(t);return}let{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:ce;this.referenceCoordinates||(this.referenceCoordinates=f);let c=s(t,{active:n,context:r.current,currentCoordinates:f});if(c){let v=ut(c,f),m={x:0,y:0},{scrollableAncestors:x}=r.current;for(let k of x){let S=t.code,{isTop:w,isRight:p,isLeft:I,isBottom:O,maxScroll:C,minScroll:T}=kr(k),D=di(k),A={x:Math.min(S===B.Right?D.right-D.width/2:D.right,Math.max(S===B.Right?D.left:D.left+D.width/2,c.x)),y:Math.min(S===B.Down?D.bottom-D.height/2:D.bottom,Math.max(S===B.Down?D.top:D.top+D.height/2,c.y))},g=S===B.Right&&!p||S===B.Left&&!I,M=S===B.Down&&!O||S===B.Up&&!w;if(g&&A.x!==c.x){let W=k.scrollLeft+v.x,te=S===B.Right&&W<=C.x||S===B.Left&&W>=T.x;if(te&&!v.y){k.scrollTo({left:W,behavior:a});return}te?m.x=k.scrollLeft-W:m.x=S===B.Right?k.scrollLeft-C.x:k.scrollLeft-T.x,m.x&&k.scrollBy({left:-m.x,behavior:a});break}else if(M&&A.y!==c.y){let W=k.scrollTop+v.y,te=S===B.Down&&W<=C.y||S===B.Up&&W>=T.y;if(te&&!v.x){k.scrollTo({top:W,behavior:a});return}te?m.y=k.scrollTop-W:m.y=S===B.Down?k.scrollTop-C.y:k.scrollTop-T.y,m.y&&k.scrollBy({top:-m.y,behavior:a});break}}this.handleMove(t,Pe(ut(c,this.referenceCoordinates),m))}}}handleMove(t,n){let{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){let{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){let{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Bt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=xr,onActivation:o}=t,{active:i}=n,{code:s}=e.nativeEvent;if(r.start.includes(s)){let a=i.activatorNode.current;return a&&e.target!==a?!1:(e.preventDefault(),o?.({event:e.nativeEvent}),!0)}return!1}}];function Jn(e){return!!(e&&"distance"in e)}function Zn(e){return!!(e&&"delay"in e)}var mt=class{constructor(t,n,r){var o;r===void 0&&(r=gi(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;let{event:i}=t,{target:s}=i;this.props=t,this.events=n,this.document=Le(s),this.documentListeners=new ze(this.document),this.listeners=new ze(r),this.windowListeners=new ze(V(s)),this.initialCoordinates=(o=ft(i))!=null?o:ce,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(ie.Resize,this.handleCancel),this.windowListeners.add(ie.DragStart,Gn),this.windowListeners.add(ie.VisibilityChange,this.handleCancel),this.windowListeners.add(ie.ContextMenu,Gn),this.documentListeners.add(ie.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Zn(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if(Jn(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){let{active:r,onPending:o}=this.props;o(r,t,this.initialCoordinates,n)}handleStart(){let{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(ie.Click,mi,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ie.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;let{activated:r,initialCoordinates:o,props:i}=this,{onMove:s,options:{activationConstraint:a}}=i;if(!o)return;let l=(n=ft(t))!=null?n:ce,u=ut(o,l);if(!r&&a){if(Jn(a)){if(a.tolerance!=null&&sn(u,a.tolerance))return this.handleCancel();if(sn(u,a.distance))return this.handleStart()}if(Zn(a)&&sn(u,a.tolerance))return this.handleCancel();this.handlePending(a,u);return}t.cancelable&&t.preventDefault(),s(l)}handleEnd(){let{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){let{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===B.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},hi={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},Ve=class extends mt{constructor(t){let{event:n}=t,r=Le(n.target);super(t,hi,r)}};Ve.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];var bi={move:{name:"mousemove"},end:{name:"mouseup"}},dn;(function(e){e[e.RightClick=2]="RightClick"})(dn||(dn={}));var un=class extends mt{constructor(t){super(t,bi,Le(t.event.target))}};un.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===dn.RightClick?!1:(r?.({event:n}),!0)}}];var an={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},fn=class extends mt{constructor(t){super(t,an)}static setup(){return window.addEventListener(an.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(an.move.name,t)};function t(){}}};fn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:o}=n;return o.length>1?!1:(r?.({event:n}),!0)}}];var pt;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(pt||(pt={}));var Mt;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Mt||(Mt={}));function ki(e){let{acceleration:t,activator:n=pt.Pointer,canScroll:r,draggingRect:o,enabled:i,interval:s=5,order:a=Mt.TreeOrder,pointerCoordinates:l,scrollableAncestors:u,scrollableAncestorRects:f,delta:c,threshold:v}=e,m=yi({delta:c,disabled:!i}),[x,k]=jn(),S=(0,d.useRef)({x:0,y:0}),w=(0,d.useRef)({x:0,y:0}),p=(0,d.useMemo)(()=>{switch(n){case pt.Pointer:return l?{top:l.y,bottom:l.y,left:l.x,right:l.x}:null;case pt.DraggableRect:return o}},[n,o,l]),I=(0,d.useRef)(null),O=(0,d.useCallback)(()=>{let T=I.current;if(!T)return;let D=S.current.x*w.current.x,A=S.current.y*w.current.y;T.scrollBy(D,A)},[]),C=(0,d.useMemo)(()=>a===Mt.TreeOrder?[...u].reverse():u,[a,u]);(0,d.useEffect)(()=>{if(!i||!u.length||!p){k();return}for(let T of C){if(r?.(T)===!1)continue;let D=u.indexOf(T),A=f[D];if(!A)continue;let{direction:g,speed:M}=ci(T,A,p,t,v);for(let W of["x","y"])m[W][g[W]]||(M[W]=0,g[W]=0);if(M.x>0||M.y>0){k(),I.current=T,x(O,s),S.current=M,w.current=g;return}}S.current={x:0,y:0},w.current={x:0,y:0},k()},[t,O,r,k,i,s,JSON.stringify(p),JSON.stringify(m),x,u,C,f,JSON.stringify(v)])}var wi={x:{[K.Backward]:!1,[K.Forward]:!1},y:{[K.Backward]:!1,[K.Forward]:!1}};function yi(e){let{delta:t,disabled:n}=e,r=ct(t);return Ue(o=>{if(n||!r||!o)return wi;let i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[K.Backward]:o.x[K.Backward]||i.x===-1,[K.Forward]:o.x[K.Forward]||i.x===1},y:{[K.Backward]:o.y[K.Backward]||i.y===-1,[K.Forward]:o.y[K.Forward]||i.y===1}}},[n,t,r])}function xi(e,t){let n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return Ue(o=>{var i;return t==null?null:(i=r??o)!=null?i:null},[r,t])}function Si(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{sensor:o}=r,i=o.activators.map(s=>({eventName:s.eventName,handler:t(s.handler,r)}));return[...n,...i]},[]),[e,t])}var vt;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(vt||(vt={}));var pn;(function(e){e.Optimized="optimized"})(pn||(pn={}));var Qn=new Map;function Ii(e,t){let{dragging:n,dependencies:r,config:o}=t,[i,s]=(0,d.useState)(null),{frequency:a,measure:l,strategy:u}=o,f=(0,d.useRef)(e),c=S(),v=Ye(c),m=(0,d.useCallback)(function(w){w===void 0&&(w=[]),!v.current&&s(p=>p===null?w:p.concat(w.filter(I=>!p.includes(I))))},[v]),x=(0,d.useRef)(null),k=Ue(w=>{if(c&&!n)return Qn;if(!w||w===Qn||f.current!==e||i!=null){let p=new Map;for(let I of e){if(!I)continue;if(i&&i.length>0&&!i.includes(I.id)&&I.rect.current){p.set(I.id,I.rect.current);continue}let O=I.node.current,C=O?new gt(l(O),O):null;I.rect.current=C,C&&p.set(I.id,C)}return p}return w},[e,i,n,c,l]);return(0,d.useEffect)(()=>{f.current=e},[e]),(0,d.useEffect)(()=>{c||m()},[n,c]),(0,d.useEffect)(()=>{i&&i.length>0&&s(null)},[JSON.stringify(i)]),(0,d.useEffect)(()=>{c||typeof a!="number"||x.current!==null||(x.current=setTimeout(()=>{m(),x.current=null},a))},[a,c,m,...r]),{droppableRects:k,measureDroppableContainers:m,measuringScheduled:i!=null};function S(){switch(u){case vt.Always:return!1;case vt.BeforeDragging:return n;default:return!n}}}function vn(e,t){return Ue(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function Ci(e,t){return vn(e,t)}function Ni(e){let{callback:t,disabled:n}=e,r=at(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:i}=window;return new i(r)},[r,n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function zt(e){let{callback:t,disabled:n}=e,r=at(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:i}=window;return new i(r)},[n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function Di(e){return new gt(ht(e),e)}function er(e,t,n){t===void 0&&(t=Di);let[r,o]=(0,d.useState)(null);function i(){o(l=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=l??n)!=null?u:null}let f=t(e);return JSON.stringify(l)===JSON.stringify(f)?l:f})}let s=Ni({callback(l){if(e)for(let u of l){let{type:f,target:c}=u;if(f==="childList"&&c instanceof HTMLElement&&c.contains(e)){i();break}}}}),a=zt({callback:i});return me(()=>{i(),e?(a?.observe(e),s?.observe(document.body,{childList:!0,subtree:!0})):(a?.disconnect(),s?.disconnect())},[e]),r}function Ai(e){let t=vn(e);return pr(e,t)}var tr=[];function Ei(e){let t=(0,d.useRef)(e),n=Ue(r=>e?r&&r!==tr&&e&&t.current&&e.parentNode===t.current.parentNode?r:mn(e):tr,[e]);return(0,d.useEffect)(()=>{t.current=e},[e]),n}function Ti(e){let[t,n]=(0,d.useState)(null),r=(0,d.useRef)(e),o=(0,d.useCallback)(i=>{let s=on(i.target);s&&n(a=>a?(a.set(s,cn(s)),new Map(a)):null)},[]);return(0,d.useEffect)(()=>{let i=r.current;if(e!==i){s(i);let a=e.map(l=>{let u=on(l);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,cn(u)]):null}).filter(l=>l!=null);n(a.length?new Map(a):null),r.current=e}return()=>{s(e),s(i)};function s(a){a.forEach(l=>{let u=on(l);u?.removeEventListener("scroll",o)})}},[o,e]),(0,d.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((i,s)=>Pe(i,s),ce):wr(e):ce,[e,t])}function nr(e,t){t===void 0&&(t=[]);let n=(0,d.useRef)(null);return(0,d.useEffect)(()=>{n.current=null},t),(0,d.useEffect)(()=>{let r=e!==ce;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?ut(e,n.current):ce}function Ri(e){(0,d.useEffect)(()=>{if(!st)return;let t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(let n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function Oi(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{eventName:o,handler:i}=r;return n[o]=s=>{i(s,t)},n},{}),[e,t])}function Sr(e){return(0,d.useMemo)(()=>e?ii(e):null,[e])}var rr=[];function Li(e,t){t===void 0&&(t=ht);let[n]=e,r=Sr(n?V(n):null),[o,i]=(0,d.useState)(rr);function s(){i(()=>e.length?e.map(l=>br(l)?r:new gt(t(l),l)):rr)}let a=zt({callback:s});return me(()=>{a?.disconnect(),s(),e.forEach(l=>a?.observe(l))},[e]),o}function Ir(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return He(t)?t:e}function Pi(e){let{measure:t}=e,[n,r]=(0,d.useState)(null),o=(0,d.useCallback)(u=>{for(let{target:f}of u)if(He(f)){r(c=>{let v=t(f);return c?{...c,width:v.width,height:v.height}:v});break}},[t]),i=zt({callback:o}),s=(0,d.useCallback)(u=>{let f=Ir(u);i?.disconnect(),f&&i?.observe(f),r(f?t(f):null)},[t,i]),[a,l]=lt(s);return(0,d.useMemo)(()=>({nodeRef:a,rect:n,setRef:l}),[n,a,l])}var Bi=[{sensor:Ve,options:{}},{sensor:Bt,options:{}}],Mi={current:{}},Lt={draggable:{measure:Xn},droppable:{measure:Xn,strategy:vt.WhileDragging,frequency:pn.Optimized},dragOverlay:{measure:ht}},We=class extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}},zi={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new We,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Pt},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:Lt,measureDroppableContainers:Pt,windowRect:null,measuringScheduled:!1},Cr={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:Pt,draggableNodes:new Map,over:null,measureDroppableContainers:Pt},bt=(0,d.createContext)(Cr),Nr=(0,d.createContext)(zi);function Wi(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new We}}}function Fi(e,t){switch(t.type){case $.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case $.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case $.DragEnd:case $.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case $.RegisterDroppable:{let{element:n}=t,{id:r}=n,o=new We(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case $.SetDroppableDisabled:{let{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let s=new We(e.droppable.containers);return s.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:s}}}case $.UnregisterDroppable:{let{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;let i=new We(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function _i(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:o}=(0,d.useContext)(bt),i=ct(r),s=ct(n?.id);return(0,d.useEffect)(()=>{if(!t&&!r&&i&&s!=null){if(!Ot(i)||document.activeElement===i.target)return;let a=o.get(s);if(!a)return;let{activatorNode:l,node:u}=a;if(!l.current&&!u.current)return;requestAnimationFrame(()=>{for(let f of[l.current,u.current]){if(!f)continue;let c=Hn(f);if(c){c.focus();break}}})}},[r,t,o,s,i]),null}function Dr(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,i)=>i({transform:o,...r}),n):n}function qi(e){return(0,d.useMemo)(()=>({draggable:{...Lt.draggable,...e?.draggable},droppable:{...Lt.droppable,...e?.droppable},dragOverlay:{...Lt.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function $i(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e,i=(0,d.useRef)(!1),{x:s,y:a}=typeof o=="boolean"?{x:o,y:o}:o;me(()=>{if(!s&&!a||!t){i.current=!1;return}if(i.current||!r)return;let u=t?.node.current;if(!u||u.isConnected===!1)return;let f=n(u),c=pr(f,r);if(s||(c.x=0),a||(c.y=0),i.current=!0,Math.abs(c.x)>0||Math.abs(c.y)>0){let v=mr(u);v&&v.scrollBy({top:c.y,left:c.x})}},[t,s,a,r,n])}var Wt=(0,d.createContext)({...ce,scaleX:1,scaleY:1}),Ne;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(Ne||(Ne={}));var Ar=(0,d.memo)(function(t){var n,r,o,i;let{id:s,accessibility:a,autoScroll:l=!0,children:u,sensors:f=Bi,collisionDetection:c=gn,measuring:v,modifiers:m,...x}=t,k=(0,d.useReducer)(Fi,void 0,Wi),[S,w]=k,[p,I]=Ho(),[O,C]=(0,d.useState)(Ne.Uninitialized),T=O===Ne.Initialized,{draggable:{active:D,nodes:A,translate:g},droppable:{containers:M}}=S,W=D!=null?A.get(D):null,te=(0,d.useRef)({initial:null,translated:null}),ne=(0,d.useMemo)(()=>{var U;return D!=null?{id:D,data:(U=W?.data)!=null?U:Mi,rect:te}:null},[D,W]),ue=(0,d.useRef)(null),[Te,G]=(0,d.useState)(null),[re,St]=(0,d.useState)(null),ve=Ye(x,Object.values(x)),tt=dt("DndDescribedBy",s),It=(0,d.useMemo)(()=>M.getEnabled(),[M]),he=qi(v),{droppableRects:be,measureDroppableContainers:Fe,measuringScheduled:Ct}=Ii(It,{dragging:T,dependencies:[g.x,g.y],config:he.droppable}),J=xi(A,D),Nt=(0,d.useMemo)(()=>re?ft(re):null,[re]),b=Oo(),N=Ci(J,he.draggable.measure);$i({activeNode:D!=null?A.get(D):null,config:b.layoutShiftCompensation,initialRect:N,measure:he.draggable.measure});let R=er(J,he.draggable.measure,N),q=er(J?J.parentElement:null),H=(0,d.useRef)({activatorEvent:null,active:null,activeNode:J,collisionRect:null,collisions:null,droppableRects:be,draggableNodes:A,draggingNode:null,draggingNodeRect:null,droppableContainers:M,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),_e=M.getNodeFor((n=H.current.over)==null?void 0:n.id),le=Pi({measure:he.dragOverlay.measure}),Re=(r=le.nodeRef.current)!=null?r:J,fe=T?(o=le.rect)!=null?o:R:null,Rn=!!(le.nodeRef.current&&le.rect),On=Ai(Rn?null:R),Qt=Sr(Re?V(Re):null),ye=Ei(T?_e??J:null),Dt=Li(ye),At=Dr(m,{transform:{x:g.x-On.x,y:g.y-On.y,scaleX:1,scaleY:1},activatorEvent:re,active:ne,activeNodeRect:R,containerNodeRect:q,draggingNodeRect:fe,over:H.current.over,overlayNodeRect:le.rect,scrollableAncestors:ye,scrollableAncestorRects:Dt,windowRect:Qt}),Ln=Nt?Pe(Nt,g):null,Pn=Ti(ye),Co=nr(Pn),No=nr(Pn,[R]),qe=Pe(At,Co),$e=fe?ni(fe,At):null,nt=ne&&$e?c({active:ne,collisionRect:$e,droppableRects:be,droppableContainers:It,pointerCoordinates:Ln}):null,Bn=Jo(nt,"id"),[xe,Mn]=(0,d.useState)(null),Do=Rn?At:Pe(At,No),Ao=ei(Do,(i=xe?.rect)!=null?i:null,R),en=(0,d.useRef)(null),zn=(0,d.useCallback)((U,Z)=>{let{sensor:Q,options:Se}=Z;if(ue.current==null)return;let oe=A.get(ue.current);if(!oe)return;let ee=U.nativeEvent,pe=new Q({active:ue.current,activeNode:oe,event:ee,options:Se,context:H,onAbort(Y){if(!A.get(Y))return;let{onDragAbort:ge}=ve.current,ke={id:Y};ge?.(ke),p({type:"onDragAbort",event:ke})},onPending(Y,Ie,ge,ke){if(!A.get(Y))return;let{onDragPending:ot}=ve.current,Ce={id:Y,constraint:Ie,initialCoordinates:ge,offset:ke};ot?.(Ce),p({type:"onDragPending",event:Ce})},onStart(Y){let Ie=ue.current;if(Ie==null)return;let ge=A.get(Ie);if(!ge)return;let{onDragStart:ke}=ve.current,rt={activatorEvent:ee,active:{id:Ie,data:ge.data,rect:te}};(0,Me.unstable_batchedUpdates)(()=>{ke?.(rt),C(Ne.Initializing),w({type:$.DragStart,initialCoordinates:Y,active:Ie}),p({type:"onDragStart",event:rt}),G(en.current),St(ee)})},onMove(Y){w({type:$.DragMove,coordinates:Y})},onEnd:je($.DragEnd),onCancel:je($.DragCancel)});en.current=pe;function je(Y){return async function(){let{active:ge,collisions:ke,over:rt,scrollAdjustedTranslate:ot}=H.current,Ce=null;if(ge&&ot){let{cancelDrop:it}=ve.current;Ce={activatorEvent:ee,active:ge,collisions:ke,delta:ot,over:rt},Y===$.DragEnd&&typeof it=="function"&&await Promise.resolve(it(Ce))&&(Y=$.DragCancel)}ue.current=null,(0,Me.unstable_batchedUpdates)(()=>{w({type:Y}),C(Ne.Uninitialized),Mn(null),G(null),St(null),en.current=null;let it=Y===$.DragEnd?"onDragEnd":"onDragCancel";if(Ce){let tn=ve.current[it];tn?.(Ce),p({type:it,event:Ce})}})}}},[A]),Eo=(0,d.useCallback)((U,Z)=>(Q,Se)=>{let oe=Q.nativeEvent,ee=A.get(Se);if(ue.current!==null||!ee||oe.dndKit||oe.defaultPrevented)return;let pe={active:ee};U(Q,Z.options,pe)===!0&&(oe.dndKit={capturedBy:Z.sensor},ue.current=Se,zn(Q,Z))},[A,zn]),Wn=Si(f,Eo);Ri(f),me(()=>{R&&O===Ne.Initializing&&C(Ne.Initialized)},[R,O]),(0,d.useEffect)(()=>{let{onDragMove:U}=ve.current,{active:Z,activatorEvent:Q,collisions:Se,over:oe}=H.current;if(!Z||!Q)return;let ee={active:Z,activatorEvent:Q,collisions:Se,delta:{x:qe.x,y:qe.y},over:oe};(0,Me.unstable_batchedUpdates)(()=>{U?.(ee),p({type:"onDragMove",event:ee})})},[qe.x,qe.y]),(0,d.useEffect)(()=>{let{active:U,activatorEvent:Z,collisions:Q,droppableContainers:Se,scrollAdjustedTranslate:oe}=H.current;if(!U||ue.current==null||!Z||!oe)return;let{onDragOver:ee}=ve.current,pe=Se.get(Bn),je=pe&&pe.rect.current?{id:pe.id,rect:pe.rect.current,data:pe.data,disabled:pe.disabled}:null,Y={active:U,activatorEvent:Z,collisions:Q,delta:{x:oe.x,y:oe.y},over:je};(0,Me.unstable_batchedUpdates)(()=>{Mn(je),ee?.(Y),p({type:"onDragOver",event:Y})})},[Bn]),me(()=>{H.current={activatorEvent:re,active:ne,activeNode:J,collisionRect:$e,collisions:nt,droppableRects:be,draggableNodes:A,draggingNode:Re,draggingNodeRect:fe,droppableContainers:M,over:xe,scrollableAncestors:ye,scrollAdjustedTranslate:qe},te.current={initial:fe,translated:$e}},[ne,J,nt,$e,A,Re,fe,be,M,xe,ye,qe]),ki({...b,delta:g,draggingRect:$e,pointerCoordinates:Ln,scrollableAncestors:ye,scrollableAncestorRects:Dt});let To=(0,d.useMemo)(()=>({active:ne,activeNode:J,activeNodeRect:R,activatorEvent:re,collisions:nt,containerNodeRect:q,dragOverlay:le,draggableNodes:A,droppableContainers:M,droppableRects:be,over:xe,measureDroppableContainers:Fe,scrollableAncestors:ye,scrollableAncestorRects:Dt,measuringConfiguration:he,measuringScheduled:Ct,windowRect:Qt}),[ne,J,R,re,nt,q,le,A,M,be,xe,Fe,ye,Dt,he,Ct,Qt]),Ro=(0,d.useMemo)(()=>({activatorEvent:re,activators:Wn,active:ne,activeNodeRect:R,ariaDescribedById:{draggable:tt},dispatch:w,draggableNodes:A,over:xe,measureDroppableContainers:Fe}),[re,Wn,ne,R,w,tt,A,xe,Fe]);return d.default.createElement(sr.Provider,{value:I},d.default.createElement(bt.Provider,{value:Ro},d.default.createElement(Nr.Provider,{value:To},d.default.createElement(Wt.Provider,{value:Ao},u)),d.default.createElement(_i,{disabled:a?.restoreFocus===!1})),d.default.createElement(Vo,{...a,hiddenTextDescribedById:tt}));function Oo(){let U=Te?.autoScrollEnabled===!1,Z=typeof l=="object"?l.enabled===!1:l===!1,Q=T&&!U&&!Z;return typeof l=="object"?{...l,enabled:Q}:{enabled:Q}}}),ji=(0,d.createContext)(null),or="button",Ki="Draggable";function Er(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e,i=dt(Ki),{activators:s,activatorEvent:a,active:l,activeNodeRect:u,ariaDescribedById:f,draggableNodes:c,over:v}=(0,d.useContext)(bt),{role:m=or,roleDescription:x="draggable",tabIndex:k=0}=o??{},S=l?.id===t,w=(0,d.useContext)(S?Wt:ji),[p,I]=lt(),[O,C]=lt(),T=Oi(s,t),D=Ye(n);me(()=>(c.set(t,{id:t,key:i,node:p,activatorNode:O,data:D}),()=>{let g=c.get(t);g&&g.key===i&&c.delete(t)}),[c,t]);let A=(0,d.useMemo)(()=>({role:m,tabIndex:k,"aria-disabled":r,"aria-pressed":S&&m===or?!0:void 0,"aria-roledescription":x,"aria-describedby":f.draggable}),[r,m,k,S,x,f.draggable]);return{active:l,activatorEvent:a,activeNodeRect:u,attributes:A,isDragging:S,listeners:r?void 0:T,node:p,over:v,setNodeRef:I,setActivatorNodeRef:C,transform:w}}function Hi(){return(0,d.useContext)(Nr)}var Yi="Droppable",Ui={timeout:25};function Tr(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e,i=dt(Yi),{active:s,dispatch:a,over:l,measureDroppableContainers:u}=(0,d.useContext)(bt),f=(0,d.useRef)({disabled:n}),c=(0,d.useRef)(!1),v=(0,d.useRef)(null),m=(0,d.useRef)(null),{disabled:x,updateMeasurementsFor:k,timeout:S}={...Ui,...o},w=Ye(k??r),p=(0,d.useCallback)(()=>{if(!c.current){c.current=!0;return}m.current!=null&&clearTimeout(m.current),m.current=setTimeout(()=>{u(Array.isArray(w.current)?w.current:[w.current]),m.current=null},S)},[S]),I=zt({callback:p,disabled:x||!s}),O=(0,d.useCallback)((A,g)=>{I&&(g&&(I.unobserve(g),c.current=!1),A&&I.observe(A))},[I]),[C,T]=lt(O),D=Ye(t);return(0,d.useEffect)(()=>{!I||!C.current||(I.disconnect(),c.current=!1,I.observe(C.current))},[C,I]),(0,d.useEffect)(()=>(a({type:$.RegisterDroppable,element:{id:r,key:i,disabled:n,node:C,rect:v,data:D}}),()=>a({type:$.UnregisterDroppable,key:i,id:r})),[r]),(0,d.useEffect)(()=>{n!==f.current.disabled&&(a({type:$.SetDroppableDisabled,id:r,key:i,disabled:n}),f.current.disabled=n)},[r,i,n,a]),{active:s,rect:v,isOver:l?.id===r,node:C,over:l,setNodeRef:T}}function Vi(e){let{animation:t,children:n}=e,[r,o]=(0,d.useState)(null),[i,s]=(0,d.useState)(null),a=ct(n);return!n&&!r&&a&&o(a),me(()=>{if(!i)return;let l=r?.key,u=r?.props.id;if(l==null||u==null){o(null);return}Promise.resolve(t(u,i)).then(()=>{o(null)})},[t,r,i]),d.default.createElement(d.default.Fragment,null,n,r?(0,d.cloneElement)(r,{ref:s}):null)}var Xi={x:0,y:0,scaleX:1,scaleY:1};function Gi(e){let{children:t}=e;return d.default.createElement(bt.Provider,{value:Cr},d.default.createElement(Wt.Provider,{value:Xi},t))}var Ji={position:"fixed",touchAction:"none"},Zi=e=>Ot(e)?"transform 250ms ease":void 0,Qi=(0,d.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:o,children:i,className:s,rect:a,style:l,transform:u,transition:f=Zi}=e;if(!a)return null;let c=o?u:{...u,scaleX:1,scaleY:1},v={...Ji,width:a.width,height:a.height,top:a.top,left:a.left,transform:Ke.Transform.toString(c),transformOrigin:o&&r?Xo(r,a):void 0,transition:typeof f=="function"?f(r):f,...l};return d.default.createElement(n,{className:s,style:v,ref:t},i)}),es=e=>t=>{let{active:n,dragOverlay:r}=t,o={},{styles:i,className:s}=e;if(i!=null&&i.active)for(let[a,l]of Object.entries(i.active))l!==void 0&&(o[a]=n.node.style.getPropertyValue(a),n.node.style.setProperty(a,l));if(i!=null&&i.dragOverlay)for(let[a,l]of Object.entries(i.dragOverlay))l!==void 0&&r.node.style.setProperty(a,l);return s!=null&&s.active&&n.node.classList.add(s.active),s!=null&&s.dragOverlay&&r.node.classList.add(s.dragOverlay),function(){for(let[l,u]of Object.entries(o))n.node.style.setProperty(l,u);s!=null&&s.active&&n.node.classList.remove(s.active)}},ts=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:Ke.Transform.toString(t)},{transform:Ke.Transform.toString(n)}]},ns={duration:250,easing:"ease",keyframes:ts,sideEffects:es({styles:{active:{opacity:"0"}}})};function rs(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:o}=e;return at((i,s)=>{if(t===null)return;let a=n.get(i);if(!a)return;let l=a.node.current;if(!l)return;let u=Ir(s);if(!u)return;let{transform:f}=V(s).getComputedStyle(s),c=gr(f);if(!c)return;let v=typeof t=="function"?t:os(t);return yr(l,o.draggable.measure),v({active:{id:i,data:a.data,node:l,rect:o.draggable.measure(l)},draggableNodes:n,dragOverlay:{node:s,rect:o.dragOverlay.measure(u)},droppableContainers:r,measuringConfiguration:o,transform:c})})}function os(e){let{duration:t,easing:n,sideEffects:r,keyframes:o}={...ns,...e};return i=>{let{active:s,dragOverlay:a,transform:l,...u}=i;if(!t)return;let f={x:a.rect.left-s.rect.left,y:a.rect.top-s.rect.top},c={scaleX:l.scaleX!==1?s.rect.width*l.scaleX/a.rect.width:1,scaleY:l.scaleY!==1?s.rect.height*l.scaleY/a.rect.height:1},v={x:l.x-f.x,y:l.y-f.y,...c},m=o({...u,active:s,dragOverlay:a,transform:{initial:l,final:v}}),[x]=m,k=m[m.length-1];if(JSON.stringify(x)===JSON.stringify(k))return;let S=r?.({active:s,dragOverlay:a,...u}),w=a.node.animate(m,{duration:t,easing:n,fill:"forwards"});return new Promise(p=>{w.onfinish=()=>{S?.(),p()}})}}var ir=0;function is(e){return(0,d.useMemo)(()=>{if(e!=null)return ir++,ir},[e])}var Rr=d.default.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:o,transition:i,modifiers:s,wrapperElement:a="div",className:l,zIndex:u=999}=e,{activatorEvent:f,active:c,activeNodeRect:v,containerNodeRect:m,draggableNodes:x,droppableContainers:k,dragOverlay:S,over:w,measuringConfiguration:p,scrollableAncestors:I,scrollableAncestorRects:O,windowRect:C}=Hi(),T=(0,d.useContext)(Wt),D=is(c?.id),A=Dr(s,{activatorEvent:f,active:c,activeNodeRect:v,containerNodeRect:m,draggingNodeRect:S.rect,over:w,overlayNodeRect:S.rect,scrollableAncestors:I,scrollableAncestorRects:O,transform:T,windowRect:C}),g=vn(v),M=rs({config:r,draggableNodes:x,droppableContainers:k,measuringConfiguration:p}),W=g?S.setRef:void 0;return d.default.createElement(Gi,null,d.default.createElement(Vi,{animation:M},c&&D?d.default.createElement(Qi,{key:D,id:c.id,ref:W,as:a,activatorEvent:f,adjustScale:t,className:l,transition:i,rect:g,style:{zIndex:u,...o},transform:A},n):null))});function j(e,t={},n="default"){return fetch("/api/kanban",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:n}})}).then(r=>r.json()).catch(r=>({ok:!1,error:String(r&&r.message||r)}))}var De=null,hn=new Set,Or=new Set,bn=new Set,Lr=new Set;function Br(e){De=e}function wn(e){return e.settings&&e.settings.confirmRequired?"This board REQUIRES human confirmation: never move the item to Done \u2014 finish via Review and let the human complete it.":"When the task is fully complete: move the item In Progress -> Done."}function Mr(){return"If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."}var yn=()=>"Scope limit: execute ONLY the work described in this item. If other work surfaces (other items, side tasks, extra refactors), do not start it \u2014 mention it in the conversation and let the human queue a separate item.",xn=e=>`At the end of EVERY turn, set your status with kanban_set_status (id: ${e.id}): max 2 sentences \u2014 what is done, what is next or what you need from the human. The human sees it when hovering your card on the board.`;function kn(e,t){return[`Kanban pickup: item ${t.id} "${t.name}" was moved to To Do by the human.`,"","Workflow:",`1. Read it with kanban_get_item (id: ${t.id}).`,"2. Confirm pickup: move it To Do -> In Progress (kanban_move_item).","3. Do the work, narrating your progress and decisions in this conversation.","4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",`5. ${wn(e)}`,"",Mr(),yn(),xn(t),`Always reference the item by id ${t.id}. Never modify other items.`].join(`
    `)}function Pr(e,t){return[`Kanban requeue: item ${t.id} "${t.name}" was moved back to To Do by the human.`,"Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",wn(e),"",Mr(),yn(),xn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}function ss(e,t){return[`Kanban: the human returned item ${t.id} "${t.name}" to In Progress.`,"Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",wn(e),"",yn(),xn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}async function as(e,t,n){if(n.sessionId)return n.sessionId;if(!De)return null;try{let r=await De.createSession(e);return await j("setSession",{id:n.id,sessionId:r},e),await j("assignItem",{id:n.id,assignee:"\u0410\u0433\u0435\u043D\u0442 \xB7 "+String(r).slice(0,8)},e),n.sessionId=r,r}catch(r){return console.warn("dsh-kanban: session create failed for "+n.id,r),null}}async function Ft(e,t,n,r){if(!(!De||bn.has(n.id))){bn.add(n.id);try{let o=await as(e,t,n);if(!o)return;let i=t.items.find(s=>s.id===n.id)??n;await De.renameSession(o,`${i.id} \xB7 ${i.name}`),await De.promptSession(o,r(t,i))}catch(o){console.warn("dsh-kanban: agent drive failed for "+n.id,o)}finally{bn.delete(n.id)}}}async function ls(e){if(!(!De||Lr.has(e))){Lr.add(e);try{await De.archiveSession(e)}catch(t){console.warn("dsh-kanban: session archive failed for "+e,t)}}}function _t(e,t){let n=Array.isArray(t.activities)?t.activities:[];if(!Or.has(e)){Or.add(e);for(let r of n)hn.add(r.id);for(let r of t.items)r.columnId==="todo"&&r.draft!==!0&&!r.sessionId&&Ft(e,t,r,kn);return}for(let r of n){if(hn.has(r.id))continue;if(hn.add(r.id),r.type==="item_deleted"&&r.sessionId){ls(r.sessionId);continue}if(r.source!=="human")continue;let o=t.items.find(i=>i.id===r.itemId);o&&(r.type==="item_moved"&&(r.to==="todo"?Ft(e,t,o,o.sessionId?Pr:kn):r.to==="in_progress"&&r.from==="review"&&Ft(e,t,o,ss)),r.type==="item_draft"&&r.to==="ready"&&Ft(e,t,o,o.sessionId?Pr:kn))}}var Xe=["backlog","todo","in_progress","review","done"],se={backlog:"\u0411\u0435\u043A\u043B\u043E\u0433",todo:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C",in_progress:"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",review:"\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435",done:"\u0413\u043E\u0442\u043E\u0432\u043E"},zr=["low","normal","high","urgent"],qt={low:"\u041D\u0438\u0437\u043A\u0438\u0439",normal:"\u041E\u0431\u044B\u0447\u043D\u044B\u0439",high:"\u0412\u044B\u0441\u043E\u043A\u0438\u0439",urgent:"\u0421\u0440\u043E\u0447\u043D\u043E"};var cs=e=>se[String(e)]||String(e||"");function de(e){if(!e)return"";let t=new Date(e).getTime();if(!Number.isFinite(t))return"";let n=Math.max(0,(Date.now()-t)/1e3);return n<5?"just now":n<60?`${Math.floor(n)} seconds ago`:n<120?"1 minute ago":n<3600?`${Math.floor(n/60)} minutes ago`:n<7200?"1 hour ago":n<86400?`${Math.floor(n/3600)} hours ago`:`${Math.floor(n/86400)} days ago`}function Wr(e){let t=e.source==="agent"?"harness":"you";switch(e.type){case"item_moved":return`${t} moved to ${cs(e.to)}`;case"item_created":return`${t} created`;case"item_updated":return`${t} edited`;case"item_deleted":return`${t} deleted`;default:return`${t} ${e.type.replace(/_/g," ")}`}}function Fr(e){return`${Wr(e)} (${de(e.ts)})`}function _r(e){return{phrase:Wr(e),time:de(e.ts)}}var qr="dsh-kanban-flow.clickOpensBoard",Sn="dsh-kanban-flow:clickPrefChanged",$r="dsh-kanban-flow.confirmArchive",In="dsh-kanban-flow:archiveConfirmChanged";function $t(){try{let e=localStorage.getItem(qr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function jr(e){try{localStorage.setItem(qr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(Sn))}function Kr(e){return window.addEventListener(Sn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(Sn,e),window.removeEventListener("storage",e)}}function jt(){try{let e=localStorage.getItem($r);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Hr(e){try{localStorage.setItem($r,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(In))}function Kt(e){return window.addEventListener(In,e),window.addEventListener("storage",e),()=>{window.removeEventListener(In,e),window.removeEventListener("storage",e)}}var Ee=require("react");function Yr(e){let{override:t,currentSessionId:n,workspaceItems:r,recentWorkspaceId:o}=e,i=Array.isArray(r)?r:[],s=v=>v?i.find(m=>m&&m.workspaceId===v):void 0,a=n?i.find(v=>v&&Array.isArray(v.sessionIds)&&v.sessionIds.includes(n)):void 0,l=a?a.workspaceId:void 0,u=t!=null&&t.workspaceId!==l&&(t.hostSessionId===void 0||t.hostSessionId===n)?t:void 0,f=u?s(u.workspaceId):void 0,c=f||a||s(o);return{workspaceId:c?c.workspaceId:o||"default",workspaceTitle:c?c.title:void 0,pinned:f!==void 0,nativeWorkspaceId:l}}function Ur(e,t,n=0){if(!Array.isArray(e))return null;let r=0;for(let o of e)if(!(!o||o.title!==t)){if(r===n)return o.workspaceId;r+=1}return null}var Yt="data-kf-kanban",Xt="Board",kt=null,Je=!1,Ge=!1;function ds(){return Je}function Xr(e){kt&&kt(e)}function Nn(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="tab"]'))}function Dn(){return Nn().find(e=>(e.textContent||"").trim()===Xt)}function Ut(){let e=Dn();return!!e&&e.getAttribute("aria-selected")==="true"}function Vr(e=4e3){if(typeof document>"u")return;let t=Date.now()+e,n=()=>{let r=Dn();if(r){r.click();return}Date.now()<t&&window.setTimeout(n,120)};n()}function Gr(){let e=Nn().find(t=>(t.textContent||"").trim()!==Xt);e&&e.click()}function Vt(){if(typeof document>"u"||Ge)return;Ge=!0;let e=Date.now()+2500,t=()=>{if(Je){Ge=!1;return}let n=Dn();if(!n||n.getAttribute("aria-selected")!=="true"){Ge=!1;return}let r=Nn().find(o=>(o.textContent||"").trim()!==Xt);if(r){r.click(),Ge=!1;return}if(Date.now()<e){window.setTimeout(t,120);return}Ge=!1};t()}function Jr(){return(0,Ee.useEffect)(()=>{if(typeof document>"u")return;let e=t=>{if(ds()||!(t.target instanceof Element))return;let n=t.target.closest('[role="tab"]');n&&(n.textContent||"").trim()===Xt&&n.getAttribute("aria-selected")==="true"&&(t.stopImmediatePropagation(),t.preventDefault(),Gr())};return document.addEventListener("click",e,!0),()=>document.removeEventListener("click",e,!0)},[]),null}function Ht(e,t){if(!t||!e?.list)return;let n=e.list.getSnapshot()?.items;if(!Array.isArray(n))return;let r=n.find(o=>o&&Array.isArray(o.sessionIds)&&o.sessionIds.includes(t));return r?r.workspaceId:void 0}var Ae=null,Cn=new Set;function Zr(){return Ae??void 0}function wt(e){if(!(Ae===null&&e===null||Ae!==null&&e!==null&&Ae.workspaceId===e.workspaceId&&Ae.hostSessionId===e.hostSessionId)){Ae=e;for(let n of Cn)n()}}function Qr(e){return Cn.add(e),()=>{Cn.delete(e)}}function eo({workspaces:e,sessions:t}){return(0,Ee.useEffect)(()=>{if(!e||!t)return;let n=()=>t.list.getSnapshot(),r=c=>{if(c===void 0)return!1;let v=n().byId;return!!(v&&v[c]&&v[c].blank===!1)},o=()=>{let c=n().current;return r(c)?c:void 0},i=()=>{let c=e.list?.getSnapshot?.();return new Set(Array.isArray(c?.archivedSessionIds)?c.archivedSessionIds:[])},s=c=>{let v=e.list?.getSnapshot?.()?.items,m=Array.isArray(v)?v.find(k=>k&&k.workspaceId===c):void 0;if(!m||!Array.isArray(m.sessionIds))return;let x=i();return m.sessionIds.find(k=>r(k)&&!x.has(k))},a=()=>{let c=n(),v=i();for(let m of c.ids??[])if(r(m)&&!v.has(m))return m},l=(c,v,m=6e3)=>{if(c()){v();return}let x=!1,k=()=>{x||(x=!0,S(),typeof w=="function"&&w(),window.clearTimeout(p),v())},S=t.list.subscribe(()=>{c()&&k()}),w=e.list?.subscribe?.(()=>{c()&&k()}),p=window.setTimeout(k,m)},u=()=>{Ut()||Vr(),window.setTimeout(()=>{Je=!1},600)},f=c=>{let v=(w,p)=>{console.info(`[dsh-kanban-flow] open case ${w}:`,JSON.stringify({target:c,current:o()??null,actualCurrent:n().current??null,override:Ae,boardTabActive:Ut(),...p}))},m=o();if(m!==void 0){let w=Ae?.workspaceId??Ht(e,m);if(w===c){v("1-toggle",{effective:w}),Ut()?Gr():Vr();return}}Je=!0;let x=s(c);if(x!==void 0){v("2-native",{targetSession:x}),wt(null),t.open&&t.open(x),l(()=>n().current===x,u);return}if(m!==void 0){v("3-pin-current"),wt({workspaceId:c,hostSessionId:m}),u();return}let k=Ht(e,n().current),S=(k!==void 0?s(k):void 0)??a();if(S!==void 0){v("4-borrow",{borrowed:S,currentWorkspaceId:k}),wt({workspaceId:c,hostSessionId:S}),n().current===S?u():(t.open&&t.open(S),l(()=>n().current===S,u));return}v("5-seed"),e.startSession(c),l(()=>{let w=n().current;return w!==void 0&&Ht(e,w)===c},()=>{let w=n().current;if(w===void 0||Ht(e,w)!==c){Je=!1;return}let I=(t.binding?t.binding(w):void 0)?.session.prompt([{type:"text",text:'Kanban board bootstrap: reply with the single word "ready".'}],"queue");Promise.resolve(I).catch(O=>console.warn("dsh-kanban-flow: board seed prompt failed",O)),l(()=>o()!==void 0,u,2e4)},1e4)};return kt=f,()=>{kt===f&&(kt=null)}},[e,t]),null}function to({sessions:e}){return(0,Ee.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"]');!r||r.hasAttribute("aria-expanded")||n.target.closest("button")||Ut()&&Vt()};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[]),(0,Ee.useEffect)(()=>{if(!e?.list)return;let t=e.list.getSnapshot()?.current;return e.list.subscribe(()=>{let r=e.list.getSnapshot()?.current;r!==t&&(t=r,Je||Vt())})},[e]),null}function no(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="treeitem"][aria-expanded]')).filter(t=>yt(t)!==null)}function yt(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if((n.textContent||"").trim()!==""&&n.querySelector("button")===null&&n.querySelector("svg")===null)return n;return null}function us(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if(n.querySelector("button")!==null)return n;return null}function fs(e,t){if(!(t instanceof Element))return!1;let n=t.closest("span");return!n||!e.contains(n)?!1:n.querySelector("svg")!==null&&n.querySelector("button")===null&&(n.textContent||"").trim()===""}function ro(e,t){let n=yt(t);if(!n)return null;let r=(n.textContent||"").trim(),o=e?.list?.getSnapshot?.()?.items;if(!Array.isArray(o))return null;let i=0;for(let s of no()){if(s===t)break;let a=yt(s);a&&(a.textContent||"").trim()===r&&(i+=1)}return Ur(o,r,i)}function ps(){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none");for(let[t,n]of[[1.5,12],[6,8],[10.5,5]]){let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",String(t)),r.setAttribute("y","2"),r.setAttribute("width","4"),r.setAttribute("height",String(n)),r.setAttribute("rx","1.4"),r.setAttribute("fill","currentColor"),e.appendChild(r)}return e}function oo({workspaces:e}){return(0,Ee.useEffect)(()=>{if(typeof document>"u")return;let t=!1,n=()=>{if(!t)for(let i of no()){let s=yt(i),a=us(i);if(!s||!a||a.querySelector(`[${Yt}]`))continue;let l=ro(e,i);if(!l)continue;let u=(s.textContent||"").trim(),f=document.createElement("button");f.type="button",f.setAttribute(Yt,""),f.className="kf-sidebar-icon",f.title=`Open kanban board (${u})`,f.setAttribute("aria-label",`Open kanban board for ${u}`),f.appendChild(ps()),f.addEventListener("click",c=>{c.stopPropagation(),c.preventDefault(),Xr(l)}),a.appendChild(f)}},r=new MutationObserver(()=>n());r.observe(document.documentElement,{childList:!0,subtree:!0});let o=e?.list?.subscribe?.(()=>n());return n(),()=>{t=!0,r.disconnect(),typeof o=="function"&&o();for(let i of Array.from(document.querySelectorAll(`[${Yt}]`)))i.remove()}},[e]),null}function io({workspaces:e}){return(0,Ee.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!$t()||!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"][aria-expanded]');if(!r||!yt(r)||fs(r,n.target)||n.target.closest("button")&&!n.target.closest(`[${Yt}]`))return;let i=ro(e,r);i&&(n.stopPropagation(),n.preventDefault(),Xr(i))};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[e]),null}function so({workspaces:e}){return(0,Ee.useEffect)(()=>{if(!e?.list||typeof e.list.getSnapshot!="function")return;let t=!1,n=new Set(e.list.getSnapshot()?.archivedSessionIds??[]),r=async()=>{if(t)return;let i=e.list.getSnapshot(),s=new Set(i?.archivedSessionIds??[]),a=[...s].filter(l=>!n.has(l));if(n=s,a.length!==0){for(let l of Array.isArray(i?.items)?i.items:[])if(!(!l||!l.workspaceId))try{let f=(await j("get",{},l.workspaceId))?.board?.items??[];for(let c of f)c.sessionId&&a.includes(c.sessionId)&&await j("deleteItem",{id:c.id},l.workspaceId)}catch{}}},o=e.list.subscribe(()=>{r()});return()=>{t=!0,o()}},[e]),null}var Gt=require("react"),ae=require("react/jsx-runtime");function ao({item:e,onConfirm:t,onCancel:n}){let r=(0,Gt.useRef)(null);return(0,Gt.useEffect)(()=>{r.current?.focus();let o=i=>{i.key==="Escape"&&n(),i.key==="Enter"&&t()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[t,n]),(0,ae.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:o=>{o.target===o.currentTarget&&n()},children:(0,ae.jsxs)("div",{className:"kf-dialog",role:"alertdialog","aria-label":"Archive "+e.id,style:{width:400},children:[(0,ae.jsx)("div",{className:"kf-dialog-head",children:(0,ae.jsx)("span",{className:"kf-dialog-title",children:"Archive item?"})}),(0,ae.jsxs)("div",{className:"kf-dialog-body",children:[(0,ae.jsxs)("div",{className:"kf-muted",children:["Archive ",(0,ae.jsx)("strong",{children:e.id})," \u201C",e.name,"\u201D? The item will be removed from the board",e.sessionId?" and its task session archived":"","."]}),(0,ae.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,ae.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,ae.jsx)("button",{type:"button",ref:r,className:"kf-btn kf-danger",onClick:t,children:"Archive"})]})]})]})})}var xt=require("react");var L=require("react/jsx-runtime"),gs=e=>se[e]||e;function lo(e){let{item:t,board:n,onOpenChange:r,onSave:o,onDelete:i,onOpenSession:s,sessions:a}=e,[l,u]=(0,xt.useState)(t?t.name:""),[f,c]=(0,xt.useState)(t?t.description:"");if((0,xt.useEffect)(()=>{u(t?t.name:""),c(t?t.description:"")},[t&&t.id]),!t)return null;let v=n.activities.filter(m=>m.itemId===t.id);return(0,L.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:m=>{m.target===m.currentTarget&&r(!1)},children:(0,L.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Item "+t.id,children:[(0,L.jsxs)("div",{className:"kf-dialog-head",children:[(0,L.jsx)("span",{className:"kf-code-chip",children:t.id}),(0,L.jsx)("span",{className:"kf-dialog-title",children:t.name}),(0,L.jsx)("span",{className:"kf-spacer"}),t.sessionId&&a&&(0,L.jsx)("button",{type:"button",className:"kf-btn",onClick:()=>s(t),children:"Open task session"}),(0,L.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Close","aria-label":"Close item dialog",onClick:()=>r(!1),children:"\u2715"})]}),(0,L.jsxs)("div",{className:"kf-dialog-body",children:[(0,L.jsxs)("div",{className:"kf-muted",children:["In ",(0,L.jsx)("strong",{children:gs(t.columnId)}),t.sessionId?" \xB7 linked to a task session":""]}),t.statusNote&&(0,L.jsxs)("div",{className:"kf-status-box",children:[(0,L.jsxs)("div",{className:"kf-fieldlabel",children:["Status",t.statusAt?" \xB7 "+de(t.statusAt):""]}),(0,L.jsx)("div",{children:t.statusNote})]}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Name"}),(0,L.jsx)("input",{className:"kf-input",value:l,onChange:m=>u(m.target.value)})]}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Description"}),(0,L.jsx)("textarea",{className:"kf-textarea",value:f,onChange:m=>c(m.target.value)})]}),(0,L.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-start"},children:[(0,L.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:()=>o({name:l,description:f}),children:"Save"}),(0,L.jsx)("button",{type:"button",className:"kf-btn kf-danger",onClick:()=>i(t.id),children:"Delete item"})]}),t.sessionId&&(0,L.jsx)("div",{className:"kf-muted",children:"Deleting this item also archives its task session."}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Activity"}),v.length===0&&(0,L.jsx)("div",{className:"kf-muted",children:"No activity yet."}),v.slice().reverse().map(m=>(0,L.jsx)("div",{className:"kf-activity-row",children:(0,L.jsx)("span",{children:Fr(m)})},m.id))]})]})]})})}var Ze=require("react"),X=require("react/jsx-runtime");function co({code:e,itemCount:t,onConfirm:n,onDismiss:r}){let[o,i]=(0,Ze.useState)(e),s=(0,Ze.useRef)(null);(0,Ze.useEffect)(()=>{s.current?.focus(),s.current?.select()},[]);let a=o.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(a);return(0,X.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:u=>{u.target===u.currentTarget&&r()},children:(0,X.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Board code",style:{width:400},children:[(0,X.jsx)("div",{className:"kf-dialog-head",children:(0,X.jsx)("span",{className:"kf-dialog-title",children:"Name your board"})}),(0,X.jsxs)("div",{className:"kf-dialog-body",children:[(0,X.jsxs)("div",{className:"kf-muted",children:["Pick a short code (2\u20136 letters/digits) for this workspace's board. New items get ids like"," ",(0,X.jsx)("strong",{children:(a.length>=2?a:"XX")+"-1"}),".",t>0&&" Existing item ids stay unchanged."]}),(0,X.jsxs)("div",{children:[(0,X.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,X.jsx)("input",{ref:s,className:"kf-input",style:{fontFamily:"var(--ds-font-family-code)",textTransform:"uppercase",fontSize:16,letterSpacing:"0.08em"},value:o,onChange:u=>i(u.target.value.toUpperCase()),onKeyDown:u=>{u.key==="Enter"&&l&&n(a),u.key==="Escape"&&r()},maxLength:6})]}),(0,X.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,X.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:r,children:"Decide later"}),(0,X.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!l,onClick:()=>n(a),children:["Use ",a||"\u2026"]})]})]})]})})}var we=require("react");var P=require("react/jsx-runtime");function An({on:e,onToggle:t,label:n}){return(0,P.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":n,className:"kf-switch"+(e?" kf-on":""),onClick:t,children:(0,P.jsx)("span",{className:"kf-switch-thumb"})})}function uo({board:e,onCode:t,onConfirmRequired:n,onClose:r}){let o=(0,we.useRef)(null),[i,s]=(0,we.useState)(e.code);(0,we.useEffect)(()=>{let f=c=>{o.current&&!o.current.contains(c.target)&&r()};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[r]);let a=i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(a),u=!!(e.settings&&e.settings.confirmRequired);return(0,P.jsxs)("div",{className:"kf-pop",ref:o,role:"dialog","aria-label":"Board settings",children:[(0,P.jsxs)("div",{className:"kf-toggle-row",children:[(0,P.jsx)(An,{on:u,onToggle:()=>n(!u),label:"Require confirmation to complete work"}),(0,P.jsxs)("div",{className:"kf-toggle-text",children:[(0,P.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to complete work"}),(0,P.jsx)("div",{className:"kf-toggle-sub",children:"On: the agent must send finished work through Review \u2014 it can never move items to Done. You complete by dragging to Done."})]})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,P.jsxs)("div",{className:"kf-code-row",children:[(0,P.jsx)("input",{className:"kf-input",value:i,maxLength:6,onChange:f=>s(f.target.value.toUpperCase())}),(0,P.jsx)("button",{type:"button",className:"kf-btn",disabled:!l||a===e.code,onClick:()=>t(a),children:"Save"})]}),(0,P.jsxs)("div",{className:"kf-toggle-sub",style:{marginTop:4},children:["Prefixes new item ids (",e.code,"-1, ",e.code,"-2\u2026). Existing ids stay unchanged. The workspace-click preference lives in Settings \u2192 Plugins \u2192 Kanban Flow."]})]})]})}function fo(){let e=(0,we.useSyncExternalStore)(Kr,$t),t=(0,we.useSyncExternalStore)(Kt,jt);return(0,P.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:520},children:[(0,P.jsxs)("div",{className:"kf-toggle-row",children:[(0,P.jsx)(An,{on:e,onToggle:()=>jr(!e),label:"Workspace click opens board"}),(0,P.jsxs)("div",{className:"kf-toggle-text",children:[(0,P.jsx)("div",{className:"kf-toggle-title",children:"Workspace click opens board"}),(0,P.jsx)("div",{className:"kf-toggle-sub",children:"New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its conversation (the folder icon still expands the session list). Old: clicking a workspace expands its session list."})]})]}),(0,P.jsxs)("div",{className:"kf-toggle-row",children:[(0,P.jsx)(An,{on:t,onToggle:()=>Hr(!t),label:"Require confirmation to archive items"}),(0,P.jsxs)("div",{className:"kf-toggle-text",children:[(0,P.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to archive items"}),(0,P.jsx)("div",{className:"kf-toggle-sub",children:"On: archiving an item from its card first opens a confirmation dialog describing what will be removed. Off: the card's archive button removes the item (and archives its task session) immediately."})]})]}),(0,P.jsx)("div",{className:"kf-muted",children:"Board-specific options \u2014 \u201CRequire confirmation to complete work\u201D and the board code \u2014 live in the gear menu of each board (Board tab \u2192 \u2699)."})]})}var h=require("react/jsx-runtime"),ms=e=>{let t=fr(e);if(t.length>0)return t;let n=gn(e);return n.length>0?n:ur(e)};function Qe({path:e,size:t=15}){return(0,h.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,h.jsx)("path",{d:e})})}var vs="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",hs="M5 12h14M12 5v14",bs="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",ks="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",ws="M2 4h20v4H2zM3 8v12h18V8 M10 12h4";function ys(e){if(!e)return"";let t=Date.now()-new Date(e).getTime();if(!Number.isFinite(t)||t<0)return"";let n=Math.floor(t/6e4);if(n<1)return"<1 \u043C\u0438\u043D";if(n<60)return n+" \u043C\u0438\u043D";let r=Math.floor(n/60);return r<24?r+" \u0447 "+n%60+" \u043C\u0438\u043D":Math.floor(r/24)+" \u0434 "+r%24+" \u0447"}function xs({item:e,flash:t,lastActivity:n,stepCount:r,onOpenSession:o,onDetails:i,onReady:s,onArchive:a}){let{attributes:l,listeners:u,setNodeRef:f,isDragging:c}=Er({id:e.id}),[v,m]=(0,E.useState)(!1),[x,k]=(0,E.useState)(null),S=(0,E.useRef)(null),w=(0,E.useRef)(null),p=e.statusNote?{title:"Status",body:e.statusNote,time:de(e.statusAt)}:null,I=()=>{c||!p||(w.current!==null&&window.clearTimeout(w.current),w.current=window.setTimeout(()=>{let C=S.current;if(!C)return;let T=C.getBoundingClientRect();k({left:T.left,top:T.top,width:T.width}),m(!0)},300))},O=()=>{w.current!==null&&(window.clearTimeout(w.current),w.current=null),m(!1)};return(0,E.useEffect)(()=>()=>{w.current!==null&&window.clearTimeout(w.current)},[]),(0,E.useEffect)(()=>{c&&O()},[c]),(0,h.jsxs)("div",{ref:C=>{S.current=C,f(C)},...l,...u,className:"kf-card"+(t?" kf-agent-flash":"")+(e.sessionId?" kf-has-session":"")+(c?" kf-dragging":"")+" kf-priority-"+(e.priority||"normal"),style:{"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},onMouseEnter:I,onMouseLeave:O,onFocus:I,onBlur:O,onClick:C=>{C.target.closest(".kf-edit-fab, .kf-archive-fab, .kf-ready-btn, .kf-session-badge")||i()},children:[(0,h.jsx)("button",{type:"button",className:"kf-edit-fab",title:"\u0414\u0435\u0442\u0430\u043B\u0438","aria-label":"\u0414\u0435\u0442\u0430\u043B\u0438 "+e.id,onClick:C=>{C.stopPropagation(),i()},children:(0,h.jsx)(Qe,{path:vs,size:13})}),(0,h.jsx)("button",{type:"button",className:"kf-archive-fab",title:"Archive item","aria-label":"Archive "+e.id,onClick:C=>{C.stopPropagation(),a()},children:(0,h.jsx)(Qe,{path:ws,size:13})}),(0,h.jsxs)("div",{className:"kf-card-id",children:[e.id,e.sessionId&&(0,h.jsx)("button",{type:"button",className:"kf-session-badge",title:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E \u0437\u0430\u0434\u0430\u0447\u0438 "+e.sessionId,onClick:C=>{C.stopPropagation(),o()},children:(0,h.jsx)(Qe,{path:ks,size:11})}),e.draft&&(0,h.jsx)("span",{className:"kf-pill kf-pill-draft",children:"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A"}),e.priority&&e.priority!=="normal"&&(0,h.jsx)("span",{className:"kf-prio kf-prio-"+e.priority,children:qt[e.priority]})]}),(0,h.jsx)("div",{className:"kf-card-name",children:e.name}),(0,h.jsxs)("div",{className:"kf-card-owner",children:[(0,h.jsx)("span",{className:"kf-owner-dot"+(e.assignee?" kf-owner-set":"")}),(0,h.jsx)("span",{className:"kf-owner-name",title:e.assignee?"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: "+e.assignee:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D",children:e.assignee||(e.draft?"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u2014 \u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D":"\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0430\u0433\u0435\u043D\u0442\u0430")}),e.startedAt&&(0,h.jsxs)("span",{className:"kf-card-timer",title:"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",children:["\u23F1 ",ys(e.startedAt)]}),r>0&&(0,h.jsxs)("span",{className:"kf-card-steps",title:"\u0428\u0430\u0433\u043E\u0432 \u043F\u043E \u0437\u0430\u0434\u0430\u0447\u0435",children:[r," \u0448\u0430\u0433(\u043E\u0432)"]})]}),e.stats&&(e.stats.agents>0||e.stats.subagents>0||e.stats.jobs>0)&&(0,h.jsxs)("div",{className:"kf-card-stats",children:[e.stats.agents>0&&(0,h.jsxs)("span",{className:"kf-stat-chip",title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435",children:["\u{1F916} ",e.stats.agents]}),e.stats.subagents>0&&(0,h.jsxs)("span",{className:"kf-stat-chip",title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B",children:["\u{1F465} ",e.stats.subagents]}),e.stats.jobs>0&&(0,h.jsxs)("span",{className:"kf-stat-chip",title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job",children:["\u2699 ",e.stats.jobs]})]}),e.draft&&(0,h.jsx)("button",{type:"button",className:"kf-ready-btn",onClick:C=>{C.stopPropagation(),s()},children:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"}),n&&(0,h.jsxs)("div",{className:"kf-card-activity",children:[(0,h.jsx)("span",{className:"kf-card-activity-phrase",children:n.phrase}),(0,h.jsx)("span",{className:"kf-card-activity-time",children:n.time})]}),v&&p&&x&&(0,po.createPortal)((0,h.jsxs)("div",{className:"kf-card-tip",role:"tooltip",style:{left:x.left,top:x.top,width:x.width,transform:"translateY(calc(-100% - 6px))"},children:[(0,h.jsxs)("div",{className:"kf-card-tip-title",children:[p.title,p.time?" \xB7 "+p.time:""]}),(0,h.jsx)("div",{className:"kf-card-tip-body",children:p.body}),e.sessionId&&(0,h.jsx)("div",{className:"kf-card-tip-hint",children:"Click to open the task session"})]}),document.body)]})}function Ss({columnId:e,onAdd:t,onCancel:n}){let[r,o]=(0,E.useState)(""),[i,s]=(0,E.useState)("");return(0,h.jsxs)("div",{className:"kf-newitem",children:[(0,h.jsx)("input",{className:"kf-input",autoFocus:!0,placeholder:"Item name",value:r,onChange:a=>o(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r.trim()&&t(r,i),a.key==="Escape"&&n()}}),(0,h.jsx)("textarea",{className:"kf-textarea",placeholder:"Description (optional)",value:i,onChange:a=>s(a.target.value)}),(0,h.jsxs)("div",{className:"kf-newitem-row",children:[(0,h.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,h.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!r.trim(),onClick:()=>t(r,i),children:["Add to ",se[e]]})]})]})}function Is({colId:e,highlighted:t,adding:n,items:r,flashIds:o,lastLines:i,stepCounts:s,onAdd:a,onCancelAdd:l,onOpenSession:u,onDetails:f,onReady:c,onArchive:v}){let{setNodeRef:m}=Tr({id:e});return(0,h.jsxs)("div",{className:"kf-column kf-"+e+(t?" kf-over":""),children:[(0,h.jsxs)("div",{className:"kf-column-head",children:[(0,h.jsx)("span",{className:"kf-column-dot"}),(0,h.jsx)("span",{className:"kf-column-title",children:se[e]})]}),(0,h.jsxs)("div",{className:"kf-column-list",ref:m,children:[n&&(0,h.jsx)(Ss,{columnId:e,onAdd:a,onCancel:l}),r.length===0&&!n&&(0,h.jsx)("div",{className:"kf-column-empty",children:"No items"}),r.map(x=>(0,h.jsx)(xs,{item:x,flash:o.has(x.id),lastActivity:i.get(x.id),stepCount:s.get(x.id)||0,onOpenSession:()=>u(x),onDetails:()=>f(x),onReady:()=>c(x),onArchive:()=>v(x)},x.id))]})]})}function go(e){let{workspaceId:t,workspaceTitle:n,sessions:r,archiveSession:o,onOpenTask:i}=e,[s,a]=(0,E.useState)(null),[l,u]=(0,E.useState)(""),[f,c]=(0,E.useState)([]),[v,m]=(0,E.useState)(null),[x,k]=(0,E.useState)(null),[S,w]=(0,E.useState)(!1),[p,I]=(0,E.useState)(!1),[O,C]=(0,E.useState)(null),[T,D]=(0,E.useState)(null),A=(0,E.useSyncExternalStore)(Kt,jt),[g,M]=(0,E.useState)(null),[W,te]=(0,E.useState)(new Set),ne=(0,E.useRef)(null),ue=lr(ar(Ve,{activationConstraint:{distance:6}})),Te=(0,E.useCallback)(b=>{if(b&&b.board){let N={...b.board,activities:Array.isArray(b.board.activities)?b.board.activities:[]},R=ne.current;if(R){let q=new Set;for(let H of N.items){let _e=R.get(H.id);_e&&_e!==H.columnId+"|"+H.name+"|"+H.description&&q.add(H.id)}q.size>0&&(te(q),window.setTimeout(()=>te(new Set),1500))}ne.current=new Map(N.items.map(q=>[q.id,q.columnId+"|"+q.name+"|"+q.description])),a(N),u(""),_t(t,N)}b&&typeof b.error=="string"&&b.error&&u(b.error),Array.isArray(b&&b.warnings)&&b.warnings.length>0&&c(N=>[...N,...b.warnings])},[t]),G=(0,E.useCallback)((b,N={})=>j(b,N,t).then(Te),[t,Te]);(0,E.useEffect)(()=>{let b=!1,N=()=>j("get",{},t).then(q=>{b||Te(q)});N();let R=window.setInterval(N,3e3);return()=>{b=!0,window.clearInterval(R)}},[t,Te]),(0,E.useEffect)(()=>{s&&!s.codeConfirmed&&!S&&w(!0)},[s&&s.codeConfirmed]);let re=(0,E.useCallback)(b=>{if(!b.sessionId||!r)return;let N=r.list?.getSnapshot?.()?.current;if(N!==void 0&&N===b.sessionId){Vt();return}r.open(b.sessionId)},[r]),St=b=>{let N=s?.items.find(R=>R.id===String(b.active.id));N&&C(N)},ve=b=>{let N=b.over?String(b.over.id):null;M(Xe.includes(N)?N:null)},tt=b=>{C(null);let{active:N,over:R}=b;if(!R||!s)return;let q=String(N.id),H=String(R.id),le=Xe.includes(H)?H:s.items.find(fe=>fe.id===H)?.columnId;if(!le)return;let Re=s.items.find(fe=>fe.id===q);!Re||Re.columnId===le||G("moveItem",{id:q,toColumn:le})},It=b=>{v&&(v.item?G("updateItem",{id:v.item.id,name:b.name,description:b.description}):G("createItem",{name:b.name,description:b.description,columnId:v.columnId}),m(null))},he=b=>{if(A){D(b);return}be(b)},be=b=>{G("deleteItem",{id:b.id}),b.sessionId&&o&&o(b.sessionId)},Fe=(0,E.useMemo)(()=>{let b=new Map;for(let N of s?.activities??[])N.itemId&&b.set(N.itemId,_r(N));return b},[s]),Ct=(0,E.useMemo)(()=>{let b=new Map;for(let N of s?.activities??[])N.itemId&&["item_status","item_assigned","item_moved","item_updated","item_draft"].includes(N.type)&&b.set(N.itemId,(b.get(N.itemId)||0)+1);return b},[s]),J=s&&(0,h.jsxs)("div",{className:"kf-header",children:[(0,h.jsxs)("span",{className:"kf-header-title",children:[(0,h.jsx)("span",{className:"kf-code-chip",children:s.code}),n||"\u041A\u0430\u043D\u0431\u0430\u043D"]}),(0,h.jsxs)("span",{className:"kf-count-chip",children:[s.items.length," \u0437\u0430\u0434\u0430\u0447"]}),(0,h.jsxs)("button",{type:"button",className:"kf-btn kf-primary kf-new-item-btn",title:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u0432 \u0431\u0435\u043A\u043B\u043E\u0433\u0435","aria-label":"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u0434\u0430\u0447\u0443 \u0432 \u0431\u0435\u043A\u043B\u043E\u0433\u0435",onClick:()=>i?i({mode:"new",workspaceId:t,workspaceTitle:n,columnId:"backlog"}):k("backlog"),children:[(0,h.jsx)(Qe,{path:hs,size:15}),"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430"]}),(0,h.jsx)("span",{className:"kf-spacer"}),(0,h.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Refresh","aria-label":"Refresh board",onClick:()=>G("get"),children:(0,h.jsx)(Qe,{path:"M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"})}),(0,h.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Board settings","aria-label":"Board settings",onClick:()=>I(b=>!b),children:(0,h.jsx)(Qe,{path:bs})}),p&&(0,h.jsx)(uo,{board:s,onCode:b=>G("setCode",{code:b}).then(()=>w(!1)),onConfirmRequired:b=>G("setConfirmRequired",{value:b}),onClose:()=>I(!1)})]}),Nt=s&&(0,h.jsx)("div",{className:"kf-body",children:(0,h.jsx)("div",{className:"kf-columns",children:Xe.map(b=>{let N=(s.items??[]).filter(R=>R.columnId===b);return(0,h.jsx)(Is,{colId:b,highlighted:g===b&&O!==null,adding:x===b&&b==="backlog",items:N,flashIds:W,lastLines:Fe,stepCounts:Ct,onAdd:(R,q)=>{G("createItem",{name:R,description:q,columnId:"backlog"}),k(null)},onCancelAdd:()=>k(null),onOpenSession:re,onDetails:R=>i?i({mode:"edit",workspaceId:t,workspaceTitle:n,itemId:R.id}):m({item:R,columnId:R.columnId}),onReady:R=>{G("setDraft",{id:R.id,draft:!1})},onArchive:he},b)})})});return(0,h.jsxs)("div",{className:"kf-root",children:[f.length>0&&(0,h.jsxs)("div",{className:"kf-warning",children:[f.map((b,N)=>(0,h.jsx)("div",{children:b},N)),(0,h.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>c([]),children:"Dismiss"})]}),J,l&&(0,h.jsx)("div",{className:"kf-error kf-loading",children:l}),s?(0,h.jsxs)(Ar,{sensors:ue,collisionDetection:ms,onDragStart:St,onDragOver:ve,onDragEnd:tt,children:[Nt,(0,h.jsx)(Rr,{dropAnimation:{duration:220,easing:"cubic-bezier(0.2, 0, 0, 1)"},children:O?(0,h.jsxs)("div",{className:"kf-card kf-drag-ghost",style:{width:240,"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},children:[(0,h.jsx)("div",{className:"kf-card-id",children:O.id}),(0,h.jsx)("div",{className:"kf-card-name",children:O.name})]}):null})]}):!l&&(0,h.jsx)("div",{className:"kf-loading",children:"Loading board\u2026"}),s&&v&&!i&&(0,h.jsx)(lo,{item:v.item,board:s,onOpenChange:b=>{b||m(null)},onSave:It,onDelete:b=>{let N=s.items.find(R=>R.id===b);G("deleteItem",{id:b}),N&&N.sessionId&&o&&o(N.sessionId),m(null)},onOpenSession:re}),T&&(0,h.jsx)(ao,{item:T,onConfirm:()=>{be(T),D(null)},onCancel:()=>D(null)}),s&&S&&(0,h.jsx)(co,{code:s.code,itemCount:s.items.length,onConfirm:b=>G("setCode",{code:b}).then(()=>w(!1)),onDismiss:()=>w(!1)})]})}var F=require("react");var vo=require("react"),et={requestId:0,mode:"new",workspaceId:"",open:!1},En=new Set;function ho(){for(let e of En)e()}function Jt(e){et={...e,requestId:et.requestId+1,open:!0},ho()}function bo(){et.open&&(et={...et,open:!1},ho())}function mo(){return et}function Cs(e){return En.add(e),()=>{En.delete(e)}}function ko(){return(0,vo.useSyncExternalStore)(Cs,mo,mo)}var y=require("react/jsx-runtime");function Tn({icon:e,value:t,title:n}){return t?(0,y.jsxs)("span",{className:"kf-stat-chip",title:n,children:[(0,y.jsx)("span",{"aria-hidden":"true",children:e})," ",t]}):null}function Ns(e){if(!e)return"";let t=Date.now()-new Date(e).getTime();if(!Number.isFinite(t)||t<0)return"";let n=Math.floor(t/6e4);if(n<1)return"<1 \u043C\u0438\u043D";if(n<60)return n+" \u043C\u0438\u043D";let r=Math.floor(n/60);return r<24?r+" \u0447 "+n%60+" \u043C\u0438\u043D":Math.floor(r/24)+" \u0434 "+r%24+" \u0447"}function Zt({label:e,children:t}){return(0,y.jsxs)("label",{className:"kf-field",children:[(0,y.jsx)("span",{className:"kf-field-label",children:e}),t]})}function wo({sessions:e}){let t=ko(),[n,r]=(0,F.useState)(null),[o,i]=(0,F.useState)(""),[s,a]=(0,F.useState)(!1),[l,u]=(0,F.useState)(""),[f,c]=(0,F.useState)(""),[v,m]=(0,F.useState)("normal"),[x,k]=(0,F.useState)(""),[S,w]=(0,F.useState)("todo"),p=(0,F.useMemo)(()=>{if(!(!n||!t.itemId))return n.items.find(g=>g.id===t.itemId)},[n,t.itemId]),I=(0,F.useCallback)(async()=>{if(!t.workspaceId)return;let g=await j("get",{},t.workspaceId);g&&g.board?(r(g.board),i("")):g&&g.error&&i(g.error)},[t.workspaceId]);(0,F.useEffect)(()=>{if(!t.workspaceId)return;let g=!1;I();let M=window.setInterval(()=>{g||I()},3e3);return()=>{g=!0,window.clearInterval(M)}},[t.workspaceId,t.requestId,I]),(0,F.useEffect)(()=>{if(t.mode==="new"){u(""),c(""),m("normal"),k("");return}p&&(u(p.name),c(p.description||""),m(p.priority||"normal"),k((p.labels||[]).join(", ")))},[t.requestId,t.mode,p?.id]);let O=(0,F.useCallback)(async()=>{if(!(!l.trim()||s)){a(!0);try{if(t.mode==="new"){let g=await j("createItem",{name:l.trim(),description:f,columnId:t.columnId||"backlog",draft:!0,priority:v,labels:x.split(",").map(M=>M.trim()).filter(Boolean)},t.workspaceId);g&&g.ok===!1?i(g.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"):g&&g.item&&Jt({mode:"edit",workspaceId:t.workspaceId,workspaceTitle:t.workspaceTitle,itemId:g.item.id})}else if(p){let g=await j("updateItem",{id:p.id,name:l.trim(),description:f,priority:v,labels:x.split(",").map(M=>M.trim()).filter(Boolean)},t.workspaceId);g&&g.ok===!1&&i(g.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")}await I()}finally{a(!1)}}},[s,f,p,x,I,l,v,t,i]),C=(0,F.useCallback)(async()=>{if(!(!p||s)){a(!0);try{let g=await j("setDraft",{id:p.id,draft:!1},t.workspaceId);g&&g.ok===!1&&i(g.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443"),await I()}finally{a(!1)}}},[s,p,I,t.workspaceId]),T=(0,F.useCallback)(async()=>{if(!(!p||s||S===p.columnId)){a(!0);try{let g=await j("moveItem",{id:p.id,toColumn:S},t.workspaceId);g&&g.ok===!1&&i(g.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"),await I()}finally{a(!1)}}},[s,p,I,S,t.workspaceId]),D=(0,F.useCallback)(async()=>{if(!(!p||s)&&window.confirm("\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 "+p.id+"? \u0421\u0435\u0441\u0441\u0438\u044F \u0437\u0430\u0434\u0430\u0447\u0438 \u0431\u0443\u0434\u0435\u0442 \u0430\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0430.")){a(!0);try{let g=await j("deleteItem",{id:p.id},t.workspaceId);g&&g.ok===!1&&i(g.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C"),bo()}finally{a(!1)}}},[s,p,t.workspaceId]),A=(0,F.useMemo)(()=>!n||!p?[]:n.activities.filter(g=>g.itemId===p.id).slice(-8).reverse(),[n,p]);return t.workspaceId?(0,y.jsxs)("div",{className:"kf-task-panel",children:[(0,y.jsxs)("div",{className:"kf-task-panel-head",children:[(0,y.jsxs)("div",{className:"kf-task-panel-title",children:[(0,y.jsx)("span",{className:"kf-task-panel-code",children:p?p.id:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430"}),p&&(0,y.jsx)("span",{className:p.draft?"kf-pill kf-pill-draft":"kf-pill kf-pill-ready",children:p.draft?"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"})]}),p&&(0,y.jsxs)("div",{className:"kf-task-panel-stats",children:[(0,y.jsx)(Tn,{icon:"\u{1F916}",value:p.stats?.agents||0,title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435"}),(0,y.jsx)(Tn,{icon:"\u{1F465}",value:p.stats?.subagents||0,title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B"}),(0,y.jsx)(Tn,{icon:"\u2699",value:p.stats?.jobs||0,title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job"})]})]}),o&&(0,y.jsx)("div",{className:"kf-panel-error",children:o}),t.mode==="new"&&(0,y.jsx)("div",{className:"kf-panel-hint",children:"\u0417\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043A\u0430\u043A \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A. \u041E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0451 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C\xBB, \u043A\u043E\u0433\u0434\u0430 \u0431\u0443\u0434\u0435\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B \u043E\u0442\u0434\u0430\u0442\u044C \u0430\u0433\u0435\u043D\u0442\u0443."}),(0,y.jsx)(Zt,{label:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",children:(0,y.jsx)("input",{className:"kf-input",value:l,placeholder:"\u041A\u043E\u0440\u043E\u0442\u043A\u043E: \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C",onChange:g=>u(g.target.value)})}),(0,y.jsx)(Zt,{label:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",children:(0,y.jsx)("textarea",{className:"kf-textarea",rows:5,value:f,placeholder:"\u0414\u0435\u0442\u0430\u043B\u0438, \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043F\u0440\u0438\u0451\u043C\u043A\u0438, \u0441\u0441\u044B\u043B\u043A\u0438",onChange:g=>c(g.target.value)})}),(0,y.jsxs)("div",{className:"kf-field-row",children:[(0,y.jsx)(Zt,{label:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",children:(0,y.jsx)("select",{className:"kf-input",value:v,onChange:g=>m(g.target.value),children:zr.map(g=>(0,y.jsx)("option",{value:g,children:qt[g]},g))})}),(0,y.jsx)(Zt,{label:"\u041C\u0435\u0442\u043A\u0438",children:(0,y.jsx)("input",{className:"kf-input",value:x,placeholder:"ui, backend",onChange:g=>k(g.target.value)})})]}),p&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"kf-task-panel-meta",children:[(0,y.jsxs)("span",{children:["\u041A\u043E\u043B\u043E\u043D\u043A\u0430: ",(0,y.jsx)("b",{children:se[p.columnId]})]}),(0,y.jsxs)("span",{children:["\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: ",(0,y.jsx)("b",{children:p.assignee||"\u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D"}),p.assignedAt?" \xB7 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D "+de(p.assignedAt):""]}),p.startedAt&&(0,y.jsxs)("span",{children:["\u0412 \u0440\u0430\u0431\u043E\u0442\u0435: ",(0,y.jsx)("b",{children:Ns(p.startedAt)})]}),(0,y.jsxs)("span",{children:["\u0428\u0430\u0433\u043E\u0432: ",(0,y.jsx)("b",{children:A.length})]}),p.createdBy==="agent"?(0,y.jsx)("span",{children:"\u0421\u043E\u0437\u0434\u0430\u043B \u0430\u0433\u0435\u043D\u0442"}):(0,y.jsx)("span",{children:"\u0421\u043E\u0437\u0434\u0430\u043B\u0438 \u0432\u044B"}),p.updatedAt&&(0,y.jsxs)("span",{children:["\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E ",de(p.updatedAt)]})]}),p.statusNote&&(0,y.jsxs)("div",{className:"kf-task-note",children:[(0,y.jsxs)("div",{className:"kf-task-note-title",children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u0433\u0435\u043D\u0442\u0430 \xB7 ",de(p.statusAt)]}),(0,y.jsx)("div",{children:p.statusNote})]})]}),(0,y.jsxs)("div",{className:"kf-task-actions",children:[(0,y.jsx)("button",{type:"button",className:"kf-btn kf-primary",disabled:s||!l.trim(),onClick:()=>{O()},children:t.mode==="new"?"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"}),p&&p.draft&&(0,y.jsx)("button",{type:"button",className:"kf-btn kf-success",disabled:s,onClick:()=>{C()},children:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"}),p&&!p.draft&&p.columnId!=="todo"&&(0,y.jsx)("button",{type:"button",className:"kf-btn kf-ghost",disabled:s,onClick:()=>{j("setDraft",{id:p.id,draft:!0},t.workspaceId).then(()=>I())},children:"\u0412 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A"}),p&&p.sessionId&&e&&(0,y.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>e.open(p.sessionId),children:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"})]}),p&&(0,y.jsxs)("div",{className:"kf-task-move",children:[(0,y.jsx)("select",{className:"kf-input",value:S,onChange:g=>w(g.target.value),children:Xe.map(g=>(0,y.jsx)("option",{value:g,children:se[g]},g))}),(0,y.jsx)("button",{type:"button",className:"kf-btn kf-ghost",disabled:s||S===p.columnId,onClick:()=>{T()},children:"\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"}),(0,y.jsx)("button",{type:"button",className:"kf-btn kf-danger",disabled:s,onClick:()=>{D()},children:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C"})]}),p&&A.length>0&&(0,y.jsxs)("div",{className:"kf-task-activity",children:[(0,y.jsx)("div",{className:"kf-task-activity-title",children:"\u0418\u0441\u0442\u043E\u0440\u0438\u044F"}),A.map(g=>(0,y.jsxs)("div",{className:"kf-task-activity-row",children:[(0,y.jsx)("span",{className:"kf-task-activity-icon","aria-hidden":"true",children:g.type==="item_assigned"?"\u{1F464}":g.type==="item_status"?"\u{1F4AC}":g.type==="item_moved"?"\u279C":g.type==="item_created"?"\uFF0B":"\u2022"}),(0,y.jsx)("span",{className:"kf-task-activity-time",children:de(g.ts)}),(0,y.jsx)("span",{className:"kf-task-activity-text",children:g.type==="item_moved"?`\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E ${se[g.from]||g.from} \u2192 ${se[g.to]||g.to}`:g.type==="item_created"?"\u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0430":g.type==="item_draft"?g.to==="ready"?"\u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E \u0432 \u0440\u0430\u0431\u043E\u0442\u0443":"\u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u043E \u0432 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":g.type==="item_status"?"\u0441\u0442\u0430\u0442\u0443\u0441 \u0430\u0433\u0435\u043D\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D":g.type==="item_assigned"?"\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: "+(g.text||"\u0441\u043D\u044F\u0442"):g.type==="item_updated"?"\u0437\u0430\u0434\u0430\u0447\u0430 \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430":g.type})]},g.id))]})]}):(0,y.jsx)("div",{className:"kf-panel-empty",children:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043D\u0430 \u0434\u043E\u0441\u043A\u0435 \xAB\u041A\u0430\u043D\u0431\u0430\u043D\xBB."})}function Ds(e){let t={items:[]};return!e||!e.list||typeof e.list.getSnapshot!="function"?t:(0,z.useSyncExternalStore)(n=>e.list.subscribe(n),()=>e.list.getSnapshot())}function As(e){if(!(!e||!e.list||typeof e.list.getSnapshot!="function"))return(0,z.useSyncExternalStore)(t=>e.list.subscribe(t),()=>e.list.getSnapshot().current)}function Es(e){let t=Ds(e.workspaces),n=(0,z.useSyncExternalStore)(Qr,Zr),r=As(e.sessions)??e.sessionId,o=Yr({override:n,currentSessionId:r,workspaceItems:Array.isArray(t.items)?t.items:[],recentWorkspaceId:t.recentWorkspaceId});(0,z.useEffect)(()=>{n&&o.nativeWorkspaceId===n.workspaceId&&wt(null)},[n,o.nativeWorkspaceId]);let i=e.workspaces?.archiveSession?s=>{e.workspaces.archiveSession(s)}:void 0;return(0,z.createElement)(go,{workspaceId:o.workspaceId,workspaceTitle:o.pinned?o.workspaceTitle||o.workspaceId:o.workspaceTitle,sessions:e.sessions,archiveSession:i,onOpenTask:e.onOpenTask})}function Ts(){return(0,z.createElement)(fo)}function Rs({workspaces:e}){return(0,z.useEffect)(()=>{if(!e||!e.list)return;let t=!1,n=async()=>{let o=e.list.getSnapshot(),i=Array.isArray(o?.items)?o.items:[];for(let s of i){let a=await j("get",{},s.workspaceId);if(t)return;a&&a.board&&_t(s.workspaceId,a.board)}};n();let r=window.setInterval(()=>{n()},5e3);return()=>{t=!0,window.clearInterval(r)}},[e]),null}function Os(e){return(0,z.useEffect)(()=>{let t=e.sessions;t&&Br({createSession:n=>t.create({workspaceId:n}),renameSession:async(n,r)=>{let i=await t.binding(n)?.session.rename(r);i&&i.ok===!1&&console.warn("dsh-kanban: rename failed",i.error)},promptSession:async(n,r)=>{let o=t.binding(n);if(!o)throw new Error("session binding unavailable: "+n);let i=await o.session.prompt([{type:"text",text:r}],"queue");if(i&&i.ok===!1)throw new Error("prompt failed: "+(i.error&&i.error.message))},archiveSession:async n=>{let r=e.workspaces?.archiveSession;if(!r)throw new Error("workspaces.archiveSession unavailable");await r(n)}})},[e.sessions,e.workspaces]),(0,z.createElement)("div",{style:{display:"contents"}},(0,z.createElement)(eo,{workspaces:e.workspaces,sessions:e.sessions}),(0,z.createElement)(to,{workspaces:e.workspaces,sessions:e.sessions}),(0,z.createElement)(Jr),(0,z.createElement)(so,{workspaces:e.workspaces}),(0,z.createElement)(oo,{workspaces:e.workspaces}),(0,z.createElement)(io,{workspaces:e.workspaces}),(0,z.createElement)(Rs,{workspaces:e.workspaces}))}var yo="dsh-kanban/task",xo="dsh-kanban-task",So={name:"dsh-kanban",inject:["slots","workspaces","sessions","sidebarRightTabs"],apply(e){let t=e.get("slots");if(t===void 0)return;let n=e.get("workspaces"),r=e.get("sessions"),o=s=>{Jt({mode:s.mode,workspaceId:s.workspaceId,workspaceTitle:s.workspaceTitle,itemId:s.itemId,columnId:s.columnId});let a=e.get("sidebarRight");if(a&&typeof a.openTab=="function")try{a.openTab(xo)}catch(l){console.warn("dsh-kanban: cannot open task panel",l)}};t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban",order:20,label:"\u041A\u0430\u043D\u0431\u0430\u043D"},s=>(0,z.createElement)(Es,{...s,workspaces:n,sessions:r,onOpenTask:o})));let i=e.get("sidebarRightTabs");if(i&&typeof i.register=="function"){let s=()=>i.register({id:yo,kind:xo,title:()=>"\u0417\u0430\u0434\u0430\u0447\u0430",guide:[{id:"task",order:70,title:()=>"\u0417\u0430\u0434\u0430\u0447\u0430 \u043A\u0430\u043D\u0431\u0430\u043D\u0430",description:()=>"\u0414\u0435\u0442\u0430\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u0434\u0430\u0447\u0438"}]});typeof e.effect=="function"?e.effect(s,"dsh-kanban: sidebar tab"):s()}t.inject("sidebar.right.pane.tab",()=>t.register({name:"sidebar.right.pane.tab",key:yo},()=>(0,z.createElement)(wo,{sessions:r}))),t.inject("settings.plugins.tab",()=>t.register({name:"settings.plugins.tab",id:"dsh-kanban",order:10,label:"\u041A\u0430\u043D\u0431\u0430\u043D"},()=>(0,z.createElement)(Ts))),t.inject("sidebar.footer.action",()=>t.register({name:"sidebar.footer.action",id:"kanban-controllers",order:90},()=>(0,z.createElement)(Os,{workspaces:n,sessions:r})))}};try{console.info("[dsh-kanban] client bundle loaded (build 2026-11-03T14:42:09.660Z)")}catch{}var Io="data-dsh-kanban-style";if(typeof document<"u"&&!document.querySelector("style["+Io+"]")){let e=document.createElement("style");e.setAttribute(Io,""),e.textContent=qn,document.head.appendChild(e)}var Ls=So;
    
    return module.exports
  },
})