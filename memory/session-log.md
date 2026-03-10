# Session Log

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
