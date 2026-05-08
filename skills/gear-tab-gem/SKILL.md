---
name: gear-tab-gem
description: Build a Gemini Gem that generates gear-tab React web apps in Canvas. Use when Tom wants to create a new Gem for any subject — e.g. "make a gem for restaurants", "build a gear-tab gem for historical battles", "create a gem like the city explorer but for X". Produces two files: an instructions .md and a reference .jsx. These are the only inputs the Gem needs to work.
---

# Gear-Tab Gem Builder

Produces the two files needed to make a Gemini Gem that generates gear-tab React apps in Canvas. When a user types a subject name into the Gem (e.g. a city, a battle, a restaurant), Gemini generates a complete tabbed app.

**Output:**
- `[subject]-instructions.md` — paste into the Gem's Instructions field
- `[subject]-reference.jsx` — attach to the Gem as a knowledge file

Save both to: `/Users/tom/Documents/agent-test/Projects/Gems/[subject-name]/`

---

## Step 1 — Understand the subject

Identify:
- **Subject** — what the Gem is about (e.g. cities, historical battles, restaurants)
- **Gem name** — a short identity for the Gem (e.g. "City Explorer", "WarRoom", "Table Scout")
- **Role description** — one phrase describing what the Gem does (e.g. "an urban historian", "a battle analyst", "a culinary guide")
- **Output description** — what it generates (e.g. "comprehensive city guide apps", "military engagement reports", "restaurant discovery apps")

If any of these are unclear from Tom's request, propose them and confirm in one message.

---

## Step 2 — Derive the schema

READ NOW: `references/schemas/city.md`

Use the city schema as the canonical model. For a new subject, derive an analogous 5-section schema where:
- Each section becomes one tab
- Each section is an array of objects with exactly 3 fields
- Field 1 = title (rendered in --brand color)
- Field 2 = body text or secondary description
- Field 3 = note, pill, or location tag

The city schema is the gold standard — new schemas should feel as natural and specific to their subject as the city schema does to cities.

---

## Step 3 — Write the instructions doc

READ NOW: `references/instructions-template.md`

Write `[subject]-instructions.md` following the template exactly. Fill in the Gem name, role, output description, five tab definitions, and the subject-specific fill instruction at the end.

---

## Step 4 — Write the reference .jsx

READ NOW: `references/design-system.md`

Write `[subject]-reference.jsx` using the design system verbatim for all structural elements (CDN tags, THEMES constant, useEffect, sub-components, App shell). The only parts that vary per subject are:
- `const DATA` — populated with real example data for one representative instance
- Tab component card layouts — field names and rendering match the schema from Step 2
- Gem name and tagline in the header

The reference file must be a complete, working app. Use a well-known, rich example (e.g. for cities: Rome; for battles: Gettysburg; for restaurants: a specific city's food scene).

---

## Step 5 — Tell Tom what to do next

READ NOW: `references/gem-process.md`

Report the two file paths and give Tom the steps to create the Gem.
