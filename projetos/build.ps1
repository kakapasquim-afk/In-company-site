param(
    [Parameter(Mandatory=$true)][string]$Title,
    [Parameter(Mandatory=$true)][string]$Desc,
    [Parameter(Mandatory=$true)][string]$BodyFile,
    [Parameter(Mandatory=$true)][string]$OutFile
)
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$head = Get-Content -LiteralPath (Join-Path $dir "_head.html") -Raw -Encoding UTF8
$header = Get-Content -LiteralPath (Join-Path $dir "_header.html") -Raw -Encoding UTF8
$footer = Get-Content -LiteralPath (Join-Path $dir "_footer.html") -Raw -Encoding UTF8
$body = Get-Content -LiteralPath (Join-Path $dir $BodyFile) -Raw -Encoding UTF8

$out = $head + "`n" + $header + "`n" + $body + "`n" + $footer
$out = $out.Replace("__TITLE__", $Title).Replace("__DESC__", $Desc)
$outFileFull = Join-Path $dir $OutFile
[System.IO.File]::WriteAllText($outFileFull, $out, (New-Object System.Text.UTF8Encoding($false)))
Write-Output "Generated $OutFile"
