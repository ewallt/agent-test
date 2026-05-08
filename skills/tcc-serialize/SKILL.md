---
name: tcc-serialize
description: Serialize current working state to ~/.claude/workaround/state.md when macOS TCC blocks access to the Documents folder. Use when Claude hits "Operation not permitted" on Documents and needs to preserve state until Tom can apply the FDA fix.
---

# TCC Serialize

Use this skill when the TCC bug strikes and Documents is inaccessible. It writes a state snapshot to `~/.claude/workaround/state.md` — a path always accessible regardless of TCC status.

---

## When to Trigger

- `ls`, `read`, or `write` on `/Users/tom/Documents/` returns "Operation not permitted"
- Claude needs to stop work and preserve context for recovery

Before serializing, confirm it's TCC (not a file flag):
```bash
chflags nouchg /Users/tom/Documents/agent-test
```
If that also fails with "Operation not permitted" → it's TCC. Proceed with serialization.

---

## What to Capture

Write `~/.claude/workaround/state.md` with these sections:

### 1. Session snapshot
- Date and time
- What was actively being worked on (task name, goal, current step)
- Where the task.md lives (or would live)

### 2. Files written via workaround
List any files Claude successfully wrote during this session using the Python new-file workaround (new file creation in Documents still works even when overwrites are blocked). For each:
- Full path
- What it contains (one sentence)
- Whether it needs to be merged into an existing file or stands alone

### 3. Files that still need to be written
Any files Claude was about to write but couldn't. For each:
- Full path
- What content should go there
- Whether it's a new file or an update to an existing one

### 4. Pending actions
Step-by-step list of what needs to happen once permissions are restored. Be specific enough that a cold-start session can pick up without re-deriving context.

### 5. Context notes
Anything a future session would need to know that isn't obvious from the above — decisions made, things deferred, gotchas.

---

## Python Workaround (new file creation still works)

If Claude needs to write *new* files to Documents before permissions are restored, use this pattern:

```python
import os
content = """<file content here>"""
path = "/Users/tom/Documents/agent-test/path/to/file.md"
os.makedirs(os.path.dirname(path), exist_ok=True)
with open(path, 'w') as f:
    f.write(content)
print("Written:", path)
```

**Limitation:** This only works for new files. Overwriting existing files still fails under TCC.

---

## State File Format

```markdown
# TCC Workaround State
Serialized: YYYY-MM-DD HH:MM

## Active Task
**What:** [task name and goal]
**Step reached:** [last completed step]
**task.md location:** [path, or "not yet written"]

## Files Written via Workaround
- `[path]` — [one-sentence description]; [new file / needs merge into existing]

## Files Still Pending
- `[path]` — [what goes there]; [new file / update to existing]

## Pending Actions (in order)
1. [first thing to do after permissions restored]
2. [next step]
...

## Context Notes
[anything a cold-start session needs to know]
```

---

## After Writing State

Tell Tom:
1. State has been serialized to `~/.claude/workaround/state.md`
2. The fix: System Settings → Privacy & Security → Full Disk Access → remove Terminal → re-add it → quit and relaunch Terminal
3. When he's back: say "permissions restored" and run the `tcc-restore` skill
