<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\CmsSetting;
$content = CmsSetting::getPayload('homepage_content', []);
$content['site_logo']['logo_image'] = '/images/preview_img_10.png';
CmsSetting::setPayload('homepage_content', $content, 'home');
echo "test logo set\n";
