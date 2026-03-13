# Dev/Prod Environment

## Why This Exists

The bar-chart-race project was accidentally deleted during a folder restructure and had to be
reconstructed from scratch. To prevent this happening again, the agent-test folder is now a
git repository with a dev/prod branch structure and structural tests that gate promotion.

---

## Structure

### Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production — stable, tested state. Never commit here directly. |
| `dev` | Working branch — all changes happen here. |

All work by Claude happens on `dev`. Promotion to `main` is gated behind tests.

### Repository root

`C:\Users\tomew\Documents\agent-test` — the entire project is one git repo. This covers:
- All three Remotion projects
- The NotebookLM workflow
- Documents, memory references, workflow files

---

## Structural Tests

Each Remotion project has a `tests/structure.test.ts` file that verifies key files exist.
These are not functional tests — they're snafu protection. If a file gets accidentally deleted,
the test suite fails and the damage cannot reach `main`.

| Project | Test file | Tests |
|---------|-----------|-------|
| bar-chart-race | `tests/structure.test.ts` | 25 structural + 18 compute = 43 |
| simple-narrated-slides | `tests/structure.test.ts` | 35 |
| whiteboard-explainer | `tests/structure.test.ts` | 21 |
| **Total** | | **99** |

Run tests in any project with:
```bash
npm test
```

---

## Promoting Dev to Main

`promote.sh` at the agent-test root handles the full promotion flow:

```bash
bash promote.sh
```

What it does:
1. Runs `npm test` in all three Remotion projects
2. If all 99 tests pass, merges `dev` into `main` with a merge commit
3. Returns to `dev` branch

If any test fails, nothing is merged.

---

## Restoring from Main

If something gets broken or deleted on `dev`:

```bash
# Restore a single file
git checkout main -- path/to/file.ts

# Restore an entire folder
git checkout main -- Projects/Remotion/bar-chart-race/src/

# Nuclear option — reset dev to match main exactly
git checkout main
git branch -D dev
git checkout -b dev
```

---

## What Is and Isn't Tracked

### Tracked
- All source files (`.ts`, `.tsx`, `.js`, `.json`, `.md`, `.html`, etc.)
- MP3 audio files (ElevenLabs narrations, Suno music track)
- Documents, design docs, workflow files

### Not tracked (gitignored)
- `node_modules/` — reinstall with `npm install`
- `out/` and `*.mp4` — re-render with `npm run render`
- `.cache/` — Remotion webpack cache, auto-regenerated
- `.env` files — secrets never go in git

### Not in this repo
- Claude memory files at `~/.claude/projects/.../memory/` — these live outside agent-test
  and are managed separately by Claude Code's memory system

---

## Git Identity

Configured locally (not global):
- Name: Tom
- Email: ewalltom@gmail.com

---

## Daily Workflow

Claude works on `dev`. When a session produces stable, tested changes:
1. Run `bash promote.sh` from the agent-test root
2. If tests pass, `main` is updated
3. Continue working on `dev`

There is no requirement to promote after every session — promote when the state feels stable.
