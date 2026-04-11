$ErrorActionPreference = "Stop"

$appDir = Split-Path -Parent $PSScriptRoot
$healthUrl = "https://dec-main-14or.onrender.com/api/health"
$startedBackend = $false
$backendProcess = $null

function Test-BackendHealth {
    try {
        $response = Invoke-RestMethod -Uri $healthUrl -Method Get -TimeoutSec 2
        return $response.status -eq "ok"
    } catch {
        return $false
    }
}

if (-not (Test-BackendHealth)) {
    $backendProcess = Start-Process node `
        -ArgumentList "./server/index.js" `
        -WorkingDirectory $appDir `
        -PassThru
    $startedBackend = $true

    $deadline = (Get-Date).AddSeconds(10)

    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Milliseconds 500

        if (Test-BackendHealth) {
            break
        }

        if ($backendProcess.HasExited) {
            throw "The backend server exited before it became ready."
        }
    }

    if (-not (Test-BackendHealth)) {
        throw "The backend server did not become ready on 127.0.0.1:8010."
    }
}

try {
    & npm.cmd --prefix $appDir run dev:client
} finally {
    if ($startedBackend -and $backendProcess -and -not $backendProcess.HasExited) {
        Stop-Process -Id $backendProcess.Id -Force
    }
}
