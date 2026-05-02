# Full Context Document — NotebookLM Workflows
# Read this at the start of every session.
# Last updated: 2026-02-28

---

## What This Project Is
Automated workflows for building and managing NotebookLM notebooks using the `nlm` CLI tool.
Tom provides a topic (or a pre-built task file); Claude does the rest.

- **Ephemeral Notebook** — primary active workflow. Creates a fresh, purpose-built notebook per topic with sources and videos. Tom gets a shareable notebook URL. One notebook per topic.
- **Research Pipeline** — uses a persistent "Pipeline" notebook as a video factory. Less used; skills transfer to Ephemeral Notebook workflow.

---

## Tool
- CLI: `notebooklm-mcp-cli` v0.3.2
- Full path: `C:\Users\tomew\.local\bin\nlm.exe`
- **`nlm` is NOT in the bash PATH** — always invoke via PowerShell with full path:
  `powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe ...'`
- Use single quotes in the PowerShell string to prevent bash variable expansion
- Old prefix `PYTHONIOENCODING=utf-8 nlm ...` no longer applies from bash terminal
- `uv` is also not in bash PATH — use full path `C:\Users\tomew\.local\bin\uv.exe` if needed
- Installed via `uv tool install notebooklm-mcp-cli`
- Upgrade pending: v0.3.3

---

## Authentication
- User must run manually (cannot be automated): `nlm login --profile default`
- Browser OAuth flow, logs in as ewalltom@gmail.com
- Auth window is ~20 minutes — if commands fail mid-session, suspect expiry
- Auth expiry kills CLI only — in-progress renders continue server-side
- Credentials: `C:\Users\tomew\.notebooklm-mcp-cli\profiles\default`
- Verify: `powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe doctor'`

---

## Working Directory
`C:\Users\tomew\Documents\agent-test`

## Project Structure
```
agent-test/
  Projects/
    NotebookLM/
      playlists/     ← Ephemeral Notebook workflow
    Remotion/
      simple-narrated-slides/ ← Narrated slideshow videos (ElevenLabs + dark background)
      bar-chart-race/         ← Bar chart race videos (project code at C:\Users\tomew\Documents\bar-chart-race)
      whiteboard-explainer/   ← Whiteboard explainer system
      start-studio.js         ← Launch Remotion Studio for simple-narrated-slides
      render.js               ← Render compositions to MP4
      start-remotion.bat      ← Bat launcher for simple-narrated-slides
  workflow/                   ← active.txt dispatch file
  documents/                  ← reference docs and project overview
```

---

## Workflow Dispatch
At startup, read `workflow/active.txt` to determine which workflow is active.
Format: `workflow: <workflow-name>`
Currently: `workflow: playlists`

See `skills/skill-workflow-dispatch.md` for full dispatch logic.

The `workflow/` folder is unnamespaced (shared infrastructure).
All other workflow folders are namespaced under the workflow name.

---

## Ephemeral Notebook Folder Structure

```
Projects/NotebookLM/playlists/
  tasks/                  ← task files awaiting processing
  staging/                ← task files being drafted / not yet ready
  json/                   ← generated JSONs (handoff from Instance 1 to Instance 2)
  json-completed/         ← JSONs processed by Instance 2
  completed/              ← finished task files (and their copied-text files)
  copied-text/            ← user-provided content files (transcripts, etc.)
  artifacts/              ← per-notebook artifact folders (one subfolder per topic)
    <topic-slug>/
      app.html            ← inference web app (git tracked)
      slides.html         ← Gemini slideshow HTML (gitignored — can be 40MB+)
      manifest.md         ← Gemini slide manifest source file
  run-log.md              ← session run log
```

---

## Task File Format (playlists)

```
key: <unique-key>
topic: <topic name>
title: <notebook title — optional, defaults to topic if omitted>
pattern: <optional — 003, 004, etc.; Claude decides if omitted>
videos: <optional integer — Claude decides if omitted>
research: yes|no
copied-text: yes|no
app: yes|no
guidance: |
  <context for Claude — informs focus angle design, NOT passed to NotebookLM>
```

- `key` — required; used to match task file to copied-text file, and reserved for future features
- `title` — optional; use when notebook title should differ from topic string
- `research` — whether to run `nlm research` (default: yes)
- `copied-text` — whether a copied-text file exists for this task (default: no)
- `guidance` — Claude's context for designing `--focus` prompts; Claude translates this into tight one-line focus strings

---

## Copied-Text Pipeline

For YouTube transcripts or other large user-provided content — avoids burning tokens by pasting into chat.

**Copied-text file format** (`playlists/copied-text/`):
```
key: <matching-key>
<blank line>
<content>
```

**How it works:**
1. Tom saves content to `playlists/copied-text/<filename>.txt` with matching `key:`
2. Task file has `copied-text: yes`
3. Claude writes content to a temp file, runs `nlm source add --file <path>`, deletes temp file
4. Claude never reads or processes the content itself
5. On completion, both task file and copied-text file move to `completed/`

**Source behavior by flag combination:**
- `research: yes, copied-text: no` — research only (standard)
- `research: no, copied-text: yes` — copied text only (no research)
- `research: yes, copied-text: yes` — both (research + copied text as sources)

See `skills/skill-copied-text.md` for full details.

---

## Key Commands

All commands use PowerShell with full path. Always set `$env:PYTHONIOENCODING='utf-8'` — without it, Rich's styled output (spinners, checkmarks) crashes with UnicodeEncodeError on Windows cp1252 consoles, requiring extra verification steps.

**Standard prefix for every nlm command:**
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' <args>"
```
Set as a bash env prefix — bash passes it to PowerShell, PowerShell passes it to Python (nlm). Do NOT use `$env:` inside the PowerShell string — bash expands `$env` as empty before PowerShell sees it.

```powershell
# Auth check
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' doctor"

# Notebook
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook create '<title>'"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook list"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook delete <notebook-id> -y"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' share public <notebook-id>"

# Research
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' research start '<query>' --notebook-id <id> --mode fast"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' research start '<query>' --notebook-id <id> --mode fast --force"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' research status <id> --max-wait 0"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' research import <id> <task-id>"

# Sources
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source list <notebook-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source add --file <path> --notebook-id <id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source delete <source-id> -y"

# Video
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' video create <notebook-id> --confirm --style retro_print --focus '<focus topic>' --source-ids <source-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' studio status <notebook-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' list artifacts <notebook-id> --full --json"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' studio delete <artifact-id> -y"

# Slides
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' slides create <notebook-id> --format detailed_deck --focus '<focus>' --source-ids <ids> -y"
# Formats: detailed_deck, presenter_slides | Length: short, default

# Infographic
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' infographic create <notebook-id> --orientation landscape --detail standard --focus '<focus>' --source-ids <ids> -y"
# Orientations: landscape, portrait, square | Detail: concise, standard, detailed

# Mind Map
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' mindmap create <notebook-id> --title '<title>' --source-ids <ids> -y"

# Report
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' report create <notebook-id> --format 'Briefing Doc' --source-ids <ids> -y"
# For long --prompt strings, use a .ps1 script with $env:PYTHONIOENCODING = 'utf-8' at top (see tmp-manifest.ps1 pattern)
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' report create <notebook-id> --format 'Create Your Own' --prompt '<custom prompt>' --source-ids <ids> -y"
# Formats: "Briefing Doc", "Study Guide", "Blog Post", "Create Your Own"

# Download
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' download video <artifact-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' download slide-deck <artifact-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' download infographic <artifact-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' download report <artifact-id>"
# NOTE: download report consistently fails (URL field empty in artifact list) -- root cause unknown; may be API-side
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' download audio <artifact-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' download mind-map <artifact-id>"
# Download formats: video (mp4), slide-deck (PDF), infographic (PNG), report (Markdown), mind-map (JSON)

# Export to Google Docs/Sheets
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' export to-docs <artifact-id>"
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' export to-sheets <artifact-id>"
```

Video styles: auto_select, classic, whiteboard, kawaii, anime, watercolor, retro_print, heritage, paper_craft
Video formats: explainer (default), brief

---

## Important Behaviors & Gotchas
- **Delete syntax**: `nlm source delete <source-id> -y` — source ID only, no notebook ID
- **Loop syntax fails on Windows** — always chain deletes with &&
- **LIFO rendering** — videos render in reverse submission order (inconsequential)
- **--force flag** — needed if a previous research task is blocking a new one
- **Source isolation** — use `--source-ids` + `--focus` to target specific sources
- **Source cleanup** happens at START of next run, not end of current run
- **Command may succeed even if Unicode error printed** — verify with follow-up list
- **Run log append**: always append to literal end of file (not pattern-matched anchor) to avoid inserting mid-file

---

## Pipeline Notebook (Research Pipeline)
- Name: "Pipeline"
- ID: `29aa1d41-e711-4862-8680-37de5476562e`
- Always reuse this notebook — never create a new one

---

## Skills Index

### Shared / Infrastructure
- `skill-auth.md` — auth handling
- `skill-log.md` — run log format, append behavior, and task execution checklist
- `skill-workflow-dispatch.md` — startup dispatch, folder resolution by workflow
- `skill-output.md` — produce clean copy/paste output: documents, research prompts, task files, or any verbatim-use material

### Ephemeral Notebook
- `skill-notebook-lifecycle.md` — create, share, rename, delete notebooks
- `skill-video-strategy.md` — focus angle selection and video design
- `skill-task-intake.md` — task file → JSON → notebook build (full pipeline)
- `skill-json-request.md` — process a JSON request and execute notebook build
- `skill-copied-text.md` — copied-text file handling and source injection
- `skill-pattern-003.md` — Single Notebook design pattern
- `skill-slideshow-manifest.md` — generate Slide-Ready Manifest for Gemini Canvas picture book (via NotebookLM)
- `skill-manifest-writer.md` — generate Slide-Ready Manifest directly (Claude writes it; no NotebookLM needed)
- `skill-inference-app.md` — build single-file HTML inference apps with live AI brain (Explorer + Quiz pattern)
- `workflow-playlists.md` — full workflow with handoff structure (single instance)

### Two-Instance Workflow
- `workflow-strategist.md` — Instance 1: reads tasks, generates JSONs
- `workflow-operator.md` — Instance 2: reads JSONs, builds notebooks and artifacts

### Research Pipeline (Archived)
These skills have been moved to `skills/archive/` — superseded by the Ephemeral Notebook workflow.
Restore from archive if the Research Pipeline workflow is ever reinstated.
- `skill-research.md`
- `skill-create-videos.md`
- `skill-delete-sources.md`
- `skill-manifest.md`
- `workflow-research-pipeline.md`

---

## Resuming Sessions
- Session files: `~/.claude/projects/C--Users-tomew-Documents-agent-test/<session-id>.jsonl`
- Resume: `claude --resume <session-id>`

---

## Pending Items
- Upgrade `nlm` from v0.3.2 to v0.3.3
- Build Pattern 004 (Multi-Notebook Series)
- Chat configuration (`nlm chat configure`) — deferred
