---
name: nlm-notebook-lookup
description: Look up NotebookLM notebook IDs, source counts, and notes. Also use to refresh/update the notebook registry from live NotebookLM data. Trigger when Tom asks for a notebook ID, wants to know which notebook covers a topic ("what's the ID for Geography Potpourri"), asks to update or sync the notebook list, or says anything like "make sure the nlm info is up to date".
---

# NLM Notebook Lookup

Two modes: **lookup** and **refresh**.

---

## Lookup

When Tom asks for a specific notebook ID or wants to find a notebook by topic:

READ NOW: `/Users/tom/Documents/agent-test/Projects/NotebookLM/playlists/documents/notebooks.md`

Find the matching notebook(s) and surface the ID and notes. If multiple could match, list them all.

---

## Refresh

When Tom asks to update or sync the notebook list:

### Step 1 — Pull live data from NotebookLM

```bash
nlm list notebooks
```

If nlm is not on PATH, use: `/Users/tom/.local/share/uv/tools/notebooklm-mcp-cli/bin/nlm list notebooks`

If authentication has expired, stop and tell Tom to run `nlm login`, then re-run.

### Step 2 — Read the current registry

READ NOW: `/Users/tom/Documents/agent-test/Projects/NotebookLM/playlists/documents/notebooks.md`

### Step 3 — Merge and update

Compare the live list against the registry:
- **New notebooks** (in live data, not in registry): add them. Infer which section they belong to (Playlist, Meta, or Other) from the title. Leave Notes blank for now.
- **Existing notebooks**: update the title if it changed. Preserve the Notes column — those descriptions were written deliberately and should not be overwritten by live data.
- **Missing notebooks** (in registry, not in live data): do not delete. Add a `⚠ not found in live list` flag to the Notes column so Tom can decide what to do.

Overwrite `notebooks.md` with the updated content, keeping the same format and section structure.

### Step 4 — Report

Tell Tom what changed: how many added, any flagged as missing, nothing changed if identical.
