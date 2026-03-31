# Session Handoff — 2026-03-31

## What Was Done This Session

### Notebooks Built

**AI Frontier March 2026** (`36df8974`)
- Deep research run, 88 sources imported, 4 videos queued (retro_print style)
- Videos: Why Sora Failed, Nemotron Coalition, Meta TRIBE v2 Brain AI, Entry-Level Job Trap
- Notebook shared publicly

**Claude Code Session Persistence — Meta Notebook** (`a7973469`)
- 39 sources on Claude Code workflow patterns: CLAUDE.md, hooks, drift prevention, session persistence, skill chaining
- Purpose: for Claude to query when evaluating Tom's workflow infrastructure vs. professional patterns
- ID recorded in working-notes.md

### Architecture Discussion — Pre-Harness vs. Harness
- Tom framed current work (session logs, JIT, startup/shutdown) as "pre-harness" — compensations for statelessness
- "Harness" proper = OpenClaw-style always-on architecture with persistent state, auto auth refresh, channel integrations
- Anthropic's response: Claude Code Channels + Agent Skills open standard (MCP at 97M installs)
- Researched nlm auth: 3-layer recovery mechanism in nlm CLI, cookies stable for weeks — 20-min limit may be overstated
- NLM Enterprise API (Sep 2025): bearer tokens, headless auth — enterprise only, min 15 licenses
- Two-instance workflow discussed: decided one instance with a proper skill is better than two for current workflow scale
- Design principle confirmed: break sessions at natural phase boundaries (research/import vs. query/act)

### BYG Video Workflow
- Discussed the three phases: Script → Localhost → Render & Deploy
- Identified doodle pre-specification (notes.md written before build) as the key missing step
- Confirmed mutagen timing fix is untested — Illustration 03 render will be the first real validation
- Proposed batch production plan: do all scripts first, then all localhost reviews, then all deploys
- Wrote `Projects/BYG/documents/byg-video-workflow.html` — full reference doc with phase breakdown, who-does-what, batch plan

### Index.html Redesign
- Rebuilt `documents/index.html` from 6-column grid to tabbed layout
- Six tabs: Project, Behold Your God, Remotion, NotebookLM, Claude & Skills, Infrastructure
- Added BYG Video Workflow card to BYG tab

---

## State Right Now

- AI Frontier notebook live with 4 videos rendering (~8-10 min each)
- Claude Code meta notebook (`a7973469`) built and ready to query
- Illustration 03 (WhiteHatBlackHat): TSX + audio complete, timing fix in place — render + deploy still pending
- `documents/index.html` now tabbed; all existing cards preserved

## Next Session Priority

Tom has something new to work on — he'll describe it at session start.

## Other Items

Nothing blocked or unresolved.

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: none
