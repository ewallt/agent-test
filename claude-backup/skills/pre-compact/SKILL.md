---
name: pre-compact
description: Pre-compaction step. Writes a session log entry while context is fresh, writes a handoff note capturing what to resume next, then tells Tom to run /compact. Always run this before /compact to preserve session history.
---

# Pre-Compact

## Step 1 — Write handoff note

Overwrite `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\handoff.md` with a short note (10–20 lines) capturing exactly where things stand right now.

The handoff is not a milestone log — that's what the session log is for. Its only job is to answer: "what were we just doing, and what's the immediate next step?"

Write it completely fresh each time (overwrite, don't append). Include:
- What was the last task being worked on
- Where it stands (e.g. "source written, not yet uploaded", "video kicked off, waiting on NLM")
- The immediate next step
- Any IDs, file paths, or context needed to resume without re-deriving (artifact IDs, notebook IDs, source IDs, dashboard card titles)

Keep it terse. This is a handoff note, not a report.

## Step 2 — Write session log entry

Write a session log entry for any work completed this session that hasn't been logged yet. Context will be lost after compaction — capture it now while it's fresh.

Use the `session-logger` skill. Synthesize from the conversation; don't ask Tom to narrate.

## Step 3 — Signal ready

Tell Tom: "Handoff and session log updated. Run `/compact` now, then run `/post-compact` to re-orient."
