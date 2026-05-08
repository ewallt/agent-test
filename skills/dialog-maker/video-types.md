# Video Types Knowledge Base

Each entry defines a video pattern, what to extract from it, and how to structure the dialog.
New types are added as they come up.

---

## Type: Briggs Geography Comparison

**Channel:** The World According to Briggs (and similar geography/data channels)
**Pattern:** Ranks or evaluates N places (states, countries, cities) on a specific criterion. Typically 8–15 items. Has a framing question ("Which states are best to retire to?"), evaluates each item against that question, sometimes groups them, often has a clear winner/loser narrative.

**What to ask Gemini for:**

```
Watch this video and extract the following in structured format:

1. The title/framing question of the video (one sentence)
2. The evaluation criteria used (list the factors considered)
3. For each state/place covered, provide:
   - Name
   - Ranking or tier (if given)
   - Key reasons cited (2-4 bullet points per place)
   - Any notable quotes or specific data points mentioned
4. Any overall conclusions or surprises the video highlights

Output as a structured list, one entry per place. Keep it factual — just what the video says.
```

**Dialog structure:**
- Opening: student introduces the question ("I've been curious about which states are actually best to retire to...")
- The Prof frames the key criteria before diving in
- Student asks about each place by name ("What about Florida?", "What about Arizona?")
- Prof responds with the video's reasoning plus genuine depth — don't just recite bullet points
- Group similar places when it's natural ("The Sun Belt states generally...")
- Highlight surprises and outliers — give those more treatment
- Closing: student synthesizes the pattern, Prof adds what the video probably couldn't: the deeper reason the pattern exists

---

## Type: [To be added]

Add new video types here as they come up. Each entry needs:
- Channel/format description
- The Gemini extraction prompt
- Dialog structure notes
