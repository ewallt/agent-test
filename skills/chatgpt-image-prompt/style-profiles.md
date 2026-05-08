# Image Style Profiles

Each profile defines the field structure for that style type. When filling in the schema,
use the fields listed here. New profiles can be added following the same pattern.

---

## photography

```json
{
  "image_profile": {
    "profile_type": "photography",
    "source_style": "[type of photography — e.g. portrait, street, landscape, editorial]",
    "overall_aesthetic": "[mood and quality description]",
    "mood": "[short mood description]",
    "subject": {
      "main_subject": "[exact subject name]",
      "description": "[detailed physical description]",
      "clothing_details": "[if applicable]",
      "facial_features": "[detailed face/head description]",
      "pose_and_action": "[exact pose and angle]",
      "texture_details": "[ultra-specific texture notes]"
    },
    "environment": {
      "setting": "[location and setting]",
      "background_elements": "[detailed background]",
      "atmosphere": "[lighting and mood atmosphere]",
      "color_palette": "[exact color description]"
    },
    "lighting": {
      "primary_light": "[main light source and direction]",
      "secondary_light": "[any secondary lighting]",
      "shadows": "[shadow quality and placement]",
      "mood_lighting": "[overall lighting effect]"
    },
    "composition": {
      "framing": "[portrait/landscape, tight/close-up etc.]",
      "focal_point": "[what is sharpest]",
      "depth": "[depth of field description]",
      "perspective": "[camera angle]",
      "negative_space": "[how empty space is used]"
    },
    "camera_and_technical": {
      "camera": "[camera type]",
      "lens": "[lens and why]",
      "settings": "[ISO, shutter, aperture]",
      "film_stock": "[film or digital look]",
      "post_processing": "[editing style]"
    },
    "quality_level": "museum-grade photorealism, maximum texture fidelity, zero AI artifacts, National Geographic / magazine cover quality, 8K resolution"
  },
  "usage_instruction": "Paste this JSON into ChatGPT to generate a photorealistic image matching this style profile."
}
```

---

## illustration

```json
{
  "image_profile": {
    "profile_type": "illustration",
    "source_style": "[type of illustration — e.g. pen and ink, watercolor, editorial, graphic novel]",
    "overall_aesthetic": "[mood and visual character description]",
    "mood": "[short mood description]",
    "subject": {
      "main_subject": "[exact subject name]",
      "description": "[detailed visual description of subject]",
      "pose_and_action": "[exact pose and angle]",
      "detail_level": "[how much detail is applied to the subject]"
    },
    "medium": {
      "primary_tool": "[pencil / ink / brush pen / etc.]",
      "secondary_tool": "[any layered or combined medium]",
      "surface": "[paper type, texture, and weight]",
      "ink_or_pigment_quality": "[wet, dry, bleeds, sharp, etc.]"
    },
    "line_character": {
      "line_weight": "[uniform / varied / heavy / etc.]",
      "line_confidence": "[confident / scratchy / hesitant / etc.]",
      "contour_approach": "[outline-first / no outline / etc.]",
      "mark_making": "[hatching / stippling / loose scribble / etc.]"
    },
    "shading_and_volume": {
      "shading_method": "[hatching / wash / flat / etc.]",
      "light_direction": "[where light appears to come from]",
      "shadow_character": "[hard-edged / soft / implied / etc.]",
      "volume_approach": "[how three-dimensionality is achieved]"
    },
    "composition": {
      "framing": "[portrait/landscape, loose/tight]",
      "focal_point": "[what draws the eye first]",
      "negative_space": "[how blank space is used]",
      "page_relationship": "[bleeds to edges, centered, borders, etc.]"
    },
    "color_approach": {
      "color_mode": "[black and white / limited palette / full color]",
      "palette_description": "[specific color notes]",
      "color_application": "[flat fills / loose washes / glazing]"
    },
    "personal_style_markers": {
      "distinctive_habits": "[e.g., always leaves ink bleed at corners]",
      "quirks_and_idiosyncrasies": "[irregular line breaks, signature details]",
      "style_reference": "[closest known illustrator if applicable]"
    },
    "quality_level": "faithful reproduction of hand-crafted mark-making, medium-accurate texture, zero over-smoothing, preserves intentional imperfections and organic variation"
  },
  "usage_instruction": "Paste this JSON into ChatGPT to generate an illustration matching this style profile."
}
```

---

## Adding a new profile

To add a new style (e.g. `oil_painting`, `3d_render`, `concept_art`):
1. Add a new `## style-name` section here
2. Define the JSON structure with the fields appropriate to that medium
3. Use the same outer wrapper (`image_profile`, `quality_level`, `usage_instruction`)
4. The SKILL.md schema is generic — no changes needed there
