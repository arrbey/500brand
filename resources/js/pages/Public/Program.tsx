import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Program() {
  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Program 500 Brand Go Global (2026–2029) | 500 Brand Global</title>
        <meta
          name="description"
          content="Spesifikasi dan cakupan Program Nasional 500 Brand Go Global periode 2026-2029 untuk transformasi merek lokal menjadi kekuatan kompetitif internasional."
        />
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-16">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Flagship Program 2026–2029
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Program Nasional 500 Brand Go Global
          </h1>
          <p className="text-[#c8dbe9] text-[15px] sm:text-[16px] leading-relaxed">
            Inisiatif akselerasi komprehensif untuk memfasilitasi transformasi merek terpilih Indonesia menuju relevansi dan ekspansi pasar dunia.
          </p>
        </div>
      </section>

      <main className="wrap max-w-4xl py-16 space-y-10">
        <div>
          <span className="text-[#c4882c] font-black text-[12px] uppercase tracking-wider block mb-1">
            Target & Peta Jalan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#061a33] mb-3">
            Misi Transformasi 4 Tahun (2026–2029)
          </h2>
          <p className="text-[#587089] text-[15px] leading-relaxed">
            Program ini menargetkan fasilitasi terhadap <strong>500 merek unggulan Indonesia</strong> (angka ini merupakan target/sasaran program, bukan klaim capaian instan). Program berjalan bertahap dari tahun 2026 hingga 2029 dengan fokus pada pembangunan fondasi merek, kepatuhan mutu internasional, kemasan bernilai jual tinggi, dan akses langsung ke jaringan pembeli global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#f5f9fc] border border-[#dce6ee] hover:border-[#0c355c] transition-colors">
            <div className="text-2xl font-black text-[#0c355c] mb-2">01 · Tahap 1</div>
            <strong className="block text-[#061a33] mb-1">Pendaftaran Peminat</strong>
            <p className="text-[12px] text-[#587089] leading-relaxed">
              Terbuka untuk UMKM, korporasi, komunitas kreatif, koperasi, perguruan tinggi, dan calon wirausaha melalui formulir online resmi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f5f9fc] border border-[#dce6ee] hover:border-[#009b94] transition-colors">
            <div className="text-2xl font-black text-[#009b94] mb-2">02 · Edukasi</div>
            <strong className="block text-[#061a33] mb-1">Skolah.com</strong>
            <p className="text-[12px] text-[#587089] leading-relaxed">
              Peserta mengikuti pembelajaran mandiri daring, webinar pembekalan ekspor, tugas kurasi, dan uji kompetensi profesi branding.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f5f9fc] border border-[#dce6ee] hover:border-[#d48c19] transition-colors">
            <div className="text-2xl font-black text-[#d48c19] mb-2">03 · Tahap 2</div>
            <strong className="block text-[#061a33] mb-1">Kurasi Resmi</strong>
            <p className="text-[12px] text-[#587089] leading-relaxed">
              Peserta yang memenuhi kualifikasi diajukan untuk penetapan kandidat resmi melalui Ditjen Perdagangan Dalam Negeri, Kemendag RI.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#f0fbf9] border border-[#a6e2db] text-[13px] text-[#0a524c]">
          <strong className="block text-[14px] mb-1">Pernyataan Ketentuan Penting (Prinsip P1):</strong>
          <p className="leading-relaxed">
            Mendaftar sebagai peminat pada formulir Tahap 1 tidak otomatis menjadikan peserta terpilih atau mendapatkan manfaat pendampingan lanjutan. Seluruh proses kurasi dilakukan secara berjenjang, transparan, dan objektif sesuai kriteria resmi yang ditetapkan.
          </p>
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
