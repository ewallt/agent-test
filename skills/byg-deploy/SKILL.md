---
name: byg-deploy
description: Deploy BYG (Behold Your God) work from local to the dev branch. Use this skill whenever Tom says "deploy" in the context of BYG — a new illustration is ready, the web app was updated, or any BYG file has changed and needs to be committed to dev. This is the gate between local work and the GitHub dev branch. Covers automated testing, Tom's visual sign-off, version bumping, and the git commit. Do NOT skip this skill and commit manually — it ensures the version stays correct and tests pass before anything reaches dev.
---

# BYG Deploy — Local → Dev

**READ NOW: `Projects/BYG/documents/byg-github-repos.md`** — covers the two-repo structure (byg-dev, byg), what goes where, and the promotion workflow.

This skill moves completed BYG work from the local file system to the GitHub dev branch. It has two checkpoints: automated tests (you run) and visual review (Tom runs). Both must pass before committing.

---

## Step 1 — Identify what's being deployed

Before running anything, confirm the scope. Ask Tom if not clear:
- **New illustration** — a composition is complete (TSX, audio, durations, wrapper HTML, notes.md)
- **Web app update** — changes to `behold-your-god.html` only (new tab, badge update, style change, etc.)
- **Both** — illustration complete + web app updated in the same session

Note the illustration number and slug if applicable (e.g. "02 — god-not-criminal").

---

## Step 2 — Run automated tests

```bash
cd "C:/Users/tomew/Documents/agent-test/Projects/Remotion/simple-narrated-slides" && npm test
```

- If tests **pass**: continue to Step 3.
- If tests **fail**: stop. Show Tom the failure output. Do not proceed until fixed.

---

## Step 3 — Tom's visual sign-off

Tell Tom:

> "Tests passed. Please preview in Studio at **localhost:3001**, check the composition looks right, and confirm."

Wait for Tom's explicit go-ahead before continuing. Do not skip or assume approval.

---

## Step 4 — Bump the web app version

Open `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html` and find the version string:

```html
<span style="opacity:.4">v2.x</span>
```

Increment the minor version (e.g. v2.0 → v2.1, v2.1 → v2.2). Save the file.

---

## Step 5 — Stage and commit to dev

Confirm you're on the dev branch:
```bash
git branch --show-current
```

Stage all BYG-related changed files. Depending on scope:

**New illustration:**
```bash
git add \
  Projects/Remotion/simple-narrated-slides/src/{Name}.tsx \
  Projects/Remotion/simple-narrated-slides/src/{slug}-durations.ts \
  Projects/Remotion/simple-narrated-slides/tests/structure.test.ts \
  Projects/NotebookLM/ephemeral-notebook/apps/byg-{slug}.html \
  Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html \
  Projects/BYG/illustrations/{nn}-{slug}/notes.md \
  Projects/BYG/documents/project-definition.md
```

**Web app update only:**
```bash
git add Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html
```

Do NOT use `git add -A` or `git add .` — stage only BYG-related files explicitly.

Commit with a descriptive message:

- New illustration: `byg: Illustration {nn} — {Title} complete (v{minor})`
- Web app update: `byg: web app v2.{minor} — {brief description}`
- Both: `byg: Illustration {nn} complete + web app v2.{minor}`

Example:
```bash
git commit -m "byg: Illustration 02 — God Is Not a Criminal complete (v2.1)"
```

---

## Step 6 — Confirm

Run `git log --oneline -3` and show Tom the result. Done.

---

## Key paths

| File | Path |
|------|------|
| Web app | `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html` |
| Remotion project | `Projects/Remotion/simple-narrated-slides/` |
| BYG illustrations | `Projects/BYG/illustrations/` |
| Project definition | `Projects/BYG/documents/project-definition.md` |
