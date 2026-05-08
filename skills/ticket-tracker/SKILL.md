---
name: ticket-tracker
description: Manage Tom's Jira-style ticket board at tools/tasks.json. Use this skill whenever Tom mentions "jira", "ticket", a ticket ID (like bcr-2, nlm-5, we-3, inf-4), asks what's open or pending or in progress, wants to update a ticket status, or asks about the backlog. Also use during shutdown to sync ticket statuses with what was worked on this session. If Tom says anything like "mark that done", "what tickets are open", "add a ticket for X", or references work items by ID — this skill applies.
---

# Ticket Tracker

Tom's lightweight ticket system for tracking pending work across all projects.

- **Source of truth**: `tools/tasks.json`
- **Board viewer**: `tools/tasks.html` (served at localhost:3010)

---

## Ticket Schema

```json
{
  "id": "bcr-2",
  "title": "UsCities pacing fix",
  "notes": "Details about the task.",
  "priority": 3,
  "status": "pending"
}
```

**Statuses**: `pending` · `in-progress` · `done` · `blocked`

**Priority**: 1 (critical) → 5 (backlog). Most tickets are P3.

---

## ID Prefixes

| Prefix | Group                  |
|--------|------------------------|
| bcr-   | Bar Chart Race         |
| sns-   | Simple Narrated Slides |
| we-    | Whiteboard Explainer   |
| nlm-   | NotebookLM             |
| inf-   | Infrastructure         |

When adding a ticket, scan the existing IDs for that prefix and use the next number.

---

## Operations

**Show tickets** — Read `tools/tasks.json` and summarize. For a quick status check, list all `pending` and `in-progress` tickets grouped by workflow, with IDs and titles. Omit `done` tickets unless Tom asks.

**Update status** — Edit the `status` field on the matching task in `tools/tasks.json`. Valid values: `pending`, `in-progress`, `done`, `blocked`.

**Add a ticket** — Add a new task object to the correct group and workflow in `tools/tasks.json`. Assign the next available ID in the right prefix sequence. Fields: `id`, `title`, `notes`, `priority`, `status: "pending"`.

**Show one ticket** — Display its title, notes, status, and priority inline.

---

## Shutdown Integration

During shutdown (the "Step 4: tasks.json Update" step), review what was worked on this session and apply these rules:
- Work completed this session → `done`
- Work started but not finished → `in-progress`
- New items surfaced during the session → add as new `pending` tickets
- Nothing changed → leave as-is

Do not remove or reorder existing tickets. Only update `status` and append new entries.
