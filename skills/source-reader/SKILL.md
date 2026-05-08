---
name: source-reader
description: Find and read NLM source docs matching a given criterion, ready to hand off to another skill. Use this whenever a criterion is provided and a set of source files needs to be located and loaded — e.g., "all Impressionism sources", "WW2 battle sources", "Geography Potpourri sources on water", "all Cassatt scenes". Also use when Tom names a topic and wants to build a layered reader web app from it.
---

# Source Reader

A utility skill. Its job is to fill source requests from other skills or from Tom directly. It takes a criterion, finds the matching set of source files, reads them, and surfaces them ready for use.

**Sources live at:** `C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\playlists\sources\`

## Step 1 — Interpret the criterion

The criterion can be anything: a playlist name, a theme, an artist, a keyword, a subject area, or a subset filter (e.g., "battles only"). It comes from the calling skill or from Tom.

Translate the criterion into a search strategy — filename glob, content search, or both:
- Filename patterns work well for series (e.g., `art-cassatt-*.md`, `ww2-*.md`)
- Content search (Grep) works better for themes that aren't reflected in filenames

## Step 2 — Find matching files

Run the search. Collect all candidate files.

**Confidence:**
- **Clear set** (the criterion maps cleanly to a set of files): proceed automatically
- **Ambiguous** (e.g., criterion could mean two different scopes): describe the options briefly and ask Tom to confirm which set before reading

## Step 3 — Read the matched files

Read all matched files. If the set is large (10+), confirm the count with Tom before reading.

## Step 4 — Surface the results

Report:
1. **Files matched** — list of filenames and count
2. **Content type** — prose-heavy, mixed, or metadata-heavy (see below)
3. **Ready signal** — content is loaded and available for the next skill

**Content type assessment** (matters for AI response quality in layered reader apps):
- **Prose-heavy**: narrative paragraphs dominate; metadata blocks (SETTING, SUBJECT, LIGHTING, etc.) minimal → good for AI responses
- **Mixed**: narrative plus scene metadata → note that the app should direct AI to use only narrative sections
- **Metadata-heavy**: mostly structured blocks, minimal prose → flag; AI response quality will be lower

Keep the report brief. Do not summarize file contents unless asked.
