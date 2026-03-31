# Session Handoff — 2026-03-30

## What Was Done This Session

### Illustration 03 — WhiteHatBlackHat Timing Fix
- Root cause identified: Edge TTS uses VBR, making file-size-based duration estimation unreliable
- Fixed by switching to `mutagen` for accurate MP3 duration measurement
- `SLIDE_BUFFER_FRAMES` reduced from 180 to 30 (was compensating for wrong estimates)
- `TITLE_FRAMES` corrected to 207 (actual title audio = 6.288s)
- Root.tsx updated to match: `WHB_BUFFER_FRAMES = 30`, `WHB_TOTAL = 207 + ...`
- Narrations rewritten from ~55 words (POC) to ~90 words (production quality)

### Skill and Doc Updates
- `byg-edge-tts` skill: updated template script reference to `generate-white-hat-black-hat-audio-edge.mjs`; Duration Estimation section rewritten to describe mutagen measurement
- `workflow-principles.md`: added "Bias toward action" section — act without asking permission; only pause for merging to main, deploying to gh-pages, force-pushing, or posting to external services
- `byg-deploy` skill: added READ NOW pointer to `byg-github-repos.md`
- `byg` skill: added `byg-github-repos.md` to key file locations table
- `shutdown` skill: added `git push origin dev main` after commit in Step 7

### GitHub Repo Setup
- Discovered agent-test local git repo had never been pushed to GitHub (origin was pointing at claude-code-fun)
- Fixed: origin re-pointed to github.com/ewallt/agent-test; dev and main pushed
- Designed two-repo structure for BYG: `byg` (prod, ewallt.github.io/byg/) and `byg-dev` (staging)
- Each repo has `main` and `gh-pages` branches; byg starts README-only; byg-dev starts with BYG files from claude-code-fun gh-pages
- Documented in `Projects/BYG/documents/byg-github-repos.md` (for Claude) and `.html` (for Tom)
- `overview.md` updated with GitHub Repos section covering all three repos

---

## State Right Now

- Illustration 03 (WhiteHatBlackHat) timing is correct; not yet rendered or deployed
- `byg` and `byg-dev` repos designed but not yet created on GitHub
- agent-test is now backed up to GitHub (github.com/ewallt/agent-test)
- shutdown skill now pushes to GitHub at every session close

## Next Session Priority

Set up the `byg` and `byg-dev` GitHub repos. Create both repos on GitHub, initialize `byg` with a README only, and set up `byg-dev` with the current BYG files copied from claude-code-fun's gh-pages branch. Full design is documented in `Projects/BYG/documents/byg-github-repos.md` — read that first before starting.

## Other Items

Nothing blocked. No other items flagged.

## Session Start

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`

Workflow: Behold Your God
