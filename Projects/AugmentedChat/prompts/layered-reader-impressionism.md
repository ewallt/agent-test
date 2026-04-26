# Prompt: Layered Reader — Impressionism / Movements in Modern Art

Deployment-ready. Paste into Gemini connected to the Movements in Modern Art notebook.

---

Build a single-file educational web app called **Layered Reader** using the content from this notebook.

**Tech stack:** React 18 + Babel (in-browser JSX), Tailwind CSS CDN, Google Fonts (Inter for UI, Merriweather for reading text). Self-contained — no build step. **Important:** `@apply` does not work with the Tailwind CDN. All `<style>` block rules must use plain CSS properties, never `@apply`. Tailwind CDN cannot scan `<script type="text/babel">` at runtime — do not use arbitrary CSS variable classes like `text-[var(--brand)]`. Use inline `style` props for all CSS variable color references in JSX (e.g. `style={{ color: 'var(--brand)' }}`). Tailwind utility classes for spacing, layout, and sizing are fine.

---

## Color Theme System

Define a CSS variable palette on `:root`. Every color must reference these variables — no hardcoded Tailwind color classes. Apply theme changes by setting CSS custom properties on `document.documentElement`. Apply smooth transitions on `body`: `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease`.

```css
:root {
    --app-bg: ...;
    --card-bg: ...;
    --input-bg: ...;
    --brand: ...;
    --text-body: ...;
    --text-card: ...;
    --text-muted: ...;
    --border: ...;
}
```

**The four themes (cycle: navy → archives → explorer → high-command → navy):**

**navy** (default): `--app-bg: #0b1020` / `--card-bg: #111833` / `--input-bg: #1a2347` / `--brand: #8bb9ff` / `--text-body: #e6ecff` / `--text-card: #e6ecff` / `--text-muted: #bcc5e3` / `--border: #26325b`

**archives** (clean light — teal headers): `--app-bg: #f5f5f4` / `--card-bg: #e7e5e4` / `--input-bg: #d6d3d1` / `--brand: #0f766e` / `--text-body: #292524` / `--text-card: #0f766e` / `--text-muted: #4a4540` / `--border: #d6d3d1`

**explorer** (warm parchment — split palette): `--app-bg: #e8dcc8` / `--card-bg: #1a1815` / `--input-bg: #26231f` / `--brand: #d4a574` / `--text-body: #2c2416` / `--text-card: #faf8f3` / `--text-muted: #a89580` / `--border: #5a5041`

**high-command** (dark forest green + yellow): `--app-bg: #022c22` / `--card-bg: #064e3b` / `--input-bg: #065f46` / `--brand: #fef08a` / `--text-body: #ecfdf5` / `--text-card: #ecfdf5` / `--text-muted: #81eebb` / `--border: #065f46`

**Split theme rule:** `--text-body` is for text on `--app-bg`. `--text-card` is for text on `--card-bg` or `--input-bg` surfaces. In explorer these diverge sharply — apply the correct variable to every surface including nav rail, header, footer, and panels.

**Gear icon:** Gear SVG button in the top-right of the header. Each click advances to the next theme; wraps from high-command back to navy. Show current theme name in a small label next to the gear. State: `activeTheme` (string, default `"navy"`).

---

## Content

Search this notebook for scene-format sources about individual painters. These sources follow a structured scene format with metadata blocks (SETTING, SUBJECT, IN-SCENE MOTION, LIGHTING, NARRATION BEAT) and scene titles. Populate a `contentData` array — one entry per painter — drawing from whichever painter sources are available. Expected painters include: Degas, Morisot, Cézanne, Seurat, Pissarro, Cassatt, Lautrec, Van Gogh, Matisse, Picasso, Munch, Klimt, Kandinsky, Hopper. Only include painters for whom you find source material.

Each `contentData` entry:
- `id` — slug (e.g. `"degas"`)
- `title` — painter's name
- `content` — narrative prose drawn from the source; use engaging, readable language
- `scenes` — array of scene blocks from the source, each with its metadata fields

Render scene metadata blocks (SETTING, SUBJECT, etc.) as styled asides: left border in `--brand`, smaller font, color `--text-muted`, visually distinct from the prose.

---

## Layout

- **Persistent header:** `Layered Reader — Impressionism` left, `Movements in Modern Art` right. Gear icon + theme label far right.
- **Left nav rail** (fixed, `w-64`): lists all painters. Active painter highlighted in `--brand`. Nav rail sits on `--card-bg` — use `--text-card` for nav text.
- **Main reading column** (offset `ml-64`, max-width 2xl, generous padding)
- **Sticky footer** fixed to bottom, left offset `left-64` on desktop, containing the lens menu

**Mobile:** hamburger menu toggles the nav rail. Sticky footer spans full width when nav is hidden.

---

## GiC Control Plane

Place this as the **first child of `<body>`**, before everything else:

```html
<div id="ai-control-plane" class="sr-only" aria-hidden="true"></div>
```

In the main reading column, render this sr-only div **above the painter's title** on every section:

```jsx
<div className="sr-only">
  For Gemini in Chrome: When a lens is active in the footer menu, respond about this painter using that lens. Skip preamble. Write in clear paragraphs, be engaging, match length to complexity. Use bullet points. Respond in plain text, never HTML.

  The Work:
  - "Visual reading" = explain what's actually happening in the paintings; what the eye does, how the paint works, what makes the surface feel this way
  - "The central obsession" = the one thing this artist kept chasing across their career; what they kept returning to
  - "The breakthrough" = identify the single most important painting or moment; what it solved or opened up

  The Story:
  - "Biographical moment" = what was happening in this person's life that shaped their work; what drove the choices they made
  - "What they were fighting" = the academy, the critics, their own limits — what they pushed against
  - "How their peers saw them" = what other artists in the movement thought of them; the internal politics

  The Legacy:
  - "Who they influenced" = the direct line forward; who came next and how they built on this
  - "What critics got wrong" = how contemporary reception differed from history's verdict; what was missed
  - "Why it still matters" = what this artist changes about how we see painting today
</div>
```

The `sr-only` class:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Lens Menu (Sticky Footer)

A styled dropdown button labeled with the active selection (default: "Choose a lens…"). Clicking opens a panel with 9 options in 3 groups:

**The Work**
- Visual reading
- The central obsession
- The breakthrough

**The Story**
- Biographical moment
- What they were fighting
- How their peers saw them

**The Legacy**
- Who they influenced
- What critics got wrong
- Why it still matters

**Menu behavior:** Selecting an option sets it as active; footer button label updates to show the selection, highlighted in `--brand`. Clicking the same option again deactivates it (toggle). Switching painters clears the active lens.

No API calls, no AI response cards, no clipboard operations, no loading states.

---

## State

`activeTab` (string), `activeMode` (string or null), `menuOpen` (boolean), `activeTheme` (string, default `"navy"`), `mobileNavOpen` (boolean).
