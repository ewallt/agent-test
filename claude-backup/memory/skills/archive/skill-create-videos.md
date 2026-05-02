# Skill: Create Videos

## What This Covers
How to queue video creation in NotebookLM via the nlm CLI.

## Notebook
Always use the Pipeline notebook unless told otherwise:
- Name: "Pipeline"
- ID: `29aa1d41-e711-4862-8680-37de5476562e`

## Command
```
PYTHONIOENCODING=utf-8 nlm video create 29aa1d41-e711-4862-8680-37de5476562e --confirm \
  --style retro_print \
  --focus "<focus topic>" \
  --source-ids <source-id>
```

## Options
| Flag | Values | Notes |
|------|--------|-------|
| `--style` | auto_select, classic, whiteboard, kawaii, anime, watercolor, retro_print, heritage, paper_craft | Default: auto_select |
| `--format` | explainer, brief | Default: explainer |
| `--focus` | any text | Equivalent to pencil/prompt icon in UI. Directs video content. |
| `--source-ids` | comma-separated source IDs | Targets specific sources even when multiple are loaded |
| `--confirm` / `-y` | flag | Skips confirmation prompt |

## Queueing Multiple Videos
- Submit video create commands one after another — NotebookLM queues them
- Renders appear in LIFO order (last submitted renders first) — order doesn't matter for most use cases
- Do NOT wait for one to finish before submitting the next

## Focus Strategy
- Use `--focus` to direct each video to its specific topic even when multiple sources are loaded
- Be explicit: "Nikola Tesla's inventions and the rise of AC electricity" not just "Tesla"
- This replaces the need to isolate one source at a time (avoids cross-contamination)

## Render Time
- Approximately 8-10 minutes per video
- Auth may expire during render — renders continue server-side regardless

## Check Status
```
PYTHONIOENCODING=utf-8 nlm studio status 29aa1d41-e711-4862-8680-37de5476562e
```
