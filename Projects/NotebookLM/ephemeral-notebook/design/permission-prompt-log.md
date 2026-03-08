# Permission Prompt Log

A shared log of observed permission prompts. Both Tom and Claude contribute.
Goal: identify all triggers so we can eliminate or pre-approve them for autonomous runs.

## How to Use
- Claude logs prompts it observes during tool execution, in real time
- Tom reports prompts he sees on his end that Claude may have missed
- Each entry: date, tool/command, context, who observed it, and Claude's analysis

---

## Confirmed Triggers

| Date | Tool / Command | Context | Observed By | Comments / Claude's Analysis |
|---|---|---|---|---|
| 2026-02-24 | Write tool (file creation) | Creating `JIT-experiment.md` | Tom | First Write of session — consistent with "first Write triggers, subsequent inherit" hypothesis |
| 2026-02-24 | `nlm notebook create` (Bash) | WW2 run — suspected, unconfirmed | Claude (suspected) | Not yet confirmed with screenshot evidence |
| 2026-02-24 | `nlm video create` (Bash) | WW2 run — suspected, unconfirmed | Claude (suspected) | Not yet confirmed with screenshot evidence |
| 2026-02-25 | Read tool | Reading `C:\Users\tomew\.claude\settings.json` (non-existent file) | Tom | Unexpected — Read is documented as safe. Likely triggered because `.claude` is a sensitive system directory. May be a special-case deny rule, not a general Read trigger. |
| 2026-02-25 | Write tool (file creation) | Creating `C:\Users\tomew\.claude\settings.json` | Tom | Expected trigger. Note: prompt showed only "Allow once" and "Deny" — no "Always allow for session" option. Different UI from other Write prompts. Likely because `.claude` directory is treated as sensitive/system. settings.json allowlist cannot pre-approve its own creation — bootstrapping problem. |
| 2026-02-25 | Edit tool (file modification) | Updating `permission-prompt-log.md` | Tom | **allowlist was active but did not suppress this prompt.** Edit is in the allow list, yet the prompt fired anyway. Consistent with the Windows persistence/allowlist bug documented in the research doc. Prompt showed "Always allow for session" option — different from the .claude Write prompt. This suggests the allowlist may not be reliably honoring Write/Edit entries on Windows. |
| 2026-02-25 | Edit tool (file modification) | Editing `workflow-ephemeral-notebook.md` mid-run (during Sci-Rev series, between Chemistry and Medicine notebooks) | Tom | **Root cause of Medicine notebook failure.** Claude made a workflow fix during an active run. Edit prompt fired, Tom was away, prompt sat waiting. Auth expired while prompt was pending. When Tom approved, run resumed but auth was gone. Rule established: never make Write/Edit changes during an active run. |

## Confirmed Non-Triggers (2026-02-25 WW2 run — 3 notebooks, no prompts observed by Tom or Claude)
- `Bash(PYTHONIOENCODING=utf-8 nlm notebook create *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm research start *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm research status *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm research import *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm source list *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm source delete *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm video create *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm share public *)` — no prompt
- `Bash(PYTHONIOENCODING=utf-8 nlm doctor)` — no prompt
- `Bash(powershell -Command "Start-Sleep *")` — no prompt
- `Bash(powershell -Command "Move-Item *")` — no prompt
- `Bash(powershell -Command "Get-Date *")` — no prompt
- Edit tool (subsequent uses after first approval) — no prompt
- Write tool (subsequent uses after first approval) — no prompt

## Unconfirmed / To Investigate
- Read tool — likely safe for normal paths; `.claude` directory appears to be a special case
- `nlm notebook delete` — not tested this session

---

## Observations & Patterns

### Write / Edit behavior
- Write tool confirmed as a trigger — but NOT every Write triggers a prompt
- `JIT-experiment.md` triggered a prompt; `permission-prompt-log.md` (created immediately after, same session) did NOT
- Edit tool confirmed as a trigger on first use in a session
- **Emerging pattern: first use of Write/Edit in a session triggers a prompt; subsequent uses in the same session do not**
- "Always allow for session" option appears and does persist for Write/Edit on normal project paths
- Implication: one unavoidable Write prompt + one unavoidable Edit prompt per session; clear after that

### allowlist (settings.json) behavior
- allowlist was active when Edit prompt fired (2026-02-25) — allowlist did NOT suppress it
- Windows allowlist bug confirmed for Edit: `"Edit"` entry in allow list did not prevent first-use prompt
- Write/Edit allowlist entries are unreliable on Windows
- **Bash entries confirmed working (2026-02-25 WW2 run)** — all nlm and PowerShell commands ran without prompts across 3 notebooks
- The allowlist is effectively solving the Bash prompt problem; Write/Edit remain the only issue

### .claude directory behavior
- Read AND Write both prompted for `.claude` directory — treated as sensitive system space
- Write prompt for `.claude` had reduced options (no "Always allow for session") — only "Allow once" and "Deny"
- Bootstrapping problem: settings.json cannot pre-approve its own creation — one-time cost, now paid

### Strategy notes (forming — not yet actionable)
- Idea: "burn-through" mini-run at start of session to trigger and approve all first-use prompts before the real run
- Goal: identify the complete set of unavoidable prompts, then find ways to minimize or front-load them
- More data needed before forming a concrete strategy — Bash command behavior is the key unknown

### General
- Tom sees prompts on his end that Claude may not notice — screenshots are the best evidence
- Algorithm is opaque — Claude Code's prompt logic is not documented; building understanding through observation

---

## settings.json Allowlist (as of 2026-02-25)
```json
{
  "allow": [
    "Bash(PYTHONIOENCODING=utf-8 nlm *)",
    "Bash(powershell -Command *)",
    "Write",
    "Edit"
  ]
}
```
Location: `C:\Users\tomew\.claude\settings.json`
Status: Active — next run will validate whether this eliminates prompts for covered tools.

---

## Goal
Zero prompts during autonomous runs. Either:
1. Pre-approve all known triggers in Claude Code settings, or
2. Find ways to restructure workflow to avoid triggering them
