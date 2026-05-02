---
name: notebooklm-source-prep
description: >
  Prepare and upload three source documents for a NotebookLM notebook: an Explorer+Quiz
  knowledge base, a Tabbed web app knowledge base, and a Gemini slide manifest. Use this
  skill whenever Tom says "prepare sources for a notebook", "write sources for X notebook",
  or "run source prep". Also trigger when a task file includes `source_prep: yes` or when
  a notebook run step calls for Claude-as-source content. Invoke proactively any time the
  workflow involves writing structured knowledge bases into a NotebookLM notebook.
---

## What This Skill Does

Writes three structured markdown source documents, then uploads them all to the notebook.
Each source document has a distinct purpose:

| Source | File path | Purpose |
|--------|-----------|---------|
| Explorer+Quiz KB | `artifacts/<key>/source-explorer-quiz.md` | Feeds the Explorer web app (focus angles) and quiz scope |
| Tabbed KB | `artifacts/<key>/source-tabbed.md` | Feeds the Tabbed web app (one tab per point) |
| Slide Manifest | `slideshows/<key>.md` | Feeds Gemini slide generation |

All paths are relative to `Projects/NotebookLM/ephemeral-notebook/`.

---

## Step 1 — Identify the Notebook

You need:
- **Notebook ID** — run `PYTHONIOENCODING=utf-8 nlm notebook list` if not already known
- **Key** — the short slug used for file naming (e.g., `phys-revolutions`, `chem-revolutions`)
- **Topic title** — the full display name of the notebook

If Tom says "Scientific Revolutions: Physics", the key is `phys-revolutions` and the title
is what goes in headings. If a task file is present, read it for `notebook_id` and `key`.

---

## Step 2 — Query the Notebook (run both in parallel)

Run two queries in the same turn — do not wait for one before starting the other:

```bash
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook query '<notebook-id>' 'Give me a comprehensive overview of the main topics, themes, and key figures covered in the sources.'"
```

```bash
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook query '<notebook-id>' 'What are the most important and memorable quotes or passages from the sources? For each, give me the quote, the speaker or author, and a brief note on its significance.'"
```

Use the results to write all three source documents. The query responses are authoritative —
they reflect what the sources actually contain. Do not invent content; ground everything in
what the notebook returned.

If either query is thin (few results, auth expired, etc.), run targeted follow-up queries
before writing. More queries are fine — there's no cost limit.

---

## Step 3 — Write the Explorer+Quiz Knowledge Base

**READ NOW before writing:** look at an existing example at
`artifacts/phys-revolutions/source-explorer-quiz.md` or `artifacts/chem-revolutions/source-explorer-quiz.md`
to calibrate length and density.

Save to: `artifacts/<key>/source-explorer-quiz.md`

### Format

```
# Knowledge Base: <Topic Title>
## Source for Explorer + Quiz Web App

---

## Focus Angles

ANGLE: <Short label>
KNOWLEDGE: <Dense paragraph — 5-8 sentences. Real names, dates, mechanisms. Specific, not generic.>

ANGLE: <Short label>
KNOWLEDGE: <...>

[Repeat for all focus angles — aim for 6-10 angles]

---

## Quiz Scope

Quiz questions should draw from: <comma-separated list of specific concepts, names, dates,
terms, and mechanisms the questions should cover. Be exhaustive — name the researchers,
experiments, results, and ideas. The more specific, the better the questions.>
```

### Writing guidance

- Each ANGLE label is a short noun phrase (3-6 words) — these become dropdown entries in the Explorer app
- Each KNOWLEDGE paragraph is dense and specific — like a briefing note, not a dictionary entry
- Name real figures: full names on first use (e.g., "Rudolf Clausius", not just "Clausius")
- Include dates where they anchor the story
- The Quiz Scope should name every testable concept from the sources — err on the side of too much

---

## Step 4 — Write the Tabbed Knowledge Base

**READ NOW before writing:** look at an existing example at
`artifacts/phys-revolutions/source-tabbed.md` or `artifacts/chem-revolutions/source-tabbed.md`
to calibrate tone and length.

Save to: `artifacts/<key>/source-tabbed.md`

### Format

```
# Knowledge Base: <Topic Title>
## Source for Tabbed Web App

---

TAB: <Tab label — short, punchy, 3-5 words>
QUOTE: "<Exact quote from the sources>"
— <Speaker/Author, Work or Context>
EXPLANATION: <2-4 sentences. What does this tab's theme mean? What's the key insight?
  Connect the quote to the broader argument. Concrete and specific.>

---

TAB: <...>
QUOTE: <...>
EXPLANATION: <...>

[Repeat — one tab per major theme. Typically 4-6 tabs.]
```

### Writing guidance

- Each tab captures one major theme or point from the notebook — not sub-points
- The quote should be authentic (from the query responses) and chosen because it crystallizes the tab's theme
- If no exact quote is available for a tab, use the closest relevant passage or paraphrase clearly
- Explanations are punchy and informative — not padded

---

## Step 5 — Write the Slide Manifest

**READ NOW:** `C:\Users\tomew\.claude\skills\notebooklm-slide-manifest\SKILL.md`

Follow that skill to write the 10-slide manifest. Save to: `slideshows/<key>.md`

Key points carried over here for reference:
- Default slide count: 10
- Each slide has Title, Paragraph A, Paragraph B, Image Context
- Global Visual Manifest is appended verbatim to every Image Context
- If no style is locked in, consult `gemini-slide-style` skill before writing

---

## Step 6 — Upload All Three Sources

Run these sequentially (each --wait ensures the upload completes before proceeding):

```bash
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source add '<notebook-id>' --file 'artifacts/<key>/source-explorer-quiz.md' --title '<Topic> Explorer+Quiz KB' --wait"
```

```bash
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source add '<notebook-id>' --file 'artifacts/<key>/source-tabbed.md' --title '<Topic> Tabbed KB' --wait"
```

```bash
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source add '<notebook-id>' --file 'slideshows/<key>.md' --title '<Topic> Slide Manifest' --wait"
```

**Important:** the notebook ID is a positional argument — do NOT use `--notebook-id`.
The correct syntax is `nlm source add <notebook-id> --file <path>`.

---

## Step 7 — Report

When all three uploads complete, report:

```
Sources uploaded to <notebook-id>:
- source-explorer-quiz: <source-id>
- source-tabbed: <source-id>
- slide-manifest: <source-id>

Files saved:
- artifacts/<key>/source-explorer-quiz.md
- artifacts/<key>/source-tabbed.md
- slideshows/<key>.md
```

If any upload fails, report the error and the source ID that failed. The other sources
that succeeded should still be reported.

---

## Notes

- Always run the two Step 2 queries in the same turn — this is the biggest time saver
- If the notebook has auth issues mid-session, tell Tom and wait for re-auth before retrying
- The `artifacts/<key>/` directory may need to be created: `mkdir -p artifacts/<key>/`
- Working directory for all paths: `C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\ephemeral-notebook\`
