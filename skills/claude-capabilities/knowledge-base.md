# Claude Capabilities Knowledge Base
*Focused on skills work. Last refreshed: 2026-03-29. For broad questions, query the notebook.*

---

## Current Models

| Model | API ID | Context | Max Output | Best For |
|-------|--------|---------|------------|----------|
| Opus 4.6 | `claude-opus-4-6` | 200K (1M beta) | 128K | Complex coding, agent orchestration |
| Sonnet 4.6 | `claude-sonnet-4-6` | 1M beta | 64K | Balanced speed/intelligence, computer use |
| Haiku 4.5 | `claude-haiku-4-5-20251001` | 200K | 64K | Fast, cost-efficient, simple tasks |

**Default for skills work:** Sonnet 4.6. Use Opus 4.6 for complex multi-step agent tasks.

---

## Claude Code — Key Capabilities

**Agentic loop** — reads codebases, edits files, runs bash, uses git (stage, commit, PR, merge conflicts), runs in CI/CD.

**What's new (relevant to skills):**
- **Subagents** — spawn agents that work in their own context windows, report back summaries. Design modular skills that delegate to subagents rather than bloating the main context.
- **Context compaction** — auto-summarizes old context when approaching limits. 1M token window in beta.
- **Checkpointing/rewind** — every file edit is snapshotted. `/rewind` to undo.
- **Auto mode** — background classifier approves routine actions without prompting; blocks risky ones.
- **Hooks** — shell scripts that run before/after Claude actions (linters, formatters, security checks).
- **Skills** (`.claude/skills/`) — `SKILL.md` files with reusable workflows, loaded on demand.
- **Custom subagents** (`.claude/agents/`) — specialized agents Claude can delegate to.

---

## Tool Use — Key Capabilities

- **Tool Search Tool** — Claude dynamically discovers tools on demand instead of loading all upfront. Mark rarely-used tools `defer_loading: true`. Preserves up to 95% of context.
- **Programmatic Tool Calling (PTC)** — Claude writes Python to orchestrate tools, keeping large intermediate data out of context.
- **Tool Use Examples** — embed sample calls in tool definitions to improve invocation accuracy for complex parameters.
- **"Think" tool** — force Claude to pause and reason between tool calls. Useful for policy-heavy or sequential decision-making skills.

---

## Extended/Adaptive Thinking

- Opus 4.6 and Sonnet 4.6 support adaptive thinking — Claude decides when deeper reasoning is needed.
- `effort` parameter: `low`, `medium`, `high`, `max` — controls speed/cost/intelligence tradeoff.
- Interleaved thinking — Claude can think between tool calls to evaluate intermediate results.

---

## Skill Design Implications

**Guiding principle: aggressive context management.**

- Prefer modular subagents over monolithic skills for heavy tasks
- Use Tool Search Tool for large tool libraries — don't load everything upfront
- Use PTC for skills processing large datasets
- Add tool use examples for complex parameter patterns
- Use the "think" tool for skills requiring sequential reasoning
- `disable-model-invocation: true` on skills you only want manually triggered (keeps description out of context)

---

## MCP Integration

Claude connects to external services via MCP: GitHub, Slack, Google Drive, Jira, Figma, Sentry, and others.

---

*To refresh: run a capabilities review session, query the notebook, update this file.*
