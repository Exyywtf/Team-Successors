[CmdletBinding()]
param(
    [string]$Root = ".",
    [string[]]$Extensions = @("ts", "tsx", "js", "json", "css", "md", "mjs", "cjs", "ps1"),
    [string[]]$ExcludeDirs = @("node_modules", ".next", ".git")
)

$ErrorActionPreference = "Stop"
$rootPath = (Resolve-Path -Path $Root).Path
$utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)
$invalid = New-Object System.Collections.Generic.List[string]

Get-ChildItem -Path $rootPath -Recurse -File | Where-Object {
    $relative = $_.FullName.Substring($rootPath.Length).TrimStart('\', '/')
    $segments = $relative -split '[\\/]'
    if ($segments.Count -gt 0 -and $ExcludeDirs -contains $segments[0]) {
        return $false
    }

    $ext = $_.Extension.TrimStart('.').ToLowerInvariant()
    return $Extensions -contains $ext
} | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    try {
        [void]$utf8Strict.GetString($bytes)
    } catch {
        $invalid.Add($_.FullName)
    }
}

if ($invalid.Count -eq 0) {
    Write-Host "UTF-8 scan passed. No invalid files found."
    exit 0
}

Write-Host "UTF-8 scan failed. Invalid files:" -ForegroundColor Red
$invalid | ForEach-Object { Write-Host $_ }
exit 1
