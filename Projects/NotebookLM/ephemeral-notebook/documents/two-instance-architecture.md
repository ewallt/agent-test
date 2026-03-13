# Two-Instance Architecture

## Overview

The workflow is split across two Claude Code CLI instances with a clean division of responsibility. Instance 1 is a content strategist — it knows about topics, research angles, and content design. Instance 2 is a NotebookLM operator — it knows how to build notebooks, evaluate sources, and produce artifacts. Neither needs to know much about the other's domain.

The JSON is the handoff contract between them.

---

## Instance 1: Content Strategist

**Focus:** Preparing things for Claude Code (Instance 2).

**Inputs:**
- Task files from the `tasks/` folder

**Outputs:**
- NotebookLM JSON request files, written to `json/` folder

**What it does:**
- Reads task specs (topic, guidance, pattern, video count)
- Classifies the topic — scope, domain, structural type
- Selects the appropriate design pattern (003, 004-A, etc.)
- Designs focus angles for each video
- Generates a complete JSON per the notebook-request-spec
- Writes JSONs to the handoff folder
- Has no awareness of NotebookLM commands or workflow mechanics

**What it doesn't do:**
- Run any `nlm` commands
- Make decisions about sources, research quality, or artifacts
- Know or care how Instance 2 builds the notebook

---

## Instance 2: NotebookLM Operator

**Focus:** Preparing things for NotebookLM.

**Inputs:**
- JSON files from the `json/` folder

**Outputs:**
- Built notebooks, rendered videos, downloaded artifacts
- Completed task records moved to `completed/`
- Processed JSONs moved to `json-completed/`

**What it does:**
- Reads JSONs — all decisions about *what* to build are already made
- Creates notebooks, runs research, evaluates source quality
- Corrects errors — reruns imports, rejects bad sources, adjusts as needed
- Queues videos with correct source-focus mapping
- Downloads artifacts
- All decisions are oriented toward building the best possible notebook

**What it doesn't do:**
- Design focus angles or content strategy
- Generate or modify JSONs
- Know or care how the JSON was created

---

## Folder Structure

```
ephemeral-notebook/
├── staging/            ← Task drafts not yet ready for Instance 1
├── tasks/              ← Task specs (input to Instance 1)
├── json/               ← JSONs (handoff from Instance 1 to Instance 2)
├── json-completed/     ← JSONs processed by Instance 2
├── completed/          ← Finished task records
```

---

## Workflow

1. Task files exist in `tasks/`
2. Instance 1 reads task files, generates JSONs, writes to `json/`
3. Instance 2 detects new JSONs (via FileSystemWatcher or folder check at launch)
4. Instance 2 executes the notebook build for each JSON
5. Instance 2 moves processed JSON to `json-completed/`
6. Instance 2 moves task record to `completed/`

---

## How Tasks Enter the System

There is no single required path. Tasks can enter `tasks/` in any of these ways:
- Tom moves files manually from `staging/` to `tasks/`
- Instance 1 writes directly to `tasks/` from a topic Tom provides
- Tom asks Claude (in the app) to create task files and place them in `tasks/`
- Any combination of the above

The workflow's starting point is simply: **task files exist in `tasks/`.**

---

## Two-Instance Trigger Mechanism

Instance 2 can be triggered in two ways:
- **At launch**: check `json/` folder on startup; process whatever is there
- **FileSystemWatcher**: a PowerShell script watches `json/`; when Instance 1 writes a new file, Instance 2 is launched automatically

The FileSystemWatcher approach enables true pipeline operation — Instance 1 and Instance 2 run concurrently, with Instance 2 picking up JSONs as they are written.

---

## Design Principles

- **Clean separation**: neither instance needs to understand the other's domain
- **JSON as contract**: all content decisions are made before execution begins
- **Instance 2 is lean**: no strategic thinking, no planning — just building
- **Token efficiency**: Instance 1 burns tokens on thinking; Instance 2 burns tokens on tool calls. Keeping them separate prevents mixing expensive operations.
- **Flexible entry points**: the system accommodates however tasks arrive — automated, manual, or mixed
