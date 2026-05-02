# Prompt Library — Claude Orientation

Reusable prompts that let any AI run the workflows Claude Code handles here. One universal workflow: Tom opens the dashboard, hits Copy, pastes into whichever AI he's using.

## The Solution

**Why it's designed this way:** Gemini can't read Google Docs. ChatGPT can't read Google Docs. Blogger doesn't work. URL fetching is unreliable across AI apps. The only thing that works universally is copy-paste.

**Dashboard:** `https://ewallt.github.io/claude-code-fun/prompts/`
Each prompt row has a Copy button. Clicking it fetches the `.txt` file and copies the content to clipboard. Tom pastes it into any AI — same action regardless of which AI he's using.

**Note on Gems:** Gemini Gems accessed via browser on phone work robustly (like desktop) and can receive URLs directly. URL delivery is a valid secondary option for Gems, but copy-paste is the primary workflow for all three AIs.

## Structure

```
prompts/           ← gh-pages folder (claude-code-fun repo)
  index.html       ← dashboard with copy buttons
  test-connection.txt
  aip001-gear-tab.txt
  ...

Projects/PromptLibrary/
  CLAUDE.md        ← this file
  documents/
    project-definition.md
    app-types.md   ← app types + NLM tasks with difficulty ratings
  prompts/         ← local source copies before deploying
```

## Two Tracks

- **001–009 — Web Apps:** self-contained prompts for building each app template (Gear Tab, Layered Reader, Explorer+Quiz, Flashcards). Include theme values and build rules inline.
- **010–019 — NLM Workflow:** prompts for AI-executable NLM steps (research, scene source writing, review, focus prompts, tracking).

## Adding a Prompt

1. Write the prompt (Google Doc or locally)
2. Save to `Projects/PromptLibrary/prompts/aip###-name.txt`
3. Push to gh-pages: clone, copy to `prompts/`, commit, push
4. Add a row to `prompts/index.html` (copy an existing row, update id/name/desc/filename)
5. Redeploy `index.html`
6. Update the Prompts table in `documents/project-definition.md`

## Key References

| Item | Value |
|------|-------|
| Dashboard URL | `https://ewallt.github.io/claude-code-fun/prompts/` |
| gh-pages repo | `claude-code-fun` (separate from agent-test — clone required) |
| Master Prompt List (GDoc) | `1o3BbBN6h8ObYWvoKtEUR5V6Y-DT14vTO9ixerPgRuCw` |
| aip001-gear-tab (GDoc) | `1m76Nfk4Oz120qSR9mSAJIDohD33HlCHNxjnTKaENMbA` |

## Current Status

| Prompt | Status |
|--------|--------|
| test-connection.txt | Live |
| aip001-gear-tab.txt | Google Doc only — not yet pushed to gh-pages |
| aip002–aip004 | Planned |
| aip010–aip014 | Planned |
