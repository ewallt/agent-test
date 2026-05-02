---
name: feedback_session_log_incremental
description: Write session log entries at natural milestones throughout the session, not only at shutdown
type: feedback
---

Write session log entries incrementally — whenever something notable happens, not just at the end of the session during shutdown.

**Why:** End-of-session reconstruction produces compressed, lower-fidelity entries. Writing at the moment of completion captures context, decisions, and reasoning while they're fresh.

**How to apply:** After completing any notable unit of work (skill built, feature done, decision made, process change, key finding), write a session log entry immediately. The shutdown skill handles final wrap-up only for anything not yet captured. See `documents/session-log-policy.md` for full guidance on what counts as notable and the expected format.
