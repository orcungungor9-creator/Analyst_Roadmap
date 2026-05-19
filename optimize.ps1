$workspaceDir = "c:\Users\HP\OneDrive\Desktop\code\Analist_web"
$files = Get-ChildItem -Path $workspaceDir -Recurse -File -Include *.html

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($file in $files) {
    # Skip excluded directories
    if ($file.FullName -like "*\.git\*" -or $file.FullName -like "*\node_modules\*") {
        continue
    }

    $content = [System.IO.File]::ReadAllLines($file.FullName)
    $newContent = @()
    
    $skipHeader = $false
    $skippingMobileNav = $false
    $skippingAbout = $false
    $skippingTheme = $false
    $divDepth = 0
    
    foreach ($line in $content) {
        # HEADER skipping
        if ($line -match "<header class=`"site-header glass-header`">") {
            $skipHeader = $true
        }
        if ($skipHeader) {
            if ($line -match "</header>") {
                $skipHeader = $false
            }
            continue
        }
        
        # DIV sections skipping (mobile nav, about modal, theme modal)
        if ($line -match "<div[^>]*id=`"mobile-nav-menu`"[^>]*>") {
            $skippingMobileNav = $true
            $opens = ([regex]::Matches($line, "<div\b").Count)
            $closes = ([regex]::Matches($line, "</div>").Count)
            $divDepth = $opens - $closes
            continue
        }
        if ($line -match "<div[^>]*id=`"about-modal`"[^>]*>") {
            $skippingAbout = $true
            $opens = ([regex]::Matches($line, "<div\b").Count)
            $closes = ([regex]::Matches($line, "</div>").Count)
            $divDepth = $opens - $closes
            continue
        }
        if ($line -match "<div[^>]*id=`"theme-modal`"[^>]*>") {
            $skippingTheme = $true
            $opens = ([regex]::Matches($line, "<div\b").Count)
            $closes = ([regex]::Matches($line, "</div>").Count)
            $divDepth = $opens - $closes
            continue
        }
        
        if ($skippingMobileNav -or $skippingAbout -or $skippingTheme) {
            $opens = ([regex]::Matches($line, "<div\b").Count)
            $closes = ([regex]::Matches($line, "</div>").Count)
            
            $divDepth += $opens
            $divDepth -= $closes
            
            if ($divDepth -le 0) {
                $skippingMobileNav = $false
                $skippingAbout = $false
                $skippingTheme = $false
            }
            continue
        }
        
        # Remove comments pointing to the deleted sections to keep things clean
        if ($line -match "<!--.*ÜST YAPI.*-->" -or $line -match "<!--.*ÜST BİLGİ.*-->" -or $line -match "<!--.*Açılır Navigasyon.*-->" -or $line -match "<!--.*MODAL PENCERELERİ.*-->" -or $line -match "<!--.*HAKKINDA PANELİ.*-->" -or $line -match "<!--.*TEMA SEÇİM PANELİ.*-->" -or $line -match "<!--.*Mobil Açılır Menü.*-->") {
            continue
        }
        
        $newContent += $line
    }
    
    $finalStr = $newContent -join "`n"
    
    # Inject components.js script before nav.js
    if ($finalStr -notmatch "components\.js") {
        $finalStr = $finalStr -replace "<script src=`"nav\.js`"></script>", "<script src=`"components.js`"></script>`n    <script src=`"nav.js`"></script>"
    }
    
    [System.IO.File]::WriteAllText($file.FullName, $finalStr, $utf8NoBom)
    Write-Host "Processed: $($file.FullName)"
}
Write-Host "Component replacement completed."
