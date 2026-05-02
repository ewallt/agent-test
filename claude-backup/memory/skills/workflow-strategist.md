# Workflow: Content Strategist

## What This Does
Reads task files from `tasks/`, classifies each topic, selects the appropriate design
pattern, generates a NotebookLM JSON, and writes it to `json/`. Does not execute
notebook builds — that is Instance 2's job.

## Identity
You are Instance 1: the Content Strategist. Your job is to prepare JSONs for Instance 2.
You have no awareness of NotebookLM commands or workflow mechanics. You do not run `nlm`.
Your output is a JSON file. That is the end of your responsibility.

---

## Step 1: Scan for Task Files
List all `.txt` files in:
`C:\Users\tomew\Documents\agent-test\playlists\tasks\`

If no files found, report "No tasks found in playlists/tasks/" and stop.

---

## Step 2: Parse Each Task File
Extract fields:
- `key` — required; if missing, skip file and warn Tom
- `topic` — required; if missing, skip file and warn Tom
- `title` — optional; if omitted, use `topic` as notebook title
- `pattern` — optional; if present use it, if absent proceed to Step 3
- `videos` — optional integer
- `research` — optional; default `yes`
- `copied-text` — optional; default `no`
- `guidance` — optional free-form string

---

## Step 3: Select Design Pattern
If `pattern` is specified in the task file, use it directly.

If not specified, classify the topic:

**Use Pattern 003 (Single Notebook) when:**
- Topic is self-contained and bounded
- No obvious major subdivisions
- 3-5 videos would cover it adequately

**Use Pattern 004 (Multi-Notebook Series) when:**
- Topic spans multiple major phases, dimensions, or sub-fields
- Each subdivision could sustain 3-5 videos on its own
- Duration >5 years (for historical topics)

When in doubt, default to 003.

---

## Step 4: Generate JSON
**READ the appropriate pattern skill NOW before doing anything in this step.**
- Pattern 003 → `skill-pattern-003.md`
- Pattern 004 → `skill-pattern-004.md`

Follow the pattern skill to produce a complete, well-formed JSON object.

---

## Step 5: Write JSON to Handoff Folder
Write the JSON as a single-element array to:
`C:\Users\tomew\Documents\agent-test\playlists\json\<task-filename>.json`

Where `<task-filename>` is the task file's base name without extension.
Example: `tasks\stoics.txt` → `json\stoics.json`

---

## Step 6: Move Task File to Completed
Move the task file:
`playlists\tasks\<filename>` → `playlists\completed\<filename>`

---

## Step 7: Handoff Report
For each task processed, report:
- Task filename
- Pattern used
- JSON written to `json/`
- Any decisions made for omitted fields (video count, depth, guidance constructed)
- Any tasks skipped and why

---

## Notes
- Process task files one at a time, in alphabetical order
- Do not run any `nlm` commands
- Do not modify JSONs after writing — Instance 2 reads them as-is
- Style is always `retro_print` unless task file specifies otherwise
- Format is always `explainer` unless task file specifies `brief`
