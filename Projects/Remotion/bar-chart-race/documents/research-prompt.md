# Prompt: Research Data for a Bar Chart Race

## PROMPT START

I am building a bar chart race video and need you to research the data for it.

**Topic:** [DESCRIBE THE TOPIC — or ask the AI to suggest one, see note below]

---

## What I need

### 1. Data table

A CSV table of data points with these columns:

```
model,lab,date,value
```

- `model` — the name shown on the bar (e.g. "Netflix")
- `lab` — the group/category; use the same as model unless multiple models belong to one group
- `date` — YYYY-MM-DD; **every row must have a unique date** — if two entities have data for the same year, give each a different month/day (e.g. Dec 1, Dec 15, Dec 31)
- `value` — the numeric value; use a consistent unit throughout (e.g. all in millions)

Aim for 30–60 rows total across all entities. Use annual snapshots or key milestones.
Note any rows where you are uncertain about the data with an asterisk on the model name (e.g. `Netflix*`).

---

### 2. Story card suggestions

4–8 notable moments to highlight in the video. Format as a table:

```
trigger,title,body
```

- `trigger` — must exactly match a model name from the data table above
- `title` — 8 words or fewer
- `body` — 1–2 sentences of context

**Important:** Story cards fire at the moment an entity first appears in the data. Choose triggers that are spread throughout the timeline, not clustered at the start. If two triggers would fire close together (within 2 data rows of each other), drop one of them.

---

### 3. Metadata

- **Title:** a short display title for the video
- **Value unit:** what the numbers represent (e.g. "millions of subscribers", "% market share", "billion dollars revenue") — I'll use this for the axis label
- **Color suggestions:** for each entity, suggest one of these colors: teal, red, blue, eggshell, purple, orange, yellow, pink, cyan, lime. Two entities may share a color only if they are meaningfully related.

---

## Output format

Please output the three sections in order, clearly labeled, with the CSV tables as plain text (no extra formatting inside the tables).

## PROMPT END

---

*Note: If you want the AI to suggest the topic, replace the topic line with:*
*"Suggest 3 topics for a bar chart race video. Each should have clear numeric data over time, at least 5 competing entities, and a compelling story arc. Give me the topic name and a one-sentence pitch. Then ask me to choose one before continuing."*
