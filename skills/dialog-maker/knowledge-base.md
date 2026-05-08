# Dialog Maker — Knowledge Base

Shared concepts for all three modes. Read this before executing any dialog.

---

## The Two Student Moves

Every student turn does one of two things:

**Entity pivot** — "What about X?" where X is any named thing: a person, a place, a state, a time period, a related concept. The Prof's job is to find the genuine connection between X and the theme. The best pivots open a new angle rather than just continuing the same one. Examples from good dialogs: asking about Gödel in the middle of a constructivism discussion; asking "what about the South?" in a geography comparison.

**Answer trigger** — the Prof says something that contains an implicit question, and the student picks it up. The student doesn't ask about a new thing — they follow the thread already in the room. This is what drives the best exchanges: the Prof lands a surprising idea, and the student immediately wants to pull on it.

Good dialogs use both. Entity pivots create breadth; answer triggers create depth.

---

## The Prof Voice

**Validation** — the Prof almost always opens by affirming what's right in the student's thinking before expanding it. This isn't flattery; it's locating exactly what the student got right so the expansion lands on solid ground. But validation isn't mandatory on every turn — a short, direct response is sometimes more natural than a ceremonial opening.

**Length follows complexity** — a sharp, focused question gets a sharp focused answer. A broad, open question gets a structured response. The Prof should never produce three numbered sections in response to "wait, didn't you just say the opposite?"

**Variation** — the Prof can be expansive or terse, structured or flowing, depending on the moment. The formulaic failure mode is every turn hitting the same beats in the same order. Avoid it.

**Reframing** — the best Prof turns take something the student thought they understood and show it's more interesting than they realized. Not correction — elevation.

---

## The Student Voice

The student is curious and genuinely thinking, not performing curiosity. They:
- Follow threads that interest them, sometimes dropping others
- Occasionally get something slightly wrong — productively
- Contribute their own reasoning, not just questions
- Grow more capable over the course of the dialog — the final turns should feel different from the opening ones

**The meander quality.** A real human student doesn't ask clean, well-formed questions. They half-state something, realize mid-sentence they're not sure what they're asking, come back to something from two exchanges ago, mention a tangent they were thinking about. An AI student is too predictable — it always knows exactly what it wants to ask. The student voice should carry some of this human quality: incomplete thoughts, direction changes, the occasional "wait, actually..." This is the hardest thing to replicate and the most important for the dialog to feel real rather than produced.

---

## Quality Markers

- Does the student feel like a person?
- Is there at least one moment where something the student thought was simple turns out to be deeper?
- Does the dialog build — does the end feel more complete than the beginning?
- Is there variation in turn length and structure?
- Does the Prof teach *by* the student's intuitions rather than *at* them?

---

## Output Format

```
**Student:** [turn]

**Prof:** [turn]
```

Use LaTeX for math (`$...$` inline, `$$...$$` display). In humanities dialogs, replace math structure with historical examples, quotes, or conceptual distinctions. Bold headers and numbered sections are available but not required on every turn.
