window.__ModuleLoader__.load({
  id: "dsh-kanban",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";var ji=Object.create;var Kt=Object.defineProperty;var Hi=Object.getOwnPropertyDescriptor;var Vi=Object.getOwnPropertyNames;var Ui=Object.getPrototypeOf,Yi=Object.prototype.hasOwnProperty;var Xi=(e,t)=>{for(var n in t)Kt(e,n,{get:t[n],enumerable:!0})},Xn=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Vi(t))!Yi.call(e,i)&&i!==n&&Kt(e,i,{get:()=>t[i],enumerable:!(r=Hi(t,i))||r.enumerable});return e};var Gn=(e,t,n)=>(n=e!=null?ji(Ui(e)):{},Xn(t||!e||!e.__esModule?Kt(n,"default",{value:e,enumerable:!0}):n,e)),Gi=e=>Xn(Kt({},"__esModule",{value:!0}),e);var Xs={};Xi(Xs,{default:()=>Ys});module.exports=Gi(Xs);var Jn=`/* dsh-kanban-flow client styles \u2014 kf-* namespace.
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
    
    /* ------------------------------------------------------------------ item view
       Read-only task dialog: grouped meta, description and the
       "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438" / "\u041B\u043E\u0433" tabs. Wider than the edit dialog. */
    
    .kf-item-view {
      width: min(860px, calc(100vw - 32px));
      max-height: min(86vh, 920px);
    }
    
    .kf-item-view-body { gap: 14px; }
    
    .kf-item-meta {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px 14px;
      padding: 10px 12px;
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 10px;
      background: var(--dsw-alias-bg-layer-1);
    }
    
    @media (max-width: 640px) {
      .kf-item-meta { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    
    .kf-item-meta-cell { min-width: 0; font-size: 13px; overflow-wrap: anywhere; }
    
    .kf-item-session {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--dsw-alias-bg-layer-2);
      font-size: 12.5px;
    }
    
    .kf-pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font-size: 13px;
      line-height: 1.55;
    }
    
    .kf-item-description {
      max-height: none;
      overflow: visible;
      padding: 10px 12px;
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 10px;
      background: var(--dsw-alias-bg-layer-1);
    }
    
    .kf-chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
    
    .kf-tabs {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--dsw-alias-border-l2);
    }
    
    .kf-tab {
      appearance: none;
      border: none;
      background: none;
      padding: 8px 10px;
      font: inherit;
      font-size: 13px;
      color: var(--dsw-alias-label-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }
    
    .kf-tab:hover { color: var(--dsw-alias-label-primary); }
    
    .kf-tab-active {
      color: var(--dsw-alias-label-primary);
      font-weight: 600;
      border-bottom-color: var(--dsw-alias-accent, var(--dsw-alias-border-l3));
    }
    
    .kf-tab-count {
      display: inline-block;
      margin-left: 6px;
      padding: 0 6px;
      border-radius: 999px;
      background: var(--dsw-alias-bg-layer-2);
      color: var(--dsw-alias-label-tertiary);
      font-size: 11px;
      font-weight: 500;
    }
    
    .kf-tab-panel { display: flex; flex-direction: column; gap: 10px; }
    
    .kf-comment-list { display: flex; flex-direction: column; gap: 8px; }
    
    .kf-comment {
      padding: 8px 10px;
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 10px;
      background: var(--dsw-alias-bg-layer-1);
    }
    
    .kf-comment-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }
    
    .kf-comment-author { font-size: 12px; font-weight: 600; }
    .kf-comment-time { font-size: 11px; color: var(--dsw-alias-label-tertiary); }
    
    .kf-comment-form { display: flex; flex-direction: column; gap: 8px; }
    .kf-comment-actions { display: flex; justify-content: flex-end; }
    
    .kf-log { display: flex; flex-direction: column; gap: 2px; }
    
    .kf-log-row {
      display: grid;
      grid-template-columns: 10px minmax(0, 1fr) auto;
      align-items: start;
      gap: 8px;
      padding: 6px 2px;
      border-bottom: 1px solid var(--dsw-alias-border-l1, var(--dsw-alias-border-l2));
    }
    
    .kf-log-row:last-child { border-bottom: none; }
    
    .kf-log-dot {
      width: 7px;
      height: 7px;
      margin-top: 6px;
      border-radius: 50%;
      background: var(--dsw-alias-label-tertiary);
    }
    
    .kf-log-dot.kf-log-human { background: light-dark(#2563eb, #60a5fa); }
    .kf-log-dot.kf-log-agent { background: light-dark(#7c3aed, #a78bfa); }
    
    .kf-log-main { min-width: 0; }
    .kf-log-line { font-size: 12.5px; display: flex; gap: 6px; flex-wrap: wrap; }
    .kf-log-actor { font-weight: 600; }
    .kf-log-phrase { color: var(--dsw-alias-label-secondary); }
    .kf-log-note { margin-top: 2px; font-size: 12px; color: var(--dsw-alias-label-tertiary); }
    .kf-log-time { font-size: 11px; color: var(--dsw-alias-label-tertiary); white-space: nowrap; }
    
    /* ------------------------------------------------- per-column internal scroll
       On wide boards the board itself must not scroll: the header stays, every
       column keeps its own scroll area (the "\u0413\u043E\u0442\u043E\u0432\u043E" column can be long). */
    
    @container kf-board (min-width: 900px) {
      .kf-body { overflow-y: hidden; }
      .kf-columns { min-height: 0; height: 100%; }
      .kf-columns > .kf-column { min-height: 0; overflow: hidden; }
      .kf-column-list { min-height: 0; }
      .kf-column-head { position: sticky; top: 0; z-index: 1; background: inherit; }
    }\r
    
    /* ---------------------------------------------- right-panel task view (mode=view) */
    
    .kf-task-view { display: flex; flex-direction: column; gap: 12px; }
    
    .kf-task-view-actions { display: flex; gap: 8px; flex-wrap: wrap; }\r
    `;var F=require("react");var R=require("react"),Ii=require("react-dom");var u=Gn(require("react")),Ke=require("react-dom");var q=require("react");var kt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function We(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function jt(e){return"nodeType"in e}function G(e){var t,n;return e?We(e)?e:jt(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Ht(e){let{Document:t}=G(e);return e instanceof t}function Je(e){return We(e)?!1:e instanceof G(e).HTMLElement}function bn(e){return e instanceof G(e).SVGElement}function Fe(e){return e?We(e)?e.document:jt(e)?Ht(e)?e:Je(e)||bn(e)?e.ownerDocument:document:document:document}var ye=kt?q.useLayoutEffect:q.useEffect;function wt(e){let t=(0,q.useRef)(e);return ye(()=>{t.current=e}),(0,q.useCallback)(function(){for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return t.current==null?void 0:t.current(...r)},[])}function Qn(){let e=(0,q.useRef)(null),t=(0,q.useCallback)((r,i)=>{e.current=setInterval(r,i)},[]),n=(0,q.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function Ze(e,t){t===void 0&&(t=[e]);let n=(0,q.useRef)(e);return ye(()=>{n.current!==e&&(n.current=e)},t),n}function Qe(e,t){let n=(0,q.useRef)();return(0,q.useMemo)(()=>{let r=e(n.current);return n.current=r,r},[...t])}function yt(e){let t=wt(e),n=(0,q.useRef)(null),r=(0,q.useCallback)(i=>{i!==n.current&&t?.(i,n.current),n.current=i},[]);return[n,r]}function xt(e){let t=(0,q.useRef)();return(0,q.useEffect)(()=>{t.current=e},[e]),t.current}var vn={};function It(e,t){return(0,q.useMemo)(()=>{if(t)return t;let n=vn[e]==null?0:vn[e]+1;return vn[e]=n,e+"-"+n},[e,t])}function er(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return r.reduce((o,s)=>{let a=Object.entries(s);for(let[l,d]of a){let p=o[l];p!=null&&(o[l]=p+e*d)}return o},{...t})}}var $e=er(1),St=er(-1);function Zi(e){return"clientX"in e&&"clientY"in e}function Vt(e){if(!e)return!1;let{KeyboardEvent:t}=G(e.target);return t&&e instanceof t}function Qi(e){if(!e)return!1;let{TouchEvent:t}=G(e.target);return t&&e instanceof t}function Nt(e){if(Qi(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return Zi(e)?{x:e.clientX,y:e.clientY}:null}var Ge=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[Ge.Translate.toString(e),Ge.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),Zn="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function tr(e){return e.matches(Zn)?e:e.querySelector(Zn)}var qe=Gn(require("react")),eo={display:"none"};function nr(e){let{id:t,value:n}=e;return qe.default.createElement("div",{id:t,style:eo},n)}function rr(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e,i={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return qe.default.createElement("div",{id:t,style:i,role:"status","aria-live":r,"aria-atomic":!0},n)}function ir(){let[e,t]=(0,qe.useState)("");return{announce:(0,qe.useCallback)(r=>{r!=null&&t(r)},[]),announcement:e}}var vr=(0,u.createContext)(null);function to(e){let t=(0,u.useContext)(vr);(0,u.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function no(){let[e]=(0,u.useState)(()=>new Set),t=(0,u.useCallback)(r=>(e.add(r),()=>e.delete(r)),[e]);return[(0,u.useCallback)(r=>{let{type:i,event:o}=r;e.forEach(s=>{var a;return(a=s[i])==null?void 0:a.call(s,o)})},[e]),t]}var ro={draggable:`
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      `},io={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function oo(e){let{announcements:t=io,container:n,hiddenTextDescribedById:r,screenReaderInstructions:i=ro}=e,{announce:o,announcement:s}=ir(),a=It("DndLiveRegion"),[l,d]=(0,u.useState)(!1);if((0,u.useEffect)(()=>{d(!0)},[]),to((0,u.useMemo)(()=>({onDragStart(c){let{active:m}=c;o(t.onDragStart({active:m}))},onDragMove(c){let{active:m,over:g}=c;t.onDragMove&&o(t.onDragMove({active:m,over:g}))},onDragOver(c){let{active:m,over:g}=c;o(t.onDragOver({active:m,over:g}))},onDragEnd(c){let{active:m,over:g}=c;o(t.onDragEnd({active:m,over:g}))},onDragCancel(c){let{active:m,over:g}=c;o(t.onDragCancel({active:m,over:g}))}}),[o,t])),!l)return null;let p=u.default.createElement(u.default.Fragment,null,u.default.createElement(nr,{id:r,value:i.draggable}),u.default.createElement(rr,{id:a,announcement:s}));return n?(0,Ke.createPortal)(p,n):p}var j;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})(j||(j={}));function Yt(){}function br(e,t){return(0,u.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function hr(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,u.useMemo)(()=>[...t].filter(r=>r!=null),[...t])}var be=Object.freeze({x:0,y:0});function kr(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function so(e,t){let n=Nt(e);if(!n)return"0 0";let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function wr(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function ao(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function yn(e){let{left:t,top:n,height:r,width:i}=e;return[{x:t,y:n},{x:t+i,y:n},{x:t,y:n+r},{x:t+i,y:n+r}]}function lo(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}var yr=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,i=yn(t),o=[];for(let s of r){let{id:a}=s,l=n.get(a);if(l){let d=yn(l),p=i.reduce((m,g,N)=>m+kr(d[N],g),0),c=Number((p/4).toFixed(4));o.push({id:a,data:{droppableContainer:s,value:c}})}}return o.sort(wr)};function co(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),i=Math.min(t.left+t.width,e.left+e.width),o=Math.min(t.top+t.height,e.top+e.height),s=i-r,a=o-n;if(r<i&&n<o){let l=t.width*t.height,d=e.width*e.height,p=s*a,c=p/(l+d-p);return Number(c.toFixed(4))}return 0}var Dn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,i=[];for(let o of r){let{id:s}=o,a=n.get(s);if(a){let l=co(a,t);l>0&&i.push({id:s,data:{droppableContainer:o,value:l}})}}return i.sort(ao)};function uo(e,t){let{top:n,left:r,bottom:i,right:o}=t;return n<=e.y&&e.y<=i&&r<=e.x&&e.x<=o}var xr=e=>{let{droppableContainers:t,droppableRects:n,pointerCoordinates:r}=e;if(!r)return[];let i=[];for(let o of t){let{id:s}=o,a=n.get(s);if(a&&uo(r,a)){let d=yn(a).reduce((c,m)=>c+kr(r,m),0),p=Number((d/4).toFixed(4));i.push({id:s,data:{droppableContainer:o,value:p}})}}return i.sort(wr)};function fo(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function Ir(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:be}function po(e){return function(n){for(var r=arguments.length,i=new Array(r>1?r-1:0),o=1;o<r;o++)i[o-1]=arguments[o];return i.reduce((s,a)=>({...s,top:s.top+e*a.y,bottom:s.bottom+e*a.y,left:s.left+e*a.x,right:s.right+e*a.x}),{...n})}}var mo=po(1);function Sr(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function go(e,t,n){let r=Sr(t);if(!r)return e;let{scaleX:i,scaleY:o,x:s,y:a}=r,l=e.left-s-(1-i)*parseFloat(n),d=e.top-a-(1-o)*parseFloat(n.slice(n.indexOf(" ")+1)),p=i?e.width/i:e.width,c=o?e.height/o:e.height;return{width:p,height:c,top:d,right:l+p,bottom:d+c,left:l}}var vo={ignoreTransform:!1};function Tt(e,t){t===void 0&&(t=vo);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:d,transformOrigin:p}=G(e).getComputedStyle(e);d&&(n=go(n,d,p))}let{top:r,left:i,width:o,height:s,bottom:a,right:l}=n;return{top:r,left:i,width:o,height:s,bottom:a,right:l}}function or(e){return Tt(e,{ignoreTransform:!0})}function bo(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function ho(e,t){return t===void 0&&(t=G(e).getComputedStyle(e)),t.position==="fixed"}function ko(e,t){t===void 0&&(t=G(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(i=>{let o=t[i];return typeof o=="string"?n.test(o):!1})}function An(e,t){let n=[];function r(i){if(t!=null&&n.length>=t||!i)return n;if(Ht(i)&&i.scrollingElement!=null&&!n.includes(i.scrollingElement))return n.push(i.scrollingElement),n;if(!Je(i)||bn(i)||n.includes(i))return n;let o=G(e).getComputedStyle(i);return i!==e&&ko(i,o)&&n.push(i),ho(i,o)?n:r(i.parentNode)}return e?r(e):n}function Nr(e){let[t]=An(e,1);return t??null}function hn(e){return!kt||!e?null:We(e)?e:jt(e)?Ht(e)||e===Fe(e).scrollingElement?window:Je(e)?e:null:null}function Cr(e){return We(e)?e.scrollX:e.scrollLeft}function Dr(e){return We(e)?e.scrollY:e.scrollTop}function xn(e){return{x:Cr(e),y:Dr(e)}}var V;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(V||(V={}));function Ar(e){return!kt||!e?!1:e===document.scrollingElement}function Er(e){let t={x:0,y:0},n=Ar(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},i=e.scrollTop<=t.y,o=e.scrollLeft<=t.x,s=e.scrollTop>=r.y,a=e.scrollLeft>=r.x;return{isTop:i,isLeft:o,isBottom:s,isRight:a,maxScroll:r,minScroll:t}}var wo={x:.2,y:.2};function yo(e,t,n,r,i){let{top:o,left:s,right:a,bottom:l}=n;r===void 0&&(r=10),i===void 0&&(i=wo);let{isTop:d,isBottom:p,isLeft:c,isRight:m}=Er(e),g={x:0,y:0},N={x:0,y:0},b={height:t.height*i.y,width:t.width*i.x};return!d&&o<=t.top+b.height?(g.y=V.Backward,N.y=r*Math.abs((t.top+b.height-o)/b.height)):!p&&l>=t.bottom-b.height&&(g.y=V.Forward,N.y=r*Math.abs((t.bottom-b.height-l)/b.height)),!m&&a>=t.right-b.width?(g.x=V.Forward,N.x=r*Math.abs((t.right-b.width-a)/b.width)):!c&&s<=t.left+b.width&&(g.x=V.Backward,N.x=r*Math.abs((t.left+b.width-s)/b.width)),{direction:g,speed:N}}function xo(e){if(e===document.scrollingElement){let{innerWidth:o,innerHeight:s}=window;return{top:0,left:0,right:o,bottom:s,width:o,height:s}}let{top:t,left:n,right:r,bottom:i}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:i,width:e.clientWidth,height:e.clientHeight}}function Tr(e){return e.reduce((t,n)=>$e(t,xn(n)),be)}function Io(e){return e.reduce((t,n)=>t+Cr(n),0)}function So(e){return e.reduce((t,n)=>t+Dr(n),0)}function Rr(e,t){if(t===void 0&&(t=Tt),!e)return;let{top:n,left:r,bottom:i,right:o}=t(e);Nr(e)&&(i<=0||o<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var No=[["x",["left","right"],Io],["y",["top","bottom"],So]],Dt=class{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let r=An(n),i=Tr(r);this.rect={...t},this.width=t.width,this.height=t.height;for(let[o,s,a]of No)for(let l of s)Object.defineProperty(this,l,{get:()=>{let d=a(r),p=i[o]-d;return this.rect[l]+p},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},je=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var i;(i=this.target)==null||i.addEventListener(t,n,r),this.listeners.push([t,n,r])}};function Co(e){let{EventTarget:t}=G(e);return e instanceof t?e:Fe(e)}function kn(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var ue;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(ue||(ue={}));function sr(e){e.preventDefault()}function Do(e){e.stopPropagation()}var _;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(_||(_={}));var Or={start:[_.Space,_.Enter],cancel:[_.Esc],end:[_.Space,_.Enter,_.Tab]},Ao=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case _.Right:return{...n,x:n.x+25};case _.Left:return{...n,x:n.x-25};case _.Down:return{...n,y:n.y+25};case _.Up:return{...n,y:n.y-25}}},Xt=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:n}}=t;this.props=t,this.listeners=new je(Fe(n)),this.windowListeners=new je(G(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ue.Resize,this.handleCancel),this.windowListeners.add(ue.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(ue.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&Rr(r),n(be)}handleKeyDown(t){if(Vt(t)){let{active:n,context:r,options:i}=this.props,{keyboardCodes:o=Or,coordinateGetter:s=Ao,scrollBehavior:a="smooth"}=i,{code:l}=t;if(o.end.includes(l)){this.handleEnd(t);return}if(o.cancel.includes(l)){this.handleCancel(t);return}let{collisionRect:d}=r.current,p=d?{x:d.left,y:d.top}:be;this.referenceCoordinates||(this.referenceCoordinates=p);let c=s(t,{active:n,context:r.current,currentCoordinates:p});if(c){let m=St(c,p),g={x:0,y:0},{scrollableAncestors:N}=r.current;for(let b of N){let S=t.code,{isTop:w,isRight:f,isLeft:k,isBottom:P,maxScroll:O,minScroll:D}=Er(b),E=xo(b),T={x:Math.min(S===_.Right?E.right-E.width/2:E.right,Math.max(S===_.Right?E.left:E.left+E.width/2,c.x)),y:Math.min(S===_.Down?E.bottom-E.height/2:E.bottom,Math.max(S===_.Down?E.top:E.top+E.height/2,c.y))},v=S===_.Right&&!f||S===_.Left&&!k,M=S===_.Down&&!P||S===_.Up&&!w;if(v&&T.x!==c.x){let W=b.scrollLeft+m.x,me=S===_.Right&&W<=O.x||S===_.Left&&W>=D.x;if(me&&!m.y){b.scrollTo({left:W,behavior:a});return}me?g.x=b.scrollLeft-W:g.x=S===_.Right?b.scrollLeft-O.x:b.scrollLeft-D.x,g.x&&b.scrollBy({left:-g.x,behavior:a});break}else if(M&&T.y!==c.y){let W=b.scrollTop+m.y,me=S===_.Down&&W<=O.y||S===_.Up&&W>=D.y;if(me&&!m.x){b.scrollTo({top:W,behavior:a});return}me?g.y=b.scrollTop-W:g.y=S===_.Down?b.scrollTop-O.y:b.scrollTop-D.y,g.y&&b.scrollBy({top:-g.y,behavior:a});break}}this.handleMove(t,$e(St(c,this.referenceCoordinates),g))}}}handleMove(t,n){let{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){let{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){let{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Xt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=Or,onActivation:i}=t,{active:o}=n,{code:s}=e.nativeEvent;if(r.start.includes(s)){let a=o.activatorNode.current;return a&&e.target!==a?!1:(e.preventDefault(),i?.({event:e.nativeEvent}),!0)}return!1}}];function ar(e){return!!(e&&"distance"in e)}function lr(e){return!!(e&&"delay"in e)}var At=class{constructor(t,n,r){var i;r===void 0&&(r=Co(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;let{event:o}=t,{target:s}=o;this.props=t,this.events=n,this.document=Fe(s),this.documentListeners=new je(this.document),this.listeners=new je(r),this.windowListeners=new je(G(s)),this.initialCoordinates=(i=Nt(o))!=null?i:be,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(ue.Resize,this.handleCancel),this.windowListeners.add(ue.DragStart,sr),this.windowListeners.add(ue.VisibilityChange,this.handleCancel),this.windowListeners.add(ue.ContextMenu,sr),this.documentListeners.add(ue.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(lr(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if(ar(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){let{active:r,onPending:i}=this.props;i(r,t,this.initialCoordinates,n)}handleStart(){let{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(ue.Click,Do,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ue.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;let{activated:r,initialCoordinates:i,props:o}=this,{onMove:s,options:{activationConstraint:a}}=o;if(!i)return;let l=(n=Nt(t))!=null?n:be,d=St(i,l);if(!r&&a){if(ar(a)){if(a.tolerance!=null&&kn(d,a.tolerance))return this.handleCancel();if(kn(d,a.distance))return this.handleStart()}if(lr(a)&&kn(d,a.tolerance))return this.handleCancel();this.handlePending(a,d);return}t.cancelable&&t.preventDefault(),s(l)}handleEnd(){let{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){let{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===_.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},Eo={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},et=class extends At{constructor(t){let{event:n}=t,r=Fe(n.target);super(t,Eo,r)}};et.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];var To={move:{name:"mousemove"},end:{name:"mouseup"}},In;(function(e){e[e.RightClick=2]="RightClick"})(In||(In={}));var Sn=class extends At{constructor(t){super(t,To,Fe(t.event.target))}};Sn.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===In.RightClick?!1:(r?.({event:n}),!0)}}];var wn={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},Nn=class extends At{constructor(t){super(t,wn)}static setup(){return window.addEventListener(wn.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(wn.move.name,t)};function t(){}}};Nn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:i}=n;return i.length>1?!1:(r?.({event:n}),!0)}}];var Ct;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(Ct||(Ct={}));var Gt;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Gt||(Gt={}));function Ro(e){let{acceleration:t,activator:n=Ct.Pointer,canScroll:r,draggingRect:i,enabled:o,interval:s=5,order:a=Gt.TreeOrder,pointerCoordinates:l,scrollableAncestors:d,scrollableAncestorRects:p,delta:c,threshold:m}=e,g=Lo({delta:c,disabled:!o}),[N,b]=Qn(),S=(0,u.useRef)({x:0,y:0}),w=(0,u.useRef)({x:0,y:0}),f=(0,u.useMemo)(()=>{switch(n){case Ct.Pointer:return l?{top:l.y,bottom:l.y,left:l.x,right:l.x}:null;case Ct.DraggableRect:return i}},[n,i,l]),k=(0,u.useRef)(null),P=(0,u.useCallback)(()=>{let D=k.current;if(!D)return;let E=S.current.x*w.current.x,T=S.current.y*w.current.y;D.scrollBy(E,T)},[]),O=(0,u.useMemo)(()=>a===Gt.TreeOrder?[...d].reverse():d,[a,d]);(0,u.useEffect)(()=>{if(!o||!d.length||!f){b();return}for(let D of O){if(r?.(D)===!1)continue;let E=d.indexOf(D),T=p[E];if(!T)continue;let{direction:v,speed:M}=yo(D,T,f,t,m);for(let W of["x","y"])g[W][v[W]]||(M[W]=0,v[W]=0);if(M.x>0||M.y>0){b(),k.current=D,N(P,s),S.current=M,w.current=v;return}}S.current={x:0,y:0},w.current={x:0,y:0},b()},[t,P,r,b,o,s,JSON.stringify(f),JSON.stringify(g),N,d,O,p,JSON.stringify(m)])}var Oo={x:{[V.Backward]:!1,[V.Forward]:!1},y:{[V.Backward]:!1,[V.Forward]:!1}};function Lo(e){let{delta:t,disabled:n}=e,r=xt(t);return Qe(i=>{if(n||!r||!i)return Oo;let o={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[V.Backward]:i.x[V.Backward]||o.x===-1,[V.Forward]:i.x[V.Forward]||o.x===1},y:{[V.Backward]:i.y[V.Backward]||o.y===-1,[V.Forward]:i.y[V.Forward]||o.y===1}}},[n,t,r])}function Po(e,t){let n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return Qe(i=>{var o;return t==null?null:(o=r??i)!=null?o:null},[r,t])}function Mo(e,t){return(0,u.useMemo)(()=>e.reduce((n,r)=>{let{sensor:i}=r,o=i.activators.map(s=>({eventName:s.eventName,handler:t(s.handler,r)}));return[...n,...o]},[]),[e,t])}var Et;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(Et||(Et={}));var Cn;(function(e){e.Optimized="optimized"})(Cn||(Cn={}));var cr=new Map;function Bo(e,t){let{dragging:n,dependencies:r,config:i}=t,[o,s]=(0,u.useState)(null),{frequency:a,measure:l,strategy:d}=i,p=(0,u.useRef)(e),c=S(),m=Ze(c),g=(0,u.useCallback)(function(w){w===void 0&&(w=[]),!m.current&&s(f=>f===null?w:f.concat(w.filter(k=>!f.includes(k))))},[m]),N=(0,u.useRef)(null),b=Qe(w=>{if(c&&!n)return cr;if(!w||w===cr||p.current!==e||o!=null){let f=new Map;for(let k of e){if(!k)continue;if(o&&o.length>0&&!o.includes(k.id)&&k.rect.current){f.set(k.id,k.rect.current);continue}let P=k.node.current,O=P?new Dt(l(P),P):null;k.rect.current=O,O&&f.set(k.id,O)}return f}return w},[e,o,n,c,l]);return(0,u.useEffect)(()=>{p.current=e},[e]),(0,u.useEffect)(()=>{c||g()},[n,c]),(0,u.useEffect)(()=>{o&&o.length>0&&s(null)},[JSON.stringify(o)]),(0,u.useEffect)(()=>{c||typeof a!="number"||N.current!==null||(N.current=setTimeout(()=>{g(),N.current=null},a))},[a,c,g,...r]),{droppableRects:b,measureDroppableContainers:g,measuringScheduled:o!=null};function S(){switch(d){case Et.Always:return!1;case Et.BeforeDragging:return n;default:return!n}}}function En(e,t){return Qe(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function zo(e,t){return En(e,t)}function _o(e){let{callback:t,disabled:n}=e,r=wt(t),i=(0,u.useMemo)(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:o}=window;return new o(r)},[r,n]);return(0,u.useEffect)(()=>()=>i?.disconnect(),[i]),i}function Jt(e){let{callback:t,disabled:n}=e,r=wt(t),i=(0,u.useMemo)(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:o}=window;return new o(r)},[n]);return(0,u.useEffect)(()=>()=>i?.disconnect(),[i]),i}function Wo(e){return new Dt(Tt(e),e)}function dr(e,t,n){t===void 0&&(t=Wo);let[r,i]=(0,u.useState)(null);function o(){i(l=>{if(!e)return null;if(e.isConnected===!1){var d;return(d=l??n)!=null?d:null}let p=t(e);return JSON.stringify(l)===JSON.stringify(p)?l:p})}let s=_o({callback(l){if(e)for(let d of l){let{type:p,target:c}=d;if(p==="childList"&&c instanceof HTMLElement&&c.contains(e)){o();break}}}}),a=Jt({callback:o});return ye(()=>{o(),e?(a?.observe(e),s?.observe(document.body,{childList:!0,subtree:!0})):(a?.disconnect(),s?.disconnect())},[e]),r}function Fo(e){let t=En(e);return Ir(e,t)}var ur=[];function $o(e){let t=(0,u.useRef)(e),n=Qe(r=>e?r&&r!==ur&&e&&t.current&&e.parentNode===t.current.parentNode?r:An(e):ur,[e]);return(0,u.useEffect)(()=>{t.current=e},[e]),n}function qo(e){let[t,n]=(0,u.useState)(null),r=(0,u.useRef)(e),i=(0,u.useCallback)(o=>{let s=hn(o.target);s&&n(a=>a?(a.set(s,xn(s)),new Map(a)):null)},[]);return(0,u.useEffect)(()=>{let o=r.current;if(e!==o){s(o);let a=e.map(l=>{let d=hn(l);return d?(d.addEventListener("scroll",i,{passive:!0}),[d,xn(d)]):null}).filter(l=>l!=null);n(a.length?new Map(a):null),r.current=e}return()=>{s(e),s(o)};function s(a){a.forEach(l=>{let d=hn(l);d?.removeEventListener("scroll",i)})}},[i,e]),(0,u.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((o,s)=>$e(o,s),be):Tr(e):be,[e,t])}function fr(e,t){t===void 0&&(t=[]);let n=(0,u.useRef)(null);return(0,u.useEffect)(()=>{n.current=null},t),(0,u.useEffect)(()=>{let r=e!==be;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?St(e,n.current):be}function Ko(e){(0,u.useEffect)(()=>{if(!kt)return;let t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(let n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function jo(e,t){return(0,u.useMemo)(()=>e.reduce((n,r)=>{let{eventName:i,handler:o}=r;return n[i]=s=>{o(s,t)},n},{}),[e,t])}function Lr(e){return(0,u.useMemo)(()=>e?bo(e):null,[e])}var pr=[];function Ho(e,t){t===void 0&&(t=Tt);let[n]=e,r=Lr(n?G(n):null),[i,o]=(0,u.useState)(pr);function s(){o(()=>e.length?e.map(l=>Ar(l)?r:new Dt(t(l),l)):pr)}let a=Jt({callback:s});return ye(()=>{a?.disconnect(),s(),e.forEach(l=>a?.observe(l))},[e]),i}function Pr(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return Je(t)?t:e}function Vo(e){let{measure:t}=e,[n,r]=(0,u.useState)(null),i=(0,u.useCallback)(d=>{for(let{target:p}of d)if(Je(p)){r(c=>{let m=t(p);return c?{...c,width:m.width,height:m.height}:m});break}},[t]),o=Jt({callback:i}),s=(0,u.useCallback)(d=>{let p=Pr(d);o?.disconnect(),p&&o?.observe(p),r(p?t(p):null)},[t,o]),[a,l]=yt(s);return(0,u.useMemo)(()=>({nodeRef:a,rect:n,setRef:l}),[n,a,l])}var Uo=[{sensor:et,options:{}},{sensor:Xt,options:{}}],Yo={current:{}},Ut={draggable:{measure:or},droppable:{measure:or,strategy:Et.WhileDragging,frequency:Cn.Optimized},dragOverlay:{measure:Tt}},He=class extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}},Xo={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new He,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Yt},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:Ut,measureDroppableContainers:Yt,windowRect:null,measuringScheduled:!1},Mr={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:Yt,draggableNodes:new Map,over:null,measureDroppableContainers:Yt},Rt=(0,u.createContext)(Mr),Br=(0,u.createContext)(Xo);function Go(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new He}}}function Jo(e,t){switch(t.type){case j.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case j.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case j.DragEnd:case j.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case j.RegisterDroppable:{let{element:n}=t,{id:r}=n,i=new He(e.droppable.containers);return i.set(r,n),{...e,droppable:{...e.droppable,containers:i}}}case j.SetDroppableDisabled:{let{id:n,key:r,disabled:i}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;let s=new He(e.droppable.containers);return s.set(n,{...o,disabled:i}),{...e,droppable:{...e.droppable,containers:s}}}case j.UnregisterDroppable:{let{id:n,key:r}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let o=new He(e.droppable.containers);return o.delete(n),{...e,droppable:{...e.droppable,containers:o}}}default:return e}}function Zo(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:i}=(0,u.useContext)(Rt),o=xt(r),s=xt(n?.id);return(0,u.useEffect)(()=>{if(!t&&!r&&o&&s!=null){if(!Vt(o)||document.activeElement===o.target)return;let a=i.get(s);if(!a)return;let{activatorNode:l,node:d}=a;if(!l.current&&!d.current)return;requestAnimationFrame(()=>{for(let p of[l.current,d.current]){if(!p)continue;let c=tr(p);if(c){c.focus();break}}})}},[r,t,i,s,o]),null}function zr(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((i,o)=>o({transform:i,...r}),n):n}function Qo(e){return(0,u.useMemo)(()=>({draggable:{...Ut.draggable,...e?.draggable},droppable:{...Ut.droppable,...e?.droppable},dragOverlay:{...Ut.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function es(e){let{activeNode:t,measure:n,initialRect:r,config:i=!0}=e,o=(0,u.useRef)(!1),{x:s,y:a}=typeof i=="boolean"?{x:i,y:i}:i;ye(()=>{if(!s&&!a||!t){o.current=!1;return}if(o.current||!r)return;let d=t?.node.current;if(!d||d.isConnected===!1)return;let p=n(d),c=Ir(p,r);if(s||(c.x=0),a||(c.y=0),o.current=!0,Math.abs(c.x)>0||Math.abs(c.y)>0){let m=Nr(d);m&&m.scrollBy({top:c.y,left:c.x})}},[t,s,a,r,n])}var Zt=(0,u.createContext)({...be,scaleX:1,scaleY:1}),Re;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(Re||(Re={}));var _r=(0,u.memo)(function(t){var n,r,i,o;let{id:s,accessibility:a,autoScroll:l=!0,children:d,sensors:p=Uo,collisionDetection:c=Dn,measuring:m,modifiers:g,...N}=t,b=(0,u.useReducer)(Jo,void 0,Go),[S,w]=b,[f,k]=no(),[P,O]=(0,u.useState)(Re.Uninitialized),D=P===Re.Initialized,{draggable:{active:E,nodes:T,translate:v},droppable:{containers:M}}=S,W=E!=null?T.get(E):null,me=(0,u.useRef)({initial:null,translated:null}),ge=(0,u.useMemo)(()=>{var X;return E!=null?{id:E,data:(X=W?.data)!=null?X:Yo,rect:me}:null},[E,W]),ve=(0,u.useRef)(null),[ut,zt]=(0,u.useState)(null),[ee,Y]=(0,u.useState)(null),ae=Ze(N,Object.values(N)),ft=It("DndDescribedBy",s),_t=(0,u.useMemo)(()=>M.getEnabled(),[M]),xe=Qo(m),{droppableRects:he,measureDroppableContainers:Ve,measuringScheduled:Wt}=Bo(_t,{dragging:D,dependencies:[v.x,v.y],config:xe.droppable}),ne=Po(T,E),Ft=(0,u.useMemo)(()=>ee?Nt(ee):null,[ee]),$t=Ki(),pt=zo(ne,xe.draggable.measure);es({activeNode:E!=null?T.get(E):null,config:$t.layoutShiftCompensation,initialRect:pt,measure:xe.draggable.measure});let re=dr(ne,xe.draggable.measure,pt),mt=dr(ne?ne.parentElement:null),Ie=(0,u.useRef)({activatorEvent:null,active:null,activeNode:ne,collisionRect:null,collisions:null,droppableRects:he,draggableNodes:T,draggingNode:null,draggingNodeRect:null,droppableContainers:M,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),qt=M.getNodeFor((n=Ie.current.over)==null?void 0:n.id),h=Vo({measure:xe.dragOverlay.measure}),A=(r=h.nodeRef.current)!=null?r:ne,B=D?(i=h.rect)!=null?i:re:null,H=!!(h.nodeRef.current&&h.rect),le=Fo(H?null:re),ze=Lr(A?G(A):null),ce=$o(D?qt??ne:null),_e=Ho(ce),Ce=zr(g,{transform:{x:v.x-le.x,y:v.y-le.y,scaleX:1,scaleY:1},activatorEvent:ee,active:ge,activeNodeRect:re,containerNodeRect:mt,draggingNodeRect:B,over:Ie.current.over,overlayNodeRect:h.rect,scrollableAncestors:ce,scrollableAncestorRects:_e,windowRect:ze}),Kn=Ft?$e(Ft,v):null,jn=qo(ce),Bi=fr(jn),zi=fr(jn,[re]),Ue=$e(Ce,Bi),Ye=B?mo(B,Ce):null,gt=ge&&Ye?c({active:ge,collisionRect:Ye,droppableRects:he,droppableContainers:_t,pointerCoordinates:Kn}):null,Hn=lo(gt,"id"),[De,Vn]=(0,u.useState)(null),_i=H?Ce:$e(Ce,zi),Wi=fo(_i,(o=De?.rect)!=null?o:null,re),mn=(0,u.useRef)(null),Un=(0,u.useCallback)((X,ie)=>{let{sensor:oe,options:Ae}=ie;if(ve.current==null)return;let de=T.get(ve.current);if(!de)return;let se=X.nativeEvent,ke=new oe({active:ve.current,activeNode:de,event:se,options:Ae,context:Ie,onAbort(U){if(!T.get(U))return;let{onDragAbort:we}=ae.current,Se={id:U};we?.(Se),f({type:"onDragAbort",event:Se})},onPending(U,Ee,we,Se){if(!T.get(U))return;let{onDragPending:bt}=ae.current,Te={id:U,constraint:Ee,initialCoordinates:we,offset:Se};bt?.(Te),f({type:"onDragPending",event:Te})},onStart(U){let Ee=ve.current;if(Ee==null)return;let we=T.get(Ee);if(!we)return;let{onDragStart:Se}=ae.current,vt={activatorEvent:se,active:{id:Ee,data:we.data,rect:me}};(0,Ke.unstable_batchedUpdates)(()=>{Se?.(vt),O(Re.Initializing),w({type:j.DragStart,initialCoordinates:U,active:Ee}),f({type:"onDragStart",event:vt}),zt(mn.current),Y(se)})},onMove(U){w({type:j.DragMove,coordinates:U})},onEnd:Xe(j.DragEnd),onCancel:Xe(j.DragCancel)});mn.current=ke;function Xe(U){return async function(){let{active:we,collisions:Se,over:vt,scrollAdjustedTranslate:bt}=Ie.current,Te=null;if(we&&bt){let{cancelDrop:ht}=ae.current;Te={activatorEvent:se,active:we,collisions:Se,delta:bt,over:vt},U===j.DragEnd&&typeof ht=="function"&&await Promise.resolve(ht(Te))&&(U=j.DragCancel)}ve.current=null,(0,Ke.unstable_batchedUpdates)(()=>{w({type:U}),O(Re.Uninitialized),Vn(null),zt(null),Y(null),mn.current=null;let ht=U===j.DragEnd?"onDragEnd":"onDragCancel";if(Te){let gn=ae.current[ht];gn?.(Te),f({type:ht,event:Te})}})}}},[T]),Fi=(0,u.useCallback)((X,ie)=>(oe,Ae)=>{let de=oe.nativeEvent,se=T.get(Ae);if(ve.current!==null||!se||de.dndKit||de.defaultPrevented)return;let ke={active:se};X(oe,ie.options,ke)===!0&&(de.dndKit={capturedBy:ie.sensor},ve.current=Ae,Un(oe,ie))},[T,Un]),Yn=Mo(p,Fi);Ko(p),ye(()=>{re&&P===Re.Initializing&&O(Re.Initialized)},[re,P]),(0,u.useEffect)(()=>{let{onDragMove:X}=ae.current,{active:ie,activatorEvent:oe,collisions:Ae,over:de}=Ie.current;if(!ie||!oe)return;let se={active:ie,activatorEvent:oe,collisions:Ae,delta:{x:Ue.x,y:Ue.y},over:de};(0,Ke.unstable_batchedUpdates)(()=>{X?.(se),f({type:"onDragMove",event:se})})},[Ue.x,Ue.y]),(0,u.useEffect)(()=>{let{active:X,activatorEvent:ie,collisions:oe,droppableContainers:Ae,scrollAdjustedTranslate:de}=Ie.current;if(!X||ve.current==null||!ie||!de)return;let{onDragOver:se}=ae.current,ke=Ae.get(Hn),Xe=ke&&ke.rect.current?{id:ke.id,rect:ke.rect.current,data:ke.data,disabled:ke.disabled}:null,U={active:X,activatorEvent:ie,collisions:oe,delta:{x:de.x,y:de.y},over:Xe};(0,Ke.unstable_batchedUpdates)(()=>{Vn(Xe),se?.(U),f({type:"onDragOver",event:U})})},[Hn]),ye(()=>{Ie.current={activatorEvent:ee,active:ge,activeNode:ne,collisionRect:Ye,collisions:gt,droppableRects:he,draggableNodes:T,draggingNode:A,draggingNodeRect:B,droppableContainers:M,over:De,scrollableAncestors:ce,scrollAdjustedTranslate:Ue},me.current={initial:B,translated:Ye}},[ge,ne,gt,Ye,T,A,B,he,M,De,ce,Ue]),Ro({...$t,delta:v,draggingRect:Ye,pointerCoordinates:Kn,scrollableAncestors:ce,scrollableAncestorRects:_e});let $i=(0,u.useMemo)(()=>({active:ge,activeNode:ne,activeNodeRect:re,activatorEvent:ee,collisions:gt,containerNodeRect:mt,dragOverlay:h,draggableNodes:T,droppableContainers:M,droppableRects:he,over:De,measureDroppableContainers:Ve,scrollableAncestors:ce,scrollableAncestorRects:_e,measuringConfiguration:xe,measuringScheduled:Wt,windowRect:ze}),[ge,ne,re,ee,gt,mt,h,T,M,he,De,Ve,ce,_e,xe,Wt,ze]),qi=(0,u.useMemo)(()=>({activatorEvent:ee,activators:Yn,active:ge,activeNodeRect:re,ariaDescribedById:{draggable:ft},dispatch:w,draggableNodes:T,over:De,measureDroppableContainers:Ve}),[ee,Yn,ge,re,w,ft,T,De,Ve]);return u.default.createElement(vr.Provider,{value:k},u.default.createElement(Rt.Provider,{value:qi},u.default.createElement(Br.Provider,{value:$i},u.default.createElement(Zt.Provider,{value:Wi},d)),u.default.createElement(Zo,{disabled:a?.restoreFocus===!1})),u.default.createElement(oo,{...a,hiddenTextDescribedById:ft}));function Ki(){let X=ut?.autoScrollEnabled===!1,ie=typeof l=="object"?l.enabled===!1:l===!1,oe=D&&!X&&!ie;return typeof l=="object"?{...l,enabled:oe}:{enabled:oe}}}),ts=(0,u.createContext)(null),mr="button",ns="Draggable";function Wr(e){let{id:t,data:n,disabled:r=!1,attributes:i}=e,o=It(ns),{activators:s,activatorEvent:a,active:l,activeNodeRect:d,ariaDescribedById:p,draggableNodes:c,over:m}=(0,u.useContext)(Rt),{role:g=mr,roleDescription:N="draggable",tabIndex:b=0}=i??{},S=l?.id===t,w=(0,u.useContext)(S?Zt:ts),[f,k]=yt(),[P,O]=yt(),D=jo(s,t),E=Ze(n);ye(()=>(c.set(t,{id:t,key:o,node:f,activatorNode:P,data:E}),()=>{let v=c.get(t);v&&v.key===o&&c.delete(t)}),[c,t]);let T=(0,u.useMemo)(()=>({role:g,tabIndex:b,"aria-disabled":r,"aria-pressed":S&&g===mr?!0:void 0,"aria-roledescription":N,"aria-describedby":p.draggable}),[r,g,b,S,N,p.draggable]);return{active:l,activatorEvent:a,activeNodeRect:d,attributes:T,isDragging:S,listeners:r?void 0:D,node:f,over:m,setNodeRef:k,setActivatorNodeRef:O,transform:w}}function rs(){return(0,u.useContext)(Br)}var is="Droppable",os={timeout:25};function Fr(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:i}=e,o=It(is),{active:s,dispatch:a,over:l,measureDroppableContainers:d}=(0,u.useContext)(Rt),p=(0,u.useRef)({disabled:n}),c=(0,u.useRef)(!1),m=(0,u.useRef)(null),g=(0,u.useRef)(null),{disabled:N,updateMeasurementsFor:b,timeout:S}={...os,...i},w=Ze(b??r),f=(0,u.useCallback)(()=>{if(!c.current){c.current=!0;return}g.current!=null&&clearTimeout(g.current),g.current=setTimeout(()=>{d(Array.isArray(w.current)?w.current:[w.current]),g.current=null},S)},[S]),k=Jt({callback:f,disabled:N||!s}),P=(0,u.useCallback)((T,v)=>{k&&(v&&(k.unobserve(v),c.current=!1),T&&k.observe(T))},[k]),[O,D]=yt(P),E=Ze(t);return(0,u.useEffect)(()=>{!k||!O.current||(k.disconnect(),c.current=!1,k.observe(O.current))},[O,k]),(0,u.useEffect)(()=>(a({type:j.RegisterDroppable,element:{id:r,key:o,disabled:n,node:O,rect:m,data:E}}),()=>a({type:j.UnregisterDroppable,key:o,id:r})),[r]),(0,u.useEffect)(()=>{n!==p.current.disabled&&(a({type:j.SetDroppableDisabled,id:r,key:o,disabled:n}),p.current.disabled=n)},[r,o,n,a]),{active:s,rect:m,isOver:l?.id===r,node:O,over:l,setNodeRef:D}}function ss(e){let{animation:t,children:n}=e,[r,i]=(0,u.useState)(null),[o,s]=(0,u.useState)(null),a=xt(n);return!n&&!r&&a&&i(a),ye(()=>{if(!o)return;let l=r?.key,d=r?.props.id;if(l==null||d==null){i(null);return}Promise.resolve(t(d,o)).then(()=>{i(null)})},[t,r,o]),u.default.createElement(u.default.Fragment,null,n,r?(0,u.cloneElement)(r,{ref:s}):null)}var as={x:0,y:0,scaleX:1,scaleY:1};function ls(e){let{children:t}=e;return u.default.createElement(Rt.Provider,{value:Mr},u.default.createElement(Zt.Provider,{value:as},t))}var cs={position:"fixed",touchAction:"none"},ds=e=>Vt(e)?"transform 250ms ease":void 0,us=(0,u.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:i,children:o,className:s,rect:a,style:l,transform:d,transition:p=ds}=e;if(!a)return null;let c=i?d:{...d,scaleX:1,scaleY:1},m={...cs,width:a.width,height:a.height,top:a.top,left:a.left,transform:Ge.Transform.toString(c),transformOrigin:i&&r?so(r,a):void 0,transition:typeof p=="function"?p(r):p,...l};return u.default.createElement(n,{className:s,style:m,ref:t},o)}),fs=e=>t=>{let{active:n,dragOverlay:r}=t,i={},{styles:o,className:s}=e;if(o!=null&&o.active)for(let[a,l]of Object.entries(o.active))l!==void 0&&(i[a]=n.node.style.getPropertyValue(a),n.node.style.setProperty(a,l));if(o!=null&&o.dragOverlay)for(let[a,l]of Object.entries(o.dragOverlay))l!==void 0&&r.node.style.setProperty(a,l);return s!=null&&s.active&&n.node.classList.add(s.active),s!=null&&s.dragOverlay&&r.node.classList.add(s.dragOverlay),function(){for(let[l,d]of Object.entries(i))n.node.style.setProperty(l,d);s!=null&&s.active&&n.node.classList.remove(s.active)}},ps=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:Ge.Transform.toString(t)},{transform:Ge.Transform.toString(n)}]},ms={duration:250,easing:"ease",keyframes:ps,sideEffects:fs({styles:{active:{opacity:"0"}}})};function gs(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:i}=e;return wt((o,s)=>{if(t===null)return;let a=n.get(o);if(!a)return;let l=a.node.current;if(!l)return;let d=Pr(s);if(!d)return;let{transform:p}=G(s).getComputedStyle(s),c=Sr(p);if(!c)return;let m=typeof t=="function"?t:vs(t);return Rr(l,i.draggable.measure),m({active:{id:o,data:a.data,node:l,rect:i.draggable.measure(l)},draggableNodes:n,dragOverlay:{node:s,rect:i.dragOverlay.measure(d)},droppableContainers:r,measuringConfiguration:i,transform:c})})}function vs(e){let{duration:t,easing:n,sideEffects:r,keyframes:i}={...ms,...e};return o=>{let{active:s,dragOverlay:a,transform:l,...d}=o;if(!t)return;let p={x:a.rect.left-s.rect.left,y:a.rect.top-s.rect.top},c={scaleX:l.scaleX!==1?s.rect.width*l.scaleX/a.rect.width:1,scaleY:l.scaleY!==1?s.rect.height*l.scaleY/a.rect.height:1},m={x:l.x-p.x,y:l.y-p.y,...c},g=i({...d,active:s,dragOverlay:a,transform:{initial:l,final:m}}),[N]=g,b=g[g.length-1];if(JSON.stringify(N)===JSON.stringify(b))return;let S=r?.({active:s,dragOverlay:a,...d}),w=a.node.animate(g,{duration:t,easing:n,fill:"forwards"});return new Promise(f=>{w.onfinish=()=>{S?.(),f()}})}}var gr=0;function bs(e){return(0,u.useMemo)(()=>{if(e!=null)return gr++,gr},[e])}var $r=u.default.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:i,transition:o,modifiers:s,wrapperElement:a="div",className:l,zIndex:d=999}=e,{activatorEvent:p,active:c,activeNodeRect:m,containerNodeRect:g,draggableNodes:N,droppableContainers:b,dragOverlay:S,over:w,measuringConfiguration:f,scrollableAncestors:k,scrollableAncestorRects:P,windowRect:O}=rs(),D=(0,u.useContext)(Zt),E=bs(c?.id),T=zr(s,{activatorEvent:p,active:c,activeNodeRect:m,containerNodeRect:g,draggingNodeRect:S.rect,over:w,overlayNodeRect:S.rect,scrollableAncestors:k,scrollableAncestorRects:P,transform:D,windowRect:O}),v=En(m),M=gs({config:r,draggableNodes:N,droppableContainers:b,measuringConfiguration:f}),W=v?S.setRef:void 0;return u.default.createElement(ls,null,u.default.createElement(ss,{animation:M},c&&E?u.default.createElement(us,{key:E,id:c.id,ref:W,as:a,activatorEvent:p,adjustScale:t,className:l,transition:o,rect:v,style:{zIndex:d,...i},transform:T},n):null))});function K(e,t={},n="default"){return fetch("/api/kanban",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:n}})}).then(r=>r.json()).catch(r=>({ok:!1,error:String(r&&r.message||r)}))}var Oe=null,Tn=new Set,qr=new Set,Rn=new Set,Kr=new Set;function Hr(e){Oe=e}function Ln(e){return e.settings&&e.settings.confirmRequired?"This board REQUIRES human confirmation: never move the item to Done \u2014 finish via Review and let the human complete it.":"When the task is fully complete: move the item In Progress -> Done."}function Vr(){return"If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."}var Pn=()=>"Scope limit: execute ONLY the work described in this item. If other work surfaces (other items, side tasks, extra refactors), do not start it \u2014 mention it in the conversation and let the human queue a separate item.",Mn=e=>`At the end of EVERY turn, set your status with kanban_set_status (id: ${e.id}): max 2 sentences \u2014 what is done, what is next or what you need from the human. The human sees it when hovering your card on the board.`;function On(e,t){return[`Kanban pickup: item ${t.id} "${t.name}" was moved to To Do by the human.`,"","Workflow:",`1. Read it with kanban_get_item (id: ${t.id}).`,"2. Confirm pickup: move it To Do -> In Progress (kanban_move_item).","3. Do the work, narrating your progress and decisions in this conversation.","4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",`5. ${Ln(e)}`,"",Vr(),Pn(),Mn(t),`Always reference the item by id ${t.id}. Never modify other items.`].join(`
    `)}function jr(e,t){return[`Kanban requeue: item ${t.id} "${t.name}" was moved back to To Do by the human.`,"Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",Ln(e),"",Vr(),Pn(),Mn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}function hs(e,t){return[`Kanban: the human returned item ${t.id} "${t.name}" to In Progress.`,"Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",Ln(e),"",Pn(),Mn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}async function ks(e,t,n){if(n.sessionId)return n.sessionId;if(!Oe)return null;try{let r=await Oe.createSession(e);return await K("setSession",{id:n.id,sessionId:r},e),await K("assignItem",{id:n.id,assignee:"\u0410\u0433\u0435\u043D\u0442 \xB7 "+String(r).slice(0,8)},e),n.sessionId=r,r}catch(r){return console.warn("dsh-kanban: session create failed for "+n.id,r),null}}async function Qt(e,t,n,r){if(!(!Oe||Rn.has(n.id))){Rn.add(n.id);try{let i=await ks(e,t,n);if(!i)return;let o=t.items.find(s=>s.id===n.id)??n;await Oe.renameSession(i,`${o.id} \xB7 ${o.name}`),await Oe.promptSession(i,r(t,o))}catch(i){console.warn("dsh-kanban: agent drive failed for "+n.id,i)}finally{Rn.delete(n.id)}}}async function ws(e){if(!(!Oe||Kr.has(e))){Kr.add(e);try{await Oe.archiveSession(e)}catch(t){console.warn("dsh-kanban: session archive failed for "+e,t)}}}function en(e,t){let n=Array.isArray(t.activities)?t.activities:[];if(!qr.has(e)){qr.add(e);for(let r of n)Tn.add(r.id);for(let r of t.items)r.columnId==="todo"&&r.draft!==!0&&!r.sessionId&&Qt(e,t,r,On);return}for(let r of n){if(Tn.has(r.id))continue;if(Tn.add(r.id),r.type==="item_deleted"&&r.sessionId){ws(r.sessionId);continue}if(r.source!=="human")continue;let i=t.items.find(o=>o.id===r.itemId);i&&(r.type==="item_moved"&&(r.to==="todo"?Qt(e,t,i,i.sessionId?jr:On):r.to==="in_progress"&&r.from==="review"&&Qt(e,t,i,hs)),r.type==="item_draft"&&r.to==="ready"&&Qt(e,t,i,i.sessionId?jr:On))}}var tt=["backlog","todo","in_progress","review","done"],J={backlog:"\u0411\u0435\u043A\u043B\u043E\u0433",todo:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C",in_progress:"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",review:"\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435",done:"\u0413\u043E\u0442\u043E\u0432\u043E"},Ur=["low","normal","high","urgent"],Le={low:"\u041D\u0438\u0437\u043A\u0438\u0439",normal:"\u041E\u0431\u044B\u0447\u043D\u044B\u0439",high:"\u0412\u044B\u0441\u043E\u043A\u0438\u0439",urgent:"\u0421\u0440\u043E\u0447\u043D\u043E"};var tn=e=>J[String(e)]||String(e||"");function Z(e){if(!e)return"";let t=new Date(e).getTime();if(!Number.isFinite(t))return"";let n=Math.max(0,(Date.now()-t)/1e3);return n<5?"just now":n<60?`${Math.floor(n)} seconds ago`:n<120?"1 minute ago":n<3600?`${Math.floor(n/60)} minutes ago`:n<7200?"1 hour ago":n<86400?`${Math.floor(n/3600)} hours ago`:`${Math.floor(n/86400)} days ago`}function Yr(e){let t=e.source==="agent"?"harness":"you";switch(e.type){case"item_moved":return`${t} moved to ${tn(e.to)}`;case"item_created":return`${t} created`;case"item_updated":return`${t} edited`;case"item_deleted":return`${t} deleted`;default:return`${t} ${e.type.replace(/_/g," ")}`}}function Xr(e){return`${Yr(e)} (${Z(e.ts)})`}function Gr(e){return{phrase:Yr(e),time:Z(e.ts)}}function fe(e){if(!e)return"";let t=new Date(e);return Number.isFinite(t.getTime())?t.toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}):""}function nt(e){return e.source==="agent"?"\u0430\u0433\u0435\u043D\u0442":"\u0432\u044B"}function nn(e){switch(e.type){case"item_created":return"\u0441\u043E\u0437\u0434\u0430\u043D\u0430";case"item_updated":return"\u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430";case"item_moved":return e.from&&e.to?`\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0430 \u0438\u0437 \xAB${tn(e.from)}\xBB \u0432 \xAB${tn(e.to)}\xBB`:`\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0430 \u0432 \xAB${tn(e.to)}\xBB`;case"item_assigned":return e.to?`\u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: ${e.to}`:"\u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C \u0441\u043D\u044F\u0442";case"item_draft":return e.to==="true"?"\u043F\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u043D\u0430 \u0432 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438":"\u0433\u043E\u0442\u043E\u0432\u0430 \u043A \u0440\u0430\u0431\u043E\u0442\u0435";case"item_status":return e.text?`\u0441\u0442\u0430\u0442\u0443\u0441: ${e.text}`:"\u0441\u0442\u0430\u0442\u0443\u0441 \u043E\u0447\u0438\u0449\u0435\u043D";case"item_commented":return"\u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439";case"item_deleted":return"\u0443\u0434\u0430\u043B\u0435\u043D\u0430";case"code_changed":return`\u043A\u043E\u0434 \u0434\u043E\u0441\u043A\u0438: ${e.from||""} \u2192 ${e.to||""}`;case"confirm_required_changed":return e.to==="true"?"\u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0430\u0440\u0445\u0438\u0432\u0430\u0446\u0438\u0438":"\u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0430\u0440\u0445\u0438\u0432\u0430\u0446\u0438\u0438";default:return String(e.type||"").replace(/_/g," ")}}var Jr="dsh-kanban-flow.clickOpensBoard",Bn="dsh-kanban-flow:clickPrefChanged",Zr="dsh-kanban-flow.confirmArchive",zn="dsh-kanban-flow:archiveConfirmChanged";function rn(){try{let e=localStorage.getItem(Jr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Qr(e){try{localStorage.setItem(Jr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(Bn))}function ei(e){return window.addEventListener(Bn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(Bn,e),window.removeEventListener("storage",e)}}function on(){try{let e=localStorage.getItem(Zr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function ti(e){try{localStorage.setItem(Zr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(zn))}function sn(e){return window.addEventListener(zn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(zn,e),window.removeEventListener("storage",e)}}var Me=require("react");function ni(e){let{override:t,currentSessionId:n,workspaceItems:r,recentWorkspaceId:i}=e,o=Array.isArray(r)?r:[],s=m=>m?o.find(g=>g&&g.workspaceId===m):void 0,a=n?o.find(m=>m&&Array.isArray(m.sessionIds)&&m.sessionIds.includes(n)):void 0,l=a?a.workspaceId:void 0,d=t!=null&&t.workspaceId!==l&&(t.hostSessionId===void 0||t.hostSessionId===n)?t:void 0,p=d?s(d.workspaceId):void 0,c=p||a||s(i);return{workspaceId:c?c.workspaceId:i||"default",workspaceTitle:c?c.title:void 0,pinned:p!==void 0,nativeWorkspaceId:l}}function ri(e,t,n=0){if(!Array.isArray(e))return null;let r=0;for(let i of e)if(!(!i||i.title!==t)){if(r===n)return i.workspaceId;r+=1}return null}var ln="data-kf-kanban",un="Board",Ot=null,it=!1,rt=!1;function ys(){return it}function oi(e){Ot&&Ot(e)}function Wn(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="tab"]'))}function Fn(){return Wn().find(e=>(e.textContent||"").trim()===un)}function cn(){let e=Fn();return!!e&&e.getAttribute("aria-selected")==="true"}function ii(e=4e3){if(typeof document>"u")return;let t=Date.now()+e,n=()=>{let r=Fn();if(r){r.click();return}Date.now()<t&&window.setTimeout(n,120)};n()}function si(){let e=Wn().find(t=>(t.textContent||"").trim()!==un);e&&e.click()}function dn(){if(typeof document>"u"||rt)return;rt=!0;let e=Date.now()+2500,t=()=>{if(it){rt=!1;return}let n=Fn();if(!n||n.getAttribute("aria-selected")!=="true"){rt=!1;return}let r=Wn().find(i=>(i.textContent||"").trim()!==un);if(r){r.click(),rt=!1;return}if(Date.now()<e){window.setTimeout(t,120);return}rt=!1};t()}function ai(){return(0,Me.useEffect)(()=>{if(typeof document>"u")return;let e=t=>{if(ys()||!(t.target instanceof Element))return;let n=t.target.closest('[role="tab"]');n&&(n.textContent||"").trim()===un&&n.getAttribute("aria-selected")==="true"&&(t.stopImmediatePropagation(),t.preventDefault(),si())};return document.addEventListener("click",e,!0),()=>document.removeEventListener("click",e,!0)},[]),null}function an(e,t){if(!t||!e?.list)return;let n=e.list.getSnapshot()?.items;if(!Array.isArray(n))return;let r=n.find(i=>i&&Array.isArray(i.sessionIds)&&i.sessionIds.includes(t));return r?r.workspaceId:void 0}var Pe=null,_n=new Set;function li(){return Pe??void 0}function Lt(e){if(!(Pe===null&&e===null||Pe!==null&&e!==null&&Pe.workspaceId===e.workspaceId&&Pe.hostSessionId===e.hostSessionId)){Pe=e;for(let n of _n)n()}}function ci(e){return _n.add(e),()=>{_n.delete(e)}}function di({workspaces:e,sessions:t}){return(0,Me.useEffect)(()=>{if(!e||!t)return;let n=()=>t.list.getSnapshot(),r=c=>{if(c===void 0)return!1;let m=n().byId;return!!(m&&m[c]&&m[c].blank===!1)},i=()=>{let c=n().current;return r(c)?c:void 0},o=()=>{let c=e.list?.getSnapshot?.();return new Set(Array.isArray(c?.archivedSessionIds)?c.archivedSessionIds:[])},s=c=>{let m=e.list?.getSnapshot?.()?.items,g=Array.isArray(m)?m.find(b=>b&&b.workspaceId===c):void 0;if(!g||!Array.isArray(g.sessionIds))return;let N=o();return g.sessionIds.find(b=>r(b)&&!N.has(b))},a=()=>{let c=n(),m=o();for(let g of c.ids??[])if(r(g)&&!m.has(g))return g},l=(c,m,g=6e3)=>{if(c()){m();return}let N=!1,b=()=>{N||(N=!0,S(),typeof w=="function"&&w(),window.clearTimeout(f),m())},S=t.list.subscribe(()=>{c()&&b()}),w=e.list?.subscribe?.(()=>{c()&&b()}),f=window.setTimeout(b,g)},d=()=>{cn()||ii(),window.setTimeout(()=>{it=!1},600)},p=c=>{let m=(w,f)=>{console.info(`[dsh-kanban-flow] open case ${w}:`,JSON.stringify({target:c,current:i()??null,actualCurrent:n().current??null,override:Pe,boardTabActive:cn(),...f}))},g=i();if(g!==void 0){let w=Pe?.workspaceId??an(e,g);if(w===c){m("1-toggle",{effective:w}),cn()?si():ii();return}}it=!0;let N=s(c);if(N!==void 0){m("2-native",{targetSession:N}),Lt(null),t.open&&t.open(N),l(()=>n().current===N,d);return}if(g!==void 0){m("3-pin-current"),Lt({workspaceId:c,hostSessionId:g}),d();return}let b=an(e,n().current),S=(b!==void 0?s(b):void 0)??a();if(S!==void 0){m("4-borrow",{borrowed:S,currentWorkspaceId:b}),Lt({workspaceId:c,hostSessionId:S}),n().current===S?d():(t.open&&t.open(S),l(()=>n().current===S,d));return}m("5-seed"),e.startSession(c),l(()=>{let w=n().current;return w!==void 0&&an(e,w)===c},()=>{let w=n().current;if(w===void 0||an(e,w)!==c){it=!1;return}let k=(t.binding?t.binding(w):void 0)?.session.prompt([{type:"text",text:'Kanban board bootstrap: reply with the single word "ready".'}],"queue");Promise.resolve(k).catch(P=>console.warn("dsh-kanban-flow: board seed prompt failed",P)),l(()=>i()!==void 0,d,2e4)},1e4)};return Ot=p,()=>{Ot===p&&(Ot=null)}},[e,t]),null}function ui({sessions:e}){return(0,Me.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"]');!r||r.hasAttribute("aria-expanded")||n.target.closest("button")||cn()&&dn()};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[]),(0,Me.useEffect)(()=>{if(!e?.list)return;let t=e.list.getSnapshot()?.current;return e.list.subscribe(()=>{let r=e.list.getSnapshot()?.current;r!==t&&(t=r,it||dn())})},[e]),null}function fi(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="treeitem"][aria-expanded]')).filter(t=>Pt(t)!==null)}function Pt(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if((n.textContent||"").trim()!==""&&n.querySelector("button")===null&&n.querySelector("svg")===null)return n;return null}function xs(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if(n.querySelector("button")!==null)return n;return null}function Is(e,t){if(!(t instanceof Element))return!1;let n=t.closest("span");return!n||!e.contains(n)?!1:n.querySelector("svg")!==null&&n.querySelector("button")===null&&(n.textContent||"").trim()===""}function pi(e,t){let n=Pt(t);if(!n)return null;let r=(n.textContent||"").trim(),i=e?.list?.getSnapshot?.()?.items;if(!Array.isArray(i))return null;let o=0;for(let s of fi()){if(s===t)break;let a=Pt(s);a&&(a.textContent||"").trim()===r&&(o+=1)}return ri(i,r,o)}function Ss(){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none");for(let[t,n]of[[1.5,12],[6,8],[10.5,5]]){let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",String(t)),r.setAttribute("y","2"),r.setAttribute("width","4"),r.setAttribute("height",String(n)),r.setAttribute("rx","1.4"),r.setAttribute("fill","currentColor"),e.appendChild(r)}return e}function mi({workspaces:e}){return(0,Me.useEffect)(()=>{if(typeof document>"u")return;let t=!1,n=()=>{if(!t)for(let o of fi()){let s=Pt(o),a=xs(o);if(!s||!a||a.querySelector(`[${ln}]`))continue;let l=pi(e,o);if(!l)continue;let d=(s.textContent||"").trim(),p=document.createElement("button");p.type="button",p.setAttribute(ln,""),p.className="kf-sidebar-icon",p.title=`Open kanban board (${d})`,p.setAttribute("aria-label",`Open kanban board for ${d}`),p.appendChild(Ss()),p.addEventListener("click",c=>{c.stopPropagation(),c.preventDefault(),oi(l)}),a.appendChild(p)}},r=new MutationObserver(()=>n());r.observe(document.documentElement,{childList:!0,subtree:!0});let i=e?.list?.subscribe?.(()=>n());return n(),()=>{t=!0,r.disconnect(),typeof i=="function"&&i();for(let o of Array.from(document.querySelectorAll(`[${ln}]`)))o.remove()}},[e]),null}function gi({workspaces:e}){return(0,Me.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!rn()||!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"][aria-expanded]');if(!r||!Pt(r)||Is(r,n.target)||n.target.closest("button")&&!n.target.closest(`[${ln}]`))return;let o=pi(e,r);o&&(n.stopPropagation(),n.preventDefault(),oi(o))};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[e]),null}function vi({workspaces:e}){return(0,Me.useEffect)(()=>{if(!e?.list||typeof e.list.getSnapshot!="function")return;let t=!1,n=new Set(e.list.getSnapshot()?.archivedSessionIds??[]),r=async()=>{if(t)return;let o=e.list.getSnapshot(),s=new Set(o?.archivedSessionIds??[]),a=[...s].filter(l=>!n.has(l));if(n=s,a.length!==0){for(let l of Array.isArray(o?.items)?o.items:[])if(!(!l||!l.workspaceId))try{let p=(await K("get",{},l.workspaceId))?.board?.items??[];for(let c of p)c.sessionId&&a.includes(c.sessionId)&&await K("deleteItem",{id:c.id},l.workspaceId)}catch{}}},i=e.list.subscribe(()=>{r()});return()=>{t=!0,i()}},[e]),null}var fn=require("react"),pe=require("react/jsx-runtime");function bi({item:e,onConfirm:t,onCancel:n}){let r=(0,fn.useRef)(null);return(0,fn.useEffect)(()=>{r.current?.focus();let i=o=>{o.key==="Escape"&&n(),o.key==="Enter"&&t()};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[t,n]),(0,pe.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:i=>{i.target===i.currentTarget&&n()},children:(0,pe.jsxs)("div",{className:"kf-dialog",role:"alertdialog","aria-label":"Archive "+e.id,style:{width:400},children:[(0,pe.jsx)("div",{className:"kf-dialog-head",children:(0,pe.jsx)("span",{className:"kf-dialog-title",children:"Archive item?"})}),(0,pe.jsxs)("div",{className:"kf-dialog-body",children:[(0,pe.jsxs)("div",{className:"kf-muted",children:["Archive ",(0,pe.jsx)("strong",{children:e.id})," \u201C",e.name,"\u201D? The item will be removed from the board",e.sessionId?" and its task session archived":"","."]}),(0,pe.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,pe.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,pe.jsx)("button",{type:"button",ref:r,className:"kf-btn kf-danger",onClick:t,children:"Archive"})]})]})]})})}var Mt=require("react");var L=require("react/jsx-runtime"),Ns=e=>J[e]||e;function hi(e){let{item:t,board:n,onOpenChange:r,onSave:i,onDelete:o,onOpenSession:s,sessions:a}=e,[l,d]=(0,Mt.useState)(t?t.name:""),[p,c]=(0,Mt.useState)(t?t.description:"");if((0,Mt.useEffect)(()=>{d(t?t.name:""),c(t?t.description:"")},[t&&t.id]),!t)return null;let m=n.activities.filter(g=>g.itemId===t.id);return(0,L.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:g=>{g.target===g.currentTarget&&r(!1)},children:(0,L.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Item "+t.id,children:[(0,L.jsxs)("div",{className:"kf-dialog-head",children:[(0,L.jsx)("span",{className:"kf-code-chip",children:t.id}),(0,L.jsx)("span",{className:"kf-dialog-title",children:t.name}),(0,L.jsx)("span",{className:"kf-spacer"}),t.sessionId&&a&&(0,L.jsx)("button",{type:"button",className:"kf-btn",onClick:()=>s(t),children:"Open task session"}),(0,L.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Close","aria-label":"Close item dialog",onClick:()=>r(!1),children:"\u2715"})]}),(0,L.jsxs)("div",{className:"kf-dialog-body",children:[(0,L.jsxs)("div",{className:"kf-muted",children:["In ",(0,L.jsx)("strong",{children:Ns(t.columnId)}),t.sessionId?" \xB7 linked to a task session":""]}),t.statusNote&&(0,L.jsxs)("div",{className:"kf-status-box",children:[(0,L.jsxs)("div",{className:"kf-fieldlabel",children:["Status",t.statusAt?" \xB7 "+Z(t.statusAt):""]}),(0,L.jsx)("div",{children:t.statusNote})]}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Name"}),(0,L.jsx)("input",{className:"kf-input",value:l,onChange:g=>d(g.target.value)})]}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Description"}),(0,L.jsx)("textarea",{className:"kf-textarea",value:p,onChange:g=>c(g.target.value)})]}),(0,L.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-start"},children:[(0,L.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:()=>i({name:l,description:p}),children:"Save"}),(0,L.jsx)("button",{type:"button",className:"kf-btn kf-danger",onClick:()=>o(t.id),children:"Delete item"})]}),t.sessionId&&(0,L.jsx)("div",{className:"kf-muted",children:"Deleting this item also archives its task session."}),(0,L.jsxs)("div",{children:[(0,L.jsx)("div",{className:"kf-fieldlabel",children:"Activity"}),m.length===0&&(0,L.jsx)("div",{className:"kf-muted",children:"No activity yet."}),m.slice().reverse().map(g=>(0,L.jsx)("div",{className:"kf-activity-row",children:(0,L.jsx)("span",{children:Xr(g)})},g.id))]})]})]})})}var te=require("react");var I=require("react/jsx-runtime"),Cs=e=>J[e]||e;function ki({item:e,board:t,onClose:n,onEdit:r,onComment:i,onOpenSession:o,canOpenSession:s=!1}){let[a,l]=(0,te.useState)("comments"),[d,p]=(0,te.useState)(""),[c,m]=(0,te.useState)(!1),g=(0,te.useRef)(null),N=(0,te.useRef)(null);(0,te.useEffect)(()=>{l("comments"),p(""),g.current?.focus()},[e.id]),(0,te.useEffect)(()=>{let k=P=>{P.key==="Escape"&&(P.stopPropagation(),n())};return window.addEventListener("keydown",k),()=>window.removeEventListener("keydown",k)},[n]);let b=(0,te.useMemo)(()=>t.activities.filter(k=>k.itemId===e.id),[t.activities,e.id]),S=(0,te.useMemo)(()=>b.filter(k=>k.type==="item_commented"),[b]),w=(0,te.useMemo)(()=>b.slice().reverse(),[b]),f=async()=>{let k=d.trim();if(!(!k||c)){m(!0);try{await i(k),p("")}finally{m(!1),N.current?.focus()}}};return(0,I.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:k=>{k.target===k.currentTarget&&n()},children:(0,I.jsxs)("div",{className:"kf-dialog kf-item-view",role:"dialog","aria-modal":"true","aria-label":"\u0417\u0430\u0434\u0430\u0447\u0430 "+e.id,children:[(0,I.jsxs)("div",{className:"kf-dialog-head",children:[(0,I.jsx)("span",{className:"kf-code-chip",children:e.id}),(0,I.jsx)("span",{className:"kf-dialog-title",children:e.name}),(0,I.jsx)("span",{className:"kf-spacer"}),(0,I.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:r,children:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"}),(0,I.jsx)("button",{ref:g,type:"button",className:"kf-iconbtn",title:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C","aria-label":"\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043E\u043A\u043D\u043E \u0437\u0430\u0434\u0430\u0447\u0438",onClick:n,children:"\u2715"})]}),(0,I.jsxs)("div",{className:"kf-dialog-body kf-item-view-body",children:[(0,I.jsxs)("div",{className:"kf-item-meta",children:[(0,I.jsx)(ot,{label:"\u041A\u043E\u043B\u043E\u043D\u043A\u0430",children:(0,I.jsx)("span",{className:"kf-chip",children:Cs(e.columnId)})}),(0,I.jsx)(ot,{label:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",children:Le[e.priority]||e.priority}),(0,I.jsx)(ot,{label:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C",children:e.assignee||"\u2014"}),(0,I.jsx)(ot,{label:"\u0421\u043E\u0437\u0434\u0430\u043D\u0430",children:fe(e.createdAt)||"\u2014"}),(0,I.jsx)(ot,{label:"\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",children:fe(e.updatedAt)||"\u2014"}),(0,I.jsx)(ot,{label:"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A",children:e.draft?"\u0434\u0430":"\u043D\u0435\u0442"})]}),e.sessionId&&(0,I.jsxs)("div",{className:"kf-item-session",children:[(0,I.jsx)("span",{className:"kf-muted",children:"\u0417\u0430\u0434\u0430\u0447\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u0430 \u043A \u0441\u0435\u0441\u0441\u0438\u0438"}),s&&(0,I.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>o(e),children:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"})]}),e.statusNote&&(0,I.jsxs)("div",{className:"kf-status-box",children:[(0,I.jsxs)("div",{className:"kf-fieldlabel",children:["\u0421\u0442\u0430\u0442\u0443\u0441",e.statusAt?" \xB7 "+Z(e.statusAt):""]}),(0,I.jsx)("div",{className:"kf-pre",children:e.statusNote})]}),e.labels.length>0&&(0,I.jsxs)("div",{children:[(0,I.jsx)("div",{className:"kf-fieldlabel",children:"\u041C\u0435\u0442\u043A\u0438"}),(0,I.jsx)("div",{className:"kf-chip-row",children:e.labels.map(k=>(0,I.jsx)("span",{className:"kf-chip",children:k},k))})]}),(0,I.jsxs)("div",{children:[(0,I.jsx)("div",{className:"kf-fieldlabel",children:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"}),e.description.trim()?(0,I.jsx)("div",{className:"kf-pre kf-item-description",children:e.description}):(0,I.jsx)("div",{className:"kf-muted",children:"\u0411\u0435\u0437 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F."})]}),(0,I.jsxs)("div",{className:"kf-tabs",role:"tablist",children:[(0,I.jsxs)("button",{type:"button",role:"tab","aria-selected":a==="comments",className:"kf-tab"+(a==="comments"?" kf-tab-active":""),onClick:()=>l("comments"),children:["\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 ",(0,I.jsx)("span",{className:"kf-tab-count",children:S.length})]}),(0,I.jsxs)("button",{type:"button",role:"tab","aria-selected":a==="log",className:"kf-tab"+(a==="log"?" kf-tab-active":""),onClick:()=>l("log"),children:["\u041B\u043E\u0433 ",(0,I.jsx)("span",{className:"kf-tab-count",children:w.length})]})]}),a==="comments"?(0,I.jsxs)("div",{className:"kf-tab-panel",children:[(0,I.jsxs)("div",{className:"kf-comment-list",children:[S.length===0&&(0,I.jsx)("div",{className:"kf-muted",children:"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."}),S.slice().reverse().map(k=>(0,I.jsxs)("div",{className:"kf-comment",children:[(0,I.jsxs)("div",{className:"kf-comment-head",children:[(0,I.jsx)("span",{className:"kf-comment-author",children:nt(k)}),(0,I.jsx)("span",{className:"kf-comment-time",children:fe(k.ts)})]}),(0,I.jsx)("div",{className:"kf-pre",children:k.text})]},k.id))]}),(0,I.jsxs)("div",{className:"kf-comment-form",children:[(0,I.jsx)("textarea",{ref:N,className:"kf-textarea",placeholder:"\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\u2026 (Ctrl+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C)",value:d,onChange:k=>p(k.target.value),onKeyDown:k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),f())}}),(0,I.jsx)("div",{className:"kf-comment-actions",children:(0,I.jsx)("button",{type:"button",className:"kf-btn kf-primary",disabled:!d.trim()||c,onClick:()=>{f()},children:c?"\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430\u2026":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"})})]})]}):(0,I.jsx)("div",{className:"kf-tab-panel",children:(0,I.jsxs)("div",{className:"kf-log",children:[w.length===0&&(0,I.jsx)("div",{className:"kf-muted",children:"\u0421\u043E\u0431\u044B\u0442\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."}),w.map(k=>(0,I.jsx)(Ds,{activity:k},k.id))]})})]})]})})}function ot({label:e,children:t}){return(0,I.jsxs)("div",{className:"kf-item-meta-cell",children:[(0,I.jsx)("div",{className:"kf-fieldlabel",children:e}),(0,I.jsx)("div",{children:t})]})}function Ds({activity:e}){let t=e.type==="item_commented"&&e.text||e.text&&e.type==="item_status"?e.text:"";return(0,I.jsxs)("div",{className:"kf-log-row",children:[(0,I.jsx)("span",{className:"kf-log-dot kf-log-"+(e.source==="agent"?"agent":"human")}),(0,I.jsxs)("div",{className:"kf-log-main",children:[(0,I.jsxs)("div",{className:"kf-log-line",children:[(0,I.jsx)("span",{className:"kf-log-actor",children:nt(e)}),(0,I.jsx)("span",{className:"kf-log-phrase",children:nn(e)})]}),t?(0,I.jsx)("div",{className:"kf-log-note kf-pre",children:t}):null]}),(0,I.jsx)("span",{className:"kf-log-time",title:fe(e.ts),children:fe(e.ts)})]})}var st=require("react"),Q=require("react/jsx-runtime");function wi({code:e,itemCount:t,onConfirm:n,onDismiss:r}){let[i,o]=(0,st.useState)(e),s=(0,st.useRef)(null);(0,st.useEffect)(()=>{s.current?.focus(),s.current?.select()},[]);let a=i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(a);return(0,Q.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:d=>{d.target===d.currentTarget&&r()},children:(0,Q.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Board code",style:{width:400},children:[(0,Q.jsx)("div",{className:"kf-dialog-head",children:(0,Q.jsx)("span",{className:"kf-dialog-title",children:"Name your board"})}),(0,Q.jsxs)("div",{className:"kf-dialog-body",children:[(0,Q.jsxs)("div",{className:"kf-muted",children:["Pick a short code (2\u20136 letters/digits) for this workspace's board. New items get ids like"," ",(0,Q.jsx)("strong",{children:(a.length>=2?a:"XX")+"-1"}),".",t>0&&" Existing item ids stay unchanged."]}),(0,Q.jsxs)("div",{children:[(0,Q.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,Q.jsx)("input",{ref:s,className:"kf-input",style:{fontFamily:"var(--ds-font-family-code)",textTransform:"uppercase",fontSize:16,letterSpacing:"0.08em"},value:i,onChange:d=>o(d.target.value.toUpperCase()),onKeyDown:d=>{d.key==="Enter"&&l&&n(a),d.key==="Escape"&&r()},maxLength:6})]}),(0,Q.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,Q.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:r,children:"Decide later"}),(0,Q.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!l,onClick:()=>n(a),children:["Use ",a||"\u2026"]})]})]})]})})}var Ne=require("react");var z=require("react/jsx-runtime");function $n({on:e,onToggle:t,label:n}){return(0,z.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":n,className:"kf-switch"+(e?" kf-on":""),onClick:t,children:(0,z.jsx)("span",{className:"kf-switch-thumb"})})}function yi({board:e,onCode:t,onConfirmRequired:n,onClose:r}){let i=(0,Ne.useRef)(null),[o,s]=(0,Ne.useState)(e.code);(0,Ne.useEffect)(()=>{let p=c=>{i.current&&!i.current.contains(c.target)&&r()};return document.addEventListener("mousedown",p),()=>document.removeEventListener("mousedown",p)},[r]);let a=o.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(a),d=!!(e.settings&&e.settings.confirmRequired);return(0,z.jsxs)("div",{className:"kf-pop",ref:i,role:"dialog","aria-label":"Board settings",children:[(0,z.jsxs)("div",{className:"kf-toggle-row",children:[(0,z.jsx)($n,{on:d,onToggle:()=>n(!d),label:"Require confirmation to complete work"}),(0,z.jsxs)("div",{className:"kf-toggle-text",children:[(0,z.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to complete work"}),(0,z.jsx)("div",{className:"kf-toggle-sub",children:"On: the agent must send finished work through Review \u2014 it can never move items to Done. You complete by dragging to Done."})]})]}),(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,z.jsxs)("div",{className:"kf-code-row",children:[(0,z.jsx)("input",{className:"kf-input",value:o,maxLength:6,onChange:p=>s(p.target.value.toUpperCase())}),(0,z.jsx)("button",{type:"button",className:"kf-btn",disabled:!l||a===e.code,onClick:()=>t(a),children:"Save"})]}),(0,z.jsxs)("div",{className:"kf-toggle-sub",style:{marginTop:4},children:["Prefixes new item ids (",e.code,"-1, ",e.code,"-2\u2026). Existing ids stay unchanged. The workspace-click preference lives in Settings \u2192 Plugins \u2192 Kanban Flow."]})]})]})}function xi(){let e=(0,Ne.useSyncExternalStore)(ei,rn),t=(0,Ne.useSyncExternalStore)(sn,on);return(0,z.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:520},children:[(0,z.jsxs)("div",{className:"kf-toggle-row",children:[(0,z.jsx)($n,{on:e,onToggle:()=>Qr(!e),label:"Workspace click opens board"}),(0,z.jsxs)("div",{className:"kf-toggle-text",children:[(0,z.jsx)("div",{className:"kf-toggle-title",children:"Workspace click opens board"}),(0,z.jsx)("div",{className:"kf-toggle-sub",children:"New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its conversation (the folder icon still expands the session list). Old: clicking a workspace expands its session list."})]})]}),(0,z.jsxs)("div",{className:"kf-toggle-row",children:[(0,z.jsx)($n,{on:t,onToggle:()=>ti(!t),label:"Require confirmation to archive items"}),(0,z.jsxs)("div",{className:"kf-toggle-text",children:[(0,z.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to archive items"}),(0,z.jsx)("div",{className:"kf-toggle-sub",children:"On: archiving an item from its card first opens a confirmation dialog describing what will be removed. Off: the card's archive button removes the item (and archives its task session) immediately."})]})]}),(0,z.jsx)("div",{className:"kf-muted",children:"Board-specific options \u2014 \u201CRequire confirmation to complete work\u201D and the board code \u2014 live in the gear menu of each board (Board tab \u2192 \u2699)."})]})}var y=require("react/jsx-runtime"),As=e=>{let t=xr(e);if(t.length>0)return t;let n=Dn(e);return n.length>0?n:yr(e)};function at({path:e,size:t=15}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,y.jsx)("path",{d:e})})}var Es="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",Ts="M5 12h14M12 5v14",Rs="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",Os="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",Ls="M2 4h20v4H2zM3 8v12h18V8 M10 12h4";function Ps(e){if(!e)return"";let t=Date.now()-new Date(e).getTime();if(!Number.isFinite(t)||t<0)return"";let n=Math.floor(t/6e4);if(n<1)return"<1 \u043C\u0438\u043D";if(n<60)return n+" \u043C\u0438\u043D";let r=Math.floor(n/60);return r<24?r+" \u0447 "+n%60+" \u043C\u0438\u043D":Math.floor(r/24)+" \u0434 "+r%24+" \u0447"}function Ms({item:e,flash:t,lastActivity:n,stepCount:r,onOpenSession:i,onView:o,onDetails:s,onReady:a,onArchive:l}){let{attributes:d,listeners:p,setNodeRef:c,isDragging:m}=Wr({id:e.id}),[g,N]=(0,R.useState)(!1),[b,S]=(0,R.useState)(null),w=(0,R.useRef)(null),f=(0,R.useRef)(null),k=e.statusNote?{title:"Status",body:e.statusNote,time:Z(e.statusAt)}:null,P=()=>{m||!k||(f.current!==null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{let D=w.current;if(!D)return;let E=D.getBoundingClientRect();S({left:E.left,top:E.top,width:E.width}),N(!0)},300))},O=()=>{f.current!==null&&(window.clearTimeout(f.current),f.current=null),N(!1)};return(0,R.useEffect)(()=>()=>{f.current!==null&&window.clearTimeout(f.current)},[]),(0,R.useEffect)(()=>{m&&O()},[m]),(0,y.jsxs)("div",{ref:D=>{w.current=D,c(D)},...d,...p,className:"kf-card"+(t?" kf-agent-flash":"")+(e.sessionId?" kf-has-session":"")+(m?" kf-dragging":"")+" kf-priority-"+(e.priority||"normal"),style:{"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},onMouseEnter:P,onMouseLeave:O,onFocus:P,onBlur:O,onClick:D=>{D.target.closest(".kf-edit-fab, .kf-archive-fab, .kf-ready-btn, .kf-session-badge")||o()},children:[(0,y.jsx)("button",{type:"button",className:"kf-edit-fab",title:"\u0414\u0435\u0442\u0430\u043B\u0438","aria-label":"\u0414\u0435\u0442\u0430\u043B\u0438 "+e.id,onClick:D=>{D.stopPropagation(),s()},children:(0,y.jsx)(at,{path:Es,size:13})}),(0,y.jsx)("button",{type:"button",className:"kf-archive-fab",title:"Archive item","aria-label":"Archive "+e.id,onClick:D=>{D.stopPropagation(),l()},children:(0,y.jsx)(at,{path:Ls,size:13})}),(0,y.jsxs)("div",{className:"kf-card-id",children:[e.id,e.sessionId&&(0,y.jsx)("button",{type:"button",className:"kf-session-badge",title:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E \u0437\u0430\u0434\u0430\u0447\u0438 "+e.sessionId,onClick:D=>{D.stopPropagation(),i()},children:(0,y.jsx)(at,{path:Os,size:11})}),e.draft&&(0,y.jsx)("span",{className:"kf-pill kf-pill-draft",children:"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A"}),e.priority&&e.priority!=="normal"&&(0,y.jsx)("span",{className:"kf-prio kf-prio-"+e.priority,children:Le[e.priority]})]}),(0,y.jsx)("div",{className:"kf-card-name",children:e.name}),(0,y.jsxs)("div",{className:"kf-card-owner",children:[(0,y.jsx)("span",{className:"kf-owner-dot"+(e.assignee?" kf-owner-set":"")}),(0,y.jsx)("span",{className:"kf-owner-name",title:e.assignee?"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: "+e.assignee:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D",children:e.assignee||(e.draft?"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u2014 \u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D":"\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0430\u0433\u0435\u043D\u0442\u0430")}),e.startedAt&&(0,y.jsxs)("span",{className:"kf-card-timer",title:"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",children:["\u23F1 ",Ps(e.startedAt)]}),r>0&&(0,y.jsxs)("span",{className:"kf-card-steps",title:"\u0428\u0430\u0433\u043E\u0432 \u043F\u043E \u0437\u0430\u0434\u0430\u0447\u0435",children:[r," \u0448\u0430\u0433(\u043E\u0432)"]})]}),e.stats&&(e.stats.agents>0||e.stats.subagents>0||e.stats.jobs>0)&&(0,y.jsxs)("div",{className:"kf-card-stats",children:[e.stats.agents>0&&(0,y.jsxs)("span",{className:"kf-stat-chip",title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435",children:["\u{1F916} ",e.stats.agents]}),e.stats.subagents>0&&(0,y.jsxs)("span",{className:"kf-stat-chip",title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B",children:["\u{1F465} ",e.stats.subagents]}),e.stats.jobs>0&&(0,y.jsxs)("span",{className:"kf-stat-chip",title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job",children:["\u2699 ",e.stats.jobs]})]}),e.draft&&(0,y.jsx)("button",{type:"button",className:"kf-ready-btn",onClick:D=>{D.stopPropagation(),a()},children:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"}),n&&(0,y.jsxs)("div",{className:"kf-card-activity",children:[(0,y.jsx)("span",{className:"kf-card-activity-phrase",children:n.phrase}),(0,y.jsx)("span",{className:"kf-card-activity-time",children:n.time})]}),g&&k&&b&&(0,Ii.createPortal)((0,y.jsxs)("div",{className:"kf-card-tip",role:"tooltip",style:{left:b.left,top:b.top,width:b.width,transform:"translateY(calc(-100% - 6px))"},children:[(0,y.jsxs)("div",{className:"kf-card-tip-title",children:[k.title,k.time?" \xB7 "+k.time:""]}),(0,y.jsx)("div",{className:"kf-card-tip-body",children:k.body}),e.sessionId&&(0,y.jsx)("div",{className:"kf-card-tip-hint",children:"Click to open the task session"})]}),document.body)]})}function Bs({columnId:e,onAdd:t,onCancel:n}){let[r,i]=(0,R.useState)(""),[o,s]=(0,R.useState)("");return(0,y.jsxs)("div",{className:"kf-newitem",children:[(0,y.jsx)("input",{className:"kf-input",autoFocus:!0,placeholder:"Item name",value:r,onChange:a=>i(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r.trim()&&t(r,o),a.key==="Escape"&&n()}}),(0,y.jsx)("textarea",{className:"kf-textarea",placeholder:"Description (optional)",value:o,onChange:a=>s(a.target.value)}),(0,y.jsxs)("div",{className:"kf-newitem-row",children:[(0,y.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,y.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!r.trim(),onClick:()=>t(r,o),children:["Add to ",J[e]]})]})]})}function zs({colId:e,highlighted:t,adding:n,items:r,flashIds:i,lastLines:o,stepCounts:s,onAdd:a,onCancelAdd:l,onOpenSession:d,onView:p,onDetails:c,onReady:m,onArchive:g}){let{setNodeRef:N}=Fr({id:e});return(0,y.jsxs)("div",{className:"kf-column kf-"+e+(t?" kf-over":""),children:[(0,y.jsxs)("div",{className:"kf-column-head",children:[(0,y.jsx)("span",{className:"kf-column-dot"}),(0,y.jsx)("span",{className:"kf-column-title",children:J[e]})]}),(0,y.jsxs)("div",{className:"kf-column-list",ref:N,children:[n&&(0,y.jsx)(Bs,{columnId:e,onAdd:a,onCancel:l}),r.length===0&&!n&&(0,y.jsx)("div",{className:"kf-column-empty",children:"No items"}),r.map(b=>(0,y.jsx)(Ms,{item:b,flash:i.has(b.id),lastActivity:o.get(b.id),stepCount:s.get(b.id)||0,onOpenSession:()=>d(b),onView:()=>p(b),onDetails:()=>c(b),onReady:()=>m(b),onArchive:()=>g(b)},b.id))]})]})}function Si(e){let{workspaceId:t,workspaceTitle:n,sessions:r,archiveSession:i,onOpenTask:o}=e,[s,a]=(0,R.useState)(null),[l,d]=(0,R.useState)(""),[p,c]=(0,R.useState)([]),[m,g]=(0,R.useState)(null),[N,b]=(0,R.useState)(null),[S,w]=(0,R.useState)(null),[f,k]=(0,R.useState)(!1),[P,O]=(0,R.useState)(!1),[D,E]=(0,R.useState)(null),[T,v]=(0,R.useState)(null),M=(0,R.useSyncExternalStore)(sn,on),[W,me]=(0,R.useState)(null),[ge,ve]=(0,R.useState)(new Set),ut=(0,R.useRef)(null),zt=hr(br(et,{activationConstraint:{distance:6}})),ee=(0,R.useCallback)(h=>{if(h&&h.board){let A={...h.board,activities:Array.isArray(h.board.activities)?h.board.activities:[]},B=ut.current;if(B){let H=new Set;for(let le of A.items){let ze=B.get(le.id);ze&&ze!==le.columnId+"|"+le.name+"|"+le.description&&H.add(le.id)}H.size>0&&(ve(H),window.setTimeout(()=>ve(new Set),1500))}ut.current=new Map(A.items.map(H=>[H.id,H.columnId+"|"+H.name+"|"+H.description])),a(A),d(""),en(t,A)}h&&typeof h.error=="string"&&h.error&&d(h.error),Array.isArray(h&&h.warnings)&&h.warnings.length>0&&c(A=>[...A,...h.warnings])},[t]),Y=(0,R.useCallback)((h,A={})=>K(h,A,t).then(ee),[t,ee]),ae=s&&N?s.items.find(h=>h.id===N)??null:null,ft=(0,R.useCallback)(()=>b(null),[]),_t=(0,R.useCallback)(h=>{b(null),o?o({mode:"edit",workspaceId:t,workspaceTitle:n,itemId:h.id}):g({item:h,columnId:h.columnId})},[o,t,n]),xe=(0,R.useCallback)(async(h,A)=>{await Y("commentItem",{id:h,text:A})},[Y]);(0,R.useEffect)(()=>{let h=!1,A=()=>K("get",{},t).then(H=>{h||ee(H)});A();let B=window.setInterval(A,3e3);return()=>{h=!0,window.clearInterval(B)}},[t,ee]),(0,R.useEffect)(()=>{s&&!s.codeConfirmed&&!f&&k(!0)},[s&&s.codeConfirmed]);let he=(0,R.useCallback)(h=>{if(!h.sessionId||!r)return;let A=r.list?.getSnapshot?.()?.current;if(A!==void 0&&A===h.sessionId){dn();return}r.open(h.sessionId)},[r]),Ve=h=>{let A=s?.items.find(B=>B.id===String(h.active.id));A&&E(A)},Wt=h=>{let A=h.over?String(h.over.id):null;me(tt.includes(A)?A:null)},ne=h=>{E(null);let{active:A,over:B}=h;if(!B||!s)return;let H=String(A.id),le=String(B.id),ce=tt.includes(le)?le:s.items.find(Ce=>Ce.id===le)?.columnId;if(!ce)return;let _e=s.items.find(Ce=>Ce.id===H);!_e||_e.columnId===ce||Y("moveItem",{id:H,toColumn:ce})},Ft=h=>{m&&(m.item?Y("updateItem",{id:m.item.id,name:h.name,description:h.description}):Y("createItem",{name:h.name,description:h.description,columnId:m.columnId}),g(null))},$t=h=>{if(M){v(h);return}pt(h)},pt=h=>{Y("deleteItem",{id:h.id}),h.sessionId&&i&&i(h.sessionId)},re=(0,R.useMemo)(()=>{let h=new Map;for(let A of s?.activities??[])A.itemId&&h.set(A.itemId,Gr(A));return h},[s]),mt=(0,R.useMemo)(()=>{let h=new Map;for(let A of s?.activities??[])A.itemId&&["item_status","item_assigned","item_moved","item_updated","item_draft"].includes(A.type)&&h.set(A.itemId,(h.get(A.itemId)||0)+1);return h},[s]),Ie=s&&(0,y.jsxs)("div",{className:"kf-header",children:[(0,y.jsxs)("span",{className:"kf-header-title",children:[(0,y.jsx)("span",{className:"kf-code-chip",children:s.code}),n||"\u041A\u0430\u043D\u0431\u0430\u043D"]}),(0,y.jsxs)("span",{className:"kf-count-chip",children:[s.items.length," \u0437\u0430\u0434\u0430\u0447"]}),(0,y.jsxs)("button",{type:"button",className:"kf-btn kf-primary kf-new-item-btn",title:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u0432 \u0431\u0435\u043A\u043B\u043E\u0433\u0435","aria-label":"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u0434\u0430\u0447\u0443 \u0432 \u0431\u0435\u043A\u043B\u043E\u0433\u0435",onClick:()=>o?o({mode:"new",workspaceId:t,workspaceTitle:n,columnId:"backlog"}):w("backlog"),children:[(0,y.jsx)(at,{path:Ts,size:15}),"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430"]}),(0,y.jsx)("span",{className:"kf-spacer"}),(0,y.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Refresh","aria-label":"Refresh board",onClick:()=>Y("get"),children:(0,y.jsx)(at,{path:"M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"})}),(0,y.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Board settings","aria-label":"Board settings",onClick:()=>O(h=>!h),children:(0,y.jsx)(at,{path:Rs})}),P&&(0,y.jsx)(yi,{board:s,onCode:h=>Y("setCode",{code:h}).then(()=>k(!1)),onConfirmRequired:h=>Y("setConfirmRequired",{value:h}),onClose:()=>O(!1)})]}),qt=s&&(0,y.jsx)("div",{className:"kf-body",children:(0,y.jsx)("div",{className:"kf-columns",children:tt.map(h=>{let A=(s.items??[]).filter(B=>B.columnId===h);return(0,y.jsx)(zs,{colId:h,highlighted:W===h&&D!==null,adding:S===h&&h==="backlog",items:A,flashIds:ge,lastLines:re,stepCounts:mt,onAdd:(B,H)=>{Y("createItem",{name:B,description:H,columnId:"backlog"}),w(null)},onCancelAdd:()=>w(null),onOpenSession:he,onView:B=>{o?o({mode:"view",workspaceId:t,workspaceTitle:n,itemId:B.id}):b(B.id)},onDetails:B=>b(B.id),onReady:B=>{Y("setDraft",{id:B.id,draft:!1})},onArchive:$t},h)})})});return(0,y.jsxs)("div",{className:"kf-root",children:[p.length>0&&(0,y.jsxs)("div",{className:"kf-warning",children:[p.map((h,A)=>(0,y.jsx)("div",{children:h},A)),(0,y.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>c([]),children:"Dismiss"})]}),Ie,l&&(0,y.jsx)("div",{className:"kf-error kf-loading",children:l}),s?(0,y.jsxs)(_r,{sensors:zt,collisionDetection:As,onDragStart:Ve,onDragOver:Wt,onDragEnd:ne,children:[qt,(0,y.jsx)($r,{dropAnimation:{duration:220,easing:"cubic-bezier(0.2, 0, 0, 1)"},children:D?(0,y.jsxs)("div",{className:"kf-card kf-drag-ghost",style:{width:240,"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},children:[(0,y.jsx)("div",{className:"kf-card-id",children:D.id}),(0,y.jsx)("div",{className:"kf-card-name",children:D.name})]}):null})]}):!l&&(0,y.jsx)("div",{className:"kf-loading",children:"Loading board\u2026"}),s&&ae&&(0,y.jsx)(ki,{item:ae,board:s,onClose:ft,onEdit:()=>_t(ae),onComment:h=>xe(ae.id,h),onOpenSession:he,canOpenSession:!!r}),"      ",s&&m&&!o&&(0,y.jsx)(hi,{item:m.item,board:s,onOpenChange:h=>{h||g(null)},onSave:Ft,onDelete:h=>{let A=s.items.find(B=>B.id===h);Y("deleteItem",{id:h}),A&&A.sessionId&&i&&i(A.sessionId),g(null)},onOpenSession:he}),T&&(0,y.jsx)(bi,{item:T,onConfirm:()=>{pt(T),v(null)},onCancel:()=>v(null)}),s&&f&&(0,y.jsx)(wi,{code:s.code,itemCount:s.items.length,onConfirm:h=>Y("setCode",{code:h}).then(()=>k(!1)),onDismiss:()=>k(!1)})]})}var $=require("react");var Be=require("react");var C=require("react/jsx-runtime"),_s=e=>J[e]||e;function Ni({item:e,board:t,busy:n,onEdit:r,onComment:i,onOpenSession:o,canOpenSession:s=!1}){let[a,l]=(0,Be.useState)("comments"),[d,p]=(0,Be.useState)(""),[c,m]=(0,Be.useState)(!1),g=(0,Be.useMemo)(()=>t.activities.filter(w=>w.itemId===e.id),[t.activities,e.id]),N=(0,Be.useMemo)(()=>g.filter(w=>w.type==="item_commented"),[g]),b=(0,Be.useMemo)(()=>g.slice().reverse(),[g]),S=async()=>{let w=d.trim();if(!(!w||c)){m(!0);try{await i(w),p("")}finally{m(!1)}}};return(0,C.jsxs)("div",{className:"kf-task-view",children:[(0,C.jsxs)("div",{className:"kf-task-view-actions",children:[(0,C.jsx)("button",{type:"button",className:"kf-btn kf-primary",disabled:n,onClick:r,children:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"}),e.sessionId&&s&&o&&(0,C.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>o(e),children:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"})]}),(0,C.jsxs)("div",{className:"kf-item-meta",children:[(0,C.jsx)(lt,{label:"\u041A\u043E\u043B\u043E\u043D\u043A\u0430",children:(0,C.jsx)("span",{className:"kf-chip",children:_s(e.columnId)})}),(0,C.jsx)(lt,{label:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",children:Le[e.priority]||e.priority}),(0,C.jsx)(lt,{label:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C",children:e.assignee||"\u2014"}),(0,C.jsx)(lt,{label:"\u0421\u043E\u0437\u0434\u0430\u043D\u0430",children:fe(e.createdAt)||"\u2014"}),(0,C.jsx)(lt,{label:"\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",children:fe(e.updatedAt)||"\u2014"}),(0,C.jsx)(lt,{label:"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A",children:e.draft?"\u0434\u0430":"\u043D\u0435\u0442"})]}),e.statusNote&&(0,C.jsxs)("div",{className:"kf-status-box",children:[(0,C.jsxs)("div",{className:"kf-fieldlabel",children:["\u0421\u0442\u0430\u0442\u0443\u0441",e.statusAt?" \xB7 "+Z(e.statusAt):""]}),(0,C.jsx)("div",{className:"kf-pre",children:e.statusNote})]}),e.labels.length>0&&(0,C.jsxs)("div",{children:[(0,C.jsx)("div",{className:"kf-fieldlabel",children:"\u041C\u0435\u0442\u043A\u0438"}),(0,C.jsx)("div",{className:"kf-chip-row",children:e.labels.map(w=>(0,C.jsx)("span",{className:"kf-chip",children:w},w))})]}),(0,C.jsxs)("div",{children:[(0,C.jsx)("div",{className:"kf-fieldlabel",children:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"}),e.description.trim()?(0,C.jsx)("div",{className:"kf-pre kf-item-description",children:e.description}):(0,C.jsx)("div",{className:"kf-muted",children:"\u0411\u0435\u0437 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F."})]}),(0,C.jsxs)("div",{className:"kf-tabs",role:"tablist",children:[(0,C.jsxs)("button",{type:"button",role:"tab","aria-selected":a==="comments",className:"kf-tab"+(a==="comments"?" kf-tab-active":""),onClick:()=>l("comments"),children:["\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 ",(0,C.jsx)("span",{className:"kf-tab-count",children:N.length})]}),(0,C.jsxs)("button",{type:"button",role:"tab","aria-selected":a==="log",className:"kf-tab"+(a==="log"?" kf-tab-active":""),onClick:()=>l("log"),children:["\u041B\u043E\u0433 ",(0,C.jsx)("span",{className:"kf-tab-count",children:b.length})]})]}),a==="comments"?(0,C.jsxs)("div",{className:"kf-tab-panel",children:[(0,C.jsxs)("div",{className:"kf-comment-list",children:[N.length===0&&(0,C.jsx)("div",{className:"kf-muted",children:"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."}),N.slice().reverse().map(w=>(0,C.jsxs)("div",{className:"kf-comment",children:[(0,C.jsxs)("div",{className:"kf-comment-head",children:[(0,C.jsx)("span",{className:"kf-comment-author",children:nt(w)}),(0,C.jsx)("span",{className:"kf-comment-time",children:fe(w.ts)})]}),(0,C.jsx)("div",{className:"kf-pre",children:w.text})]},w.id))]}),(0,C.jsxs)("div",{className:"kf-comment-form",children:[(0,C.jsx)("textarea",{className:"kf-textarea",rows:3,placeholder:"\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\u2026 (Ctrl+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C)",value:d,onChange:w=>p(w.target.value),onKeyDown:w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),S())}}),(0,C.jsx)("div",{className:"kf-comment-actions",children:(0,C.jsx)("button",{type:"button",className:"kf-btn kf-primary",disabled:!d.trim()||c,onClick:()=>{S()},children:c?"\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430\u2026":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"})})]})]}):(0,C.jsx)("div",{className:"kf-tab-panel",children:(0,C.jsxs)("div",{className:"kf-log",children:[b.length===0&&(0,C.jsx)("div",{className:"kf-muted",children:"\u0421\u043E\u0431\u044B\u0442\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."}),b.map(w=>(0,C.jsx)(Ws,{activity:w},w.id))]})})]})}function lt({label:e,children:t}){return(0,C.jsxs)("div",{className:"kf-item-meta-cell",children:[(0,C.jsx)("div",{className:"kf-fieldlabel",children:e}),(0,C.jsx)("div",{children:t})]})}function Ws({activity:e}){let t=e.text&&e.type!=="item_created"?e.text:"";return(0,C.jsxs)("div",{className:"kf-log-row",children:[(0,C.jsx)("span",{className:"kf-log-dot kf-log-"+(e.source==="agent"?"agent":"human")}),(0,C.jsxs)("div",{className:"kf-log-main",children:[(0,C.jsxs)("div",{className:"kf-log-line",children:[(0,C.jsx)("span",{className:"kf-log-actor",children:nt(e)}),(0,C.jsx)("span",{className:"kf-log-phrase",children:nn(e)})]}),t?(0,C.jsx)("div",{className:"kf-log-note kf-pre",children:t}):null]}),(0,C.jsx)("span",{className:"kf-log-time",title:fe(e.ts),children:fe(e.ts)})]})}var Di=require("react"),ct={requestId:0,mode:"new",workspaceId:"",open:!1},qn=new Set;function Ai(){for(let e of qn)e()}function Bt(e){ct={...e,requestId:ct.requestId+1,open:!0},Ai()}function Ei(){ct.open&&(ct={...ct,open:!1},Ai())}function Ci(){return ct}function Fs(e){return qn.add(e),()=>{qn.delete(e)}}function Ti(){return(0,Di.useSyncExternalStore)(Fs,Ci,Ci)}var x=require("react/jsx-runtime");function dt({icon:e,value:t,title:n}){return t?(0,x.jsxs)("span",{className:"kf-stat-chip",title:n,children:[(0,x.jsx)("span",{"aria-hidden":"true",children:e})," ",t]}):null}function $s(e){if(!e)return"";let t=Date.now()-new Date(e).getTime();if(!Number.isFinite(t)||t<0)return"";let n=Math.floor(t/6e4);if(n<1)return"<1 \u043C\u0438\u043D";if(n<60)return n+" \u043C\u0438\u043D";let r=Math.floor(n/60);return r<24?r+" \u0447 "+n%60+" \u043C\u0438\u043D":Math.floor(r/24)+" \u0434 "+r%24+" \u0447"}function pn({label:e,children:t}){return(0,x.jsxs)("label",{className:"kf-field",children:[(0,x.jsx)("span",{className:"kf-field-label",children:e}),t]})}function Ri({sessions:e}){let t=Ti(),[n,r]=(0,$.useState)(null),[i,o]=(0,$.useState)(""),[s,a]=(0,$.useState)(!1),[l,d]=(0,$.useState)(""),[p,c]=(0,$.useState)(""),[m,g]=(0,$.useState)("normal"),[N,b]=(0,$.useState)(""),[S,w]=(0,$.useState)("todo"),f=(0,$.useMemo)(()=>{if(!(!n||!t.itemId))return n.items.find(v=>v.id===t.itemId)},[n,t.itemId]),k=(0,$.useCallback)(async()=>{if(!t.workspaceId)return;let v=await K("get",{},t.workspaceId);v&&v.board?(r(v.board),o("")):v&&v.error&&o(v.error)},[t.workspaceId]);(0,$.useEffect)(()=>{if(!t.workspaceId)return;let v=!1;k();let M=window.setInterval(()=>{v||k()},3e3);return()=>{v=!0,window.clearInterval(M)}},[t.workspaceId,t.requestId,k]),(0,$.useEffect)(()=>{if(t.mode==="new"){d(""),c(""),g("normal"),b("");return}f&&(d(f.name),c(f.description||""),g(f.priority||"normal"),b((f.labels||[]).join(", ")))},[t.requestId,t.mode,f?.id]);let P=(0,$.useCallback)(async()=>{if(!(!l.trim()||s)){a(!0);try{if(t.mode==="new"){let v=await K("createItem",{name:l.trim(),description:p,columnId:t.columnId||"backlog",draft:!0,priority:m,labels:N.split(",").map(M=>M.trim()).filter(Boolean)},t.workspaceId);v&&v.ok===!1?o(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"):v&&v.item&&Bt({mode:"edit",workspaceId:t.workspaceId,workspaceTitle:t.workspaceTitle,itemId:v.item.id})}else if(f){let v=await K("updateItem",{id:f.id,name:l.trim(),description:p,priority:m,labels:N.split(",").map(M=>M.trim()).filter(Boolean)},t.workspaceId);v&&v.ok===!1&&o(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")}await k()}finally{a(!1)}}},[s,p,f,N,k,l,m,t,o]),O=(0,$.useCallback)(async()=>{if(!(!f||s)){a(!0);try{let v=await K("setDraft",{id:f.id,draft:!1},t.workspaceId);v&&v.ok===!1&&o(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443"),await k()}finally{a(!1)}}},[s,f,k,t.workspaceId]),D=(0,$.useCallback)(async()=>{if(!(!f||s||S===f.columnId)){a(!0);try{let v=await K("moveItem",{id:f.id,toColumn:S},t.workspaceId);v&&v.ok===!1&&o(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"),await k()}finally{a(!1)}}},[s,f,k,S,t.workspaceId]),E=(0,$.useCallback)(async()=>{if(!(!f||s)&&window.confirm("\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 "+f.id+"? \u0421\u0435\u0441\u0441\u0438\u044F \u0437\u0430\u0434\u0430\u0447\u0438 \u0431\u0443\u0434\u0435\u0442 \u0430\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0430.")){a(!0);try{let v=await K("deleteItem",{id:f.id},t.workspaceId);v&&v.ok===!1&&o(v.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C"),Ei()}finally{a(!1)}}},[s,f,t.workspaceId]),T=(0,$.useMemo)(()=>!n||!f?[]:n.activities.filter(v=>v.itemId===f.id).slice(-8).reverse(),[n,f]);if(!t.workspaceId)return(0,x.jsx)("div",{className:"kf-panel-empty",children:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043D\u0430 \u0434\u043E\u0441\u043A\u0435 \xAB\u041A\u0430\u043D\u0431\u0430\u043D\xBB."});if(t.mode==="view"){let v=async M=>{if(!f)return;let W=await K("commentItem",{id:f.id,text:M},t.workspaceId);W&&W.ok===!1&&o(W.error||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"),await k()};return(0,x.jsxs)("div",{className:"kf-task-panel",children:[(0,x.jsxs)("div",{className:"kf-task-panel-head",children:[(0,x.jsxs)("div",{className:"kf-task-panel-title",children:[(0,x.jsx)("span",{className:"kf-task-panel-code",children:f?f.id:"\u0417\u0430\u0434\u0430\u0447\u0430"}),f&&(0,x.jsx)("span",{className:f.draft?"kf-pill kf-pill-draft":"kf-pill kf-pill-ready",children:f.draft?"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"})]}),f&&(0,x.jsxs)("div",{className:"kf-task-panel-stats",children:[(0,x.jsx)(dt,{icon:"\u{1F916}",value:f.stats?.agents||0,title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435"}),(0,x.jsx)(dt,{icon:"\u{1F465}",value:f.stats?.subagents||0,title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B"}),(0,x.jsx)(dt,{icon:"\u2699",value:f.stats?.jobs||0,title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job"})]})]}),i&&(0,x.jsx)("div",{className:"kf-panel-error",children:i}),f&&n?(0,x.jsx)(Ni,{item:f,board:n,busy:s,onEdit:()=>Bt({mode:"edit",workspaceId:t.workspaceId,workspaceTitle:t.workspaceTitle,itemId:f.id}),onComment:v,onOpenSession:M=>{e&&M.sessionId&&e.open(M.sessionId)},canOpenSession:!!e}):(0,x.jsx)("div",{className:"kf-panel-empty",children:n?"\u0417\u0430\u0434\u0430\u0447\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.":"\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0437\u0430\u0434\u0430\u0447\u0443\u2026"})]})}return(0,x.jsxs)("div",{className:"kf-task-panel",children:[(0,x.jsxs)("div",{className:"kf-task-panel-head",children:[(0,x.jsxs)("div",{className:"kf-task-panel-title",children:[(0,x.jsx)("span",{className:"kf-task-panel-code",children:f?f.id:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430"}),f&&(0,x.jsx)("span",{className:f.draft?"kf-pill kf-pill-draft":"kf-pill kf-pill-ready",children:f.draft?"\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"})]}),f&&(0,x.jsxs)("div",{className:"kf-task-panel-stats",children:[(0,x.jsx)(dt,{icon:"\u{1F916}",value:f.stats?.agents||0,title:"\u0410\u0433\u0435\u043D\u0442\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0437\u0430\u0434\u0430\u0447\u0435"}),(0,x.jsx)(dt,{icon:"\u{1F465}",value:f.stats?.subagents||0,title:"\u0421\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u044B"}),(0,x.jsx)(dt,{icon:"\u2699",value:f.stats?.jobs||0,title:"\u0424\u043E\u043D\u043E\u0432\u044B\u0435 job"})]})]}),i&&(0,x.jsx)("div",{className:"kf-panel-error",children:i}),t.mode==="new"&&(0,x.jsx)("div",{className:"kf-panel-hint",children:"\u0417\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043A\u0430\u043A \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A. \u041E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0451 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C\xBB, \u043A\u043E\u0433\u0434\u0430 \u0431\u0443\u0434\u0435\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B \u043E\u0442\u0434\u0430\u0442\u044C \u0430\u0433\u0435\u043D\u0442\u0443."}),(0,x.jsx)(pn,{label:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",children:(0,x.jsx)("input",{className:"kf-input",value:l,placeholder:"\u041A\u043E\u0440\u043E\u0442\u043A\u043E: \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C",onChange:v=>d(v.target.value)})}),(0,x.jsx)(pn,{label:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",children:(0,x.jsx)("textarea",{className:"kf-textarea",rows:5,value:p,placeholder:"\u0414\u0435\u0442\u0430\u043B\u0438, \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043F\u0440\u0438\u0451\u043C\u043A\u0438, \u0441\u0441\u044B\u043B\u043A\u0438",onChange:v=>c(v.target.value)})}),(0,x.jsxs)("div",{className:"kf-field-row",children:[(0,x.jsx)(pn,{label:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",children:(0,x.jsx)("select",{className:"kf-input",value:m,onChange:v=>g(v.target.value),children:Ur.map(v=>(0,x.jsx)("option",{value:v,children:Le[v]},v))})}),(0,x.jsx)(pn,{label:"\u041C\u0435\u0442\u043A\u0438",children:(0,x.jsx)("input",{className:"kf-input",value:N,placeholder:"ui, backend",onChange:v=>b(v.target.value)})})]}),f&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"kf-task-panel-meta",children:[(0,x.jsxs)("span",{children:["\u041A\u043E\u043B\u043E\u043D\u043A\u0430: ",(0,x.jsx)("b",{children:J[f.columnId]})]}),(0,x.jsxs)("span",{children:["\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: ",(0,x.jsx)("b",{children:f.assignee||"\u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D"}),f.assignedAt?" \xB7 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D "+Z(f.assignedAt):""]}),f.startedAt&&(0,x.jsxs)("span",{children:["\u0412 \u0440\u0430\u0431\u043E\u0442\u0435: ",(0,x.jsx)("b",{children:$s(f.startedAt)})]}),(0,x.jsxs)("span",{children:["\u0428\u0430\u0433\u043E\u0432: ",(0,x.jsx)("b",{children:T.length})]}),f.createdBy==="agent"?(0,x.jsx)("span",{children:"\u0421\u043E\u0437\u0434\u0430\u043B \u0430\u0433\u0435\u043D\u0442"}):(0,x.jsx)("span",{children:"\u0421\u043E\u0437\u0434\u0430\u043B\u0438 \u0432\u044B"}),f.updatedAt&&(0,x.jsxs)("span",{children:["\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E ",Z(f.updatedAt)]})]}),f.statusNote&&(0,x.jsxs)("div",{className:"kf-task-note",children:[(0,x.jsxs)("div",{className:"kf-task-note-title",children:["\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u0433\u0435\u043D\u0442\u0430 \xB7 ",Z(f.statusAt)]}),(0,x.jsx)("div",{children:f.statusNote})]})]}),(0,x.jsxs)("div",{className:"kf-task-actions",children:[(0,x.jsx)("button",{type:"button",className:"kf-btn kf-primary",disabled:s||!l.trim(),onClick:()=>{P()},children:t.mode==="new"?"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"}),f&&f.draft&&(0,x.jsx)("button",{type:"button",className:"kf-btn kf-success",disabled:s,onClick:()=>{O()},children:"\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C"}),f&&!f.draft&&f.columnId!=="todo"&&(0,x.jsx)("button",{type:"button",className:"kf-btn kf-ghost",disabled:s,onClick:()=>{K("setDraft",{id:f.id,draft:!0},t.workspaceId).then(()=>k())},children:"\u0412 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A"}),f&&f.sessionId&&e&&(0,x.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>e.open(f.sessionId),children:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"})]}),f&&(0,x.jsxs)("div",{className:"kf-task-move",children:[(0,x.jsx)("select",{className:"kf-input",value:S,onChange:v=>w(v.target.value),children:tt.map(v=>(0,x.jsx)("option",{value:v,children:J[v]},v))}),(0,x.jsx)("button",{type:"button",className:"kf-btn kf-ghost",disabled:s||S===f.columnId,onClick:()=>{D()},children:"\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"}),(0,x.jsx)("button",{type:"button",className:"kf-btn kf-danger",disabled:s,onClick:()=>{E()},children:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C"})]}),f&&T.length>0&&(0,x.jsxs)("div",{className:"kf-task-activity",children:[(0,x.jsx)("div",{className:"kf-task-activity-title",children:"\u0418\u0441\u0442\u043E\u0440\u0438\u044F"}),T.map(v=>(0,x.jsxs)("div",{className:"kf-task-activity-row",children:[(0,x.jsx)("span",{className:"kf-task-activity-icon","aria-hidden":"true",children:v.type==="item_assigned"?"\u{1F464}":v.type==="item_status"?"\u{1F4AC}":v.type==="item_moved"?"\u279C":v.type==="item_created"?"\uFF0B":"\u2022"}),(0,x.jsx)("span",{className:"kf-task-activity-time",children:Z(v.ts)}),(0,x.jsx)("span",{className:"kf-task-activity-text",children:v.type==="item_moved"?`\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E ${J[v.from]||v.from} \u2192 ${J[v.to]||v.to}`:v.type==="item_created"?"\u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0430":v.type==="item_draft"?v.to==="ready"?"\u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E \u0432 \u0440\u0430\u0431\u043E\u0442\u0443":"\u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u043E \u0432 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":v.type==="item_status"?"\u0441\u0442\u0430\u0442\u0443\u0441 \u0430\u0433\u0435\u043D\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D":v.type==="item_assigned"?"\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: "+(v.text||"\u0441\u043D\u044F\u0442"):v.type==="item_updated"?"\u0437\u0430\u0434\u0430\u0447\u0430 \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430":v.type})]},v.id))]})]})}function qs(e){let t={items:[]};return!e||!e.list||typeof e.list.getSnapshot!="function"?t:(0,F.useSyncExternalStore)(n=>e.list.subscribe(n),()=>e.list.getSnapshot())}function Ks(e){if(!(!e||!e.list||typeof e.list.getSnapshot!="function"))return(0,F.useSyncExternalStore)(t=>e.list.subscribe(t),()=>e.list.getSnapshot().current)}function js(e){let t=qs(e.workspaces),n=(0,F.useSyncExternalStore)(ci,li),r=Ks(e.sessions)??e.sessionId,i=ni({override:n,currentSessionId:r,workspaceItems:Array.isArray(t.items)?t.items:[],recentWorkspaceId:t.recentWorkspaceId});(0,F.useEffect)(()=>{n&&i.nativeWorkspaceId===n.workspaceId&&Lt(null)},[n,i.nativeWorkspaceId]);let o=e.workspaces?.archiveSession?s=>{e.workspaces.archiveSession(s)}:void 0;return(0,F.createElement)(Si,{workspaceId:i.workspaceId,workspaceTitle:i.pinned?i.workspaceTitle||i.workspaceId:i.workspaceTitle,sessions:e.sessions,archiveSession:o,onOpenTask:e.onOpenTask})}function Hs(){return(0,F.createElement)(xi)}function Vs({workspaces:e}){return(0,F.useEffect)(()=>{if(!e||!e.list)return;let t=!1,n=async()=>{let i=e.list.getSnapshot(),o=Array.isArray(i?.items)?i.items:[];for(let s of o){let a=await K("get",{},s.workspaceId);if(t)return;a&&a.board&&en(s.workspaceId,a.board)}};n();let r=window.setInterval(()=>{n()},5e3);return()=>{t=!0,window.clearInterval(r)}},[e]),null}function Us(e){return(0,F.useEffect)(()=>{let t=e.sessions;t&&Hr({createSession:n=>t.create({workspaceId:n}),renameSession:async(n,r)=>{let o=await t.binding(n)?.session.rename(r);o&&o.ok===!1&&console.warn("dsh-kanban: rename failed",o.error)},promptSession:async(n,r)=>{let i=t.binding(n);if(!i)throw new Error("session binding unavailable: "+n);let o=await i.session.prompt([{type:"text",text:r}],"queue");if(o&&o.ok===!1)throw new Error("prompt failed: "+(o.error&&o.error.message))},archiveSession:async n=>{let r=e.workspaces?.archiveSession;if(!r)throw new Error("workspaces.archiveSession unavailable");await r(n)}})},[e.sessions,e.workspaces]),(0,F.createElement)("div",{style:{display:"contents"}},(0,F.createElement)(di,{workspaces:e.workspaces,sessions:e.sessions}),(0,F.createElement)(ui,{workspaces:e.workspaces,sessions:e.sessions}),(0,F.createElement)(ai),(0,F.createElement)(vi,{workspaces:e.workspaces}),(0,F.createElement)(mi,{workspaces:e.workspaces}),(0,F.createElement)(gi,{workspaces:e.workspaces}),(0,F.createElement)(Vs,{workspaces:e.workspaces}))}var Oi="dsh-kanban/task",Li="dsh-kanban-task",Pi={name:"dsh-kanban",inject:["slots","workspaces","sessions","sidebarRightTabs"],apply(e){let t=e.get("slots");if(t===void 0)return;let n=e.get("workspaces"),r=e.get("sessions"),i=s=>{Bt({mode:s.mode,workspaceId:s.workspaceId,workspaceTitle:s.workspaceTitle,itemId:s.itemId,columnId:s.columnId});let a=e.get("sidebarRight");if(a&&typeof a.openTab=="function")try{a.openTab(Li)}catch(l){console.warn("dsh-kanban: cannot open task panel",l)}};t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban",order:20,label:"\u041A\u0430\u043D\u0431\u0430\u043D"},s=>(0,F.createElement)(js,{...s,workspaces:n,sessions:r,onOpenTask:i})));let o=e.get("sidebarRightTabs");if(o&&typeof o.register=="function"){let s=()=>o.register({id:Oi,kind:Li,title:()=>"\u0417\u0430\u0434\u0430\u0447\u0430",guide:[{id:"task",order:70,title:()=>"\u0417\u0430\u0434\u0430\u0447\u0430 \u043A\u0430\u043D\u0431\u0430\u043D\u0430",description:()=>"\u0414\u0435\u0442\u0430\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u0434\u0430\u0447\u0438"}]});typeof e.effect=="function"?e.effect(s,"dsh-kanban: sidebar tab"):s()}t.inject("sidebar.right.pane.tab",()=>t.register({name:"sidebar.right.pane.tab",key:Oi},()=>(0,F.createElement)(Ri,{sessions:r}))),t.inject("settings.plugins.tab",()=>t.register({name:"settings.plugins.tab",id:"dsh-kanban",order:10,label:"\u041A\u0430\u043D\u0431\u0430\u043D"},()=>(0,F.createElement)(Hs))),t.inject("sidebar.footer.action",()=>t.register({name:"sidebar.footer.action",id:"kanban-controllers",order:90},()=>(0,F.createElement)(Us,{workspaces:n,sessions:r})))}};try{console.info("[dsh-kanban] client bundle loaded (build 2026-11-05T07:47:13.474Z)")}catch{}var Mi="data-dsh-kanban-style";if(typeof document<"u"&&!document.querySelector("style["+Mi+"]")){let e=document.createElement("style");e.setAttribute(Mi,""),e.textContent=Jn,document.head.appendChild(e)}var Ys=Pi;
    
    return module.exports
  },
})