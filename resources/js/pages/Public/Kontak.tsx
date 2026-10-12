import { Head, Link, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Kontak() {
  const { props } = usePage<any>();
  const contact = props.globalContact || {};
  const social = props.globalSocialMedia || {};

  const wa1Number = contact.whatsapp || '628119435300';
  const wa1Text = contact.whatsapp_display || '0811 943 5300';
  const wa2Number = contact.whatsapp_2 || '628118403477';
  const wa2Text = contact.whatsapp_2_display || '0811 840 3477';
  const email1 = contact.email || 'halo@arrbey.com';
  const email2 = contact.email_2 || 'halo@sekolahekspor.com';
  const phone = contact.phone || '+62 21 5000 0500';
  const address = contact.address || 'Sekretariat Program 500 Brand Global, Gedung Arrbey Lantai 4, Jakarta Selatan, DKI Jakarta 12950';
  const workingHours = contact.working_hours || 'Senin - Jumat: 08.30 - 17.00 WIB';

  const websiteArrbey = social.website_arrbey || 'https://www.arrbey.com';
  const websiteSekolahEkspor = social.website_sekolahekspor || 'https://www.sekolahekspor.com';

  return (
    <div className="min-h-screen bg-white text-[#0b2443] font-sans">
      <Head>
        <title>Kontak Sekretariat | 500 Brand Global</title>
        <meta
          name="description"
          content="Hubungi tim sekretariat Program Nasional 500 Brand Go Global untuk informasi pendaftaran, kerja sama, dan media."
        />
      </Head>

      <Navbar />

      <section className="bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white py-16">
        <div className="wrap max-w-5xl mx-auto px-4">
          <span className="eyebrow text-[#f3b641] uppercase tracking-widest text-[11px] font-bold">
            Hubungi Kami
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-3">
            Sekretariat 500 Brand Global
          </h1>
          <p className="text-[#c8dbe9] text-[15px] sm:text-[16px] leading-relaxed max-w-2xl">
            Tim sekretariat siap membantu Anda seputar pertanyaan pendaftaran kurasi, kemitraan ekosistem, serta informasi kurikulum program.
          </p>
        </div>
      </section>

      <main className="wrap max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: WhatsApp Hotline */}
          <div className="p-8 rounded-3xl bg-[#f8fafc] border border-[#dce6ee] hover:border-[#25D366] transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] grid place-items-center font-bold text-xl mb-4">
              💬
            </div>
            <span className="text-[11px] font-bold text-[#1b8743] uppercase tracking-wider block mb-1">
              Hotline Cepat Tanggap
            </span>
            <h2 className="text-xl font-bold text-[#061a33] mb-2">WhatsApp Sekretariat</h2>
            <p className="text-[13px] text-[#587089] leading-relaxed mb-6">
              Layanan konsultasi cepat interaktif via WhatsApp untuk informasi pendaftaran dan bantuan teknis.
            </p>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${wa1Number}?text=Halo%20Sekretariat%20500%20Brand%20Global,%20saya%20ingin%20bertanya`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#25D366] hover:bg-[#f0fdf4] transition-all group"
              >
                <div>
                  <span className="text-xs text-[#587089] block font-medium">Hotline 1 (ARRBEY)</span>
                  <span className="text-sm font-bold text-[#061a33] group-hover:text-[#1b8743]">{wa1Text}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#1b8743]">Chat WA ↗</span>
              </a>

              {wa2Number && (
                <a
                  href={`https://wa.me/${wa2Number}?text=Halo%20Sekretariat%20500%20Brand%20Global,%20saya%20ingin%20bertanya`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#25D366] hover:bg-[#f0fdf4] transition-all group"
                >
                  <div>
                    <span className="text-xs text-[#587089] block font-medium">Hotline 2 (Sekolah Ekspor)</span>
                    <span className="text-sm font-bold text-[#061a33] group-hover:text-[#1b8743]">{wa2Text}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#1b8743]">Chat WA ↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Card 2: Korespondensi Email */}
          <div className="p-8 rounded-3xl bg-[#f8fafc] border border-[#dce6ee] hover:border-[#1065a1] transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0c508d]/10 text-[#0c508d] grid place-items-center font-bold text-xl mb-4">
              ✉
            </div>
            <span className="text-[11px] font-bold text-[#0c508d] uppercase tracking-wider block mb-1">
              Korespondensi Resmi
            </span>
            <h2 className="text-xl font-bold text-[#061a33] mb-2">Email Sekretariat</h2>
            <p className="text-[13px] text-[#587089] leading-relaxed mb-6">
              Pengiriman dokumen resmi, inkuiri kelembagaan, sponsorship, dan publikasi media.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${email1}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#0c508d] hover:bg-[#f0f7ff] transition-all group"
              >
                <div>
                  <span className="text-xs text-[#587089] block font-medium">Email ARRBEY Branding</span>
                  <span className="text-sm font-bold text-[#061a33] group-hover:text-[#0c508d]">{email1}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0c508d]/10 text-[#0c508d]">Kirim Email ↗</span>
              </a>

              {email2 && (
                <a
                  href={`mailto:${email2}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#0c508d] hover:bg-[#f0f7ff] transition-all group"
                >
                  <div>
                    <span className="text-xs text-[#587089] block font-medium">Email Sekolah Ekspor</span>
                    <span className="text-sm font-bold text-[#061a33] group-hover:text-[#0c508d]">{email2}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0c508d]/10 text-[#0c508d]">Kirim Email ↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Card 3: Lokasi & Jam Operasional */}
          <div className="p-8 rounded-3xl bg-[#f8fafc] border border-[#dce6ee] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#c4882c]/10 text-[#c4882c] grid place-items-center font-bold text-xl mb-4">
              📍
            </div>
            <span className="text-[11px] font-bold text-[#c4882c] uppercase tracking-wider block mb-1">
              Kantor Sekretariat
            </span>
            <h2 className="text-xl font-bold text-[#061a33] mb-4">Alamat & Jam Operasional</h2>
            
            <div className="space-y-4 text-[13px] text-[#587089]">
              <div>
                <strong className="text-[#061a33] block text-[13px] mb-1">Alamat Kantor:</strong>
                <p className="leading-relaxed bg-white p-3 rounded-xl border border-[#e2eaf0] text-[#334e68]">
                  {address}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3 rounded-xl border border-[#e2eaf0]">
                  <strong className="text-[#061a33] block text-xs mb-0.5">Jam Layanan:</strong>
                  <span className="text-xs text-[#334e68] font-medium">{workingHours}</span>
                </div>
                {phone && (
                  <div className="bg-white p-3 rounded-xl border border-[#e2eaf0]">
                    <strong className="text-[#061a33] block text-xs mb-0.5">Telepon Kantor:</strong>
                    <span className="text-xs text-[#334e68] font-medium">{phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Media Sosial & Inisiator */}
          <div className="p-8 rounded-3xl bg-[#f8fafc] border border-[#dce6ee] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#009b94]/10 text-[#009b94] grid place-items-center font-bold text-xl mb-4">
                🌐
              </div>
              <span className="text-[11px] font-bold text-[#009b94] uppercase tracking-wider block mb-1">
                Kanal Publikasi
              </span>
              <h2 className="text-xl font-bold text-[#061a33] mb-2">Media Sosial & Ekosistem</h2>
              <p className="text-[13px] text-[#587089] leading-relaxed mb-5">
                Ikuti perkembangan terkini, liputan kurasi, serta rilis riset brand global melalui jejaring kami:
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#d62976] text-xs font-semibold text-[#334e68] hover:text-[#d62976] transition-all hover:scale-105"
                  >
                    <span>📸</span> Instagram
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#0077b5] text-xs font-semibold text-[#334e68] hover:text-[#0077b5] transition-all hover:scale-105"
                  >
                    <span>💼</span> LinkedIn
                  </a>
                )}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#ff0000] text-xs font-semibold text-[#334e68] hover:text-[#ff0000] transition-all hover:scale-105"
                  >
                    <span>🎥</span> YouTube
                  </a>
                )}
                {social.tiktok && (
                  <a
                    href={social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#000000] text-xs font-semibold text-[#334e68] hover:text-black transition-all hover:scale-105"
                  >
                    <span>🎵</span> TikTok
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#e2eaf0] hover:border-[#1877f2] text-xs font-semibold text-[#334e68] hover:text-[#1877f2] transition-all hover:scale-105"
                  >
                    <span>👥</span> Facebook
                  </a>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2eaf0]">
              <span className="text-xs font-bold text-[#061a33] block mb-2">Website Resmi Inisiator:</span>
              <div className="flex gap-3">
                <a
                  href={websiteArrbey}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-lg bg-white border border-[#e2eaf0] hover:border-[#0c508d] text-xs font-medium text-[#0c508d] transition-all"
                >
                  ARRBEY ↗
                </a>
                <a
                  href={websiteSekolahEkspor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-lg bg-white border border-[#e2eaf0] hover:border-[#0c508d] text-xs font-medium text-[#0c508d] transition-all"
                >
                  Sekolah Ekspor ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#06172c] to-[#0a315a] text-white text-center shadow-lg">
          <h3 className="text-xl sm:text-2xl font-black mb-2">Ingin Daftarkan Brand Anda Sekarang?</h3>
          <p className="text-[#c8dbe9] text-sm max-w-xl mx-auto mb-6">
            Pendaftaran Program Nasional 500 Brand Go Global Tahap 1 telah dibuka untuk brand lokal potensial di seluruh Indonesia.
          </p>
          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 bg-[#f3b641] hover:bg-[#e2a530] text-[#06172c] font-black px-8 py-3.5 text-sm rounded-xl shadow-md hover:scale-105 transition-all"
          >
            <span>Buka Formulir Pendaftaran Tahap 1</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
