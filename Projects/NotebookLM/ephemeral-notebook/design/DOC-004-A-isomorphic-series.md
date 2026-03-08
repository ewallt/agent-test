# DOC-004-A: Design Pattern — Isomorphic Item Series

## Status
Active — first implementation: Major Battles of WW2

---

## What This Pattern Is

A collection of isomorphic items — items of the same category, treated with the same lens — grouped into notebooks by a natural organizing principle. Each item gets one video. Notebooks may have different video counts depending on how items cluster.

**Isomorphic** means: the same questions are asked of every item. The category determines the lens; the lens is applied uniformly across all items.

---

## Recognition Criteria

Use Pattern 004-A when:
- The topic is a *collection* of comparable items, not a single subject
- Each item is bounded and self-contained (can be covered in one video)
- Items share a natural category (battles, states, species, figures, events)
- A common set of questions applies meaningfully to every item
- Items cluster into groups by an obvious organizing principle (geography, era, region, taxonomy)

Do NOT use Pattern 004-A when:
- Items are hierarchically related (use a pattern with an overview notebook)
- Items require different lenses to be meaningful
- The topic is better treated as a single narrative (use Pattern 003)

---

## Structure

- **One notebook per group** (theater, region, era, category subdivision)
- **One video per item**
- **Notebooks are peers** — no master notebook, no hierarchy
- **Videos are standalone** — each works independently; no assumed viewing order
- **Variable notebook size** — notebook video count follows natural grouping, not a fixed target

---

## The Common Lens

Before building, define the lens: the set of questions applied to every item. The lens should be:
- Specific enough to produce focused, distinctive videos
- Broad enough to apply meaningfully to every item in the collection
- Angle-oriented, not encyclopedic

The lens is translated into per-video `--focus` prompts at execution time. Each focus prompt is one tight directive — one item, one angle from the lens.

---

## Grouping Logic

Choose the grouping criterion that is:
- Obvious from the topic domain
- Produces notebooks of roughly 2-4 items (not 1, not 8)
- Creates coherent notebooks (items within a group feel related)

Common grouping criteria:
- **Geographic** — region, theater, country
- **Chronological** — era, phase, period
- **Taxonomic** — subcategory, type, class
- **Alphabetical** — fallback when no natural criterion exists

---

## Worked Example: Major Battles of WW2

**Category:** Individual battles
**Lens:** Why the battle was important; what was unique about it; surprising facts; how it shifted the arc of the war
**Grouping criterion:** Theater of war
**Execution:** One video per battle, grouped into theater notebooks

### Series

| Notebook | Theater | Battles | Videos |
|---|---|---|---|
| 1 | Western Europe | France, D-Day, Battle of the Bulge | 3 |
| 2 | Britain & Atlantic | Battle of Britain, Battle of the Atlantic | 2 |
| 3 | Mediterranean | North Africa, Sicily, Greece | 3 |
| 4 | Eastern Front | Stalingrad, Kursk, Operation Bagration | 3 |
| 5 | Pacific | Pearl Harbor, Midway, Philippines, Okinawa | 4 |

**Total: 5 notebooks, 15 videos**

### Lens Translation (focus prompt examples)
- "Why the fall of France was so swift and what it revealed about Allied unpreparedness"
- "The Battle of Britain as the first major campaign won entirely through air power"
- "Operation Bagration — why the largest Soviet offensive of the war is largely unknown in the West"
- "The Philippines: fall and recapture — MacArthur's promise, the Death March, and the return"

---

## Other Candidate Topics for 004-A

- States of the Union (50 items, grouped by region)
- Roman Emperors (grouped by dynasty or era)
- Supreme Court landmark cases (grouped by rights category)
- Major scientific discoveries (grouped by field)

---

## Notes

- Style: `retro_print` (default)
- Format: `explainer` (default)
- Depth: typically `deep` per item — each video is a focused treatment of one bounded subject
- Research query: scoped to the individual battle/item, not the full series
- New sub-patterns (004-B, 004-C, etc.) will be defined when a new structural approach is first implemented
