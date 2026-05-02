# Skill: Task Intake and Orchestration

## What This Does
Reads task files from the `tasks/` folder, generates JSON(s) using the appropriate
design pattern, saves them to `json/`, executes notebook builds, then moves
the task file to `completed/`.

Triggered automatically at session startup when task files are found in `tasks/`. Do not wait for Tom to say "execute" — if tasks are in the queue, execute them.

## Folder Locations
- Staging:   `C:\Users\tomew\Documents\agent-test\playlists\staging\`   ← Tom parks tasks here until ready
- Input:     `C:\Users\tomew\Documents\agent-test\playlists\tasks\`     ← Tom moves files here to trigger execution
- JSON:      `C:\Users\tomew\Documents\agent-test\playlists\json\`      ← Claude writes generated JSONs here
- Completed: `C:\Users\tomew\Documents\agent-test\playlists\completed\` ← Claude moves task files here when done

## Task File Format
Plain text, key-value pairs, one per line:

```
key: <required — unique identifier, used to match copied-text files and for future features>
topic: <required>
title: <optional — notebook title; defaults to topic if omitted>
pattern: <optional — 003, 004, etc.>
videos: <optional integer>
research: <optional — yes/no, default yes>
copied-text: <optional — yes/no, default no>
app: <optional — yes/no, default no>
slideshow: <optional — yes/no, default no>
remotion: <optional — yes/no, default no; skill not yet built — reserved>
guidance: <optional free-form text>
```

Rules:
- `key` and `topic` are required
- `title` is optional — use it when the notebook title should differ from the topic string
- `research` defaults to `yes` if omitted; `copied-text` defaults to `no` if omitted
- Omitted optional fields = Claude decides
- Do not write a field with no value (e.g. `videos:` with nothing after it) — just omit the line
- One task file = one collection of related notebooks (may produce multiple JSONs for pattern 004+)
- If `copied-text: yes`, see skill-copied-text.md for handling

## Step 1: Record Start Time and Scan for Task Files
Record the current time:
```
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
```
Note start time internally — used as the start time for log entries.
List all files in `playlists/tasks/`. Process each `.txt` file found.
If no files found, report "No tasks found in playlists/tasks/ folder" and stop.

## Step 2: Parse Each Task File
Extract fields:
- `key` — required; if missing, skip file and warn Tom
- `topic` — required; if missing, skip file and warn Tom
- `title` — optional; if omitted, use `topic` as the notebook title
- `pattern` — optional; if present use it, if absent proceed to Step 3
- `videos` — optional integer
- `research` — optional; default `yes`
- `copied-text` — optional; default `no`
- `app` — optional; default `no`
- `slideshow` — optional; default `no`
- `remotion` — optional; default `no` (skill not yet built — reserved for future use)
- `guidance` — optional string (may span rest of line)

If `copied-text: yes`, locate and validate the copied text file now (before doing any work).
See skill-copied-text.md. If no matching file is found, warn Tom and skip this task.

## Step 3: Select Design Pattern
If `pattern` is specified in the task file, use it directly.

If not specified, classify the topic:

**Use Pattern 003 (Single Notebook) when:**
- Topic is self-contained and bounded
- No obvious major subdivisions
- 3-5 videos would cover it adequately
- Examples: a cognitive bias, a specific battle, a single concept or book

**Use Pattern 004 (Multi-Notebook Series) when:**
- Topic spans multiple major phases, dimensions, or sub-fields
- Each subdivision could sustain 3-5 videos on its own
- Duration >5 years (for historical topics)
- Examples: French Revolution, World War 2, Roman Empire, college physics

When in doubt between patterns, default to 003 and note the decision in the handoff report.

## Step 4: Generate JSON(s)
Call the appropriate pattern skill:
- Pattern 003 → `skill-pattern-003.md` → produces 1 JSON object
- Pattern 004 → `skill-pattern-004.md` (when built) → produces multiple JSON objects

Pass all parsed fields (topic, videos, guidance, etc.) to the pattern skill.
The pattern skill returns a complete JSON array.

## Step 5: Save to JSON Folder
Write the JSON array to:
`C:\Users\tomew\Documents\agent-test\playlists\json\<task-filename>.json`

Where `<task-filename>` is the task file's base name without extension.
Example: `playlists\tasks\stoics.txt` → `playlists\json\stoics.json`

## Step 6: Execute Notebook Builds
Read the JSON file just written and execute builds per `skill-json-request.md`.
Process all notebooks in the array.

## Step 7: Write Log Entry
After each notebook build completes (videos queued, notebook shared), write a log entry.
See skill-log.md. One entry per notebook. Write each entry as it completes, not all at the end.

## Step 8: Move Task File to Completed
After successful execution, move the task file:
`playlists\tasks\<filename>` → `playlists\completed\<filename>`

If `copied-text: yes`, also move the copied text file:
`playlists\copied-text\<filename>` → `playlists\completed\<filename>`

If execution failed partway through, do NOT move either file. Report what succeeded
and what failed so Tom can decide how to proceed.

## Step 9: Record End Time and Handoff Report
Record the current time:
```
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
```
Report total elapsed time (start to end of queueing, not including render time).

Report for each notebook built:
- Notebook title and ID
- Shareable URL
- Artifact IDs and focus angles for each video
- Estimated render time (~8-10 min per video)
- Pattern used and any decisions made for omitted fields
- Total build time (time from start to handoff)

## Notes
- Process task files one at a time (not in parallel) to keep handoff reports clear
- If multiple task files exist, process them in alphabetical order
- Always confirm with Tom before deleting any notebook
- Auth check (nlm doctor) happens once at start, not per task file
- If auth is expired, stop and ask Tom to run `nlm login --profile default`
