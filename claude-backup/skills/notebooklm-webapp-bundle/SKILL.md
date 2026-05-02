---
name: notebooklm-webapp-bundle
description: >
  Build a bundled multi-tab NotebookLM web app that combines multiple app types (Explorer+Quiz,
  Flashcards, and future types) into a single HTML file. Use this skill whenever a NotebookLM
  task file includes `app_type: bundle`, or when Tom asks to build a combined or bundled app
  for a notebook topic. The app presents multiple learning modes as top-level tabs in one file.
  Output is a single-file HTML saved to Projects/NotebookLM/ephemeral-notebook/apps/<key>.html.
  Trigger any time multiple app types should be combined — even if Tom just says "put the apps
  together" or "make one app with both".
---

## What This Produces

A single `<key>.html` file containing:
- Global CSS (design tokens, tab navigation, layout)
- A tab navigation bar (one button per included app type)
- One `<section>` per tab, each fully self-contained with its own scoped CSS and namespaced JS
- A minimal coordinator script that shows/hides sections and calls each tab's `init()` on first activation

No AI proxy at the shell level — each tab that needs AI brings its own.

## Task File Syntax

```yaml
app: yes
app_type: bundle
app_tabs: [explorer, flashcard]
```

`app_tabs` is a list of tab types to include. Currently supported: `explorer`, `flashcard`.
Order in the list = order of tabs in the UI. First tab is active by default.

Tab display labels:
- `explorer` → "Explorer"
- `flashcard` → "Flashcards"

## Step 1 — Read the Tab Skills

**READ NOW** the skill for each requested tab type before building its section:

- `explorer` tab → READ `notebooklm-webapp-explorer-tab` skill
- `flashcard` tab → READ `notebooklm-webapp-flashcard-tab` skill

Each skill tells you exactly how to build its section: how to get content, how to structure the
HTML, how to scope the CSS, and how to namespace the JS.

## Step 2 — Build the Shell

The shell is the outer HTML wrapper that all tabs live inside.

### File output
- **Path:** `Projects/NotebookLM/ephemeral-notebook/apps/<key>.html`
- **Named after the topic key** — no type suffix (e.g., `behold-your-god.html`, not `behold-your-god-bundle.html`)
- **Single file** — no dependencies, no imports, no build step

### Shell structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Topic Name]</title>
  <style>
    /* === Global design tokens === */
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
      --red: rgba(255,122,138,.95);
      --shadow: 0 12px 30px rgba(0,0,0,.35);
      --radius: 16px;
      --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--sans);
      background: linear-gradient(180deg, #070c16 0%, #0b1220 50%, #070c16 100%);
      color: var(--text);
      min-height: 100vh;
    }

    /* === App header === */
    .app-header {
      text-align: center;
      padding: 32px 20px 0;
    }
    .app-header h1 { font-size: clamp(1.5rem, 4vw, 2.1rem); font-weight: 700; letter-spacing: -.03em; }
    .app-header h1 span { color: var(--accent); }
    .app-sub { color: var(--muted); font-size: .9rem; margin-top: 6px; }

    /* === Tab navigation === */
    .tab-nav {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 24px 20px 0;
    }
    .tab-btn {
      padding: 9px 22px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--muted);
      font-size: .9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .15s;
    }
    .tab-btn:hover { border-color: rgba(255,255,255,.25); color: var(--text); }
    .tab-btn.active {
      background: rgba(139,185,255,.12);
      border-color: rgba(139,185,255,.35);
      color: var(--accent);
    }

    /* === Tab sections === */
    .tab-section { display: none; }
    .tab-section.active { display: block; }
  </style>
</head>
<body>

<div class="app-header">
  <h1>[Topic] <span>[Key Word]</span></h1>
  <p class="app-sub">[Short description] <span style="opacity:.4">v1.0</span></p>
</div>

<nav class="tab-nav">
  <button class="tab-btn active" onclick="showTab('explorer')">Explorer</button>
  <button class="tab-btn" onclick="showTab('flashcard')">Flashcards</button>
</nav>

<!-- TAB SECTIONS GO HERE -->
<section id="explorer-tab" class="tab-section active">
  <!-- explorer tab content -->
</section>

<section id="flashcard-tab" class="tab-section">
  <!-- flashcard tab content -->
</section>

<script>
  const initialized = {};

  function showTab(name) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    document.getElementById(name + '-tab').classList.add('active');

    // Init on first activation
    if (!initialized[name]) {
      initialized[name] = true;
      const ns = name.charAt(0).toUpperCase() + name.slice(1) + 'Tab';
      if (window[ns] && window[ns].init) window[ns].init();
    }
  }

  // Init the first tab immediately
  document.addEventListener('DOMContentLoaded', () => {
    const firstName = '[first-tab-name]'; // e.g. 'explorer'
    initialized[firstName] = true;
    const ns = firstName.charAt(0).toUpperCase() + firstName.slice(1) + 'Tab';
    if (window[ns] && window[ns].init) window[ns].init();
  });
</script>

</body>
</html>
```

**Tab namespace mapping:**
- `explorer` → `ExplorerTab`
- `flashcard` → `FlashcardTab`

## Step 3 — Build Each Tab Section

For each tab in `app_tabs`, build the `<section id="<name>-tab">` block per its tab skill.
Drop each completed section into the shell where indicated.

The section's own `<style>` and `<script>` tags go inside the section element.

## Step 4 — Assemble

1. Replace the shell's `[Topic]`, `[Key Word]`, `[Short description]` with actual content
2. Set version to `v1.0` (increment on rebuild)
3. Adjust tab nav buttons to match the actual tabs included
4. Set `firstName` in the init script to the first tab in `app_tabs`
5. Remove tab nav buttons and sections for any tab types not included

## Notes

- **Keyboard events:** If multiple tabs register keyboard listeners, only the active tab should
  respond. Each tab skill handles this — the flashcard tab checks visibility before acting.
- **CSS isolation:** Each section scopes all its CSS to `#<name>-tab`. Global tokens are
  available everywhere via `:root` — don't redefine them inside sections.
- **Rebuild = full file replacement.** When adding a new tab to an existing topic, rebuild the
  whole file. Read the existing sections' content, re-embed it, add the new section.

## Reference

`Projects/NotebookLM/ephemeral-notebook/apps/behold-your-god.html` — the first bundled instance
(Explorer + Flashcards). Read it if the assembly pattern is unclear.
