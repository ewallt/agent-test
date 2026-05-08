---
name: living-task
description: >
  Maintain a task.md in the active project folder that tracks in-progress work continuously
  during a session — updated as steps complete, not just at the end. Use this for any
  multi-step task so state is preserved if compaction or a crash occurs mid-session.
  Trigger when starting a task with 3 or more steps, or any task that will span many
  tool calls.
---

# Living Task

Keep a `task.md` in the active project folder updated throughout the session.
Write it at the start of a task and update it as steps complete — do not wait until the end.

## File Location

Place `task.md` in the root of the active project folder (e.g. `agent-test/`, `gemini-test/`).
If there is no clear project folder, use the current working directory.

## Format

```
# Task: [short task name]
Date: YYYY-MM-DD

## Goal
One sentence — what this task accomplishes.

## Steps
- [x] Step one (done)
- [x] Step two (done)
- [ ] Step three (in progress)
- [ ] Step four (not started)

## Notes
Anything broken, deferred, decisions made, or context a future session needs.
```

## Rules

1. Write `task.md` before the first tool call on a multi-step task.
2. Mark each step `[x]` as soon as it completes — not in a batch at the end.
3. Keep Notes current — add decisions and blockers as they happen.
4. When the task is fully complete, either delete `task.md` or move it to a `completed/` folder.
5. One task at a time — if a new task starts before the old one finishes, note the interruption in Notes.
