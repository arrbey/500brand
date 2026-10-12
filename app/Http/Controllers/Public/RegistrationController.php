<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegistrationRequest;
use App\Models\Offering;
use App\Models\Organization;
use App\Models\RegistrantProfile;
use App\Models\Registration;
use App\Models\RegistrationAnswer;
use App\Models\RegistrationConsent;
use App\Models\RegistrationStatusLog;
use App\Models\CmsSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function create(): Response
    {
        $cms = CmsSetting::getPayload('form_content', []);

        return Inertia::render('Registration/Index', [
            'formVersion' => 'tahap1-2026-rev1',
            'cms' => $cms,
        ]);
    }

    public function store(StoreRegistrationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $registrationCode = DB::transaction(function () use ($validated, $request) {
            // Generate Registration Code PBG-YYYY-XXXXX
            $code = Registration::generateCode();

            $registration = Registration::create([
                'registration_number' => $code,
                'status' => 'submitted',
                'ip_hash' => hash('sha256', $request->ip() ?? '127.0.0.1'),
                'user_agent_hash' => hash('sha256', $request->userAgent() ?? ''),
                'submitted_at' => now(),
            ]);

            // Save Profile (Bagian A)
            RegistrantProfile::create([
                'registration_id' => $registration->id,
                'full_name' => $validated['full_name'],
                'email' => strtolower(trim($validated['email'])),
                'whatsapp' => $validated['whatsapp'],
                'province_name' => $validated['province'],
                'city_name' => $validated['city'],
                'category_code' => $validated['interest_category'],
                'category_label' => $validated['interest_category'],
                'role_title' => $validated['role'] ?? null,
            ]);

            // Save Organization (Bagian B)
            Organization::create([
                'registration_id' => $registration->id,
                'operating_status' => $validated['operating_status'],
                'name' => $validated['organization_name'] ?? null,
                'entity_type' => $validated['entity_type'] ?? null,
                'sector' => $validated['sector'] ?? null,
                'founded_year' => !empty($validated['founded_year']) ? (int) $validated['founded_year'] : null,
                'scale' => $validated['business_scale'] ?? null,
                'website_social' => $validated['website_social'] ?? null,
                'description' => $validated['organization_description'] ?? null,
            ]);

            // Save Offering (Bagian C)
            Offering::create([
                'registration_id' => $registration->id,
                'type' => $validated['offering_type'],
                'name' => $validated['offering_name'] ?? null,
                'description' => $validated['offering_description'] ?? null,
                'brand_status' => $validated['existing_brand'] ?? null,
                'brand_name' => $validated['brand_name'] ?? null,
                'current_market' => $validated['current_market'] ?? null,
            ]);

            // Save Answers (Bagian D - Goals and Expectations)
            if (!empty($validated['goals'])) {
                foreach ($validated['goals'] as $index => $goal) {
                    RegistrationAnswer::create([
                        'registration_id' => $registration->id,
                        'question_key' => 'goals',
                        'answer_value' => $goal,
                        'is_primary' => $index === 0,
                    ]);
                }
            }

            if (!empty($validated['expectation'])) {
                RegistrationAnswer::create([
                    'registration_id' => $registration->id,
                    'question_key' => 'expectation',
                    'answer_value' => $validated['expectation'],
                ]);
            }

            if (!empty($validated['interest_category'])) {
                RegistrationAnswer::create([
                    'registration_id' => $registration->id,
                    'question_key' => 'interest_category',
                    'answer_value' => $validated['interest_category'],
                ]);
            }

            // Save Consents (Bagian E)
            $ipHash = hash('sha256', $request->ip() ?? '127.0.0.1');
            $cmsConfig = CmsSetting::getPayload('form_content', []);
            $consentTexts = $cmsConfig['consent_texts'] ?? [];

            $consents = [
                'consent_data' => [
                    'text' => $consentTexts['consent_data'] ?? 'Saya menyetujui pengelolaan data untuk keperluan pendaftaran dan komunikasi program sesuai Kebijakan Privasi.',
                    'consented' => (bool) ($validated['consent_data'] ?? false),
                ],
                'consent_stage1_ack' => [
                    'text' => $consentTexts['consent_stage1_ack'] ?? 'Saya memahami bahwa pendaftaran Tahap 1 adalah pendaftaran peminat dan bukan proses penetapan kandidat 500 Brand Go Global.',
                    'consented' => (bool) ($validated['consent_stage1_ack'] ?? false),
                ],
                'consent_skolah_transfer' => [
                    'text' => $consentTexts['consent_skolah_transfer'] ?? 'Saya menyetujui penerusan data yang diperlukan ke platform pembelajaran Skolah.com untuk administrasi dan akses pembelajaran sesuai ketentuan.',
                    'consented' => (bool) ($validated['consent_skolah_transfer'] ?? false),
                ],
                'consent_marketing' => [
                    'text' => $consentTexts['consent_marketing'] ?? 'Saya bersedia menerima pembaruan kegiatan dan materi pembelajaran melalui WhatsApp atau email (opsional).',
                    'consented' => (bool) ($validated['consent_marketing'] ?? false),
                ],
            ];

            foreach ($consents as $key => $c) {
                RegistrationConsent::create([
                    'registration_id' => $registration->id,
                    'consent_key' => $key,
                    'consented' => $c['consented'],
                    'consent_text' => $c['text'],
                    'text_version' => 1,
                    'ip_hash' => $ipHash,
                    'consented_at' => now(),
                ]);
            }

            // Initial status log
            RegistrationStatusLog::create([
                'registration_id' => $registration->id,
                'from_status' => null,
                'to_status' => 'submitted',
                'note' => 'Pendaftaran online berhasil diterima sistem.',
            ]);

            return $code;
        });

        return redirect()->route('registration.success')->with([
            'registration_code' => $registrationCode,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
        ]);
    }

    public function success(Request $request): Response|RedirectResponse
    {
        $code = session('registration_code');

        if (!$code) {
            return redirect()->route('registration.create');
        }

        return Inertia::render('Registration/Success', [
            'registrationCode' => $code,
            'fullName' => session('full_name'),
            'email' => session('email'),
        ]);
    }
}
