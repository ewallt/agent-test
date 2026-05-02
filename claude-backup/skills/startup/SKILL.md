---
name: startup
description: Session startup for the agent-test project. Invoke this at the very start of every session to orient and load context. Use whenever a new session begins, when Tom says "start the session", "load context", or "what are we working on" — and always before doing anything else in a fresh session.
---

# Startup

This skill runs the session orientation sequence. It replaces all other startup instructions.

## Step 1 — Read overview

READ NOW: `C:\Users\tomew\Documents\agent-test\documents\overview.md`

This is a one-page map of all active project groups. Read it before handoff so you know
the shape of the project before diving into specifics.

## Step 2 — Read workflow principles

READ NOW: `C:\Users\tomew\Documents\agent-test\documents\workflow-principles.md`

This loads the standing orientation lens: the general failure pattern (context drift → improvisation →
degradation) and the counter-strategy framework (skills as forcing functions, JIT sequencers, single
source of truth, skills-first directive). Keep this lens active throughout the session.

## Step 3 — Read JIT design doc

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\ephemeral-notebook\documents\JIT-experiment.md`

This is the design document for JIT (Just-In-Time) instruction delivery — the core pattern for
preventing agent drift in multi-step workflows. Covers the mechanism, why it works, why it might
not, and a rubric for evaluating autonomous runs. Read this so the pattern is active and precise,
not just abstractly understood.

## Step 4 — Read handoff

READ NOW: `C:\Users\tomew\Documents\agent-test\documents\handoff.md`

This tells you what was worked on last session, current state, and what comes next.

## Step 5 — Read session log policy

READ NOW: `C:\Users\tomew\Documents\agent-test\documents\session-log-policy.md`

This defines when and how to write session log entries. The key rule: write at natural milestones
throughout the session, not only at shutdown. Load this now so the behavior is active from the
start of the session.

## Step 6 — Read session log

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\session-log.md`

Read up to 500 lines (use limit: 500). Handoff is a summary Claude writes — session log is the
actual record. Reading both gives fuller context and catches anything the handoff missed or got wrong.
500 lines typically covers many sessions — absorb as much as is useful.

✓ Confirm you used limit: 500 before proceeding to Step 7.

## Step 7 — Check `## Session Start`

Look for the `## Session Start` section at the bottom of handoff.md.

**If it says `Auto-start: [workflow name]`:**
- Invoke the relevant workflow skill immediately and begin executing
- Do not wait for Tom

**If it says `Wait for Tom.` (or the section is missing):**
- Present a brief status summary (3–5 lines max):
  - What was last worked on
  - Current state
  - What's queued or next
- Then stop and wait for Tom to direct the session

## What NOT to do

- Do not pre-load workflow context (CONTEXT.md, gotchas.md, etc.) unless auto-starting
- Do not follow the "Session Startup" checklist in MEMORY.md — that section is superseded by this skill
- Do not read startup.md as a startup step — it is a reference doc, not a driver
