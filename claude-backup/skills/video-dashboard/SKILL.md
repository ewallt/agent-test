---
name: video-dashboard
description: Manage the video tracking Kanban dashboard at documents/video-dashboard.html. Use this skill whenever Tom asks to add a video, add a notebook, move a video to a different pipeline stage, update a video's notes or artifact ID, remove a video, or otherwise change the dashboard data. Also use when he asks about what's on the dashboard or what status a video is in.
---

# Video Dashboard Manager

The dashboard is a static HTML Kanban board at:
`C:\Users\tomew\Documents\agent-test\documents\video-dashboard.html`

**Card data lives in a separate file:**
`C:\Users\tomew\Documents\agent-test\documents\video-dashboard-data.json`

For all card operations (add, update, remove), read and edit **the JSON file only**. The HTML file contains the rendering logic and rarely needs touching. The HTML fetches the JSON at load time via `fetch('video-dashboard-data.json')`.

---

## Data Structures

### DEFAULT_VIDEOS
Each entry is one video card. Shape:
```js
{
  title: 'Video Title',          // string — must be unique; used as the drag-and-drop key
  notebook: 'Notebook Name',     // string — used for filter chips; invent names consistently
  status: 'nlm',                 // string — one of the five statuses below
  skipYt: false,                 // boolean — true = decided not to publish to YouTube
  artifactId: null,              // string | null — NLM artifact ID if known (first 8 chars)
  notes: '',                     // string — free text; use for filenames, flags, context
  focusPrompt: null,             // string | null — optional focus prompt; right-click copies to clipboard
  playlist: null,                // string | null — YouTube playlist name; shown on card in green below the notebook name
  nlmTitle: null,                // string | null — NLM-generated filename (e.g. 'Renoir__The_Painter_of_Joy'); separate from the chosen card title used on YouTube
  dateAdded: null,               // string | null — ISO date when card was added (e.g. '2026-04-07'); shown as 'added Apr 7' in card footer; null = date unknown
}
```

### COLUMNS (pipeline stages, left → right)
| status | label | Meaning |
|---|---|---|
| `source_ready` | Source Ready | Claude-prepared source written and ready to feed into NLM |
| `nlm` | In NLM | Video exists in NotebookLM (generated or in progress) |
| `downloaded` | Downloaded | Video downloaded to local disk |
| `youtube` | YouTube | Uploaded to YouTube; not yet posted to X and Facebook |
| `published` | Published | Posted to X and Facebook — Tom drags cards here himself after posting |

### Storage Keys
```js
const LS_KEY    = 'video-dashboard-v2';   // { [title]: newStatus } — drag-and-drop overrides
const LS_HIDDEN = 'video-dashboard-hidden'; // string[] — titles dragged to trash (restorable)
const LS_PERM   = 'video-dashboard-permanent'; // string[] — titles permanently removed
```
**Critical:** Do NOT bump `LS_KEY` unless the data format itself changes incompatibly (e.g., adding a new required field to each video object, or removing a field). Adding new videos, renaming columns, or changing status values does NOT warrant a bump. Bumping the key wipes all drag-and-drop overrides Tom has saved in localStorage — positions reset to defaults and his manual moves are lost.

---

## Override & Visibility System

The dashboard has three layers of state:
1. **DEFAULT_VIDEOS** — hardcoded defaults, edited in the file
2. **localStorage overrides** (`LS_KEY`) — `{ [title]: newStatus }`, applied at render time. These persist drag-and-drop moves between page reloads.
3. **Hidden set** (`LS_HIDDEN`) — titles dragged to the trash icon. Cards are hidden from the board but restorable. Tom can click the trash icon to open the menu and either restore all or permanently remove them.
4. **Permanently deleted set** (`LS_PERM`) — titles confirmed permanently removed. Cards are excluded from the board permanently (unless the entry is also removed from DEFAULT_VIDEOS).

When Tom drags a card, the new status is saved as an override keyed by `title`. The override wins over the default. This means: if the default status in `DEFAULT_VIDEOS` doesn't match where Tom has dragged the card, that's expected — the override is what's shown.

**Implication for edits:** If you change a video's `status` in DEFAULT_VIDEOS but the user has already dragged it somewhere else, the localStorage override will still win. For significant status promotions (e.g., a video was just downloaded or uploaded), also tell Tom he may want to drag the card to confirm the override updates — or just leave it, since the override is the live state.

---

## Common Operations

### Add a video
Find the `DEFAULT_VIDEOS` array and append a new entry. Use the correct status for where it sits in the pipeline right now. Group it with others at the same stage (comments like `// ── In NLM ──` mark the sections). Always include `dateAdded` set to today's date.

```js
{ title: 'New Video Title', notebook: 'Notebook Name', status: 'nlm', skipYt: false, artifactId: null, notes: '', dateAdded: '2026-04-07' },
```

### Move a video's default status
Find the entry by `title` and change its `status` field. This updates where new browsers (without overrides) will place it. If the user has already dragged the card, the localStorage override takes precedence — see above.

### Update notes or artifactId
Find the entry and edit the `notes` or `artifactId` field inline. `artifactId` is the first 8 characters of the NLM artifact ID.

### Mark as skip YouTube
Set `skipYt: true` and add a note explaining why (e.g., `notes: 'Decided not to publish'`).

### Remove a video
Delete the entire object from `DEFAULT_VIDEOS`. Since the card will no longer exist, any override stored under that title in localStorage becomes inert (it'll just be ignored on load).

### Add a new notebook
Notebooks are derived automatically from `DEFAULT_VIDEOS` — there's no separate list. Just use the notebook name consistently across all videos that belong to it, and the filter chip will appear automatically.

### Add or update a playlist
Find the entry and set the `playlist` field to the YouTube playlist name. Playlist names must be consistent across all cards that share a playlist — they map to a config in the YouTube upload script. The playlist name is displayed on the card in green below the notebook tag. Use `null` for cards that don't yet have a known destination.

```js
{ title: 'Video Title', ..., playlist: 'Movements in Modern Art' },
```

### Set the NLM title
Find the entry and set `nlmTitle` to the filename NLM assigned (without path or extension). This is used by the youtube-publish workflow to cross-reference the file and as a fallback when the chosen title needs review.

```js
{ title: 'Video Title', ..., nlmTitle: 'Renoir__The_Painter_of_Joy' },
```

### Add a focus prompt to a video
Set `focusPrompt` to a string on the card entry. A `prompt` badge will appear on the card; right-clicking it opens a menu to copy the focus prompt to clipboard. Omit the field (or set to `null`) for cards that don't have one.

```js
{ title: 'Video Title', ..., focusPrompt: 'The question or framing this video should explore.' },
```

### Hide / remove a video (via UI)
Tom drags the card to the trash icon — this adds it to `LS_HIDDEN` (soft delete). Clicking the trash icon opens a menu: "Restore" clears `LS_HIDDEN`, "Remove permanently" moves the titles to `LS_PERM`. Permanently removed cards are excluded from the board even if they remain in `DEFAULT_VIDEOS`.

---

## Reading and Editing

For card data: always Read `video-dashboard-data.json` before editing. It's a plain JSON array — edit directly.

For rendering logic changes: Read `video-dashboard.html`. The COLUMNS and LS_KEY constants are near the top of the `<script>` block.

After editing the JSON, confirm the change looks right by grepping for the affected title.

---

## What NOT to Touch

- The `COLUMNS` array rarely needs editing. Changing a `status` value would break all existing entries using that status.
- The drag-and-drop event handlers (`dragstart`, `dragover`, `drop`, `dragend`) — leave these alone.
- The filter chip logic and `render()` function — leave these alone.
- The `LS_KEY` — see the warning above.
