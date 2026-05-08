---
name: post-compact-playlists
description: Post-compaction re-orientation for the Playlists Notebook project. Reads the playlists-local handoff, session log, and working notes to restore context after /compact. Use this instead of /post-compact when working in the playlists project — it reads the correct local handoff, not the global memory one.
---

# Post-Compact — Playlists Notebook

Re-orientation after /compact. Reads playlists-specific files to restore context.

## Step 1 — Read local handoff

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\playlists\memory\handoff.md`

This is the authoritative "where were we?" for this project. If the file doesn't exist, say so and ask Tom what to work on.

## Step 2 — Read recent session log

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\session-log.md`

Use `limit: 60`. Restores recent work context.

## Step 3 — Read working notes

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\working-notes.md`

Contains active notebook IDs, CLI gotchas, and recent source/artifact IDs.

## Step 4 — Confirm ready

Lead with the handoff: what was being worked on and what comes next. Add any relevant session log context. Keep it to 3–5 sentences.
