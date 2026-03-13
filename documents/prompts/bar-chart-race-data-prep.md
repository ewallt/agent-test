# Bar Chart Race — Data Preparation Prompt

Use this prompt when asking another AI to prepare data for a bar chart race video.
Fill in the bracketed fields before sending.

---

## Context (fill in before sending)

```
Topic:                  [e.g. "Largest U.S. cities by population"]
Time range:             [e.g. "1960 to 2025"]
Target video length:    [e.g. "5 minutes"]
Render mode:            [sequential | simultaneous]
Priority:               [fidelity | watchability | balanced]
Preferred cadence:      [e.g. "every year", "every 5 years", "key milestones only"] (optional)
Prefer new entrants:    [true | false] (optional — true means favour datasets where new items enter over time)
```

---

## Prompt

I need you to prepare data for an animated bar chart race video. Your job is to produce structured JSON — I will handle the code, display formatting, colors, and narrative.

### Inputs

```
Topic:                  [TOPIC]
Time range:             [TIME RANGE]
Target video length:    [TARGET VIDEO LENGTH]
Render mode:            [RENDER MODE]
Priority:               [PRIORITY]
Preferred cadence:      [CADENCE]
Prefer new entrants:    [TRUE/FALSE]
```

**Render mode explained:**
- `sequential` — each item enters once at its own date; best when each entry is a discrete event (a product release, a record broken, a model launched)
- `simultaneous` — all items update together each period; best when all items are tracked on the same regular cadence (annual rankings, monthly metrics)

**Priority explained:**
- `fidelity` — prefer real sourced figures; use lower cadence if needed to avoid interpolation
- `watchability` — prefer smooth animation; interpolate freely to hit the target video length
- `balanced` — anchor years from real sources, intermediate years interpolated

### What I need from you

Produce a JSON object with the following structure:

```json
{
  "id": "CompositionId",
  "title": "Human-readable title for the video",
  "unit": "persons",
  "dataQuality": "Anchor years from US Census (1960–2020). Intermediate years linearly interpolated.",
  "categories": ["Category A", "Category B"],
  "entries": [
    {
      "model": "Item Name",
      "lab": "Category A",
      "date": "YYYY-MM-DD",
      "value": 42500,
      "estimated": true
    }
  ]
}
```

### Field rules

**id** — CamelCase, no spaces. Example: `UsCities`, `AiMmlu`.

**title** — Full human-readable title shown in the video.

**unit** — Plain-English description of what the values measure. Examples: `"persons"`, `"percent"`, `"millions of subscribers"`, `"meters"`.

**dataQuality** — One sentence on sourcing and method. Examples:
- `"All values from official sources. No interpolation."`
- `"Anchor years from census data. Intermediate years linearly interpolated."`
- `"Approximate figures from general knowledge. No primary sources consulted."`

**categories** — Flat list of all group names used in entries. I assign colors. Use meaningful groupings — region, company, country, etc.

**entries** — One object per data point:
- `model` — bar label. Must be consistent across all time points for the same item.
- `lab` — category. Must exactly match one of the strings in `categories`.
- `date` — ISO format `YYYY-MM-DD`. Use April 1 for annual/census data (`1990-04-01`). Use actual event date when known.
- `value` — raw number in the natural unit for the domain. Do not pre-scale. Do not add suffixes. Examples: `7781984` for a population, `86.4` for a percentage score.
- `estimated` — `true` only for interpolated intermediate years or genuinely uncertain figures. Omit (or set `false`) for anchor years and sourced values. Do NOT set `true` on every row — if the whole dataset is approximate, say so in `dataQuality` instead.

### Coverage rules

- Include every item from the first time point it becomes notable.
- Include every subsequent time point for that item through the end of the dataset.
- **Aim for 15–25 distinct items total.**
- **Cadence guidance:** choose a cadence that puts the total entry count in the right range:
  - Sequential mode: aim for (items × periods) ≤ 500. Flag if going over — do not truncate.
  - Simultaneous mode: aim for unique time periods ≤ 300. Flag if going over — do not truncate.
  - For a 5-minute target at standard pacing, ~200 entries (sequential) or ~150 periods (simultaneous) is a reasonable starting point.

### What you do NOT need to provide

- Colors (I assign these)
- Display scaling or suffixes (I decide how values are formatted and displayed)
- Narrative text / story cards (I write these)
- Any code or TypeScript

### Example (partial)

```json
{
  "id": "UsCities",
  "title": "Largest U.S. Cities — 1900 to 2020",
  "unit": "persons",
  "dataQuality": "Anchor years from US Census (1900–2020). Intermediate years linearly interpolated.",
  "categories": ["Northeast", "Midwest", "South", "West"],
  "entries": [
    { "model": "New York",  "lab": "Northeast", "date": "1900-04-01", "value": 3437202 },
    { "model": "Chicago",   "lab": "Midwest",   "date": "1900-04-01", "value": 1698575 },
    { "model": "New York",  "lab": "Northeast", "date": "1901-04-01", "value": 3520000, "estimated": true },
    { "model": "Houston",   "lab": "South",     "date": "1920-04-01", "value": 138276  }
  ]
}
```

### Final check before submitting

- Every `lab` value in `entries` appears in `categories`
- All `date` values are valid ISO strings in `YYYY-MM-DD` format
- Values are raw numbers in a consistent unit throughout
- No duplicate `model` + `date` combinations
- `unit` and `dataQuality` are both present
- `estimated` is used selectively, not on every row
