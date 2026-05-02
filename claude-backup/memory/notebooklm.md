# NotebookLM Pipeline Notes

## Tool
- `notebooklm-mcp-cli` v0.3.2
- Commands: `nlm` and `notebooklm-mcp`
- Installed via `uv tool install notebooklm-mcp-cli`

## Auth
- `nlm login --profile default` — must be run by user (interactive browser OAuth)
- Credentials: `C:\Users\tomew\.notebooklm-mcp-cli\profiles\default`
- Sessions expire; check with `nlm doctor` before running pipeline commands
- Last known: 45 cookies, ewalltom@gmail.com

## Windows Encoding Fix
Always prefix commands with `PYTHONIOENCODING=utf-8` to avoid Unicode errors:
```
PYTHONIOENCODING=utf-8 nlm <command>
```

## Production Notebook
- Name: "Pipeline" (previously "Hello World Test" — renamed)
- ID: `29aa1d41-e711-4862-8680-37de5476562e`

## Pipeline Pattern (Source Rotation)
1. User provides source file in working dir (`C:\Users\tomew\Documents\agent-test`)
2. Add source: `PYTHONIOENCODING=utf-8 nlm source add <notebook-id> --file <filename> --wait`
3. Capture SOURCE_ID from output (or verify via `nlm source list <notebook-id>`)
4. Generate video: `PYTHONIOENCODING=utf-8 nlm video create <notebook-id> --confirm`
5. Capture ARTIFACT_ID, wait 8-10 min for render
6. Delete source: `PYTHONIOENCODING=utf-8 nlm source delete <source-id> -y`  ← source ID only, no notebook ID
7. Repeat for next topic

## Key Learnings
- Command may succeed even if it exits with Unicode error — verify with follow-up query
- Use `--help` flags hierarchically to discover syntax
- `nlm login` cannot be automated — requires user action
- Always delete source after video completes to avoid cross-contamination
