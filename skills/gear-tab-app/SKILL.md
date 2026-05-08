---
name: gear-tab-app
description: Build and deploy a themed, tabbed single-file HTML web app. Use this skill whenever Tom wants to turn an idea, document, or data into a web app with tabs and the 4-color theme gear system — e.g. "build an app for this", "make a tabbed app from this doc", "turn this into a gear-tab app", "build me a [topic] guide/explorer/reference app". Input can be anything: a conversational description, a pasted document, a data dump, or a mix. Always use this skill rather than building ad hoc.
---

# Gear-Tab App Builder

Turns varied input into a themed, tabbed single-file HTML web app and deploys it.

**Output signature:**
- 4 colored swatch dots in header → instant theme switching (navy / archives / explorer / high-command)
- Tab bar → content organized by category, derived from the data (never hardcoded)
- Deployed to `https://ewallt.github.io/claude-code-fun/`

---

## Step 1 — Understand the input

Input can be anything:
- A conversational idea ("build me a São Paulo restaurant guide")
- A pasted document or notes
- A data file or structured data
- A mix of the above

Read what Tom gave you. Identify:
- **Subject** — what this app is about
- **Natural tab categories** — what groups the content organizes into
- **Card/item structure** — what each item within a tab contains

If the input is rich enough to infer all three clearly, proceed to Step 2 without asking.

If the tab structure or content shape is genuinely ambiguous, propose a specific interpretation and ask Tom to confirm in one message — don't ask multiple clarifying questions.

---

## Step 2 — Propose title, filename, tabs, and subfolder

Draft and confirm with Tom (one short message):
- **App title** — shown in header (e.g. "São Paulo Dining")
- **Subtitle** — one-line context shown under title (e.g. "From Cereijas, Taboão da Serra")
- **Filename** — kebab-case `.html` (e.g. `sp-restaurants.html`)
- **Tab list** — derived from the data, not invented
- **Deploy subfolder** — where it lives on gh-pages (e.g. `sp-restaurants`)

If obvious from the input, propose without asking and proceed unless Tom objects.

---

## Step 3 — Build the app

READ NOW: `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\documents\theme-gear-system.md`

READ NOW: `C:\Users\tomew\.claude\skills\gear-tab-app\references\build-checklist.md`

Build a single-file HTML app following the checklist. Reference implementations to consult if anything is unclear:
- `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\apps\sp-restaurants.html` — data-driven tabs, card grid, travel pills
- `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\apps\claude-code-fun-dashboard.html` — categorized grid, same swatch system

---

## Step 4 — Save

Save to: `C:\Users\tomew\Documents\agent-test\Projects\AugmentedChat\apps\[filename].html`

---

## Step 5 — Deploy

Re-read `C:\Users\tomew\.claude\skills\gh-pages-deploy\SKILL.md` immediately before running.

Target: top-level subfolder matching the filename (e.g. `sp-restaurants/`). No `notebooklm/` prefix for these standalone apps.

Report the live URL when done.
