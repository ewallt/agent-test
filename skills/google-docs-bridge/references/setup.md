# Setup

This skill uses the existing Codex Google Drive OAuth flow.

## Auth paths

- OAuth client JSON:
  `C:\Users\tomew\.notebooklm-mcp-cli\codex-oauth.keys.json`
- Token cache:
  `C:\Users\tomew\.notebooklm-mcp-cli\codex-gdrive-token.json`
- Auth helper:
  `C:\Users\tomew\Documents\codex-test\tools\google-drive-auth.py`

## OAuth details

- Redirect URI: `http://localhost:3456/oauth2callback`
- The helper relaxes token scope checking with `OAUTHLIB_RELAX_TOKEN_SCOPE=1`.
- The token should be verified with a small Drive API read after minting.

## Shared Drive home

- Folder name: `Agent Bridge`
- Current folder ID:
  `19PxpKQuH-enOZNRh3cfGv05RP8ARwdA5`

## First check

If you need to confirm the bridge is alive, list files in the shared folder before writing anything.
