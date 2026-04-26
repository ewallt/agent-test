# Project Overview

A high-level map of all active work. Read at session start to orient.

---

## How to Work

**Always work from a skill.** Before starting any task, check if a skill exists for it. If no skill exists, tell Tom before proceeding — don't wing it. Skills live in `~/.claude/skills/`. Each project lists its skills in its `project-definition.md`.

If you need detail on any project, follow the pointer to its `project-definition.md`. That file lists the skills and reference docs for that project.

---

## Projects

### 1. Remotion — Bar Chart Race
Generic engine that animates any dataset as a bar chart race; content lives in `data/{project}/`, the engine never changes.
- `Projects/Remotion/bar-chart-race/documents/project-definition.md`
- Studio: localhost:3000

### 2. Remotion — Simple Narrated Slides
Dark-background slideshow videos with Edge TTS narration; each composition is a self-contained TSX file. Primary build system for BYG videos.
- `Projects/Remotion/simple-narrated-slides/documents/project-definition.md`
- Studio: localhost:3001

### 3. Remotion — Whiteboard Explainer
JSON-driven whiteboard explainer videos; content in scenes JSON, React code stays stable.
- `Projects/Remotion/whiteboard-explainer/documents/project-definition.md`
- Studio: localhost:3002

### 4. NotebookLM — Playlists Notebook
Automated workflow for building NotebookLM notebooks and generating playlist videos; one notebook per topic/playlist.
- `Projects/NotebookLM/ephemeral-notebook/` — project root
- `memory/CONTEXT.md` — full workflow context

### 5. BYG — Behold Your God
Ten animated illustration videos and a companion web app based on F.T. Wright's *Behold Your God*.
- `Projects/BYG/documents/project-definition.md`

### 6. Augmented Chat
Single-file web apps that enhance AI chat with structured content, prompt pills, and an AI response layer — clipboard-based (GiC) or inline (Gemini API).
- `Projects/AugmentedChat/documents/project-definition.md`

### 7. YouTube Growth
Research and strategy for building a YouTube presence — SEO, thumbnails, post-upload workflow, Shorts, playlists.
- `Projects/YouTubeGrowth/documents/project-definition.md`

### 8. Gems
Custom Google Gemini personas, each with a system prompt and knowledge file.
- `Projects/Gems/documents/project-definition.md`

### 9. Infrastructure
Cross-cutting tools, meta-processes, and housekeeping that apply across all projects.
- `Projects/Infrastructure/documents/project-definition.md`

---

## Key Facts

| Item | Value |
|------|-------|
| Working dir | `C:\Users\tomew\Documents\agent-test` |
| Git branches | `main` (prod), `dev` (working) |
| Promote command | `bash promote.sh` from agent-test root |
| nlm CLI | `C:\Users\tomew\.local\bin\nlm.exe` (v0.5.27) |
| Account | ewalltom@gmail.com |
| Videos folder | `C:\Users\tomew\Videos\` — playlist subfolders; `Not Yet in YouTube\` within each |

## GitHub Repos

| Repo | Purpose |
|------|---------|
| `agent-test` | Full project backup — all source, skills, documents. Pushed at every shutdown. |
| `claude-code-fun` | Legacy public site. gh-pages branch only. |
| `byg` / `byg-dev` | BYG-specific. `byg` = prod (ewallt.github.io/byg/), `byg-dev` = staging. Both live. |

Full BYG repo structure: `Projects/BYG/documents/byg-github-repos.md`

## Session Boundary

`/compact` is the session boundary:
- **pre-compact** = end-of-session (log entry, then signal ready)
- **post-compact** = orientation (reads this file, session log, memory index)

## For More Detail

- Pending tasks: `tools/tasks.json` (board at localhost:3010)
- Session history: `memory/session-log.md`
- Active notebooks and IDs: `memory/working-notes.md`
- NotebookLM full context: `memory/CONTEXT.md`
- YouTube playlists guide: `documents/youtube-playlists-guide.md`
- Generating ideas: use the `generating-ideas` skill
- Gotchas: `memory/gotchas.md`, `memory/remotion-gotchas.md`, `memory/whiteboard-explainer-gotchas.md`
