# Project Overview

A high-level map of all active work. Read this at session start to orient quickly.
For depth on any area, follow the pointers below.

---

## The Six Groups

### 1. Remotion — Bar Chart Race
Animated bar chart race videos rendered with Remotion. A generic engine (`src/engine/`)
renders any dataset. Projects live in `data/{project}/` as four component files, assembled
by a build script into a single config. Currently two complete bar chart races (AI MMLU,
Streaming Wars) and one with data but not yet wired up (Tallest Buildings).

- Studio: localhost:3000
- Project root: `Projects/Remotion/bar-chart-race/`
- Design doc: `Projects/Remotion/bar-chart-race/documents/design.md`

---

### 2. Remotion — Simple Narrated Slides
Dark-background slideshow videos with ElevenLabs narration. Each composition is a
self-contained `.tsx` file with per-bullet audio (one MP3 per narration sentence).
Audio generation scripts write duration files that Root.tsx imports at module load —
no async spinner, no calculateMetadata.

- Studio: localhost:3001
- Project root: `Projects/Remotion/simple-narrated-slides/`
- Context: `memory/remotion-context.md`

---

### 3. Remotion — Whiteboard Explainer
JSON-driven whiteboard-style explainer videos. Content lives entirely in a scenes JSON
file; the React code stays stable. Has a theme system (warmPaper, darkChalk) and five
scene types. Six new scene types are planned. Two compositions exist (WhiteboardExplainer-1,
WhiteboardExplainer-2).

- Studio: localhost:3002
- Project root: `Projects/Remotion/whiteboard-explainer/`
- Context doc: `Projects/Remotion/whiteboard-explainer/documents/context.md`
- Planning doc: `Projects/Remotion/whiteboard-explainer/documents/planning.md`
- Gotchas: `memory/whiteboard-explainer-gotchas.md`

---

### 4. NotebookLM — Ephemeral Notebook
Automated workflow for building NotebookLM notebooks from task files. Tom drops a task
file in `tasks/`; Claude creates a notebook, runs research, imports sources, builds
artifacts (videos, slides, infographics, web apps), and shares the notebook. One notebook
per topic, purpose-built and disposable.

- Workflow root: `Projects/NotebookLM/ephemeral-notebook/`
- Full context: `memory/CONTEXT.md`
- Workflow doc: `memory/skills/workflow-ephemeral-notebook.md`
- Run log: `Projects/NotebookLM/ephemeral-notebook/run-log.md`

---

### 5. BYG — Behold Your God
Video series + companion web app based on F.T. Wright's *Behold Your God*. Ten illustrated
animated videos (dark background, SVG doodle format), each with a wrapper page deployed to
gh-pages. The web app bundles all 10 into a single page with Illustrations, Explorer, and
Flashcard tabs. Illustration 01 (Nuclear Power Plant) is complete.

- Project definition: `Projects/BYG/documents/project-definition.md`
- Web app: `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html`
- Videos: `Projects/Remotion/simple-narrated-slides/` (studio: localhost:3001)
- Knowledge base: `Projects/BYG/documents/knowledge-base.md`

---

### 6. Infrastructure
Cross-cutting tools and meta-work. Includes the task manager web app, git/dev-prod
setup, Claude Code skills, and workflow tooling. No sub-workflows.

- Task manager: `tools/tasks.html` (served on localhost:3010)
- Task data: `tools/tasks.json` — update this when task status changes
- Git: `main` (production) and `dev` (working). Promote via `bash promote.sh`.
- Structural tests: 99 tests across all three Remotion projects (`npm test` in each)

---

## Key Facts

| Item | Value |
|------|-------|
| Working dir | `C:\Users\tomew\Documents\agent-test` |
| Git branches | `main` (prod), `dev` (working) |
| Promote command | `bash promote.sh` from agent-test root |
| nlm CLI | `C:\Users\tomew\.local\bin\nlm.exe` (v0.3.2) |
| Account | ewalltom@gmail.com |

## For More Detail
- Pending tasks: `memory/pending.md`
- Session history: `memory/session-log.md`
- Startup checklist: `memory/startup.md`
- Remotion details: `memory/remotion-context.md`
- NotebookLM full context: `memory/CONTEXT.md`
- Gotchas: `memory/gotchas.md`, `memory/remotion-gotchas.md`, `memory/whiteboard-explainer-gotchas.md`
