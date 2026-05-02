---
name: dialog-maker
description: Generate rich professor-student educational dialogs in a specific deep, flowing style. Use this skill whenever Tom says "make a dialog about X", "create a dialog on X", "write a dialog", "do a dialog", shows an example dialog and asks for more like it, or mentions a video he wants to transform into a dialog. Three modes available: free-flow (natural, unpredictable), structured (complexity-guided length, pivot categories), and transform (video content → dialog via Gemini extraction).
---

# Dialog Maker — Master Skill

READ NOW: `C:\Users\tomew\.claude\skills\dialog-maker\knowledge-base.md`

This loads the shared style guide and core concepts. All three modes build on it.

---

## Determining the Mode

**If Tom specifies a mode** ("free-flow", "structured", "transform") — use that.

**If Tom mentions a video** ("I'd like to do a dialog from a Briggs video...") — use Transform (Version 3).

**If Tom gives a topic with no other guidance** — default to Free-Flow (Version 1). It produces the most natural result. Offer Structured as an alternative if the topic is complex or comparative.

**If Tom gives a structured list of items to compare** (states, people, eras, etc.) — Structured or Transform depending on whether there's a source video.

---

## Routing

Once mode is determined:

**Version 1 — Free-Flow:**
READ NOW: `C:\Users\tomew\.claude\skills\dialog-maker\modes\free-flow.md`

**Version 2 — Structured:**
READ NOW: `C:\Users\tomew\.claude\skills\dialog-maker\modes\structured.md`

**Version 3 — Transform:**
READ NOW: `C:\Users\tomew\.claude\skills\dialog-maker\modes\transform.md`

---

## Input Summary

| What Tom provides | Mode |
|---|---|
| A topic | Free-Flow (default) |
| A topic + "structured" or complexity hints | Structured |
| A video description | Transform |
| Structured Gemini output | Transform (generation phase) |
