$audioDir = "C:\Users\tomew\Documents\agent-test\model-collapse\public\audio"
$files = Get-ChildItem $audioDir -Filter "*.mp3" | Sort-Object Name

foreach ($f in $files) {
    $reader = New-Object NAudio.Wave.Mp3FileReader($f.FullName) -ErrorAction SilentlyContinue
    if ($reader) {
        $dur = $reader.TotalTime.TotalSeconds
        $reader.Dispose()
        Write-Host "$($f.Name): $([math]::Round($dur, 3))s"
    } else {
        Write-Host "$($f.Name): $([math]::Round($f.Length / 16000, 1))s (estimated from size)"
    }
}
