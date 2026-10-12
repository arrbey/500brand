import React, { useState, useMemo } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { INDONESIA_REGIONS } from '@/data/indonesiaRegions';

const GOAL_OPTIONS = [
  { id: 'rebranding', text: 'Menguasai strategi re-branding & positioning kelas dunia' },
  { id: 'identity', text: 'Membangun identitas merek baru berstandar ekspor dari nol' },
  { id: 'export-rules', text: 'Membedah regulasi ekspor & cara menembus buyer internasional' },
  { id: 'packaging', text: 'Elevasi desain kemasan ramah lingkungan berstandar ritel modern' },
  { id: 'network', text: 'Membuka jejaring kemitraan dengan agregator ekspor & komunitas global' },
  { id: 'compliance', text: 'Mempersiapkan kepatuhan standar & sertifikasi pasar internasional' },
  { id: 'competency', text: 'Mendapatkan akses pembelajaran terarah & uji sertifikasi profesi branding' },
];

const INTEREST_CATEGORIES = [
  'UMKM / Pelaku Usaha Mandiri',
  'Perusahaan / Startup / Koperasi',
  'Asosiasi Usaha / Organisasi Profesi',
  'Komunitas Kreatif / Lembaga Yayasan',
  'Pemerintah Daerah / Instansi Terkait',
  'Perguruan Tinggi / Lembaga Riset & Pendidikan',
  'Calon Wirausaha / Perintis Ide Baru',
  'Individu Profesional / Kreator Independen',
  'Lainnya',
];

interface RegistrationIndexProps {
  formVersion?: string;
  cms?: {
    header?: Record<string, string>;
    step_labels?: Record<string, string>;
    interest_categories?: string[];
    goal_options?: Array<{ id: string; text: string }>;
    operating_status_options?: Array<{ value: string; label: string; desc: string }>;
    offering_type_options?: Array<{ value: string; label: string }>;
    current_market_options?: string[];
    brand_status_options?: string[];
    consent_texts?: Record<string, string>;
  };
}

export default function RegistrationIndex({ formVersion: _formVersion, cms }: RegistrationIndexProps) {
  const headerCms = cms?.header || {};
  const stepLabelsCms = cms?.step_labels || {};
  const categoriesList = (cms?.interest_categories && cms.interest_categories.length > 0)
    ? cms.interest_categories
    : INTEREST_CATEGORIES;
  const goalsList = (cms?.goal_options && cms.goal_options.length > 0)
    ? cms.goal_options
    : GOAL_OPTIONS;
  const consentTexts = cms?.consent_texts || {};

  const [step, setStep] = useState<number>(0);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const { data, setData, post, processing, errors } = useForm({
    website_hp: '', // honeypot anti-bot
    // Step 1: Identitas
    full_name: '',
    email: '',
    whatsapp: '',
    province: '',
    city: '',
    interest_category: '',
    role: '',
    // Step 2: Usaha/Organisasi
    operating_status: '',
    organization_name: '',
    entity_type: '',
    sector: '',
    founded_year: '',
    business_scale: '',
    website_social: '',
    organization_description: '',
    // Step 3: Produk & Sasaran
    offering_type: '',
    offering_name: '',
    offering_description: '',
    current_market: '',
    existing_brand: '',
    brand_name: '',
    goals: [] as string[],
    expectation: '',
    // Consents
    consent_data: false,
    consent_stage1_ack: false,
    consent_skolah_transfer: false,
    consent_marketing: false,
  });

  // Dependent cities based on province
  const availableCities = useMemo(() => {
    if (!data.province) return [];
    const found = INDONESIA_REGIONS.find((p) => p.name === data.province);
    return found ? found.cities : [];
  }, [data.province]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prov = e.target.value;
    setData((prev) => ({
      ...prev,
      province: prov,
      city: '',
    }));
  };

  const toggleGoal = (goalText: string) => {
    setData((prev) => {
      const exists = prev.goals.includes(goalText);
      const nextGoals = exists
        ? prev.goals.filter((g) => g !== goalText)
        : [...prev.goals, goalText];
      return { ...prev, goals: nextGoals };
    });
  };

  // Conditional labels based on business state
  const isGovt = data.interest_category.includes('Pemerintah');
  const isOrg = /Asosiasi|Organisasi|komunitas|Perguruan|pendidikan|Lembaga/.test(data.interest_category);
  const isAspiring = data.interest_category.includes('Calon Wirausaha');
  const noBusiness = data.operating_status === 'belum';
  const hasBrand = ['Sudah mempunyai brand', 'Brand sedang dikembangkan'].includes(data.existing_brand);

  const orgLabel = isGovt
    ? 'Nama Instansi / Pemerintah Daerah (jika ada)'
    : isOrg
    ? 'Nama Lembaga / Asosiasi / Komunitas (jika ada)'
    : isAspiring
    ? 'Nama Rencana Usaha / Proyek Impian (jika ada)'
    : 'Nama Usaha / Bisnis / Brand Anda (jika ada)';

  const offeringNameLabel = isGovt
    ? 'Nama Program Daerah / Layanan Publik Unggulan'
    : isOrg
    ? 'Nama Program / Layanan Lembaga Unggulan'
    : isAspiring
    ? 'Nama Ide Produk / Rencana Inovasi'
    : 'Nama Produk, Jasa, atau Layanan Unggulan';

  // Client validation per step
  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 0) {
      if (!data.full_name.trim()) return false;
      if (!data.email.trim() || !data.email.includes('@')) return false;
      if (!data.whatsapp.trim()) return false;
      if (!data.province) return false;
      if (!data.city) return false;
      if (!data.interest_category) return false;
    } else if (currentStep === 1) {
      if (!data.operating_status) return false;
    } else if (currentStep === 2) {
      if (!data.offering_type) return false;
      if (data.goals.length === 0) return false;
      if (!data.consent_data || !data.consent_stage1_ack || !data.consent_skolah_transfer) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      alert('Mohon lengkapi seluruh kolom wajib bertanda bintang (*) pada langkah ini sebelum melanjutkan.');
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } else {
      setIsReviewing(true);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (isReviewing) {
      setIsReviewing(false);
      setStep(2);
    } else {
      setStep(Math.max(0, step - 1));
    }
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const goToStep = (targetStep: number) => {
    if (targetStep < step || validateStep(step)) {
      setIsReviewing(false);
      setStep(targetStep);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consent_data || !data.consent_stage1_ack || !data.consent_skolah_transfer) {
      alert('Harap centang ketiga persetujuan wajib sebelum mengirimkan pendaftaran.');
      return;
    }
    post('/daftar');
  };

  // Progress score
  const requiredCount = 9;
  let filledCount = 0;
  if (data.full_name) filledCount++;
  if (data.email) filledCount++;
  if (data.whatsapp) filledCount++;
  if (data.province) filledCount++;
  if (data.city) filledCount++;
  if (data.interest_category) filledCount++;
  if (data.operating_status) filledCount++;
  if (data.offering_type) filledCount++;
  if (data.goals.length > 0) filledCount++;
  const progressPct = Math.round((filledCount / requiredCount) * 100);

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-[#122b43] font-sans antialiased">
      <Head>
        <title>Formulir Pendaftaran Tahap 1 | 500 Brand Global</title>
        <meta
          name="description"
          content="Formulir resmi pendaftaran peminat Tahap 1 Program Nasional Brand Go Global (2026–2029). Terbuka untuk UMKM, korporasi, komunitas kreatif, dan calon wirausaha di 38 provinsi."
        />
      </Head>

      <Navbar />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-[#06182c] via-[#092543] to-[#0c3358] text-white pt-12 pb-20 px-4 relative overflow-hidden">
        {/* Concentric Circle Watermarks */}
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full bg-[#f3b641]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1160px] mx-auto relative z-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3b641]/15 border border-[#f3b641]/30 text-[#ffdb8e] text-[11px] font-bold tracking-wider uppercase mb-3.5 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#f3b641] animate-pulse" />
            {headerCms.badge || 'Gerakan Re-Branding Nasional · Pendaftaran Tahap 1 (2026–2029)'}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.18] max-w-3xl mb-4">
            {headerCms.title ? (
              headerCms.title
            ) : (
              <>
                Daftar Sebagai Peminat <br className="hidden sm:inline" />
                Brand Nasional <span className="text-[#f3b641]">Go Global.</span>
              </>
            )}
          </h1>

          <p className="text-[#c2d6e8] text-[14px] sm:text-[15.5px] max-w-2xl leading-relaxed mb-6">
            {headerCms.subtitle || 'Terbuka bagi UMKM, korporasi, organisasi, asosiasi, komunitas kreatif, perguruan tinggi, hingga perintis usaha baru. Belum memiliki produk atau merek? Anda tetap dapat mendaftar untuk mengikuti pembelajaran terarah.'}
          </p>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 border border-[#b48b40] text-[#ffdb8d] bg-[#7b5418]/25 px-3.5 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-xs">
              ⚡ {headerCms.period_text || 'Tahap 1 · Registrasi Peminat Terbuka'}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#55718a]/70 text-[#dde8ef] bg-white/5 px-3.5 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-xs">
              🛡️ {headerCms.slot_text || 'Bebas Biaya Awal (100% Gratis)'}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#55718a]/70 text-[#dde8ef] bg-white/5 px-3.5 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-xs">
              🇮🇩 Terbuka untuk 38 Provinsi
            </span>
          </div>
        </div>
      </section>

      {/* Main Form Layout */}
      <main className="max-w-[1160px] mx-auto px-4 -mt-10 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_315px] gap-6 items-start">
          {/* Left: Form Card */}
          <div className="bg-white rounded-2xl border border-[#dde6ef] shadow-xl overflow-hidden">
            {/* Header / Intro */}
            <div className="p-6 sm:p-8 border-b border-[#e5ecf2] bg-gradient-to-b from-[#ffffff] to-[#fafcfe]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-[#009b94] font-extrabold text-[11px] tracking-[0.12em] uppercase">
                  Formulir Pendaftaran · Tahap 1
                </span>
                <span className="text-[11px] font-bold text-[#627b92] bg-[#f0f5f9] px-2.5 py-1 rounded-md">
                  Estimasi: 3 Menit
                </span>
              </div>
              <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-[#061a33]">
                {isReviewing ? 'Tinjau & Konfirmasi Data Anda' : 'Mulai Perjalanan Brand Anda'}
              </h2>
              <p className="text-[#587089] text-[13px] sm:text-[13.5px] mt-1.5 leading-relaxed">
                {isReviewing
                  ? 'Periksa kembali data Anda sebelum konfirmasi akhir. Pastikan nomor kontak dan email aktif agar notifikasi dan materi orientasi dapat diterima.'
                  : 'Lengkapi data identitas, profil usaha atau organisasi, serta target capaian produk Anda. Tanda bintang (*) wajib diisi.'}
              </p>
            </div>

            {/* Stepper Navigation */}
            {!isReviewing && (
              <div className="grid grid-cols-3 border-b border-[#e5ecf2] bg-[#f8fbfe]">
                {/* Step 1 */}
                <button
                  type="button"
                  onClick={() => goToStep(0)}
                  className={`p-4 sm:p-5 flex items-center gap-3 text-left transition-all border-r border-[#e5ecf2] cursor-pointer ${
                    step === 0
                      ? 'bg-white border-b-2 border-b-[#f3b641] shadow-xs'
                      : step > 0
                      ? 'hover:bg-white/60'
                      : 'opacity-70'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full grid place-items-center text-[12px] font-bold shrink-0 transition-transform ${
                      step === 0
                        ? 'bg-[#f3b641] text-[#061a33] ring-4 ring-[#f3b641]/20 scale-105'
                        : step > 0
                        ? 'bg-[#009b94] text-white shadow-xs'
                        : 'bg-[#e5ecf2] text-[#698096]'
                    }`}
                  >
                    {step > 0 ? '✓' : '01'}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7890a5] font-bold uppercase tracking-wider block">
                      Langkah 1
                    </span>
                    <strong
                      className={`text-[12px] sm:text-[13px] font-bold truncate block ${
                        step === 0 ? 'text-[#061a33]' : step > 0 ? 'text-[#009b94]' : 'text-[#698096]'
                      }`}
                    >
                      {stepLabelsCms.step1_title || 'Profil Pendaftar'}
                    </strong>
                  </div>
                </button>

                {/* Step 2 */}
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className={`p-4 sm:p-5 flex items-center gap-3 text-left transition-all border-r border-[#e5ecf2] cursor-pointer ${
                    step === 1
                      ? 'bg-white border-b-2 border-b-[#f3b641] shadow-xs'
                      : step > 1
                      ? 'hover:bg-white/60'
                      : 'opacity-70'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full grid place-items-center text-[12px] font-bold shrink-0 transition-transform ${
                      step === 1
                        ? 'bg-[#f3b641] text-[#061a33] ring-4 ring-[#f3b641]/20 scale-105'
                        : step > 1
                        ? 'bg-[#009b94] text-white shadow-xs'
                        : 'bg-[#e5ecf2] text-[#698096]'
                    }`}
                  >
                    {step > 1 ? '✓' : '02'}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7890a5] font-bold uppercase tracking-wider block">
                      Langkah 2
                    </span>
                    <strong
                      className={`text-[12px] sm:text-[13px] font-bold truncate block ${
                        step === 1 ? 'text-[#061a33]' : step > 1 ? 'text-[#009b94]' : 'text-[#698096]'
                      }`}
                    >
                      {stepLabelsCms.step2_title || 'Bisnis & Ide'}
                    </strong>
                  </div>
                </button>

                {/* Step 3 */}
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className={`p-4 sm:p-5 flex items-center gap-3 text-left transition-all cursor-pointer ${
                    step === 2
                      ? 'bg-white border-b-2 border-b-[#f3b641] shadow-xs'
                      : 'opacity-70'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full grid place-items-center text-[12px] font-bold shrink-0 transition-transform ${
                      step === 2
                        ? 'bg-[#f3b641] text-[#061a33] ring-4 ring-[#f3b641]/20 scale-105'
                        : 'bg-[#e5ecf2] text-[#698096]'
                    }`}
                  >
                    03
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7890a5] font-bold uppercase tracking-wider block">
                      Langkah 3
                    </span>
                    <strong
                      className={`text-[12px] sm:text-[13px] font-bold truncate block ${
                        step === 2 ? 'text-[#061a33]' : 'text-[#698096]'
                      }`}
                    >
                      {stepLabelsCms.step3_title || 'Produk & Target'}
                    </strong>
                  </div>
                </button>
              </div>
            )}

            {/* Error alerts from server */}
            {Object.keys(errors).length > 0 && (
              <div className="m-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[13px]">
                <strong className="block font-bold mb-1">Terdapat data yang perlu diperbaiki:</strong>
                <ul className="list-disc pl-5 space-y-1">
                  {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Anti-spam honeypot (hidden) */}
              <input
                type="text"
                name="website_hp"
                value={data.website_hp}
                onChange={(e) => setData('website_hp', e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* STEP 1: Profil Pendaftar */}
              {!isReviewing && step === 0 && (
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="border-b border-[#edf3f8] pb-3 mb-2 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#0c355c] text-[#f3b641] text-[11px] font-black inline-flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#061a33]">Informasi Pribadi & Kontak</h3>
                      <p className="text-[12px] text-[#6a8196]">
                        Digunakan untuk komunikasi awal orientasi dan pembagian materi panduan.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Nama Lengkap Sesuai Identitas <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={data.full_name}
                      onChange={(e) => setData('full_name', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">
                        Nomor WhatsApp Aktif <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={data.whatsapp}
                        onChange={(e) => setData('whatsapp', e.target.value)}
                        className="form-input"
                      />
                      <span className="form-hint">
                        Nomor aktif untuk pengiriman panduan dan notifikasi jadwal kegiatan.
                      </span>
                    </div>

                    <div>
                      <label className="form-label">
                        Email Aktif <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="nama@perusahaan.com atau email aktif Anda"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="form-input"
                      />
                      <span className="form-hint">
                        Materi modul dan surat konfirmasi registrasi akan dikirimkan ke email ini.
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">
                        Provinsi Domisili / Basis Operasional <span className="text-red-600">*</span>
                      </label>
                      <select
                        required
                        value={data.province}
                        onChange={handleProvinceChange}
                        className="form-select"
                      >
                        <option value="">Pilih Provinsi (38 Provinsi Terdaftar)</option>
                        {INDONESIA_REGIONS.map((prov) => (
                          <option key={prov.code} value={prov.name}>
                            {prov.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="form-label">
                        Kota / Kabupaten <span className="text-red-600">*</span>
                      </label>
                      <select
                        required
                        disabled={!data.province}
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        className="form-select disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {data.province ? 'Pilih Kota / Kabupaten' : 'Pilih provinsi terlebih dahulu'}
                        </option>
                        {availableCities.map((cityName) => (
                          <option key={cityName} value={cityName}>
                            {cityName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Kategori Pendaftar <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={data.interest_category}
                      onChange={(e) => setData('interest_category', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Pilih Kategori yang Paling Menggambarkan Anda</option>
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <span className="form-hint">
                      Pilih kategori yang paling sesuai dengan status atau organisasi Anda saat ini.
                    </span>
                  </div>

                  <div>
                    <label className="form-label">
                      Jabatan / Peran di Usaha atau Organisasi <span className="text-[#889fb3] text-[11px] font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Founder & CEO, Brand Owner, Direktur, Perintis Usaha"
                      value={data.role}
                      onChange={(e) => setData('role', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Bisnis & Organisasi */}
              {!isReviewing && step === 1 && (
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="border-b border-[#edf3f8] pb-3 mb-2 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#0c355c] text-[#f3b641] text-[11px] font-black inline-flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#061a33]">Profil Usaha, Organisasi, atau Ide</h3>
                      <p className="text-[12px] text-[#6a8196]">
                        Berlaku bagi bisnis yang sudah berjalan lama, rintisan baru, maupun ide yang sedang dirancang.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Status Kegiatan Usaha Saat Ini <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={data.operating_status}
                      onChange={(e) => setData('operating_status', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Pilih Status Kegiatan</option>
                      <option value="aktif">Sudah menjalankan usaha / organisasi secara aktif</option>
                      <option value="persiapan">Sedang dalam tahap persiapan / riset pengembangan produk</option>
                      <option value="belum">Belum memiliki usaha aktif (masih berupa ide / rencana baru)</option>
                      <option value="representatif">Mewakili lembaga publik, instansi pemerintah, atau perguruan tinggi</option>
                    </select>
                  </div>

                  {!noBusiness && (
                    <>
                      <div>
                        <label className="form-label">
                          {orgLabel}
                        </label>
                        <input
                          type="text"
                          placeholder="Masukkan nama usaha / lembaga / instansi"
                          value={data.organization_name}
                          onChange={(e) => setData('organization_name', e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">
                            Bentuk Badan Usaha / Entitas
                          </label>
                          <select
                            value={data.entity_type}
                            onChange={(e) => setData('entity_type', e.target.value)}
                            className="form-select"
                          >
                            <option value="">Pilih Bentuk Entitas</option>
                            <option value="Perorangan">Perorangan / Usaha Mandiri</option>
                            <option value="CV">CV (Persekutuan Komanditer)</option>
                            <option value="PT">PT (Perseroan Terbatas)</option>
                            <option value="Koperasi">Koperasi Produsen / Konsumen</option>
                            <option value="Yayasan">Yayasan / Perkumpulan</option>
                            <option value="Instansi">Instansi Pemerintah / BUMD</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label">
                            Sektor / Industri Utama
                          </label>
                          <select
                            value={data.sector}
                            onChange={(e) => setData('sector', e.target.value)}
                            className="form-select"
                          >
                            <option value="">Pilih Sektor Industri</option>
                            <option value="Makanan dan Minuman">Makanan, Minuman, Specialty Coffee & Rempah</option>
                            <option value="Fashion dan Kriya">Fashion Kontemporer, Wastra & Kriya Tekstil</option>
                            <option value="Kecantikan dan Kesehatan">Kecantikan, Skincare, Herbal & Wellness</option>
                            <option value="Teknologi dan Digital">Teknologi, Aplikasi SaaS, AI & Digital</option>
                            <option value="Karya Kreatif">Industri Kreatif, Musik, Film & Seni Rupa</option>
                            <option value="Jasa Profesional">Jasa & Konsultasi Profesional</option>
                            <option value="Manufaktur">Manufaktur, Furnitur & Rekayasa Desain</option>
                            <option value="Pariwisata">Pariwisata & Destinasi Budaya</option>
                            <option value="Agribisnis">Pertanian, Perkebunan & Kelautan</option>
                            <option value="Pendidikan">Riset Kampus, Pendidikan & Pelatihan</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">
                            Tahun Mulai Beroperasi
                          </label>
                          <input
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            placeholder="Contoh: 2022"
                            value={data.founded_year}
                            onChange={(e) => setData('founded_year', e.target.value)}
                            className="form-input"
                          />
                        </div>

                        <div>
                          <label className="form-label">
                            Skala Usaha / Organisasi Saat Ini
                          </label>
                          <select
                            value={data.business_scale}
                            onChange={(e) => setData('business_scale', e.target.value)}
                            className="form-select"
                          >
                            <option value="">Pilih Skala</option>
                            <option value="Usaha Mikro">Usaha Mikro</option>
                            <option value="Usaha Kecil">Usaha Kecil</option>
                            <option value="Usaha Menengah">Usaha Menengah</option>
                            <option value="Usaha Besar">Usaha Besar / Korporasi</option>
                            <option value="Organisasi / Lembaga">Organisasi / Lembaga Publik</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="form-label">
                          Website atau Akun Media Sosial <span className="text-[#889fb3] text-[11px] font-normal">(opsional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: instagram.com/brandanda atau website resmi bisnis"
                          value={data.website_social}
                          onChange={(e) => setData('website_social', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </>
                  )}

                  {noBusiness && (
                    <div className="bg-gradient-to-r from-[#eff9f7] to-[#e6f7f3] border border-[#bfe7de] p-5 rounded-xl text-[#125c53] text-[13px] leading-relaxed shadow-xs">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">💡</span>
                        <div>
                          <strong className="block font-bold text-[14px] text-[#0a4d45] mb-1">
                            Belum Memiliki Usaha? Anda Tetap di Jalur yang Tepat!
                          </strong>
                          Inisiatif 500 Brand Go Global justru memberi ruang istimewa bagi para calon pendiri dan inovator baru untuk mempelajari rancang bangun identitas brand, positioning internasional, dan riset pasar global dari fondasi dasar bersama para mentor berpengalaman. Silakan lanjutkan pengisian formulir Anda.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Produk, Sasaran & Persetujuan */}
              {!isReviewing && step === 2 && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="border-b border-[#edf3f8] pb-3 mb-2 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#0c355c] text-[#f3b641] text-[11px] font-black inline-flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#061a33]">Produk, Visi Global, & Sasaran Program</h3>
                      <p className="text-[12px] text-[#6a8196]">
                        Ceritakan produk unggulan dan tentukan target pembelajaran yang paling relevan dengan kebutuhan Anda.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Jenis Produk / Layanan Utama <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={data.offering_type}
                      onChange={(e) => setData('offering_type', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Pilih Jenis Penawaran</option>
                      <option value="Produk Fisik / Barang Konsumsi">Produk Fisik, Makanan Olahan, Minuman & Rempah</option>
                      <option value="Fashion, Wastra & Kriya">Fashion, Wastra Nusantara & Kerajinan Kriya</option>
                      <option value="Kecantikan & Herbal">Kecantikan, Kosmetik & Produk Herbal Alami</option>
                      <option value="Produk Digital / Teknologi">Produk Digital, Aplikasi SaaS & Solusi AI</option>
                      <option value="Karya Kreatif / Musik / Desain">Karya Kreatif, Musik, Film & Desain Industri</option>
                      <option value="Jasa / Layanan Komersial">Jasa & Konsultasi Komersial Profesional</option>
                      <option value="Program Organisasi / Asosiasi">Program Unggulan Organisasi / Asosiasi / Pemda</option>
                      <option value="Ide Produk Masih Direncanakan">Ide Produk / Inovasi Masih Dalam Perencanaan</option>
                      <option value="Belum Memiliki Produk">Belum Memiliki Produk Spesifik (Fokus Pembelajaran)</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">
                      {offeringNameLabel} <span className="text-[#889fb3] text-[11px] font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kopi Arabika Single Origin, Tenun Ikat Modern, Minyak Atsiri Alami"
                      value={data.offering_name}
                      onChange={(e) => setData('offering_name', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Deskripsi Singkat Produk, Layanan, atau Rencana Inovasi
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan keunggulan produk, bahan baku nusantara yang digunakan, nilai keunikan (USP), atau target pasar yang dibidik..."
                      value={data.offering_description}
                      onChange={(e) => setData('offering_description', e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">
                        Jangkauan Pasar Saat Ini
                      </label>
                      <select
                        value={data.current_market}
                        onChange={(e) => setData('current_market', e.target.value)}
                        className="form-select"
                      >
                        <option value="">Pilih Jangkauan Pasar Saat Ini</option>
                        <option value="Belum aktif / Belum ada">Belum aktif / Baru tahap konsep</option>
                        <option value="Lokal / Kota / Kabupaten">Lokal (Kota / Kabupaten setempat)</option>
                        <option value="Regional / Provinsi">Regional (Tingkat Provinsi)</option>
                        <option value="Nasional">Nasional (Antarpulau se-Indonesia)</option>
                        <option value="Sudah Menjangkau Ekspor">Sudah Menjangkau Ekspor / Mancanegara</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">
                        Status Brand Saat Ini
                      </label>
                      <select
                        value={data.existing_brand}
                        onChange={(e) => setData('existing_brand', e.target.value)}
                        className="form-select"
                      >
                        <option value="">Pilih Status Merek</option>
                        <option value="Sudah mempunyai brand">Sudah mempunyai brand aktif di pasar</option>
                        <option value="Brand sedang dikembangkan">Brand sedang dalam perancangan / re-branding</option>
                        <option value="Belum mempunyai brand">Belum mempunyai brand</option>
                        <option value="Tidak relevan">Tidak relevan untuk saat ini</option>
                      </select>
                    </div>
                  </div>

                  {hasBrand && (
                    <div>
                      <label className="form-label">
                        Nama Brand <span className="text-[#889fb3] text-[11px] font-normal">(opsional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nama merek yang sudah digunakan atau sedang disiapkan"
                        value={data.brand_name}
                        onChange={(e) => setData('brand_name', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  )}

                  {/* Multi-checkbox Goals */}
                  <div>
                    <label className="form-label">
                      Tujuan Mengikuti Program (Pilih Minimal Satu) <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                      {goalsList.map((g) => {
                        const checked = data.goals.includes(g.text);
                        return (
                          <label
                            key={g.id}
                            className={`p-3.5 rounded-xl border text-[12px] flex items-start gap-2.5 cursor-pointer transition-all duration-200 select-none ${
                              checked
                                ? 'border-[#009b94] bg-[#eff9f8] text-[#064e49] font-semibold ring-1 ring-[#009b94] shadow-xs'
                                : 'border-[#dce5ec] bg-[#fcfdfe] text-[#344d62] hover:bg-white hover:border-[#b8cbdc]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleGoal(g.text)}
                              className="mt-0.5 w-4 h-4 text-[#009b94] rounded focus:ring-0 accent-[#009b94] cursor-pointer"
                            />
                            <span className="leading-snug">{g.text}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Kebutuhan Utama Pembelajaran atau Harapan Pendampingan <span className="text-[#889fb3] text-[11px] font-normal">(opsional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: pendampingan packaging berstandar ritel luar negeri, kurasi pasar tujuan ekspor, atau bimbingan sertifikasi mutu internasional..."
                      value={data.expectation}
                      onChange={(e) => setData('expectation', e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  {/* 4 Persetujuan (Bagian E) */}
                  <div className="space-y-3 pt-5 border-t border-[#edf3f8]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-md bg-[#0c355c] text-[#f3b641] text-[10px] font-black inline-flex items-center justify-center">
                        E
                      </span>
                      <h4 className="text-[13px] font-bold text-[#061a33]">
                        Persetujuan dan Integritas Pendaftaran
                      </h4>
                    </div>

                    <label className="p-3.5 rounded-xl border border-[#dce5ec] bg-white flex items-start gap-3 cursor-pointer hover:border-[#1065a1] transition-colors shadow-2xs">
                      <input
                        type="checkbox"
                        required
                        checked={data.consent_data}
                        onChange={(e) => setData('consent_data', e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#009b94] rounded accent-[#009b94] cursor-pointer"
                      />
                      <span className="text-[12px] text-[#243d52] leading-relaxed">
                        <strong className="text-[#0c2742]">(Wajib)</strong>{' '}
                        {consentTexts.consent_data || (
                          <>
                            Saya menyetujui pengelolaan data untuk keperluan pendaftaran peminat dan komunikasi program sesuai{' '}
                            <Link href="/privasi" target="_blank" className="text-[#1065a1] underline font-semibold">
                              Kebijakan Privasi
                            </Link>{' '}
                            portal ini.
                          </>
                        )}{' '}
                        <span className="text-red-600">*</span>
                      </span>
                    </label>

                    <label className="p-3.5 rounded-xl border border-[#dce5ec] bg-white flex items-start gap-3 cursor-pointer hover:border-[#1065a1] transition-colors shadow-2xs">
                      <input
                        type="checkbox"
                        required
                        checked={data.consent_stage1_ack}
                        onChange={(e) => setData('consent_stage1_ack', e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#009b94] rounded accent-[#009b94] cursor-pointer"
                      />
                      <span className="text-[12px] text-[#243d52] leading-relaxed">
                        <strong className="text-[#0c2742]">(Wajib)</strong>{' '}
                        {consentTexts.consent_stage1_ack || (
                          <>
                            Saya memahami bahwa pendaftaran Tahap 1 merupakan registrasi peminat dan{' '}
                            <strong className="text-[#061a33]">bukan penetapan kandidat resmi</strong> 500 Brand Go Global oleh Kementerian Perdagangan RI.
                          </>
                        )}{' '}
                        <span className="text-red-600">*</span>
                      </span>
                    </label>

                    <label className="p-3.5 rounded-xl border border-[#dce5ec] bg-white flex items-start gap-3 cursor-pointer hover:border-[#1065a1] transition-colors shadow-2xs">
                      <input
                        type="checkbox"
                        required
                        checked={data.consent_skolah_transfer}
                        onChange={(e) => setData('consent_skolah_transfer', e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#009b94] rounded accent-[#009b94] cursor-pointer"
                      />
                      <span className="text-[12px] text-[#243d52] leading-relaxed">
                        <strong className="text-[#0c2742]">(Wajib)</strong>{' '}
                        {consentTexts.consent_skolah_transfer || (
                          <>
                            Saya menyetujui penerusan data yang diperlukan ke platform mitra edukasi resmi{' '}
                            <strong className="text-[#061a33]">Skolah.com</strong> untuk keperluan administrasi akun dan pembelajaran terstruktur.
                          </>
                        )}{' '}
                        <span className="text-red-600">*</span>
                      </span>
                    </label>

                    <label className="p-3.5 rounded-xl border border-[#dce5ec] bg-white flex items-start gap-3 cursor-pointer hover:border-[#1065a1] transition-colors shadow-2xs">
                      <input
                        type="checkbox"
                        checked={data.consent_marketing}
                        onChange={(e) => setData('consent_marketing', e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#009b94] rounded accent-[#009b94] cursor-pointer"
                      />
                      <span className="text-[12px] text-[#4d667c] leading-relaxed">
                        <strong>(Opsional)</strong>{' '}
                        {consentTexts.consent_marketing ||
                          'Saya bersedia menerima pembaruan kegiatan, jadwal webinar pembekalan ekspor, dan informasi bermanfaat berkala melalui WhatsApp atau email.'}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* REVIEW MODE */}
              {isReviewing && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="bg-gradient-to-r from-[#f0fbf9] to-[#e7f7f4] border border-[#a8e3dc] p-4.5 rounded-xl text-[#0b544e] text-[13px] shadow-xs">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <strong className="block font-bold text-[14px] text-[#05433e] mb-0.5">
                          Satu Langkah Terakhir Menuju Panggung Global
                        </strong>
                        <p className="text-[12.5px] text-[#0e635b] leading-relaxed">
                          Pastikan seluruh data di bawah ini sudah akurat. Setelah menekan tombol kirim di bawah, sistem akan langsung menerbitkan nomor registrasi unik resmi untuk pendaftaran Anda.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[#dce5ec] rounded-xl overflow-hidden bg-white shadow-xs">
                    <div className="bg-[#f7fafc] px-5 py-3 border-b border-[#e2ebf2] flex justify-between items-center">
                      <h4 className="text-[13px] font-bold text-[#0c2844] uppercase tracking-wider">
                        Rangkuman Data Registrasi
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setIsReviewing(false); setStep(0); }}
                        className="text-[12px] font-bold text-[#1065a1] hover:underline"
                      >
                        Ubah Data ✎
                      </button>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Nama Lengkap</span>
                        <strong className="text-[#061a33] text-[14px]">{data.full_name || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Email Aktif</span>
                        <strong className="text-[#061a33]">{data.email || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Nomor WhatsApp</span>
                        <strong className="text-[#061a33]">{data.whatsapp || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Domisili Operasional</span>
                        <strong className="text-[#061a33]">
                          {data.city}, {data.province}
                        </strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Kategori Pendaftar</span>
                        <strong className="text-[#061a33]">{data.interest_category || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Peran / Jabatan</span>
                        <strong className="text-[#061a33]">{data.role || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Status Usaha / Organisasi</span>
                        <strong className="text-[#061a33]">{data.operating_status || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Nama Usaha / Lembaga</span>
                        <strong className="text-[#061a33]">{data.organization_name || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Jenis Penawaran Produk</span>
                        <strong className="text-[#061a33]">{data.offering_type || '—'}</strong>
                      </div>
                      <div className="border-b border-[#edf3f8] pb-2 sm:border-0 sm:pb-0">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Nama Produk / Merek</span>
                        <strong className="text-[#061a33]">
                          {data.brand_name || data.offering_name || '—'}
                        </strong>
                      </div>
                      <div className="sm:col-span-2 pt-2 border-t border-[#edf3f8]">
                        <span className="text-[11px] text-[#788e9f] block font-semibold">Target Pengembangan Dipilih</span>
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-[#061a33]">
                          {data.goals.map((g, i) => (
                            <li key={i}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="p-6 bg-[#f8fbfe] border-t border-[#e2eaf0] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[12px] text-[#698197] font-semibold">
                  {isReviewing ? 'Langkah Konfirmasi Akhir' : `Langkah ${step + 1} dari 3`}
                </span>

                <div className="flex gap-2.5 ml-auto">
                  {(step > 0 || isReviewing) && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-lg border border-[#ccdbe7] bg-white text-[#122b43] text-[12.5px] font-bold hover:bg-[#edf3f8] transition-colors cursor-pointer"
                    >
                      {isReviewing ? '← Edit Kembali' : '← Kembali'}
                    </button>
                  )}

                  {!isReviewing ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-gold px-6 py-2.5 text-[12.5px] font-black rounded-lg shadow hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      {step === 2 ? 'Tinjau Data Lengkap →' : 'Lanjutkan →'}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={processing}
                      className="btn btn-gold px-8 py-3 text-[13.5px] font-black rounded-lg shadow-md disabled:opacity-50 hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      {processing ? 'Mengirim Data Registrasi...' : 'Kirim Pendaftaran Resmi ✓'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right: Live Summary & Guide Sidebar */}
          <aside className="space-y-4">
            {/* Live Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#dde6ef] shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[12.5px] font-black uppercase tracking-wider text-[#061a33]">
                  Ringkasan Pendaftar
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#e5f7f5] text-[#009b94] border border-[#bceae3]">
                  Live Preview
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-[#71879c] font-semibold mb-1">
                  <span>Kelengkapan Wajib</span>
                  <span className="font-extrabold text-[#061a33]">{progressPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#eef3f7] overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#009b94] to-[#f3b641] transition-all duration-300 shadow-xs"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2.5 text-[12px] border-t border-[#edf3f8] pt-3">
                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Nama</span>
                  <strong className="text-[#0b2443] truncate block">
                    {data.full_name || '—'}
                  </strong>
                </div>

                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Kontak</span>
                  <span className="text-[#0b2443] truncate block font-medium">
                    {data.email || '—'}
                  </span>
                  <span className="text-[#5b7285] text-[11px] block mt-0.5">
                    {data.whatsapp || '—'}
                  </span>
                </div>

                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Lokasi Domisili</span>
                  <span className="text-[#0b2443] font-medium">
                    {data.city && data.province ? `${data.city}, ${data.province}` : '—'}
                  </span>
                </div>

                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Kategori</span>
                  <span className="text-[#0b2443] font-medium">
                    {data.interest_category || '—'}
                  </span>
                </div>

                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Usaha / Brand</span>
                  <span className="text-[#0b2443] font-medium">
                    {data.brand_name || data.organization_name || (noBusiness ? 'Belum ada usaha' : '—')}
                  </span>
                </div>

                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Tujuan Dipilih</span>
                  <span className="text-[#0b2443] font-medium">
                    {data.goals.length > 0 ? `${data.goals.length} target dipilih` : 'Belum memilih'}
                  </span>
                </div>

                <div className="bg-[#f9fcfe] p-2.5 rounded-lg border border-[#eef4f8]">
                  <span className="text-[10px] text-[#7d93a6] block uppercase tracking-wider font-semibold">Status Persetujuan</span>
                  <span className="flex items-center gap-1.5 text-[11px] mt-0.5">
                    {data.consent_data && data.consent_stage1_ack && data.consent_skolah_transfer ? (
                      <span className="text-[#009b94] font-bold">✔ 3 Persetujuan lengkap</span>
                    ) : (
                      <span className="text-[#a32b35] font-semibold">Belum lengkap</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Program Flow Card */}
            <div className="bg-gradient-to-b from-[#0a2745] to-[#071d34] text-white p-5 rounded-2xl border border-[#173e65] shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#f3b641]">📌</span>
                <h3 className="text-[12.5px] font-black uppercase tracking-wider text-[#f3b641]">
                  Alur Program Dua Tahap
                </h3>
              </div>
              <p className="text-[11px] text-[#c5d8e8] mb-4 leading-relaxed">
                Pendaftaran ini adalah registrasi peminat awal bagi seluruh pelaku usaha:
              </p>
              <div className="space-y-3.5 text-[11px]">
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-md bg-[#163c62] text-[#f3b641] font-black grid place-items-center flex-none text-[10px]">
                    01
                  </span>
                  <div>
                    <strong className="block text-white">Tahap 1: Pendaftaran Peminat</strong>
                    <span className="text-[#a8c3d8] leading-tight block">
                      Terbuka untuk UMKM, korporasi, komunitas, dan calon wirausaha tanpa biaya awal.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-md bg-[#163c62] text-[#f3b641] font-black grid place-items-center flex-none text-[10px]">
                    02
                  </span>
                  <div>
                    <strong className="block text-white">Pembelajaran & Kompetensi</strong>
                    <span className="text-[#a8c3d8] leading-tight block">
                      Kurikulum terarah, webinar praktis, dan uji kompetensi di platform resmi Skolah.com.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-md bg-[#163c62] text-[#f3b641] font-black grid place-items-center flex-none text-[10px]">
                    03
                  </span>
                  <div>
                    <strong className="block text-white">Tahap 2: Pengajuan Kandidat</strong>
                    <span className="text-[#a8c3d8] leading-tight block">
                      Fasilitasi resmi mengikuti mekanisme Ditjen Perdagangan Dalam Negeri, Kemendag RI.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#dde6ef] text-[12px] shadow-sm">
              <h4 className="font-bold text-[#061a33] mb-1">Butuh Bantuan Pendaftaran?</h4>
              <p className="text-[#647b90] mb-2 leading-relaxed">
                Hubungi sekretariat pendaftaran peminat program melalui email resmi:
              </p>
              <a
                href="mailto:500brandglobal@gmail.com"
                className="text-[#0e6780] font-bold block hover:underline"
              >
                ✉ 500brandglobal@gmail.com
              </a>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
