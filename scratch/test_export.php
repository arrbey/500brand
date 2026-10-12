<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::first();
Auth::login($user);

$controller = new App\Http\Controllers\Admin\RegistrantController();
echo "=== TEST CSV EXPORT ===\n";
$reqCsv = Illuminate\Http\Request::create('/admin/pendaftar/export.csv', 'GET');
$respCsv = $controller->exportCsv($reqCsv);
echo "Status: " . $respCsv->getStatusCode() . "\n";
echo "Content-Type: " . $respCsv->headers->get('content-type') . "\n";
echo "Content-Disposition: " . $respCsv->headers->get('content-disposition') . "\n";

ob_start();
$respCsv->sendContent();
$contentCsv = ob_get_clean();
echo "CSV length: " . strlen($contentCsv) . " bytes\n";
echo "CSV sample line 1: " . strtok($contentCsv, "\r\n") . "\n";

echo "\n=== TEST EXCEL EXPORT ===\n";
$reqXls = Illuminate\Http\Request::create('/admin/pendaftar/export.xls', 'GET');
$respXls = $controller->exportExcel($reqXls);
echo "Status: " . $respXls->getStatusCode() . "\n";
echo "Content-Type: " . $respXls->headers->get('content-type') . "\n";
echo "Content-Disposition: " . $respXls->headers->get('content-disposition') . "\n";

ob_start();
$respXls->sendContent();
$contentXls = ob_get_clean();
echo "XLS length: " . strlen($contentXls) . " bytes\n";
echo "XLS sample: " . substr($contentXls, 0, 100) . "...\n";
