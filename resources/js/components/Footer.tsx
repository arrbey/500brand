import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BrandLogo } from '@/components/BrandLogo';

export const Footer: React.FC = () => {
  const { props } = usePage<any>();
  const contact = props.globalContact || {};
  const social = props.globalSocialMedia || {};

  const wa1Number = contact.whatsapp || '628119435300';
  const wa1Text = contact.whatsapp_display || '0811 943 5300';
  const wa2Number = contact.whatsapp_2 || '628118403477';
  const wa2Text = contact.whatsapp_2_display || '0811 840 3477';
  const email1 = contact.email || '500brandglobal@gmail.com';
  const email2 = contact.email_2;
  const websiteArrbey = social.website_arrbey || 'https://www.arrbey.com';
  const websiteSekolahEkspor = social.website_sekolahekspor || 'https://www.sekolahekspor.com';

  return (
    <>
      <footer id="kontak" className="bg-[#071c36] text-[#9db6cb] pt-14 pb-8 border-t border-[#1a385c]">
        <div className="wrap max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-10">
            {/* Col 1: Brand & Initiators & Social Media */}
            <div>
              <div className="mb-4">
                <BrandLogo variant="dark" />
              </div>
              <p className="text-[13px] leading-relaxed text-[#93acc2] max-w-sm mb-4">
                Sarana pengetahuan, komunikasi, dan pengembangan ekosistem brand Indonesia untuk meningkatkan daya saing domestik dan global.
              </p>
              
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#e6c078] mb-2.5">
                Inisiator dan Pelaksana:
              </p>
              <div className="flex items-center gap-3 flex-wrap mb-5">
                <a
                  href={websiteArrbey}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg shadow-sm hover:scale-105 transition-transform"
                  title="Website ARRBEY"
                >
                  <img
                    src="/images/preview_img_10.png"
                    alt="Logo ARRBEY"
                    className="h-7 max-w-[110px] object-contain"
                  />
                </a>
                <a
                  href={websiteSekolahEkspor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg shadow-sm hover:scale-105 transition-transform"
                  title="Website Sekolah Ekspor"
                >
                  <img
                    src="/images/preview_img_11.png"
                    alt="Logo Sekolah Ekspor"
                    className="h-7 max-w-[120px] object-contain"
                  />
                </a>
              </div>

              {/* Social Media Links Bar */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a4bed5] block mb-2">
                  Ikuti Media Sosial:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#0e3358] hover:bg-[#d62976] text-white grid place-items-center text-xs transition-all hover:scale-110 shadow-xs"
                      title="Instagram"
                    >
                      📸
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#0e3358] hover:bg-[#0077b5] text-white grid place-items-center text-xs transition-all hover:scale-110 shadow-xs"
                      title="LinkedIn"
                    >
                      💼
                    </a>
                  )}
                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#0e3358] hover:bg-[#ff0000] text-white grid place-items-center text-xs transition-all hover:scale-110 shadow-xs"
                      title="YouTube"
                    >
                      🎥
                    </a>
                  )}
                  {social.tiktok && (
                    <a
                      href={social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#0e3358] hover:bg-[#000000] text-white grid place-items-center text-xs transition-all hover:scale-110 shadow-xs"
                      title="TikTok"
                    >
                      🎵
                    </a>
                  )}
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#0e3358] hover:bg-[#1877f2] text-white grid place-items-center text-xs transition-all hover:scale-110 shadow-xs"
                      title="Facebook"
                    >
                      👥
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h3 className="text-white text-[15px] font-bold mb-4 tracking-tight">Jelajahi</h3>
              <ul className="space-y-2.5 text-[13px]">
                <li><a href="/#tentang" className="hover:text-white transition-colors">Tentang Portal</a></li>
                <li><a href="/#program" className="hover:text-white transition-colors">Program 500 Brand Go Global</a></li>
                <li><a href="/#academy" className="hover:text-white transition-colors">Global Brand Academy</a></li>
                <li><a href="/#cases" className="hover:text-white transition-colors">Global Brand Case Library</a></li>
                <li><a href="/#kabar" className="hover:text-white transition-colors">Berita dan Dokumentasi</a></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">Pertanyaan Umum (FAQ)</Link></li>
                <li><Link href="/privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="/daftar" className="text-[#f3b641] font-semibold hover:underline block pt-1">Formulir Pendaftaran Tahap 1 →</Link></li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h3 className="text-white text-[15px] font-bold mb-4 tracking-tight">Hubungi Kami</h3>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <a
                    href={`https://wa.me/${wa1Number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f3b641] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#f3b641]">↗</span> {wa1Text}
                  </a>
                </li>
                {wa2Number && (
                  <li>
                    <a
                      href={`https://wa.me/${wa2Number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#f3b641] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#f3b641]">↗</span> {wa2Text}
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${email1}`}
                    className="hover:text-[#f3b641] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#f3b641]">@</span> {email1}
                  </a>
                </li>
                {email2 && (
                  <li>
                    <a
                      href={`mailto:${email2}`}
                      className="hover:text-[#f3b641] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#f3b641]">@</span> {email2}
                    </a>
                  </li>
                )}
                <li className="pt-2 border-t border-[#1a385c]">
                  <a
                    href={websiteArrbey}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#89a8c4] hover:text-white text-[12px] flex items-center justify-between"
                  >
                    <span>ARRBEY Branding</span>
                    <span>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={websiteSekolahEkspor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#89a8c4] hover:text-white text-[12px] flex items-center justify-between"
                  >
                    <span>Sekolah Ekspor Nasional</span>
                    <span>↗</span>
                  </a>
                </li>

              </ul>
            </div>
          </div>

          {/* Footer Base */}
          <div className="border-t border-[#28425d] mt-10 pt-6 text-[12px] text-[#718da6] flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© 2026 500 Brand Global. Inisiatif ARRBEY Branding & Sekolah Ekspor Nasional.</span>
            <span className="text-[#d0e2f2] font-medium tracking-wide">
              Build Indonesian Brands for a Stronger Global Future.
            </span>
          </div>
        </div>
      </footer>

      {/* Institutional Disclosure Bar */}
      <div className="bg-[#09223f] border-t border-[#28425d] text-[#c6d3de] text-[11px] py-3.5 px-4 leading-relaxed">
        <div className="max-w-[1200px] mx-auto text-center sm:text-left">
          <strong>Keterangan kelembagaan:</strong> 500brandglobal.com dirancang sebagai portal inisiatif nonpemerintah oleh ARRBEY Branding dan Sekolah Ekspor Nasional. Ini bukan website pemerintah atau pengumuman penetapan Program Nasional 500 Brand Go Global sebagai program resmi Kementerian Perdagangan RI.
        </div>
      </div>
    </>
  );
};
