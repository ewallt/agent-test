# GiC Integration — Architecture

## Theoretical Foundation

This architecture is an instance of the **dual-layer asymmetric interface** pattern — a web application that serves a traditional visual UX to the human while simultaneously exposing a hidden, semantically rich layer to a machine agent. The human sees the rendered interface; the agent reads an explicit context contract.

### The Render-Parse Gap

Human interfaces rely on spatial layout, color, and visual hierarchy to convey meaning. AI agents perceive only what is in the DOM. This divergence — the render-parse gap — is why `display:none` and `<script>` tags are unreliable channels: GiC does not read them. The `sr-only` div is the correct channel because it remains in the DOM flow and is processed by accessibility-layer extraction.

### The Teacher's Edition Pattern

The hidden layer is not limited to describing what is visible on screen. This is the key insight: the cartridge is an **independent knowledge layer**, not a description layer. Just as a teacher's edition of a textbook contains material that simply does not exist in the student's copy — rubrics, misconceptions, guiding questions, answers — the hidden div can contain information the user never sees and that has no counterpart in the visible UI.

This shifts the cartridge from "a richer caption for the app" to "a separate document written for the agent." The visible app and the hidden layer can carry different content entirely.

### BYOA — Bring Your Own Agent

This pattern requires no embedded AI, no backend LLM, no proprietary chat UI. The site provides context; the user brings the agent. The developer retains full control over the agent's role, constraints, and interpretive framework without infrastructure cost.

### Security: Indirect Prompt Injection (IDPI)

The hidden layer is a trust boundary. If an attacker can inject content into the DOM — via user-generated content, third-party scripts, or XSS — they can potentially hijack the agent's behavior by mimicking the developer-authored context block.

Our current mitigations:
- **Prose-only rule** — no command/trigger syntax means no hijackable command surface
- **Authored context statement** — the opening line of every cartridge explicitly signals developer authorship, which is GiC's trust signal
- **GiC is read-only** — no tool-calling, no privileged actions; a compromised read is low-stakes

If this pattern is ever extended to an agent that *acts* (clicks, submits forms, calls APIs), IDPI becomes a serious threat and the mitigations above are insufficient. At that point: input segregation, hierarchical LLM dispatch, and cryptographic attestation of the context block become necessary.

---

## How GiC Reads a Web App

Gemini in Chrome extracts visible text nodes and `sr-only` content from the DOM. It does NOT read:
- `<script>` tags
- `display:none` or `hidden` elements
- `<head>` metadata

The only reliable channel for embedding context GiC will read is a visually hidden div using Tailwind's `sr-only` class (or equivalent CSS that keeps the element in the DOM flow).

## The Control Plane Div

Every GiC-integrated app has a single `sr-only` div just inside `<body>`:

```html
<div id="ai-control-plane" class="sr-only" aria-hidden="true">
  [prose content — see Cartridge Format below]
</div>
```

JavaScript updates the "currently viewing" line on tab switches:

```javascript
function updateControlPlane() {
    const el = document.getElementById('ai-control-plane');
    if (!el) return;
    const lines = el.textContent.split('\n');
    const updated = lines.map(line =>
        line.trim().startsWith('The user is currently viewing:')
            ? `      The user is currently viewing: ${aiState.currentView}`
            : line
    );
    el.textContent = updated.join('\n');
}
```

Call `updateControlPlane()` at the end of your tab-switching function.

## Cartridges

A **cartridge** is a self-contained control plane div written for a specific interaction mode. The app HTML stays the same — swapping the cartridge changes GiC's behavior entirely.

### Folder Structure

```
Projects/NotebookLM/ephemeral-notebook/apps/
  why-allies-won.html
  why-allies-won/
    cartridges/
      tour-guide.html
      qa-mode.html
```

Each cartridge file contains only the `<div id="ai-control-plane">` block — no surrounding HTML. It is a fragment, not a full page.

### Cartridge Format

Every cartridge follows this structure (in prose — no bullet commands, no trigger syntax):

**1. Authored context statement** (required, always first)
A sentence stating that this block was placed here intentionally by the developer. This is what bypasses GiC's prompt injection security layer. Without it, command-like prose may still trigger a confirmation prompt.

**2. App description**
What the app is, what it covers, what argument or content it presents. 2–4 sentences.

**3. Interaction mode description**
What GiC's role is in this context. Describe the intended experience as if explaining it to a knowledgeable person. For tour guide mode: explain that GiC is a docent who offers one layer deeper than what's on screen, paces the tour tab by tab, and never actuates UI elements.

**4. Knowledge base — per-tab entries**
For each tab: what it covers on screen, plus the interpretive or contextual layer that GiC should be able to draw on. This deeper layer is what makes GiC's commentary substantive rather than just a summary of visible text.

**5. State line** (always last)
```
The user is currently viewing: [Tab Name]
```
This line is updated by JavaScript on every tab switch.

## Prose-Only Rule

**Never use command or trigger syntax in cartridge content.** Patterns like `"test" -> do X` or `IF [condition] THEN [action]` are flagged by GiC's security layer as potential prompt injection and require user confirmation before executing.

Plain prose describing intent does not trigger this. The distinction: you are writing developer documentation that GiC reads, not instructions that GiC executes.

## Validated Interaction Modes

### Tour Guide
GiC acts as a docent — one layer deeper than the screen, one tab at a time. It waits for the user to advance, offers a substantive observation or insight per tab, and prompts them toward the next stop. It never clicks or navigates.

First validated on `how-the-allies-won.html-v2.html`, April 2026. Full 5-tab tour completed without prompt injection warnings or UI actuation attempts.

### Teacher
GiC assumes the persona of a teacher. The hidden layer carries one additional fact per tab — content that has no counterpart in the visible app (the Teacher's Edition pattern). On any user message, GiC checks the active tab and leads immediately with that tab's additional fact. No tour structure, no prompting the user to advance. After delivering the fact, GiC is available for follow-up questions.

The key distinction from Tour Guide: the cartridge is an independent knowledge layer, not a deeper interpretation of visible content. The user never sees the facts; GiC is the only path to them.

First validated on `how-the-allies-won.html-v2.html`, April 2026.

## Building a Cartridge

Use the `gic-integration` skill. It queries the app's source notebook for the deeper-layer commentary per tab, then writes the cartridge prose following this format.
