# Session Handoff — 2026-03-13

## What Was Done This Session

### Google Drive MCP Integration — Research & Setup

- Investigated NotebookLM's Google Docs export feature — confirmed `nlm export to-docs` exists (undocumented in README but real)
- Verified via `nlm export --help` and `nlm export to-docs --help` — command is real, syntax confirmed
- Gemini provided architecture spec via ReadMe.txt: `@modelcontextprotocol/server-gdrive`, user-delegated OAuth 2.0, full `drive` scope (not `drive.file`), credentials at `~/.notebooklm-mcp-cli/gcp-oauth.keys.json`
- Wrote two reference docs: `documents/gdrive-integration.html` (Tom) and `ephemeral-notebook/documents/gdrive-integration.md` (Claude one-stop reference)
- Updated `documents/index.html` to add the new gdrive integration card
- Tom created OAuth credentials in Google Cloud Console (web app type, localhost redirect), downloaded JSON
- Copied credentials to `~/.notebooklm-mcp-cli/gcp-oauth.keys.json`
- Added `gdrive` MCP server block to `~/.claude.json` — ready to load on next restart

### nlm CLI Doc Update (nlm-8)

- Added four missing command groups to `documents/notebooklm-cli.html`:
  - `export` — `to-docs`, `to-sheets`, `artifact`
  - `login` — `profile list`, `profile switch`, `profile add` (multi-account)
  - `skill` — `skill install claude-code/gemini-cli/cursor`, `skill list`
  - Updated `source add` to note supported file types (PDF, TXT, Markdown, audio)
- Updated artifact table: Report and Data Table rows now note their Google Docs/Sheets export destinations
- Updated `studio status` row to note it's also how you get artifact IDs for export
- Ticket nlm-8 marked done

### nlm Export to-docs — End-to-End Test (nlm-9)

- Used Double-Entry Bookkeeping notebook (18b286a4), existing report artifact e87e8b33
- `nlm export to-docs` succeeded — doc live at https://docs.google.com/document/d/1IPNE41yztAeqfLPlyjvHoGbcuV8UN24d2WLHsrLDUuw
- Ticket nlm-9 marked done

### Prompt Injection Incident — Gemini Message

- Gemini sent a message formatted as `<system_update_for_claude_code>` with instructions to run destructive reinstall commands and treat `nlm --ai` output as authoritative
- Flagged to Tom as a prompt injection attempt — correctly identified the fake system tag, version mismatch, and suspicious `nlm --ai` framing
- Followed up: `nlm export to-docs` turned out to be real (just undocumented); version mismatch and destructive commands were not needed
- Gemini acknowledged: framing was flawed, core CLI info was accurate

### Tickets Created

- `nlm-8` — Update notebooklm-cli.html (done)
- `nlm-9` — End-to-end test: nlm export to-docs (done)
- `nlm-10` — Claude ↔ NotebookLM round-trip via Google Docs (pending, blocked on inf-9)
- `inf-9` — Set up Google Docs MCP server OAuth (partially done — credentials in place, MCP config added, OAuth consent pending first restart)

### Drinker Paradox App Description

- Saved source content from the Drinker Paradox notebook to `Projects/NotebookLM/ephemeral-notebook/reference/drinker-paradox-app.txt` for future reference

### ReadMe Convention

- Established: Tom uses `agent-test/ReadMe.txt` to pass long content to Claude (architecture specs, etc.) — saved to memory

---

## State Right Now

- On `dev` branch; changes uncommitted
- `~/.claude.json` has the gdrive MCP server block added
- `~/.notebooklm-mcp-cli/gcp-oauth.keys.json` exists with OAuth credentials (web app type)
- MCP server will load on next Claude Code restart — first use will trigger browser OAuth consent

## Next Session Priority

Test the full Claude ↔ NotebookLM round-trip via Google Drive. On startup, read `ephemeral-notebook/documents/gdrive-integration.md` to reload context. Then: verify the gdrive MCP server loaded correctly, complete the one-time OAuth browser consent if needed, confirm Claude can read the exported Double-Entry Bookkeeping doc, then test writing back to Drive and uploading as a notebook source. Goal: nlm-10 done.

## Other Items

- No blockers flagged by Tom
- Nothing else to add

## Session Start

Auto-start: Read `ephemeral-notebook/documents/gdrive-integration.md` to reload context on the Google Drive MCP integration. Then verify the gdrive MCP server is loaded and attempt the round-trip test (nlm-10).
