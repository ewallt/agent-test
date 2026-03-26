# Session Log

---

## 2026-03-25 — Repo Sync, dev→main Promotion, BYG Flashcard App

### Repo Sync
- Session run via web interface (CLI login unavailable)
- 13 commits pushed to `origin/dev`; `dev` merged into `main` — first promotion in several sessions
- `inf-2` resolved

### Web App Expansion Direction Established
- Tom reviewed the "Architecture of Engagement" NotebookLM report (in `ReadMe.txt`)
- Goal: identify new interactive web app types to add to the workflow
- Current lineup: Explorer+Quiz, Tabbed (throwaway), Gemini Slides
- Behold Your God chosen as test vehicle for new app types

### BYG Flashcard App Shipped
- `apps/byg-flashcards.html` built and deployed to `behold-your-god-flashcards/`
- 22 cards: 10 themes × 2 + 2 Great Controversy synthesis cards
- Content derived from `behold-your-god.html` FOCUS_PROMPTS
- Features: flip, shuffle, Got It / Still Learning tracking, keyboard shortcuts, Reset All
- Alignment fix: removed `flex:1` from `.card-answer`; back face set to `justify-content: center`
- Version number added inline (v1.2 at end of session)
- Added to dashboard

### Not Done Yet
- Flashcard skill not formalized
- Documentation for the app not written
- Next app type not decided (Connections game or Chat Tutor are top candidates)

---

## 2026-03-14 (session 2) — gh-pages Convention Fix, Skill Update, Cleanup

### gh-pages Deploy Convention Corrected
- Re-deployed `nlm-workflow-explainer` using correct GitHub Pages convention: `index.html` inside a named subfolder
- Old flat file (`notebooklm/nlm-workflow-explainer.html`) removed with `git rm`
- New URL: `https://ewallt.github.io/claude-code-fun/notebooklm/nlm-workflow-explainer/`

### gh-pages-deploy Skill Updated
- `~/.claude/skills/gh-pages-deploy/SKILL.md` rewritten to reflect index.html convention
- URL pattern, deploy command, and output step all updated
- Known subfolders table added; non-fatal worktree cleanup error on Windows documented

### Tickets
- `inf-11` added: fix mercy gh-pages deploy to use index.html/subfolder convention (P4)

### Cleanup
- Deleted `gdrive-auth.cjs` from agent-test root (one-time OAuth helper, no longer needed)

---

## 2026-03-14 — Query Loop Discovery, Behold Your God Web App, Workflow Updates

### Key Discovery: nlm notebook query replaces Google Docs for content extraction
- Ran "The Current State of Claude Code" notebook (post-cutoff topic, 10 web research sources)
- Queried notebook with targeted questions — responses were rich, detailed, grounded in 2025–2026 sources
- Confirmed: `nlm notebook query` is the primary and preferred way for Claude to access NLM content
- Google Docs export loop is still valid for source augmentation / iterative refinement, but NOT needed for web app content
- No Drive, no OAuth, no artifact export, no artifact ID hunting — just ask and get

### Behold Your God Web App (F.T. Wright)
- Notebook: `b64c5fc6-6a75-4af7-97a0-51cb1d9f9b74` ("Behold Your God: Understanding Divine Character")
- Queried notebook for main themes → rich response covering all illustrative concepts (Nuclear Plant, White Hat, Prodigal Son, Boeing 747, Rods and Serpents, etc.)
- Built `apps/behold-your-god.html` — 10 themes in Explorer dropdown, FOCUS_PROMPTS grounded in notebook query content
- Fixed chips bug (JSON in onclick attribute broke when questions contained quotes) and dropdown arrow (appearance:none with no custom arrow)

### Workflow and Docs Updated
- `ephemeral-notebook/documents/workflow.md` — Step 6 now includes query step before building web app
- `ephemeral-notebook/documents/nlm-claude-feedback-loop.md` — rewritten: two loops documented (query primary, Drive secondary)
- `documents/nlm-feedback-loop.html` — updated diagram, two loops, new use case card for query-based extraction
- `notebooklm-webapp` SKILL.md — query step added as preferred knowledge source before building

### Order of Operations Fix (lesson learned)
- Video should be triggered LAST (fire and forget) — not before exporting/querying
- Briefing doc artifact doesn't appear in `nlm studio status` — slides artifact is what `nlm export to-docs` needs
- But for web app content, query is better than export in every way — no artifact needed at all

### Claude Code Notebook (test vehicle, not wrapped up)
- Notebook: `4872a2c8-2066-4df2-8d4f-564e7c531c90` ("The Current State of Claude Code")
- 10 web research sources; video and slide deck generated; not shared or run-logged

---

## 2026-03-13 (session 3) — gdrive POC Complete, Feedback Loop Docs, Memory System Discussion

### gdrive MCP Round-Trip POC (nlm-10 — done)
- Verified `mcp__gdrive__search` works; found Double-Entry Bookkeeping doc immediately
- Read exported slide manifest via `ReadMcpResourceTool` — full markdown returned
- Claude augmented manifest: added Slide 6 (Venice → Antwerp → Amsterdam/VOC), deepened Slides 3 & 5
- Uploaded as new notebook source (`03eca125`) to notebook `18b286a4`
- Full loop confirmed end-to-end: NLM → Drive → Claude reads → improves → re-upload → NLM

### Memory System Discussion
- Tom discovered the memory directory (`~/.claude/projects/.../memory/`) for the first time
- Established design principle: fat docs in project file system, lean in memory directory
- Memory = MEMORY.md index + feedback + session log + pointers; project = substantive reference docs
- Created `inf-10` ticket: document system audit and consolidation

### Documents Created
- `memory/working-notes.md` — Claude's live quick-reference (notebook IDs, gdrive status, CLI gotchas)
- `ephemeral-notebook/documents/nlm-claude-feedback-loop.md` — technical reference for Claude: full loop architecture, OAuth debugging history, POC record, quickstart
- `documents/claude-memory-system.html` — Tom's reference on the memory directory: file types, load order, how to add entries
- `documents/nlm-feedback-loop.html` — Tom's reference on the feedback loop: short intro + 13 brainstormed use cases (now/near/later)

### Tickets
- inf-9 (gdrive OAuth): done
- nlm-10 (round-trip POC): done
- inf-10 (document system audit): added as pending

### mercy.html Deployed
- Deployed `Sermon on the Mount/mercy.html` to gh-pages branch under `sermon-on-the-mount/mercy.html`
- Live at `https://ewallt.github.io/claude-code-fun/sermon-on-the-mount/mercy.html`

---

## 2026-03-13 (session 2) — Google Drive OAuth Setup Complete

### Goal
Complete OAuth consent for the gdrive MCP server and test the Claude ↔ NotebookLM round-trip (nlm-10).

### What Happened

**OAuth env var bug fixed:**
- `~/.claude.json` had `GDRIVE_CREDENTIALS_PATH` pointing to the OAuth key file (`gcp-oauth.keys.json`) — wrong
- Correct split: `GDRIVE_CREDENTIALS_PATH` = token file (output), `GDRIVE_OAUTH_PATH` = key file (input)
- Fixed in `~/.claude.json`

**redirect_uri added to key file:**
- `gcp-oauth.keys.json` was missing `redirect_uris` field — added `["http://localhost:3000/oauth2callback"]`
- Tom also had to add that URI to Google Cloud Console and add ewalltom@gmail.com as a test user (audience)

**port 3000 conflict:**
- Remotion bar-chart-race studio was on port 3000 — killed it
- Debug script (`res.end('test')`) got stuck on port 3000 and intercepted early OAuth callbacks — caused confusion
- Fixed by stopping the debug task via TaskStop

**OAuth completed:**
- Wrote `gdrive-auth.cjs` — custom CommonJS auth script using googleapis package from npx cache
- Ran as background task; Tom opened the auth URL manually, completed sign-in, got "Authentication successful!"
- Token saved to `~/.notebooklm-mcp-cli/gdrive-token.json`

**State at end of session:**
- Token file exists: `~/.notebooklm-mcp-cli/gdrive-token.json`
- `~/.claude.json` updated with correct env vars (both `GDRIVE_CREDENTIALS_PATH` and `GDRIVE_OAUTH_PATH`)
- **Needs a Claude Code restart** to pick up the fixed MCP config
- inf-9 is now complete after restart + verification

### Next Session
1. Restart Claude Code (if not done yet) — gdrive MCP will load with correct token
2. Test `mcp__gdrive__search` — search for "Double-Entry Bookkeeping"
3. Read the exported doc (ID: `1IPNE41yztAeqfLPlyjvHoGbcuV8UN24d2WLHsrLDUuw`)
4. Complete nlm-10 round-trip: Claude reads → augments → saves new version → uploads as notebook source

### Tickets
- inf-9: complete after restart verification
- nlm-10: still pending (round-trip test)

---

## 2026-03-13 — Google Drive MCP Integration, nlm Export Test, CLI Doc Update

### Prompt Injection Incident
- Gemini sent a message formatted as `<system_update_for_claude_code>` with fake system directives and destructive reinstall commands
- Flagged to Tom as prompt injection — identified fake tag, version mismatch, suspicious `nlm --ai` framing
- Outcome: `nlm export to-docs` was real (just undocumented); the framing was bad, the CLI info was accurate

### nlm CLI Doc Update (nlm-8 — done)
- Added four missing command groups to `documents/notebooklm-cli.html`: `export` (to-docs, to-sheets, artifact), `login` (profile management), `skill` (install for AI tools), and file type notes on `source add`
- Updated artifact table: Report → Google Docs, Data Table → Google Sheets export noted
- Updated `studio status` row: now notes it's how you get artifact IDs for export

### nlm Export to-docs — End-to-End Test (nlm-9 — done)
- Confirmed `nlm export to-docs` works: Double-Entry Bookkeeping notebook, report artifact e87e8b33
- Doc exported to Google Drive: https://docs.google.com/document/d/1IPNE41yztAeqfLPlyjvHoGbcuV8UN24d2WLHsrLDUuw

### Google Drive MCP Integration Setup (inf-9 — in progress)
- Architecture from Gemini via ReadMe.txt: `@modelcontextprotocol/server-gdrive`, user-delegated OAuth 2.0, full `drive` scope
- Wrote `documents/gdrive-integration.html` (Tom's reference) and `ephemeral-notebook/documents/gdrive-integration.md` (Claude's one-stop reference)
- Tom created OAuth credentials in Google Cloud Console (web app type), downloaded JSON
- Copied to `~/.notebooklm-mcp-cli/gcp-oauth.keys.json`
- Added `gdrive` MCP block to `~/.claude.json` — loads on next restart
- First restart will trigger one-time browser OAuth consent

### Tickets
- nlm-8 done, nlm-9 done, nlm-10 created (pending), inf-9 updated with full spec

### Misc
- Saved Drinker Paradox app description to `ephemeral-notebook/reference/drinker-paradox-app.txt`
- Established ReadMe.txt convention (saved to memory): Tom uses `agent-test/ReadMe.txt` to pass long content

---

## 2026-03-12 — Ticket System, Skills, Test Coverage, Promotion

### Ticket System (Jira-style)
- Created `ticket-tracker` skill — reads/writes `tools/tasks.json`, triggers on "jira", "ticket", ticket IDs, shutdown Step 4
- Reconciled `tasks.json` with `pending.md`: renamed `completed` → `done`, added 6 missing tickets (we-4, nlm-2 revised, nlm-3/4/6/7, inf-2/3), fixed status/HTML mismatch
- Updated `tasks.html`: added `blocked` status (red dot), fixed summary counter, centered layout
- Updated shutdown skill Step 4 to use correct status values and reference ticket-tracker
- `memory/pending.md` marked as superseded — `tasks.json` is now source of truth
- Added `project_ticket_tracker.md` memory file; updated `MEMORY.md` session startup note

### doc-writer Skill
- Created `doc-writer` skill — writes styled HTML reference docs in the established dark theme
- Skill embeds full CSS; knows to update `documents/index.html` when saving to `agent-test/documents/`
- Description tuned to avoid competing with `doc-coauthoring` and `frontend-design`
- Refined via skill-creator (no formal evals — subjective output)

### Ticket Board Reference Doc
- Wrote `documents/ticket-board.html` — covers schema, statuses, ID prefixes, JSON structure, how Claude manages tickets, history
- Updated `documents/index.html`: replaced stale "Pending Items" card with "Ticket Board" card

### Structural Test Coverage
- Whiteboard Explainer: added `QuoteScene`, `StatScene`, `FlowChartScene`, `scenes.example_3.json` (25 tests, +4)
- Bar Chart Race: added `BarChartRaceSimultaneous.tsx`, `data/index.ts`, `us-cities`, `us-top-10-cities` (55 tests, +12)
- Simple Narrated Slides: no changes needed

### Promotion
- Committed session work to dev, ran promote.sh — all 115 tests passed, merged dev → main
- Large batch: first promotion in several sessions, brought in everything since last merge

### Servers
- Started all four servers: ports 3000 (BCR), 3001 (SNS), 3002 (WE), 3010 (task board via Python http.server)

---

## 2026-03-11 — Ephemeral Notebook Skill Architecture Overhaul

### Master Skill + Sub-skills
- Created `notebooklm-ephemeral-notebook` master skill — lean trigger, points to `workflow.md`, lists sub-skills by task flag
- Created `notebooklm-slide` skill — NLM-native slide deck (PDF)
- Created `notebooklm-infographic` skill — NLM-native infographic (PNG), orientation/detail/focus options documented
- Updated `notebooklm-slide-manifest` — corrected workflow: manifest uploaded as notebook source, Gemini reads sources and builds slides (not an external Imagen pipeline)
- Updated `notebooklm-video`, `notebooklm-webapp` — added "Read First" headers

### Workflow Documentation (JIT Pattern)
- Created `documents/workflow.md` — full JIT sequencer, Steps 0–7, explicit "READ NOW" gates, ✓ checkboxes, ⚠️ stop gates at TODO stubs
- Created `documents/source-authoring.md` — 1–3 sources model, what each source drives, upload order
- Created `documents/source-knowledge-base.md` — TODO stub (hard stop in workflow; needs Tom's input)
- Created `documents/source-web-app.md` — TODO stub (hard stop in workflow; needs Tom's input)
- Renamed `design/` → `documents/` under `ephemeral-notebook/`; updated 3 references

### Reference Documents
- Created `documents/notebooklm-cli.html` — full `nlm` command reference; all groups, artifact types, typical run sequence, gotchas
- Updated `documents/notebooklm-workflow.html` — trigger phrase callout, sub-skills table
- Updated `documents/index.html` — added CLI reference card

### Skill Creator + Memory
- Added JIT reference to `skill-creator/SKILL.md` — points to `JIT-experiment.md`
- Added feedback memory: invoke skill-creator when creating/modifying skills (Tom triggers explicitly)

### Design Discussion
- Reasoned through memory injection model: MEMORY.md injected once at session start; everything else loaded on demand
- Established that workflow security comes from JIT gating; ad hoc tasks rely on memory + Tom invoking skill-creator
- Division of responsibility: Tom invokes skill-creator; Claude executes it

---

## 2026-03-11 — Whiteboard Explainer: Narration, Parallel Lanes, Skill Adjunct; Shutdown Skill Tightening

### Shutdown Skill
- Added draft-and-confirm step before writing handoff.md — Claude now shows Tom the "Next Session Priority" and "Session Start" draft, waits for confirmation
- Added `## Session Start` section to handoff template; deleted `workflow/active.txt` — replaced by the new field
- Updated `MEMORY.md` startup logic to auto-execute workflow if `## Session Start` says `Auto-start: [workflow]`

### Whiteboard Explainer — ElevenLabs Narration
- Added `narration?: string` to `BaseScene` in `types.ts`
- `WhiteboardVideo.tsx` now renders per-scene `<Audio>` when narration is set
- Wrote `scripts/generate-braess-audio.mjs`: calls ElevenLabs (George voice), saves MP3s to `public/audio/braess/`, measures duration from MP3 frame headers, auto-updates `durationInFrames` in JSON
- All 11 Braess's Paradox scenes have narration; durationInFrames auto-set from audio

### Whiteboard Explainer — FlowChart Extensions
- `types.ts`: `height` on FlowNode; `fromSide`/`toSide`/`vertical`/`color` on FlowEdge; `fontSize` on FlowLabel
- `FlowChartScene.tsx`: `heightMap`; dynamic per-color SVG arrowhead markers in `<defs>`; vertical edge branch; `fromSide`/`toSide` y-offset math; `progress > 0` arrowhead gate; edge keys switched to array index

### Whiteboard Explainer — Slide Redesigns
- Slide 3 (t3-flow-roads): diamond → parallel lanes (tall A/B, two dividers, horizontal edges with fromSide/toSide)
- Slide 5 (t3-step-002): stepReveal → flowChart; same lanes layout + vertical "1 min" connector + blue hybrid route overlay (3 edges, #60a5fa, starting frame 233)
- Slides 5 and 10 bullet text updated to match narration

### Skill Adjunct System
- Created `documents/skill-adjunct.md` — explains log system purpose and format
- Created `documents/SKILL-LOG.md` — first entry covering all new capabilities, JSON patterns, bugs/fixes, design decisions
- Updated `SKILL.md` with reference to the log

---

## 2026-03-10 (Session 2) — Whiteboard Explainer: New Scene Types, Braess's Paradox, Timing

### Built Three New Scene Types
- `QuoteScene`, `StatScene`, `FlowChartScene` — added to `src/scenes/`, `src/types.ts`, `SceneDispatcher.tsx`, and registered in `Root.tsx`
- `FlowChartScene` supports explicit node positioning (x/y), per-node and per-edge `startFrame` overrides, and `FlowLabel` overlays for multi-row layouts

### Braess's Paradox Video (scenes.example_3.json)
- 11-scene darkChalk video built from a content manifest produced by another AI using `content-contract.md`
- Scene 3: A→upper/lower diamond→B showing two parallel roads
- Scene 6: two-row flowchart comparing what drivers want (51 min) vs. what they get (85 min)
- Row labels shifted up 40px to give breathing room between heading and diagram

### Timing System Overhaul
- Doubled scene durations across the board
- StepReveal and Compare: dynamic stagger based on `durationInFrames` — text fills ~65% of scene
- Added `MAX_STAGGER` cap (45 for StepReveal, 40 for Compare) so adding duration actually adds hold time at end rather than stretching animations
- Key lesson: percentage-based stagger without a cap means adding frames just slows the reveal; the cap decouples animation speed from hold time

### Pending
- Slide 3 minor issue (parked)
- ElevenLabs narration is the next major feature
- Changes on dev, not yet committed or promoted

---

## 2026-03-10 — NotebookLM Workflow Documentation, Skills, Drinker Paradox Run

### NotebookLM Reference Document
- Created `documents/notebooklm-workflow.html` — full dark-themed reference doc covering what the workflow is, inputs/outputs, four phases, folder structure, input formats, design patterns, timing, the nlm tool, and known limitations
- Added "Claude as Source" as a third design pattern (alongside Single Notebook and Isomorphic Series)
- Clarified the meaning of "Ephemeral" — describes a temporary build-phase posture, not permanent intent; recorded in MEMORY.md and the HTML doc

### Skills Created
- `gemini-slide-style` — visual style manifest generation for Imagen 4.0 slide presentations; token block format, six example styles, technical constraints, output format rules
- `notebooklm-video` — authoring prompts for NotebookLM Video Overviews; built-in style options, custom style prompt format, focus/content prompt structure, two-prompt separation principle
- `notebooklm-webapp` — standalone HTML web app companion for NotebookLM notebooks; dark theme CSS tokens, two-tab pattern (Explorer + Quiz), AI infrastructure, per-topic customisation; chip-targeting quiz enhancement noted as nlm-2
- `notebooklm-slide-manifest` — Gemini slide manifest generation; manifest format spec, narrative arc guidance, distinction from `nlm slides create` PDF output

### Drinker Paradox Run (Claude as Source)
- Notebook: cce55efb | URL: https://notebooklm.google.com/notebook/cce55efb-9728-41ec-8ea5-3686f47f9f23
- Knowledge base written by Claude and uploaded as source (791c9db3)
- Video generated (Retro Print, c28a4ae6) — accessible in UI, CLI download failed (known issue)
- Slide deck PDF generated and downloaded (950f4573 → artifacts/drinker-paradox-slides.pdf)
- Gemini slide manifest written by Claude — slideshows/drinker-paradox.md (10 slides, vintage British pub style)
- Web app written — apps/drinker-paradox.html (Explorer 7 angles + Quiz with localStorage chip-targeting)
- Discovery: nlm slides create produces a PDF, not the Gemini manifest — manifest must be written by Claude directly; captured in notebooklm-slide-manifest skill

### Design Notes and Future Items
- `ephemeral-notebook/documents/agent-parallelization.md` — four use cases for spawning subagents: parallel artifact generation, isomorphic series parallelization, knowledge base enrichment, background wrap-up
- Parking lot browser integration noted in pending.md — investigate tab export extensions to sync open tabs to the parking lot page
- Quiz chip-targeting localStorage enhancement noted as nlm-2 in pending.md

---

## 2026-03-09 — Simultaneous Engine, City Datasets, Data AI Collaboration

### HTML Document Upgrades
- Upgraded `claude-code-tips.html`, `publishing-skill-community-github.html`, `vercel-react-best-practices.html` to dark theme matching `skills-installer-guide.html`
- Created `bar-chart-race.html` reference doc → moved to `Projects/Remotion/bar-chart-race/documents/`

### data/index.ts Refactor
- Moved all project imports from `src/index.tsx` into new `data/index.ts` barrel
- `src/index.tsx` now permanent — only imports `configs` from `../data`
- Added `mode: 'sequential' | 'simultaneous'` to `BarChartConfig` type

### City Datasets
- Built `data/us-cities/` from memory (19 cities, 1900–2020, decennial, simultaneous)
- Built `data/us-top-10-cities/` from `intake/us-top-10-cities-1960-present.json` via Node script (18 cities, 660 entries, annual 1960–2025, raw integers, simultaneous)
- Added `valueDecimals` to config type; added `loop` to Audio in both engines

### Simultaneous Engine
- Created `src/engine/BarChartRaceSimultaneous.tsx` — new engine for simultaneous mode
- Added `buildSimKeyframes`, `computeSimTotalFrames`, `buildSimCardSchedule` to `compute.ts`
- `src/index.tsx` routes by `data.mode`, uses correct frame-count function per mode
- Fixed non-monotonic interpolation range bug in card fade logic
- `isNew` highlight now fires on top-N entrants, not single newModel

### Bar Chart Race Design Guide
- Created `Projects/Remotion/bar-chart-race/documents/bar-chart-race-design-guide.html`
- Reviews all 4 compositions; UsCities flagged as too fast (13 periods); algorithm rules drafted

### Data AI Prompt Collaboration
- Three rounds of notes exchanged (saved in `documents/prompts/`)
- Updated `bar-chart-race-data-prep.md`: new context inputs (targetVideoLengthSeconds, renderMode, priority), new output fields (unit, dataQuality), selective `estimated` rule, soft entry limits, scaling responsibility clarified

---
