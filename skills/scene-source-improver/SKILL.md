---
name: scene-source-improver
description: DESIGN STUB — not yet a functional skill. Invoke this skill when Tom brings a Gemini video evaluation and wants to extract lessons and apply them to the scene-writer skill. Future: use when reviewing finished NLM videos against their source documents to improve future source writing.
---

# Scene Source Improver

> **STATUS: DESIGN STUB**
> This skill documents the intended design for a future build. No executable steps yet.
> When ready to build, expand Step 2 (lesson extraction) and Step 3 (scene-writer update) into full instructions.

---

## What This Skill Will Do

Improve the scene-writer skill incrementally by analyzing Gemini's fidelity evaluations of finished NLM videos. Each evaluation surfaces one or more lessons about how NLM translates source text into video. Those lessons get applied as small, targeted updates to the scene-writer skill.

The model is forward-looking: NLM cannot edit finished videos, so we never revise past sources. Instead, each evaluation adds to a growing understanding of what works, and that understanding shapes future source writing.

---

## Intended Workflow (when built)

### Step 1 — Get the Gemini evaluation

Tom gives Gemini a finished NLM video alongside its source document. Gemini evaluates fidelity and returns a structured report.

**Gemini prompt to use (refine when building the skill):**

> You can see this video and this source document. Evaluate how faithfully the video followed the source. Cover:
> - Structural alignment: did the video follow the scene sequence?
> - Preserved details: which quotes, data points, and specific facts made it through?
> - Reordering: did anything get moved for pacing? What was the effect?
> - Omissions: what was trimmed? Was it load-bearing or marginal?
> - Emotional arc: did the climax land where it should? Was anything flattened?

Tom brings this evaluation back to Claude to proceed.

### Step 2 — Extract actionable lessons

Read the evaluation. Identify lessons that are specific, repeatable, and applicable to future source writing. One lesson per evaluation is the target — avoid wholesale rewrites.

Good lessons have the form: "NLM tends to [do X] when the source [does Y] — so in future sources, [do Z]."

Examples of lesson types:
- Details NLM reliably preserves (quotes, ages, locations, counts)
- Details NLM tends to trim (background context, secondary attributions)
- Scene-order patterns (NLM may pull a detail forward for pacing — where does this help vs. hurt?)
- Structural signals NLM responds to (scene splits, climax placement)

### Step 3 — Update the scene-writer skill

Apply the lesson as a small, targeted addition or clarification to:
`C:\Users\tomew\.claude\skills\scene-writer\SKILL.md`

Show Tom the proposed change before writing. One change at a time — do not batch multiple lessons into a single edit.

---

## Design Decisions

- **Trigger**: Periodic review, not after every video. Tom selects which videos to evaluate.
- **Target**: The scene-writer skill only. Not individual source files (can't redo finished videos).
- **Change size**: Small and specific. One lesson per session. This is a slow accumulation, not a redesign.
- **Source of truth for past evaluations**: `memory/feedback_nlm_scene_source_fidelity.md` — update this alongside the scene-writer skill so the memory system stays current.

---

## Build Notes (for when we expand this)

- Write a specific, structured Gemini prompt and test it on 2-3 videos before finalizing
- Consider whether lessons should be tagged by type (omission / reorder / preservation) to make pattern-spotting easier over time
- After ~5 evaluations, do a consolidation pass on the scene-writer skill to absorb what's been learned into the base guidance
