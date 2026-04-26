# AI Manifest Pattern

## The Core Idea

The `ai-manifest` is a `<script type="application/json" id="ai-manifest">` block embedded in `<head>`. It's machine-readable structured data — topic, summary, per-tab summaries, suggested questions — that an AI assistant (e.g. Gemini in Chrome) can parse from the DOM on page load without the user having to navigate to each tab.

**The win:** Gemini knows the whole app from the moment the page loads. The user gets a force multiplier at their side throughout the session — the AI is already fully briefed, not just aware of whatever tab happens to be visible.

---

## How It Differs from AI Brain Apps

The "AI brain apps" pattern puts follow-up questions as clickable buttons for the *user*. Here the questions go into the manifest for the *AI*. The design intent is different:

- **Brain apps:** user clicks a button → AI answers a pre-written question
- **AI manifest:** AI loads the page → already knows what questions are worth asking, what each tab covers, what the content supports

The AI can answer "tell me more about this" naturally, and the conversation is driven by the user's curiosity rather than predetermined buttons.

---

## Current Manifest Structure (Map Layer)

```json
{
  "topic": "...",
  "summary": "2-3 sentence overview",
  "source": "notebook reference",
  "tabs": [
    { "id": "tab-01", "label": "Tab Name", "summary": "one-line summary" }
  ],
  "suggested_questions": ["...", "..."]
}
```

This gives the AI a *map* — it knows what's there and where. Sufficient for general Q&A.

---

## Next Layer: Deep Dives

For high-curiosity elements — charts, surprising stats, counterintuitive claims — the manifest can include pre-loaded extended context. When the user says "tell me more about this chart," Gemini is already holding the answer.

```json
"deep_dives": [
  {
    "element": "pilot training hours chart — tab-05",
    "hook": "110 hours vs. 400 hours by mid-1944",
    "context": "Extended explanation — structural reasons, compounding factors, consequences. Written at depth, not summary level."
  }
]
```

**Which elements get deep dives:** Not everything. High follow-up probability items:
- Charts and data visualizations
- Surprising or counterintuitive statistics
- Claims that contradict common assumptions
- Moments where the source material goes deeper than the tab can show

These can be identified by Claude when building the page, or flagged by NLM as part of the content query.

---

## Design Principle

The page has two audiences: the human reader (tabs, cards, visual design) and the AI assistant (manifest in `<head>`). These are distinct layers. The visual layer is for scanning and reading. The manifest layer is a briefing document — written for machines, structured for immediate utility.

A well-built page with a full manifest lets the user move through content naturally and ask follow-up questions freely, knowing the AI already has the context to answer well.

---

## Origin

Emerged from the `why-allies-won.html` build (April 2026). Tom noted that Gemini in Chrome could read the full manifest without tab navigation — equivalent to the AI brain app pattern but available for free on any page with a manifest. The deep dives extension came from a concrete moment: a pilot training chart in the app surfaced new information even after two reads of the source book, and Tom asked Gemini for more detail spontaneously.
