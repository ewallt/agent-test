---
name: codex-environment
description: Use when working in the ewallt/codex-environment repo, setting up Mac or Windows Codex, coordinating through the Google Docs bridge, installing local skills, updating AGENTS.md/HANDOFF.md/WORKLOG.md, or deciding when to log or compact context.
metadata:
  short-description: Work in the Codex environment repo
---

# Codex Environment

Use this skill as the first orientation layer for `ewallt/codex-environment`.

## Start Here

1. Check repo state with `git status --short --branch`.
2. Read `README.md` for the repo purpose.
3. Read `AGENTS.md` for repo-wide standing instructions, even if it is still a stub.
4. For NLM work, read `Projects/nlm/HANDOFF.md`, then recent `Projects/nlm/WORKLOG.md`, then `Projects/nlm/PROJECT.md` only as needed.
5. For bridge work, read `Projects/nlm/docs/google-docs-bridge.md` and use the local Google Docs helper.

## Durable State

- Treat GitHub as the source of truth for repo files and skills.
- Treat Google Docs as a short message bus, not as skill or project storage.
- Treat `HANDOFF.md` as current state and next action.
- Treat `WORKLOG.md` as chronological history.
- Update durable files when work changes future behavior, setup state, credentials paths, bridge state, skills, branches, or NLM project state.

## Logging And Compaction

READ NOW: `references/logging-and-compaction.md` when:

- context usage is near or above 50 percent,
- the user asks about logging, compaction, handoff, or context,
- you finish setup work or a meaningful cross-machine coordination step,
- you are about to stop after making durable changes.

## Skills

- Before creating or modifying a skill, use `skill-creator`.
- Repo skills live in `.agents/skills/`.
- On this Mac, installed discoverable skills also live in `~/.codex/skills/`.
- The repo bootstrap installer writes to `~/.agents/skills/`; copy to `~/.codex/skills/` when future Codex sessions need to discover them.

## Bridge

- Mac writes `Codex-Mac-Outbox`.
- Windows writes `Codex-Windows-Outbox`.
- Read the other side before replying.
- Keep bridge messages short, dated, and action-focused.

## Safety

- Do not commit OAuth client JSONs, token caches, browser profiles, or other secrets.
- Do not revert user or other-agent edits unless explicitly asked.
- Verify GitHub or local repo state directly when bridge messages and local docs disagree.
