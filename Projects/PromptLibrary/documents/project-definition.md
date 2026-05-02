# Prompt Library — Project Definition

A library of reusable prompts that enable any AI (ChatGPT, Gemini, Claude chat) to run the workflows Claude Code handles in this project. The primary interface is a dashboard at GitHub Pages — Tom opens it on any device, hits Copy on the prompt he wants, and pastes it into whichever AI he's using. One workflow, any AI.

## How it Works

**Dashboard:** `https://ewallt.github.io/claude-code-fun/prompts/`

Tom opens the dashboard, hits Copy, pastes into any AI. The AI receives the full prompt text — no URL fetching required. Works identically for ChatGPT, Gemini, and Claude chat.

**Prompts** are stored as `.txt` files on gh-pages alongside the dashboard. The copy button fetches the `.txt` and copies the content to clipboard.

## Notes on AI Capabilities

- **ChatGPT:** can also fetch prompts directly by raw GitHub Pages URL if needed
- **Gemini (browser on phone):** works robustly like desktop — can receive URLs, so Gems can also be given prompt URLs directly as an alternative
- **Gemini app:** more restricted; stick to the copy-paste workflow
- **Claude Code:** reads prompts from Google Drive via MCP; uses the dashboard as reference

The copy-paste workflow is the primary method for all three. URL delivery is a useful secondary option for Gems.

## Two Tracks

### Track 1 — Web Apps
Prompts for building single-file HTML web apps in each template style. Each prompt is self-contained: includes theme values, build rules, and output format so any AI produces an app that matches the established system.

### Track 2 — NLM Workflow
Prompts for the AI-executable steps of the NotebookLM workflow: research, scene source writing, doc review, focus prompts, tracking updates.

See `app-types.md` for the full list of app types, NLM tasks, and difficulty ratings.

## Naming Convention

`aip###-name` — AI Prompt, zero-padded number, short hyphenated name.
- 000: reserved for test/utility
- 001–009: Web App prompts
- 010–019: NLM Workflow prompts

## Adding a New Prompt

1. Write the prompt as a Google Doc
2. Ask Claude to push it to gh-pages as `prompts/aip###-name.txt`
3. Add an entry to the dashboard (`prompts/index.html`)
4. Update the Prompts table below and the Master Prompt List Google Doc

## Skills

- `prompt-library-push` — reads a prompt from Google Drive and pushes it to GitHub. *(To be built.)*

## Reference

- Dashboard: `https://ewallt.github.io/claude-code-fun/prompts/`
- Master Prompt List (Google Doc): `1o3BbBN6h8ObYWvoKtEUR5V6Y-DT14vTO9ixerPgRuCw`
- Design spec (Google Doc): `1FPOa0Af8PMla0l-2ZZfkWo-Haj9GYLBLF6EQFfjoRg8`
- GitHub location: `claude-code-fun` repo, gh-pages branch, `prompts/` folder

## Prompts

### Test / Utility

| ID | Filename | Status | Description |
|----|----------|--------|-------------|
| — | `test-connection.txt` | Live | Confirms copy-paste workflow is working |

### Track 1 — Web Apps

| ID | Filename | Google Doc ID | Status | Description |
|----|----------|---------------|--------|-------------|
| aip001 | `aip001-gear-tab.txt` | `1wniQ7q8r-H4pt5ZX8weht_7viCxkN8OunWBI7qeNKLo` | Live | Gear with Tabs App builder — 4-theme swatch system, data-driven tabs |
| aip002 | `aip002-layered-reader.txt` | — | Planned | Layered Reader builder |
| aip003 | `aip003-explorer-quiz.txt` | — | Planned | Explorer + Quiz builder |
| aip004 | `aip004-flashcards.txt` | — | Planned | Flashcard app builder |

### Track 2 — NLM Workflow

| ID | Filename | Google Doc ID | Status | Description |
|----|----------|---------------|--------|-------------|
| aip010 | `aip010-nlm-research.txt` | — | Planned | Research a topic for NotebookLM source |
| aip011 | `aip011-nlm-scene-source.txt` | — | Planned | Write a scene-format source doc |
| aip012 | `aip012-nlm-scene-review.txt` | — | Planned | Review a scene doc against scene rules |
| aip013 | `aip013-nlm-focus-prompt.txt` | — | Planned | Write a video focus prompt |
| aip014 | `aip014-nlm-tracking.txt` | — | Planned | Update video tracking doc |

## Open Items

- Build `prompt-library-push` skill
- Push aip001 to gh-pages and add to dashboard
- Write and push aip002–aip004 (web app prompts)
- Write and push aip010–aip014 (NLM prompts)
