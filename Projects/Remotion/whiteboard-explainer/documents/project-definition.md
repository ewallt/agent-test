# Whiteboard Explainer — Project Definition

A JSON-driven Remotion system for whiteboard-style explainer videos; all content lives in scenes JSON files, the React code stays stable, and numbered compositions form a visual catalog for evaluating approaches.

## Compositions

| ID | Theme | Topic | Status |
|----|-------|-------|--------|
| `WhiteboardExplainer-1` | warmPaper | Internet + Stars | ✅ Done |
| `WhiteboardExplainer-2` | darkChalk | History of Writing | ✅ Done |
| `WhiteboardExplainer-3` | TBD | TBD | ⬜ Planned — needs 6 new scene types first |

## Scene Types

| Type | Status |
|------|--------|
| `title` | ✅ Built |
| `stepReveal` | ✅ Built |
| `diagramBuild` | ✅ Built |
| `compare` | ✅ Built |
| `outro` | ✅ Built |
| `quote` | ⬜ Planned |
| `stat` | ⬜ Planned |
| `splitContent` | ⬜ Planned |
| `timeline` | ⬜ Planned |
| `imageReveal` | ⬜ Planned |
| `flowChart` | ⬜ Planned |

## Skills

- `whiteboard-explainer` — adds scene types, themes, and compositions. See `Projects/Remotion/whiteboard-explainer/skills/whiteboard-explainer.md`.

## Reference

- Architecture + session context: `Projects/Remotion/whiteboard-explainer/documents/context.md`
- New scene type specs + theme roadmap: `Projects/Remotion/whiteboard-explainer/documents/planning.md`
- Studio: localhost:3002
