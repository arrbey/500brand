import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/AdminLayout';
import { IndonesiaDistributionMap, ProvinceData } from '@/components/IndonesiaDistributionMap';

interface MetricData {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  byStatus: Record<string, number>;
}

interface RegistrationRecord {
  id: number;
  registration_code: string;
  status: string;
  created_at: string;
  profile?: {
    full_name: string;
    email: string;
    phone: string;
    province: string;
    city: string;
  };
  organization?: {
    brand_name: string;
    legal_entity_name: string;
    sector: string;
  };
}

interface DashboardProps {
  metrics: MetricData;
  topProvinces: ProvinceData[];
  recent: RegistrationRecord[];
}

export default function AdminDashboard({ metrics, topProvinces, recent }: DashboardProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingItem, setDeletingItem] = useState<RegistrationRecord | null>(null);
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isAllSelected = recent.length > 0 && selectedIds.length === recent.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(recent.map((r) => r.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSingleDelete = () => {
    if (!deletingItem) return;
    setIsProcessing(true);
    router.delete(`/admin/pendaftar/${deletingItem.id}`, {
      onFinish: () => {
        setIsProcessing(false);
        setDeletingItem(null);
        setSelectedIds((prev) => prev.filter((id) => id !== deletingItem.id));
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);
    router.post(
      '/admin/pendaftar/bulk-delete',
      { ids: selectedIds },
      {
        onFinish: () => {
          setIsProcessing(false);
          setShowBulkModal(false);
          setSelectedIds([]);
        },
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Baru (Submitted)</span>;
      case 'under_review':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-yellow-100 text-yellow-800">Pemeriksaan</span>;
      case 'verified':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Terverifikasi</span>;
      case 'accepted_stage2':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">Kandidat Tahap 2</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">Ditolak</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <AdminLayout title="Overview Dashboard Pendaftaran">
      <Head>
        <title>Dashboard Admin | 500 Brand Global</title>
      </Head>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
          <span className="text-[11px] font-extrabold text-[#788e9f] uppercase tracking-wider block">
            Total Pendaftar
          </span>
          <div className="text-3xl font-black text-[#0c355c] mt-2">{metrics.total}</div>
          <span className="text-[12px] text-[#009b94] font-semibold mt-1 block">Semua waktu</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
          <span className="text-[11px] font-extrabold text-[#788e9f] uppercase tracking-wider block">
            Hari Ini
          </span>
          <div className="text-3xl font-black text-[#0c355c] mt-2">{metrics.today}</div>
          <span className="text-[12px] text-[#5b7388] font-semibold mt-1 block">Pendaftar baru hari ini</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
          <span className="text-[11px] font-extrabold text-[#788e9f] uppercase tracking-wider block">
            Minggu Ini
          </span>
          <div className="text-3xl font-black text-[#0c355c] mt-2">{metrics.thisWeek}</div>
          <span className="text-[12px] text-[#5b7388] font-semibold mt-1 block">7 hari terakhir</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
          <span className="text-[11px] font-extrabold text-[#788e9f] uppercase tracking-wider block">
            Bulan Ini
          </span>
          <div className="text-3xl font-black text-[#0c355c] mt-2">{metrics.thisMonth}</div>
          <span className="text-[12px] text-[#5b7388] font-semibold mt-1 block">Bulan berjalan</span>
        </div>
      </div>

      {/* Peta Sebaran Nasional Indonesia */}
      <IndonesiaDistributionMap provinces={topProvinces} totalRegistrants={metrics.total} />

      {/* Export Quick Card */}
      <div className="bg-gradient-to-r from-[#0b3059] to-[#082240] text-white p-6 rounded-2xl border border-[#173e65] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <span className="text-[11px] font-black tracking-widest uppercase text-[#f3b641] block mb-1">
            Data Integration & Learning Platform
          </span>
          <h3 className="text-xl font-bold mb-1.5">Export Data Skolah.com</h3>
          <p className="text-[12.5px] text-[#c7d9e8] leading-relaxed">
            Unduh data pendaftar dalam format CSV atau Excel (.xls) siap impor untuk aktivasi akun pembelajaran di platform Skolah.com.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 min-w-[320px]">
          <a
            href="/admin/pendaftar/export.csv"
            download="pendaftar-500brandglobal.csv"
            className="flex-1 py-3 px-4 bg-[#f3b641] hover:bg-[#ffca5b] text-[#0b2443] text-center font-extrabold text-[12px] rounded-xl transition-colors shadow flex items-center justify-center gap-1.5"
          >
            📥 Unduh Format CSV
          </a>
          <a
            href="/admin/pendaftar/export.xls"
            download="pendaftar-500brandglobal.xls"
            className="flex-1 py-3 px-4 bg-[#009b94] hover:bg-[#0aa8a1] text-white text-center font-extrabold text-[12px] rounded-xl transition-colors shadow flex items-center justify-center gap-1.5"
          >
            📊 Unduh Format Excel (.xls)
          </a>
        </div>
      </div>

      {/* CMS Quick Control Hub */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-black text-[#061a33] tracking-tight">Content Management System (CMS)</h2>
            <p className="text-[12px] text-[#5b7388]">Kustomisasi konten halaman depan dan pertanyaan formulir pendaftaran secara langsung tanpa coding.</p>
          </div>
          <span className="text-[11px] font-bold bg-[#e8f1fa] text-[#0e5088] px-3 py-1 rounded-full">
            Fitur Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card CMS Home */}
          <div className="bg-gradient-to-br from-white to-[#f7fafd] p-6 rounded-2xl border border-[#dce6f0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#092b53] text-white flex items-center justify-center text-lg mb-3 shadow">
                🌐
              </div>
              <h3 className="text-base font-extrabold text-[#071c36] mb-1">CMS Halaman Home</h3>
              <p className="text-[12.5px] text-[#5a7288] leading-relaxed mb-4">
                Kelola teks hero banner, headline program, narasi inisiatif, pilar transformasi, daftar pertanyaan FAQ, serta info kontak WhatsApp.
              </p>
            </div>
            <Link
              href="/admin/cms/home"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#092b53] hover:bg-[#0f4477] text-white font-bold text-[12.5px] transition-colors shadow-sm"
            >
              <span>Buka Editor Homepage</span>
              <span>→</span>
            </Link>
          </div>

          {/* Card CMS Form */}
          <div className="bg-gradient-to-br from-white to-[#f7fafd] p-6 rounded-2xl border border-[#dce6f0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#00827c] text-white flex items-center justify-center text-lg mb-3 shadow">
                📝
              </div>
              <h3 className="text-base font-extrabold text-[#071c36] mb-1">CMS Pertanyaan & Opsi Formulir</h3>
              <p className="text-[12.5px] text-[#5a7288] leading-relaxed mb-4">
                Sesuaikan pertanyaan dan opsi formulir: kategori peminat usaha, sasaran program, opsi kesiapan brand, serta teks persetujuan/consent.
              </p>
            </div>
            <Link
              href="/admin/cms/form"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#00827c] hover:bg-[#009b94] text-white font-bold text-[12.5px] transition-colors shadow-sm"
            >
              <span>Buka Editor Pertanyaan Formulir</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white rounded-2xl border border-[#e2eaf0] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#eef3f7] flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-[#061a33]">10 Pendaftar Terbaru</h2>
            <p className="text-[12px] text-[#6b8296] mt-0.5">Kelola dan tinjau data pendaftaran peserta program terbaru.</p>
          </div>
          <Link
            href="/admin/pendaftar"
            className="px-3.5 py-1.5 rounded-lg border border-[#ccdbe7] text-[12px] font-bold text-[#0e4375] hover:bg-gray-50 transition-colors"
          >
            Lihat Semua Pendaftar →
          </Link>
        </div>

        {/* Floating Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-[#fff1f2] border-b border-[#fecdd3] px-6 py-2.5 flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9f1239]">
              <span>✓</span>
              <span>{selectedIds.length} data pendaftar dipilih</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(true)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>🗑️</span>
                <span>Hapus Terpilih ({selectedIds.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="px-2.5 py-1 text-xs font-bold text-gray-600 hover:text-gray-900"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f8fafc] text-[#698093] font-bold text-[11px] uppercase tracking-wider border-b border-[#eef3f7]">
              <tr>
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    title="Pilih Semua"
                    className="w-4 h-4 rounded text-[#0c416e] border-gray-300 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-5">No. Registrasi</th>
                <th className="py-3.5 px-6">Nama Pendaftar</th>
                <th className="py-3.5 px-6">Brand / Usaha</th>
                <th className="py-3.5 px-6">Provinsi</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {recent.length > 0 ? (
                recent.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#fbfdfe] transition-colors ${
                      selectedIds.includes(item.id) ? 'bg-[#f4f8fc]' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelectOne(item.id)}
                        className="w-4 h-4 rounded text-[#0c416e] border-gray-300 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-[#0c416e]">
                      {item.registration_code}
                    </td>
                    <td className="py-4 px-6">
                      <strong className="block text-[#061a33]">{item.profile?.full_name || '—'}</strong>
                      <span className="text-[11px] text-[#788e9f]">{item.profile?.email}</span>
                    </td>
                    <td className="py-4 px-6 text-[#24425e]">
                      {item.organization?.brand_name || item.organization?.legal_entity_name || '—'}
                    </td>
                    <td className="py-4 px-6 text-[#5b7388]">
                      {item.profile?.city}, {item.profile?.province}
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/pendaftar/${item.id}`}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#0c416e] bg-[#f0f6fb] hover:bg-[#e1eef8] transition-colors"
                        >
                          Detail →
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200/70 transition-all flex items-center gap-1 shadow-xs"
                          title="Hapus data pendaftar"
                        >
                          <span>🗑️</span>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#899dae]">
                    Belum ada pendaftar tersimpan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Delete Confirmation Modal */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mb-4">
              🗑️
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">
              Hapus Data Pendaftar?
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Seluruh data profil, organisasi, jawaban form, dan lampiran registrasi terkait akan dihapus permanen dari sistem.
            </p>

            <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">No. Registrasi:</span>
                <span className="font-mono font-bold text-gray-900">{deletingItem.registration_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Nama Pendaftar:</span>
                <span className="font-bold text-gray-900">{deletingItem.profile?.full_name || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Brand / Usaha:</span>
                <span className="font-bold text-gray-900">{deletingItem.organization?.brand_name || '—'}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSingleDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Menghapus...</span>
                ) : (
                  <>
                    <span>🗑️</span>
                    <span>Ya, Hapus Pendaftar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mb-4">
              ⚠️
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">
              Hapus {selectedIds.length} Data Pendaftar Sekaligus?
            </h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Anda akan menghapus <strong>{selectedIds.length} data pendaftar</strong> yang telah dipilih secara massal. Seluruh data terkait akan dihapus permanen dari sistem.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleBulkDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Menghapus...</span>
                ) : (
                  <>
                    <span>🗑️</span>
                    <span>Ya, Hapus {selectedIds.length} Data</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
