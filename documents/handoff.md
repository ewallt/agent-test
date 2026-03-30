# Session Handoff — 2026-03-30

## What Was Done This Session

### Startup Skill: JIT Doc Added
- Discovered Claude read session log at limit 200 instead of 1000 at session start — a behavioral drift failure
- Added Step 3 to startup skill: READ NOW `JIT-experiment.md` — the JIT design doc is now loaded at every session start so the pattern is active and precise, not just abstractly understood
- Added ✓ verification gate to Step 6 (session log read): "Confirm you used limit: 1000 before proceeding" — applies the JIT pattern directly to the failure point
- Steps renumbered: old 3–6 → new 4–7; skill now has 7 steps

### Claude Code Downgrade
- `--dangerously-skip-permissions` flag broken in v2.1.78+ due to hardcoded gate on `.claude`, `.git`, `.vscode`, `.idea` directories
- Researched issue: v2.1.77 is the last confirmed-working version; downgrade is still the only reliable fix
- Downgraded from v2.1.87 → v2.1.77 via `npm install -g @anthropic-ai/claude-code@2.1.77`
- Takes effect in next session (new process)

---

## State Right Now

- On `dev` branch, changes uncommitted
- Notebook `a87328bb` exists with 5 videos rendered — not yet shared or logged in run-log
- Two task files still queued: `cognitive-dissonance.md` and `fall-of-constantinople.md`
- New master skill written but not yet tested against a real run

## Next Session Priority

Continue the notebook workflow architecture discussion from this session. The session identified several process failures in the self-improving AI notebook run (auth expiry, truncated UUIDs, improvised video strategy at steps 6-7, missing master skill). Fixes were made: the `notebooklm-ephemeral-notebook` master skill was rebuilt as a proper JIT sequencer, and a skills-first directive was saved to memory and startup.md. Next session: review the new skill together, assess whether it fully addresses what went wrong, and discuss any remaining gaps. Also consider: today's run was done conversationally — a task file was never created. That may be worth addressing.

## Other Items

- None flagged

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: ephemeral-notebook

Context: This session ended in a process retrospective, after a self-improving AI notebook run that had several failures. We identified that the workflow was not being driven by skills — Claude was improvising from documents and memory. Key fixes made: (1) `notebooklm-ephemeral-notebook` SKILL.md rebuilt as a full JIT sequencer with Standard and Exploratory paths, (2) skills-first directive saved to memory. The discussion was left mid-stream — Tom wants to review what was done and decide if it's sufficient before running more notebooks.
