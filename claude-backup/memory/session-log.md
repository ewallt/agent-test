# Session Log

A record of changes made to the workflow, memory system, and skills — not notebook builds (see run-log.md for those).
Scan the most recent entry at session startup to get context on what was last worked on.

---

## 2026-04-30 14:30 — gear-tab-app skill + ChatGPT Images app + sp-restaurants update + Google Drive MCP

### gear-tab-app skill created
- New skill at `C:\Users\tomew\.claude\skills\gear-tab-app\SKILL.md`
- Builds themed, tabbed single-file HTML apps from varied input (idea/doc/data), deploys via gh-pages-deploy
- JIT: `references/build-checklist.md` read at build step; theme spec read at build step
- Key note: use swatch dot pattern (not cycling gear icon) — ref apps are authoritative over spec doc

### chatgpt-images-use-cases.html built and deployed
- Built from Matt Wolf's ChatGPT Images 2.0 YouTube transcript
- 7 tabs: Creators, Social Media, Branding, Marketing, Infographics, Planning, Apps & Products (~44 use cases)
- TABS_META object provides per-tab intro paragraph; tab buttons show item count
- Deployed: https://ewallt.github.io/claude-code-fun/chatgpt-images-use-cases/
- Dashboard updated with new "AI Tools" category (deployed to dashboard/ subfolder)

### sp-restaurants.html updated (v1.1)
- Added Pizza tab (4 restaurants: Pizza Chena topPick, Paul's Boutique, Bráz, Bacio del Nonno)
- Added Japanese tab (4 restaurants: TATÁ Sushi topPick, Kinoshita Michelin star, Kuro omakase, Hakka)
- Deployed to https://ewallt.github.io/claude-code-fun/sp-restaurants/

### Hello-world test prompt deployed to GitHub Pages
- `prompts/hello-world.txt` at https://ewallt.github.io/claude-code-fun/prompts/hello-world.txt
- For testing ChatGPT's ability to read and execute prompts from public URLs

### Google Drive MCP — auth attempted, incomplete
- `claude.ai Google Drive` MCP present and connected but token not picked up by Claude Code
- `mcp__gdrive__search` consistently fails (invalid_request — no credentials configured)
- Tom completed OAuth browser flow; needs Claude Code restart to take effect

---

## 2026-04-29 12:23 — Layered Reader Healthy Aging + skill improvements + YouTube prep

### Layered Reader — Healthy Aging built and deployed
- Built `layered-reader-healthy-aging.html` (8 sources × 6 scenes = 48 sections), green health theme
- Deployed to https://ewallt.github.io/claude-code-fun/notebooklm/layered-reader-healthy-aging/
- Now at v1.4 after several iterative fixes this session

### layered-reader-builder skill — major improvements
- **Tailored lenses**: generic engagement menu replaced with subject-specific 3×3 lenses; skill now requires proposing lenses to Tom before building
- **DOM active lens exposure**: `useEffect` wiring `#ai-control-plane`, `aria-pressed` on buttons, sr-only text updated to `Current Active Lens: "..."` — required for AI reading agents
- **Version meta tag**: `<meta name="app-version">` added to all future builds so reading agents can confirm which version is loaded
- **Agent-agnostic instructions**: removed "For Gemini in Chrome" language; now "AI Reading Agent Instructions" throughout

### gh-pages-deploy skill — fixed + memory saved
- Root cause of wrong-repo push: session-reminder had stale worktree-based skill version; pushed to `agent-test` instead of `claude-code-fun`
- Skill already had correct clone approach in file; bad deploy reverted; memory + CLAUDE.md updated: always re-read deploy skill before running

### YouTube uploads — blocked on OAuth
- 4 GP videos downloaded and moved to `Not Yet in YouTube/`: Surtsey, Lake of Waiting, Corridor Current, Conquest of Emptiness
- Dashboard cards added/updated (all status: downloaded)
- Upload attempt failed: OAuth token expired; Tom must re-authorize manually first (see handoff)

---

## 2026-04-28 17:50 — ForCodex.md rewritten; Codex readiness questions

### ForCodex.md overwritten
- Old content (PKA notes, scene-writer text, old Q&A) replaced entirely
- New content: brief intro (goal = Codex as backup NLM pipeline operator) + 10 questions for Codex
- Questions cover: full pipeline knowledge, scene-writer skill, nlm CLI skill, notebook IDs, dashboard rules, file paths, YouTube boundary, auth handling, self-assessed gaps
- Codex confirmed to have both `nlm-skill` and `scene-writer` in `~/.agents/skills/` — covers most of the pipeline
- YouTube publish remains Claude Code only; Codex should stop at download

---

## 2026-04-28 17:00 — Layered Reader deployed to gh-pages as lr-modern-art

### Pheasant Island video downloaded and published
- Video completed in NLM as "The Condominium Paradox" (artifact `ee894621`)
- Downloaded to `Videos/Geography Potpourri/Not Yet in YouTube/The Condominium Paradox.mp4`
- Uploaded to YouTube as private via `youtube-upload.py`
- Dashboard card updated: `nlm` → `downloaded` → `youtube`; nlmTitle set to "The Condominium Paradox"
- File moved to `Videos/Geography Potpourri/The Condominium Paradox.mp4`

### Layered Reader web app deployed
- Full single-file React app (React 18 + Babel + Tailwind CDN) built by Gemini connected to Movements in Modern Art notebook
- Deployed to gh-pages branch of agent-test repo
- Initially deployed as `notebooklm/layered-reader/` — Tom flagged naming collision risk
- Renamed to `notebooklm/lr-modern-art/` — `lr-` prefix established as convention for layered reader apps
- Live at: `https://ewallt.github.io/agent-test/notebooklm/lr-modern-art/`

### gh-pages-deploy skill has stale repo reference
- Skill says `claude-code-fun` but actual repo is `agent-test`
- Flagged but not yet fixed — should be updated in the skill

### Existing layered reader prompts found
- `Projects/AugmentedChat/prompts/layered-reader-impressionism.md` — deployment-ready prompt for Movements in Modern Art notebook
- `Projects/AugmentedChat/documents/layered-reader.md` — reference doc for GiC mode, lens menu, tech stack, gotchas

---

## 2026-04-27 21:26 — Geography Potpourri batch complete; next batch planned

### 4 Geography Potpourri uploads completed (parallel)
- Uploaded: Diomede Islands, Nauru, Dead Sea, Catatumbo Lightning — all private, added to playlist
- All 8 from this batch now at `status: youtube`; files moved from Downloads to Videos folder
- Desc files written to `tools/` (desc-diomede, desc-nauru, desc-deadsea, desc-catatumbo)

### Permission settings review
- Confirmed settings correct: bare `Read`/`Write`/`Edit` are valid, `skipAutoPermissionPrompt` is a real key
- Redundant `.claude/**` entries are harmless; no changes made
- Prompts during uploads were likely a session-pickup issue, not a config problem

### Handoff written
- Next batch: Tristan da Cunha, Korean DMZ, Pitcairn Island, Salton Sea
- Written to `playlists/memory/handoff.md` — agreed location for cross-session handoffs going forward

---

## 2026-04-27 18:59 — Pheasant Island video, Codex JIT pattern, nlm CLI upgrade

### Pheasant Island video kicked off
- Reviewed Codex's source doc — strong scene structure, approved for upload
- Uploaded to Geography Potpourri (`ee05b643`), source ID: `5c4a9fc6`
- Video generation started, artifact ID: `ee894621-9957-4edb-bc96-f4499f934619`
- Dashboard card added at `nlm` status

### JIT pattern added to ForCodex.md
- Compared our skill-creator to Codex's Skill Creator Essence in ReadMe.md
- Key gap identified: JIT (just-in-time instruction delivery) — Codex had everything else but not this
- Added JIT explanation to ForCodex.md with structural example and instruction to apply it to skill-creator
- Codex had independently written a JIT spec in ReadMe.md before receiving our explanation — it understood the concept correctly

### nlm CLI and pip upgrades
- notebooklm-mcp-cli upgraded from v0.5.27 → v0.6.0 (latest on PyPI, skipped 0.5.31)
- pip upgraded from 25.0.1 → 26.1
- Auth slowdown traced to v0.5.26: added auth_status network check on every auth call; not fixed in 0.6.0
- Updated version in codex-test/Projects/nlm/PROJECT.md

---

## 2026-04-27 14:33 — Codex NLM project setup

### Files created in codex-test/Projects/nlm/
- `PROJECT.md` — pipeline overview, CLI facts, notebook IDs, gotchas, standing rules. Codex subsequently updated it to add full pipeline commands, dashboard rules, and YouTube boundary section.
- `ForCodex.md` — scene-writer skill (self-contained, all 6 rules + template + checklist) + ReadMe Q&A round 1 + PKA video notes
- `ForCodex1.md` — updated ReadMe Q&A with absolute paths and YouTube upload command
- `ForCodex2.md` — answered updated ReadMe questions: `nlm studio status` is correct artifact command (not `nlm list artifacts`), escalated mode note belongs in PROJECT.md, scene-writer should be standalone skill, no youtube-publish skill installed for Codex

### Key findings
- No youtube-publish skill in `~/.agents/skills/` — YouTube publishing is Claude Code only for now
- `nlm studio status <notebook-id> --json` is the correct command to list artifacts
- Codex NLM connectivity confirmed working (escalated network mode required)
- Auto-compact did not fire despite long session — possible bug, noted in handoff

### Next session
- Codex to create scene-writer as standalone skill from ForCodex.md content
- End-to-end pipeline test with one source doc

---

## 2026-04-26 22:29 — Codex setup: logging, hotkeys, NLM connectivity

### Codex workflow setup
- Discussed session logging, compaction, and skill-check patterns for Codex — mirrors Claude Code setup
- AGENTS.md role: session-start orientation (compaction workflow + project overview) — functions like overview.md, not CLAUDE.md
- Hotkey role: per-prompt behavioral rules (milestone logging, skill check, destructive action guard, general conduct)
- AutoHotkey v2 located at `C:\Users\tomew\AppData\Local\Programs\AutoHotkey\v2\AutoHotkey64.exe` — not in Program Files
- Working AHK v2 hotkey syntax confirmed: `^+t::Send("test")`; must launch with `-Verb RunAs` if terminal is elevated

### Codex NLM connectivity
- Initial `nlm notebook list` from Codex's PowerShell failed with `ConnectError: 127.0.0.1:9`
- Root cause: Codex shell runs sandboxed by default; outbound HTTPS blocked
- Fix: Codex can run in escalated (non-sandboxed) network mode — it documented this in its own skill
- After fix: `nlm notebook list` returned full notebook list successfully
- Next session: transfer NLM skills from Claude Code to Codex

### Memory saved
- `project_codex_setup.md` — hotkey vs AGENTS.md split documented for future reference

---

## 2026-04-26 20:37 — Playlists subfolder session setup complete

### Subfolder session infrastructure
- `Projects/NotebookLM/playlists/CLAUDE.md` created — scoped to NLM video production work
- `Projects/NotebookLM/playlists/memory/session-log.md` created — NLM-specific session log starts here
- `Projects/NotebookLM/playlists/.claude/settings.local.json` copied from agent-test root to fix permission interrupts
- Session opened by rooting terminal at `Projects/NotebookLM/playlists/` and running `claude`

### Gotchas found
- Skills (slash commands) lazy-load in a new subfolder session — asking "what skills do you have?" forces the lookup
- settings.local.json must be present locally (walk-up may not apply it correctly for permissions)
- Subfolder session wrote a handoff it couldn't find; located context via the dashboard instead

### ChatGPT encyclopedia infographic
- Prompt generated for "AI Important Papers" — 8 modules covering founding papers through alignment research
- Not yet tested in ChatGPT; inf-22 ticket remains open

---

## 2026-04-26 16:05 — NLM session started; cognitive-dissonance source doc written (not uploaded)

### Task files found in queue
- `tasks/cognitive-dissonance.md` — 1 video, Big Ideas notebook (`1dbe88d0-ca46-4a0a-b02e-5d1401af380e`)
- `tasks/fall-of-constantinople.md` — 3 videos, History Potpourri (`6e7fae88-0e36-48a2-b04a-a8187b683dbe`)

### Partial execution
- Auth checked (valid), notebook IDs confirmed via `nlm notebook list`
- Scene-format source doc written to `playlists/sources/cognitive-dissonance.txt` — not yet uploaded
- Tom interrupted the run; pre-compact initiated before upload or video creation

### Next session
- Confirm whether to proceed with both task files
- If yes: upload cognitive-dissonance.txt, write + upload 3 Constantinople source docs, create all videos

---

## 2026-04-26 15:42 — Playlists Notebook rename + context isolation design

### Project renamed: Ephemeral Notebook → Playlists Notebook
- Folder renamed from `Projects/NotebookLM/ephemeral-notebook/` to `Projects/NotebookLM/playlists/`
- Display name updated in `overview.md` and `MEMORY.md`; all path references swept across memory files
- "Ephemeral" was always a temporary posture name; "Playlists Notebook" reflects the actual use (playlist-organized video production)
- Note: actual throwaway NotebookLM notebooks still exist in the account — cleanup deferred

### Context isolation design conversation
- Discussed multi-folder/persona pattern from Paperless Movement PKA video
- Decision: use subfolder-rooted Claude sessions for context isolation — no orchestrator needed
- Pattern: `cd Projects/NotebookLM/playlists && claude` scopes the session to NLM work only
- Next step: add a local `CLAUDE.md` and `memory/` directory to the playlists folder to get full isolation

---

## 2026-04-26 14:48 — Geography Potpourri complete; Layered Reader Impressionism deployed

### Geography Potpourri: all 8 uploaded
- Remaining 2 videos uploaded (Bir Tawil, Suez Canal) — both private, added to playlist
- Dashboard cards added for both; files moved to `Videos/Geography Potpourri/`
- All 8 Geography Potpourri cards now at `status: youtube`

### Layered Reader Impressionism deployed
- HTML built from scratch (no Gemini) using local painter source docs
- 14 painters, 9 GiC lenses in 3 groups, 4 themes, scene metadata blocks
- Deployed to: `https://ewallt.github.io/agent-test/notebooklm/layered-reader-impressionism/`
- File saved locally: `Projects/AugmentedChat/apps/layered-reader-impressionism.html`
- Previous gh-pages URL confusion resolved: correct base is `agent-test` repo, not `claude-code-fun`

### Auto-compact bug noted
- Context hit 69% with warning shown at 60%, but auto-compact did not fire
- Likely a Claude Code bug — worth reporting at github.com/anthropics/claude-code/issues

---

## 2026-04-24 23:46 — Geography Potpourri uploads + chatgpt-image-prompt skill update

### Geography Potpourri: 6 of 8 videos uploaded to YouTube
- Playlist `PLmstT17VspmT6cqs0MXqV_Wezi-eZtH8j` added to `youtube-playlists.json`
- Videos moved from Downloads → `Videos/Geography Potpourri/Not Yet in YouTube/` → uploaded private, then moved to `Videos/Geography Potpourri/`
- 6 uploaded: Aral Sea, Lesotho, Point Nemo, Geographic Toll Road, 700-Meter Chokepoint (Istanbul), Architecture of a Loophole (Baarle)
- 2 remaining in Downloads: The_Billion-Dollar_Catch-22 (Bir Tawil), Trading_a_Barrier_for_a_Chokepoint (Suez Canal)
- Dashboard cards added for all 6 uploaded; 2 remaining cards not yet added
- Parallel background uploads confirmed working — used `run_in_background: true` on two simultaneous upload commands

### chatgpt-image-prompt skill: encyclopedia infographic mode added
- New mode added alongside existing JSON style profile mode
- `SKILL.md` updated: mode detection routing at top, existing JSON flow relabeled as subsection, encyclopedia mode at bottom pointing JIT to new reference file
- New file `encyclopedia-infographic.md` created: gathers subject type/name/scientific name, generates 8 subject-specific modules with real content (not placeholders), outputs full text prompt ready to paste into ChatGPT Images 2.0
- Module defaults provided for Person / Animal / Plant; quality bar set to Einstein example
- Skill description updated to include encyclopedia infographic as a trigger

### Process note: parallel uploads
- Two independent YouTube uploads can be kicked off simultaneously with `run_in_background: true` — each completes independently and notifies when done
- Dashboard and file-move cleanup done after both confirm success

---

## 2026-04-24 22:52 — Geography Potpourri: 8 videos kicked off in new notebook

### New playlist and notebook
- New playlist concept: Geography Potpourri — standalone video topics with geographic angle
- Notebook: `ee05b643-fa50-45d8-b1b7-ecbb04138895` (pre-existing, provided by Tom)
- 8 topics selected from a 10-item brainstormed list (skipped: Aral Sea fishing boats standalone, Saudi Arabia rivers)

### Sources written and uploaded
- All 8 source docs written in scene format, saved to `sources/geo-*.md`
- Topics: Aral Sea, Border at Baarle, Lesotho, Suez Canal, Istanbul, Point Nemo, Drake Passage, Bir Tawil
- Each source: 6–8 scenes, scene template with SETTING/SUBJECT/IN-SCENE MOTION/LIGHTING/NARRATION BEAT

### Videos kicked off
- All 8 videos kicked off with `--format cinematic --source-ids` pointing to dedicated sources
- Status not yet checked — will need to download next session
- Artifact IDs logged in handoff.md

### Legendary quest infographic
- Retry attempt for `6537a3fb` (Movements in Modern Art) with palette `#120a2b #8b5cf6 #f5c842 #e0aaff`
- Artifact `38c17d79` appeared stuck; Tom said to ignore it

---

## 2026-04-24 21:11 — chatgpt-image-prompt skill fixes; bible-role deployed; gh-pages-deploy skill corrected

### chatgpt-image-prompt skill — two fixes
- Removed redundant "Paste into ChatGPT prefixed with:" line from Step 3 of SKILL.md — user pastes JSON directly
- Removed same text from `usage_instruction` fields in both photography and illustration profiles in `style-profiles.md`
- Added "Lessons from comparing against the original Gem" block to Step 2: four rules — be concise, name the artist, exact physical medium, directives not observations

### bible-role sabbath school lesson app — deployed
- HTML app (Lesson 4: The Role of the Bible) deployed to `https://ewallt.github.io/claude-code-fun/bible-role/`
- Source: `ReadMe.txt` in agent-test root
- Tabbed layout: Overview, Sunday, Tuesday, History, Wednesday, Thursday, The Goal, Friday
- First deploy attempt failed: worktree grabbed `agent-test`'s gh-pages branch instead of `claude-code-fun`'s

### gh-pages-deploy skill — corrected deploy method
- Root cause of failure: `claude-code-fun` is a separate repo from `agent-test` with no shared remote; `git worktree add gh-pages` always grabbed the wrong branch
- Fix: skill now uses clone approach — `git clone --branch gh-pages https://github.com/ewallt/claude-code-fun.git /tmp/ccf-ghpages`
- `git config user.email/name` must be set in the clone (no global identity in that context)
- Old worktree command removed; warning added at top of Step 2 explaining why worktree doesn't work here

---

## 2026-04-23 22:23 — Infographic catalog batch 2; chatgpt-image-prompt skill created

### Infographic catalog — batch 2 (7 of 8)
- Ran 8 custom text-prompt styles for Movements in Modern Art notebook (`6537a3fb`)
- 7 succeeded: 3D, minimalistic, modern corporate, dark mode, playful pastel, cartoon, explosion effect
- Legendary quest failed with API rate limit error (code 8) — catalog entry written, marked pending retry
- Catalog now at 31 entries (30 generated, 1 pending)
- Batch 2 entries added to `artifacts/movements-in-modern-art/infographic-catalog.md`

### chatgpt-image-prompt skill created
- New skill at `C:\Users\tomew\.claude\skills\chatgpt-image-prompt\`
- Two files: `SKILL.md` (workflow) + `style-profiles.md` (photography + illustration schemas)
- Claude plays the role of the Gem: given subject + style, fills in JSON schema and outputs completed prompt
- Image analysis mode (upload → JSON) not supported here — Gem URL noted in skill for that use case
- Gem URL: https://gemini.google.com/gem/db45df1a7a54/9b685ad4534075bf?usp=sharing
- Tested with nocturne oil painting scene; compared against Gem output; merged best of both
- Small fix pending: remove redundant "Paste into ChatGPT prefixed with:" line from output — user pastes JSON directly

---

## 2026-04-23 21:20 — NLM CLI upgrade; built-in style flag discovery; catalog completed at 23 entries

### nlm CLI upgraded to v0.5.27
- Upgraded from v0.5.16 to v0.5.27 (`pip install --upgrade notebooklm-mcp-cli`)
- Updated overview.md, working-notes.md to reflect new version

### Built-in NLM styles: --style flag (not text prompt)
- Attempting to pass built-in style names (e.g. "kawaii") as text in the focus prompt causes failures
- Correct approach: `--style kawaii` CLI flag, added in v0.3.18
- 11 valid values: `auto_select`, `sketch_note`, `professional`, `bento_grid`, `editorial`, `instructional`, `bricks`, `clay`, `anime`, `kawaii`, `scientific`
- Both skills (`notebooklm-infographic` options table, `notebooklm-infographic-prompt` built-in styles section) updated to reflect this

### Infographic catalog completed
- All 23 infographic PNGs cataloged in `artifacts/movements-in-modern-art/infographic-catalog.md`
- Catalog split into two sections: custom text-prompt styles (12) and built-in `--style` flag styles (11)
- Each entry includes full prompt, palette, orientation, detail, and visual notes

---

## 2026-04-23 13:26 — NLM infographic style catalog: 9 variations on Movements in Modern Art

### Style exploration
- Generated 9 infographics for notebook `6537a3fb` (Movements in Modern Art), systematically varying style, orientation, detail level, and color palette
- All saved to `Projects/NotebookLM/playlists/artifacts/movements-in-modern-art/`
- Key finding: dark background must be specified explicitly via both `Background: dark #hex` instruction AND removing light colors from the palette — NLM will default to light if a cream/white is present

### Catalog (filename → style / orientation / detail / palette)
- `infographic.png` — editorial, portrait, concise, `#1a1a2e #e63946 #f1faee #a8dadc`
- `infographic-landscape.png` — editorial, landscape, standard, same palette (light bg crept in)
- `infographic-dark-landscape.png` — editorial, landscape, standard, `#1a1a2e #e63946 #a8dadc` (cream removed → dark bg restored)
- `infographic-vintage-retro-portrait.png` — vintage retro, portrait, concise, `#1a1a2e #e63946 #f5c842 #f1faee`
- `infographic-luxury-elegant-landscape.png` — luxury elegant, landscape, standard, `#1a1a2e #c9a84c #ffffff #2c2c2c`
- `infographic-scifi-cinematic-landscape.png` — sci-fi cinematic, landscape, standard, `#0d0d1a #00f0ff #ff2d78 #ffffff`
- `infographic-comic-book-portrait.png` — comic book hero, portrait, concise, `#0a0a0a #ffcc00 #ff2200 #ffffff`
- `infographic-vaporwave-landscape.png` — vapor wave, landscape, standard, `#1a0030 #ff71ce #01cdfe #b967ff`
- `infographic-bold-colorful-landscape.png` — bold and colorful, landscape, standard, `#ffffff #e63946 #2563eb #f5c842 #000000`
- `infographic-cyberpunk-portrait.png` — cyberpunk neon, portrait, concise, `#0a0a1a #00fff9 #ff00aa #ffe600`
- `infographic-nature-landscape.png` — nature inspired, landscape, standard, `#1a2e1a #c8a96e #e8d5b0 #4a7c59`
- `infographic-flat-design-landscape.png` — flat design, landscape, standard, `#1e2a3a #f4a261 #e9c46a #2a9d8f`

### Standouts
- **Luxury Elegant**: gold orbs on navy, most gallery-worthy
- **Nature Inspired**: Art Nouveau botanical border added by NLM unprompted — striking
- **Comic Book Hero**: best energy of the portrait formats
- **Dark Editorial (v3)**: cleanest and most informative overall
- Full catalog with prompts saved: `artifacts/movements-in-modern-art/infographic-catalog.md`

---

## 2026-04-23 11:31 — HP video cleanup; YouTube Growth notebook ID; notebooklm-infographic-prompt skill created

### History Potpourri video cleanup
- 7 videos moved from Downloads → `C:/Users/tomew/Videos/History Potpourri/` (Ogedei already moved last session)
- All 8 dashboard cards updated from `downloaded` → `youtube` status

### YouTube Growth notebook registered
- Notebook ID `b35722e3-9fc5-456f-9a92-bc2af0423cc3` added to working notes
- Notebook contains 4 sources: post-upload YouTube strategy (x2), NLM infographic tutorial, Layered Reader app log

### notebooklm-infographic-prompt skill created
- New skill at `C:\Users\tomew\.claude\skills\notebooklm-infographic-prompt\SKILL.md`
- Covers the craft side of NLM infographics: custom prompt formula, full style/format lists, Coolors.co hex codes, source isolation
- Complements existing `notebooklm-infographic` skill (CLI mechanics); this one handles what to put in the description box
- Content sourced by querying the YouTube Growth notebook (`b35722e3`)

---

## 2026-04-22 23:30 — YouTube publish workflow: script + skill updated; 8 HP videos queued; Layered Reader Impressionism built

### youtube-upload.py — --description flag added
- Script previously had no per-video description support; used playlist default for all videos
- Added `--description` optional arg; overrides playlist default when passed
- Skill updated: new Step 3 documents how to write 2-paragraph SEO descriptions; steps renumbered

### 8 History Potpourri videos — dashboard cards added
- All 8 new videos added to dashboard as `status: downloaded`
- Titles, nlmTitles, artifactIds, and source IDs recorded (see handoff for full table)
- Tom uploading manually; Claude providing per-video descriptions on demand

### AugmentedChat — Layered Reader Impressionism
- `layered-reader-impressionism.md` created: deployment-ready Layered Reader for Impressionism
- Pulls painter scene sources from Movements in Modern Art notebook (`6537a3fb`)
- 9 art-specific lenses in 3 groups (The Work / The Story / The Legacy) replacing generic ones
- Teal fix applied: archives `--text-card: #0f766e` in `layered-reader-gic-gear-theme.md` and `theme-gear-system.md`
- App tested and working; GiC responding well to lens selections

### GiC Modes Panel — design course-corrected
- Original design was a bare control panel (5 buttons, no content)
- Correct design: Layered Reader pattern with notebook content + modes as interaction layer
- gic-modes-panel prompts kept for reference; Layered Reader Impressionism is the right pattern going forward

---

## 2026-04-22 21:55 — GiC Modes Panel: new app pattern built + Impressionism deployment

### New app pattern: GiC Modes Panel
- Architecture: collapsible panel of named GiC modes; selecting a mode writes instruction string to sr-only control plane div; modes baked as JS constants
- Naming settled: "GiC modes" = runtime instruction strings inside the app; "prompts" in `AugmentedChat/prompts/` = Gemini build prompts (outer)
- Theme centralized: `Projects/AugmentedChat/documents/theme-gear-system.md` — canonical 4-theme spec; build prompts reference it instead of embedding inline
- Per-deployment pattern: `gic-modes/[topic].md` (instruction strings) + `prompts/gic-modes-panel-[topic].md` (full build prompt)

### Files created
- `Projects/AugmentedChat/documents/theme-gear-system.md` — canonical gear theme spec
- `Projects/AugmentedChat/gic-modes/impressionism.md` — 5 modes for Impressionism
- `Projects/AugmentedChat/prompts/gic-modes-panel.md` — reusable base prompt template
- `Projects/AugmentedChat/prompts/gic-modes-panel-impressionism.md` — deployment-ready prompt for testing

### 5 Impressionism modes
The Movement, The Artist, The Technique, The Outsiders, What Changed — all scoped to Impressionism, queried from notebook `6537a3fb`

### Pending
- Tom tests prompt in Gemini (connected to Movements in Modern Art `6537a3fb`)
- After confirmed working: refactor `layered-reader-gic-gear-theme.md` to reference `theme-gear-system.md`

### gic-integration skill fix
Dead pointer corrected: `Projects/GiC/documents/architecture.md` → `Projects/AugmentedChat/documents/gic-architecture.md`

---

## 2026-04-22 20:53 — History Potpourri: all 8 Tier 1 sources written and 8 videos kicked off

### Source docs written (scene format)
- All 8 Tier 1 ideas from `Projects/HistoryPotpourri/documents/ideas-discussed.md` now have source docs
- Files in `Projects/NotebookLM/playlists/sources/`: arkhipov, spanish-armada, ogedei-khan, washington-braddocks-defeat, fourth-crusade, flaming-camels, pax-mongolica, humayun
- All uploaded to History Potpourri notebook `6e7fae88`

### Videos generating (all 8 in History Potpourri notebook)
| Video | Source ID | Artifact ID |
|-------|-----------|-------------|
| Arkhipov | `744518bc` | `ad1a605d` |
| Spanish Armada | `8464d316` | `7bdc4d0f` |
| Ogedei Khan | `8d6bdd4f` | `8fa19da8` |
| Washington/Braddock | `a59ee9cb` | `fa3092d7` |
| Fourth Crusade | `8402c7ea` | `a995a44c` |
| Flaming Camels | `a232f1a0` | `164d7aa4` |
| Pax Mongolica | `ac310dc7` | `6d403e61` |
| Humayun | `e17622a9` | `69117f74` |

---

## 2026-04-22 20:23 — Documentation hierarchy restructure continued; CLAUDE.md updated; AugmentedChat/GiC merged

### Projects restructured (continued from earlier this session)
- BYG, Remotion (bar-chart-race, narrated-slides, whiteboard-explainer), AugmentedChat all restructured to 3-tier pattern
- GiC Integration merged into AugmentedChat — GiC is now level 3 within AugmentedChat; `Projects/GiC/` deleted
- overview.md rewritten: one sentence per project, single pointer each, dead pointer fixed (remotion-context.md)
- Remaining: NotebookLM and Infrastructure (progress table in Infrastructure project-definition.md)

### CLAUDE.md — skills-first rule hardened
- Removed specific trigger list and "proceed if you know what to do" exception
- Rule is now universal: check for a skill before any task; if no skill exists, stop and tell Tom
- overview.md "How to Work" section added to reinforce the same intent

### AugmentedChat — prompts split into separate files
- `layered-reader.md` was a combined spec + prompt library; prompts extracted to `Projects/AugmentedChat/prompts/`
- 5 prompt files: gic-single-source, gic-multi-source, inline, gic-gear-theme, theme-revamp
- `layered-reader.md` now spec-only; `project-definition.md` has prompt inventory table
- Decision: one file per prompt (not a library) because these are complex objects

### Naming fix
- overview.md header updated from "The Seven Groups" → "The Nine Groups" (was stale after GiC/AugmentedChat merge)

---

## 2026-04-22 14:15 — Documentation hierarchy restructure started; project-restructure skill created

### Documentation hierarchy — 3-tier pattern established
- New pattern: overview.md (one-line pointer) → project-definition.md (one sentence + project-wide tracking + pointers) → skills/ + documents/ (detail)
- Skill stubs live in `Projects/[name]/skills/[skill-name].md` pointing to `~/.claude/skills/`
- Three projects fully restructured: GiC Integration, YouTube Growth, Gems
- Infrastructure touched: documentation hierarchy initiative added, reference docs listed; full restructure deferred

### project-restructure skill created
- `~/.claude/skills/project-restructure/SKILL.md` — guides restructuring any project to the 3-tier pattern
- Includes sorting table, skill stub pattern, inventory-with-detail pattern (Gems model)

### File moves
- `warroom-reference.jsx` moved from `Projects/AugmentedChat/reference/` → `Projects/Gems/warroom/`
- `gic-kb-draft.md` moved from `Projects/YouTubeGrowth/documents/` → `Projects/GiC/documents/`

### CLAUDE.md updated
- "Looking Up Project Details" simplified to just: "Read `documents/overview.md`."
- Removed verbose instruction; Tom's intent is for overview.md to always be read first

### Memory update
- Added `feedback_read_overview_always.md` — read overview.md before answering any project question

---

## 2026-04-22 13:12 — Art videos uploaded; History Potpourri ideas file created; Augmented Chat GiC prompts panel planned

### Art videos — Cassatt, Kandinsky, Klimt uploaded to YouTube
- 3 of 4 art videos finished generating and were downloaded by Tom
- NLM titles reviewed: Cassatt renamed to "The Outsider Who Got In", Klimt renamed to "Decoration as Argument", Kandinsky title kept
- Dashboard cards added, all 3 uploaded as private, files moved to Videos folder
- Munch (`76ab6959`) still generating — not yet downloaded
- YouTube IDs: Cassatt `bZZ7rUuZ8eA`, Kandinsky `QoufvZjp-Ag`, Klimt `tZJ0jaqOHwA`

### History Potpourri — ideas file created
- Queried AP World History notebook (`32a12fd1`) for near-miss / pivotal decision stories
- Tom added 12 more ideas from his own research
- All ideas catalogued and tiered at `Projects/HistoryPotpourri/documents/ideas-discussed.md`
- Tier 1 (8 ready to write): Arkhipov, Spanish Armada, Ogedei Khan, Washington/Braddock, Fourth Crusade, Flaming Camels, Pax Mongolica/Black Death, Humayun's staircase
- Tier 2 (3 thinner): Constantinople→Columbus, Huizong cranes, Dutch spice monopoly seabirds
- Tier 3 (needs source material): Timur/China, Ain Jalut
- Tier 4 (passed or problematic): Ming rainstorm, Kosovo assassination myth

### Augmented Chat — GiC prompts panel decided
- Approached: collapsible panel (not a full tab) showing a prompt library for GiC
- Selected prompt becomes visible in sr-only section; others stay hidden; GiC reads active prompt when invoked
- Prompts baked into app file; no localStorage complexity
- Not yet implemented — next step is to build it

---

## 2026-04-21 22:07 — 4 art videos kicked off; CLAUDE.md skill-check rule improved

### Art playlist — Cassatt, Kandinsky, Munch, Klimt
- 4 scene-format source docs written (one per artist) and uploaded to Movements in Modern Art notebook (`6537a3fb`)
- Videos generating: Cassatt `5103f4e2`, Kandinsky `4ad55fe6`, Munch `76ab6959`, Klimt `7c273063`
- Titles: "The Outsider Who Got In", "The Painting He Didn't Recognize", "The Painting That Was a Diagnosis", "Decoration as Argument"

### CLAUDE.md — skill-check instruction rewritten
- Old instruction required classifying a task as "non-trivial" before checking for a skill — too much room for failure
- New instruction names specific triggers (source docs, NLM uploads, video workflows, multi-step tasks), names the mechanism (find-skills skill or glob), and removes the opt-out phrase "does not require judgment about whether the task qualifies"
- Prompted by a session failure: wrote 4 Cassatt source docs when 1 was needed, because scene-writer skill was never checked

---

## 2026-04-21 21:20 — WarRoom Gem finalized; Gems project created; YouTube token reset

### WarRoom Gem — simplified to 5 tabs, Explorer-only
- Removed Tactical Intelligence tab (image generation, green/yellow High-Command scheme)
- All 5 tabs now use Explorer palette throughout — no dual-palette switching
- Inactive nav buttons: `var(--border)` (#5a5041) — readable mid-brown on parchment
- Date/location header: changed from `--text-muted` to `--text-body`
- Reference file updated: `Projects/AugmentedChat/reference/warroom-reference.jsx`
- Gem prompt saved: `Projects/Gems/warroom/gem-prompt.md`

### Gems project created
- New project: `Projects/Gems/documents/project-definition.md`
- Added as project #9 in `documents/overview.md`; Infrastructure bumped to #10
- WarRoom is the first (only) Gem so far

### YouTube token reset
- `tools/youtube-token.json` deleted — refresh token was invalid_grant (fully revoked)
- Re-auth will trigger automatically on next real upload (browser flow)
- No impact on upload workflow — one-time fix

---

## 2026-04-21 13:12 — WarRoom Gem: Explorer palette reference implementation

### Layered Reader — Explorer split-theme fix
- Added "split theme rule" block to the 4-theme gear system zero-shot prompt in `Projects/AugmentedChat/documents/layered-reader.md`
- Rule: `--text-body` is for text on `--app-bg`; `--text-card` is for text on `--card-bg`. Explorer makes this critical (dark brown vs near-white)
- Also added explicit note to the nav rail layout line: "Nav rail sits on `--card-bg` — use `--text-card` for nav item text"

### GiC knowledge base draft saved
- Written as control plane prose for a future GiC-integrated app on the "14 things after uploading" topic
- Saved at `Projects/YouTubeGrowth/documents/gic-kb-draft.md` — not yet wired to an app

### WarRoom battle Gem — reference implementation
- Tom building a Gem (Google Gemini custom AI persona) for generating structured battle reports in Canvas
- Problem: Gem-generated apps applied dark neutral scheme to all 6 tabs; tabs 1-3 should use Explorer palette (parchment + dark obsidian cards), tabs 4-6 High-Command (dark green)
- Root cause: AI used `--text-body` everywhere; Explorer split-theme requires `--text-card` on card surfaces
- Built `Projects/AugmentedChat/reference/warroom-reference.jsx` — complete reference implementation
  - `PALETTES` constant with explorer + highCommand color sets
  - `useEffect` switches palette at tab 3→4 boundary via `document.documentElement.style.setProperty`
  - Tabs 1-3 fully rewritten with correct CSS variable usage; tabs 4-6 preserved unchanged
- Intended use: paste into Canvas to verify, then attach as knowledge file to the Gem

---

## 2026-04-20 19:45 — Scene-format source doc written and uploaded to YouTube Growth notebook

### Source doc: 14-things-after-uploading.md
- Written from the "14 things you MUST do after uploading a YouTube video" transcript in ReadMe.txt
- Restructured as 14 narrative scenes (one per tactic) — prose-first, designed for Layered Reader / Augmented Chat zero-shot prompt
- Uploaded to notebook `b35722e3-9fc5-456f-9a92-bc2af0423cc3`, source ID `0c5a4d00`
- File saved at `Projects/YouTubeGrowth/sources/14-things-after-uploading.md`
- Project definition updated with source row

---

## 2026-04-20 19:36 — YouTube Growth project created; permission fix documented

### YouTube Growth project setup
- New project created: `Projects/YouTubeGrowth/documents/project-definition.md`
- Added as project #8 in `documents/overview.md`
- Notebook: YouTube Growth (`b35722e3-9fc5-456f-9a92-bc2af0423cc3`) — one source: "14 things you MUST do after uploading a YouTube video" (`0bf2ab31`)
- New skill: `youtube-growth` — queries the notebook and advises on YouTube channel growth strategy

### Tips for Healthy Aging — final housekeeping complete
- 3 remaining videos uploaded (Biological Clocks `ykuRZd9I7yE`, Gut Microbiome `N0Qy9Awt0pI`, Social Isolation `1OC4of9Uhis`)
- Dashboard cards added, files moved out of `Not Yet in YouTube/`
- Sleep video (artifact `448842b0`) done generating — not yet uploaded

### Reboot permissions fix documented
- After Windows reboot, Claude Code stops honoring allowlist and prompts for Write/Edit
- Fix: re-save `settings.local.json` (same content) — forces permission reload
- Saved to memory: `feedback_reboot_permissions.md`

---

## 2026-04-20 12:31 — Tips for Healthy Aging: 7 of 8 videos uploaded to YouTube

### YouTube uploads completed (post-compact continuation)
- All 7 completed videos now uploaded as private to Tips For Healthy Aging playlist
- First 4 (Alzheimer's, Microplastics, Brain's Wash Cycle, Exercise): dashboard updated to `youtube`, files moved
- Last 3 uploaded this sub-session without dashboard updates (usage limit hit mid-session):
  - Your Biological Clocks: Tracking Organ-Specific Aging → `ykuRZd9I7yE`
  - The Gut Microbiome and Personalized Nutrition → `N0Qy9Awt0pI`
  - Social Isolation and the Big Picture → `1OC4of9Uhis`
- Files for last 3 still in `Not Yet in YouTube/`; dashboard cards not yet added

### Pending next session
- Add 3 dashboard cards (Biological Clocks, Gut Microbiome, Social Isolation) with status `youtube`
- Move those 3 files out of `Not Yet in YouTube/`
- Sleep video (artifact `448842b0`) still generating — download, upload, add card when ready

### Title mismatch flag
- "The Brain's Nightly Wash Cycle" (`XwhtlyZKS2w`) was generated from glymphatic source but NLM output file was titled "The_Clocks_Inside_Us__The_Organ_Age_Gap" — content may be about biological clocks, not the wash cycle. Worth watching before publishing.

---

## 2026-04-19 21:25 — YouTube uploads started: Tips for Healthy Aging; CLAUDE.md fix; Layered Reader prompt added

### Tips For Healthy Aging playlist setup
- New playlist configured in `youtube-playlists.json` (ID: `PLmstT17VspmQYzDMUR7X8aMksO9RYZSzk`)
- 4 dashboard cards added (status: downloaded → youtube as uploaded)
- Files moved from Downloads → `C:/Users/tomew/Videos/Tips For Healthy Aging/Not Yet in YouTube/`
- NLM title mapping: `The_20-Year_Clock` → Alzheimer's, `The_Invisible_Invasion` → Microplastics, `The_Clocks_Inside_Us` → Brain's Wash Cycle, `The_Anatomy_of_a_Breakdown` → Exercise

### YouTube upload — 1 of 4 done
- The Blood Test That Predicts Alzheimer's Decades Early: `https://www.youtube.com/watch?v=AgDQz-BvcrM` (private)
- 3 remaining: Microplastics, Brain's Wash Cycle, Exercise — in `Not Yet in YouTube/`

### CLAUDE.md — overview lookup rule tightened
- Old rule: only check overview.md when you don't know where something is
- New rule: check overview.md before asking AND before answering from general knowledge; follow pointers it gives; use general knowledge only when topic is clearly outside this project
- Triggered by: Tom asked about Gemini web app prompts; Claude answered from general knowledge instead of checking the project docs first

### Augmented Chat — from-scratch Layered Reader prompt with gear system
- Added new prompt to `Projects/AugmentedChat/documents/layered-reader.md`
- Builds Layered Reader from scratch with 4-theme gear system (navy/archives/explorer/high-command) built in — no refactor step needed
- Replaces `activeTheme` state for `isDark`; all colors via CSS variables on `:root`

---

## 2026-04-19 20:35 — Tips for Healthy Aging: 4 remaining videos kicked off

### All 8 sources now have videos generating
- Your Biological Clocks: artifact `bd0163e5`
- Sleep: The Non-Negotiable: artifact `448842b0`
- The Gut Microbiome and Personalized Nutrition: artifact `81f431e2`
- Social Isolation and the Big Picture: artifact `84599db7`
- All cinematic format, all in notebook `e165ae6b`

---

## 2026-04-19 20:32 — Tips for Healthy Aging: 4 videos kicked off + 4 more sources written

### Videos kicked off (from previous session's sources)
- The Brain's Nightly Wash Cycle: artifact `9bdca22b`
- The Blood Test That Predicts Alzheimer's Decades Early: artifact `a9eec223`
- Microplastics: From Arteries to the Brain: artifact `6918a01e`
- Exercise: The Single Most Potent Medical Intervention Ever Known: artifact `89b07f7e`
- All cinematic format, all in notebook `e165ae6b`

### 4 new scene sources written and uploaded (no videos yet)
- **Your Biological Clocks: Tracking Organ-Specific Aging** (`a30002b9`) — proteomics revolution, 11 organ clocks, 1 in 5 extreme agers, heart clock (5x failure risk per 4-year gap), slowest clock agers (<1% Alzheimer's), modifiable gap
- **Sleep: The Non-Negotiable** (`e6becc78`) — deep sleep decline with age (80–90% by 70), U-shaped curve (7 hrs optimal; >8 hrs = +30% mortality), daylight saving time → heart attacks, Sleep Regularity Index, one night's metabolic cascade, behavioral fixes
- **The Gut Microbiome and Personalized Nutrition** (`9f05873b`) — Weizmann Institute CGM study (same food, different responses), 40 trillion bacteria as key determinant, identical twins with different responses, TMAO mechanism, algorithm vs Mediterranean diet RCT, kitchen as medicine
- **Social Isolation and the Big Picture** (`10d1e39b`) — 2.2 million people: loneliness = 32% higher all-cause mortality; 700K veterans study (social connection = 24 added years); Topol's Lifestyle+ framework; AI and loneliness research; social isolation as a clinical variable

### Topic list saved
- Full 15-topic list now written into `documents/youtube-playlists-guide.md` (was missing from previous session despite session log saying it was saved)
- 8 topics now have sources; 4 of those have videos generating

---

## 2026-04-19 20:08 — Tips for Healthy Aging: new playlist + notebook + 4 scene sources

### New playlist and workflow
- Created new notebook: Tips for Healthy Aging (`e165ae6b-2e83-4965-b7e3-c34cb5e6cec4`)
- Inspiration source: Super Agers notebook (`780a38ee`) — 17 sources from Eric Topol's Ground Truths + Super Agers book
- New workflow concept: query Super Agers notebook for research → write cinematic scene source docs from query results (not general knowledge) → upload to Tips for Healthy Aging → generate videos
- Documented in `documents/youtube-playlists-guide.md` under "Tips for Healthy Aging"

### Topic list
- Tom provided 10 initial foci; notebook query suggested 5 more; full list of 15 saved in playlists guide
- Notable additions from notebook: Alzheimer's blood test, biological clocks, brain's wash cycle, microplastics, gut microbiome

### 4 scene sources written and uploaded
- **The Brain's Nightly Wash Cycle** (`042e6251`) — glymphatic system, deep sleep, Ambien paradox, Alzheimer's link
- **The Blood Test That Predicts Alzheimer's Decades Early** (`d56a9f9a`) — p-Tau217 biomarker, 20-year lead time, Hansson/Bateman, lifestyle response
- **Microplastics: From Arteries to the Brain** (`2346ff16`) — NEJM plaque study, 4.5x heart attack risk, brain accumulation 7–30x liver/kidneys, dementia link
- **Exercise: The Single Most Potent Medical Intervention Ever Known** (`97e6e16a`) — Ashley/Topol, 1958 bus study, Richard Morgan at 93, sitting mortality, 1 min = 5 min life
- All sourced from Super Agers notebook queries; videos not yet kicked off

---

## 2026-04-19 19:29 — Video workflow fixes; 4 Berlin/Velcro/Verne/CreditCard uploaded to YouTube; 4 explainer redos kicked off

### YouTube uploads — 4 History Potpourri (April 18 session, uploaded before midnight)
- Berlin Wall: `z8MkvDJM4Ww` | Velcro: `IQxJvdP-LmY` | Verne: `B6YU3QEZLwk` | Credit Card: `KoqS8lwpB_I`
- All private, added to History Potpourri playlist, dashboard cards added

### Explainer → cinematic redos
- Super Glue, Aspartame, Bubble Wrap, CAT Scan originally built as explainer (default format, flag omitted)
- Redos kicked off with `--format cinematic` and full source UUIDs: `6bfa3d5c`, `c26eae6f`, `c69b6c7a`, `0d60966a`
- Root cause: short UUIDs (8-char) passed to `--source-ids` caused silent failures; full UUIDs required

### Workflow doc fixes
- `skill-video-strategy.md`: `--format cinematic` added to command template; full UUID note added
- `working-notes.md`: both gotchas documented (`--source-ids` full UUID; `--format cinematic` always explicit)

---

## 2026-04-18 21:24 — History Potpourri: 4 source docs written + uploaded + videos kicked off

### 4 new History Potpourri videos in generation
- Berlin Wall (wrong turns): source `134940e2`, artifact `b65a1c13`
- Velcro / burrs (accidental discoveries): source `07efb9ce`, artifact `7f5119ce`
- Jules Verne / Florida moon rocket (fake that became real): source `97f54335`, artifact `61b7db8a`
- Credit Card / Bellamy (fake that became real): source `592701aa`, artifact `bea50eb3`
- All in History Potpourri notebook `6e7fae88`; dedicated source doc per video; cinematic format

---

## 2026-04-18 21:15 — generating-ideas skill; web color themes; CLAUDE.md + overview updates

### generating-ideas skill (new)
- Created `~/.claude/skills/generating-ideas/SKILL.md` — two-step process: present numbered list of 13 categories first, suggest specific examples only after Tom picks
- Categories: Coincidences, Small causes with big effects, Near-misses, Wrong turns, Accidental discoveries, Invented twice, Expert consensus wrong, Solution that created bigger problem, Fake that became real, Prediction that came true, Decision that almost went other way, Discovery hiding in plain sight, Wrong person in right place
- Generic — works for any playlist/context, not just History Potpourri
- Overview updated: "Generating ideas for any playlist: use the `generating-ideas` skill"

### Web color themes
- Discovered canonical theme reference already exists: `~/.claude/local-skills/ux-color-schemes.md` — 4 themes (Explorer, Archives, High-Command, Navy) with full hex values; referenced by `frontend-design` skill
- Created then deleted redundant `Projects/Infrastructure/documents/web-color-themes.md`
- Overview updated: pointer to canonical location

### Layered Reader — theme revamp prompt
- Added "Gemini Prompt — Theme Revamp (4-Theme Gear System)" to `layered-reader.md`
- Replaces light/dark toggle with gear icon cycling 4 themes; navy is default; archives replaces old light mode
- Full CSS variable definitions for all 4 themes included in prompt

### CLAUDE.md update
- "Looking Up Project Details" broadened: now covers any unknown file/location, not just notebooks/playlists — check overview.md first, ask only if still not found

### History Potpourri — 4 topics selected (not yet written)
- Berlin Wall (wrong turns), Velcro (accidental discovery), Jules Verne/moon rocket (fake that became real), Credit Cards/Bellamy (fake that became real)
- Next: write source docs + upload + kick off videos

---

## 2026-04-18 19:46 — 10 videos uploaded to YouTube; 4 new History Potpourri sources; config + behavior changes

### YouTube uploads — batch of 10
- 6 videos uploaded from prior session: Picasso, Hopper, Sapiens, WNF, Post-it, Stirrup — all `youtube` in dashboard
- 4 new History Potpourri videos uploaded: Super Glue, Aspartame, Bubble Wrap, CAT Scan/Beatles — all `youtube` in dashboard
- 1 Lightened With His Glory video uploaded: `The_Architecture_of_Promise__Engineering_the_World_Made_New`
- All uploaded `--private` and moved out of `Not Yet in YouTube/`

### History Potpourri — 4 new sources + videos
- Topics: Super Glue (accidental invention twice), Aspartame (licked finger), Bubble Wrap (failed wallpaper → 3rd-try packaging), CAT Scan (Beatles money funded EMI research)
- Source IDs: `213726c5` (Super Glue), `b387dc60` (Aspartame), `8c7ab0de` (Bubble Wrap), `b6560c2e` (CAT Scan)
- Artifact IDs: `3dd798a6`, `c7015a56`, `159b7fb0`, `683db91d` — all in History Potpourri `6e7fae88`
- NLM used short notebook ID (8 chars) for source add — failed; full UUID required

### Config changes
- Auto-compact threshold: 50% → 60% in `~/.claude/settings.json`; status line label updated to match

### Behavior changes
- `CLAUDE.md`: added "Check for a Skill First" section — before any non-trivial task, check whether a skill exists for it
- `memory/feedback_write_and_go.md`: write sources → upload → kick off videos without asking
- `memory/feedback_skills_first.md`: updated trigger from "known workflow" to "non-trivial task"

---

## 2026-04-16 19:57 — Sapiens + Why Nations Fail source docs written; videos kicked off

### Big Ideas — two new videos in generation
- Source docs written from scratch (originals were previously nuked by NLM): `big-ideas-sapiens-harari.md` and `big-ideas-why-nations-fail-acemoglu.md`
- Both uploaded to Big Ideas notebook `1dbe88d0-ca46-4a0a-b02e-5d1401af380e`
- Sapiens source ID: `b291a24a-845f-4ce0-a26f-e522384fc685` | artifact: `a046e416-6589-43d5-acb8-432ec5f7bf7a`
- Why Nations Fail source ID: `ebd9bda1-9498-47db-936f-6d9f385261dd` | artifact: `f1325728-b534-4ce6-b675-33b43348ab5c`

---

## 2026-04-16 19:47 — Picasso + Hopper source docs written; videos kicked off

### Movements in Modern Art — two new videos in generation
- Source docs written: `art-picasso-the-break.md` and `art-hopper-light-in-the-american-dark.md`
- Both uploaded to notebook `6537a3fb-cf88-48cc-9c70-f6a69f132aa8` and cinematic videos kicked off
- Picasso source ID: `a1d10e26-2224-4988-ada9-d0c403a5b5b3` | artifact ID: `579c57a6-e9f6-4442-a896-2df6076746bf`
- Hopper source ID: `b046b6ec-0fdd-4f6d-a64f-c9a32ef0805e` | artifact ID: `37167cee-f154-445c-91cf-97fce4625b66`
- Videos in generation — check status with `nlm studio status 6537a3fb-cf88-48cc-9c70-f6a69f132aa8`

---

## 2026-04-16 19:39 — Matisse + Lautrec uploaded; Layered Reader menu system; osteoporosis app deployed

### Movements in Modern Art — two videos uploaded
- Lautrec (*The Invisible Aristocrat*) and Matisse (*The Architecture of Freedom*) downloaded from NLM and uploaded to YouTube
- Both added to Movements in Modern Art playlist; uploaded as Public directly (not Private)
- YouTube URLs: Lautrec https://www.youtube.com/watch?v=oZ6ZixAbs1k | Matisse https://www.youtube.com/watch?v=KDYy1GhvQZ0

### Layered Reader — 9-option menu system
- Replaced 3 pill buttons with a grouped dropdown menu: 9 options across 3 groups (Foundations, Lenses, Challenge)
- Foundations: Explain it simply / Key insight / Expand with examples
- Lenses: Compare/contrast / Biographical moment / So what — why does this matter today? / Connections
- Challenge: Skeptic's view / Counterfactual
- Two zero-shot GiC prompts documented in `layered-reader.md`: single-source and multi-source variants
- sr-only instruction updated to map all 9 options; `activeMode` state replaces `activeLevel`

### Osteoporosis plan app deployed
- Gemini-built single-file HTML app for Tom's wife; osteoporosis 6-month reversal plan
- Bilingual (EN/PT), searchable, light/dark mode, responsive
- Deployed to gh-pages: https://ewallt.github.io/agent-test/osteoporosis-plan.html

### Status line restored
- Context usage indicator (% until auto-compact) had stopped appearing after a crash
- Restored via statusline-setup agent; active immediately without session restart

---

## 2026-04-14 21:05 — 7 videos uploaded to YouTube (History Potpourri + WW2)

### Videos uploaded
- History Potpourri (4): Aristarchus, Antikythera, Troy, Andrew Wiles
- World War 2 (3): Codebreaking and the Battle of the Atlantic, GARBO, Operation Mincemeat
- All downloaded from NLM, uploaded as Private, dashboard set to `youtube`, files moved to playlist parent folders
- YouTube URLs recorded in handoff note

### OAuth token issue
- Token had expired despite recent auth; fixed by deleting stale `tools/youtube-token.json` and re-authorizing
- Also hit quoting issue with spaces in paths when running `!` commands — resolved by writing a wrapper `.sh` script for the first upload (auth trigger), then Claude ran all remaining uploads directly via Bash tool

---

## 2026-04-14 20:18 — AugmentedChat project created; Layered Reader documented

### AugmentedChat — new project
- New project at `Projects/AugmentedChat/documents/` covering web apps that enhance the AI chat experience
- Two implementation modes defined: clipboard (GiC/BYOA) and inline (Gemini API calls from within the app)
- Added as Group 7 in `documents/overview.md`

### Layered Reader — pattern designed and validated
- Scene-by-scene reading app with 3 pill buttons per tab: Level 1 (explain simply), Level 2 (key insight), Level 3 (expand with examples)
- Inline mode: pills fire Gemini API calls directly; response renders in an AI Insight card below the article; state clears on tab change
- Validated in Gemini canvas with Fermat's Last Theorem source — "Add Gemini feature" button in canvas auto-wired the API pattern
- Final design: light/dark toggle, parchment/Oxford Archival aesthetic, React 18 + Babel + Tailwind, `apiKey = ""` (canvas fills automatically)
- Zero-shot prompt documented in `Projects/AugmentedChat/documents/layered-reader.md` — ready to use with any notebook

### Content quality finding
- Narrative prose scenes produce far better AI responses than shot-list/metadata-heavy scene format
- Prologue (pure narrative) worked well; Scene 1 (camera directions + metadata) produced weak output
- Rule: when source mixes prose and shot metadata, tell Gemini to use only the narrative sections

---

## 2026-04-13 22:45 — why-allies-won-prompts.html v2 built and deployed

### Prompt launcher v2 — compact pills
- Rebuilt `why-allies-won-prompts.html` from scratch: full original app (all 6 tabs, all charts, all CSS/JS) with pills added as compact inline elements
- V1 was rejected: pills were large glass cards with labels; v2 uses `rounded-full` pill buttons at `0.7rem` font, minimal padding — unobtrusive inline elements
- All 20 prompts from v1 reused verbatim; 3–4 pills per tab, click copies to clipboard with 1.4s flash feedback

### Control plane — context-only mode
- Simplified sr-only div: app description + sr-only chart descriptions per visual element; no tour guide or teacher persona
- Chart descriptions cover 4 visuals: Thesis doughnut chart, Intelligence convoy visual, Air War line graph, Production comparison — prose descriptions allow GiC to understand chart content it can't read as SVG pixels

### Deployed
- File: `Projects/NotebookLM/playlists/apps/why-allies-won-prompts.html`
- Live at: `https://ewallt.github.io/claude-code-fun/notebooklm/why-allies-won-prompts/`

---

## 2026-04-13 20:18 — GiC: Teacher cartridge pattern built and deployed

### Teacher's Edition pattern — new cartridge mode
- New interaction mode: GiC assumes teacher persona, leads with one additional fact per tab (info not in the visible app) on any user message
- No tour structure, no prompting user to advance — just "what tab are you on, here's the fact"
- Key architectural insight documented: hidden layer is an **independent knowledge layer**, not a description layer; cartridge can carry content with no visible counterpart in the app

### Architecture doc updated
- Added "Theoretical Foundation" section to `Projects/GiC/documents/architecture.md`
- Covers: dual-layer asymmetric interface pattern, render-parse gap, Teacher's Edition pattern, BYOA framing, IDPI security (prose-only rule, authored context statement, GiC read-only)
- Triggered by academic paper Tom shared on dual-layer web interfaces

### Teacher cartridge created and deployed
- Cartridge file: `Projects/NotebookLM/playlists/apps/why-allies-won/cartridges/teacher.html`
- Swapped into `how-the-allies-won.html-v2.html` (replaced tour-guide-choice content at line 124)
- Deployed to gh-pages: `https://ewallt.github.io/claude-code-fun/notebooklm/why-allies-won/`
- Tom confirmed: "this looks to be working extremely well"

### Pre-compact skill order fixed
- Handoff note is now Step 1 (before session log) — captures live state before logging work potentially shifts context; also survives interruption better

---

## 2026-04-13 19:21 — Big Ideas: three dashboard cards added (post-compact)

### Dashboard cards added for new Big Ideas videos
- Added three `nlm` cards interrupted at last compact: Predictably Irrational (`a5d3997b`), Power of Habit (`ca50b9c4`), Thinking in Systems (`dbf46e75`)
- All source IDs, artifact IDs, and notes recorded in cards

### Pre-compact skill update
- Tom asked that handoff be written before session log in pre-compact order — noted for skill update

---

## 2026-04-13 19:17 — Big Ideas: three new videos kicked off + dashboard cleanup

### Big Ideas notebook added to working-notes.md
- Full notebook ID: `1dbe88d0-ca46-4a0a-b02e-5d1401af380e`, 4 sources as of today
- Already had playlist entry in youtube-playlists.json

### Four existing Big Ideas cards updated to `youtube`
- Black Swan, Historical Blind Spot, Thinking Fast and Slow, Blink — all uploaded by Tom yesterday, cards promoted from `nlm` to `youtube`

### Three new scene-format sources written and uploaded
- *Predictably Irrational* — source `6b0ec23b`, artifact `a5d3997b`
- *The Power of Habit* — source `cae2240f`, artifact `ca50b9c4`
- *Thinking in Systems* — source `ce91f8a1`, artifact `dbf46e75`
- All three videos kicked off in Big Ideas notebook (`1dbe88d0`)

### Dashboard cards NOT yet added
- Interrupted before adding cards for the three new Big Ideas videos — this is the immediate next step

---

## 2026-04-13 15:19 — History Potpourri: three discovery videos kicked off

### Scene-format sources written and uploaded
- Three sources for the "discovery hiding in plain sight" theme: Aristarchus (1,800-year gap), Antikythera (corroded lump → analog computer), Troy (Schliemann dug where Homer said)
- Each 7 scenes, following NLM cinematic scene rules; uploaded to History Potpourri notebook (`6e7fae88`)
- Source IDs: Aristarchus `5f0b9e5f`, Antikythera `f1604071`, Troy `a98ade0c`

### Cinematic videos kicked off
- All three kicked off simultaneously; artifact IDs: Aristarchus `7c9e2c0c`, Antikythera `923b5af8`, Troy `8e1f896f`
- Dashboard cards added with status `nlm`

### CLAUDE.md + overview.md updates
- Added "Looking Up Project Details" rule to CLAUDE.md: check overview.md and working-notes.md before asking about notebooks, playlists, or active project details
- Added pointer to `memory/working-notes.md` in overview.md "For More Detail" section

---

## 2026-04-13 13:57 — GiC tour-guide-choice cartridge + visual anchors

### tour-guide-choice.html cartridge built
- New cartridge at `apps/why-allies-won/cartridges/tour-guide-choice.html`
- Single cartridge with tiered knowledge base: Brief / Standard / Deep per tab
- Behavioral framing asks GiC to offer the user a choice of tour depth on first engagement
- Kept separate from `tour-guide.html` for A/B testing

### GiC behavior findings
- GiC defaults to developer/technical assistant mode on generic openers ("hi") — tour guide persona requires explicit user prompt ("I'd like a tour")
- Choice prompt (offer Brief/Standard/Deep) does not auto-fire — user must specify depth directly (e.g., "brief tour")
- GiC reads the control plane in full on init but cannot see charts/SVGs — visual anchor descriptions added per tab
- GiC suggested moving KB to JS object (would break architecture — KB must stay in DOM for GiC to read it)
- Local file mode restricts GiC capabilities; deploy to gh-pages always so click permission is available

### gic-integration skill updated
- Added Step 6 (deploy to gh-pages) before confirm step
- Reason: GiC has more capabilities (click with permission) on served pages vs. local files

### Loose end
- `tour-guide-choice.html` visual anchors written to cartridge file but not yet swapped into HTML or deployed

---

## 2026-04-13 13:03 — GiC Integration project created + skill built

### New project: Projects/GiC/
- `project-definition.md` and `architecture.md` created in `Projects/GiC/documents/`
- Architecture doc covers: how GiC reads the DOM, control plane div format, cartridge concept, folder structure, JS wiring, prose-only rule, validated modes
- `overview.md` updated — GiC is now Group 6 (Infrastructure bumped to 7)

### gic-integration skill created
- `~/.claude/skills/gic-integration/SKILL.md` written
- Workflow: identify app → choose mode → query NLM for deeper commentary → write cartridge prose → swap into HTML → verify JS wiring
- References `architecture.md` via JIT read at invocation
- Tour guide is the only specified mode; skill is designed to accommodate more

### Cartridge architecture decided
- Cartridges are self-contained control plane div fragments (no surrounding HTML)
- Saved alongside their app: `apps/[appname]/cartridges/[mode].html`
- Swapping cartridges changes GiC behavior without touching the app HTML
- No cartridges saved to disk yet — the allies-won tour-guide cartridge is still only embedded in the HTML

### Pending
- Extract existing control plane from `how-the-allies-won.html-v2.html` and save as `why-allies-won/cartridges/tour-guide.html`
- "The Six Groups" heading in overview.md still says Six (should be Seven)

---

## 2026-04-13 12:18 — GiC control plane — prose approach confirmed working

### Prose rewrite of #ai-control-plane
- Replaced trigger/command syntax with plain developer documentation prose
- Content: what the app is, what each tab covers, and an explicit note that this is intentionally authored context — not an injection attempt
- `updateControlPlane()` rewritten to only update the "currently viewing" line, not overwrite the full knowledge base on each tab switch

### Test results — full tour completed
- GiC gave substantive docent-style commentary for all 5 tabs without any prompt injection warnings
- Never attempted to click UI elements
- Commentary went meaningfully beyond tab text (e.g., Enigma restraint framing, Soviet feature-creep framing)
- Tour paced naturally: one tab at a time, waited for user to advance

### Key finding
- Prose framing (developer documentation intent) bypasses GiC's prompt injection security layer entirely
- Command/trigger syntax (`"x" -> do y`) is what triggers the security check — not the presence of instructions
- Next step: create a skill documenting this pattern for reuse

---

## 2026-04-13 11:52 — GiC AI control plane — knowledge base approach confirmed

### Key discovery: GiC extraction mechanism
- GiC reads visible text nodes and `sr-only` content — NOT `<script>` tags or `display:none` elements
- This means the `ai-manifest` JSON block in `<head>` was never being read
- `sr-only` div is the only reliable channel for GiC context

### Implemented #ai-control-plane
- Added `<div id="ai-control-plane" class="sr-only">` just inside `<body>` in `how-the-allies-won.html-v2.html`
- Contains full knowledge base: app summary + per-tab summaries for all 5 tabs + key facts
- JS `updateControlPlane()` keeps Current View state in sync on tab switches
- Deployed to gh-pages: `https://ewallt.github.io/claude-code-fun/notebooklm/why-allies-won/`

### Test results
- Cold-start test confirmed: GiC correctly named all 5 tabs and summarized the app from the control plane alone
- Trigger syntax (`"test" -> do X`) flagged by GiC as potential prompt injection — requires user confirmation before executing

### Next direction
- Drop trigger syntax entirely
- Rewrite control plane as plain explanatory prose: describe the intended tour guide experience, acknowledge injection awareness, let GiC read intent rather than commands

---

## 2026-04-12 20:32 — Big Ideas YouTube upload setup

### Big Ideas playlist added to config
- Added `PLmstT17VspmQVmLfYWGexq6zGPgOvBXQV` to `youtube-playlists.json` with description and hashtags
- All 4 NLM videos confirmed completed; titles chosen by Tom and set in dashboard

### Dashboard titles updated (Big Ideas)
- "The Black Swan: The Illusion of Certainty" (`82dca2b8`)
- "The Historical Blind Spot" (`d7f07227`) — Drive/Pink video
- "Thinking, Fast and Slow: The Architecture of a Mistake" (`4ca9e62a`)
- "Blink: The Mechanism of Instinct" (`383d2a4e`)
- nlmTitles set for all four

### Downloads / uploads
- `Thinking_Fast_and_Slow__The_Architecture_of_a_Mistake.mp4` downloaded this session
- `Blink__The_Mechanism_of_Instinct.mp4` already present in Not Yet in YouTube (prior session)
- Upload interrupted by session limit — Tom taking over manually

---

## 2026-04-12 20:21 — GiC tour system iteration (no-click problem unresolved)

### selectTour() JS function added
- Function written and deployed: reads manifest, writes active tour JSON to `gic-active-tour` div, updates TOUR button to `TOUR ●` at full opacity, highlights selected option in cyan, closes panel
- `gic-active-tour` changed from `display:none` to visually-hidden CSS so it stays in accessibility tree

### Manifest updated with GiC directives
- Added `gic` block: design intent, explicit no-click directive, pointer to `gic-active-tour` by element ID
- Added top-level `"instructions"` field as first key in manifest — emphatic no-click directive, visible to GiC before any other content
- Updated `mode_behavior` to step-by-step interaction: orient on tab name, ask user to read, wait, deliver tidbit, point to next tab, wait — never deliver multiple stops at once

### GiC no-click problem — unresolved
- Despite explicit instructions in manifest, GiC (Gemini in Chrome) still asks for permission to click the TOUR button instead of reading tours directly from the manifest
- Tried: burying directive in `gic` block, promoting to top-level `instructions` field, emphatic "NEVER" language
- Nothing has stopped GiC from attempting UI actuation
- Tom deferred: "we'll come back to this"
- Possible next steps: test if GiC's agentic mode vs. chat mode behaves differently; try a different framing (tell it the button doesn't work / is for display only); investigate whether GiC reliably reads script tags at all

---

## 2026-04-12 19:48 — GARBO video + GiC tour system (in progress)

### World War Two notebook — GARBO video
- Source `garbo-double-cross.md` written (7 scenes): Lisbon room → MI6 discovers ghost in Abwehr → XX Committee discipline → 3 years of fictional agents → Overlord message → two medals
- Source ID: `739a0a17`, Artifact ID: `1b6a15c0`, Notebook: World War Two `dc673f24`
- Dashboard card added: "GARBO: The Spy Who Fooled Hitler", playlist "World War 2"

### GiC Tour System — why-allies-won.html (partially complete)
- Concept: manifest carries named tours; each tour has a role + per-tab instructions with a tidbit beyond what's on screen
- Overview Tour defined in `ai-manifest`: 7 stops, each with summary + interesting tidbit not shown in app
- `gic-active-tour` hidden div added (GiC reads this to get active tour instructions)
- TOUR button (bottom-left) + tour selector panel added to HTML
- **NOT YET DONE:** `selectTour()` JS function — writes active tour block to `gic-active-tour`, highlights selected option in panel
- Next step: add `selectTour()` to the script block, then deploy to gh-pages

---

## 2026-04-12 19:22 — Big Ideas + Movements in Modern Art videos kicked off

### Big Ideas notebook — two more videos
- Drive: Why Carrots and Sticks Fail — source `drive-pink.md` written (8 scenes), uploaded (source `2ff2b860`), video generating (artifact `d7f07227`)
- The Black Swan: The Event You Didn't See Coming — source `black-swan-taleb.md` written (8 scenes), uploaded (source `4c5dc845`), video generating (artifact `82dca2b8`)
- Big Ideas notebook now has 4 videos in flight total (also Blink `383d2a4e` and Thinking Fast and Slow `4ca9e62a` from prior session)

### Movements in Modern Art — Rousseau
- Source `rousseau-le-douanier.md` written (7 scenes) — Le Douanier, customs officer, jungle paintings from botanical gardens, Picasso banquet 1908, The Dream
- Uploaded to Movements in Modern Art notebook `6537a3fb` (source `b94ab125`), video generating (artifact `97582eaf`)
- Dashboard card added

---

## 2026-04-12 19:09 — AI Manifest Pattern doc + Big Ideas notebook + two videos

### why-allies-won.html navbar fix
- Three long tab labels shortened: "Anatomy of Victory" → "Victory", "Dominating the Skies" → "Air War", "Command & Resilience" → "Command"
- Motivation: Gemini's side panel sits on the right and covered the rightmost tabs; Tom wanted page content to stay within the [AI] button boundary
- Redeployed to gh-pages

### AI Manifest Pattern — design doc written
- File: `Projects/NotebookLM/playlists/documents/ai-manifest-pattern.md`
- Captures: the core win (Gemini knows the whole app on load without tab navigation), the map-vs-depth distinction, the deep_dives extension concept, and the origin story
- Entry added to overview.md under NotebookLM section ("Manifest Pattern")
- Origin: Tom observed this is equivalent to the AI brain app pattern but available for free on any page with a manifest

### Big Ideas notebook + two videos kicked off
- Notebook created: "Big Ideas" (`1dbe88d0-ca46-4a0a-b02e-5d1401af380e`) — Gladwell/Kahneman-style popular nonfiction playlist
- Source 1: `blink-gladwell.md` (source `9492f5da`) — 7 scenes: Getty kouros → Gottman love lab → Warren Harding Error → New Coke → Diallo shooting → Van Riper → closing gallery
- Source 2: `thinking-fast-and-slow-kahneman.md` (source `504d0f6c`) — 7 scenes: bat-and-ball → two systems → Linda → anchoring → WYSIATI → colonoscopy peak-end rule → conclusion
- Videos generating: Blink artifact `383d2a4e`, Thinking Fast and Slow artifact `4ca9e62a`
- Dashboard cards added for both

---

## 2026-04-12 16:16 — nlm-web-app tested + AI hint panel + deployed to gh-pages

### First live test of redesigned skill
- Ran the redesigned nlm-web-app skill on "Why the Allies Won — Overy" notebook (`769e79fc-e014-448b-9562-e3faf30c4478`)
- NLM queried for structured content only; Claude wrote all HTML from scratch
- Screen-fit enforced via CSS (`max-height: calc(100vh - 4rem); overflow: hidden`) — not delegated to NLM
- File: `Projects/NotebookLM/playlists/apps/why-allies-won.html`
- Deployed to gh-pages: `https://ewallt.github.io/agent-test/notebooklm/why-allies-won/`

### AI hint panel
- Fixed bottom-right [AI] button toggles a glass panel with topic summary, per-tab one-liners, suggested questions
- Claude writes the panel from the NLM AI Briefing content — never delegated to NLM
- Added `<script type="application/json" id="ai-manifest">` in `<head>` — machine-readable context block Gemini can parse from the DOM without the panel being open
- Gemini (Chrome side panel) reviewed the deployed page and gave positive feedback; validated the "semantic interface layer" concept

### Pending UI tweak
- Tom noted Gemini side panel sits on the right and obscures the [AI] button (`bottom:1.5rem; right:1.5rem`)
- Plan: move [AI] button to use same left/bottom boundary, or add left-side option
- Also: remove the copy button (redundant when Gemini reads the DOM directly)
- NOT done yet — pre-compact interrupted

---

## 2026-04-12 14:25 — nlm-web-app skill redesigned with design quality upgrade

### Design requirements added to generate prompt
- Tom compared the NLM output to a Gemini-generated v2 (`how-the-allies-won.html-v2.html`) — Gemini's was noticeably more polished
- Key design insight: each tab must fit on a single viewport (no scrolling) because Tom uses in-browser AI tools that read the screen
- Redesigned generate prompt now specifies: fixed navbar, hero as Tab 00, glassmorphism cards, Google Fonts (Inter + Fira Code), cyan/crimson dual accent, typewriter hero animation, IntersectionObserver fade-ins, per-tab "Next →" buttons, 6–8 tabs target
- Structure prompt updated to ask NLM to aim for 6–8 concise screen-fit tabs
- Python extraction note added (response is JSON-wrapped)

---

## 2026-04-12 14:09 — nlm-web-app skill tested; command syntax bug fixed

### nlm-web-app test on "Why the Allies Won — Overy"
- Skill tested end-to-end on notebook `769e79fc-e014-448b-9562-e3faf30c4478`
- Found bug: SKILL.md had `nlm query NOTEBOOK_ID` — actual syntax is `nlm query notebook NOTEBOOK_ID`
- Fixed both occurrences in SKILL.md; also added full path `/c/Users/tomew/.local/bin/nlm`
- Generated HTML saved to `Projects/NotebookLM/playlists/apps/why-allies-won.html` (31KB)
- Output: tabbed "Decoding Victory" site with dark navy/cyan theme, 5 content tabs + hero

---

## 2026-04-12 14:03 — Videos uploaded; OBS video published; nlm-web-app skill created

### Gauguin and Lister uploaded to YouTube
- Gauguin: The Invented Paradise — downloaded from NLM (`c01368da`), nlmTitle `Gauguin__The_Invented_Paradise`, uploaded private; YouTube URL: https://www.youtube.com/watch?v=3EN2ngkP7ik
- Lister: The Wrong Paper — downloaded from NLM (`15110625`), nlmTitle `Lister__The_Wrong_Paper`, uploaded private; YouTube URL: https://www.youtube.com/watch?v=4t5invmOvBc
- Andrew Wiles (`b16dd100`) was stuck in_progress; re-kicked as `5ad612d6`

### OBS video uploaded to YouTube
- File: `agent-test/2026-04-12 13-12-58.mp4`
- Title: "From Notebook to Website in Minutes with Gemini"
- Playlist: "Web Development with AI" (new playlist, ID `PLmstT17VspmQWAL0GOHlqLYlVsyWv4USo`)
- Playlist added to `youtube-playlists.json` with hashtags from Tom
- No dashboard card created (not an NLM video)

### nlm-web-app skill created
- File: `C:\Users\tomew\.claude\skills\nlm-web-app\SKILL.md`
- Two-query workflow: structure query → generate query (with structure embedded) → save HTML
- Tabs layout (not scroll), Tailwind CSS, saves to `Projects/NotebookLM/playlists/apps/`
- Next step: test against "Why the Allies Won — Overy" notebook (notebook ID TBD)

---

## 2026-04-11 22:36 — Two videos kicked off; post-compact skill improved

### Lister: The Wrong Paper — History Potpourri
- Scene-format source written: `Projects/NotebookLM/playlists/sources/lister-antiseptic-surgery.md`
- 8 scenes: Victorian death-trap wards → miasma theory (wrong answer) → Anderson hands Lister Pasteur's fermentation paper → the leap → first patient (James Greenlees, 1865, carbolic lint) → the wound heals → resistance → Matisse retrospective 1906
- Uploaded to History Potpourri notebook (`6e7fae88`), source ID `3161eb41`
- Video kicked off, artifact `15110625`; dashboard card added: "Lister: The Wrong Paper"
- Angle: "wrong person in the right place" — a surgeon read a fermentation paper and connected two ideas no one else had

### Gauguin: The Invented Paradise — Movements in Modern Art
- Scene-format source written: `Projects/NotebookLM/playlists/sources/gauguin-the-invented-paradise.md`
- 8 scenes: Sunday painter → the crash → 1889 exhibition (tribal masks, Japanese prints) → auction and departure → what he found (colonized Tahiti) → what he painted anyway (invented paradise) → last years on Hiva Oa → Matisse retrospective 1906
- Uploaded to Movements in Modern Art notebook (`6537a3fb`), source ID `831550ad`
- Video kicked off, artifact `c01368da`; dashboard card added: "Gauguin: The Invented Paradise"
- Angle: fled civilization, found it had already arrived, painted the dream anyway — and the dream became the foundation of modern color

### Post-compact skill improved (two changes)
- Handoff note moved to Step 2 (immediately after overview) — so "where were we?" is answered before re-reading the session log
- Overview step annotated: "When the overview points to a reference doc, read it — this is not a matter of judgment" — prompted by failing to read youtube-playlists-guide.md after seeing its pointer in overview.md

---

## 2026-04-11 21:24 — Handoff pattern added to pre/post-compact skills

### Pre-compact and post-compact skills updated
- Pre-compact: added Step 2 — overwrites `memory/handoff.md` with a short (10–20 line) note capturing what was last being worked on, where it stands, and the immediate next step plus any IDs/paths needed to resume
- Post-compact: added Step 4 — reads `handoff.md` and surfaces it as the lead item in the orientation summary
- Motivation: session log tracks milestones; handoff tracks "what were we just doing" — separate concerns, previously conflated

---

## 2026-04-11 21:20 — Andrew Wiles source written and kicked off

### Wiles / Fermat's Last Theorem — History Potpourri
- Scene-format source written: `Projects/NotebookLM/playlists/sources/wiles-fermats-last-theorem.md`
- 8 scenes: boy in library → seven secret attic years → first Cambridge lecture (sparse) → third lecture (packed) → the flaw → a year passes → last morning (Iwasawa notebook) → what was left behind
- Uploaded to History Potpourri notebook (`6e7fae88`), source ID `da0bac4f`
- Cinematic video kicked off, artifact ID `b16dd100`
- Dashboard card added: "Andrew Wiles: The Last Morning", status `nlm`
- Notebook ID lookup required: working-notes only had short IDs; found full ID in session log. Working notes should be updated.

---

## 2026-04-11 21:13 — YouTube workflow improvements; playlists guide created; Wiles video in progress

### X thumbnail fix confirmed
- `&t=1s` appended to YouTube URL fixes the X thumbnail problem — confirmed working 2026-04-11
- `youtube-publish` skill updated: Step 4 paste blocks now include `&t=1s` on X URL by default; troubleshooting section replaced with the confirmed fix

### The Promise Before the Law uploaded to YouTube
- Downloaded artifact `f85af9df` (v1, prose + labels) from notebook `62ca1cd4`
- nlmTitle set to `The_Everlasting_Covenant`; card promoted to `youtube` status
- YouTube URL: https://www.youtube.com/watch?v=nrMTtCcUp44

### YouTube playlists guide created
- New doc: `documents/youtube-playlists-guide.md` — editorial focus, idea sourcing, and standards for all five playlists (History Potpourri, Movements in Modern Art, World War Two, Lightened With His Glory, Behold Your God)
- History Potpourri section includes full list of generative idea categories (coincidence, small cause/big effect, near-miss, unexpected chain of contingency, wrong person/right place, etc.)
- Pointer added to `overview.md`

### Andrew Wiles / Fermat's Last Theorem video
- Topic selected for History Potpourri: Andrew Wiles solving Fermat's Last Theorem
- Arc confirmed: childhood obsession → secret attic years → three lectures at Cambridge (room figures out the destination) → announcement → the flaw → a year of failure → last morning, discarded Iwasawa theory fills the gap
- Scene-format source in progress — interrupted before writing; pick up with scene-writer skill next session

---

## 2026-04-11 19:55 — Abraham story arc: two cinematic videos generated; rules doc updated

### Scene source experiment — story approach
- Hypothesis: theological videos underperform history/art videos because the latter are written as unfolding events; tested by writing a scene-format source as a genuine narrative arc
- Arc: Abraham under the stars → smoking furnace (unilateral covenant) → Moriah (Isaac carries wood) → Sinai contrast (Israel says "we will do") → the cross → new covenant written in hearts
- Two versions written and both kicked off as cinematic videos from notebook `62ca1cd4`
  - v1 (`f85af9df`): prose + explicit SETTING/LIGHTING/AUDIO/CAMERA labels at bottom of each scene — source `e16fe367`
  - v2 (`9677d19f`): pure prose, camera intent embedded in description only — source `04817015`
- Same focus prompt used for both; Tom watched both and liked them

### Focus prompt validated
- Focus prompt used: "You are a visionary documentary filmmaker with a strong cinematic voice. This is a theological narrative — treat it as a story unfolding across centuries, not an academic explanation. Every frame must earn its place. One primary camera action per scene — never combine movements. No text overlays, no captions, no on-screen typography. The tone is contemplative and weighty: ancient, reverent, unhurried. The camera is a participant in revelation, not an observer reporting facts. Honor the arc: from a man alone under the stars, through the shadow of Moriah, to the cross."
- Tom said the focus prompt was "very good" — persona + cinematic framing + single-motion rule + no text overlays all praised

### Rules doc updated (nlm-cinematic-scene-rules.md)
- Scene template: removed CAMERA and AUDIO as labeled fields; camera intent now embedded in prose, audio woven in if at all; SETTING and LIGHTING labels kept
- Focus Prompt Guidelines: expanded with "frame the content type" and "name the arc" as explicit techniques; validated example prompt added with date
- Checklist updated to match — "audio description" and "camera action labeled" removed

### Key design insight captured
- Tom's view: NLM is a black box; don't try to direct it through labeled fields, give it clues subtly through prose; focus prompt handles global aesthetic discipline
- The CAMERA: label concern: may be treated as narration content rather than a directive — reason for removing it from template

---

## 2026-04-11 15:49 — NLM cinematic scene guidelines saved; feedback loop discussion pending

### Scene guidelines doc saved
- Saved to `Projects/NotebookLM/playlists/documents/nlm-cinematic-scene-guidelines.md`
- Covers: fundamental 3-question rule, pseudo-animation trap, physical anchors, reliable/unreliable camera actions, audio cue technique, abstract→physical translation table, scene structure template, focus prompt role, known limits
- Added pointer to MEMORY.md under NLM Video Generation
- Tom noted the pattern of write→AI feedback→evaluate→apply edits used across all four sources this session; discussion of capturing this as a workflow guideline pending next session

---

## 2026-04-10 22:05 — Four LWG videos downloaded and uploaded to YouTube

### Videos uploaded (all private, all added to Lightened With His Glory playlist)
- "Galatians 2: The Truth of the Gospel" → nlmTitle `The_Anatomy_of_an_Addition` → https://www.youtube.com/watch?v=Fg-YYu4koBs
- "The Ever-Present Cross" → nlmTitle `The_Illusion_of_an_Addition` → https://www.youtube.com/watch?v=r4rb0egBVkc
- "Christ-Given Freedom" → nlmTitle `The_Paradox_of_the_Present_Tense` → https://www.youtube.com/watch?v=VhR4-vr05n4
- "The Glory of the Cross" → nlmTitle `The_Logic_of_Subtraction` → https://www.youtube.com/watch?v=CUb9VII_gRM
- Tom gave NLM titles in order (1st, 2nd, 3rd, 4th of the four kicked off this session); all four cards now at `youtube` status

---

## 2026-04-10 21:38 — Glory of the Cross source written, uploaded, video kicked off

### Source written with AI feedback applied
- Source: `glory-of-the-cross.md` — Galatians 6:12–18, Waggoner "The Glory of the Cross" (Signs of the Times, 05/17/1899)
- Three feedback edits applied: (1) Scene 2: replaced abstract stripping with Waggoner's own images — grass in wind, eagle with riches, balance tipping to nothing (rejected AI's king/warrior/merchant imagery as invented), (2) Scene 3: brought Paul back to the desk looking up at lamplight to anchor the abstract text-comparison in a human moment, (3) Scene 5: replaced "mechanism" with seed-into-dark-earth → light-bursting-upward image (descends/ascends physically grounded)
- Uploaded to LWG notebook (`62ca1cd4`), source ID `995869b6`
- Video artifact kicked off (cinematic), artifact ID `d4cd1820`
- Dashboard card added: "The Glory of the Cross", status `nlm`

---

## 2026-04-10 21:20 — Christ-Given Freedom source written, uploaded, video kicked off

### Source written with AI feedback pre-applied
- Source: `christ-given-freedom.md` — Galatians 5:1, Waggoner "Christ-Given Freedom" (Signs of the Times, 04/05/1899)
- Three feedback edits applied: (1) Scene 3: physical touch brought forward — "Jesus crosses the room and lays His hands on her" anchors the exchange, (2) Scene 4: "heavy iron door locked from the outside" makes law-as-jailer literal and filmable, (3) Scene 6: "she simply lifted her head because He had already spoken" replaces abstract faith-grasps-facts framing
- Scene 3 AI suggestion ("reaches across the dusty floor") rejected — not in text, wrong posture; substituted with actual laying-on-of-hands from the Gospel account
- Uploaded to LWG notebook (`62ca1cd4`), source ID `b666434a`
- Video artifact kicked off (cinematic), artifact ID `99cc9f53`
- Dashboard card added: "Christ-Given Freedom", status `nlm`

---

## 2026-04-10 21:10 — Ever-Present Cross source written, uploaded, video kicked off

### Source written with AI feedback pre-applied
- Source: `ever-present-cross.md` — Galatians 2:17–21; 3:1, Waggoner "The Ever-Present Cross" (Signs of the Times, 01/18/1899)
- Four edits applied from AI feedback before upload: (1) through-line man anchors all scenes at the same desk, (2) Scene 2 rewritten as identity shift in same room rather than grave/door imagery, (3) Scene 3 cosmic cross → shadow/light on desk, (4) Scene 5 added unnoticed candle/light in corner as visual anchor for "Christ already present"
- Steering prompt used as focus: moody cinematic, high-contrast desk shots → slow-motion nature/sunlight
- Uploaded to LWG notebook (`62ca1cd4`), source ID `9e63aa31`
- Video artifact kicked off (cinematic), artifact ID `aecff7b1`
- Dashboard card added: "The Ever-Present Cross", status `nlm`

---

## 2026-04-10 20:55 — Galatians 2 source revised, uploaded, video kicked off

### Source revisions applied
- Three AI feedback edits applied to `galatians-2-truth-of-the-gospel.md`:
  1. Scene 2: added physical anchor — Antioch room, faces of believers as message lands
  2. Scene 4: replaced anatomical language with wax seal/empty document metaphor (safety filter risk resolved)
  3. Scene 7: renamed to "Open Hands"; rewrote negations as positive visual; closes on specific Antioch image (open hands, not empty)
- Uploaded to LWG notebook (`62ca1cd4`), source ID `9fa49aaa`
- Video artifact kicked off (cinematic, `--source-ids 9fa49aaa`), artifact ID `38da0a9c`
- Dashboard card added: "Galatians 2: The Truth of the Gospel", status `nlm`

---

---

## 2026-04-10 20:48 — Dashboard cleanup; Galatians 2 source written; video descriptions

### Dashboard old card removal
- Removed 22 cards from `video-dashboard-data.json` — all cards with no `dateAdded` (older than 3 days from Apr 10)
- Cards with `dateAdded` >= 2026-04-07 retained; published column now clean

### Galatians 2 source written (not yet uploaded)
- Source: `galatians-2-truth-of-the-gospel.md` — 7 scenes based on E.J. Waggoner's Galatians 2:1–10 study ("The Truth of the Gospel", Signs of the Times 12/15/1898)
- Intended for Lightened With His Glory notebook/playlist
- AI feedback received; three actionable edits identified:
  1. Scene 2: anchor abstract theology in physical reaction (iron door metaphor)
  2. Scene 4: replace "circumcision" language with wax seal/empty coin metaphor (safety filter risk)
  3. Scene 7: rewrite negations as positive visual; close on specific Antioch image (man with open hands), not generic light metaphor
- **Not yet revised or uploaded** — pre-compact before revisions

### Video descriptions written (copy-paste ready)
- "The Corpse Who Fooled Hitler" (Operation Mincemeat): dead man on Spanish beach carrying fake invasion plans
- "Cracking the Uncrackable Twice" (Codebreaking/Battle of Atlantic): broke Enigma, lost it, broke it again
- "The Wrong Resistor" (Pacemaker): wrong resistor in 1956 pulsed like a heartbeat
- "Robertson's Titan": 1898 novella predicted Titanic 14 years early
- WW2 playlist hashtags revised: removed `#HistoryChannel`, `#DDay`, `#Normandy` (too specific); new set: `#WW2 #WWII #WorldWarII #History #MilitaryHistory #WarHistory #Military #SecondWorldWar #HistoricalFacts #WorldWar2`

---

## 2026-04-10 15:18 — Morumbi Sul eating video kicked off

### Source revised and uploaded
- Applied 3 feedback edits: Scene 1 replaced abstract mall mention with concrete street/restaurant visuals; Scene 7 added "calendar of meals" metaphor (sushi counter Tuesday, pizza oven Friday, white tablecloths Sunday); Key Takeaway replaced cuisine list with single closing image (Portuguese restaurant, Sunday afternoon)
- Uploaded to Taboão da Serra notebook (`2089f07f`), source ID `dec6fd00`
- Video artifact kicked off (cinematic, `--source-ids dec6fd00`), artifact ID `b533df24`

---

## 2026-04-10 15:12 — Taboão da Serra videos kicked off; WW2 uploads blocked

### Pinheiros eating video kicked off
- Source written in scene format (`pinheiros-eating.md`), uploaded to Taboão da Serra notebook (`2089f07f`), source ID `d6242c2c`
- Source revised after AI feedback: Scenes 1 and 6 re-anchored with concrete visuals, lighting cues added to Scenes 2 and 5, Scene 4 replaced philosophy with kitchen action
- Video artifact kicked off (cinematic, `--source-ids d6242c2c`), artifact ID `9af2161e`
- Steering prompt used: "A relaxed, food-focused travel documentary set in São Paulo, featuring warm, high-contrast urban cinematography, bustling market acoustics, and close-up, appetizing shots of Brazilian street food."

### Morumbi Sul eating source written (not yet uploaded/revised)
- Source written (`morumbi-sul-eating.md`) — 7 scenes, pescatarian framing, 5-month stay rotation angle
- AI feedback received; revision identified: Scene 1 shopping center needs concrete visuals, Scene 7 needs "calendar of meals" visual metaphor, Key Takeaway needs single closing image not a list
- **Not yet revised or uploaded** — pre-compact interrupted before revision

### WW2 uploads blocked
- NLM auth failed during download attempt (code 5 error) — Tom re-authenticated but YouTube daily quota was also hit
- 2 WW2 videos (`4ec99a78` Codebreaking, `2973d701` Operation Mincemeat) still at `nlm` status — not yet downloaded or uploaded
- YouTube quota resets at midnight Pacific; retry tomorrow

### History Potpourri hashtag fix
- Wrong hashtags used on Pacemaker and Titanic uploads; Tom fixed manually in YouTube
- Correct hashtags already in `youtube-playlists.json`: `#History #Ideas #GreatIdeas #Culture #Philosophy #Civilization #Thinking #HistoricalFacts #Intellect #Learning`

### Taboão da Serra notebook ID confirmed
- `2089f07f-342d-4b37-af14-af4e3294c6a3` — 14 sources, personal Brazil content

---

## 2026-04-09 21:59 — Pissarro uploaded; skills and config updated

### Pissarro video uploaded to YouTube
- Downloaded artifact `4558253a` from Movements in Modern Art notebook (`6537a3fb`)
- nlmTitle: `The_Paradox_of_the_Pioneer`; YouTube URL: `https://www.youtube.com/watch?v=eJrIPQ6s7T0` (private)
- Dashboard card updated to `youtube`; file moved to `Videos/Movements in Modern Art/`

### scene-source-improver skill created (design stub)
- New stub at `C:\Users\tomew\.claude\skills\scene-source-improver\SKILL.md`
- Documents intent: use Gemini to evaluate video fidelity → extract lessons → update scene-writer incrementally
- Gemini prompt draft included; not yet a functional skill

### Adams/Jefferson feedback memory saved
- `memory/feedback_nlm_scene_source_fidelity.md` — scene-format sources translate with very high fidelity; quotes, data, scene order all preserved; climax placement matters

### History Potpourri hashtags updated
- Removed `#HistoryChannel` and `#Paradox`; new set saved to `documents/youtube-playlists.json`

---

## 2026-04-09 21:27 — 2 WW2 sources written and kicked off; scene-writer used

### 2 WW2 sources written and uploaded to World War Two notebook (`dc673f24`)
- **Codebreaking and the Battle of the Atlantic** — source `9d98e964`, artifact `4ec99a78`
  - 6 scenes: The Lifeline → The Happy Time → The Machine → The Grab → The Blackout → The Turn
- **Operation Mincemeat: The Corpse Who Fooled Hitler** — source `5469b9e8`, artifact `2973d701`
  - 7 scenes: split "The Man" into "The Body" + "The Life" (two distinct ideas per scene-splitting rule)
- Both source files written to `Projects/NotebookLM/playlists/sources/`
- Both dashboard cards added at `nlm` status under "World War Two" notebook, playlist "World War 2"

### Pending: NLM session expired mid-session
- Auth expired when checking artifact statuses; Tom needs to `nlm login` before downloading any completed videos

### Next: YouTube uploads for Movements in Modern Art
- Tom is identifying "The Paradox of the Pioneer" (Pissarro or Seurat) by watching it
- Plan: download from NLM CLI and upload to YouTube once identified

---

## 2026-04-09 15:47 — NLM download capability confirmed; 5 uploads; 4 new videos in-flight

### NLM CLI download confirmed working
- `nlm download video NOTEBOOK_ID --id FULL_ARTIFACT_UUID --output path.mp4` works end to end
- Downloaded all 5 completed videos (Cézanne, Van Gogh, 3 History Potpourri) directly to Downloads
- Eliminates the need to manually download from the NLM browser UI

### 5 videos uploaded to YouTube
- Cézanne: `https://www.youtube.com/watch?v=ljLT8yqjH3I`
- Van Gogh: `https://www.youtube.com/watch?v=Ml5zcO6Lvoo`
- Able Archer 83: `https://www.youtube.com/watch?v=JdpEYSd2g0E`
- Columbus's Wrong Math: `https://www.youtube.com/watch?v=dMZidVn9y0k`
- Adams and Jefferson: `https://www.youtube.com/watch?v=ltKwZ_tlFTI`
- All uploaded private; all cards updated to `youtube` status; files moved to Videos folders

### 4 new videos kicked off
- History Potpourri: Titanic novel (artifact `c1659b62`), Pacemaker wrong resistor (artifact `9d932ecd`)
- Movements in Modern Art: Seurat (artifact `3f01f67f`), Pissarro (artifact `4558253a`)
- All sources written in scene format; full source UUIDs used

### Duplicate cleanup
- Found `The_Final_Hours_of_the_Founders.mp4` and `(1)` copy in Downloads (Tom manual downloads); deleted both, used our `adams-jefferson-last-day.mp4`
- NLM title for Adams-Jefferson confirmed: `The_Final_Hours_of_the_Founders`

---

## 2026-04-09 12:44 — scene-writer skill created; History Potpourri videos kicked off

### scene-writer skill
- New skill at `C:\Users\tomew\.claude\skills\scene-writer\SKILL.md`
- Structures NLM source documents as a sequence of short scenes instead of essays
- Format: title + overview, Scene N sections (1-3 paragraphs each, one idea per scene), Key Takeaway
- Rule: more smaller scenes is better than fewer longer ones; climax always gets its own scene
- Validated in practice: Adams-Jefferson July 4 source used this format and produced a strong cinematic video

### 3 History Potpourri videos generated
- Able Archer 83 (artifact `fd99e3fb`) — source `6a6667cd`
- Columbus's Wrong Math (artifact `b9dc6a00`) — source `8488a26b`
- Adams and Jefferson: The Last Day (artifact `fcf3d7ff`) — source `497eee4b`
- All using full source UUIDs; all in History Potpourri notebook (`6e7fae88`)
- Adams-Jefferson source written in scene format (first use of the new pattern)

### Van Gogh video kicked off
- Artifact `c8d644fa`, source `55ef117d-69cf-4585-958a-06db519ac21d` (full UUID)
- Dashboard card updated from failed artifact `7144a748` to `c8d644fa`
- Cézanne card updated from failed `0ea380e8` to retry `57243ace`

---

## 2026-04-08 21:15 — WW2 uploads, Cézanne/Van Gogh sources + videos, skill fixes

### 2 WW2 videos uploaded to YouTube (by Claude)
- "The Closing Window" → nlmTitle `The_Looting_Engine__The_Economics_of_the_Nazi_War_Machine`, URL `https://www.youtube.com/watch?v=LSPVM1LVBHU`
- "The Necessary Disaster: Kasserine Pass" → nlmTitle `The_Ticking_Clock__Why_Kasserine_Pass_Doomed_the_German_War_Mac`, URL `https://www.youtube.com/watch?v=jOToX-GedlI`
- Both uploaded private, files moved to parent folder, cards updated to `youtube` status

### Cézanne and Van Gogh sources created and uploaded
- Source docs: `art-cezanne-father-of-modern-art.md` and `art-van-gogh-compulsion.md` in playlists/sources/
- Uploaded to "Movements in Modern Art" notebook (`6537a3fb-cf88-48cc-9c70-f6a69f132aa8`)
- Source IDs: Cézanne `c7c43f5a-9ee5-42d9-b00b-772f0d6a302c`, Van Gogh `55ef117d-69cf-4585-958a-06db519ac21d`
- Dashboard cards added for both at `nlm` status

### NLM video generation failures — root cause found
- First attempts (artifact `0ea380e8`, `7144a748`) both failed
- Root cause: short 8-char source IDs in `--source-ids` cause silent failures; full UUID required
- Retry with full UUID for Cézanne (artifact `57243ace`) is in progress and appears to be working
- Van Gogh still needs to be run with full source UUID after Cézanne completes

### Skill fixes
- `notebooklm-video` — added gotcha: full UUID required in `--source-ids`; short 8-char prefix causes silent failure
- `youtube-publish` Step 2 — reworded to clarify the purpose of `nlmTitle`: preserves NLM filename for source tracking; card `title` is the human-readable YouTube title

### youtube-publish title logic clarified
- Tom confirmed: NLM sometimes assigns strange filenames; `nlmTitle` field exists to trace the file back to its source
- The card `title` is the YouTube-facing name; if NLM title is opaque, rename the card and keep `nlmTitle` for tracking

---

## 2026-04-08 16:42 — Post-compact: 2 LWG videos uploaded, skill fixes, WW2 reruns pending

### 2 LWG videos uploaded to YouTube (manually by Tom)
- "Not Smitten of God: The Cross Isaiah Actually Described" → nlmTitle `The_Line_in_Isaiah__Decoding_the_Cross`
- "The Promise That Contained Everything" → nlmTitle `The_Anomaly_of_the_Empty_Hands`
- Both cards updated to `youtube` status in dashboard

### WW2 video reruns
- Tom is running "The Closing Window" and "The Necessary Disaster: Kasserine Pass" manually in NLM using focus prompts provided
- Focus prompts are stored on dashboard cards; notebook `dc673f24`, source IDs `4b0d819d` and `444c10a7`
- NLM had an active outage earlier today; status unclear

### "The Promise That Contained Everything" NLM rerun
- Claude's attempt failed (likely due to NLM outage, possibly also single quotes in focus prompt)
- Tom ran it successfully manually using the focus prompt
- Artifact `8c46962e` updated on dashboard card

### Skill fixes
- `notebooklm-video` — added Gotchas section: no single quotes in `--focus` strings on Windows bash (mangled by Git Bash when passed to Python subprocess)
- `youtube-publish` — Step 2 updated: make title decisions autonomously, do not ask Tom; added Troubleshooting section for X thumbnail issues
- Root cause of X thumbnail failures: `youtu.be` shortened URL less reliably crawled than `youtube.com/watch?v=`; upload script already outputs full URL format — issue only arose because Tom posted manually using YouTube Studio's share URL

### youtube-publish skill-creator invocation note
- skill-creator was invoked but not followed; edit was made directly — acceptable for simple targeted modifications

---

## 2026-04-08 11:09 — Focus prompts, skill fixes, 5 videos uploaded to YouTube

### NLM video format changed to cinematic-only
- `explainer` and `brief` marked deprecated in `notebooklm-video/SKILL.md`
- Default changed to `cinematic`; CLI command section updated with real example using actual notebook/source IDs
- Motivation: all 6 videos from previous session were generated without `--focus` and some used wrong format

### Focus prompts added to remaining cards
- WW2 cards: "The Closing Window" and "The Necessary Disaster: How Kasserine Pass Made the American Army"
- All 7 redo cards now have `focusPrompt` set in `video-dashboard-data.json`

### youtube-publish skill: --private now the default
- Step 3 rewritten — `--private` is always used; bold "Always use" note added
- Reason: Published date in YouTube Studio should reflect when video goes live, not upload time
- 3 History Potpourri videos were accidentally uploaded public before this fix — Tom needs to flip them to private in YouTube Studio

### 5 videos uploaded to YouTube (private except History Potpourri 3 which were public by mistake)
- The Letter That Invented Probability → https://www.youtube.com/watch?v=sZKYRHF8Kx8
- The Wrong Turn at Sarajevo → https://www.youtube.com/watch?v=QcS-m6uask8
- The Anatomy of Productive Negligence → https://www.youtube.com/watch?v=ckBVe6jRTzo (card renamed from "The Forgotten Petri Dish" — NLM title stronger)
- Edgar Degas: The Calculated Lens → https://www.youtube.com/watch?v=Lu1z1fy3Sw8
- Berthe Morisot: The Anatomy of an Erasure → https://www.youtube.com/watch?v=U_A_4ycDnkE
- All 5 dashboard cards set to `youtube`; files moved to parent playlist folder

### Pending redos (3 videos still need regeneration with --focus)
- LWG: Not Smitten of God (bad — no focus prompt when run)
- WW2: The Closing Window (bad)
- WW2: Kasserine Pass (bad)
- LWG: The Promise That Contained Everything — good version exists, ready to download and upload

---

## 2026-04-07 21:08 — 6 NLM videos created; Degas + Morisot uploaded to YouTube

### YouTube uploads (Degas, Morisot)
- Uploaded "Edgar Degas: The Calculated Lens" and "Berthe Morisot: The Anatomy of an Erasure" to YouTube (Movements in Modern Art playlist)
- Both cards set to `youtube` status; 2 of 8 daily slots used; 6 remaining
- youtube-publish skill updated: added `--private` flag option with note about Published date behavior

### WW2 source docs and NLM videos
- `ww2-kasserine-pass.md` — Atkinson's *An Army at Dawn*; covers Fredendall's bunker command, Sidi Bou Zid (98 tanks lost), Kasserine rout, Eisenhower fires Fredendall, Patton's 10-day transformation, El Guettar victory, Tunisia surrender
- `ww2-wages-of-destruction.md` — Tooze's *Wages of Destruction*; economic fragility argument: Schacht warnings, Blitzkrieg as economic necessity, France windfall creating dependency, Barbarossa as autarky bet, American industrial shadow, window closes Dec 1941
- Both uploaded to World War Two notebook (`dc673f24-f901-4f9d-bd72-47016c90ca6f`); artifacts `444c10a7` (Kasserine) and `4b0d819d` (Closing Window)
- Note: full UUID required for `nlm source add` — short prefix fails

### LWG source docs and NLM videos
- `lwg-promise-that-contained-everything.md` — Tom's theological outline; Galatians 3 covenant=promise equivalence, Abraham never possessed land (Acts 7), Romans 4:13 (heir of world), promise contains righteousness/eternal life/Christ; Hagar/Sarah diagnostic; cheap grace objection answered
- `lwg-fifield-isaiah53.md` — George Fifield's GCBD97 sermon; Isaiah 53:4 as two-theology contrast, pagan appeasement structure imported into Christianity, reversal (God reconciling world to himself not reverse), Christ bearing our griefs in our flesh, atonement as at-one-ment, God is love alone, cross as propitiation of us not God
- "Promise That Contained Everything" → Everlasting Covenant notebook (`62ca1cd4`); artifact `83c29088`
- "Not Smitten of God" → BYG: Divine Character notebook (`b64c5fc6`); artifact `8760c2c1`

### Dashboard cards added
- 6 new cards in `video-dashboard-data.json`: Sarajevo (`e5db7107`), Penicillin (`dd8b25f0`), Kasserine (`444c10a7`), Closing Window (`4b0d819d`), Promise (`83c29088`), Not Smitten (`8760c2c1`) — all status `nlm`

---

## 2026-04-07 16:56 — Dashboard data/HTML split, dateAdded field, skill updates

### Video dashboard refactored: data extracted to separate JSON file
- `DEFAULT_VIDEOS` moved from `video-dashboard.html` to `documents/video-dashboard-data.json`
- HTML now loads data via `fetch('video-dashboard-data.json')` in an async `init()`
- Motivation: reading the full HTML file on every card operation was a major token cost; now Claude only reads the lean JSON file
- NOTE: fetch() requires HTTP server — does not work on file:// protocol. Tom was trying to open it directly; URL issue being resolved at pre-compact

### dateAdded field added to dashboard cards
- New optional field `dateAdded: '2026-04-07'` (ISO string) — displays as `added Apr 7` in card footer
- Existing cards have no field set (display nothing); new cards should always include it
- `formatDate()` helper added to the HTML script block
- video-dashboard skill and SKILL.md updated to document the field

### Skill updates: youtube-publish --private flag documented
- Step 3 of `youtube-publish/SKILL.md` updated with `--private` flag example and explanation
- Use `--private` when you want YouTube Studio's Published date to reflect when the video goes live (Tom flips to Public when posting to X/Facebook)

### Degas and Morisot videos downloaded, pending upload
- `Edgar_Degas__The_Calculated_Lens.mp4` and `The_Anatomy_of_an_Erasure__Berthe_Morisot.mp4` are in `Videos/Movements in Modern Art/Not Yet in YouTube/`
- Both ready to upload to "Movements in Modern Art" playlist — not yet done

---

## 2026-04-06 16:49 — WW2 video uploads, NLM sources written, Battle of Britain video started

### Remaining three LWG videos uploaded to YouTube
- The Sabbath as God's Antidote to Legalism → https://www.youtube.com/watch?v=hKwdo1xdhMw
- The Jericho Principle → https://www.youtube.com/watch?v=JKLHP2RJ050
- Escaping Egypt Today → https://www.youtube.com/watch?v=9P1eK8O2HL4
- All three files renamed to card titles, moved to parent folder, dashboard cards updated to `youtube`

### WW2 NLM sources and videos
- Queried "Why the Allies Won — Overy" notebook (ID: `769e79fc`)
- Wrote source `ww2-why-allies-won-overy.md` — Overy's contingency argument, mass production contrast, leadership asymmetry, Soviet moral reboot, Enigma quantified
- Uploaded to "World War Two" notebook (ID: `dc673f24`), source ID: `945c7732`
- Cinematic video started with `--source-ids 945c7732` — artifact ID: `2a1cbe3e` (still in progress at pre-compact)
- Queried "WW2 Battles: Britain & Atlantic" notebook (ID: `6aab4002`)
- Wrote source `ww2-battle-of-britain.md` — Dowding System 75% interception rate, Battle of the Barges, bomber crew casualty stat, Halifax secret negotiations, Dowding's Ultra cover unit (No. 421 Flight), Josef František
- Uploaded to "World War Two" notebook, source ID: `9068d7d8`
- Battle of Britain cinematic video started with `--source-ids 9068d7d8` — artifact ID: `0c9995c6` (in progress)

### WW2 Initiative Gap video — pending
- File: `The_Initiative_Gap__How_Citizen-Soldiers_Saved_D-Day.mp4` in `C:/Users/tomew/Videos/World War 2/Not Yet In Youtube/`
- Dashboard card: "Initiative Gap" (placeholder — Unknown notebook, no artifactId, weak title)
- Blocked on: (1) no "World War 2" playlist in youtube-playlists.json — needs playlist ID, description, hashtags; (2) title decision — NLM name is stronger, card is a bare placeholder
- Resume here after post-compact

---

## 2026-04-06 15:16 — LWG videos uploaded, dashboard cleanup, sync check improvements

### Six LWG videos downloaded and uploaded to YouTube
- All six NLM-generated videos confirmed downloaded; nlmTitle fields and statuses updated on all cards
- Three uploaded to YouTube this session: The Miracle of Forgiveness, Counterfeit Crosses, The Real Promised Land
- Naming rule established: card title (Claude's title) wins; file renamed to match before upload; nlmTitle field preserves NLM's generated name
- The Sabbath as God's Antidote to Legalism, The Jericho Principle, Escaping Egypt Today remain in Downloaded column

### Dashboard card fixes
- Added nlmTitle and playlist fields to four BYG cards that were missing them
- Cosmic Audience at Calvary and Tragedy of the Projected God corrected from `nlm` → `youtube` (files in BYG parent folder)
- youtube-playlists.json had malformed JSON (extra closing brace on Behold Your God entry) — fixed

### video-sync-check and post-compact skill updates
- Added localStorage limitation note to video-sync-check with exact browser console commands for debugging (`video-dashboard-v2`, `video-dashboard-hidden`, `video-dashboard-permanent`)
- Removed automatic sync check from post-compact — too many false negatives due to localStorage blind spot; run manually when debugging only

### Memory and overview updates
- Saved naming rule to `feedback_nlm_video_source.md`: card title wins, file renamed to match, nlmTitle tracks NLM name
- Added default video pattern note to overview.md under NotebookLM section

---

## 2026-04-05 18:41 — Six cinematic videos generated, infrastructure improvements

### Six Lightened With His Glory videos queued in NLM
- Wrote six focused source documents (`lwg-*.md`) for the Everlasting Covenant notebook and uploaded them
- Each source is a standalone theological essay (~500 words) covering: Miracle of Forgiveness, Counterfeit Crosses, Real Promised Land, Sabbath as Antidote to Legalism, Jericho Principle, Escaping Egypt Today
- All six cinematic videos generated via `nlm video create --format cinematic --source-ids <single-source>` — one source per video to prevent cross-contamination
- Artifact IDs: `c2af8e80`, `1409b42d`, `6f293b1d`, `a0dad992` (note: same as source ID — coincidence), `f30aa633`, `fcecf5fd`
- Dashboard cards updated: status `nlm`, artifact IDs populated, playlist `Lightened With His Glory`

### nlm-code5-error troubleshooting doc created
- New folder: `Projects/Infrastructure/troubleshooting/` — first troubleshooting doc in project
- Documents three root causes of code 5 errors: short IDs, stale cache, PATH conflict after upgrade
- Overview.md updated to point to this folder
- Working notes updated with Everlasting Covenant notebook ID

### notebooklm-video skill updated
- Corrected CLI command from `nlm video generate` → `nlm video create`
- Added all three format options: `explainer`, `brief`, `cinematic`
- Clarified cinematic videos have no visual style — `--style` flag is ignored, do not specify
- Added `--source-ids` and `--confirm` flags that were missing

### video-dashboard skill updated
- Changed focusPrompt from optional to expected on every card
- Exception: cards with status `youtube` or `published` (video already done, no NLM generation needed)
- If no focus prompt discussed when adding a card, draft one from context

### settings.local.json permission fixes
- Added `Glob` to allow list (was missing; caused permission prompts when searching skills directory)
- Added `"defaultMode": "auto"` and `"skipAutoPermissionPrompt": true` to local settings
- Root cause: local settings were overriding global settings and losing these directives
- Requires restart to take effect

---

## 2026-04-05 17:41 — Lightened With His Glory playlist, nlm upgrade, notebook query

### Lightened With His Glory playlist created
- New YouTube playlist confirmed: "Lightened With His Glory" (`PLmstT17VspmRCMrXaC9BRpkuBNmG5hziG`)
- Diagnostic Covenant moved from BYG playlist to this new playlist (Tom did this in YouTube Studio)
- Dashboard card updated: `playlist` field changed from `Behold Your God` → `Lightened With His Glory`
- `youtube-playlists.json` updated: new entry with playlist ID, description, hashtags (same as BYG)
- Playlist description: "Studies related to final events and righteousness by faith."
- Video description: "*Lightened With His Glory* traces the message that lights the earth — righteousness by faith, the everlasting covenant, and the character of a God whose love alone can prepare a people for his coming."
- Playlist name is a Rev. 18:1 reference; draws on Jones, Waggoner, Wieland — intentionally not overt

### nlm CLI upgraded and PATH fixed
- Upgraded `notebooklm-mcp-cli` from 0.5.14 → 0.5.16
- Root cause: pip installed to Python Scripts dir but old exe at `~/.local/bin/nlm.EXE` took PATH priority
- Fix: copied new exe over old one at `C:/Users/tomew/.local/bin/nlm.EXE`
- Auth cache cleared (`~/.notebooklm-mcp-cli/cache`, `chrome-profiles`, `profiles`) after Gemini diagnosed stale session state
- Key finding: short notebook IDs (e.g. `62ca1cd4`) fail with code 5; full UUIDs work — alias resolution bug in CLI

### Everlasting Covenant notebook queried for video ideas
- Notebook: `62ca1cd4-11db-4c58-9936-7d42241ee4ea` — 9 sources, primarily E.J. Waggoner
- Six candidate video topics surfaced: Miracle of Forgiveness, Counterfeit Crosses, Real Promised Land, Sabbath as Antidote to Legalism, Jericho Principle, Escaping Egypt Today
- Tom has not yet selected a second video topic

---

## 2026-04-05 16:01 — Diagnostic Covenant upload, sync skills, permissions fix

### Diagnostic Covenant uploaded
- Uploaded "The Diagnostic Covenant: Escaping the Sinai Trap" — https://www.youtube.com/watch?v=bQ6u0mKoys8
- Auto-assigned to Behold Your God playlist; file moved from `NotOnYoutube/` to parent folder
- Card added to dashboard (`status: 'youtube'`); COLUMNS bug fixed (youtube column had `status: 'published'`)

### BYG playlist config completed
- Description and hashtags added to `youtube-playlists.json` for "Behold Your God"
- Hashtags: #prayer #faith #christianity #spirituality #belief #god #kneelingprayer #devotion #spiritualjourney #religiouslife #christ #cross

### video-sync-check and video-sync-apply skills created
- `video-sync-check`: scans `Videos/` file system, cross-references card `nlmTitle` fields, flags stale/missing/phantom cards — no changes made
- `video-sync-apply`: applies fixes after Tom reviews check output
- `post-compact` updated: Step 4 now runs sync check automatically

### settings.local.json fixed
- Replaced ~70 accumulated specific Bash patterns with `Bash(*)`, `Read`, `Write`, `Edit`, `WebSearch`, `WebFetch`, `Skill`
- Local settings were overriding global, causing permission prompts despite global having `Bash(*)`
- Fix takes effect on next Claude Code restart

### Session orientation documented
- Startup/shutdown skills discontinued; pre-compact = end of session, post-compact = start of session
- Documented in `overview.md` (Session Orientation section) and `memory/feedback_startup.md`

---

## 2026-04-05 14:16 — YouTube uploads live, dashboard published column, permissions fix

### First two uploads completed
- Renoir: The Painter of Joy uploaded — https://www.youtube.com/watch?v=iRqv1FB8pns — OAuth browser auth triggered on first run; Tom manually added to playlist (playlistId wasn't set yet)
- Learning to See the Invisible uploaded — https://www.youtube.com/watch?v=jj7gBPkMnqQ — auto-assigned to "Movements in Modern Art" playlist; file moved from `Not Yet in YouTube/` automatically
- Both cards set to `published` on dashboard

### youtube-playlists.json updated
- playlistId set for "Movements in Modern Art": `PLmstT17VspmScRrQz8M33WMiBaVHoiBLe`
- "Behold Your God" playlist added: `PLmstT17VspmRW9lZYDq0aZ9TfBMs2rCju` (description/hashtags TBD)
- Hashtags appended to description field so they're copy-ready at publish time

### Dashboard: Published column added
- `published` = posted to X and Facebook; `youtube` = uploaded but not yet posted socially
- Board expanded to 5 columns; all 7 existing cards migrated to `published`
- Tom drags `youtube` → `published` himself after posting — Claude does not do this step

### Permissions fix
- `Read` added to global allow list in `~/.claude/settings.json` — was missing, causing prompts for reads outside the working directory
- `--dangerously-skip-permissions` is deprecated; use `defaultMode: auto` with explicit allow list instead
- overview.md updated with videos folder path (`C:\Users\tomew\Videos\`) and permissions note

### Skills updated
- youtube-publish: absolute file path, Step 5 clarified (Claude moves file; `youtube` ≠ published)
- video-dashboard: COLUMNS table updated to 5 columns including `published`

---

## 2026-04-05 13:19 — YouTube upload automation built

### youtube-upload.py script created
- File: `tools/youtube-upload.py`
- Uses YouTube Data API v3 with OAuth 2.0 (Desktop app flow)
- Args: `--file`, `--title`, `--playlist` — reads description/hashtags from `youtube-playlists.json`
- Uploads with resumable upload (shows progress %), publishes as Public, adds to playlist if `playlistId` set
- Prints YouTube URL and hashtags on completion
- Token saved to `tools/youtube-token.json` after first auth (browser opens once only)

### Setup completed
- Dependencies installed: `google-api-python-client`, `google-auth-httplib2`, `google-auth-oauthlib`
- OAuth credentials downloaded from Google Cloud Console, renamed to `tools/youtube-client-secrets.json`
- Both credential files added to `.gitignore`
- Ready to run first upload (Renoir: The Painter of Joy) pending compact

### Dashboard and skill corrections
- `notebook` field corrected on 4 art cards: "Impressionism" → "Movements in Modern Art" (actual NLM notebook name)
- `cardHTML()` updated: suppress blue notebook tag when `playlist` is set (avoids redundancy)
- `nlmTitle` field added to all cards, migrated from `notes` free text
- youtube-publish skill rewritten: now invokes the script instead of guiding manual browser steps

---

## 2026-04-05 12:29 — YouTube publish skill + nlmTitle field decision

### youtube-publish skill created
- New skill at `C:\Users\tomew\.claude\skills\youtube-publish\SKILL.md`
- Covers: find downloaded cards, load playlist config, prep metadata block, guide manual upload, output social paste blocks (X + Facebook), update dashboard
- Key rule: do YouTube at START of session, not end
- Playlist config lives at `documents/youtube-playlists.json` (created this session)
- Future automation note included (YouTube Data API planned)

### youtube-playlists.json created
- File: `documents/youtube-playlists.json`
- Starter entry for "Movements in Modern Art" with description + hashtags Tom provided
- `playlistId` left blank — Tom will fill in when ready

### nlmTitle field decided (pending implementation)
- Tom wants a dedicated `nlmTitle` field on video cards to separate the chosen title (used on YouTube) from the NLM-generated filename
- Current state: NLM filename buried in `notes` as free text (`NLM title: Renoir__The_Painter_of_Joy`)
- Plan: add `nlmTitle: null` to DEFAULT_VIDEOS shape, migrate existing entries, update youtube-publish skill to include a title review step
- youtube-publish workflow will: review nlmTitle, suggest a better title if needed, update card title + remind Tom to rename the file
- Work was about to begin when Tom called pre-compact

---

## 2026-04-04 22:11 — Video dashboard features, tickets, and Gemini doc

### Focus prompt feature completed (video-dashboard.html)
- Added `focusPrompt` field to card data shape
- Updated `cardHTML()` to render `data-fp` attribute and `.prompt` badge
- Right-click on any card with a focus prompt opens a context menu → "Copy focus prompt"
- Escape or click-away closes the menu
- Manet card backfilled with its focus prompt
- CSS was added pre-compact; remaining 5 edits completed post-compact

### video-dashboard skill synced
- Skill was behind after dashboard changes — updated to document: `focusPrompt` field, all three localStorage keys (LS_KEY, LS_HIDDEN, LS_PERM), trash/hide/restore/permanent-remove system, and new operations (add focus prompt, hide/remove via UI)

### Two new tickets added (inf-20, inf-21)
- `inf-20`: File-drop card creation — drop a YAML frontmatter file (title, notebook, focusPrompt) to create a source_ready card. User-created cards need a new localStorage key since they can't go in DEFAULT_VIDEOS.
- `inf-21`: Card editing — right-click or double-click to edit fields inline, including `nlmTitle` (the cryptic name NLM assigns to generated videos, added after NLM creates the video — not at card creation time)

### Gemini focus prompt guide written
- File: `documents/gemini-focus-prompt-guide.md`
- Gives Gemini enough context to suggest focus prompts when Tom hits usage limits
- Covers: what a focus prompt is, the anti-patterns (summary/listicle), the Manet canonical example annotated, how to derive one from a source, video inventory, notebook list, and Tom's style preferences

### Notebook found: The Everlasting Covenant and Justification by Faith
- ID: `62ca1cd4` — 10 sources, updated 2026-04-05
- One completed video artifact (`d1ca377e`), no focus prompt set
- Next step: Tom wants to write a focus prompt before adding to dashboard — will query the notebook after compact

---

## 2026-04-04 21:14 — video-dashboard skill created

### New skill: video-dashboard
- Skill written at `C:\Users\tomew\.claude\skills\video-dashboard\SKILL.md`
- Covers: full data structure reference (DEFAULT_VIDEOS shape, COLUMNS, status values), all CRUD operations (add/move/update/remove video, add notebook), LS_KEY gotcha, override system explanation
- LS_KEY gotcha encoded prominently: never bump unless data format changes incompatibly — adding videos or renaming columns does not warrant a bump (learned from prior session when bumping wiped Tom's drag positions)

---

## 2026-04-04 21:10 — Video Dashboard Updates + Manet Source

### Dashboard column renamed: Rendering → Source Ready
- "Rendering" column repurposed to mean "Claude-prepared source ready for video build"
- Distinct from NLM-selected sources — these are purpose-written docs with no cross-contamination
- Column color changed to cyan to distinguish from pipeline stages
- Culture Wars re-run and EGW Five Pillars moved to In NLM (they used NLM-selected sources)
- Manet added to Source Ready column
- Lesson: do NOT bump the localStorage key (LS_KEY) when making data changes — it wipes saved drag positions. Only bump if the data format changes incompatibly.

### Manet source document written
- Full source doc for Édouard Manet — biography, technique, key works (Déjeuner, Olympia, Bar at Folies-Bergère), milieu, legacy
- Includes cinematic video focus prompt: the "broken agreement" between painter, subject, and viewer; trace through Olympia, Bar at Folies-Bergère, Le Déjeuner
- Written for pasting into NotebookLM as a single-source cinematic video
- Manet positioned as bridge figure — precursor to Impressionism, never exhibited with them, but their crucial forebear

### Initiative Gap — origin unknown
- Video exists in NLM but neither Tom nor session log has any record of which notebook or source it came from
- Left in In NLM for now

---

## 2026-04-04 09:44 — Video Dashboard Built

### Kanban board at documents/video-dashboard.html
- Built as a drag-and-drop Kanban board (4 columns: Rendering / In NLM / Downloaded / YouTube)
- All 13 known videos pre-populated with correct initial statuses
- Dragging a card to a new column updates its status; persists in localStorage
- Notebook filter chips hide/show cards per column with live count updates
- Reset button restores defaults; linked in index.html under NotebookLM tab
- First version was a grid with pipeline steppers; Tom asked for drag/drop → full rewrite as Kanban

---

## 2026-04-04 09:24 — Impressionist Sources, BYG Divine Character Source Index, Video Dashboard Data

### Impressionist notebook sources written
- Wrote full source doc for Claude Monet — biography, technique, series paintings, Giverny, legacy
- Wrote full source doc for Pierre-Auguste Renoir — biography, Impressionism, key works, arthritis/late work, legacy
- Both include a cinematic video focus prompt
- Tom is building a new notebook manually (token constraints); these are pasted-text sources

### BYG Divine Character notebook source index created
- File: `memory/notebook-sources-byg-divine-character.md`
- All 12 sources with IDs, titles, descriptions, and 7 pre-built video cluster suggestions
- Purpose: allows video ideas and prompts to be generated without querying the notebook
- Added pointer to MEMORY.md and overview.md

### Video dashboard — data gathered, not yet built
- Tom described a 4-step video pipeline: notebook built → NLM video created → downloaded → YouTube
- Tracking challenge: knowing which videos exist per notebook, download status, YouTube status
- Decided: separate system from existing task board; flexible category tags; standalone HTML
- Full inventory captured:
  - 3 videos on YouTube: Great Controversy Axiom (Conversations About God), Way of the Cross (Conversations About God), Optimize Claude Code (Web Development with AI)
  - 7 videos in NLM only, intend to download + upload: Monet, Renoir, Architecture of Resistance, Blueprint of a True Sermon, Initiative Gap, Cosmic Audience at Calvary, Tragedy of the Projected God
  - 1 video NLM only, will NOT upload: You're Using Claude Code Wrong
  - 2 in progress: new Culture Wars video (388213cc), EGW five pillars (133fd399)
- Ready to build dashboard next

---

## 2026-04-03 16:15 — Session Strategy Docs, Quickref Redesign, NLM Videos

### index.html — Session Strategy card added
- Added card to Infrastructure tab linking `session-strategy.html`
- Icon: 🔐, tag: Infra

### session-setup-quickref.html — rewritten for video use
- New 4-step content: Keep the session going / auto-compact 50% / auto mode permissions / CLAUDE.md judiciously
- Livelier color scheme (purple/blue/green/orange per-step accents), bigger font, video-ready
- Step 1 originally "Use /resume" — changed to "Keep the session going" after clarifying /resume is desktop-app only (requires persistent session; terminal kill ends it)

### Source selection workflow improvement
- Old: pick sources by title/URL inference
- New: query notebook with video goal description → get content-aware source recommendations → use those IDs
- Better for cinematic because notebook knows actual content of each source

### Cinematic videos: no --style flag
- Verified via NotebookLM interface: cinematic format has no visual style options
- Going forward: omit --style for all cinematic video creates

### NLM video runs (both in_progress)
- Culture Wars re-run: artifact `388213cc` — updated prompt adds conservative POV framing (explaining what figures believed, not critiquing)
- EGW five pillars: artifact `133fd399` — cinematic, 5 notebook-recommended sources, pillars presented in order from White's perspective
- UnicodeEncodeError (cp1252) on both: display-only Windows issue; API calls completed before crash

---

## 2026-04-02 12:43 — CLAUDE.md Refactor + Skill Augmentation Architecture

### CLAUDE.md rewritten
- Removed Local Skill Augmentations section (logic moved into skill files themselves)
- Removed skill-oiler instruction (retired — its two jobs covered elsewhere)
- Improved Session Log wording: "notable happens" replaces "milestone"; added logging trigger for guesses/assumptions/skill issues
- When to Ask vs. Proceed: cleaner two-case structure with bold labels
- New section: Suggest a Skill When — three specific triggers to avoid false positives

### Skill augmentation architecture changed
- Old pattern: CLAUDE.md pointed to `local-skills/` augmentation files; base skills untouched
- New pattern: `SKILL.md` = thin wrapper (reads `SKILL.pristine.md` + adds project-specific additions); base skill content stays in `SKILL.pristine.md` for easy diffing when Anthropic updates
- skill-creator wrapper adds: Capabilities Check step (read claude-capabilities before designing)
- frontend-design wrapper adds: color scheme reference + UX notebook query
- `local-skills/skill-creator.md` and `local-skills/frontend-design.md` deleted (superseded)
- skill-oiler archived to `skills/archive/skill-oiler`

### skill-creator pristine copy fixed
- Initial pristine copy had a local JIT section baked in (not from Anthropic) — replaced with the actual Anthropic version fetched from github.com/anthropics/skills
- JIT instruction moved to the wrapper SKILL.md where it belongs
- frontend-design pristine was already clean — no changes needed

---

## 2026-04-01 20:29 — session-log-policy.md Deleted + CLAUDE.md Logging Nudge Fixed

### session-log-policy.md deleted
- Deleted `documents/session-log-policy.md` — fully superseded by the session-logger skill
- No longer referenced by skill-oiler (updated previous session) or startup (discontinued per Claude Code best practices)

### CLAUDE.md Session Log section updated
- Added "Use the `session-logger` skill if needed." to the existing logging nudge
- Ensures the per-turn nudge routes through the skill rather than writing directly to the log file

### inf-19 ticket added
- "Remove startup skill references from MEMORY.md" — MEMORY.md still has the startup skill as its first line; needs cleanup + consider archiving the startup skill itself

---

## 2026-04-01 20:01 — session-logger Skill Created + skill-oiler Updated

### session-logger skill
- New skill created at `~/.claude/skills/session-logger/SKILL.md`
- Consolidates scattered session logging guidance (CLAUDE.md global rule + MEMORY.md pointer + session-log-policy.md loaded by skill-oiler) into one authoritative place
- Internal skill (not user-invocable) — called at natural milestones throughout any session
- Scope explicitly bounded: mid-session entries only; rotation (shutdown Step 3) and end-of-session summary (shutdown Step 2) excluded

### skill-oiler updated
- Step 2 now references `session-logger` skill instead of loading `session-log-policy.md` directly
- `session-logger` is now the single source of truth for mid-session logging behavior

---

## 2026-04-01 13:15 — Context Window Mechanics Discussion

Post-compact conversation exploring how Claude Code manages context:

- **Auto-compact at 50%**: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` confirmed active. "X% until auto-compact" means X% remaining before the 50% threshold fires — not 50% remaining overall.
- **Invoked skills stay injected**: When a skill is used via the Skill tool, its full body is injected and persists in context for the session. Compact clears conversation history but re-injects previously-invoked skills.
- **Baseline context load**: After startup + compact, session sits at ~37% used — plenty of working room before auto-compact fires.
- **/resume**: Needed after reboot to re-enter a previous session. With startup skill recovering context from files, starting fresh after reboot is nearly equivalent; /resume adds raw transcript history.
- **Fresh session baseline**: Estimated 10–15% context used after startup completes (no heavy skills invoked yet). Switching to a new session when shifting task types recovers significant working room.
- **PreCompact hook**: Still unimplemented — would capture state snapshot before auto-compact fires. Not urgent given clean 50% compaction.

---

## 2026-04-01 — CLAUDE.md Global Instructions Added

### ~/.claude/CLAUDE.md updates
- **Session Log rule**: Write at natural milestones throughout the session, not only at shutdown
- **When to Ask vs. Proceed**: Skills are the dividing line — follow the skill, no asking. Without a skill, proceed if you know what to do; ask only when genuinely uncertain between alternatives ("which path?" not "may I?"). Four irreversibly destructive exceptions require confirmation: deleting a NotebookLM notebook, force-push/hard-reset git, committing to main, permanently deleting files outside the git repo.

---

## 2026-04-01 — Claude Code Infrastructure Improvements

### Claude Code Meta Notebook (`97e0990a`)
- Built from community analysis of 3/31/2026 inadvertent source code leak
- 11 sources: 3 copied-text pieces from Tom + 8 web research sources
- Covers: CLAUDE.md per-turn injection, auto mode, hooks, compaction, permission wildcards, conditional rules, agent frontmatter, /compact usage, common mistakes
- Type: Meta notebook (research-only, no artifacts, no public share)

### Claude Code Knowledge Base
- `Projects/Infrastructure/documents/claude-code-knowledge-base.md` — new reference file for Claude to load in future sessions
- Covers all findings from notebook query; status table showing 10 gaps in Tom's current setup
- Added pointer to MEMORY.md and working-notes.md

### HTML Reference Document
- `documents/claude-code-improvements.html` — Infrastructure tab doc
- 10 prioritized improvements ranked by leverage; current state table; "What Not To Do" section
- Card added to `documents/index.html` (Infrastructure tab)

### settings.json Overhaul (`~/.claude/settings.json`)
- Migrated from deprecated `skipDangerousModePermissionPrompt: true` + top-level `allow` array to proper schema
- `permissions.defaultMode: "auto"` — replaces the old bypass approach; uses LLM classifier
- `skipAutoPermissionPrompt: true` — suppresses the auto mode opt-in dialog
- Added missing permission wildcards: `Bash(git *)`, `Bash(npm *)`, `Bash(node *)`, `Bash(npx *)`
- Set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE: "50"` — compaction now fires at 50% not 95%
- Background: Tom had downgraded Claude Code to v2.1.77 as a workaround for permission pestering; actual version is 2.1.89 (auto-updated at some point); auto mode is the proper fix

---

## 2026-04-01 — Dialog Maker Skill Created

### Dialog Maker Skill (`~/.claude/skills/dialog-maker/`)
- Built from scratch using skill-creator workflow: draft → evals → viewer → iterate
- Architecture: master SKILL.md routes to three mode files via JIT READ NOW gates
- **knowledge-base.md**: Two student moves (entity pivot, answer trigger), Prof voice, student voice (meander quality), quality markers, output format
- **modes/free-flow.md** (V1): Minimal constraints, spontaneity axes (Prof length, structure, student confidence, pacing), no formula
- **modes/structured.md** (V2): Complexity-guided response and total dialog length, pre-set + context-dependent pivot categories, variation principle
- **modes/transform.md** (V3): Two-phase Gemini workflow — Claude writes extraction prompt, Tom relays to Gemini, pastes back, Claude generates dialog. Core insight: "substituting one formula for another" (formulaic video → formulaic dialog)
- **video-types.md**: Briggs geography comparison pattern with Gemini extraction prompt template; grows over time
- Ran iteration-1 evals (3 test cases: imaginary numbers, entropy, French Revolution); with-skill vs without-skill confirmed skill adds value — baseline was "very clipped"
- First iteration revealed formulaic failure mode (every Prof turn: validate → numbered sections → synthesize). Fixed in V1 and V2.

### Eval Viewer Fixes
- `generate_review.py` line 156: added `encoding='utf-8'` to fix Windows encoding issue (â€" → —)
- `viewer.html`: added marked.js + MathJax; .md files now render markdown and LaTeX instead of raw text in `<pre>`

### Keybinding Added
- `~/.claude/keybindings.json` created: `ctrl+j → chat:newline`
- Alt+Enter rejected (Windows Terminal fullscreen toggle), Shift+Enter rejected (terminal can't distinguish from Enter)

---

## 2026-03-31 — Notebooks, Pre-Harness Discussion, BYG Workflow Doc, Index Redesign

### Notebooks Built
- AI Frontier March 2026 (`36df8974`): 88 sources, 4 videos queued — Sora shutdown, Nemotron Coalition, Meta TRIBE v2, entry-level job trap
- Claude Code Session Persistence meta notebook (`a7973469`): 39 sources on CLAUDE.md patterns, hooks, drift, session persistence — for Claude to query when evaluating the workflow infrastructure
- Both IDs recorded in working-notes.md

### Pre-Harness vs. Harness Architecture Discussion
- Tom framed current session log/JIT/startup work as "pre-harness" — compensations for statelessness
- OpenClaw architecture identified as the target: always-on, persistent state, auto auth refresh
- Anthropic's response: Claude Code Channels + Agent Skills standard (MCP 97M installs)
- nlm auth deeper than assumed: 3-layer recovery, cookies stable weeks — 20-min limit likely overstated
- Two-instance workflow evaluated: decided one instance + proper skill beats two instances for current scale
- Key design principle: break sessions at natural async phase boundaries

### BYG Video Workflow
- Three phases formalized: Script → Localhost → Render & Deploy
- notes.md pre-specification identified as the missing step that would make build sessions predictable
- Illustration 03 mutagen timing fix still unvalidated — first render will confirm
- Batch production plan proposed: all scripts → all localhost reviews → all deploys
- `Projects/BYG/documents/byg-video-workflow.html` written — full reference doc with who-does-what and batch plan

### Index.html Redesign
- Rebuilt `documents/index.html` from 6-column grid to tabbed layout (6 tabs)
- All existing cards preserved and reorganized by project group

---

## 2026-03-30 — Session: BYG Repo Setup + Ticket Cleanup

### BYG GitHub Repos Created
- Old `ewallt/byg` (June 2025, unrelated content) renamed to `ewallt/byg-old` via GitHub API
- New `ewallt/byg` created: main (README), gh-pages (placeholder). Pages live → ewallt.github.io/byg/
- New `ewallt/byg-dev` created: gh-pages has illustrations 01+02 + web app (`behold-your-god/`, `byg-nuclear-plant/`, `byg-god-not-criminal/`). Pages live → ewallt.github.io/byg-dev/
- `byg-github-repos.md` and `overview.md` updated to reflect live status

### Ticket and Status Cleanup
- `byg-2` marked done (repos created)
- `byg-3` confirmed in-progress (Illustration 03 render + deploy)
- `project-definition.md` Illustration 03 updated from Not Started → In Progress

---

## 2026-03-30 — BYG GitHub Repos Created

### byg and byg-dev repos live
- Old `ewallt/byg` repo (2025-era, unrelated content) renamed to `ewallt/byg-old`
- New `ewallt/byg` created: main (README only), gh-pages (placeholder). Pages enabled → ewallt.github.io/byg/
- New `ewallt/byg-dev` created: gh-pages has illustrations 01+02 + web app. Pages enabled → ewallt.github.io/byg-dev/
- `byg-github-repos.md` Current State section updated to reflect live status
- `overview.md` GitHub Repos table updated

---

## 2026-03-30 — Illustration 03 Timing Fix + GitHub Repo Setup

### WhiteHatBlackHat Timing Fix
- Root cause: Edge TTS VBR makes file-size duration estimation unreliable; switched to `mutagen` for exact measurement
- `SLIDE_BUFFER_FRAMES` reduced 180→30; `TITLE_FRAMES` corrected to 207
- Root.tsx updated to match (`WHB_BUFFER_FRAMES = 30`, `WHB_TOTAL = 207 + ...`)
- Narrations rewritten from ~55 words (POC) to ~90 words (production quality)
- `byg-edge-tts` skill updated: template script changed to `generate-white-hat-black-hat-audio-edge.mjs`; Duration Estimation section rewritten for mutagen

### Skill and Doc Updates
- `workflow-principles.md`: added "Bias toward action" section — act without asking permission except for merging to main, deploying to gh-pages, force-pushing, external service posts
- `byg-deploy` skill: READ NOW pointer added for `byg-github-repos.md`
- `byg` skill: `byg-github-repos.md` added to key file locations
- `shutdown` skill: added `git push origin dev main` after commit

### GitHub Repo Setup
- Discovered agent-test had never been pushed to GitHub (origin was claude-code-fun)
- origin re-pointed to github.com/ewallt/agent-test; dev and main pushed
- Designed two-repo BYG structure: `byg` (prod) and `byg-dev` (staging), each with main + gh-pages branches
- byg starts README-only; byg-dev starts with BYG files from claude-code-fun gh-pages
- Documented in `Projects/BYG/documents/byg-github-repos.md` + `.html`
- `overview.md` updated with GitHub Repos section

---

## 2026-03-30 — Claude Code Downgrade + Startup Skill Improvements

### Claude Code Downgrade to v2.1.77
- `--dangerously-skip-permissions` broken since v2.1.78 — hardcoded binary gate forces prompts on `.claude`, `.git`, `.vscode`, `.idea` regardless of bypass settings
- v2.1.77 is last confirmed-working version; downgrade is the only reliable fix as of today
- Downgraded from v2.1.87 → v2.1.77; takes effect in next session

### Startup Skill: JIT Doc + Verification Gate
- Session opened with Claude reading session log at limit 200 instead of 1000 — behavioral drift overriding a clear skill instruction
- Added Step 3 to startup skill: READ NOW `JIT-experiment.md` — loads the JIT design doc at session start so the pattern is active, not just abstractly understood from workflow-principles.md
- Added ✓ verification gate to Step 6: "Confirm you used limit: 1000 before proceeding" — direct JIT fix for the specific failure
- Steps renumbered 3–6 → 4–7; skill now has 7 steps

---

## 2026-03-30 — Startup Skill: JIT Doc Added

### Startup Skill Updated
- Added Step 3 to startup skill: READ NOW `JIT-experiment.md`
- Motivation: session opened with Claude reading session log at limit 200 instead of 1000 — a behavioral drift failure of exactly the type JIT addresses
- Having the JIT doc fresh at session start makes the pattern active and precise, not just abstractly understood from workflow-principles.md
- Steps renumbered: old 3–6 → new 4–7

---

## 2026-03-29 (Session 5) — Incremental Session Logging

### Session Log Policy Established
- Tom requested session log entries be written at natural milestones throughout the session, not only at shutdown
- Three-part implementation: memory instruction, startup skill step, skill-oiler propagation

### Changes Made
- Created `documents/session-log-policy.md` — defines what's notable, format, mid-session vs. end-of-session behavior
- Updated startup skill: new Step 4 reads session-log-policy.md; Step 5 now reads session log with limit 200 (was "scan" with no limit)
- Updated skill-oiler: new Step 2 reads session-log-policy.md, propagating the rule to every skill
- Created `memory/feedback_session_log_incremental.md` — feedback memory with the rule
- Updated `MEMORY.md` — indexed new feedback memory under "Session Log" section

---

## 2026-03-29 (Session 4) — Workflow Principles Doc + Startup Skill Update

### Startup Skill Validation
- Startup skill passed an unannounced test — invoked skill, read all files in correct order, presented summary, waited for Tom
- Confirmed the skill is functioning as designed

### Workflow Principles Discussion
- Tom asked about workflow problems and counter-strategies at the macro level (not the specific notebook incidents)
- Identified the core pattern: context drift → improvisation → degradation, compounded by instructions spread across files, thin skills getting bypassed, no step verification
- Counter-strategy framework articulated: skills as forcing functions, JIT sequencers, single source of truth, skills-first directive

### New workflow-principles.md
- Created `documents/workflow-principles.md` — standing orientation lens for every session
- Documents the failure pattern and counter-strategy framework explicitly, so it's loaded rather than inferred

### Startup Skill Updated
- Added Step 2 to startup skill: READ NOW `workflow-principles.md`
- Existing Steps 2–4 renumbered to 3–5
- Principles now loaded explicitly at every session start as part of orientation

---

## 2026-03-29 (Session 3) — Startup Skill Built, MEMORY.md Cleaned Up

### Startup Sequence Analysis
- Diagnosed multiple startup failures from this session: skipped overview.md, followed startup.md's manual checklist instead of invoking a skill, CONTEXT.md and gotchas.md not found due to stale paths in startup.md
- Root cause: MEMORY.md had two conflicting startup instruction sets — one at the top (read overview.md + handoff.md) and a 5-item "Session Startup" checklist at the bottom
- Fixed startup.md: corrected paths for CONTEXT.md and gotchas.md (both live in memory/, not project root)

### New `startup` Skill
- Created `~/.claude/skills/startup/SKILL.md` — owns the full session orientation sequence
- Steps: (1) read overview.md, (2) read handoff.md, (3) read session-log.md, (4) check Session Start section → auto-start or present summary and wait
- Explicitly says: do not follow old MEMORY.md checklists, do not pre-load workflow context

### MEMORY.md Updated
- Replaced top "read these two files" instruction with single pointer: invoke the `startup` skill
- Removed conflicting "Session Startup" checklist from bottom of file
- One source of truth for startup behavior


## 2026-03-29 — Notebook Workflow Architecture Overhaul

### Self-Improving AI Notebook Run
- Created notebook `a87328bb`, deep research (68 sources), 5 videos queued and rendered
- Run done conversationally — no task file created; exploratory path (topic → questions → research → query → video plan)
- Multiple process failures during run: slow polling, truncated UUIDs, improvised video strategy via report generation

### Process Retrospective
- Identified root cause: master skill was thin and never invoked; workflow driven from memory/documents
- Key failures documented: poll interval too long (90-150s), truncated UUIDs cause silent video failure, no `nlm notebook query` usage for video strategy
- `nlm notebook query` identified as correct tool for exploratory video strategy (was using report generation — wrong)
- Established: poll every 15 seconds, always full UUIDs, submit all artifacts in one burst after import

### Master Skill Rebuilt
- `~/.claude/skills/notebooklm-playlists/SKILL.md` — replaced thin pointer with full JIT sequencer
- Two paths: Standard (task-file driven) and Exploratory (`mode: exploratory` flag in task file)
- Each step has explicit "READ NOW" gate and ✓ verification before proceeding
- Exploratory path uses `nlm notebook query` for video strategy
- All process fixes baked into standing rules section

### Skills-First Directive
- Tom established: all work through skills — never execute established workflows directly from memory/documents
- Before any repeatable task without a skill, ask Tom if we should build one first
- Saved to `feedback_skills_first.md`, indexed in `MEMORY.md`, strengthened in `startup.md`

---

---

## 2026-03-29 — Meta Notebook Pattern, claude-capabilities, skill-oiler

### Meta Notebook Pattern Formalized
- Defined meta notebooks: research-only notebooks for Claude to query during work, not to produce output for Tom
- Updated `notebooklm-playlists` skill with Meta Notebooks section covering key differences from production runs

### Claude Capabilities Notebook + Skill
- Built meta notebook "Claude AI Capabilities — Bridging the Knowledge Cutoff" (ID: `9fece757`, 53 sources, deep mode, March 2026)
- Created `claude-capabilities` skill with two paths: notebook path (for skill-creator, network query) and knowledge base path (for skill-oiler, local file read)
- Distilled `knowledge-base.md` from notebook — focused on skills work: model IDs, Claude Code, tool use, skill design implications
- Updated `local-skills/skill-creator.md` to query capabilities notebook before designing any new skill

### skill-oiler
- Created `skill-oiler` skill — universal shared layer called by all skills
- Currently: one step (read claude-capabilities knowledge base path)
- Added global instruction to `CLAUDE.md`: read skill-oiler at the start of every skill
- Added to-do in Infrastructure project-definition to review skill-oiler for future additions

---

## 2026-03-28 — Playwright MCP Setup

### Playwright MCP Config Fix
- Confirmed `@playwright/mcp` and Chromium already installed
- Found bare `--codegen` flag in `~/.claude.json` was crashing the MCP server at startup (flag requires a `<lang>` argument)
- Removed `--codegen` from args; `claude mcp list` now shows `playwright: ✓ Connected`
- Browser test pending — must be done in a fresh session (MCP tools load at startup)

---

## 2026-03-28 — Meta Notebooks, Deep Research Skill, Local-Skills Architecture

### Meta Notebook Concept
- Established meta notebooks as a distinct type: notebooks whose purpose is to inform Claude rather than produce artifacts
- Built two meta notebooks: Doodle Animation (`cfac8154`, 10 sources) and UX and Interface Design (`ae466d18`, 48 sources + 2 manual uploads)
- UX notebook includes: Laws of UX, Material Design 3, Apple HIG, WCAG 2.2, educational app UX, design systems, plus frontend-design skill and color schemes as sources

### notebooklm-deep-research Skill
- Created `~/.claude/skills/notebooklm-deep-research/SKILL.md`
- Key insight: queries are detailed research briefs passed to `nlm research start`; `--mode deep` returns ~50 sources in ~5 min
- First attempt built wrong (manual UI prompt); corrected after Tom pointed out workflow uses CLI

### Local-Skills Architecture
- Problem: modifying Anthropic skills is fragile (skill-creator had JIT added directly)
- Solution: `~/.claude/CLAUDE.md` (global standing instruction) + `~/.claude/local-skills/` (master files per skill)
- Created: CLAUDE.md, local-skills/skill-creator.md (JIT), local-skills/frontend-design.md (UX notebook query), local-skills/ux-color-schemes.md (exact hex values for four themes)
- Restored skill-creator SKILL.md to pristine

### Color Schemes Reference
- Tom's four themes saved to `~/.claude/local-skills/ux-color-schemes.md` with exact CSS hex values
- Explorer (warm earthy, Tom's favorite), Archives (light neutral), High-Command (dark forest green), Navy (deep blue)

---

## 2026-03-28 — BYG Scrollytelling, Illustration 02 Deploy, Testing Infrastructure, byg-deploy Skill

### The Arc Tab
- Added scrollytelling "The Arc" tab to `behold-your-god.html` — 5-beat scroll-driven narrative of the great controversy
- Content drawn from knowledge-base.md; engagement metrics from "The Architecture of Engagement" notebook query
- "The Arc" is now the first/default tab; IntersectionObserver handles scroll-triggered reveals

### Illustration 02 — God Is Not a Criminal
- Fixed title clip: `TITLE_FRAMES` bumped 120 → 150 (audio was 4.5s, 120 frames too short)
- Rendered `god-not-criminal-v1.mp4` (9.1 MB); created wrapper `byg-god-not-criminal.html`
- Deployed to gh-pages `notebooklm/byg-god-not-criminal/`; web app badge → ▶ Watch

### Web App Versioning Cleanup
- Clarified versioning: main app (`behold-your-god.html`) is versioned; wrapper pages are not
- Bumped web app v1.1 → v2.0; stripped version numbers from both wrappers
- Changed illustration links to same-tab navigation (removed `target="_blank"`)
- Redeployed `behold-your-god.html` v2.0 to gh-pages

### Testing Infrastructure
- Wrote `Projects/Infrastructure/documents/testing.md` — full audit of current test coverage, gaps, priority order
- Updated `simple-narrated-slides/tests/structure.test.ts` to cover BYG via `BYG_COMPOSITIONS` array; future illustrations are one-line additions
- Added `inf-15`: durations.test.ts to catch title frame underruns

### Memory and Startup Updates
- Created `feedback_byg_audio.md`: BYG uses Edge TTS, not ElevenLabs
- Added "Repeatable Work → Skills" standing instruction to `startup.md`: flag any repeatable task without a skill

### Deployment Pipeline Discussion
- Established 4 projects (BYG, Remotion, NotebookLM, Infrastructure) × 3 levels (local, dev, main)
- Decided on Option 1: test before committing to dev
- Added placeholder tickets `byg-1`, `rem-1`, `nlm-16`, `inf-16` for per-project publish pipelines

### byg-deploy Skill
- Created `~/.claude/skills/byg-deploy/SKILL.md`
- 6 steps: identify scope → automated tests → Tom visual sign-off → bump minor version → stage/commit to dev → confirm

---

## 2026-03-28 — Infrastructure Project Established

### Infrastructure Project Setup
- Created `Projects/Infrastructure/` folder and `documents/` subfolder
- Wrote `Projects/Infrastructure/documents/project-definition.md` — defines three areas (tooling, process/standards, housekeeping), two planned reviews, and open action items
- Updated `documents/overview.md` — Infrastructure entry fleshed out with pointer to project-definition.md

### Infrastructure Reference Doc
- Wrote `Projects/Infrastructure/documents/infrastructure-project-doc.html` — styled reference doc covering what the project is, key locations table, two planned review checklists (redundancy/cleanup + software shop standards), action items, and current state of the shop

### index.html Updated
- Added Infrastructure column (grid expanded to 6 columns) with card linking to the new reference doc

---

## 2026-03-28 — sns-8 Complete: Edge TTS Skill, byg-project-doc Updates, index.html Cleanup

### byg-edge-tts Skill Created
- New skill at `~/.claude/skills/byg-edge-tts/SKILL.md` — covers edge-tts setup, running generation scripts, adding audio to new compositions, voice reference, troubleshooting
- JIT gates added: "READ NOW" instructions before editing the copied script and before creating the placeholder durations file — prevents agent drift during new-composition setup
- `remotion-narrated-slides` skill description updated to note BYG uses edge-tts (not ElevenLabs) and defers to `byg-edge-tts`

### byg-project-doc.html Updated
- Added "Audio tool" row to reference table — edge-tts, en-GB-RyanNeural, links to edge-tts-guide.html
- Inserted new Step 4 "Generate audio" in the workflow; steps renumbered 1–10

### index.html — Ticket Board Swap
- "Pending Items" card replaced with "Ticket Board" card linking to `http://localhost:3010/tasks.html`
- `pending.html` is the old static list — card now points to the live board

### Skill-Creator Process
- Established: invoking skill-creator means following the full process (draft → test → eval → iterate), not writing SKILL.md directly
- JIT is the key principle: instructions delivered at the moment of use, not loaded upfront

### sns-8 Closed
- All four sub-items complete; ticket marked done in tasks.json

---

## 2026-03-27 — BYG Project Definition, Knowledge Base, and Web App Updates

### BYG Project Defined
- Created `Projects/BYG/documents/project-definition.md` — full project definition with 11 illustrations (00–10), folder structure, naming conventions, 9-step video build workflow
- Confirmed project has 11 illustrations (not 10) — added Illustration 00 "The King They Made and Killed" (Ch. 1)
- Created `Projects/BYG/documents/todo.md` and `byg-project-doc.html` (styled HTML reference doc)

### Knowledge Base Built
- Created `Projects/BYG/documents/knowledge-base.md` from 3 pasted sources + 2 NotebookLM queries (notebook `b64c5fc6`)
- Sections: Central Thesis, Six-Block Book Structure, Chapter-by-Chapter Reference (39 chapters), Per-Illustration Reference, Illustration Details, 15 Key Quotes with attribution

### Illustration 00 Notes
- Created `Projects/BYG/illustrations/00-king-they-made-and-killed/notes.md`
- 5 bullet beats with narration + doodle concepts; 3 ironies framing; build checklist

### behold-your-god.html v1.1 — Quotes Tab
- Added Quotes tab with 15 quotes in 4 themed groups
- EGW quotes: "Ellen White · [Book, p. X]"; Wright originals: "F.T. Wright"
- Not yet deployed to gh-pages

### Skills and Memory
- Created `~/.claude/skills/byg/SKILL.md` — BYG session context loader
- Added Q4 to shutdown skill: "What workflow should I set for next session?"
- Updated `memory/MEMORY.md` and `memory/startup.md` with BYG section
- Updated `documents/overview.md` — Six Groups now; BYG is Group 5

---

## 2026-03-27 — NuclearPlant Animated Doodles + Doodle4 Redesign

### Animated Doodle Implementation (Submission 1)
- Completed `NuclearPlant.tsx` with four animated SVG doodle components (Doodle1–4)
- Shared `ReactorDome` component with `cracked` param used in Doodles 1 and 2 for visual continuity
- Animation pattern: bullet spring values passed as `bullets: number[]` prop; cross-fades via `cl()` helper
- Doodle3 "gap is the argument" — technician appears at far right with b[1], b[2] adds nothing; absence is the message

### Doodle4 Redesign — God Looking Back
- Replaced original Doodle4 (God centered, arrows pointing at icons) with Tom's concept
- God at far right walking away, head offset left (looking back), left arm reaching back toward icons
- City + wave icons on left (Egypt dropped); icons intact → shatter with b[2]
- Halo removed — read as yarmulke rather than floating ring
- Message: destruction from shield removed, not God striking

### Render/Deploy Cycle
- Rendered v4 (Submission 1 doodles) and v5 (Doodle4 redesign + halo removed)
- Wrapper page `byg-nuclear-plant.html` updated to v1.2, src → `nuclear-plant-v5.mp4`
- Both MP4 and HTML deployed to `notebooklm/byg-nuclear-plant/` on gh-pages each cycle
- CDN cache-busting pattern: always version binary filenames on update

### Blocker Cleared
- `sns-2` (Windows audio driver blocker) confirmed as PEBCAK at session start — cleared

---

## 2026-03-25 — Bundled Web App Architecture + NuclearPlant Remotion Video

### Flashcard skill formalized
- Created `~/.claude/skills/notebooklm-webapp-flashcard/SKILL.md`
- Documents full pattern: card structure (`theme`/`q`/`a`), all 9 features, CSS tokens, JS skeleton with `indexMap`, file naming `<key>-flashcards.html`
- References `byg-flashcards.html` as reference implementation
- Updated `notebooklm-webapp` skill's "Future Expansion" → renamed "App Type Variants", cross-references flashcard and tabbed

### Bundled web app architecture — designed and built
- New "Option C": one HTML file per topic with multiple app types as top-level tabs
- Three new skills: `notebooklm-webapp-explorer-tab`, `notebooklm-webapp-flashcard-tab`, `notebooklm-webapp-bundle`
- Tab skills produce scoped sections (`#explorer-tab`, `#flashcard-tab`) with namespace objects (`ExplorerTab`, `FlashcardTab`)
- Bundle skill assembles shell: global CSS tokens + tab nav + lazy-init coordinator
- Task file syntax: `app_type: bundle`, `app_tabs: [explorer, flashcard]`
- Existing standalone skills unchanged — both approaches coexist

### BYG bundle built
- Rewrote `behold-your-god.html` as first bundled app: Illustrations | Explorer | Flashcards tabs
- Fixed CSS specificity bug: `#flashcard-tab { display: flex }` overrode `.tab-section { display: none }` — fixed by wrapping flashcard content in `.fc-inner`
- Added row hover color to Explorer table: `#explorer-tab tr:hover td { color: var(--accent); }`
- Added `feedback_naming.md` memory — proactively watch for naming ambiguity

### Illustrations tab added
- New first tab listing all 10 F.T. Wright illustrations
- Illustration 01 (Nuclear Power Plant) has "▶ Watch" badge linking to `byg-nuclear-plant.html`
- Illustrations 02–10 dimmed with "Coming Attraction" badge

### NuclearPlant Remotion video built (blocked on audio)
- `src/NuclearPlant.tsx` — 4-slide composition, cyan/teal aesthetic, reactor glow pulse
- `scripts/generate-nuclear-audio.mjs` — ElevenLabs George voice, 5 narrations
- Audio generated: `public/audio/nuclear/title.mp3` + slide-1 through slide-4
- `src/nuclear-durations.ts` auto-generated with real durations; `Root.tsx` updated
- Rendered `out/nuclear-plant.mp4` — **no audio** due to Windows audio driver issue affecting Chrome Web Audio API
- Fix: reboot Windows (pending next session)

---

## 2026-03-15 — Source Prep Workflow + notebooklm-source-prep Skill

### Source prep runs — three notebooks
- Ran source prep (query → write 3 sources → upload) on three existing notebooks:
  - Philosophical Revolutions: Enlightenment (67970583)
  - Scientific Revolutions: Chemistry (426129b8)
  - Scientific Revolutions: Physics (395a4ee9)
- Each run: 2 parallel notebook queries, then Explorer+Quiz KB, Tabbed KB, Slide Manifest
- Files in `artifacts/<key>/` and `slideshows/<key>.md`; sources uploaded with IDs confirmed

### notebooklm-source-prep skill created
- New skill at `~/.claude/skills/notebooklm-source-prep/SKILL.md`
- Automates: 2 parallel queries → Explorer+Quiz KB → Tabbed KB → Slide Manifest (JIT to notebooklm-slide-manifest) → 3 sequential uploads
- Key gotcha embedded: notebook ID is positional in `nlm source add`, not `--notebook-id`
- Ticket nlm-15 added and marked done

### egw-preaching deploy + deployed-apps dashboard
- `apps/egw-preaching.html` deployed to gh-pages: `notebooklm/egw-preaching/`
- New deployed-apps dashboard built with links to all live apps on gh-pages
- `philosophy1-slides.html` (from `Documents/Slide Shows/`) added to dashboard

---

## 2026-03-14 — Shutdown Skill Session Start Redesign + skill-creator JIT Fix

### Shutdown skill — Session Start redesign
- Identified gap: handoff was writing "Wait for Tom." even when next workflow was known
- New Session Start format: always includes (1) READ NOW: startup.md, (2) Workflow name, (3) optional message
- Updated both the handoff template and Step 1 draft preview in `~/.claude/skills/shutdown/SKILL.md`
- Pattern: JIT delivery — startup.md dispatches to per-workflow context at the moment it's needed

### skill-creator — JIT doc READ NOW
- Added hard "READ NOW: JIT-experiment.md" at top of `~/.claude/skills/skill-creator/SKILL.md`
- Ensures JIT pattern is loaded into context every time skill-creator is invoked
- Previously buried in "Writing Patterns" section — easy to miss

### EGW preaching notebook — planning started
- Topic: Ellen G. White on preaching, focus on sermon content
- New web app type planned (different from inference app pattern) — details deferred to next session
- No task file written; notebook not yet created

---

## 2026-03-08 — Shutdown Skill + Braess Notebook + GitHub Deploy

### Shutdown skill built
- `~/.claude/skills/shutdown/SKILL.md` — invoked with `/shutdown`
- Flow: handoff discussion (collaborative) → session log, pending, tasks.json, git commit (all independent)
- No server shutdown or promote — deliberate omissions
- MEMORY.md updated: Claude always writes session log entries from conversation, never asks Tom to narrate

### Server persistence clarified
- Studios and task manager are OS-level processes — persist across Claude sessions
- `startup.md` and `remotion-context.md` updated: check ports before starting, start only if needed

### Braess's Paradox — notebook build (no nlm research)
- New pattern: Claude writes knowledge base from general knowledge, adds as source — no nlm research needed
- Notebook `fc34301f`, knowledge base + slide manifest (8 slides) added as sources
- Video queued (`215894d5`) — retro_print style
- Inference web app built: `artifacts/braess-paradox/app.html` (Explorer + Quiz, groq proxy)
- Task file: `tasks/braess-paradox.md`

### Artifacts folder restructure
- Retired `apps/` and `slideshows/` — replaced with `artifacts/<topic-slug>/`
- All artifacts for a notebook live together: `app.html`, `slides.html`, `manifest.md`
- Migrated: braess-paradox, double-entry-bookkeeping, other-lane, poc
- `.gitignore`: `**/artifacts/**/slides.html` excluded (base64 slides can be 16MB+)
- CONTEXT.md, skill-inference-app.md, skill-slideshow-manifest.md updated

### GitHub setup
- Repo created: `https://github.com/ewallt/claude-code-fun` (public, account: ewallt)
- `main` + `dev` pushed; `promote.sh` updated to push both branches after merge
- `gh-pages` orphan branch; Pages enabled
- Web app live: `https://ewallt.github.io/claude-code-fun/braess-paradox/`
- Slides live: `https://ewallt.github.io/claude-code-fun/braess-paradox-slides/`

### Character Narrator — future project concept
- Design doc: `documents/future-projects/character-narrator.md`
- Second-person character-driven videos (inspired by "How to Penguin") — SVG characters, Rough.js, ElevenLabs
- Added to tasks.json as `we-4`, priority 5

### Other
- `documents/skills-installer-guide.html` — explains npx skills CLI
- `documents/future-projects/` folder created for future project concepts
- `source add --file` confirmed: positional notebook ID (not `--notebook-id` flag)

---

## 2026-03-08 — Startup Overhaul + Task Manager + Overview Doc

### Startup routine overhauled
- Removed active.txt dispatch — no longer pre-loads workflow context
- Now reads `documents/overview.md` at session start for orientation
- Waits for Tom to indicate workflow, then loads context on demand
- startup.md rewritten; MEMORY.md updated to point to overview.md

### overview.md created
- `documents/overview.md` — high-level map of all 5 groups with pointers
- Intended as a fast orientation read, not deep context

### Task manager app built
- `tools/tasks.html` + `tools/tasks.json`
- Two-level hierarchy: group → workflow → tasks
- Priority badges (P1–P5), status dots, expandable notes
- Read-only; served on localhost:3010
- tasks.json is the source of truth — Claude maintains it manually

### B3 build indicator removed
- Britain1940.tsx cleaned up (BattleOfAtlantic never had it)

### Shutdown routine
- Identified as missing — added as IMPORTANT to pending.md
- To be built next session

### Handoff written
- `documents/handoff.md` — full summary for next session pickup

---

## 2026-03-08 — Dev/Prod Environment + Structural Tests

### Git repository initialized
- `git init` at `agent-test/` root — Option B (single repo covering all projects)
- Branches: `main` (production) and `dev` (working branch)
- All work happens on `dev`; merge to `main` via `promote.sh` after tests pass
- `.gitignore`: node_modules, out/, *.mp4, .cache/ — MP3s and all source files tracked
- Git identity configured: Tom / ewalltom@gmail.com

### Structural tests added
- All three Remotion projects now have vitest structural tests
- Tests verify key files exist — snafu protection, not functional testing
- bar-chart-race: 43 tests (25 structural + 18 existing compute tests)
- simple-narrated-slides: 35 tests
- whiteboard-explainer: 21 tests
- Total: 99 tests, all passing on initial commit

### promote.sh
- Located at `agent-test/promote.sh`
- Runs all three test suites; merges dev → main only if all pass
- Usage: `bash promote.sh` from agent-test root on dev branch

### Port assignments fixed
- bar-chart-race: 3000 (remotion.config.ts updated)
- simple-narrated-slides: 3001 (remotion.config.ts updated)
- whiteboard-explainer: 3002 (remotion.config.ts created)
- All three can run simultaneously

### Studio startup
- Claude starts all three studios at beginning of Remotion sessions
- `npm start` in each project folder (run in background, verify with curl)
- remotion-context.md updated with startup table and bash commands

### bar-chart-race confirmed working
- Fully reconstructed project present at Projects/Remotion/bar-chart-race/
- Both compositions (AiMmlu, StreamingWars) showing in Studio
- "Signal Through the Dark.mp3" re-obtained by Tom and placed in public/
- Design doc (documents/design.md) confirmed accurate description of architecture

### startup.md needs update
- bar-chart-race case still points to old path (C:\Users\tomew\Documents\bar-chart-race)
- bar-chart-race is now part of the remotion case — no separate case needed

---

## 2026-03-08 — Project Restructure

### Folder restructure completed
- Created `Projects/NotebookLM/` and `Projects/Remotion/` under agent-test root
- Moved `playlists/` → `Projects/NotebookLM/playlists/`
- Moved `model-collapse/` → `Projects/Remotion/simple-narrated-slides/` (rename done)
- Moved `whiteboard-explainer/` → `Projects/Remotion/whiteboard-explainer/`
- `bar-chart-race/` stub was phantom (empty .git) — deleted; placeholder folder created at `Projects/Remotion/bar-chart-race/`; actual code per MEMORY.md was at `C:\Users\tomew\Documents\bar-chart-race` (no longer exists)
- Moved root scripts (`start-studio.js`, `render.js`, `start-remotion.bat`) → `Projects/Remotion/`; updated FOLDER constant from `model-collapse` to `simple-narrated-slides`
- Deleted root debris: `tasks/`, `staging/`, `completed/`, `output/` (all empty), `notebooks/` (dead workflow)
- Moved stray root files → `documents/`
- `whiteboard-explainer` original folder has 2 locked node_modules binaries that couldn't be deleted (locked by running process); rest of folder is gone; project files fully present at new location

### Files updated in simple-narrated-slides
- `package.json`: name `model-collapse` → `simple-narrated-slides`
- `.claude/launch.json`: name `model-collapse` → `simple-narrated-slides`

### Memory/skill files updated
- `MEMORY.md` — project structure section added; whiteboard path updated
- `CONTEXT.md` — folder structure section rewritten; notebooks/ section removed; project structure note added
- `startup.md` — whiteboard-explainer and bar-chart-race case paths updated
- `workflow-playlists.md` — notebooks/ references removed; app/manifest/remotion paths updated; task move path updated
- `skill-inference-app.md` — notebooks/ research save removed (in-context only); output paths updated
- `skill-slideshow-manifest.md` — notebooks/ save step removed; .ps1 path updated
- `remotion-context.md` — model-collapse/ → simple-narrated-slides/ path updated
- `whiteboard-explainer.md` — location path updated
- `pending.md` — structure cleanup item resolved; rename item marked done; bar-chart-race location flagged

### Documents created
- `agent-test/documents/project-overview.md` — project history, four workflows, folder structure

### Outstanding
- `Projects/Remotion/bar-chart-race/` is a placeholder — project code needs to be located/restored by Tom
- 2 locked binaries in original whiteboard-explainer stub — will clear on next Node process restart

---

## 2026-03-07 — Whiteboard Explainer: Theme System + Catalog Architecture

### Session recovery
- Previous session crashed mid-rename (_1 → -1 suffix change)
- TypeScript error left in WhiteboardVideo.tsx: `React.createElement` overload mismatch — fixed with `(React.createElement as any)` cast
- Composition ID was already `WhiteboardExplainer-1`, rename was complete; server recovered after fix

### Theme system built
- `src/themes.ts` — `Theme` type + `THEMES` registry (`warmPaper`, `darkChalk`)
- `src/ThemeContext.tsx` — `ThemeProvider` + `useTheme()` hook
- All 5 scene components updated: `import { THEME }` → `const { theme: THEME } = useTheme()`
- `SceneDispatcher` label overlay now reads theme name live from context (was hardcoded string)
- `DoodleSpec` type gains optional `color` field; scene components pass `color={d.color ?? THEME.ink}`
- `OutroScene` uses `THEME.outroBg` (new field) instead of `THEME.ink` — allows light outro on dark themes
- `ScenesProps` gains optional `theme` field

### WhiteboardExplainer-2 created
- Dark Chalk / Amber Accent theme (dark navy bg, chalk-white text, amber/red/green doodles)
- 10 scenes, topic: "The History of Writing"
- Doodles have explicit colors in JSON — visible against dark background
- Both compositions live at localhost:3000

### Catalog situation clarified
- All existing compositions use the same 5 scene types (title, stepReveal, diagramBuild, compare, outro)
- 6 new scene types identified and specced: quote, stat, splitContent, timeline, imageReveal, flowChart
- Build plan: all 6 in one pass → verify → demo in WhiteboardExplainer-3

### Documentation created
- `whiteboard-explainer/documents/design.md` — full architecture reference
- `whiteboard-explainer/documents/planning.md` — current state, new type specs, theme roadmap, file map
- `whiteboard-explainer-gotchas.md` — gotchas 5 (no underscores in composition ID) and 6 (createElement any cast) added

### Ready for next session
- 6 new scene types fully specced in `whiteboard-explainer/documents/planning.md` with JSON shapes and visual descriptions
- Build order: quote → stat → splitContent → timeline → imageReveal → flowChart (all in one pass)
- After build: demo in WhiteboardExplainer-3 with a third theme
- `whiteboard-explainer` startup case reads `context.md` first — will be oriented immediately

### Naming confirmed
- `agent-test/docs/` → renaming to `documents/` is safe; nothing references that path in code or memory

---

## 2026-03-07 — Skill-Finder Skill

### Skill built: find-skills (custom replacement)
- Replaced Anthropic official `find-skills/SKILL.md` with custom version at `~/.claude/skills/find-skills/SKILL.md`
- Kept same description/trigger text so it fires on the same queries
- Core function: generates structured research prompts for external AIs (NotebookLM, Gemini) — does NOT run CLI commands or auto-install
- Embedded ecosystem knowledge base from deep research doc (early 2026 state of skills ecosystem)
- Two modes: reactive (generate prompt on request), proactive (flag gap, ask before generating)
- Output rule: prompt only, no preamble — matches Tom's copy-paste preference

### Knowledge base sourced from:
- External AI research doc on Claude Code skills ecosystem (March 2026)
- Key sources captured: skills.sh (74K+ skills, Vercel Labs), anthropics/skills, vercel-labs/agent-skills, karanb192/awesome-claude-skills, VoltAgent/awesome-agent-skills, hesreallyhim/awesome-claude-code, Chat2AnyLLM/awesome-claude-skills, agensi.io, lobehub.com/skills
- Key publishers captured: Anthropic, Vercel Labs, Sentry, Hugging Face, Microsoft, OthmanAdi, Jesse Vincent (Obra)
- GitHub advanced search syntax: `path:SKILL.md "keyword"`

### What the skill embeds:
- Priority sources (10, ordered by trust/relevance)
- Known good publishers table
- Category → search terms map (11 categories)
- Quality signals (gerund names, specific descriptions, scripts/ directory)
- Security red flags (hardcoded keys, base64, eval() chains, output suppression)
- Research prompt template with tailoring guidance
- Post-results installation flow
- Pointer to installed-skills-tracker (not yet built)

### Still pending:
- Installed-skills-tracker skill
- Skill eval pass on home-built skills (whiteboard-explainer, remotion-narrated-slides, project-report)

---

## 2026-03-06 — Whiteboard Explainer V1 + Transitions

### Whiteboard Explainer Project — Built from scratch
- New Remotion project: `agent-test/whiteboard-explainer/`
- Blank template scaffolded manually (npm create remotion unavailable)
- 5 scene types: title, stepReveal, diagramBuild, compare, outro
- DoodleReveal component: stroke-dashoffset draw-on, 5 doodles (arrow, circle, star, check, bracket)
- CalloutText: fade+slide text helper
- scenes.example.json: 5-scene "How the Internet Works" demo
- JSON-driven: all content in scenes.json, code stays stable
- TypeScript compiles clean; Studio running at localhost:3000

### Transitions added
- Installed `@remotion/transitions`
- TransitionSeries replaces Series; fade/slide/wipe/flip/clockWipe supported per-scene
- Duration calculation accounts for transition overlap in Root.tsx
- Critical pattern: must use `React.createElement(TransitionSeries, {}, ...children)` — not Fragment, not `null` props

### Gotchas documented
- `whiteboard-explainer-gotchas.md` created (5 gotchas with root cause + fix + prevention)

### Skills installed
- `remotion-animation` (ncklrs/startup-os-skills) — spring configs
- `remotion` (davila7/claude-code-templates) — comprehensive guide, overwrote old remotion skill
- `session-logger` (charon-fan/agent-playbook) — evaluated and removed (High Risk, wrong language focus)
- `whiteboard-explainer` skill written and installed at `~/.claude/skills/whiteboard-explainer/`

### V2 roadmap captured
- `@remotion/paths` + `evolvePath` — replace constant-dash doodle hack
- Rough.js — sketchy texture (seed: 1 to prevent flicker)
- Google Fonts — handwritten style
- Map scene type — D3-Geo animated zoom (d3-geo + topojson-client)

### Other
- bar-chart-race memory folder migrated: `C--Users-tomew-Documents-bar-chart-race` → `C--Users-tomew-Documents-agent-test-bar-chart-race`; old folder deleted
- Claude Code loading tips extracted from cli.js (32 tips + /btw bonus) — saved to `claude-code-tips.html`
- ReadMe.txt updated to working document pattern (errors/tasks passed via file)

### Skill ecosystem work
- Identified `github.com/anthropics/skills` as official Anthropic repo — 18 skills installed globally
- `skill-creator` (Anthropic official) installed — sophisticated eval loop with browser reviewer, assertion grading, description optimization
- Chinese `skill-creator` (muranustb) uninstalled — replaced by Anthropic official
- Drafted skill-finder concept: generates targeted research prompts for finding skills in the wild; proactive + reactive
- Research prompt written (for external AI) to map the skills ecosystem — ready to feed to NotebookLM next session
- Pending: skill-finder skill, installed-skills tracker skill, skill eval pass on home-built skills

**Files created this session:**
- `whiteboard-explainer/` — entire project
- `memory/whiteboard-explainer.md`
- `memory/whiteboard-explainer-gotchas.md`
- `~/.claude/skills/whiteboard-explainer/SKILL.md`
- `claude-code-tips.html`

---

## 2026-03-05 — Workflow Architecture: notebooks/ folder + source grounding decisions

### CLI Read Capability Discovery
- `nlm` CLI is effectively CUD-only for content — no way to read source text or artifact content
- Only metadata is readable: notebook list, source list (titles/IDs/URLs), artifact status
- `download report` is the one content-read that would be useful — and it's the one that's broken
- `export to-docs` exists but exported Google Docs are behind OAuth — Claude can't read them
- Consequence: Claude cannot use NotebookLM as a knowledge base for grounding its own outputs

### What Claude CAN read
- Web URL sources: Claude can `nlm source list` to get URLs, then WebFetch the original pages
- This is NOT reading from the notebook — it's reading the original web content the notebook found
- For web-source notebooks (typical research run), this is meaningful grounding
- Limitation: uploaded PDFs and pasted text sources have no URL to fetch

### source add --text confirmed working
- Inline syntax: `nlm source add <notebook-id> --text '<text>' --title '<title>'` — confirmed 2026-03-05
- Notebook ID is a positional argument (not `--notebook-id`) for this command
- Multi-line content requires `.ps1` here-string approach (inline PowerShell -Command breaks)
- skill-slideshow-manifest.md updated to use this approach (replaces broken download report path)

### New notebooks/ folder structure
- `agent-test/notebooks/<topic-slug>/` — one folder per notebook topic
- `research.md` — Claude writes this from WebFetching source URLs; grounds all Claude-built outputs
- `manifest.md` — slideshow manifest for Gemini (also added to notebook as source via source add --text)
- Web app files and Remotion project stay in their own locations; they look up research.md here
- Only Gemini output (manifest) goes into the notebook as a source — Gemini reads from the notebook
- Web app and Remotion write to local files only — no notebook source needed

---

## 2026-03-04 (continued — double-entry bookkeeping + workflow fix)

### PYTHONIOENCODING Fix
- Root cause identified: removing `PYTHONIOENCODING=utf-8` from the old bash prefix broke all styled nlm output (Rich's spinners/checkmarks crash on Windows cp1252)
- Fix: use `PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\...\nlm.exe' ..."` — set as bash env prefix, inherited by PowerShell and Python
- Do NOT use `$env:PYTHONIOENCODING` inside the PowerShell -Command string — bash expands `$env` as empty
- For long `--prompt` strings: use a `.ps1` script file with `$env:PYTHONIOENCODING = 'utf-8'` at the top
- Updated CONTEXT.md (all Key Commands) and gotchas.md with correct syntax

### Report Download Bug (v0.3.2)
- `nlm download report <artifact-id>` consistently fails — URL field is empty in `list artifacts` output
- Affects both Briefing Doc and slideshow manifest downloads
- Workaround: none currently; manifest accessible in notebook UI; upgrading to v0.3.3 may fix
- Added note to CONTEXT.md download section

### Double-Entry Bookkeeping Notebook
- First run failed (Unicode errors + auth expiry); second run completed cleanly after fix
- 9 high-quality sources imported (Gleeson-White, Pacioli history, accounting/capitalism PDFs)
- App built: `playlists/apps/double-entry-bookkeeping.html` (Explorer 8 angles + Quiz)
- Slideshow manifest generated (artifact e87e8b33) — in notebook but not downloadable
- Video queued (artifact 029b2b05), shared, task file moved to completed/

---

## 2026-03-04

### Remotion — Full Session: calculateMetadata Fix + BattleOfAtlantic

**Context recovered** from previous crashed session (summary-based; OAuth crash, process killed via Task Manager).

#### calculateMetadata hang — root cause and fix

The "Running calculateMetadata()" spinner in Remotion Studio never resolved. Investigation:
- `Config.setPublicDir()` in `remotion.config.ts` was ruled out (already reverted)
- Root cause: `getAudioDurationInSeconds` from `@remotion/media-utils` uses plain `fetch()` internally
- Remotion's dev server returns the HTML SPA shell for plain fetch requests to `/static-HASH/*` paths (not the actual file)
- The function tries to decode that HTML response as audio → decode step hangs indefinitely
- Fix attempt 1: replaced `getAudioDurationInSeconds` with `<audio>` element approach — still hung
- **Fix attempt 2 (final)**: removed `calculateMetadata` entirely

**Static durations pattern established:**
- Created `src/slide-durations.ts` with pre-computed durations imported at module level
- `generate-audio.mjs` updated to auto-write `slide-durations.ts` after each ElevenLabs run
- Root.tsx imports durations at module load; frame counts computed synchronously — no async, no spinner possible
- This is now the standard pattern for all Remotion compositions in this project

#### Britain1940 audio silence — root cause and fix

After removing `calculateMetadata`, audio was silent in Tom's browser:
- JavaScript inspection: `paused:false`, `volume:1`, `muted:false` — audio was playing at the code level
- Preview tool confirmed audio worked fine (running in its own Chrome context)
- Tab right-click menu showed "Mute site" option (not "Unmute site") — tab not muted at browser level
- Chrome was **not listed at all** in Windows Volume Mixer — broken audio pipeline
- Root cause: Chrome's audio subsystem broke when the process was killed via Task Manager in the previous session
- Fix: Tom closed Chrome completely and reopened it; audio immediately worked
- Confirmed code was correct throughout — this was an OS/browser state issue, not a code bug
- Tom tested in Edge during diagnosis — worked immediately, confirming the code was fine

#### BattleOfAtlantic composition — created from scratch

New WWII composition with an ocean navy aesthetic, parallel to Britain1940:
- Background: `#0c1a2e` (deep navy), accents: `#0ea5e9` / `#38bdf8` (sky blue)
- 5 slides: Strategic Stakes → U-boat Terror → Atlantic Gap → Technology War → Turning Point
- Audio: George voice (ElevenLabs), `eleven_multilingual_v2`, `public/audio/atlantic/`
- Slide durations: 21.1s, 23.0s, 19.8s, 24.7s, 21.6s → total ~1:57
- Script: `scripts/generate-atlantic-audio.mjs` — generates audio and writes `src/atlantic-durations.ts`
- Confirmed working in Edge browser with full narration

**Files created/modified this session:**
- `src/Root.tsx` — removed all calculateMetadata; added BattleOfAtlantic registration; all frame counts computed at module level
- `src/slide-durations.ts` — auto-generated Britain1940 durations (was not written in previous session)
- `src/atlantic-durations.ts` — auto-generated BattleOfAtlantic durations
- `src/BattleOfAtlantic.tsx` — new composition
- `scripts/generate-atlantic-audio.mjs` — new ElevenLabs script for BattleOfAtlantic
- `scripts/generate-audio.mjs` — updated to write `slide-durations.ts` after audio generation
- `memory/remotion-context.md` — updated with BattleOfAtlantic and static durations pattern
- `memory/session-log.md` — this entry
- `memory/remotion-gotchas.md` — new file, Remotion-specific pitfalls (created end of session)

**Pending from this session:**
- Rename `model-collapse/` project folder to a more logical name (added to pending.md)

### Remotion — Continued Session: Per-Bullet Audio + Refactoring

#### Visual improvements — Britain1940
- ScanlineOverlay (CRT texture), Vignette (darkened edges), GlobalProgressBar (4px bottom)
- Slide counter top-right (01/05 format), title card animated corner brackets
- Bullets now spring in from left (translateX), B3 build indicator added
- TITLE_FRAMES increased 90→120 to accommodate 3.5s title audio

#### Per-bullet audio architecture — BattleOfAtlantic
- Rewrote generate-atlantic-audio.mjs: 16 files (title.mp3 + s1b1.mp3…s5b3.mp3), one narration sentence per bullet
- atlantic-durations.ts changed from number[] to number[][] (per-slide → per-bullet)
- BattleOfAtlantic.tsx rewritten: per-bullet Sequence+Audio blocks, exact bulletStartFrames timing
- Timing constants exported from BattleOfAtlantic.tsx; Root.tsx imports them — single source of truth
- Root.tsx updated: ATL_BULLET_FRAMES computed, ATL_SLIDE_FRAMES derived using same formula as composition

#### Refactoring
- FOLDER constant added to start-studio.js and render.js; SET FOLDER= added to start-remotion.bat
- Remaining folder name references in JSON files documented (manual update required when renaming)

#### New infrastructure
- render.js created — runs `remotion render` for any composition, outputs to output/<Name>.mp4
- Skills created: remotion-narrated-slides (full project workflow reference), project-report (writes PROJECT-REPORT.md)
- Task queue created: tasks/, staging/, completed/ folders with task files for both renders

#### First renders completed
- BattleOfAtlantic.mp4 — 9.4 MB, 3873 frames, rendered in 1m 23s
- Britain1940.mp4 — 8.3 MB, 3541 frames, rendered in 1m 12s
- Both confirmed playable in Windows Video Player
- Task queue (tasks/ → completed/) used for the first time — working as expected
- render.js confirmed working; ~real-time render speed (8x concurrency)
- B3 build indicators visible in both renders — ready to remove next session

**Files created/modified this session:**
- `src/BattleOfAtlantic.tsx` — per-bullet audio rewrite
- `src/Britain1940.tsx` — visual improvements, timing fix
- `src/Root.tsx` — per-bullet duration calculation
- `src/atlantic-durations.ts` — number[][] format
- `scripts/generate-atlantic-audio.mjs` — per-bullet rewrite
- `start-studio.js` — FOLDER constant
- `render.js` — new render launcher
- `start-remotion.bat` — SET FOLDER=
- `tasks/render-battle-of-atlantic.md` — new task (moved to completed/)
- `tasks/render-britain-1940.md` — new task (moved to completed/)
- `skills/remotion-narrated-slides/SKILL.md` — new skill
- `skills/project-report/SKILL.md` — new skill
- `output/BattleOfAtlantic.mp4` — first render
- `output/Britain1940.mp4` — first render

---

## 2026-03-03

### Session Recovery & Workflow Architecture
- Session crashed mid-session (OAuth issue in Claude app; killed via Task Manager)
- Discussed process model: dev server runs as child of Claude Code process, dies with it
- Established three-case workflow dispatch in `startup.md`: `playlists`, `remotion`, `session-crash`
- Created `memory/remotion-context.md` — minimal Remotion workflow context file
- Tom sets `workflow/active.txt` to switch between workflows; each case builds only the relevant context

### Remotion — New Compositions
- **HelloWorld** (`src/HelloWorld.tsx`) — 6s, demonstrates `useCurrentFrame()` with live counter; educational Remotion explainer
- **Britain1940** (`src/Britain1940.tsx`) — 50s, 5-slide WWII slideshow (Battle of Britain / Atlantic); dark amber aesthetic, staggered bullet animations, fade in/out between slides; bullet load timing spreads to ~5s so last item readable before slide ends
- Both registered in `Root.tsx`
- ElevenLabs narration noted as future possibility (Remotion skill hint: `calculateMetadata` for audio sync)

---

## 2026-03-02 (session 2)

### Inference App POC — Polish and Documentation

- **`app: yes` field added** to task file spec, JSON spec, skill-task-intake.md, skill-json-request.md, notebook-request-spec.md, CONTEXT.md — trivial propagation
- **Follow-up chip click-through fixed**: chips now call `runExplorer(q)`, passing chip text as `customFocus` param; `runExplorer(customFocus)` uses it in place of dropdown value
- **Quiz redesigned — batch of 5**: one AI call returns `{ questions: [...] }` array; user steps through one at a time; "Next Question" / "See Results" buttons; final score shown as X/5
- **Answer randomization**: `shuffleOptions()` added — strips letter prefixes, Fisher-Yates shuffles, re-labels A–D, updates `correct` field; eliminates model bias toward position A
- **POC moved** to `playlists/apps/poc/portugal-poc.html`
- **skill-inference-app.md updated** throughout: batch quiz pattern, shuffle note, reference implementation section with sync reminder, future directions section (10 categories including assessment framework/rubrics)
- **Core Design Principle added** to skill: the power of inference apps is prompt authorship, not runtime connectivity — Claude reads the sources at build time and writes prompts that encode that domain knowledge; the content survey step is where source knowledge becomes prompt knowledge; runtime AI executes well-crafted prompts, not generic ones
- **Connectivity entry in Future Directions corrected**: build-time grounding via prompt authorship is already the design; connectivity as a future direction means runtime/live/updatable content, which is a different and further step

---

## 2026-03-02

### Session Recovery
- Lost session (Mar 1 glitch) reconstructed from session file `cbbf8965`
- All files from that session confirmed intact — nothing lost except an unfinished Kant slideshow manifest prompt at the very end (the Kant slides were subsequently completed and worked well)

### Gemini Canvas Prompt — Manifest Version
- Existing slideshow prompt had conflicting instructions: "ask me for topic/slide count" + manifest + "subsequent response" all active simultaneously
- Resolved by splitting into two prompts: manifest version and standalone version
- **Manifest version** written: lean, single source of truth, new first paragraph reads "Read the slide manifest from the source I've identified in this message" — Tom prepends source name, no placeholder to fill in
- Drops all content rules (50-60 words etc.) — manifest handles those; drops topic/slide-count ask — manifest handles that too
- Technical guardrails retained: CSS values, loadImagesSequentially, loader span approach, copyPart(1)/copyPart(2), no env-injected scripts
- Reference HTML cleaned up (single example slide, placeholder content only)
- Standalone version (no manifest) deferred — discussed but not written this session

### skill-manifest-writer.md Created
- New skill: Claude writes Slide-Ready Manifests directly, without NotebookLM
- Same output format as `skill-slideshow-manifest.md` — Gemini Canvas cannot tell the difference
- Interaction: Tom invokes skill → Claude asks topic + slide count → outputs clean manifest
- Tested: Portugal's route to India, 10 slides — worked well
- CONTEXT.md updated with new skill in index

### Inference App Workflow — Design, POC, and Skill
- New workflow type identified: single-file HTML apps with a live AI brain, no images
- Pipeline designed: create notebook → research (async, parallel with app shell design) → import + source review → Claude writes content survey → finalize app
- Key insight: Claude writes the survey itself (not via nlm report create) — single-session approach
- Tom shared two example apps: WW2 Slice & Dice Explorer (complex, reference only) + Infinite Trivia (simpler, working proxy reference)
- Built POC: `playlists/apps/portugal-poc.html` — Explorer tab (focus selector → table + summary + follow-up chips) + Quiz tab (MCQ with score tracking and anti-repeat)
- Fixed 500 proxy error: switched from `gemini-proxy.ewalltom.workers.dev` (broken) to `groq-proxy.ewalltom.workers.dev`; added `model: 'openai/gpt-oss-120b'` to request body
- **`skill-inference-app.md` created** — documents callAI(), extractJson(), JSON schema prompting, Explorer + Quiz patterns, content survey step, single-session build pipeline, visual design system
- CONTEXT.md updated; pending.md updated to reflect blocker cleared
- Remaining: add `app: yes` to task file spec; integrate into workflow; fix follow-up chip click-through (chips currently display-only)

---

## 2026-02-28

### Slideshow Manifest Pipeline Designed and Documented
- Discovered `nlm report create --format "Create Your Own"` as the mechanism for generating structured slide content from NotebookLM research
- Designed 4-pillar Slide-Ready Manifest spec: semantic segmentation, syntactic constraints (50–60 words/paragraph), global visual style tokens, entity mapping
- Tested manually: 5-slide and 10-slide manifests on WW2 topics — output fed to Gemini Canvas to produce HTML picture book slideshow
- Created `skill-slideshow-manifest.md` — full skill for generating and downloading manifests
- Added `slideshow: yes` and `slides: N` fields to JSON spec (skill-json-request.md)
- Added Step 7.6 to workflow-operator.md — optional slideshow step after video queueing
- Created `playlists/slideshows/` folder for downloaded manifests
- Updated CONTEXT.md: folder structure, skills index
- Gemini Canvas step remains manual — skill covers everything up to the downloaded .md file

### Two-Instance Architecture Designed and Documented
- Designed a two-instance Claude Code CLI pipeline for the ephemeral notebook workflow
- Instance 1 (Content Strategist): reads tasks/, generates JSONs, writes to json/
- Instance 2 (NotebookLM Operator): reads json/, builds notebooks, moves to json-completed/
- JSON is the handoff contract between instances; each instance is unaware of the other's domain
- Created design doc: `playlists/design/two-instance-architecture.md`

### New Skill Files Created
- `skills/workflow-strategist.md` — full workflow for Instance 1
- `skills/workflow-operator.md` — full workflow for Instance 2
- `skill-workflow-dispatch.md` updated with two new workflow names: `playlists-strategist` and `playlists-operator`

### New Folders Created
- `playlists/json/` — handoff folder from Instance 1 to Instance 2
- `playlists/json-completed/` — JSONs processed by Instance 2

### queue/ → json/ Path Fix
- Updated `skill-pattern-003.md` and `skill-task-intake.md` to reference `json/` instead of `queue/`
- queue/ folder is now legacy; json/ is the standard handoff location for all workflows

### FileSystemWatcher Document Created
- Created `playlists/design/filesystemwatcher.md`
- Documents a PowerShell script for automatically triggering Instance 2 when Instance 1 writes a JSON
- Status: not yet built or tested — sequential operation is current approach
- Script included in the doc, ready to implement when concurrent operation is needed

---

## 2026-02-25 (continued — new session)

### Cross-Session Goals Added to startup.md
- Added "Cross-Session Goals" section to `startup.md`
- Goal 1: Identify permission prompt triggers — every observed prompt is data; see `permission-prompt-log.md`
- Goal 2: Track JIT anti-drift effectiveness — every run is a data point; see `JIT-experiment.md`
- Motivation: Claude should understand these as persistent project goals, not just session context

---

## 2026-02-24 (continued)

### Design Pattern System Established
- Tom provided a TOC document (DOC-000) defining a 12-document JSON generation system
- Created `playlists/design/` folder for design documents
- Saved TOC as `DOC-000-table-of-contents.md`
- Created `DOC-004-A-isomorphic-series.md` — first sub-pattern of DOC-004
- Updated DOC-000 to reflect 004-A status and definition
- Key concept: 004-A = collection of isomorphic items (same category, same lens), grouped into notebooks by a natural organizing principle, one video per item, notebooks are peers

### WW2 Series: Major Battles (Pattern 004-A First Implementation)
- Defined series: 5 notebooks, 15 videos, grouped by theater
- Theaters: Western Europe (3), Britain & Atlantic (2), Mediterranean (3), Eastern Front (3), Pacific (4)
- Battles confirmed: France, D-Day, Bulge, Battle of Britain, Battle of Atlantic, North Africa, Sicily, Greece, Stalingrad, Kursk, Operation Bagration, Pearl Harbor, Midway, Philippines, Okinawa
- Lens: importance, uniqueness, surprising facts, outcome significance / arc of the war
- Created 5 task files in `playlists/tasks/`

### WW2 Series: Partial Execution (Incomplete Run)
- Notebooks 1 (Western Europe) and 2 (Britain & Atlantic) created, researched, videos queued, shared
- Notebook 3 (Mediterranean) created and researched but videos NOT queued — auth expired
- Notebooks 4 and 5 not started
- Source-focus mismatch on Notebook 1 Video 1: France focus assigned to Bulge source by mistake
- Auth expired ~20 min into run — known risk, not mitigated for multi-notebook runs

### Workflow Fixes (Post-Run)
- `gotchas.md`: Added Permission Prompts section; added auth-per-notebook reminder; added `date /t` fix (recurring issue — now documented with stern warning)
- `skill-log.md`: Added real-time intervention tracking requirement; moved checklist pointer to workflow file
- `workflow-playlists.md`: Added "Before Starting" block with checklist; moved Task Execution Checklist here from skill-log.md; fixed start time command; removed outdated note about permission prompts not appearing; added auth-per-notebook and prompt tracking to Notes
- **Key principle established**: The notebooks are ephemeral — the workflow is the product. Every intervention is signal. Log everything in real time.
- **Session logging**: Claude should update session-log.md proactively after significant changes, without waiting to be asked.

### Workflow Redesigned as JIT Sequencer
- Rewrote `workflow-playlists.md` as a true sequencer — each step tells Claude exactly what to do and which skill to read before doing it
- Key changes: explicit "READ skill-X.md NOW" at Steps 4 and 7; source-focus mapping must be written out and verified before any video command runs; checklist items now tied to specific steps with ✓ markers; "do not proceed until verified" at each step
- Added explicit instruction: do not chain nlm video create with && (known failure mode)
- This addresses the core agent drift problem identified by research: JIT instruction delivery over upfront context loading
- Permission prompt tracking added as a global checklist item (after every Bash command, not step-specific)

### Permission Prompt Log Created
- Created `playlists/design/permission-prompt-log.md` — shared log for both Tom and Claude
- Tom reports prompts he sees; Claude logs prompts it observes in real time
- Current confirmed triggers: Write tool (file creation)
- Suspected but unconfirmed: nlm notebook create, nlm video create
- Reference added to gotchas.md so future Claude knows to consult and update it
- Goal: build a complete trigger map, then eliminate prompts for autonomous runs

### Permission Prompt Scope Corrected
- Discovered: Write tool (file creation) also triggers permission prompts, not just Bash commands
- Confirmed trigger: Write tool call to create `JIT-experiment.md` — Tom had to approve
- Updated `gotchas.md` and `workflow-playlists.md` to say "tool call" instead of "Bash command"
- Added Write tool as a confirmed trigger to the known triggers list in gotchas.md

### JIT Experiment Document Created
- Created `playlists/design/JIT-experiment.md`
- Captures what JIT instruction delivery is, why we're trying it, and a rubric for evaluating it
- Includes a run history table — add a row after every notebook run going forward
- This is an active experiment: the goal is fully autonomous execution with zero interventions
- Pending item added to track this across sessions

### skill-document.md → skill-output.md
- Renamed and expanded `skill-document.md` to `skill-output.md`
- Now covers all copy/paste output types: documents, research prompts, task files, any verbatim-use material
- Key rule: output-only responses — no preamble, no commentary, nothing Tom would have to edit out
- Clarify first, then output only — never mix conversation and copy/paste output in the same response
- Updated CONTEXT.md skills index; deleted old skill-document.md
- Principle: Tom referencing a skill by name is a more reliable trigger than Claude inferring it

---

## 2026-02-25

### Reference Folder Created
- Created `playlists/reference/` for external research documents and deep-dive reference material
- Distinct from skills (instructions) and memory (session state) — these are source documents that inform decisions
- Current contents: `jit-deep-research.txt`, `perrmission-prompt-deep-research.txt`, `DOC-004-Design-Pattern.txt`
- Three other files (overview, JSON spec, notebook request spec) identified as redundant with existing skills/design docs — can be removed
- Startup: read the two deep research docs at session start; DOC-004 on demand

### settings.json Created — Permission Prompt Allowlist
- Created `C:\Users\tomew\.claude\settings.json` with allowlist for all nlm and PowerShell Bash commands, plus Write and Edit
- Bash allowlist confirmed working: zero prompts across 3-notebook WW2 run
- Write/Edit allowlist NOT working on Windows (known bug) — first use per session still prompts
- Net result: 2 unavoidable prompts per session (first Write, first Edit); everything else clean after that

### WW2 Series Completed (Notebooks 3, 4, 5)
- Mediterranean, Eastern Front, Pacific notebooks built and shared
- 10 videos queued across 3 notebooks — all clean, no prompts during run
- Orphaned Mediterranean notebook (from prior session) deleted before run
- ww2-western-europe.txt and ww2-britain-atlantic.txt moved to completed/ (missed last session)
- WW2 series now fully complete

### Permission Prompt Log Updated
- Added "Confirmed Non-Triggers" section — all nlm and PowerShell commands confirmed clean
- Added Comments/Analysis column to trigger table
- Observations & Patterns restructured into subsections
- allowlist status updated to reflect Bash working, Write/Edit not

### Gotchas Updated
- Permission prompt triggers updated with confirmed 2026-02-25 data
- Import timeout bug documented: check source list before retrying — retry causes duplication (confirmed Pacific notebook)

### JIT Experiment — Run Observed
- First post-JIT run: zero source-focus mismatches, zero auth failures, zero prompts during notebook builds
- JIT sequencer appears to be working — steps followed in order, skill files read at correct points
- JIT experiment rubric table needs updating (pending)

---

## 2026-02-25 (continued — Sci-Rev session)

### Scientific Revolutions Series Started (Incomplete)
- Designed 3-notebook series: Physics, Chemistry, Medicine — 3 videos each, same lens across all
- Lens: old model → breakthrough → resistance → what it changed forever
- Physics and Chemistry notebooks built, researched, 3 videos each queued, shared
- Medicine notebook created but research never ran — auth expired due to Edit prompt stall
- Root cause: Claude edited `workflow-playlists.md` to fix the login instruction mid-run, triggering the first-Edit-of-session prompt; prompt stalled the run while Tom was away
- All 3 task files still in tasks/ — series not complete; orphaned notebooks deleted at end of this session

### Workflow Fixes
- `workflow-playlists.md`: Human Touchpoints and Step 1 updated — attempt auth check first, only ask Tom to login if it fails
- `workflow-playlists.md`: Added rule — never make Write/Edit calls during an active run; edits during conversation (before Step 0) are fine; defer mid-run fixes to after the run
- `permission-prompt-log.md`: Added new entry for the mid-run Edit that caused the failure

### Permission Prompt Investigation
- Confirmed: first-Edit-of-session prompt is unavoidable under current settings.json approach (Windows bug)
- New finding: `nlm doctor` shows cookies present even when auth is actually expired — doctor is not a reliable auth check
- New approach identified: `claude --permission-mode acceptEdits` CLI flag — suppresses Write/Edit prompts at launch, different from settings.json allowlist. Not yet tested.
- Added to pending.md as IMPORTANT

### Plan for Next Session
- Start with `claude --permission-mode acceptEdits`
- Delete 3 orphaned notebooks (Physics, Chemistry, Medicine)
- Re-run all 3 notebooks clean as test of the flag

---

## 2026-02-24

### Memory System Restructured
- Replaced `cheatsheet.md` with three focused files: `startup.md`, `pending.md`, `gotchas.md`
- Updated `MEMORY.md` session startup instructions to point to the new files
- Created `session-log.md` (this file) for tracking workflow/system changes across sessions

### Research Pipeline Archived
- Moved 5 Research Pipeline skills to `skills/archive/`: `skill-research.md`, `skill-create-videos.md`, `skill-delete-sources.md`, `skill-manifest.md`, `workflow-research-pipeline.md`
- Updated `CONTEXT.md` skills index to reflect the archive

### Documentation
- Wrote ephemeral notebook workflow overview document (in chat, not saved to disk)

### Auth Automation (Pending Test)
- Discussed whether `nlm login` can be run by Claude mid-session when token is fresh
- Agreed to test later today when a live session is active

### Task File Format Updated
- Added `title` field (optional — defaults to topic if omitted)
- Confirmed `key` field is required on all task files (not just copied-text tasks)
- Updated `skill-task-intake.md` and `CONTEXT.md` to reflect new format
- Added `key:` field to all 4 staging files; format now consistent across all tasks

### Run Log Append Bug Fixed
- Recurring issue: new log entries inserted mid-file instead of at end of file
- Root cause: Edit tool used a previous entry's heading as an anchor, inserting before later entries
- Fix: Updated `skill-log.md` with explicit append instructions and a stern warning against mid-file insertion
- Added full task execution checklist to `skill-log.md` to prevent this and other missed steps
- **Monitor:** Check run-log.md entry order after each notebook build to confirm fix is holding

### New Skill: skill-document.md
- Created `skills/skill-document.md` — general-purpose skill for writing clean documents
- Key rule: no preamble or transitional opener; document begins on the first line of output
- Added to CONTEXT.md skills index under Shared / Infrastructure

### Run Log: Intervention Tracking Added
- Added `Intervention` field to run log entry format in `skill-log.md`
- Goal: track which runs are fully autonomous vs. requiring Tom to step in
- Gödel entry updated to correctly record permission prompt intervention and mid-file hiccup

### Roadmap Discussion
- Discussed next directions; all added to pending.md:
  - Pattern 004 (Multi-Notebook Series)
  - Podcasts and slide decks as additional artifact types
  - Summary generation → feed back as notebook source → Gemini web app
  - Cartridge web app architecture (longer term)
  - Additional source types (PDFs, direct URLs)

---
