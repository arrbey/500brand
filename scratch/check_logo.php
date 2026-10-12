<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\CmsSetting;
$content = CmsSetting::getPayload('homepage_content', []);
print_r($content['site_logo'] ?? 'NO SITE LOGO');
