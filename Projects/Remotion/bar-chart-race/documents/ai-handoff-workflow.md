# Using Another AI to Create New Bar Chart Race Projects

## The idea

The data files for each project (entries, categories, story cards, metadata) are pure content —
no engine knowledge required. Another AI can research the data and write all four files. You
drop them in, run two commands, and the video is ready to preview.

## What the other AI produces

Four TypeScript files:

```
data/{project-name}/entries.ts       — the data points
data/{project-name}/categories.ts    — color assignments
data/{project-name}/metadata.ts      — title, id, value suffix
data/{project-name}/story-cards.ts   — narrative cards
```

## What you do with them

1. Create the folder: `data/{project-name}/`
2. Paste in the four files
3. Run:
   ```
   npm run build -- {project-name}
   cp staging/{project-name}.ts active/data.ts
   ```
4. Refresh the studio at http://localhost:3000

That's it. The composition appears and you can scrub through it.

## When you need me

Only if something went wrong:
- A story card trigger name doesn't match any entry (card never shows)
- A story card gap is too small (card flashes and disappears)
- A date collision causes two entries to appear at the same frame
- A compile error (wrong TypeScript shape)

The tests (`npm test`) and build will catch most of these and give clear error messages.

## Getting topic suggestions from the other AI

The prompt in `documents/new-project-prompt.md` expects you to fill in the topic. If you want
the other AI to suggest topics too, do it in two steps:

**Step 1** — ask for suggestions:
> "Suggest 5 topics for a bar chart race video. Each should have clear numeric data over time,
> at least 5 competing entities, and a compelling story arc. Give me the topic name and a
> one-sentence pitch for each."

**Step 2** — once you pick one, paste the full prompt from `new-project-prompt.md` with the
topic filled in.

## What makes a good topic

- At least 5 competing entities (more is better)
- Numeric data that changes meaningfully over time (not flat lines)
- A story arc — a clear leader, a challenger, a surprise
- Data that is publicly available and well-documented (so the AI gets it right)

Good examples: market share, revenue, subscriber counts, population, sports records, box office.
Bad examples: things with sparse data, things that barely change, things only measurable at a
single point in time.

## The one thing to watch

The gap constraint on story cards is the trickiest rule for another AI to get right. It means:
when you sort all entries by date, the first occurrence of each trigger model must be at least
2 entries apart from the next trigger. If this is violated, a story card will flash on screen
for less than 3 seconds, which looks bad.

The prompt explains this, but it's worth glancing at the story card triggers when you receive
the files — just mentally walk down the sorted entry list and confirm there are at least 2
entries between each consecutive pair of triggers.

A future improvement would be a `npm run validate -- {project-name}` command that checks all
rules automatically before you open the studio.
