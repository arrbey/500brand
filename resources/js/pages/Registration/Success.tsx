import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface SuccessProps {
  registrationCode: string;
  fullName?: string;
  email?: string;
}

export default function RegistrationSuccess({ registrationCode, fullName, email }: SuccessProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(registrationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-[#122b43] font-sans">
      <Head>
        <title>Pendaftaran Berhasil Diterima | 500 Brand Global</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Navbar />

      <main className="max-w-[800px] mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-[#e2eaf0] shadow-2xl p-8 sm:p-12 text-center">
          {/* Success Check Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[#e6f8f5] text-[#009b94] grid place-items-center mb-6 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="eyebrow text-[#009b94] font-black tracking-widest text-[12px] uppercase">
            Pendaftaran Berhasil Diterima
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#061a33] mt-2 mb-3">
            Selamat Datang di Gerakan Global, {fullName || 'Sahabat Inovator'}!
          </h1>
          <p className="text-[#597288] text-[14px] max-w-lg mx-auto leading-relaxed mb-8">
            Data peminat Program 500 Brand Go Global Anda telah berhasil tersimpan dengan aman. Simpan nomor referensi registrasi resmi Anda di bawah ini:
          </p>

          {/* Registration Code Card */}
          <div className="bg-[#f5f9fc] border border-[#d3e3ee] rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-sm">
            <span className="text-[11px] font-bold text-[#627a8f] uppercase tracking-wider block mb-1">
              Nomor Registrasi Referensi Anda
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#0c355c] tracking-tight mb-3">
              {registrationCode}
            </div>
            <button
              onClick={copyCode}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#bfd3e1] text-[#0c355c] rounded-lg text-[12px] font-bold hover:bg-[#ebf4fa] transition-colors shadow-xs cursor-pointer"
            >
              {copied ? '✔ Berhasil Disalin!' : '📋 Salin Nomor Registrasi'}
            </button>
          </div>

          {/* Next Steps Guidance */}
          <div className="text-left bg-[#fffdfa] border border-[#fae7c0] rounded-2xl p-6 text-[13px] text-[#4d3c1a] space-y-3 mb-8">
            <h3 className="font-extrabold text-[14px] text-[#1c2e42] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f3b641]"></span>
              Langkah Selanjutnya Menuju Panggung Dunia:
            </h3>
            <ul className="space-y-2 text-[#4f422e] leading-relaxed list-disc pl-5">
              <li>
                <strong>Verifikasi & Informasi Awal:</strong> Tim sekretariat akan menghubungi Anda melalui WhatsApp atau email ({email || 'terdaftar'}) untuk membagikan panduan orientasi program.
              </li>
              <li>
                <strong>Akses Pembelajaran di Skolah.com:</strong> Pelaksanaan modul pembelajaran terstruktur (LMS), webinar interaktif, dan uji kompetensi profesi branding diselenggarakan terpusat melalui platform <strong>Skolah.com</strong>.
              </li>
              <li>
                <strong>Pemberitahuan Resmi:</strong> Registrasi Tahap 1 merupakan pendaftaran minat awal. Penetapan resmi kandidat 500 Brand Go Global pada Tahap 2 dilakukan melalui mekanisme kurasi terstruktur sesuai ketentuan Ditjen Perdagangan Dalam Negeri, Kementerian Perdagangan RI.
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="btn btn-gold px-7 py-3 text-[13px] font-black rounded-xl shadow hover:scale-[1.02] transition-transform"
            >
              Kembali ke Beranda Utama →
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 rounded-xl border border-[#c5d5e2] text-[#0b2b4d] font-bold text-[13px] hover:bg-gray-50 transition-colors"
            >
              Baca Pertanyaan Umum (FAQ)
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
