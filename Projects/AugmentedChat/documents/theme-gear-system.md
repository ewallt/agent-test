# Theme: Gear System

Four themes cycled by a gear icon in the header. This is the canonical spec — build prompts reference this document rather than embedding the theme inline.

---

## CSS Variables

Define on `:root`. Every color in the app must reference these variables — no hardcoded colors, no Tailwind color classes that override the palette.

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

Apply theme changes by setting properties on `document.documentElement`.

---

## The Four Themes

Cycle in this order: navy → archives → explorer → high-command → navy

**navy** (default — deep blue):
`--app-bg: #0b1020` / `--card-bg: #111833` / `--input-bg: #1a2347` / `--brand: #8bb9ff` / `--text-body: #e6ecff` / `--text-card: #e6ecff` / `--text-muted: #bcc5e3` / `--border: #26325b`

**archives** (clean light — teal headers):
`--app-bg: #f5f5f4` / `--card-bg: #e7e5e4` / `--input-bg: #d6d3d1` / `--brand: #0f766e` / `--text-body: #292524` / `--text-card: #0f766e` / `--text-muted: #4a4540` / `--border: #d6d3d1`

**explorer** (warm parchment — split palette: light bg, dark cards):
`--app-bg: #e8dcc8` / `--card-bg: #1a1815` / `--input-bg: #26231f` / `--brand: #d4a574` / `--text-body: #2c2416` / `--text-card: #faf8f3` / `--text-muted: #a89580` / `--border: #5a5041`

**high-command** (dark forest green + yellow):
`--app-bg: #022c22` / `--card-bg: #064e3b` / `--input-bg: #065f46` / `--brand: #fef08a` / `--text-body: #ecfdf5` / `--text-card: #ecfdf5` / `--text-muted: #81eebb` / `--border: #065f46`

---

## Gear Icon Behavior

- Render a gear SVG button in the top-right of the header
- Each click advances to the next theme in the cycle; wraps from high-command back to navy
- Show the current theme name in a small label next to the gear (e.g. "navy")
- Smooth transition: `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease` on `body`

---

## Audit Requirement

Every color reference in the app — backgrounds, text, borders, focus rings, active states, hover states, any component — must use a CSS variable. The result must look intentional and polished in all four themes.
