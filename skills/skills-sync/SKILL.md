---
name: skills-sync
description: >
  Reference for the shared skills sync system. Use when Tom asks about how skills are
  synced across agents, wants to add a skill to other agents, needs to understand the
  canonical skills location, asks how to run a sync, or needs Claude to coordinate
  skill work with another agent.
---

## Concept

`agent-test/skills/` is the canonical source of truth for all skills across all AI agents.
Git is the sync mechanism. A sync script distributes skills to each agent's local directory.

Claude is the orchestrator: when a skill is created or updated by another agent, Claude
pulls it into the canonical location, syncs it, and manages any cross-agent coordination.

---

## Agent Skill Directories

| Agent | Skills Path |
|---|---|
| Claude | `~/.claude/skills/` |
| Antigravity | `~/.agents/skills/` |
| Codex | `~/.codex/skills/` |
| Gemini CLI | `~/Documents/gemini-test/skills/` |

---

## Sync Script

```bash
bash /Users/tom/Documents/agent-test/skills/sync.sh          # all agents
bash /Users/tom/Documents/agent-test/skills/sync.sh claude   # Claude only
bash /Users/tom/Documents/agent-test/skills/sync.sh agents   # Antigravity only
bash /Users/tom/Documents/agent-test/skills/sync.sh codex    # Codex only
bash /Users/tom/Documents/agent-test/skills/sync.sh gemini   # Gemini CLI only
```

The script:
- Copies each skill from canonical → agent directory using `rsync`
- Runs path substitution on `SKILL.md` (Windows paths → Mac paths)
- Skips the `archive/` folder

---

## Which Skills Go to Which Agents

Each skill folder may contain an `AGENTS.txt` file with a space-separated list of agent names:

```
claude agents codex gemini
```

- Skills **with** `AGENTS.txt` → copied to all listed agents
- Skills **without** `AGENTS.txt` → Claude only (default)

**Current shared skills (all 4 agents):**
codex-environment, google-docs-bridge, nlm-skill, playlist-ideas, post-compact, pre-compact, scene-writer, skill-creator

---

## Workflow

**After modifying a skill:**
1. Edit the skill in `agent-test/skills/<skill-name>/SKILL.md`
2. Run `bash skills/sync.sh` to distribute to agent directories
3. Commit to git

**After modifying a skill directly in `~/.claude/skills/`:**
1. Copy it back to canonical: `cp -r ~/.claude/skills/<skill> agent-test/skills/`
2. Run `bash skills/sync.sh`
3. Commit to git

**To add a new skill to other agents:**
1. Create `agent-test/skills/<skill-name>/AGENTS.txt` listing the target agents
2. Run `bash skills/sync.sh`
3. Commit to git

---

## Path Substitution

The sync script automatically replaces Windows paths with Mac equivalents in `SKILL.md` after copying:

- `C:\Users\tomew\Documents\agent-test` → `/Users/tom/Documents/agent-test`
- `C:/Users/tomew/Documents/agent-test` → `/Users/tom/Documents/agent-test`

If a skill has other hardcoded paths that need substitution, update the `substitute_paths()` function in `sync.sh`.

---

## Claude as Orchestrator

Claude manages all cross-agent skill coordination. Tom does not need to brief other agents directly.

### When another agent creates a skill

1. Read the skill from the agent's skills directory
2. Copy it to canonical: `cp -r <agent-skills-path>/<skill> agent-test/skills/`
3. Review and clean up if needed (paths, formatting)
4. Add `AGENTS.txt` if it should be shared beyond the originating agent
5. Run `bash skills/sync.sh`
6. Commit to git

### When a skill needs to be updated across agents

1. Make the edit in `agent-test/skills/<skill-name>/SKILL.md`
2. Run `bash skills/sync.sh`
3. Commit to git
4. If another agent needs to be informed of the change, send a message via the protocol below

### Briefing another agent on a skill

When Tom wants another agent to use a new or updated skill, write a message explaining:
- What the skill does and when to trigger it
- Any path or environment differences relevant to that agent
- Whether it replaces an existing behavior

---

## Inter-Agent Communication Protocol

Claude communicates with other agents via files in `~/Documents/gemini-test/`.

| Direction | File |
|---|---|
| Claude → Antigravity/Gemini | `/Users/tom/Documents/gemini-test/for-antigravity.txt` |
| Antigravity/Gemini → Claude | `/Users/tom/Documents/gemini-test/for-claude.txt` |
| Claude → Codex | `/Users/tom/Documents/gemini-test/for-codex.txt` |
| Codex → Claude | `/Users/tom/Documents/gemini-test/for-claude.codex-test.txt` |

**Message format:**
```
FROM: Claude
DATE: YYYY-MM-DD HH:MM
---
[message body]
```

**Shorthands:** `wm` = write message to Antigravity, `rm` = read message from Antigravity.

Tom relays messages between agents — write the message, then tell Tom it's ready to send.
