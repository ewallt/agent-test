# Mac Transfer Checklist

Getting Claude Code and the agent-test project running on a new MacBook.

---

## 1 — Install Core Tools

```bash
# Homebrew (Mac package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js (for Remotion)
brew install node

# Python (for edge-tts / BYG audio)
brew install python

# Git
brew install git

# Claude Code CLI
npm install -g @anthropic-ai/claude-code
```

---

## 2 — Clone agent-test

```bash
cd ~/Documents
git clone https://github.com/ewallt/agent-test.git
cd agent-test
git checkout dev
```

---

## 3 — Set Up ~/.claude/

Three things needed here.

All three are backed up in the `claude-backup/` folder of the agent-test repo — no separate transfer needed.

### 3a — Global Instructions

```bash
cp ~/Documents/agent-test/claude-backup/CLAUDE.md ~/.claude/CLAUDE.md
```

### 3b — Skills

```bash
mkdir -p ~/.claude/skills
cp -r ~/Documents/agent-test/claude-backup/skills/. ~/.claude/skills/
```

### 3c — Project Auto-Memory

The memory files live in a path derived from the project directory. On Mac the path will be:

```
~/.claude/projects/Users-tomew-Documents-agent-test/memory/
```

```bash
mkdir -p ~/.claude/projects/Users-tomew-Documents-agent-test/memory
cp -r ~/Documents/agent-test/claude-backup/memory/. ~/.claude/projects/Users-tomew-Documents-agent-test/memory/
```

**Note:** If your Mac username is different from `tomew`, adjust the path accordingly. You can confirm the correct path by running `claude` once in the agent-test directory — it will create the folder automatically.

---

## 4 — Project Settings

The project-level permissions are already in the repo:

```
agent-test/.claude/settings.local.json
```

No action needed — it's there when you clone.

---

## 5 — Install MCP Servers

### Google Drive MCP

Install and re-authenticate (OAuth tokens don't transfer between machines):

```bash
# Install (check current install method in gdrive-integration.md)
# Then run claude in agent-test and re-auth when prompted
```

Reference: `Projects/NotebookLM/playlists/documents/gdrive-integration.md`

### Playwright MCP

```bash
# Install Playwright MCP
npm install -g @playwright/mcp
```

Reference: `Projects/Infrastructure/documents/playwright-mcp-findings.html`

---

## 6 — Install Python Packages

```bash
pip3 install edge-tts
```

---

## 7 — Install nlm CLI

The `nlm` tool is used for NotebookLM automation. Check the current version and install method:

- Current version: v0.3.2 (check `memory/working-notes.md` for latest)
- Reference: `memory/CONTEXT.md`

---

## 8 — Install Remotion Dependencies

For each Remotion project:

```bash
cd ~/Documents/agent-test/Projects/Remotion/bar-chart-race && npm install
cd ~/Documents/agent-test/Projects/Remotion/simple-narrated-slides && npm install
cd ~/Documents/agent-test/Projects/Remotion/whiteboard-explainer && npm install
```

---

## 9 — Verify

| Check | Command | Expected |
|-------|---------|----------|
| Claude Code | `claude --version` | version number |
| Skills loaded | open claude in agent-test, ask "what skills do you have" | lists skills |
| Memory loaded | open claude in agent-test, ask "where are we on the project" | orients correctly |
| Google Drive MCP | ask claude to list recent Drive files | returns files |
| Playwright MCP | ask claude to navigate to example.com | Chrome opens |
| Node | `node --version` | v18+ |
| Python | `python3 --version` | v3.9+ |
| edge-tts | `edge-tts --list-voices` | long list of voices |
| Remotion | `cd simple-narrated-slides && npx remotion studio` | Studio opens at localhost:3001 |

---

## Notes

- The `promote.sh` script uses bash — works on Mac without changes
- Windows-specific PowerShell tool calls in settings won't apply on Mac (harmless)
- Google Drive OAuth must be done fresh — tokens are machine-specific
- If Claude Code creates a new memory path on first run, copy the memory files into it
