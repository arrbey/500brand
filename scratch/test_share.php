<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;

$middleware = app(App\Http\Middleware\HandleInertiaRequests::class);
$ref = new ReflectionMethod($middleware, 'share');
echo "File: " . $ref->getFileName() . "\n";
$shared = $middleware->share(Request::create('/'));
var_dump(array_keys($shared));
