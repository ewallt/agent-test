# Prompt: Layered Reader — Inline Mode

Use when you want real Gemini API calls firing directly from the app. Requires a valid API key (Gemini canvas fills `""` automatically at runtime). Note: Gemini canvas has been observed serving fake pre-baked responses — use GiC mode unless real API access is confirmed.

---

Build a single-file educational web app called **Layered Reader** using the content from this notebook.

**Tech stack:** React 18 + Babel (in-browser JSX), Tailwind CSS CDN, Google Fonts (Inter for UI, Merriweather for reading text). Self-contained — no build step. **Important:** `@apply` does not work with the Tailwind CDN. All `<style>` block rules must use plain CSS properties, not `@apply`. In particular, the `.ai-response` styles must be written as plain CSS:
```css
.ai-response { text-align: justify; hyphens: auto; }
.ai-response p { margin-bottom: 1.5rem; line-height: 1.625; }
.ai-response ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
.ai-response li { margin-bottom: 0.25rem; }
.ai-response strong { display: block; margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.125rem; font-family: 'Merriweather', serif; font-weight: 700; }
html.dark .ai-response strong { color: #ffffff; }
.ai-response em { font-style: italic; }
```

**Visual design:** Include a light/dark mode toggle, visible in the header. Both themes should be attractive with good contrast — not just an inversion. Default is light mode.

**Layout:**
- Persistent header strip at top: `Layered Reader — [Topic]` on the left, `Nine ways to engage: foundations, lenses, and challenges.` on the right. Light/dark toggle on the far right.
- Left navigation rail listing all scenes/sections
- Main reading column (max-width 2xl, generous horizontal padding)
- Sticky footer with the engagement menu

**Content:** Populate a `contentData` array from the notebook — one entry per scene or section, each with `id`, `title`, and `content`. Use the narrative prose from each scene. Where scenes include metadata blocks (SETTING, SUBJECT, LIGHTING, etc.), render them in a styled aside with a left border, smaller font, muted color — visually distinct from the prose.

**Engagement menu (sticky footer):**
A styled dropdown button labeled with the active option (default: "Choose a lens…"). Clicking opens a panel with nine options in three labeled groups:

**Foundations**
- Explain it simply
- Key insight
- Expand with examples

**Lenses**
- Compare / contrast
- Biographical moment
- So what — why does this matter today?
- Connections — what did this influence?

**Challenge**
- Skeptic's view
- Counterfactual — what if this hadn't happened?

Each selection calls the Gemini API with the active scene's content as context. Use these prompt templates:
- **Explain it simply:** `Explain the core concept of [scene title] in plain, easy-to-understand terms suitable for a beginner.`
- **Key insight:** `What is the most crucial key insight or underlying theme I should take away from [scene title]?`
- **Expand with examples:** `Expand on [scene title] with concrete examples, illustrations, or specific details that make the concept more tangible.`
- **Compare / contrast:** `How does [scene title] compare to what came before or after it? What did contemporaries think vs. what history decided?`
- **Biographical moment:** `What was happening in this person's life at the time of [scene title], and what drove this specific decision or obsession?`
- **So what — why does this matter today?:** `Why does [scene title] still matter today? What does it change about how we see the world?`
- **Connections — what did this influence?:** `What did [scene title] influence downstream? What cross-domain connections does it suggest?`
- **Skeptic's view:** `What is the strongest critique of [scene title]? What did the people who rejected it think they were seeing?`
- **Counterfactual — what if this hadn't happened?:** `If [scene title] had never happened, what would be missing? Who almost got here first?`

**Gemini API call:** Use `apiKey = ""`, model `gemini-2.5-flash-preview-09-2025`. System instruction: "You are an insightful, eloquent archival assistant. Provide your response in clean HTML format (using `<p>`, `<strong>`, `<em>`, `<ul>`) without markdown codeblocks. Keep it concise, engaging, and directly relevant to the specific text provided." Include `fetchWithRetry` with exponential backoff (5 retries, delays: 1s, 2s, 4s, 8s, 16s).

**AI Insight card:** Renders inline below the article when a menu option is selected. Shows a spinner ("Consulting the archives...") while loading. Renders the HTML response when complete. Clears when the user switches tabs.

**State:** `activeTab`, `activeMode`, `aiResponse`, `isLoading`, `menuOpen`, `error`. Clear AI state and `activeMode` on tab change via `useEffect`.
