---
name: session-logger
description: Write a mid-session log entry to the session log. Call this skill internally whenever notable work completes — a skill built or modified, a feature finished, a key decision made, a process change established, or a significant finding. Do not wait for shutdown. This is an internal skill, not user-invocable. Call it at natural milestones throughout the session to maintain the incremental session record.
---

# Session Logger

The session log is the authoritative record of what happened in a session. It's built incrementally as work completes — not reconstructed at shutdown. This skill writes one entry per notable milestone.

## When to write an entry

Write when something notable finishes:
- A skill is built, modified, or significantly discussed
- A feature or artifact is completed
- A key decision is made that a future session would need to know
- A process change or new standing rule is established
- A notable finding, failure, or retrospective insight
- A workflow or architecture change

Skip if: exploratory back-and-forth that led nowhere, routine tool calls with no lasting effect, or work that's still in progress.

## Step 1 — Get the current datetime

```bash
date +"%Y-%m-%d %H:%M"
```

## Step 2 — Compose the entry

```
## YYYY-MM-DD HH:MM — Short Topic Label

### Sub-topic
- What was done or decided
- Why it matters (if not obvious)

---
```

Keep entries factual and specific — the goal is that a future Claude reading this can reconstruct what happened without re-deriving it from the code or conversation. Synthesize from the conversation; don't ask Tom to narrate. One `###` heading per distinct sub-topic, 2–4 bullets each. Brief is fine for mid-session entries.

## Step 3 — Prepend to session-log.md

Read the file first to see the current header, then insert the new entry immediately after the header block, above any existing entries. Newest entries go first.

**File:** `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\session-log.md`

## Scope of this skill

This skill writes mid-session entries only. It does not handle:
- **Log rotation** — handled by shutdown Step 3 (triggers at 1,500 lines; old entries → `session-log-archive.md`)
- **End-of-session summary** — handled by shutdown Step 2
