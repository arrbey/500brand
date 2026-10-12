<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\CmsSetting;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

echo "--- 1. Testing CmsSetting Model ---\n";
$homeContent = CmsSetting::getPayload('homepage_content');
echo "Home title_prefix: " . ($homeContent['hero']['title_prefix'] ?? 'MISSING') . "\n";
echo "Home title_highlight: " . ($homeContent['hero']['title_highlight'] ?? 'MISSING') . "\n";

$formContent = CmsSetting::getPayload('form_content');
echo "Form categories count: " . count($formContent['interest_categories'] ?? []) . "\n";
echo "Form goals count: " . count($formContent['goal_options'] ?? []) . "\n";

echo "\n--- 2. Testing Update via CmsSetting::setPayload ---\n";
$homeContent['hero']['title_prefix'] = 'Dari Brand Nasional Maju Menjadi';
CmsSetting::setPayload('homepage_content', $homeContent, 'home');

$reloadedHome = CmsSetting::getPayload('homepage_content');
echo "Reloaded title_prefix: " . ($reloadedHome['hero']['title_prefix'] ?? 'MISSING') . "\n";
assert($reloadedHome['hero']['title_prefix'] === 'Dari Brand Nasional Maju Menjadi', 'Should match updated prefix');

// Revert to clean value
$homeContent['hero']['title_prefix'] = 'Dari Brand Nasional Menjadi';
CmsSetting::setPayload('homepage_content', $homeContent, 'home');
echo "Cleaned up title_prefix: " . CmsSetting::getPayload('homepage_content')['hero']['title_prefix'] . "\n";

echo "\nALL CMS BACKEND CHECKS PASSED!\n";
