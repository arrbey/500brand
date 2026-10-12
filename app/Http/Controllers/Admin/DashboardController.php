<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RegistrantProfile;
use App\Models\Registration;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $total = Registration::count();
        $today = Registration::whereDate('created_at', today())->count();
        $thisWeek = Registration::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count();
        $thisMonth = Registration::whereMonth('created_at', now()->month)->whereYear('created_at', now()->year)->count();

        $byStatus = Registration::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        $topProvinces = DB::table('registrant_profiles')
            ->select('province_name as province', DB::raw('count(*) as count'))
            ->whereNotNull('province_name')
            ->where('province_name', '!=', '')
            ->groupBy('province_name')
            ->orderByDesc('count')
            ->get();

        $recent = Registration::with(['profile', 'organization', 'offering'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'total' => $total,
                'today' => $today,
                'thisWeek' => $thisWeek,
                'thisMonth' => $thisMonth,
                'byStatus' => $byStatus,
            ],
            'topProvinces' => $topProvinces,
            'recent' => $recent,
        ]);
    }
}
