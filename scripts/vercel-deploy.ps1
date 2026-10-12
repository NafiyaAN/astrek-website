# Reliable Vercel production deploy for this TanStack Start app.
# Fixes common Windows "fetch failed" errors (DNS / missing project settings).

$ErrorActionPreference = "Stop"
$env:NODE_OPTIONS = "--dns-result-order=ipv4first"

Set-Location $PSScriptRoot\..

Write-Host "Pulling Vercel project settings..."
vercel pull --yes --environment=production
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Building for Vercel..."
vercel build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Deploying prebuilt output to production..."
vercel deploy --prebuilt --prod --yes
exit $LASTEXITCODE
