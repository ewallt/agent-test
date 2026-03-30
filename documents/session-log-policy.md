# Session Log Policy

The session log is the authoritative record of what happened in each session. It is written
incrementally throughout the session, not reconstructed at the end.

---

## Write at Natural Milestones

Write a session log entry whenever something notable happens — do not wait for shutdown.

**What counts as notable:**
- A skill built, modified, or significantly discussed
- A feature or artifact completed
- A key decision made (especially one that affects future behavior)
- A process change or new standing rule established
- A notable finding, failure, or retrospective insight
- A workflow or architecture change

**What does not need an entry:**
- Exploratory back-and-forth that leads nowhere
- Routine tool calls with no lasting effect
- Work in progress that isn't complete yet (wait until it's done)

---

## Format

Each entry is a `##` heading with the date, a short topic label, and bullet points grouped
by sub-topic under `###` headings.

```
## YYYY-MM-DD — Short Topic Label

### Sub-topic
- What was done / decided / changed
- Why it matters (if not obvious)
```

Keep entries factual and specific. The goal is that a future Claude reading this entry can
reconstruct what happened without needing to re-derive it from the code.

---

## Mid-Session vs. End-of-Session

- **Mid-session:** Write as work completes. Brief is fine — a `###` heading and 2–4 bullets.
- **End-of-session (shutdown):** The shutdown skill does a final pass. If mid-session entries
  were written, the shutdown entry only needs to cover anything not yet captured.

---

## Log Rotation

The session log uses rolling rotation to stay lean. Rotation runs automatically at shutdown.

**Trigger:** When `session-log.md` exceeds 1,500 lines.

**What to do:**
1. Read the full session-log.md
2. Find all entries with a date heading older than 30 days from today
3. Append those entries (preserving their `---` separators) to `session-log-archive.md` (create if it doesn't exist, prepend to existing content)
4. Rewrite session-log.md with only the header block and entries from the last 30 days

**Result:** `session-log.md` stays under ~1,500 lines. `session-log-archive.md` holds the full history.

---

## Session Log Location

`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\session-log.md`
`C:\Users\tomew\.claude\projects\C--Users-tomew-Documents-agent-test\memory\session-log-archive.md`

Prepend new entries at the top of the file (below the header), newest first.
