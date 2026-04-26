# Claude Code Knowledge Base
# Source: 3/31/2026 source leak community analysis + r/artificial architecture post (2026-04-01)
# Notebook: 97e0990a-938c-4b8c-9b6a-7e24f5b69490
# Last updated: 2026-04-01 (added: skeptical memory, AutoDream, KAIROS, risk classification)

Use this file to inform decisions about Claude Code configuration, hooks, permissions,
and session management. Query the notebook for deeper follow-up.

---

## How the Harness Actually Works

**CLAUDE.md is re-injected on every single turn** — not just at session start. It loads
as user-level context (not system prompt), wrapped in an XML `<context>` tag alongside a
hidden disclaimer: "this context may or may not be relevant to your tasks." This means:
- All-caps "STRICTLY ENFORCED" instructions are ineffective — the framing undercuts them
- Every byte in CLAUDE.md costs tokens on every exchange
- Keep it architectural and lean; delegate detail to JIT-loaded skills

**AUTOCOMPACT fires at 95% by default** — the worst possible moment. The model is already
degraded when it writes the summary. Override to 50% for clean mid-task compaction:
`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50`

**Large file reads are truncated to 8KB** — the model gets a preview, not the full file.
Precise context targeting matters more than loading whole files.

**Parallel agents share prompt cache** — spinning up subagents is cheap. They share the
parent's cache, so the marginal cost of a second agent is low.

**Session memory accumulates structure** — task specs, file lists, workflow state, errors,
learnings. Starting fresh wipes this. Resume or fork instead.

**66 built-in tools, two categories:**
- Concurrent: read-only operations, scale horizontally
- Serialized: mutating operations (Edit, Bash writes), strictly queued for thread safety

**The harness adds nothing to model performance** — Claude Code ranks 39th on terminal bench.
The value is entirely in the orchestration layer, not the underlying model.

---

## The Six Orchestration Systems (from r/artificial analysis, 2026-04-01)

Six systems work together in the production architecture:

**Skeptical memory** — Three-layer system where the agent treats its own memory as a hint,
not a fact. It verifies against the real world before acting. Prevents confident wrong actions
based on outdated information.

**AutoDream** — Background consolidation runs during idle time. Merges observations, removes
contradictions, keeps memory bounded. Without it, agents degrade over weeks as memory fills
with noise and conflicting state.

**Multi-agent coordination** — One lead agent spawns parallel workers. Workers share a prompt
cache (cost doesn't multiply linearly). Each worker gets isolated context and restricted tool access.

**Risk classification** — Every action is labeled LOW, MEDIUM, or HIGH risk. Low-risk actions
auto-approve. High-risk ones require human approval. The agent knows which actions are safe to
take alone.

**CLAUDE.md reinsertion** — The config file isn't a one-time primer. It gets reinserted on
every turn. The agent is constantly reminded of its instructions.

**KAIROS daemon mode** — The biggest unreleased feature (150+ references in the source). An
always-on background agent that acts proactively, maintains daily logs, and has a 15-second
blocking budget so it doesn't overwhelm the user. The direction the whole system is heading:
from "you ask, it responds" to "it works when you're not looking."

---

## Configuration Surfaces

### settings.json — key fields

```json
{
  "env": {
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "MAX_THINKING_TOKENS": "10000"
  },
  "allow": [
    "Bash(git *)",
    "Bash(npm run *)",
    "Bash(node *)",
    "Bash(npx *)",
    "Bash(powershell -Command *)",
    "Write",
    "Edit"
  ],
  "deny": [
    "Bash(rm -rf /*)",
    "Bash(sudo *)"
  ]
}
```

### Auto mode
Launch with `--enable-auto-mode` or toggle with Shift+Tab. Uses a background LLM
classifier to evaluate intent — auto-approves safe actions, blocks injections and
escalations. Configurable via `autoMode.allow`, `soft_deny`, `deny` in settings.
Smarter than `skipDangerousModePermissionPrompt: true`.

### Conditional rules — .claude/rules/
Rule files with YAML frontmatter. Only load when Claude edits files matching the glob.
Eliminates the token cost of loading Remotion rules during a NotebookLM session, etc.

```markdown
---
globs: ["Projects/Remotion/**"]
---
Always use interpolate() not CSS transitions.
```

### CLAUDE.local.md
Gitignored, higher priority than CLAUDE.md. For machine-specific config:
local ports, file paths, dev credentials. Good for: Remotion Studio port (3000),
ticket board URL (localhost:3010), local binary paths.

### Agent frontmatter
Skill/agent markdown files can use YAML frontmatter to structurally constrain agents:

```yaml
---
tools: [Read, Glob, Grep]
disallowedTools: [Edit, Write, Bash]
model: claude-haiku-4-5-20251001
maxTurns: 5
effort: low
---
```

Use for: read-only Explore agents, quick-lookup agents pinned to Haiku, agents that
should never write files.

---

## The Hook System

Hooks attach automated side-effects to agent actions outside the main loop.
Config file: `~/.claude/hooks/hooks.json`

### Lifecycle events
- `PreToolUse` — before any tool call; can block
- `PostToolUse` — after a tool call completes
- `Stop` — right before Claude finalizes a response
- `PreCompact` — before auto-compaction runs
- `SessionStart` — at session beginning
- `SessionEnd` — at session end
- `UserPromptSubmit` — when user submits a prompt

### The Stop hook pattern (autonomous loop)
The highest-leverage hook for creative/build workflows. If a validation script
exits 0 → Claude stops. If it exits 2 → stderr is fed back into the conversation
and Claude continues. Creates a zero-plugin TDD/build loop.

```json
{
  "hooks": [
    {
      "event": "Stop",
      "command": "bash ~/.claude/hooks/validate.sh",
      "description": "Run build validation after each turn"
    }
  ]
}
```

Validation targets for this project:
- Remotion: TypeScript compile check after scene edits
- promote.sh: 99 structural tests before merge to main
- BYG: audio file existence check after narration generation

### The PreCompact hook pattern (state snapshot)
Fires before auto-compaction. Write a structured state file:
active files, current task, recent decisions. A SessionStart hook restores it.
Complements (doesn't replace) the startup skill + handoff.md system.

### PostToolUse (continuous logging)
Captures file edits, task updates, git operations as they happen.
Feeds into session continuity state.

---

## /compact — Manual Usage

Run at natural task boundaries — don't wait for auto-compaction:
- Research complete
- Feature or fix done
- Before switching projects
- Before starting a complex multi-step workflow

At 50% threshold (once set), auto-compaction is less dangerous — but manual
compaction at phase boundaries is still the cleaner approach.

---

## What Developers Get Wrong

- **All-caps instructions in CLAUDE.md** — ineffective due to context wrapper
- **Starting fresh sessions** — wipes accumulated session memory; use /resume instead
- **`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`** — not a real env var; ignore
- **Building custom TDD plugins** — Stop hook handles this natively
- **Defining agents as pure prose** — use frontmatter for structural constraints
- **Overloading CLAUDE.md** — pay token cost on every turn for content that's rarely relevant
- **No explicit deny rules** — wildcard allows need paired denials for destructive commands

---

## Current Setup Status (as of 2026-04-01)

| Area | Status | Gap |
|------|--------|-----|
| CLAUDE.md | Good — 791 bytes, lean pointer file | — |
| Skills / JIT | Good — extensive, well-structured | — |
| Memory system | Good | — |
| AUTOCOMPACT threshold | Done — set to 50% | — |
| Permission wildcards | Done — git, npm, node, npx added | — |
| Auto mode | Done — defaultMode: auto, skipAutoPermissionPrompt | — |
| Hooks | Gap — no hooks directory | Implement Stop + PreCompact |
| /compact usage | Unknown | Use proactively at boundaries |
| Conditional rules | Gap — none | Extract project-specific rules |
| CLAUDE.local.md | Gap — none | Create for local config |
| Agent frontmatter | Gap — skills are prose-only | Add to read-only agents |
| MAX_THINKING_TOKENS | Gap — at default 31,999 | Set to 10,000 |

See `documents/claude-code-improvements.html` for full implementation details and order.
