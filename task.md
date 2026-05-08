# Task: Shared Skills Sync System
Date: 2026-05-07

## Goal
Make `agent-test/skills/` the canonical source of truth for all skills, with a sync script that distributes to each agent's skills directory.

## Steps
- [x] Rename `claude-backup/skills/` → `skills/` at agent-test root
- [x] Copy 8 missing Claude skills into canonical location
- [x] Copy 3 agent-only skills (codex-environment, google-docs-bridge, nlm-skill) into canonical location
- [x] Write AGENTS.txt manifests to 8 shared skills
- [x] Write sync script (`skills/sync.sh`) with path substitution and per-agent targeting
- [x] Run first sync to verify all agent directories update correctly
- [ ] Commit to git

## Notes
- Agent skill paths: `~/.claude/skills/` (82), `~/.agents/skills/` (8), `~/.codex/skills/` (8), `~/Documents/gemini-test/skills/` (8)
- The 8 shared skills: codex-environment, google-docs-bridge, nlm-skill, playlist-ideas, post-compact, pre-compact, scene-writer, skill-creator
- 8 Claude skills not yet in backup: app-dashboards, gear-tab-content, gear-tab-gem, living-task, mac-permissions-fix, nlm-notebook-lookup, tcc-restore, tcc-serialize
- Path substitution needed: Windows paths (C:\Users\tomew\...) → Mac paths (/Users/tom/...)
- Not all skills go to all agents — per-agent targeting via a manifest file in each skill folder
