# Project Memory

## Session Start
- [feedback_startup.md](feedback_startup.md) — Do NOT invoke the startup skill. Read overview.md and session-log.md directly to orient.
- [feedback_read_overview_always.md](feedback_read_overview_always.md) — Read overview.md before answering any question about project structure, organization, or where things are. Every time, no exceptions.

## NotebookLM Workflows
Active workflow: **Playlists Notebook** — fresh notebook per topic/playlist, iteratively refined.
(Research Pipeline is archived — see `skills/archive/` if needed.)

See `CONTEXT.md` for full context and skills index.
See `skills/` for atomic skill and workflow files.
See `notebook-request-spec.md` for the JSON request format (for use with pre-processing AI).
See `skills/skill-json-request.md` to process a JSON request and execute notebook builds.
See `skills/skill-task-intake.md` for the full pipeline: task file → JSON → notebook build.
See `skills/skill-pattern-003.md` for the Single Notebook design pattern.

## Claude Code Knowledge Base
`Projects/Infrastructure/documents/claude-code-knowledge-base.md` — distilled findings from the 3/31/2026 source leak. Covers: how the harness works, configuration surfaces, hooks, /compact, common mistakes, current setup gaps. Query notebook `97e0990a` for deeper follow-up.

## Session Log
- [feedback_session_log_incremental.md](feedback_session_log_incremental.md) — Write session log entries at natural milestones throughout the session, not only at shutdown. See `documents/session-log-policy.md` for full guidance.

## Shutdown
- [feedback_shutdown.md](feedback_shutdown.md) — Follow shutdown skill steps in strict order; session log must be written as Step 2, not skipped

## ReadMe Convention
- [feedback_readme.md](feedback_readme.md) — Tom uses `agent-test/ReadMe.txt` to pass long content. When he says "read the ReadMe", read that file.

## User Preferences
- When asked to provide copy/paste content, output it directly with no preamble (no "Here it is:", no addressing Tom). This lets Tom use the copy icon without editing.
- Session log entries are always written by Claude — never ask Tom to narrate. Synthesize from the conversation.
- [feedback_second_person.md](feedback_second_person.md) — Use "you/your" not "Tom/Tom's" when addressing him directly in conversation.

## Key Facts
- Tool: `notebooklm-mcp-cli` v0.3.2, command `nlm`
- Always prefix commands: `PYTHONIOENCODING=utf-8 nlm ...`
- Working directory: `C:\Users\tomew\Documents\agent-test`
- Account: ewalltom@gmail.com
- Tom goes by "Tom"

## Project Structure
Four workflows under `agent-test/Projects/`:
- `Projects/NotebookLM/playlists/` — NotebookLM automated notebook workflow
- `Projects/Remotion/simple-narrated-slides/` — ElevenLabs narrated slideshows (dark background)
- `Projects/Remotion/bar-chart-race/` — Bar chart race (port 3000; AiMmlu + StreamingWars confirmed working)
- `Projects/Remotion/whiteboard-explainer/` — Whiteboard explainer system

## Git / Dev-Prod
- `agent-test/` is a git repo; branches: `main` (production) and `dev` (working)
- All changes happen on `dev`; promote via `bash promote.sh` from agent-test root
- promote.sh runs 99 structural tests across all three Remotion projects before merging
- Never commit directly to main

## BYG Project (Behold Your God)
- Project definition: `Projects/BYG/documents/project-definition.md`
- 10 F.T. Wright illustrations → animated videos + bundled web app
- Web app: `Projects/NotebookLM/playlists/apps/behold-your-god.html`
- Videos: `Projects/Remotion/simple-narrated-slides/src/` (NuclearPlant.tsx = #01, complete)
- Knowledge base: `Projects/BYG/documents/knowledge-base.md` (to be built)
- Audio: [feedback_byg_audio.md](feedback_byg_audio.md) — Edge TTS only, not ElevenLabs

## Whiteboard Explainer Project
Active Remotion project: `agent-test/Projects/Remotion/whiteboard-explainer/`
See `whiteboard-explainer.md` for full details — scene types, doodles, transitions, gotchas.
Status: V1 POC working in Studio. Transitions implemented. Ready for iteration.

## Skill Creation
- [feedback_skill_creator.md](feedback_skill_creator.md) — Always invoke skill-creator when creating/modifying skills; never write SKILL.md directly

## Skills-First Directive
- [feedback_skills_first.md](feedback_skills_first.md) — All work through skills; invoke the relevant skill before executing any established workflow; ask before doing repeatable tasks manually

## Naming
- [feedback_naming.md](feedback_naming.md) — Proactively watch for naming ambiguity/collision; suggest clearer names before Tom notices

## Ticket System
Pending items are tracked as tickets in `tools/tasks.json` (board at localhost:3010). This replaces `pending.md`.
- Use the `ticket-tracker` skill when Tom mentions "jira", "ticket", a ticket ID, or asks about open/pending work
- Do NOT add new pending items to `pending.md` — add them as tickets in `tasks.json`
- See [project_ticket_tracker.md](project_ticket_tracker.md) for full details

## Source Writing Pipeline
- [feedback_write_and_go.md](feedback_write_and_go.md) — After writing NLM source docs, upload and kick off videos immediately without asking

## NLM Video Generation
- [feedback_nlm_video_source.md](feedback_nlm_video_source.md) — Default: write a dedicated source doc per video, use --source-ids; multi-source is valid but the exception
- [feedback_nlm_scene_source_fidelity.md](feedback_nlm_scene_source_fidelity.md) — Scene-format sources translate with high fidelity; quotes, data, and scene order all preserved; invest in scene splits
- Scene writing rules: `Projects/NotebookLM/playlists/documents/nlm-cinematic-scene-rules.md` — primary reference; 6 rules + abstract→physical table + failure modes + scene template + focus prompt checklist
- Scene feedback evaluation: `Projects/NotebookLM/playlists/documents/nlm-scene-feedback-evaluation.md` — what to accept/reject when reviewing AI feedback on scene drafts; core rule: surface vs. add

## Notebook Source References
- [notebook-sources-byg-divine-character.md](notebook-sources-byg-divine-character.md) — All 12 sources (ID + title + description) for "Behold Your God: Understanding Divine Character" (`b64c5fc6`). Includes suggested video clusters.

## Codex Setup
- [project_codex_setup.md](project_codex_setup.md) — Hotkey vs AGENTS.md split; hotkey holds behavioral rules, AGENTS.md holds orientation + compaction workflow

## Troubleshooting
- [feedback_reboot_permissions.md](feedback_reboot_permissions.md) — After a Windows reboot, permission prompts may appear despite correct settings. Fix: re-save settings.local.json.
- [feedback_reread_deploy_skills.md](feedback_reread_deploy_skills.md) — Always re-read gh-pages-deploy SKILL.md before running; session-reminder content can be stale (caused a push to agent-test instead of claude-code-fun).

## User Background
- [user_image_gen_background.md](user_image_gen_background.md) — Deep AI image gen history (Midjourney/ChatGPT prompting era); active MJ subscription; pivot to web apps when coding became viable

## Working Notes
- [working-notes.md](working-notes.md) — Live quick-reference: active notebook IDs, gdrive MCP status, nlm CLI gotchas, recent source/artifact IDs. Update each session.

