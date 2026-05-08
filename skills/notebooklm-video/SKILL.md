---
name: notebooklm-video
description: >
  Authoring prompts for NotebookLM videos — both the content/focus prompt and the Custom visual style
  prompt. Use this skill whenever generating a NotebookLM video, choosing a video format or visual style,
  writing a focus angle, or deciding how to steer what a NotebookLM video covers and looks like.
  Trigger any time a NotebookLM video is being planned or generated in the ephemeral notebook workflow.
---

## Read First

This skill is self-contained. No separate document required — all guidance is below.

---

## Three Video Formats

NotebookLM supports three formats via `--format`:

| Format | Description | Visual Style |
|--------|-------------|--------------|
| `explainer` | ~~Default polished overview~~ **[DEPRECATED]** | Yes — choose from built-in styles or Custom |
| `brief` | ~~Shorter explainer~~ **[DEPRECATED]** | Yes — same style options as explainer |
| `cinematic` | Documentary/film style — NLM controls the look entirely | **No** — style flag is ignored; do not specify |

**Default format for this project:** `cinematic`.

---

## CLI Command

Match this example exactly — all four flags are required:

```bash
PYTHONIOENCODING=utf-8 nlm video create dc673f24-f901-4f9d-bd72-47016c90ca6f \
  --format cinematic \
  --focus "The economic fragility at the heart of Nazi Germany — why Hitler needed war not from strength but because the rearmament program was functionally bankrupt by 1939, and how each conquest had to fund the next." \
  --source-ids "945c7732" \
  --confirm
```

---

## Visual Style (cinematic)

Cinematic videos take a focus prompt only — no `--style` flag. NLM controls the visual look entirely.

---

## Focus / Content Prompt

This is what gets passed via `--focus`. It tells NotebookLM which angle of the topic to cover and
what to emphasize. Applies to all three formats.

### What makes a strong focus prompt

- Pins a **single specific angle** — not the whole topic, one thread of it
- Names what to **include** and optionally what to **exclude or contrast**
- Gives the video a **narrative shape** — a beginning tension, a core insight, a resolution or implication
- Stays grounded in what the sources actually contain

### Structure that works well

`[Context or setup] — [core claim or insight to develop] — [resolution, implication, or "why it matters"].`

**Example (Braess's Paradox):**
> `The counterintuitive core of Braess's Paradox — why adding a road to a network can slow everyone down, how
> the Nash equilibrium explains selfish routing, and what this means for how we should think about building
> infrastructure.`

**Example (Black Death, mortality angle):**
> `The lived experience and scale of mortality during the Black Death — what dying of plague looked like, how
> communities responded as normal social order collapsed, and why the death toll varied so dramatically across
> regions.`

### For the "Claude as Source" pattern

When Claude has written the knowledge base document, the focus prompt should be scoped to match exactly what
that document covers — no broader. The document was written for this video; the prompt should reflect that
tight alignment. One angle, fully developed, nothing left hanging.

---

## Gotchas

- **Use the full source UUID in `--source-ids`.** Short 8-char prefixes work for display/reference but cause silent video generation failures. Always use the full UUID (e.g., `c7c43f5a-9ee5-42d9-b00b-772f0d6a302c`), not the short form (`c7c43f5a`).

- **No single quotes in `--focus` strings.** Single quotes inside a double-quoted bash string can be mangled by Windows bash (Git Bash/MINGW) when passed to a Python subprocess. The focus prompt gets truncated or broken, and the video generation fails silently — the CLI reports success but NLM never produces a video. Use em-dashes or rephrase to avoid apostrophes and single quotes entirely.

---

## How to Apply This in a Run

1. **Write the focus prompt** for each video — one per angle, each self-contained.
2. **Run:** `nlm video create NOTEBOOK_ID --format cinematic --focus "..." --source-ids "..." --confirm`
