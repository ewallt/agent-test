# Restore Notebook Sources

Three notebooks had sources deleted by the "Notebooks in Gemini" two-way sync.
When ready to restore, re-upload all local files listed below and delete the Gemini chat sources.
Any missing sources need to be written from general knowledge before uploading.

All local source files are in: `Projects/NotebookLM/playlists/sources/`

---

## Big Ideas — `1dbe88d0-ca46-4a0a-b02e-5d1401af380e`

**All 7 sources are local — nothing to write.**

Local files to re-upload:
- `black-swan-taleb.md`
- `blink-gladwell.md`
- `drive-pink.md`
- `predictably-irrational-the-hidden-forces.md`
- `the-power-of-habit-the-loop.md`
- `thinking-fast-and-slow-kahneman.md`
- `thinking-in-systems-the-world-is-a-loop.md`

Gemini chat sources to delete:
- `11db35a8` — "Building Layered Reader Web App"

Keep:
- `ce91f8a1` — `thinking-in-systems-the-world-is-a-loop.md` (already present, may be duplicate after re-upload — check)

---

## WW2 — `dc673f24-f901-4f9d-bd72-47016c90ca6f`

**7 of 8 sources are local. 1 unknown — needs identification.**

Local files to re-upload:
- `garbo-double-cross.md`
- `ww2-battle-of-britain.md`
- `ww2-battle-of-the-atlantic-codebreaking.md`
- `ww2-kasserine-pass.md`
- `ww2-operation-mincemeat.md`
- `ww2-wages-of-destruction.md`
- `ww2-why-allies-won-overy.md`

Missing (1): unknown — check the video dashboard for WW2 card titles not covered by the 7 files above.

Gemini chat sources to delete:
- `d9147e84` — "Build Layered Reader App"
- `2707c019` — "Layered Reader Web App Build"

Keep:
- `577208ba` — `ww2-kasserine-pass.md` (already present, may be duplicate after re-upload — check)

---

## History Potpourri — `b0d9a7b6` *(confirm full ID)*

**13 of ~18 sources are local. ~5 need to be written from general knowledge.**

Local files to re-upload:
- `aristarchus-the-1800-year-gap.md`
- `antikythera-the-corroded-lump.md`
- `troy-schliemann-dug-where-homer-said.md`
- `wiles-fermats-last-theorem.md`
- `history-able-archer-83.md`
- `history-adams-jefferson-july4.md`
- `history-columbus-wrong-math.md`
- `history-pacemaker-wrong-resistor.md`
- `history-paradoxes-small-reveal-big.md`
- `history-penicillin-forgotten-dish.md`
- `history-probability-one-idea.md`
- `history-sarajevo-wrong-turn.md`
- `history-titanic-novel.md`

Missing (~5): Check the video dashboard for History Potpourri card titles not covered by the 13 files above. Write source docs from general knowledge for each missing one, then upload.

Gemini chat sources: audit notebook first to identify and delete.

---

## Steps when ready

1. For each notebook: run `nlm list sources <full-id>` to see current state
2. Delete Gemini chat sources
3. Re-upload all local files: `PYTHONIOENCODING=utf-8 nlm add source <notebook-id> --file <path>`
4. Write any missing source docs, upload those too
5. Check for duplicate entries (same content uploaded twice) and remove extras
