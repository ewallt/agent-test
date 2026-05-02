# Remotion Workflow Context

## What This Is
Video generation using Remotion (React-based video framework).
Each video is a self-contained React project.

## Projects
All compositions live in `agent-test/Projects/Remotion/simple-narrated-slides/src/` and are registered in `Root.tsx`.

| Composition ID | File | Duration | Description |
|----------------|------|----------|-------------|
| ModelCollapse | `ModelCollapse.tsx` | 10s | "The Recursive Loop" — model collapse visualization |
| HelloWorld | `HelloWorld.tsx` | 6s | Remotion explainer with live frame counter |
| Britain1940 | `Britain1940.tsx` | ~1:57 | 5-slide WWII (Battle of Britain / Atlantic) — amber aesthetic, ElevenLabs narration |
| BattleOfAtlantic | `BattleOfAtlantic.tsx` | ~1:57 | 5-slide Atlantic campaign — navy blue aesthetic, ElevenLabs narration |

## Audio Generation Pattern
Each composition has its own audio folder and script:
- `public/audio/` + `scripts/generate-audio.mjs` → `src/slide-durations.ts` (Britain1940)
- `public/audio/atlantic/` + `scripts/generate-atlantic-audio.mjs` → `src/atlantic-durations.ts` (BattleOfAtlantic)

**Pattern: no `calculateMetadata`** — durations imported directly from TS files at module level.
Root.tsx pre-computes frame counts and passes via `defaultProps`. Instant load, no spinner.

## File Structure

```
Projects/Remotion/simple-narrated-slides/   ← project root
├── .claude/
│   └── launch.json                ← preview_start config (dev server on port 3000)
├── public/
│   └── audio/
│       ├── title.mp3              ← Britain1940 title card narration
│       ├── slide-1.mp3 … slide-5.mp3   ← Britain1940 slide narrations (George voice)
│       └── atlantic/
│           ├── title.mp3          ← BattleOfAtlantic title card narration
│           └── slide-1.mp3 … slide-5.mp3  ← BattleOfAtlantic narrations (George voice)
├── scripts/
│   ├── generate-audio.mjs         ← ElevenLabs runner for Britain1940; writes slide-durations.ts
│   └── generate-atlantic-audio.mjs ← ElevenLabs runner for BattleOfAtlantic; writes atlantic-durations.ts
├── src/
│   ├── Root.tsx                   ← composition registry; imports all durations, pre-computes frame counts
│   ├── Britain1940.tsx            ← 5-slide WWII composition (amber, ~1:57)
│   ├── BattleOfAtlantic.tsx       ← 5-slide Atlantic composition (navy, ~1:57)
│   ├── HelloWorld.tsx             ← 6s Remotion explainer (live frame counter)
│   ├── ModelCollapse.tsx          ← 10s model collapse visualization
│   ├── slide-durations.ts         ← AUTO-GENERATED: Britain1940 audio durations in seconds
│   ├── atlantic-durations.ts      ← AUTO-GENERATED: BattleOfAtlantic audio durations in seconds
│   ├── index.ts                   ← Remotion entry point (registers Root)
│   └── style.css
├── package.json
├── remotion.config.ts             ← minimal config; do NOT add setPublicDir (breaks static serving)
├── tailwind.config.js
└── tsconfig.json
```

**Structure assessment:** Clean and logical. Each composition is self-contained in one `.tsx` file. Audio scripts and auto-generated duration files follow a consistent naming convention.

**Adding a new composition** checklist:
1. Create `src/NewComposition.tsx`
2. Create `scripts/generate-new-audio.mjs` (copy from existing; update `NARRATIONS`, `OUTPUT_DIR`, output TS path)
3. Run the script to generate audio and `src/new-durations.ts`
4. Register in `Root.tsx`: import durations, compute frame counts, add `<Composition>` entry

## Starting the Studios

All three Remotion projects have fixed ports. Studios are OS-level Node processes — they persist across Claude sessions and do not need to be restarted unless they've actually stopped.

| Project | Folder | Port | Command |
|---------|--------|------|---------|
| bar-chart-race | `Projects/Remotion/bar-chart-race/` | 3000 | `npm start` |
| simple-narrated-slides | `Projects/Remotion/simple-narrated-slides/` | 3001 | `npm start` |
| whiteboard-explainer | `Projects/Remotion/whiteboard-explainer/` | 3002 | `npm start` |

At the start of a Remotion session, check first — only start studios that aren't already running:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
curl -s -o /dev/null -w "%{http_code}" http://localhost:3002
```
Start any that return non-200 (run in background):
```bash
cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/bar-chart-race" && npm start &
cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/simple-narrated-slides" && npm start &
cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/whiteboard-explainer" && npm start &
```

## Key Facts
- Render: `npx remotion render` in project folder
- Built-in skill available (loads automatically when relevant)
- Gotchas: see `memory/remotion-gotchas.md`

## Remotion Basics
- Components are pure functions of `useCurrentFrame()`
- No CSS transitions or @keyframes — use `interpolate()` and `spring()`
- Rendering = headless Chrome screenshot per frame
- `<AbsoluteFill>`, `<Sequence>`, `useVideoConfig()` are the core primitives
