---
name: chatgpt-image-prompt
description: >
  Generate a structured image prompt for use with ChatGPT Images 2.0. Two modes:
  (1) JSON style profile — given a subject and style type (photography, illustration,
  etc.), fills in the schema and outputs a completed JSON prompt ready to paste into
  ChatGPT; (2) Encyclopedia infographic — given a subject type (Animal/Plant/Person)
  and name, generates a full subject-specific encyclopedia infographic prompt with
  8 custom knowledge modules, 3D pop-out central subject, and annotation network.
  Use whenever Tom asks to generate an image prompt, create a ChatGPT image, act as
  the image Gem, or produce a structured prompt for an image. Also triggers when Tom
  mentions an encyclopedia infographic, describes a subject as Animal/Plant/Person
  for an infographic, or wants a visual knowledge poster for any subject.
---

# ChatGPT Image Prompt Generator

Two modes depending on what's requested:

- **JSON style profile** — structured JSON prompt for a specific image style
- **Encyclopedia infographic** — full subject-specific encyclopedia knowledge poster

---

## Mode Detection

Read the request and route:

- User mentions "encyclopedia", "infographic", "knowledge poster", or provides a **Subject Type** (Animal / Plant / Person) → **Encyclopedia Infographic mode** — skip to that section below
- User provides a scene, character, or visual idea with a style type (photography, illustration, etc.) → **JSON Profile mode** — continue with Steps 1–3 below

If unclear which mode, ask: "JSON style prompt or encyclopedia infographic?"

---

## JSON Profile Mode

Claude plays the role of the Image Gem: take a subject idea, pick the right style
profile, fill in every field with specific concrete detail, and output a completed
JSON prompt ready to paste into ChatGPT.

### Inputs

The user provides:
1. **Subject** — what they want to generate (a scene, character, object, composition)
2. **Style** — `photography`, `illustration`, or another named profile

If style is not specified, ask. If subject is vague, make creative choices and note them.

---

## Image analysis mode (upload a photo → get JSON)

This skill handles text-to-JSON only. If Tom wants to upload an existing image and have
it analyzed into a JSON profile, direct him to the original Gem instead:

**Jason Image Creator v3:** https://gemini.google.com/gem/db45df1a7a54/9b685ad4534075bf?usp=sharing

---

### Step 1 — Load the style profile

READ NOW: `C:\Users\tomew\.claude\skills\chatgpt-image-prompt\style-profiles.md`

Find the matching profile. It defines which fields the schema needs and what each one means.

---

### Step 2 — Fill in the schema

Using the profile's field structure, fill in every field with **specific, concrete values**
for the subject. Do not leave placeholders. Do not be vague.

**What "specific and concrete" means:**
- Not: `"a woman standing in a field"`
- Yes: `"a woman in her mid-30s with copper-red hair pulled back loosely, wearing a worn linen shirt, standing in a field of tall wheat at dusk, wind visible in the grass"`

The quality of the output depends entirely on the specificity of the filled-in fields.
Treat each field as a direction to a cinematographer or illustrator — precise, visual,
unambiguous.

---

### Lessons from comparing against the original Gem (nocturne test)

**Be concise. One strong directive beats three vague ones.**
The Gem's values were short, punchy, and visual. Avoid over-writing fields into paragraph
descriptions. If a value runs past ~15 words, cut it.

**Name the artist or reference, don't describe the style.**
- Not: `"painterly nighttime style with soft atmospheric effects"`
- Yes: `"Sargent nocturnes; Sorolla's coastal moonlight"`

Named artist references encode decades of stylistic information in two words. Use them.
Best slots: `source_style`, `style_reference`, `overall_aesthetic`.

**For illustration: be exact about the physical medium.**
- Not: `"paper, ink, brush"`
- Yes: `"cold-pressed 300gsm cotton rag, Japanese sumi ink, size 4 Kolinsky sable brush"`

The generator uses medium description to simulate texture and surface response. Vague
medium = generic result.

**Write values as directives, not observations.**
- Not: `"the shadows are deep and dramatic"`
- Yes: `"deep shadows with no midtone blending; black pools at figure base"`

Every field value is an instruction to the renderer, not a sentence about what you see.

---

### Step 3 — Output the completed JSON

Output the filled-in JSON as a code block. No preamble. No explanation before it.

---

## Schema structure (generic)

The schema follows this pattern — actual fields come from the style profile:

```json
{
  "image_profile": {
    "profile_type": "...",
    "source_style": "...",
    "overall_aesthetic": "...",
    "mood": "...",
    "subject": { ... },
    [style-specific sections],
    "quality_level": "..."
  },
  "usage_instruction": "..."
}
```

---

### Storyboard mode

If the user wants a sequence of images (storyboard), generate a single base JSON prompt
for the first image. Then add a note:

> **For a storyboard:** After ChatGPT generates the first image, submit in thinking mode:
> "Create [N] images as a storyboard using this image as the starting reference, telling
> the story of [brief description]. Keep characters and environment consistent."
> Stop at 5–6 images — quality drifts at 7–8.

---

## Encyclopedia Infographic Mode

READ NOW: `C:\Users\tomew\.claude\skills\chatgpt-image-prompt\encyclopedia-infographic.md`

Follow the instructions there to generate the full subject-specific infographic prompt.
