import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { BrandLogo } from '@/components/BrandLogo';

interface NavbarProps {
  currentRoute?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e7ecf1]">
        <div className="wrap max-w-[1200px] mx-auto px-4 h-[77px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap group">
            <BrandLogo variant="light" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[12px] font-bold text-[#274763]">
            <a href="/#tentang" className="hover:text-[#d78e24] transition-colors">Tentang</a>
            <a href="/#program" className="hover:text-[#d78e24] transition-colors">Program</a>
            <a href="/#academy" className="hover:text-[#d78e24] transition-colors">Academy</a>
            <a href="/#cases" className="hover:text-[#d78e24] transition-colors">Global Cases</a>
            <a href="/#kabar" className="hover:text-[#d78e24] transition-colors">Kabar Program</a>
            <Link href="/faq" className="hover:text-[#d78e24] transition-colors">FAQ</Link>
            <a href="/#kontak" className="hover:text-[#d78e24] transition-colors">Kontak</a>
            <Link
              href="/daftar"
              className="btn btn-gold py-2.5 px-4 text-[13px] font-extrabold rounded-lg shadow-sm hover:shadow hover:scale-[1.02] transition-all"
            >
              Daftar Minat →
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#092d52] focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#e7ecf1] px-6 py-4 shadow-xl flex flex-col gap-3 font-bold text-[14px] text-[#274763]">
            <a href="/#tentang" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">Tentang</a>
            <a href="/#program" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">Program</a>
            <a href="/#academy" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">Academy</a>
            <a href="/#cases" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">Global Cases</a>
            <a href="/#kabar" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">Kabar Program</a>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">FAQ</Link>
            <a href="/#kontak" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#d78e24]">Kontak</a>
            <Link
              href="/daftar"
              className="btn btn-gold text-center py-3 mt-2 text-[13px] font-black"
            >
              Daftar Minat Sekarang →
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
