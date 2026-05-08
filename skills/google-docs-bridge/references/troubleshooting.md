# Troubleshooting

## Auth failure

- Confirm the token file exists:
  `C:\Users\tomew\.notebooklm-mcp-cli\codex-gdrive-token.json`
- If the token is missing or stale, rerun:
  `python C:\Users\tomew\Documents\codex-test\tools\google-drive-auth.py`

## Redirect mismatch

- The helper expects:
  `http://localhost:3456/oauth2callback`
- If Google Cloud Console does not have that exact redirect URI, update the OAuth client.

## Scope mismatch

- If oauthlib complains about extra scopes, set:
  `OAUTHLIB_RELAX_TOKEN_SCOPE=1`
- Then rerun token minting.

## Write verification

- If a doc write appears to succeed but nothing changed, read the document back immediately.
- If the Drive API read works but a write does not, the issue is usually in the helper or token path, not the network.

## Path drift

- Do not fall back to the old Claude Code bridge files for this skill.
- Keep the Codex token and client JSON paths separate from any other Google OAuth setup.
