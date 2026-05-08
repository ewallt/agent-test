---
name: project-restructure
description: Restructure a project's documentation to follow the 3-tier hierarchy (overview.md → project-definition.md → skills/reference docs). Use this skill when Tom asks to restructure a project, says "do the next project", or when working through the documentation hierarchy refactor across all projects in agent-test.
---

# Project Restructure

Restructures a project's documentation to follow the 3-tier hierarchy:

- **Level 1 — overview.md**: One-line pointer to the project. Nothing else.
- **Level 2 — project-definition.md**: One sentence describing the project + project-wide tracking (status tables, inventory lists) + pointers to level-3 skills and reference docs. No detail that belongs to a specific skill.
- **Level 3 — skills and reference docs**: The actual detail. Skills have their own SKILL.md in `~/.claude/skills/`. A skill stub file lives in the project's `skills/` subfolder (e.g. `Projects/GiC/skills/gic-integration.md`) — a short description + pointer to `~/.claude/skills/`. Reference docs are siblings in `documents/`, shared across skills in the same project.

## Step 1 — Read the current project-definition.md

Read the file. Identify what's in it before doing anything else.

## Step 2 — Sort the content

Classify each section:

| Content type | Goes to |
|---|---|
| What the project is (one sentence) | Keep at level 2 |
| Project-wide tracking (status tables, inventory) | Keep at level 2 |
| Pointers to skills and reference docs | Keep at level 2 |
| Workflow steps / how-to instructions | Level 3 (skill) |
| Technical detail or reference | Level 3 (reference doc) |
| Naming conventions | Level 3 (reference doc or skill) |
| "Out of scope" / "What this is not" | Drop |
| Per-item inventory with brief detail (e.g. Gems list) | Keep at level 2 — each item gets one line + pointer to its level-3 folder |

## Step 3 — Check level 3

Before rewriting, confirm that any content being moved down already has a home at level 3. If it doesn't, note it — don't silently drop content. Ask Tom where it should go if unclear.

## Step 4 — Rewrite project-definition.md

Write the slim version: one sentence + project-wide tracking + pointers. If content is being dropped or moved, tell Tom briefly before writing.

## Step 5 — Confirm

Tell Tom the project is done and suggest the next one.
