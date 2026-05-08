# Logging And Compaction

## Log Worthy Events

Update a durable log when any of these happen:

- repo clone, pull, push, branch, remote, or install changes
- skill creation, skill edit, or skill installation
- OAuth, token, Google Docs bridge, GitHub connector, or helper path changes
- bridge messages that alter the plan or setup state
- NLM source, video, dashboard, NotebookLM, or YouTube state changes
- failed commands that change the plan
- new conventions, policies, or user preferences

Use the nearest relevant log:

- repo-wide setup: top-level `WORKLOG.md` if present; otherwise create or update an appropriate top-level log
- NLM-specific work: `Projects/nlm/WORKLOG.md`
- current restart state: `HANDOFF.md` or `Projects/nlm/HANDOFF.md`

## User Preference

Tom prefers looking for a compaction opportunity once context is over about 50 percent used. By about 60 percent used, update logs and handoff before continuing unless the smallest coherent task step must be finished first.

## Pre-Compact Routine

1. Finish the smallest coherent current step.
2. Update the relevant `WORKLOG.md` with concrete changes and dates.
3. Refresh the relevant `HANDOFF.md` with current state, blockers, and next action.
4. Mention any commands not yet run or checks still pending.
5. After compaction or a new session, read `HANDOFF.md`, recent `WORKLOG.md`, then project docs as needed.
