# Skill: Delete Sources

## What This Covers
How to delete sources from a notebook to keep it clean between runs.

## Notebook
Always use the Pipeline notebook unless told otherwise:
- Name: "Pipeline"
- ID: `29aa1d41-e711-4862-8680-37de5476562e`

## Command (single source)
```
PYTHONIOENCODING=utf-8 nlm source delete <source-id> -y
```
Note: source delete takes only the SOURCE_ID — no notebook ID required.
The `-y` flag skips confirmation.

## Command (multiple sources — chain with &&)
```
PYTHONIOENCODING=utf-8 nlm source delete <id1> -y && \
PYTHONIOENCODING=utf-8 nlm source delete <id2> -y && \
PYTHONIOENCODING=utf-8 nlm source delete <id3> -y
```

## When to Delete
- After videos are confirmed rendered (or queued — server continues rendering)
- Before starting a new topic run to keep the notebook clean
- Source IDs come from the manifest or from `nlm source list`

## Verify Deletion
```
PYTHONIOENCODING=utf-8 nlm source list 29aa1d41-e711-4862-8680-37de5476562e
```
Should return empty array [] when all sources deleted.

## Notes
- Loop syntax does not work reliably on Windows — always chain with &&
- Deletion is permanent and immediate
