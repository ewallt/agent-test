# Session Handoff — 2026-03-08

## What Was Done This Session

### Shutdown routine built
- New skill at `~/.claude/skills/shutdown/SKILL.md` — invoked with `/shutdown`
- Flow: handoff discussion (collaborative) → session log, pending, tasks.json, git commit (independent)
- No server shutdown, no promote — those are separate deliberate acts
- User preference confirmed and saved to MEMORY.md: Claude always writes session log entries, never asks Tom to narrate

### Server persistence clarified
- Remotion studios (3000/3001/3002) and task manager (3010) are OS-level processes — persist across Claude sessions
- `startup.md` and `remotion-context.md` updated: check ports first, start only if not already running
- "May need restarting" language removed from documentation

### Braess's Paradox — full notebook build
- Notebook created: `fc34301f-00c3-4065-8617-1ce6a74f3809`
- Knowledge base written by Claude from general knowledge (no nlm research) — added as source, temp file deleted
- Gemini slide manifest written — `artifacts/braess-paradox/manifest.md` (8 slides, 1960s technical illustration style)
- Both added as notebook sources; video queued (`215894d5`) — retro_print style, still rendering
- Inference web app built — `artifacts/braess-paradox/app.html` (Explorer + Quiz tabs, groq proxy)
- Task file created — `tasks/braess-paradox.md`

### Artifacts folder restructure
- Retired flat `apps/` and `slideshows/` folders in favour of `artifacts/<topic-slug>/`
- Each topic folder holds: `app.html`, `slides.html`, `manifest.md`
- Existing apps migrated: braess-paradox, double-entry-bookkeeping, other-lane, poc
- `.gitignore` updated: `**/artifacts/**/slides.html` excluded (large base64 files)
- CONTEXT.md, skill-inference-app.md, skill-slideshow-manifest.md updated

### GitHub setup
- Repo created: `https://github.com/ewallt/claude-code-fun` (public)
- `main` and `dev` branches pushed; `promote.sh` updated to push both branches after merging
- `gh-pages` orphan branch created; GitHub Pages enabled
- Braess's Paradox web app live: `https://ewallt.github.io/claude-code-fun/braess-paradox/`
- Braess's Paradox slides live: `https://ewallt.github.io/claude-code-fun/braess-paradox-slides/`

### Character Narrator — future project concept
- Design doc: `documents/future-projects/character-narrator.md`
- Second-person character-driven animated videos (inspired by "How to Penguin")
- Added to tasks.json as `we-4`, priority 5; prerequisite: Rough.js in whiteboard explainer V2 first

### Other
- `documents/skills-installer-guide.html` — explains `npx skills` CLI and installed skills
- `source add --file` uses positional notebook ID confirmed (not `--notebook-id` flag)

---

## State Right Now

- On `dev` branch; changes from this session uncommitted
- Braess's Paradox video still rendering (`215894d5`) — not yet shared
- Task file `tasks/braess-paradox.md` not yet moved to `completed/`
- GitHub Pages live and built

## Next Session Priority

No specific priority set. Top candidates from tasks.json: 6 new whiteboard scene types (we-1), Tallest Buildings wiring (bcr-1), unified artifact workflow (nlm-1).

## Other Items

- Check Braess's Paradox video status next session and share the notebook
- Move `tasks/braess-paradox.md` to `completed/` once video confirmed and notebook shared
- Deploy script for gh-pages worth building (discussed but not built this session)
