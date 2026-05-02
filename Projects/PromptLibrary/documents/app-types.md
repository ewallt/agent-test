# Prompt Library — Procedures & Asset Reference

Reference document for the prompt library project: how we work with each AI tool, what NLM playlists exist, and what web apps are deployed.

---

## AI Procedures

High-level tasks for working with Claude (chat), Gemini, and ChatGPT. Differences between the three are noted in parentheses; steps with no note are the same for all three.

### Load Project Context
1. Load system prompt / persona
   *(ChatGPT: via Custom GPT or Project instructions; Gemini: via Gem; Claude: via Project instructions)*
2. Load relevant reference documents
   *(Gemini: connect Google Drive folder directly; Claude: attach from Drive or paste; ChatGPT: paste manually or attach)*

### Load a Prompt
1. Retrieve the prompt
   *(ChatGPT: fetch from GitHub Pages URL; Claude/Gemini: open Google Doc directly)*
2. Paste into conversation or reference in instructions

### Research a Topic
1. Provide topic and scope
2. Draft research summary or outline

### Write NLM Source Content
1. Provide topic and research brief
2. Draft scene-format source document
3. Review against scene rules
4. Upload to NotebookLM
   *(Gemini: can access NotebookLM directly; Claude/ChatGPT: manual upload)*

### Generate a Video Focus Prompt
1. Provide subject and arc
2. Draft focus prompt for NLM video generation

### Write a Reusable Prompt
1. Draft prompt for a recurring task
2. Save to Google Docs
   *(ChatGPT: also push to GitHub Pages so ChatGPT can access it by URL)*

### Build or Edit a Web App
1. Provide spec, wireframe, or existing code
2. Iterate on design and content
3. Deploy
   *(Claude Code only — not applicable to Claude chat, Gemini, or ChatGPT)*

---

## NLM Tasks

AI-executable tasks are supported by prompts. Manual tasks are done by Tom.

| Task | Who | Difficulty | Notes |
|------|-----|-----------|-------|
| Research a topic | AI | 1 | Standard AI task |
| Write a scene source doc | AI | 3 | Specific format rules, scene structure, fidelity requirements |
| Review scene doc against rules | AI | 2 | Checklist-based, clear criteria |
| Write a focus prompt | AI | 2 | Needs NLM context but straightforward once pattern is set |
| Update video tracking doc | AI | 1 | Simple data entry into Google Doc |
| Upload source doc to NLM | Tom | — | Desktop only |
| Trigger video generation in NLM | Tom | — | Desktop only |
| Download / export video from NLM | Tom | — | Desktop only |
| Upload video to YouTube | Tom | — | Desktop only |

---

## Deployed Web Apps by Type

Scope: apps that follow a repeatable template (ad hoc one-offs excluded).

### Gear Tab App — Difficulty: 2
Template established, data-driven, quick to spin up.
- SP Restaurants
- ChatGPT Images Use Cases

### Layered Reader — Difficulty: 3
Content structure more complex, multiple reading layers.
- Layered Reader: Healthy Aging
- Layered Reader: Modern Art (Impressionism)

### Explorer + Quiz — Difficulty: 3
Quiz logic + navigation, but template is working.
- Behold Your God
- Drinker Paradox
- Braess's Paradox
- Philosophical Revolutions: Enlightenment
- The Role of the Bible
- Ellen G. White on Preaching

### Slides (Gemini) — Difficulty: 2
Gemini does the heavy lifting.
- Braess's Paradox — Slides
- Philosophical Revolutions: Enlightenment — Slides

### Narrated Videos — Difficulty: 5
Remotion pipeline, animation, audio sync, rendering.
- BYG: Nuclear Plant
- BYG: God Not Criminal

### Flashcards — Difficulty: 2
Simple flip UI, data-driven.
- Behold Your God — Flashcards
