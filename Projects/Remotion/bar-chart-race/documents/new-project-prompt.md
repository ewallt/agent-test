# Prompt: Generate a Bar Chart Race Project

Use this prompt verbatim (filling in the bracketed section) to ask another AI to produce the data files for a new bar chart race video.

---

## PROMPT START

You are generating data files for a bar chart race video. The topic is:

**[DESCRIBE THE TOPIC HERE — e.g. "Streaming service subscriber counts (millions), 2010–2024, covering Netflix, Hulu, Amazon Prime Video, Disney+, Apple TV+, HBO Max, Peacock, and Paramount+"]**

Research accurate data and produce four TypeScript files as described below. Output each file as a fenced code block labeled with its filename.

---

### Types (for reference — do not output this file)

```ts
interface ModelEntry {
  model: string;   // the name shown on the bar (e.g. "Netflix")
  lab: string;     // the category/group (used for color lookup; often same as model)
  date: string;    // YYYY-MM-DD
  mmlu: number;    // the numeric value being charted
}

interface StoryCard {
  trigger: string; // must exactly match a model name in entries
  title: string;   // short headline (≤ 8 words)
  body: string;    // 1–2 sentences of context
}
```

---

### File 1: `entries.ts`

Export a named array `entries: ModelEntry[]`.

Rules:
- Include data points at meaningful milestones or annual intervals.
- All dates must be unique. If two items share a calendar year, use different month/day dates (e.g. one on Dec 1, another on Dec 15, another on Dec 31).
- Sort order does not matter — the engine sorts by date automatically.
- Aim for 30–60 total entries. More entries = longer video.

```ts
import { ModelEntry } from '../../src/engine/types';
export const entries: ModelEntry[] = [ ... ];
```

---

### File 2: `categories.ts`

Export a `categories` object mapping each `lab` name to a hex color.

Available palette (choose one color per group; two groups may share a color if they are related):

| Color     | Hex       |
|-----------|-----------|
| teal      | #10a37f   |
| red       | #e05252   |
| blue      | #4285f4   |
| eggshell  | #e0e0e0   |
| purple    | #a855f7   |
| orange    | #f97316   |
| yellow    | #eab308   |

```ts
export const categories: Record<string, string> = { ... };
```

---

### File 3: `metadata.ts`

```ts
export const metadata = {
  id: 'SomeCamelCaseId',        // unique composition ID, no spaces
  title: 'Full title for display',
  valueSuffix: '%',             // suffix shown after each bar value — use 'M' for millions, 'B' for billions, '%' for percentages, etc.
};
```

---

### File 4: `story-cards.ts`

Export a `storyCards: StoryCard[]` array with 4–8 narrative cards.

**Critical constraint — read carefully:**

The engine sorts all entries by date. Each `trigger` fires on the *first* entry with that model name in the sorted list. Cards are displayed in trigger order with no gaps.

The minimum card display time is 90 frames (3 seconds). Each entry occupies 45 frames. Therefore:

> Between any two consecutive trigger models, there must be **at least 2 entries** (from any model) that appear between their first occurrences in the date-sorted list.

**How to verify:** Write out all entries sorted by date. Find the index of the first occurrence of each trigger model. The difference in indices between consecutive triggers must be ≥ 2.

If a gap would be too small, either:
- Remove one of the story cards, or
- Add a filler data entry between the two trigger dates to widen the gap.

```ts
import { StoryCard } from '../../src/engine/types';
export const storyCards: StoryCard[] = [ ... ];
```

---

### Summary checklist before outputting

- [ ] All dates are unique across the entire entries list
- [ ] `lab` names in entries exactly match keys in `categories`
- [ ] Story card `trigger` values exactly match `model` names in entries
- [ ] Consecutive story card triggers have ≥ 2 entries between their first occurrences
- [ ] `valueSuffix` matches the unit of measurement
- [ ] 30–60 total entries

## PROMPT END
