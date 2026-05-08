---
name: video-sync-check
description: Check whether the video dashboard cards are in sync with the file system. Use this whenever Tom asks to check sync, audit the dashboard, or wants to know if any cards are out of date.
---

# Video Sync Check

Compares the `Videos/` file system against dashboard card statuses. Flags mismatches — does NOT make any changes.

## Important Limitation

The dashboard uses **localStorage** to track drag-and-drop status overrides. These are stored in the browser and invisible to this skill — only the HTML default statuses can be read. A card may appear in a completely different column on screen without the HTML changing.

**For debugging localStorage discrepancies:** Ask Tom to open the browser console (F12) and run each of these:

```js
// Status overrides (drag-and-drop column changes)
JSON.parse(localStorage.getItem('video-dashboard-v2') || '{}')

// Hidden cards
JSON.parse(localStorage.getItem('video-dashboard-hidden') || '[]')

// Permanently deleted cards
JSON.parse(localStorage.getItem('video-dashboard-permanent') || '[]')
```

Tom pastes the output and you can cross-reference the overrides against the HTML defaults and file system to find discrepancies.

## Logic

### What the file location implies

| File location | Implied status |
|---|---|
| `Videos/[playlist]/[file].mp4` | Uploaded to YouTube — card should be `youtube` or `published` |
| `Videos/[playlist]/NotOnYoutube/[file].mp4` | Downloaded, not uploaded — card should be `downloaded` |

### Steps

**Step 1 — Scan the file system**

List playlist subfolders in `C:/Users/tomew/Videos/`. Playlist folders are named subfolders (not loose .mp4 files). Known playlist folders: `Behold Your God`, `Movements in Modern Art`. Skip non-playlist folders (`Captures`, `Screen Recordings`, etc.).

For each playlist folder:
- List .mp4 files directly in the folder (uploaded)
- List .mp4 files in `NotOnYoutube/` or `Not Yet in Youtube/` subfolders if they exist (downloaded)

Strip `.mp4` from filenames to get the nlmTitle for matching.

**Step 2 — Read the dashboard**

Read `C:\Users\tomew\Documents\agent-test\documents\video-dashboard-data.json`. Note each card's `title`, `nlmTitle`, `status`, and `playlist`.

**Step 3 — Cross-reference**

Match files to cards by `nlmTitle`. Flag:

1. **Stale card** — file is in the parent folder (uploaded) but card status is `nlm` or `downloaded`
2. **Missing card** — file is in `NotOnYoutube/` and no card has a matching `nlmTitle`
3. **Phantom card** — card has `status: 'downloaded'` but file is not found in `NotOnYoutube/` (may have been uploaded manually without updating the card)

Cards with no `nlmTitle` set cannot be matched — skip them silently.

**Step 4 — Output**

If mismatches found, list them concisely:
```
Mismatches found:
- [nlmTitle] — file in parent folder, card says 'nlm' → should be 'youtube'
- [filename] — file in NotOnYoutube/, no card found
```

If everything is in sync: "Dashboard in sync with file system."

Do NOT make any changes. To apply fixes, use the `video-sync-apply` skill.
