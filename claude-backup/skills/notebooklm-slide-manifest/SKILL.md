---
name: notebooklm-slide-manifest
description: >
  Generate the Gemini slide manifest for a NotebookLM notebook topic. Use this skill whenever
  a NotebookLM run includes `slideshow: yes`, or when Tom asks to generate slide content for
  Gemini slide generation. The manifest is a structured markdown file written by Claude, then
  uploaded as a source into the notebook — Gemini reads the notebook sources and builds slides
  from the manifest. This is distinct from the NLM-native slide deck PDF produced by
  `nlm slides create` (see notebooklm-slide skill). Trigger any time slide manifest content
  is needed.
---

## Read First

This skill is self-contained. No separate document required — all guidance is below.

---

## What This Is

The Gemini slide manifest is a structured markdown file written by Claude, then uploaded as
a **source** into the NotebookLM notebook. Gemini can read notebook sources and uses the
manifest to build slides.

**Workflow:**
1. Claude writes the manifest (structured markdown)
2. Manifest is uploaded to the notebook as a source (`nlm source add <notebook-id> --file <manifest.md>`)
3. Gemini reads the notebook sources and generates slides from the manifest

This is NOT the same as `nlm slides create`, which generates a NLM-native PDF deck from
all sources. That's a separate artifact — see the `notebooklm-slide` skill.
Both can coexist in a run: the manifest drives Gemini slide generation, and
`nlm slides create` produces a bonus shareable PDF.

**Origin note:** In the Drinker Paradox run (2026-03-09), `nlm slides create` accidentally
produced excellent NLM-native slides before the manifest was uploaded. Those were kept as a
happy bonus. The manifest is still the primary slide artifact — it gives Claude control over
content, structure, and visual style.

## Output File

Save to: `Projects/NotebookLM/ephemeral-notebook/slideshows/<key>.md`

Then upload to the notebook:
```bash
PYTHONIOENCODING=utf-8 nlm source add <notebook-id> --file slideshows/<key>.md --title "<Topic> Slide Manifest" --wait
```

## Manifest Format

The manifest has two parts: a Global Visual Manifest and the slide structure.

```markdown
# Slide-Ready Manifest: [Topic Title]

---

### Global Visual Manifest
[style token block — single line, comma-separated, no label]

---

### Slide Structure (N=10)

**1. Slide 1: [Short Thematic Label]**
*   **Title:** [Slide title — one punchy line]
*   **Paragraph A:** [First paragraph — 3-5 sentences, substantive content]
*   **Paragraph B:** [Second paragraph — 3-5 sentences, develops or completes the idea]
*   **Image Context:** [Scene description for Imagen]. [global visual manifest appended verbatim]

---

**2. Slide 2: ...**
```

Each slide separator is `---` on its own line.

## Writing the Slides

### Slide count
Default is whatever Tom specifies in the task file (typically 10). If not specified, use 10.

### Content arc
Structure the slides as a narrative journey through the topic — not a flat list of facts.
A good 10-slide arc typically looks like:
1. Hook — the surprising or counterintuitive claim
2. Formal statement — precise definition or notation
3–7. Core mechanism — proof, explanation, key concepts (one per slide)
8. Deeper implication — what this reveals beyond the surface claim
9. Human context — the person, history, or real-world relevance
10. Takeaway — what the audience should carry away

Adjust the arc to fit the topic. The goal is that reading the slides in order tells a coherent story.

### Paragraph content
- Paragraph A sets up the idea; Paragraph B develops or completes it
- Each paragraph should be 3–5 sentences of substantive, specific content
- Use real names, dates, technical terms, and precise language
- Write at the level of an educated non-specialist — clear but not dumbed down
- Do not repeat the same content across slides; each slide should add something new

### Image Context
- Write a specific, visual scene description for each slide
- The scene should be thematically connected to the slide content
- End with the Global Visual Manifest appended verbatim — this is what Gemini/Imagen uses
- Keep the scene description to 1-3 sentences before the manifest

### Global Visual Manifest
Use the style locked in from the task file or agreed with Tom. If none is specified, consult
the `gemini-slide-style` skill to propose options and confirm before writing.

The manifest token block is appended identically to every slide's Image Context. Copy it
exactly — no variation between slides.

## Handing Off to Gemini

Once the manifest is uploaded as a source, Tom takes it to Gemini for slide generation.
The Gemini prompt that instructs Gemini how to build the HTML slideshow is stored at:

```
Projects/NotebookLM/ephemeral-notebook/slideshows/gemini-slide-prompt.md
```

When Tom is ready to hand off, read that file and provide its full contents so Tom can paste
it into Gemini alongside the notebook. The prompt includes the complete reference HTML
implementation (16/9 grid layout, `loadImagesSequentially`, `copyPart(1)`/`copyPart(2)`
mechanism, Imagen 4.0 API integration).

---

## Relationship to Other Skills

- `gemini-slide-style` — use this to select or engineer the Global Visual Manifest token block
- `notebooklm-video` — separate skill for the video focus prompt
- `notebooklm-webapp` — separate skill for the web app artifact
- `notebooklm-slide` — separate skill for the NLM-native slide deck PDF (`nlm slides create`)
- `notebooklm-infographic` — separate skill for the NLM-native infographic PNG
