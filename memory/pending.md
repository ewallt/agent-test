# Pending Items

Items carried forward from session to session.

---

## Bar Chart Race

- [ ] **UsCities pacing fix** — simultaneous engine goes too fast (only 13 decennial periods). Either source annual data or increase frame counts significantly.
- [ ] **UsTop10Cities minor issues** — not yet documented after review; sharpen design guide algorithm when done.
- [ ] **Tallest Buildings wiring** (`bcr-1`) — data files exist in `data/tallest-buildings/`, needs wiring into `data/index.ts`.
- [ ] **gh-pages deploy script** — discussed two sessions ago, not yet built.

## Whiteboard Explainer

- [x] **6 new scene types** (`we-1`) — quote, stat, flowChart built and in use; splitContent, timeline, imageReveal deferred to V2.
- [ ] **Braess's Paradox narration + slides** — narration added, slides 3 and 5 redesigned. More slide tweaks to come eventually.

## NotebookLM (Agent Parallelization)

- [ ] **Agent parallelization** — design notes in `ephemeral-notebook/documents/agent-parallelization.md`. Four use cases: parallel artifact generation within a run, isomorphic series parallelization, knowledge base enrichment, background wrap-up. Priority order in the doc.

## NotebookLM

- [ ] **Unified artifact workflow** (`nlm-1`) — remotion flag + Report 3 skill still to design.
- [ ] **Quiz chip-targeting enhancement** (`nlm-2`) — track which Explorer chips the user clicks and use them to scope the quiz. If no chip has been clicked (app first load, or fresh dropdown selection), treat the active dropdown selection as a chip substitute. The quiz prompt would be built from the accumulated chip history rather than the static scope string. See `notebooklm-webapp` skill for full spec note.
- [ ] **source-knowledge-base.md** — fill in format/structure for Claude-written knowledge base document. Hard stop in workflow.md Step 3a. Needs Tom's input.
- [ ] **source-web-app.md** — fill in format/structure for web app knowledge document. Hard stop in workflow.md Step 3c. Needs Tom's input.
- [x] **Infographic artifact type** — skill created, integrated into master skill and workflow.md.

## Infrastructure

- [ ] **Parking lot browser integration** — Tom maintains a parking lot webpage of URLs for active work. Needs a way to sync open browser tabs to it without manual copying. Investigate browser extensions that export open tabs to a local file (e.g. Tab Copy, OneTab, or a custom extension). Claude reads the file and updates the parking lot. End goal: one action updates the parking lot from whatever tabs are open.

## Misc / Carried

- [ ] **Braess's Paradox video** (`215894d5`) — confirm video, share notebook. Task file: `tasks/braess-paradox.md` → move to `completed/` once confirmed.
