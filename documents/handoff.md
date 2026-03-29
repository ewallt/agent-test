# Session Handoff — 2026-03-29

## What Was Done This Session

### Playwright MCP — End-to-End Test Confirmed
- Fresh session confirmed Playwright MCP connects at startup
- Navigated to example.com, got accessibility snapshot and screenshot — full success
- Learned: file:// URLs blocked; must use local HTTP server (`python -m http.server`)
- Learned: server must run as foreground process with `run_in_background: true` (no `&`)
- Learned: if Chrome window is manually closed, next navigate call reopens it automatically

### Dev Branch Synced with Main
- Merged main into dev cleanly (2 merge commits, no conflicts)

### BYG Web App — Global Theme Switcher
- Added gear icon (⚙) to top-right of app header
- Popover opens with 4 options: Default, Explorer, Archives, High-Command
- Theme applies to `body` globally via class (`body.theme-explorer` etc.)
- All tabs re-theme automatically via CSS variable overrides
- Smooth transitions on background/color

### BYG Web App — Explorer Theme Fixes (Partial)
- Visual audit of tabs 1–3 under Explorer theme
- Subagent extracted all hardcoded rgba values across all 5 tabs
- Applied fixes: active tab buttons, beat label opacity, badge-watch, Explore button, subtabs, select, chips, flashcard controls, quotes hover
- Specificity fix applied (body.theme-explorer #tab-id .selector pattern)
- Visual verification incomplete — Watch badge fix still unconfirmed at shutdown
- Changes committed to dev

### Methodology Research
- Researched token cost of Playwright visual iteration: ~10K tokens per round, ~114K per full session
- Verdict: not viable on Claude.ai Pro ($20/month) for iterative visual work
- Researched effectiveness: spec-driven (subagent audit + grep) beats visual iteration for CSS theming
- Wrote reference document: `documents/playwright-mcp-findings.html` (added to index)

---

## State Right Now

- On `dev` branch, ahead of origin/dev by several commits (not pushed)
- BYG Explorer theme mostly fixed; Watch badge specificity fix applied but unverified visually
- HTTP server on port 8765 may or may not be running
- Playwright MCP findings documented and indexed

## Next Session Priority

Run an ephemeral notebook — pick a topic and execute the full ephemeral notebook workflow.

## Other Items

- None flagged

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: ephemeral-notebook
