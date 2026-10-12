<?php

namespace Database\Seeders;

use App\Models\CmsSetting;
use Illuminate\Database\Seeder;

class CmsSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. HOME CMS PAYLOAD
        $homeData = [
            'hero' => [
                'eyebrow' => 'Program Nasional 500 Brand Go Global • 2026–2029',
                'title_prefix' => 'Dari Brand Nasional Menjadi',
                'title_highlight' => 'Brand Global.',
                'subtitle' => 'Membangun merek Indonesia yang kuat, kompetitif, dan siap mendunia melalui transformasi brand, pengembangan talenta, pembelajaran, dan akses pasar internasional.',
                'cta_primary_text' => 'Bergabung dengan Program',
                'cta_primary_link' => '/daftar',
                'cta_secondary_text' => 'Jelajahi Program ↓',
                'cta_secondary_link' => '#program',
                'target_count' => '500 brand',
                'target_period' => '2026–2029',
                'target_reach' => 'pasar global',
                'hero_image' => '/images/preview_img_1.jpeg',
                'hero_image_tag' => 'DOKUMENTASI AUDIENSI · 8 OKT 2024',
                'hero_caption_title' => 'Dialog pengembangan 500 Brand Go Global',
                'hero_caption_desc' => 'Kepala Sekolah Ekspor bertemu Menteri Perdagangan RI, Jakarta, 8 Oktober 2024.',
                'hero_caption_credit' => 'Foto: dokumentasi yang disediakan penyelenggara.',
            ],
            'news_bar' => [
                'label' => 'BERITA TERBARU',
                'title' => 'Kemendag Publikasikan Audiensi Inisiatif 500 Brand Go Global',
                'source' => 'Kementerian Perdagangan RI · 8 Oktober 2024',
                'link' => 'https://www.kemendag.go.id/berita/foto/audiensi-kepala-sekolah-ekspor-nasional',
            ],
            'about' => [
                'eyebrow' => 'TENTANG INISIATIF',
                'title' => 'Bukan Sekadar Ekspor Produk, Melainkan Membangun Brand Equity Bangsa',
                'desc_1' => 'Indonesia memiliki kekayaan komoditas dan daya kreasi luar biasa, namun sebagian besar masih dijual dalam bentuk bahan mentah atau white-label tanpa kekuatan merek di kancah global. Inisiatif 500 Brand Global hadir membalik paradigma ini.',
                'desc_2' => 'Digagas bersama oleh ARRBEY Branding dan Sekolah Ekspor Nasional, program ini dirancang sebagai akselerator komprehensif: memadukan riset pasar internasional, standardisasi kualitas, re-branding berdaya saing global, hingga agregasi rantai pasok dunia.',
                'quote' => 'Brand adalah benteng pertahanan ekonomi nasional. Ketika brand kita dihargai dunia, nilai tambah tertinggi akan tinggal dan mensejahterakan rakyat Indonesia.',
                'quote_author' => 'Handito Joewono',
                'quote_role' => 'Kepala Sekolah Ekspor Nasional & Inisiator 500 Brand Global',
                'metric_1_num' => '500',
                'metric_1_label' => 'Sasaran Brand',
                'metric_1_desc' => 'Transformasi hingga 2029',
                'metric_2_num' => '100',
                'metric_2_label' => 'Fase Awal 2026',
                'metric_2_desc' => 'Kurasi & inkubasi perdana',
                'metric_3_num' => '4',
                'metric_3_label' => 'Pilar Ekosistem',
                'metric_3_desc' => 'Riset, LMS, Branding, Akses',
            ],
            'pillars' => [
                [
                    'number' => '01',
                    'title' => 'Pelatihan Vokasi & LMS Terstruktur',
                    'desc' => 'Kurikulum aplikatif manajemen ekspor dan branding melalui platform Skolah.com dengan instruktur praktisi berpengalaman puluhan tahun.',
                    'tag' => 'LMS & Sertifikasi',
                ],
                [
                    'number' => '02',
                    'title' => 'Inkubasi & Re-Branding Komprehensif',
                    'desc' => 'Pendampingan langsung positioning merek, kemasan ramah lingkungan, standar kepatuhan regulasi ekspor, dan perlindungan HKI global.',
                    'tag' => 'Strategi Brand',
                ],
                [
                    'number' => '03',
                    'title' => 'Kurasi & Uji Standar Kelayakan',
                    'desc' => 'Penilaian ketat atas konsistensi kapasitas produksi, kesiapan rantai pasok, dan diferensiasi produk sebelum dipertemukan buyer.',
                    'tag' => 'Kurasi Mandiri',
                ],
                [
                    'number' => '04',
                    'title' => 'Akselerasi Pasar & Showcase Internasional',
                    'desc' => 'Fasilitasi business matching, partisipasi trade fair dunia, dan koneksi ke agregator diaspora di pasar sasaran Amerika, Eropa, Asia, dan Timur Tengah.',
                    'tag' => 'Akses Global',
                ],
            ],
            'faq' => [
                [
                    'q' => 'Apakah 500 Brand Global merupakan website resmi Kementerian Perdagangan?',
                    'a' => 'Bukan. Portal ini merupakan inisiatif ARRBEY Branding dan Sekolah Ekspor Nasional. Kementerian Perdagangan telah mempublikasikan audiensi terkait inisiatif tersebut pada 8 Oktober 2024. Penggunaan foto audiensi dan tautan berita resmi tidak menyatakan status program sebagai program resmi pemerintah.',
                ],
                [
                    'q' => 'Siapa yang dapat mengajukan minat mengikuti program?',
                    'a' => 'Pemilik brand, pengelola UKM dan perusahaan, pelaku industri kreatif, serta organisasi yang membutuhkan penguatan merek atau pengembangan pasar. Persyaratan, kuota, dan hasil seleksi akan dijelaskan pada pengumuman resmi program.',
                ],
                [
                    'q' => 'Apakah 500 brand sudah menerima fasilitasi?',
                    'a' => 'Belum ada klaim capaian pada halaman ini. Angka 500 adalah sasaran/target program untuk periode 2026–2029, sedangkan sasaran tahap awal 2026 adalah 100 brand.',
                ],
                [
                    'q' => 'Kapan Academy dan dashboard peserta tersedia?',
                    'a' => 'Portal publik menjadi tahap pertama. Materi pembelajaran, akun peserta, monitoring, dan showcase merupakan pengembangan tahap berikutnya setelah sistem, kurikulum, serta tata kelola data siap.',
                ],
                [
                    'q' => 'Di mana pelatihan vokasi dan uji kompetensi diselenggarakan?',
                    'a' => 'Pembelajaran terstruktur (LMS) dan uji kompetensi sertifikasi peserta dilaksanakan secara terpusat melalui platform mitra resmi Skolah.com.',
                ],
            ],
            'contact' => [
                'whatsapp' => '628119435300',
                'whatsapp_display' => '0811 943 5300',
                'whatsapp_2' => '628118403477',
                'whatsapp_2_display' => '0811 840 3477',
                'email' => 'halo@arrbey.com',
                'email_2' => 'halo@sekolahekspor.com',
                'phone' => '+62 811-9435-300',
                'address' => 'Jakarta, Indonesia',
                'working_hours' => 'Senin – Jumat (08:30 – 17:00 WIB)',
            ],
            'social_media' => [
                'instagram' => 'https://instagram.com/arrbey',
                'linkedin' => 'https://linkedin.com/company/arrbey',
                'youtube' => 'https://youtube.com/@arrbey',
                'tiktok' => 'https://tiktok.com/@500brandglobal',
                'facebook' => 'https://facebook.com/arrbeybranding',
                'website_arrbey' => 'https://www.arrbey.com',
                'website_sekolahekspor' => 'https://www.sekolahekspor.com',
            ],
            'site_logo' => [
                'logo_image' => '',
                'logo_image_dark' => '',
                'badge_number' => '5',
                'badge_circle' => '0',
                'brand_name' => '500 BRAND',
                'brand_name_highlight' => 'GLOBAL',
                'tagline' => 'NATIONAL BRAND TRANSFORMATION PORTAL',
                'show_text_with_image' => false,
                'height_px' => '38',
            ],
        ];

        CmsSetting::setPayload('homepage_content', $homeData, 'home');

        // 2. REGISTRATION FORM CMS PAYLOAD
        $formData = [
            'header' => [
                'badge' => 'PENDAFTARAN TAHAP 1 RESMI DIBUKA',
                'title' => 'Formulir Peminat Program 500 Brand Global',
                'subtitle' => 'Tahap 1: Pendataan Minat, Profil Usaha, & Kebutuhan Akselerasi Ekspor 2026',
                'period_text' => 'Periode Pendaftaran Terbuka',
                'slot_text' => 'Kuota Kurasi Awal 100 Brand',
            ],
            'step_labels' => [
                'step1_title' => 'Identitas & Domisili',
                'step1_desc' => 'Data kontak resmi dan kategori pendaftar',
                'step2_title' => 'Profil Usaha / Lembaga',
                'step2_desc' => 'Legalitas, sektor, skala, dan operasional',
                'step3_title' => 'Produk & Sasaran Program',
                'step3_desc' => 'Kesiapan brand, tujuan, dan persetujuan',
            ],
            'interest_categories' => [
                'UMKM / Pelaku Usaha Mandiri',
                'Perusahaan / Startup / Koperasi',
                'Asosiasi Usaha / Organisasi Profesi',
                'Komunitas Kreatif / Lembaga Yayasan',
                'Pemerintah Daerah / Instansi Terkait',
                'Perguruan Tinggi / Lembaga Riset & Pendidikan',
                'Calon Wirausaha / Perintis Ide Baru',
                'Individu Profesional / Kreator Independen',
                'Lainnya',
            ],
            'goal_options' => [
                ['id' => 'rebranding', 'text' => 'Menguasai strategi re-branding & positioning kelas dunia'],
                ['id' => 'identity', 'text' => 'Membangun identitas merek baru berstandar ekspor dari nol'],
                ['id' => 'export-rules', 'text' => 'Membedah regulasi ekspor & cara menembus buyer internasional'],
                ['id' => 'packaging', 'text' => 'Elevasi desain kemasan ramah lingkungan berstandar ritel modern'],
                ['id' => 'network', 'text' => 'Membuka jejaring kemitraan dengan agregator ekspor & komunitas global'],
                ['id' => 'compliance', 'text' => 'Mempersiapkan kepatuhan standar & sertifikasi pasar internasional'],
                ['id' => 'competency', 'text' => 'Mendapatkan akses pembelajaran terarah & uji sertifikasi profesi branding'],
            ],
            'operating_status_options' => [
                ['value' => 'sudah', 'label' => 'Sudah Beroperasi Aktif', 'desc' => 'Usaha sudah berjalan dan memiliki transaksi/produk'],
                ['value' => 'rintisan', 'label' => 'Rintisan / Pre-Revenue', 'desc' => 'Tahap prototype, validasi produk, atau persiapan awal'],
                ['value' => 'belum', 'label' => 'Calon Usaha / Belum Beroperasi', 'desc' => 'Ide bisnis baru, riset kampus, atau aspirasi pribadi'],
            ],
            'offering_type_options' => [
                ['value' => 'produk_fisik', 'label' => 'Produk Fisik (Barang Jadi / Olahan / Kerajinan)'],
                ['value' => 'jasa_layanan', 'label' => 'Jasa / Layanan Kreatif & Profesional'],
                ['value' => 'keduanya', 'label' => 'Kombinasi Produk & Jasa'],
            ],
            'current_market_options' => [
                'Lokal / Sekitar Domisili',
                'Regional Provinsi',
                'Nasional (Antar Pulau)',
                'Sudah Pernah Ekspor Skala Kecil',
                'Eksportir Aktif',
                'Belum Memiliki Pasar',
            ],
            'brand_status_options' => [
                'Sudah mempunyai brand',
                'Brand sedang dikembangkan',
                'Belum mempunyai brand (White Label / Maklon)',
                'Belum ada (Masih tahap ide)',
            ],
            'consent_texts' => [
                'consent_data' => 'Saya menyetujui pengelolaan data untuk keperluan pendaftaran dan komunikasi program sesuai Kebijakan Privasi.',
                'consent_stage1_ack' => 'Saya memahami bahwa pendaftaran Tahap 1 adalah pendaftaran peminat dan bukan proses penetapan kandidat 500 Brand Go Global.',
                'consent_skolah_transfer' => 'Saya menyetujui penerusan data yang diperlukan ke platform pembelajaran Skolah.com untuk administrasi dan akses pembelajaran sesuai ketentuan.',
                'consent_marketing' => 'Saya bersedia menerima pembaruan kegiatan dan materi pembelajaran melalui WhatsApp atau email (opsional).',
            ],
        ];

        CmsSetting::setPayload('form_content', $formData, 'form');
    }
}
