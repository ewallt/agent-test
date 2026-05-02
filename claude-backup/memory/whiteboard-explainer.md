# Whiteboard Explainer — Project Memory

## Location
`C:\Users\tomew\Documents\agent-test\Projects\Remotion\whiteboard-explainer\`

## What It Is
A Remotion + TypeScript system for rendering whiteboard-style explainer videos from a JSON scene manifest (`scenes.json`). Content lives entirely in JSON; code stays stable.

## Compositions

| ID | Theme | JSON | Status |
|----|-------|------|--------|
| `WhiteboardExplainer-1` | warmPaper | `scenes.example_1.json` | Done |
| `WhiteboardExplainer-2` | darkChalk | `scenes.example_2.json` | Done |
| `WhiteboardExplainer-3` | TBD | `scenes.example_3.json` | Planned |

- 1920×1080, 30fps
- Entry point: `src/index.ts` → calls `registerRoot(RemotionRoot)`

## Scene Types
| type | Description |
|---|---|
| `title` | Title + subtitle + decorative rule |
| `stepReveal` | Staggered bullet reveal |
| `diagramBuild` | Doodles placed absolutely at x/y |
| `compare` | Two-column comparison |
| `outro` | Dark closing scene with glow |

## Doodle Registry (src/assets/doodles/)
`arrow`, `circle`, `star`, `check`, `bracket`
- Add new doodles by creating a component and registering in `DoodleReveal.tsx`
- V1: large constant dash value (500-600) for stroke-dashoffset animation
- V2: use `getTotalLength()` for exact path lengths

## Scene Transitions (`@remotion/transitions`)
Each scene can have an optional `transition` field:
```json
"transition": { "type": "fade", "durationInFrames": 20 }
"transition": { "type": "slide", "durationInFrames": 20, "direction": "from-right" }
"transition": { "type": "wipe", "durationInFrames": 20, "direction": "from-right" }
"transition": { "type": "flip", "durationInFrames": 20 }
"transition": { "type": "clockWipe", "durationInFrames": 20 }
```
Total duration automatically accounts for transition overlap.

## Key Gotchas
See `whiteboard-explainer-gotchas.md` for full details with fixes and prevention notes.

## Skills Installed (whiteboard-explainer project)
- `remotion-animation` — spring configs, interpolation patterns (ncklrs/startup-os-skills)
- `remotion` — comprehensive Remotion guide from remotion-dev (davila7/claude-code-templates) — installed globally at `~/.agents/skills/remotion`

## Theme System
- `src/themes.ts` — `Theme` type + `THEMES` registry (`warmPaper`, `darkChalk`)
- `src/ThemeContext.tsx` — `ThemeProvider` + `useTheme()` hook
- All scene components use `const { theme: THEME } = useTheme()` (not static import)
- Doodle color defaults to `THEME.ink`; overridable per-doodle via `color` in JSON
- `theme` field in JSON top level (optional, defaults to `warmPaper`)
- Adding a theme: one object in `themes.ts`, reference by key in JSON

## Planned Scene Types (not yet built)
`quote`, `stat`, `splitContent`, `timeline`, `imageReveal`, `flowChart`
See `Projects/Remotion/whiteboard-explainer/documents/planning.md` for JSON shapes and visual descriptions.

## Documents
`Projects/Remotion/whiteboard-explainer/documents/design.md` — architecture, data model, theme system
`Projects/Remotion/whiteboard-explainer/documents/planning.md` — current state, new scene type specs, roadmap

## npm Scripts
```bash
npm start          # Remotion Studio (port 3000)
npm run render     # Render scenes.example.json → out.mp4
```

## Iteration Model (from brief)
1. Correctness — renders, scene order right ✓
2. Pacing — beat timing, durationInFrames per scene
3. Clarity — text density, label placement
4. Aesthetics — stroke style, sketch feel, fonts

## Still To Do (V1→V2)
- **`@remotion/paths` + `evolvePath`** — replace constant-dash hack with exact path-length drawing (consistent speed on any shape)
- **Rough.js** — sketchy/hand-drawn texture on SVGs; use `seed: 1` (constant) to prevent flickering
- **Google Fonts** — sketch/handwritten style font
- **Map scene type** — D3-Geo + Remotion: animate `projection.scale()` + `projection.translate()` via `interpolate()` for RealLifeLore-style zoom (do NOT use CSS `transform: scale()`)
- Hand-cursor animation via `getPointAtLength()`
- Lottie asset support
- AI-generated image assets (post-pipeline-stable)
