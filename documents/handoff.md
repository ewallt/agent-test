# Session Handoff — 2026-03-28

## What Was Done This Session

### sns-8 Complete — Edge TTS Integration
- All four sub-items of ticket sns-8 are now done; ticket marked `done`
- **byg-edge-tts skill created** at `~/.claude/skills/byg-edge-tts/SKILL.md` — covers setup, running scripts, adding audio to new compositions, voice options, troubleshooting, and JIT read gates for the "new composition" workflow
- **remotion-narrated-slides skill updated** — description now notes BYG compositions use edge-tts (not ElevenLabs) and defers to `byg-edge-tts` skill
- **byg-project-doc.html updated** — edge-tts added to reference table; new Step 4 "Generate audio" inserted in the workflow (steps renumbered 1–10)
- JIT gates added to byg-edge-tts skill: "READ NOW" instructions before editing the copied script and before creating the placeholder durations file

### index.html — Pending Items → Ticket Board
- Replaced the "Pending Items" card in `documents/index.html` with a "Ticket Board" card linking to `http://localhost:3010/tasks.html`
- `pending.html` is the old static list — superseded by the live ticket board; card now points to the right place

### Skill-Creator Process Discussion
- Clarified that invoking skill-creator means following the full process (draft → test → eval → iterate), not just writing SKILL.md directly
- JIT pattern is the key thing to apply when designing workflow skills — instructions delivered at the moment of use, not loaded upfront

---

## State Right Now

- On `dev` branch, clean working tree (as of session start)
- sns-8 fully complete; all edge-tts work shipped
- byg-edge-tts skill is live and available in the skill list
- `documents/index.html` updated — Ticket Board card now links to localhost:3010

## Next Session Priority

Start a new Infrastructure project. Tom will provide the details at session start — wait for him to brief you before doing anything. The goal for the session is to define what the Infrastructure project is and get it established.

## Other Items

- sns-6: Deploy `behold-your-god.html` v1.1 (Quotes tab) to gh-pages — still pending
- sns-7: Build Illustration 00 video — The King They Made and Killed — still pending
- inf-2: dev→main sync procedure — still pending

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: None

Tom is bringing details for a new Infrastructure project — wait for him to brief you before doing anything.
