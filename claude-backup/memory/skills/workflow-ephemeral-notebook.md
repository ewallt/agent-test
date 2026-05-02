# Workflow: Ephemeral Notebook Build

## What This Does
Builds a purpose-built NotebookLM notebook for a specific topic: sources + videos.
Designed for rapid iteration — build, evaluate, tear down, rebuild better.

## Human Touchpoints
1. **Before start**: Run `nlm doctor` silently. If it passes, continue without mentioning it. Only stop and tell Tom to run `nlm login --profile default` if a command actually fails due to auth — do not pre-emptively ask about auth status.
2. **After handoff**: Tom evaluates the notebook and decides next iteration

Permission prompts may appear after ANY tool call — Bash commands, Write, Edit, or other tools. After every tool call, note immediately whether a prompt appeared — tool name, step number. Do not wait until the end of the run.

---

## Two Operating Modes

**Conversation mode** — back-and-forth with Tom. Tom is at the keyboard. Questions and interruptions are fine in this mode. This is the mode before Step 0 begins.

**Workflow mode** — once the workflow starts (Step 0), the goal is to reach the handoff without interrupting Tom. Internal pauses (to think, evaluate sources, design focus angles) are fine — they are cogitation, not prompts to Tom. Do not ask Tom questions mid-workflow. Keep going.

**There are no stop points during workflow execution.** The goal is to run the full workflow from Step 0 to the handoff report without interrupting Tom. All decisions — source selection, focus angle design, app building, video queueing — are made autonomously. Do not ask Tom for approval at any point during the run.

---

## IMPORTANT: How to Use This File
This workflow is a sequencer. Each step tells you exactly what to do and which skill to read before doing it. Do not rely on memory. Read the referenced skill at the step where it is needed — not before, not from memory.

Do not proceed to the next step until the current step is fully complete and verified.

**Never make Write or Edit tool calls during an active run.** These trigger permission prompts that can stall the run indefinitely if Tom is away. If a fix is identified during conversation (before Step 0), make the edit immediately — Tom is present. If a fix is needed mid-run, note it and apply it after the run completes.

---

## Task Execution Checklist
Work through this in order. Verify each item is done before moving to the next.

- [ ] Throughout: permission prompt status noted after every tool call — Bash AND Write/Edit/other tools (tool name + step)
- [ ] Step 0: Start time recorded
- [ ] Step 1: Auth verified — nlm doctor returned clean
- [ ] Step 2: Notebook created — NOTEBOOK_ID captured
- [ ] Step 3: Research started — TASK_ID captured
- [ ] Step 3: Research confirmed complete — sources found count noted
- [ ] Step 3: Sources imported — list confirmed
- [ ] Step 4: Sources listed with IDs — N sources selected, each matched to a focus angle
- [ ] Step 4: Source-focus mapping written out explicitly before any video command is run
- [ ] Step 4.5: Reports generated and app built (if applicable) — app added as source, manifests downloaded
- [ ] Step 5: Videos queued — all artifact IDs captured
- [ ] Step 6: Notebook shared — URL captured
- [ ] Step 6.5: Titles reviewed — bad videos identified and requeued if needed
- [ ] Step 7: Log entry written — at END of file (verify position)
- [ ] Step 8: Task file moved to completed/
- [ ] Step 9: End time recorded
- [ ] Step 9: Handoff report delivered to Tom

---

## Steps

### Step 0 — Record Start Time
Run:
```
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
```
Record this time. It is used to compute elapsed time for the log entry.
✓ Checklist: Start time recorded.

---

### Step 1 — Auth Check
Run:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe doctor'
```
Confirm output shows: Cookies present, CSRF token yes, account ewalltom@gmail.com.
If it passes, continue silently. Only alert Tom if a subsequent command fails due to auth — then stop and ask Tom to run `nlm login --profile default`.
For multi-notebook runs: re-run this step before each notebook — auth expires ~20 min.
✓ Checklist: Auth verified.

---

### Step 2 — Create Notebook
Run:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe notebook create "<Topic Title>"'
```
Capture NOTEBOOK_ID from output. All subsequent commands use this ID.
✓ Checklist: Notebook created, NOTEBOOK_ID captured.

---

### Step 3 — Research, Status, Import
Run research:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe research start "<query>" --notebook-id <NOTEBOOK_ID> --mode fast'
```
Capture TASK_ID from output. Wait 35 seconds, then check status:
```
powershell -Command "Start-Sleep -Seconds 35"
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe research status <NOTEBOOK_ID> --max-wait 0'
```
Confirm status is `completed`. Then import:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe research import <NOTEBOOK_ID> <TASK_ID>'
```
Note number of sources imported.
If a previous research task is blocking: add `--force` to the research start command.
✓ Checklist: Research started, confirmed complete, sources imported.

---

### Step 4 — Select Sources and Design Focus Angles
**READ skill-video-strategy.md NOW before doing anything in this step.**

List sources with IDs:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe source list <NOTEBOOK_ID>'
```
Following skill-video-strategy.md, select the best N sources (N = number of videos).

**Before running any video command, write out the source-focus mapping explicitly:**
```
Video 1: source-id = <id> | title = <source title> | focus = "<focus angle>"
Video 2: source-id = <id> | title = <source title> | focus = "<focus angle>"
...
```
Verify: each source is distinct, each focus matches what the source actually contains.
Write out the mapping, then proceed immediately to the next step — do not stop or ask Tom for approval.
✓ Checklist: Sources listed, N sources selected, source-focus mapping written.

---

### Step 4.5 — Generate Reports and Build App (conditional)

Skip this step entirely if `app`, `slideshow`, and `remotion` are all `no` (or absent).

Run only the sub-steps that apply based on task flags. All report/app work happens BEFORE videos are queued.

#### If `app: yes`
READ `skill-inference-app.md` NOW before doing anything here.

Run `nlm source list`, WebFetch the source URLs to build research context.
Build the web app and save to `Projects/NotebookLM/ephemeral-notebook/apps/<topic-slug>.html`.
Do NOT add the app to the notebook — it stays local.

#### If `slideshow: yes`
READ `skill-slideshow-manifest.md` NOW before doing anything here.
Claude writes the manifest directly from WebFetching source URLs.
Add to the notebook as a source via `source add --text` using a `.ps1` script.
Gemini reads from the notebook — the manifest must be a source, not an artifact.

#### If `remotion: yes`
READ `remotion-context.md` NOW before doing anything here.
Run `nlm source list`, WebFetch the source URLs to build research context.
Write the narration script — stays in context (not saved to disk).
Do NOT add to the notebook — stays local.

✓ Checklist: Research file written, app built (if applicable), manifest written and added as source (if applicable), remotion script written (if applicable).

---

### Step 5 — Queue Videos
For each entry in the source-focus mapping from Step 4, run one video create command.
Submit each separately (do not chain with &&):
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe video create <NOTEBOOK_ID> --confirm --style retro_print --focus "<focus angle>" --source-ids <source-id>'
```
Capture artifact ID from each response.
✓ Checklist: All videos queued, all artifact IDs captured.

---

### Step 6 — Share Notebook
Run:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe share public <NOTEBOOK_ID>'
```
Capture the shareable URL.
✓ Checklist: Notebook shared, URL captured.

---

### Step 6.5 — Title Review (after videos complete)
Once videos have rendered (~8-10 min), retrieve generated titles:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe studio status <NOTEBOOK_ID>'
```
Review each title against its focus angle. A good title reflects the focus angle. A bad title (e.g. off-topic, generic, or clearly wrong content) indicates the source was inaccessible or low-quality.

**If a title looks wrong:**
1. Delete the bad artifact: `powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe studio delete <artifact-id> -y'`
2. Check source list — if the source content was the problem, delete the source and add a better one
3. Requeue the video with the same focus angle and new source
4. Re-check titles after re-render

This step can be done while other notebooks are still building — no need to wait.
✓ Checklist: All titles reviewed, bad videos identified and requeued if needed.

---

### Step 7 — Write Log Entry
**READ skill-log.md NOW before doing anything in this step.**

Record end time:
```
powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
```
Compute elapsed time (start to end of video queueing — not including render time).
Following skill-log.md, append one entry to run-log.md.
After appending, verify the new entry appears at the END of the file in chronological order.
✓ Checklist: Log entry written at end of file, position verified.

---

### Step 8 — Move Task File to Completed
Move the task file:
```
powershell -Command "Move-Item 'C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\ephemeral-notebook\tasks\<filename>' 'C:\Users\tomew\Documents\agent-test\Projects\NotebookLM\ephemeral-notebook\completed\<filename>'"
```
If copied-text: yes, also move the copied-text file.
✓ Checklist: Task file moved to completed/.

---

### Step 9 — Handoff to Tom
Record end time if not already done. Report:
- Notebook title and ID
- Shareable URL
- Artifact IDs and focus angles for each video
- Estimated render time (~8-10 min per video)
- Elapsed build time
- All interventions observed during the run (permission prompts, auth issues, anything Tom had to do)
- Any hiccups or deviations from normal flow
✓ Checklist: End time recorded, handoff report delivered.

---

## Teardown (when Tom is ready)
Always confirm with Tom before deleting. Then:
```
powershell -Command 'C:\Users\tomew\.local\bin\nlm.exe notebook delete <NOTEBOOK_ID> -y'
```
Videos already downloaded locally survive deletion.

---

## Notes
- Never reuse the Pipeline notebook (ID: 29aa1d41-e711-4862-8680-37de5476562e)
- Each topic gets its own fresh notebook and NOTEBOOK_ID
- Source cleanup is not needed — the whole notebook gets deleted at teardown
- Multiple notebooks can render simultaneously — no need to wait between notebook builds
- Videos are standalone .mp4s — they survive notebook deletion once downloaded
- Do not chain nlm video create commands with && — run each separately
