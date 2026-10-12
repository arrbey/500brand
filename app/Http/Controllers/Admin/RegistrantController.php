<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\RegistrationStatusLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RegistrantController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Registration::with(['profile', 'organization', 'offering']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('registration_number', 'like', "%{$search}%")
                  ->orWhereHas('profile', function ($qp) use ($search) {
                      $qp->where('full_name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%")
                         ->orWhere('whatsapp', 'like', "%{$search}%");
                  })
                  ->orWhereHas('organization', function ($qo) use ($search) {
                      $qo->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('offering', function ($qoff) use ($search) {
                      $qoff->where('brand_name', 'like', "%{$search}%")
                           ->orWhere('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($province = $request->input('province')) {
            $query->whereHas('profile', function ($qp) use ($province) {
                $qp->where('province_name', $province);
            });
        }

        $registrants = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Registrants/Index', [
            'registrants' => $registrants,
            'filters' => $request->only(['search', 'status', 'province']),
        ]);
    }

    public function show(Registration $registration): Response
    {
        $registration->load([
            'profile',
            'organization',
            'offering',
            'answers',
            'consents',
            'statusLogs.actor',
        ]);

        return Inertia::render('Admin/Registrants/Show', [
            'registration' => $registration,
        ]);
    }

    public function updateStatus(Request $request, Registration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:submitted,under_review,verified,scheduled_pitch,accepted_stage2,rejected,withdrawn',
            'note' => 'nullable|string|max:500',
        ]);

        $oldStatus = $registration->status;
        $registration->update(['status' => $validated['status']]);

        RegistrationStatusLog::create([
            'registration_id' => $registration->id,
            'from_status' => $oldStatus,
            'to_status' => $validated['status'],
            'actor_id' => Auth::id(),
            'note' => $validated['note'] ?? 'Perubahan status oleh admin.',
        ]);

        return back()->with('success', 'Status pendaftaran berhasil diperbarui.');
    }

    public function destroy(Registration $registration): RedirectResponse
    {
        $code = $registration->registration_code ?? $registration->registration_number ?? '#' . $registration->id;
        $name = $registration->profile?->full_name;

        DB::transaction(function () use ($registration) {
            $registration->delete();
        });

        $label = $name ? "{$code} ({$name})" : $code;
        return back()->with('success', "Data pendaftar {$label} berhasil dihapus.");
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:registrations,id',
        ]);

        $count = count($validated['ids']);

        DB::transaction(function () use ($validated) {
            Registration::whereIn('id', $validated['ids'])->delete();
        });

        return back()->with('success', "{$count} data pendaftar berhasil dihapus.");
    }

    public function exportCsv(Request $request): StreamedResponse
    {
        $fileName = 'pendaftar-500brandglobal-' . date('Y-m-d') . '.csv';

        $query = Registration::with(['profile', 'organization', 'offering', 'answers']);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        // Support delimiter: default comma ',', or ';' for Indonesian Excel locale
        $delimiter = $request->input('delimiter', ',');
        if ($request->input('excel') === '1' || $request->input('delimiter') === 'semicolon') {
            $delimiter = ';';
        }

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return response()->streamDownload(function () use ($query, $delimiter) {
            $handle = fopen('php://output', 'w');
            
            // UTF-8 BOM for Microsoft Excel compatibility
            fprintf($handle, chr(0xEF).chr(0xBB).chr(0xBF));

            fputcsv($handle, [
                'No. Registrasi',
                'Status',
                'Tanggal Daftar',
                'Nama Lengkap',
                'Email',
                'WhatsApp',
                'Provinsi',
                'Kota',
                'Peran / Jabatan',
                'Nama Usaha / Organisasi',
                'Brand',
                'Bentuk Badan Usaha',
                'Sektor',
                'Skala Usaha',
                'Jenis Produk/Layanan',
                'Nama Produk',
                'Jangkauan Pasar',
                'Tujuan Program',
            ], $delimiter);

            $query->chunk(200, function ($registrations) use ($handle, $delimiter) {
                foreach ($registrations as $r) {
                    $p = $r->profile;
                    $o = $r->organization;
                    $goalsText = $r->answers->where('question_key', 'goals')->pluck('answer_value')->filter()->join(' | ');
                    if (empty($goalsText)) {
                        $goalsText = $r->answers->firstWhere('question_key', 'goals')?->answer_text ?? '—';
                    }

                    fputcsv($handle, [
                        $r->registration_code ?? $r->registration_number,
                        $r->status,
                        $r->created_at?->format('Y-m-d H:i:s'),
                        $p?->full_name,
                        $p?->email,
                        $p?->whatsapp,
                        $p?->province_name,
                        $p?->city_name,
                        $p?->role_title,
                        $o?->name,
                        $off?->brand_name,
                        $o?->entity_type,
                        $o?->sector,
                        $o?->scale,
                        $off?->type,
                        $off?->name,
                        $off?->current_market,
                        $goalsText,
                    ], $delimiter);
                }
            });

            fclose($handle);
        }, $fileName, $headers);
    }

    public function exportExcel(Request $request): StreamedResponse
    {
        $fileName = 'pendaftar-500brandglobal-' . date('Y-m-d') . '.xls';

        $query = Registration::with(['profile', 'organization', 'offering', 'answers']);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $headers = [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return response()->streamDownload(function () use ($query) {
            echo "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><style>th{background:#0c355c;color:#ffffff;font-weight:bold;border:1px solid #999;padding:8px;font-family:Arial,sans-serif;}td{border:1px solid #ccc;padding:6px;font-family:Arial,sans-serif;}</style></head><body>";
            echo "<table border=\"1\">";
            echo "<thead><tr>";
            $columns = [
                'No. Registrasi',
                'Status',
                'Tanggal Daftar',
                'Nama Lengkap',
                'Email',
                'WhatsApp',
                'Provinsi',
                'Kota',
                'Peran / Jabatan',
                'Nama Usaha / Organisasi',
                'Brand',
                'Bentuk Badan Usaha',
                'Sektor',
                'Skala Usaha',
                'Jenis Produk/Layanan',
                'Nama Produk',
                'Jangkauan Pasar',
                'Tujuan Program',
            ];
            foreach ($columns as $col) {
                echo "<th>" . htmlspecialchars($col) . "</th>";
            }
            echo "</tr></thead><tbody>";

            $query->chunk(200, function ($registrations) {
                foreach ($registrations as $r) {
                    $p = $r->profile;
                    $o = $r->organization;
                    $goalsText = $r->answers->where('question_key', 'goals')->pluck('answer_value')->filter()->join(' | ');
                    if (empty($goalsText)) {
                        $goalsText = $r->answers->firstWhere('question_key', 'goals')?->answer_text ?? '—';
                    }

                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($r->registration_code ?? $r->registration_number ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($r->status ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($r->created_at?->format('Y-m-d H:i:s') ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($p?->full_name ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($p?->email ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($p?->whatsapp ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($p?->province_name ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($p?->city_name ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($p?->role_title ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($o?->name ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($off?->brand_name ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($o?->entity_type ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($o?->sector ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($o?->scale ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($off?->type ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($off?->name ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($off?->current_market ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($goalsText ?? '') . "</td>";
                    echo "</tr>";
                }
            });

            echo "</tbody></table></body></html>";
        }, $fileName, $headers);
    }
}
