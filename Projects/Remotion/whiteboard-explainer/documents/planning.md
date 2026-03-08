# Whiteboard Explainer — Planning & Working Notes

Last updated: 2026-03-07

---

## Current State

### What's Working

- Remotion Studio running at `localhost:3000`
- Two compositions registered and rendering:
  - `WhiteboardExplainer-1` — Warm Paper / Blue Accent, 9 scenes, "How the Internet Works" + "How Stars Are Born"
  - `WhiteboardExplainer-2` — Dark Chalk / Amber Accent, 10 scenes, "The History of Writing"
- Theme system in place: `themes.ts` registry + `ThemeContext` React context; all scene components use `useTheme()`
- Doodle colors are now theme-aware (default to `THEME.ink`; overridable per-doodle in JSON)
- Label overlay on every scene shows: scene type / theme name / transition
- TypeScript compiles clean

### What Exists

**Scene types (5):** title, stepReveal, diagramBuild, compare, outro

**Themes (2):** warmPaper, darkChalk

**Doodles (5):** arrow, circle, star, check, bracket

**Transitions (5):** fade, slide, wipe, flip, clockWipe

---

## Situation: The 5-Scene-Type Ceiling

When asked to expand from 5 to 10 scenes, the 5 existing types were just repeated with different content. When WhiteboardExplainer-2 was created, the same 5 types were used again with a new theme. This means we currently have 4 instances of the same 5 scene types (2 rounds in -1, 2 in -2), differentiated only by theme and content.

This is a reasonable baseline — the theme system is now solid, the catalog infrastructure is in place — but extending the scene type repertoire is the natural next step.

---

## Planned: 6 New Scene Types

To be built in a single pass (all types added at once), then demoed in `WhiteboardExplainer-3`.

### 1. `quote`

A large pull-quote centered on screen.

```json
{
  "type": "quote",
  "quote": "The medium is the message.",
  "attribution": "Marshall McLuhan, 1964",
  "doodles": []
}
```

Visual: quote in large serif font with opening/closing marks that animate in; attribution fades in below. Simple and high-impact.

---

### 2. `stat`

A single large number or short fact — designed for emphasis moments.

```json
{
  "type": "stat",
  "value": "98%",
  "label": "drop in book prices within 50 years of Gutenberg's press",
  "context": "1440 → 1490"
}
```

Visual: number springs in at large scale, label fades below, optional context line smallest. The number is the hero.

---

### 3. `splitContent`

Text column on the left, doodle canvas on the right. A hybrid of stepReveal + diagramBuild.

```json
{
  "type": "splitContent",
  "title": "The Request-Response Cycle",
  "body": ["Client sends request", "Server processes", "Response delivered"],
  "doodles": [...]
}
```

Visual: left ~45% is bullet text staggered in; right ~55% is a free doodle canvas. Good for annotated diagrams.

---

### 4. `timeline`

A horizontal sequence of dated events that builds left-to-right.

```json
{
  "type": "timeline",
  "title": "The Road to the Internet",
  "events": [
    { "year": "1969", "label": "ARPANET" },
    { "year": "1983", "label": "TCP/IP adopted" },
    { "year": "1991", "label": "World Wide Web" },
    { "year": "2007", "label": "iPhone" }
  ]
}
```

Visual: horizontal axis draws across the screen; event markers pop in left-to-right with year + label. Each marker appears at a staggered frame offset.

---

### 5. `imageReveal`

A bordered frame that reveals an image asset with a wipe or fade.

```json
{
  "type": "imageReveal",
  "title": "The Gutenberg Bible, 1455",
  "src": "/public/images/gutenberg.jpg",
  "caption": "First mass-produced book in Europe"
}
```

Visual: frame border draws on first (doodle-style), then image fades in inside it, caption appears below. If no image is available, shows a labeled placeholder box — useful for layout testing without assets.

---

### 6. `flowChart`

Nodes connected by arrows, building sequentially. Layout is data-driven.

```json
{
  "type": "flowChart",
  "title": "How a DNS Lookup Works",
  "nodes": [
    { "id": "browser", "label": "Browser", "x": 200, "y": 400 },
    { "id": "dns",     "label": "DNS Server", "x": 700, "y": 400 },
    { "id": "ip",      "label": "IP Address", "x": 1200, "y": 400 },
    { "id": "server",  "label": "Web Server", "x": 1600, "y": 400 }
  ],
  "edges": [
    { "from": "browser", "to": "dns",    "label": "query" },
    { "from": "dns",     "to": "ip",     "label": "resolves" },
    { "from": "ip",      "to": "server", "label": "connects" }
  ]
}
```

Visual: nodes appear one at a time (spring in), then connecting arrows draw between them. Edge labels fade in on the arrow. No auto-layout — positions are explicit in JSON, so the author controls the shape of the diagram.

---

## Build Approach

1. Add all 6 types to `types.ts` (type definitions only — zero runtime risk)
2. Build all 6 scene components, simplest first: quote → stat → splitContent → timeline → imageReveal → flowChart
3. Register all 6 in `SceneDispatcher` + `TYPE_LABELS`
4. Run `tsc --noEmit` — catch all type errors before touching the server
5. Create `scenes.example_3.json` — 10 scenes mixing new types, possibly a third theme
6. Add `WhiteboardExplainer-3` to `Root.tsx`

---

## Theme Roadmap

Two themes exist. Candidates for future themes:

- **Green Ledger** — dark green bg (#1a2e1a), cream text, gold accent — accounting/finance aesthetic
- **Blueprint** — deep blue bg (#0a1628), white text, cyan accent — technical/engineering aesthetic
- **Newsprint** — off-white bg, very dark ink, red accent — newspaper/editorial aesthetic
- **Sunset** — warm gradient bg, deep purple ink, coral accent — warm/emotional topics

Adding a theme is low-effort: one object in `themes.ts`, one JSON file with `"theme": "newKey"`.

---

## V2 Technical Roadmap

These are code-quality improvements, not new features:

| Item | Description | Effort |
|------|-------------|--------|
| `@remotion/paths` + `evolvePath` | Replace constant-dash doodle hack with exact path-length drawing | Medium |
| Rough.js | Sketchy/hand-drawn SVG texture; `seed: 1` (constant) to prevent frame flicker | Medium |
| Google Fonts | Handwritten/sketch-style heading font | Low |
| Map scene type | D3-Geo + `interpolate()` on `projection.scale()` / `projection.translate()` for RealLifeLore-style zoom | High |
| Hand cursor | `getPointAtLength()` to animate a cursor tracing doodle paths | Medium |
| Lottie assets | Import Lottie animations as scene elements | Medium |

---

## Naming Convention

- Composition IDs: `WhiteboardExplainer-N` (hyphens only — underscores rejected by Remotion)
- JSON files: `scenes.example_N.json` (underscores OK in filenames)
- Theme keys: camelCase (`warmPaper`, `darkChalk`)
- Scene IDs in JSON: `t{N}-{type}-{seq}` pattern (e.g. `t2-step-001`) — helps identify which composition a scene belongs to when debugging

---

## File Map

```
whiteboard-explainer/
  src/
    index.ts                  ← registerRoot entry point
    Root.tsx                  ← Composition registrations
    WhiteboardVideo.tsx       ← main component; wraps in ThemeProvider
    ThemeContext.tsx           ← useTheme() hook + ThemeProvider
    themes.ts                 ← Theme type + THEMES registry
    theme.ts                  ← LEGACY (dead code; can be deleted)
    types.ts                  ← all TypeScript types
    components/
      DoodleReveal.tsx         ← animates doodle assets via stroke-dashoffset
      CalloutText.tsx          ← fade+slide text helper
    assets/doodles/            ← SVG doodle components
    scenes/
      SceneDispatcher.tsx      ← routes scene.type → component + label overlay
      TitleScene.tsx
      StepRevealScene.tsx
      DiagramBuildScene.tsx
      CompareScene.tsx
      OutroScene.tsx
  documents/
    design.md                 ← architecture + data model reference
    planning.md               ← this file
  scenes.example_1.json       ← WhiteboardExplainer-1 content
  scenes.example_2.json       ← WhiteboardExplainer-2 content
  memory/
    whiteboard-explainer.md   ← session memory (auto-loaded)
    whiteboard-explainer-gotchas.md
```
