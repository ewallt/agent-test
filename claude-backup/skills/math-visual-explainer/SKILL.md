---
name: "math-visual-explainer"
description: "Plan math explainer videos geometry-first, with ghost grids and fixed colors, then build them with the Remotion video skills. Use when turning a math idea into an animated lesson."
---

# Math Visual Explainer

This skill covers how to teach a math idea on screen. It does not replace the production skills. Use it to design the lesson, then build with Remotion: `remotion-narrated-slides` for the audio pipeline, `whiteboard-explainer` for scene manifests, and `video-orchestrator` for frame-driven drawing and charts. If those skills or tools are not available in this session, say so and deliver the scene plan.

## Status

The teaching and design rules come from a Gemini specification Tom saved, "AI-Assisted Mathematical Animation Pipeline Specification," in Google Drive. They have not yet been tested on a finished video. Add working examples and gotchas here after real builds.

## Teaching rules

1. **Geometry first.** Show what the object does before showing how to compute it. Notation names something the viewer has already seen.
2. **One idea per scene.** Each scene has one visual change that carries one idea. If it needs two, split it.
3. **Motion carries the meaning.** Every animation must show part of the argument. Remove motion that only decorates.
4. **Keep a reference.** Keep a fixed reference in view so change can be measured, such as a faint ghost grid behind a transformed grid.
5. **Notation arrives last.** Bring in symbols once the picture is established, connecting each symbol to the thing it names.
6. **Earn the rule.** Let a formula emerge from what was shown. For example, show that a matrix's columns are where the basis vectors land, and that multiplication is doing one transformation after another.
7. **Be honest about limits.** If a picture only suggests a result, say that it is intuition and not proof. If the idea has no faithful picture, say so rather than forcing a misleading one.

## Workflow

1. State the one idea the viewer should leave with.
2. Break the idea into atomic scenes. For each scene, record the narration beat, the visual change, what stays fixed as the reference, and any notation introduced.
3. Show Tom the scene plan before building if the video is long or the idea is hard. For a short test, proceed.
4. Write the narration.
5. Generate the audio and measure it. Audio sets the timing: never fit narration to visuals by hand.
6. Build the scenes with frame-driven animation, so every value derives from the current frame.
7. Check still frames at the busiest moments, confirming the math against an independent calculation.
8. Do the full render.

## Design rules

- **Canvas:** dark charcoal background, `#111111`, with high-contrast vector elements.
- **One color per object:** an object keeps its color through the whole video, including in equations.
- **Default linear algebra colors:** i-hat `#FF4136`, j-hat `#2ECC40`, target vector v `#0074DD`.
- **Type:** clean sans-serif for labels, with properly typeset math for every expression.
- **Grid:** the moving grid is bright and the ghost grid is gray at about 30% opacity. Lines stay straight, parallel and evenly spaced under a linear map.

## Example: a 2x2 matrix

1. Show the grid and ghost grid, with i-hat and j-hat.
2. Apply the transformation, moving the grid and vectors while the ghost grid stays still.
3. Point out where i-hat and j-hat landed.
4. Write those two vectors as the columns of the matrix.
5. Add a second matrix to show composition.

In Remotion, compute each point by interpolating from the identity matrix to the target matrix using the current frame, then multiply. This has not yet been built.

## When to consider Manim

Stay with Remotion by default. Raise Manim with Tom only if the video needs something Remotion handles badly, such as equations morphing symbol by symbol or heavy 3D.