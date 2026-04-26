# Google Drive MCP Integration — Claude Reference

One-stop reference for the Google Drive read/write pipeline. Read this instead of reconstructing context from memory files and tickets.

---

## What This Is

A round-trip between NotebookLM and Google Docs, fully automated:

1. NotebookLM generates a Report artifact (Briefing Doc, Study Guide, etc.)
2. `nlm export to-docs` pushes it to Google Drive as a native Google Doc
3. Claude reads the doc via the Google Drive MCP server
4. Claude augments/edits the content and writes a new version back to Drive
5. Claude uploads the revised doc as a new notebook source via `nlm source add`

---

## MCP Server

**Package:** `@modelcontextprotocol/server-gdrive` (official MCP project)

Add to `~/.claude.json` under `mcpServers`:

```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_CREDENTIALS_PATH": "<ABSOLUTE_PATH_TO_HOME>/.notebooklm-mcp-cli/gcp-oauth.keys.json"
      }
    }
  }
}
```

**Credentials file location:** `~/.notebooklm-mcp-cli/gcp-oauth.keys.json`
This is the same directory the `nlm` tool uses — the file may already exist from the NotebookLM setup. Check before creating a new one.

---

## OAuth Scope

**Required:** `https://www.googleapis.com/auth/drive` (full Drive)

**Do NOT use** `drive.file` — that scope only permits access to files the app itself created. Since Tom drafts docs manually in the Google Docs UI, full Drive scope is mandatory or file discovery will fail.

**Auth pattern:** User-delegated OAuth 2.0. One-time browser login → `token.json` written to disk with a long-lived refresh token. MCP server handles all subsequent token refreshes silently. No browser popups during execution.

---

## Reading a Google Doc

Pass the document ID to the Drive MCP. Get the ID from the URL:
`docs.google.com/document/d/**<DOCUMENT_ID>**/edit`

**Important:** Native Google Docs exist on disk as `.gdoc` files — small JSON metadata pointers, not byte streams. Do NOT try to read or parse them locally. When you request a read via the MCP using the document ID, the server calls the Drive export API and returns the human-readable text. This is automatic.

---

## Writing to Google Drive

### Creating a new native Doc
Submit Markdown as the payload with MIME type `application/vnd.google-apps.document`. The Drive API converts Markdown syntax to a native richly-formatted Google Doc automatically.

### Updating existing docs — don't
Appending to an existing native Doc requires complex `batchUpdate` Docs API operations. Instead, always create a new versioned file:
- `Report_v1` ← original export
- `Report_v2` ← Claude's revision

---

## NotebookLM Export Command

```bash
# Get artifact ID first
PYTHONIOENCODING=utf-8 nlm studio status <notebook-id>

# Export Report artifact to Google Docs
PYTHONIOENCODING=utf-8 nlm export to-docs <notebook-id> <artifact-id> --title "Title"

# Export Data Table to Google Sheets
PYTHONIOENCODING=utf-8 nlm export to-sheets <notebook-id> <artifact-id> --title "Title"
```

Works with: Briefing Doc, Study Guide, Blog Post, and other Report-type artifacts.

---

## Setup Steps (one-time)

1. **API Provisioning** — Google Cloud Console: enable Drive API + Docs API on a project
2. **Credential Generation** — OAuth consent screen (External, add your account as test user) → create Desktop App Client ID → download as `gcp-oauth.keys.json` → place in `~/.notebooklm-mcp-cli/`
3. **Token Minting** — run MCP server init script → one-time browser login → `token.json` written
4. **MCP Config** — add `gdrive` block to `~/.claude.json` with absolute path to `gcp-oauth.keys.json`

---

## Ticket Status

| Ticket | Title | Status |
|--------|-------|--------|
| inf-9  | Set up Google Docs MCP server (OAuth) | pending |
| nlm-9  | End-to-end test: nlm export to-docs | pending |
| nlm-10 | Claude ↔ NotebookLM round-trip via Google Docs | pending (blocked on inf-9, nlm-9) |

---

## Quick Reference

| Item | Value |
|------|-------|
| MCP server | `@modelcontextprotocol/server-gdrive` |
| Credentials | `~/.notebooklm-mcp-cli/gcp-oauth.keys.json` |
| OAuth scope | `https://www.googleapis.com/auth/drive` |
| Read a doc | Pass document ID to MCP — handles .gdoc conversion automatically |
| Write a doc | Markdown payload + MIME `application/vnd.google-apps.document` |
| Update a doc | Don't patch — create versioned file instead |
| Export from NLM | `nlm export to-docs <id> <artifact-id> --title "Title"` |
