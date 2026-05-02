---
name: Re-read deploy skills before running
description: Always re-read gh-pages-deploy SKILL.md before executing — session-reminder content can be stale
type: feedback
originSessionId: daec71be-d60f-4899-be72-87f86f0e4b54
---
Always re-read `C:\Users\tomew\.claude\skills\gh-pages-deploy\SKILL.md` before running a deploy, even if the skill content appears in the session-reminder. Session-reminder content reflects what was loaded earlier (possibly from a prior session before compaction) and can be outdated.

**Why:** Ran the old worktree approach (which pushes to `origin` = agent-test) because the session-reminder had the pre-update version. The file already had the correct clone approach for claude-code-fun. This caused a bad push to agent-test/gh-pages that had to be reverted.

**How to apply:** For gh-pages-deploy specifically — and any deploy or destructive skill — do a fresh Read of the SKILL.md before executing commands, regardless of what the session-reminder shows.
