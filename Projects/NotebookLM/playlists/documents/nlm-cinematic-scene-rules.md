# NotebookLM Cinematic Video — Scene Writing Rules

## Context

NotebookLM's cinematic video feature uses a tri-model pipeline: Gemini 3 acts as creative director, Nano Banana Pro handles image conception, and Veo 3 handles video and audio rendering. The source document and focus/steering prompt are the only human control surfaces. These guidelines govern how to write source document scenes to maximize cinematic output quality.

---

## Core Principle

Every scene must give the rendering engine something physical to animate. Abstract concepts with no physical anchor cause the system to fall back to pseudo-animation — a high-quality static image with a digital pan or zoom applied. This looks cheap and is the primary failure mode to avoid.

A well-formed scene answers three questions:
1. What is the physical subject or environment?
2. What is moving or changing within the scene?
3. What is the camera doing?

---

## Rule 1: One Camera Action Per Scene

Combining multiple camera movements in a single scene causes generation to fracture. Each scene must have exactly one dominant camera action.

Do not write: "The camera pans right while slowly zooming in as it dollies forward."
Write instead: "The camera tracks smoothly alongside the subject as she walks."

**Reliable camera actions to use:**
- **Push-in / slow zoom in** — signals focus, emphasis, intensity. Use for key revelations.
- **Pull-back reveal / crane up and away** — signals scale, context, consequence. Use for establishing scope.
- **Tilt up / tilt down** — signals scale vertically. Use for tall structures, imposing figures.
- **Tracking / dolly shot** — follows a subject in motion. Use "smooth tracking shot following…"
- **Aerial / crane / drone shot** — establishes geography, epic scale. Use for scene-setting.
- **Handheld / shaky cam** — adds grit, tension, documentary feel. Use "documentary style" or "handheld."
- **Rack focus / depth of field shift** — foreground sharpens as background blurs or vice versa. Use "shallow depth of field, gentle rack focus from [A] to [B]."

**Use with caution:**
- **Pan** — works at slow speeds only. Fast pans produce edge smearing. Use "slow pan right" or "slow pan left."
- **Orbit / arc shot** — the model understands it but can lose character consistency as angle changes.

**Do not use:**
- Combined movements (pan + zoom + dolly simultaneously)
- Cut, fade to black, match cut, whip pan — these are NLE editing operations Veo cannot execute within a generation. They must be applied in post-production if needed.

---

## Rule 2: Every Scene Needs a Physical Anchor

Abstract language gives the motion engine nothing to animate. Ground every scene in a physical subject, environment, or atmospheric condition.

Weak (abstract): "The concept of divine justice permeates the narrative."
Strong (physical anchor): "A robed figure stands at the edge of a stone courtyard at dusk, head bowed, as wind moves through the torchlight."

**Physical anchors include:**
- A human or animal subject doing something
- An environment with inherent dynamics (water, wind, fire, weather)
- An object being used or interacted with
- An atmospheric condition (storm approaching, light shifting, fog rolling in)

---

## Rule 3: Describe In-Scene Motion Explicitly

Do not assume the engine will infer what should be moving. State it.

**Reliable in-scene motion types:**
- **Human motion** — walking, gesturing, facial expressions, lip movement, emotional reactions. Veo 3 handles natural human motion with high fidelity.
- **Environmental motion** — wind moving fabric, water flowing, fire flickering, fog drifting, rain falling. Physics simulation is strong.
- **Crowds and animals** — work well with specific descriptions. Instead of "a dog," write "a golden retriever with floppy ears bounding across wet grass."
- **Simple object interactions** — pouring, lifting, turning. Complex multi-step physical interactions can break.

**What does not work:**
- **Kinetic typography** — do not write scenes that depend on animated text or moving data charts. Use the negative prompt "no text, no captions" in the focus prompt to prevent gibberish text from appearing.
- **Abstract data visualizations** — charts building on screen, diagrams assembling. These fail in the video layer.

---

## Rule 4: Use Sensory and Atmospheric Language

Sensory specificity improves output quality across the board. Describe light, sound, texture, and atmosphere within the scene description.

**Lighting — use specific conditions:**
- "Golden hour light raking across stone walls"
- "Chiaroscuro — deep shadows with a single harsh overhead light"
- "Flickering candlelight reflecting in the subject's eyes"
- "Cold blue shadow filling the room"
- "Neon industrial glow through rain-streaked glass"

**Weather and particle effects — describe physically:**
- "Rain drops hit the window, merge, and streak downward"
- "Dust motes drift through sunbeams cutting across the room"
- "Fog rolls slowly across the valley floor"
- "Snow falls silently on an empty street"

**Sound — describe it explicitly:**
Including sound descriptions in scenes improves visual physics as a side effect. Veo 3 generates audio natively, and prompting sound grounds the visual generation.
- "Audio: distant church bells, wind through dry leaves"
- "Audio: the low hum of servers, a single keyboard click"
- "Audio: silence broken only by footsteps on stone"

---

## Rule 5: Write Scenes as a Screenwriter, Not a Narrator

The source document should read like a shooting script, not an essay. Each scene is a unit of physical action, not a unit of information.

Narrator style (avoid): "The Enlightenment represented a fundamental shift in how humanity understood reason and authority."

Screenwriter style (use): "A lone scholar sits at a candlelit desk late at night, surrounded by stacked manuscripts. He pauses, sets down his quill, and stares into the flame. The camera slowly pushes in on his face as the light flickers."

The information can still be delivered through narration in the audio track. The scene description governs what is visually happening simultaneously.

---

## Rule 6: Match Camera Action to Conceptual Role

Camera movements carry conceptual meaning. Use this intentionally.

| Camera Action | Conceptual Role | Use When |
|---|---|---|
| Zoom in / push in | Focus, deep dive | Emphasizing a key idea or revelation |
| Pull-back / wide shot | Context, scale | Situating an idea in broader scope |
| Slow pan | Connection, lateral survey | Moving across a scene at low speed only — fast pans smear |
| Tracking shot | Progress, journey | Showing development over time |
| Aerial shot | Overview, authority | Establishing the big picture |
| Handheld | Tension, immediacy | Conflict, uncertainty, urgency |
| Rack focus | Shift in attention | Redirecting the viewer's focus |

---

## Translating Abstract Content Into Physical Scenes

For educational, theological, or argumentative content, the core authoring discipline is converting ideas into physical situations before writing the scene. For each concept, ask: where would this idea live in the physical world? Who would be present? What would they be doing?

| Abstract Concept | Physical Scene Anchor |
|---|---|
| The passage of time | Timelapse of light moving across a stone floor. Camera tilts up slowly. |
| Divine patience | An elderly figure sitting at a window, watching rain. Slow push-in on face. |
| Tension between two ideas | Two figures at opposite ends of a long table, neither speaking. Handheld, slightly unstable. |
| Rapid change | A city street. Tracking shot. Pedestrians blur past. |
| Revelation or insight | A dark room. A door opens. Light floods in. Pull-back reveal. |

---

## Known Failure Modes

### Pseudo-Animation
The most common failure. The system generates a high-quality still image and applies a digital pan or zoom instead of rendering true video motion. Caused by abstract content with no physical anchor, missing motion verbs, or no camera action specified. See Core Principle and Rule 2.

### Object Hallucination
Because the pipeline passes data across three models, physical object recognition can fracture when a scene description is ambiguous. A documented community failure: a scene calling for a photographer caused the image layer to hallucinate an object resembling the stock of a rifle rather than a camera. The narrative context was understood; the physical rendering was not.

**Prevention:** Be specific about physical objects. Name them precisely and describe their appearance rather than relying on category inference. Avoid descriptions where a word has both a benign and a potentially problematic referent.

---

## Source Document Formatting Options

The standard approach for this workflow is the scene-format source (see Scene Template below). Two alternatives are worth knowing:

**Q&A / Fictional Interview format:** Reformatting dense expository text into a dialogue structure with strict word caps (e.g., answers capped at ≤70 words) forces Gemini to write a crisper, dialogue-driven script with tighter visual pacing. Useful when the source material is argumentative rather than narrative.

**Explicit storyboard in the source:** For longer videos where narrative drift is a risk, writing the source as a numbered sequence with scene number, duration, sequence type (e.g., "The Hook," "The Problem," "The Resolution"), visual description, and camera movement gives the pipeline more structure to follow. More granular than the standard scene template; trades flexibility for consistency.

---

## Scene Template

Each scene in the source document should follow this structure:

```
Scene N — [Short Descriptive Title]

[1–3 paragraphs of narrative prose. One idea. Concrete and visual. Camera intent embedded in the prose — not labeled.]

SETTING: [Physical location and time of day]
SUBJECT: [Who or what is the physical anchor]
IN-SCENE MOTION: [What is moving within the frame]
LIGHTING: [Specific lighting condition]
NARRATION BEAT: [What concept or information is being conveyed in the audio]
```

Do not include CAMERA or AUDIO as labeled fields. Camera intent should be embedded in the prose description ("his figure grows smaller as the stars spread to the edges of the frame"). Audio descriptions, if included, should also be woven into the prose rather than labeled — labeled fields may be treated as narration content.

---

## Focus Prompt Guidelines

The focus/steering prompt is the second control surface. It operates at the level of the whole video, not individual scenes. Use it to:

- **Assign a directorial persona:** Sets the creative voice for the whole video.
- **Frame the content type:** Tell it how to treat the material — "a story unfolding across centuries, not an academic explanation."
- **Enforce the single-motion rule globally:** "One primary camera action per scene. Never combine movements."
- **Suppress text rendering:** "No text overlays, no captions, no on-screen typography."
- **Set the emotional register:** Tone, pace, and how the camera relates to the subject.
- **Name the arc (narrative sources):** A one-sentence summary of the story's shape — where it starts and where it ends.

Do not use the focus prompt to micromanage individual scene timing or transitions. Gemini overrides micro-pacing decisions.

### Validated Example (Abraham / Everlasting Covenant, 2026-04-11)

This prompt produced strong cinematic output across two videos:

> You are a visionary documentary filmmaker with a strong cinematic voice. This is a theological narrative — treat it as a story unfolding across centuries, not an academic explanation. Every frame must earn its place. One primary camera action per scene — never combine movements. No text overlays, no captions, no on-screen typography. The tone is contemplative and weighty: ancient, reverent, unhurried. The camera is a participant in revelation, not an observer reporting facts. Honor the arc: from a man alone under the stars, through the shadow of Moriah, to the cross.

---

## Summary Checklist

Before generating a cinematic video, verify each scene has:
- [ ] A physical anchor (subject, environment, or atmospheric condition)
- [ ] Explicit in-scene motion described
- [ ] Camera intent embedded in the prose (not labeled)
- [ ] Specific lighting condition (labeled LIGHTING: is fine)
- [ ] Screenwriter framing, not narrator framing

And verify the focus prompt has:
- [ ] A directorial persona assigned
- [ ] Overall visual tone defined
- [ ] Single-motion rule enforced
- [ ] Text suppression command included
- [ ] Emotional register established
