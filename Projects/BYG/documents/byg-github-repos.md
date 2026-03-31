# BYG GitHub Repository Structure

## The Three Repos

| Repo | Purpose |
|------|---------|
| `agent-test` (github.com/ewallt/agent-test) | Full project backup — source, skills, documents, all projects. Source of truth. |
| `byg-dev` (github.com/ewallt/byg-dev) | BYG staging site — rendered outputs under review. |
| `byg` (github.com/ewallt/byg) | BYG production site — what's officially published. URL: ewallt.github.io/byg/ |

The local `agent-test` git repo is the source of truth. byg-dev and byg are downstream publication targets — they receive rendered outputs only (HTML, MP4), never source files.

## Branch Structure (both byg-dev and byg)

| Branch | Contains |
|--------|---------|
| `main` | Full content — everything on gh-pages plus any source files |
| `gh-pages` | Deployable subset — HTML wrapper pages, MP4 videos, BYG web app. Publicly served by GitHub Pages. |

Everything on gh-pages is also in main. Not everything in main is on gh-pages.

## What Goes on gh-pages

```
behold-your-god/index.html       ← BYG web app
byg-nuclear-plant/
  index.html
  nuclear-plant-v5.mp4
byg-god-not-criminal/
  index.html
  god-not-criminal-v1.mp4
byg-white-hat-black-hat/
  index.html
  white-hat-black-hat-v1.mp4
```

## Promotion Workflow

1. **Build locally** — TSX composition, audio, MP4 render in agent-test
2. **Deploy to byg-dev** — wrapper HTML + MP4 pushed to byg-dev/gh-pages
3. **Review** — Tom reviews at ewallt.github.io/byg-dev/
4. **Promote to prod** — approved files copied to byg/gh-pages → live at ewallt.github.io/byg/

## Key Rule

Status is structural. byg-dev = built and reviewed. byg = prod. Location tells you the status — no need to remember what was deployed when.

## Current State (2026-03-30)

- `byg` and `byg-dev` repos: not yet created
- `byg` prod: will start with README only; nothing goes live until deliberately promoted
- `byg-dev`: will start with current BYG files copied from claude-code-fun gh-pages
