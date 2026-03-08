# Whiteboard Explainer — Design Document

Last updated: 2026-03-07

---

## What This Project Is

A Remotion + TypeScript system for rendering whiteboard-style explainer videos from a JSON scene manifest. Content lives entirely in JSON; code stays stable. The goal is a catalog of visual approaches — each numbered composition demonstrates a different theme, animation style, or scene type repertoire.

---

## Architecture

### Entry Points

```
src/index.ts          → registerRoot(RemotionRoot)
src/Root.tsx          → registers all Compositions
src/WhiteboardVideo.tsx → main component; reads scenes[] + theme from props
src/ThemeContext.tsx  → React context; provides active Theme to all children
```

### Component Tree

```
RemotionRoot
└── <Composition id="WhiteboardExplainer-N" defaultProps={scenes.example_N.json}>
    └── WhiteboardVideo ({ scenes, theme })
        └── ThemeProvider (themeName → looks up THEMES registry)
            └── TransitionSeries
                ├── TransitionSeries.Transition (one per scene boundary, if transition defined)
                └── TransitionSeries.Sequence (one per scene)
                    └── SceneDispatcher ({ scene })
                        ├── [scene component] (TitleScene, StepRevealScene, etc.)
                        └── [label overlay] (scene type, theme name, transition — top-right corner)
```

### Data Flow

```
scenes.example_N.json
  → defaultProps on <Composition>
  → WhiteboardVideo receives { scenes[], theme }
  → ThemeProvider resolves theme string → Theme object from THEMES registry
  → each scene component calls useTheme() → gets active Theme
  → DoodleReveal receives color = doodle.color ?? THEME.ink
```

---

## Theme System

### Files

- `src/themes.ts` — `Theme` type + `THEMES` registry (named themes)
- `src/ThemeContext.tsx` — `ThemeProvider` + `useTheme()` hook

### Theme Object Shape

```ts
type Theme = {
  name: string;       // displayed in label overlay
  bg: string;         // scene background
  ink: string;        // primary text and default doodle color
  accent: string;     // headings, bullets, decorative rule
  highlight: string;  // secondary accent (right-column headings in Compare)
  positive: string;   // green/positive color (available for use)
  outroBg: string;    // outro scene background (usually darker than bg)
  fontFamily: string;
  headingFamily: string;
  lineHeight: number;
};
```

### Current Themes

| Key | Name | Character |
|-----|------|-----------|
| `warmPaper` | Warm Paper / Blue Accent | Light parchment bg, blue accent, amber highlight |
| `darkChalk` | Dark Chalk / Amber Accent | Dark navy bg, chalk-white text, amber/red/green doodles |

### Adding a New Theme

Add an entry to `THEMES` in `src/themes.ts`. Reference it by key in the JSON: `"theme": "myTheme"`.

### How Components Use the Theme

Every scene component calls:
```tsx
const { theme: THEME } = useTheme();
```
This replaces the old static import. The variable name `THEME` is preserved to minimise diffs.

---

## Scene Types

### Registered Types (SceneDispatcher)

| Type | Component | Description |
|------|-----------|-------------|
| `title` | TitleScene | Centered heading + subtitle + animated decorative rule |
| `stepReveal` | StepRevealScene | Staggered bullet list with CalloutText animation |
| `diagramBuild` | DiagramBuildScene | Blank canvas; doodles placed absolutely at x/y |
| `compare` | CompareScene | Two-column side-by-side with divider |
| `outro` | OutroScene | Dark/inverted closing scene with glow ring |

### Planned Types (not yet built)

| Type | Description |
|------|-------------|
| `quote` | Large pull-quote centered on screen with attribution |
| `stat` | Single big number or fact; animates in with emphasis |
| `splitContent` | Text column left, doodle canvas right |
| `timeline` | Horizontal sequence of dated events; builds left-to-right |
| `imageReveal` | Frame/placeholder that reveals an image asset |
| `flowChart` | Nodes connected by arrows; builds sequentially |

---

## JSON Data Model

### Top-Level Shape

```json
{
  "theme": "darkChalk",
  "scenes": [ ...scene objects... ]
}
```

`theme` is optional; defaults to `"warmPaper"`.

### Base Scene Fields (all types)

```json
{
  "id": "unique-string",
  "type": "title | stepReveal | ...",
  "durationInFrames": 90,
  "transition": { "type": "fade", "durationInFrames": 20, "direction": "from-right" }
}
```

`transition` is optional; defines the transition *into* this scene from the previous one.

### DoodleSpec

```json
{
  "asset": "arrow | circle | star | check | bracket",
  "x": 200, "y": 400,
  "scale": 1.5,
  "color": "#f39c12",
  "revealStart": 30, "revealEnd": 60
}
```

`color` defaults to the active theme's `ink` color if omitted.

### Scene-Specific Fields

**title:** `title`, `subtitle?`, `doodles?`
**stepReveal:** `title?`, `body: string[]`, `doodles?`
**diagramBuild:** `title?`, `doodles: DoodleSpec[]` (required)
**compare:** `title?`, `left: { heading, items[] }`, `right: { heading, items[] }`, `doodles?`
**outro:** `title`, `body?: string[]`, `doodles?`

---

## Doodle System

### Registry (`src/components/DoodleReveal.tsx`)

Assets: `arrow`, `circle`, `star`, `check`, `bracket`

Each doodle is an SVG with a stroke-dashoffset draw-on animation. `progress` (0→1) drives the reveal.

### Known Limitation (V1)

Stroke dash values are constants (~500–600). Should use `getTotalLength()` for exact path lengths (V2 item: `@remotion/paths` + `evolvePath`).

### Adding a Doodle

1. Create a component in `src/assets/doodles/` accepting `{ progress, color? }`
2. Register it in `DOODLE_REGISTRY` in `DoodleReveal.tsx`

---

## Transition System

Powered by `@remotion/transitions`. Defined per-scene in JSON.

| Type | Options |
|------|---------|
| `fade` | — |
| `slide` | `direction`: from-left, from-right, from-top, from-bottom |
| `wipe` | `direction`: same |
| `flip` | `direction`: same |
| `clockWipe` | — (always uses 1920×1080) |

**Key constraint:** `TransitionSeries` does not accept Fragment wrappers or conditional null children. Children are built as a flat array and spread via `(React.createElement as any)(TransitionSeries, {}, ...children)`.

Total composition duration is computed by subtracting transition overlaps from scene durations.

---

## Catalog Approach

Each composition is a self-contained ~10-scene demo:

| ID | Theme | Status |
|----|-------|--------|
| `WhiteboardExplainer-1` | Warm Paper / Blue Accent | Done |
| `WhiteboardExplainer-2` | Dark Chalk / Amber Accent | Done |
| `WhiteboardExplainer-3` | TBD | Planned — will demo new scene types |

Each scene's label overlay (top-right) shows: scene type / theme name / transition. This makes comparisons across compositions immediate.

To add a new composition: add a JSON file, import it in `Root.tsx`, register a `<Composition>` with the next ID.

---

## Key Gotchas

See `memory/whiteboard-explainer-gotchas.md` for full details. Summary:

1. `registerRoot()` must be called — never just export the root
2. `TransitionSeries` rejects Fragment wrappers and null children — use flat array + createElement spread
3. `React.createElement` second arg must be `{}` not `null`
4. `clockWipe()` requires explicit `{ width, height }`
5. Composition `id` cannot contain underscores — use hyphens
6. `React.createElement` spread with `TransitionSeries` needs `as any` cast for TypeScript
