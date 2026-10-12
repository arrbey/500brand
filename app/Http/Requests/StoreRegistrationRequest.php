<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Anti-spam honeypot
            'website_hp' => 'nullable|max:0',

            // Step 1: Registrant Identity
            'full_name' => 'required|string|min:2|max:120',
            'email' => 'required|email:rfc|max:160',
            'whatsapp' => ['required', 'string', 'regex:/^\+?[0-9() .\-]{9,20}$/'],
            'province' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'interest_category' => 'required|string|max:120',
            'role' => 'nullable|string|max:120',

            // Step 2: Organization / Business
            'operating_status' => 'required|string|max:60',
            'organization_name' => 'nullable|string|max:160',
            'entity_type' => 'nullable|string|max:60',
            'sector' => 'nullable|string|max:120',
            'founded_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            'business_scale' => 'nullable|string|max:60',
            'website_social' => 'nullable|string|max:250',
            'organization_description' => 'nullable|string|max:1000',

            // Step 3: Offering & Goals
            'offering_type' => 'required|string|max:120',
            'offering_name' => 'nullable|string|max:160',
            'offering_description' => 'nullable|string|max:1000',
            'current_market' => 'nullable|string|max:80',
            'existing_brand' => 'nullable|string|max:80',
            'brand_name' => 'nullable|string|max:160',
            'goals' => 'required|array|min:1',
            'goals.*' => 'string|max:160',
            'expectation' => 'nullable|string|max:1000',

            // Consents
            'consent_data' => 'accepted',
            'consent_stage1_ack' => 'accepted',
            'consent_skolah_transfer' => 'accepted',
            'consent_marketing' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'website_hp.max' => 'Spam terdeteksi.',
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'full_name.min' => 'Nama lengkap minimal 2 karakter.',
            'email.required' => 'Email aktif wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
            'whatsapp.regex' => 'Format nomor WhatsApp tidak valid (contoh: 081234567890).',
            'province.required' => 'Provinsi wajib dipilih.',
            'city.required' => 'Kota / Kabupaten wajib dipilih.',
            'interest_category.required' => 'Kategori pendaftar wajib dipilih.',
            'operating_status.required' => 'Status kegiatan saat ini wajib dipilih.',
            'offering_type.required' => 'Jenis produk / layanan wajib dipilih.',
            'goals.required' => 'Pilih minimal satu tujuan mengikuti program.',
            'goals.min' => 'Pilih minimal satu tujuan mengikuti program.',
            'consent_data.accepted' => 'Anda harus menyetujui pengelolaan data sesuai Kebijakan Privasi.',
            'consent_stage1_ack.accepted' => 'Anda harus mengonfirmasi pemahaman bahwa pendaftaran Tahap 1 bukan proses penetapan kandidat 500 Brand Go Global.',
            'consent_skolah_transfer.accepted' => 'Anda harus menyetujui penerusan data ke Skolah.com untuk akses pembelajaran.',
        ];
    }
}
