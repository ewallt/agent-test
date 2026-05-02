# Skill: Slideshow Manifest Generation

## What This Does
Generates a Slide-Ready Manifest for Gemini Canvas — a structured document that produces
an HTML picture book slideshow with fixed 16:9 layout, 50/50 text/image split, LIFE Magazine aesthetic.

Claude writes the manifest directly by WebFetching the notebook's source URLs. It is added to
the notebook as a `pasted_text` source so Gemini can read it via its NotebookLM integration.

This skill is called by workflow-playlists.md when `slideshow: yes` is set in the task file.

---

## Output
The manifest is added back to the notebook as a source. Gemini connects to NotebookLM notebooks but can only see sources (not artifacts/reports) — so the manifest must live as a source for Gemini Canvas to use it.

---

## Step 1: Determine Slide Count
Read `slides` from the JSON. If omitted, default to 5.

---

## Step 2: Design Thematic Segments
Design N thematic segments for the topic. Each segment must:
- Represent a unique thematic or chronological pillar of the topic
- Have no overlap with other segments (to prevent repetitive image generation)
- Be coverable in two 50–60 word paragraphs
- Yield a specific, visual image subject

Think of this like designing focus angles for videos — each slide is a distinct angle
on the topic. Write out the thematic assignment before generating the prompt.

---

## Step 3: Set Global Visual Style Tokens
Define the era, film stock, lighting, and artistic medium appropriate for the topic.
These tokens are appended to every image prompt for visual consistency.

Examples by topic type:
- WW2 / early 20th century history: "1940s black-and-white press photography, high grain, high contrast, dramatic shadows, documentary realism, wartime photojournalism"
- Ancient / medieval history: "aged parchment texture, sepia tones, engraving style, dramatic chiaroscuro, Renaissance documentary illustration"
- Science / technology: "1960s Life Magazine photography, Kodachrome color, clean editorial lighting, documentary realism"
- Philosophy / ideas: "1950s academic photography, high contrast black and white, editorial portrait style, scholarly gravitas"

Match the visual era to the topic era where possible.

---

## Step 4: Read Sources and Write the Manifest
Run `nlm source list` to get source URLs. WebFetch the top sources to ground the manifest content.
WebFetch source URLs directly for grounding.

Claude writes the manifest directly — no NotebookLM generation needed.

Write the manifest using this structure:

```
Slide-Ready Manifest: [Topic]

---

Global Visual Manifest

Era and style tokens to append to every image prompt: [global visual style tokens].

---

Slide 1: [Title]
Paragraph A: [50–60 words, plain text, no markdown]
Paragraph B: [50–60 words, plain text, no markdown]
Image Context: [20–40 words describing specific visual subject]

Slide 2: [Title]
...

[repeat for all N slides]
```

Constraints:
- Exactly 2 paragraphs per slide, 50–60 words each
- Plain text only — no bold, italics, bullet points, or markdown inside paragraphs
- Specific names, dates, and technical identifiers must appear where relevant
- Titles must be 3–7 words
- Image Context must be specific to the slide subject, not generic

---

## Step 5: Add as Source via .ps1 Script
Write the manifest to a temp `.ps1` script and run it. The `--text` flag adds it as
a `pasted_text` source directly — no file on disk.

Create `Projects/NotebookLM/playlists/tmp-source-add.ps1`:
```powershell
$env:PYTHONIOENCODING = 'utf-8'
$manifest = @"
[manifest content here]
"@
& 'C:\Users\tomew\.local\bin\nlm.exe' source add <NOTEBOOK_ID> --text $manifest --title 'Slide-Ready Manifest: <topic>' --wait
```

Run:
```
powershell -File 'C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\playlists\tmp-source-add.ps1'
```

Capture the source ID from the output. Then delete the temp file:
```
powershell -Command "Remove-Item 'C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\playlists\tmp-source-add.ps1'"
```

The manifest is now a `pasted_text` source in the notebook — visible to Gemini when it connects.

---

## Step 6: Save Manifest to Disk

Save the manifest as a permanent file at:
`Projects/NotebookLM/playlists/artifacts/<topic-slug>/manifest.md`

This gives Tom a local copy to deliver to Gemini Canvas and ties the manifest to its notebook's artifact folder.

---

## Step 7: Report to Tom
Include in the handoff report:
- Source ID of the manifest (pasted_text)
- Slide count and thematic assignment used
- Global visual style tokens used

---

## Notes
- Claude writes the manifest directly — no `nlm report create` needed for slideshow
- `source add --text` adds content as a `pasted_text` source; `--wait` blocks until indexed
- Inline syntax `nlm source add <notebook-id> --text '<text>' --title '<title>'` works for single-line content (confirmed 2026-03-05)
- Always use a `.ps1` script for multi-line `--text` content (here-string syntax); inline PowerShell -Command breaks on multi-line strings
- Notebook ID is a positional argument (not `--notebook-id`) for `source add --text`
- `slideshow: yes` in the JSON triggers this skill; `slides: N` sets the slide count
- The manifest must be a **source** (not an artifact) for Gemini to see it when connecting to the notebook
- `download report` is broken (URL field empty) — the .ps1 / `source add --text` approach supersedes it entirely
