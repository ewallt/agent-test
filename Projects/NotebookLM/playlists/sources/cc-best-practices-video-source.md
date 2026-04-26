# Claude Code Best Practices — Video Source
# Purpose: NotebookLM source for Cinematic Video Overview generation
# Audience: Casual Claude Code users — solo developers, hobbyists, small teams
# Source material: 3/31/2026 community analysis of Claude Code source leak + r/artificial architecture post

---

## What This Is About

On March 31, 2026, Claude Code's source code was briefly published publicly. The developer
community immediately reverse-engineered how it actually works — and produced a wave of
best-practices posts within 24 hours. This document distills the most accessible, highest-impact
findings for everyday Claude Code users.

The core insight: Claude Code ranks 39th on terminal benchmarks. The harness adds nothing to
the model's raw performance. The value is entirely in how you use it — the patterns and
configuration choices that let you get the most out of every session.

---

## 1. Don't Start Fresh Sessions for Ongoing Work

**What most people do:** Close Claude Code, open it again the next day, start a new session.

**Why this hurts:** Claude Code accumulates structured session memory as you work — the files
you've been editing, the decisions you've made, the current state of your task. Starting fresh
wipes all of this. You're not just losing the conversation; you're losing the structured context
that made Claude effective.

**What to do instead:** Use `/resume` to continue a previous session. Or use `/compact` at a
natural stopping point (see below) and keep the session running. Long sessions with proactive
compaction dramatically outperform repeated fresh starts.

**Why it matters:** This is the single biggest behavioral change casual users can make. It costs
nothing and the improvement is immediate.

---

## 2. Set Your Compaction Threshold to 50%

**What most people don't know:** By default, Claude Code auto-compacts at 95% context usage —
the worst possible moment. The model is already overloaded and degraded when it writes the
compaction summary. That summary then carries degraded context forward into the rest of your
session.

**The fix:** Add one line to your `settings.json`:

```json
{
  "env": {
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50"
  }
}
```

**Why it matters:** At 50%, compaction happens while context is still clean and the model is
still sharp. The summary it produces is far better. Your sessions stay high-quality for longer.
This is a one-line change with no downside.

---

## 3. Use /compact Manually at Task Boundaries

**What it does:** Forces a clean compaction at a moment you choose — while context is fresh,
before you switch tasks or start something complex.

**When to use it:**
- You just finished a feature or bug fix
- Research is complete and you're moving to implementation
- You're about to switch to a different project
- Before starting a long multi-step workflow

**Why it matters:** Auto-compaction is reactive — it fires when the window is nearly full.
Manual compaction is proactive — you control the timing, so the summary is written at the
best possible moment. Think of it as saving your game at a checkpoint instead of hoping
the auto-save fires at the right time.

---

## 4. Add Permission Wildcards for Common Tools

**The problem:** Without explicit permission wildcards, Claude prompts for approval on routine
operations — every git commit, every npm install, every node script. This friction breaks flow
and trains you to mindlessly approve things.

**The fix:** Add these to your `settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm *)",
      "Bash(node *)",
      "Bash(npx *)",
      "Write",
      "Edit"
    ]
  }
}
```

**Why it matters:** Git and npm are used constantly in any development workflow. These are
obviously safe operations. Approving them every time is pure friction — it doesn't make you
safer, it just slows you down.

---

## 5. Switch to Auto Mode

**What most people use:** `--dangerously-skip-permissions` or `skipDangerousModePermissionPrompt: true`
— a blunt bypass that disables all permission checks.

**What auto mode does differently:** It runs a lightweight background classifier that evaluates
each tool use for intent. Safe actions auto-approve. Injections and escalations get blocked.
You get the same friction-free experience but with an active safety layer working for you.

**How to enable it:**

```json
{
  "permissions": {
    "defaultMode": "auto"
  },
  "skipAutoPermissionPrompt": true
}
```

**Why it matters:** The bypass approach is a blunt instrument. Auto mode is smarter — it
distinguishes between "run git status" (safe, auto-approve) and "delete everything in this
directory" (block, ask). Better safety with no added friction.

---

## 6. Keep CLAUDE.md Lean

**What the source leak revealed:** CLAUDE.md is re-injected into the conversation on every
single turn — not just at session start. It loads as user-level context wrapped in an XML tag
alongside a hidden disclaimer: "this context may or may not be relevant to your tasks."

**What this means for you:**
- All-caps "STRICTLY ENFORCED" instructions are ineffective — the framing undercuts them
- Every byte in CLAUDE.md costs tokens on every single exchange
- Overloading it with detail you rarely need is expensive and counterproductive

**What to do instead:** Keep CLAUDE.md as a lean pointer file — architectural principles,
key locations, brief standing rules. Delegate the detail to skill files that load only when
needed (Just-In-Time delivery).

---

## 7. Use Conditional Rules for Project-Specific Instructions

**The problem:** All CLAUDE.md rules load on every turn, regardless of what you're working on.
Remotion-specific rules load during a documentation session. CSS rules load during a database
migration. You're paying token cost for irrelevant context constantly.

**The fix:** Create a `.claude/rules/` directory with rule files that only load when you're
editing matching files:

```markdown
---
globs: ["src/components/**"]
---
Always use Tailwind classes, never inline styles.
Use React.FC for all components.
```

**Why it matters:** The right rules load at the right moment. Token cost drops. Claude gets
more focused, relevant guidance.

---

## 8. The Stop Hook — Autonomous Build Validation

**What it is:** A script that runs automatically after every Claude turn. If it passes (exits 0),
Claude stops. If it fails (exits 2), the error output is automatically fed back into the
conversation and Claude keeps going — fixing, retrying, iterating until it passes.

**What this replaces:** Manually running tests after every change. Reading error output and
pasting it back in. The loop runs itself.

**A simple example:**

```json
{
  "hooks": [
    {
      "event": "Stop",
      "command": "bash ~/.claude/hooks/validate.sh"
    }
  ]
}
```

**Why it matters:** This is a zero-plugin autonomous build loop, natively supported by the
harness. You describe what done looks like; Claude drives itself there. No plugins, no
external tools, no manual iteration.

---

## 9. The Bigger Picture — Where This Is All Heading

The source leak revealed significant unreleased architecture that shows where Claude Code
is going:

**Skeptical memory** — The agent is designed to treat its own memory as a hint, not a fact.
It verifies against reality before acting. This is how you prevent an AI from confidently
doing the wrong thing based on outdated information.

**AutoDream** — A background consolidation system that runs during idle time, merging
observations, removing contradictions, and keeping memory bounded. Without something like
this, agents degrade over weeks as memory fills with noise.

**Risk classification** — Every action gets classified LOW, MEDIUM, or HIGH risk. Low-risk
actions auto-approve. High-risk ones require human approval. The agent knows which decisions
are safe to make alone.

**KAIROS** — The biggest unreleased feature, with over 150 references in the source. An
always-on background agent that acts proactively, maintains daily logs, and has a 15-second
blocking budget so it doesn't overwhelm the user. The direction the whole system is heading:
from "you ask, it responds" to "it works when you're not looking."

Multiple independent AI agent builders have independently converged on these same patterns —
skeptical memory, background consolidation, risk tiers, proactive scheduling — because the
constraints of production agents demand them. The architecture is becoming standard.

---

## Summary — In Order of Impact

| # | Practice | Effort | Impact |
|---|----------|--------|--------|
| 1 | Stop starting fresh sessions — use /resume | Zero | Highest |
| 2 | Set AUTOCOMPACT to 50% | One line | High |
| 3 | Use /compact at task boundaries | Behavioral | High |
| 4 | Add permission wildcards | 5 minutes | Medium-high |
| 5 | Switch to auto mode | 15 minutes | Medium |
| 6 | Keep CLAUDE.md lean | Ongoing | Medium |
| 7 | Conditional rules | 30 minutes | Medium |
| 8 | Stop hook for build validation | 1 session | High (if you build) |
| 9 | KAIROS / future architecture | Watch this space | — |
