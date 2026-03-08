# Project Overview
# Last updated: 2026-03-08

---

## Origin

This project began as "agent-test" — a deliberately vague name chosen because the direction wasn't clear yet. The goal was simply to explore agentic workflows with Claude Code. The name no longer fits; something like "ccc" (CLI Claude Code) or "claude-code" would be more descriptive, but renaming is a low-priority housekeeping item.

---

## The Four Workflows

### 1. Ephemeral Notebook (EN)
**Folder:** `ephemeral-notebook/`
**Status:** Active — primary workflow

Automates the creation of NotebookLM notebooks. The key insight is that notebooks are *ephemeral* — thrown away after use — so the workflow is the product, not the notebooks themselves. Eventually this evolves into a process that builds high-quality, more permanent notebooks, but that takes time.

The workflow was preceded by a "Pipeline" workflow that created videos inside a single persistent notebook. Pipeline was deprecated in favor of EN, which creates a fresh notebook per topic and produces richer output.

**Current outputs:**
- **NotebookLM videos** — AI-generated explainer videos from notebook sources
- **Gemini slides** — a structured slide manifest Claude writes, fed to Gemini Canvas to produce a picture-book-style HTML slideshow
- **Web app** — a single-file HTML inference app Claude builds from the research; uses a live AI backend; Explorer + Quiz pattern

**Planned fourth output:**
- **Remotion content** — structured material to feed into the narrated slideshow workflow (not yet implemented)

**How it works:** Tom provides a topic (or a pre-built task file); Claude does the rest. Research is pulled automatically via the `nlm` CLI tool. Sources are curated, artifacts are generated, and a shareable notebook URL is produced.

---

### 2. Narrated Slideshows (Remotion)
**Folder:** `model-collapse/` ← misleading name; should be renamed
**Status:** Active — POC proven, strong direction

Programmatic video creation using Remotion + React. The aesthetic was established in the first POC and is a keeper: text rolls out line by line against a dark background, with ElevenLabs narration synchronized to each bullet. Clean, focused, quite cinematic for a POC.

**Current compositions:**
- `Britain1940` — Battle of Britain; dark amber aesthetic; per-slide audio
- `BattleOfAtlantic` — Battle of the Atlantic; navy aesthetic; per-bullet audio (preferred pattern)
- `HelloWorld` — simple Remotion demo

The project is named `model-collapse` after the first video topic that was built — model collapse in AI. This is a legacy name and should be renamed. A `FOLDER` constant has been added to the key scripts to make renaming a one-line change per file.

**Key tech:** Remotion, ElevenLabs (George voice, eleven_multilingual_v2), TypeScript, static pre-computed durations (no `calculateMetadata`).

---

### 3. Bar Chart Race
**Folder:** `bar-chart-race/`
**Status:** Active — refactored, data-driven

A Remotion-based bar chart race of AI model benchmark scores over time. Background music generated with Suno. The project was refactored so that only the data needs to change to produce a new race — the code is stable and reusable.

---

### 4. Whiteboard Explainer
**Folder:** `whiteboard-explainer/`
**Status:** Active — early brainstorm/exploration stage

A JSON-driven system for rendering whiteboard-style explainer videos in Remotion. All content lives in a JSON scene manifest; the code stays stable. Being developed as a *catalog* — a collection of numbered compositions that each demonstrate a distinct visual approach, so they can be compared to find what looks best.

**Current compositions:**
- `WhiteboardExplainer-1` — Warm Paper / Blue Accent theme; "How the Internet Works"
- `WhiteboardExplainer-2` — Dark Chalk / Amber Accent theme; "History of Writing"

**Next:** Build 6 new scene types (quote, stat, splitContent, timeline, imageReveal, flowChart) and create `WhiteboardExplainer-3` to demo them.

---

## Folder Structure

```
agent-test/
  Projects/
    NotebookLM/
      ephemeral-notebook/         ← Ephemeral Notebook workflow
    Remotion/
      simple-narrated-slides/     ← ElevenLabs narrated slideshows (dark background)
      bar-chart-race/             ← placeholder (see note below)
      whiteboard-explainer/       ← Whiteboard explainer system
      start-studio.js             ← Launch Remotion Studio for simple-narrated-slides
      render.js                   ← Render compositions to MP4
      start-remotion.bat          ← Bat launcher for simple-narrated-slides
  workflow/                       ← active.txt dispatch file
  documents/                      ← reference docs including this file
  ReadMe.txt                      ← working notes
```

**Note on bar-chart-race:** The actual project code was previously located at
`C:\Users\tomew\Documents\bar-chart-race` (outside agent-test). That path no longer exists.
`Projects/Remotion/bar-chart-race/` is a placeholder pending the project being located/restored.

---

## Deprecations

- **Pipeline workflow** — superseded by Ephemeral Notebook. Skills archived in `ephemeral-notebook/skills/archive/`.
- **`notebooks/` folder** — was intended for a "build notebook → interrogate → build sources" workflow that turned out not to be feasible (NotebookLM CLI is write-only for content). Removed.
