# Playlists Notebook — NLM Video Production

This folder is the root for all NotebookLM playlist video work. Sessions opened here are scoped to this project only.

## What this project does
Automated video generation pipeline: source docs → NotebookLM notebook → AI-generated videos → YouTube upload.
One notebook per playlist topic. Videos are organized into YouTube playlists.

## Key facts
- nlm CLI: `PYTHONIOENCODING=utf-8 nlm ...`
- Account: ewalltom@gmail.com
- Videos land in: `C:\Users\tomew\Videos\[playlist]\`
- Dashboard data: `C:\Users\tomew\Documents\agent-test\documents\video-dashboard-data.json`
- YouTube playlists config: `C:\Users\tomew\Documents\agent-test\documents\youtube-playlists.json`

## Skills (all in ~/.claude/skills/)
- `post-compact-playlists` — use this after /compact (reads local handoff, not global)
- `nlm-workflow` / task intake → source writing → notebook build
- `youtube-publish` — upload videos, update dashboard
- `session-logger` — write to local memory/session-log.md

## Standing rules
- Always prefix nlm commands with `PYTHONIOENCODING=utf-8`
- After writing source docs, upload and kick off videos immediately (don't ask)
- Default: one dedicated source doc per video, use `--source-ids`
- Scene writing rules: `documents/nlm-cinematic-scene-rules.md`
- Session log lives at: `memory/session-log.md` (local to this folder)
- Run log lives at: `run-log.md` (local to this folder)
