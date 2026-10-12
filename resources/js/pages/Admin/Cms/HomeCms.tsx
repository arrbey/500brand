import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { BrandLogo } from '@/components/BrandLogo';

interface FaqItem {
  q: string;
  a: string;
}

interface PillarItem {
  number: string;
  title: string;
  desc: string;
  tag: string;
}

interface GalleryPhotoItem {
  src: string;
  alt?: string;
}

interface HomeCmsProps {
  content: {
    site_logo?: {
      logo_image?: string;
      logo_image_dark?: string;
      favicon_url?: string;
      badge_number?: string;
      badge_circle?: string;
      brand_name?: string;
      brand_name_highlight?: string;
      tagline?: string;
      show_text_with_image?: boolean;
      height_px?: number | string;
    };
    hero?: {
      eyebrow?: string;
      title_prefix?: string;
      title_highlight?: string;
      subtitle?: string;
      cta_primary_text?: string;
      cta_primary_link?: string;
      cta_secondary_text?: string;
      cta_secondary_link?: string;
      target_count?: string;
      target_period?: string;
      target_reach?: string;
      hero_image?: string;
      hero_image_tag?: string;
      hero_caption_title?: string;
      hero_caption_desc?: string;
      hero_caption_credit?: string;
    };
    news_bar?: {
      label?: string;
      title?: string;
      source?: string;
      link?: string;
    };
    about?: {
      eyebrow?: string;
      title?: string;
      desc_1?: string;
      desc_2?: string;
      quote?: string;
      quote_author?: string;
      quote_role?: string;
      metric_1_num?: string;
      metric_1_label?: string;
      metric_1_desc?: string;
      metric_2_num?: string;
      metric_2_label?: string;
      metric_2_desc?: string;
      metric_3_num?: string;
      metric_3_label?: string;
      metric_3_desc?: string;
      main_photo?: string;
      sub_photo_1?: string;
      sub_photo_2?: string;
    };
    gallery_photos?: GalleryPhotoItem[];
    pillars?: PillarItem[];
    faq?: FaqItem[];
    contact?: {
      whatsapp?: string;
      whatsapp_display?: string;
      whatsapp_2?: string;
      whatsapp_2_display?: string;
      email?: string;
      email_2?: string;
      phone?: string;
      address?: string;
      working_hours?: string;
    };
    social_media?: {
      instagram?: string;
      linkedin?: string;
      youtube?: string;
      tiktok?: string;
      facebook?: string;
      website_arrbey?: string;
      website_sekolahekspor?: string;
    };
  };
  existingImages?: string[];
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function HomeCms({ content, existingImages = [], flash }: HomeCmsProps) {
  const [activeTab, setActiveTab] = useState<'logo' | 'hero' | 'about' | 'media' | 'pillars' | 'faq' | 'contact'>('logo');

  const { data, setData, post, processing } = useForm({
    site_logo: {
      logo_image: content.site_logo?.logo_image || '',
      logo_image_dark: content.site_logo?.logo_image_dark || '',
      favicon_url: content.site_logo?.favicon_url || '',
      badge_number: content.site_logo?.badge_number || '5',
      badge_circle: content.site_logo?.badge_circle || '0',
      brand_name: content.site_logo?.brand_name || '500 BRAND',
      brand_name_highlight: content.site_logo?.brand_name_highlight || 'GLOBAL',
      tagline: content.site_logo?.tagline || 'NATIONAL BRAND TRANSFORMATION PORTAL',
      show_text_with_image: Boolean(content.site_logo?.show_text_with_image),
      height_px: content.site_logo?.height_px || '38',
    },
    hero: {
      eyebrow: content.hero?.eyebrow || 'Program Nasional 500 Brand Go Global • 2026–2029',
      title_prefix: content.hero?.title_prefix || 'Dari Brand Nasional Menjadi',
      title_highlight: content.hero?.title_highlight || 'Brand Global.',
      subtitle: content.hero?.subtitle || 'Membangun merek Indonesia yang kuat, kompetitif, dan siap mendunia melalui transformasi brand, pengembangan talenta, pembelajaran, dan akses pasar internasional.',
      cta_primary_text: content.hero?.cta_primary_text || 'Bergabung dengan Program',
      cta_primary_link: content.hero?.cta_primary_link || '/daftar',
      cta_secondary_text: content.hero?.cta_secondary_text || 'Jelajahi Program ↓',
      cta_secondary_link: content.hero?.cta_secondary_link || '#program',
      target_count: content.hero?.target_count || '500 brand',
      target_period: content.hero?.target_period || '2026–2029',
      target_reach: content.hero?.target_reach || 'pasar global',
      hero_image: content.hero?.hero_image || '/images/preview_img_1.jpeg',
      hero_image_tag: content.hero?.hero_image_tag || 'DOKUMENTASI AUDIENSI · 8 OKT 2024',
      hero_caption_title: content.hero?.hero_caption_title || 'Dialog pengembangan 500 Brand Go Global',
      hero_caption_desc: content.hero?.hero_caption_desc || 'Kepala Sekolah Ekspor bertemu Menteri Perdagangan RI, Jakarta, 8 Oktober 2024.',
      hero_caption_credit: content.hero?.hero_caption_credit || 'Foto: dokumentasi yang disediakan penyelenggara.',
    },
    news_bar: {
      label: content.news_bar?.label || 'BERITA TERBARU',
      title: content.news_bar?.title || 'Kemendag Publikasikan Audiensi Inisiatif 500 Brand Go Global',
      source: content.news_bar?.source || 'Kementerian Perdagangan RI · 8 Oktober 2024',
      link: content.news_bar?.link || 'https://www.kemendag.go.id/berita/foto/audiensi-kepala-sekolah-ekspor-nasional',
    },
    about: {
      eyebrow: content.about?.eyebrow || 'TENTANG INISIATIF',
      title: content.about?.title || 'Bukan Sekadar Ekspor Produk, Melainkan Membangun Brand Equity Bangsa',
      desc_1: content.about?.desc_1 || 'Indonesia memiliki kekayaan komoditas dan daya kreasi luar biasa, namun sebagian besar masih dijual dalam bentuk bahan mentah atau white-label tanpa kekuatan merek di kancah global. Inisiatif 500 Brand Global hadir membalik paradigma ini.',
      desc_2: content.about?.desc_2 || 'Digagas bersama oleh ARRBEY Branding dan Sekolah Ekspor Nasional, program ini dirancang sebagai akselerator komprehensif: memadukan riset pasar internasional, standardisasi kualitas, re-branding berdaya saing global, hingga agregasi rantai pasok dunia.',
      quote: content.about?.quote || 'Brand adalah benteng pertahanan ekonomi nasional. Ketika brand kita dihargai dunia, nilai tambah tertinggi akan tinggal dan mensejahterakan rakyat Indonesia.',
      quote_author: content.about?.quote_author || 'Handito Joewono',
      quote_role: content.about?.quote_role || 'Kepala Sekolah Ekspor Nasional & Inisiator 500 Brand Global',
      metric_1_num: content.about?.metric_1_num || '500',
      metric_1_label: content.about?.metric_1_label || 'Sasaran Brand',
      metric_1_desc: content.about?.metric_1_desc || 'Transformasi hingga 2029',
      metric_2_num: content.about?.metric_2_num || '100',
      metric_2_label: content.about?.metric_2_label || 'Fase Awal 2026',
      metric_2_desc: content.about?.metric_2_desc || 'Kurasi & inkubasi perdana',
      metric_3_num: content.about?.metric_3_num || '4',
      metric_3_label: content.about?.metric_3_label || 'Pilar Ekosistem',
      metric_3_desc: content.about?.metric_3_desc || 'Riset, LMS, Branding, Akses',
      main_photo: content.about?.main_photo || '/images/preview_img_2.jpeg',
      sub_photo_1: content.about?.sub_photo_1 || '/images/preview_img_3.jpeg',
      sub_photo_2: content.about?.sub_photo_2 || '/images/preview_img_4.jpeg',
    },
    gallery_photos: content.gallery_photos || [
      { src: '/images/preview_img_6.jpeg', alt: 'Audiensi Kemendag, foto 2' },
      { src: '/images/preview_img_7.jpeg', alt: 'Audiensi Kemendag, foto 3' },
      { src: '/images/preview_img_8.jpeg', alt: 'Audiensi Kemendag, foto 4' },
      { src: '/images/preview_img_9.jpeg', alt: 'Audiensi Kemendag, foto 5' },
    ],
    pillars: content.pillars || [
      { number: '01', title: 'Pelatihan Vokasi & LMS Terstruktur', desc: 'Kurikulum aplikatif manajemen ekspor dan branding melalui platform Skolah.com.', tag: 'LMS & Sertifikasi' },
      { number: '02', title: 'Inkubasi & Re-Branding Komprehensif', desc: 'Pendampingan langsung positioning merek, kemasan ramah lingkungan, standar kepatuhan regulasi.', tag: 'Strategi Brand' },
      { number: '03', title: 'Kurasi & Uji Standar Kelayakan', desc: 'Penilaian ketat atas konsistensi kapasitas produksi, kesiapan rantai pasok.', tag: 'Kurasi Mandiri' },
      { number: '04', title: 'Akselerasi Pasar & Showcase Internasional', desc: 'Fasilitasi business matching, partisipasi trade fair dunia, dan koneksi ke agregator diaspora.', tag: 'Akses Global' },
    ],
    faq: content.faq || [
      { q: 'Apakah 500 Brand Global merupakan website resmi Kementerian Perdagangan?', a: 'Bukan. Portal ini merupakan inisiatif ARRBEY Branding dan Sekolah Ekspor Nasional. Kementerian Perdagangan telah mempublikasikan audiensi terkait inisiatif tersebut pada 8 Oktober 2024.' },
      { q: 'Siapa yang dapat mengajukan minat mengikuti program?', a: 'Pemilik brand, pengelola UKM dan perusahaan, pelaku industri kreatif, serta organisasi yang membutuhkan penguatan merek atau pengembangan pasar.' },
      { q: 'Apakah 500 brand sudah menerima fasilitasi?', a: 'Belum ada klaim capaian pada halaman ini. Angka 500 adalah sasaran/target program untuk periode 2026–2029.' },
    ],
    contact: {
      whatsapp: content.contact?.whatsapp || '628119435300',
      whatsapp_display: content.contact?.whatsapp_display || '0811 943 5300',
      whatsapp_2: content.contact?.whatsapp_2 || '628118403477',
      whatsapp_2_display: content.contact?.whatsapp_2_display || '0811 840 3477',
      email: content.contact?.email || 'halo@arrbey.com',
      email_2: content.contact?.email_2 || 'halo@sekolahekspor.com',
      phone: content.contact?.phone || '+62 811-9435-300',
      address: content.contact?.address || 'Jakarta, Indonesia',
      working_hours: content.contact?.working_hours || 'Senin – Jumat (08:30 – 17:00 WIB)',
    },
    social_media: {
      instagram: content.social_media?.instagram || 'https://instagram.com/arrbey',
      linkedin: content.social_media?.linkedin || 'https://linkedin.com/company/arrbey',
      youtube: content.social_media?.youtube || 'https://youtube.com/@arrbey',
      tiktok: content.social_media?.tiktok || 'https://tiktok.com/@500brandglobal',
      facebook: content.social_media?.facebook || 'https://facebook.com/arrbeybranding',
      website_arrbey: content.social_media?.website_arrbey || 'https://www.arrbey.com',
      website_sekolahekspor: content.social_media?.website_sekolahekspor || 'https://www.sekolahekspor.com',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/cms/home', {
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    if (confirm('Yakin ingin mereset konten Home ke pengaturan default awal? Semua kustomisasi yang belum disimpan akan dikembalikan.')) {
      router.post('/admin/cms/reset/home');
    }
  };

  // FAQ Handlers
  const handleFaqChange = (index: number, field: 'q' | 'a', value: string) => {
    const nextFaq = [...data.faq];
    nextFaq[index][field] = value;
    setData('faq', nextFaq);
  };

  const handleAddFaq = () => {
    setData('faq', [...data.faq, { q: 'Pertanyaan baru?', a: 'Jawaban penjelasan pertanyaan...' }]);
  };

  const handleRemoveFaq = (index: number) => {
    setData('faq', data.faq.filter((_, i) => i !== index));
  };

  // Pillar Handlers
  const handlePillarChange = (index: number, field: keyof PillarItem, value: string) => {
    const nextPillars = [...data.pillars];
    nextPillars[index][field] = value;
    setData('pillars', nextPillars);
  };

  // Gallery Photos Handlers
  const handleGalleryPhotoChange = (index: number, field: keyof GalleryPhotoItem, val: string) => {
    const nextGallery = [...data.gallery_photos];
    nextGallery[index] = { ...nextGallery[index], [field]: val };
    setData('gallery_photos', nextGallery);
  };

  return (
    <AdminLayout title="CMS — Kelola Konten & Media Halaman Home">
      <Head title="CMS Halaman Home | Admin 500 Brand Global" />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Flash Notifications */}
        {flash?.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>{flash.success}</span>
            </div>
            <a href="/" target="_blank" className="underline hover:text-emerald-950 text-[12px]">
              Lihat di Homepage ↗
            </a>
          </div>
        )}

        {/* Top Header & Actions */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🌐</span>
              <h2 className="text-xl font-black text-[#071c36] tracking-tight">Editor Konten & Foto Halaman Home</h2>
            </div>
            <p className="text-[13px] text-[#5b7388] mt-1">
              Perubahan teks, upload gambar baru, galeri dokumentasi, FAQ, dan media langsung aktif secara real-time di website utama.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-[12.5px] font-bold text-[#55697d] transition-colors"
            >
              🔄 Reset ke Default
            </button>
            <a
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-[#eef5fa] hover:bg-[#dce9f5] text-[#0e4879] text-[12.5px] font-bold transition-colors"
            >
              ↗ Pratinjau Web
            </a>
            <button
              onClick={handleSubmit}
              disabled={processing}
              className="px-6 py-2.5 rounded-xl bg-[#0e4375] hover:bg-[#125391] text-white text-[12.5px] font-black transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : '💾 Simpan Perubahan'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#dce6f0] pb-3">
          {[
            { id: 'logo', label: '1. Logo & Identitas', icon: '🎨' },
            { id: 'hero', label: '2. Hero Banner', icon: '🎯' },
            { id: 'about', label: '3. Latar Belakang & Narasi', icon: '🏛️' },
            { id: 'media', label: '4. Foto & Galeri Dokumentasi', icon: '🖼️' },
            { id: 'pillars', label: '5. 4 Pilar Program', icon: '⚡' },
            { id: 'faq', label: '6. Tanya Jawab (FAQ)', icon: '❓' },
            { id: 'contact', label: '7. Kontak & Media Sosial', icon: '📞' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#0e4375] text-white shadow-sm'
                  : 'bg-white text-[#58728a] hover:bg-[#eef5fa] border border-[#e2eaf0]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: LOGO & BRAND IDENTITY */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              {/* Card 1 & 2 in grid: Image Uploaders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card 1: Logo Utama (Latar Terang / Navbar) */}
                <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-5">
                  <div className="border-b border-gray-100 pb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                        <span>🖼️</span>
                        <span>Logo Utama (Navbar / Latar Terang)</span>
                      </h3>
                      <p className="text-[12px] text-[#698299] mt-0.5">
                        Logo yang tampil di header utama website dan halaman berlatar terang.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                    <ImageUploader
                      label="File Gambar Logo Utama"
                      helperText="Unggah file logo (disarankan format .PNG transparan atau .SVG resolusi tinggi)."
                      value={data.site_logo.logo_image}
                      onChange={(url) => setData('site_logo', { ...data.site_logo, logo_image: url })}
                      existingImages={existingImages}
                      aspectRatio="aspect-video"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                        Tinggi Logo di Website (Pixel)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={20}
                          max={90}
                          value={data.site_logo.height_px}
                          onChange={(e) => setData('site_logo', { ...data.site_logo, height_px: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-[13px] bg-white font-mono"
                          placeholder="38"
                        />
                        <span className="text-xs text-gray-500 font-bold">px</span>
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1 block">Rekomendasi standar: 36 - 44px</span>
                    </div>

                    <div className="flex flex-col justify-end">
                      {data.site_logo.logo_image ? (
                        <button
                          type="button"
                          onClick={() => setData('site_logo', { ...data.site_logo, logo_image: '' })}
                          className="px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors text-center"
                        >
                          🗑️ Hapus Gambar (Pakai Badge Default)
                        </button>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-gray-50 text-[11px] text-gray-500 border border-gray-200 text-center">
                          ℹ️ Sedang memakai logo monogram bawaan
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card 2: Logo Latar Gelap (Footer & Admin) */}
                <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-5">
                  <div className="border-b border-gray-100 pb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                        <span>🌙</span>
                        <span>Logo Khusus Latar Gelap (Footer & Admin)</span>
                      </h3>
                      <p className="text-[12px] text-[#698299] mt-0.5">
                        Opsional: Logo versi warna putih/emas untuk bagian footer dan panel admin.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#071c36]/5 border border-[#071c36]/10">
                    <ImageUploader
                      label="File Gambar Logo Versi Latar Gelap"
                      helperText="Jika tidak diunggah, website otomatis menggunakan Logo Utama di samping."
                      value={data.site_logo.logo_image_dark}
                      onChange={(url) => setData('site_logo', { ...data.site_logo, logo_image_dark: url })}
                      existingImages={existingImages}
                      aspectRatio="aspect-video"
                    />
                  </div>

                  <div className="pt-2">
                    {data.site_logo.logo_image_dark ? (
                      <button
                        type="button"
                        onClick={() => setData('site_logo', { ...data.site_logo, logo_image_dark: '' })}
                        className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors"
                      >
                        🔄 Kosongkan (Ikuti Logo Utama)
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-500 italic block">
                        💡 Otomatis mengikuti logo utama karena belum ada logo khusus latar gelap.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Favicon: Ikon Tab Browser (Favicon Website) */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-5">
                <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                      <span>🌐</span>
                      <span>Favicon Website (Ikon Tab Browser)</span>
                    </h3>
                    <p className="text-[12px] text-[#698299] mt-0.5">
                      Ikon kecil yang tampil di tab browser, bookmark, dan shortcut perangkat saat pengunjung membuka website.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold bg-[#eef5fa] text-[#0c416e] px-2.5 py-1 rounded-full self-start sm:self-auto">
                    Format: .ico, .png, .svg, .webp
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left 7 cols: Uploader & Controls */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                      <ImageUploader
                        label="File Gambar Favicon (.ico / .png / .svg / .webp)"
                        helperText="Unggah icon persegi (1:1), disarankan resolusi 32x32 atau 48x48 pixel dengan latar belakang transparan."
                        value={data.site_logo.favicon_url}
                        onChange={(url) => setData('site_logo', { ...data.site_logo, favicon_url: url })}
                        existingImages={existingImages}
                        aspectRatio="aspect-square"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="text-[11.5px] text-gray-500">
                        {data.site_logo.favicon_url ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                            <span>✅</span>
                            <span>Favicon kustom aktif</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 italic flex items-center gap-1.5">
                            <span>ℹ️</span>
                            <span>Sedang menggunakan favicon default website (/favicon.ico)</span>
                          </span>
                        )}
                      </div>

                      {data.site_logo.favicon_url && (
                        <button
                          type="button"
                          onClick={() => setData('site_logo', { ...data.site_logo, favicon_url: '' })}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          🗑️ Hapus & Pakai Default
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right 5 cols: Live Browser Tab Mockup Preview */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-[#0b223d] to-[#071628] p-5 rounded-2xl border border-[#163c63] text-white space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#18426d] pb-2.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#f3b641]">
                        Simulasi Tab Browser Nyata
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                      </div>
                    </div>

                    {/* Realistic Chrome Tab Container */}
                    <div className="bg-[#102d4f] p-2.5 rounded-xl border border-[#1d4c7c] space-y-2.5">
                      {/* Simulated Tab Bar */}
                      <div className="flex items-center gap-1 bg-[#091e35] p-1.5 rounded-lg">
                        {/* Active Tab */}
                        <div className="flex items-center gap-2 bg-[#102d4f] px-3 py-1.5 rounded-md border-t-2 border-t-[#f3b641] max-w-[220px] shadow-sm">
                          {data.site_logo.favicon_url ? (
                            <img
                              src={data.site_logo.favicon_url}
                              alt="Favicon Tab"
                              className="w-4 h-4 object-contain rounded-xs flex-none"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/favicon.ico';
                              }}
                            />
                          ) : (
                            <div className="w-4 h-4 rounded-xs bg-[#071c36] border border-[#f3b641] text-[#f3b641] font-black text-[9px] flex items-center justify-center flex-none">
                              5
                            </div>
                          )}
                          <span className="text-[11px] font-semibold text-gray-200 truncate leading-none">
                            500 Brand Global — National...
                          </span>
                          <span className="text-[10px] text-gray-400 hover:text-white cursor-pointer ml-auto">
                            ✕
                          </span>
                        </div>
                        {/* Inactive Tab Mock */}
                        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-gray-400 text-[10.5px] truncate max-w-[120px]">
                          <span className="text-[10px]">🌐</span>
                          <span className="truncate">Google</span>
                        </div>
                      </div>

                      {/* URL Bar Simulation */}
                      <div className="bg-[#07172a] px-3 py-1.5 rounded-md text-[10.5px] text-gray-300 font-mono flex items-center justify-between border border-[#183d63]">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-emerald-400">🔒</span>
                          <span className="text-gray-400">https://</span>
                          <span className="text-white font-bold">500brandglobal.com</span>
                        </div>
                        <span className="text-[9px] text-[#f3b641] font-bold">LIVE</span>
                      </div>
                    </div>

                    {/* Multi-Size Icon Inspector */}
                    <div className="pt-2 border-t border-[#18426d] flex items-center justify-between text-[11px] text-[#8eaec9]">
                      <span>Ukuran Tampil:</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400">16px:</span>
                          <div className="w-5 h-5 p-0.5 bg-white/10 rounded-xs flex items-center justify-center border border-white/20">
                            {data.site_logo.favicon_url ? (
                              <img src={data.site_logo.favicon_url} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-[9px] font-black text-[#f3b641]">5</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400">32px:</span>
                          <div className="w-7 h-7 p-1 bg-white/10 rounded-xs flex items-center justify-center border border-white/20">
                            {data.site_logo.favicon_url ? (
                              <img src={data.site_logo.favicon_url} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-[11px] font-black text-[#f3b641]">5</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 & 4 in grid: Text Settings & Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card 3: Pengaturan Teks & Monogram */}
                <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-5">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                      <span>✏️</span>
                      <span>Teks Identitas Brand & Monogram</span>
                    </h3>
                    <p className="text-[12px] text-[#698299] mt-0.5">
                      Pengaturan teks nama merek, highlight warna emas, dan monogram cadangan.
                    </p>
                  </div>

                  {/* Toggle show text with image */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 cursor-pointer hover:bg-amber-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={data.site_logo.show_text_with_image}
                      onChange={(e) => setData('site_logo', { ...data.site_logo, show_text_with_image: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-[#0e4375] focus:ring-[#0e4375]"
                    />
                    <div>
                      <span className="text-[12.5px] font-extrabold text-[#784d08] block">
                        Tetap tampilkan teks nama brand di samping logo gambar
                      </span>
                      <span className="text-[11.5px] text-[#8e6522] block mt-0.5">
                        Centang opsi ini jika file logo Anda hanya berupa ikon/lambang simbol tanpa teks nama.
                      </span>
                    </div>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                        Nama Brand Utama
                      </label>
                      <input
                        type="text"
                        value={data.site_logo.brand_name}
                        onChange={(e) => setData('site_logo', { ...data.site_logo, brand_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white font-bold"
                        placeholder="500 BRAND"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                        Teks Highlight Emas
                      </label>
                      <input
                        type="text"
                        value={data.site_logo.brand_name_highlight}
                        onChange={(e) => setData('site_logo', { ...data.site_logo, brand_name_highlight: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white font-bold text-[#d48c19]"
                        placeholder="GLOBAL"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                        Tagline / Sub-teks Penjelas
                      </label>
                      <input
                        type="text"
                        value={data.site_logo.tagline}
                        onChange={(e) => setData('site_logo', { ...data.site_logo, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white text-gray-600"
                        placeholder="NATIONAL BRAND TRANSFORMATION PORTAL"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                        Angka Badge Monogram
                      </label>
                      <input
                        type="text"
                        maxLength={2}
                        value={data.site_logo.badge_number}
                        onChange={(e) => setData('site_logo', { ...data.site_logo, badge_number: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white font-black text-center"
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                        Angka Aksen Emas Monogram
                      </label>
                      <input
                        type="text"
                        maxLength={2}
                        value={data.site_logo.badge_circle}
                        onChange={(e) => setData('site_logo', { ...data.site_logo, badge_circle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white font-black text-center text-[#d48c19]"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 4: Live Interactive Preview */}
                <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-gray-100 pb-3">
                      <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                        <span>👁️</span>
                        <span>Pratinjau Hasil Logo (Live Preview)</span>
                      </h3>
                      <p className="text-[12px] text-[#698299] mt-0.5">
                        Tampilan nyata seketika bagaimana logo terlihat di berbagai latar website.
                      </p>
                    </div>

                    <div className="space-y-4 pt-3">
                      {/* Preview on Light Navbar */}
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                          Tampilan di Navbar / Latar Terang:
                        </span>
                        <div className="p-4 rounded-xl bg-white border-2 border-dashed border-gray-200 flex items-center min-h-[75px] shadow-xs">
                          <BrandLogo variant="light" overrideLogo={data.site_logo} />
                        </div>
                      </div>

                      {/* Preview on Dark Footer */}
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                          Tampilan di Footer & Sidebar Admin / Latar Gelap:
                        </span>
                        <div className="p-4 rounded-xl bg-[#071c36] border-2 border-dashed border-[#1a3d66] flex items-center min-h-[75px] shadow-inner">
                          <BrandLogo variant="dark" overrideLogo={data.site_logo} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-[11.5px] text-blue-800 leading-relaxed">
                    ✨ <strong>Sistem Otomatis:</strong> Saat logo disimpan, seluruh navigasi Navbar publik, Footer semua halaman, serta Sidebar panel Admin akan langsung menggunakan logo ini.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO */}
          {activeTab === 'hero' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#071c36]">Konfigurasi Bagian Hero Banner</h3>
                <p className="text-[12px] text-[#698299]">Banner utama paling atas yang pertama kali dilihat pengunjung.</p>
              </div>

              {/* Live Image Uploader for Hero Photo */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                <ImageUploader
                  label="Foto Utama Samping Hero Banner"
                  helperText="Unggah file foto baru dari laptop/komputer Anda, atau pilih salah satu foto dari galeri web."
                  value={data.hero.hero_image}
                  onChange={(url) => setData('hero', { ...data.hero, hero_image: url })}
                  existingImages={existingImages}
                  aspectRatio="aspect-[4/3]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Eyebrow / Sub-tag Atas</label>
                  <input
                    type="text"
                    value={data.hero.eyebrow}
                    onChange={(e) => setData('hero', { ...data.hero, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] focus:ring-2 focus:ring-[#0e4375]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Judul Utama (Prefix)</label>
                  <input
                    type="text"
                    value={data.hero.title_prefix}
                    onChange={(e) => setData('hero', { ...data.hero, title_prefix: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] focus:ring-2 focus:ring-[#0e4375]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Teks Sorotan Emas (Highlight)</label>
                  <input
                    type="text"
                    value={data.hero.title_highlight}
                    onChange={(e) => setData('hero', { ...data.hero, title_highlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] font-bold text-[#b58117] focus:ring-2 focus:ring-[#0e4375]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Deskripsi / Subtitle</label>
                  <textarea
                    rows={3}
                    value={data.hero.subtitle}
                    onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] focus:ring-2 focus:ring-[#0e4375]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Tombol Utama (Teks)</label>
                  <input
                    type="text"
                    value={data.hero.cta_primary_text}
                    onChange={(e) => setData('hero', { ...data.hero, cta_primary_text: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Tombol Utama (Link)</label>
                  <input
                    type="text"
                    value={data.hero.cta_primary_link}
                    onChange={(e) => setData('hero', { ...data.hero, cta_primary_link: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Tombol Sekunder (Teks)</label>
                  <input
                    type="text"
                    value={data.hero.cta_secondary_text}
                    onChange={(e) => setData('hero', { ...data.hero, cta_secondary_text: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Tombol Sekunder (Link)</label>
                  <input
                    type="text"
                    value={data.hero.cta_secondary_link}
                    onChange={(e) => setData('hero', { ...data.hero, cta_secondary_link: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Badge Sasaran 1</label>
                  <input
                    type="text"
                    value={data.hero.target_count}
                    onChange={(e) => setData('hero', { ...data.hero, target_count: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Badge Sasaran 2</label>
                  <input
                    type="text"
                    value={data.hero.target_period}
                    onChange={(e) => setData('hero', { ...data.hero, target_period: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Badge Sasaran 3</label>
                  <input
                    type="text"
                    value={data.hero.target_reach}
                    onChange={(e) => setData('hero', { ...data.hero, target_reach: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>
              </div>

              {/* Hero Caption Box */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-[#071c36] mb-3">Teks Keterangan & Caption Foto Hero</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Label Tag Foto (Pojok Atas)</label>
                    <input
                      type="text"
                      value={data.hero.hero_image_tag}
                      onChange={(e) => setData('hero', { ...data.hero, hero_image_tag: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Judul Keterangan Caption</label>
                    <input
                      type="text"
                      value={data.hero.hero_caption_title}
                      onChange={(e) => setData('hero', { ...data.hero, hero_caption_title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Deskripsi Caption Foto</label>
                    <input
                      type="text"
                      value={data.hero.hero_caption_desc}
                      onChange={(e) => setData('hero', { ...data.hero, hero_caption_desc: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>
                </div>
              </div>

              {/* News Bar */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-[#071c36] mb-3">Bar Berita / Pengumuman Teratas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Label Bar</label>
                    <input
                      type="text"
                      value={data.news_bar.label}
                      onChange={(e) => setData('news_bar', { ...data.news_bar, label: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Judul Berita</label>
                    <input
                      type="text"
                      value={data.news_bar.title}
                      onChange={(e) => setData('news_bar', { ...data.news_bar, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Sumber & Tanggal</label>
                    <input
                      type="text"
                      value={data.news_bar.source}
                      onChange={(e) => setData('news_bar', { ...data.news_bar, source: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Link Eksternal</label>
                    <input
                      type="text"
                      value={data.news_bar.link}
                      onChange={(e) => setData('news_bar', { ...data.news_bar, link: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT & METRICS */}
          {activeTab === 'about' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#071c36]">Latar Belakang & Pernyataan Inisiator</h3>
                <p className="text-[12px] text-[#698299]">Konten narasi visi, filosofi ekuitas brand, dan angka target capaian.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Judul Bagian</label>
                  <input
                    type="text"
                    value={data.about.title}
                    onChange={(e) => setData('about', { ...data.about, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Paragraf 1 (Latar Belakang)</label>
                  <textarea
                    rows={3}
                    value={data.about.desc_1}
                    onChange={(e) => setData('about', { ...data.about, desc_1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-bold text-[#1b3652] mb-1">Paragraf 2 (Akselerasi & Solusi)</label>
                  <textarea
                    rows={3}
                    value={data.about.desc_2}
                    onChange={(e) => setData('about', { ...data.about, desc_2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-3">
                  <label className="block text-[12.5px] font-bold text-[#8f5d0a]">Kutipan Inspirasi Inisiator</label>
                  <textarea
                    rows={2}
                    value={data.about.quote}
                    onChange={(e) => setData('about', { ...data.about, quote: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 text-[13px] italic bg-white"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#6d4608] block mb-1">Nama Tokoh</span>
                      <input
                        type="text"
                        value={data.about.quote_author}
                        onChange={(e) => setData('about', { ...data.about, quote_author: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-[12.5px] bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#6d4608] block mb-1">Jabatan / Peran</span>
                      <input
                        type="text"
                        value={data.about.quote_role}
                        onChange={(e) => setData('about', { ...data.about, quote_role: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-[12.5px] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Metrics Cards */}
                <div className="pt-3">
                  <h4 className="text-sm font-bold text-[#071c36] mb-3">3 Indikator / Statistik Utama</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                      <input
                        type="text"
                        placeholder="Angka (500)"
                        value={data.about.metric_1_num}
                        onChange={(e) => setData('about', { ...data.about, metric_1_num: e.target.value })}
                        className="w-full font-black text-lg px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={data.about.metric_1_label}
                        onChange={(e) => setData('about', { ...data.about, metric_1_label: e.target.value })}
                        className="w-full font-bold text-xs px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Keterangan singkat"
                        value={data.about.metric_1_desc}
                        onChange={(e) => setData('about', { ...data.about, metric_1_desc: e.target.value })}
                        className="w-full text-[11px] px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                      <input
                        type="text"
                        placeholder="Angka (100)"
                        value={data.about.metric_2_num}
                        onChange={(e) => setData('about', { ...data.about, metric_2_num: e.target.value })}
                        className="w-full font-black text-lg px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={data.about.metric_2_label}
                        onChange={(e) => setData('about', { ...data.about, metric_2_label: e.target.value })}
                        className="w-full font-bold text-xs px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Keterangan singkat"
                        value={data.about.metric_2_desc}
                        onChange={(e) => setData('about', { ...data.about, metric_2_desc: e.target.value })}
                        className="w-full text-[11px] px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                      <input
                        type="text"
                        placeholder="Angka (4)"
                        value={data.about.metric_3_num}
                        onChange={(e) => setData('about', { ...data.about, metric_3_num: e.target.value })}
                        className="w-full font-black text-lg px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={data.about.metric_3_label}
                        onChange={(e) => setData('about', { ...data.about, metric_3_label: e.target.value })}
                        className="w-full font-bold text-xs px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Keterangan singkat"
                        value={data.about.metric_3_desc}
                        onChange={(e) => setData('about', { ...data.about, metric_3_desc: e.target.value })}
                        className="w-full text-[11px] px-2.5 py-1 rounded border border-gray-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA & GALERI FOTO */}
          {activeTab === 'media' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#071c36]">Koleksi Foto & Galeri Dokumentasi Web</h3>
                  <p className="text-[12px] text-[#698299]">
                    Ganti atau upload foto dokumentasi resmi kapan saja dari komputer Anda.
                  </p>
                </div>
                <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
                  📸 Upload Langsung Aktif
                </span>
              </div>

              {/* Sub-Section 1: 3 Foto di Bagian Tentang */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-[#0c3358] uppercase tracking-wider">
                  1. Foto Dokumentasi Bagian Tentang
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Foto Utama Bersama */}
                  <div className="md:col-span-3 p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                    <ImageUploader
                      label="Foto Bersama Utama (Landscape Aspect 3:2)"
                      helperText="Foto besar delegasi audiensi bersama Menteri Perdagangan di bagian Tentang."
                      value={data.about.main_photo}
                      onChange={(url) => setData('about', { ...data.about, main_photo: url })}
                      existingImages={existingImages}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  {/* Foto Diskusi 1 */}
                  <div className="md:col-span-1 p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                    <ImageUploader
                      label="Foto Diskusi 1 (Sebelah Kiri)"
                      value={data.about.sub_photo_1}
                      onChange={(url) => setData('about', { ...data.about, sub_photo_1: url })}
                      existingImages={existingImages}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  {/* Foto Diskusi 2 */}
                  <div className="md:col-span-2 p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                    <ImageUploader
                      label="Foto Diskusi 2 (Sebelah Kanan)"
                      value={data.about.sub_photo_2}
                      onChange={(url) => setData('about', { ...data.about, sub_photo_2: url })}
                      existingImages={existingImages}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                </div>
              </div>

              {/* Sub-Section 2: 4 Foto Galeri Audiensi */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-black text-[#0c3358] uppercase tracking-wider">
                  2. 4 Foto Galeri Dokumentasi Audiensi Kemendag
                </h4>
                <p className="text-[12px] text-[#698299]">
                  4 thumbnail foto dokumentasi yang tampil di atas Berita Resmi Kemendag.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.gallery_photos.map((pic, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                      <ImageUploader
                        label={`Foto Dokumentasi #${idx + 1}`}
                        value={pic.src}
                        onChange={(url) => handleGalleryPhotoChange(idx, 'src', url)}
                        existingImages={existingImages}
                        aspectRatio="aspect-[16/10]"
                      />
                      <div>
                        <label className="block text-[11px] font-bold text-[#556e85] mb-1">Teks Keterangan (Alt)</label>
                        <input
                          type="text"
                          value={pic.alt || ''}
                          onChange={(e) => handleGalleryPhotoChange(idx, 'alt', e.target.value)}
                          placeholder={`Keterangan foto #${idx + 1}`}
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-[12px] bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PILLARS */}
          {activeTab === 'pillars' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#071c36]">4 Pilar Transformasi Brand Global</h3>
                <p className="text-[12px] text-[#698299]">Metodologi utama program akselerasi merek ke pasar ekspor.</p>
              </div>

              <div className="space-y-4">
                {data.pillars.map((pillar, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#dce7f0] bg-[#f9fbfd] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#0e4375] text-white font-black text-xs grid place-items-center">
                          {pillar.number}
                        </span>
                        <span className="text-[13px] font-black text-[#071c36]">Pilar {i + 1}</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Tag Badge (e.g. LMS & Sertifikasi)"
                        value={pillar.tag}
                        onChange={(e) => handlePillarChange(i, 'tag', e.target.value)}
                        className="text-[11px] font-bold px-2 py-1 rounded border border-gray-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-bold text-[#35526e] mb-1">Judul Pilar</label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => handlePillarChange(i, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[13px] font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-bold text-[#35526e] mb-1">Deskripsi Pilar</label>
                      <textarea
                        rows={2}
                        value={pillar.desc}
                        onChange={(e) => handlePillarChange(i, 'desc', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-[#071c36]">Tanya Jawab Populer (FAQ)</h3>
                  <p className="text-[12px] text-[#698299]">Pertanyaan yang sering ditanyakan di bagian bawah halaman beranda.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] flex items-center gap-1.5 transition-colors"
                >
                  <span>+</span>
                  <span>Tambah Pertanyaan Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.faq.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-extrabold text-[#0e4375]">Pertanyaan #{i + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(i)}
                        className="text-[11px] text-red-600 hover:text-red-800 font-bold px-2 py-0.5 rounded hover:bg-red-50"
                      >
                        Hapus FAQ
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Tuliskan pertanyaan..."
                      value={item.q}
                      onChange={(e) => handleFaqChange(i, 'q', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 font-bold text-[13px] bg-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Tuliskan jawaban..."
                      value={item.a}
                      onChange={(e) => handleFaqChange(i, 'a', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & SOCIAL MEDIA */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              {/* Card 1: Kontak Resmi & WhatsApp */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                    <span>📞</span>
                    <span>Informasi Kontak & Layanan WhatsApp</span>
                  </h3>
                  <p className="text-[12px] text-[#698299]">
                    Kanal narahubung resmi yang ditampilkan di footer website, halaman kontak, dan tombol chat cepat.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* WhatsApp 1 */}
                  <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e4ecf3] space-y-3">
                    <span className="text-[12px] font-extrabold text-[#0c416e] block">
                      💬 WhatsApp Utama #1
                    </span>
                    <div>
                      <label className="block text-[11.5px] font-bold text-[#1b3652] mb-1">
                        Nomor API (Awali 62, tanpa + atau 0)
                      </label>
                      <input
                        type="text"
                        value={data.contact.whatsapp}
                        onChange={(e) => setData('contact', { ...data.contact, whatsapp: e.target.value })}
                        placeholder="628119435300"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-bold text-[#1b3652] mb-1">
                        Teks Tampilan di Website
                      </label>
                      <input
                        type="text"
                        value={data.contact.whatsapp_display}
                        onChange={(e) => setData('contact', { ...data.contact, whatsapp_display: e.target.value })}
                        placeholder="0811 943 5300"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* WhatsApp 2 */}
                  <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e4ecf3] space-y-3">
                    <span className="text-[12px] font-extrabold text-[#0c416e] block">
                      💬 WhatsApp Cadangan #2
                    </span>
                    <div>
                      <label className="block text-[11.5px] font-bold text-[#1b3652] mb-1">
                        Nomor API (Awali 62, tanpa + atau 0)
                      </label>
                      <input
                        type="text"
                        value={data.contact.whatsapp_2}
                        onChange={(e) => setData('contact', { ...data.contact, whatsapp_2: e.target.value })}
                        placeholder="628118403477"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-bold text-[#1b3652] mb-1">
                        Teks Tampilan di Website
                      </label>
                      <input
                        type="text"
                        value={data.contact.whatsapp_2_display}
                        onChange={(e) => setData('contact', { ...data.contact, whatsapp_2_display: e.target.value })}
                        placeholder="0811 840 3477"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* Email 1 */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      ✉️ Email Utama (ARRBEY Branding)
                    </label>
                    <input
                      type="email"
                      value={data.contact.email}
                      onChange={(e) => setData('contact', { ...data.contact, email: e.target.value })}
                      placeholder="halo@arrbey.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  {/* Email 2 */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      ✉️ Email Kedua (Sekolah Ekspor Nasional)
                    </label>
                    <input
                      type="email"
                      value={data.contact.email_2}
                      onChange={(e) => setData('contact', { ...data.contact, email_2: e.target.value })}
                      placeholder="halo@sekolahekspor.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  {/* Telepon Display */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      ☎️ Nomor Telepon Display Kantor
                    </label>
                    <input
                      type="text"
                      value={data.contact.phone}
                      onChange={(e) => setData('contact', { ...data.contact, phone: e.target.value })}
                      placeholder="+62 811-9435-300"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  {/* Jam Operasional */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      ⏰ Jam Operasional Layanan
                    </label>
                    <input
                      type="text"
                      value={data.contact.working_hours}
                      onChange={(e) => setData('contact', { ...data.contact, working_hours: e.target.value })}
                      placeholder="Senin – Jumat (08:30 – 17:00 WIB)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  {/* Alamat Kantor */}
                  <div className="md:col-span-2">
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      📍 Alamat Kantor / Sekretariat
                    </label>
                    <input
                      type="text"
                      value={data.contact.address}
                      onChange={(e) => setData('contact', { ...data.contact, address: e.target.value })}
                      placeholder="Jakarta, Indonesia"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Media Sosial & Tautan Ekosistem */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#071c36] flex items-center gap-2">
                    <span>🌐</span>
                    <span>Tautan Media Sosial & Website Resmi</span>
                  </h3>
                  <p className="text-[12px] text-[#698299]">
                    Ikon media sosial dan tautan website resmi di bagian footer serta kanal publikasi gerakan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      📸 Instagram URL
                    </label>
                    <input
                      type="url"
                      value={data.social_media.instagram}
                      onChange={(e) => setData('social_media', { ...data.social_media, instagram: e.target.value })}
                      placeholder="https://instagram.com/arrbey"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      💼 LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={data.social_media.linkedin}
                      onChange={(e) => setData('social_media', { ...data.social_media, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/arrbey"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      🎥 YouTube Channel URL
                    </label>
                    <input
                      type="url"
                      value={data.social_media.youtube}
                      onChange={(e) => setData('social_media', { ...data.social_media, youtube: e.target.value })}
                      placeholder="https://youtube.com/@arrbey"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      🎵 TikTok URL
                    </label>
                    <input
                      type="url"
                      value={data.social_media.tiktok}
                      onChange={(e) => setData('social_media', { ...data.social_media, tiktok: e.target.value })}
                      placeholder="https://tiktok.com/@500brandglobal"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      👥 Facebook Page URL
                    </label>
                    <input
                      type="url"
                      value={data.social_media.facebook}
                      onChange={(e) => setData('social_media', { ...data.social_media, facebook: e.target.value })}
                      placeholder="https://facebook.com/arrbeybranding"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      🏛️ Website ARRBEY Branding
                    </label>
                    <input
                      type="url"
                      value={data.social_media.website_arrbey}
                      onChange={(e) => setData('social_media', { ...data.social_media, website_arrbey: e.target.value })}
                      placeholder="https://www.arrbey.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[12px] font-bold text-[#1b3652] mb-1">
                      🎓 Website Sekolah Ekspor Nasional
                    </label>
                    <input
                      type="url"
                      value={data.social_media.website_sekolahekspor}
                      onChange={(e) => setData('social_media', { ...data.social_media, website_sekolahekspor: e.target.value })}
                      placeholder="https://www.sekolahekspor.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-[13px] bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Save Bar */}
          <div className="sticky bottom-4 bg-[#071c36] text-white p-4 rounded-2xl shadow-xl flex items-center justify-between border border-[#173e65] z-30">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f3b641] animate-pulse"></span>
              <span className="text-[12.5px] text-[#c4dcf2] font-semibold">
                Perubahan gambar dan teks yang disimpan langsung terlihat di beranda utama.
              </span>
            </div>
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2.5 rounded-xl bg-[#f3b641] hover:bg-[#ffca5b] text-[#071c36] font-black text-[13px] shadow transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : '💾 Simpan Perubahan Konten & Foto'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
