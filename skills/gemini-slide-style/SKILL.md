---
name: gemini-slide-style
description: >
  Visual style manifest generation for Gemini/Imagen 4.0 slide presentations in the agent-test NotebookLM workflow.
  Use this skill whenever Tom asks about visual styles for slides, wants a slide manifest style chosen or suggested,
  is working on a NotebookLM "Claude as Source" run that includes a slideshow, or asks what style to use for a
  Gemini presentation. Also trigger when Tom provides a topic and asks what the slides should look like, or when
  a slide manifest is being written and no style has been locked in yet.
---

## How Visual Styles Work

Styles are driven entirely by prompt engineering — there is no static asset library. The Imagen 4.0 API generates
images dynamically, so the available aesthetic space is effectively unlimited.

A **Visual Manifest** is a dense, comma-separated token block that gets appended verbatim to the end of every
individual slide scene description in the generation loop. This locks the API into a consistent semantic space
across the entire sequence. The manifest is NOT embedded in the slide content — it travels alongside it as a
suffix to each scene prompt.

The model responds best to highly specific aesthetic tokens:
- Medium or technique (e.g., `19th-century lithograph`, `35mm film still`, `cyanotype blueprint`)
- Color palette (e.g., `corporate minimalist palette (navy, coral, gold)`, `rich earth tones`)
- Lighting conditions (e.g., `chiaroscuro lighting`, `soft studio lighting`, `high contrast`)
- Texture and surface (e.g., `faded parchment texture`, `glassmorphism elements`)
- Camera or rendering specifics (e.g., `anamorphic lens`, `shallow depth of field`, `isometric 3D render`)

Vague tokens (`beautiful`, `artistic`, `modern`) underperform. Specificity is what creates coherence.

## Technical Constraint

Images render inside a CSS grid with `object-fit: contain` on a dark background (`#020617`). This means:
- Styles that depend on precise edge framing or strict letterbox/portrait ratios may crop awkwardly
- Styles with strong central subjects and tolerance for negative space work best
- If using a style that implies a specific aspect ratio (e.g., panoramic film stills), add tokens like
  `centered composition, ample negative space` to give the layout room to breathe

## Example Manifest Styles

These are ready-to-use token blocks. Copy verbatim when outputting to Tom.

**Classical Cinematic Realism**
`classical cinematic realism, 35mm film still, anamorphic lens, chiaroscuro lighting, dramatic shadows, rich earth tones, high detail, atmospheric depth.`

**18th-Century Copper Engraving**
`18th-century copper engraving aesthetic, warm candlelight and parchment tones, dense crosshatching and etched linework, aged paper texture, scholarly antiquarian detail.`

**1960s Technical Illustration**
`1960s technical illustration, clean line art, mid-century scientific publication style, muted earth tones and slate blues, letterpress texture, vintage engineering diagram aesthetic.`

**Isometric Digital Twin**
`isometric 3D render, clean digital twin aesthetic, glassmorphism elements, soft studio lighting, subtle neon accents on dark background, shallow depth of field, futuristic tech.`

**Medieval Illuminated Manuscript**
`medieval illuminated manuscript style, heavy gold leaf accents, vibrant lapis lazuli and vermilion, intricate marginalia, gothic calligraphy elements, cracked vellum texture, flat perspective.`

**Modern Editorial Vector**
`flat editorial illustration, bold vector geometry, corporate minimalist palette (navy, coral, gold), ample negative space, clean bezier curves, modern UI aesthetic, no visible strokes.`

**Ukiyo-e Woodblock Print**
`traditional Japanese Ukiyo-e woodblock print, Edo period aesthetic, flat muted colors, indigo and vermilion, visible wood grain texture, elegant flowing linework, stylized natural elements.`

**Art Deco Travel Poster**
`1920s Art Deco travel poster, sleek geometric forms, high contrast luxury color palette (black, gold, emerald), striking typography elements, streamlined aerodynamic shapes, vintage lithograph texture.`

**Abstract Data Visualization**
`abstract generative data visualization, glowing particle nodes, dark mode background, cybernetic network topology, thin connecting lines, neon cyan and magenta accents, deep depth of field.`

**Vintage Architectural Blueprint**
`traditional cyanotype blueprint, architectural drafting style, precise white linework on rich indigo background, technical annotations, grid overlays, high contrast, industrial.`

**Romanticism Oil Painting**
`classical romanticism oil painting, dramatic epic fantasy aesthetic, sweeping landscapes, heavy brushstrokes, moody storm-lit skies, rich jewel tones, museum-quality varnish texture.`

**1970s Polaroid Vintage**
`1970s polaroid photography, faded vintage aesthetic, warm color shift, soft focus, noticeable film grain, light leaks, nostalgic everyday realism.`

**Synthwave Retro-Futurism**
`1980s synthwave retro-futurism, glowing neon grids, vibrant magenta and cyan color palette, chrome reflections, VHS tracking distortion, dark synth atmospheric lighting.`

## Proposing a Style

When Tom provides a topic without a style already chosen:
1. Suggest 2–3 options that suit the topic thematically — consider the subject matter's era, tone, and emotional register
2. For each option, provide the name and the exact token block string
3. Wait for Tom to confirm before treating a style as locked in

Do not narrate the suggestions — present them cleanly so Tom can scan and pick.

## Output Format

When outputting a manifest for use (i.e., Tom is ready to lock it in and use it), output **only** the token block
string — no label, no preamble, no explanation. Tom appends it directly to scene descriptions in the generation
loop, so any surrounding text would corrupt the prompt.

When *proposing* options (not yet locked in), you may label them by name so Tom can tell them apart.

## Generating a New Style

If none of the examples fit the topic, engineer a new token block following the same structure:
`[medium/technique], [color palette], [lighting], [texture/surface], [camera/rendering details], [era or mood keywords].`

Keep it to one sentence, comma-separated, ending with a period. Aim for 6–10 tokens. Test it mentally against
the `object-fit: contain` constraint before proposing it.
