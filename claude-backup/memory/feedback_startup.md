---
name: Pre/post compact replace startup/shutdown skills
description: pre-compact and post-compact replace session-end and startup skills respectively
type: feedback
---

Do not invoke startup or shutdown skills. They have been replaced:
- **pre-compact** = end-of-session work (replaces shutdown skill)
- **post-compact** = session orientation (replaces startup skill)

**Why:** Tom uses /compact as the session boundary. pre/post compact hooks handle what startup/shutdown used to do.

**How to apply:** When suggesting a workflow addition that would have gone in a startup or shutdown skill, suggest adding it to the pre-compact or post-compact skill instead. Never ask about setting up a startup skill — ask about post-compact.
