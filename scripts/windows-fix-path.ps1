[CmdletBinding()]
param()

Write-Host 'Node/npm PATH diagnostics (Windows + Git Bash)'
Write-Host ''
Write-Host 'where.exe node'
& where.exe node
if ($LASTEXITCODE -ne 0) {
    Write-Host '  node not found via where.exe' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'where.exe npm'
& where.exe npm
if ($LASTEXITCODE -ne 0) {
    Write-Host '  npm not found via where.exe' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'Current PATH entries:'
($env:Path -split ';') | ForEach-Object {
    if ($_ -ne '') {
        Write-Host "  $_"
    }
}

Write-Host ''
Write-Host 'Why Git Bash may not see npm even after winget install:'
Write-Host '  - Git Bash was opened before PATH was updated.'
Write-Host '  - VS Code integrated terminal inherits an old PATH from when Code started.'
Write-Host '  - PATH is missing one or both required folders: C:\Program Files\nodejs and %AppData%\npm.'

Write-Host ''
Write-Host 'Suggested fixes:'
Write-Host '  1) Close all terminals and reopen Git Bash/PowerShell.'
Write-Host '  2) Restart VS Code if using the integrated terminal.'
Write-Host '  3) If still broken, restart the PC.'
Write-Host '  4) Ensure PATH contains:'
Write-Host '     C:\Program Files\nodejs'
Write-Host "     $env:AppData\npm"