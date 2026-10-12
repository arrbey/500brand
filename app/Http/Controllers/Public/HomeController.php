<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\CmsSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $cms = CmsSetting::getPayload('homepage_content', []);

        return Inertia::render('Home', [
            'cms' => $cms,
            'meta' => [
                'title' => 'Brand Nasional Go Global — National Re-Branding Movement for Global Relevance',
                'description' => 'Program transformasi merek Indonesia menuju pasar internasional (2026–2029). Terbuka untuk UMKM, korporasi, startup, koperasi, dan calon pebisnis.',
            ],
        ]);
    }
}
