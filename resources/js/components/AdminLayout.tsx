import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { BrandLogo } from '@/components/BrandLogo';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { url, props } = usePage<{ flash?: { success?: string; error?: string } }>();
  const flash = props.flash;

  const handleLogout = () => {
    router.post('/admin/logout');
  };

  const navItems = [
    { label: 'Overview Dashboard', href: '/admin', active: url === '/admin', icon: '📊' },
    { label: 'Data Pendaftar Tahap 1', href: '/admin/pendaftar', active: url.startsWith('/admin/pendaftar'), icon: '👥' },
  ];

  const cmsItems = [
    { label: 'CMS Halaman Home', href: '/admin/cms/home', active: url.startsWith('/admin/cms/home'), icon: '🌐' },
    { label: 'CMS Pertanyaan Form', href: '/admin/cms/form', active: url.startsWith('/admin/cms/form'), icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-[#122b43] font-sans flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#071c36] text-white flex-none flex flex-col justify-between border-r border-[#153457]">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#153457]">
            <Link href="/admin" className="block">
              <BrandLogo variant="dark" />
              <span className="text-[9px] text-[#f3b641] font-bold tracking-widest uppercase block mt-1.5">
                Admin Portal & CMS
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-[13px] font-bold">
            <span className="text-[10px] text-[#7190ac] font-bold uppercase tracking-wider block px-3 py-1">
              Data & Analitik
            </span>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                  item.active
                    ? 'bg-[#0f4477] text-white shadow-sm font-extrabold border-l-4 border-l-[#f3b641]'
                    : 'text-[#96b3cc] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-3">
              <span className="text-[10px] text-[#7190ac] font-bold uppercase tracking-wider block px-3 py-1">
                Content Management (CMS)
              </span>
              <div className="space-y-1 mt-1">
                {cmsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                      item.active
                        ? 'bg-[#0f4477] text-white shadow-sm font-extrabold border-l-4 border-l-[#f3b641]'
                        : 'text-[#96b3cc] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#153457] mt-4 space-y-1.5">
              <span className="text-[10px] text-[#7190ac] font-bold uppercase tracking-wider block px-1">
                Export Database
              </span>
              <a
                href="/admin/pendaftar/export.csv"
                download="pendaftar-500brandglobal.csv"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[11.5px] font-bold bg-[#0b345c] text-[#f3b641] hover:bg-[#0e4375] transition-colors"
              >
                <span>📥 Unduh CSV</span>
                <span className="text-[9.5px] bg-[#f3b641] text-[#061a33] px-1.5 py-0.5 rounded font-black">
                  .CSV
                </span>
              </a>
              <a
                href="/admin/pendaftar/export.xls"
                download="pendaftar-500brandglobal.xls"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[11.5px] font-bold bg-[#0a2f52] text-[#8ce2d9] hover:bg-[#0e4375] transition-colors"
              >
                <span>📊 Unduh Excel</span>
                <span className="text-[9.5px] bg-[#009b94] text-white px-1.5 py-0.5 rounded font-black">
                  .XLS
                </span>
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                target="_blank"
                className="block px-4 py-2 text-[12px] text-[#7190ac] hover:text-[#c4dcf2]"
              >
                ↗ Buka Website Publik
              </Link>
            </div>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-[#153457]">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/10 text-[12px] font-bold text-center transition-colors"
          >
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#e2eaf0] px-6 flex items-center justify-between">
          <h1 className="text-lg font-black text-[#061a33] tracking-tight">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[12px] font-semibold text-[#5a7288]">Sistem Aktif (XAMPP / MySQL)</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">
          {flash?.success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <span className="text-base">✅</span>
                <span>{flash.success}</span>
              </div>
            </div>
          )}
          {flash?.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[13px] font-bold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <span className="text-base">⚠️</span>
                <span>{flash.error}</span>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};
