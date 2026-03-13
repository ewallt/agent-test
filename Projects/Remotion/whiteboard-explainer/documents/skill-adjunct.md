# Whiteboard Explainer — Skill Adjunct

## What This Document Is

This document explains the skill adjunct system for the whiteboard-explainer project.
The adjunct is a companion log (`SKILL-LOG.md`, in this same folder) that captures
session-by-session learnings: new capabilities, working JSON patterns, bugs and fixes,
and design decisions. The SKILL.md stays lean and stable; the adjunct accumulates detail.

## Your Job When You Consult This

1. **At session start** (if working on this project): skim `SKILL-LOG.md` for recent
   entries. Look for new types, patterns, or gotchas added since the SKILL.md was last
   updated. Treat log entries as authoritative — they reflect the actual current state
   of the codebase.

2. **During a session**: if you discover something worth capturing (a new type, a fix,
   a pattern that works), note it mentally. At session end or on request, append an
   entry to `SKILL-LOG.md`.

3. **On request ("digest the adjunct")**: synthesize mature log entries into the
   SKILL.md itself — promote stable patterns into the reference doc, update gotchas,
   add new layout recipes. Then trim the digested entries from the log (or mark them
   `[digested]`).

## Log Entry Format

```markdown
## YYYY-MM-DD — Short Title

### New Capabilities
- What was added to types.ts, components, or the renderer

### JSON Patterns
- Concrete examples of JSON that work, with brief explanation

### Bugs & Fixes
- What went wrong, why, how it was fixed

### Design Decisions
- Choices made and the reasoning behind them

---
```

## What Goes In vs. What Stays in SKILL.md

| Skill adjunct log | SKILL.md |
|---|---|
| Session-specific discoveries | Stable, digested reference |
| Rough patterns, first attempts | Clean canonical examples |
| Bug post-mortems | Distilled gotchas |
| Exploratory design notes | Settled architecture |

## File Locations

- This document: `documents/skill-adjunct.md`
- The log: `documents/SKILL-LOG.md`
- The skill: `C:\Users\tomew\.claude\skills\whiteboard-explainer\SKILL.md`
