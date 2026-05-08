---
name: byg
description: Session startup and context loader for the Behold Your God (BYG) project — a series of 10 animated illustration videos based on F.T. Wright's book, paired with a bundled web app. Use this skill whenever the handoff.md workflow is "Behold Your God", when Tom says we're working on BYG, when building or iterating on illustration videos, or when updating the web app or knowledge base. This skill loads everything Claude needs to orient and get to work: project definition, knowledge base, illustration status, and a map of which supporting skills to reach for when needed.
---

# Behold Your God — Session Context

## Step 1: Read the project definition

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\BYG\documents\project-definition.md`

This file contains:
- What the project is (video series + web app)
- The 10 illustrations and their current status
- Folder and naming conventions
- Step-by-step workflow for building a new illustration video
- Links to all related files

## Step 2: Read the knowledge base

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\BYG\documents\knowledge-base.md`

This is the content reference for the book *Behold Your God* by F.T. Wright — sourced from
NotebookLM notebooks. Use it to inform video scripts, doodle concepts, and quiz/flashcard
content for each illustration.

> If the file doesn't exist yet, it hasn't been built — note this and proceed without it.

## Step 3: Orient on current status

After reading both files, surface:
- Which illustrations are complete vs. not started
- The next illustration to build (lowest number not yet started)
- Any notes in `illustrations/{nn}-{slug}/notes.md` for that illustration

## Supporting skills — load on demand

Do NOT load these at session start. Reach for them only when the relevant task begins:

| Skill | When to use |
|-------|-------------|
| `gh-pages-deploy` | Deploying an MP4 or wrapper HTML to gh-pages |
| `remotion-narrated-slides` | Building or editing a Remotion composition in `simple-narrated-slides/` |
| `whiteboard-explainer` | If SVG doodle or animation design work is needed |

## Key file locations

| File | Purpose |
|------|---------|
| `Projects/BYG/documents/project-definition.md` | Project definition and workflow |
| `Projects/BYG/documents/knowledge-base.md` | Book content reference |
| `Projects/BYG/documents/byg-github-repos.md` | GitHub repo structure (byg, byg-dev, agent-test) |
| `Projects/BYG/illustrations/` | Per-illustration notes and status |
| `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html` | Bundled web app |
| `Projects/Remotion/simple-narrated-slides/src/` | Video source files (TSX) |
