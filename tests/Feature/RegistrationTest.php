<?php

namespace Tests\Feature;

use App\Models\Registration;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    public function test_registration_page_can_be_rendered(): void
    {
        $response = $this->get('/daftar');
        $response->assertStatus(200);
    }

    public function test_user_can_submit_valid_registration(): void
    {
        $payload = [
            'full_name' => 'Budi Santoso',
            'email' => 'budi.santoso@example.com',
            'whatsapp' => '081234567890',
            'province' => 'Jawa Barat',
            'city' => 'Bandung',
            'interest_category' => 'UMKM / pelaku usaha',
            'role' => 'Founder & CEO',
            'operating_status' => 'aktif',
            'organization_name' => 'PT Kopi Nusantara Raya',
            'entity_type' => 'PT',
            'sector' => 'Makanan dan Minuman',
            'founded_year' => 2021,
            'business_scale' => 'Usaha Kecil',
            'website_social' => 'instagram.com/kopinusantara',
            'organization_description' => 'Produsen kopi arabika specialty premium.',
            'offering_type' => 'Produk Fisik / Barang Konsumsi',
            'offering_name' => 'Kopi Arabika Java Preanger',
            'offering_description' => 'Kopi biji sangrai aroma floral standar ekspor.',
            'current_market' => 'Nasional',
            'existing_brand' => 'Sudah mempunyai brand',
            'brand_name' => 'Preanger Gold',
            'goals' => [
                'Belajar branding dan strategi menuju pasar global',
                'Mempelajari ekspor dan penetrasi pasar internasional',
            ],
            'expectation' => 'Mendapatkan akses jaringan buyer internasional.',
            'consent_data' => true,
            'consent_stage1_ack' => true,
            'consent_skolah_transfer' => true,
            'consent_marketing' => true,
        ];

        $response = $this->post('/daftar', $payload);

        $response->assertRedirect('/pendaftaran-berhasil');

        $this->assertDatabaseHas('registrations', [
            'status' => 'submitted',
        ]);

        $this->assertDatabaseHas('registrant_profiles', [
            'full_name' => 'Budi Santoso',
            'email' => 'budi.santoso@example.com',
            'province_name' => 'Jawa Barat',
            'city_name' => 'Bandung',
        ]);

        $this->assertDatabaseHas('organizations', [
            'name' => 'PT Kopi Nusantara Raya',
        ]);

        $this->assertDatabaseHas('offerings', [
            'type' => 'Produk Fisik / Barang Konsumsi',
            'brand_name' => 'Preanger Gold',
        ]);

        $registration = Registration::first();
        $this->assertNotNull($registration->registration_code);
        $this->assertStringStartsWith('PBG-', $registration->registration_code);
    }

    public function test_validation_fails_if_consents_not_accepted(): void
    {
        $payload = [
            'full_name' => 'Andi Wijaya',
            'email' => 'andi@example.com',
            'whatsapp' => '081298765432',
            'province' => 'DKI Jakarta',
            'city' => 'Jakarta Selatan',
            'interest_category' => 'UMKM / pelaku usaha',
            'operating_status' => 'aktif',
            'offering_type' => 'Produk Fisik / Barang Konsumsi',
            'goals' => ['Belajar branding dan strategi menuju pasar global'],
            // Consents omitted
        ];

        $response = $this->post('/daftar', $payload);
        $response->assertSessionHasErrors(['consent_data', 'consent_stage1_ack', 'consent_skolah_transfer']);
    }

    public function test_admin_can_access_dashboard_when_authenticated(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->get('/admin');
        $response->assertStatus(200);
    }
}
