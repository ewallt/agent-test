---
name: nlm-web-app
description: Generates a polished tabbed single-page web app from a NotebookLM notebook. Use whenever Tom asks to create a website, web app, or HTML page from a notebook, or wants to turn notebook content into a deployable HTML file. Always invoke when the request involves a notebook and a web output.
---

# NLM Web App

Generates a screen-fit tabbed HTML app from a NotebookLM notebook.

**Architecture: NLM supplies content only — Claude writes all HTML.** If NLM writes the HTML, it ignores layout constraints and screen-fit breaks. NLM's job is to answer content questions. Claude's job is to build the page.

## What you need

- **Notebook ID** — full UUID
- **Output filename** — e.g. `my-topic` → saved as `my-topic.html`. Derive from the topic if not given.

---

## Step 1 — Query NLM for content

One query. Ask for structured content only — no HTML, no layout.

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm query notebook NOTEBOOK_ID "I'm building a 6–8 tab reference website about this topic. Please provide structured content. For each tab: (1) a short tab label (2–4 words for the navbar), (2) a section heading, (3) 4–6 bullet points of key facts or insights, (4) any statistics or data points worth featuring as large callouts, (5) any notable quotes. After the tabs, write an 'AI Briefing' section containing: 2–3 sentences summarizing the topic and source material, a one-line summary of each tab, and 4–5 questions a user might ask an AI assistant while viewing this page. Keep prose tight — content will be fitted to single viewport-height screens." 2>/dev/null
```

If the response is too large to display inline, it's saved to a tool-results file. Extract the answer:

```bash
python3 -c "
import json
with open('RESPONSE_FILE', encoding='utf-8') as f:
    data = json.load(f)
with open('/tmp/nlm-content.txt', 'w', encoding='utf-8') as out:
    out.write(data['value']['answer'])
print('Done')
"
```

---

## Step 2 — Write the HTML

Build the full HTML from the NLM content. This is Claude's work — do not delegate HTML generation back to NLM.

### Design system

**Colors:**
- Background: `#0F172A`
- Surface: `#1E293B`
- Cyan accent: `#06B6D4` — interactive elements, active tab, highlights
- Crimson accent: `#E11D48` — contrast items, opposing data
- Text: `#F8FAFC`

**Glass card:**
```css
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.05);
```

**Glass card hover:** `box-shadow: 0 0 25px rgba(6, 182, 212, 0.15); border-color: rgba(6, 182, 212, 0.3)`

**Fonts:** Google Fonts — Inter (body) + Fira Code (monospace labels):
```html
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
```

**Dependencies:** Tailwind CSS CDN only. Configure custom colors, fonts, and grid background pattern in `tailwind.config`.

**Grid background pattern** (hero tab):
```js
'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%231e293b' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
```

### Screen-fit rule (hard requirement)

Every tab must fit in one viewport. This is enforced by CSS — it does not depend on NLM constraining its content. Apply to every tab section:

```css
.tab-content > section {
  min-height: calc(100vh - 4rem);
  max-height: calc(100vh - 4rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

If the NLM content for a tab is too dense to fit at readable size, split it into two tabs. You control this — adjust tab count as needed.

### Page structure

```html
<body class="antialiased flex flex-col min-h-screen" style="background:#0F172A; color:#F8FAFC; overflow-x:hidden">

  <!-- Fixed navbar -->
  <nav class="fixed w-full z-50" style="background:rgba(30,41,59,0.8); backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.05)">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex overflow-x-auto items-center" style="-ms-overflow-style:none; scrollbar-width:none">
        <!-- Site title (font-mono, bold) -->
        <div class="font-mono font-bold text-lg mr-8 py-4 shrink-0">SITE_TITLE</div>
        <!-- Tab buttons -->
        <button data-target="tab-00" onclick="showTab('tab-00')"
          class="tab-btn px-4 py-4 font-mono text-sm whitespace-nowrap border-b-2 text-cyan-400 border-cyan-400 transition-colors flex items-center gap-2 shrink-0 outline-none">
          <div class="w-2 h-2 bg-cyan-500 rounded-sm animate-pulse indicator"></div>
          00. Intro
        </button>
        <!-- Inactive tab: text-slate-400 border-transparent, indicator hidden -->
      </div>
    </div>
  </nav>

  <!-- Tab panels -->
  <main class="pt-16 flex-grow">
    <div id="tab-00" class="tab-content block">...</div>
    <div id="tab-01" class="tab-content hidden">...</div>
  </main>

</body>
```

### Tab 00 — Hero

Full-viewport hero. Elements:
- `bg-grid-pattern` background with `#0F172A/80` overlay
- Rotating radar-sweep: `conic-gradient(from 0deg, transparent 70%, rgba(6,182,212,0.1) 100%)` spinning 360° over 10s
- Font-mono badge above heading: `[ TOPIC DESCRIPTOR ]` in cyan, glass pill style
- H1 with typewriter animation (see Animations below)
- Subtitle paragraph (`text-slate-300`)
- CTA button linking to Tab 01: glass style, cyan border, hover fills cyan

### Content tabs (01–N)

Each tab:
- Font-mono label at top: `NN / SECTION NAME` in cyan
- Large bold section heading
- Content in grid of glass cards (2 or 3 columns depending on count)
- Statistics as large callout numbers (`text-4xl font-bold text-cyan`) with small label below
- Quotes in a glass blockquote: crimson left border (`border-l-4 border-crimson`), italic text
- SVG inline chart or visual metaphor where NLM suggested data visualization — keep SVGs simple (donut chart, bar, timeline)
- `Next →` button at bottom (font-mono, text-cyan, right-arrow SVG icon):
  ```html
  <button onclick="showTab('tab-NN')" class="text-cyan-400 font-mono text-sm hover:text-cyan-300 flex items-center gap-2 transition-colors">
    NEXT: TAB LABEL <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
  </button>
  ```

### Last tab — Conclusion

Summary cards or a closing statement. Replace Next button with "Return to Start" linking to tab-00, or omit.

### Animations

**IntersectionObserver fade-in:**
```css
.animate-on-scroll { opacity: 0; transform: translateY(2rem); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
```
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
```

**Tab switch:**
```js
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.replace('block','hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    const isActive = b.dataset.target === id;
    b.classList.toggle('text-cyan-400', isActive);
    b.classList.toggle('border-cyan-400', isActive);
    b.classList.toggle('text-slate-400', !isActive);
    b.classList.toggle('border-transparent', !isActive);
    b.querySelector('.indicator').classList.toggle('hidden', !isActive);
  });
  const panel = document.getElementById(id);
  panel.classList.replace('hidden','block');
  panel.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.remove('is-visible');
    setTimeout(() => observer.observe(el), 50);
  });
}
```

**Typewriter (hero heading):**
```css
.typewriter {
  overflow: hidden; border-right: .15em solid #06B6D4; white-space: nowrap;
  animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
}
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #06B6D4; } }
```

### AI hint panel

Write this from the AI Briefing section in the NLM content. Never ask NLM to generate the panel HTML — Claude writes it.

```html
<!-- Toggle button — always visible, bottom-right -->
<button onclick="var p=document.getElementById('ai-panel'); p.style.display=p.style.display==='none'?'block':'none';"
  style="position:fixed; bottom:1.5rem; right:1.5rem; z-index:1001;
    background:rgba(15,23,42,0.9); border:1px solid #06b6d4; color:#06b6d4;
    font-family:'Fira Code',monospace; font-size:0.75rem; padding:0.4rem 0.75rem;
    border-radius:0.375rem; cursor:pointer; opacity:0.7; transition:opacity 0.2s;"
  onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">AI</button>

<!-- Panel — hidden by default -->
<div id="ai-panel" style="display:none; position:fixed; bottom:4.5rem; right:1.5rem;
  width:400px; z-index:1000; background:rgba(30,41,59,0.95); backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,0.08); border-radius:0.75rem;
  padding:1.25rem 1.5rem; color:#f8fafc; font-family:'Inter',sans-serif;
  font-size:0.875rem; line-height:1.6; box-shadow:0 8px 32px rgba(0,0,0,0.4);">
  <button onclick="document.getElementById('ai-panel').style.display='none'"
    style="position:absolute; top:0.75rem; right:1rem; background:none; border:none;
    color:#94a3b8; font-size:1.1rem; cursor:pointer; line-height:1;">×</button>
  <!-- AI Context label (font-mono, cyan, 0.7rem, uppercase, letter-spacing) -->
  <!-- Topic summary paragraph -->
  <!-- Tabs label + ul: "01 Tab Name — one-line summary" per tab, cyan mono numbers -->
  <!-- Suggested Questions label + ol: 4-5 questions -->
</div>
```

---

## Step 3 — Save

```
Projects/NotebookLM/ephemeral-notebook/apps/[filename].html
```

Tell Tom the file path when done.

---

## Notes

- `nlm query notebook` queries the whole notebook — all sources. Best results from single-topic notebooks.
- If the NLM response is persisted to a tool-results file (>40KB output), read it with `limit:` and extract via Python.
- Keep HTML self-contained — no external resources except Google Fonts and Tailwind CDN.
- The reference implementation for this skill's visual style is `how-the-allies-won.html-v2.html` in the agent-test root — read it if you need to verify a pattern.
