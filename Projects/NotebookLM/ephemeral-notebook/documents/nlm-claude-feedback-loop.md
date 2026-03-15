# Claude ↔ NotebookLM Feedback Loop

One-stop reference for the architecture, setup, and operation of the loop that lets Claude read NotebookLM outputs, improve them, and feed them back in — without Tom in the middle.

---

## Two Loops — Query and Drive

There are two distinct ways Claude can access NotebookLM content. **Query is preferred for most use cases.**

### Loop 1 — Direct Query (preferred)

```
NotebookLM (sources loaded) → nlm notebook query → Claude reads response → Claude acts
```

Claude queries the notebook directly with targeted questions. NLM synthesizes an answer from its sources and returns it. No artifact export, no Drive, no OAuth — just a command and a response.

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "<question>"
```

**Use this for:**
- Populating web app FOCUS_PROMPTS before building the app
- Getting NLM's synthesis of a topic to inform Claude-written sources
- Exploring what the notebook knows before deciding what to build
- Any case where you need content from the notebook, not the artifact itself

You can ask as many questions as needed. Responses are rich, grounded in the sources, and available immediately — no waiting for artifact generation.

**Confirmed working:** 2026-03-14. Queried "The Current State of Claude Code" notebook (post-cutoff topic). Responses included detailed feature lists, timelines, and best practices sourced from 2025–2026 articles — content Claude had no independent knowledge of.

---

### Loop 2 — Google Drive Export (for source augmentation)

```
NLM artifact → nlm export to-docs → Google Drive → Claude reads via gdrive MCP → Claude improves → nlm source add → NLM regenerates
```

Claude reads an exported NLM artifact from Google Drive, augments or rewrites it, and feeds it back as a new notebook source.

**Use this for:**
- Augmenting or critiquing an NLM-generated slide manifest before Gemini builds slides from it
- Multi-pass iterative refinement of a briefing doc or study guide
- Reading existing Google Docs that Tom has stored in Drive
- Cross-notebook synthesis where artifact content (not just summaries) is needed

**Confirmed working:** 2026-03-13. Exported Double-Entry Bookkeeping slide manifest → Claude read it → added Slide 6 + deepened two others → re-uploaded → loop closed end-to-end.

---

## Why This Matters

Before the feedback loop, the workflow was:
- Tom drops a task → Claude builds notebook → NLM generates artifacts → Tom reviews

With the loop:
- Claude can query what NLM knows and use that to build better artifacts
- Claude can act as editor/critic between NLM passes
- Quality gating: Claude reviews before Tom sees it
- Iterative refinement: NLM generates draft → Claude enriches → NLM regenerates with better grounding
- Cross-notebook synthesis: Claude reads multiple notebooks, merges insights, feeds a new notebook
- Autonomous runs: Tom drops a task file; Claude orchestrates everything including improving NLM's own output

---

## Architecture

### Components

| Component | Role |
|-----------|------|
| `@modelcontextprotocol/server-gdrive` | MCP server — gives Claude read access to Google Drive |
| `mcp__gdrive__search` | Search Drive by filename |
| `ReadMcpResourceTool` | Read a specific doc by ID (returns markdown) |
| `nlm export to-docs` | Push NLM artifact → Google Drive as native Google Doc |
| `nlm source add --file` | Upload local file as new notebook source |
| `gdrive-token.json` | OAuth token — minted once, refreshed silently |

### Scope limitation

The MCP server uses `drive.readonly` scope. Claude can read Drive but cannot write back to it via MCP. The workaround: write the improved content to a local `.md` file, then upload that directly as a notebook source. This bypasses the write-back need entirely and still closes the loop.

### File locations

| File | Path |
|------|------|
| OAuth key file | `~/.notebooklm-mcp-cli/gcp-oauth.keys.json` |
| Token file | `~/.notebooklm-mcp-cli/gdrive-token.json` |
| Auth helper script | `agent-test/gdrive-auth.cjs` (one-time tool) |
| MCP config | `~/.claude.json` under `mcpServers.gdrive` |

### MCP config block (in `~/.claude.json`)

```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_OAUTH_PATH": "C:/Users/tomew/.notebooklm-mcp-cli/gcp-oauth.keys.json",
        "GDRIVE_CREDENTIALS_PATH": "C:/Users/tomew/.notebooklm-mcp-cli/gdrive-token.json"
      }
    }
  }
}
```

**Critical:** These two env vars have confusing names. Get them backwards and auth silently fails.
- `GDRIVE_OAUTH_PATH` = the key file (client ID + secret, downloaded from Google Cloud Console) — **input**
- `GDRIVE_CREDENTIALS_PATH` = where the token gets saved after login — **output**

---

## OAuth Setup — What We Did (and What Went Wrong)

The one-time setup required to mint the token. Documented in full because it was hard.

### Step 1 — Google Cloud Console

1. Create a project (or use existing)
2. Enable **Drive API** and **Docs API**
3. OAuth consent screen: External, add `ewalltom@gmail.com` as a test user
4. Create credentials: **Desktop App** type → download JSON → save as `~/.notebooklm-mcp-cli/gcp-oauth.keys.json`
5. Add `http://localhost:3000/oauth2callback` to the authorized redirect URIs

### Step 2 — Fix the key file

The downloaded key file was missing `redirect_uris`. The auth library requires it. Add:

```json
"redirect_uris": ["http://localhost:3000/oauth2callback"]
```

The URI in the file and the URI in Google Cloud Console must match exactly.

### Step 3 — Free port 3000

The OAuth callback server listens on port 3000. The Remotion bar-chart-race studio also runs on port 3000. Kill it before running auth. Also check for any lingering background tasks on that port.

### Step 4 — Run the auth script

`npx @modelcontextprotocol/server-gdrive auth` exits immediately when run as a background task (ESM lifecycle issue — the process exits before the browser callback arrives).

Fix: use `gdrive-auth.cjs` at the agent-test root — a CommonJS equivalent using the same `googleapis` package from the npx cache. CommonJS stays alive reliably as a background task.

```bash
# Run as background task
node gdrive-auth.cjs
# Opens browser auth URL — Tom completes login
# Token saved to ~/.notebooklm-mcp-cli/gdrive-token.json
```

### Step 5 — Restart Claude Code

The MCP config loads at startup. After updating `~/.claude.json`, a restart is required before the gdrive server is available.

---

## Debugging History — What Went Wrong and Why

A full account of the issues hit during setup, in order. Useful if things break again.

### 1. Wrong env var assignment

`~/.claude.json` had `GDRIVE_CREDENTIALS_PATH` pointing to the key file (`gcp-oauth.keys.json`). The server was looking for a saved token in the key file — and finding the wrong thing. Fixed by setting both vars correctly (see Architecture above).

### 2. Missing `redirect_uris` in key file

`gcp-oauth.keys.json` had no `redirect_uris` field. The auth library requires it to validate the OAuth flow. Added `["http://localhost:3000/oauth2callback"]` to the file, and added the same URI in Google Cloud Console.

### 3. Port 3000 occupied by Remotion

The Remotion bar-chart-race Remotion Studio was running on port 3000. OAuth callback server also needs 3000. Killed the Remotion process first.

### 4. Debug script intercepted callbacks

A test script was written to listen on port 3000 and return "test" for every request. The problem: the script kept running as a background task (long-lived webpack HMR connections from the old Remotion browser tab were keeping it alive). When Google redirected to `localhost:3000` after login, the debug script answered first and returned "test" instead of processing the callback. Fixed by explicitly stopping the background task via TaskStop.

### 5. ESM auth server exited immediately

`npx @modelcontextprotocol/server-gdrive auth` printed "Launching auth flow…" and then exited with code 0 before the browser flow completed. Cause: the package is an ES module; when spawned via the Bash tool's background mode, it exits before the browser callback arrives — a timing/process lifecycle issue with how npx spawns ESM processes.

Fix: wrote `gdrive-auth.cjs` — a CommonJS equivalent using the `googleapis` package already in the npx cache. CommonJS stays alive reliably as a background task.

---

## Running the Loop — Quickstart

```bash
# 1. Find the doc
mcp__gdrive__search("Double-Entry Bookkeeping")
# → returns filename + doc ID

# 2. Read it
ReadMcpResourceTool(server="gdrive", uri="gdrive:///<doc-id>")
# → returns full doc as markdown

# 3. Augment it (Claude does this inline)

# 4. Save locally
# Write to ephemeral-notebook/sources/<name>.md

# 5. Upload as new notebook source
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm source add <notebook-id> \
  --file "path/to/file.md" \
  --title "Claude-Augmented Version" \
  --wait
```

**Note on `nlm source add` syntax:** The file path is a flag (`--file`), not a positional argument. Passing it positionally throws "unexpected extra argument."

---

## POC Completed — 2026-03-13

**Notebook:** Double-Entry Bookkeeping and the Rise of Capitalism (`18b286a4-d213-43f8-88fd-02152b7544a6`)

**What ran:**
1. `mcp__gdrive__search` → found the doc
2. `ReadMcpResourceTool gdrive:///1IPNE41yztAeqfLPlyjvHoGbcuV8UN24d2WLHsrLDUuw` → read 5-slide Gemini manifest
3. Claude added Slide 6 (spread Venice → Antwerp → Amsterdam/VOC) and deepened Slides 3 & 5
4. Saved to `ephemeral-notebook/sources/double-entry-augmented.md`
5. Uploaded → source ID `03eca125-e301-455f-89ec-3021b40e36da`

The loop works end-to-end.

---

## What's Next

- Write-back to Drive (creating a versioned `_v2` doc) — needs a non-MCP approach since the server is read-only. Options: Google Docs API directly via a script, or skip Drive entirely and just upload local files as sources.
- Autonomous quality gating: Claude reviews NLM output before Tom sees it, flags weak sections, triggers a redo
- Multi-pass refinement: NLM → Claude critique → re-upload → NLM regenerates
- Cross-notebook synthesis: read outputs from multiple notebooks, merge, feed new notebook
