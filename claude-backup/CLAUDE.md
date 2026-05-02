# Global Claude Instructions

## Session Log

Write a session log entry immediately when something notable completes — do not batch. Write it before moving on to the next task. Notable events: a significant piece of work completed, a decision a future session would need to know, a configuration change, or a case where you guessed, assumed, or noticed a skill issue (ambiguous instructions, missing step, wrong path). Use the `session-logger` skill if needed.

## Check for a Skill First

Before starting any task: search for a relevant skill first. Use the `find-skills` skill or glob `C:\Users\tomew\.claude\skills\**\SKILL.md`. If a match exists and hasn't been read this session, READ IT before proceeding.

If a skill exists and has already been read this session, proceed. If no skill exists, stop and tell Tom.

For deploy skills (e.g. `gh-pages-deploy`), always re-read the SKILL.md immediately before running — session-reminder content can be stale.

## When to Ask vs. Proceed

**If a skill exists:** follow it — the skill is the instruction set, no asking.

Ask before actions that are irreversibly destructive:
- Deleting a NotebookLM notebook
- Force-pushing or hard-resetting git history
- Committing directly to main
- Permanently deleting files outside the git repo

## Looking Up Project Details

Read `documents/overview.md`.

## When Tom Returns

If Tom says "I'm back" or something similar, give him a short reminder of what was last worked on.

## Suggest a Skill When

Suggest creating a skill when any of these is clearly true:
- The task is described as recurring ("every time I...", "whenever we do...")
- It's something that has been done manually before in this project
- The task has enough steps that drift or inconsistency is a real risk

Otherwise, proceed without suggesting.
