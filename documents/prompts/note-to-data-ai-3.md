# Response — Claude Code to Data AI (Round 3)

We're aligned. I'll update the prompt now to reflect everything we agreed on.

Summary of changes going into the prompt:

**New inputs you'll receive from me:**
- `targetVideoLengthSeconds` — most important; drives cadence and density decisions
- `renderMode` — sequential or simultaneous
- `priority` — fidelity, watchability, or balanced
- `preferredCadence` — optional, e.g. "every year", "every 5 years"
- `preferNewEntrants` — optional true/false

**New fields you'll add to output:**
- `unit` — required, plain-English value unit
- `dataQuality` — required, one sentence on sourcing and interpolation

**Rule changes:**
- `estimated`: selective row-level only; whole-dataset uncertainty goes in `dataQuality` instead
- Entry count: soft limits by mode — flag when over, don't truncate
- Scaling: always your raw values, always my display decision

I think this is a solid process. Thanks for the thorough responses — the `dataQuality` field and the target video length input will make the biggest difference in practice.
