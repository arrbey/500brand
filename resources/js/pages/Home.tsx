import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface CaseStudy {
  id: string;
  brand: string;
  badge: string;
  category: 'positioning' | 'experience' | 'community';
  title: string;
  desc: string;
  action: string;
  gradient: string;
}

const CASES_DATA: CaseStudy[] = [
  {
    id: 'ikea',
    brand: 'IKEA',
    badge: 'CUSTOMER EXPERIENCE',
    category: 'experience',
    title: 'IKEA — Experience by Design',
    desc: 'Kajian ini menelaah bagaimana sebuah pengalaman merek dapat dipikirkan sebagai sistem yang konsisten: dari produk, informasi, hingga interaksi pelanggan. Fokus belajar bukan meniru gaya visual, tetapi memahami kebutuhan pengguna.',
    action: 'Audit tiga titik kontak pelanggan—situs, kemasan, dan pengalaman membeli—lalu catat bagian yang belum konsisten.',
    gradient: 'from-[#082b52] to-[#14799b]',
  },
  {
    id: 'lego',
    brand: 'LEGO',
    badge: 'COMMUNITY & CREATIVITY',
    category: 'community',
    title: 'LEGO — Creativity as a Platform',
    desc: 'Kajian tentang peran komunitas dan partisipasi pengguna dalam memperkaya narasi merek. Fokus belajar adalah cara merek memberi ruang bagi konsumen untuk terlibat secara bermakna.',
    action: 'Rancang satu aktivitas yang membuat pelanggan berbagi gagasan atau pengalaman terkait produk Anda.',
    gradient: 'from-[#703d1d] to-[#d9a847]',
  },
  {
    id: 'uniqlo',
    brand: 'UNIQLO',
    badge: 'PRODUCT & POSITIONING',
    category: 'positioning',
    title: 'UNIQLO — Clarity of Product Promise',
    desc: 'Analisis atas pentingnya janji produk yang jelas dan mudah dipahami. Fokus belajar adalah menghubungkan kebutuhan sehari-hari konsumen dengan diferensiasi yang nyata.',
    action: 'Tuliskan proposisi nilai produk Anda dalam satu kalimat tanpa jargon, kemudian uji kepada calon pembeli.',
    gradient: 'from-[#1b496e] to-[#74a4ce]',
  },
  {
    id: 'patagonia',
    brand: 'PATAGONIA',
    badge: 'PURPOSE & REPUTATION',
    category: 'community',
    title: 'Patagonia — Purpose-led Branding',
    desc: 'Kajian mengenai konsistensi antara nilai, keputusan bisnis, dan komunikasi merek. Sebuah tujuan bermakna memerlukan tindakan yang dapat dilihat dan dibuktikan.',
    action: 'Pilih satu komitmen brand yang relevan, tentukan bukti tindakan, dan komunikasikan secara proporsional.',
    gradient: 'from-[#183945] to-[#2f9f8c]',
  },
  {
    id: 'nike',
    brand: 'NIKE',
    badge: 'BRAND NARRATIVE',
    category: 'experience',
    title: 'Nike — Power of Brand Narrative',
    desc: 'Kajian tentang peran cerita merek dan aspirasi audiens dalam memperjelas identitas. Fokus belajar adalah membangun narasi yang berangkat dari pengalaman konsumen, bukan klaim yang berlebihan.',
    action: 'Buat satu kisah pelanggan nyata yang menggambarkan perubahan sebelum dan sesudah menggunakan produk.',
    gradient: 'from-[#49305e] to-[#a366b4]',
  },
  {
    id: 'apple',
    brand: 'APPLE',
    badge: 'CONSISTENCY & ECOSYSTEM',
    category: 'positioning',
    title: 'Apple — Consistency Across Touchpoints',
    desc: 'Kajian tentang bagaimana keselarasan pesan, desain, dan pengalaman lintas kanal membantu memperjelas citra merek. Fokus belajar terletak pada kedisiplinan eksekusi, bukan keseragaman desain semata.',
    action: 'Bandingkan pesan dan tampilan brand Anda pada tiga kanal; tetapkan panduan minimum yang dapat dijalankan tim.',
    gradient: 'from-[#384259] to-[#a0aaba]',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Apakah 500 Brand Global merupakan website resmi Kementerian Perdagangan?',
    a: 'Bukan. Portal ini merupakan inisiatif ARRBEY Branding dan Sekolah Ekspor Nasional. Kementerian Perdagangan telah mempublikasikan audiensi terkait inisiatif tersebut pada 8 Oktober 2024. Penggunaan foto audiensi dan tautan berita resmi tidak menyatakan status program sebagai program resmi pemerintah.',
  },
  {
    q: 'Siapa yang dapat mengajukan minat mengikuti program?',
    a: 'Pemilik brand, pengelola UKM dan perusahaan, pelaku industri kreatif, serta organisasi yang membutuhkan penguatan merek atau pengembangan pasar. Persyaratan, kuota, dan hasil seleksi akan dijelaskan pada pengumuman resmi program.',
  },
  {
    q: 'Apakah 500 brand sudah menerima fasilitasi?',
    a: 'Belum ada klaim capaian pada halaman ini. Angka 500 adalah sasaran/target program untuk periode 2026–2029, sedangkan sasaran tahap awal 2026 adalah 100 brand.',
  },
  {
    q: 'Kapan Academy dan dashboard peserta tersedia?',
    a: 'Portal publik menjadi tahap pertama. Materi pembelajaran, akun peserta, monitoring, dan showcase merupakan pengembangan tahap berikutnya setelah sistem, kurikulum, serta tata kelola data siap.',
  },
  {
    q: 'Di mana pelatihan vokasi dan uji kompetensi diselenggarakan?',
    a: 'Pembelajaran terstruktur (LMS) dan uji kompetensi sertifikasi peserta dilaksanakan secara terpusat melalui platform mitra resmi Skolah.com.',
  },
];

interface HomeProps {
  cms?: {
    hero?: Record<string, string>;
    news_bar?: Record<string, string>;
    about?: Record<string, string>;
    pillars?: Array<{ number: string; title: string; desc: string; tag: string }>;
    faq?: Array<{ q: string; a: string }>;
    contact?: Record<string, string>;
    gallery_photos?: Array<{ src: string; alt?: string }>;
  };
}

export default function Home({ cms }: HomeProps) {
  const heroData = cms?.hero || {};
  const newsData = cms?.news_bar || {};
  const aboutData = cms?.about || {};
  const faqList = (cms?.faq && cms.faq.length > 0) ? cms.faq : FAQ_ITEMS;
  const contactData = cms?.contact || {};

  // State for Case Studies filtering and modal
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // State for Image Lightbox Modal
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick WhatsApp Form State
  const [quickForm, setQuickForm] = useState({
    fullName: '',
    brandName: '',
    sector: '',
    need: '',
    consent: false,
  });

  const filteredCases = activeCategory === 'all'
    ? CASES_DATA
    : CASES_DATA.filter((c) => c.category === activeCategory);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.consent) {
      alert('Harap centang persetujuan pengiriman WhatsApp.');
      return;
    }
    const message = `Halo Tim 500 Brand Global, saya ingin memperoleh informasi program.\n\nNama: ${quickForm.fullName}\nBrand/usaha: ${quickForm.brandName}\nKategori: ${quickForm.sector}\nMinat: ${quickForm.need}\n\nMohon informasi lebih lanjut. Terima kasih.`;
    const waNum = contactData.whatsapp || '628119435300';
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans selection:bg-[#f3b641] selection:text-[#061a33]">
      <Head>
        <title>500 Brand Global — National Brand Transformation Portal</title>
        <meta
          name="description"
          content="500 Brand Global — portal pengembangan merek Indonesia melalui pembelajaran, rebranding, pelatihan, pendampingan dan akses pasar global. Inisiatif ARRBEY Branding dan Sekolah Ekspor Nasional."
        />
      </Head>

      <Navbar />

      {/* SECTION 0: HERO BANNER */}
      <section id="beranda" className="hero bg-gradient-to-r from-[#06172c] via-[#0a2748] to-[#0a315a] text-white relative overflow-hidden">
        {/* Subtle ambient decorative circle */}
        <div className="absolute -left-28 -bottom-36 w-[550px] h-[550px] rounded-full border border-sky-400/10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-[#f3b641]/5 blur-3xl pointer-events-none" />

        <div className="wrap max-w-[1200px] mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="space-y-6">
            <span className="eyebrow text-[#f3b641] font-extrabold text-[12px] tracking-[0.16em] uppercase block">
              {heroData.eyebrow || 'Program Nasional 500 Brand Go Global • 2026–2029'}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.08] text-white">
              {heroData.title_prefix || 'Dari Brand Nasional Menjadi'}{' '}
              <span className="text-[#f3b641]">{heroData.title_highlight || 'Brand Global.'}</span>
            </h1>

            <p className="text-[#d4e0eb] text-[16px] sm:text-[17px] leading-relaxed max-w-xl">
              {heroData.subtitle || 'Membangun merek Indonesia yang kuat, kompetitif, dan siap mendunia melalui transformasi brand, pengembangan talenta, pembelajaran, dan akses pasar internasional.'}
            </p>

            <div className="flex flex-wrap gap-3.5 pt-1">
              <Link
                href={heroData.cta_primary_link || '/daftar'}
                className="btn btn-gold text-[13px] font-black px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
              >
                {heroData.cta_primary_text || 'Bergabung dengan Program'} <span>↗</span>
              </Link>
              <a
                href={heroData.cta_secondary_link || '#program'}
                className="btn btn-outline text-[13px] font-bold px-6 py-3.5 rounded-xl border border-[#96b8d6]/40 hover:bg-white/10 transition-colors"
              >
                {heroData.cta_secondary_text || 'Jelajahi Program ↓'}
              </a>
            </div>

            {/* Target Meta */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10 text-[12px] text-[#b5c8dc]">
              <span>◎ Target <strong className="text-white font-extrabold">{heroData.target_count || '500 brand'}</strong></span>
              <span>◷ Periode <strong className="text-white font-extrabold">{heroData.target_period || '2026–2029'}</strong></span>
              <span>↗ Jangkauan <strong className="text-white font-extrabold">{heroData.target_reach || 'pasar global'}</strong></span>
            </div>
          </div>

          {/* Right Hero Visual with Real Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#081e35] group">
              <img
                src={heroData.hero_image || '/images/preview_img_1.jpeg'}
                alt="Dokumentasi Audiensi 500 Brand Global"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                fetchPriority="high"
              />
              <div className="absolute top-4 right-4 bg-[#f3b641] text-[#061a33] text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-md shadow">
                {heroData.hero_image_tag || 'DOKUMENTASI AUDIENSI · 8 OKT 2024'}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#06172cdb] via-[#06172ce6] to-transparent text-white text-[12px] backdrop-blur-md border-l-4 border-l-[#f3b641]">
                <strong className="block text-[#f5c76a] text-[13px] mb-0.5">
                  {heroData.hero_caption_title || 'Dialog pengembangan 500 Brand Go Global'}
                </strong>
                {heroData.hero_caption_desc || 'Kepala Sekolah Ekspor bertemu Menteri Perdagangan RI, Jakarta, 8 Oktober 2024.'}{' '}
                <span className="text-[#c6e5ff] text-[11px] block mt-0.5">
                  {heroData.hero_caption_credit || 'Foto: dokumentasi yang disediakan penyelenggara.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS BAR */}
      <section className="bg-[#f5f8fb] border-b border-[#e0e8f0] py-4">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-[#0c416e] text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded w-max">
                {newsData.label || 'KABAR TERKINI'}
              </span>
              <div className="text-[13px] text-[#204366] leading-snug">
                <strong>{newsData.title || 'Audiensi bersama Menteri Perdagangan RI (8 Oktober 2024):'}</strong>{' '}
                {newsData.source || 'membahas inisiatif Program Nasional 500 Brand Go Global.'}
              </div>
            </div>
            <a
              href={newsData.link || 'https://www.kemendag.go.id/berita/foto/mendag-menerima-audiensi-sekolah-ekspor'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b5b83] font-extrabold text-[12px] hover:underline whitespace-nowrap self-start sm:self-auto"
            >
              Baca di kemendag.go.id ↗
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: TENTANG (INDONESIA'S BRAND TRANSFORMATION JOURNEY) */}
      <section id="tentang" className="py-20 bg-white">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          {/* Section Head */}
          <div className="max-w-[720px] mb-12">
            <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              INDONESIA'S BRAND TRANSFORMATION JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061a33] tracking-tight leading-tight mb-3">
              Satu portal. Berbagai jalan menuju daya saing global.
            </h2>
            <p className="text-[#62758a] text-[15px] sm:text-[16px] leading-relaxed">
              500 Brand Global menghubungkan pengetahuan, pelaku usaha, pendamping, dan peluang pasar. Program utamanya bertujuan memfasilitasi 500 brand Indonesia selama 2026–2029.
            </p>
          </div>

          {/* Split Content: Photos on Left, Metrics & Text on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: 3-Photo Grid with minister documentation */}
            <div>
              <div className="flex flex-col gap-3">
                {/* Foto Bersama 5 Orang — Full Width landscape (aspect 3:2), utuh tanpa ter-crop */}
                <div
                  className="rounded-2xl overflow-hidden shadow-md cursor-pointer group relative bg-[#09223c]"
                  onClick={() => setLightboxImg({ src: aboutData.main_photo || '/images/preview_img_2.jpeg', alt: 'Foto bersama peserta audiensi 8 Oktober 2024' })}
                >
                  <img
                    src={aboutData.main_photo || '/images/preview_img_2.jpeg'}
                    alt="Foto bersama peserta audiensi 8 Oktober 2024"
                    className="w-full aspect-[1498/1000] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none flex items-end justify-end p-3">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      🔍 Perbesar Foto
                    </span>
                  </div>
                </div>

                {/* 2 Foto Pendukung Audiensi — Berdampingan 2 kolom (aspect 3:2) */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl overflow-hidden shadow-sm cursor-pointer group relative bg-[#09223c]"
                    onClick={() => setLightboxImg({ src: aboutData.sub_photo_1 || '/images/preview_img_3.jpeg', alt: 'Diskusi audiensi Program Nasional 500 Brand Go Global' })}
                  >
                    <img
                      src={aboutData.sub_photo_1 || '/images/preview_img_3.jpeg'}
                      alt="Diskusi audiensi Program Nasional 500 Brand Go Global"
                      className="w-full aspect-[1498/1000] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none" />
                  </div>
                  <div
                    className="rounded-xl overflow-hidden shadow-sm cursor-pointer group relative bg-[#09223c]"
                    onClick={() => setLightboxImg({ src: aboutData.sub_photo_2 || '/images/preview_img_4.jpeg', alt: 'Penjelasan program dalam audiensi' })}
                  >
                    <img
                      src={aboutData.sub_photo_2 || '/images/preview_img_4.jpeg'}
                      alt="Penjelasan program dalam audiensi"
                      className="w-full aspect-[1498/1000] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#718499] mt-3 leading-relaxed">
                Dokumentasi pertemuan 8 Oktober 2024. Pencantuman foto tidak menyatakan bahwa program telah ditetapkan sebagai program resmi kementerian.
              </p>
            </div>

            {/* Right: Target Badge, 4 Metrics, and Lead Paragraphs */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e5f3f6] text-[#0e6780] text-[11px] font-extrabold tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0f9799]"></span>
                Target pengembangan 2026–2029
              </div>

              {/* 4 Metrics Strip */}
              <div className="grid grid-cols-4 gap-2 border-b border-[#dde5eb] pb-6 mb-6 text-center">
                <div className="border-r border-[#dde5eb] pr-2">
                  <span className="block text-3xl sm:text-4xl font-black text-[#0c355c] tracking-tight">500</span>
                  <span className="text-[11px] sm:text-[12px] text-[#667b8c] font-medium block mt-1">Brand sasaran</span>
                </div>
                <div className="border-r border-[#dde5eb] pr-2">
                  <span className="block text-3xl sm:text-4xl font-black text-[#0c355c] tracking-tight">100</span>
                  <span className="text-[11px] sm:text-[12px] text-[#667b8c] font-medium block mt-1">Sasaran awal 2026</span>
                </div>
                <div className="border-r border-[#dde5eb] pr-2">
                  <span className="block text-3xl sm:text-4xl font-black text-[#0c355c] tracking-tight">8</span>
                  <span className="text-[11px] sm:text-[12px] text-[#667b8c] font-medium block mt-1">Tahap transformasi</span>
                </div>
                <div>
                  <span className="block text-3xl sm:text-4xl font-black text-[#0c355c] tracking-tight">3</span>
                  <span className="text-[11px] sm:text-[12px] text-[#667b8c] font-medium block mt-1">Jalur pembelajaran</span>
                </div>
              </div>

              <p className="text-[15px] text-[#53687f] leading-relaxed mb-4">
                Portal ini menyatukan transformasi merek dan peningkatan kapasitas usaha: dari strategi positioning, kemasan, pemasaran digital, kesiapan ekspor, hingga pendampingan pengembangan pasar.
              </p>
              <p className="text-[15px] text-[#53687f] leading-relaxed">
                Inisiatif dirancang untuk pelaku UKM, perusahaan, industri kreatif, komunitas, perguruan tinggi, destinasi, serta berbagai brand berbasis produk maupun jasa.
              </p>
            </div>
          </div>

          {/* 3 Values Row Below: TRANSFORM, EQUIP, EXPAND */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <article className="border border-[#dce6ee] rounded-2xl bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-[11px] font-black text-[#cc8b25] tracking-wider uppercase block mb-3">
                01 / TRANSFORM
              </span>
              <h3 className="text-lg font-bold text-[#061a33] mb-2">Brand yang lebih kuat</h3>
              <p className="text-[13px] text-[#607489] leading-relaxed">
                Strategi, positioning, identitas, diferensiasi, dan pengalaman merek yang relevan.
              </p>
            </article>

            <article className="border border-[#dce6ee] rounded-2xl bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-[11px] font-black text-[#cc8b25] tracking-wider uppercase block mb-3">
                02 / EQUIP
              </span>
              <h3 className="text-lg font-bold text-[#061a33] mb-2">Talenta yang siap</h3>
              <p className="text-[13px] text-[#607489] leading-relaxed">
                Pelatihan berbasis kompetensi serta pendampingan implementasi.
              </p>
            </article>

            <article className="border border-[#dce6ee] rounded-2xl bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-[11px] font-black text-[#cc8b25] tracking-wider uppercase block mb-3">
                03 / EXPAND
              </span>
              <h3 className="text-lg font-bold text-[#061a33] mb-2">Pasar yang lebih luas</h3>
              <p className="text-[13px] text-[#607489] leading-relaxed">
                Pengembangan pasar domestik, kesiapan ekspor, dan akses pembeli internasional.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROGRAM DAN LAYANAN & DELAPAN TAHAP TRANSFORMASI */}
      <section id="program" className="py-20 bg-[#f5f8fb] border-t border-[#e2eaf0]">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="max-w-[700px] mb-12">
            <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              PROGRAM DAN LAYANAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061a33] tracking-tight leading-tight mb-3">
              Mulai dari belajar hingga bertumbuh di pasar global.
            </h2>
            <p className="text-[#62758a] text-[15px]">
              Tiga tingkatan layanan disusun agar brand dapat berkembang sesuai kesiapan, kebutuhan, dan kapasitasnya.
            </p>
          </div>

          {/* 3 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <article className="relative bg-white border border-[#e0e7ee] rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all overflow-hidden border-t-4 border-t-[#0d638b]">
              <div className="text-2xl font-black text-[#0d7899] mb-4">
                01<span className="text-[#dda139]">.</span>
              </div>
              <h3 className="text-xl font-bold text-[#061a33] mb-2">GCB Membership</h3>
              <p className="text-[13px] text-[#647487] leading-relaxed mb-5">
                Pintu masuk ke ekosistem 500 Brand Global untuk belajar dan membangun jejaring.
              </p>
              <ul className="space-y-2 text-[12px] text-[#345570] border-t border-[#ecf0f4] pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Akses pengetahuan dan wawasan merek
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Agenda, materi belajar, dan komunitas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Informasi program lanjutan
                </li>
              </ul>
            </article>

            <article className="relative bg-white border border-[#e0e7ee] rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all overflow-hidden border-t-4 border-t-[#f2ac34]">
              <div className="text-2xl font-black text-[#f2ac34] mb-4">
                02<span className="text-[#dda139]">.</span>
              </div>
              <h3 className="text-xl font-bold text-[#061a33] mb-2">GCB Brand Clinic</h3>
              <p className="text-[13px] text-[#647487] leading-relaxed mb-5">
                Konsultansi terarah untuk menilai kondisi dan merumuskan rencana transformasi brand.
              </p>
              <ul className="space-y-2 text-[12px] text-[#345570] border-t border-[#ecf0f4] pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Diagnosis merek dan kesiapan usaha
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Repositioning dan diferensiasi
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Roadmap pengembangan merek
                </li>
              </ul>
            </article>

            <article className="relative bg-white border border-[#e0e7ee] rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all overflow-hidden border-t-4 border-t-[#0f9b8e]">
              <div className="text-2xl font-black text-[#0f9b8e] mb-4">
                03<span className="text-[#dda139]">.</span>
              </div>
              <h3 className="text-xl font-bold text-[#061a33] mb-2">GCB Go Global</h3>
              <p className="text-[13px] text-[#647487] leading-relaxed mb-5">
                Pendampingan implementasi dan pengembangan pasar untuk brand terkurasi.
              </p>
              <ul className="space-y-2 text-[12px] text-[#345570] border-t border-[#ecf0f4] pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Penguatan bisnis dan pemasaran
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Kesiapan ekspor dan buyer development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#079d86] font-bold">✓</span> Monitoring dan scale-up
                </li>
              </ul>
            </article>
          </div>

          {/* ROADMAP: Delapan Tahap Transformasi */}
          <div className="max-w-[700px] mb-8">
            <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              ROADMAP
            </span>
            <h2 className="text-3xl font-extrabold text-[#061a33] tracking-tight">
              Delapan tahap transformasi.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Brand & Business Diagnosis', desc: 'Memetakan posisi brand dan kesiapan usaha.' },
              { n: '02', title: 'Repositioning', desc: 'Merumuskan nilai dan diferensiasi merek.' },
              { n: '03', title: 'Product & Brand Development', desc: 'Produk, desain, kemasan, dan narasi brand.' },
              { n: '04', title: 'Digital Branding', desc: 'Komunikasi digital dan pemanfaatan teknologi.' },
              { n: '05', title: 'Market Development', desc: 'Riset dan strategi pasar domestik dan global.' },
              { n: '06', title: 'Export Readiness', desc: 'Persyaratan ekspor dan komunikasi pembeli.' },
              { n: '07', title: 'Implementation', desc: 'Mentoring dan pemantauan kemajuan.' },
              { n: '08', title: 'Sustainable Scale-Up', desc: 'Pertumbuhan berkelanjutan dan ekspansi pasar.' },
            ].map((step, idx) => (
              <article
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#d9e6ee] shadow-sm hover:border-[#f3b641] hover:shadow-md transition-all"
              >
                <div className="text-3xl font-black text-[#db9c2f] tracking-tight mb-2">
                  {step.n}
                </div>
                <h3 className="text-[15px] font-bold text-[#061a33] mb-1.5">{step.title}</h3>
                <p className="text-[12px] text-[#69798b] leading-relaxed">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ACADEMY */}
      <section id="academy" className="py-20 bg-[#071d37] text-white relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute right-[-60px] bottom-[-40px] text-[180px] font-black text-white/[0.04] select-none pointer-events-none tracking-tighter">
          GLOBAL
        </div>

        <div className="wrap max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="max-w-[700px] mb-12">
            <span className="eyebrow text-[#f3b641] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              500 BRAND GLOBAL ACADEMY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Belajar dari pasar dunia.<br />Menerapkannya untuk Indonesia.
            </h2>
            <p className="text-[#a8c4df] text-[15px]">
              Ruang belajar terbuka tentang branding, marketing, transformasi usaha, ekspor, dan praktik terbaik merek global.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Card: Pelatihan Vokasi */}
            <div className="bg-white/[0.06] border border-white/15 rounded-3xl p-8 backdrop-blur-sm">
              <span className="eyebrow text-[#f3b641] font-black text-[11px] tracking-wider uppercase block mb-2">
                PELATIHAN VOKASI
              </span>
              <h3 className="text-2xl font-bold text-[#f5c777] mb-3">
                Pengembangan kapasitas pemilik brand, talenta, dan pendamping.
              </h3>
              <p className="text-[#c5d8e8] text-[13px] leading-relaxed mb-6">
                Materi pembelajaran, studi kasus, sesi praktik, pendampingan, dan penguatan kompetensi. Jadwal serta persyaratan akan diumumkan melalui portal.
              </p>
              <Link
                href="/daftar"
                className="btn btn-gold px-6 py-3.5 text-[13px] font-black rounded-xl inline-block shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform"
              >
                Daftarkan Minat →
              </Link>
            </div>

            {/* Right List: Jalur A, B, C & Library */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-between text-[13px] hover:bg-white/10 transition-colors">
                <span className="font-bold text-white">Jalur A</span>
                <span className="text-[#f4b64d] font-bold">Fondasi Ekspor & Global Brand</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-between text-[13px] hover:bg-white/10 transition-colors">
                <span className="font-bold text-white">Jalur B</span>
                <span className="text-[#f4b64d] font-bold">Produk & Brand Ekspor</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-between text-[13px] hover:bg-white/10 transition-colors">
                <span className="font-bold text-white">Jalur C</span>
                <span className="text-[#f4b64d] font-bold">Pemasaran Internasional & Akses Pasar</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-between text-[13px] hover:bg-white/10 transition-colors">
                <span className="font-bold text-white">Global Brand Library</span>
                <span className="text-[#f4b64d] font-bold">Framework, Insight & Cases</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: GLOBAL BRAND CASE LIBRARY */}
      <section id="cases" className="py-20 bg-white">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="max-w-[700px] mb-8">
            <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              GLOBAL BRAND CASE LIBRARY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061a33] tracking-tight leading-tight mb-3">
              Belajar dari brand besar dunia.
            </h2>
            <p className="text-[#62758a] text-[15px]">
              Pelajaran strategi merek internasional untuk menginspirasi keputusan brand Indonesia. Studi kasus ini disusun secara independen, bukan afiliasi dengan pemilik merek.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {[
              { id: 'all', label: 'Semua kasus' },
              { id: 'positioning', label: 'Positioning' },
              { id: 'experience', label: 'Experience' },
              { id: 'community', label: 'Community' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveCategory(f.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                  activeCategory === f.id
                    ? 'bg-[#0b345c] text-white shadow-sm'
                    : 'bg-white border border-[#cddbe6] text-[#486379] hover:bg-[#f3f7fa]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((item) => (
              <article
                key={item.id}
                className="border border-[#dde7ef] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`h-[120px] p-5 flex justify-between items-end bg-gradient-to-br ${item.gradient} text-white`}>
                    <span className="text-2xl font-black tracking-tight">{item.brand}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[17px] font-bold text-[#061a33] mb-2">{item.title}</h3>
                    <p className="text-[12px] text-[#61748a] leading-relaxed min-h-[50px] mb-4">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCase(item)}
                    className="text-[#146b98] font-black text-[12px] hover:text-[#0b345c] hover:underline cursor-pointer"
                  >
                    Baca insight →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: KABAR PROGRAM & DOKUMENTASI */}
      <section id="kabar" className="py-20 bg-[#f5f8fb] border-t border-[#e0e8f0]">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="max-w-[700px] mb-10">
            <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              KABAR PROGRAM & DOKUMENTASI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061a33] tracking-tight leading-tight mb-3">
              Dialog yang membuka peluang kolaborasi.
            </h2>
            <p className="text-[#62758a] text-[15px]">
              Kronologi perkembangan inisiatif disampaikan dengan sumber dan konteks yang jelas.
            </p>
          </div>

          {/* Featured Audiensi Card */}
          <article className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] bg-[#092b4f] text-white rounded-3xl overflow-hidden shadow-xl mb-6">
            <img
              src="/images/preview_img_5.jpeg"
              alt="Foto bersama audiensi Kepala Sekolah Ekspor dan Menteri Perdagangan RI, 8 Oktober 2024"
              className="w-full h-full min-h-[300px] object-cover"
              loading="lazy"
            />
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <small className="text-[#f4bf57] font-black tracking-wider text-[11px] uppercase block mb-2">
                8 OKTOBER 2024 · JAKARTA
              </small>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                Menteri Perdagangan menerima audiensi Sekolah Ekspor.
              </h2>
              <p className="text-[#cfe0ef] text-[14px] leading-relaxed mb-6">
                Dalam pertemuan tersebut dibahas inisiatif Program Nasional 500 Brand Go Global untuk memperluas peluang UMKM Indonesia menembus pasar global. Publikasi Kementerian Perdagangan menyatakan bahwa Mendag menyambut baik inisiatif ini.
              </p>
              <div>
                <a
                  href="https://www.kemendag.go.id/berita/foto/mendag-menerima-audiensi-sekolah-ekspor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold text-[13px] font-black px-6 py-3 rounded-xl inline-block"
                >
                  Baca di kemendag.go.id ↗
                </a>
              </div>
            </div>
          </article>

          {/* 4-Photo Documentation Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            {(cms?.gallery_photos && cms.gallery_photos.length > 0
              ? cms.gallery_photos
              : [
                  { src: '/images/preview_img_6.jpeg', alt: 'Audiensi Kemendag, foto 2' },
                  { src: '/images/preview_img_7.jpeg', alt: 'Audiensi Kemendag, foto 3' },
                  { src: '/images/preview_img_8.jpeg', alt: 'Audiensi Kemendag, foto 4' },
                  { src: '/images/preview_img_9.jpeg', alt: 'Audiensi Kemendag, foto 5' },
                ]
            ).map((pic: { src: string; alt?: string }, idx: number) => (
              <div
                key={idx}
                className="h-[160px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:opacity-90 group transition-all"
                onClick={() => setLightboxImg({ src: pic.src, alt: pic.alt || `Dokumentasi foto ${idx + 1}` })}
              >
                <img
                  src={pic.src}
                  alt={pic.alt || `Dokumentasi ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#718499] mt-3 leading-relaxed">
            Dokumentasi audiensi adalah dokumentasi pertemuan; halaman ini tidak mengklaim penetapan program sebagai program resmi Kementerian Perdagangan.
          </p>

          {/* Editorial Stories: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <article className="border border-[#dde5ed] rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all">
              <small className="text-[10px] font-black text-[#a6752b] tracking-wider uppercase block mb-1">
                BERITA RESMI • 8 OKTOBER 2024
              </small>
              <h3 className="text-lg font-bold text-[#061a33] mb-2">Mendag Menerima Audiensi Sekolah Ekspor</h3>
              <p className="text-[12px] text-[#65768a] leading-relaxed mb-4">
                Rujukan primer tentang pembahasan inisiatif Program Nasional 500 Brand Go Global.
              </p>
              <a
                href="https://www.kemendag.go.id/berita/foto/mendag-menerima-audiensi-sekolah-ekspor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-extrabold text-[#0a6289] hover:underline"
              >
                Lihat berita resmi ↗
              </a>
            </article>

            <article className="border border-[#dde5ed] rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all">
              <small className="text-[10px] font-black text-[#a6752b] tracking-wider uppercase block mb-1">
                ROADMAP • 2026–2029
              </small>
              <h3 className="text-lg font-bold text-[#061a33] mb-2">Transformasi Merek untuk Pasar Global</h3>
              <p className="text-[12px] text-[#65768a] leading-relaxed mb-4">
                Delapan tahap pendekatan program yang menghubungkan rebranding dengan kesiapan pasar.
              </p>
              <a href="#program" className="text-[12px] font-extrabold text-[#0a6289] hover:underline">
                Pelajari model program ↗
              </a>
            </article>

            <article className="border border-[#dde5ed] rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all">
              <small className="text-[10px] font-black text-[#a6752b] tracking-wider uppercase block mb-1">
                GLOBAL BRAND ACADEMY
              </small>
              <h3 className="text-lg font-bold text-[#061a33] mb-2">Pelajaran dari Merek Global</h3>
              <p className="text-[12px] text-[#65768a] leading-relaxed mb-4">
                Rangkaian pembelajaran strategi, positioning, desain pengalaman, dan pengembangan pasar.
              </p>
              <a href="#cases" className="text-[12px] font-extrabold text-[#0a6289] hover:underline">
                Jelajahi studi kasus ↗
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 6: BRAND SHOWCASE CALLOUT */}
      <section className="py-16 bg-white">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="bg-gradient-to-r from-[#0a2d54] to-[#0e6382] rounded-3xl text-white p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
            <div>
              <span className="eyebrow text-[#ffd47b] font-black text-[11px] tracking-wider uppercase block mb-2">
                BRAND SHOWCASE · FITUR BERIKUTNYA
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Ruang tampil untuk brand Indonesia.
              </h2>
              <p className="text-[#c9deeb] text-[14px] leading-relaxed max-w-xl">
                Showcase akan menampilkan profil brand peserta yang telah menyetujui publikasi, perkembangan produk, dan peluang kerja sama. Status brand dan klaim kesiapan ekspor akan ditampilkan setelah melalui proses validasi.
              </p>
            </div>
            <div className="text-center">
              <span className="text-6xl sm:text-7xl font-black text-[#e6b351] tracking-tight block">
                500<span className="text-white">↗</span>
              </span>
              <div className="text-[11px] font-black tracking-[0.15em] text-[#b0d2e4] mt-1">
                INDONESIAN BRANDS • GLOBAL POTENTIAL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PENDAFTARAN & CONTACT LINES */}
      <section id="pendaftaran" className="py-20 bg-[#f5f8fb] border-t border-[#e2eaf0]">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Apply Intro & Contact Lines */}
            <div className="space-y-6">
              <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block">
                GABUNG EKOSISTEM 500 BRAND GLOBAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061a33] tracking-tight leading-tight">
                Mulai perjalanan transformasi brand Anda.
              </h2>
              <p className="text-[#5c7187] text-[15px] leading-relaxed">
                Pilih jalur pendaftaran resmi online Tahap 1 untuk masuk ke dalam database program, atau hubungi tim sekretariat melalui WhatsApp untuk konsultasi awal.
              </p>

              {/* Direct Full Form Link Banner */}
              <div className="p-6 rounded-2xl bg-white border border-[#dce6ee] shadow-sm space-y-3">
                <strong className="text-[#061a33] text-[15px] block font-extrabold">
                  Formulir Pendaftaran Peminat Resmi Tahap 1:
                </strong>
                <p className="text-[13px] text-[#587089] leading-relaxed">
                  Isi data identitas diri, usaha atau organisasi, dan produk Anda untuk mendapatkan nomor registrasi resmi serta akses pembelajaran awal.
                </p>
                <Link
                  href="/daftar"
                  className="btn btn-gold text-[13px] font-black px-6 py-3.5 rounded-xl shadow inline-flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  Buka Formulir Pendaftaran Lengkap →
                </Link>
              </div>

              {/* Contact Lines */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[12px] font-bold text-[#061a33] uppercase tracking-wider block">
                  Kontak Sekretariat Program:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                  <a
                    href="https://wa.me/628119435300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-[#dce6ee] flex items-center gap-3 text-[#164d76] font-bold hover:border-[#1065a1] transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#e5f2f9] text-[#0b5b83] grid place-items-center flex-none font-black">
                      ↗
                    </span>
                    <span>0811 943 5300</span>
                  </a>
                  <a
                    href="https://wa.me/628118403477"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-[#dce6ee] flex items-center gap-3 text-[#164d76] font-bold hover:border-[#1065a1] transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#e5f2f9] text-[#0b5b83] grid place-items-center flex-none font-black">
                      ↗
                    </span>
                    <span>0811 840 3477</span>
                  </a>
                  <a
                    href="mailto:halo@arrbey.com"
                    className="p-3 rounded-xl bg-white border border-[#dce6ee] flex items-center gap-3 text-[#164d76] font-bold hover:border-[#1065a1] transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#e5f2f9] text-[#0b5b83] grid place-items-center flex-none font-black">
                      @
                    </span>
                    <span>halo@arrbey.com</span>
                  </a>
                  <a
                    href="mailto:halo@sekolahekspor.com"
                    className="p-3 rounded-xl bg-white border border-[#dce6ee] flex items-center gap-3 text-[#164d76] font-bold hover:border-[#1065a1] transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#e5f2f9] text-[#0b5b83] grid place-items-center flex-none font-black">
                      @
                    </span>
                    <span>halo@sekolahekspor.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Quick WhatsApp Form from prototype */}
            <form onSubmit={handleQuickSubmit} className="bg-white p-8 rounded-3xl border border-[#dbe5ed] shadow-lg space-y-4">
              <h3 className="text-xl font-black text-[#061a33] mb-2">Formulir Minat Cepat (WhatsApp)</h3>
              
              <div>
                <label className="block text-[#244561] text-[12px] font-bold mb-1">
                  Nama penanggung jawab
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap Anda"
                  maxLength={80}
                  value={quickForm.fullName}
                  onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#ccdae7] text-[13px] text-[#0d3155] focus:outline-none focus:border-[#0c83a1] focus:ring-2 focus:ring-[#0c83a1]/20"
                />
              </div>

              <div>
                <label className="block text-[#244561] text-[12px] font-bold mb-1">
                  Nama brand / usaha
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama brand atau usaha"
                  maxLength={80}
                  value={quickForm.brandName}
                  onChange={(e) => setQuickForm({ ...quickForm, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#ccdae7] text-[13px] text-[#0d3155] focus:outline-none focus:border-[#0c83a1] focus:ring-2 focus:ring-[#0c83a1]/20"
                />
              </div>

              <div>
                <label className="block text-[#244561] text-[12px] font-bold mb-1">
                  Bidang / kategori
                </label>
                <select
                  required
                  value={quickForm.sector}
                  onChange={(e) => setQuickForm({ ...quickForm, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#ccdae7] text-[13px] text-[#0d3155] bg-white focus:outline-none focus:border-[#0c83a1] focus:ring-2 focus:ring-[#0c83a1]/20"
                >
                  <option value="">Pilih kategori</option>
                  <option value="Produk makanan dan minuman">Produk makanan dan minuman</option>
                  <option value="Fashion dan kriya">Fashion dan kriya</option>
                  <option value="Jasa dan teknologi">Jasa dan teknologi</option>
                  <option value="Destinasi dan ekonomi kreatif">Destinasi dan ekonomi kreatif</option>
                  <option value="Komunitas / organisasi / daerah">Komunitas / organisasi / daerah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-[#244561] text-[12px] font-bold mb-1">
                  Kebutuhan utama
                </label>
                <select
                  required
                  value={quickForm.need}
                  onChange={(e) => setQuickForm({ ...quickForm, need: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#ccdae7] text-[13px] text-[#0d3155] bg-white focus:outline-none focus:border-[#0c83a1] focus:ring-2 focus:ring-[#0c83a1]/20"
                >
                  <option value="">Pilih kebutuhan</option>
                  <option value="GCB Membership">GCB Membership</option>
                  <option value="GCB Brand Clinic">GCB Brand Clinic</option>
                  <option value="GCB Go Global">GCB Go Global</option>
                  <option value="Informasi pelatihan vokasi">Informasi pelatihan vokasi</option>
                </select>
              </div>

              <label className="flex items-start gap-2.5 text-[12px] text-[#576c83] leading-relaxed cursor-pointer pt-2">
                <input
                  type="checkbox"
                  required
                  checked={quickForm.consent}
                  onChange={(e) => setQuickForm({ ...quickForm, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#f3b641] rounded focus:ring-0"
                />
                <span>
                  Saya memahami bahwa tombol di bawah akan membuka WhatsApp berisi informasi yang saya isi. Pesan hanya akan dikirim apabila saya menyetujuinya di aplikasi WhatsApp.
                </span>
              </label>

              <button
                type="submit"
                className="btn btn-gold w-full text-[13px] font-black py-3.5 rounded-xl shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Lanjutkan ke WhatsApp →
              </button>

              <p className="text-[11px] text-[#718499] text-center pt-1 leading-snug">
                Atau gunakan <Link href="/daftar" className="text-[#0e6780] font-bold underline">Formulir Pendaftaran Lengkap</Link> untuk mendaftarkan data ke portal resmi.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-white border-t border-[#e2eaf0]">
        <div className="wrap max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="eyebrow text-[#c4882c] font-black text-[11px] tracking-[0.16em] uppercase block mb-2">
              PERTANYAAN UMUM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061a33] tracking-tight">
              Informasi penting tentang program.
            </h2>
          </div>

          <div className="space-y-3">
            {faqList.map((item, idx) => (
              <div
                key={idx}
                className="border border-[#dce6ee] rounded-2xl overflow-hidden transition-all hover:border-[#1065a1]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-[14px] text-[#061a33] bg-[#fbfdfe] hover:bg-[#f5f9fc] flex justify-between items-center transition-colors cursor-pointer"
                >
                  <span className="pr-4">{item.q}</span>
                  <span className="text-2xl font-bold text-[#ba811e] flex-none">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="p-5 bg-white border-t border-[#eef3f7] text-[13px] text-[#587089] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* CASE STUDY INSIGHT MODAL */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 bg-[#061626]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="bg-white max-w-[640px] w-full rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#ecf2f7] text-[#153553] font-bold text-lg grid place-items-center hover:bg-gray-200 cursor-pointer"
              aria-label="Tutup"
            >
              ×
            </button>
            <span className="eyebrow text-[#c4882c] font-black text-[10px] tracking-wider uppercase block mb-1">
              GLOBAL BRAND CASE LIBRARY
            </span>
            <h2 className="text-2xl font-black text-[#061a33] mb-3">
              {selectedCase.title}
            </h2>
            <p className="text-[#566e82] text-[14px] leading-relaxed mb-6">
              {selectedCase.desc}
            </p>
            <div className="bg-[#edf5fa] p-5 rounded-2xl border border-[#d6e6f2] mb-4">
              <strong className="text-[#0c355c] text-[13px] block mb-1">
                Aplikasi untuk brand Indonesia:
              </strong>
              <p className="text-[13px] text-[#425d75] leading-relaxed">
                {selectedCase.action}
              </p>
            </div>
            <p className="text-[11px] text-[#718499] italic">
              Materi pembelajaran independen; tidak berafiliasi dengan pemilik merek yang dibahas.
            </p>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-[#061626]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-[960px] max-h-[85vh] p-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-white font-bold text-2xl hover:text-[#f3b641] cursor-pointer"
              aria-label="Tutup"
            >
              ✕ Tutup
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
            />
            <p className="text-white/80 text-center text-[12px] mt-2">
              {lightboxImg.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
