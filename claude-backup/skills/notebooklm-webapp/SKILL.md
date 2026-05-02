---
name: notebooklm-webapp
description: >
  Build the standalone HTML web app companion for a NotebookLM notebook. Use this skill whenever a NotebookLM
  run includes `app: yes`, or when Tom asks to build an interactive web app for a notebook topic. The app is
  always a single-file HTML saved to Projects/NotebookLM/ephemeral-notebook/apps/<key>.html. Trigger whenever
  an app artifact is part of a NotebookLM workflow run, regardless of whether the knowledge comes from Claude
  or is provided by Tom.
---

## Read First

Read before building any web app:
`Projects/NotebookLM/ephemeral-notebook/documents/source-web-app.md`

That document describes the format for the web app knowledge document — the source
Claude writes, uploads to the notebook, and also uses to populate the app's FOCUS_PROMPTS
and quiz scope. Note: this document is currently a TODO stub.

---

## What This App Is

A standalone, single-file HTML companion to a NotebookLM notebook. It lets the user interact with the topic
through two modes: an **Explorer** (AI-driven deep dives into focus angles) and a **Quiz** (AI-generated
multiple-choice questions). All AI calls go through a shared proxy at runtime — no server or build step needed.

The app does NOT upload back into the notebook. It is a side artifact, not a source.

## Knowledge Source

**Preferred approach: Query the notebook before building.**

Before writing FOCUS_PROMPTS, query the notebook with targeted questions to get NLM's synthesized content from the actual sources:

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "<question>"
```

Ask multiple questions — one per major theme or focus angle. The responses are rich, grounded in the sources, and far better than Claude guessing from the topic name alone. This is especially important for:
- Topics outside Claude's knowledge cutoff
- Niche books or specific works the AI model won't know
- Any case where accuracy to the source material matters

Query until you have enough content to write dense, specific FOCUS_PROMPTS for every dropdown entry. There's no limit on queries.

The knowledge base can also come from:
- **Claude's own knowledge** (Claude as Source pattern) — acceptable for well-known topics within Claude's training
- **Tom-provided content** — a transcript, document, or knowledge base Tom pastes in; Claude adapts it

Either way, the knowledge lives inside the JavaScript `FOCUS_PROMPTS` object and the quiz prompt string —
not in a separate data file. The app is self-contained.

## File Output

- **Path:** `Projects/NotebookLM/ephemeral-notebook/apps/<key>.html`
- **Named after the topic key** (e.g., `braess-paradox.html`, `other-lane.html`)
- **Single file** — no dependencies, no imports, no build step

## Standard Structure

### Two tabs
1. **Explorer** — user picks a focus angle from a dropdown, AI returns a structured response rendered as summary + table + clickable follow-up chips
2. **Quiz** — AI generates 5 multiple-choice questions, user answers one at a time, score tracked, explanation shown after each answer

### AI infrastructure
All AI calls use this shared proxy and model — copy exactly:

```js
const PROXY = 'https://groq-proxy.ewalltom.workers.dev';
const MODEL = 'openai/gpt-oss-120b';

async function callAI(promptText) {
  const response = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      generationConfig: { responseMimeType: 'text/plain' },
      model: MODEL
    })
  });
  const raw = await response.text();
  let data;
  try { data = JSON.parse(raw); }
  catch { throw new Error(`Non-JSON from proxy (HTTP ${response.status}): ${raw.slice(0,300)}`); }
  if (!response.ok) throw new Error(data?.error?.message || `HTTP ${response.status}`);
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No text in AI response');
  return text;
}

function extractJson(text) {
  let t = String(text).trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return null; }
}
```

### Status indicator pattern
Three states: `live` (blue dot, pulsing), `ok` (green dot), `bad` (red dot). Always present on both tabs.

## CSS Design System

Copy this CSS block exactly — do not deviate from the color tokens:

```css
:root {
  --bg: #070c16;
  --surface: #0f1726;
  --border: rgba(255,255,255,.10);
  --text: #e6edf7;
  --muted: #a9b6cc;
  --accent: #8bb9ff;
  --green: rgba(124,255,178,.92);
  --red: rgba(255,122,138,.95);
  --shadow: 0 12px 30px rgba(0,0,0,.35);
  --radius: 16px;
  --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}
body {
  font-family: var(--sans);
  background: linear-gradient(180deg, #070c16 0%, #0b1220 50%, #070c16 100%);
  color: var(--text);
  min-height: 100vh;
  padding: 28px 20px;
}
.wrap { max-width: 900px; margin: 0 auto; }
```

Active tab style: `background: rgba(139,185,255,.12); border-color: rgba(139,185,255,.35); color: var(--accent);`

Primary button: `background: linear-gradient(135deg, rgba(139,185,255,1), rgba(124,255,178,.92)); color: #08101d;`

## Explorer Tab — What to Customise Per Topic

The `FOCUS_PROMPTS` object maps dropdown keys to detailed knowledge strings. Each string should:
- Be a dense, specific paragraph — not a label, not a sentence
- Name real figures, dates, concepts, mechanisms where possible
- Match the focus angles of the notebook videos where there is overlap
- Aim for 5–8 focus angles per topic

The Explorer AI prompt requests this JSON schema:
```json
{
  "title": "",
  "summary": "",
  "items": [{ "name": "", "key_figure_or_date": "", "description": "", "significance": "" }],
  "follow_up_questions": [""]
}
```
Request 6–8 items. Follow-up questions render as clickable chips that re-run the explorer with that question as the focus.

## Quiz Tab — What to Customise Per Topic

The quiz prompt embeds a detailed knowledge scope — the specific concepts, names, dates, and mechanisms the
questions should draw from. Be explicit: name the researchers, paradoxes, mechanisms, and events. The more
specific the scope, the better the questions.

Request exactly 5 questions per batch. Schema:
```json
{
  "questions": [{ "question": "", "options": ["A. ", "B. ", "C. ", "D. "], "correct": "A", "explanation": "" }]
}
```
Shuffle answer options before rendering (swap correct answer into a random position). Track previously asked
questions across batches to avoid repeats.

## Subtitle Line

Below the `<h1>`, include a subtitle in `.sub` style:
`[short topic description] · AI-powered explorer & quiz`

## Planned Enhancement: Chip-Targeted Quiz (not yet implemented)

Track which Explorer follow-up chips the user clicks and use them to scope the quiz, rather than the static
topic-wide scope string currently used.

**The idea:**
- Each time the user clicks a chip, add that chip's question text to a `clickedChips` array
- When the user runs the quiz, build the scope from `clickedChips` — the quiz quizzes on what the user
  actually explored
- If no chip has been clicked (app just loaded, or user selected from dropdown without clicking a chip),
  use the current dropdown selection as a chip substitute — treat the active focus label as if it were a
  clicked chip
- The chip history could persist across dropdown changes, or reset — TBD

**Why this is better:** the quiz becomes a natural extension of the user's exploration path rather than a
generic topic overview. The user self-selects what they want to be tested on simply by following their
curiosity through the chips.

**Implementation note:** the quiz prompt's scope string would be assembled dynamically from `clickedChips`
at the moment "New Quiz" is pressed, rather than being hardcoded. Chip history is stored in `localStorage`
and accumulates globally — all chips clicked across all dropdown selections are kept together. No segmentation
by focus angle. This keeps the implementation simple and maximises quiz coverage over the user's full
exploration session. More sophisticated scoping (per-focus-angle, session-only, etc.) can be added later.

---

## App Type Variants

The default is Explorer + Quiz. Additional app types are available as separate skills:

- **Flashcard** (`app_type: flashcard`) → use the `notebooklm-webapp-flashcard` skill. Active recall cards organized by theme, with flip animation, Known/Still Learning tracking, shuffle, and keyboard shortcuts.
- **Tabbed** (`app_type: tabbed`) → use the `notebooklm-webapp-tabbed` skill. Topic content as navigable tabs, static content, no AI proxy.

For now, default to Explorer + Quiz unless Tom specifies `app_type`.

### Planned (not yet implemented)
- **Timeline** — for historical topics with strong chronological structure
- **Comparison** — for topics with multiple competing theories or frameworks
- **Simulation / interactive diagram** — for topics with a demonstrable mechanism (e.g., Braess's Paradox network)

Note: "Infographic" is now a separate NotebookLM-native artifact type (`nlm infographic create`) —
see the `notebooklm-infographic` skill. It is not a web app variant.
