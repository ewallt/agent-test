---
name: layered-reader-builder
description: Build and deploy a Layered Reader web app from NLM source docs. Use when Tom asks to build a layered reader, build an app for a topic/playlist, or create an augmented chat app from source docs — e.g. "build a layered reader for Impressionism", "make an app for the WW2 sources", "build the GP layered reader". Calls source-reader to load sources if not already loaded, then builds and deploys the single-file HTML app.
---

# Layered Reader Builder

Builds a Layered Reader web app from source docs loaded by source-reader, then deploys it via gh-pages-deploy.

## Step 1 — Confirm sources are loaded

If source-reader has already run this session and sources are in context, proceed.

If not: invoke the `source-reader` skill now with the criterion Tom provided. Wait for it to complete before continuing.

## Step 2 — Determine topic title and output filename

From the loaded sources, infer:
- **Topic title** — the human-readable name for the app header (e.g. "Movements in Modern Art", "Geography Potpourri", "World War Two")
- **Output filename** — kebab-case, prefixed with `layered-reader-` (e.g. `layered-reader-impressionism.html`, `layered-reader-ww2-battles.html`)

If ambiguous, propose a title and filename and ask Tom to confirm before building.

## Step 3 — Read the build specs

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\prompts\layered-reader-gic-multi-source.md`

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\documents\layered-reader.md`

These two files are the authoritative build spec. Follow them exactly. The construction prompt defines the layout, tech stack, GiC instruction block, engagement menu, and behavior. The layered-reader.md spec covers modes, gotchas, and CDN limitations.

**Reference implementation:** `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\apps\layered-reader-impressionism.html`

If any detail is unclear, check the reference implementation before asking Tom.

## Step 4 — Build the HTML app

Build the single-file HTML app following the specs from Step 3.

Populate `contentData` from the loaded sources:
- One entry per scene or section
- Use narrative prose as the primary content
- Render metadata blocks (SETTING, SUBJECT, LIGHTING, etc.) as styled asides — left border, smaller font, muted color — visually distinct from the prose
- If the source is metadata-heavy (flagged by source-reader), note this to Tom; the app will still build but AI response quality in GiC mode may be lower

**Engagement menu — tailor to the subject, do not use the generic template.**
Design 3 groups of 3 lenses specific to the playlist topic. Each lens should be a specific angle a knowledgeable reader would actually want — not generic prompts like "explain it simply" or "compare/contrast". Model on the impressionism app's lenses ("The central obsession", "What they were fighting", "What critics got wrong") — vivid, subject-specific, earned by the content. Propose the 9 lenses to Tom before building and wait for approval.

**Include a version meta tag** in `<head>`:
```html
<meta name="app-version" content="[filename] v1.0 [YYYY-MM-DD]">
```
This lets Claude in Chrome confirm which build is loaded via `document.querySelector('meta[name="app-version"]').content`.

**Active lens must be exposed in the DOM for reading agents.**
- Add a `useEffect` that writes to `#ai-control-plane` (sr-only div) whenever `activeMode` changes: `"Current Active Lens: [name]. Respond to the current section using this lens."` — or `"No lens active."` when null.
- Add `aria-pressed={activeMode === opt}` to each lens button.
- The sr-only instruction block inside the article must also include `Current Active Lens: "[name]"` dynamically (not just in the control plane).
- All instruction text must be agent-agnostic — say "AI Reading Agent Instructions", not "For Gemini in Chrome". Footer status text likewise: "Lens active — select content and invoke your AI reading agent", not "type go in Gemini".

## Step 5 — Save the file

Save to: `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\apps\[filename].html`

## Step 6 — Deploy

Invoke the `gh-pages-deploy` skill to deploy the file. Target folder: `notebooklm/`, subfolder: the filename without extension (e.g. `notebooklm/layered-reader-impressionism/`).

Report the live URL when done.
