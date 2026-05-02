# Skill: Source Manifest

## What This Covers
How to generate and maintain the source manifest for the Pipeline notebook.

## Purpose
The manifest is the persistent record of what sources are (or were) in the Pipeline notebook.
Since sources get deleted after each run, the manifest is how we track history across sessions.
The user maintains their own copy; Claude updates the in-memory version during a session.

## Generate Current Manifest
Run source list and format the output:
```
PYTHONIOENCODING=utf-8 nlm source list 29aa1d41-e711-4862-8680-37de5476562e
```

Format the output as:
```
# Pipeline Notebook — Source Manifest
# Notebook: "Pipeline", ID: 29aa1d41-e711-4862-8680-37de5476562e
# Last updated: <date>

## Run: <topic name> (<date>)
<source-id> | <title>
<source-id> | <title>
...
```

## Workflow
1. At start of new run: generate manifest of current sources → write it out for user to copy/paste
2. Delete all existing sources
3. Run new research and import
4. Add new sources to manifest under a new run heading
5. Write out updated manifest additions for user to append to their copy

## Notes
- User maintains master copy of manifest externally
- Claude writes out additions/updates as plain text for user to copy/paste
- Manifest doubles as a cleanup list — source IDs are ready to paste into delete commands
