# Whiteboard Explainer — Content Contract

**Version:** 1.0 | **Last updated:** 2026-03-10

---

## What You Are Doing

You are authoring content for a whiteboard-style explainer video rendered by a Remotion system. Your job is to produce a **content manifest** — a structured JSON object that describes what each scene should say and show.

You do **not** need to specify timing, transitions, animation details, doodle placement, or coordinates. Claude Code handles all of that from your content.

The video will be rendered in the **Dark Chalk / Amber Accent** theme: dark navy background, chalk-white text, amber/red/green accent colors. Write content that suits a high-contrast, dramatic visual style. Concise, punchy language works best.

---

## Output Format

Produce a single JSON object with two top-level fields:

```json
{
  "topic": "A short description of what this video covers",
  "scenes": [ ...scene objects... ]
}
```

Each scene object requires a `"type"` field and the content fields for that type (described below). Do not include `id`, `durationInFrames`, `transition`, or `doodles` — Claude Code adds those.

**Scene count:** 8–12 scenes is the sweet spot. Always begin with a `title` scene and end with an `outro` scene. Vary scene types — avoid using the same type back-to-back more than twice.

---

## Scene Types

### 1. `title`
The opening card. Centered heading with optional subtitle.

**When to use:** First scene only.

**Content fields:**
```json
{
  "type": "title",
  "title": "The History of Writing",
  "subtitle": "From cave walls to keyboard"
}
```
`subtitle` is optional.

---

### 2. `stepReveal`
A staggered bullet list — items appear one by one. The workhorse of the format.

**When to use:** Chronological sequences, lists of facts, unfolding arguments. 3–6 items work best.

**Content fields:**
```json
{
  "type": "stepReveal",
  "title": "Writing did not appear overnight",
  "body": [
    "35,000 BCE — cave paintings mark the first symbolic thought",
    "3400 BCE — Sumerian cuneiform emerges in Mesopotamia",
    "1050 BCE — the Phoenician alphabet reduces symbols to 22 characters",
    "800 BCE — Greeks add vowels, creating the template for Western scripts"
  ]
}
```
`title` is optional. `body` is required (array of strings).

---

### 3. `compare`
Two-column side-by-side comparison with a divider.

**When to use:** Contrasting two approaches, systems, eras, or perspectives.

**Content fields:**
```json
{
  "type": "compare",
  "title": "Logographic vs. Alphabetic Systems",
  "left": {
    "heading": "Logographic",
    "items": [
      "One symbol = one word or idea",
      "Thousands of characters to learn",
      "Rich visual meaning"
    ]
  },
  "right": {
    "heading": "Alphabetic",
    "items": [
      "One symbol = one sound",
      "20–30 characters master the system",
      "Highly compressible and portable"
    ]
  }
}
```
`title` is optional. Both columns required. Keep items parallel in length and structure.

---

### 4. `quote`
A single large pull-quote, centered on screen.

**When to use:** A memorable or famous statement that deserves its own moment. Maximum impact — don't overuse.

**Content fields:**
```json
{
  "type": "quote",
  "quote": "The medium is the message.",
  "attribution": "Marshall McLuhan, 1964"
}
```
Both fields required. Keep the quote short enough to read in 3–4 seconds (under ~15 words is ideal).

---

### 5. `stat`
A single large number or short fact — designed for emphasis.

**When to use:** A striking statistic, proportion, or scale fact that warrants its own scene. One idea only.

**Content fields:**
```json
{
  "type": "stat",
  "value": "98%",
  "label": "drop in book prices within 50 years of Gutenberg's press",
  "context": "1440 → 1490"
}
```
`value` and `label` are required. `context` is optional (small supplementary line).

---

### 6. `splitContent`
Text column on the left, abstract diagram on the right.

**When to use:** When you want to explain a concept with bullet points while illustrating it visually at the same time.

**Content fields:**
```json
{
  "type": "splitContent",
  "title": "How a DNS Lookup Works",
  "body": [
    "Browser sends a query to the DNS resolver",
    "Resolver checks its cache — if found, returns immediately",
    "Otherwise queries the authoritative nameserver",
    "IP address returned to the browser"
  ],
  "diagram": "Show a request travelling from browser to DNS server to IP address — left to right flow with arrows"
}
```
`title` is optional. `body` is required (3–5 items). `diagram` is a plain English description of what the right-side illustration should convey — Claude Code translates this into doodle placement.

---

### 7. `timeline`
A horizontal sequence of dated events, building left to right.

**When to use:** Historical chronologies, product evolution, multi-era progressions. Works best with 4–6 events.

**Content fields:**
```json
{
  "type": "timeline",
  "title": "The Road to the Internet",
  "events": [
    { "year": "1969", "label": "ARPANET" },
    { "year": "1983", "label": "TCP/IP adopted" },
    { "year": "1991", "label": "World Wide Web" },
    { "year": "2007", "label": "iPhone" }
  ]
}
```
`title` is optional. `events` is required. Labels should be short (1–4 words). Years can be ranges or approximate (e.g., "~3000 BCE", "1440s").

---

### 8. `imageReveal`
A framed image that fades in, with an optional caption.

**When to use:** When a specific visual (photograph, diagram, artwork) would anchor the content. Falls back gracefully to a labeled placeholder if no image is available.

**Content fields:**
```json
{
  "type": "imageReveal",
  "title": "The Gutenberg Bible, 1455",
  "imageDescription": "A page from the Gutenberg Bible — dense two-column Latin text, illuminated initial capital letters, hand-colored decorations in red and blue",
  "caption": "First mass-produced book in Europe"
}
```
`title` and `imageDescription` are required. `caption` is optional. The `imageDescription` field is used by Claude Code to source, generate, or label a placeholder — you do not specify a file path.

---

### 9. `flowChart`
Nodes connected by labeled arrows, building one element at a time.

**When to use:** Step-by-step processes, system architectures, decision flows, cause-and-effect chains. Better than `diagramBuild` for anything that needs labeled elements.

**Content fields:**
```json
{
  "type": "flowChart",
  "title": "How a DNS Lookup Works",
  "nodes": [
    { "id": "browser", "label": "Browser" },
    { "id": "dns",     "label": "DNS Resolver" },
    { "id": "ns",      "label": "Nameserver" },
    { "id": "ip",      "label": "IP Address" }
  ],
  "edges": [
    { "from": "browser", "to": "dns", "label": "query" },
    { "from": "dns",     "to": "ns",  "label": "asks" },
    { "from": "ns",      "to": "ip",  "label": "resolves" },
    { "from": "ip",      "to": "browser", "label": "returns" }
  ]
}
```
`title` is optional. `nodes` and `edges` are required. Node `id` values are internal references only — use short, lowercase, no spaces. Edge `label` is optional. Do not specify x/y positions — Claude Code assigns layout.

**Topology guidance:** For linear left-to-right flows, list nodes in order. For branching flows, describe the structure in a `"layout"` hint (optional):
```json
"layout": "linear-horizontal"
```
Options: `"linear-horizontal"` (default), `"linear-vertical"`, `"branching"`.

---

### 10. `diagramBuild`
An abstract canvas where SVG doodle shapes (arrows, circles, stars, brackets, checks) are composed to suggest a concept visually.

**When to use:** Abstract conceptual illustrations where visual metaphor is more useful than labeled elements — e.g., "ideas flowing," "a cycle," "three equal parts," "something being validated." If you need labeled nodes, use `flowChart` instead.

**Content fields:**
```json
{
  "type": "diagramBuild",
  "title": "Pictograph → Symbol → Letter",
  "concept": "Three stages of abstraction shown left to right, connected by arrows. Each stage is a circle. The final stage gets a check mark."
}
```
`title` is optional. `concept` is required — a plain English description of what the illustration should convey. Claude Code chooses which doodle assets to use and where to place them.

**Available doodle shapes:** arrow, circle, star, check, bracket. No text on elements.

---

### 11. `outro`
The closing card — darker background, glowing ring, final thought.

**When to use:** Last scene only.

**Content fields:**
```json
{
  "type": "outro",
  "title": "5,400 years of putting thought into marks.",
  "body": [
    "Every letter you type sits on 150 centuries of invention."
  ]
}
```
`title` is required. `body` is optional (1–3 short lines). Write the title as a punchy, resonant closing statement — the last thing the viewer reads.

---

## Scene Sequence Guidelines

- **First scene:** always `title`
- **Last scene:** always `outro`
- **Middle scenes:** 6–10 scenes; vary types freely
- **Avoid:** the same type twice in a row (except `stepReveal`, which can appear 2–3 times if pacing warrants)
- **Pacing:** think of the sequence like a talk — open strong, build through evidence and contrast, land on a memorable close
- **Content length:** err short. Bullet items should be one line. Quotes under 15 words. Stat labels under 10 words. The camera lingers — you don't need to cram everything in.

---

## What Claude Code Handles (do not specify)

- `id` — auto-generated
- `durationInFrames` — set per scene type based on content length
- `transition` — chosen based on scene sequence and pacing
- `doodles` — placed as decoration based on content and theme
- Doodle colors — chosen from the Dark Chalk palette (amber, red, green, chalk-white)
- Pixel coordinates for all layout (flowChart nodes, timeline positions, doodle placements)
- Image sourcing or placeholder creation for `imageReveal`

---

## Minimal Valid Example

A 5-scene video on a simple topic:

```json
{
  "topic": "Why the Printing Press Changed Everything",
  "scenes": [
    {
      "type": "title",
      "title": "The Press That Changed the World",
      "subtitle": "Gutenberg's invention and what it unleashed"
    },
    {
      "type": "stat",
      "value": "180",
      "label": "copies of the Bible Gutenberg printed in 1455",
      "context": "vs. months of work per hand-copied manuscript"
    },
    {
      "type": "compare",
      "title": "Before and After the Press",
      "left": {
        "heading": "Before (1400s)",
        "items": [
          "Books took months to copy by hand",
          "Owned only by clergy and nobility",
          "Errors multiplied with each copy"
        ]
      },
      "right": {
        "heading": "After (1500s)",
        "items": [
          "Thousands of copies printed in weeks",
          "Literacy spread across social classes",
          "Identical text across every copy"
        ]
      }
    },
    {
      "type": "stepReveal",
      "title": "What it actually changed",
      "body": [
        "The Reformation — Luther's 95 Theses spread in weeks, not years",
        "The Scientific Revolution — researchers could read each other's work",
        "National languages — standardised spelling and grammar emerged",
        "Mass literacy — for the first time, most people could learn to read"
      ]
    },
    {
      "type": "outro",
      "title": "One machine. Five centuries of consequence.",
      "body": [
        "The internet is just the press, running faster."
      ]
    }
  ]
}
```
