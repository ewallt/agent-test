# Workflow: Research Pipeline

## What This Does
Given a topic, produces N videos in the Pipeline notebook using web-discovered sources.
Fully automated after initial auth. No local files required.

## Skills Used
- skill-auth.md
- skill-manifest.md
- skill-research.md
- skill-create-videos.md
- skill-delete-sources.md
- skill-log.md

## Inputs Required from User
- Topic (e.g. "Tesla vs Edison")
- Number of videos (typically 2-5)
- Visual style (default: retro_print)
- Auth confirmation (user runs `nlm login` before starting)

## Steps

### 0. Record Start Time
Record the current time before doing anything else. This is used to compute elapsed time for the log.
```
date /t && time /t
```

### 1. Auth Check
Confirm user has authenticated. See skill-auth.md.

### 2. Generate and Write Out Current Manifest
List current sources in Pipeline notebook. Write manifest out for user to copy/paste.
See skill-manifest.md.

### 3. Delete All Existing Sources
Delete every source currently in the notebook. See skill-delete-sources.md.
Verify notebook is empty with source list.

### 4. Research Topic
Run research start with topic query. Wait ~35 seconds. Import results.
See skill-research.md.

### 5. Select Sources for Videos
List imported sources with IDs. Review titles and select the best N sources —
one per video — choosing sources that best match each intended focus angle.

### 6. Queue Videos
For each selected source, fire one video create command with:
- --source-ids targeting that specific source
- --focus describing the specific angle for that video
- --style as specified (default: retro_print)
Submit all video create commands without waiting between them.
See skill-create-videos.md.

### 7. Update Manifest
Add new sources to manifest under a new run heading. Write out additions for user to append.
See skill-manifest.md.

### 8. Write Log Entry
Record end time and write a log entry. See skill-log.md.
Note: Research Pipeline notebooks don't have a shareable URL — omit that field.

### 9. Confirm and Hand Off
Report artifact IDs for all queued videos. Inform user of expected render time (~8-10 min each).
Renders continue server-side even if auth expires.

## Notes
- Do NOT create a new notebook — always reuse Pipeline (ID: 29aa1d41-e711-4862-8680-37de5476562e)
- Creating a new notebook triggers a permission prompt; reusing Pipeline does not
- LIFO rendering order — submit in any order, videos come out last-in-first-out
- Source cleanup happens at the START of the next run, not the end of this one
  (videos may still be rendering when we finish queueing)
