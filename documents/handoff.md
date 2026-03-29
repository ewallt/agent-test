# Session Handoff — 2026-03-28

## What Was Done This Session

### Meta Notebook Concept
- Established "meta notebook" as a new notebook type — notebooks whose purpose is to inform Claude rather than produce artifacts or feed a web app
- Distinguished from ephemeral/research notebooks: meta notebooks are persistent knowledge bases queried on demand
- Identified high-value domains: doodle animation, UX/interface design, BYG theology (future)

### The Art of Doodle Animation Notebook (meta)
- Created notebook ID: `cfac8154-ed1d-4de1-9871-7a0fa556e41e`
- Fast research mode — 10 sources imported: Rough.js, vivus.js, Lazy Line Painter, DrawSVG/GSAP, Cassie Evans SVG path animation, hand-drawn motion with SVG filters, easing handbook, Codrops
- Purpose: query when building whiteboard explainer doodle scenes
- Logged in run-log.md, ID saved to working-notes.md

### UX and Interface Design Notebook (meta)
- Created notebook ID: `ae466d18-9614-497d-a521-0bf8af99a8be`
- Deep research mode — 48 sources imported: Laws of UX, Material Design 3, Apple HIG, WCAG 2.2, Smashing Magazine, IxDF, cognitive load research, filter/search patterns, educational app UX, design systems
- Added two additional sources via `nlm source add --file`:
  - Anthropic `frontend-design` SKILL.md (source ID: dfda4a94)
  - Tom's four UI color schemes (source ID: 21ce3d58)
- Logged in run-log.md, ID saved to working-notes.md

### notebooklm-deep-research Skill (new)
- Created `~/.claude/skills/notebooklm-deep-research/SKILL.md`
- Generates deep research queries for `nlm research start` CLI command
- Key insight: queries are detailed research briefs, not one-liners; `--mode deep` returns ~50 sources
- Includes query anatomy, deep vs. fast mode guidance, curation checklist, multi-pass strategy

### Local-Skills Architecture (new)
- Problem: modifying Anthropic skills (skill-creator + JIT) is fragile — changes lost on reinstall
- Solution: three-layer architecture:
  - `~/.claude/CLAUDE.md` — global standing instruction, lists skills with local augmentations
  - `~/.claude/local-skills/<skill-name>.md` — master files with augmentations
  - Anthropic skills — stay pristine
- Created `~/.claude/CLAUDE.md`
- Created `~/.claude/local-skills/skill-creator.md` — JIT guidance extracted here
- Created `~/.claude/local-skills/frontend-design.md` — query UX notebook before designing
- Created `~/.claude/local-skills/ux-color-schemes.md` — exact hex values for four color themes (directly readable, not just queryable)
- Restored `skill-creator` SKILL.md to pristine (removed JIT block)

### Color Schemes Reference
- Tom's four production themes from Context Navigator app: Explorer (warm earthy, Tom's favorite — from Gemini), Archives (light neutral), High-Command (dark forest green), Navy (deep blue)
- Saved to `~/.claude/local-skills/ux-color-schemes.md` with exact CSS variable hex values
- Also uploaded to UX notebook as a source

---

## State Right Now

- On `dev` branch
- Three meta notebooks live: Architecture of Engagement (existing), Doodle Animation (new), UX and Interface Design (new)
- Local-skills architecture in place; skill-creator restored to pristine
- notebooklm-deep-research skill installed and correct

## Next Session Priority

Firecrawl — Tom will brief at session start.

## Other Items

- `sns-7`: Build Illustration 00 — The King They Made and Killed — still pending
- `byg-1`, `rem-1`, `nlm-16`, `inf-16`: Publish pipeline tickets — placeholders, not yet designed
- `inf-15`: Add `durations.test.ts` to cross-check audio file sizes vs frame counts

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: None — Tom will brief at session start. Topic is Firecrawl.
