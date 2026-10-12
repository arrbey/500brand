<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\CmsSetting;

$s = CmsSetting::getPayload('homepage_content', []);
if (!isset($s['site_logo'])) {
    $s['site_logo'] = [
        'logo_image' => '',
        'logo_image_dark' => '',
        'badge_number' => '5',
        'badge_circle' => '0',
        'brand_name' => '500 BRAND',
        'brand_name_highlight' => 'GLOBAL',
        'tagline' => 'NATIONAL BRAND TRANSFORMATION PORTAL',
        'show_text_with_image' => false,
        'height_px' => '38',
    ];
    CmsSetting::setPayload('homepage_content', $s, 'home');
    echo "site_logo added successfully\n";
} else {
    echo "site_logo already exists\n";
}
