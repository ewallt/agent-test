# Infrastructure — Project Definition

Cross-cutting work that keeps the agent-test project healthy: tooling, meta-processes,
documentation quality, and anything that applies across the other five groups rather than
belonging to one of them.

---

## What the Project Is

Infrastructure covers three things:

1. **Tooling** — The task manager, git setup, Claude Code skills, and any scripts or
   utilities that support multiple projects (e.g., `promote.sh`, `nlm` CLI configuration).

2. **Process and standards** — How work gets done: testing, deployment, change management,
   onboarding documentation, and anything a well-run software shop would expect to have in place.

3. **Housekeeping** — Redundant files, stale documentation, overlapping tools, things that
   have drifted out of sync. Periodic cleanup to keep the project coherent.

---

## Two Planned Reviews

When Infrastructure work is ready to begin, two reviews will scope the backlog:

### Review 1 — Redundancy and Cleanup
Audit the repo for things that no longer need to exist or exist in duplicate:
- Files superseded by newer equivalents (e.g., `pending.md` vs ticket board)
- Stale skills, dead docs, overlapping tooling
- Anything that creates confusion by existing alongside a better version of itself

### Review 2 — Software Shop Standards
Assess the project against what a reasonable software shop would have in place:
- CI/CD and automated testing
- Documentation coverage (onboarding, runbooks, decision records)
- Deployment procedures
- Monitoring and observability
- Change management and review processes

---

## Action Items

These are open questions and next steps — to be refined into tickets when work begins:

- [ ] Decide scope boundaries: what belongs in Infrastructure vs. in individual project folders
- [ ] Conduct Review 1 (redundancy/cleanup) and capture findings as tickets
- [ ] Conduct Review 2 (software shop standards) and capture findings as tickets
- [ ] Prioritize the resulting backlog

---

## Location

- Project folder: `Projects/Infrastructure/`
- Documents: `Projects/Infrastructure/documents/`
