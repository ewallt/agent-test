# Session Startup

## Core Facts
| Item | Value |
|------|-------|
| Working dir | `C:\Users\tomew\Documents\agent-test` |
| Account | ewalltom@gmail.com |

## Startup Behavior

Do NOT pre-load any workflow context at session start. Wait for Tom to indicate what we're working on, then load only what's relevant.

Tom will either:
- Say which workflow/project to work on
- Provide a handoff (description of what to pick up)
- Say "start the session" — in which case ask him what we're working on

Do not read session-log.md, pending.md, gotchas.md, or any workflow files until a workflow is identified.

---

## When a Workflow Is Identified

Load context on demand using the relevant case below.

### playlists

**IMPORTANT: Execute all steps in order. Do not tell Tom you're ready until all 6 gates are checked.**

**▶ Step 1** — Read `~/.claude/projects/C--Users-tomew-Documents-agent-test/memory/CONTEXT.md` for full context.
✓ GATE: Read? → Proceed to Step 2.

**▶ Step 2** — Read `~/.claude/projects/C--Users-tomew-Documents-agent-test/memory/pending.md` for outstanding items. If any marked IMPORTANT, surface them to Tom immediately.
✓ GATE: Read? Any IMPORTANT items surfaced? → Proceed to Step 3.

**▶ Step 3** — Read `~/.claude/projects/C--Users-tomew-Documents-agent-test/memory/session-log.md` — scan the most recent entry to understand what was last worked on.
✓ GATE: Read? → Proceed to Step 4.

**▶ Step 4** — Read `~/.claude/projects/C--Users-tomew-Documents-agent-test/memory/gotchas.md` — shell behavior and known pitfalls.
✓ GATE: Read? → Proceed to Step 5.

**▶ Step 5** — Check `playlists/tasks/`. If task files are present, begin processing immediately.
✓ GATE: Tasks checked? → Tell Tom you're ready.

*Tool: `notebooklm-mcp-cli` v0.3.2 — full path `C:\Users\tomew\.local\bin\nlm.exe`*

---

### Behold Your God

Invoke the `byg` skill — it handles everything:
```
Use skill: byg
```
The skill reads the project definition, knowledge base, and illustration status, then tells
you which supporting skills to reach for when needed. Do not pre-load any Remotion context
unless the skill directs you to.

---

### remotion (any of the three Remotion projects)

1. Read `memory/remotion-context.md` for project list, ports, key facts
2. Read `session-log.md` — scan most recent entry
3. Read `pending.md` for outstanding items
4. Check which studios are already running (they persist across sessions):
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3002
   ```
   Start only the ones that return non-200:
   ```bash
   cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/bar-chart-race" && npm start &
   cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/simple-narrated-slides" && npm start &
   cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/whiteboard-explainer" && npm start &
   ```

For whiteboard-explainer specifically, also read:
- `Projects/Remotion/whiteboard-explainer/documents/context.md`
- `Projects/Remotion/whiteboard-explainer/documents/planning.md`
- `memory/whiteboard-explainer-gotchas.md`

---

### infrastructure / general

1. Read `session-log.md` — scan most recent entry
2. Read `pending.md` for outstanding items
3. Load any additional context specific to the task at hand

---

## Skills-First Directive

All work should be handled by means of skills. This is the governing principle for session behavior.

- **Before starting any established workflow** (notebooks, BYG, Remotion, etc.) — invoke the relevant master skill via the Skill tool. Do not execute commands directly from memory or reference documents.
- **Before executing any repeatable task without a skill** — ask Tom: "This looks like something we'll do again — should I build a skill for it first?" Don't block if Tom says just do it, but always ask.
- Skills manage the *how*. Reference documents carry the *what*. Bypassing skills leads to drift.

See `feedback_skills_first.md` for full details.

---

## Cross-Session Goals
1. **Permission prompts** — tracking what triggers permission prompts. See `playlists/design/permission-prompt-log.md`.
2. **JIT anti-drift** — tracking JIT instruction delivery effectiveness. See `playlists/design/JIT-experiment.md`.

## Bash Permissions
- Granted once by Tom and carry over across sessions
- If Claude asks again in a new session, re-grant and it will persist

## Session Log
- `session-log.md` — records changes to workflow, memory, and skills (not notebook builds)
- Update proactively after any significant change — do not wait to be asked
- Update `pending.md` at the same time
- Both files should be current before ending a session

## Resuming Sessions
- Session files: `~/.claude/projects/C--Users-tomew-Documents-agent-test/<session-id>.jsonl`
- Resume: `claude --resume <session-id>`
