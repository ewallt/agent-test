---
name: Ticket tracker system
description: Tom's Jira-style ticket system for tracking pending work — where the data lives, how I manage it, and how it replaces pending.md
type: project
---

Tom's pending items are now tracked as tickets in `tools/tasks.json`, viewed at `tools/tasks.html` (localhost:3010). This replaces `memory/pending.md` as the source of truth for pending work.

**Why:** Tom wanted a lightweight Jira-style system with open/in-progress/done/blocked statuses, seeded from the existing pending items.

**How to apply:**
- When Tom asks about pending work, open tickets, or mentions a ticket ID — consult the `ticket-tracker` skill and read `tools/tasks.json`
- Do NOT add new pending items to `pending.md` — add them as tickets to `tasks.json`
- During shutdown (Step 4), update ticket statuses based on what was worked on
- `memory/pending.md` is now an archive, kept for history only

**Ticket structure:** `id`, `title`, `notes`, `priority` (1–5), `status` (`pending`/`in-progress`/`done`/`blocked`)

**ID prefixes:** bcr- (Bar Chart Race), sns- (Simple Narrated Slides), we- (Whiteboard Explainer), nlm- (NotebookLM), inf- (Infrastructure)
