---
name: whiteboard-explainer
description: Build and iterate on the whiteboard-style explainer video system at agent-test/whiteboard-explainer/. Use when working on scenes, doodles, transitions, or adding new scene types. Enforces Remotion best practices and known gotchas for this project.
---

# Whiteboard Explainer Skill

Remotion + TypeScript system for rendering whiteboard-style explainer videos from a JSON scene manifest. Content lives in `scenes.json`; code stays stable.

> **Skill adjunct:** Before working on this project, read
> `Projects/Remotion/whiteboard-explainer/documents/SKILL-LOG.md` for recent
> capabilities, patterns, and gotchas not yet in this document.
> See `documents/skill-adjunct.md` for how the log system works.

## Project Location
`C:\Users\tomew\Documents\agent-test\whiteboard-explainer\`

## Architecture

```
src/index.ts                  — registerRoot() entry point
src/Root.tsx                  — Composition registration + duration calculation
src/WhiteboardVideo.tsx       — TransitionSeries scene sequencer
src/types.ts                  — Scene schema (all types)
src/theme.ts                  — Colours, fonts, spacing
src/scenes/
  SceneDispatcher.tsx         — Routes scene.type → component
  TitleScene.tsx
  StepRevealScene.tsx
  DiagramBuildScene.tsx
  CompareScene.tsx
  OutroScene.tsx
src/components/
  DoodleReveal.tsx            — stroke-dashoffset draw-on, positioned absolutely
  CalloutText.tsx             — fade+slide text helper
src/assets/doodles/           — arrow, circle, star, check, bracket
scenes.example.json           — committed example (5-scene demo)
scenes.json                   — production manifest (passed via --props)
```

## Scene Schema

```ts
type Scene = {
  id: string
  type: "title" | "stepReveal" | "diagramBuild" | "compare" | "outro" | "quote" | "stat" | "flowChart"
  durationInFrames: number
  transition?: {
    type: "fade" | "slide" | "wipe" | "flip" | "clockWipe"
    durationInFrames: number
    direction?: "from-left" | "from-right" | "from-top" | "from-bottom"
  }
  // title
  title?: string
  subtitle?: string
  // stepReveal, outro
  body?: string[]
  // compare
  left?: ColumnSpec
  right?: ColumnSpec
  // quote
  quote?: string
  attribution?: string
  // stat
  value?: string
  label?: string
  context?: string
  // flowChart
  nodes?: FlowNode[]
  edges?: FlowEdge[]
  layout?: "linear-horizontal" | "linear-vertical"
  labels?: FlowLabel[]    // positioned text overlays with fade-in
  doodles?: DoodleSpec[]
}

type FlowNode = { id: string; label: string; x?: number; y?: number; startFrame?: number }
type FlowEdge = { from: string; to: string; label?: string; startFrame?: number }
type FlowLabel = { x?: number; y: number; text: string; startFrame?: number; color?: string }

type DoodleSpec = {
  asset: string           // key in doodle registry
  x: number
  y: number
  scale?: number
  revealStart: number     // frame offset within scene
  revealEnd: number
}
```

## Doodle Registry
`arrow`, `circle`, `star`, `check`, `bracket`

To add a new doodle:
1. Create `src/assets/doodles/MyDoodle.tsx` — export a component accepting `{ progress: number, color?: string }`
2. Use `stroke-dasharray` / `stroke-dashoffset` driven by `progress` (V1: large constant e.g. 500)
3. Register in `src/components/DoodleReveal.tsx` in `DOODLE_REGISTRY`

## Animation Rules (non-negotiable)
- All animation via `useCurrentFrame()` + `interpolate()` or `spring()` — NO CSS transitions
- Scene sequencing via `<TransitionSeries>` — no manual frame offset math
- Timing stored in frames in JSON; 30fps baseline

## TransitionSeries — Critical Pattern

`TransitionSeries` rejects Fragment wrappers and conditional null children. Always build a flat array:

```tsx
const children: React.ReactNode[] = [];
scenes.forEach((scene, i) => {
  if (i > 0 && scene.transition) {
    children.push(<TransitionSeries.Transition key={`t-${scene.id}`} ... />);
  }
  children.push(<TransitionSeries.Sequence key={scene.id} ...>...</TransitionSeries.Sequence>);
});
return React.createElement(TransitionSeries, {}, ...children);
//                                           ^^ must be {} not null
```

## Known Gotchas

1. **`registerRoot()` must be called** in `src/index.ts` — not just exporting
2. **`TransitionSeries` + Fragment = crash** — build flat array, use `React.createElement(TransitionSeries, {}, ...children)`
3. **`null` as second arg to `React.createElement` crashes** — Remotion reads `props.stack`; always pass `{}`
4. **`clockWipe()` needs dimensions** — `clockWipe({ width: 1920, height: 1080 })`
5. **tsconfig.json** needs `"resolveJsonModule": true` and `"skipLibCheck": true`

## Duration Calculation
Total frames = sum of scene durations minus transition overlaps. `Root.tsx` handles this automatically via `calculateMetadata`.

## npm Scripts
```bash
npm start       # Remotion Studio at localhost:3000
npm run render  # Render scenes.example.json → out.mp4
```

## Spring Config Reference (from remotion-animation skill)
```ts
smooth:  { damping: 200, stiffness: 100, mass: 1 }   // elegant, no bounce
snappy:  { damping: 20,  stiffness: 200, mass: 0.5 }  // quick settle
bouncy:  { damping: 8,   stiffness: 100, mass: 1 }    // playful
gentle:  { damping: 30,  stiffness: 80,  mass: 1 }    // slow, soft
```

## Timing Reference
```
fade in/out:      10–20 frames
slide in/out:     15–25 frames
bullet stagger:   30–45 frames apart (capped — see below)
scene transition: 15–30 frames
hold (text):      90–150 frames (3–5 sec at 30fps) — viewers need time to process
scene duration:   stepReveal 300–440f, compare 360–450f, stat/quote 180–210f, flowChart 300–420f
```

## Pacing Principles (learned from iteration)

**Scenes are almost always too short on first pass.** Default durations feel rushed when reviewed. Budget generously:
- Simple stat/quote: ~180–210 frames (6–7 sec)
- Step reveal (3–4 bullets): ~330–390 frames (11–13 sec)
- Step reveal (5 bullets): ~420–440 frames (14–15 sec)
- Compare (4 items each side): ~420–450 frames (14–15 sec)
- FlowChart: ~300–420 frames depending on node count

**Dynamic stagger must be capped.** If stagger scales linearly with `durationInFrames`, adding hold time just slows the reveal instead — the hold stays at the same percentage. Pattern:
```tsx
const MAX_STAGGER = 45; // frames; tune per scene type
const computed = (durationInFrames * 0.65 - START_OFFSET) / (count - 1);
const STAGGER = Math.min(MAX_STAGGER, computed);
```
This way: short scenes → stagger compresses to fit; long scenes → stagger caps and extra time becomes real hold at the end.

**Text should finish at ~65–75% of scene duration**, leaving the remaining 25–35% as reading time. With the cap in place, longer scenes get proportionally more hold time.

**FlowChart label placement:** labels sit above their diagram row. Keep at least 80–100px between the label baseline and the node top edge, or they'll visually merge.

## V2 Roadmap
- **`@remotion/paths` + `evolvePath`** — replace constant-dash with exact path-length drawing
- **Rough.js** — sketchy texture; use `seed: 1` to prevent flickering
- **Google Fonts** — handwritten/sketch style font
- **Map scene type** — D3-Geo: animate `projection.scale()` + `projection.translate()` via `interpolate()` for animated zoom (NOT CSS transform)
- Hand-cursor via `getPointAtLength()`
- Lottie asset support

## Iteration Model
1. Correctness — renders, scene order right
2. Pacing — durationInFrames per scene
3. Clarity — text density, label placement
4. Aesthetics — stroke style, sketch feel, fonts
