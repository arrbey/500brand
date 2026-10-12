import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Privasi() {
  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Kebijakan Privasi | 500 Brand Global</title>
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-14">
        <div className="wrap max-w-4xl">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Perlindungan Data
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Kebijakan Privasi
          </h1>
          <p className="text-[#c8dbe9] text-[15px] leading-relaxed">
            Komitmen kami dalam mengelola dan melindungi data pribadi serta informasi usaha pendaftar.
          </p>
        </div>
      </section>

      <main className="wrap max-w-3xl py-16 space-y-8 text-[14px] text-[#587089] leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">1. Data yang Dikumpulkan</h2>
          <p>
            Kami mengumpulkan data yang diberikan secara sukarela melalui formulir pendaftaran, meliputi: nama lengkap, alamat email aktif, nomor WhatsApp/telepon, lokasi provinsi dan kota, kategori entitas, nama usaha/organisasi, bidang sektor, serta informasi deskripsi produk dan tujuan mengikuti program.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">2. Tujuan Penggunaan Data</h2>
          <p>
            Data yang dikumpulkan semata-mata digunakan untuk: (a) administrasi dan verifikasi pendaftaran minat Tahap 1, (b) komunikasi resmi dan penyampaian informasi kegiatan program, (c) penerusan data yang diperlukan ke platform pembelajaran mitra resmi Skolah.com untuk pembuatan akun dan akses pelatihan.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">3. Kerahasiaan & Keamanan Data</h2>
          <p>
            Data pribadi pendaftar disimpan secara aman di basis data terlindungi dan tidak akan diperjualbelikan kepada pihak ketiga manapun untuk tujuan komersial di luar ekosistem program 500 Brand Global.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#061a33] mb-2">4. Hak Subjek Data</h2>
          <p>
            Anda berhak meminta pembaruan, perbaikan, atau penghapusan data pendaftaran Anda dengan menghubungi sekretariat resmi kami melalui email: <strong>500brandglobal@gmail.com</strong>.
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
