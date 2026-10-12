import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/AdminLayout';

interface GoalOption {
  id: string;
  text: string;
}

interface OperatingStatusOption {
  value: string;
  label: string;
  desc: string;
}

interface OfferingTypeOption {
  value: string;
  label: string;
}

interface FormCmsProps {
  content: {
    header?: {
      badge?: string;
      title?: string;
      subtitle?: string;
      period_text?: string;
      slot_text?: string;
    };
    step_labels?: {
      step1_title?: string;
      step1_desc?: string;
      step2_title?: string;
      step2_desc?: string;
      step3_title?: string;
      step3_desc?: string;
    };
    interest_categories?: string[];
    goal_options?: GoalOption[];
    operating_status_options?: OperatingStatusOption[];
    offering_type_options?: OfferingTypeOption[];
    current_market_options?: string[];
    brand_status_options?: string[];
    consent_texts?: {
      consent_data?: string;
      consent_stage1_ack?: string;
      consent_skolah_transfer?: string;
      consent_marketing?: string;
    };
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function FormCms({ content, flash }: FormCmsProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'categories' | 'goals' | 'status_offering' | 'consents'>('categories');

  const { data, setData, post, processing } = useForm({
    header: {
      badge: content.header?.badge || 'PENDAFTARAN TAHAP 1 RESMI DIBUKA',
      title: content.header?.title || 'Formulir Peminat Program 500 Brand Global',
      subtitle: content.header?.subtitle || 'Tahap 1: Pendataan Minat, Profil Usaha, & Kebutuhan Akselerasi Ekspor 2026',
      period_text: content.header?.period_text || 'Periode Pendaftaran Terbuka',
      slot_text: content.header?.slot_text || 'Kuota Kurasi Awal 100 Brand',
    },
    step_labels: {
      step1_title: content.step_labels?.step1_title || 'Identitas & Domisili',
      step1_desc: content.step_labels?.step1_desc || 'Data kontak resmi dan kategori pendaftar',
      step2_title: content.step_labels?.step2_title || 'Profil Usaha / Lembaga',
      step2_desc: content.step_labels?.step2_desc || 'Legalitas, sektor, skala, dan operasional',
      step3_title: content.step_labels?.step3_title || 'Produk & Sasaran Program',
      step3_desc: content.step_labels?.step3_desc || 'Kesiapan brand, tujuan, dan persetujuan',
    },
    interest_categories: content.interest_categories || [
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
    goal_options: content.goal_options || [
      { id: 'rebranding', text: 'Menguasai strategi re-branding & positioning kelas dunia' },
      { id: 'identity', text: 'Membangun identitas merek baru berstandar ekspor dari nol' },
      { id: 'export-rules', text: 'Membedah regulasi ekspor & cara menembus buyer internasional' },
      { id: 'packaging', text: 'Elevasi desain kemasan ramah lingkungan berstandar ritel modern' },
      { id: 'network', text: 'Membuka jejaring kemitraan dengan agregator ekspor & komunitas global' },
      { id: 'compliance', text: 'Mempersiapkan kepatuhan standar & sertifikasi pasar internasional' },
      { id: 'competency', text: 'Mendapatkan akses pembelajaran terarah & uji sertifikasi profesi branding' },
    ],
    operating_status_options: content.operating_status_options || [
      { value: 'sudah', label: 'Sudah Beroperasi Aktif', desc: 'Usaha sudah berjalan dan memiliki transaksi/produk' },
      { value: 'rintisan', label: 'Rintisan / Pre-Revenue', desc: 'Tahap prototype, validasi produk, atau persiapan awal' },
      { value: 'belum', label: 'Calon Usaha / Belum Beroperasi', desc: 'Ide bisnis baru, riset kampus, atau aspirasi pribadi' },
    ],
    offering_type_options: content.offering_type_options || [
      { value: 'produk_fisik', label: 'Produk Fisik (Barang Jadi / Olahan / Kerajinan)' },
      { value: 'jasa_layanan', label: 'Jasa / Layanan Kreatif & Profesional' },
      { value: 'keduanya', label: 'Kombinasi Produk & Jasa' },
    ],
    current_market_options: content.current_market_options || [
      'Lokal / Sekitar Domisili',
      'Regional Provinsi',
      'Nasional (Antar Pulau)',
      'Sudah Pernah Ekspor Skala Kecil',
      'Eksportir Aktif',
      'Belum Memiliki Pasar',
    ],
    brand_status_options: content.brand_status_options || [
      'Sudah mempunyai brand',
      'Brand sedang dikembangkan',
      'Belum mempunyai brand (White Label / Maklon)',
      'Belum ada (Masih tahap ide)',
    ],
    consent_texts: {
      consent_data: content.consent_texts?.consent_data || 'Saya menyetujui pengelolaan data untuk keperluan pendaftaran dan komunikasi program sesuai Kebijakan Privasi.',
      consent_stage1_ack: content.consent_texts?.consent_stage1_ack || 'Saya memahami bahwa pendaftaran Tahap 1 adalah pendaftaran peminat dan bukan proses penetapan kandidat 500 Brand Go Global.',
      consent_skolah_transfer: content.consent_texts?.consent_skolah_transfer || 'Saya menyetujui penerusan data yang diperlukan ke platform pembelajaran Skolah.com untuk administrasi dan akses pembelajaran sesuai ketentuan.',
      consent_marketing: content.consent_texts?.consent_marketing || 'Saya bersedia menerima pembaruan kegiatan dan materi pembelajaran melalui WhatsApp atau email (opsional).',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/cms/form', {
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    if (confirm('Yakin ingin mereset seluruh opsi pertanyaan formulir ke pengaturan default awal?')) {
      router.post('/admin/cms/reset/form');
    }
  };

  // Interest Categories Handlers
  const handleCategoryChange = (index: number, val: string) => {
    const next = [...data.interest_categories];
    next[index] = val;
    setData('interest_categories', next);
  };

  const handleAddCategory = () => {
    setData('interest_categories', [...data.interest_categories, 'Kategori Baru']);
  };

  const handleRemoveCategory = (index: number) => {
    if (data.interest_categories.length <= 1) {
      alert('Minimal harus ada satu kategori.');
      return;
    }
    setData('interest_categories', data.interest_categories.filter((_, i) => i !== index));
  };

  // Goal Options Handlers
  const handleGoalChange = (index: number, field: 'id' | 'text', val: string) => {
    const next = [...data.goal_options];
    next[index][field] = val;
    setData('goal_options', next);
  };

  const handleAddGoal = () => {
    const newId = `goal-${Date.now().toString().slice(-4)}`;
    setData('goal_options', [...data.goal_options, { id: newId, text: 'Tujuan sasaran program baru...' }]);
  };

  const handleRemoveGoal = (index: number) => {
    if (data.goal_options.length <= 1) {
      alert('Minimal harus ada satu opsi tujuan.');
      return;
    }
    setData('goal_options', data.goal_options.filter((_, i) => i !== index));
  };

  // Brand Status Handlers
  const handleBrandStatusChange = (index: number, val: string) => {
    const next = [...data.brand_status_options];
    next[index] = val;
    setData('brand_status_options', next);
  };

  const handleAddBrandStatus = () => {
    setData('brand_status_options', [...data.brand_status_options, 'Status Brand Baru']);
  };

  const handleRemoveBrandStatus = (index: number) => {
    if (data.brand_status_options.length <= 1) return;
    setData('brand_status_options', data.brand_status_options.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout title="CMS — Kelola Pertanyaan & Opsi Formulir">
      <Head title="CMS Pertanyaan Formulir | Admin 500 Brand Global" />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Flash Notifications */}
        {flash?.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>{flash.success}</span>
            </div>
            <a href="/daftar" target="_blank" className="underline hover:text-emerald-950 text-[12px]">
              Lihat di Formulir Pendaftaran ↗
            </a>
          </div>
        )}

        {/* Top Header & Actions */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📝</span>
              <h2 className="text-xl font-black text-[#071c36] tracking-tight">Editor Pertanyaan & Opsi Formulir</h2>
            </div>
            <p className="text-[13px] text-[#5b7388] mt-1">
              Sesuaikan opsi kategori pendaftar, pilihan sasaran program, opsi kesiapan merek, serta teks persetujuan hukum secara langsung.
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
              href="/daftar"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-[#eef5fa] hover:bg-[#dce9f5] text-[#0e4879] text-[12.5px] font-bold transition-colors"
            >
              ↗ Buka Formulir
            </a>
            <button
              onClick={handleSubmit}
              disabled={processing}
              className="px-6 py-2.5 rounded-xl bg-[#00827c] hover:bg-[#009b94] text-white text-[12.5px] font-black transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : '💾 Simpan Konfigurasi'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#dce6f0] pb-3">
          {[
            { id: 'categories', label: '1. Pilihan Kategori Pendaftar', icon: '👥' },
            { id: 'goals', label: '2. Pilihan Sasaran & Tujuan Program', icon: '🎯' },
            { id: 'status_offering', label: '3. Status Usaha & Kesiapan Brand', icon: '🏢' },
            { id: 'consents', label: '4. Teks Persetujuan & Konsensus', icon: '📜' },
            { id: 'general', label: '5. Header & Judul 3 Langkah', icon: '🏷️' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#00827c] text-white shadow-sm'
                  : 'bg-white text-[#58728a] hover:bg-[#eef5fa] border border-[#e2eaf0]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: KATEGORI PENDAFTAR */}
          {activeTab === 'categories' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-[#071c36]">Pilihan Kategori Pendaftar (Dropdown Bagian A)</h3>
                  <p className="text-[12px] text-[#698299]">
                    Kategori profil peminat (UMKM, Korporasi, Asosiasi, Kampus, Calon Wirausaha, dsb).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] flex items-center gap-1.5 transition-colors"
                >
                  <span>+</span>
                  <span>Tambah Kategori Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.interest_categories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                    <span className="w-6 h-6 rounded-md bg-[#00827c] text-white text-[11px] font-bold grid place-items-center flex-none">
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      value={cat}
                      onChange={(e) => handleCategoryChange(i, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-[13px] font-semibold bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(i)}
                      className="text-[12px] text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded hover:bg-red-50 flex-none"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SASARAN & TUJUAN PROGRAM */}
          {activeTab === 'goals' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-[#071c36]">Pilihan Sasaran Program (Multi-Select Bagian C)</h3>
                  <p className="text-[12px] text-[#698299]">
                    Kotak pilihan (checkbox) target yang ingin dicapai peserta saat mendaftar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] flex items-center gap-1.5 transition-colors"
                >
                  <span>+</span>
                  <span>Tambah Opsi Sasaran</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.goal_options.map((goal, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#092b53] text-white text-[11px] font-bold grid place-items-center flex-none">
                          {i + 1}
                        </span>
                        <span className="text-[11.5px] font-bold text-[#5c7791]">ID Teknis:</span>
                        <input
                          type="text"
                          value={goal.id}
                          onChange={(e) => handleGoalChange(i, 'id', e.target.value)}
                          className="px-2 py-0.5 rounded border border-gray-300 text-[11.5px] font-mono bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal(i)}
                        className="text-[11.5px] text-red-600 hover:text-red-800 font-bold px-2 py-0.5 rounded hover:bg-red-50"
                      >
                        Hapus Opsi
                      </button>
                    </div>

                    <input
                      type="text"
                      value={goal.text}
                      onChange={(e) => handleGoalChange(i, 'text', e.target.value)}
                      placeholder="Teks pernyataan sasaran yang tampil pada formulir..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[13px] font-medium bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STATUS USAHA & BRAND */}
          {activeTab === 'status_offering' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#071c36]">Opsi Status Usaha & Kesiapan Brand</h3>
                <p className="text-[12px] text-[#698299]">Pilihan radio button status kegiatan bisnis dan status merek saat ini.</p>
              </div>

              {/* Status Usaha (3 Radio Cards) */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#071c36]">3 Status Operasional Usaha (Langkah 2)</h4>
                <div className="space-y-3">
                  {data.operating_status_options.map((opt, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-[#00827c]">
                          Value Teknis: <code className="font-mono bg-white px-1.5 py-0.5 rounded border">{opt.value}</code>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#556e85] mb-1">Label Pilihan</label>
                          <input
                            type="text"
                            value={opt.label}
                            onChange={(e) => {
                              const next = [...data.operating_status_options];
                              next[i].label = e.target.value;
                              setData('operating_status_options', next);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-[12.5px] font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#556e85] mb-1">Deskripsi Tambahan</label>
                          <input
                            type="text"
                            value={opt.desc}
                            onChange={(e) => {
                              const next = [...data.operating_status_options];
                              next[i].desc = e.target.value;
                              setData('operating_status_options', next);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-[12px] bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opsi Kesiapan Brand */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#071c36]">Pilihan Kesiapan Brand (Langkah 3)</h4>
                  <button
                    type="button"
                    onClick={handleAddBrandStatus}
                    className="text-[12px] font-bold text-emerald-700 hover:underline"
                  >
                    + Tambah Opsi
                  </button>
                </div>
                <div className="space-y-2">
                  {data.brand_status_options.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-gray-500 w-4">{i + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleBrandStatusChange(i, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-[12.5px] bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBrandStatus(i)}
                        className="text-[11px] text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONSENTS & HUKUM */}
          {activeTab === 'consents' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#071c36]">Teks Persetujuan & Konsensus Hukum (Bagian E)</h3>
                <p className="text-[12px] text-[#698299]">Klausul persetujuan wajib dan opsional sebelum formulir dikirim.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <span className="text-[12px] font-bold text-[#0e4375] block">
                    1. Persetujuan Pengelolaan Data & Kebijakan Privasi (Wajib)
                  </span>
                  <textarea
                    rows={2}
                    value={data.consent_texts.consent_data}
                    onChange={(e) => setData('consent_texts', { ...data.consent_texts, consent_data: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white"
                  />
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <span className="text-[12px] font-bold text-[#0e4375] block">
                    2. Pernyataan Pemahaman Status Peminat Tahap 1 (Wajib)
                  </span>
                  <textarea
                    rows={2}
                    value={data.consent_texts.consent_stage1_ack}
                    onChange={(e) => setData('consent_texts', { ...data.consent_texts, consent_stage1_ack: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white"
                  />
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <span className="text-[12px] font-bold text-[#0e4375] block">
                    3. Persetujuan Akses LMS Platform Mitra Skolah.com (Wajib)
                  </span>
                  <textarea
                    rows={2}
                    value={data.consent_texts.consent_skolah_transfer}
                    onChange={(e) => setData('consent_texts', { ...data.consent_texts, consent_skolah_transfer: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white"
                  />
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <span className="text-[12px] font-bold text-[#0e4375] block">
                    4. Persetujuan Pembaruan Info via WhatsApp & Email (Opsional)
                  </span>
                  <textarea
                    rows={2}
                    value={data.consent_texts.consent_marketing}
                    onChange={(e) => setData('consent_texts', { ...data.consent_texts, consent_marketing: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GENERAL & STEP TITLES */}
          {activeTab === 'general' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#071c36]">Header & Judul 3 Langkah Formulir</h3>
                <p className="text-[12px] text-[#698299]">Banner atas formulir pendaftaran dan judul indikator progres langkah.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[12px] font-bold text-[#1b3652] mb-1">Badge Status Atas</label>
                  <input
                    type="text"
                    value={data.header.badge}
                    onChange={(e) => setData('header', { ...data.header, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#1b3652] mb-1">Judul Formulir</label>
                  <input
                    type="text"
                    value={data.header.title}
                    onChange={(e) => setData('header', { ...data.header, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-[13px] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#1b3652] mb-1">Subtitle / Keterangan</label>
                  <input
                    type="text"
                    value={data.header.subtitle}
                    onChange={(e) => setData('header', { ...data.header, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#1b3652] mb-1">Teks Periode</label>
                  <input
                    type="text"
                    value={data.header.period_text}
                    onChange={(e) => setData('header', { ...data.header, period_text: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#1b3652] mb-1">Teks Slot Kuota</label>
                  <input
                    type="text"
                    value={data.header.slot_text}
                    onChange={(e) => setData('header', { ...data.header, slot_text: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-[13px]"
                  />
                </div>
              </div>

              {/* Step Labels */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <h4 className="text-sm font-bold text-[#071c36]">Judul Masing-Masing Langkah</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step 1 */}
                  <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <span className="text-[11px] font-extrabold text-[#00827c] block">LANGKAH 1</span>
                    <input
                      type="text"
                      placeholder="Judul Langkah 1"
                      value={data.step_labels.step1_title}
                      onChange={(e) => setData('step_labels', { ...data.step_labels, step1_title: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-gray-300 text-[12px] font-bold bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Deskripsi singkat"
                      value={data.step_labels.step1_desc}
                      onChange={(e) => setData('step_labels', { ...data.step_labels, step1_desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-gray-300 text-[11px] bg-white"
                    />
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <span className="text-[11px] font-extrabold text-[#00827c] block">LANGKAH 2</span>
                    <input
                      type="text"
                      placeholder="Judul Langkah 2"
                      value={data.step_labels.step2_title}
                      onChange={(e) => setData('step_labels', { ...data.step_labels, step2_title: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-gray-300 text-[12px] font-bold bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Deskripsi singkat"
                      value={data.step_labels.step2_desc}
                      onChange={(e) => setData('step_labels', { ...data.step_labels, step2_desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-gray-300 text-[11px] bg-white"
                    />
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <span className="text-[11px] font-extrabold text-[#00827c] block">LANGKAH 3</span>
                    <input
                      type="text"
                      placeholder="Judul Langkah 3"
                      value={data.step_labels.step3_title}
                      onChange={(e) => setData('step_labels', { ...data.step_labels, step3_title: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-gray-300 text-[12px] font-bold bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Deskripsi singkat"
                      value={data.step_labels.step3_desc}
                      onChange={(e) => setData('step_labels', { ...data.step_labels, step3_desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-gray-300 text-[11px] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Save Bar */}
          <div className="sticky bottom-4 bg-[#071c36] text-white p-4 rounded-2xl shadow-xl flex items-center justify-between border border-[#173e65] z-30">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00bda5] animate-pulse"></span>
              <span className="text-[12.5px] text-[#c4dcf2] font-semibold">
                Opsi pertanyaan yang disimpan langsung diterapkan ke formulir pendaftaran.
              </span>
            </div>
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2.5 rounded-xl bg-[#00827c] hover:bg-[#009b94] text-white font-black text-[13px] shadow transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : '💾 Simpan Konfigurasi Formulir'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
