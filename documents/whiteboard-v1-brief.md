# Whiteboard Explainer V1 — Claude Code Briefing

## Goal
Build a reusable whiteboard-style explainer video system using Remotion + TypeScript.
Videos are driven entirely by a `scenes.json` manifest. Code stays stable; content changes via data.

---

## Handoff prompt (use this to kick off implementation)

> Create a Remotion TypeScript project (use the Blank template) that renders a whiteboard-style explainer video from a JSON scene manifest passed via Remotion input props (`--props=./scenes.json`). Implement a small scene system using `<Series>` where each scene template supports: title text, bullet reveals, and placement of simple SVG "doodle" assets. Add a reusable `DoodleReveal` component that animates SVG strokes using `stroke-dasharray` / `stroke-dashoffset` driven by `useCurrentFrame()` + `interpolate()` (no CSS transitions), with per-doodle stagger support. Enforce Remotion rendering best practices: use `<Img>` + `staticFile()` for any raster assets, keep props JSON-serializable, and include an example `scenes.example.json` plus a `render` npm script that runs `npx remotion render … --props=./scenes.example.json out.mp4`.

---

## V1 blueprint

**Composition defaults:** 1920×1080, 30fps

**Repo structure:**
```
src/Root.tsx                     — registers one composition: { scenes: Scene[] }
src/scenes/TitleScene.tsx
src/scenes/StepRevealScene.tsx   — 3–5 bullets
src/scenes/DiagramBuildScene.tsx — 3–8 doodles appearing sequentially
src/scenes/CompareScene.tsx      — two columns
src/scenes/OutroScene.tsx
src/components/DoodleReveal.tsx  — stroke draw-on helper
src/components/CalloutText.tsx   — text fade/slide helper
src/assets/doodles/              — SVG doodle components (or public/ for static SVGs)
scenes.json                      — single source of truth, passed via --props
scenes.example.json              — committed example for testing
```

**Scene schema (minimum fields):**
```ts
{
  id: string
  type: "title" | "stepReveal" | "diagramBuild" | "compare" | "outro"
  durationInFrames: number
  title?: string
  body?: string[]          // bullet lines
  doodles?: {
    asset: string          // key into doodles registry
    x: number
    y: number
    scale?: number
    revealStart: number    // frame offset within scene
    revealEnd: number
  }[]
}
```

---

## Non-negotiable constraints

**Animation:**
- All motion driven by `useCurrentFrame()` + `interpolate()` or `spring()` — no CSS transitions
- Scene sequencing via `<Series>` (not manual offset math)
- Store all timing in frames in `scenes.json`; keep timing math centralized

**Assets:**
- Use `<Img>` (not `<img>` or CSS `background-image`) for all raster assets — avoids render flicker
- Use `staticFile()` to reference files in `public/`
- All input props must be JSON-serializable

**SVG draw-on (V1):**
- Use `stroke-dasharray` / `stroke-dashoffset` animated from full path length → 0
- V1: use a large constant dash value (acceptable imprecision)
- V2 only: compute exact lengths via `getTotalLength()` and add hand-cursor via `getPointAtLength()`

**Assets strategy (V1):**
- Code-generated SVG primitives + small curated SVG icon set
- No AI-generated image assets in V1 — too inconsistent; add as optional step after pipeline is stable

---

## Iteration model

Work one axis at a time per iteration:
1. **Correctness** — video renders, scene order is right
2. **Pacing** — beat timing, `durationInFrames` per scene
3. **Clarity** — text density, label placement
4. **Aesthetics** — stroke style, sketch feel, fonts

Each iteration produces: Studio preview → low-res CLI render → updated `scenes.json` → short changelog note.

Use Remotion Agent Skills to enforce best practices. Add hooks to auto-run `tsc` / `npm run lint` after edits.

---

## Skills to use
- `remotion` — Remotion best practices
- `remotion-best-practices` — additional Remotion guidance

If you need them, find and install via `/find-skills`.
