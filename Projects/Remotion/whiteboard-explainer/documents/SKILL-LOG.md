# Whiteboard Explainer — Skill Log

---

## 2026-03-11 — Narration, FlowChart Extensions, Parallel Lanes Layout

### New Capabilities

**types.ts — FlowNode:**
- `height?: number` — custom box height (default NODE_H=72). Used to make A/B nodes
  tall enough to span two horizontal road lanes.

**types.ts — FlowEdge:**
- `fromSide?: "top" | "center" | "bottom"` — controls y-offset where edge leaves the
  from-node (default center). Required for horizontal lanes from a tall node.
- `toSide?: "top" | "center" | "bottom"` — same for the to-node.
- `vertical?: boolean` — draws a vertical connector from bottom of from-node to top of
  to-node, centered on shared x. Label appears to the right of the midpoint.
- `color?: string` — overrides THEME.accent for stroke and arrowhead. Arrowhead markers
  are generated dynamically per unique color in `<defs>`.

**types.ts — FlowLabel:**
- `fontSize?: number` — overrides default 42. Useful for longer section labels that
  need to fit within a lane segment.

**FlowChartScene.tsx:**
- `heightMap` built alongside `posMap` — tracks per-node heights for edge y-offset math.
- Dynamic arrowhead markers: one `<marker>` per unique edge color, ID derived from color
  string with non-alphanumeric chars stripped.
- `progress > 0` gate on `markerEnd` — suppresses arrowhead until line starts drawing.
  Critical for overlay/highlight edges that have a late startFrame.
- Edge `<g>` keys changed from `${from}-${to}` to index `i` — required when duplicate
  from/to pairs exist (e.g. amber + blue overlay on the same segment).

**scripts/generate-braess-audio.mjs:**
- New ElevenLabs generation script for whiteboard-explainer narration.
- Per-scene audio: one MP3 per scene, keyed by scene.id.
- Files land in `public/audio/braess/{scene.id}.mp3`.
- Measures MP3 duration from frame headers; auto-updates `durationInFrames` in JSON
  if audio + 45-frame buffer exceeds current value.
- Flags: `--dry-run`, `--scene <id>`, `--list-voices`.
- Changing narration text requires rerunning the script (old MP3 is stale).

**WhiteboardVideo.tsx:**
- Added `<Audio src={staticFile(`audio/braess/${scene.id}.mp3`)} />` per scene when
  `scene.narration` is set.

### JSON Patterns

**Parallel lanes layout (slides 3 and 5):**
```json
"nodes": [
  { "id": "a",     "label": "A", "x": 120,  "y": 540, "height": 300 },
  { "id": "u_div", "label": "—", "x": 960,  "y": 390, "startFrame": 18 },
  { "id": "l_div", "label": "—", "x": 960,  "y": 690, "startFrame": 54 },
  { "id": "b",     "label": "B", "x": 1800, "y": 540, "height": 300, "startFrame": 36 }
],
"edges": [
  { "from": "a",     "to": "u_div", "fromSide": "top",    "toSide": "center", "startFrame": 9  },
  { "from": "u_div", "to": "b",     "fromSide": "center", "toSide": "top",    "startFrame": 27 },
  { "from": "a",     "to": "l_div", "fromSide": "bottom", "toSide": "center", "startFrame": 45 },
  { "from": "l_div", "to": "b",     "fromSide": "center", "toSide": "bottom", "startFrame": 63 }
]
```
- A and B nodes have `height: 300`, centered at y=540, spanning y=390–690.
- Lane midpoints (u_div, l_div) sit at y=390 and y=690 — same as the edge y-values,
  giving perfectly horizontal lines.
- `fromSide`/`toSide` connect at the exact top or bottom of the tall node.

**Vertical connector (slide 5):**
```json
{ "from": "u_div", "to": "l_div", "vertical": true, "label": "1 min", "startFrame": 80 }
```
Draws from bottom of u_div to top of l_div, same x. Label floats to the right.

**Blue hybrid route overlay (slide 5):**
```json
{ "from": "a",     "to": "u_div", "fromSide": "top",    "toSide": "center", "color": "#60a5fa", "startFrame": 233 },
{ "from": "u_div", "to": "l_div", "vertical": true,                         "color": "#60a5fa", "startFrame": 251 },
{ "from": "l_div", "to": "b",     "fromSide": "center", "toSide": "bottom", "color": "#60a5fa", "startFrame": 269 }
```
Overlay edges retracing the hybrid route in blue, 18 frames each, sequentially.
Each starts exactly when the previous finishes — creates a continuous traveling line.

**Section labels with custom fontSize (slides 3 and 5):**
```json
{ "x": 240,  "y": 310, "text": "25 min (depending on traffic)",   "startFrame": 15, "fontSize": 32 },
{ "x": 1075, "y": 310, "text": "45 min (independent of traffic)", "startFrame": 33, "fontSize": 32 }
```
- Left labels start at x≈240 (just past A's right edge at 220).
- Right labels start at x≈1075 (just past u_div's right edge at 1060).
- fontSize: 32 keeps text within its lane segment at those x positions.

### Bugs & Fixes

**Arrowhead flash on overlay edges:**
- *Problem:* SVG `markerEnd` renders the arrowhead at the line endpoint even when
  `strokeDashoffset = lineLength` (line fully hidden). Blue arrowheads appeared at
  u_div, l_div, and B from frame 0.
- *Fix:* Gate markerEnd on progress: `markerEnd={progress > 0 ? \`url(...)\` : undefined}`.
- *Gotcha:* The vertical and horizontal edge renders had different indentation, so
  `replace_all` only fixed one of them. Always verify both branches after a global replace.

**Duplicate edge key collision:**
- *Problem:* Adding blue overlay edges with the same `from`/`to` as existing amber edges
  caused React key collisions (`${from}-${to}` was not unique).
- *Fix:* Changed all edge `<g>` keys to use array index `i`.

### Design Decisions

- **Per-scene narration (not per-bullet):** One MP3 per scene. Simpler than per-bullet
  and fits the JSON-driven architecture where scenes are the atomic unit.
- **Narration text in JSON:** `narration?: string` on BaseScene. Keeps narration
  co-located with content. The generation script reads it directly.
- **Parallel lanes via tall nodes:** Rather than a new scene type, extended FlowChartScene
  with `height` and `fromSide`/`toSide`. Keeps the JSON-driven architecture intact.
- **Blue overlay, not color-switch:** Overlay edges preserve the original amber structure
  while adding the traveling blue highlight. Color-switching the original edges was
  considered but rejected — the overlay approach keeps JSON simpler and the traveling
  effect intact.

---
