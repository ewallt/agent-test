# Skill: Chat Configuration (10k Prompt)

## What This Covers
Configuring how the NotebookLM AI responds in chat — the "behavioral prompt" or
custom instructions layer. Runs after notebook creation, before or after sources are added.

## Command
```
PYTHONIOENCODING=utf-8 nlm chat configure <notebook-id> --goal custom --prompt "<prompt text>"
```

## Options
| Flag | Values | Notes |
|------|--------|-------|
| `--goal` | default, learning_guide, custom | Use `custom` to inject your own prompt |
| `--prompt` | text string | Required when goal=custom. Max 10,000 characters. |
| `--response-length` | default, longer, shorter | Optional. Controls response verbosity. |

## Example (custom prompt)
```
PYTHONIOENCODING=utf-8 nlm chat configure <notebook-id> \
  --goal custom \
  --prompt "You are an expert guide to Richard Overy's 'Why the Allies Won'. ..."
```

## When to Run
- After `nlm notebook create` — immediately following creation, before sources
- Can also be run after sources are loaded; order doesn't affect behavior

## Status
**Not used in Iteration 1** — deferred to a later iteration.
The command is confirmed working via CLI. When we're ready to use it, the prompt
content needs to be designed for the specific topic.

## Notes
- The prompt configures chat behavior only — it does not affect video generation
- 10,000 character limit gives substantial room for persona, scope, and behavioral rules
- This is the feature Tom originally described as the "configuration prompt"
