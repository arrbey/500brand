import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/AdminLayout';
import { INDONESIA_REGIONS } from '@/data/indonesiaRegions';

interface RegistrantItem {
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
    position: string;
  };
  organization?: {
    brand_name: string;
    legal_entity_name: string;
    entity_type: string;
    sector: string;
  };
}

interface PaginatedData {
  data: RegistrantItem[];
  current_page: number;
  last_page: number;
  total: number;
  links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Props {
  registrants: PaginatedData;
  filters: {
    search?: string;
    status?: string;
    province?: string;
  };
}

export default function RegistrantsIndex({ registrants, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || '');
  const [province, setProvince] = useState(filters.province || '');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingItem, setDeletingItem] = useState<RegistrantItem | null>(null);
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isAllSelected = registrants.data.length > 0 && selectedIds.length === registrants.data.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(registrants.data.map((r) => r.id));
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

  const applyFilters = () => {
    router.get(
      '/admin/pendaftar',
      { search, status, province },
      { preserveState: true, replace: true }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
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
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-800">{st}</span>;
    }
  };

  return (
    <AdminLayout title="Manajemen Data Pendaftar Tahap 1">
      <Head>
        <title>Data Pendaftar | Admin 500 Brand Global</title>
      </Head>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2eaf0] shadow-sm mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Cari kode, nama, email, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-3.5 py-2 rounded-xl border border-[#ccdbe7] text-[13px] focus:outline-none focus:border-[#1065a1]"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#ccdbe7] text-[13px] bg-white focus:outline-none focus:border-[#1065a1]"
          >
            <option value="">Semua Status</option>
            <option value="submitted">Baru (Submitted)</option>
            <option value="under_review">Dalam Pemeriksaan</option>
            <option value="verified">Terverifikasi</option>
            <option value="accepted_stage2">Kandidat Tahap 2</option>
            <option value="rejected">Ditolak</option>
          </select>

          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#ccdbe7] text-[13px] bg-white focus:outline-none focus:border-[#1065a1]"
          >
            <option value="">Semua Provinsi</option>
            {INDONESIA_REGIONS.map((p) => (
              <option key={p.code} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={applyFilters}
            type="button"
            className="px-4 py-2 bg-[#0c355d] text-white text-[12px] font-bold rounded-xl hover:bg-[#082848] transition-colors"
          >
            Terapkan Filter
          </button>

          <a
            href={`/admin/pendaftar/export.csv?status=${status}`}
            download={`pendaftar-${status || 'semua'}.csv`}
            className="px-4 py-2 bg-[#f3b641] text-[#0b2443] text-[12px] font-black rounded-xl hover:bg-[#ffca5b] transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            📥 Unduh CSV ({registrants.total})
          </a>

          <a
            href={`/admin/pendaftar/export.xls?status=${status}`}
            download={`pendaftar-${status || 'semua'}.xls`}
            className="px-4 py-2 bg-[#009b94] text-white text-[12px] font-black rounded-xl hover:bg-[#0aa8a1] transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            📊 Unduh Excel ({registrants.total})
          </a>
        </div>
      </div>

      {/* Registrants Table */}
      <div className="bg-white rounded-2xl border border-[#e2eaf0] shadow-sm overflow-hidden">
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
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>🗑️</span>
                <span>Hapus Terpilih ({selectedIds.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="px-2.5 py-1 text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
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
                <th className="py-3.5 px-6">Pendaftar</th>
                <th className="py-3.5 px-6">Brand / Entitas</th>
                <th className="py-3.5 px-6">Wilayah</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {registrants.data.length > 0 ? (
                registrants.data.map((item) => (
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
                      <span className="text-[11px] text-[#788e9f] block">{item.profile?.email}</span>
                      <span className="text-[11px] text-[#788e9f] block">{item.profile?.phone}</span>
                    </td>
                    <td className="py-4 px-6 text-[#24425e]">
                      <strong className="block">
                        {item.organization?.brand_name || item.organization?.legal_entity_name || '—'}
                      </strong>
                      <span className="text-[11px] text-[#788e9f]">
                        {item.organization?.sector || 'Sektor belum dipilih'}
                      </span>
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
                          Periksa Detail →
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200/70 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
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
                  <td colSpan={7} className="py-12 text-center text-[#899dae]">
                    Tidak ada pendaftar yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {registrants.last_page > 1 && (
          <div className="p-4 border-t border-[#eef3f7] flex justify-between items-center text-[12px]">
            <span className="text-[#6d8294]">
              Halaman {registrants.current_page} dari {registrants.last_page} (Total {registrants.total})
            </span>
            <div className="flex gap-1">
              {registrants.links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url || '#'}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-3 py-1 rounded-lg border ${
                    link.active
                      ? 'bg-[#0c355d] text-white font-bold border-[#0c355d]'
                      : link.url
                      ? 'bg-white text-[#122b43] border-[#d4dfe8] hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
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
