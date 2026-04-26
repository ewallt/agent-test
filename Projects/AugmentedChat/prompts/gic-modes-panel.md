# Prompt: GiC Modes Panel App

A reusable single-file web app shell. The content (topic title, intro, GiC modes) is swapped per deployment. The shell never changes.

**Theme spec:** `Projects/AugmentedChat/documents/theme-gear-system.md` — read this and implement it exactly before building anything else.

---

Build a single-file HTML web app using React 18 + Babel (in-browser JSX, no build step) and Tailwind CSS CDN.

## Layout

**Header** — sticky, full-width:
- Left: app title (`GIC_MODES_APP_TITLE`)
- Right: tagline (`GIC_MODES_APP_TAGLINE`)
- Far right: gear icon cycling four themes (see theme spec)

**Main content area:**
- Topic title: `GIC_MODES_TOPIC_TITLE`
- Intro paragraph: `GIC_MODES_TOPIC_INTRO`
- Below the intro: the GiC Modes Panel (see below)

**Footer** — minimal, muted: "Select a mode above, then invoke Gemini in Chrome."

---

## GiC Modes Panel

A collapsible panel below the intro. Default state: open.

**Panel header:** "GiC Modes" with a chevron toggle (▾ open / ▸ closed). Styled using `--brand` color.

**Panel body:** A grid of mode cards — one per entry in `GIC_MODES`. Each card shows:
- Mode name (bold)
- One-line description (muted)
- Active state: highlighted border in `--brand`, slightly elevated background

Clicking a card:
1. Sets it as the active mode
2. Writes the mode's `instruction` string into the sr-only control plane div
3. Does not close the panel

---

## GiC Modes Data

Replace the placeholder array with actual modes at deployment time:

```js
const GIC_MODES = [
  {
    name: "Mode Name",
    description: "One-line description of what this mode does.",
    instruction: `PASTE FULL GIC INSTRUCTION STRING HERE`
  },
  // additional modes...
];
```

Default active mode on load: the first entry in the array.

---

## sr-only Control Plane

Place this div as the first child of `<body>`, before the navbar:

```html
<div id="ai-control-plane" class="sr-only" aria-hidden="true">
  [active mode instruction rendered here]
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

> **CDN limitations:**
> - `@apply` does not work with the Tailwind CDN. Any styles in a `<style>` block must use plain CSS, not `@apply`.
> - Tailwind CDN cannot scan `<script type="text/babel">` at runtime, so arbitrary CSS variable classes like `text-[var(--brand)]` or `bg-[var(--app-bg)]` are never generated. **Use inline `style` props for all CSS variable references in JSX** — e.g. `style={{ color: 'var(--brand)' }}`, `style={{ backgroundColor: 'var(--card-bg)' }}`. Tailwind utility classes are still fine for spacing, layout, and typography sizing.

---

## Placeholders (replace at deployment)

| Placeholder | What it becomes |
|-------------|-----------------|
| `GIC_MODES_APP_TITLE` | App title shown in header |
| `GIC_MODES_APP_TAGLINE` | Short tagline shown in header |
| `GIC_MODES_TOPIC_TITLE` | Topic heading in main area |
| `GIC_MODES_TOPIC_INTRO` | 2–3 sentence intro paragraph |
| `GIC_MODES` array | Mode objects (name, description, instruction) |
