---
name: notebooklm-slide
description: >
  Generate a NotebookLM slide deck artifact from notebook sources. Use this skill whenever
  a NotebookLM run includes `slides: yes` (or a slide count), or when Tom asks to create
  a slide deck PDF for a notebook topic. The slide deck is generated natively by NotebookLM
  and downloads as a .pdf file. This is the NLM-native slide artifact — distinct from the
  Gemini slide manifest (see notebooklm-slide-manifest skill), which is written by Claude and
  uploaded as a notebook source for Gemini to build slides from. Trigger any time `nlm slides create` is part of a workflow run.
---

## Read First

This skill is self-contained. No separate document required — all guidance is below.

---

## What This Is

A NotebookLM-native slide deck — a PDF generated directly from the notebook sources.
It is a visual presentation summary of the notebook content, suitable for sharing.

This is NOT the Gemini slide manifest. See the `notebooklm-slide-manifest` skill for that.

| This skill | `notebooklm-slide-manifest` skill |
|------------|-----------------------------------|
| `nlm slides create` → PDF | Claude writes a `.md` file |
| NLM generates the content | Claude writes the content |
| Output: shareable PDF | Output: input for Imagen 4.0 pipeline |

Both can coexist in a single run.

## Command

```bash
PYTHONIOENCODING=utf-8 nlm slides create <notebook-id> --confirm
PYTHONIOENCODING=utf-8 nlm slides create <notebook-id> --format presenter --length short --confirm
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--format` | `detailed_deck`, `presenter_slides` | `detailed_deck` |
| `--length` | `short`, `default` | `default` |
| `--source-ids` / `-s` | comma-separated source IDs | (all sources) |
| `--confirm` / `-y` | flag | required — always include |

**Format guidance:**
- `detailed_deck` — more content per slide; good for study or reference
- `presenter_slides` — cleaner, fewer words; good for presentation use

**Length guidance:**
- `default` — standard deck
- `short` — fewer slides; good for concise topics

## Workflow Integration

### Task file fields

```yaml
slides: yes                          # yes | no (or omit)
slide_format: detailed_deck          # detailed_deck | presenter_slides (default: detailed_deck)
slide_length: default                # short | default (default: default)
```

Note: `slides` in the task file refers to this NLM-native deck. The Gemini slide manifest
is controlled by a `slideshow: yes` field and the `slide_style` field — those are separate.

### In a run

1. After sources are in place, run `nlm slides create`
2. Poll status: `PYTHONIOENCODING=utf-8 nlm studio status <notebook-id>`
3. When status is `completed`, download:
   ```bash
   PYTHONIOENCODING=utf-8 nlm download slide-deck <notebook-id> --output <key>-slides.pdf
   ```
4. Save to: `Projects/NotebookLM/ephemeral-notebook/artifacts/<key>/<key>-slides.pdf`
5. Log artifact ID in run log

### Download

```bash
PYTHONIOENCODING=utf-8 nlm download slide-deck <notebook-id> --output slides.pdf
```

Downloads as PDF. Default filename if no `--output`: `<notebook_id>_slides.pdf`.

## Run Log Entry Format

```
- Slide deck: completed | Artifact ID: <id> | Downloaded: artifacts/<key>/<key>-slides.pdf
```

## Relationship to Other Artifact Types

| Artifact | Skill | Command | Output |
|----------|-------|---------|--------|
| Video | `notebooklm-video` | `nlm video create` | `.mp4` (in NLM UI) |
| **Slide deck** | **`notebooklm-slide`** | **`nlm slides create`** | **`.pdf`** |
| Gemini slide manifest | `notebooklm-slide-manifest` | (Claude writes) | `.md` |
| Infographic | `notebooklm-infographic` | `nlm infographic create` | `.png` |
| Web app | `notebooklm-webapp` | (Claude writes) | `.html` |
