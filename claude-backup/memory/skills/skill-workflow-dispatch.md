# Skill: Workflow Dispatch

## What This Does
Reads the active workflow from `workflow/active.txt` at session startup and routes
Claude to the correct workflow and its associated tasks folder.

## File Location
`C:\Users\tomew\Documents\agent-test\workflow\active.txt`

This file is Tom's responsibility to maintain. It always contains a workflow value.
Tom updates it manually at the start of a new session if he wants to change workflows.

## File Format
```
workflow: <workflow-name>
```

Currently defined workflow names:
- `playlists` — Single instance, does everything (task intake → JSON → notebook build)
- `playlists-strategist` — Instance 1: reads tasks, generates JSONs, writes to `json/`
- `playlists-operator` — Instance 2: reads JSONs, builds notebooks, produces artifacts

## Step 1: Read the Dispatch File
Read `workflow/active.txt`. Extract the value after `workflow:`.

## Step 2: Report Active Workflow
Tell Tom which workflow is active. Example:
> Active workflow: **playlists-strategist**

## Step 3: Load Workflow Context
Based on the workflow name, load the corresponding skill files:

### playlists
Skills:
- `skill-task-intake.md` — task scanning and orchestration
- `skill-pattern-003.md` — single notebook design pattern
- `skill-json-request.md` — execute notebook builds from JSON
- `workflow-playlists.md` — full build workflow

Namespace folder: `C:\Users\tomew\Documents\agent-test\playlists\`
Tasks folder: `C:\Users\tomew\Documents\agent-test\playlists\tasks\`

### playlists-strategist
Skills:
- `workflow-strategist.md` — full strategist workflow
- `skill-pattern-003.md` — single notebook design pattern

Namespace folder: `C:\Users\tomew\Documents\agent-test\playlists\`
Tasks folder: `C:\Users\tomew\Documents\agent-test\playlists\tasks\`
Output folder: `C:\Users\tomew\Documents\agent-test\playlists\json\`

### playlists-operator
Skills:
- `workflow-operator.md` — full operator workflow
- `skill-video-strategy.md` — source selection and focus angle design
- `skill-log.md` — run log entry format

Namespace folder: `C:\Users\tomew\Documents\agent-test\playlists\`
Input folder: `C:\Users\tomew\Documents\agent-test\playlists\json\`
Completed folder: `C:\Users\tomew\Documents\agent-test\playlists\json-completed\`

## Step 4: Check for Work and Execute
After identifying the workflow, check the appropriate input folder:
- `playlists` → check `tasks/` for `.txt` files
- `playlists-strategist` → check `tasks/` for `.txt` files
- `playlists-operator` → check `json/` for `.json` files

If work found: report what was found, then immediately begin executing — do NOT ask Tom for permission or confirmation. Task files in the queue are pre-authorized for execution.
If no work found: report "No tasks found" and wait for Tom's instruction.

## Adding New Workflows
When a new workflow is defined:
1. Add its name to the "Currently defined workflow names" list above
2. Add a corresponding section under Step 3 listing its skills and tasks folder
3. Update `workflow/active.txt` to use the new name when activating it

## Notes
- The `workflow/` folder is unnamespaced (shared infrastructure, not workflow-specific)
- All workflow-specific folders (tasks, queue, completed, staging, run-log.md) live under
  the workflow's namespace folder — e.g. `playlists/tasks/`
- To add a new workflow: create its namespace folder, add an entry above, update `active.txt`
- Tom controls what Claude does by controlling what tasks exist — not by editing this file mid-session
