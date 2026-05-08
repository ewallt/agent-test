---
name: app-dashboards
description: Know and return URLs for Tom's two deployed app dashboards. Fetch the current app list from the Claude dashboard on request. Use when Tom asks for a dashboard URL, wants to know what apps are deployed, or asks to update/refresh the app list.
---

# App Dashboards

## The Two URLs

**Claude App Gallery** (apps built with Claude):
`https://ewallt.github.io/claude-code-fun/dashboard`
- ~18 apps across 7 categories: Gear Tab Apps, Layered Reader, Explorer + Quiz, Slides, Gems, Narrated Videos, Flashcards
- This is the live dashboard; can be refreshed on request

**Pocket Deploy** (older apps, pre-Claude — reference only):
`https://ewallt.github.io/pocket-deploy/`
- 6 projects: Adaptive Reader (4) + Miscellaneous (2)
- Keep for reference; not actively updated

---

## Returning URLs

If Tom asks "what's the dashboard URL" or similar — give both URLs with a one-line description of each.

---

## Updating the App List

When Tom asks to refresh or update the dashboard app list, fetch the live page:

```
WebFetch https://ewallt.github.io/claude-code-fun/dashboard
prompt: List all apps on this page — their names, categories, and URLs if present.
```

Alternatively, query the gh-pages branch directly for a complete file list:

```bash
gh api repos/ewallt/claude-code-fun/git/trees/gh-pages?recursive=1 \
  --jq '[.tree[] | select(.path | endswith(".html")) | .path]'
```

Report the current app list back to Tom. If he wants it saved, update the "Current App List" section below.

---

## Current App List (as of 2026-05-06)

Fetched from live dashboard. Categories and apps:

**Gear Tab Apps**
- Restaurant guide
- ChatGPT use cases reference

**Layered Reader**
- Health topics resource
- Art history resource

**Explorer + Quiz** (6 apps)
- Logic, theology, and philosophy interactive tools

**Slides** (2 apps)
- Paradoxes
- Philosophy

**Gems** (3 apps)
- Castles data visualization
- Historical legal proceedings (x2)

**Narrated Videos** (2 apps)
- Animated educational videos

**Flashcards** (1 app)
- Theological concepts study tool
