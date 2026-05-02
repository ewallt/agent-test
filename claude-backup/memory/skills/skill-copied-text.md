# Skill: Copied Text Source Handling

## What This Does
Handles the "copied text" source type — user-provided content added directly to a
notebook as a pasted text source, instead of or in addition to researched sources.

Typical use case: YouTube video transcripts, articles, or other material Tom has
copy-pasted that he wants NotebookLM to use as source material.

## Folder Location
`C:\Users\tomew\Documents\agent-test\playlists\copied-text\`

## File Format
Plain text. First line is always the key. Remaining content is the source text.

```
key: <key value>
[all remaining content is the source text to add to the notebook]
```

The key must match the `key:` field in the corresponding task file.
Everything after the first line is treated as source content — no other metadata.

## Task File Flags
Two flags in the task file control source behavior:

```
research: yes   # or no
copied-text: yes  # or no
```

Defaults if omitted:
- `research` defaults to `yes`
- `copied-text` defaults to `no`

### Combinations:
| research | copied-text | Behavior |
|----------|-------------|----------|
| yes      | no          | Research only (standard workflow) |
| no       | yes         | Copied text only — skip research entirely |
| yes      | yes         | Both — research runs AND copied text is added as an additional source |
| no       | no          | Invalid — warn Tom and stop |

## Step 1: Check Flags
When processing a task file, read `research` and `copied-text` flags.
If both are `no`, warn Tom: "Task has both research and copied-text set to no — nothing to do."

## Step 2: Locate the Copied Text File
Scan `playlists/copied-text/` for a file whose first line matches:
`key: <task key>`

Where `<task key>` is the value of the `key:` field in the task file.

If `copied-text: yes` but no matching file is found, warn Tom and stop:
"Task key '<key>' not found in copied-text/ folder."

## Step 3: Extract the Content
Read the copied text file. Skip the first line (the key). All remaining content
is the source text.

## Step 4: Write Content to a Temp File
Write the extracted content to a temporary file in the working directory:
`C:\Users\tomew\Documents\agent-test\<key>-source.txt`

This temp file is what gets added to the notebook as a source.

## Step 5: Add to Notebook
Use `nlm source add` to add the temp file as a source:
```
PYTHONIOENCODING=utf-8 nlm source add <NOTEBOOK_ID> --file "C:\Users\tomew\Documents\agent-test\<key>-source.txt" --wait
```
Capture the SOURCE_ID from output.

## Step 6: Clean Up Temp File
After the source is confirmed added, delete the temp file:
```powershell
Remove-Item "C:\Users\tomew\Documents\agent-test\<key>-source.txt"
```

## Step 7: Move Copied Text File to Completed
After successful notebook build, move the copied text file to completed:
`playlists\copied-text\<filename>` → `playlists\completed\<filename>`

Move it at the same time as the task file (Step 8 of skill-task-intake.md).

## Integration with skill-json-request.md
When `copied-text: yes`, after notebook creation (step 2 of workflow) and before
or after research (depending on flags):
- If `research: no` — skip research entirely, add copied text source instead
- If `research: yes` — run research as normal, then also add copied text source

The copied text source is treated like any other source for video creation:
it gets a SOURCE_ID and can be assigned a focus angle and video.

## Notes
- One copied text file per task (one-to-one relationship with task key)
- The key field is line 1 of the copied text file — no blank line before content
- Temp file is always cleaned up after source is added
- If source add fails, do not delete the temp file — leave it for diagnosis
- Copied text files are moved to completed/, not deleted, preserving the content
