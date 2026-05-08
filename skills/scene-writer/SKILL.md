---
name: scene-writer
description: >
  Write NLM source documents in scene format — a structured sequence of short, focused scenes
  instead of a standard essay. Use this skill whenever writing a source document for a
  NotebookLM video, especially for history, biography, or narrative topics. Invoke any time
  a source doc is being written and the content has a clear story arc or progression.
---

## How the pipeline works (read this first)

The source document is not a script. It is a brief for Gemini, which acts as creative director and writes its own script from it. Gemini does not render the source as written — it reads, synthesizes, and reinterprets.

**What Gemini responds to:**
- Dramatic structure — how the story opens, builds, and closes
- Factual density — named people, specific dates, concrete events it can anchor and amplify
- Narrative beats — what each scene's role is in the arc
- A defined closing beat — sources that trail off produce videos that cut abruptly

**What does not reach the visual layer:**
- Camera directions
- Lighting descriptions
- In-scene motion specifications

Write for narrative intent, not visual execution.

---

## Step 1 — Plan the arc

Before writing, identify:
- **The opening hook** — what moment or fact grabs attention immediately
- **The build** — 4–6 scenes that develop the story, each with a distinct role
- **The climax** — the scene the whole arc has been moving toward
- **The closing beat** — a scene that lands the takeaway; this is non-negotiable

If you can't name all four, plan them before writing.

---

## Step 2 — Write the source document

### Document structure

**Title and overview**
- A short, specific title
- 2–4 sentences: the topic, the angle, and why it matters

**Scenes**

Each scene follows this pattern:

```
Scene N — [Short Descriptive Title]

[1–3 paragraphs. One idea. Factually dense — specific names, dates, places, events.
Screenwriter framing: what is physically happening, who is present, what are they doing.
The scene's narrative role should be clear from the writing.]

NARRATIVE ROLE: [Hook / Build / Climax / Resolution]
NARRATION BEAT: [The one thing the viewer should understand from this scene]
KEY FACTS: [The specific anchors — names, dates, events — Gemini should pick up]
```

**How many scenes:** Aim for 5–8. More shorter scenes is better than fewer longer ones.

**When to split a scene:**
- The scene covers more than one distinct idea or moment
- The setting, time, or subject shifts mid-paragraph
- The climax deserves its own scene — always give it one

**Key Takeaway**
- 2 sentences
- Summarizes the central idea — what the viewer walks away with
- This is the closing beat. It must be present. It prevents abrupt cutoffs.

---

## What makes scenes strong

**Factual density beats visual description.** Named entities, specific dates, and concrete events give Gemini material to anchor and amplify beyond the source. Vague descriptive prose gives it nothing to work with.

**Screenwriter framing, not narrator framing.** Describe what is physically happening — who is present, what they are doing — rather than summarizing what something means. The meaning can be in the NARRATION BEAT field.

**Each scene earns its place.** Every scene should move the arc forward. If a scene could be cut without losing the story, cut it.

**The arc must close.** The final scene and Key Takeaway together are the closing beat. If the source ends on an open content beat, the video will cut abruptly. This is the most common failure mode.

---

## Example Structure (Adams and Jefferson)

```
# Adams and Jefferson: The Last Day

On July 4th, 1826, the two surviving authors of the Declaration of Independence
died within hours of each other — fifty years to the day after it was signed.
This is the story of what their deaths meant to a young nation.

Scene 1 — Two Old Men, Far Apart
Adams was 90, bedridden in Quincy, Massachusetts. Jefferson was 83, failing at
Monticello. They had not seen each other in years...

NARRATIVE ROLE: Hook
NARRATION BEAT: The two founders are dying simultaneously, unknown to each other
KEY FACTS: John Adams, Thomas Jefferson, July 4 1826, Quincy, Monticello

Scene 2 — What They Had Been to Each Other
[...]

Scene 7 — What Was Left Behind
A week before he died, Jefferson wrote what turned out to be his last letter...

NARRATIVE ROLE: Resolution
NARRATION BEAT: What they built outlasted them both
KEY FACTS: Jefferson's last letter, July 4 as American mythology

Key Takeaway
Adams and Jefferson died on the same day — July 4th, 1826, fifty years after the
Declaration — a coincidence so perfect that Americans took it as a sign. What they
left behind was not just a document but a demonstration that a republic could endure.
```

---

## Steering prompt (write this alongside the source)

The steering prompt is where tone, persona, and aesthetic behavior live. It does not belong in the source document.

A good steering prompt:
- Assigns a directorial persona ("You are a visionary documentary filmmaker")
- Frames the content type ("treat this as a story unfolding across decades, not an academic summary")
- Sets emotional register (contemplative, urgent, elegiac)
- Names the arc in one sentence ("from obscurity to the center of the world, and what was lost along the way")

The steering prompt does not control visual execution or video length.
