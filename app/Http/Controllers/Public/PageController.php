<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function tentang(): Response
    {
        return Inertia::render('Public/Tentang');
    }

    public function program(): Response
    {
        return Inertia::render('Public/Program');
    }

    public function tahapan(): Response
    {
        return Inertia::render('Public/Tahapan');
    }

    public function academy(): Response
    {
        return Inertia::render('Public/Academy');
    }

    public function faq(): Response
    {
        return Inertia::render('Public/Faq');
    }

    public function kontak(): Response
    {
        return Inertia::render('Public/Kontak');
    }

    public function privasi(): Response
    {
        return Inertia::render('Public/Privasi');
    }

    public function ketentuan(): Response
    {
        return Inertia::render('Public/Ketentuan');
    }
}
