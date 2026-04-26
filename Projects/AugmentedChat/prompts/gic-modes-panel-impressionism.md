# Prompt: GiC Modes Panel — Impressionism

Deployment-ready build prompt. Paste this into Gemini to generate the app.

---

Build a single-file HTML web app using React 18 + Babel (in-browser JSX, no build step) and Tailwind CSS CDN.

## Color Theme System

Implement the four-theme gear system exactly as specified below. Every color in the app must use a CSS variable — no hardcoded colors, no Tailwind color classes that override the palette. Apply theme changes by setting properties on `document.documentElement`.

Define on `:root`:
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

**The four themes — cycle in this order: navy → archives → explorer → high-command → navy**

navy (default): `--app-bg: #0b1020` / `--card-bg: #111833` / `--input-bg: #1a2347` / `--brand: #8bb9ff` / `--text-body: #e6ecff` / `--text-card: #e6ecff` / `--text-muted: #bcc5e3` / `--border: #26325b`

archives: `--app-bg: #f5f5f4` / `--card-bg: #e7e5e4` / `--input-bg: #d6d3d1` / `--brand: #0f766e` / `--text-body: #292524` / `--text-card: #0f766e` / `--text-muted: #4a4540` / `--border: #d6d3d1`

explorer: `--app-bg: #e8dcc8` / `--card-bg: #1a1815` / `--input-bg: #26231f` / `--brand: #d4a574` / `--text-body: #2c2416` / `--text-card: #faf8f3` / `--text-muted: #a89580` / `--border: #5a5041`

high-command: `--app-bg: #022c22` / `--card-bg: #064e3b` / `--input-bg: #065f46` / `--brand: #fef08a` / `--text-body: #ecfdf5` / `--text-card: #ecfdf5` / `--text-muted: #81eebb` / `--border: #065f46`

Gear icon in top-right of header. Each click advances to the next theme; wraps from high-command back to navy. Show the current theme name in a small label next to the gear. Smooth transition: `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease` on `body`.

Audit every color reference — backgrounds, text, borders, focus rings, active states, hover states — and replace each with the appropriate CSS variable. The result must look intentional and polished in all four themes.

---

## Layout

**Header** — sticky, full-width:
- Left: "Impressionism"
- Right: "An exploration of the movement"
- Far right: gear icon (theme cycle)

**Main content area:**
- Heading: "Impressionism"
- Intro: "French Impressionism — born in 1874, despised by critics, now the most beloved art movement in history. Behind the shimmering surfaces were real people fighting the establishment, inventing a new way of seeing, and arguing constantly about what painting was for. This app gives you five ways into that story."
- Below the intro: the GiC Modes Panel

**Footer** — minimal, muted: "Select a mode, then invoke Gemini in Chrome."

---

## GiC Modes Panel

A collapsible panel below the intro. Default state: open.

Panel header: "GiC Modes" with a chevron toggle (▾ open / ▸ closed). Styled using `--brand` color.

Panel body: a grid of mode cards — one per entry in `GIC_MODES`. Each card shows:
- Mode name (bold, `--text-card`)
- One-line description (`--text-muted`)
- Active state: border in `--brand`, slightly elevated background using `--input-bg`

Clicking a card:
1. Sets it as the active mode
2. Writes the mode's `instruction` string into the sr-only control plane div
3. Does not close the panel

Default active mode on load: the first entry in the array.

---

## GiC Modes Data

```js
const GIC_MODES = [
  {
    name: "The Movement",
    description: "Impressionism as a story — the rebellion, the key figures, the arc.",
    instruction: `You are a knowledgeable art historian with a gift for narrative. The user wants to understand Impressionism as a story — not just what the paintings look like, but what happened: the fight against the Salon, the independent exhibitions, the key personalities, and how the movement rose, flourished, and gave way to what came next. Draw from your knowledge of the movement and the sources connected to this notebook. Be engaging and specific. When the user asks about something, go one level deeper than the obvious answer — give them the detail that makes it real.`
  },
  {
    name: "The Artist",
    description: "Deep focus on a specific artist — their obsession, their place in the story.",
    instruction: `You are an art historian specializing in individual artistic voices. The user wants to understand a specific Impressionist artist — their distinctive approach, their personal story, their place in the movement, and what sets them apart from the others. When the user names an artist, focus entirely on that person. Draw from your knowledge and the sources connected to this notebook. Go beyond the surface: what was the central obsession driving this artist's work? What did they see that the others didn't? What are the tensions or contradictions in their career?`
  },
  {
    name: "The Technique",
    description: "How Impressionist painters actually worked — methods, color theory, the logic behind the look.",
    instruction: `You are an art historian who loves explaining how paintings are actually made. The user wants to understand the technical side of Impressionism — broken brushwork, en plein air painting, color theory, the way light is constructed from separate dabs of color that blend in the eye. When the user asks a question, explain the thinking behind the technique, not just what it looks like. What problem was the technique solving? What did earlier painters do instead, and why did the Impressionists reject it? Use specific artists and paintings to make the explanation concrete. Draw from your knowledge and the sources connected to this notebook.`
  },
  {
    name: "The Outsiders",
    description: "The women of Impressionism — Morisot, Cassatt — and the barriers they navigated.",
    instruction: `You are an art historian focused on the social history of the Impressionist movement, particularly the experience of women artists. The user wants to understand how Berthe Morisot, Mary Cassatt, and other women participated in — and were shaped by — a movement that both welcomed them more than the official Salon did and still constrained what they could paint and where they could go. Draw from your knowledge and the sources connected to this notebook. Be specific about individuals, not just general patterns. What did each of these artists actually do, and what were the real constraints they worked within?`
  },
  {
    name: "What Changed",
    description: "How Impressionism led to Cézanne, Seurat, Gauguin, and modern art.",
    instruction: `You are an art historian tracing the line from Impressionism to the modern art movements it made possible. The user wants to understand not just Impressionism itself, but what it unlocked: how Cézanne took Impressionist sensation and pushed toward structure, how Seurat systematized its color theory into Pointillism, how Gauguin rejected its ties to Western naturalism entirely. Draw from your knowledge and the sources connected to this notebook. The goal is to help the user see Impressionism not as an endpoint but as a hinge — the moment painting stopped being about representing the world and started being about something else.`
  }
];
```

---

## sr-only Control Plane

Place this div as the first child of `<body>`, before everything else:

```html
<div id="ai-control-plane" class="sr-only" aria-hidden="true">
  [renders the instruction string of the active mode]
</div>
```

The div renders the `instruction` of whichever mode is currently selected. It updates immediately on mode selection — no page reload.

The `sr-only` class must hide the div visually while keeping it in the DOM:
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

## Tech Stack

- React 18 + Babel (in-browser JSX)
- Tailwind CSS CDN
- Google Fonts: Inter (UI text)
- No build step — single file, works offline

**CDN limitations:**
- `@apply` does not work with the Tailwind CDN. Any styles in a `<style>` block must use plain CSS, not `@apply`.
- Tailwind CDN cannot scan `<script type="text/babel">` at runtime, so arbitrary CSS variable classes like `text-[var(--brand)]` or `bg-[var(--app-bg)]` are never generated. **Use inline `style` props for all CSS variable references in JSX** — e.g. `style={{ color: 'var(--brand)' }}`, `style={{ backgroundColor: 'var(--card-bg)' }}`. Tailwind utility classes are still fine for spacing, layout, and typography sizing.
