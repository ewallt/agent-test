# Skill: Claude Manifest Writer

## What This Does
Generates a Slide-Ready Manifest directly — without NotebookLM — for use with the
Gemini Canvas slideshow prompt. Output is identical in format to manifests produced
by `skill-slideshow-manifest.md`, so Gemini Canvas consumes it the same way.

Use this when Tom wants a slideshow but has no NotebookLM notebook for the topic.
Tom delivers the manifest to Gemini Canvas with the opening: "the manifest is the
text I'm giving you right now" followed by the standard Gemini Canvas prompt.

---

## Step 1: Gather Requirements
Ask Tom:
- What is the topic?
- How many slides?

Wait for the answer before proceeding.

---

## Step 2: Design Thematic Segments
Design N thematic segments for the topic. Each segment must:
- Represent a unique thematic or chronological pillar of the topic
- Have no overlap with other segments (prevents repetitive image generation)
- Be coverable in two 50–60 word paragraphs
- Yield a specific, visual image subject

Think of this like designing focus angles for videos — each slide is a distinct angle
on the topic. Write out the thematic assignment internally before generating content.

---

## Step 3: Set Global Visual Style Tokens
Define era, film stock, lighting, and artistic medium appropriate for the topic.
These tokens are appended to every image prompt for visual consistency.

Examples by topic type:
- WW2 / early 20th century history: "1940s black-and-white press photography, high grain, high contrast, dramatic shadows, documentary realism, wartime photojournalism"
- Ancient / medieval history: "aged parchment texture, sepia tones, engraving style, dramatic chiaroscuro, Renaissance documentary illustration"
- Science / technology: "1960s Life Magazine photography, Kodachrome color, clean editorial lighting, documentary realism"
- Philosophy / ideas: "1950s academic photography, high contrast black and white, editorial portrait style, scholarly gravitas"

Match the visual era to the topic era where possible.

---

## Step 4: Write the Manifest
Output the manifest using skill-output.md rules — no preamble, no commentary,
manifest begins on the first line.

Follow this exact structure:

```
Global Visual Manifest

Era and style tokens to append to every image prompt: [global visual style tokens].

---

Slide Structure (N=[N])

Slide 1
Title: [3–7 words]
Paragraph A: [exactly 50–60 words, plain text, no markdown]
Paragraph B: [exactly 50–60 words, plain text, no markdown]
Image Context: [20–40 words describing the specific visual subject for this slide, with global style tokens appended]

Slide 2
[... continue for all N slides]
```

Constraints:
- Exactly 2 paragraphs per slide, 50–60 words each — count carefully
- Plain text only — no bold, italics, bullet points, or markdown inside paragraphs or titles
- Titles: 3–7 words
- Image Context: specific to the slide subject, not generic; always append global style tokens
- Include specific names, dates, and technical identifiers where relevant — no generic summaries

---

## Notes
- This skill produces the manifest only — Tom handles delivery to Gemini Canvas
- Output must be clean enough to copy and paste directly; use skill-output.md discipline
- If Tom wants to review the thematic assignment before full generation, offer to show it first
