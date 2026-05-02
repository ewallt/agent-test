# Pending Items

Items carried forward from previous sessions. Update this file at the end of each session.

- [x] **IMPORTANT: Shutdown routine** — built 2026-03-08. Skill at `~/.claude/skills/shutdown/SKILL.md`, invoked with `/shutdown`.

- [x] **bar-chart-race project location** — Resolved. Project fully present at `Projects/Remotion/bar-chart-race/`. Both compositions (AiMmlu, StreamingWars) confirmed working in Studio.
- [ ] **Braess's Paradox notebook** — video rendering (`215894d5`), not yet shared. Move `tasks/braess-paradox.md` to `completed/` once confirmed.
- [ ] **gh-pages deploy script** — discussed but not built. Would make deploying new apps a single command.
- [ ] **CONTEXT.md cleanup** — bar-chart-race path in project structure section still references old location.

- [ ] **Two-instance pipeline**: test `playlists-strategist` → `playlists-operator` sequential run end-to-end; see `two-instance-architecture.md` and `filesystemwatcher.md` in design/
- [ ] **FileSystemWatcher**: build and test the PowerShell script for concurrent pipeline operation — script drafted in `playlists/design/filesystemwatcher.md`
- [ ] Test whether `nlm login --profile default` can be automated mid-session (when token is fresh, not expired)
- [ ] Upgrade `nlm` from v0.3.2 to v0.3.3 (minor bugfix, no breaking changes)
- [ ] **New master skill — first real run test** — `notebooklm-playlists` rebuilt as JIT sequencer; needs to be tested against an actual task file run
- [ ] **Self-improving AI notebook** — `a87328bb` — not yet shared or logged in run-log; videos complete
- [ ] **Create task file for self-improving AI** — today's run was done conversationally; formalize as a task file if the notebook will be reused
- [ ] Integrate `nlm download video` into workflow (command now known; see Key Commands in CONTEXT.md)
- [ ] JIT experiment: update rubric table in `playlists/design/JIT-experiment.md` — 2026-02-25 WW2 run was first post-JIT run, needs row added
- [ ] Reference folder: remove 3 redundant files (overview, JSON spec, notebook request spec) — already captured in skills/design docs
- [ ] Reference folder: wire up to startup — add to CONTEXT.md and/or startup.md so deep research docs are read at session start
- [ ] Build remaining design docs (DOC-002 through DOC-012) — see playlists/design/DOC-000-table-of-contents.md
- [ ] Chat configuration (`nlm chat configure`) — deferred to later iteration
- [ ] Add podcasts and slide decks to the workflow as additional artifact types — deferred; CLI read limitation makes these less useful
- [ ] Design summary generation step — deferred; blocked by CLI read limitation (cannot read artifact content back)
- [ ] **Unified artifact workflow** — brainstormed 2026-03-04. Full session build order:
  1. Sources built and reviewed
  2. Report 1 (Briefing Doc) → app content survey → build web app → add as source
  3. Report 2 (structured manifest, `slideshow` flag) → stored in notebook; Tom takes to Gemini Canvas in separate session
  4. Report 3 (Remotion content, `remotion` flag) → stored in notebook; used in separate Remotion session
  5. Videos queued last
  - [x] Wire `app` flag into `workflow-playlists.md`
  - [x] Add `slideshow` flag to `skill-task-intake.md` and `notebook-request-spec.md`
  - [x] Add `remotion` flag (placeholder) to all spec/workflow files
  - [ ] Design `remotion` flag + Report 3 skill (not started — deferred)
- [ ] Explore Gemini integration — use NotebookLM summary as source for Gemini-generated web apps; Gemini has native NotebookLM integration
- [ ] Investigate cartridge web app architecture — shell app that Claude populates with content, avoids token burn of building from scratch each time
- [ ] Explore additional source types — PDFs, direct URL injection, beyond current nlm research web sources
- [x] **NuclearPlant: re-render after reboot** — Was PEBCAK, not Windows issue. Resolved. Rendered through v5.
- [x] **NuclearPlant: deploy to gh-pages** — deployed v5 (animated doodles); wrapper page v1.2 live at `notebooklm/byg-nuclear-plant/`.
- [x] **BYG project definition** — completed 2026-03-27. project-definition.md, knowledge-base.md, todo.md, byg-project-doc.html all written.
- [x] **BYG: edge-tts integration** — sns-8 complete. byg-edge-tts skill created; byg-project-doc.html updated; remotion-narrated-slides skill updated.
- [x] **BYG: deploy behold-your-god.html v1.1** — Superseded; v2.0 deployed 2026-03-28 with The Arc tab, Illustration 02 live, same-tab navigation.
- [x] **BYG: Illustration 02 — God Is Not a Criminal** — Complete. Rendered, deployed to gh-pages, web app updated.
- [ ] **BYG: build Illustration 00 video** — "The King They Made and Killed"; notes ready at `illustrations/00-king-they-made-and-killed/notes.md`.
- [ ] **BYG Illustrations 03–10** — build remaining 8 F.T. Wright illustration videos; update Illustrations tab as each is completed.
- [ ] **BYG publish pipeline** — `byg-deploy` skill created for local→dev; gh-pages publish step not yet formalized (ticket `byg-1`).
- [x] **BYG GitHub repos** — `byg` (prod) and `byg-dev` (staging) created 2026-03-30. Both live on GitHub Pages.
- [ ] **Illustration 03 (WhiteHatBlackHat)** — timing fixed, narrations complete. Still needs: render to MP4, wrapper HTML, deploy, web app update.
- [ ] **inf-11** — fix mercy gh-pages deploy to use index.html/subfolder convention (carried over).
- [ ] **inf-10** — document system audit and consolidation (ongoing backlog).
- [x] **Remotion narration**: ElevenLabs integration complete — `generate-audio.mjs` script generates all 6 MP3s; `calculateMetadata` auto-sizes slides to actual audio duration + 2s buffer; Britain1940 runs ~1:51 with full narration (George voice, eleven_multilingual_v2)
- [x] **Remotion: rename project folder** — Renamed to `simple-narrated-slides`. All scripts updated.
- [x] **Remotion: B3 build indicators** — removed from Britain1940.tsx (BattleOfAtlantic never had it).
- [ ] **Remotion: upgrade Britain1940 to per-bullet audio** — currently uses older per-slide architecture (one MP3 per slide). Per-bullet is the preferred pattern going forward.
- [ ] **Whiteboard Explainer: 6 new scene types** — quote, stat, splitContent, timeline, imageReveal, flowChart. Build all in one pass, demo in WhiteboardExplainer-3. See `whiteboard-explainer/documents/planning.md` for JSON shapes.
- [ ] **Whiteboard Explainer: WhiteboardExplainer-3** — demo composition for new scene types; needs a third theme (candidates in planning.md)
- [ ] **Whiteboard Explainer V2** — evolvePath (exact path lengths), Rough.js (sketchy texture, seed:1), Google Fonts, map scene type (D3-Geo animated zoom)
- [x] **Skill-finder skill** — built 2026-03-07. Replaced Anthropic official `find-skills/SKILL.md` with custom version. Generates structured research prompts for external AIs; embeds ecosystem knowledge (sources, publishers, category map, quality signals, security red flags); reactive + proactive modes.
- [ ] **Installed-skills tracker skill** — a skill that maintains awareness of what skills are installed, their purpose, when they were added, and whether they've been evaluated. Can be called by other skills (e.g., skill-finder) to avoid redundant suggestions.
- [ ] **Local-skills architecture** — `~/.claude/CLAUDE.md` + `~/.claude/local-skills/` established this session. skill-creator and frontend-design have master files. Pattern: Anthropic skills stay pristine; augmentations live in local-skills.
- [ ] **Meta notebooks** — Doodle Animation (`cfac8154`) and UX and Interface Design (`ae466d18`) created. Query on demand; IDs in working-notes.md.
- [x] **Playwright MCP** — Registered and connecting. `--codegen` flag removed (was crashing server). Ready to test in a fresh session.
- [ ] **Playwright MCP test** — Open a fresh session and verify a Chrome window opens to example.com.
- [ ] **Skill eval pass** — use `skill-creator` (Anthropic official) to evaluate and refine all home-built skills: `whiteboard-explainer`, `remotion-narrated-slides`, `project-report`. Run eval loop + description optimization on each.
