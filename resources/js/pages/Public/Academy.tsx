import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Academy() {
  const topics = [
    {
      title: 'Global Brand Identity & Positioning Strategy',
      subtitle: 'Fondasi Re-Branding Internasional',
      desc: 'Merumuskan diferensiasi unik nusantara, arsitektur jenama, dan proposisi nilai (USP) yang memikat selera pasar ekspor modern.',
    },
    {
      title: 'International Packaging & Eco-Design Standards',
      subtitle: 'Standarisasi Kemasan Ritel Modern',
      desc: 'Standarisasi desain kemasan ramah lingkungan, kepatuhan bahasa regulasi, barcode global, dan sertifikasi nutrisi internasional.',
    },
    {
      title: 'Export Readiness & Global Compliance',
      subtitle: 'Kepatuhan Hukum & Dokumen Dagang',
      desc: 'Memahami regulasi kepabeanan, dokumen ekspor, sertifikasi negara tujuan (seperti FDA, CE, ISO, HACCP, Halal Global), dan mitigasi risiko transaksi.',
    },
    {
      title: 'Cross-Border Digital Marketing & Global E-Commerce',
      subtitle: 'Pemasaran Digital Multichannel',
      desc: 'Memaksimalkan SEO internasional, strategi konten media sosial berbahasa asing, dan taktik penetrasi platform marketplace global terkemuka.',
    },
    {
      title: 'B2B Trade Negotiation & Buyer Matching',
      subtitle: 'Seni Menutup Kesepakatan Ekspor',
      desc: 'Teknik korespondensi bisnis internasional, penyusunan kalkulasi harga ekspor (Incoterms & Quotation), dan seni negosiasi kontrak dengan importir mancanegara.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Global Brand Academy | 500 Brand Global</title>
        <meta
          name="description"
          content="Kurikulum komprehensif Global Brand Academy untuk membekali pendiri bisnis dan tim merek dengan keahlian ekspor modern."
        />
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-16">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Pusat Ilmu & Akselerasi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Global Brand Academy
          </h1>
          <p className="text-[#c8dbe9] text-[15px] sm:text-[16px] leading-relaxed">
            Kurikulum terstruktur dan aplikatif untuk membekali para founder, pemilik brand, dan praktisi dengan keahlian menembus pasar internasional.
          </p>
        </div>
      </section>

      <main className="wrap max-w-4xl py-16 space-y-10">
        <div>
          <span className="text-[#c4882c] font-black text-[12px] uppercase tracking-wider block mb-1">
            Kurikulum Praktis
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#061a33] mb-3">
            Modul Pembelajaran & Sertifikasi Profesi
          </h2>
          <p className="text-[#587089] text-[15px] leading-relaxed">
            Academy dirancang khusus untuk membedah tantangan nyata yang dihadapi jenama Indonesia saat melangkah ke luar negeri — mulai dari perancangan identitas visual hingga negosiasi kontrak bernilai miliaran rupiah.
          </p>
        </div>

        <div className="space-y-4">
          {topics.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#f8fafc] border border-[#dce6ee] hover:border-[#1065a1] transition-all">
              <span className="text-[11px] font-bold text-[#c4882c] uppercase block mb-1">
                Modul 0{i + 1} • {t.subtitle}
              </span>
              <h3 className="text-lg font-bold text-[#061a33] mb-1.5">{t.title}</h3>
              <p className="text-[13px] text-[#587089] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#071d37] to-[#0b2f57] text-white border border-white/10 shadow-xl">
          <span className="text-[11px] font-bold text-[#f3b641] uppercase tracking-wider block mb-2">
            Platform Edukasi Terpadu
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">
            Diselenggarakan Terpusat Melalui Skolah.com
          </h3>
          <p className="text-[13px] text-[#b8cfe4] leading-relaxed mb-6">
            Seluruh interaksi kelas daring, webinar interaktif bersama praktisi ekspor kawakan, tugas mandiri kurasi, dan ujian sertifikasi profesi branding dilaksanakan melalui platform mitra resmi <strong>Skolah.com</strong>.
          </p>
          <Link href="/daftar" className="btn btn-gold text-[13px] font-black px-6 py-3.5 rounded-xl inline-block shadow-lg hover:scale-[1.02] transition-transform">
            Daftar Peminat Tahap 1 Untuk Akses Pembelajaran →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
