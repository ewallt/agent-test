# Session Handoff — 2026-03-08

## What Was Done This Session

### Crash recovery
- Previous session crashed mid-work on bar-chart-race reconstruction
- Project confirmed fully restored at `Projects/Remotion/bar-chart-race/`
- Both compositions (AiMmlu, StreamingWars) working in Studio
- Tom re-obtained "Signal Through the Dark.mp3" and placed in public/

### Remotion studios — fixed ports
- bar-chart-race: 3000, simple-narrated-slides: 3001, whiteboard-explainer: 3002
- All three can run simultaneously; Claude starts them at the top of Remotion sessions
- remotion.config.ts updated in all three projects

### Git / dev-prod environment
- `git init` at agent-test root — single repo covering all projects
- Branches: `main` (production), `dev` (working — currently on this)
- `promote.sh` at root — runs all tests, merges dev → main if passed
- 99 structural tests across all three Remotion projects (all passing)

### B3 build indicator
- Removed from Britain1940.tsx (BattleOfAtlantic never had it)

### Task manager app
- `tools/tasks.html` + `tools/tasks.json`
- Served on localhost:3010 via `npx serve . --listen 3010` in tools/
- Two-level hierarchy: Remotion/NotebookLM/Infrastructure → sub-workflows → tasks
- Read-only for now; tasks.json maintained manually by Claude

### Startup routine overhauled
- No longer reads active.txt or pre-loads workflow context
- Reads `documents/overview.md` at start for high-level orientation
- Then waits for Tom to indicate workflow before loading deep context

### overview.md created
- `documents/overview.md` — high-level map of all 5 groups with pointers to detail docs
- Wired into MEMORY.md as the session-start read

---

## State Right Now

- On `dev` branch; several commits ahead of `main` (not yet promoted)
- All three Remotion studios were running when session ended (may need restarting)
- Task manager server was running on 3010 (may need restarting)

## Next Session Priority

**IMPORTANT: Build the shutdown routine** — a checklist/skill for cleanly ending sessions:
commit uncommitted changes, update tasks.json, update session-log.md and pending.md,
optionally promote to main.

## Other 3-Priority Items (per ReadMe)
- Bar chart race: wire up Tallest Buildings
- Whiteboard Explainer: 6 new scene types + WhiteboardExplainer-3
- Whiteboard Explainer: V2 roadmap items
- NotebookLM: unified artifact workflow (remotion flag still to design)
- Infrastructure: installed-skills tracker, skill eval pass
