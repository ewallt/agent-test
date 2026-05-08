---
name: skills-sync
description: >
  Reference for the shared skills sync system. Use when Tom asks about how skills are
  synced across agents, wants to add a skill to other agents, needs to understand the
  canonical skills location, or asks how to run a sync.
---

## Concept

`agent-test/skills/` is the canonical source of truth for all skills across all AI agents.
Git is the sync mechanism. A sync script distributes skills to each agent's local directory.

This replaces the old `claude-backup/skills/` folder.

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
