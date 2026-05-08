---
name: find-skills
description: Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
---

# Skill Finder

Generates structured research prompts for hunting skills in the wild. Does NOT run searches or install skills — outputs a ready-to-paste prompt for another AI (NotebookLM, Gemini, etc.) to execute and return candidates.

## Two Modes

**Reactive:** User asks "find a skill for X", "is there a skill that does Y", "can we get a skill for Z" → generate the research prompt immediately.

**Proactive:** During work, notice the task involves a pattern common enough that a skill probably exists. Flag it briefly — do not generate unsolicited. Say: "This looks like a task where a skill might exist — want me to generate a search prompt?" Only proceed if Tom says yes.

Patterns worth flagging proactively:
- Using a major framework with known official publishers (Vercel/Next.js, Azure, Hugging Face, Sentry)
- Document processing workflows (PDF, DOCX, XLSX)
- TDD, systematic debugging, git worktrees, sub-agent orchestration
- Compliance or regulatory constraints (HIPAA, brand guidelines)
- Creative/media workflows (Remotion, SVG animation, whiteboard)
- Memory/context management for long-running tasks

---

## Ecosystem Knowledge

### Priority Sources (check in this order)

1. **`github.com/anthropics/skills`** — Official Anthropic. Most reliable. Known skills: docx, pdf, xlsx, pptx, skill-creator, frontend-design, brand-guidelines, canvas-design.
2. **`skills.sh`** — Main open registry (Vercel Labs). ~85.6K skills, ~9K publishers, ~10.7M installs (snapshot 2026-03-06). CLI: `npx skills find <query>`. Ranked by install count and trending velocity.
3. **`github.com/vercel-labs/agent-skills`** — High install counts. Web/React/Next.js focus. vercel-react-best-practices (177K installs), web-design-guidelines (138K installs), agent-browser.
4. **`github.com/karanb192/awesome-claude-skills`** — ~50 rigorously vetted skills. TDD and systematic debugging focus. Quality over quantity.
5. **`github.com/VoltAgent/awesome-agent-skills`** — Enterprise focus. Official releases from Sentry, Stripe, Cloudflare. Excludes AI-generated slop.
6. **`github.com/hesreallyhim/awesome-claude-code`** — Broader index: CLAUDE.md context files, subagents, CLI wrappers (claude-tmux, claude-esp), not just skills.
7. **`github.com/Chat2AnyLLM/awesome-claude-skills`** — 23,373 skills across 13 domains. Comprehensive but noisy. Good for breadth.
8. **`github.com/travisvn/awesome-claude-skills`** — Additional curated collection.
9. **`agensi.io`** — Commercial marketplace. Security-verified (8-point scan + admin review). Best for enterprise/compliance/regulated-domain skills.
10. **`lobehub.com/skills`** — LobeHub marketplace. Browsable by category. Good secondary check.
11. **`Skillstore`** — Submission-based directory with security audit + PR review process. Useful trust signal.
12. **`SkillPad`** — Desktop GUI for skills.sh. Browse and install visually; manage scopes. Good for exploration.

### Known Good Publishers

| Publisher | Strength | Top skill (installs) |
|-----------|----------|----------------------|
| Anthropic (anthropics/skills) | Official patterns; foundational skills | frontend-design (125K), pdf (29K) |
| Vercel Labs (vercel-labs/agent-skills) | Web infrastructure, React, Next.js | vercel-react-best-practices (177K), web-design-guidelines (138K) |
| Vercel Labs (vercel-labs/skills) | Meta-skills, discovery tooling | find-skills (422K) |
| Remotion (remotion-dev/skills) | Programmatic video in React | remotion-best-practices (126K) |
| Supabase (supabase/agent-skills) | Database patterns, Postgres | supabase-postgres-best-practices (29K) |
| Expo | Mobile CI/deployment, UI | expo skills pack |
| Sentry (getsentry/skills) | Code review, settings audit, engineering quality | — |
| Hugging Face (huggingface/skills) | AI/ML workflows, model orchestration, dataset search | — |
| Microsoft (github-copilot-for-azure) | Azure deployment, Cosmos DB, RBAC, Entra ID | multiple azure-* skills |
| ComposioHQ (awesome-claude-skills) | Broad community curation | — |
| OthmanAdi | planning-with-files — context/memory for long runs (13K stars) | — |
| Jesse Vincent / Obra (obra/superpowers) | Parallel worktrees, sub-agent orchestration | systematic-debugging (23K) |

### Category Map

| Need | Search terms |
|------|-------------|
| Web / React / Next.js | react, nextjs, typescript, tailwind, web-design |
| Testing / TDD | tdd, test-driven, jest, playwright, e2e |
| DevOps / Cloud | deploy, docker, kubernetes, ci-cd, azure |
| Document processing | pdf, docx, xlsx, pptx, document-extraction |
| Code quality / debugging | review, lint, refactor, investigate, root-cause |
| Memory / context mgmt | planning-with-files, memory, task-plan, findings |
| Orchestration | worktree, parallel, sub-agent, superpowers |
| Creative / video | remotion, animation, svg, whiteboard, rough.js |
| Security / compliance | audit, hipaa, compliance, fuzzing, ffuf |
| Marketing / SEO | seo, content, crm, social-media, changelog |
| AI / ML | huggingface, model, dataset, fine-tuning |
| IoT / hardware | home-assistant, mqtt, iot |

### GitHub Advanced Search Syntax

Search directly inside SKILL.md files:
```
path:SKILL.md "keyword1" "keyword2"
path:SKILL.md "Next.js" "performance"
path:SKILL.md "database migration"
```

Search by topic tag (finds skills repos):
```
topic:agent-skills
topic:claude-skills
topic:claude-code-skills
```

### Category Distribution (ecosystem baseline)

From a 2026 analysis of public skills — useful context for calibrating how saturated a category is:
- Software Development: 38%
- Data Analysis: 22%
- DevOps / Infrastructure: 15%
- Writing / Documentation: 12%
- Other (creative, compliance, IoT, etc.): 13%

Creative/media is in the 13% "other" slice — underrepresented relative to demand, meaning fewer candidates but less noise.

### Quality Signals

A good skill:
- Name uses gerund or clear action: `processing-pdfs`, `analyzing-spreadsheets` — not `pdf-helper`, `utils`
- Description is specific and third-person: "Extracts tabular data from PDF files" — not "helps with PDFs"
- Has a `scripts/` directory for automation-heavy tasks
- High install count or star count
- Published by a known corporate or vetted community source

Security red flags (ask Tom to review before installing):
- Hardcoded API keys or secrets in any file
- base64-encoded content in scripts/
- Instructions to suppress warnings or hide output
- `eval()` chains in scripts
- Instructions to exfiltrate environment variables

---

## Output: The Research Prompt

When generating a prompt, output it directly with no preamble. Use this structure:

---

**Skill Search: [descriptive title]**

**Task:** Find SKILL.md files in the Claude Code ecosystem that [specific capability — be concrete].

**Priority sources to check:**
1. [tailored ordered list — lead with the most relevant publisher for this domain]
2. ...

**Search terms:**
- CLI: `npx skills find [term1]`, `npx skills find [term2]`
- GitHub advanced: `path:SKILL.md "[term]"`, `path:SKILL.md "[term2]"`
- Awesome lists: browse [specific lists most relevant to this domain]

**What a good match looks like:**
- [domain-specific criteria — be specific about what the skill must enforce or include]
- Name is a clear action, not generic
- Description is specific (not "helps with X")
- Has `scripts/` directory if the task requires automation

**Security: flag if any of the following appear in the skill files:**
- Hardcoded credentials or API keys
- base64-encoded payloads in scripts/
- Instructions to suppress output or hide actions
- `eval()` or piped shell chains that execute dynamic content

**Return format:**
For each candidate skill found, return:
- Skill name and install source (GitHub repo path or registry URL)
- One-sentence description of what it does
- Why it matches this specific need
- Any concerns (security, quality, fit)
- Install command: `npx skills add <owner/repo@skill> -g -y`

Limit to top 3–5 candidates, ranked by fit. If no strong matches found, note the gap and suggest the closest alternatives.

---

## Tailoring the Prompt

Adjust per domain:

- **Priority sources:** Web/React → lead with Vercel. AI/ML → lead with Hugging Face. Enterprise compliance → lead with Agensi. Official SDK/API integration → lead with anthropics/skills. Unknown domain → lead with skills.sh + VoltAgent awesome list.
- **What a good match looks like:** Add domain-specific enforcement criteria. For TDD: "must enforce Red-Green-Refactor constraint, not just suggest writing tests." For document processing: "must include scripts/ that interface with file binaries, not just text extraction."
- **Security emphasis:** Curated awesome-lists (karanb192, VoltAgent) → lighter check. Random GitHub repos or unknown publishers → full check, explicitly flag all items.

---

## After Tom Returns Results

1. Read the candidate descriptions Tom pastes back
2. Confirm the best match against the need
3. Install: `npx skills add <owner/repo@skill> -g -y` or copy SKILL.md to `~/.claude/skills/<name>/SKILL.md`
4. Confirm it appears in the available skills list

Do NOT track installed skills here — that's the installed-skills-tracker skill (not yet built).
