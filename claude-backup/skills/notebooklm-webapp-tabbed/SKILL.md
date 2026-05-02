---
name: notebooklm-webapp-tabbed
description: >
  Build a tabbed reference web app companion for a NotebookLM notebook. Use this skill whenever
  a NotebookLM task file includes `app: yes` and `app_type: tabbed`, or when Tom asks to build
  a tabbed explainer, reference, or presentation app for a notebook topic. The app presents the
  topic's major points as navigable tabs — clean, engaging, and easy for a viewer to follow.
  Output is always a single-file HTML saved to Projects/NotebookLM/ephemeral-notebook/apps/<key>.html.
  Use this skill any time the task calls for a tabbed layout rather than the Explorer+Quiz pattern.
---

## What This App Is

A standalone, single-file HTML companion to a NotebookLM notebook. It presents the topic's
major points as navigable tabs — one tab per point — with content drawn from the notebook's
sources. The design is clean and engaging, optimized for a viewer to follow without effort.

No AI proxy needed — content is embedded directly in the HTML at build time.

## Step 1 — Query the Notebook

Before writing anything, query the notebook to understand the topic's structure:

```bash
PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' notebook query <notebook-id> '<question>'"
```

Run as many queries as needed — one per major theme or angle you're considering. Use the
answers to determine:
- How many tabs the app should have
- What each tab covers
- What content, quotes, or specifics belong in each tab

The task file's `guidance` field tells you what angles to focus on. Let the notebook's
synthesized content fill in the substance.

## Step 2 — Build the App

### File output
- **Path:** `Projects/NotebookLM/ephemeral-notebook/apps/<key>.html`
- **Single file** — no dependencies, no imports, no build step

### App structure

**Tab navigation**
- Horizontal tab bar at the top
- One tab per major point (number comes from your notebook queries)
- Short, clear tab labels
- Active tab clearly distinguished

**Tab content**
- Each tab presents the content for that point
- Layout within each tab is flexible: prose, quotes, key facts, lists — whatever the content calls for
- The goal is a viewer who can land on any tab and immediately grasp the point

### Design principles

The app should feel clean, uncluttered, and pleasant to look at. A viewer should be able to
follow it without effort. What belongs in each tab — density, format, emphasis — is
instance-specific and comes from the task file guidance and your notebook queries.

## CSS Design System

Use these design tokens for visual consistency with the Explorer+Quiz app:

```css
:root {
  --bg: #070c16;
  --surface: #0f1726;
  --border: rgba(255,255,255,.10);
  --text: #e6edf7;
  --muted: #a9b6cc;
  --accent: #8bb9ff;
  --green: rgba(124,255,178,.92);
  --red: rgba(255,122,138,.95);
  --shadow: 0 12px 30px rgba(0,0,0,.35);
  --radius: 16px;
  --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}
body {
  font-family: var(--sans);
  background: linear-gradient(180deg, #070c16 0%, #0b1220 50%, #070c16 100%);
  color: var(--text);
  min-height: 100vh;
  padding: 28px 20px;
}
.wrap { max-width: 900px; margin: 0 auto; }
```

Active tab: `background: rgba(139,185,255,.12); border-color: rgba(139,185,255,.35); color: var(--accent);`

Primary accent color: `#8bb9ff`
