# Agent Task: Create a New Bar Chart Race Project

## Instructions for the agent

You are creating a new bar chart race video project. Complete all steps below in order.
Do not stop to ask for confirmation unless you hit an error you cannot resolve.

---

## Step 1 — Choose a topic

Pick a topic for the bar chart race. A good topic has:
- At least 5 competing entities (people, companies, countries, products, etc.)
- Numeric data that changes meaningfully over time
- A story arc — a leader, a challenger, a surprise moment
- Publicly available, well-documented data

Suggest 3 candidate topics with a one-sentence pitch each, then choose the best one and
proceed with it. State your choice before continuing.

---

## Step 2 — Research the data

Research accurate historical data for your chosen topic. You will need:
- The entities being tracked (5–8 is ideal)
- Numeric values at meaningful intervals (annual is typical; use milestones where interesting)
- Dates in YYYY-MM-DD format

**Date rule:** Every entry must have a unique date. If multiple entities have data for the
same calendar year, give each a different month/day date within that year (e.g. Dec 1,
Dec 15, Dec 31). This is required — duplicate dates will break the video.

Aim for 30–60 total entries across all entities.

---

## Step 3 — Plan the story cards

Choose 4–8 narrative moments to highlight (e.g. a launch, a milestone, a leadership change).
Each card is triggered by the first appearance of a named entity in the date-sorted entry list.

**Gap rule:** Sort all your entries by date. Find the index of the first occurrence of each
trigger entity. Consecutive trigger indices must differ by at least 2. If a gap is too small,
either drop that story card or insert an extra data entry between the two trigger dates to
widen the gap.

Verify this before writing any files.

---

## Step 4 — Choose a project name

Pick a short, lowercase, hyphenated project name (e.g. `streaming-wars`, `space-race`,
`social-media-growth`). This will be used as the folder name and in commands.

---

## Step 5 — Write the files

Working directory: `C:\Users\tomew\Documents\bar-chart-race`

Create the folder `data/{project-name}/` and write these four files:

### `data/{project-name}/entries.ts`

```ts
import { ModelEntry } from '../../src/engine/types';

export const entries: ModelEntry[] = [
  { model: '...', lab: '...', date: 'YYYY-MM-DD', mmlu: 0 },
  // ...
];
```

- `model` — the name shown on the bar
- `lab` — the group/category (used for color; often same as model)
- `date` — YYYY-MM-DD, must be unique across all entries
- `mmlu` — the numeric value (despite the field name, this is your actual metric)

---

### `data/{project-name}/categories.ts`

```ts
export const categories: Record<string, string> = {
  'Entity Name': '#hexcolor',
  // ...
};
```

Map each `lab` name to a hex color. Choose from this palette
(two entities may share a color only if they are meaningfully related):

| Name      | Hex     |
|-----------|---------|
| teal      | #10a37f |
| red       | #e05252 |
| blue      | #4285f4 |
| eggshell  | #e0e0e0 |
| purple    | #a855f7 |
| orange    | #f97316 |
| yellow    | #eab308 |

---

### `data/{project-name}/metadata.ts`

```ts
export const metadata = {
  id: 'CamelCaseId',
  title: 'Full display title',
  valueSuffix: '%',  // '%', 'M', 'B', 'K', or whatever unit fits
};
```

---

### `data/{project-name}/story-cards.ts`

```ts
import { StoryCard } from '../../src/engine/types';

export const storyCards: StoryCard[] = [
  {
    trigger: 'Entity Name',  // must exactly match a model name in entries
    title: 'Short headline', // 8 words or fewer
    body: 'One or two sentences of context.',
  },
  // ...
];
```

---

## Step 6 — Build and test

Run these commands from `C:\Users\tomew\Documents\bar-chart-race`:

```
npm run build -- {project-name}
npm test
```

If the build fails, read the error and fix the files before continuing.
If tests fail, read the output — a gap constraint violation will show up here.

---

## Step 7 — Activate

```
cp staging/{project-name}.ts active/data.ts
```

---

## Step 8 — Report

Tell the user:
- The topic you chose and why
- How many entries were created and across how many entities
- The story cards and the approximate time each appears (entry index × 1.5 seconds)
- Any data you were uncertain about and marked as estimated
