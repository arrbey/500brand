import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Ketentuan() {
  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Syarat & Ketentuan | 500 Brand Global</title>
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-14">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Ketentuan Layanan
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Syarat dan Ketentuan Program
          </h1>
          <p className="text-[#c8dbe9] text-[15px] leading-relaxed">
            Ketentuan umum partisipasi dalam Program Nasional 500 Brand Go Global (2026–2029).
          </p>
        </div>
      </section>

      <main className="wrap max-w-3xl py-16 space-y-8 text-[14px] text-[#587089] leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">1. Hakikat Pendaftaran Tahap 1</h2>
          <p>
            Pengisian dan pengiriman formulir pendaftaran Tahap 1 merupakan pernyataan minat (expression of interest) untuk bergabung dalam ekosistem pembelajaran dan pengembangan merek. Pengisian formulir ini <strong>tidak menjamin dan tidak secara otomatis menetapkan</strong> pendaftar sebagai kandidat resmi terpilih dari 500 Brand Go Global.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">2. Keaslian Informasi</h2>
          <p>
            Pendaftar bertanggung jawab penuh atas kebenaran, keakuratan, dan keabsahan informasi yang dicantumkan dalam formulir, termasuk kepemilikan merek, klaim produk, dan data kontak.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">3. Pembatasan Tanggung Jawab Kelembagaan</h2>
          <p>
            Portal 500 Brand Global adalah inisiatif swasta/non-pemerintah oleh ARRBEY Branding dan Sekolah Ekspor Nasional. Website ini bukan lembaga perizinan ekspor resmi pemerintah dan tidak menggantikan otoritas resmi kementerian negara Republik Indonesia.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">4. Hak Cipta & Kekayaan Intelektual</h2>
          <p>
            Hak kekayaan intelektual atas seluruh materi modul, kurikulum, dan konten di portal ini dilindungi undang-undang. Peserta tetap memegang penuh hak atas merek dagang dan produk masing-masing.
          </p>
        </div>

        <div className="pt-6">
          <Link href="/daftar" className="text-[#0c508d] font-bold hover:underline">
            ← Kembali ke Formulir Pendaftaran
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
