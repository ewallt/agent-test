# Agent Parallelization — Design Notes

Future use cases for spawning subagents within the ephemeral notebook workflow.
Not planned for immediate implementation — capturing the thinking while it's fresh.

---

## 1. Parallel Artifact Generation (within a single run)

**The opportunity:** During a notebook run, the web app and slide manifest are fully independent
of each other and of the NotebookLM video generation. Currently they are written sequentially
while waiting for NotebookLM to finish. An agent could build the web app while the main thread
writes the manifest (or vice versa), cutting wall time on runs that include all three artifacts.

**Rough shape:** After kicking off `nlm video create`, spawn one agent for the web app and write
the slide manifest in the main thread. Both finish before the video does. No sequential waiting.

**Constraint:** The web app and manifest both need the knowledge base to be finalised first, so
this only saves time after Phase 2 is complete.

---

## 2. Isomorphic Series Parallelization

**The opportunity:** Multi-notebook series (WW2, Scientific Revolutions, etc.) currently run
sequentially — one notebook fully complete before the next starts. Each notebook is independent.
Four agents could run four notebooks simultaneously.

**Rough shape:** Pre-write all task files / JSON requests. Spawn one agent per notebook, each
running the full Phase 2→4 cycle. Main thread collects results and writes a combined run log.

**Constraint to investigate:** Whether NotebookLM's API tolerates multiple parallel sessions
under one Google account without rate limiting or auth conflicts. Unknown — would need to test
with two notebooks first before scaling.

---

## 3. Knowledge Base Enrichment (Claude as Source pattern)

**The opportunity:** For the Claude as Source pattern, the knowledge base is written from
training knowledge alone. For well-established topics this is fine, but for topics where
currency or specific detail matters, a research agent could do a quick web pass first — surfacing
anything Claude might be thin on — and hand back a summary to incorporate before writing.

**Rough shape:** Before writing the knowledge base, spawn a research agent with the topic and a
list of specific gaps to check. Agent returns a brief. Main thread incorporates into the knowledge
base document.

**When it matters most:** Topics from the last few years, topics where specific names/dates/stats
matter, topics with ongoing academic debate.

---

## 4. Background Wrap-Up During a Run

**The opportunity:** While a notebook run is in flight (waiting on NotebookLM video generation),
an agent could be writing the updated handoff doc, updating skills, or writing the run log entry
— so wrap-up is already done when the video finishes.

**Rough shape:** After kicking off video generation, spawn a wrap-up agent with all the run
details. Agent writes the run log draft and handoff notes. Main thread downloads artifacts and
reviews/finalises the draft.

---

## Priority Order (when the time comes)

1. Parallel artifact generation — lowest complexity, most immediate time saving
2. Isomorphic series parallelization — highest leverage for the right topic, needs auth testing
3. Knowledge base enrichment — adds quality, not just speed; lower urgency for stable topics
4. Background wrap-up — nice to have, not a bottleneck
