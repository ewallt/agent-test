# NotebookLM Cinematic Video — Scene Writing Guidelines

## Context

NotebookLM's cinematic video feature uses a tri-model pipeline: Gemini 3 acts as creative director and scriptwriter, Nano Banana Pro handles image conception, and Veo 3 handles video and audio rendering. The source document is the primary input to Gemini, which then generates prompts for the downstream models. The focus/steering prompt is the human operator's primary control surface.

The source document used in this pipeline is written as a sequence of scenes. These guidelines govern how each scene should be written to maximize visual quality and avoid known failure modes.

---

## The Fundamental Rule

Every scene must answer three questions:
1. **What is the physical anchor?** (a subject, environment, or atmospheric condition)
2. **What is moving?** (camera, subject, environment, or atmosphere)
3. **What is the one dominant camera action?**

If a scene cannot answer all three, it will likely trigger pseudo-animation — where the engine generates a static image and pans across it instead of rendering true motion.

---

## The Pseudo-Animation Trap

The most common failure mode. Instead of generating fluid video, the system generates a high-quality still image and applies a digital pan or zoom over it. Nothing in the scene actually moves.

**Causes:**
- Abstract or conceptual content with no physical subject
- No sensory or environmental detail
- Missing motion verbs
- No camera action specified

**Prevention:** Ground every scene in something physical. Translate abstract ideas into physical action, environments, or characters before writing the scene.

---

## Object Hallucination

Because the pipeline passes data across three separate models, physical object recognition can fracture when a scene description is ambiguous. A documented community failure: a scene calling for a photographer caused the image generation layer to hallucinate an object resembling the stock of a rifle rather than a camera. The narrative context was understood; the physical rendering was not.

**Prevention:** Be specific about physical objects. Avoid descriptions where a word has both a benign and a potentially problematic referent. If a scene requires a specific object, name it precisely and describe its appearance rather than relying on category inference.

---

## Physical Anchors

Every scene needs at least one of the following:

**Subjects**
- A human character performing an action (walking, gesturing, reacting, speaking)
- An animal (be highly specific — not "a dog" but "a golden retriever puppy with floppy ears bounding through tall grass")
- A vehicle in motion
- A crowd

**Environments**
- Natural settings with inherent dynamics (ocean, forest in wind, rain on a street)
- Urban environments with activity (traffic, pedestrians, neon signs flickering)
- Interior spaces with atmospheric detail (candlelight, dust motes in sunbeams, steam)

**Atmospheric Conditions**
- Weather: rain, snow, fog, storm
- Lighting: golden hour, flickering interior light, chiaroscuro
- Particle effects: dust, smoke, embers, water spray
- Depth of field: foreground sharp, background soft (or vice versa)

---

## Camera Actions — What Works

Use exactly one per scene. Write it as a narrative description, not a code tag.

| Effect | Reliability | Example Phrasing |
|---|---|---|
| Push-in / Zoom in | Reliable | "slow push-in over six seconds" |
| Pull-back reveal | Reliable | "crane shot pulls up and away to reveal" |
| Tilt up / Tilt down | Reliable | "camera tilts up the full height of" |
| Tracking shot | Reliable | "smooth tracking shot following alongside" |
| Aerial / Crane | Reliable | "high drone shot establishing" |
| Handheld | Reliable | "handheld documentary style, slightly unstable" |
| Orbit / Arc | Partial | Use sparingly — can lose character consistency |
| Pan | Partial | "slow pan right" only — fast pans cause smearing |

**Write camera actions as narrative descriptions, not technical tags.**

Good: "The camera tracks smoothly alongside her as she walks down the corridor."
Bad: `<tracking_shot speed="slow" direction="right">`

---

## Camera Actions — What Does Not Work

Do not write scenes that depend on the following. They are NLE operations that Veo 3 cannot execute internally:

- Hard cuts between scenes
- Fade to black
- Match cuts
- Any formal editing transition

Do not combine multiple camera movements in a single scene. "Pan right while zooming in during a dolly" will cause the generation to break. One primary camera action per scene, always.

---

## In-Scene Motion — What Works

These can be described in the scene body and Veo 3 will render them reliably:

- Human facial expressions changing
- Natural human gesturing and walking
- Lip-synced dialogue (native to the pipeline)
- Fluid dynamics: water, rain, ocean, rivers
- Fire and smoke
- Billowing fabric, hair in wind
- Simple object manipulation: pouring, lifting, placing
- Weather: rain on surfaces, snow falling, fog rolling in
- Lighting shifts: sunrise, flickering candle, passing cloud shadow

**Complex object manipulation** (intricate mechanical interactions) works only partially — keep physical interactions simple.

---

## Text and Graphics in Scenes

Kinetic typography, data visualizations, and assembling diagrams do not work reliably. Veo 3 frequently renders gibberish text when asked to display words on screen.

Do not write scenes that depend on readable text appearing within the video frame.

---

## The Audio Cue Technique

Because Veo 3 generates audio natively and simultaneously with the visual track, explicitly describing sound in a scene improves visual physics and realism. The audio description grounds the physical space.

Include a brief audio note in scenes where physical realism matters.

Example: "Audio: rain against glass, distant thunder, the creak of a wooden floor."

This is not confirmed behavior specific to NotebookLM's pipeline but is a documented Veo 3 community finding and worth testing.

---

## Translating Abstract Content Into Physical Scenes

This is the core authoring discipline for educational or theological content. Abstract ideas must be converted into physical situations before the scene is written.

**Method:** For each concept or argument, ask: where would this idea live in the physical world? Who would be present? What would they be doing? What environment would surround them?

Examples:

| Abstract Concept | Physical Scene Anchor |
|---|---|
| The passage of time | Timelapse of light moving across a stone floor. Camera tilts up slowly. |
| Divine patience | An elderly figure sitting at a window, watching rain. Slow push-in on face. |
| Tension between two ideas | Two figures at opposite ends of a long table, neither speaking. Handheld, slightly unstable. |
| Rapid change | A city street. Tracking shot. Pedestrians blur past. |
| Revelation or insight | A dark room. A door opens. Light floods in. Pull-back reveal. |

---

## Scene Structure Template

Each scene in the source document should contain:

1. **Setting:** Physical location and time of day or atmospheric condition
2. **Subject:** Who or what is present and what they are doing
3. **Camera action:** One dominant camera movement (from the reliable list)
4. **Environmental motion:** What in the scene is inherently moving
5. **Audio note (optional):** Dominant sounds in the physical space

---

## Source Document Formatting

The structure of the uploaded document influences script pacing, not just content. Two approaches beyond the default scene format:

**Q&A / Fictional Interview format:** Reformatting dense expository text into a dialogue structure with strict word caps (e.g., answers capped at ≤70 words) forces Gemini to write a crisper, dialogue-driven script. This translates into tighter visual pacing. Useful when the source material is argumentative or abstract rather than narrative.

**Scene-by-scene storyboard in the source:** For longer videos where narrative drift is a risk, writing the source as an explicit numbered sequence — scene number, duration, sequence type (e.g., "The Hook," "The Problem," "The Resolution"), visual description, camera movement — gives the pipeline more structure to follow. This is more granular than the scene template above and trades flexibility for consistency.

Both approaches sacrifice some authorial control over visual specifics in exchange for pacing discipline. The standard scene format remains the default for theological and narrative content.

---

## Focus Prompt Role

The focus/steering prompt operates separately from the source document. It governs:

- Overall visual style and tone
- Cinematographic language that applies across all scenes (e.g., "every shot must justify its existence narratively")
- Persona assignment
- Any scene-by-scene storyboard instructions if used

**Persona assignment matters more than it appears.** NotebookLM's default behavior is to produce safe, academic summaries. Explicitly assigning an authorial persona — "act as a visionary documentary director," "you are an Executive Producer with a strong cinematic voice" — shifts the output from summarization toward narrative rendering. The system stops treating the source as content to report and starts treating it as material to interpret.

The source document drives content and narrative. The focus prompt drives aesthetic behavior and visual discipline. Both levers should be used deliberately.

---

## Known Limits of Control

These parameters are outside user influence regardless of source or prompt content:

- Exact timeline editing or micro-pacing
- Rapid-fire non-linear cuts
- Language other than English for the audio track
- Post-generation editing (regeneration from scratch is required for any change)
