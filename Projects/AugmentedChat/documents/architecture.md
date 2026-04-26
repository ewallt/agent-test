# Augmented Chat — Architecture

## The Pattern

An augmented chat experience combines three things:

1. **Structured content** — the app organizes a knowledge base (a book, a topic, a source) into readable sections
2. **Pre-written prompts** — pill buttons give the user high-quality prompts tuned to the current context, ready to paste or fire
3. **AI response** — either inline (Gemini API, self-contained) or via an external agent (GiC, clipboard-based)

## Two Implementation Modes

### Clipboard Mode (GiC / BYOA)
Pills copy a prompt to clipboard. User pastes into their own AI agent (GiC, ChatGPT, Claude, etc.). The app provides context via a visible header and optional sr-only layer. No API key required. Works in any browser.

### Inline Mode (Gemini API)
Pills fire a Gemini API call directly. Response renders inside the app. Self-contained — no external agent needed. Requires an API key (auto-filled in Gemini canvas). Stateless — each pill click is an independent call.

## Key Design Principles

- **Structured ask** — pills define a specific cognitive lens (explain / deepen / expand), not just "ask me anything"
- **Context is load-bearing** — the scene text is injected into every API call; the AI is never guessing
- **Stateless is fine for zero-shot** — each pill click is a fresh call; no conversation history needed for level-based queries
- **Visual quality matters** — the app should feel premium; a cheap UI undermines trust in the content
