import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa itu Program Nasional 500 Brand Go Global?',
      a: 'Gerakan Re-Branding Nasional Go Global (2026–2029) adalah inisiatif strategis akselerasi jenama Indonesia yang diinisiasi oleh ARRBEY Branding dan Sekolah Ekspor Nasional untuk mentransformasi merek-merek potensial Indonesia agar memiliki relevansi kuat, nilai tambah premium, dan daya saing tinggi di pasar perdagangan internasional.',
    },
    {
      q: 'Siapa saja yang boleh mendaftar pada Tahap 1?',
      a: 'Pintu terbuka luas untuk seluruh skala dan latar belakang: pelaku UMKM, korporasi, startup teknologi, koperasi produsen, asosiasi industri/profesi, organisasi/komunitas, perguruan tinggi, pemerintah daerah, profesional independen, hingga calon wirausaha yang baru merencanakan ide bisnis.',
    },
    {
      q: 'Apakah wajib sudah berbadan hukum PT atau memiliki izin ekspor?',
      a: 'Sama sekali tidak wajib pada Tahap 1. Usaha perorangan, rintisan baru, bahkan gagasan bisnis yang masih dalam tahap persiapan tetap dapat mendaftar untuk mengikuti pembelajaran fondasi legalitas dan kesiapan ekspor sejak awal.',
    },
    {
      q: 'Apakah pendaftaran ini menjamin langsung terpilih menjadi 500 brand?',
      a: 'Tidak. Pendaftaran Tahap 1 adalah langkah awal registrasi minat dan akses pembelajaran. Penetapan resmi kandidat 500 Brand Go Global pada Tahap 2 dilakukan melalui mekanisme kurasi terstruktur dan kriteria resmi yang ditentukan oleh instansi pemerintah terkait (Ditjen Perdagangan Dalam Negeri, Kemendag RI) setelah peserta menyelesaikan pembelajaran dan uji kompetensi di Skolah.com.',
    },
    {
      q: 'Berapa biaya pendaftaran untuk Tahap 1?',
      a: '100% Gratis. Tidak ada pungutan biaya pendaftaran awal apa pun untuk mengisi formulir minat Tahap 1 melalui portal resmi ini.',
    },
    {
      q: 'Bagaimana peran platform Skolah.com dalam program ini?',
      a: 'Skolah.com bertindak sebagai mitra platform Learning Management System (LMS) resmi tempat pelaksanaan seluruh modul pembelajaran daring terstruktur, webinar interaktif bersama praktisi ekspor, penugasan mandiri kurasi, dan penyelenggaraan uji kompetensi sertifikasi peserta.',
    },
    {
      q: 'Bagaimana jika saya belum memiliki nama merek (brand) atau produk jadi?',
      a: 'Anda tetap sangat disambut untuk mendaftar! Cukup pilih opsi "Belum memiliki usaha aktif (masih berupa ide / rencana baru)" pada formulir, dan Anda akan dibimbing untuk memahami cara merancang identitas brand berstandar global sejak hari pertama.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Tanya Jawab (FAQ) | 500 Brand Global</title>
        <meta
          name="description"
          content="Pertanyaan yang sering diajukan mengenai pendaftaran, kurikulum, dan tahapan Program Nasional 500 Brand Go Global."
        />
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-16">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Pusat Bantuan & Informasi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>
          <p className="text-[#c8dbe9] text-[15px] sm:text-[16px] leading-relaxed">
            Temukan jawaban ringkas dan jelas seputar alur program, persyaratan keikutsertaan, dan tahapan pendaftaran.
          </p>
        </div>
      </section>

      <main className="wrap max-w-3xl py-16">
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#dce6ee] rounded-xl overflow-hidden hover:border-[#1065a1] transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-[14px] text-[#061a33] bg-[#fbfdfe] hover:bg-[#f5f9fc] flex justify-between items-center transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-xl font-bold text-[#ba811e] ml-4 flex-none">
                  {openIdx === idx ? '−' : '+'}
                </span>
              </button>
              {openIdx === idx && (
                <div className="p-5 bg-white border-t border-[#eef3f7] text-[13px] text-[#587089] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <Link href="/daftar" className="btn btn-gold px-8 py-3.5 text-[13px] font-black rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
            Buka Formulir Pendaftaran Tahap 1 →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
