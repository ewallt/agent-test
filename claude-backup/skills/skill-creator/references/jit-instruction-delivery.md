# JIT Instruction Delivery

Use Just-In-Time (JIT) instruction delivery when designing or updating multi-step skills.

## Purpose

JIT reduces drift in long workflows by delivering detailed instructions at the moment they are needed, rather than front-loading every rule in `SKILL.md`.

## Default Pattern

Keep `SKILL.md` as the orchestrator:

- Trigger and scope
- Brief context
- Step order
- Safety gates
- Pointers to references

Move detailed phase-specific material into `references/`:

- Rules
- Examples
- Checklists
- Schemas
- Troubleshooting
- Prompt patterns
- Tool-specific command details

Each workflow step should explicitly say:

```markdown
READ NOW: references/<file>.md
```

Place that line immediately before the phase that needs the reference.

## When To Use JIT

Use JIT when a skill has any of these properties:

- Multiple distinct phases
- Different phases use different tools or sub-skills
- Early rules are easy to forget by the time later phases occur
- The workflow touches external systems, files, dashboards, APIs, or generation pipelines
- The skill includes long examples or detailed checklists
- Prior manual execution showed drift, skipped steps, or inconsistent results

Do not force JIT onto tiny skills. If the whole skill is a short checklist, inline instructions in `SKILL.md` are fine.

## Skill Creation Heuristic

When creating a new skill, ask whether the workflow has phases.

If yes, propose a structure like:

```text
skill-name/
  SKILL.md
  references/
    plan.md
    execute.md
    validate.md
    checklist.md
```

Use phase-specific names when clearer:

```text
scene-writer/
  SKILL.md
  references/
    scene-rules.md
    focus-prompt.md
    checklist.md
    point-nemo-example.md
```

## Updating Existing Skills

When improving a skill, look for front-loaded details in `SKILL.md` that only matter during a later phase. Move those details into references and replace them with a `READ NOW` pointer at the relevant step.

Before:

```markdown
## Rules
[long rules]

## Checklist
[long checklist]

## Workflow
Step 1...
Step 2...
```

After:

```markdown
## Workflow

### Step 1 - Plan
READ NOW: references/planning-rules.md

### Step 2 - Execute
READ NOW: references/execution-rules.md

### Step 3 - Validate
READ NOW: references/checklist.md
```

## Validation

When validating a JIT skill, check:

- `SKILL.md` is short enough to act as orchestration.
- Detailed rules live in `references/`.
- Each detailed reference is read at the phase where it matters.
- References are one level deep from `SKILL.md`.
- Long examples are in references, not pasted into the main skill body.
- The skill still gives enough context to choose the right reference at the right time.
