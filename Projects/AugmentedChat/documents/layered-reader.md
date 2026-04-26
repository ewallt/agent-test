# Layered Reader

## What It Is

A single-file educational web app that presents a knowledge base as a series of readable scenes or sections. Each section has a dropdown menu for selecting an engagement mode. Two modes exist: **GiC mode** (menu highlight only — Gemini in Chrome responds) and **Inline mode** (menu selection fires a Gemini API call, response renders in-app).

## Modes

### GiC Mode (current)
Menu selection highlights on click; no API calls. An sr-only GiC instruction block sits above each section title telling Gemini in Chrome how to respond for each menu option. The user picks a mode and types "go" (or similar) to GiC.

### Inline Mode
Menu selection fires a Gemini API call. Response renders in an AI Insight card below the article. Requires a valid API key (Gemini canvas fills `""` automatically at runtime). **Note:** Gemini canvas has been observed serving fake pre-baked responses with a simulated spinner instead of real API calls. Use GiC mode unless real API access is confirmed.

## Pattern

- One tab per scene or section from the source
- Left navigation rail listing all tabs
- Main reading column with the scene's prose
- Sticky footer with a labeled dropdown menu
- GiC mode: menu selection signals intent; sr-only block instructs GiC
- Inline mode: AI Insight card renders below article on selection; clears on tab change

## Menu Options

Three groups, nine options total.

### Foundations
| Option | Prompt |
|--------|--------|
| Explain it simply | Explain the core concept of [title] in plain, easy-to-understand terms suitable for a beginner. |
| Key insight | What is the most crucial key insight or underlying theme I should take away from [title]? |
| Expand with examples | Expand on [title] with concrete examples, illustrations, or specific details that make the concept more tangible. |

### Lenses
| Option | Prompt |
|--------|--------|
| Compare / contrast | How does [title] compare to what came before or after it? What did contemporaries think vs. what history decided? |
| Biographical moment | What was happening in this person's life at this moment, and what drove this specific decision or obsession? |
| So what — why does this matter today? | Why does [title] still matter today? What does it change about how we see the world? |
| Connections — what did this influence? | What did [title] influence downstream? What cross-domain connections does it suggest? |

### Challenge
| Option | Prompt |
|--------|--------|
| Skeptic's view | What is the strongest critique of [title]? What did the people who rejected it think they were seeing? |
| Counterfactual — what if this hadn't happened? | If [title] had never happened, what would be missing? Who almost got here first? |

## Tech Stack

- React 18 + Babel (in-browser JSX — no build step)
- Tailwind CSS CDN
- Google Fonts: Inter (UI) + Merriweather (reading text)
- Gemini API: `gemini-2.5-flash-preview-09-2025` (Inline mode only)
- API key: empty string `""` — Gemini canvas fills automatically (Inline mode only)

> **CDN limitation:** `@apply` does not work with the Tailwind CDN. Any styles in a `<style>` block must use plain CSS, not `@apply`.

## API Call Pattern

```js
const apiKey = "";
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: promptText }] }],
    systemInstruction: { parts: [{ text: "You are an insightful, eloquent archival assistant. Provide your response in clean HTML format (using <p>, <strong>, <em>, <ul>) without markdown codeblocks. Keep it concise, engaging, and directly relevant to the specific text provided." }] }
  })
})
```

Include `fetchWithRetry` with exponential backoff: 5 retries, delays 1s / 2s / 4s / 8s / 16s.

## Visual Design

Light/dark mode toggle in header. Both themes attractive with good contrast — not just an inversion. Default: light mode.

Header: `Layered Reader — [Topic]` left, tagline right, toggle far right.

Metadata blocks in source (SETTING, SUBJECT, LIGHTING, etc.) render as a styled aside — left border, smaller font, muted color — visually distinct from prose.

## Notes

- The content quality matters. Narrative prose produces far better AI responses than shot-list / metadata-heavy scene format. If the source mixes prose with camera directions, tell Gemini to use only the narrative sections.
- The empty `apiKey` string is intentional — Gemini canvas populates it automatically at runtime (Inline mode only).
- Gemini canvas has been observed faking API responses (pre-baked answers with a simulated spinner) rather than making real calls. This went undetected until adjustments broke the fake. Use GiC mode unless real API access is confirmed.
- GiC instruction: use `sr-only` div, not a visible banner. GiC reads it; users don't see it. Place it above the section title so it renders fresh on every section navigation.
- Visible banners were tried first but cluttered the reading experience and GiC's session context (prior debugging conversations) often overrode them anyway.
- Bullet point formatting in the sr-only instruction produces clean, readable GiC responses and is worth keeping.
- GiC carries server-side session context — if the session started with app-building or debugging, GiC may respond in that register regardless of instructions. Starting a fresh GiC session after the app is built gives the cleanest results.
- First validated (Inline mode) on Fermat's Last Theorem source (Andrew Wiles story), April 2026.
- GiC mode (sr-only) first validated on Iconic Foods, April 2026.
- Menu system (9 options, 3 groups) introduced April 2026 — replaces 3 pill buttons.
