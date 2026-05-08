---
name: doc-writer
description: Write styled HTML reference documents for Tom's agent-test project. Use this skill whenever Tom asks to "write a document", "create a doc", "make a reference page", or wants an HTML page documenting something in this project — a workflow, a tool, a system, a design decision, a how-it-works guide. The output is a single self-contained .html file in the established dark theme. Trigger on any request for a document or reference page about project topics, even phrased casually. Do NOT trigger for general web apps or interactive tools (use frontend-design or notebooklm-webapp instead), or for collaborative drafts and specs (use doc-coauthoring instead).
---

# Doc Writer

Tom's project has a set of HTML reference documents — polished, dark-themed pages covering tools, workflows, design decisions, and how-it-works explanations. When asked to write one, produce a complete, substantive `.html` file and save it.

## Where to save

- **Project-wide topics** → `agent-test/documents/`
- **Project-specific topics** → the project's own `documents/` subfolder (e.g. `Projects/Remotion/bar-chart-race/documents/`)

If you save to `agent-test/documents/`, also update `agent-test/documents/index.html` — add a card for the new doc so it appears in the index.

## What to write

Tom gives a topic and trusts your judgment on structure, depth, and sections. Write the actual content — these are real reference documents, not outlines or stubs. Cover whatever makes the page useful: overview, how it works, key concepts, reference tables, commands, examples, gotchas, design decisions. Match the depth and tone of the existing docs.

## The theme

Use this CSS as the base. Add component styles as needed for the specific content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Title]</title>
<style>
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
    --radius: 14px;
    --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: linear-gradient(180deg, #070c16 0%, #0b1220 60%, #070c16 100%);
    color: var(--text);
    font-family: var(--sans);
    line-height: 1.65;
    min-height: 100vh;
    padding: 0 0 80px;
  }

  /* Header */
  header {
    border-bottom: 1px solid var(--border);
    padding: 52px 24px 40px;
    text-align: center;
  }
  .badge {
    display: inline-block;
    background: rgba(139,185,255,.12);
    border: 1px solid rgba(139,185,255,.25);
    border-radius: 99px;
    color: var(--accent);
    font-size: .8rem;
    font-weight: 600;
    letter-spacing: .08em;
    padding: 4px 14px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  header h1 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -.03em;
    margin-bottom: 14px;
  }
  header h1 span { color: var(--accent); }
  header p {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Layout */
  .container { max-width: 820px; margin: 0 auto; padding: 0 24px; }
  section { margin-top: 48px; }
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  h2 .icon {
    background: rgba(139,185,255,.12);
    border-radius: 8px;
    color: var(--accent);
    font-size: 1rem;
    padding: 6px 9px;
  }
  h3 { font-size: 1rem; font-weight: 600; margin-bottom: 10px; color: var(--text); }

  /* Card */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-bottom: 16px;
    overflow: hidden;
  }
  .card-bd { padding: 22px 24px; }
  p { color: var(--muted); font-size: .97rem; margin-bottom: 12px; }
  p:last-child { margin-bottom: 0; }
  p strong { color: var(--text); }

  /* Inline code and code blocks */
  code {
    background: rgba(139,185,255,.1);
    border-radius: 5px;
    color: var(--accent);
    font-family: var(--mono);
    font-size: .85em;
    padding: 2px 7px;
  }
  .code-block {
    background: #060b15;
    border: 1px solid var(--border);
    border-radius: 10px;
    font-family: var(--mono);
    font-size: .85rem;
    line-height: 1.7;
    margin: 14px 0;
    overflow-x: auto;
    padding: 16px 20px;
    white-space: pre;
  }

  /* Callouts */
  .callout {
    border-radius: 10px;
    padding: 16px 20px;
    margin: 16px 0;
    font-size: .92rem;
  }
  .callout.warn  { background: rgba(255,214,100,.07); border: 1px solid rgba(255,214,100,.25); color: var(--yellow); }
  .callout.info  { background: rgba(139,185,255,.07); border: 1px solid rgba(139,185,255,.2);  color: var(--accent); }
  .callout.green { background: rgba(124,255,178,.07); border: 1px solid rgba(124,255,178,.2);  color: var(--green);  }
  .callout strong { display: block; margin-bottom: 6px; }
</style>
</head>
```

## Common components

**Section heading with icon:**
```html
<h2><span class="icon">📋</span> Section Title</h2>
```

**Reference table (two-column key/value rows):**
```html
<div class="card">
  <div style="display:grid; grid-template-columns: 200px 1fr; font-size:.88rem;">
    <div style="padding:11px 20px; border-bottom:1px solid var(--border); font-family:var(--mono); color:var(--accent);">item</div>
    <div style="padding:11px 20px; border-bottom:1px solid var(--border); color:var(--muted);">description</div>
  </div>
</div>
```

**Callouts:**
```html
<div class="callout warn"><strong>Watch out</strong> Something to be careful of.</div>
<div class="callout info"><strong>Note</strong> Helpful context.</div>
<div class="callout green"><strong>Tip</strong> Something that works well.</div>
```
