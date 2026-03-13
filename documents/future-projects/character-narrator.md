# Character Narrator Videos

**Status:** Concept — not started
**Inspired by:** "How to Penguin", "Your Life as an Emperor Penguin" (YouTube)
**Format:** Short animated educational video, second-person narrative, character-driven

---

## What This Is

A video format where a persistent illustrated character lives through a story, narrated in second person. The viewer is the character — "You hatch from an egg on your father's feet. It is minus 60 degrees." The character moves through environments, experiences events, and the narration gives the viewer the felt experience of being that animal (or person, or thing).

Distinct from the whiteboard explainer, which explains concepts using text and diagrams. This format *tells a story* through a character. The character is the medium.

---

## Reference Videos

- "How to Penguin" — YouTube
- "Your Life as an Emperor Penguin" — YouTube
- Kurzgesagt (adjacent — more kinetic and icon-heavy, less character-focused)

The charm of the genre: warm second-person voice, simple but expressive character, a life arc with genuine stakes, light humour, educational facts woven into the narrative naturally.

---

## Technical Approach

### Rendering
Remotion — same stack as the other video projects. JSON-driven content, ElevenLabs narration.

### Drawing Style
**Option A — Rough.js:** Apply hand-sketched rendering to SVG shapes. Rough.js is already on the whiteboard explainer V2 roadmap. Would give characters and environments a genuine hand-drawn, organic quality — closest to the reference videos.

**Option B — Clean flat vector:** Geometric SVG, no texture. Simpler to build, different aesthetic. Think Google material / minimal illustration style.

Recommendation: Rough.js (Option A). The hand-drawn quality is core to the genre's warmth.

### Character System
The central engineering challenge. A character needs:
- **Poses** — standing, walking, swimming, sleeping, eating, etc.
- **Expressions** — neutral, happy, distressed, curious, etc.
- **States** — combinations of pose + expression
- Each state is an SVG composition rendered as a React component
- The scene JSON references a character state by name: `"character": "walking-curious"`

### Environments
Illustrated scene backgrounds — SVG compositions representing locations:
- Ice floe, open ocean, rookery, storm, etc. (for a penguin)
- Each environment is a layered SVG: background → midground → character layer → foreground

### Scene Types (proposed)
- **establishing** — introduce the environment, set the scene
- **action** — character does something (walks, swims, eats)
- **moment** — a still beat with narration, emotional emphasis
- **transition** — move between locations or time periods
- **title** — series/episode title card

### Narration
ElevenLabs, same per-bullet audio architecture as simple-narrated-slides. Warm, intimate voice. Second-person present tense throughout.

---

## Content Structure

Each video = one life arc or experience. Examples:

**Animals:**
- Emperor Penguin — hatching, surviving winter, finding the sea, returning to breed
- Arctic Fox — seasonal colour change, hunting under snow, raising kits
- Monarch Butterfly — hatching, migration across a continent, overwintering in Mexico

**Historical / Human:**
- A day in Pompeii, 79 AD
- Your life as a Roman legionary
- Your life as a medieval monk

**Conceptual (stretch):**
- Your life as a photon leaving the sun
- Your life as a blood cell

---

## Open Questions

1. **Character library** — build a generic character component system first, or design character-specific from the start? Generic is reusable but harder; specific is faster but not transferable.

2. **Rough.js integration** — needs to be proven out in the whiteboard explainer V2 first before committing to it here.

3. **Scope of first episode** — a full life arc (5–8 minutes) or a short proof-of-concept (90 seconds, one scene type)?

4. **Folder location** — when ready to build, this would live at `Projects/Remotion/character-narrator/` alongside the other Remotion projects.

---

## Suggested First Build

**Emperor Penguin, 90-second POC.** Three scenes:

1. *Establishing* — You are an egg on your father's feet. The Antarctic winter. Minus 60.
2. *Action* — You hatch. Your father has not eaten in two months.
3. *Moment* — Spring arrives. Your mother returns from the sea.

Goal: prove the character component, one environment, one scene type. Rough.js applied. ElevenLabs narration. If it looks good, expand to a full episode.

---

## Dependencies / Prerequisites

- Rough.js integration proven in whiteboard explainer V2 (recommended before starting)
- SVG character design — either hand-authored or generated with tool assistance
- Decision on character system architecture (generic vs. specific)
