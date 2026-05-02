---
name: prompt-library-push
description: >
  Push a prompt from Google Drive to the GitHub Pages prompt library at
  https://ewallt.github.io/claude-code-fun/prompts/, making it fetchable by ChatGPT via URL.
  Use this skill when Tom says "push this prompt to GitHub", "add this prompt to the library",
  "publish this prompt for ChatGPT", or any variation of moving a Google Doc prompt to the
  GitHub prompt library. Also trigger when Tom mentions the prompt library or wants to make
  a prompt available to ChatGPT by URL.
---

# Prompt Library Push

Reads a prompt from Google Docs and publishes it to the GitHub Pages prompt library so ChatGPT can fetch it by URL.

**Prompt library location:** `https://ewallt.github.io/claude-code-fun/prompts/`
**Project definition:** `Projects/PromptLibrary/documents/project-definition.md`

---

## Inputs required

Confirm you have all three before starting:

- **Google Doc ID** — the Drive document ID (32-character string in the Doc URL)
- **Filename** — short, lowercase, hyphenated, `.txt` extension (e.g. `build-notebooklm-source.txt`)
- **Description** — one line for the Prompts table

If any are missing, ask before proceeding.

---

## Step 1 — Read the Google Doc

Load the tool schema, then read the document:

```
ToolSearch: select:mcp__claude_ai_Google_Drive__read_file_content
```

Call with the Doc ID. The content comes back as markdown/plain text. Use it exactly as returned — do not reformat, summarize, or interpret it.

---

## Step 2 — Push to gh-pages

`claude-code-fun` is a separate repo from `agent-test`. Use the clone approach:

```bash
rm -rf /tmp/ccf-ghpages && \
git clone --branch gh-pages https://github.com/ewallt/claude-code-fun.git /tmp/ccf-ghpages
```

Then write the prompt content to `/tmp/ccf-ghpages/prompts/<filename>` using the **Write tool** (not a heredoc — the content may contain special characters that break shell quoting).

Then commit and push:

```bash
cd /tmp/ccf-ghpages && \
git config user.email "ewalltom@gmail.com" && \
git config user.name "Tom" && \
git add prompts/<filename> && \
git commit -m "gh-pages: add prompt <filename>" && \
git push origin gh-pages
```

---

## Step 3 — Update project-definition.md

Add a row to the Prompts table in `Projects/PromptLibrary/documents/project-definition.md`:

```
| `<filename>` | `<doc-id>` | <description> |
```

---

## Step 4 — Confirm

Output the live URL:

```
Pushed. Live at:
https://ewallt.github.io/claude-code-fun/prompts/<filename>
```

GitHub Pages takes 1–2 minutes to propagate after push.
