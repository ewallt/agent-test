# Mode: Transform (Version 3)

Converts structured video content into dialog format. Two phases: extraction and generation.

**Core insight:** Many videos are formulaic — comparison/ranking videos, "top N" lists, explainer series all follow repeatable structures. The dialog format is also a formula. This mode substitutes one formula for another: the video's structure becomes the skeleton, the dialog format gives it life. The student's entity pivots ("what about X?") map directly onto the video's entity list. This is why the pattern works so cleanly.

---

## Phase 1: Extraction (when Tom describes a video)

READ NOW: `C:\Users\tomew\.claude\skills\dialog-maker\video-types.md`

This identifies the video pattern and tells you what to ask Gemini for.

**Steps:**
1. Identify the video type from Tom's description
2. Look up that type in `video-types.md`
3. Generate a Gemini extraction prompt tailored to that type
4. Give the prompt to Tom with clear instructions: "Paste this into Gemini with the video open"

**Gemini prompt requirements:**
- Ask for structured output (a specific format, not prose)
- Request the exact fields the dialog needs: entity names, key facts per entity, any framing/thesis from the video
- Keep it concise — Gemini prompt, not an essay
- End with the requested output format explicitly stated

---

## Phase 2: Generation (when Tom pastes Gemini's output)

Take the structured content and transform it into dialog. The key mechanic: the student drives through the entity list using entity pivots ("what about X?"), and the Prof responds with what the video's content says — plus genuine depth and context that goes beyond the video.

**The dialog shouldn't just recite the content.** The Prof should treat each entity as a genuine topic, not a bullet point to read out. The video's content is the anchor; the Prof's job is to make it interesting.

**Structure for comparison/ranking videos (e.g., Briggs):**
- Opening: student introduces the topic ("I've been looking at which states are best to retire to...")
- Middle: entity-by-entity, student asks about each, Prof responds with substance
- The Prof can group entities, compare them to each other, note surprises and outliers
- Closing: student synthesizes, Prof adds the layer the video probably didn't include

**Pacing:** Don't give every entity equal weight. The most interesting cases get longer treatment. Obvious or unsurprising entries can be brief.

---

## Handoff Format

When giving Tom the Gemini prompt, format it clearly:

```
Here's the prompt for Gemini:

---
[prompt text]
---

Paste this into Gemini with the video open. When you get the output, paste it back here and I'll generate the dialog.
```
