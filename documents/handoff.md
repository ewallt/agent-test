# Session Handoff — 2026-03-09

## What Was Done This Session

### HTML Document Upgrades
- Upgraded three existing documents to dark theme matching `skills-installer-guide.html`:
  - `documents/claude-code-tips.html` — bare HTML fragment → full dark-themed reference doc
  - `documents/publishing-skill-community-github.html` — light theme → dark theme
  - `documents/vercel-react-best-practices.html` — light theme → dark theme

### Bar Chart Race Reference Doc
- Created `documents/bar-chart-race.html` — explains the refactored architecture, BarChartConfig reference table, and step-by-step guide for adding a new dataset
- Moved to `Projects/Remotion/bar-chart-race/documents/bar-chart-race.html` (correct home)

### data/index.ts Refactor
- Moved project imports out of `src/index.tsx` into a new `data/index.ts` barrel file
- `src/index.tsx` now only imports `configs` from `../data` — never changes when adding new projects
- Added `mode` field to `BarChartConfig` type: `'sequential' | 'simultaneous'`

### UsCities Dataset
- Built `data/us-cities/` from memory — 19 cities, 1900–2020, decennial census
- Set `mode: 'simultaneous'`
- Note: goes too fast (only 13 time periods) — identified as known issue

### UsTop10Cities Dataset
- Processed `intake/us-top-10-cities-1960-present.json` via Node script
- 660 entries, 18 cities, annual 1960–2025, raw population values
- Added `valueDecimals: 0` for comma-formatted integers (3,653,000 style)
- Added `loop` to Audio component in both engines
- Set `mode: 'simultaneous'`

### Simultaneous Engine
- Created `src/engine/BarChartRaceSimultaneous.tsx` — copy of sequential engine, renamed export
- Added to `src/engine/compute.ts`: `buildSimKeyframes`, `computeSimTotalFrames`, `buildSimCardSchedule`
- `src/index.tsx` routes to correct component based on `data.mode`, uses correct total-frames function
- Fixed bug: card fade interpolation range was non-monotonic for short-duration cards
- `isNew` highlight changed to fire on cities entering the top N (not single newModel)

### Bar Chart Race Design Guide
- Created `Projects/Remotion/bar-chart-race/documents/bar-chart-race-design-guide.html`
- Reviews all four compositions, documents what makes a good bar chart race, early algorithm rules
- Living document — to be updated as more compositions are built

### Data AI Prompt Collaboration
- Exchanged three rounds of notes with the data AI (saved in `documents/prompts/`)
- Updated `documents/prompts/bar-chart-race-data-prep.md` with agreed changes:
  - New context inputs: `targetVideoLengthSeconds`, `renderMode`, `priority`, `preferredCadence`, `preferNewEntrants`
  - New required output fields: `unit`, `dataQuality`
  - `estimated` is now selective (row-level only); whole-dataset uncertainty goes in `dataQuality`
  - Entry count is a soft mode-aware limit with flagging, not hard truncation
  - Scaling explicitly Claude's responsibility; data AI always provides raw values

---

## State Right Now

- On `dev` branch; changes from this session uncommitted
- All four compositions working in Remotion Studio (localhost:3000)
- UsCities simultaneous engine works but goes too fast — needs more time periods or higher frame counts
- UsTop10Cities simultaneous engine rated excellent with minor issues (not yet documented)

## Next Session Priority

No specific priority set. Top candidates: document UsTop10Cities minor issues and refine design guide, 6 new whiteboard scene types (we-1), Tallest Buildings wiring (bcr-1).

## Other Items

- UsTop10Cities minor issues — still to be documented after review; will sharpen the design guide algorithm
- UsCities pacing fix — either source annual data or increase frame counts significantly
- Braess's Paradox video (`215894d5`) — still pending check and notebook share (carried from last session)
- `tasks/braess-paradox.md` — still to be moved to `completed/` once video confirmed
- gh-pages deploy script — discussed two sessions ago, not yet built
