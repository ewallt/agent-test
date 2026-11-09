# Skills unification — handoff from App Claude to Claude Code

Written 2026-11-09 by App Claude (claude.ai, cloud session). Tom asked for this so Claude Code
on the Mac can finish the job. Plan being followed: Google Doc "Claude Skills — Status and
Unification Plan" (Drive, "Claude User Guide" folder), written 2026-09-28.

Goal: one private repo, `ewallt/claude-skills`, as the source of truth for all of Tom's skills,
with `account/` (works anywhere) and `code/` (needs Claude Code's local tools).

## What App Claude did

Built the repo layout in a cloud workspace and committed it locally. It is NOT on GitHub:
that session could not create a new repository. Tom has the result as `claude-skills.zip`.
You can rebuild it from the steps below.

### 1. Sources read

| Source | Path | State |
| --- | --- | --- |
| ewallt/agent-test, branch `dev` | `claude-backup/skills/` | Full backup 2026-05-01; math-visual-explainer added 2026-11-05 |
| ewallt/codex-environment | `.agents/skills/` | 2026-05-05 |
| ewallt/agent-test and ewallt/claude-code-fun | `Projects/Remotion/whiteboard-explainer/.claude/skills/remotion-animation` | Both copies identical |
| claude.ai account | six user skills | Read from the account 2026-11-09 |
| anthropics/skills | whole repo | Used only to diff the stock skills |

NOT read: the live `~/.claude/skills` on the Mac (protected location for the app). This is the
main thing left for you.

### 2. Stock Anthropic skills left out (17)

algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx,
frontend-design, internal-comms, mcp-builder, pdf, pptx, slack-gif-creator, template-skill,
theme-factory, web-artifacts-builder, webapp-testing, xlsx.

Diffed against anthropics/skills at HEAD: only doc-coauthoring is identical. The rest differ
(2 lines for most; hundreds to thousands for claude-api, docx, pptx, xlsx, pdf; 70 for
frontend-design; 40 for mcp-builder). Not determined whether that is version drift or Tom's
edits. frontend-design contains a `C:\Users\tomew` path, which suggests a local edit — check it.

`skill-creator` was KEPT in `code/`: the backup copy is Tom's "Local Augmentations" wrapper
that reads a `SKILL.pristine.md`, not the stock skill.

### 3. Folder assignments (70 skills)

**account/ (12)**
- Already installed on the claude.ai account: study-reader, x-post-infographic,
  comparison-table-infographic, evidence-grid-infographic, math-visual-explainer, pptx-edu.
  (The backup's math-visual-explainer SKILL.md is identical to the account's.)
- Candidates from the backup, not yet installed on the account: chatgpt-image-prompt,
  dialog-maker, generating-ideas, gemini-slide-style, scene-writer, youtube-growth.

**code/ (46)**
byg, byg-deploy, byg-edge-tts, claude-capabilities, doc-writer, gear-tab-app, gh-pages-deploy,
gic-integration, layered-reader-builder, nlm-to-youtube, nlm-web-app, notebooklm-deep-research,
notebooklm-ephemeral-notebook, notebooklm-infographic, notebooklm-infographic-prompt,
notebooklm-slide, notebooklm-slide-manifest, notebooklm-source-prep, notebooklm-video,
notebooklm-webapp, notebooklm-webapp-bundle, notebooklm-webapp-explorer-tab,
notebooklm-webapp-flashcard, notebooklm-webapp-flashcard-tab, notebooklm-webapp-tabbed,
playlist-ideas, post-compact, post-compact-playlists, pre-compact, project-report,
project-restructure, prompt-library-push, remotion-narrated-slides, scene-source-improver,
session-logger, shutdown, skill-creator, source-reader, startup, ticket-tracker,
video-dashboard, video-orchestrator, video-sync-apply, video-sync-check, whiteboard-explainer,
youtube-publish.

**code/third-party/ (4)**: find-skills, remotion, remotion-best-practices (from the backup);
nlm-skill (from codex-environment).

**code/project-local/ (1)**: remotion-animation.

**codex/ (6)**: codex-environment, google-docs-bridge (Codex-only); plus the Codex variants of
playlist-ideas, post-compact, pre-compact, scene-writer, which differ from the backup versions
and were not merged. codex-environment's skill-creator is identical to the backup's and was
not duplicated.

**archive/ (2)**: skill-oiler (from `archive/`), dialog-maker-workspace (eval workspace, no
SKILL.md).

### 4. Edits made (account/ copies only)

- dialog-maker (SKILL.md, modes/transform.md) and chatgpt-image-prompt (SKILL.md):
  `C:\Users\tomew\.claude\skills\<skill>\<file>` rewritten to `<file> (in this skill's folder)`.
  All referenced files exist in the skill folders.
- scene-writer: copied
  `Projects/NotebookLM/playlists/documents/nlm-cinematic-scene-rules.md` into
  `account/scene-writer/references/` and rewrote the `C:\...\ephemeral-notebook\documents\...`
  path to `references/nlm-cinematic-scene-rules.md`. Note the old path said
  `ephemeral-notebook`; the file now lives under `playlists` (renamed 2026-04-26).

Nothing under `code/` or `codex/` was edited.

### 5. Findings

- **Windows paths.** These backup skills reference `C:\Users\tomew\...` and will not resolve
  on the Mac: byg, byg-deploy, byg-edge-tts, claude-capabilities, gear-tab-app, gh-pages-deploy,
  gic-integration, layered-reader-builder, nlm-to-youtube, notebooklm-ephemeral-notebook,
  notebooklm-source-prep, notebooklm-webapp-tabbed, playlist-ideas, post-compact,
  post-compact-playlists, pre-compact, project-report, scene-source-improver, session-logger,
  shutdown, skill-creator, source-reader, startup, video-dashboard, video-sync-check,
  whiteboard-explainer, youtube-publish (27), plus nlm-skill and the Codex google-docs-bridge,
  playlist-ideas, post-compact, scene-writer. The live Mac copies may already be fixed
  (the 2026-05-01 commit mentions "mac transfer infra").
- **No overlap with study-reader.** gear-tab-app (4-theme tabbed app) and
  layered-reader-builder (GiC lens reader) are different designs and read spec files under
  `Projects/AugmentedChat/`, so they stay in `code/`. No merge.
- Validation: all 70 have a SKILL.md with `name` and `description` frontmatter (archive's
  workspace excepted). No credentials found by a pattern scan.

## What is left for Claude Code

1. Compare live `~/.claude/skills` against the lists above. For each skill take the newer
   version; add any skill that exists only on the Mac; note any that exist only in the backup.
2. Create the private repo `ewallt/claude-skills` and push the layout in section 3, with a
   README carrying this inventory. Use Tom's `claude-skills.zip` if he supplies it, otherwise
   rebuild from the sources. The six installed account skills are not in any repo: take them
   from the zip, or leave `account/` to App Claude, who can push them once the repo exists.
3. Fix the Windows paths in `code/` (prefer paths relative to the skill folder or the repo
   root) and test that each skill finds its files.
4. Decide with Tom whether the stock-skill differences in section 2 are his edits.
5. Point `~/.claude/skills` at the repo's `code/` skills (clone plus links).
6. Leave to App Claude: proposing the six account candidates as review cards on claude.ai.
   Claude Code cannot install account skills.

## Open decisions for Tom

- Keep or remove the public backup in agent-test once claude-skills exists.
- Which of the six account candidates to install.
- Whether to merge the Codex variants.
