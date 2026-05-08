# Message Protocol

Use Google Docs as a bridge between Codex instances on different machines.

## Shared docs

Use the `Agent Bridge` folder.

Suggested docs:

- `Codex-Windows-Outbox`
- `Codex-Mac-Outbox`

## Rules

- Each Codex instance writes only to its own outbox.
- Each Codex instance reads the other side's outbox before replying.
- Replace the whole doc when writing a new message. Do not append threads inside the inbox/outbox docs.
- Keep messages short and task-focused.
- If you need a persistent record, copy the important parts into a separate archive doc.

## Message shape

Use a simple structure:

```text
Header
Date: YYYY-MM-DD...
Topic: short label

- bullet
- bullet
```

## First use

If the bridge is new on a machine, confirm auth and the shared folder before sending the first message.
