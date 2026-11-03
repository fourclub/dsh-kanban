window.__ModuleLoader__.load({
  id: "dsh-kanban",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";var Ro=Object.create;var At=Object.defineProperty;var Oo=Object.getOwnPropertyDescriptor;var Lo=Object.getOwnPropertyNames;var Po=Object.getPrototypeOf,Bo=Object.prototype.hasOwnProperty;var Mo=(e,t)=>{for(var n in t)At(e,n,{get:t[n],enumerable:!0})},Mn=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Lo(t))!Bo.call(e,o)&&o!==n&&At(e,o,{get:()=>t[o],enumerable:!(r=Oo(t,o))||r.enumerable});return e};var zn=(e,t,n)=>(n=e!=null?Ro(Po(e)):{},Mn(t||!e||!e.__esModule?At(n,"default",{value:e,enumerable:!0}):n,e)),zo=e=>Mn(At({},"__esModule",{value:!0}),e);var Rs={};Mo(Rs,{default:()=>Ts});module.exports=zo(Rs);var Wn=`/* dsh-kanban-flow client styles \u2014 kf-* namespace.
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
    `;var q=require("react");var T=require("react"),uo=require("react-dom");var d=zn(require("react")),Me=require("react-dom");var $=require("react");var at=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Oe(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function Tt(e){return"nodeType"in e}function Y(e){var t,n;return e?Oe(e)?e:Tt(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Rt(e){let{Document:t}=Y(e);return e instanceof t}function Ye(e){return Oe(e)?!1:e instanceof Y(e).HTMLElement}function tn(e){return e instanceof Y(e).SVGElement}function Le(e){return e?Oe(e)?e.document:Tt(e)?Rt(e)?e:Ye(e)||tn(e)?e.ownerDocument:document:document:document}var ge=at?$.useLayoutEffect:$.useEffect;function lt(e){let t=(0,$.useRef)(e);return ge(()=>{t.current=e}),(0,$.useCallback)(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function qn(){let e=(0,$.useRef)(null),t=(0,$.useCallback)((r,o)=>{e.current=setInterval(r,o)},[]),n=(0,$.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function Ue(e,t){t===void 0&&(t=[e]);let n=(0,$.useRef)(e);return ge(()=>{n.current!==e&&(n.current=e)},t),n}function Ve(e,t){let n=(0,$.useRef)();return(0,$.useMemo)(()=>{let r=e(n.current);return n.current=r,r},[...t])}function ct(e){let t=lt(e),n=(0,$.useRef)(null),r=(0,$.useCallback)(o=>{o!==n.current&&t?.(o,n.current),n.current=o},[]);return[n,r]}function dt(e){let t=(0,$.useRef)();return(0,$.useEffect)(()=>{t.current=e},[e]),t.current}var en={};function ut(e,t){return(0,$.useMemo)(()=>{if(t)return t;let n=en[e]==null?0:en[e]+1;return en[e]=n,e+"-"+n},[e,t])}function $n(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((i,s)=>{let a=Object.entries(s);for(let[l,u]of a){let f=i[l];f!=null&&(i[l]=f+e*u)}return i},{...t})}}var Pe=$n(1),ft=$n(-1);function Fo(e){return"clientX"in e&&"clientY"in e}function Ot(e){if(!e)return!1;let{KeyboardEvent:t}=Y(e.target);return t&&e instanceof t}function qo(e){if(!e)return!1;let{TouchEvent:t}=Y(e.target);return t&&e instanceof t}function pt(e){if(qo(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return Fo(e)?{x:e.clientX,y:e.clientY}:null}var He=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[He.Translate.toString(e),He.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),Fn="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function _n(e){return e.matches(Fn)?e:e.querySelector(Fn)}var Be=zn(require("react")),$o={display:"none"};function jn(e){let{id:t,value:n}=e;return Be.default.createElement("div",{id:t,style:$o},n)}function Kn(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e,o={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return Be.default.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function Hn(){let[e,t]=(0,Be.useState)("");return{announce:(0,Be.useCallback)(r=>{r!=null&&t(r)},[]),announcement:e}}var rr=(0,d.createContext)(null);function _o(e){let t=(0,d.useContext)(rr);(0,d.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function jo(){let[e]=(0,d.useState)(()=>new Set),t=(0,d.useCallback)(r=>(e.add(r),()=>e.delete(r)),[e]);return[(0,d.useCallback)(r=>{let{type:o,event:i}=r;e.forEach(s=>{var a;return(a=s[o])==null?void 0:a.call(s,i)})},[e]),t]}var Ko={draggable:`
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      `},Ho={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function Yo(e){let{announcements:t=Ho,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=Ko}=e,{announce:i,announcement:s}=Hn(),a=ut("DndLiveRegion"),[l,u]=(0,d.useState)(!1);if((0,d.useEffect)(()=>{u(!0)},[]),_o((0,d.useMemo)(()=>({onDragStart(c){let{active:g}=c;i(t.onDragStart({active:g}))},onDragMove(c){let{active:g,over:p}=c;t.onDragMove&&i(t.onDragMove({active:g,over:p}))},onDragOver(c){let{active:g,over:p}=c;i(t.onDragOver({active:g,over:p}))},onDragEnd(c){let{active:g,over:p}=c;i(t.onDragEnd({active:g,over:p}))},onDragCancel(c){let{active:g,over:p}=c;i(t.onDragCancel({active:g,over:p}))}}),[i,t])),!l)return null;let f=d.default.createElement(d.default.Fragment,null,d.default.createElement(jn,{id:r,value:o.draggable}),d.default.createElement(Kn,{id:a,announcement:s}));return n?(0,Me.createPortal)(f,n):f}var _;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})(_||(_={}));function Pt(){}function or(e,t){return(0,d.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function ir(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,d.useMemo)(()=>[...t].filter(r=>r!=null),[...t])}var ce=Object.freeze({x:0,y:0});function sr(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Uo(e,t){let n=pt(e);if(!n)return"0 0";let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function ar(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function Vo(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function sn(e){let{left:t,top:n,height:r,width:o}=e;return[{x:t,y:n},{x:t+o,y:n},{x:t,y:n+r},{x:t+o,y:n+r}]}function Xo(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}var lr=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=sn(t),i=[];for(let s of r){let{id:a}=s,l=n.get(a);if(l){let u=sn(l),f=o.reduce((g,p,I)=>g+sr(u[I],p),0),c=Number((f/4).toFixed(4));i.push({id:a,data:{droppableContainer:s,value:c}})}}return i.sort(ar)};function Go(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),s=o-r,a=i-n;if(r<o&&n<i){let l=t.width*t.height,u=e.width*e.height,f=s*a,c=f/(l+u-f);return Number(c.toFixed(4))}return 0}var fn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=[];for(let i of r){let{id:s}=i,a=n.get(s);if(a){let l=Go(a,t);l>0&&o.push({id:s,data:{droppableContainer:i,value:l}})}}return o.sort(Vo)};function Jo(e,t){let{top:n,left:r,bottom:o,right:i}=t;return n<=e.y&&e.y<=o&&r<=e.x&&e.x<=i}var cr=e=>{let{droppableContainers:t,droppableRects:n,pointerCoordinates:r}=e;if(!r)return[];let o=[];for(let i of t){let{id:s}=i,a=n.get(s);if(a&&Jo(r,a)){let u=sn(a).reduce((c,g)=>c+sr(r,g),0),f=Number((u/4).toFixed(4));o.push({id:s,data:{droppableContainer:i,value:f}})}}return o.sort(ar)};function Zo(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function dr(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:ce}function Qo(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return o.reduce((s,a)=>({...s,top:s.top+e*a.y,bottom:s.bottom+e*a.y,left:s.left+e*a.x,right:s.right+e*a.x}),{...n})}}var ei=Qo(1);function ur(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function ti(e,t,n){let r=ur(t);if(!r)return e;let{scaleX:o,scaleY:i,x:s,y:a}=r,l=e.left-s-(1-o)*parseFloat(n),u=e.top-a-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,c=i?e.height/i:e.height;return{width:f,height:c,top:u,right:l+f,bottom:u+c,left:l}}var ni={ignoreTransform:!1};function bt(e,t){t===void 0&&(t=ni);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:u,transformOrigin:f}=Y(e).getComputedStyle(e);u&&(n=ti(n,u,f))}let{top:r,left:o,width:i,height:s,bottom:a,right:l}=n;return{top:r,left:o,width:i,height:s,bottom:a,right:l}}function Yn(e){return bt(e,{ignoreTransform:!0})}function ri(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function oi(e,t){return t===void 0&&(t=Y(e).getComputedStyle(e)),t.position==="fixed"}function ii(e,t){t===void 0&&(t=Y(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{let i=t[o];return typeof i=="string"?n.test(i):!1})}function pn(e,t){let n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(Rt(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!Ye(o)||tn(o)||n.includes(o))return n;let i=Y(e).getComputedStyle(o);return o!==e&&ii(o,i)&&n.push(o),oi(o,i)?n:r(o.parentNode)}return e?r(e):n}function fr(e){let[t]=pn(e,1);return t??null}function nn(e){return!at||!e?null:Oe(e)?e:Tt(e)?Rt(e)||e===Le(e).scrollingElement?window:Ye(e)?e:null:null}function pr(e){return Oe(e)?e.scrollX:e.scrollLeft}function gr(e){return Oe(e)?e.scrollY:e.scrollTop}function an(e){return{x:pr(e),y:gr(e)}}var j;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(j||(j={}));function mr(e){return!at||!e?!1:e===document.scrollingElement}function vr(e){let t={x:0,y:0},n=mr(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,i=e.scrollLeft<=t.x,s=e.scrollTop>=r.y,a=e.scrollLeft>=r.x;return{isTop:o,isLeft:i,isBottom:s,isRight:a,maxScroll:r,minScroll:t}}var si={x:.2,y:.2};function ai(e,t,n,r,o){let{top:i,left:s,right:a,bottom:l}=n;r===void 0&&(r=10),o===void 0&&(o=si);let{isTop:u,isBottom:f,isLeft:c,isRight:g}=vr(e),p={x:0,y:0},I={x:0,y:0},h={height:t.height*o.y,width:t.width*o.x};return!u&&i<=t.top+h.height?(p.y=j.Backward,I.y=r*Math.abs((t.top+h.height-i)/h.height)):!f&&l>=t.bottom-h.height&&(p.y=j.Forward,I.y=r*Math.abs((t.bottom-h.height-l)/h.height)),!g&&a>=t.right-h.width?(p.x=j.Forward,I.x=r*Math.abs((t.right-h.width-a)/h.width)):!c&&s<=t.left+h.width&&(p.x=j.Backward,I.x=r*Math.abs((t.left+h.width-s)/h.width)),{direction:p,speed:I}}function li(e){if(e===document.scrollingElement){let{innerWidth:i,innerHeight:s}=window;return{top:0,left:0,right:i,bottom:s,width:i,height:s}}let{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function hr(e){return e.reduce((t,n)=>Pe(t,an(n)),ce)}function ci(e){return e.reduce((t,n)=>t+pr(n),0)}function di(e){return e.reduce((t,n)=>t+gr(n),0)}function br(e,t){if(t===void 0&&(t=bt),!e)return;let{top:n,left:r,bottom:o,right:i}=t(e);fr(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var ui=[["x",["left","right"],ci],["y",["top","bottom"],di]],mt=class{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let r=pn(n),o=hr(r);this.rect={...t},this.width=t.width,this.height=t.height;for(let[i,s,a]of ui)for(let l of s)Object.defineProperty(this,l,{get:()=>{let u=a(r),f=o[i]-u;return this.rect[l]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},ze=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}};function fi(e){let{EventTarget:t}=Y(e);return e instanceof t?e:Le(e)}function rn(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var ie;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(ie||(ie={}));function Un(e){e.preventDefault()}function pi(e){e.stopPropagation()}var B;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(B||(B={}));var kr={start:[B.Space,B.Enter],cancel:[B.Esc],end:[B.Space,B.Enter,B.Tab]},gi=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case B.Right:return{...n,x:n.x+25};case B.Left:return{...n,x:n.x-25};case B.Down:return{...n,y:n.y+25};case B.Up:return{...n,y:n.y-25}}},Bt=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:n}}=t;this.props=t,this.listeners=new ze(Le(n)),this.windowListeners=new ze(Y(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ie.Resize,this.handleCancel),this.windowListeners.add(ie.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(ie.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&br(r),n(ce)}handleKeyDown(t){if(Ot(t)){let{active:n,context:r,options:o}=this.props,{keyboardCodes:i=kr,coordinateGetter:s=gi,scrollBehavior:a="smooth"}=o,{code:l}=t;if(i.end.includes(l)){this.handleEnd(t);return}if(i.cancel.includes(l)){this.handleCancel(t);return}let{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:ce;this.referenceCoordinates||(this.referenceCoordinates=f);let c=s(t,{active:n,context:r.current,currentCoordinates:f});if(c){let g=ft(c,f),p={x:0,y:0},{scrollableAncestors:I}=r.current;for(let h of I){let w=t.code,{isTop:y,isRight:m,isLeft:S,isBottom:C,maxScroll:A,minScroll:O}=vr(h),N=li(h),D={x:Math.min(w===B.Right?N.right-N.width/2:N.right,Math.max(w===B.Right?N.left:N.left+N.width/2,c.x)),y:Math.min(w===B.Down?N.bottom-N.height/2:N.bottom,Math.max(w===B.Down?N.top:N.top+N.height/2,c.y))},v=w===B.Right&&!m||w===B.Left&&!S,M=w===B.Down&&!C||w===B.Up&&!y;if(v&&D.x!==c.x){let W=h.scrollLeft+g.x,te=w===B.Right&&W<=A.x||w===B.Left&&W>=O.x;if(te&&!g.y){h.scrollTo({left:W,behavior:a});return}te?p.x=h.scrollLeft-W:p.x=w===B.Right?h.scrollLeft-A.x:h.scrollLeft-O.x,p.x&&h.scrollBy({left:-p.x,behavior:a});break}else if(M&&D.y!==c.y){let W=h.scrollTop+g.y,te=w===B.Down&&W<=A.y||w===B.Up&&W>=O.y;if(te&&!g.x){h.scrollTo({top:W,behavior:a});return}te?p.y=h.scrollTop-W:p.y=w===B.Down?h.scrollTop-A.y:h.scrollTop-O.y,p.y&&h.scrollBy({top:-p.y,behavior:a});break}}this.handleMove(t,Pe(ft(c,this.referenceCoordinates),p))}}}handleMove(t,n){let{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){let{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){let{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Bt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=kr,onActivation:o}=t,{active:i}=n,{code:s}=e.nativeEvent;if(r.start.includes(s)){let a=i.activatorNode.current;return a&&e.target!==a?!1:(e.preventDefault(),o?.({event:e.nativeEvent}),!0)}return!1}}];function Vn(e){return!!(e&&"distance"in e)}function Xn(e){return!!(e&&"delay"in e)}var vt=class{constructor(t,n,r){var o;r===void 0&&(r=fi(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;let{event:i}=t,{target:s}=i;this.props=t,this.events=n,this.document=Le(s),this.documentListeners=new ze(this.document),this.listeners=new ze(r),this.windowListeners=new ze(Y(s)),this.initialCoordinates=(o=pt(i))!=null?o:ce,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(ie.Resize,this.handleCancel),this.windowListeners.add(ie.DragStart,Un),this.windowListeners.add(ie.VisibilityChange,this.handleCancel),this.windowListeners.add(ie.ContextMenu,Un),this.documentListeners.add(ie.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Xn(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if(Vn(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){let{active:r,onPending:o}=this.props;o(r,t,this.initialCoordinates,n)}handleStart(){let{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(ie.Click,pi,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ie.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;let{activated:r,initialCoordinates:o,props:i}=this,{onMove:s,options:{activationConstraint:a}}=i;if(!o)return;let l=(n=pt(t))!=null?n:ce,u=ft(o,l);if(!r&&a){if(Vn(a)){if(a.tolerance!=null&&rn(u,a.tolerance))return this.handleCancel();if(rn(u,a.distance))return this.handleStart()}if(Xn(a)&&rn(u,a.tolerance))return this.handleCancel();this.handlePending(a,u);return}t.cancelable&&t.preventDefault(),s(l)}handleEnd(){let{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){let{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===B.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},mi={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},Xe=class extends vt{constructor(t){let{event:n}=t,r=Le(n.target);super(t,mi,r)}};Xe.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];var vi={move:{name:"mousemove"},end:{name:"mouseup"}},ln;(function(e){e[e.RightClick=2]="RightClick"})(ln||(ln={}));var cn=class extends vt{constructor(t){super(t,vi,Le(t.event.target))}};cn.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===ln.RightClick?!1:(r?.({event:n}),!0)}}];var on={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},dn=class extends vt{constructor(t){super(t,on)}static setup(){return window.addEventListener(on.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(on.move.name,t)};function t(){}}};dn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:o}=n;return o.length>1?!1:(r?.({event:n}),!0)}}];var gt;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(gt||(gt={}));var Mt;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Mt||(Mt={}));function hi(e){let{acceleration:t,activator:n=gt.Pointer,canScroll:r,draggingRect:o,enabled:i,interval:s=5,order:a=Mt.TreeOrder,pointerCoordinates:l,scrollableAncestors:u,scrollableAncestorRects:f,delta:c,threshold:g}=e,p=ki({delta:c,disabled:!i}),[I,h]=qn(),w=(0,d.useRef)({x:0,y:0}),y=(0,d.useRef)({x:0,y:0}),m=(0,d.useMemo)(()=>{switch(n){case gt.Pointer:return l?{top:l.y,bottom:l.y,left:l.x,right:l.x}:null;case gt.DraggableRect:return o}},[n,o,l]),S=(0,d.useRef)(null),C=(0,d.useCallback)(()=>{let O=S.current;if(!O)return;let N=w.current.x*y.current.x,D=w.current.y*y.current.y;O.scrollBy(N,D)},[]),A=(0,d.useMemo)(()=>a===Mt.TreeOrder?[...u].reverse():u,[a,u]);(0,d.useEffect)(()=>{if(!i||!u.length||!m){h();return}for(let O of A){if(r?.(O)===!1)continue;let N=u.indexOf(O),D=f[N];if(!D)continue;let{direction:v,speed:M}=ai(O,D,m,t,g);for(let W of["x","y"])p[W][v[W]]||(M[W]=0,v[W]=0);if(M.x>0||M.y>0){h(),S.current=O,I(C,s),w.current=M,y.current=v;return}}w.current={x:0,y:0},y.current={x:0,y:0},h()},[t,C,r,h,i,s,JSON.stringify(m),JSON.stringify(p),I,u,A,f,JSON.stringify(g)])}var bi={x:{[j.Backward]:!1,[j.Forward]:!1},y:{[j.Backward]:!1,[j.Forward]:!1}};function ki(e){let{delta:t,disabled:n}=e,r=dt(t);return Ve(o=>{if(n||!r||!o)return bi;let i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[j.Backward]:o.x[j.Backward]||i.x===-1,[j.Forward]:o.x[j.Forward]||i.x===1},y:{[j.Backward]:o.y[j.Backward]||i.y===-1,[j.Forward]:o.y[j.Forward]||i.y===1}}},[n,t,r])}function wi(e,t){let n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return Ve(o=>{var i;return t==null?null:(i=r??o)!=null?i:null},[r,t])}function yi(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{sensor:o}=r,i=o.activators.map(s=>({eventName:s.eventName,handler:t(s.handler,r)}));return[...n,...i]},[]),[e,t])}var ht;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(ht||(ht={}));var un;(function(e){e.Optimized="optimized"})(un||(un={}));var Gn=new Map;function xi(e,t){let{dragging:n,dependencies:r,config:o}=t,[i,s]=(0,d.useState)(null),{frequency:a,measure:l,strategy:u}=o,f=(0,d.useRef)(e),c=w(),g=Ue(c),p=(0,d.useCallback)(function(y){y===void 0&&(y=[]),!g.current&&s(m=>m===null?y:m.concat(y.filter(S=>!m.includes(S))))},[g]),I=(0,d.useRef)(null),h=Ve(y=>{if(c&&!n)return Gn;if(!y||y===Gn||f.current!==e||i!=null){let m=new Map;for(let S of e){if(!S)continue;if(i&&i.length>0&&!i.includes(S.id)&&S.rect.current){m.set(S.id,S.rect.current);continue}let C=S.node.current,A=C?new mt(l(C),C):null;S.rect.current=A,A&&m.set(S.id,A)}return m}return y},[e,i,n,c,l]);return(0,d.useEffect)(()=>{f.current=e},[e]),(0,d.useEffect)(()=>{c||p()},[n,c]),(0,d.useEffect)(()=>{i&&i.length>0&&s(null)},[JSON.stringify(i)]),(0,d.useEffect)(()=>{c||typeof a!="number"||I.current!==null||(I.current=setTimeout(()=>{p(),I.current=null},a))},[a,c,p,...r]),{droppableRects:h,measureDroppableContainers:p,measuringScheduled:i!=null};function w(){switch(u){case ht.Always:return!1;case ht.BeforeDragging:return n;default:return!n}}}function gn(e,t){return Ve(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function Si(e,t){return gn(e,t)}function Ii(e){let{callback:t,disabled:n}=e,r=lt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:i}=window;return new i(r)},[r,n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function zt(e){let{callback:t,disabled:n}=e,r=lt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:i}=window;return new i(r)},[n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function Ci(e){return new mt(bt(e),e)}function Jn(e,t,n){t===void 0&&(t=Ci);let[r,o]=(0,d.useState)(null);function i(){o(l=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=l??n)!=null?u:null}let f=t(e);return JSON.stringify(l)===JSON.stringify(f)?l:f})}let s=Ii({callback(l){if(e)for(let u of l){let{type:f,target:c}=u;if(f==="childList"&&c instanceof HTMLElement&&c.contains(e)){i();break}}}}),a=zt({callback:i});return ge(()=>{i(),e?(a?.observe(e),s?.observe(document.body,{childList:!0,subtree:!0})):(a?.disconnect(),s?.disconnect())},[e]),r}function Ni(e){let t=gn(e);return dr(e,t)}var Zn=[];function Di(e){let t=(0,d.useRef)(e),n=Ve(r=>e?r&&r!==Zn&&e&&t.current&&e.parentNode===t.current.parentNode?r:pn(e):Zn,[e]);return(0,d.useEffect)(()=>{t.current=e},[e]),n}function Ei(e){let[t,n]=(0,d.useState)(null),r=(0,d.useRef)(e),o=(0,d.useCallback)(i=>{let s=nn(i.target);s&&n(a=>a?(a.set(s,an(s)),new Map(a)):null)},[]);return(0,d.useEffect)(()=>{let i=r.current;if(e!==i){s(i);let a=e.map(l=>{let u=nn(l);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,an(u)]):null}).filter(l=>l!=null);n(a.length?new Map(a):null),r.current=e}return()=>{s(e),s(i)};function s(a){a.forEach(l=>{let u=nn(l);u?.removeEventListener("scroll",o)})}},[o,e]),(0,d.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((i,s)=>Pe(i,s),ce):hr(e):ce,[e,t])}function Qn(e,t){t===void 0&&(t=[]);let n=(0,d.useRef)(null);return(0,d.useEffect)(()=>{n.current=null},t),(0,d.useEffect)(()=>{let r=e!==ce;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?ft(e,n.current):ce}function Ai(e){(0,d.useEffect)(()=>{if(!at)return;let t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(let n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function Ti(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{eventName:o,handler:i}=r;return n[o]=s=>{i(s,t)},n},{}),[e,t])}function wr(e){return(0,d.useMemo)(()=>e?ri(e):null,[e])}var er=[];function Ri(e,t){t===void 0&&(t=bt);let[n]=e,r=wr(n?Y(n):null),[o,i]=(0,d.useState)(er);function s(){i(()=>e.length?e.map(l=>mr(l)?r:new mt(t(l),l)):er)}let a=zt({callback:s});return ge(()=>{a?.disconnect(),s(),e.forEach(l=>a?.observe(l))},[e]),o}function yr(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return Ye(t)?t:e}function Oi(e){let{measure:t}=e,[n,r]=(0,d.useState)(null),o=(0,d.useCallback)(u=>{for(let{target:f}of u)if(Ye(f)){r(c=>{let g=t(f);return c?{...c,width:g.width,height:g.height}:g});break}},[t]),i=zt({callback:o}),s=(0,d.useCallback)(u=>{let f=yr(u);i?.disconnect(),f&&i?.observe(f),r(f?t(f):null)},[t,i]),[a,l]=ct(s);return(0,d.useMemo)(()=>({nodeRef:a,rect:n,setRef:l}),[n,a,l])}var Li=[{sensor:Xe,options:{}},{sensor:Bt,options:{}}],Pi={current:{}},Lt={draggable:{measure:Yn},droppable:{measure:Yn,strategy:ht.WhileDragging,frequency:un.Optimized},dragOverlay:{measure:bt}},We=class extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}},Bi={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new We,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Pt},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:Lt,measureDroppableContainers:Pt,windowRect:null,measuringScheduled:!1},xr={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:Pt,draggableNodes:new Map,over:null,measureDroppableContainers:Pt},kt=(0,d.createContext)(xr),Sr=(0,d.createContext)(Bi);function Mi(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new We}}}function zi(e,t){switch(t.type){case _.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case _.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case _.DragEnd:case _.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case _.RegisterDroppable:{let{element:n}=t,{id:r}=n,o=new We(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case _.SetDroppableDisabled:{let{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let s=new We(e.droppable.containers);return s.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:s}}}case _.UnregisterDroppable:{let{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;let i=new We(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function Wi(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:o}=(0,d.useContext)(kt),i=dt(r),s=dt(n?.id);return(0,d.useEffect)(()=>{if(!t&&!r&&i&&s!=null){if(!Ot(i)||document.activeElement===i.target)return;let a=o.get(s);if(!a)return;let{activatorNode:l,node:u}=a;if(!l.current&&!u.current)return;requestAnimationFrame(()=>{for(let f of[l.current,u.current]){if(!f)continue;let c=_n(f);if(c){c.focus();break}}})}},[r,t,o,s,i]),null}function Ir(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,i)=>i({transform:o,...r}),n):n}function Fi(e){return(0,d.useMemo)(()=>({draggable:{...Lt.draggable,...e?.draggable},droppable:{...Lt.droppable,...e?.droppable},dragOverlay:{...Lt.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function qi(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e,i=(0,d.useRef)(!1),{x:s,y:a}=typeof o=="boolean"?{x:o,y:o}:o;ge(()=>{if(!s&&!a||!t){i.current=!1;return}if(i.current||!r)return;let u=t?.node.current;if(!u||u.isConnected===!1)return;let f=n(u),c=dr(f,r);if(s||(c.x=0),a||(c.y=0),i.current=!0,Math.abs(c.x)>0||Math.abs(c.y)>0){let g=fr(u);g&&g.scrollBy({top:c.y,left:c.x})}},[t,s,a,r,n])}var Wt=(0,d.createContext)({...ce,scaleX:1,scaleY:1}),De;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(De||(De={}));var Cr=(0,d.memo)(function(t){var n,r,o,i;let{id:s,accessibility:a,autoScroll:l=!0,children:u,sensors:f=Li,collisionDetection:c=fn,measuring:g,modifiers:p,...I}=t,h=(0,d.useReducer)(zi,void 0,Mi),[w,y]=h,[m,S]=jo(),[C,A]=(0,d.useState)(De.Uninitialized),O=C===De.Initialized,{draggable:{active:N,nodes:D,translate:v},droppable:{containers:M}}=w,W=N!=null?D.get(N):null,te=(0,d.useRef)({initial:null,translated:null}),ne=(0,d.useMemo)(()=>{var H;return N!=null?{id:N,data:(H=W?.data)!=null?H:Pi,rect:te}:null},[N,W]),de=(0,d.useRef)(null),[Re,X]=(0,d.useState)(null),[re,It]=(0,d.useState)(null),ve=Ue(I,Object.values(I)),nt=ut("DndDescribedBy",s),Ct=(0,d.useMemo)(()=>M.getEnabled(),[M]),he=Fi(g),{droppableRects:be,measureDroppableContainers:Fe,measuringScheduled:Nt}=xi(Ct,{dragging:O,dependencies:[v.x,v.y],config:he.droppable}),G=wi(D,N),k=(0,d.useMemo)(()=>re?pt(re):null,[re]),E=To(),z=Si(G,he.draggable.measure);qi({activeNode:N!=null?D.get(N):null,config:E.layoutShiftCompensation,initialRect:z,measure:he.draggable.measure});let P=Jn(G,he.draggable.measure,z),J=Jn(G?G.parentElement:null),le=(0,d.useRef)({activatorEvent:null,active:null,activeNode:G,collisionRect:null,collisions:null,droppableRects:be,draggableNodes:D,draggingNode:null,draggingNodeRect:null,droppableContainers:M,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),qe=M.getNodeFor((n=le.current.over)==null?void 0:n.id),ue=Oi({measure:he.dragOverlay.measure}),ye=(r=ue.nodeRef.current)!=null?r:G,$e=O?(o=ue.rect)!=null?o:P:null,En=!!(ue.nodeRef.current&&ue.rect),An=Ni(En?null:P),Jt=wr(ye?Y(ye):null),xe=Di(O?qe??G:null),Dt=Ri(xe),Et=Ir(p,{transform:{x:v.x-An.x,y:v.y-An.y,scaleX:1,scaleY:1},activatorEvent:re,active:ne,activeNodeRect:P,containerNodeRect:J,draggingNodeRect:$e,over:le.current.over,overlayNodeRect:ue.rect,scrollableAncestors:xe,scrollableAncestorRects:Dt,windowRect:Jt}),Tn=k?Pe(k,v):null,Rn=Ei(xe),So=Qn(Rn),Io=Qn(Rn,[P]),_e=Pe(Et,So),je=$e?ei($e,Et):null,rt=ne&&je?c({active:ne,collisionRect:je,droppableRects:be,droppableContainers:Ct,pointerCoordinates:Tn}):null,On=Xo(rt,"id"),[Se,Ln]=(0,d.useState)(null),Co=En?Et:Pe(Et,Io),No=Zo(Co,(i=Se?.rect)!=null?i:null,P),Zt=(0,d.useRef)(null),Pn=(0,d.useCallback)((H,Z)=>{let{sensor:Q,options:Ie}=Z;if(de.current==null)return;let oe=D.get(de.current);if(!oe)return;let ee=H.nativeEvent,fe=new Q({active:de.current,activeNode:oe,event:ee,options:Ie,context:le,onAbort(K){if(!D.get(K))return;let{onDragAbort:pe}=ve.current,ke={id:K};pe?.(ke),m({type:"onDragAbort",event:ke})},onPending(K,Ce,pe,ke){if(!D.get(K))return;let{onDragPending:it}=ve.current,Ne={id:K,constraint:Ce,initialCoordinates:pe,offset:ke};it?.(Ne),m({type:"onDragPending",event:Ne})},onStart(K){let Ce=de.current;if(Ce==null)return;let pe=D.get(Ce);if(!pe)return;let{onDragStart:ke}=ve.current,ot={activatorEvent:ee,active:{id:Ce,data:pe.data,rect:te}};(0,Me.unstable_batchedUpdates)(()=>{ke?.(ot),A(De.Initializing),y({type:_.DragStart,initialCoordinates:K,active:Ce}),m({type:"onDragStart",event:ot}),X(Zt.current),It(ee)})},onMove(K){y({type:_.DragMove,coordinates:K})},onEnd:Ke(_.DragEnd),onCancel:Ke(_.DragCancel)});Zt.current=fe;function Ke(K){return async function(){let{active:pe,collisions:ke,over:ot,scrollAdjustedTranslate:it}=le.current,Ne=null;if(pe&&it){let{cancelDrop:st}=ve.current;Ne={activatorEvent:ee,active:pe,collisions:ke,delta:it,over:ot},K===_.DragEnd&&typeof st=="function"&&await Promise.resolve(st(Ne))&&(K=_.DragCancel)}de.current=null,(0,Me.unstable_batchedUpdates)(()=>{y({type:K}),A(De.Uninitialized),Ln(null),X(null),It(null),Zt.current=null;let st=K===_.DragEnd?"onDragEnd":"onDragCancel";if(Ne){let Qt=ve.current[st];Qt?.(Ne),m({type:st,event:Ne})}})}}},[D]),Do=(0,d.useCallback)((H,Z)=>(Q,Ie)=>{let oe=Q.nativeEvent,ee=D.get(Ie);if(de.current!==null||!ee||oe.dndKit||oe.defaultPrevented)return;let fe={active:ee};H(Q,Z.options,fe)===!0&&(oe.dndKit={capturedBy:Z.sensor},de.current=Ie,Pn(Q,Z))},[D,Pn]),Bn=yi(f,Do);Ai(f),ge(()=>{P&&C===De.Initializing&&A(De.Initialized)},[P,C]),(0,d.useEffect)(()=>{let{onDragMove:H}=ve.current,{active:Z,activatorEvent:Q,collisions:Ie,over:oe}=le.current;if(!Z||!Q)return;let ee={active:Z,activatorEvent:Q,collisions:Ie,delta:{x:_e.x,y:_e.y},over:oe};(0,Me.unstable_batchedUpdates)(()=>{H?.(ee),m({type:"onDragMove",event:ee})})},[_e.x,_e.y]),(0,d.useEffect)(()=>{let{active:H,activatorEvent:Z,collisions:Q,droppableContainers:Ie,scrollAdjustedTranslate:oe}=le.current;if(!H||de.current==null||!Z||!oe)return;let{onDragOver:ee}=ve.current,fe=Ie.get(On),Ke=fe&&fe.rect.current?{id:fe.id,rect:fe.rect.current,data:fe.data,disabled:fe.disabled}:null,K={active:H,activatorEvent:Z,collisions:Q,delta:{x:oe.x,y:oe.y},over:Ke};(0,Me.unstable_batchedUpdates)(()=>{Ln(Ke),ee?.(K),m({type:"onDragOver",event:K})})},[On]),ge(()=>{le.current={activatorEvent:re,active:ne,activeNode:G,collisionRect:je,collisions:rt,droppableRects:be,draggableNodes:D,draggingNode:ye,draggingNodeRect:$e,droppableContainers:M,over:Se,scrollableAncestors:xe,scrollAdjustedTranslate:_e},te.current={initial:$e,translated:je}},[ne,G,rt,je,D,ye,$e,be,M,Se,xe,_e]),hi({...E,delta:v,draggingRect:je,pointerCoordinates:Tn,scrollableAncestors:xe,scrollableAncestorRects:Dt});let Eo=(0,d.useMemo)(()=>({active:ne,activeNode:G,activeNodeRect:P,activatorEvent:re,collisions:rt,containerNodeRect:J,dragOverlay:ue,draggableNodes:D,droppableContainers:M,droppableRects:be,over:Se,measureDroppableContainers:Fe,scrollableAncestors:xe,scrollableAncestorRects:Dt,measuringConfiguration:he,measuringScheduled:Nt,windowRect:Jt}),[ne,G,P,re,rt,J,ue,D,M,be,Se,Fe,xe,Dt,he,Nt,Jt]),Ao=(0,d.useMemo)(()=>({activatorEvent:re,activators:Bn,active:ne,activeNodeRect:P,ariaDescribedById:{draggable:nt},dispatch:y,draggableNodes:D,over:Se,measureDroppableContainers:Fe}),[re,Bn,ne,P,y,nt,D,Se,Fe]);return d.default.createElement(rr.Provider,{value:S},d.default.createElement(kt.Provider,{value:Ao},d.default.createElement(Sr.Provider,{value:Eo},d.default.createElement(Wt.Provider,{value:No},u)),d.default.createElement(Wi,{disabled:a?.restoreFocus===!1})),d.default.createElement(Yo,{...a,hiddenTextDescribedById:nt}));function To(){let H=Re?.autoScrollEnabled===!1,Z=typeof l=="object"?l.enabled===!1:l===!1,Q=O&&!H&&!Z;return typeof l=="object"?{...l,enabled:Q}:{enabled:Q}}}),$i=(0,d.createContext)(null),tr="button",_i="Draggable";function Nr(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e,i=ut(_i),{activators:s,activatorEvent:a,active:l,activeNodeRect:u,ariaDescribedById:f,draggableNodes:c,over:g}=(0,d.useContext)(kt),{role:p=tr,roleDescription:I="draggable",tabIndex:h=0}=o??{},w=l?.id===t,y=(0,d.useContext)(w?Wt:$i),[m,S]=ct(),[C,A]=ct(),O=Ti(s,t),N=Ue(n);ge(()=>(c.set(t,{id:t,key:i,node:m,activatorNode:C,data:N}),()=>{let v=c.get(t);v&&v.key===i&&c.delete(t)}),[c,t]);let D=(0,d.useMemo)(()=>({role:p,tabIndex:h,"aria-disabled":r,"aria-pressed":w&&p===tr?!0:void 0,"aria-roledescription":I,"aria-describedby":f.draggable}),[r,p,h,w,I,f.draggable]);return{active:l,activatorEvent:a,activeNodeRect:u,attributes:D,isDragging:w,listeners:r?void 0:O,node:m,over:g,setNodeRef:S,setActivatorNodeRef:A,transform:y}}function ji(){return(0,d.useContext)(Sr)}var Ki="Droppable",Hi={timeout:25};function Dr(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e,i=ut(Ki),{active:s,dispatch:a,over:l,measureDroppableContainers:u}=(0,d.useContext)(kt),f=(0,d.useRef)({disabled:n}),c=(0,d.useRef)(!1),g=(0,d.useRef)(null),p=(0,d.useRef)(null),{disabled:I,updateMeasurementsFor:h,timeout:w}={...Hi,...o},y=Ue(h??r),m=(0,d.useCallback)(()=>{if(!c.current){c.current=!0;return}p.current!=null&&clearTimeout(p.current),p.current=setTimeout(()=>{u(Array.isArray(y.current)?y.current:[y.current]),p.current=null},w)},[w]),S=zt({callback:m,disabled:I||!s}),C=(0,d.useCallback)((D,v)=>{S&&(v&&(S.unobserve(v),c.current=!1),D&&S.observe(D))},[S]),[A,O]=ct(C),N=Ue(t);return(0,d.useEffect)(()=>{!S||!A.current||(S.disconnect(),c.current=!1,S.observe(A.current))},[A,S]),(0,d.useEffect)(()=>(a({type:_.RegisterDroppable,element:{id:r,key:i,disabled:n,node:A,rect:g,data:N}}),()=>a({type:_.UnregisterDroppable,key:i,id:r})),[r]),(0,d.useEffect)(()=>{n!==f.current.disabled&&(a({type:_.SetDroppableDisabled,id:r,key:i,disabled:n}),f.current.disabled=n)},[r,i,n,a]),{active:s,rect:g,isOver:l?.id===r,node:A,over:l,setNodeRef:O}}function Yi(e){let{animation:t,children:n}=e,[r,o]=(0,d.useState)(null),[i,s]=(0,d.useState)(null),a=dt(n);return!n&&!r&&a&&o(a),ge(()=>{if(!i)return;let l=r?.key,u=r?.props.id;if(l==null||u==null){o(null);return}Promise.resolve(t(u,i)).then(()=>{o(null)})},[t,r,i]),d.default.createElement(d.default.Fragment,null,n,r?(0,d.cloneElement)(r,{ref:s}):null)}var Ui={x:0,y:0,scaleX:1,scaleY:1};function Vi(e){let{children:t}=e;return d.default.createElement(kt.Provider,{value:xr},d.default.createElement(Wt.Provider,{value:Ui},t))}var Xi={position:"fixed",touchAction:"none"},Gi=e=>Ot(e)?"transform 250ms ease":void 0,Ji=(0,d.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:o,children:i,className:s,rect:a,style:l,transform:u,transition:f=Gi}=e;if(!a)return null;let c=o?u:{...u,scaleX:1,scaleY:1},g={...Xi,width:a.width,height:a.height,top:a.top,left:a.left,transform:He.Transform.toString(c),transformOrigin:o&&r?Uo(r,a):void 0,transition:typeof f=="function"?f(r):f,...l};return d.default.createElement(n,{className:s,style:g,ref:t},i)}),Zi=e=>t=>{let{active:n,dragOverlay:r}=t,o={},{styles:i,className:s}=e;if(i!=null&&i.active)for(let[a,l]of Object.entries(i.active))l!==void 0&&(o[a]=n.node.style.getPropertyValue(a),n.node.style.setProperty(a,l));if(i!=null&&i.dragOverlay)for(let[a,l]of Object.entries(i.dragOverlay))l!==void 0&&r.node.style.setProperty(a,l);return s!=null&&s.active&&n.node.classList.add(s.active),s!=null&&s.dragOverlay&&r.node.classList.add(s.dragOverlay),function(){for(let[l,u]of Object.entries(o))n.node.style.setProperty(l,u);s!=null&&s.active&&n.node.classList.remove(s.active)}},Qi=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:He.Transform.toString(t)},{transform:He.Transform.toString(n)}]},es={duration:250,easing:"ease",keyframes:Qi,sideEffects:Zi({styles:{active:{opacity:"0"}}})};function ts(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:o}=e;return lt((i,s)=>{if(t===null)return;let a=n.get(i);if(!a)return;let l=a.node.current;if(!l)return;let u=yr(s);if(!u)return;let{transform:f}=Y(s).getComputedStyle(s),c=ur(f);if(!c)return;let g=typeof t=="function"?t:ns(t);return br(l,o.draggable.measure),g({active:{id:i,data:a.data,node:l,rect:o.draggable.measure(l)},draggableNodes:n,dragOverlay:{node:s,rect:o.dragOverlay.measure(u)},droppableContainers:r,measuringConfiguration:o,transform:c})})}function ns(e){let{duration:t,easing:n,sideEffects:r,keyframes:o}={...es,...e};return i=>{let{active:s,dragOverlay:a,transform:l,...u}=i;if(!t)return;let f={x:a.rect.left-s.rect.left,y:a.rect.top-s.rect.top},c={scaleX:l.scaleX!==1?s.rect.width*l.scaleX/a.rect.width:1,scaleY:l.scaleY!==1?s.rect.height*l.scaleY/a.rect.height:1},g={x:l.x-f.x,y:l.y-f.y,...c},p=o({...u,active:s,dragOverlay:a,transform:{initial:l,final:g}}),[I]=p,h=p[p.length-1];if(JSON.stringify(I)===JSON.stringify(h))return;let w=r?.({active:s,dragOverlay:a,...u}),y=a.node.animate(p,{duration:t,easing:n,fill:"forwards"});return new Promise(m=>{y.onfinish=()=>{w?.(),m()}})}}var nr=0;function rs(e){return(0,d.useMemo)(()=>{if(e!=null)return nr++,nr},[e])}var Er=d.default.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:o,transition:i,modifiers:s,wrapperElement:a="div",className:l,zIndex:u=999}=e,{activatorEvent:f,active:c,activeNodeRect:g,containerNodeRect:p,draggableNodes:I,droppableContainers:h,dragOverlay:w,over:y,measuringConfiguration:m,scrollableAncestors:S,scrollableAncestorRects:C,windowRect:A}=ji(),O=(0,d.useContext)(Wt),N=rs(c?.id),D=Ir(s,{activatorEvent:f,active:c,activeNodeRect:g,containerNodeRect:p,draggingNodeRect:w.rect,over:y,overlayNodeRect:w.rect,scrollableAncestors:S,scrollableAncestorRects:C,transform:O,windowRect:A}),v=gn(g),M=ts({config:r,draggableNodes:I,droppableContainers:h,measuringConfiguration:m}),W=v?w.setRef:void 0;return d.default.createElement(Vi,null,d.default.createElement(Yi,{animation:M},c&&N?d.default.createElement(Ji,{key:N,id:c.id,ref:W,as:a,activatorEvent:f,adjustScale:t,className:l,transition:i,rect:v,style:{zIndex:u,...o},transform:D},n):null))});function U(e,t={},n="default"){return fetch("/api/kanban",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:n}})}).then(r=>r.json()).catch(r=>({ok:!1,error:String(r&&r.message||r)}))}var Ee=null,mn=new Set,Ar=new Set,vn=new Set,Tr=new Set;function Or(e){Ee=e}function hn(e){return e.settings&&e.settings.confirmRequired?"This board REQUIRES human confirmation: never move the item to Done \u2014 finish via Review and let the human complete it.":"When the task is fully complete: move the item In Progress -> Done."}function Lr(){return"If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."}var bn=()=>"Scope limit: execute ONLY the work described in this item. If other work surfaces (other items, side tasks, extra refactors), do not start it \u2014 mention it in the conversation and let the human queue a separate item.",kn=e=>`At the end of EVERY turn, set your status with kanban_set_status (id: ${e.id}): max 2 sentences \u2014 what is done, what is next or what you need from the human. The human sees it when hovering your card on the board.`;function os(e,t){return[`Kanban pickup: item ${t.id} "${t.name}" was moved to To Do by the human.`,"","Workflow:",`1. Read it with kanban_get_item (id: ${t.id}).`,"2. Confirm pickup: move it To Do -> In Progress (kanban_move_item).","3. Do the work, narrating your progress and decisions in this conversation.","4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",`5. ${hn(e)}`,"",Lr(),bn(),kn(t),`Always reference the item by id ${t.id}. Never modify other items.`].join(`
    `)}function is(e,t){return[`Kanban requeue: item ${t.id} "${t.name}" was moved back to To Do by the human.`,"Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",hn(e),"",Lr(),bn(),kn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}function ss(e,t){return[`Kanban: the human returned item ${t.id} "${t.name}" to In Progress.`,"Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",hn(e),"",bn(),kn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}async function as(e,t,n){if(n.sessionId)return n.sessionId;if(!Ee)return null;try{let r=await Ee.createSession(e);return await U("setSession",{id:n.id,sessionId:r},e),n.sessionId=r,r}catch(r){return console.warn("dsh-kanban: session create failed for "+n.id,r),null}}async function Rr(e,t,n,r){if(!(!Ee||vn.has(n.id))){vn.add(n.id);try{let o=await as(e,t,n);if(!o)return;let i=t.items.find(s=>s.id===n.id)??n;await Ee.renameSession(o,`${i.id} \xB7 ${i.name}`),await Ee.promptSession(o,r(t,i))}catch(o){console.warn("dsh-kanban: agent drive failed for "+n.id,o)}finally{vn.delete(n.id)}}}async function ls(e){if(!(!Ee||Tr.has(e))){Tr.add(e);try{await Ee.archiveSession(e)}catch(t){console.warn("dsh-kanban: session archive failed for "+e,t)}}}function Pr(e,t){let n=Array.isArray(t.activities)?t.activities:[];if(!Ar.has(e)){Ar.add(e);for(let r of n)mn.add(r.id);return}for(let r of n){if(mn.has(r.id))continue;if(mn.add(r.id),r.type==="item_deleted"&&r.sessionId){ls(r.sessionId);continue}if(r.source!=="human")continue;let o=t.items.find(i=>i.id===r.itemId);o&&r.type==="item_moved"&&(r.to==="todo"?Rr(e,t,o,o.sessionId?is:os):r.to==="in_progress"&&r.from==="review"&&Rr(e,t,o,ss))}}var Ge=["backlog","todo","in_progress","review","done"],se={backlog:"\u0411\u0435\u043A\u043B\u043E\u0433",todo:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C",in_progress:"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",review:"\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435",done:"\u0413\u043E\u0442\u043E\u0432\u043E"},Br=["low","normal","high","urgent"],Ft={low:"\u041D\u0438\u0437\u043A\u0438\u0439",normal:"\u041E\u0431\u044B\u0447\u043D\u044B\u0439",high:"\u0412\u044B\u0441\u043E\u043A\u0438\u0439",urgent:"\u0421\u0440\u043E\u0447\u043D\u043E"};var cs=e=>se[String(e)]||String(e||"");function me(e){if(!e)return"";let t=new Date(e).getTime();if(!Number.isFinite(t))return"";let n=Math.max(0,(Date.now()-t)/1e3);return n<5?"just now":n<60?`${Math.floor(n)} seconds ago`:n<120?"1 minute ago":n<3600?`${Math.floor(n/60)} minutes ago`:n<7200?"1 hour ago":n<86400?`${Math.floor(n/3600)} hours ago`:`${Math.floor(n/86400)} days ago`}function Mr(e){let t=e.source==="agent"?"harness":"you";switch(e.type){case"item_moved":return`${t} moved to ${cs(e.to)}`;case"item_created":return`${t} created`;case"item_updated":return`${t} edited`;case"item_deleted":return`${t} deleted`;default:return`${t} ${e.type.replace(/_/g," ")}`}}function zr(e){return`${Mr(e)} (${me(e.ts)})`}function Wr(e){return{phrase:Mr(e),time:me(e.ts)}}var Fr="dsh-kanban-flow.clickOpensBoard",wn="dsh-kanban-flow:clickPrefChanged",qr="dsh-kanban-flow.confirmArchive",yn="dsh-kanban-flow:archiveConfirmChanged";function qt(){try{let e=localStorage.getItem(Fr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function $r(e){try{localStorage.setItem(Fr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(wn))}function _r(e){return window.addEventListener(wn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(wn,e),window.removeEventListener("storage",e)}}function $t(){try{let e=localStorage.getItem(qr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function jr(e){try{localStorage.setItem(qr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(yn))}function _t(e){return window.addEventListener(yn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(yn,e),window.removeEventListener("storage",e)}}var Te=require("react");function Kr(e){let{override:t,currentSessionId:n,workspaceItems:r,recentWorkspaceId:o}=e,i=Array.isArray(r)?r:[],s=g=>g?i.find(p=>p&&p.workspaceId===g):void 0,a=n?i.find(g=>g&&Array.isArray(g.sessionIds)&&g.sessionIds.includes(n)):void 0,l=a?a.workspaceId:void 0,u=t!=null&&t.workspaceId!==l&&(t.hostSessionId===void 0||t.hostSessionId===n)?t:void 0,f=u?s(u.workspaceId):void 0,c=f||a||s(o);return{workspaceId:c?c.workspaceId:o||"default",workspaceTitle:c?c.title:void 0,pinned:f!==void 0,nativeWorkspaceId:l}}function Hr(e,t,n=0){if(!Array.isArray(e))return null;let r=0;for(let o of e)if(!(!o||o.title!==t)){if(r===n)return o.workspaceId;r+=1}return null}var Kt="data-kf-kanban",Ut="Board",wt=null,Ze=!1,Je=!1;function ds(){return Ze}function Ur(e){wt&&wt(e)}function Sn(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="tab"]'))}function In(){return Sn().find(e=>(e.textContent||"").trim()===Ut)}function Ht(){let e=In();return!!e&&e.getAttribute("aria-selected")==="true"}function Yr(e=4e3){if(typeof document>"u")return;let t=Date.now()+e,n=()=>{let r=In();if(r){r.click();return}Date.now()<t&&window.setTimeout(n,120)};n()}function Vr(){let e=Sn().find(t=>(t.textContent||"").trim()!==Ut);e&&e.click()}function Yt(){if(typeof document>"u"||Je)return;Je=!0;let e=Date.now()+2500,t=()=>{if(Ze){Je=!1;return}let n=In();if(!n||n.getAttribute("aria-selected")!=="true"){Je=!1;return}let r=Sn().find(o=>(o.textContent||"").trim()!==Ut);if(r){r.click(),Je=!1;return}if(Date.now()<e){window.setTimeout(t,120);return}Je=!1};t()}function Xr(){return(0,Te.useEffect)(()=>{if(typeof document>"u")return;let e=t=>{if(ds()||!(t.target instanceof Element))return;let n=t.target.closest('[role="tab"]');n&&(n.textContent||"").trim()===Ut&&n.getAttribute("aria-selected")==="true"&&(t.stopImmediatePropagation(),t.preventDefault(),Vr())};return document.addEventListener("click",e,!0),()=>document.removeEventListener("click",e,!0)},[]),null}function jt(e,t){if(!t||!e?.list)return;let n=e.list.getSnapshot()?.items;if(!Array.isArray(n))return;let r=n.find(o=>o&&Array.isArray(o.sessionIds)&&o.sessionIds.includes(t));return r?r.workspaceId:void 0}var Ae=null,xn=new Set;function Gr(){return Ae??void 0}function yt(e){if(!(Ae===null&&e===null||Ae!==null&&e!==null&&Ae.workspaceId===e.workspaceId&&Ae.hostSessionId===e.hostSessionId)){Ae=e;for(let n of xn)n()}}function Jr(e){return xn.add(e),()=>{xn.delete(e)}}function Zr({workspaces:e,sessions:t}){return(0,Te.useEffect)(()=>{if(!e||!t)return;let n=()=>t.list.getSnapshot(),r=c=>{if(c===void 0)return!1;let g=n().byId;return!!(g&&g[c]&&g[c].blank===!1)},o=()=>{let c=n().current;return r(c)?c:void 0},i=()=>{let c=e.list?.getSnapshot?.();return new Set(Array.isArray(c?.archivedSessionIds)?c.archivedSessionIds:[])},s=c=>{let g=e.list?.getSnapshot?.()?.items,p=Array.isArray(g)?g.find(h=>h&&h.workspaceId===c):void 0;if(!p||!Array.isArray(p.sessionIds))return;let I=i();return p.sessionIds.find(h=>r(h)&&!I.has(h))},a=()=>{let c=n(),g=i();for(let p of c.ids??[])if(r(p)&&!g.has(p))return p},l=(c,g,p=6e3)=>{if(c()){g();return}let I=!1,h=()=>{I||(I=!0,w(),typeof y=="function"&&y(),window.clearTimeout(m),g())},w=t.list.subscribe(()=>{c()&&h()}),y=e.list?.subscribe?.(()=>{c()&&h()}),m=window.setTimeout(h,p)},u=()=>{Ht()||Yr(),window.setTimeout(()=>{Ze=!1},600)},f=c=>{let g=(y,m)=>{console.info(`[dsh-kanban-flow] open case ${y}:`,JSON.stringify({target:c,current:o()??null,actualCurrent:n().current??null,override:Ae,boardTabActive:Ht(),...m}))},p=o();if(p!==void 0){let y=Ae?.workspaceId??jt(e,p);if(y===c){g("1-toggle",{effective:y}),Ht()?Vr():Yr();return}}Ze=!0;let I=s(c);if(I!==void 0){g("2-native",{targetSession:I}),yt(null),t.open&&t.open(I),l(()=>n().current===I,u);return}if(p!==void 0){g("3-pin-current"),yt({workspaceId:c,hostSessionId:p}),u();return}let h=jt(e,n().current),w=(h!==void 0?s(h):void 0)??a();if(w!==void 0){g("4-borrow",{borrowed:w,currentWorkspaceId:h}),yt({workspaceId:c,hostSessionId:w}),n().current===w?u():(t.open&&t.open(w),l(()=>n().current===w,u));return}g("5-seed"),e.startSession(c),l(()=>{let y=n().current;return y!==void 0&&jt(e,y)===c},()=>{let y=n().current;if(y===void 0||jt(e,y)!==c){Ze=!1;return}let S=(t.binding?t.binding(y):void 0)?.session.prompt([{type:"text",text:'Kanban board bootstrap: reply with the single word "ready".'}],"queue");Promise.resolve(S).catch(C=>console.warn("dsh-kanban-flow: board seed prompt failed",C)),l(()=>o()!==void 0,u,2e4)},1e4)};return wt=f,()=>{wt===f&&(wt=null)}},[e,t]),null}function Qr({sessions:e}){return(0,Te.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"]');!r||r.hasAttribute("aria-expanded")||n.target.closest("button")||Ht()&&Yt()};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[]),(0,Te.useEffect)(()=>{if(!e?.list)return;let t=e.list.getSnapshot()?.current;return e.list.subscribe(()=>{let r=e.list.getSnapshot()?.current;r!==t&&(t=r,Ze||Yt())})},[e]),null}function eo(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="treeitem"][aria-expanded]')).filter(t=>xt(t)!==null)}function xt(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if((n.textContent||"").trim()!==""&&n.querySelector("button")===null&&n.querySelector("svg")===null)return n;return null}function us(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if(n.querySelector("button")!==null)return n;return null}function fs(e,t){if(!(t instanceof Element))return!1;let n=t.closest("span");return!n||!e.contains(n)?!1:n.querySelector("svg")!==null&&n.querySelector("button")===null&&(n.textContent||"").trim()===""}function to(e,t){let n=xt(t);if(!n)return null;let r=(n.textContent||"").trim(),o=e?.list?.getSnapshot?.()?.items;if(!Array.isArray(o))return null;let i=0;for(let s of eo()){if(s===t)break;let a=xt(s);a&&(a.textContent||"").trim()===r&&(i+=1)}return Hr(o,r,i)}function ps(){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none");for(let[t,n]of[[1.5,12],[6,8],[10.5,5]]){let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",String(t)),r.setAttribute("y","2"),r.setAttribute("width","4"),r.setAttribute("height",String(n)),r.setAttribute("rx","1.4"),r.setAttribute("fill","currentColor"),e.appendChild(r)}return e}function no({workspaces:e}){return(0,Te.useEffect)(()=>{if(typeof document>"u")return;let t=!1,n=()=>{if(!t)for(let i of eo()){let s=xt(i),a=us(i);if(!s||!a||a.querySelector(`[${Kt}]`))continue;let l=to(e,i);if(!l)continue;let u=(s.textContent||"").trim(),f=document.createElement("button");f.type="button",f.setAttribute(Kt,""),f.className="kf-sidebar-icon",f.title=`Open kanban board (${u})`,f.setAttribute("aria-label",`Open kanban board for ${u}`),f.appendChild(ps()),f.addEventListener("click",c=>{c.stopPropagation(),c.preventDefault(),Ur(l)}),a.appendChild(f)}},r=new MutationObserver(()=>n());r.observe(document.documentElement,{childList:!0,subtree:!0});let o=e?.list?.subscribe?.(()=>n());return n(),()=>{t=!0,r.disconnect(),typeof o=="function"&&o();for(let i of Array.from(document.querySelectorAll(`[${Kt}]`)))i.remove()}},[e]),null}function ro({workspaces:e}){return(0,Te.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!qt()||!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"][aria-expanded]');if(!r||!xt(r)||fs(r,n.target)||n.target.closest("button")&&!n.target.closest(`[${Kt}]`))return;let i=to(e,r);i&&(n.stopPropagation(),n.preventDefault(),Ur(i))};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[e]),null}function oo({workspaces:e}){return(0,Te.useEffect)(()=>{if(!e?.list||typeof e.list.getSnapshot!="function")return;let t=!1,n=new Set(e.list.getSnapshot()?.archivedSessionIds??[]),r=async()=>{if(t)return;let i=e.list.getSnapshot(),s=new Set(i?.archivedSessionIds??[]),a=[...s].filter(l=>!n.has(l));if(n=s,a.length!==0){for(let l of Array.isArray(i?.items)?i.items:[])if(!(!l||!l.workspaceId))try{let f=(await U("get",{},l.workspaceId))?.board?.items??[];for(let c of f)c.sessionId&&a.includes(c.sessionId)&&await U("deleteItem",{id:c.id},l.workspaceId)}catch{}}},o=e.list.subscribe(()=>{r()});return()=>{t=!0,o()}},[e]),null}var Vt=require("react"),ae=require("react/jsx-runtime");function io({item:e,onConfirm:t,onCancel:n}){let r=(0,Vt.useRef)(null);return(0,Vt.useEffect)(()=>{r.current?.focus();let o=i=>{i.key==="Escape"&&n(),i.key==="Enter"&&t()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[t,n]),(0,ae.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:o=>{o.target===o.currentTarget&&n()},children:(0,ae.jsxs)("div",{className:"kf-dialog",role:"alertdialog","aria-label":"Archive "+e.id,style:{width:400},children:[(0,ae.jsx)("div",{className:"kf-dialog-head",children:(0,ae.jsx)("span",{className:"kf-dialog-title",children:"Archive item?"})}),(0,ae.jsxs)("div",{className:"kf-dialog-body",children:[(0,ae.jsxs)("div",{className:"kf-muted",children:["Archive ",(0,ae.jsx)("strong",{children:e.id})," \u201C",e.name,"\u201D? The item will be removed from the board",e.sessionId?" and its task session archived":"","."]}),(0,ae.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,ae.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,ae.jsx)("button",{type:"button",ref:r,className:"kf-btn kf-danger",onClick:t,children:"Archive"})]})]})]})})}var St=require("react");var R=require("react/jsx-runtime"),gs=e=>se[e]||e;function so(e){let{item:t,board:n,onOpenChange:r,onSave:o,onDelete:i,onOpenSession:s,sessions:a}=e,[l,u]=(0,St.useState)(t?t.name:""),[f,c]=(0,St.useState)(t?t.description:"");if((0,St.useEffect)(()=>{u(t?t.name:""),c(t?t.description:"")},[t&&t.id]),!t)return null;let g=n.activities.filter(p=>p.itemId===t.id);return(0,R.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:p=>{p.target===p.currentTarget&&r(!1)},children:(0,R.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Item "+t.id,children:[(0,R.jsxs)("div",{className:"kf-dialog-head",children:[(0,R.jsx)("span",{className:"kf-code-chip",children:t.id}),(0,R.jsx)("span",{className:"kf-dialog-title",children:t.name}),(0,R.jsx)("span",{className:"kf-spacer"}),t.sessionId&&a&&(0,R.jsx)("button",{type:"button",className:"kf-btn",onClick:()=>s(t),children:"Open task session"}),(0,R.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Close","aria-label":"Close item dialog",onClick:()=>r(!1),children:"\u2715"})]}),(0,R.jsxs)("div",{className:"kf-dialog-body",children:[(0,R.jsxs)("div",{className:"kf-muted",children:["In ",(0,R.jsx)("strong",{children:gs(t.columnId)}),t.sessionId?" \xB7 linked to a task session":""]}),t.statusNote&&(0,R.jsxs)("div",{className:"kf-status-box",children:[(0,R.jsxs)("div",{className:"kf-fieldlabel",children:["Status",t.statusAt?" \xB7 "+me(t.statusAt):""]}),(0,R.jsx)("div",{children:t.statusNote})]}),(0,R.jsxs)("div",{children:[(0,R.jsx)("div",{className:"kf-fieldlabel",children:"Name"}),(0,R.jsx)("input",{className:"kf-input",value:l,onChange:p=>u(p.target.value)})]}),(0,R.jsxs)("div",{children:[(0,R.jsx)("div",{className:"kf-fieldlabel",children:"Description"}),(0,R.jsx)("textarea",{className:"kf-textarea",value:f,onChange:p=>c(p.target.value)})]}),(0,R.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-start"},children:[(0,R.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:()=>o({name:l,description:f}),children:"Save"}),(0,R.jsx)("button",{type:"button",className:"kf-btn kf-danger",onClick:()=>i(t.id),children:"Delete item"})]}),t.sessionId&&(0,R.jsx)("div",{className:"kf-muted",children:"Deleting this item also archives its task session."}),(0,R.jsxs)("div",{children:[(0,R.jsx)("div",{className:"kf-fieldlabel",children:"Activity"}),g.length===0&&(0,R.jsx)("div",{className:"kf-muted",children:"No activity yet."}),g.slice().reverse().map(p=>(0,R.jsx)("div",{className:"kf-activity-row",children:(0,R.jsx)("span",{children:zr(p)})},p.id))]})]})]})})}var Qe=require("react"),V=require("react/jsx-runtime");function ao({code:e,itemCount:t,onConfirm:n,onDismiss:r}){let[o,i]=(0,Qe.useState)(e),s=(0,Qe.useRef)(null);(0,Qe.useEffect)(()=>{s.current?.focus(),s.current?.select()},[]);let a=o.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(a);return(0,V.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:u=>{u.target===u.currentTarget&&r()},children:(0,V.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Board code",style:{width:400},children:[(0,V.jsx)("div",{className:"kf-dialog-head",children:(0,V.jsx)("span",{className:"kf-dialog-title",children:"Name your board"})}),(0,V.jsxs)("div",{className:"kf-dialog-body",children:[(0,V.jsxs)("div",{className:"kf-muted",children:["Pick a short code (2\u20136 letters/digits) for this workspace's board. New items get ids like"," ",(0,V.jsx)("strong",{children:(a.length>=2?a:"XX")+"-1"}),".",t>0&&" Existing item ids stay unchanged."]}),(0,V.jsxs)("div",{children:[(0,V.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,V.jsx)("input",{ref:s,className:"kf-input",style:{fontFamily:"var(--ds-font-family-code)",textTransform:"uppercase",fontSize:16,letterSpacing:"0.08em"},value:o,onChange:u=>i(u.target.value.toUpperCase()),onKeyDown:u=>{u.key==="Enter"&&l&&n(a),u.key==="Escape"&&r()},maxLength:6})]}),(0,V.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,V.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:r,children:"Decide later"}),(0,V.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!l,onClick:()=>n(a),children:["Use ",a||"\u2026"]})]})]})]})})}var we=require("react");var L=require("react/jsx-runtime");function Cn({on:e,onToggle:t,label:n}){return(0,L.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":n,className:"kf-switch"+(e?" kf-on":""),onClick:t,children:(0,L.jsx)("span",{className:"kf-switch-thumb"})})}function lo({board:e,onCode:t,onConfirmRequired:n,onClose:r}){let o=(0,we.useRef)(null),[i,s]=(0,we.useState)(e.code);(0,we.useEffect)(()=>{let f=c=>{o.current&&!o.current.contains(c.target)&&r()};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[r]);let a=i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(a),u=!!(e.settings&&e.settings.confirmRequired);return(0,L.jsxs)("div",{className:"kf-pop",ref:o,role:"dialog","aria-label":"Board settings",children:[(0,L.jsxs)("div",{className:"kf-toggle-row",children:[(0,L.jsx)(Cn,{on:u,onToggle:()=>n(!u),label:"Require confirmation to complete work"}),(0,L.jsxs)("div",{className:"kf-toggle-text",children:[(0,L.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to complete work"}),(0,L.jsx)("div",{className:"kf-toggle-sub",children:"On: the agent must send finished work through Review \u2014 it can never move items to Done. You complete by dragging to Done."})]})]}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,L.jsxs)("div",{className:"kf-code-row",children:[(0,L.jsx)("input",{className:"kf-input",value:i,maxLength:6,onChange:f=>s(f.target.value.toUpperCase())}),(0,L.jsx)("button",{type:"button",className:"kf-btn",disabled:!l||a===e.code,onClick:()=>t(a),children:"Save"})]}),(0,L.jsxs)("div",{className:"kf-toggle-sub",style:{marginTop:4},children:["Prefixes new item ids (",e.code,"-1, ",e.code,"-2\u2026). Existing ids stay unchanged. The workspace-click preference lives in Settings \u2192 Plugins \u2192 Kanban Flow."]})]})]})}function co(){let e=(0,we.useSyncExternalStore)(_r,qt),t=(0,we.useSyncExternalStore)(_t,$t);return(0,L.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:520},children:[(0,L.jsxs)("div",{className:"kf-toggle-row",children:[(0,L.jsx)(Cn,{on:e,onToggle:()=>$r(!e),label:"Workspace click opens board"}),(0,L.jsxs)("div",{className:"kf-toggle-text",children:[(0,L.jsx)("div",{className:"kf-toggle-title",children:"Workspace click opens board"}),(0,L.jsx)("div",{className:"kf-toggle-sub",children:"New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its conversation (the folder icon still expands the session list). Old: clicking a workspace expands its session list."})]})]}),(0,L.jsxs)("div",{className:"kf-toggle-row",children:[(0,L.jsx)(Cn,{on:t,onToggle:()=>jr(!t),label:"Require confirmation to archive items"}),(0,L.jsxs)("div",{className:"kf-toggle-text",children:[(0,L.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to archive items"}),(0,L.jsx)("div",{className:"kf-toggle-sub",children:"On: archiving an item from its card first opens a confirmation dialog describing what will be removed. Off: the card's archive button removes the item (and archives its task session) immediately."})]})]}),(0,L.jsx)("div",{className:"kf-muted",children:"Board-specific options \u2014 \u201CRequire confirmation to complete work\u201D and the board code \u2014 live in the gear menu of each board (Board tab \u2192 \u2699)."})]})}var b=require("react/jsx-runtime"),ms=e=>{let t=cr(e);if(t.length>0)return t;let n=fn(e);return n.length>0?n:lr(e)};function et({path:e,size:t=15}){return(0,b.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,b.jsx)("path",{d:e})})}var vs="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",hs="M5 12h14M12 5v14",bs="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",ks="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",ws="M2 4h20v4H2zM3 8v12h18V8 M10 12h4";function ys({item:e,flash:t,lastActivity:n,onOpenSession:r,onDetails:o,onReady:i,onArchive:s}){let{attributes:a,listeners:l,setNodeRef:u,isDragging:f}=Nr({id:e.id}),[c,g]=(0,T.useState)(!1),[p,I]=(0,T.useState)(null),h=(0,T.useRef)(null),w=(0,T.useRef)(null),y=e.statusNote?{title:"Status",body:e.statusNote,time:me(e.statusAt)}:null,m=()=>{f||!y||(w.current!==null&&window.clearTimeout(w.current),w.current=window.setTimeout(()=>{let C=h.current;if(!C)return;let A=C.getBoundingClientRect();I({left:A.left,top:A.top,width:A.width}),g(!0)},300))},S=()=>{w.current!==null&&(window.clearTimeout(w.current),w.current=null),g(!1)};return(0,T.useEffect)(()=>()=>{w.current!==null&&window.clearTimeout(w.current)},[]),(0,T.useEffect)(()=>{f&&S()},[f]),(0,b.jsxs)("div",{ref:C=>{h.current=C,u(C)},...a,...l,className:"kf-card"+(t?" kf-agent-flash":"")+(e.sessionId?" kf-has-session":"")+(f?" kf-dragging":""),style:{"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},onMouseEnter:m,onMouseLeave:S,onFocus:m,onBlur:S,onClick:C=>{C.target.closest(".kf-edit-fab, .kf-archive-fab, .kf-ready-btn, .kf-session-badge")||o()},children:[(0,b.jsx)("button",{type:"button",className:"kf-edit-fab",title:"\u0414\u0435\u0442\u0430\u043B\u0438","aria-label":"\u0414\u0435\u0442\u0430\u043B\u0438 "+e.id,onClick:C=>{C.stopPropagation(),o()},children:(0,b.jsx)(et,{path:vs,size:13})}),(0,b.jsx)("button",{type:"button",className:"kf-archive-fab",title:"Archive item","aria-label":"Archive "+e.id,onClick:C=>{C.stopPropagation(),s()},children:(0,b.jsx)(et,{path:ws,size:13})}),(0,b.jsxs)("div",{className:"kf-card-id",children:[e.id,e.sessionId&&(0,b.jsx)("button",{type:"button",className:"kf-session-badge",title:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E \u0437\u0430\u0434\u0430\u0447\u0438 "+e.sessionId,onClick:C=>{C.stopPropagation(),r()},children:(0,b.jsx)(et,{path:ks,size:11})}),e.draft&&(0,b.jsx)("span",{className:"kf-pill kf-pill-draft",children:"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A"}),e.priority&&e.priority!=="normal"&&(0,b.jsx)("span",{className:"kf-prio kf-prio-"+e.priority,children:Ft[e.priority]})]}),(0,b.jsx)("div",{className:"kf-card-name",children:e.name}),e.stats&&(e.stats.agents>0||e.stats.subagents>0||e.stats.jobs>0)&&(0,b.jsxs)("div",{className:"kf-card-stats",children:[e.stats.agents>0&&(0,b.jsxs)("span",{className:"kf-stat-chip",title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435",children:["\u{1F916} ",e.stats.agents]}),e.stats.subagents>0&&(0,b.jsxs)("span",{className:"kf-stat-chip",title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B",children:["\u{1F465} ",e.stats.subagents]}),e.stats.jobs>0&&(0,b.jsxs)("span",{className:"kf-stat-chip",title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job",children:["\u2699 ",e.stats.jobs]})]}),e.draft&&(0,b.jsx)("button",{type:"button",className:"kf-ready-btn",onClick:C=>{C.stopPropagation(),i()},children:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"}),n&&(0,b.jsxs)("div",{className:"kf-card-activity",children:[(0,b.jsx)("span",{className:"kf-card-activity-phrase",children:n.phrase}),(0,b.jsx)("span",{className:"kf-card-activity-time",children:n.time})]}),c&&y&&p&&(0,uo.createPortal)((0,b.jsxs)("div",{className:"kf-card-tip",role:"tooltip",style:{left:p.left,top:p.top,width:p.width,transform:"translateY(calc(-100% - 6px))"},children:[(0,b.jsxs)("div",{className:"kf-card-tip-title",children:[y.title,y.time?" \xB7 "+y.time:""]}),(0,b.jsx)("div",{className:"kf-card-tip-body",children:y.body}),e.sessionId&&(0,b.jsx)("div",{className:"kf-card-tip-hint",children:"Click to open the task session"})]}),document.body)]})}function xs({columnId:e,onAdd:t,onCancel:n}){let[r,o]=(0,T.useState)(""),[i,s]=(0,T.useState)("");return(0,b.jsxs)("div",{className:"kf-newitem",children:[(0,b.jsx)("input",{className:"kf-input",autoFocus:!0,placeholder:"Item name",value:r,onChange:a=>o(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r.trim()&&t(r,i),a.key==="Escape"&&n()}}),(0,b.jsx)("textarea",{className:"kf-textarea",placeholder:"Description (optional)",value:i,onChange:a=>s(a.target.value)}),(0,b.jsxs)("div",{className:"kf-newitem-row",children:[(0,b.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,b.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!r.trim(),onClick:()=>t(r,i),children:["Add to ",se[e]]})]})]})}function Ss({colId:e,highlighted:t,adding:n,items:r,flashIds:o,lastLines:i,onAdd:s,onCancelAdd:a,onOpenSession:l,onDetails:u,onReady:f,onArchive:c}){let{setNodeRef:g}=Dr({id:e});return(0,b.jsxs)("div",{className:"kf-column kf-"+e+(t?" kf-over":""),children:[(0,b.jsxs)("div",{className:"kf-column-head",children:[(0,b.jsx)("span",{className:"kf-column-dot"}),(0,b.jsx)("span",{className:"kf-column-title",children:se[e]})]}),(0,b.jsxs)("div",{className:"kf-column-list",ref:g,children:[n&&(0,b.jsx)(xs,{columnId:e,onAdd:s,onCancel:a}),r.length===0&&!n&&(0,b.jsx)("div",{className:"kf-column-empty",children:"No items"}),r.map(p=>(0,b.jsx)(ys,{item:p,flash:o.has(p.id),lastActivity:i.get(p.id),onOpenSession:()=>l(p),onDetails:()=>u(p),onReady:()=>f(p),onArchive:()=>c(p)},p.id))]})]})}function fo(e){let{workspaceId:t,workspaceTitle:n,sessions:r,archiveSession:o,onOpenTask:i}=e,[s,a]=(0,T.useState)(null),[l,u]=(0,T.useState)(""),[f,c]=(0,T.useState)([]),[g,p]=(0,T.useState)(null),[I,h]=(0,T.useState)(null),[w,y]=(0,T.useState)(!1),[m,S]=(0,T.useState)(!1),[C,A]=(0,T.useState)(null),[O,N]=(0,T.useState)(null),D=(0,T.useSyncExternalStore)(_t,$t),[v,M]=(0,T.useState)(null),[W,te]=(0,T.useState)(new Set),ne=(0,T.useRef)(null),de=ir(or(Xe,{activationConstraint:{distance:6}})),Re=(0,T.useCallback)(k=>{if(k&&k.board){let E={...k.board,activities:Array.isArray(k.board.activities)?k.board.activities:[]},z=ne.current;if(z){let P=new Set;for(let J of E.items){let le=z.get(J.id);le&&le!==J.columnId+"|"+J.name+"|"+J.description&&P.add(J.id)}P.size>0&&(te(P),window.setTimeout(()=>te(new Set),1500))}ne.current=new Map(E.items.map(P=>[P.id,P.columnId+"|"+P.name+"|"+P.description])),a(E),u(""),Pr(t,E)}k&&typeof k.error=="string"&&k.error&&u(k.error),Array.isArray(k&&k.warnings)&&k.warnings.length>0&&c(E=>[...E,...k.warnings])},[t]),X=(0,T.useCallback)((k,E={})=>U(k,E,t).then(Re),[t,Re]);(0,T.useEffect)(()=>{let k=!1,E=()=>U("get",{},t).then(P=>{k||Re(P)});E();let z=window.setInterval(E,3e3);return()=>{k=!0,window.clearInterval(z)}},[t,Re]),(0,T.useEffect)(()=>{s&&!s.codeConfirmed&&!w&&y(!0)},[s&&s.codeConfirmed]);let re=(0,T.useCallback)(k=>{if(!k.sessionId||!r)return;let E=r.list?.getSnapshot?.()?.current;if(E!==void 0&&E===k.sessionId){Yt();return}r.open(k.sessionId)},[r]),It=k=>{let E=s?.items.find(z=>z.id===String(k.active.id));E&&A(E)},ve=k=>{let E=k.over?String(k.over.id):null;M(Ge.includes(E)?E:null)},nt=k=>{A(null);let{active:E,over:z}=k;if(!z||!s)return;let P=String(E.id),J=String(z.id),qe=Ge.includes(J)?J:s.items.find(ye=>ye.id===J)?.columnId;if(!qe)return;let ue=s.items.find(ye=>ye.id===P);!ue||ue.columnId===qe||X("moveItem",{id:P,toColumn:qe})},Ct=k=>{g&&(g.item?X("updateItem",{id:g.item.id,name:k.name,description:k.description}):X("createItem",{name:k.name,description:k.description,columnId:g.columnId}),p(null))},he=k=>{if(D){N(k);return}be(k)},be=k=>{X("deleteItem",{id:k.id}),k.sessionId&&o&&o(k.sessionId)},Fe=(0,T.useMemo)(()=>{let k=new Map;for(let E of s?.activities??[])E.itemId&&k.set(E.itemId,Wr(E));return k},[s]),Nt=s&&(0,b.jsxs)("div",{className:"kf-header",children:[(0,b.jsxs)("span",{className:"kf-header-title",children:[(0,b.jsx)("span",{className:"kf-code-chip",children:s.code}),n||"\u041A\u0430\u043D\u0431\u0430\u043D"]}),(0,b.jsxs)("span",{className:"kf-count-chip",children:[s.items.length," \u0437\u0430\u0434\u0430\u0447"]}),(0,b.jsxs)("button",{type:"button",className:"kf-btn kf-primary kf-new-item-btn",title:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u0432 \u0431\u0435\u043A\u043B\u043E\u0433\u0435","aria-label":"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u0434\u0430\u0447\u0443 \u0432 \u0431\u0435\u043A\u043B\u043E\u0433\u0435",onClick:()=>i?i({mode:"new",workspaceId:t,workspaceTitle:n,columnId:"backlog"}):h("backlog"),children:[(0,b.jsx)(et,{path:hs,size:15}),"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430"]}),(0,b.jsx)("span",{className:"kf-spacer"}),(0,b.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Refresh","aria-label":"Refresh board",onClick:()=>X("get"),children:(0,b.jsx)(et,{path:"M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"})}),(0,b.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Board settings","aria-label":"Board settings",onClick:()=>S(k=>!k),children:(0,b.jsx)(et,{path:bs})}),m&&(0,b.jsx)(lo,{board:s,onCode:k=>X("setCode",{code:k}).then(()=>y(!1)),onConfirmRequired:k=>X("setConfirmRequired",{value:k}),onClose:()=>S(!1)})]}),G=s&&(0,b.jsx)("div",{className:"kf-body",children:(0,b.jsx)("div",{className:"kf-columns",children:Ge.map(k=>{let E=(s.items??[]).filter(z=>z.columnId===k);return(0,b.jsx)(Ss,{colId:k,highlighted:v===k&&C!==null,adding:I===k&&k==="backlog",items:E,flashIds:W,lastLines:Fe,onAdd:(z,P)=>{X("createItem",{name:z,description:P,columnId:"backlog"}),h(null)},onCancelAdd:()=>h(null),onOpenSession:re,onDetails:z=>i?i({mode:"edit",workspaceId:t,workspaceTitle:n,itemId:z.id}):p({item:z,columnId:z.columnId}),onReady:z=>{X("setDraft",{id:z.id,draft:!1})},onArchive:he},k)})})});return(0,b.jsxs)("div",{className:"kf-root",children:[f.length>0&&(0,b.jsxs)("div",{className:"kf-warning",children:[f.map((k,E)=>(0,b.jsx)("div",{children:k},E)),(0,b.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>c([]),children:"Dismiss"})]}),Nt,l&&(0,b.jsx)("div",{className:"kf-error kf-loading",children:l}),s?(0,b.jsxs)(Cr,{sensors:de,collisionDetection:ms,onDragStart:It,onDragOver:ve,onDragEnd:nt,children:[G,(0,b.jsx)(Er,{dropAnimation:{duration:220,easing:"cubic-bezier(0.2, 0, 0, 1)"},children:C?(0,b.jsxs)("div",{className:"kf-card kf-drag-ghost",style:{width:240,"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},children:[(0,b.jsx)("div",{className:"kf-card-id",children:C.id}),(0,b.jsx)("div",{className:"kf-card-name",children:C.name})]}):null})]}):!l&&(0,b.jsx)("div",{className:"kf-loading",children:"Loading board\u2026"}),s&&g&&!i&&(0,b.jsx)(so,{item:g.item,board:s,onOpenChange:k=>{k||p(null)},onSave:Ct,onDelete:k=>{let E=s.items.find(z=>z.id===k);X("deleteItem",{id:k}),E&&E.sessionId&&o&&o(E.sessionId),p(null)},onOpenSession:re}),O&&(0,b.jsx)(io,{item:O,onConfirm:()=>{be(O),N(null)},onCancel:()=>N(null)}),s&&w&&(0,b.jsx)(ao,{code:s.code,itemCount:s.items.length,onConfirm:k=>X("setCode",{code:k}).then(()=>y(!1)),onDismiss:()=>y(!1)})]})}var F=require("react");var go=require("react"),tt={requestId:0,mode:"new",workspaceId:"",open:!1},Nn=new Set;function mo(){for(let e of Nn)e()}function Xt(e){tt={...e,requestId:tt.requestId+1,open:!0},mo()}function vo(){tt.open&&(tt={...tt,open:!1},mo())}function po(){return tt}function Is(e){return Nn.add(e),()=>{Nn.delete(e)}}function ho(){return(0,go.useSyncExternalStore)(Is,po,po)}var x=require("react/jsx-runtime");function Dn({icon:e,value:t,title:n}){return t?(0,x.jsxs)("span",{className:"kf-stat-chip",title:n,children:[(0,x.jsx)("span",{"aria-hidden":"true",children:e})," ",t]}):null}function Gt({label:e,children:t}){return(0,x.jsxs)("label",{className:"kf-field",children:[(0,x.jsx)("span",{className:"kf-field-label",children:e}),t]})}function bo({sessions:e}){let t=ho(),[n,r]=(0,F.useState)(null),[o,i]=(0,F.useState)(""),[s,a]=(0,F.useState)(!1),[l,u]=(0,F.useState)(""),[f,c]=(0,F.useState)(""),[g,p]=(0,F.useState)("normal"),[I,h]=(0,F.useState)(""),[w,y]=(0,F.useState)("todo"),m=(0,F.useMemo)(()=>{if(!(!n||!t.itemId))return n.items.find(v=>v.id===t.itemId)},[n,t.itemId]),S=(0,F.useCallback)(async()=>{if(!t.workspaceId)return;let v=await U("get",{},t.workspaceId);v&&v.board?(r(v.board),i("")):v&&v.error&&i(v.error)},[t.workspaceId]);(0,F.useEffect)(()=>{if(!t.workspaceId)return;let v=!1;S();let M=window.setInterval(()=>{v||S()},3e3);return()=>{v=!0,window.clearInterval(M)}},[t.workspaceId,t.requestId,S]),(0,F.useEffect)(()=>{if(t.mode==="new"){u(""),c(""),p("normal"),h("");return}m&&(u(m.name),c(m.description||""),p(m.priority||"normal"),h((m.labels||[]).join(", ")))},[t.requestId,t.mode,m?.id]);let C=(0,F.useCallback)(async()=>{if(!(!l.trim()||s)){a(!0);try{if(t.mode==="new"){let v=await U("createItem",{name:l.trim(),description:f,columnId:t.columnId||"backlog",draft:!0,priority:g,labels:I.split(",").map(M=>M.trim()).filter(Boolean)},t.workspaceId);v&&v.ok===!1?i(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"):v&&v.item&&Xt({mode:"edit",workspaceId:t.workspaceId,workspaceTitle:t.workspaceTitle,itemId:v.item.id})}else if(m){let v=await U("updateItem",{id:m.id,name:l.trim(),description:f,priority:g,labels:I.split(",").map(M=>M.trim()).filter(Boolean)},t.workspaceId);v&&v.ok===!1&&i(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")}await S()}finally{a(!1)}}},[s,f,m,I,S,l,g,t,i]),A=(0,F.useCallback)(async()=>{if(!(!m||s)){a(!0);try{let v=await U("setDraft",{id:m.id,draft:!1},t.workspaceId);v&&v.ok===!1&&i(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443"),await S()}finally{a(!1)}}},[s,m,S,t.workspaceId]),O=(0,F.useCallback)(async()=>{if(!(!m||s||w===m.columnId)){a(!0);try{let v=await U("moveItem",{id:m.id,toColumn:w},t.workspaceId);v&&v.ok===!1&&i(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"),await S()}finally{a(!1)}}},[s,m,S,w,t.workspaceId]),N=(0,F.useCallback)(async()=>{if(!(!m||s)&&window.confirm("\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 "+m.id+"? \u0421\u0435\u0441\u0441\u0438\u044F \u0437\u0430\u0434\u0430\u0447\u0438 \u0431\u0443\u0434\u0435\u0442 \u0430\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0430.")){a(!0);try{let v=await U("deleteItem",{id:m.id},t.workspaceId);v&&v.ok===!1&&i(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C"),vo()}finally{a(!1)}}},[s,m,t.workspaceId]),D=(0,F.useMemo)(()=>!n||!m?[]:n.activities.filter(v=>v.itemId===m.id).slice(-8).reverse(),[n,m]);return t.workspaceId?(0,x.jsxs)("div",{className:"kf-task-panel",children:[(0,x.jsxs)("div",{className:"kf-task-panel-head",children:[(0,x.jsxs)("div",{className:"kf-task-panel-title",children:[(0,x.jsx)("span",{className:"kf-task-panel-code",children:m?m.id:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430"}),m&&(0,x.jsx)("span",{className:m.draft?"kf-pill kf-pill-draft":"kf-pill kf-pill-ready",children:m.draft?"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"})]}),m&&(0,x.jsxs)("div",{className:"kf-task-panel-stats",children:[(0,x.jsx)(Dn,{icon:"\u{1F916}",value:m.stats?.agents||0,title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435"}),(0,x.jsx)(Dn,{icon:"\u{1F465}",value:m.stats?.subagents||0,title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B"}),(0,x.jsx)(Dn,{icon:"\u2699",value:m.stats?.jobs||0,title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job"})]})]}),o&&(0,x.jsx)("div",{className:"kf-panel-error",children:o}),t.mode==="new"&&(0,x.jsx)("div",{className:"kf-panel-hint",children:"\u0417\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043A\u0430\u043A \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A. \u041E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0451 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C\xBB, \u043A\u043E\u0433\u0434\u0430 \u0431\u0443\u0434\u0435\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B \u043E\u0442\u0434\u0430\u0442\u044C \u0430\u0433\u0435\u043D\u0442\u0443."}),(0,x.jsx)(Gt,{label:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",children:(0,x.jsx)("input",{className:"kf-input",value:l,placeholder:"\u041A\u043E\u0440\u043E\u0442\u043A\u043E: \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C",onChange:v=>u(v.target.value)})}),(0,x.jsx)(Gt,{label:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",children:(0,x.jsx)("textarea",{className:"kf-textarea",rows:5,value:f,placeholder:"\u0414\u0435\u0442\u0430\u043B\u0438, \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043F\u0440\u0438\u0451\u043C\u043A\u0438, \u0441\u0441\u044B\u043B\u043A\u0438",onChange:v=>c(v.target.value)})}),(0,x.jsxs)("div",{className:"kf-field-row",children:[(0,x.jsx)(Gt,{label:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",children:(0,x.jsx)("select",{className:"kf-input",value:g,onChange:v=>p(v.target.value),children:Br.map(v=>(0,x.jsx)("option",{value:v,children:Ft[v]},v))})}),(0,x.jsx)(Gt,{label:"\u041C\u0435\u0442\u043A\u0438",children:(0,x.jsx)("input",{className:"kf-input",value:I,placeholder:"ui, backend",onChange:v=>h(v.target.value)})})]}),m&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"kf-task-panel-meta",children:[(0,x.jsxs)("span",{children:["\u041A\u043E\u043B\u043E\u043D\u043A\u0430: ",(0,x.jsx)("b",{children:se[m.columnId]})]}),m.createdBy==="agent"?(0,x.jsx)("span",{children:"\u0421\u043E\u0437\u0434\u0430\u043B \u0430\u0433\u0435\u043D\u0442"}):(0,x.jsx)("span",{children:"\u0421\u043E\u0437\u0434\u0430\u043B\u0438 \u0432\u044B"}),m.updatedAt&&(0,x.jsxs)("span",{children:["\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E ",me(m.updatedAt)]})]}),m.statusNote&&(0,x.jsxs)("div",{className:"kf-task-note",children:[(0,x.jsxs)("div",{className:"kf-task-note-title",children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u0433\u0435\u043D\u0442\u0430 \xB7 ",me(m.statusAt)]}),(0,x.jsx)("div",{children:m.statusNote})]})]}),(0,x.jsxs)("div",{className:"kf-task-actions",children:[(0,x.jsx)("button",{type:"button",className:"kf-btn kf-primary",disabled:s||!l.trim(),onClick:()=>{C()},children:t.mode==="new"?"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"}),m&&m.draft&&(0,x.jsx)("button",{type:"button",className:"kf-btn kf-success",disabled:s,onClick:()=>{A()},children:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"}),m&&!m.draft&&m.columnId!=="todo"&&(0,x.jsx)("button",{type:"button",className:"kf-btn kf-ghost",disabled:s,onClick:()=>{U("setDraft",{id:m.id,draft:!0},t.workspaceId).then(()=>S())},children:"\u0412 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A"}),m&&m.sessionId&&e&&(0,x.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>e.open(m.sessionId),children:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"})]}),m&&(0,x.jsxs)("div",{className:"kf-task-move",children:[(0,x.jsx)("select",{className:"kf-input",value:w,onChange:v=>y(v.target.value),children:Ge.map(v=>(0,x.jsx)("option",{value:v,children:se[v]},v))}),(0,x.jsx)("button",{type:"button",className:"kf-btn kf-ghost",disabled:s||w===m.columnId,onClick:()=>{O()},children:"\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"}),(0,x.jsx)("button",{type:"button",className:"kf-btn kf-danger",disabled:s,onClick:()=>{N()},children:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C"})]}),m&&D.length>0&&(0,x.jsxs)("div",{className:"kf-task-activity",children:[(0,x.jsx)("div",{className:"kf-task-activity-title",children:"\u0418\u0441\u0442\u043E\u0440\u0438\u044F"}),D.map(v=>(0,x.jsxs)("div",{className:"kf-task-activity-row",children:[(0,x.jsx)("span",{className:"kf-task-activity-time",children:me(v.ts)}),(0,x.jsx)("span",{className:"kf-task-activity-text",children:v.type==="item_moved"?`\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E ${se[v.from]||v.from} \u2192 ${se[v.to]||v.to}`:v.type==="item_created"?"\u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0430":v.type==="item_draft"?v.to==="ready"?"\u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E \u0432 \u0440\u0430\u0431\u043E\u0442\u0443":"\u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u043E \u0432 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":v.type==="item_status"?"\u0441\u0442\u0430\u0442\u0443\u0441 \u0430\u0433\u0435\u043D\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D":v.type==="item_updated"?"\u0437\u0430\u0434\u0430\u0447\u0430 \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430":v.type})]},v.id))]})]}):(0,x.jsx)("div",{className:"kf-panel-empty",children:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043D\u0430 \u0434\u043E\u0441\u043A\u0435 \xAB\u041A\u0430\u043D\u0431\u0430\u043D\xBB."})}function Cs(e){let t={items:[]};return!e||!e.list||typeof e.list.getSnapshot!="function"?t:(0,q.useSyncExternalStore)(n=>e.list.subscribe(n),()=>e.list.getSnapshot())}function Ns(e){if(!(!e||!e.list||typeof e.list.getSnapshot!="function"))return(0,q.useSyncExternalStore)(t=>e.list.subscribe(t),()=>e.list.getSnapshot().current)}function Ds(e){let t=Cs(e.workspaces),n=(0,q.useSyncExternalStore)(Jr,Gr),r=Ns(e.sessions)??e.sessionId,o=Kr({override:n,currentSessionId:r,workspaceItems:Array.isArray(t.items)?t.items:[],recentWorkspaceId:t.recentWorkspaceId});(0,q.useEffect)(()=>{n&&o.nativeWorkspaceId===n.workspaceId&&yt(null)},[n,o.nativeWorkspaceId]);let i=e.workspaces?.archiveSession?s=>{e.workspaces.archiveSession(s)}:void 0;return(0,q.createElement)(fo,{workspaceId:o.workspaceId,workspaceTitle:o.pinned?o.workspaceTitle||o.workspaceId:o.workspaceTitle,sessions:e.sessions,archiveSession:i,onOpenTask:e.onOpenTask})}function Es(){return(0,q.createElement)(co)}function As(e){return(0,q.useEffect)(()=>{let t=e.sessions;t&&Or({createSession:n=>t.create({workspaceId:n}),renameSession:async(n,r)=>{let i=await t.binding(n)?.session.rename(r);i&&i.ok===!1&&console.warn("dsh-kanban: rename failed",i.error)},promptSession:async(n,r)=>{let o=t.binding(n);if(!o)throw new Error("session binding unavailable: "+n);let i=await o.session.prompt([{type:"text",text:r}],"queue");if(i&&i.ok===!1)throw new Error("prompt failed: "+(i.error&&i.error.message))},archiveSession:async n=>{let r=e.workspaces?.archiveSession;if(!r)throw new Error("workspaces.archiveSession unavailable");await r(n)}})},[e.sessions,e.workspaces]),(0,q.createElement)("div",{style:{display:"contents"}},(0,q.createElement)(Zr,{workspaces:e.workspaces,sessions:e.sessions}),(0,q.createElement)(Qr,{workspaces:e.workspaces,sessions:e.sessions}),(0,q.createElement)(Xr),(0,q.createElement)(oo,{workspaces:e.workspaces}),(0,q.createElement)(no,{workspaces:e.workspaces}),(0,q.createElement)(ro,{workspaces:e.workspaces}))}var ko="dsh-kanban/task",wo="dsh-kanban-task",yo={name:"dsh-kanban",inject:["slots","workspaces","sessions","sidebarRightTabs"],apply(e){let t=e.get("slots");if(t===void 0)return;let n=e.get("workspaces"),r=e.get("sessions"),o=s=>{Xt({mode:s.mode,workspaceId:s.workspaceId,workspaceTitle:s.workspaceTitle,itemId:s.itemId,columnId:s.columnId});let a=e.get("sidebarRight");if(a&&typeof a.openTab=="function")try{a.openTab(wo)}catch(l){console.warn("dsh-kanban: cannot open task panel",l)}};t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban",order:20,label:"\u041A\u0430\u043D\u0431\u0430\u043D"},s=>(0,q.createElement)(Ds,{...s,workspaces:n,sessions:r,onOpenTask:o})));let i=e.get("sidebarRightTabs");if(i&&typeof i.register=="function"){let s=()=>i.register({id:ko,kind:wo,title:()=>"\u0417\u0430\u0434\u0430\u0447\u0430",guide:[{id:"task",order:70,title:()=>"\u0417\u0430\u0434\u0430\u0447\u0430 \u043A\u0430\u043D\u0431\u0430\u043D\u0430",description:()=>"\u0414\u0435\u0442\u0430\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u0434\u0430\u0447\u0438"}]});typeof e.effect=="function"?e.effect(s,"dsh-kanban: sidebar tab"):s()}t.inject("sidebar.right.pane.tab",()=>t.register({name:"sidebar.right.pane.tab",key:ko},()=>(0,q.createElement)(bo,{sessions:r}))),t.inject("settings.plugins.tab",()=>t.register({name:"settings.plugins.tab",id:"dsh-kanban",order:10,label:"\u041A\u0430\u043D\u0431\u0430\u043D"},()=>(0,q.createElement)(Es))),t.inject("sidebar.footer.action",()=>t.register({name:"sidebar.footer.action",id:"kanban-controllers",order:90},()=>(0,q.createElement)(As,{workspaces:n,sessions:r})))}};try{console.info("[dsh-kanban] client bundle loaded (build 2026-11-03T14:23:28.909Z)")}catch{}var xo="data-dsh-kanban-style";if(typeof document<"u"&&!document.querySelector("style["+xo+"]")){let e=document.createElement("style");e.setAttribute(xo,""),e.textContent=Wn,document.head.appendChild(e)}var Ts=yo;
    
    return module.exports
  },
})