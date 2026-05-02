# Skill: Research and Import Sources

## What This Covers
How to use the nlm research command to discover and import web sources into a notebook.

## Notebook
Always use the Pipeline notebook unless told otherwise:
- Name: "Pipeline"
- ID: `29aa1d41-e711-4862-8680-37de5476562e`

## Commands

### Start Research
```
PYTHONIOENCODING=utf-8 nlm research start "<query>" --notebook-id 29aa1d41-e711-4862-8680-37de5476562e --mode fast
```
- `fast` mode: ~30 seconds, ~10 sources
- `deep` mode: ~5 minutes, ~40 sources, web only
- Capture the TASK_ID from output

### If Previous Research Pending
If a previous research task is blocking, use --force:
```
PYTHONIOENCODING=utf-8 nlm research start "<query>" --notebook-id 29aa1d41-e711-4862-8680-37de5476562e --mode fast --force
```

### Check Status
```
PYTHONIOENCODING=utf-8 nlm research status 29aa1d41-e711-4862-8680-37de5476562e
```
Wait ~35 seconds after starting before checking.

### Import Sources
```
PYTHONIOENCODING=utf-8 nlm research import 29aa1d41-e711-4862-8680-37de5476562e <task-id>
```

### List Imported Sources (get IDs)
```
PYTHONIOENCODING=utf-8 nlm source list 29aa1d41-e711-4862-8680-37de5476562e
```

## Notes
- Status check and import can be chained with && after a sleep
- Sources come in as web pages, PDFs, or other types — all usable for video creation
- After import, review the list and select the best sources for each video focus
