---
name: notebooklm-infographic-prompt
description: >
  Craft the custom prompt for a NotebookLM infographic — the text that goes in the
  description box to control visual style, format, color, and focus. Use this skill
  whenever Tom asks to create an infographic, wants to know what to put in the NLM
  description box, or asks how to make infographics look more professional or unique.
  Works alongside the `notebooklm-infographic` skill, which handles the CLI mechanics.
  This skill handles the craft: what to write in the prompt.
---

# NotebookLM Infographic — Prompt Craft

The NLM infographic description box is where you control the result. Everyone has
access to the same built-in styles — custom prompts are what make outputs look unique
and professional.

---

## The Prompt Formula

```
Topic: [specific aspect of the notebook to focus on — omit to use all sources]
Style: [visual style]
Format: [layout type]
Color palette: [hex codes or named palette]
Key points: help me organize the information around these key ideas: [bullet list]
```

Not all fields are required every time. For a focused, clean result, pick Style +
Format + Color palette at minimum.

---

## Visual Styles

**Built-in NLM styles** (use `--style <name>` CLI flag — do NOT put these in the focus prompt text, it causes failures):
`auto_select`, `sketch_note`, `professional`, `bento_grid`, `editorial`, `instructional`,
`bricks`, `clay`, `anime`, `kawaii`, `scientific`

These map to the dropdown in the NLM web UI. Pass via CLI as e.g. `--style kawaii`. When using a built-in style, omit the `Style:` line from the focus prompt entirely — just use format, background, palette, and key points.

**Custom styles** (type these into the description box — these go beyond what the
dropdown offers and are less commonly used):
3D, minimalistic, modern corporate, bold and colorful, vintage retro, futuristic tech,
flat design, cartoon, luxury elegant, nature inspired, dark mode, playful pastel,
comic book hero, cyberpunk neon, sci-fi cinematic, explosion effect, vapor wave,
legendary quest

Custom styles are the differentiator — use them when the built-in options feel generic.

---

## Formats

Choose the format that fits the content's structure:

| Format | Best for |
|--------|----------|
| roadmap | sequential journey or progression |
| timeline | chronological events |
| step-by-step guide | numbered process with clear stages |
| checklist | actionable items to verify or complete |
| cheat sheet | dense reference, lots of items |
| comparison chart | two or more options side by side |
| process flow | cause → effect chains, decision logic |
| decision tree | branching yes/no logic |
| resource list | curated links, tools, or references |

---

## Color Palette

Specific hex codes produce better results than color names. Use **Coolors.co**:
1. Browse by hue or search for a palette that fits the mood
2. Copy the hex codes (e.g. `#2563eb`, `#f59e0b`)
3. Paste them directly into the prompt

Example: `Color palette: #1e3a5f, #f0a500, #ffffff`

---

## Detail Level

Prefer **concise** — least text, strongest visual clarity. Standard is the NLM default.
Use detailed only for complex multi-part content where density is the point.

In the CLI: pass `--detail concise` (or `standard`, `detailed`).
In the UI: set the "level of details" slider before generating.

---

## Source Isolation

To generate an infographic about one specific thing rather than the whole notebook:

**Option A — Select a single source:**
In the NLM Studio panel, deselect all sources except the one you want before generating.

**Option B — Create a custom note:**
1. In the NLM chat, research or summarize the specific topic you want
2. Take a section of the output and click "Save to note"
3. Convert the note to a source (it becomes editable text you control)
4. Deselect all other sources
5. Generate the infographic from that note alone

Option B gives the most control — the source content is exactly what you wrote.

---

## Example Prompt

```
Style: cyberpunk neon
Format: step-by-step guide
Color palette: #0ff0fc, #ff2d78, #1a0030
Key points: help me organize the information around these five ideas:
- The upload isn't the finish line — what happens next determines reach
- SEO surfaces: file name, title, description, hashtags, tags
- The waiting window: private for 2–24 hours before going public
- Thumbnails: three variants, A/B test, use successful competitors as visual reference
- Engagement signals: support account, comment replies, Shorts cross-linking
```

---

## Relationship to the CLI Skill

This skill covers what to put in the description box. For the actual command to generate
and download the infographic, see the `notebooklm-infographic` skill:
- `nlm infographic create <notebook-id> --confirm`
- `--orientation`, `--detail`, `--focus` options
- Status polling and download steps
