# Session Handoff — 2026-03-28

## What Was Done This Session

### The Arc — Scrollytelling Tab
- Added "The Arc" scrollytelling tab to `behold-your-god.html` — scroll-driven narrative through the great controversy in 5 beats: Before Time → Eden → Calvary → Last Days → The End
- Each beat has a heading, narrative paragraph, Wright quote, and scroll-triggered fade-in via IntersectionObserver
- "The Arc" is now the first tab and default landing view
- Content drawn from `knowledge-base.md` and "The Architecture of Engagement" NotebookLM notebook (queried for scrollytelling metrics and arc patterns)

### Illustration 02 — God Is Not a Criminal
- Discovered `TITLE_FRAMES = 120` was too short — title audio 4.5s, bumped to 150 frames
- Rendered `god-not-criminal-v1.mp4` (9.1 MB, 2643 frames)
- Created wrapper `byg-god-not-criminal.html`
- Deployed MP4 + wrapper to `notebooklm/byg-god-not-criminal/` on gh-pages
- Updated Illustrations tab badge to ▶ Watch; notes.md checklist marked complete
- Project-definition.md updated: Illustration 02 marked ✅ Complete (v1)

### Web App Versioning — v2.0
- Bumped `behold-your-god.html` from v1.1 → v2.0
- Removed version numbers from both wrapper pages (`byg-nuclear-plant.html`, `byg-god-not-criminal.html`) — wrappers don't need versioning; the main app does
- Changed illustration links from `target="_blank"` to same-tab navigation
- Redeployed `behold-your-god.html` to gh-pages

### Testing Infrastructure
- Wrote `Projects/Infrastructure/documents/testing.md` — full audit of current tests, what's good, what's missing, priority order
- Updated `simple-narrated-slides/tests/structure.test.ts` — now covers NuclearPlant and GodNotCriminal via `BYG_COMPOSITIONS` array; adding future illustrations is a one-line change
- Added ticket `inf-15`: add `durations.test.ts` to cross-check audio file sizes vs frame counts (catches title clip issues)

### Memory Updates
- Created `feedback_byg_audio.md` — BYG uses Edge TTS, not ElevenLabs
- Updated `MEMORY.md` with audio feedback pointer
- Updated `startup.md` — added "Repeatable Work → Skills" standing instruction: flag any repeatable task that doesn't have a skill

### Deployment Pipeline Discussion
- Established 4 projects: BYG, Remotion, NotebookLM, Infrastructure
- 3 levels: local, dev (GitHub dev), main (GitHub main)
- Concluded Option 1 (test before committing to dev) is the right model
- Added placeholder tickets: `byg-1`, `rem-1`, `nlm-16`, `inf-16` for per-project publish pipelines

### byg-deploy Skill
- Created `~/.claude/skills/byg-deploy/SKILL.md`
- 6-step skill: identify scope → run automated tests → Tom's visual sign-off → bump minor version → stage and commit to dev → confirm
- Covers new illustrations and web app updates

---

## State Right Now

- On `dev` branch
- Illustration 02 complete and live; web app at v2.0 deployed to gh-pages
- All local changes not yet committed to dev (byg-deploy skill not yet run this session)
- Testing doc written; structure tests updated and passing

## Next Session Priority

NotebookLM — Tom is bringing context. Wait for his briefing before doing anything.

## Other Items

- `sns-6`: Deploy `behold-your-god.html` v1.1 — superseded; v2.0 already deployed
- `sns-7`: Build Illustration 00 — The King They Made and Killed — still pending
- `byg-1`, `rem-1`, `nlm-16`, `inf-16`: Publish pipeline tickets — placeholders, not yet designed

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: NotebookLM

Tom will brief you at session start — do not pre-load workflow context.
