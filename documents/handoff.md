# Session Handoff — 2026-03-25

## What Was Done This Session

### Bypass Permissions Fix
- Tom downgraded Claude Code to v2.1.77 to fix bypass permissions not working
- Session started after that fix was applied

### Flashcard Skill Formalized
- Created `~/.claude/skills/notebooklm-webapp-flashcard/SKILL.md`
- Documents the full flashcard app pattern: card structure, all 8 features, CSS tokens, JS skeleton with `indexMap` pattern, file naming convention
- References `byg-flashcards.html` as the reference implementation
- Updated `notebooklm-webapp` skill's "Future Expansion" section → renamed "App Type Variants", now cross-references flashcard and tabbed skills

### Bundled Web App Architecture — Designed and Built
New "Option C" approach: one HTML file per topic with multiple app types as top-level tabs.

**Three new skills created:**
- `notebooklm-webapp-explorer-tab` — Explorer+Quiz as a scoped section (`#explorer-tab`, `ExplorerTab` namespace)
- `notebooklm-webapp-flashcard-tab` — Flashcard as a scoped section (`#flashcard-tab`, `FlashcardTab` namespace)
- `notebooklm-webapp-bundle` — assembler skill; reads tab skills, builds shell with global CSS tokens + tab nav + lazy-init coordinator

**Key design decisions:**
- Existing standalone skills unchanged — both approaches coexist
- Task file syntax: `app_type: bundle`, `app_tabs: [explorer, flashcard]`
- Rebuild-on-change (not append-in-place)
- CSS scoped to section IDs; JS in namespace objects; flashcard keyboard only fires when tab is active

### BYG Bundle — Built
- Rewrote `behold-your-god.html` as the first bundled app (Explorer+Quiz + Flashcards)
- Fixed CSS specificity bug: `#flashcard-tab { display: flex }` was overriding `.tab-section { display: none }` — fixed by wrapping flashcard content in `.fc-inner`
- Added row hover color effect to Explorer table (`tr:hover td { color: var(--accent) }`)
- Added `feedback_naming.md` memory — proactively watch for naming ambiguity

### Illustrations Tab — Added to BYG Bundle
- New first tab: "Illustrations" — lists all 10 F.T. Wright illustrations
- Each item shows illustration number, title, one-line description
- Illustration 01 (Nuclear Power Plant) has a "▶ Watch" badge linking to `byg-nuclear-plant.html`
- Illustrations 02–10 are dimmed with "Coming Attraction" badge (non-clickable)

### NuclearPlant Remotion Video — Built (blocked on audio)
- Created `src/NuclearPlant.tsx` — 4-slide composition, cyan/teal aesthetic, reactor glow pulse effect
- Created `scripts/generate-nuclear-audio.mjs` — ElevenLabs audio script (George voice)
- Generated audio: 5 MP3 files in `public/audio/nuclear/` — title + 4 slides
- `src/nuclear-durations.ts` auto-generated with real durations
- Registered `NuclearPlant` composition in `Root.tsx`
- Rendered to `out/nuclear-plant.mp4` — **no audio** due to Windows audio driver issue affecting Chrome (both studio preview and headless render)
- **Fix: reboot Windows**

---

## State Right Now

- `dev` branch has all session changes, not yet committed
- `behold-your-god.html` is the new bundled app (Explorer + Flashcards + Illustrations tabs)
- `byg-flashcards.html` standalone remains untouched
- NuclearPlant MP4 rendered but silent — needs reboot + re-render
- Simple-narrated-slides studio may or may not still be running on port 3001

## Next Session Priority

Re-render NuclearPlant after reboot fixes Windows audio. Verify audio in studio preview and rendered MP4. Deploy the MP4 to gh-pages and wire up the Illustrations tab link in `behold-your-god.html`. Then continue building remaining illustration videos.

## Other Items

- **Blocked:** NuclearPlant audio — Windows audio issue, fix with reboot
- `inf-11` — fix mercy gh-pages deploy to use index.html/subfolder convention (carried over)
- `inf-10` — document system audit and consolidation (ongoing backlog)

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: remotion

Context: NuclearPlant composition is built and ready — audio files generated, composition registered, placeholder render exists. Windows audio was broken this session — reboot should fix it. Re-run render (`npx remotion render NuclearPlant out/nuclear-plant.mp4`), verify audio, then deploy to gh-pages and wire up the Illustrations tab link in `behold-your-god.html`.
