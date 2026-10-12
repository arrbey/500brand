import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Tentang() {
  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Tentang Gerakan | 500 Brand Global</title>
        <meta
          name="description"
          content="Tentang Gerakan Brand Nasional Go Global dan Flagship Program 500 Brand Go Global (2026–2029) yang diinisiasi oleh ARRBEY Branding dan Sekolah Ekspor Nasional."
        />
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-16">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Tentang Gerakan
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Membangun Kedaulatan Merek Indonesia di Panggung Dunia
          </h1>
          <p className="text-[#c8dbe9] text-[15px] sm:text-[16px] leading-relaxed">
            Inisiatif strategis kolaboratif oleh ARRBEY Branding dan Sekolah Ekspor Nasional untuk mengakselerasi ekspor berbasis nilai tambah dan kekuatan merek nasional.
          </p>
        </div>
      </section>

      <main className="wrap max-w-4xl py-16 space-y-12">
        <div>
          <span className="text-[#c4882c] font-black text-[12px] uppercase tracking-wider block mb-1">
            Visi & Latar Belakang
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#061a33] mb-4">
            Bukan Sekadar Jual Bahan Mentah. Saatnya Merek Kita Memimpin.
          </h2>
          <p className="text-[#587089] text-[15px] leading-relaxed mb-4">
            Selama beberapa dekade, Indonesia dikenal luas sebagai pengekspor bahan mentah dan komoditas curah tanpa merek (unbranded commodities) atau pemasok maklon (OEM) untuk merek-merek multinasional. Ketika produk kita dijual dengan label pihak lain di rak luar negeri, nilai tambah dan margin keuntungan terbesar dinikmati oleh pemilik merek tersebut.
          </p>
          <p className="text-[#587089] text-[15px] leading-relaxed">
            <strong>Gerakan Brand Nasional Go Global (2026–2029)</strong> lahir untuk membalik keadaan. Kami meyakini bahwa produk nusantara memiliki cita rasa istimewa, kriya bernilai estetika tinggi, dan inovasi yang sanggup berdiri sejajar dengan merek-merek ternama dunia — asalkan didukung dengan re-branding strategis, standardisasi mutu, kemasan ramah lingkungan berkelas dunia, serta keahlian digital marketing global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-[#f5f9fc] border border-[#dce6ee]">
            <span className="text-[11px] font-extrabold text-[#c4882c] uppercase tracking-wider block mb-1">
              Perintis Branding Strategis
            </span>
            <h3 className="text-xl font-bold text-[#0c355c] mb-2">ARRBEY Branding</h3>
            <p className="text-[13px] text-[#587089] leading-relaxed">
              Lembaga konsultan pelopor strategi branding nasional dengan rekam jejak lebih dari 30 tahun mendampingi korporasi, BUMN, UMKM, dan kementerian dalam merancang identitas merek bernilai tambah tinggi.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#f5f9fc] border border-[#dce6ee]">
            <span className="text-[11px] font-extrabold text-[#009b94] uppercase tracking-wider block mb-1">
              Pusat Akselerasi Ekspor
            </span>
            <h3 className="text-xl font-bold text-[#0c355c] mb-2">Sekolah Ekspor Nasional</h3>
            <p className="text-[13px] text-[#587089] leading-relaxed">
              Lembaga edukasi dan akselerasi ekspor terdepan yang telah mencetak ribuan eksportir baru di seluruh Indonesia melalui kurikulum komprehensif, simulasi pasar nyata, dan jejaring pembeli global.
            </p>
          </div>
        </div>

        <div className="bg-[#fffdf8] border border-[#f5dcab] rounded-2xl p-6 text-[13px] text-[#4d3c1a] leading-relaxed">
          <strong className="block text-[#061a33] text-[14px] mb-1">Keterangan Kelembagaan Penting:</strong>
          Portal 500 Brand Global merupakan inisiatif kolaborasi independen. Pendaftaran Tahap 1 pada portal ini adalah registrasi minat awal dan bukan proses penetapan kandidat resmi. Penetapan resmi kandidat 500 Brand Go Global pada Tahap 2 tetap berada di bawah kewenangan resmi instansi pemerintah terkait (Ditjen Perdagangan Dalam Negeri, Kementerian Perdagangan RI).
        </div>

        <div className="text-center pt-4">
          <Link href="/daftar" className="btn btn-gold px-8 py-3.5 text-[13px] font-black rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
            Daftar Minat Tahap 1 Sekarang →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
