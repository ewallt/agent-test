---
name: Reboot permissions fix
description: After a Windows reboot, Claude Code may start prompting for Write/Edit even though settings are correct. Fix is to re-save settings.local.json.
type: feedback
originSessionId: daec71be-d60f-4899-be72-87f86f0e4b54
---
After a Windows reboot, Claude Code sometimes stops honoring the permissions allowlist and starts prompting for Write/Edit/etc. even though the settings files are correct and unchanged.

**Fix:** Re-save `.claude/settings.local.json` (same content, no changes needed). This appears to force Claude Code to re-read the permissions.

**Why:** Root cause unknown. May be a Claude Code bug where cached permissions aren't reloaded after reboot. Re-saving the file triggers a reload.

**How to apply:** If permission prompts appear unexpectedly after a reboot and the settings look correct, re-save settings.local.json before investigating further.
