---
name: notebooklm-infographic
description: >
  Generate a NotebookLM infographic artifact from notebook sources. Use this skill whenever
  a NotebookLM run includes `infographic: yes`, or when Tom asks to create an infographic
  for a notebook topic. The infographic is generated natively by NotebookLM and downloads
  as a .png file. Trigger any time infographic generation is part of a NotebookLM workflow run.
---

## Read First

This skill is self-contained. No separate document required — all guidance is below.

---

## What This Is

A NotebookLM-native infographic — a visual summary image generated directly from the notebook
sources. It downloads as a `.png` file. This is distinct from the web app (interactive HTML)
and the Gemini slide manifest (text for an external pipeline).

## Command

```bash
PYTHONIOENCODING=utf-8 nlm infographic create <notebook-id> --confirm
PYTHONIOENCODING=utf-8 nlm infographic create <notebook-id> --orientation portrait --detail detailed --focus "optional focus" --confirm
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--orientation` / `-o` | `landscape`, `portrait`, `square` | `landscape` |
| `--detail` / `-d` | `concise`, `standard`, `detailed` | `standard` |
| `--style` | `auto_select`, `sketch_note`, `professional`, `bento_grid`, `editorial`, `instructional`, `bricks`, `clay`, `anime`, `kawaii`, `scientific` | `auto_select` |
| `--focus` | free text string | (none) |
| `--source-ids` / `-s` | comma-separated source IDs | (all sources) |
| `--confirm` / `-y` | flag | required — always include |

### Choosing options

**Orientation:**
- `landscape` — good default; wide format suits most summary visuals
- `portrait` — better for tall, list-heavy content or print-like output
- `square` — good for social sharing or when layout is unclear

**Detail:**
- `concise` — a quick overview; good for simple or narrow topics
- `standard` — the default; balanced depth and visual clarity
- `detailed` — maximum content; good for complex, multi-part topics

**Focus:**
- Optional. If the notebook has multiple sources or a broad topic, a focus string steers
  the infographic toward the most important angle.
- Write it like a video focus: one specific claim or thread, not a list of bullet points.
- Example: `"The Nash equilibrium trap and the price of anarchy"`
- If the notebook already has a tight Claude-as-Source knowledge base, focus is usually
  not needed — the source already narrows the scope.

## Workflow Integration

### Task file fields

```yaml
infographic: yes
infographic_orientation: landscape     # landscape | portrait | square (default: landscape)
infographic_detail: standard           # concise | standard | detailed (default: standard)
infographic_focus: |                   # optional — omit if not needed
  one-sentence focus string here
```

### In a run

1. After sources are in place, run `nlm infographic create`
2. Poll status: `PYTHONIOENCODING=utf-8 nlm studio status <notebook-id>`
3. When status is `completed`, download: `PYTHONIOENCODING=utf-8 nlm download infographic <notebook-id>`
4. Save output to: `Projects/NotebookLM/ephemeral-notebook/artifacts/<key>/infographic.png`
5. Log artifact ID in run log

### Status polling

Infographics typically complete in 30–90 seconds. Use the same pattern as slides and video:

```bash
PYTHONIOENCODING=utf-8 nlm studio status <notebook-id>
# Look for the infographic artifact with status: completed
```

### Download

```bash
PYTHONIOENCODING=utf-8 nlm download infographic <notebook-id> --output infographic.png
```

No artifact ID needed — `nlm download infographic` fetches the latest infographic for the notebook.

## Run Log Entry Format

Add to the manifest and run log:
```
- Infographic: completed | Artifact ID: <id> | Downloaded: artifacts/<key>/infographic.png
```

## Relationship to Other Artifact Types

| Artifact | Produced by | Output format |
|----------|-------------|---------------|
| Video | `nlm video create` | `.mp4` (in NLM UI) |
| Slide deck (PDF) | `nlm slides create` | `.pdf` |
| Gemini slide manifest | Claude (written directly) | `.md` (for Imagen pipeline) |
| Web app | Claude (HTML) | `.html` |
| **Infographic** | **`nlm infographic create`** | **`.png`** |
