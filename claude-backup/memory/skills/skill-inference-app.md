# Skill: Inference App Builder

## What This Does
Builds a single-file HTML app with a live AI brain — no images, grounded in NotebookLM research.
The app ships to Tom as a self-contained `.html` file that Tom opens in a browser.
The AI brain runs at query time via a Cloudflare Worker proxy; no API key is exposed in the file.

Use this when Tom wants an interactive artifact from a NotebookLM notebook — not a video or slideshow.

## Core Design Principle

**The power of this app type is prompt authorship, not runtime connectivity.**

The runtime AI (the "brain") is capable but generic. What makes an inference app good is the quality of the prompts embedded in it — and those prompts are written by Claude *after* reading the actual notebook sources.

The pipeline is:
1. NotebookLM researches the topic and imports sources
2. Claude reads the sources and builds a content survey — acquiring real domain knowledge
3. Claude writes the prompts that go into the app, informed by that knowledge: focus angles, schema fields, framing, specificity
4. At runtime, the AI executes those prompts

The connection to the notebook sources is made at build time, through Claude's prompt-writing. A generic prompt ("tell me about Portugal's route to India") produces generic output. A prompt shaped by what the sources actually emphasise — specific figures, turning points, tensions, framings — produces output that reflects genuine research.

**The content survey step is not optional.** It is where source knowledge becomes prompt knowledge.

---

## App Architecture

### Core Pattern
```
User selects a focus / clicks a button
    → buildPrompt() constructs a text prompt with embedded JSON schema
    → callAI(prompt) POSTs to Cloudflare Worker proxy
    → proxy forwards to LLM, returns Gemini-style response envelope
    → extractJson(text) strips markdown fences, parses JSON
    → render function populates DOM with structured result
```

### Proxy and Model
```javascript
const PROXY = 'https://groq-proxy.ewalltom.workers.dev';   // NOT gemini-proxy — that is broken
const MODEL = 'openai/gpt-oss-120b';
```

### callAI() — canonical implementation
```javascript
async function callAI(promptText) {
  const response = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      generationConfig: { responseMimeType: 'text/plain' },
      model: MODEL   // required — proxy will reject without it
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
```

### extractJson() — canonical implementation
```javascript
function extractJson(text) {
  let t = String(text).trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return null; }
}
```

### JSON Schema Prompting Pattern
Embed the schema as a literal JSON skeleton in the prompt. The model fills it in.
```javascript
const schema = { title: "", summary: "", items: [{name:"", year_or_date:"", description:"", significance:""}], follow_up_questions: [""] };
const prompt = [
  'Return ONLY valid JSON matching the schema exactly. No markdown, no backticks.',
  '',
  'SCHEMA:',
  JSON.stringify(schema, null, 2),
  '',
  'REQUEST:',
  `Topic: ${topic}`,
  `Focus: ${focusLabel}`,
  'Generate 6–8 items...'
].join('\n');
```
Rule: always open with `'Return ONLY valid JSON matching the schema exactly. No markdown, no backticks.'`

---

## Standard Tabs

### Explorer Tab (data slicer)
- User selects a focus angle from a dropdown (6–8 options designed from notebook content)
- AI returns: `{ title, summary, items: [...], follow_up_questions: [...] }`
- Rendered as: summary paragraph + data table + follow-up chips
- Items typically: `{ name, year_or_date, description, significance }` — adapt columns to topic
- Follow-up chips: display the drill-down questions; wire each chip to re-run Explorer with that question as a custom focus (not just display-only)

### Quiz Tab (multiple choice, batch of 5)
- User presses "New Quiz"; AI returns 5 MCQs in one call
- Schema: `{ questions: [{ question, options: ["A. ","B. ","C. ","D. "], correct: "A", explanation }] }`
- `correct` must be exactly `"A"`, `"B"`, `"C"`, or `"D"` — state this explicitly in the prompt
- Anti-repeat: maintain `askedQuestions[]` array; pass last 15 to prompt as avoidance list
- User steps through questions one at a time; "Next Question" / "See Results" buttons appear after answering
- Final screen shows "You scored X / 5" with green/red status dot
- State: `batchQuestions[]`, `batchIndex`, `batchScore` — reset on each "New Quiz"
- Reveal correct/wrong on click; show explanation; disable all buttons after answer
- **Shuffle after receiving**: models are biased toward putting the correct answer in position A — always run `shuffleOptions()` on each question after the AI call. Strip letter prefixes, Fisher-Yates shuffle the texts, re-label A–D, update `correct` to match new position.

---

## Visual Design System

All apps use this CSS variable set — do not reinvent:

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
```

Dark background gradient: `linear-gradient(180deg, #070c16 0%, #0b1220 50%, #070c16 100%)`

### Status Dot Pattern
Three-state live indicator — use in every tab that calls AI:
```html
<div class="status">
  <span class="dot" id="myDot"></span>
  <span id="myStatus">Idle message.</span>
</div>
```
States: `` (neutral), `live` (accent blue pulse), `ok` (green pulse), `bad` (red pulse)
Set via: `document.getElementById('myDot').className = 'dot live';`

### Card Structure
Every section lives in a `.card`:
```html
<div class="card">
  <div class="card-hd"><h2>Section Label</h2></div>
  <div class="card-bd">...content...</div>
</div>
```

### Buttons
- Primary action: `class="btn-primary"` — gradient background, dark text
- Secondary action: `class="btn-secondary"` — subtle border, light text
- Always `btn.disabled = true` at start of async call; re-enable in `finally`

---

## Content Survey / Research File

Before building the app, Claude reads the notebook's web sources and writes a research file.
Source URLs come from `nlm source list`; Claude WebFetches each one directly.

Research is built in-context from WebFetching the source URLs. No persistent save to disk required.

Research file covers:
- What facts, events, or entities the sources contain
- Natural focus angles the content supports (becomes the Explorer dropdown)
- Quiz-worthy facts (specific names, dates, cause/effect, surprises)
- Any gaps or thin coverage to avoid

The research informs: dropdown option labels, prompt specificity, schema field names, quiz complexity.

---

## Single-Session Build Pipeline

```
Step 1: Create notebook + start research (async)
Step 2: While research runs → design app shell (tabs, dropdown labels TBD, CSS, scaffolding)
Step 3: Research finishes → import sources → nlm source list → WebFetch source URLs
Step 4: Build research context in-context from WebFetched sources
Step 5: Finalize dropdown options + prompts using research context
Step 6: Assemble complete app; test in browser
Step 7: Save to Projects/NotebookLM/playlists/apps/<topic-slug>.html
```

Steps 1–2 run in parallel. Steps 3–7 are sequential.
Total session: ~1 hour including research wait.

---

## Output File

Save to: `Projects/NotebookLM/playlists/artifacts/<topic-slug>/app.html`
Naming: topic-slug is lowercase, hyphens, no spaces — e.g. `artifacts/portugal-route-to-india/app.html`

## Reference Implementation

**POC (working example): `Projects/NotebookLM/playlists/artifacts/poc/portugal-poc.html`**

This is the canonical example app. When building a new app, use it as the reference.
Features implemented in the POC:
- Explorer tab: focus selector → table + summary + follow-up chips (chips are clickable, re-run Explorer)
- Quiz tab: 5-question batch, single AI call, step-through UX, scored X/5 on results screen
- `shuffleOptions()` to randomise answer positions after AI response
- Proxy: groq-proxy (working); model: openai/gpt-oss-120b

**Keep this skill in sync with the POC.** When the POC is improved (new patterns, bug fixes, UX changes), update the relevant sections of this skill to match. The skill is the source of truth for future apps; the POC is the living proof of concept.

---

## Known Issues / Gotchas

- **Wrong proxy**: `gemini-proxy.ewalltom.workers.dev` returns 500 — always use `groq-proxy`
- **Missing model field**: proxy rejects requests without `model` in the body — always include it
- **Follow-up chips**: wire chips to `runExplorer(q)` — pass chip text as `customFocus` param; function signature is `runExplorer(customFocus)` where `customFocus || dropdown` selects the focus label
- **extractJson null**: if the model returns malformed JSON, `extractJson` returns null — always check before rendering; show a `bad` status dot with a helpful error message

---

## Future Directions (categories, no priority)

- **Tab types** — new interaction modes beyond Explorer and Quiz
- **Assessment framework** — rubric-based scoring, graduated performance levels, open-ended responses evaluated against criteria (vs. binary MCQ)
- **Input modes** — free text, voice, and other interaction models beyond buttons and dropdowns
- **Persistence** — state that survives page reload: quiz history, explored topics, scores
- **Connectivity** — runtime access to source content (build-time grounding via prompt authorship is already the design; this would be a further step for live or updatable content)
- **Configurability** — making apps topic-adaptable without code changes
- **Personalization** — adapting to individual user behaviour or performance over time
- **Portability** — packaging, sharing, or embedding apps beyond "open this file"
- **Multi-topic** — navigating across related topics within a single app
- **Visual / UX polish** — animations, transitions, richer layout beyond the current functional baseline

---

## Notes
- No images — this is a pure text/data app; no `<img>` tags, no image prompts
- The AI brain is stateless — each call is independent; no conversation history
- Tab switching: simple show/hide via CSS class `.tabpanel.active { display: block; }`
- If Tom wants more tabs (Timeline, Connections, etc.) — design them as additional focus angles on the same `callAI` + schema pattern
