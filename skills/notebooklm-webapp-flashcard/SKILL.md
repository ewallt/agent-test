---
name: notebooklm-webapp-flashcard
description: >
  Build a flashcard review web app companion for a NotebookLM notebook. Use this skill whenever
  a NotebookLM task file includes `app: yes` and `app_type: flashcard`, or when Tom asks to build
  a flashcard app for a notebook topic. The app presents content as flippable cards organized by
  theme — with Known/Still Learning tracking, shuffle, and keyboard shortcuts. All content is
  embedded at build time (no AI proxy). Output is always a single-file HTML saved to
  Projects/NotebookLM/ephemeral-notebook/apps/<key>-flashcards.html. Trigger any time
  flashcard-style active recall is the goal, even if the word "flashcard" isn't used — e.g.,
  "study cards", "review cards", "flip cards for this topic".
---

## What This App Is

A standalone, single-file HTML flashcard review app for a NotebookLM notebook topic. Cards are
organized by theme, embedded directly in the HTML at build time — no AI proxy, no server.
The user flips cards, marks each Known or Still Learning, shuffles, and resets. No dependencies.

## Step 1 — Get the Content

**Preferred: query the notebook before writing cards.**

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "What are the major themes or sections of this topic?"
```

Then query once per theme to get NLM's synthesized content. The answers become the card substance.
For topics well within Claude's training, Claude's own knowledge is acceptable as an alternative.

## Step 2 — Plan the Card Set

- **~2 cards per theme**, ~10–12 themes = ~20–24 cards total
- Add 2–3 synthesis/big-picture cards at the end for topics with a unifying framework
- Each question must be specific enough to have a clear, answerable answer — not vague

## Step 3 — Build the App

### File output
- **Path:** `Projects/NotebookLM/ephemeral-notebook/apps/<key>-flashcards.html`
- **Single file** — no dependencies, no imports, no build step

---

### Card data structure

```js
const CARDS = [
  // ── Theme Name ─────────────────────────────────────────
  {
    theme: "Theme Name",
    q: "The question for the front face?",
    a: "The answer for the back face. <strong>Key terms</strong> can be bolded."
  },
  // ...
];
```

- `theme` — shown on both front and back faces as a small uppercase label
- `q` — question text, front face
- `a` — answer text, back face; HTML is allowed (`<strong>`, `<em>`)

---

### Required features

| Feature | Implementation |
|---------|---------------|
| Card flip | 3D CSS `rotateY(180deg)`, triggered by click on card, Space, or Enter |
| Navigation | ← Prev / Next → buttons + ArrowLeft/ArrowRight keys; disabled at deck ends |
| Progress bar | Thin bar at top + `Card X of N` label below it |
| Status tracking | Three states per card: `unseen` → `known` or `learning`; counts shown as chips |
| Mark buttons | "✓ Got it" (marks known + advance) and "↻ Still learning" (marks learning + advance) |
| Shuffle | Fisher-Yates shuffle of `deck` + `indexMap` arrays; resets to card 1 |
| Reset All | Restores original order, clears all statuses to `unseen` |
| Keyboard hints | Space/Enter flip, ←→ navigate, K got it, L still learning — shown in footer |
| Version label | Inline next to subtitle text, e.g. `v1.0`; increment on each rebuild |

**Status chips styling:**
- Known: green border/text (`rgba(124,255,178,.92)`)
- Learning: yellow border/text (`rgba(255,214,100,.9)`)
- Unseen: muted border/text

---

### CSS design system

```css
:root {
  --bg: #070c16;
  --surface: #0f1726;
  --surface2: #131e30;
  --border: rgba(255,255,255,.10);
  --text: #e6edf7;
  --muted: #a9b6cc;
  --accent: #8bb9ff;
  --green: rgba(124,255,178,.92);
  --yellow: rgba(255,214,100,.9);
  --shadow: 0 12px 40px rgba(0,0,0,.5);
  --radius: 18px;
  --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}
body {
  font-family: var(--sans);
  background: linear-gradient(180deg, #070c16 0%, #0b1220 50%, #070c16 100%);
  color: var(--text);
  min-height: 100vh;
  padding: 32px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

- **Card front** background: `--surface`
- **Card back** background: `--surface2`, `text-align: left`, `justify-content: center`
- **Primary button:** `background: linear-gradient(135deg, rgba(139,185,255,1), rgba(124,255,178,.92)); color: #08101d; border: none;`

---

### Layout (top to bottom)

1. `<header>` — `<h1>` with topic name (key word in `--accent`), subtitle line + version span
2. Progress bar (`height: 4px`) + `Card X of N` label
3. Card scene (`max-width: 600px`, `height: 340px`, `perspective: 1200px`)
4. Controls row: [← Prev] [✓ Got it] [↻ Still learning] [Next →]
5. Status chips row: [✓ N known] [↻ N learning] [N unseen]
6. Secondary buttons row: [Shuffle] [Reset all]
7. Keyboard hint bar (low-opacity, `<kbd>` tags)

---

### Header pattern

```html
<header>
  <h1>Topic <span style="color:var(--accent)">Key Word</span></h1>
  <p class="sub">Short topic description — flashcard review <span style="opacity:.4">v1.0</span></p>
</header>
```

---

### JavaScript skeleton

```js
let deck = [...CARDS];
let current = 0;
let flipped = false;
let status = new Array(CARDS.length).fill('unseen'); // 'unseen'|'known'|'learning'
let indexMap = [...Array(CARDS.length).keys()]; // deck position → original CARDS index

// render(), flipCard(), nextCard(), prevCard()
// markKnown(), markLearning(), updateCounts()
// shuffleCards() — Fisher-Yates on deck+indexMap together
// resetAll() — restore CARDS order, clear status
// keydown listener: Space/Enter=flip, ←→=navigate, K=known, L=learning
```

The `indexMap` is essential for status tracking after shuffle — always shuffle `deck` and `indexMap`
together so each deck position always maps back to the correct original card index.

---

## Reference Implementation

`Projects/NotebookLM/ephemeral-notebook/apps/byg-flashcards.html` — the first instance of this
app type. Read it if any feature implementation is unclear.
