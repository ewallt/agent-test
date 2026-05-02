---
name: post-compact
description: Post-compaction re-orientation. Re-reads overview, handoff note, session log, and memory index to restore context after /compact. Run this after /compact completes.
---

# Post-Compact

## Step 1 — Re-read overview

READ NOW: `C:\Users\tomew\Documents\agent-test\documents\overview.md`

Full project map. Restores the shape of all active work. When the overview points to a reference doc, read it — this is not a matter of judgment.

## Step 2 — Read handoff note

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\handoff.md`

This is a short note written just before compact capturing what was actively in progress and what the immediate next step is. Surface this to Tom as part of the orientation summary — it's the "where were we?" answer.

If the file doesn't exist yet, skip this step silently.

## Step 3 — Re-read session log (recent)

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\session-log.md`

Use `limit: 80`. Restores what was worked on before compact.

## Step 4 — Re-read memory index

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\MEMORY.md`

Standing facts, preferences, and project context.

## Step 5 — Confirm ready

Briefly confirm to Tom what was re-loaded. If a handoff exists, lead with it: what was being worked on and what comes next.
