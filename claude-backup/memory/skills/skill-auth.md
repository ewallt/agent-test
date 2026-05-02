# Skill: Authentication

## What This Covers
How to handle authentication with the nlm CLI.

## Normal Startup
Auth must be performed by the user — it cannot be automated.

Instruct the user to run:
```
nlm login --profile default
```
A browser window will open. User logs in with ewalltom@gmail.com and completes the OAuth flow.
Successful output includes: "✓ Successfully authenticated!" and "Cookies: 45 extracted"

## Verify Auth
```
PYTHONIOENCODING=utf-8 nlm doctor
```

## Auth Expiry
- Auth window is approximately 20 minutes (shorter than originally estimated)
- Expiry kills CLI interaction only — in-progress renders continue server-side (unconfirmed)
- Symptom: commands fail unexpectedly mid-session
- Fix: ask user to re-run `nlm login --profile default`

## Notes
- Always prefix nlm commands with `PYTHONIOENCODING=utf-8` on Windows to avoid Unicode errors
- Credentials stored at: `C:\Users\tomew\.notebooklm-mcp-cli\profiles\default`
