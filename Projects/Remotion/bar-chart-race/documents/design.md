# Bar Chart Race — Design Document

## What it does

Produces an animated bar chart race video showing how a set of values change over time. Each bar represents one entry (e.g. an AI model); bars grow and reorder as new entries are introduced. The output is an MP4 video rendered by Remotion.

---

## How it works

### The program

The program is a generic Remotion video renderer. It knows how to animate a bar chart race for any dataset — it has no knowledge of any specific project. The program lives entirely in `src/`.

Key files:

- `src/index.tsx` — the entry point. Remotion calls this to register the composition. It reads the active data file and sets up the video (duration, frame rate, dimensions).
- `src/engine/BarChartRace.tsx` — the React component that renders each frame. Handles all animation: bar growth, reordering, rank numbers, date display, story cards, legend, and music.
- `src/engine/compute.ts` — pure functions that derive everything the renderer needs from the data: keyframes (one per entry), card schedule, total frame count. These are stateless and testable without rendering.
- `src/engine/types.ts` — TypeScript type definitions shared across the engine and data files.

### The data

All project-specific content lives in a data file: the entries, their dates and values, lab/category colors, story cards, title, music, and timing parameters. The data file exports a single object (`data`) conforming to the `BarChartConfig` type.

The program reads data from one fixed location: `active/data.ts`. This file is swapped out to change which project is running.

A permanent copy of each project's data lives in `data/{project-name}/index.ts`.

---

## Workflow

To produce a new bar chart race video:

1. **Create the data** — add a new folder under `data/` named after the project. Write `index.ts` with the project's entries, colors, story cards, etc.
2. **Stage it** — place a copy in `staging/`.
3. **Activate it** — move the file from `staging/` to `active/data.ts`. The studio picks it up immediately.
4. **Preview** — run `npm start` and open `http://localhost:3000` to preview in the Remotion studio.
5. **Render** — run `npm run render` to produce the MP4.
6. **Complete** — move `active/data.ts` to `completed/` (rename it to the project name). The data in `data/{project}/` remains as the permanent record.

---

## Folder structure

```
bar-chart-race/
  src/
    index.tsx              — entry point (never changes)
    engine/
      BarChartRace.tsx     — generic renderer (never changes)
      compute.ts           — pure computation (never changes)
      types.ts             — shared types (never changes)

  data/
    ai-mmlu/
      index.ts             — permanent data for the AI MMLU project

  active/
    data.ts                — the data file currently being rendered

  staging/                 — data files being worked on, not yet active
  completed/               — data files whose videos have been rendered

  public/
    *.mp3                  — audio files referenced by data files

  tests/
    compute.test.ts        — computed-value tests (no rendering required)

  legacy/                  — original v0.1 code, kept as reference
  ideas/                   — improvement ideas
  documents/               — this document and others
```

---

## Animation model

The data file contains an array of entries, each with a name, category (lab), date, and value. The engine sorts these by date and builds one keyframe per entry. Each keyframe has two phases:

- **Transition** (default 25 frames) — bars animate to new positions and widths
- **Hold** (default 20 frames) — pause before the next entry appears

At any given frame, the renderer interpolates between the previous keyframe state and the current one. Bars entering the top N slide in from below; bars leaving slide out downward.

Story cards are scheduled against keyframe trigger points. Each card runs continuously until the next card's trigger — there are no gaps between cards once the first one appears.

---

## Adding a new project

1. Create `data/{project}/index.ts` — export a `data` object of type `BarChartConfig`
2. Copy it to `staging/{project}.ts`
3. When ready: move to `active/data.ts`
4. `npm start` to preview, `npm run render` to render
5. Move to `completed/{project}.ts` when done

No files in `src/` need to change.
