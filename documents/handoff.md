# Session Handoff — 2026-03-28

## What Was Done This Session

### Playwright MCP — Confirmed Working
- Tested end-to-end in fresh session: navigated example.com, got snapshot, took screenshot ✓
- file:// URLs are blocked by Playwright MCP — must use local HTTP server
- Server must be started as foreground process with `run_in_background: true` (no `&`)

### Dev Synced with Main
- Merged main into dev cleanly

### BYG Web App — Global Theme Switcher Added
- Gear icon (⚙) top-right of app header
- Popover: Default, Explorer, Archives, High-Command
- Theme applies to `body` globally — all tabs re-theme via CSS variable overrides
- File: `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html`

---

## State Right Now

- Theme switcher is working globally
- **Explorer theme has rendering issues** — hardcoded navy-blue rgba values throughout all tabs not yet overridden
- Changes are on dev, NOT yet committed or deployed
- HTTP server may or may not still be running on port 8765

---

## Next Session Priority

**Fix Explorer theme rendering across all tabs.** All the research is done — just needs CSS overrides added to `body.theme-explorer` in the global `<style>` block.

### Complete fix list (from visual audit + subagent extraction):

**Global (all tabs):**
- `.tab-btn.active` — hardcoded `rgba(139,185,255,.12)` bg + `rgba(139,185,255,.35)` border → override with accent-based values
- `.tab-btn:hover` — hardcoded `rgba(255,255,255,.25)` border → invisible on light themes

**Tab 1 — The Arc:**
- `.beat-label` — `opacity: .65` makes gold label very faint → set opacity: 1
- `.arc-timeline::before`, `.arc-beat::before`, `.beat-quote` — already handled in existing `body.theme-explorer` overrides ✓

**Tab 2 — Illustrations:**
- `.badge-watch` — bg `rgba(139,185,255,.15)` + border `rgba(139,185,255,.35)` → needs accent override
- `.ill-item:hover` — bg `rgba(139,185,255,.05)` + border `rgba(139,185,255,.35)` → needs accent override

**Tab 3 — Explorer:**
- `button.primary` — gradient `rgba(139,185,255,1)` to `rgba(124,255,178,.92)` → replace with solid accent
- `select` — bg `#0b1422` (very dark navy) → needs surface override
- `.subtab.active` — same blue rgba as tab-btn.active
- `.subtab:hover` — `rgba(255,255,255,.2)` border → invisible on light
- `.chip` — blue rgba border/bg
- `.explanation` — blue rgba bg/border
- `td` — `rgba(255,255,255,.05)` border → invisible on light

**Tab 4 — Flashcards:**
- `button.primary` — same blue gradient as Tab 3
- `button:hover` — `rgba(255,255,255,.25)` border → invisible on light
- `.fc-progress-wrap` — `rgba(255,255,255,.07)` → invisible on light
- `kbd` — bg/border using white rgba → invisible on light
- `.kbd-hint` — `rgba(169,182,204,.4)` color → hardcoded

**Tab 5 — Quotes:**
- `.q-card:hover` — border `rgba(139,185,255,.3)` → needs accent override

### Implementation approach:
Add one large `body.theme-explorer { ... }` override block to the global `<style>` section. All fixes are CSS-only, no JS or HTML changes needed. After fixing, do one screenshot per tab to verify, then deploy.

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: BYG Explorer theme fixes — apply the fix list above to `behold-your-god.html`, verify visually with Playwright (start HTTP server on port 8765 first), then deploy with byg-deploy skill.
