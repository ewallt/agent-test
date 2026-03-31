# Behold Your God — Project Definition

Based on F.T. Wright's book *Behold Your God*. The project produces a series of 10 animated
illustration videos (one per book chapter/illustration) and a companion web app that ties them
together with an interactive explorer and flashcard review.

---

## What the Project Is

A two-part delivery:

1. **Videos** — Short animated explainer videos, one per illustration. Built in Remotion using
   the animated SVG doodle format established by Illustration 01 (dark background, spring-animated
   SVG drawings, per-bullet reveals). Source: `Projects/Remotion/simple-narrated-slides/`.

2. **Web App** — A single bundled HTML file (`behold-your-god.html`) with three tabs:
   - **Illustrations** — lists all 10 videos; links to wrapper pages for completed ones
   - **Explorer** — AI-generated knowledge explorer and quiz
   - **Flashcards** — card-based review of key concepts
   File: `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html`

---

## The 11 Illustrations

| # | Title | Slug | Status |
|---|-------|------|--------|
| 00 | The King They Made and Killed | `king-they-made-and-killed` | ⬜ Not started |
| 01 | The Nuclear Power Plant | `nuclear-plant` | ✅ Complete (v5) |
| 02 | God Is Not a Criminal | `god-not-criminal` | ✅ Complete (v1) |
| 03 | White Hat, Black Hat | `white-hat-black-hat` | 🔄 In progress (render + deploy pending) |
| 04 | The Father, the Son, and the Gun | `father-son-gun` | ⬜ Not started |
| 05 | The Father of the Prodigal Son | `father-prodigal-son` | ⬜ Not started |
| 06 | Rods and Serpents | `rods-and-serpents` | ⬜ Not started |
| 07 | The Boeing 747 | `boeing-747` | ⬜ Not started |
| 08 | The Cross as the Dividing Line | `cross-dividing-line` | ⬜ Not started |
| 09 | Interpreting God's "Destruction" | `interpreting-destruction` | ⬜ Not started |
| 10 | The Law as God's Character | `law-gods-character` | ⬜ Not started |

---

## Folder Structure

```
Projects/BYG/
├── documents/
│   ├── project-definition.md     ← this file
│   └── knowledge-base.md         ← BYG content reference (NotebookLM-sourced)
└── illustrations/
    ├── 01-nuclear-plant/
    │   └── notes.md              ← script notes, source refs, render/deploy log
    ├── 02-god-not-criminal/
    └── ... (03–10)
```

Video source files live in the Remotion project, not here:
```
Projects/Remotion/simple-narrated-slides/src/
    NuclearPlant.tsx              ← Illustration 01
    GodNotCriminal.tsx            ← Illustration 02 (to be built)
    WhiteHatBlackHat.tsx          ← ...
    FatherSonGun.tsx
    FatherProdigalSon.tsx
    RodsAndSerpents.tsx
    Boeing747.tsx
    CrossDividingLine.tsx
    InterpretingDestruction.tsx
    LawGodsCharacter.tsx
```

---

## Naming Conventions

| Artifact | Pattern | Example |
|----------|---------|---------|
| Remotion TSX | `{PascalCaseName}.tsx` | `GodNotCriminal.tsx` |
| Wrapper HTML | `byg-{slug}.html` | `byg-god-not-criminal.html` |
| MP4 | `{slug}-v{n}.mp4` | `god-not-criminal-v1.mp4` |
| gh-pages subfolder | `notebooklm/byg-{slug}/` | `notebooklm/byg-god-not-criminal/` |
| BYG illustration folder | `{nn}-{slug}/` | `02-god-not-criminal/` |

Version numbers on MP4 files are bumped on every deploy (CDN cache-busting).

---

## Workflow: Building a New Illustration Video

For each new illustration (02–10):

1. **Write the script** — Consult `documents/knowledge-base.md` and the per-illustration
   `notes.md`. Define the bullet points and doodle concepts.

2. **Create the TSX file** — Copy `NuclearPlant.tsx` as the template. Adapt for the new
   illustration's content, doodles, and bullet sequence.
   File: `Projects/Remotion/simple-narrated-slides/src/{Name}.tsx`

3. **Register in Root.tsx** — Add the new composition to
   `Projects/Remotion/simple-narrated-slides/src/Root.tsx`.

4. **Preview in Studio** — Check at `http://localhost:3001`.

5. **Render** — From `Projects/Remotion/simple-narrated-slides/`:
   ```bash
   npx remotion render {CompositionId} {slug}-v1.mp4
   ```

6. **Create wrapper HTML** — Copy `byg-nuclear-plant.html` as the template. Update title,
   description, and MP4 src. Save as `ephemeral-notebook/apps/byg-{slug}.html`.

7. **Deploy to gh-pages** — Use the `gh-pages-deploy` skill to push:
   - `{slug}-v{n}.mp4` → `notebooklm/byg-{slug}/`
   - `byg-{slug}.html` → `notebooklm/byg-{slug}/`

8. **Update the web app** — In `behold-your-god.html`, change the illustration's
   "Coming Attraction" badge to "▶ Watch" and add the link to the wrapper page.

9. **Update status table** — Mark the illustration complete in this file.

10. **Write notes.md** — Record the script, doodle descriptions, and render/deploy log
    in `illustrations/{nn}-{slug}/notes.md`.

---

## Future Work

- Finish illustration videos 02–10 (tracked as ticket `sns-4`)
- Possible additional tabs in the web app
- Knowledge base (`documents/knowledge-base.md`) — sourced from BYG NotebookLM notebooks

---

## Related Files

| File | Purpose |
|------|---------|
| `Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html` | Main web app |
| `Projects/NotebookLM/ephemeral-notebook/apps/byg-nuclear-plant.html` | Illustration 01 wrapper |
| `Projects/Remotion/simple-narrated-slides/src/NuclearPlant.tsx` | Illustration 01 source |
| `memory/remotion-context.md` | Remotion project details |
