<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\RegistrantProfile;
use Illuminate\Support\Facades\DB;

$topProvinces = DB::table('registrant_profiles')
    ->select('province_name as province', 'province_code', DB::raw('count(*) as count'))
    ->whereNotNull('province_name')
    ->where('province_name', '!=', '')
    ->groupBy('province_name', 'province_code')
    ->orderByDesc('count')
    ->get();

print_r($topProvinces->toArray());
