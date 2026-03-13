# FileSystemWatcher — Pipeline Trigger Script

## What This Is
A PowerShell script that watches the `json/` folder and automatically launches
Instance 2 (ephemeral-notebook-operator) when Instance 1 writes a new JSON file.
Enables true concurrent pipeline operation — Instance 1 and Instance 2 run simultaneously.

## Status
Not yet built or tested. Sequential operation (run Instance 1 fully, then launch Instance 2
manually) is the current approach. This script is the next step when concurrent operation
is needed.

---

## How It Works
1. PowerShell FileSystemWatcher monitors `ephemeral-notebook/json/` for new `.json` files
2. When a file is detected, it sets `workflow/active.txt` to `ephemeral-notebook-operator`
3. It launches a new PowerShell window with Claude CLI in the project folder
4. Instance 2 starts, reads active.txt, loads the operator workflow, processes the JSON

---

## Script (not yet tested)

```powershell
$folder = "C:\Users\tomew\Documents\agent-test\ephemeral-notebook\json"
$projectFolder = "C:\Users\tomew\Documents\agent-test"
$activeTxt = "C:\Users\tomew\Documents\agent-test\workflow\active.txt"

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folder
$watcher.Filter = "*.json"
$watcher.EnableRaisingEvents = $true

$action = {
    $name = $Event.SourceEventArgs.Name
    Write-Host "Detected new JSON: $name — launching operator..."

    Set-Content -Path $activeTxt -Value "workflow: ephemeral-notebook-operator"

    Start-Process powershell -ArgumentList `
        "-NoExit", `
        "-Command", `
        "cd '$projectFolder'; claude --dangerously-skip-permissions"
}

Register-ObjectEvent $watcher "Created" -Action $action

Write-Host "Watching $folder for new JSONs. Press Ctrl+C to stop."
while ($true) { Start-Sleep -Seconds 1 }
```

---

## Usage
1. Open a PowerShell window
2. Run the script: `.\filesystemwatcher.ps1`
3. Launch Instance 1 in a separate window
4. Instance 2 will launch automatically when Instance 1 writes a JSON

---

## Considerations
- Each new JSON triggers a new Instance 2 launch — if Instance 1 writes multiple JSONs
  rapidly, multiple operator instances could start simultaneously. May need a lock/queue
  mechanism to serialize them if that becomes a problem.
- active.txt is shared — if both instances read it at the same moment, there could be
  a race condition. Low risk in practice since strategist finishes before operator starts.
- The script runs until killed with Ctrl+C. Run it before launching Instance 1.

---

## Sequential Alternative (current approach)
If concurrent operation isn't needed:
1. Set active.txt to `ephemeral-notebook-strategist`, launch Instance 1
2. Wait for Instance 1 to finish
3. Set active.txt to `ephemeral-notebook-operator`, launch Instance 2

No script required. Simple and reliable for now.
