import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Tahapan() {
  const steps = [
    {
      no: '01',
      name: 'Discover',
      subtitle: 'Gali Karakter & Nilai Otentik',
      desc: 'Mengidentifikasi potensi keunikan produk, kekayaan bahan baku lokal nusantara, cerita daerah, dan nilai diferensiasi tinggi yang tidak dapat ditiru oleh kompetitor asing.',
    },
    {
      no: '02',
      name: 'Assess',
      subtitle: 'Uji Kesiapan Standar & Mutu',
      desc: 'Penilaian komprehensif terhadap kapasitas produksi, konsistensi mutu, higienitas, dan kelayakan operasional dasar untuk melayani permintaan pasar luar negeri secara berkelanjutan.',
    },
    {
      no: '03',
      name: 'Curate',
      subtitle: 'Kurasi & Pemetaan Pasar Sasaran',
      desc: 'Kurasi awal dan pencocokan cerdas antara karakteristik produk dengan selera, daya beli, dan regulasi konsumen di negara tujuan ekspor spesifik.',
    },
    {
      no: '04',
      name: 'Diagnose',
      subtitle: 'Bedah Gap & Peluang Strategis',
      desc: 'Analisis mendalam mengenai kesenjangan (gap) kemasan lama, positioning harga internasional, pemenuhan sertifikasi, hingga perlindungan hak kekayaan intelektual (HKI/paten).',
    },
    {
      no: '05',
      name: 'Re-Brand',
      subtitle: 'Rancang Ulang Identitas Kelas Dunia',
      desc: 'Menyusun ulang identitas visual merek, kemasan berstandar ramah lingkungan, positioning harga ekspor, dan seni brand storytelling yang memikat selera pasar modern global.',
    },
    {
      no: '06',
      name: 'Validate',
      subtitle: 'Uji Respons Pasar & Kepatuhan Regulasi',
      desc: 'Pengujian produk langsung dengan sampel buyer mancanegara, uji terima pasar, dan verifikasi kepatuhan sertifikasi negara tujuan (seperti FDA, CE, Halal Global, dsb).',
    },
    {
      no: '07',
      name: 'Activate',
      subtitle: 'Peluncuran Kampanye Global Terpadu',
      desc: 'Peluncuran merek terbarukan, aktivasi digital multichannel lintas negara, kampanye media sosial berbahasa asing, dan partisipasi pada etalase perdagangan B2B dunia.',
    },
    {
      no: '08',
      name: 'Go Global',
      subtitle: 'Penetrasi Ekspor & Kemitraan Berkelanjutan',
      desc: 'Fasilitasi ekspor berkelanjutan, business matching dengan importir dan distributor terpercaya, serta ekspansi rak ritel modern di berbagai negara target.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>8 Tahapan Transformasi Merek | 500 Brand Global</title>
        <meta
          name="description"
          content="8 langkah presisi metodologi transformasi brand lokal Indonesia menuju panggung ekspor dan relevansi internasional."
        />
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-16">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Roadmap Eksekusi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            8 Langkah Presisi Menuju Pasar Dunia
          </h1>
          <p className="text-[#c8dbe9] text-[15px] sm:text-[16px] leading-relaxed">
            Metodologi teruji untuk mendampingi para pelaku usaha melompat dari merek lokal menjadi kekuatan komersial yang diperhitungkan di kancah internasional.
          </p>
        </div>
      </section>

      <main className="wrap max-w-4xl py-16">
        <div className="space-y-5">
          {steps.map((s) => (
            <div
              key={s.no}
              className="p-6 rounded-2xl bg-[#f8fafc] border border-[#dce6ee] flex flex-col sm:flex-row gap-5 items-start hover:border-[#f3b641] hover:shadow-md transition-all"
            >
              <div className="text-3xl font-black text-[#c4882c] bg-white px-4 py-2.5 rounded-xl border border-[#dce6ee] flex-none">
                {s.no}
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#009b94] uppercase tracking-wider block mb-0.5">
                  {s.subtitle}
                </span>
                <h3 className="text-xl font-bold text-[#061a33] mb-1.5">{s.name}</h3>
                <p className="text-[14px] text-[#587089] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <Link href="/daftar" className="btn btn-gold px-8 py-3.5 text-[13px] font-black rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
            Mulai dari Tahap 1: Pendaftaran Peminat →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
