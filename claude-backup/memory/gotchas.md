# Gotchas

Things that can trip up a session — not covered in the skills files.

## Shell Behavior
- Bash shell is configured but non-functional — `ls`, `pwd`, and `/c/Users/...` path-style commands all fail
- Use PowerShell (`powershell -Command "..."`) for file operations — reliable
- Use `powershell -Command "Get-ChildItem ..."` to list folder contents (not `cmd /c dir` — returns empty even when files exist)
- Use `powershell -Command "Move-Item ..."` for file moves — `cmd /c move` silently fails
- Use `powershell -Command "New-Item -ItemType Directory ..."` to create directories
- `nlm` is NOT in the bash PATH — do not try `nlm ...` or `PYTHONIOENCODING=utf-8 nlm ...` from bash; both will fail
- Full path: `C:\Users\tomew\.local\bin\nlm.exe`
- Always invoke via: `PYTHONIOENCODING=utf-8 powershell -Command "& 'C:\Users\tomew\.local\bin\nlm.exe' <args>"`
- **PYTHONIOENCODING=utf-8 is required** — set as a bash env prefix (not inside the PowerShell string). Without it, Rich's styled output (spinners, checkmarks ✓) crashes with UnicodeEncodeError on Windows cp1252. Commands may still succeed but output is lost, requiring extra verification steps. Confirmed broken 2026-03-04.
- **Do NOT use `$env:PYTHONIOENCODING` inside the PowerShell -Command string** — bash expands `$env` as empty before PowerShell sees it. Use the bash prefix approach instead.
- For long `--prompt` strings or focus angles containing apostrophes (e.g. "Pacioli's"), use a `.ps1` script file with `$env:PYTHONIOENCODING = 'utf-8'` at the top and run via `powershell -File script.ps1` — apostrophes in inline PowerShell `-Command` strings break the single-quote delimiters
- `uv` is also not in bash PATH; full path is `C:\Users\tomew\.local\bin\uv.exe`
- **Getting the current time**: `date /t` and `time /t` do NOT work — use `powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"`. This has been a recurring mistake — do not use date /t under any circumstances.

## Auth
- Auth window is approximately 20 minutes — if commands fail unexpectedly mid-session, suspect expiry (NOTE: 20-minute figure is unverified — sourced from research doc, not direct observation; actual window may be longer)
- Fix: ask Tom to re-run `nlm login --profile default`
- Auth expiry kills CLI interaction only — in-progress renders continue server-side (unconfirmed)
- A command may print a Unicode error but still succeed — always verify with a follow-up list/status command
- For multi-notebook runs, auth expiry is a near-certainty — run `nlm doctor` before each notebook, not just at the start
- **`nlm doctor` is NOT a reliable auth check** — it reports cookies as present even when the token is actually expired. A passing doctor result does not guarantee commands will work. Confirmed 2026-02-25: doctor passed immediately before a research command that failed with auth error.

## Permission Prompts
- Permission prompts are the most important workflow data we collect — log every one in real time
- Prompts can appear for ANY tool call — not just Bash commands. File writes (Write tool) also trigger them.
- Claude CAN observe when a tool call is held for approval — watch for it actively on every tool use
- Do not assume prompts didn't appear just because the run completed — if unsure, say so in the log
- Known prompt triggers (updated 2026-02-25):
  - Write tool (file creation) — first use per session triggers prompt; subsequent uses do not
  - Edit tool (file modification) — first use per session triggers prompt; subsequent uses do not
  - Read/Write to `.claude` directory — treated as sensitive system space, always prompts with reduced options
  - All nlm and PowerShell Bash commands — confirmed NO prompt (2026-02-25 WW2 run, 3 notebooks)
  - settings.json allowlist suppresses Bash prompts but NOT Write/Edit first-use prompts on Windows
- Goal: identify exactly which tool calls trigger prompts so we can find ways to eliminate or batch them
- **Shared log**: `playlists/design/permission-prompt-log.md` — Claude and Tom both contribute; update it whenever a new prompt is observed or confirmed

## File Operations
- The `.claude` path contains dots — `cmd /c` chokes on it; always use PowerShell for operations in that directory
- Run log: always append to the literal end of file — do not pattern-match an anchor, or you risk inserting mid-file

## Research
- If a previous research task is blocking a new one, add `--force` to the research start command
- **`research status` spinner bug**: the spinner uses braille characters (e.g. U+2838) that cp1252 can't encode — always use `--max-wait 0` to skip the spinner and get a clean status readout: `nlm.exe research status <notebook-id> --max-wait 0`
- **Import timeout bug**: `nlm research import` may return a timeout error even though the import succeeded. Do NOT retry — check `nlm source list` first. If sources are present, the import worked. Retrying will duplicate all sources and require manual cleanup (confirmed 2026-02-25 Pacific notebook).

## Sources
- **HTML files are NOT supported as notebook sources** — `nlm source add <notebook-id> --file <file>.html` returns "Could not add file source." Only PDF (and likely plain text) are accepted. If the app needs to be added as a source, export it to PDF first or skip the source-add step and note it as a local-only artifact. (Confirmed 2026-03-04 other-lane run.)
