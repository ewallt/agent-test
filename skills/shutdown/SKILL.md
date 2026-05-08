---
name: shutdown
description: Clean session shutdown for the agent-test project. Use when Tom invokes /shutdown. Closes the session in a strict 8-step sequence: handoff discussion → session log → log rotation → pending update → tasks.json → verify MEMORY.md → git commit → done message.
---

# Shutdown Skill

Use this skill when Tom invokes `/shutdown` to end a session cleanly.

**IMPORTANT: Execute steps in strict order. Do not read ahead. Complete each step fully and confirm the ✓ gate before moving to the next.**

---

## ▶ STEP 1 — Handoff Discussion

First, briefly summarise what the handoff will cover — the main topics worked on this session — so Tom knows what's going in. Then ask:

> **Working on the handoff now. Based on this session, I'll be documenting: [brief list of main topics].**
>
> Four quick questions before I write it:
>
> 1. What's the priority for next session?
> 2. Anything blocked or unresolved I should flag?
> 3. Anything you want to add or change before I write it up?
> 4. What workflow should I set for next session? (e.g. Behold Your God, ephemeral-notebook, remotion, infrastructure, or none)

Wait for Tom's answers. If the workflow is **ephemeral-notebook**, read the run log (`Projects/NotebookLM/ephemeral-notebook/run-log.md`) now and confirm every completed run from this session is captured in "What Was Done This Session" — the run log is authoritative. Then **draft** the handoff — specifically the "Next Session Priority" and "Session Start" sections — and show them to Tom before writing the file:

> **Here's what I have for next session:**
>
> **Next Session Priority:**
> [draft of priority section]
>
> **Session Start:**
> READ NOW: `startup.md`
> Workflow: [workflow name, or none]
> [Optional message, or omit]
>
> Does this look right?

Wait for Tom to confirm (or correct). Then write `documents/handoff.md` using this format:

```markdown
# Session Handoff — [today's date YYYY-MM-DD]

## What Was Done This Session

[Sections summarizing what was built/changed this session. Synthesize from the conversation — one heading per major topic, bullet points under each. Be specific: file names, decisions made, problems solved.]

---

## State Right Now

[2–4 bullets on the current state of the repo/servers/anything notable Tom mentioned.]

## Next Session Priority

[Tom's confirmed answer to Q1 — write it as a clear directive. Be specific: what exactly will be worked on, what the goal is, what "done" looks like for the session.]

## Other Items

[Tom's answer to Q2 and Q3, plus any other queued items from pending.md worth surfacing.]

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: [Tom's answer to Q4]

[Optional message from Tom, or omit if none.]
```

**✓ GATE: handoff.md written and Tom has confirmed the next session priority? → Proceed to Step 2.**

---

## ▶ STEP 2 — Session Log Entry

Write a new entry at the **top** of `memory/session-log.md` (just below the file header, before any existing entries). Do this now — do not defer it.

Format:
```markdown
## [today's date YYYY-MM-DD] — [Short Title Summarizing the Session]

### [Topic 1]
- bullet
- bullet

### [Topic 2]
- bullet

---
```

Rules:
- Synthesize from the conversation — do not ask Tom
- Match the style and detail level of existing entries
- One heading per major topic worked on
- Specific: file names, patterns established, decisions made
- End the entry with `---` to separate from the next entry

**✓ GATE: Session log entry prepended to memory/session-log.md? → Proceed to Step 3.**

---

## ▶ STEP 3 — Log Rotation (if needed)

Check the line count of `memory/session-log.md`. If it exceeds 1,500 lines:

1. Read the full file
2. Identify all entries with a date heading older than 30 days from today
3. Append those entries (with their `---` separators) to `memory/session-log-archive.md` — prepend to existing content if the file exists, create it if not
4. Rewrite `session-log.md` keeping only the header block and entries from the last 30 days

If under 1,500 lines: skip this step.

**✓ GATE: Rotation checked (and performed if needed)? → Proceed to Step 4.**

---

## ▶ STEP 4 — Pending Update

Edit `memory/pending.md`:
- Mark any items completed this session with `[x]`
- Add any new pending items discovered this session
- Remove items that are clearly obsolete (only if certain)

**✓ GATE: pending.md updated? → Proceed to Step 5.**

---

## ▶ STEP 5 — Ticket Update

Edit `tools/tasks.json`:
- Set `"status": "done"` for any tasks finished this session
- Set `"status": "in-progress"` for any tasks started but not finished
- Set `"status": "blocked"` for anything waiting on an external dependency
- Add new task objects for any new work items surfaced this session
- Do not remove existing tasks — only update status or append new ones

Valid statuses: `pending` · `in-progress` · `done` · `blocked`

**✓ GATE: tasks.json updated? → Proceed to Step 6.**

---

## ▶ STEP 6 — Verify MEMORY.md Startup Instruction

Read the first 5 lines of `memory/MEMORY.md`. Confirm that the following instruction appears at or near the top:

> **IMPORTANT: At the start of every session, invoke the `startup` skill.**

If it is present: proceed.
If it is missing: prepend it to the top of the file (below the `# Project Memory` heading) before continuing.

**✓ GATE: Startup instruction confirmed in MEMORY.md? → Proceed to Step 7.**

---

## ▶ STEP 7 — Git Commit

From the `agent-test` root directory (on `dev` branch):

```bash
cd /c/Users/tomew/Documents/agent-test
git add -A
git status
```

Review what's staged, then commit with a message summarizing the session:

```bash
git commit -m "shutdown: [brief session summary]"
git push origin dev main
```

**✓ GATE: Committed to dev and pushed to GitHub? → Proceed to Step 8.**

---

## ▶ STEP 8 — Done

Output a single short confirmation:

```
Session closed. Committed to dev and pushed to GitHub. [one sentence summary of what was saved]
```

Do not add any further commentary.
