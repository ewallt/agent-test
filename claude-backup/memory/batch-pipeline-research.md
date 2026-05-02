# Batch Pipeline Research — Feb 17

## Problems We Were Trying to Solve

### 1. Auth Expiry
The `nlm login` step requires a manual browser OAuth flow — it cannot be automated.
Originally estimated the auth window at 2-3 hours, but real-world testing suggests it
may be as short as ~20 minutes. This means an unattended batch run risks failing mid-way
through, requiring the user to intervene and re-authenticate.

### 2. Source Cross-Contamination
NotebookLM generates video from whatever sources are currently in the notebook.
If multiple sources are loaded simultaneously, the video will draw from all of them,
producing a muddled result. The original pipeline strictly enforced one source at a time,
deleting each source before adding the next — but this is slow and requires Claude to
babysit the process.

### 3. No Passive Waiting
Claude has no built-in timer. It cannot silently wait 8-10 minutes for a video to render
and then resume. Options are: (a) user watches the clock and nudges Claude, or (b) Claude
runs a blocking poll loop, during which it cannot respond to chat.

---

## What We Discovered

### Discovery 1: `--source-ids` flag
The `nlm video create` command accepts a `--source-ids` argument:

```
--source-ids TEXT   Comma-separated source IDs
```

This allows you to specify exactly which source(s) a video should be generated from,
even if the notebook contains multiple sources.

**Implication:** You could potentially load all source files into the notebook upfront,
then fire off a series of `video create` commands each targeting a specific source ID.
This decouples source management from video generation and could allow true queuing.

### Discovery 2: Video Queueing CONFIRMED (Feb 20)
Multiple `video create` commands submitted in sequence are accepted immediately — the CLI
does not block waiting for each render. NotebookLM queues them server-side and renders
one after another without manual intervention.

**Confirmed:** 3 videos queued in a single session for the "Why the Allies Won" notebook,
all accepted without waiting. Full run took ~2 minutes.

### Discovery 3: Auth Expiry Is Likely CLI-Only
The hypothesis (unconfirmed) is that auth expiry kills Claude's ability to issue new
commands, but does NOT interrupt renders already in progress on NotebookLM's servers.

**Implication:** The ~20 min auth window may be less of a constraint than it appears —
as long as all video create commands are issued within that window, the renders should
complete regardless.

### Discovery 4: `--focus` and `--style` flags
```
--focus TEXT    Optional focus topic (equivalent to the pencil/prompt icon in the UI)
--style TEXT    Visual style: auto_select, classic, whiteboard, kawaii, anime,
                              watercolor, retro_print, heritage, paper_craft
--format TEXT   explainer (default) or brief
```

These give full control over video output via CLI, matching what the UI offers.

---

## Proposed Batch Pipeline (To Be Tested)

Given the above, a revised unattended batch pipeline might look like this:

1. User runs `nlm login` (once, at session start)
2. Claude adds all source files to the notebook in sequence, capturing each SOURCE_ID
3. Claude fires off all `video create` commands in sequence, each with `--source-ids <id>`
   targeting its specific source — all within the ~20 min auth window
4. NotebookLM queues and renders all videos server-side
5. Auth may expire, but renders continue
6. User returns later; Claude (after re-auth if needed) deletes all sources and confirms
   all videos completed

This would reduce required human interaction to: one login at the start, one check-in
at the end.

---

## Open Questions / Things To Test

1. **Does `--source-ids` actually isolate the video to that source?** — PENDING evaluation
   of first ephemeral notebook run (Feb 20). Videos are rendering; Tom will assess quality.
2. **Can you queue multiple `video create` calls without waiting for each to finish?**
   CONFIRMED YES (Feb 20) — CLI accepts commands immediately, no blocking.
3. **Does auth expiry kill in-progress renders?** Or does the server continue independently?
   Still unconfirmed, but hypothesis remains that server continues independently.
4. **How many sources can the notebook hold simultaneously?** Is there a cap?
   Still unknown — 9 sources loaded successfully in Feb 20 run, no errors.
5. **Does source order or notebook state affect video quality** when using `--source-ids`?
   Still unknown — pending evaluation of Feb 20 run.
