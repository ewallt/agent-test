---
name: video-orchestrator
description: Modular scene management and audio-visual synchronization. Use when building multi-scene educational videos or narrated slides. Includes D3.js data visualization and advanced asset handling.
---

# Advanced Educational Video Orchestrator

## Architectural Pattern: Modular Scene Chaining
- **Director-Scene Model:** Use `Root.tsx` to sequence individual `.tsx` files for each slide.
- **Source of Truth:** Use a `Content.json` file to store text, logic flags, and asset paths.
- **State Hydration:** Pass data from `Content.json` into scene components via React props to ensure the "Logic-to-Visual" link is preserved.

## Workflow
1. **Audio Sync:** Use `calculateMetadata` to read the duration of the narration `.mp3` files.
2. **Auto-Sequencing:** Dynamically set `durationInFrames` for each `<Sequence>` based on audio length.
3. **Logic Visualization:** Convert Mermaid.js diagrams into animated SVG sequences using frame-based reveals (e.g., animating `stroke-dashoffset`).

## Data Visualization (D3.js & Charts)
- **Frame-Accuracy Rule:** Disable default time-based animations in charting libraries.
- **D3.js Mapping:** Use `useCurrentFrame()` to drive D3 scales and transitions. Map the frame to the `d` attribute of SVG paths for "draw-in" effects.
- **Interpolated Transitions:** When data changes between scenes, use `interpolate()` to smoothly transition bar heights or line coordinates over a 15-frame window.

## Asset & Performance Optimization
- **Static Asset Guard:** Use `staticFile()` for all local images/audio to prevent path resolution errors during headless rendering.
- **Pre-rendering Math:** For complex mathematical proofs (LaTeX), pre-render the SVG and animate the group (`<g>`) elements rather than re-calculating the layout on every frame.
- **Token Efficiency:** When asked to "Update the video," prioritize editing the `Content.json` file rather than re-writing the React component logic unless a structural change is required.

## Standard Prompt Triggers
- "Orchestrate a 5-scene deck from this Knowledge Base."
- "Create a D3.js line chart that animates its growth over 4 seconds."
- "Sync the 'Model Collapse' animation to the length of 'audio/narration_v1.mp3'."
- "Convert this Mermaid diagram into a 10-second animated sequence."
