[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

function Add-SessionPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$CandidatePath
    )

    if (-not (Test-Path -Path $CandidatePath)) {
        return
    }

    $existing = $env:Path -split ';' | Where-Object { $_ -ne '' }
    if ($existing -notcontains $CandidatePath) {
        $env:Path = "$CandidatePath;$env:Path"
        Write-Host "Added to PATH for this session: $CandidatePath"
    }
}

function Command-Exists {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Enable-WatchpackPolling {
    $env:WATCHPACK_POLLING = "true"
    $env:WATCHPACK_POLLING_INTERVAL = "1000"
    Write-Host 'Enabled WATCHPACK_POLLING=true (interval=1000) for this dev session.'
}

Write-Host 'Windows dev bootstrap (PowerShell)'
Write-Host 'Checking Node/npm and patching PATH for this session when possible...'

$commonPaths = @(
    'C:\Program Files\nodejs',
    "$env:AppData\npm"
)

foreach ($pathEntry in $commonPaths) {
    Add-SessionPath -CandidatePath $pathEntry
}

if (-not (Command-Exists -Name 'node')) {
    Write-Host ''
    Write-Host 'Node.js was not found in this session.' -ForegroundColor Yellow
    Write-Host 'Install/reinstall Node LTS, then reopen terminal:'
    Write-Host '  winget install OpenJS.NodeJS.LTS'
    Write-Host 'Then run:'
    Write-Host '  powershell -ExecutionPolicy Bypass -File scripts/windows-fix-path.ps1'
    exit 1
}

$nodeVersion = (& node -v 2>$null)
Write-Host "node: $nodeVersion"

if (Command-Exists -Name 'npm') {
    $npmVersion = (& npm -v 2>$null)
    Write-Host "npm:  $npmVersion"
    Write-Host ''
    Write-Host 'Running npm install...'
    & npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host 'npm install failed. Resolve the npm error above, then rerun this script.' -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Enable-WatchpackPolling
    Write-Host 'Starting dev server with npm...'
    & npm run dev
    exit $LASTEXITCODE
}

Write-Host ''
Write-Host 'npm command is still unavailable. Trying Corepack + pnpm fallback...' -ForegroundColor Yellow

if (-not (Command-Exists -Name 'corepack')) {
    Write-Host 'corepack is not available with this Node installation.' -ForegroundColor Red
    Write-Host 'Next steps:'
    Write-Host '  1) Reinstall Node LTS: winget install OpenJS.NodeJS.LTS'
    Write-Host '  2) Restart terminal (or PC).'
    Write-Host '  3) Run: powershell -ExecutionPolicy Bypass -File scripts/windows-fix-path.ps1'
    exit 1
}

& corepack enable
if ($LASTEXITCODE -ne 0) {
    Write-Host 'corepack enable failed.' -ForegroundColor Red
    Write-Host 'Next steps: run scripts/windows-fix-path.ps1, then retry.'
    exit $LASTEXITCODE
}

& corepack prepare pnpm@latest --activate
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Failed to prepare pnpm via corepack.' -ForegroundColor Red
    Write-Host 'Next steps: run scripts/windows-fix-path.ps1, restart terminal, then retry.'
    exit $LASTEXITCODE
}

if (-not (Command-Exists -Name 'pnpm')) {
    Write-Host 'pnpm is still not available after corepack activation.' -ForegroundColor Red
    Write-Host 'Next steps:'
    Write-Host '  1) Close all terminals and reopen PowerShell.'
    Write-Host '  2) Run: corepack enable'
    Write-Host '  3) Run: corepack prepare pnpm@latest --activate'
    Write-Host '  4) Run: pnpm install && pnpm dev'
    exit 1
}

$pnpmVersion = (& pnpm -v 2>$null)
Write-Host "pnpm: $pnpmVersion"
Write-Host ''
Write-Host 'Running pnpm install...'
& pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host 'pnpm install failed. Resolve the pnpm error above, then rerun this script.' -ForegroundColor Red
    exit $LASTEXITCODE
}

Enable-WatchpackPolling
Write-Host 'Starting dev server with pnpm...'
& pnpm dev
exit $LASTEXITCODE
