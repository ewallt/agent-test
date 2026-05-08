# Design System

Everything in this file goes into the reference `.jsx` verbatim. Do not modify the structural elements — vary only the DATA constant and tab card layouts.

## Theme System — Single Source of Truth

**Do not define the THEMES constant here.** Read it from the canonical source:

READ NOW: `/Users/tom/Documents/agent-test/Projects/AugmentedChat/documents/theme-gear-system.md`

Copy the four theme definitions (navy, archives, explorer, high-command) verbatim from that file into the THEMES constant in the reference `.jsx`. Any theme fixes are applied there and propagate automatically to all gear-tab apps and Gems.

---

## CDN Script Tags (verbatim — head section)

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
```

---

## Body Style (verbatim)

```html
<style>
  body {
    background-color: var(--app-bg);
    color: var(--text-body);
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
  }
</style>
```

---

## THEMES Constant

Read from `theme-gear-system.md` (see pointer above). Copy the four theme definitions verbatim into:

```js
const THEMES = [ /* navy, archives, explorer, high-command from theme-gear-system.md */ ];
```

---

## useEffect (verbatim — copy exactly)

```js
useEffect(() => {
  const root = document.documentElement;
  Object.entries(THEMES[activeTheme].vars).forEach(([k, v]) => root.style.setProperty(k, v));
}, [activeTheme]);
```

---

## Sub-components (verbatim)

```jsx
function Pill({ text }) {
  return (
    <span className="text-xs font-medium px-2 py-1 rounded-full"
      style={{background: 'var(--input-bg)', color: 'var(--text-muted)'}}>
      {text}
    </span>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-3"
      style={{background: 'var(--card-bg)', border: '1px solid var(--border)'}}>
      {children}
    </div>
  );
}

function CardTitle({ text }) {
  return <h3 className="text-lg font-bold" style={{color: 'var(--brand)'}}>{text}</h3>;
}
```

---

## Card Grid (verbatim)

```jsx
<div className="grid gap-4"
  style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}>
  {DATA.[section].map((item, i) => (
    <Card key={i}>
      {/* tab-specific fields here */}
    </Card>
  ))}
</div>
```

---

## App Shell (verbatim — vary only the marked sections)

```jsx
const { useState, useEffect } = React;

const TABS = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']; // ← vary tab names

const TAB_COMPONENTS = [Tab1, Tab2, Tab3, Tab4, Tab5]; // ← vary component refs

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(THEMES[activeTheme].vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [activeTheme]);

  const TabComponent = TAB_COMPONENTS[activeTab];

  return (
    <div style={{minHeight: '100vh', background: 'var(--app-bg)'}}>

      {/* Header — vary Gem name and tagline source */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
        style={{background: 'var(--card-bg)', borderBottom: '1px solid var(--border)'}}>
        <div>
          <h1 className="text-2xl font-bold" style={{color: 'var(--text-card)'}}>{DATA.[nameField]}</h1>
          <p className="text-sm mt-0.5" style={{color: 'var(--text-muted)'}}>{DATA.[taglineField]}</p>
        </div>
        <div className="flex gap-2 items-center">
          {THEMES.map((t, i) => (
            <button key={i} onClick={() => setActiveTheme(i)} title={t.name}
              style={{width: 20, height: 20, borderRadius: '50%', background: t.swatch,
                cursor: 'pointer', padding: 0,
                border: activeTheme === i ? '2px solid var(--text-body)' : '2px solid transparent',
                transform: activeTheme === i ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.15s, border-color 0.15s'}} />
          ))}
        </div>
      </header>

      {/* Tab nav */}
      <nav className="flex overflow-x-auto px-6"
        style={{background: 'var(--card-bg)', borderBottom: '1px solid var(--border)'}}>
        {TABS.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className="px-5 py-3 text-sm font-medium whitespace-nowrap"
            style={{background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === i ? 'var(--brand)' : 'var(--text-muted)',
              borderBottom: activeTab === i ? '3px solid var(--brand)' : '3px solid transparent',
              transition: 'color 0.2s'}}>
            {tab}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className="p-6">
        <TabComponent />
      </main>

      {/* Footer — vary subject name */}
      <footer className="text-center py-6 text-sm"
        style={{color: 'var(--text-muted)', borderTop: '1px solid var(--border)'}}>
        [Gem Name] · {DATA.[nameField]} · Generated by Gemini
      </footer>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

---

## Color Rule (apply everywhere)

- `var(--text-body)` — text on `var(--app-bg)` (page background)
- `var(--text-card)` — text on `var(--card-bg)` (card/header/nav background)
- These are **opposite** colors in explorer and high-command. Mixing produces invisible text.
- Header text: `--text-card` (header uses `--card-bg`)
- Nav button text: `--text-muted` inactive, `--brand` active
- Card body text: `--text-card`
- Pill text: `--text-muted`
- Page-level prose (if any): `--text-body`
