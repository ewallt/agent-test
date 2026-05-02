# Workflow: NotebookLM Operator

## What This Does
Reads JSON files from `json/`, builds NotebookLM notebooks, evaluates sources,
queues videos, downloads artifacts, and moves processed files to their completed folders.
Does not generate or modify JSONs — that is Instance 1's job.

## Identity
You are Instance 2: the NotebookLM Operator. Your job is to build the best possible
notebook from each JSON. All content decisions (topic, focus angles, video count) are
already made. Your decisions are about execution quality: source selection, research
evaluation, error correction.

---

## Human Touchpoints
1. **Before start**: Run `nlm doctor` first. If auth is expired, tell Tom to run
   `nlm login --profile default` and wait for confirmation.
2. **After handoff**: Tom evaluates the notebook and decides next steps.

Permission prompts may appear after ANY tool call. Note immediately after every tool
call whether a prompt appeared — tool name, step number. Do not wait until end of run.

**Never make Write or Edit tool calls during an active run.** These trigger permission
prompts that can stall the run if Tom is away. Note any needed fixes and apply after
the run completes.

---

## Task Execution Checklist
- [ ] Throughout: permission prompt noted after every tool call
- [ ] Step 0: Start time recorded
- [ ] Step 1: Auth verified
- [ ] Step 2: JSON read and fields extracted
- [ ] Step 3: Notebook created — NOTEBOOK_ID captured
- [ ] Step 4: Research started — TASK_ID captured
- [ ] Step 4: Research confirmed complete
- [ ] Step 4: Sources imported
- [ ] Step 5: Sources listed, N selected, source-focus mapping written and verified
- [ ] Step 6: Videos queued — all artifact IDs captured
- [ ] Step 7: Notebook shared — URL captured
- [ ] Step 7.5: Titles reviewed — bad videos identified and requeued if needed
- [ ] Step 7.6: If slideshow: yes — manifest generated and downloaded to slideshows/
- [ ] Step 8: Log entry written at END of file
- [ ] Step 9: JSON moved to `json-completed/`
- [ ] Step 10: End time recorded, handoff report delivered

---

## Steps

### Step 0 — Record Start Time
Run:
```
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
```
✓ Checklist: Start time recorded.

---

### Step 1 — Auth Check
Run:
```
PYTHONIOENCODING=utf-8 nlm doctor
```
Confirm: Cookies present, CSRF token yes, account ewalltom@gmail.com.
If expired, tell Tom to run `nlm login --profile default` and wait.
For multi-notebook runs: re-run before each notebook — auth expires ~20 min.
✓ Checklist: Auth verified.

---

### Step 2 — Read JSON
List files in:
`C:\Users\tomew\Documents\agent-test\playlists\json\`

If no files found, report "No JSONs found in playlists/json/" and stop.

Read the first JSON file. Extract fields:
- `topic` — notebook title and research subject
- `videos` — number of videos to queue (default 3)
- `style` — video style (default `retro_print`)
- `format` — video format (default `explainer`)
- `depth` — research depth (default `deep`)
- `query` — research query (default: use `topic`)
- `guidance` — content direction; read carefully, informs all execution decisions
- `research` — yes/no (default yes)
- `copied-text` — yes/no (default no)

✓ Checklist: JSON read and fields extracted.

---

### Step 3 — Create Notebook
Run:
```
PYTHONIOENCODING=utf-8 nlm notebook create "<topic>"
```
Capture NOTEBOOK_ID. All subsequent commands use this ID.
✓ Checklist: Notebook created, NOTEBOOK_ID captured.

---

### Step 4 — Research, Status, Import
Run research:
```
PYTHONIOENCODING=utf-8 nlm research start "<query>" --notebook-id <NOTEBOOK_ID> --mode fast
```
Capture TASK_ID. Wait 35 seconds then check status:
```
powershell -Command "Start-Sleep -Seconds 35"
PYTHONIOENCODING=utf-8 nlm research status <NOTEBOOK_ID>
```
Confirm status is `completed`. Then import:
```
PYTHONIOENCODING=utf-8 nlm research import <NOTEBOOK_ID> <TASK_ID>
```
Note number of sources imported.
If a previous research task is blocking: add `--force` to the research start command.
✓ Checklist: Research started, confirmed complete, sources imported.

---

### Step 5 — Select Sources and Design Focus Angles
**READ skill-video-strategy.md NOW before doing anything in this step.**

List sources:
```
PYTHONIOENCODING=utf-8 nlm source list <NOTEBOOK_ID>
```
Select the best N sources (N = `videos`). Use `guidance` from the JSON to inform
source selection and focus angle design.

**Before running any video command, write out the source-focus mapping explicitly:**
```
Video 1: source-id = <id> | title = <source title> | focus = "<focus angle>"
Video 2: source-id = <id> | title = <source title> | focus = "<focus angle>"
...
```
Verify: each source is distinct, each focus matches source content and honors guidance.
Do not proceed until mapping is written and verified.
✓ Checklist: Sources listed, N selected, source-focus mapping written and verified.

---

### Step 6 — Queue Videos
For each entry in the source-focus mapping, run one command (do not chain with &&):
```
PYTHONIOENCODING=utf-8 nlm video create <NOTEBOOK_ID> --confirm \
  --style <style> \
  --format <format> \
  --focus "<focus angle>" \
  --source-ids <source-id>
```
Capture artifact ID from each response.
✓ Checklist: All videos queued, all artifact IDs captured.

---

### Step 7 — Share Notebook
Run:
```
PYTHONIOENCODING=utf-8 nlm share public <NOTEBOOK_ID>
```
Capture the shareable URL.
✓ Checklist: Notebook shared, URL captured.

---

### Step 7.5 — Title Review (after videos render)
Once videos have rendered (~8-10 min), retrieve titles:
```
PYTHONIOENCODING=utf-8 nlm list artifacts <NOTEBOOK_ID> --full --json
```
Review each title against its focus angle. A bad title indicates a low-quality source.

**If a title looks wrong:**
1. Delete bad artifact: `PYTHONIOENCODING=utf-8 nlm studio delete <artifact-id> -y`
2. Check source — if content was the problem, delete and add a better source
3. Requeue with same focus angle and new source
4. Re-check titles after re-render

✓ Checklist: All titles reviewed, bad videos identified and requeued if needed.

---

### Step 7.6 — Slideshow Manifest (if slideshow: yes)
**READ skill-slideshow-manifest.md NOW before doing anything in this step.**

Only execute this step if `slideshow: yes` is set in the JSON. Otherwise skip.

Follow skill-slideshow-manifest.md to generate and download the manifest.
✓ Checklist: Manifest generated and downloaded to slideshows/.

---

### Step 8 — Write Log Entry
**READ skill-log.md NOW before doing anything in this step.**

Record end time:
```
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
```
Append one entry to run-log.md. Verify entry appears at END of file.
✓ Checklist: Log entry written at end of file, position verified.

---

### Step 9 — Move JSON to Completed
Move the processed JSON:
```
powershell -Command "Move-Item 'C:\Users\tomew\Documents\agent-test\playlists\json\<filename>' 'C:\Users\tomew\Documents\agent-test\playlists\json-completed\<filename>'"
```
✓ Checklist: JSON moved to json-completed/.

---

### Step 10 — Handoff to Tom
Report:
- Notebook title and ID
- Shareable URL
- Artifact IDs and focus angles for each video
- Estimated render time (~8-10 min per video)
- Elapsed build time
- All interventions observed (permission prompts, auth issues, anything Tom had to do)
- Any hiccups or deviations from normal flow

Then repeat from Step 1 for the next JSON in `json/`. When `json/` is empty, stop.
✓ Checklist: End time recorded, handoff report delivered.

---

## Teardown (when Tom is ready)
Always confirm with Tom before deleting. Then:
```
PYTHONIOENCODING=utf-8 nlm notebook delete <NOTEBOOK_ID> -y
```

---

## Notes
- Never reuse the Pipeline notebook (ID: 29aa1d41-e711-4862-8680-37de5476562e)
- Do not chain nlm video create commands with && — run each separately
- Multiple notebooks can render simultaneously — no need to wait between builds
- Videos are standalone .mp4s — they survive notebook deletion once downloaded
- Auth expires ~20 min — re-check before each notebook in multi-notebook runs
- Import timeout bug: check source list before retrying — retry causes duplication
