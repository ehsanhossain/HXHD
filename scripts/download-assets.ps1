# Download all assets from hxhdchemical.com
$ErrorActionPreference = "Continue"

# Logo / Favicon
$logo = @{
    "https://ecdn6.globalso.com/upload/p/272/image_other/2023-10/653f0f09e69d198119.png" = "public\images\logo.png"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-02/65de92c60439911069.png" = "public\images\favicon.png"
}

# Banner / Hero images
$banners = @{
    "https://ecdn6.globalso.com/upload/m/image_other/2023-08/64eee6f593ac836412.jpg" = "public\images\banners\hero-banner.jpg"
    "https://ecdn6.globalso.com/upload/m/image_other/2024-01/65a0f4415880d62904.png" = "public\images\banners\inquiry-bg.png"
}

# About / Company images
$about = @{
    "https://ecdn6.globalso.com/upload/p/272/image_other/2025-12/hongxing-hongda.jpg" = "public\images\about\company.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2025-12/0deee06675476e97987a4f616542eb0.jpg" = "public\images\about\factory.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65990af7a7e0f26949.jpg" = "public\images\about\about-main.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65a0dff9b835174356.jpg" = "public\images\about\history-1.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65a108195163478344.jpg" = "public\images\about\history-2.jpg"
}

# Product images
$products = @{
    "https://ecdn6.globalso.com/upload/p/272/image_product/2024-01/65b0d7fa888f338816_thumbW360.jpg" = "public\images\products\product-1.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_product/2024-01/65b0da410f23749890_thumbW360.jpg" = "public\images\products\product-2.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_product/2024-01/65b0df81e2cfb58137_thumbW360.jpg" = "public\images\products\product-3.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_product/2024-01/65b1b76ae799f93319_thumbW360.jpg" = "public\images\products\product-4.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_product/2024-01/65b1b97a9440f87544_thumbW360.jpg" = "public\images\products\product-5.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_product/2024-01/65b1bcbd13b8088348_thumbW360.jpg" = "public\images\products\product-6.jpg"
}

# Misc / partner / certification images
$misc = @{
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b0d571b8b8192739.png" = "public\images\misc\cert-1.png"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b0d5785172a69731.png" = "public\images\misc\cert-2.png"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b0d628eec1339839.jpg" = "public\images\misc\partner-1.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b0d6304518216178.jpg" = "public\images\misc\partner-2.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b0d85ebe10c93595.png" = "public\images\misc\advantage.png"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b1bc7a2f62b75783.png" = "public\images\misc\news-bg.png"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-01/65b1bde7ea8a910187.jpg" = "public\images\misc\news-1.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-02/65bb3c579878844172.jpg" = "public\images\misc\partner-logo-1.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-02/65bb3c64c383446211.jpg" = "public\images\misc\partner-logo-2.jpg"
    "https://ecdn6.globalso.com/upload/p/272/image_other/2024-02/65bb3c730152e60540.jpg" = "public\images\misc\partner-logo-3.jpg"
    "https://ecdn6.globalso.com/upload/m/image_other/2024-01/659f9cdb8cd9951792.png" = "public\images\misc\whatsapp-icon.png"
}

$allImages = @{}
$allImages += $logo
$allImages += $banners
$allImages += $about
$allImages += $products
$allImages += $misc

$baseDir = "c:\Code Projects\HXHD"
$total = $allImages.Count
$count = 0

foreach ($entry in $allImages.GetEnumerator()) {
    $count++
    $url = $entry.Key
    $dest = Join-Path $baseDir $entry.Value
    Write-Host "[$count/$total] Downloading: $($entry.Value)"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 30
        Write-Host "  OK"
    } catch {
        Write-Host "  FAILED: $_"
    }
}

Write-Host "`nDone! Downloaded $count images."
