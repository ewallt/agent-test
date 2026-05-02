# Skill: Write Run Log Entry

## What This Does
Appends a structured entry to the run log after each completed notebook build.
This is the system's execution history — used for session continuity and reporting.

## Log File Location
`C:\Users\tomew\Documents\agent-test\playlists\run-log.md`

## When to Write
At the end of each completed workflow:
- Ephemeral Notebook: after sharing the notebook (step 6 of workflow-playlists.md)
- Research Pipeline: after queueing all videos (step 7 of workflow-research-pipeline.md)
- Task Intake: once per notebook built (called via skill-json-request.md)

Write one entry per notebook. If a run produced multiple notebooks, write multiple entries.

## Elapsed Time
Elapsed time = wall-clock time from start of Claude's work to completion of video queueing.
- Record start time at the beginning of each workflow (before auth check)
- Record end time immediately after the last video create command returns
- Format: `Xm Ys` (e.g. `3m 12s`)
- Do NOT include render time — that happens server-side after handoff

## Entry Format

```
## YYYY-MM-DD HH:MM | <Workflow Type> | "<Topic>"
- Notebook ID: <id>
- URL: <shareable URL>
- Videos: <count> | Style: <style>
- Focus angles:
  - <angle 1> (source: <source-id>)
  - <angle 2> (source: <source-id>)
  - <angle 3> (source: <source-id>)
- Elapsed time: <Xm Ys>
- Intervention: <none, or description of any point where Tom had to intervene>
- Hiccups: <none, or brief description of any problems encountered>

---
```

Workflow type is one of: `Ephemeral Notebook`, `Research Pipeline`

## Intervention
Log any point where Tom had to do something for the run to continue:
- Permission prompt appeared and Tom had to approve
- Auth expired and Tom had to re-run nlm login
- Tom had to correct an error or redirect Claude

The goal is to track which runs are fully autonomous. "None" means Tom did nothing except initiate the run.

**CRITICAL: Track interventions in real time, not from memory at the end.**
Permission prompts and auth failures are the most important data this system collects.
The notebooks are ephemeral — the workflow is the product. Every intervention is a signal
that something needs to be fixed. Do not reconstruct interventions after the fact.

During every run, maintain a running intervention note as you go:
- When a Bash tool call pauses or requires approval, note it immediately: what command triggered it, at what step
- When auth expires, note the exact point in the workflow where it failed
- When Tom has to do anything at all, note it

If you are uncertain whether a prompt appeared, say so explicitly in the log — do not assume "none".

## Hiccups
Only log things that actually went wrong or required deviation from the normal flow:
- Auth expiry mid-run
- Research task blocked (--force required)
- Source import returned fewer results than expected
- Video create command failed and had to be retried
- Unicode errors that affected output
- Unexpected permission prompt mid-run

Do NOT log routine decisions (e.g. which focus angles were chosen) — those are normal.

## How to Append
**CRITICAL: Always append to the literal end of the file. Never use a content match as an insertion anchor.**

The correct procedure:
1. Read the entire run-log.md file first
2. Identify the very last line of the file
3. Use the Edit tool matching the final `---` plus all content after it (to the end of file) as `old_string`, replacing with the new entry appended after it
4. If unsure, use PowerShell to append: `Add-Content -Path <path> -Value "<entry>"`

**Wrong approach:** matching a previous entry's heading as an anchor — this inserts mid-file if any entry exists after it.

If the file does not exist yet, use Write to create it with a header:

```
# Run Log
# NotebookLM agent-test workflows
# Entries are appended after each completed run.

---

```

Then append the first entry after the header.

## Task Execution Checklist
The checklist lives in workflow-playlists.md — consult it there.
