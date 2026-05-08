---
name: notebooklm-webapp-explorer-tab
description: >
  Build the Explorer+Quiz section for use inside a bundled NotebookLM web app. Use this skill
  whenever the `notebooklm-webapp-bundle` skill requests an explorer tab — i.e., when building
  a bundled app that includes `explorer` in its tab list. Produces a scoped HTML section
  (not a standalone file) with the Explorer and Quiz UI, CSS scoped to #explorer-tab, and JS
  in the ExplorerTab namespace. Do NOT use this to build a standalone app — use
  `notebooklm-webapp` for that.
---

## What This Produces

A self-contained `<section id="explorer-tab">` block — HTML, scoped `<style>`, and a `<script>`
with all JS in the `ExplorerTab` namespace. Designed to drop into a bundled file alongside other
tab sections. No `<html>`, `<head>`, or `<body>` wrappers. No global CSS variable definitions
(those live in the bundle shell).

## Step 1 — Get the Content

Query the notebook before writing FOCUS_PROMPTS:

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "<question>"
```

Ask one question per major theme. Get 5–8 focus angles worth of content. The responses populate
the `FOCUS_PROMPTS` object and the quiz knowledge scope string.

For topics within Claude's training, Claude's own knowledge is acceptable.

## Step 2 — Build the Section

### HTML structure

```html
<section id="explorer-tab">
  <style>
    /* All CSS scoped to #explorer-tab */
    #explorer-tab { ... }
    #explorer-tab .status-dot { ... }
    /* etc. */
  </style>

  <!-- Explorer UI -->
  <!-- Quiz UI -->

  <script>
    const ExplorerTab = (() => {
      const PROXY = 'https://groq-proxy.ewalltom.workers.dev';
      const MODEL = 'openai/gpt-oss-120b';

      const FOCUS_PROMPTS = { ... };

      // callAI, extractJson, render functions...

      function init() {
        // bind events, render initial state
      }

      return { init };
    })();
  </script>
</section>
```

### AI infrastructure (copy exactly)

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

### CSS scoping rule

Every CSS selector must be prefixed with `#explorer-tab`:
```css
#explorer-tab .wrap { max-width: 900px; margin: 0 auto; }
#explorer-tab .status-dot { ... }
```

Do not redefine CSS custom properties (`--bg`, `--accent`, etc.) — they're defined by the bundle shell.

### JS namespacing rule

All variables and functions live inside the `ExplorerTab` IIFE. The only public export is `init()`.
The bundle shell calls `ExplorerTab.init()` when the tab is first activated.

### Status indicator

Three states: `live` (blue pulsing), `ok` (green), `bad` (red). Present on both Explorer and Quiz.

### FOCUS_PROMPTS

Maps dropdown keys to dense, specific knowledge strings. 5–8 entries. Each string names real
figures, dates, concepts, mechanisms. Match the focus angles of the notebook videos where possible.

### Explorer AI response schema

```json
{
  "title": "",
  "summary": "",
  "items": [{ "name": "", "key_figure_or_date": "", "description": "", "significance": "" }],
  "follow_up_questions": [""]
}
```

### Quiz AI response schema

```json
{
  "questions": [{ "question": "", "options": ["A. ", "B. ", "C. ", "D. "], "correct": "A", "explanation": "" }]
}
```

5 questions per batch. Shuffle answer options. Track previously asked questions to avoid repeats.

## Reference

`Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html` — standalone version.
Use it as a reference for the full Explorer+Quiz logic; adapt it to the scoped section format.
