# Gear-Tab App Build Checklist

## Structure

Single-file HTML. No external CSS frameworks. Vanilla JS only. No CDN dependencies.

```
<head>   — meta charset, viewport, app-version meta tag, <style>
<body>   — <header>, <div class="tabs">, <main>, <footer>, <script>
```

Include version meta tag in `<head>`:
```html
<meta name="app-version" content="[filename] v1.0 [YYYY-MM-DD]">
```

---

## Theme Swatches (not a gear icon)

The reference apps use **4 colored swatch dots**, not a cycling gear icon. Use this pattern — it shows all 4 themes at a glance and allows direct selection.

```html
<div class="theme-swatches" id="swatches"></div>
```

```css
.theme-swatches { display: flex; gap: 8px; align-items: center; }
.swatch {
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid transparent; cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
  outline: none; padding: 0;
}
.swatch:hover { transform: scale(1.2); }
.swatch.active { border-color: var(--text-body); transform: scale(1.15); }
```

```js
const THEMES = [
  { name: 'navy', swatch: '#8bb9ff', vars: { ... } },
  { name: 'archives', swatch: '#0f766e', vars: { ... } },
  { name: 'explorer', swatch: '#d4a574', vars: { ... } },
  { name: 'high-command', swatch: '#fef08a', vars: { ... } },
];

const root = document.documentElement;
const swatchContainer = document.getElementById('swatches');

const swatchBtns = THEMES.map((theme, i) => {
  const btn = document.createElement('button');
  btn.className = 'swatch' + (i === 0 ? ' active' : '');
  btn.style.background = theme.swatch;
  btn.title = theme.name;
  btn.setAttribute('aria-label', theme.name + ' theme');
  btn.addEventListener('click', () => {
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    swatchBtns.forEach((b, j) => b.classList.toggle('active', j === i));
  });
  swatchContainer.appendChild(btn);
  return btn;
});
```

Fill in the `vars` objects with the exact values from `theme-gear-system.md`.

---

## Tabs

Derive tab list from data — never hardcode tab names in HTML.

```js
const CATEGORIES = [...new Set(ITEMS.map(item => item.category))];
let activeTab = CATEGORIES[0];

function renderTabs() {
  const container = document.getElementById('tabs');
  container.innerHTML = CATEGORIES.map(c =>
    `<button class="tab-btn${c === activeTab ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => { activeTab = btn.dataset.cat; renderTabs(); renderCards(); });
  });
}
```

Tab bar CSS:
```css
.tabs {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  display: flex;
  overflow-x: auto;
  transition: background-color 0.3s, border-color 0.3s;
}
.tab-btn {
  background: none; border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-muted); cursor: pointer;
  font-size: 0.875rem; font-weight: 500;
  padding: 0.875rem 1.25rem; white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
}
.tab-btn:hover { color: var(--text-body); }
.tab-btn.active { color: var(--brand); border-bottom-color: var(--brand); }
```

---

## CSS Variable Audit

Every color in the app must use a CSS variable. Before finalizing, scan for any hardcoded hex or rgb values outside the THEMES array and `:root` block. Remove them.

All interactive states (hover, active, focus) must also use variables.

Add `transition: background-color 0.3s, color 0.3s, border-color 0.3s` to `body` and key structural elements so theme switches are smooth.

---

## Card Content

Adapt card structure to the subject matter. Cards are not one-size-fits-all — design the fields to match what the content actually needs.

Common patterns seen in reference apps:
- `topPick` flag → `border-left: 3px solid var(--brand)`
- Pill tags for metadata (neighborhood, format, note)
- Travel/logistics pills at card bottom
- Star ratings in `--brand` color
- Italic highlight quote in `--brand` color

Use `flex-direction: column` on cards so content stacks predictably.

---

## Header

```html
<header>
  <div>
    <div class="site-title">[App Title]</div>
    <div class="site-subtitle">[Subtitle]</div>
  </div>
  <div class="theme-swatches" id="swatches"></div>
</header>
```

Header should be `position: sticky; top: 0; z-index: 10` so it stays visible while scrolling.

---

## Footer

```html
<footer>[Brief attribution or context line]</footer>
```

Centered, `--text-muted` color, `border-top: 1px solid var(--border)`.
