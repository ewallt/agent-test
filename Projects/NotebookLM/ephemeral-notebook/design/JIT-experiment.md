# JIT Instruction Delivery — Experiment Log

## What We're Trying
Instead of loading all instructions at session start and relying on memory during execution, the workflow now delivers instructions just-in-time: each step in the workflow explicitly tells Claude which skill file to read before executing that step. Instructions arrive at the moment they're needed, not hours earlier.

This is a direct response to "agent drift" — the observed tendency for Claude to deviate from instructions mid-run, working from a stale mental model rather than the live documents.

## What Changed
- `workflow-ephemeral-notebook.md` redesigned as a sequencer: each step says "READ skill-X.md NOW"
- Source-focus mapping must be written out explicitly before any video command runs
- Checklist tied to steps with ✓ markers — do not proceed until each item is verified
- Permission prompts logged in real time after every Bash command, not reconstructed afterward

## Why It Might Work
- Instructions are fresh at the moment of use, not diluted by a full session's worth of context
- Explicit verification gates prevent skipping steps
- Written source-focus mapping externalizes a decision that was previously made silently and error-prone

## Why It Might Not Work
- Claude still has to remember to read the workflow file in the first place
- JIT reads add overhead — more file reads per run
- The underlying issue (working from memory) is behavioral, not just structural — instructions can still be ignored

## Rubric: How to Evaluate

After each run, assess:

| Dimension | Questions to ask |
|---|---|
| **Step completion** | Were any checklist items missed? Which ones? |
| **Permission prompts** | How many prompts appeared? Which commands triggered them? Is the list shrinking over runs? |
| **Source-focus accuracy** | Did each video get the correct source? Was the mapping written out before queuing? |
| **Auth management** | Did auth expire mid-run? Was nlm doctor run before each notebook? |
| **Intervention count** | How many times did Tom have to do something? Goal: zero beyond initial login |
| **Log quality** | Was the run log entry complete and accurate? Was it appended at the end of the file? |

## Success Criteria
A run is considered fully autonomous when:
- Zero permission prompts (or all prompts pre-approved without Tom's active involvement)
- Zero source-focus mismatches
- All checklist items completed in order
- Log entry complete and correctly appended
- Tom did nothing except initiate the run

## Run History

| Date | Notebooks | Interventions | Prompts | Notes |
|---|---|---|---|---|
| 2026-02-24 | 2 of 5 complete | Auth expiry (Notebook 3), source-focus mismatch (NB1 V1) | Unknown — not logged | Pre-JIT run; workflow not yet redesigned |
| 2026-02-25 | 3 of 3 complete (NB 3, 4, 5) | None during notebook builds; Tom nudged Claude to read workflow before starting | 0 during run (3 pre-run for settings.json setup) | First post-JIT run. Zero source-focus mismatches. Zero auth failures. Bash prompts eliminated via allowlist. Write/Edit first-use prompts remain (1 each per session). JIT step-level execution clean; initiation still requires nudge. Bad source detected via title review (Leyte Gulf). Import timeout bug discovered and documented. |

Add a row after each subsequent run.
