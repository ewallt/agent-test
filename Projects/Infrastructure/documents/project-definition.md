# Infrastructure — Project Definition

Cross-cutting work that keeps the agent-test project healthy: tooling, meta-processes, documentation quality, and anything that applies across projects rather than belonging to one.

## Active Initiatives

### Documentation Hierarchy Restructure
Restructuring all project docs to follow a 3-tier hierarchy: overview.md (pointers only) → project-definition.md (one sentence + project-wide tracking + pointers) → skills/reference docs (detail). Skill: `project-restructure`.

| Project | Status |
|---------|--------|
| GiC Integration | ✅ Done (merged into Augmented Chat) |
| YouTube Growth | ✅ Done |
| Gems | ✅ Done |
| BYG | ✅ Done |
| Remotion — Bar Chart Race | ✅ Done |
| Remotion — Narrated Slides | ✅ Done |
| Remotion — Whiteboard Explainer | ✅ Done |
| Augmented Chat | ✅ Done |
| NotebookLM | ⬜ Pending |
| Infrastructure | ⬜ Pending |
| overview.md | ⬜ Pending (done last) |

## Planned Reviews

### Review 1 — Redundancy and Cleanup
Audit for files superseded by newer equivalents, stale skills, dead docs, overlapping tooling.

### Review 2 — Software Shop Standards
Assess against what a reasonable software shop would have: CI/CD, documentation coverage, deployment procedures, monitoring, change management.

## Reference Docs
- `Projects/Infrastructure/documents/claude-code-knowledge-base.md` — distilled findings from the 3/31/2026 Claude Code source leak
- `Projects/Infrastructure/documents/testing.md` — testing standards and approach (needs review — may be stale)
- `Projects/Infrastructure/troubleshooting/nlm-code5-error.md` — troubleshooting guide for NLM error code 5

## Open Items
- [ ] Conduct Review 1 and capture findings as tickets
- [ ] Conduct Review 2 and capture findings as tickets
- [ ] Review `skill-oiler` — assess whether additional universal concerns belong there
