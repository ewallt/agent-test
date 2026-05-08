---
name: project-report
description: Writes a plain-English project report to agent-test/PROJECT-REPORT.md. The report is for Tom — focused on mental model (what the pieces are and how they fit together), not technical details. Invoke when Tom asks for a project report, write-up, or overview document.
---

# Project Report Skill

## Purpose
Write a clear, readable document that gives Tom a solid mental model of the project —
what the pieces are, what role each plays, and how they connect. Not a technical
reference. Not code. Prose that a thoughtful non-developer could follow, while still
being accurate enough to be useful to Tom when he returns to the project.

## Output
Write the report to: `C:\Users\tomew\Documents\agent-test\PROJECT-REPORT.md`
Overwrite if it already exists.

## Before Writing
Read these files to get current state (do not skip — the report must reflect reality):
- `agent-test/start-studio.js`
- `agent-test/render.js`
- `model-collapse/src/Root.tsx`
- `model-collapse/src/BattleOfAtlantic.tsx`
- `model-collapse/src/Britain1940.tsx`
- `model-collapse/src/atlantic-durations.ts`
- `model-collapse/src/slide-durations.ts`
- `model-collapse/scripts/generate-atlantic-audio.mjs`

## What to Cover

### 1. What this project is
A short paragraph. What kind of thing does it produce? What is the subject matter
so far? What is it built with, in plain terms?

### 2. The two main tools and what they each do
Remotion and ElevenLabs. Explain each in a sentence or two — what problem it solves,
how Tom interacts with it (or doesn't). No API details.

### 3. The folder structure — conceptual, not exhaustive
Not a file tree. A short description of what lives where and why.
Cover: the launcher scripts at the root, the project folder (model-collapse),
src vs scripts vs public, what each area contains and why.

### 4. The compositions
What a "composition" is in this context. What compositions currently exist, what
each one is about, and how they differ from each other (per-slide vs per-bullet audio).

### 5. The pipeline — from nothing to finished video
Walk through the steps in plain English. What happens first, what depends on what,
what Tom does manually vs what happens automatically. The key insight here is the
dependency chain: code → audio → durations → render.

### 6. The dev server vs the render
Explain the difference between previewing in the browser and actually producing an MP4.
Why both exist, when Tom uses each.

### 7. The launcher scripts
What `start-studio.js`, `render.js`, and `start-remotion.bat` do. Why they exist
(instead of just running commands directly). Mention the FOLDER constant.

### 8. The audio generation scripts
What they do, why they exist as separate scripts, what Tom needs to supply (API key),
what they produce automatically. Mention that durations are measured and written back.

### 9. The timing system — conceptual only
The core idea: the video knows exactly how long each audio clip is, and uses that
to decide when to show each bullet. No formulas. Just the concept and why it matters
(no drift between what's spoken and what's shown).

### 10. What's still rough / known limitations
Be honest. Things that are not yet automated, things that need manual steps,
anything that's a known gap. Currently: Britain1940 uses the older per-slide
architecture; the B3 build indicator is still present in both compositions;
no single-command full pipeline script yet.

## Tone and Style
- Plain English. No code blocks. No jargon without a one-phrase explanation.
- Markdown headers and short paragraphs — readable, not dense.
- Confident and direct. This is a write-up, not a tutorial.
- Length: as long as it needs to be to cover the above clearly. Probably 600–900 words.
- End with a short "Current state" paragraph — what exists and works today,
  and what the obvious next steps are.
