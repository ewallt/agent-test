---
name: tcc-restore
description: Restore working state after a macOS TCC permissions fix. Use when Tom says "permissions restored" or "I'm back" after a TCC block. Reads ~/.claude/workaround/state.md and rebuilds working context — verifying workaround files, writing pending files, updating session log, and clearing the workaround state.
---

# TCC Restore

Use this skill after Tom has applied the Full Disk Access fix and relaunched Terminal. It reads the serialized state from `~/.claude/workaround/state.md` and restores working context.

---

## Step 1 — Verify access is restored

```bash
ls /Users/tom/Documents/agent-test/
```

If this succeeds → proceed. If still blocked → tell Tom the fix didn't take and to try again.

---

## Step 2 — Read the state file

```
Read ~/.claude/workaround/state.md
```

Parse all five sections: active task, files written via workaround, files still pending, pending actions, context notes.

---

## Step 3 — Verify workaround files

For each file listed under "Files Written via Workaround":
- Confirm it exists at the stated path
- If it needs to be merged into an existing file: read both, merge, write the result
- If it's standalone: confirm contents look correct

Report any that are missing or look wrong.

---

## Step 4 — Write pending files

For each file listed under "Files Still Pending":
- Write the file with the content described
- Mark it done as you go

---

## Step 5 — Restore task.md

If a task was in progress:
- Write (or update) `task.md` at the stated location
- Mark completed steps, reflect current state

---

## Step 6 — Write session log entry

Append a proper entry to `/Users/tom/Documents/agent-test/memory/session-log.md` covering:
- What was accomplished before the TCC block hit
- What was done via workaround
- What was restored in this session
- Any decisions or context worth preserving

---

## Step 7 — Clear workaround state

Once all steps are complete and verified:
```bash
rm ~/.claude/workaround/state.md
```

Or if Tom prefers to keep it as a record, move it to `~/.claude/workaround/archive/YYYY-MM-DD-state.md`.

---

## Step 8 — Resume

Tell Tom:
- What was restored
- What's ready to continue
- Pick up from the pending actions list where the session left off
