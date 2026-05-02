---
name: notebooklm-ephemeral-notebook
description: >
  Master skill for the NotebookLM Ephemeral Notebook workflow. Drives execution from a
  task file — reads it, determines what to build, and executes the full workflow step by
  step. Use this skill whenever Tom says "run a notebook", "execute a task file", "run
  the notebook workflow", or when task files are found in tasks/ and Tom asks to proceed.
  Also triggers when Tom drops a task file and says it's ready, or asks to build notebooks
  for a topic. This is the single entry point for all NotebookLM notebook builds — always
  invoke this skill rather than executing notebook commands directly. Handles both standard
  task-driven runs and exploratory runs where the video strategy is determined after research.
---

## Purpose

This skill is a sequencer. It reads a task file and drives the full workflow from start
to handoff. Each step loads its reference material just-in-time — at the moment it is
needed, not all upfront. This prevents drift and keeps execution grounded in live
documents rather than memory.

All notebook work flows through this skill. Do not execute notebook commands directly.

---

## Before Anything Else

**READ NOW:**
`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\CONTEXT.md`

This gives you command syntax, auth requirements, folder structure, and gotchas.
Do not proceed until you have read it.

✓ Gate: CONTEXT.md read → proceed to Step 0.

---

## Step 0 — Auth and Task File

**Auth check** (run silently):
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' doctor"
```
If it passes, continue without mentioning it. Only stop if a subsequent command fails.

**READ NOW:**
`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\skills\skill-task-intake.md`

This defines the task file format, field definitions, and parsing rules. Parse all fields
before doing anything else.

Determine build path from the `mode` field:
- `mode: exploratory` → **Exploratory Path** (below)
- All other task files → **Standard Path** (below)

✓ Gate: Auth checked. Task file parsed. Build path identified → proceed.

---

## Standard Path

For task files without `mode: exploratory`.

### Step 1 — Create Notebook

```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook create '<title>'"
```

Capture NOTEBOOK_ID from output.

✓ Gate: NOTEBOOK_ID captured → proceed to Step 2.

---

### Step 2 — Research, Status, Import

Start research (use `--mode fast` for standard runs):
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' research start '<query>' --notebook-id <NOTEBOOK_ID> --mode fast"
```

Capture TASK_ID. Poll every 15 seconds until status shows `completed`:
```
PYTHONIOENCODING=utf-8 powershell -Command "Start-Sleep -Seconds 15; & 'C:\Users\tomew\.local\bin\nlm.exe' research status <NOTEBOOK_ID> --max-wait 0"
```

Then import:
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' research import <NOTEBOOK_ID> <TASK_ID>"
```

If import returns a timeout error — do NOT retry. Check `source list` first. If sources
are present, the import succeeded. Retrying duplicates all sources.

✓ Gate: Sources imported and verified → proceed to Step 3.

---

### Step 3 — Source Selection and Focus Angles

**READ NOW:**
`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\skills\skill-video-strategy.md`

List sources with full IDs:
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' source list <NOTEBOOK_ID>"
```

Write out the source-focus mapping explicitly before running any video command:
```
Video 1: source-id = <FULL UUID> | title = <source title> | focus = "<focus angle>"
Video 2: source-id = <FULL UUID> | title = <source title> | focus = "<focus angle>"
```

Use full UUIDs always (e.g. `34bb6d77-88eb-4e70-8602-fb3532c94738`). Truncated IDs
cause silent failures — the video appears to queue but fails immediately with no error.

✓ Gate: Source-focus mapping written out explicitly → proceed to Step 4.

---

### Step 4 — Queue All Artifacts

**READ NOW** the sub-skill for each artifact type flagged in the task file:

| Flag | Sub-skill to read |
|------|-------------------|
| `videos: N` | `notebooklm-video` |
| `slides: yes` | `notebooklm-slide` |
| `infographic: yes` | `notebooklm-infographic` |
| `app: yes` | `notebooklm-webapp` |
| `slideshow: yes` | `notebooklm-slide-manifest` |

Submit all artifact commands in one burst — immediately after Step 3, before auth can
expire. Use a PowerShell script to run them sequentially. Do not chain with `&&` (not
valid in older PowerShell versions). Capture every artifact ID.

✓ Gate: All artifact IDs captured → proceed to Step 5.

---

### Step 5 — Share, Log, Move

Share the notebook:
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' share public <NOTEBOOK_ID>"
```

**READ NOW:**
`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\skills\skill-log.md`

Append one entry to `run-log.md` at the END of the file. Move task file to `completed/`.

✓ Gate: Notebook shared. Log written. Task file moved → proceed to Step 6.

---

### Step 6 — Handoff

Report to Tom:
- Notebook title and ID
- Shareable URL
- Each artifact: ID + focus angle
- Estimated render time (~8-10 min per video)
- Any hiccups or interventions during the run

---

## Exploratory Path

For task files with `mode: exploratory`. Used when the topic is open-ended and video
strategy needs to emerge from the sources rather than be predetermined.

### Step E1 — Questions

Read the `guidance` field from the task file. Ask Tom any questions needed to understand
the angle, depth, and desired output before running research.

✓ Gate: Questions answered → proceed to Step E2.

---

### Step E2 — Deep Research Prompt

**READ NOW:** `notebooklm-deep-research` skill

Write a full research brief — not a one-line query. Present it to Tom for confirmation
before running.

✓ Gate: Research prompt confirmed by Tom → proceed to Step E3.

---

### Step E3 — Create Notebook and Run Deep Research

Follow Steps 1-2 of the Standard Path, but use `--mode deep` instead of `--mode fast`.
Deep research takes ~5 minutes. Poll every 15 seconds.

✓ Gate: Sources imported and verified → proceed to Step E4.

---

### Step E4 — Query Notebook for Video Strategy

Use `nlm notebook query` to surface distinct themes from the sources:
```
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook query <NOTEBOOK_ID> '<question>'"
```

Ask targeted questions to identify distinct video-worthy angles — for example:
- "What are the most distinct and substantive themes across these sources?"
- "What specific results or debates would make strong standalone video topics?"

Use the responses to design the video plan: how many videos, one focus angle per video,
which sources support each.

**READ NOW:**
`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\skills\skill-video-strategy.md`

Present the proposed plan to Tom. Get approval before queuing anything.

✓ Gate: Video plan approved by Tom → write out source-focus mapping → proceed to Step E5.

---

### Step E5 — Queue All Artifacts

Follow Step 4 of the Standard Path exactly. Full UUIDs. One burst. All artifact IDs captured.

✓ Gate: All artifact IDs captured → proceed to Step E6.

---

### Step E6 — Share, Log, Move

Follow Step 5 of the Standard Path exactly.

✓ Gate: Complete → proceed to Step E7.

---

### Step E7 — Handoff

Follow Step 6 of the Standard Path exactly.

---

## Meta Notebooks

A meta notebook is a research-only notebook built for Claude to query during other work.
No artifacts. No public share. Not moved to `completed/`.

- Run Steps 0, 1, 2 only (Standard Path)
- Log in run-log.md with `Type: Meta notebook` and note the intended use case
- After creation: update the skill that should use this notebook with its ID

Mode guidance: `--mode fast` for narrow topics, `--mode deep` for broad reference topics.

---

## Standing Rules

These apply to both paths at all times:

- **Full UUIDs** in `--source-ids` — never truncated. Silent failure otherwise.
- **Poll every 15 seconds** — use `--max-wait 0` to avoid the spinner/Unicode bug.
- **Artifact burst** — queue all artifacts immediately after import, before auth expires.
- **Auth window ~20 min** — if a command fails mid-run, ask Tom to run `nlm login --profile default`.
- **No import retries** — timeout does not mean failure. Check `source list` first.
- **No `&&` chaining** — use PowerShell loops or scripts for sequential commands.
- **No Write/Edit during a run** — triggers permission prompts. Note fixes; apply after the run.
