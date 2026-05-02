---
name: nlm-to-youtube
description: Full pipeline from a NotebookLM artifact to YouTube — downloads the video from NLM using the CLI, then uploads it to YouTube. Use this skill whenever Tom asks to upload, publish, or release a video that is still in NLM (status 'nlm') and hasn't been downloaded yet. This is the primary publish workflow for NLM-generated videos.
---

# NLM to YouTube

Downloads a video from NotebookLM and publishes it to YouTube. The download step is handled here; the upload step delegates to the `youtube-publish` skill to avoid duplicating that logic.

---

## Step 1 — Identify the video

Read `documents/video-dashboard-data.json`. Find the card Tom specified (or the one with `status: 'nlm'` that's ready to go).

Confirm you have:
- `artifactId` — first 8 chars of the NLM artifact UUID
- `nlmTitle` — the filename NLM assigned (used as the output filename)
- `notebook` — which NLM notebook it lives in (cross-reference `memory/working-notes.md` for the notebook ID)
- `playlist` — which Videos subfolder to download into

If `artifactId` or `nlmTitle` is missing from the card, tell Tom what's needed before continuing.

---

## Step 2 — Resolve the full artifact UUID

The dashboard stores only the first 8 chars. The download command needs the full UUID.

```bash
PYTHONIOENCODING=utf-8 nlm list artifacts NOTEBOOK_ID
```

Find the artifact whose ID starts with the 8-char `artifactId`. Copy the full UUID.

If only one artifact is listed and the first 8 chars match — use it. If multiple artifacts are listed, match by ID prefix.

---

## Step 3 — Download the video

```bash
PYTHONIOENCODING=utf-8 nlm download video NOTEBOOK_ID \
  --id FULL_UUID \
  --output "C:/Users/tomew/Videos/[playlist]/Not Yet in YouTube/[nlmTitle].mp4"
```

Replace `[playlist]` and `[nlmTitle]` with the values from the card. The output filename must exactly match `nlmTitle` — this is how `youtube-publish` finds the file.

If the download fails with an auth error, tell Tom to run `! nlm login` and retry.

---

## Step 4 — Update the dashboard card to `downloaded`

READ NOW: `C:\Users\tomew\.claude\skills\video-dashboard\SKILL.md`

Set the card's `status` to `'downloaded'` in `documents/video-dashboard-data.json`.

---

## Step 5 — Hand off to youtube-publish

READ NOW: `C:\Users\tomew\.claude\skills\youtube-publish\SKILL.md`

Proceed with **Steps 2–5** of `youtube-publish` (title review → upload → social paste blocks → dashboard update + file move).

Skip Step 1 of `youtube-publish` (find what needs uploading) — you already know what to upload. The file is at `C:/Users/tomew/Videos/[playlist]/Not Yet in YouTube/[nlmTitle].mp4`.
