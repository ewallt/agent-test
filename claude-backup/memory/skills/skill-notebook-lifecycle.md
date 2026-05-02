# Skill: Notebook Lifecycle

## What This Covers
Creating, sharing, renaming, and deleting notebooks for the ephemeral notebook workflow.

## Create a Notebook
```
PYTHONIOENCODING=utf-8 nlm notebook create "Title Here"
```
- Returns a NOTEBOOK_ID — capture this, it's used for all subsequent commands
- **Human in the loop**: notebook creation triggers a permission prompt that Tom must approve
- No config options at creation time — title only

## Get Notebook Details
```
PYTHONIOENCODING=utf-8 nlm notebook get <notebook-id>
```

## Rename a Notebook
```
PYTHONIOENCODING=utf-8 nlm notebook rename <notebook-id> "New Title"
```

## Share a Notebook (make public)
```
PYTHONIOENCODING=utf-8 nlm share public <notebook-id>
```
- Returns a shareable URL — this is what gets handed to Tom for evaluation
- Anyone with the link can view

## Check Sharing Status
```
PYTHONIOENCODING=utf-8 nlm share status <notebook-id>
```

## Delete a Notebook
```
PYTHONIOENCODING=utf-8 nlm notebook delete <notebook-id> -y
```
- Permanent and immediate
- Always confirm with Tom before deleting

## List All Notebooks
```
PYTHONIOENCODING=utf-8 nlm notebook list
```
Useful for finding IDs of notebooks created in previous sessions.

## Notes
- Unlike the Pipeline notebook, ephemeral notebooks are created fresh per topic and deleted after evaluation
- Always capture NOTEBOOK_ID from create output — it's needed for every subsequent step
- The Pipeline notebook (ID: 29aa1d41-e711-4862-8680-37de5476562e) is separate and should not be deleted
