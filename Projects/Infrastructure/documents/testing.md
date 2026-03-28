# Testing — State of the Shop

*Last updated: 2026-03-28*

---

## What We Have

### Three Remotion projects, each with a `tests/` folder

| Project | Test files | Framework |
|---------|-----------|-----------|
| `bar-chart-race` | `structure.test.ts`, `compute.test.ts` | Vitest |
| `simple-narrated-slides` | `structure.test.ts` | Vitest |
| `whiteboard-explainer` | `structure.test.ts` | Vitest |

All tests run via `npm test` in each project. `promote.sh` runs all three in sequence and blocks the dev→main merge if any fail.

---

### Type 1 — Structural tests (all three projects)

**What they do:** Assert that key files exist — source files, audio assets, config files, documentation.
**What they catch:** Accidentally deleted files, botched refactors, renamed files that break imports, missing assets.
**Verdict:** ✅ Good pattern. Simple, fast, and highly effective at catching snafus before they reach production.

**Current gaps:**
- `simple-narrated-slides/structure.test.ts` is stale — it only knows about Britain1940 and BattleOfAtlantic. NuclearPlant and GodNotCriminal (and all future BYG compositions) are not covered. Any new TSX file, durations file, or audio folder added for BYG is invisible to the test suite.
- `bar-chart-race/structure.test.ts` includes `us-cities` and `us-top-10-cities` in its data project list — these may be partial/incomplete projects that haven't been wired up yet.

---

### Type 2 — Logic/unit tests (`bar-chart-race` only)

**File:** `bar-chart-race/tests/compute.test.ts`
**What they do:** Test the computation engine (`compute.ts`) that drives the bar chart race — keyframe building, frame count arithmetic, card scheduling, sort order, rank assignment.
**What they catch:** Regressions in the core animation logic; ensures computed values match expected output against the real AI MMLU dataset.
**Verdict:** ✅ Excellent. This is the right level of testing for a non-trivial algorithm. Tests are specific (frame counts, sort order, contiguity) and include regression anchors against known values (e.g., "Mistral 7B trigger = frame 270").

**Notably absent from other projects:** `simple-narrated-slides` and `whiteboard-explainer` have no logic tests. This is reasonable — they don't have the same kind of stateful computation engine. But see gaps below.

---

### The promote gate (`promote.sh`)

**What it does:** Runs all three test suites before merging dev→main. Fails fast with `set -e`.
**Verdict:** ✅ Good practice. Enforces that no broken state reaches main.

**Current gap:** It only covers the three Remotion projects. The web app files (BYG HTML, wrapper pages) and any tool scripts have no test coverage at all.

---

## What's Missing or Should Be Reworked

### 1. `simple-narrated-slides` structural tests are stale *(fix soon)*

The tests don't know about BYG. Every time a new illustration is added, the tests should be updated to cover:
- The new `.tsx` file
- The new durations `.ts` file
- The audio folder and its MP3 files

**Fix:** Update `structure.test.ts` after each new BYG illustration is completed. Consider a pattern that loops over a `BYG_COMPOSITIONS` array so adding a new one is a one-line change.

---

### 2. No tests for the BYG web app or wrapper pages *(nice to have)*

`behold-your-god.html` and the per-illustration wrappers are deployed HTML files. There is no automated check that:
- All expected tabs are present
- Illustration links point to real deployed URLs
- The version string is correct
- Completed illustrations show `▶ Watch` and coming ones show `Coming Attraction`

**Fix:** A lightweight Node script (no framework needed) that reads the HTML and asserts expected strings/patterns. Could live in a new `Projects/BYG/tests/` folder and be added to `promote.sh`.

---

### 3. No duration-sanity test for narrated slides *(medium priority)*

Each BYG composition has a durations file (e.g. `god-not-criminal-durations.ts`) with computed MP3 lengths. There is no test that:
- The audio file actually exists for each duration entry
- The computed duration is within a reasonable range (e.g. > 5s, < 120s per slide)
- The `TITLE_FRAMES` constant is sufficient to cover the title MP3

The title clip issue found today (word cut off) would have been caught by a test comparing `TITLE_FRAMES / fps` against the title MP3 file size estimate.

**Fix:** Add a `durations.test.ts` to `simple-narrated-slides` that cross-checks durations files against the presence and approximate size of audio files.

---

### 4. No integration/render smoke test *(low priority, high effort)*

There is no test that actually invokes Remotion and verifies a composition renders without error. This would be expensive (full render takes 1–2 minutes) but a headless single-frame render smoke test is feasible:

```bash
npx remotion render GodNotCriminal --frames=0 smoke.png
```

**Verdict:** Probably not worth the CI overhead right now. The Studio preview step in the workflow is the practical substitute.

---

### 5. No test for `promote.sh` itself *(low priority)*

The promote script has no test. If someone edits it and breaks the merge logic, it wouldn't be caught. Low risk since the file rarely changes.

---

## Recommended Priority Order

| Priority | Action |
|----------|--------|
| 1 — Fix now | Update `simple-narrated-slides/structure.test.ts` to cover NuclearPlant and GodNotCriminal (and establish the pattern for future BYG additions) |
| 2 — Next pass | Add `durations.test.ts` to `simple-narrated-slides` — cross-check durations vs. audio files, catch title frame underruns |
| 3 — Later | Add BYG web app HTML assertions (check tabs, badges, links) |
| 4 — Optional | Single-frame render smoke test |

---

## Test Count Reference

Current count (as of last promote.sh run): **99 tests across three projects.**

| Project | Approx. tests |
|---------|--------------|
| `bar-chart-race` | ~55 (structure + compute) |
| `simple-narrated-slides` | ~25 (structure only) |
| `whiteboard-explainer` | ~19 (structure only) |

After updating `simple-narrated-slides` for BYG, the count will grow as each illustration is added.
