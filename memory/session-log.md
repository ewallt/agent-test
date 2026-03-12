# Session Log

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
- `ephemeral-notebook/design/agent-parallelization.md` — four use cases for spawning subagents: parallel artifact generation, isomorphic series parallelization, knowledge base enrichment, background wrap-up
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
