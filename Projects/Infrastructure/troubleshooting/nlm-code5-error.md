# nlm CLI — Code 5 Error: Diagnosis and Fix

**Symptom:** `API error (code 5): unknown` returned by any `nlm` command.

**Date first resolved:** 2026-04-05

---

## Root Causes (in order of likelihood)

### 1. Short/truncated notebook ID
The most common cause. Short IDs like `62ca1cd4` fail with code 5 due to an alias resolution bug in the CLI. Full UUIDs always work.

**Fix:** Always use the full UUID (e.g. `62ca1cd4-11db-4c58-9936-7d42241ee4ea`). Get it from `nlm list notebooks`.

---

### 2. Stale session cache
After a version upgrade or after a long gap, the cache at `~/.notebooklm-mcp-cli/` can hold stale auth state that causes all commands to fail.

**Fix:** Clear the cache, then re-login.

```bash
# Preserve OAuth keys, delete everything else
cd ~/.notebooklm-mcp-cli/
rm -rf cache/ chrome-profiles/ profiles/
rm -f chrome-port-map.json
# Keep: gcp-oauth.keys.json, gdrive-token.json
```

Then ask Tom to run `nlm login` and complete the browser auth flow.

---

### 3. PATH conflict after version upgrade
`pip install --upgrade notebooklm-mcp-cli` installs the new exe to the Python Scripts directory, but the old exe at `~/.local/bin/nlm.EXE` may take PATH priority and continue running the old version.

**Check:** `nlm --version` — if it still shows the old version after upgrade, this is the issue.

**Fix:**
```bash
# Find where pip installed the new version
pip show notebooklm-mcp-cli | grep Location
# Copy the new exe over the old one
cp /path/to/new/nlm.exe ~/.local/bin/nlm.EXE
```

---

## Full Resolution Sequence (2026-04-05)

When all three issues compounded:

1. Upgraded `notebooklm-mcp-cli` from 0.5.14 → 0.5.16
2. Copied new exe to `~/.local/bin/nlm.EXE` to fix PATH priority
3. Cleared stale cache (cache/, chrome-profiles/, profiles/, chrome-port-map.json)
4. Tom ran `nlm login` and completed browser auth
5. Switched all notebook references from short IDs to full UUIDs

After these steps, queries worked reliably.

---

## Notes

- `nlm doctor` is **not** a reliable diagnostic — it can report healthy even when code 5 errors occur. Do not rely on it to confirm auth is working.
- The UUID alias bug may be fixed in a future CLI version. Until then, always use full UUIDs.
- Version as of resolution: `notebooklm-mcp-cli` 0.5.16
