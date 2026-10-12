import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { BrandLogo } from '@/components/BrandLogo';

export default function AdminLogin() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#071c36] text-white flex flex-col justify-center items-center p-4">
      <Head>
        <title>Login Staff Admin | 500 Brand Global</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="w-full max-w-md bg-white text-[#0b2443] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <BrandLogo variant="light" />
          </Link>
          <h1 className="text-xl font-black text-[#061a33]">Portal Administrasi Staff</h1>
          <p className="text-[12px] text-[#6b8296] mt-1">
            Masuk untuk memantau data pendaftar dan operasional program
          </p>
        </div>

        {errors.email && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12px] font-medium">
            {errors.email}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#1a3854] mb-1">
              Alamat Email Admin
            </label>
            <input
              type="email"
              required
              placeholder="admin@500brandglobal.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8e4] text-[13px] text-[#061a33] focus:outline-none focus:border-[#1065a1] focus:ring-2 focus:ring-[#1065a1]/20"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1a3854] mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8e4] text-[13px] text-[#061a33] focus:outline-none focus:border-[#1065a1] focus:ring-2 focus:ring-[#1065a1]/20"
            />
          </div>

          <div className="flex items-center justify-between text-[12px] py-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#486379]">
              <input
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
                className="w-4 h-4 text-[#0c416e] rounded focus:ring-0"
              />
              <span>Ingat saya</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 bg-[#0c355d] hover:bg-[#082747] text-white font-extrabold text-[13px] rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            {processing ? 'Memverifikasi...' : 'Masuk ke Dashboard →'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#e5edf3] pt-4 text-[11px] text-[#788e9f]">
          <Link href="/" className="hover:underline">
            ← Kembali ke Website Publik
          </Link>
        </div>
      </div>
    </div>
  );
}
