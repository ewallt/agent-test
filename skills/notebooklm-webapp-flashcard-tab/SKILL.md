---
name: notebooklm-webapp-flashcard-tab
description: >
  Build the Flashcard section for use inside a bundled NotebookLM web app. Use this skill
  whenever the `notebooklm-webapp-bundle` skill requests a flashcard tab — i.e., when building
  a bundled app that includes `flashcard` in its tab list. Produces a scoped HTML section
  (not a standalone file) with the full flashcard UI, CSS scoped to #flashcard-tab, and JS
  in the FlashcardTab namespace. Do NOT use this to build a standalone flashcard app — use
  `notebooklm-webapp-flashcard` for that.
---

## What This Produces

A self-contained `<section id="flashcard-tab">` block — HTML, scoped `<style>`, and a `<script>`
with all JS in the `FlashcardTab` namespace. Designed to drop into a bundled file alongside other
tab sections. No `<html>`, `<head>`, or `<body>` wrappers. No global CSS variable definitions
(those live in the bundle shell).

## Step 1 — Get the Content

Query the notebook before writing cards:

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "What are the major themes or sections?"
```

Then query per theme. Aim for 2 cards per theme, ~10–12 themes = ~20–24 cards. Add 2–3
synthesis cards at the end for topics with a unifying framework.

For topics within Claude's training, Claude's own knowledge is acceptable.

## Step 2 — Build the Section

### HTML structure

```html
<section id="flashcard-tab">
  <style>
    /* All CSS scoped to #flashcard-tab */
    #flashcard-tab { ... }
    #flashcard-tab .scene { ... }
    /* etc. */
  </style>

  <!-- Progress bar -->
  <!-- Card scene (front + back faces) -->
  <!-- Controls row -->
  <!-- Status chips row -->
  <!-- Shuffle / Reset buttons -->
  <!-- Keyboard hint bar -->

  <script>
    const FlashcardTab = (() => {
      const CARDS = [ ... ];

      let deck, current, flipped, status, indexMap;

      function init() {
        deck = [...CARDS];
        current = 0;
        flipped = false;
        status = new Array(CARDS.length).fill('unseen');
        indexMap = [...Array(CARDS.length).keys()];
        render();
        bindKeys();
      }

      // render, flipCard, nextCard, prevCard
      // markKnown, markLearning, updateCounts
      // shuffleCards (Fisher-Yates on deck+indexMap together)
      // resetAll
      // bindKeys (Space/Enter=flip, ←→=nav, K=known, L=learning)

      return { init };
    })();
  </script>
</section>
```

### Card data structure

```js
const CARDS = [
  // ── Theme Name ─────────────────────────────────────────
  {
    theme: "Theme Name",
    q: "The question for the front face?",
    a: "The answer. <strong>Key terms</strong> can be bolded."
  },
  // ...
];
```

### CSS scoping rule

Every CSS selector must be prefixed with `#flashcard-tab`:
```css
#flashcard-tab .scene { width: 100%; max-width: 600px; height: 340px; perspective: 1200px; }
#flashcard-tab .card-inner { transform-style: preserve-3d; transition: transform .5s cubic-bezier(.4,0,.2,1); }
#flashcard-tab .card-inner.flipped { transform: rotateY(180deg); }
```

Do not redefine CSS custom properties — they're defined by the bundle shell.

### JS namespacing rule

All variables and functions live inside the `FlashcardTab` IIFE. The only public export is `init()`.
The `indexMap` pattern is essential: always shuffle `deck` and `indexMap` together so status
tracking survives shuffle.

**Important:** keyboard event listener must be registered inside `init()` — not at module level —
so it's only active when this tab is initialized. Use `{ once: false }` but scope the handler to
only fire when the flashcard tab is visible (check `#flashcard-tab` display state).

### Required features (same as standalone)

| Feature | Notes |
|---------|-------|
| Card flip | 3D rotateY(180deg), click or Space/Enter |
| Navigation | ← Prev / Next → + ArrowKey, disabled at ends |
| Progress bar | height 4px, `Card X of N` label |
| Status tracking | unseen / known / learning chips |
| Mark buttons | ✓ Got it (known+advance), ↻ Still learning (learning+advance) |
| Shuffle | Fisher-Yates on deck+indexMap |
| Reset All | restore CARDS order, clear status |
| Keyboard shortcuts | Space/Enter, ←→, K, L |

No version label needed in the tab version (version lives in the bundle's header).

### Card face backgrounds

- Front: `background: var(--surface)`
- Back: `background: var(--surface2); text-align: left; justify-content: center;`

## Reference

`Projects/NotebookLM/ephemeral-notebook/apps/byg-flashcards.html` — standalone version.
Use it as a reference for the full flashcard logic; adapt it to the scoped section format.
