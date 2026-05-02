# NotebookLM Notebook Request Specification

## Goal
This document defines the variables needed to request a NotebookLM notebook build. The output is one or more JSON request objects, which will be handed to a Claude agent for execution.

## Variables

### Required
- **Topic** — the subject of the notebook. Used as the notebook title and basis for the research query.

### Optional (with defaults)
- **Number of videos** — how many videos to generate. Default: 3.
- **Visual style** — the visual aesthetic of the videos. Default: `retro_print`. Options: `auto_select`, `classic`, `whiteboard`, `kawaii`, `anime`, `watercolor`, `retro_print`, `heritage`, `paper_craft`.
- **Video format** — `explainer` (default) or `brief`.

### Optional (no default — Claude decides if omitted)
- **Angle/framing** — the interpretive lens or specific argument to emphasize.
- **Depth vs. breadth** — whether the notebook should go deep on one angle or survey multiple.
- **Audience** — who the notebook is for and what they already know.
- **Purpose** — learning, sharing, reference, etc.
- **Research query** — if different from the topic.
- **Focus angles** — specific focus prompts per video. If omitted, Claude selects these based on sources found.
- **Guidance** — free-form notes, context, or instructions to help Claude make better decisions. Use this for anything that doesn't fit the structured fields: background on the topic, source preferences, things to avoid, special handling, etc.
- **App** — whether to build an inference app (Explorer + Quiz HTML file) in addition to videos. Default: `no`.
- **Slideshow** — whether to generate a structured slideshow manifest for Gemini Canvas. Default: `no`. If yes, `slides` sets the slide count (default: 5).
- **Remotion** — whether to generate a Remotion content report. Default: `no`. Skill not yet built — reserved flag.

---

## Output Format

### JSON Specification

Each request is a JSON object. Multiple requests are a JSON array.

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `topic` | string | yes | — | Used as notebook title and research query |
| `videos` | integer | no | 3 | Number of videos to generate |
| `style` | string | no | `retro_print` | See style options above |
| `format` | string | no | `explainer` | `explainer` or `brief` |
| `framing` | string | no | — | Interpretive angle or argument to emphasize |
| `depth` | string | no | — | `deep` or `survey` |
| `audience` | string | no | — | Who the notebook is for |
| `purpose` | string | no | — | Learning, sharing, reference, etc. |
| `query` | string | no | — | Override research query if different from topic |
| `focus_angles` | array of strings | no | — | One per video; if omitted Claude decides |
| `guidance` | string | no | — | Free-form notes, context, or instructions for Claude |
| `app` | string | no | `no` | `yes` builds an inference app (Explorer + Quiz HTML file) |
| `slideshow` | string | no | `no` | `yes` generates a structured manifest for Gemini Canvas |
| `slides` | integer | no | 5 | Slide count (only used if `slideshow: yes`) |
| `remotion` | string | no | `no` | `yes` generates a Remotion content report (skill not yet built) |

### Example — minimal request

```json
[
  {
    "topic": "The Cold War Origins"
  }
]
```

### Example — fully specified request

```json
[
  {
    "topic": "Why the Allies Won — Overy",
    "videos": 3,
    "style": "retro_print",
    "format": "explainer",
    "framing": "Overy's argument that Allied victory was not inevitable — focus on material, moral, and leadership factors",
    "depth": "deep",
    "audience": "General reader familiar with WWII history",
    "purpose": "learning",
    "query": "Richard Overy Why the Allies Won argument analysis",
    "focus_angles": [
      "Allied industrial and economic superiority over Germany",
      "Soviet contribution and Eastern Front as decisive theater",
      "Strategic bombing and air power in defeating Germany"
    ],
    "guidance": "Overy's central argument is that Allied victory was not structurally inevitable — prioritize sources that engage with this thesis directly rather than general WWII history."
  },
  {
    "topic": "The Rise of Agentic AI",
    "videos": 3,
    "style": "retro_print",
    "guidance": "Focus on practical deployment and real-world capability evaluations, not speculative or philosophical content."
  }
]
```
