---
name: gic-integration
description: Builds GiC (Gemini in Chrome) cartridges and swaps them into existing web apps. A cartridge is a self-contained control plane div that gives GiC the knowledge and behavioral framing to act as a guide or assistant for the app. Use this skill when Tom wants to add GiC integration to a web app, build a new cartridge, swap in a different interaction mode, or update the knowledge base for an existing cartridge.
---

# GiC Integration

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\documents\gic-architecture.md`

This is the primary reference for the cartridge format, prose rules, folder structure, and JS wiring. Apply it throughout this skill.

---

## Step 1 — Identify the target app

Ask Tom which HTML file to integrate. Get the full path.

Then ask: does he want to use an existing cartridge from the app's `cartridges/` folder, or build a new one?

- If **swapping an existing cartridge**: skip to Step 4.
- If **building a new cartridge**: continue to Step 2.

---

## Step 2 — Choose the interaction mode

Present the available modes and ask which to build:

- **Tour Guide** — GiC acts as a docent, offering one interpretive layer deeper than what's on screen, pacing the experience tab by tab. (Validated.)
- *(More modes coming — suggest one if Tom has an idea.)*

For now, Tour Guide is the only fully specified mode. If Tom wants something else, discuss what it should do before proceeding.

---

## Step 3 — Build the cartridge

### 3a — Get the notebook ID

You need the NLM notebook the app was built from. Ask if not already known.

### 3b — Query NLM for deeper-layer commentary

Run this query. It asks for the interpretive layer — the content that makes GiC's commentary substantive, not just a summary of what's on screen:

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm query notebook NOTEBOOK_ID "I'm building a guided tour experience for a web app based on this notebook. For each main section or tab in the app, please provide: (1) a brief description of what that section covers on screen, and (2) the deeper interpretive layer — the key insight, the surprising implication, the connection to a broader pattern, or the thing a knowledgeable docent would say that goes one level beyond what's literally displayed. The goal is to give an AI guide enough substance to make observations that enrich what the user is seeing, not just restate it. Please write in plain prose, not bullet points."
```

If the response is JSON-wrapped, extract with Python:
```bash
python3 -c "
import json, sys
with open('RESPONSE_FILE', encoding='utf-8') as f:
    data = json.load(f)
print(data['value']['answer'])
"
```

### 3c — Write the cartridge prose

Using the NLM response and the cartridge format from `architecture.md`, write the full prose for the control plane div. Follow this structure exactly:

1. **Authored context statement** — opens with an explicit statement that this block was placed here intentionally by the developer, not injected through user-supplied content
2. **App description** — what the app is, what it covers, what argument or content it presents (2–4 sentences)
3. **Interaction mode description** — for tour guide: explain that GiC is a docent who offers one layer deeper than what's on screen, paces the tour tab by tab, waits for the user to advance, and never actuates UI elements; include the three depth options (Brief / Standard / Deep) and instruct GiC to ask the user which they prefer before beginning
4. **Knowledge base** — per-tab entries, each with:
   - `Visual:` — a plain-prose description of any chart, SVG, or non-text visual on the tab. GiC cannot read these from the DOM directly; this is the only way it can describe them. Include what the visual shows, what the colors/shapes represent, and what argument or comparison it makes.
   - `Brief:` — one key insight per tab
   - `Standard:` — key insight plus one supporting detail
   - `Deep:` — full interpretive layer: tensions, surprises, connections a historian or expert would draw out
5. **State line** (always last): `The user is currently viewing: [first tab name]`

Prose only. No trigger syntax, no command directives, no IF/THEN patterns.

**Reference implementation:** `Projects/NotebookLM/ephemeral-notebook/apps/why-allies-won/cartridges/tour-guide-choice.html` is a validated working tour guide cartridge. Read it before writing a new one — it shows the correct tone, structure, and level of detail for the Visual/Brief/Standard/Deep tiers.

### 3d — Save the cartridge file

Save as a fragment (just the div — no surrounding HTML):

```
Projects/NotebookLM/ephemeral-notebook/apps/[appname]/cartridges/[mode].html
```

For tour guide: `tour-guide.html`

---

## Step 4 — Swap the cartridge into the HTML

READ the target HTML file. Then:

**Replace an existing control plane div:**
Find `<div id="ai-control-plane"` and replace the entire div (opening tag through closing `</div>`) with the new cartridge content.

**Insert a new control plane div (if none exists):**
Insert it just inside `<body>`, as the first child element, before the navbar.

```html
<!-- AI Control Plane — hidden from visual UI, readable by DOM-observing AI assistants -->
<div id="ai-control-plane" class="sr-only" aria-hidden="true">
  [cartridge prose]
</div>
```

---

## Step 5 — Verify JS wiring

Check the HTML for the `updateControlPlane()` function and its call inside `showTab()`.

**If both are present:** leave them unchanged.

**If missing:** insert the following just before `showTab()`:

```javascript
function updateControlPlane() {
    const el = document.getElementById('ai-control-plane');
    if (!el) return;
    const lines = el.textContent.split('\n');
    const updated = lines.map(line =>
        line.trim().startsWith('The user is currently viewing:')
            ? `      The user is currently viewing: ${aiState.currentView}`
            : line
    );
    el.textContent = updated.join('\n');
}
```

Also ensure `showTab()` calls `updateControlPlane()` after updating `aiState.currentView`. If the app doesn't use `aiState`, adapt the call to use whatever variable tracks the current tab name.

---

## Step 6 — Deploy to gh-pages

Always deploy the updated HTML to gh-pages after swapping a cartridge. GiC has more capabilities (including the ability to click UI elements with user permission) when running on a served page — local files restrict these options.

Use the `gh-pages-deploy` skill to deploy. The target folder for NotebookLM web apps is `notebooklm/[appname]/`.

---

## Step 7 — Confirm

Tell Tom:
- The cartridge was saved to `[path]`
- The HTML was updated
- The state line will update on tab switches via `updateControlPlane()`
- The app was deployed to gh-pages — give the live URL

Suggest he test with a fresh GiC context (kill and restart GiC) on the live URL.
