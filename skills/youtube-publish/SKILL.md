---
name: youtube-publish
description: Publish a downloaded NLM cinematic video to YouTube and post the link to X and Facebook. Use this skill whenever Tom says "publish", "upload to YouTube", "do YouTube", or asks about posting a video. Also use at session start if there are cards in the Downloaded column of the video dashboard.
---

# YouTube Publish Workflow

Videos are uploaded via `tools/youtube-upload.py` — no browser required. Claude runs the script, outputs the social paste blocks, and updates the dashboard.

**Do YouTube at the START of the session**, before any NLM work.

---

## Prerequisites

Two files must exist in `tools/` (gitignored — never committed):
- `youtube-client-secrets.json` — OAuth credentials from Google Cloud Console
- `youtube-token.json` — saved after first authorization run (auto-created)

If `youtube-client-secrets.json` is missing, Tom needs to:
1. Go to Google Cloud Console → YouTube Data API v3 → Credentials
2. Create OAuth 2.0 Client ID → Desktop app → Download JSON
3. Save as `tools/youtube-client-secrets.json`
4. Run the script once — browser opens for authorization, token saved automatically

---

## Step 1 — Find what needs uploading

Read `documents/video-dashboard-data.json` and look for cards with `status: 'downloaded'`.

For each downloaded card, note:
- `title` — the chosen YouTube title
- `nlmTitle` — the NLM-generated filename (used to locate the file)
- `playlist` — which playlist config to use

List them and confirm which one to publish this session. Recommend one at a time.

---

## Step 2 — Review the title

NLM sometimes assigns strange or opaque filenames that don't clearly identify what the video is about or which source it came from. The `nlmTitle` field preserves the NLM-generated filename so it can always be traced back to its source — the card `title` is the human-readable YouTube title.

**Make a decision and proceed — do not ask Tom.**

- If the card `title` is clear and descriptive, use it as-is.
- If the NLM-generated filename (`nlmTitle`) is strange or unclear, rename: update the card `title` in `video-dashboard-data.json` to something descriptive, tell Tom to rename the file in `Videos/[playlist]/Not Yet in YouTube/`, then proceed to upload. The original `nlmTitle` stays in the card for source tracking.
- Only pause if both options are genuinely ambiguous and the difference materially affects the video's reach — and even then, propose a specific recommendation rather than an open question.

---

## Step 3 — Write a per-video description

Write a 2-paragraph description tailored to this specific video. Do not use the generic playlist description. Append the playlist hashtags at the end.

**How to write it:**
- Paragraph 1: Set the scene. Put the viewer in the moment — the situation, the stakes, what was in play. Specific details, not summary.
- Paragraph 2: The turn. What happened, why it mattered, what it changed. End with the idea that makes someone want to watch — the irony, the scale, the thing they didn't know.
- Keep it tight — 3–4 sentences per paragraph. No "in this video" or "we explore." Write like a journalist, not a marketer.
- Hashtags: use the playlist hashtags from `youtube-playlists.json`, plus 3–5 specific to the video topic.

Format:
```
[Paragraph 1 — the scene, the stakes]

[Paragraph 2 — the turn, why it matters]

[playlist hashtags + video-specific hashtags]
```

---

## Step 4 — Run the upload script

**Always use `--private`.** This ensures the Published date in YouTube Studio reflects when the video goes live, not when it was uploaded. Tom flips it to Public in YouTube Studio when posting to X and Facebook.

```bash
python tools/youtube-upload.py \
  --file "C:/Users/tomew/Videos/[playlist]/Not Yet in YouTube/[nlmTitle].mp4" \
  --title "[confirmed title]" \
  --playlist "[playlist name]" \
  --private \
  --description "[full description with hashtags]"
```

The script:
- Authenticates via OAuth (browser prompt on first run only)
- Uploads the file with resumable upload (shows progress %)
- Sets title, description (per-video if `--description` passed, else playlist default), and "not made for kids"
- Publishes as Public (or Private if `--private` is passed)
- Adds to the YouTube playlist (if `playlistId` is set in `youtube-playlists.json`)
- Prints the YouTube URL and hashtags

---

## Step 5 — Output social paste blocks

Once the script prints the URL, output two ready-to-paste blocks:

**For X:**
```
[YouTube URL]&t=1s

[hashtags from playlist config]
```

**For Facebook:**
```
[YouTube URL]

[hashtags from playlist config]
```

---

## Step 6 — Update the dashboard and move the file

Use the `video-dashboard` skill to set the card's default status to `youtube` (= uploaded to YouTube, not yet posted socially).

Move the video file from `C:/Users/tomew/Videos/[playlist]/Not Yet in YouTube/[nlmTitle].mp4` to `C:/Users/tomew/Videos/[playlist]/[nlmTitle].mp4` (Claude does this — not Tom).

**Tom's step:** After posting to X and Facebook, Tom drags the card from `youtube` to `published` on the dashboard himself. Claude does not do this step.

---

## Playlist Config

`documents/youtube-playlists.json` maps playlist name → description + hashtags + playlistId.

```json
{
  "playlists": {
    "Movements in Modern Art": {
      "playlistId": "",
      "description": "A cinematic journey through the movements and artists that shaped modern art...",
      "hashtags": "#Art #Painting #ArtHistory ..."
    }
  }
}
```

If the playlist isn't in the config yet, ask Tom for the description and hashtags, add the entry, then proceed.

`playlistId` is the YouTube playlist ID (find it in Studio → Playlists → URL has `list=PL...`). Leave blank until Tom adds it — the upload will succeed without it, just won't be auto-assigned to the playlist.

---

## Troubleshooting — X Thumbnail Not Showing

X's crawler caches a "no thumbnail" state if the video was private or still processing when it first crawled the URL. The Card Validator was deprecated and is no longer available.

**Fix — Append `&t=1s` to the URL (confirmed working 2026-04-11)**
```
https://www.youtube.com/watch?v=[VIDEO_ID]&t=1s
```
This forces X to treat it as a distinct URL and re-crawl it. Confirmed working when the plain `youtube.com/watch?v=` URL and `youtu.be` both failed to show a thumbnail.

**Root cause:** X deprecated its Card Validator. The platform now relies entirely on its background crawler for Open Graph metadata. Private→public transitions propagate slowly through YouTube's CDN, causing inconsistent crawl results. The `&t=1s` parameter appears to bypass X's cached "no thumbnail" state.
