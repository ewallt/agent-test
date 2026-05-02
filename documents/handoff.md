# Session Handoff — 2026-05-01

## Phone Deploy — GitHub Web Editor Links (claude-code-fun)

For deploying apps to `claude-code-fun` gh-pages from a phone, use these URL patterns:

| Action | URL Pattern |
|--------|-------------|
| Create new file | `https://github.com/ewallt/claude-code-fun/new/gh-pages?filename=FOLDER/index.html` |
| Edit existing file | `https://github.com/ewallt/claude-code-fun/edit/gh-pages/FOLDER/index.html` |
| View live app | `https://ewallt.github.io/claude-code-fun/FOLDER/` |

**How to use:** Have the AI output the HTML to chat. Copy the code. Open the Create URL in Safari. Paste into the editor. Commit.

---

## What Was Done This Session

### Mac Transfer Infrastructure
- Created `agent-test/claude-backup/` as the transfer mechanism for `~/.claude/`
- `claude-backup/CLAUDE.md` — copy of global instructions
- `claude-backup/memory/` — all 30+ auto-memory files copied
- `claude-backup/skills/` — all skills (already existed from earlier)
- Updated `Projects/Infrastructure/documents/mac-transfer.md` Steps 3a/3b/3c: now uses repo backup instead of Google Drive. Mac just needs `git clone` then a few `cp` commands.
- Mac memory path on Mac: `~/.claude/projects/Users-tomew-Documents-agent-test/memory/` (no `C--` prefix)

### aip001 — Pushed to gh-pages
- Found correct Google Doc ID via Drive search: `1wniQ7q8r-H4pt5ZX8weht_7viCxkN8OunWBI7qeNKLo` (was wrong in project-definition)
- Cleaned escape chars from MCP rendering (`\<`, `\#`, `\[` → literal chars) before writing .txt
- Pushed `prompts/aip001-gear-tab.txt` to gh-pages
- Updated `prompts/index.html`: added "Track 1 — Web Apps" section with aip001 row
- Updated `projects/PromptLibrary/documents/project-definition.md`: corrected Doc ID, status → Live

### Phone App Discovery
- Claude on phone now has canvas preview (didn't used to) — looks great
- Code copy from canvas is broken; workaround: have AI output HTML to chat
- pocket-deploy (prior era, 100+ apps) used GitHub web editor — same pattern still works
- "Phone deploy info" Google Doc found in Drive with the link patterns above

---

## Outstanding Items

- **Git commit** — agent-test dev branch has uncommitted changes: claude-backup/, mac-transfer.md, project-definition.md
- **Mac setup** — Homebrew + Xcode tools downloading; next steps after install: `brew install node python git`, then `npm install -g @anthropic-ai/claude-code`, clone, copy claude-backup
- **Delete Drive doc** `1IU_euzYGKmvs3061Nf79lZe1QQpW-uXFPpPDfZAKmmQ` (abandoned CLAUDE.md upload, now unnecessary)
- **Fix tab bug** in Medieval Animal Trials apps (same Tailwind `!important` fix as Germany's Castles)
- **Build aip002–aip004** (web app prompts) and **aip010–aip014** (NLM prompts)
- **BYG Illustration 03** — render to MP4, wrapper HTML, deploy to byg-dev
- **prompt-library-push skill** — created but not yet tested end-to-end

## Next Session

READ NOW: `C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\startup.md`
