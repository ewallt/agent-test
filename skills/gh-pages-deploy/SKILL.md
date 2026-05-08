---
name: gh-pages-deploy
description: >
  Deploy a single HTML file to the gh-pages branch of the claude-code-fun GitHub repo
  (https://github.com/ewallt/claude-code-fun), making it live at
  https://ewallt.github.io/claude-code-fun/<folder>/<subfolder>/.
  Use this skill whenever Tom says "deploy", "publish", "put it on GitHub Pages", or
  "make it live" for any HTML file in the agent-test project. Also trigger when Tom
  asks for a public URL for a web app or document he just built.
---

## What This Does

Deploys a single local HTML file to the `gh-pages` branch of the `claude-code-fun` repo,
making it publicly accessible via GitHub Pages.

**Convention:** Deploy as `index.html` inside a named subfolder. This gives a clean URL without a filename extension.

**Live URL pattern:** `https://ewallt.github.io/claude-code-fun/<folder>/<subfolder>/`

**Repo:** `https://github.com/ewallt/claude-code-fun`
**Working directory:** `C:\Users\tomew\Documents\agent-test` (the git repo root)

---

## Step 1 — Choose the Target Folder and Subfolder

Top-level folders on gh-pages:

| Folder | Contents |
|--------|----------|
| `notebooklm` | NotebookLM workflow apps and explainers |
| `drinker-paradox` | Drinker Paradox web app |
| `braess-paradox` | Braess's Paradox web app |
| `braess-paradox-slides` | Braess's Paradox slides |
| `sermon-on-the-mount` | Sermon on the Mount pages |

Known subfolders in `notebooklm/`:

| Subfolder | URL |
|-----------|-----|
| `nlm-workflow-explainer` | `notebooklm/nlm-workflow-explainer/` |
| `lr-modern-art` | `notebooklm/lr-modern-art/` |
| `layered-reader-healthy-aging` | `notebooklm/layered-reader-healthy-aging/` |

Pick the top-level folder that best fits the file being deployed, then create a named subfolder for the specific app or doc. If no folder fits clearly, ask Tom before proceeding.

New folders and subfolders can be created — just `mkdir -p` them in the worktree.

---

## Step 2 — Deploy

`claude-code-fun` is a **separate repo** from `agent-test` — there is no shared remote. The
worktree approach does NOT work here (it would grab `agent-test`'s gh-pages branch instead).
Use the clone approach instead.

The file is always saved as `index.html` inside the subfolder. Run as a single chained command:

```bash
rm -rf /tmp/ccf-ghpages && \
git clone --branch gh-pages https://github.com/ewallt/claude-code-fun.git /tmp/ccf-ghpages && \
mkdir -p /tmp/ccf-ghpages/<folder>/<subfolder> && \
cp "<full-path-to-file>" /tmp/ccf-ghpages/<folder>/<subfolder>/index.html && \
cd /tmp/ccf-ghpages && \
git config user.email "ewalltom@gmail.com" && \
git config user.name "Tom" && \
git add <folder>/<subfolder>/index.html && \
git commit -m "gh-pages: add <short description>" && \
git push origin gh-pages
```

---

## Step 3 — Output the Live URL

Always end with:

```
Deployed. Live at:
https://ewallt.github.io/claude-code-fun/<folder>/<subfolder>/
```

Note: GitHub Pages can take 1–2 minutes to propagate after the push.

---

## Notes

- `claude-code-fun` is separate from `agent-test` — no shared remote; clone is required
- `git config user.email/name` must be set in the clone since it has no global identity
- Commit message format: `gh-pages: add <short description of what the file is>`
- Do not push to `main` — this skill only touches the `gh-pages` branch
- The `rm -rf /tmp/ccf-ghpages` at the start cleans up any failed previous run
