# Whiteboard Explainer — Handoff

Last updated: 2026-03-07

---

## Last Session Summary (2026-03-07)

- Recovered from crash: fixed TypeScript error in `WhiteboardVideo.tsx`, confirmed `-1` rename was complete
- Built theme system: `themes.ts` registry, `ThemeContext`, updated all 5 scene components to use `useTheme()`
- Created `WhiteboardExplainer-2` (Dark Chalk / Amber Accent, 10 scenes, "History of Writing")
- Clarified the 5-scene-type ceiling — all existing compositions reuse the same 5 types
- Specced 6 new scene types: quote, stat, splitContent, timeline, imageReveal, flowChart
- Created `documents/` folder with `design.md`, `planning.md`, `context.md`, `handoff.md`
- Added `whiteboard-explainer` and `bar-chart-race` cases to startup dispatch
- Added IMPORTANT pending: project structure cleanup
- Updated session log, pending, and whiteboard-explainer memory

## Goal for Next Session

Build the 6 new scene types and create `WhiteboardExplainer-3` to demo them. This is the brainstorm/exploration stage — Tom will evaluate compositions visually in Studio. Once we have enough variations to react to, we'll do research, synthesize, and eventually rewrite the skill.

---

## Pick Up Here

Build 6 new scene types in one pass, then demo in WhiteboardExplainer-3.

### Build Order
1. `quote` — large pull-quote + attribution
2. `stat` — single big number/fact, springs in
3. `splitContent` — text left, doodle canvas right
4. `timeline` — horizontal dated events, builds left-to-right
5. `imageReveal` — bordered frame reveals image (placeholder fallback)
6. `flowChart` — nodes + arrows, positions set in JSON

### For each new type, touch these files:
- `src/types.ts` — add to `Scene` union
- `src/scenes/NewScene.tsx` — new component (use `useTheme()`, pass `color={d.color ?? THEME.ink}` to DoodleReveal)
- `src/scenes/SceneDispatcher.tsx` — add import, `case`, and `TYPE_LABELS` entry

### After all 6 are built:
- Run `tsc --noEmit` to verify clean
- Create `scenes.example_3.json` with a third theme (candidates in `planning.md`)
- Add `WhiteboardExplainer-3` to `src/Root.tsx`

Full specs (JSON shapes + visual descriptions) for all 6 types are in `planning.md`.

---

## Context
- We are in the brainstorm/exploration stage — building visual variations for Tom to evaluate
- Each composition (~10 scenes) demonstrates a distinct look and feel
- The catalog goal: compare compositions side by side in Studio, find what's most appealing
- The whiteboard-explainer skill is intentionally stale — will be rewritten once direction is clear

---

## Current Compositions
| ID | Theme | Status |
|----|-------|--------|
| `WhiteboardExplainer-1` | warmPaper | Done |
| `WhiteboardExplainer-2` | darkChalk | Done |
| `WhiteboardExplainer-3` | TBD | Next |
