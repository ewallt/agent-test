# Whiteboard Explainer — Session Context

Last updated: 2026-03-07

---

## What This Project Is

A Remotion + TypeScript system for rendering whiteboard-style explainer videos from a JSON scene manifest. All content lives in JSON; the code stays stable. The system is being built into a **catalog** — a collection of numbered compositions that each demonstrate a distinct visual approach, so we can compare them and identify what looks best.

---

## The Catalog Goal

Each numbered composition (`WhiteboardExplainer-1`, `-2`, `-3`, ...) is a standalone ~10-scene demo. The compositions are meant to be compared side by side in Remotion Studio. Every scene has a label overlay (top-right) showing: scene type / theme name / transition — so the catalog is self-documenting.

The question the catalog is answering: **what visual approach is most appealing for this kind of content?**

Variables being explored:
- Color theme (light vs. dark, accent colors, mood)
- Scene type repertoire (what kinds of slides exist)
- Animation style (pacing, spring feel, reveal patterns)
- Transition choices (fade, slide, wipe, flip, clockWipe)
- Doodle usage (density, color, placement)

We are in early brainstorming/exploration stage. Tom evaluates compositions visually and gives feedback. Research (done outside Claude) will inform what approaches seem most promising. Once there's a clear direction, the skill gets written/updated to encode that knowledge.

---

## Current State

### Compositions

| ID | Theme | Scenes | Topic | Status |
|----|-------|--------|-------|--------|
| `WhiteboardExplainer-1` | Warm Paper / Blue Accent | 9 | Internet + Stars | Done |
| `WhiteboardExplainer-2` | Dark Chalk / Amber Accent | 10 | History of Writing | Done |
| `WhiteboardExplainer-3` | TBD | ~10 | TBD | Planned — needs 6 new scene types first |

### Scene Types (5 existing)

| Type | What it does |
|------|-------------|
| `title` | Centered heading + subtitle + animated decorative rule |
| `stepReveal` | Staggered bullet list |
| `diagramBuild` | Blank canvas; doodles placed absolutely at x/y |
| `compare` | Two-column side-by-side with divider |
| `outro` | Dark/inverted closing scene with glow ring |

All existing compositions use the same 5 types. This is the ceiling we're about to raise.

### Scene Types (6 planned — not yet built)

| Type | What it does |
|------|-------------|
| `quote` | Large pull-quote + attribution |
| `stat` | Single big number or fact; springs in with emphasis |
| `splitContent` | Text column left, doodle canvas right |
| `timeline` | Horizontal sequence of dated events, builds left-to-right |
| `imageReveal` | Bordered frame reveals an image; falls back to labeled placeholder |
| `flowChart` | Nodes + connecting arrows, builds sequentially; positions set in JSON |

These will be built in one pass and demoed in `WhiteboardExplainer-3`.

### Themes (2 existing)

| Key | Name | Character |
|-----|------|-----------|
| `warmPaper` | Warm Paper / Blue Accent | Light parchment bg, blue accent, amber highlight — clean, editorial |
| `darkChalk` | Dark Chalk / Amber Accent | Dark navy bg, chalk-white text, amber/red/green — dramatic, high-contrast |

### Theme Candidates (not yet built)

| Key | Name | Character |
|-----|------|-----------|
| `greenLedger` | Green Ledger / Gold Accent | Dark green bg, cream text, gold — accounting/finance feel |
| `blueprint` | Blueprint / Cyan Accent | Deep blue bg, white text, cyan — technical/engineering |
| `newsprint` | Newsprint / Red Accent | Off-white bg, near-black ink, red — newspaper/editorial |
| `sunset` | Sunset / Coral Accent | Warm gradient bg, deep purple ink, coral — emotional/warm topics |

---

## How the Theme System Works

- `src/themes.ts` — `Theme` type + `THEMES` registry (named themes)
- `src/ThemeContext.tsx` — `ThemeProvider` + `useTheme()` hook
- All scene components call `const { theme: THEME } = useTheme()` — no static imports
- JSON top level: `"theme": "darkChalk"` — optional, defaults to `warmPaper`
- Doodle colors default to `THEME.ink`; overridable per-doodle: `"color": "#f39c12"`
- Adding a theme: one object in `themes.ts`, reference by key in JSON — no other code changes

---

## How to Add a New Composition

1. Create `scenes.example_N.json` with `"theme"` and `"scenes"` array
2. Import it in `src/Root.tsx`
3. Add a `<Composition id="WhiteboardExplainer-N" ... />` block
4. Server hot-reloads; composition appears at `localhost:3000/WhiteboardExplainer-N`

---

## How to Add a New Scene Type

1. Add the type to the `Scene` union in `src/types.ts`
2. Create `src/scenes/MyScene.tsx` — use `const { theme: THEME } = useTheme()`; pass `color={d.color ?? THEME.ink}` to `DoodleReveal`
3. Add import + `case` in `SceneDispatcher.tsx`
4. Add entry in `TYPE_LABELS` in `SceneDispatcher.tsx`
5. TypeScript exhaustiveness check will error if step 3 is missed

---

## Key Files

```
whiteboard-explainer/
  src/
    Root.tsx                  ← Composition registrations
    WhiteboardVideo.tsx       ← ThemeProvider wrapper + TransitionSeries
    ThemeContext.tsx           ← useTheme() hook
    themes.ts                 ← Theme type + THEMES registry
    types.ts                  ← all TypeScript types incl. Scene union
    scenes/
      SceneDispatcher.tsx      ← routes type → component + label overlay
      [scene components]
    components/
      DoodleReveal.tsx
      CalloutText.tsx
    assets/doodles/            ← arrow, circle, star, check, bracket
  documents/
    context.md                ← this file
    design.md                 ← full architecture reference
    planning.md               ← new scene type specs, theme roadmap, file map
  scenes.example_1.json
  scenes.example_2.json
  memory/whiteboard-explainer-gotchas.md
```

---

## Critical Gotchas

1. `TransitionSeries` rejects Fragment wrappers and null children — use flat array + `(React.createElement as any)(TransitionSeries, {}, ...children)`
2. Composition `id` cannot contain underscores — hyphens only (`WhiteboardExplainer-3` not `_3`)
3. `clockWipe()` requires explicit `{ width: 1920, height: 1080 }`
4. Dev server is started manually (`npm start` in `whiteboard-explainer/`) — Claude spawns it in background

---

## Where We Are in the Process

1. ✅ Core system built and working
2. ✅ Theme system in place (2 themes, easily extensible)
3. ✅ Catalog infrastructure in place (label overlay, numbered compositions)
4. ⬜ 6 new scene types — ready to build, waiting until skill is written
5. ⬜ Skill updated/rewritten — current skill is stale (predates theme system)
6. ⬜ Brainstorm → research → synthesize → build cycle for visual approach

---

## Process: How We're Working

- **Brainstorm stage (now):** Build variations, Tom evaluates visually in Studio
- **Research stage:** Tom does external research; Claude helps prep research questions/prompts
- **Synthesis:** Research feedback informs what approaches work best
- **Build:** Skill gets written once direction is clear; encodes what we've learned

The skill is intentionally not being updated yet — it will be written fresh once the 6 new types are built and the visual direction is more settled.
