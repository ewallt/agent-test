---
name: video-sync-apply
description: Apply dashboard fixes identified by video-sync-check. Use when Tom asks to sync the dashboard, fix the mismatches, or apply the sync. Always run video-sync-check first so Tom can review what will change.
---

# Video Sync Apply

Applies fixes to `video-dashboard-data.json` based on mismatches identified by `video-sync-check`. Run only after Tom has reviewed the check output.

## Fix Rules

| Mismatch type | Fix |
|---|---|
| File in parent folder, card says `nlm` or `downloaded` | Update card `status` to `youtube` — conservative; Tom drags to `published` himself after social posting |
| File in `NotOnYoutube/`, no card exists | Add a new card with `status: 'downloaded'`, `nlmTitle` from filename, `playlist` from folder name, `notebook: 'Unknown'` |
| Card says `downloaded`, file not found anywhere | Flag to Tom — do not auto-fix; the file may have been uploaded manually or moved |

## Steps

**Step 1** — Confirm with Tom which mismatches to apply (or apply all if he said so).

**Step 2** — Edit `video-dashboard-data.json` using the `video-dashboard` skill conventions:
- To update status: find the entry by `title` or `nlmTitle` and change the `status` field
- To add a card: append a new entry to the JSON array

**Step 3** — Summarize what was changed.
