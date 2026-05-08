---
name: mac-permissions-fix
description: Diagnose and fix macOS "Operation not permitted" errors in Terminal. Use when Claude or Tom hits permission errors accessing files or folders, especially in the Documents folder or agent-test project. Covers TCC resets, the Tahoe TCC bug, locked files, and the Full Disk Access fix.
---

# Mac Permissions Fix

## The Problem

macOS uses TCC (Transparency, Consent, and Control) to protect certain folders — Documents, Desktop, Downloads, and others. When TCC loses its grant for Terminal, Claude gets "Operation not permitted" errors even though Unix permissions look fine (`drwxr-xr-x`, owner = tom).

**This is a known macOS Tahoe bug.** Tahoe's TCC database can become inconsistent, dropping grants at the subfolder level without losing them at the parent. It happens randomly, not because of anything Tom did. There are active Apple Community threads and detailed coverage at eclecticlight.co.

---

## Symptoms

- `ls`, `cat`, `read` fail with "Operation not permitted" on specific folders
- `stat` works (metadata readable) but file contents are not
- New files can be created in the folder, but existing files can't be read or overwritten
- `chflags` and `chmod` also blocked on the affected folder
- Parent folder accessible; specific subfolder blocked
- Happened at least twice in the same session (May 2026)

---

## Diagnosis

**Is it a locked file (uchg flag)?**
```bash
stat /path/to/file
```
Look for flags field. `uchg` = user immutable = locked file. Fix: `chflags nouchg /path/to/file`

**Is it TCC?**
If `chflags` itself returns "Operation not permitted", it's TCC — not a file flag. Unix permissions are irrelevant; TCC is overriding at the kernel level.

---

## Fix (TCC — most common cause)

1. Open **System Settings → Privacy & Security → Full Disk Access**
2. Find Terminal in the list
3. Remove it (click the − button)
4. Re-add it (click + and navigate to `/Applications/Utilities/Terminal.app`)
5. Quit Terminal completely
6. Relaunch Terminal

Access is restored immediately after relaunch.

---

## Why It Keeps Happening

macOS Tahoe has a known TCC instability bug. The grant can drop again after:
- macOS system updates
- Terminal updates (new binary signature invalidates the old grant)
- Unknown triggers — the TCC database can become inconsistent without any obvious cause

There is no permanent fix until Apple resolves the Tahoe TCC bug. Re-granting Full Disk Access is the recurring workaround.

---

## Affected Paths in This Project

- `/Users/tom/Documents/agent-test/documents/` — project documents folder, hit twice
- `/Users/tom/Documents/` — the macOS-protected Documents folder that contains the project

---

## References

- [Why you can't trust Privacy & Security — eclecticlight.co (April 2026)](https://eclecticlight.co/2026/04/10/why-you-cant-trust-privacy-security/)
- [Explainer: Permissions, privacy and TCC — eclecticlight.co](https://eclecticlight.co/2025/11/08/explainer-permissions-privacy-and-tcc/)
- [Tahoe Permissions broken — Apple Community](https://discussions.apple.com/thread/256225287)
- [Fix Terminal "Operation not permitted" — OSXDaily](https://osxdaily.com/2018/10/09/fix-operation-not-permitted-terminal-error-macos/)
