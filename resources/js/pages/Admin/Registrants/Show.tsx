import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/AdminLayout';

interface RegistrationDetail {
  id: number;
  registration_code: string;
  status: string;
  created_at: string;
  ip_address: string;
  profile?: {
    full_name: string;
    email: string;
    phone: string;
    position: string;
    province: string;
    city: string;
  };
  organization?: {
    brand_name: string;
    legal_entity_name: string;
    entity_type: string;
    founded_year: number;
    sector: string;
    annual_revenue: string;
    website: string;
    address_detail: string;
  };
  offering?: {
    offering_type: string;
    usp: string;
    description: string;
    target_market: string;
  };
  answers?: Array<{
    id: number;
    question_key: string;
    answer_text: string;
  }>;
  consents?: Array<{
    id: number;
    consent_key: string;
    consented: boolean;
    consent_text: string;
    consented_at: string;
    ip_hash: string;
  }>;
  status_logs?: Array<{
    id: number;
    from_status: string | null;
    to_status: string;
    note: string | null;
    created_at: string;
    actor?: { name: string };
  }>;
}

interface Props {
  registration: RegistrationDetail;
}

export default function RegistrantShow({ registration }: Props) {
  const { data, setData, post, processing } = useForm({
    status: registration.status,
    note: '',
  });

  const [statusUpdated, setStatusUpdated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/admin/pendaftar/${registration.id}/status`, {
      onSuccess: () => {
        setStatusUpdated(true);
        setTimeout(() => setStatusUpdated(false), 3000);
      },
    });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    router.delete(`/admin/pendaftar/${registration.id}`, {
      onFinish: () => {
        setIsDeleting(false);
        setShowDeleteModal(false);
      },
    });
  };

  const goalsList = registration.answers
    ?.filter((a) => a.question_key === 'goals')
    ?.map((a) => a.answer_text || (a as any).answer_value)
    ?.filter(Boolean);
  const goals = goalsList && goalsList.length > 0 ? goalsList.join(' • ') : '—';
  
  const expectation =
    registration.answers?.find((a) => a.question_key === 'expectation')?.answer_text ||
    (registration.answers?.find((a) => a.question_key === 'expectation') as any)?.answer_value;
    
  const category =
    registration.answers?.find((a) => a.question_key === 'interest_category')?.answer_text ||
    (registration.answers?.find((a) => a.question_key === 'interest_category') as any)?.answer_value ||
    (registration.profile as any)?.category_label;

  return (
    <AdminLayout title={`Detail Registrasi — ${registration.registration_code}`}>
      <Head>
        <title>{`${registration.registration_code} | Admin 500 Brand Global`}</title>
      </Head>

      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/admin/pendaftar"
          className="text-[#0c508d] text-[13px] font-bold hover:underline"
        >
          ← Kembali ke Daftar Pendaftar
        </Link>

        <span className="font-mono text-sm px-3 py-1 bg-white border border-[#dce6ee] rounded-lg font-bold text-[#0c416e]">
          ID: {registration.registration_code}
        </span>
      </div>

      {statusUpdated && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold">
          ✔ Status pendaftaran berhasil diperbarui dan tercatat di audit log.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Comprehensive Applicant Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identitas Pendaftar */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
            <h2 className="text-base font-bold text-[#061a33] mb-4 pb-2 border-b border-[#f0f4f8]">
              Bagian A — Identitas Pendaftar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-[11px] text-[#718799] block">Nama Lengkap</span>
                <strong className="text-[#061a33] text-[14px]">
                  {registration.profile?.full_name || '—'}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Kategori Pendaftar</span>
                <strong className="text-[#061a33]">{category || '—'}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Email Aktif</span>
                <strong className="text-[#061a33]">{registration.profile?.email || '—'}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">WhatsApp / Telepon</span>
                <strong className="text-[#061a33]">{registration.profile?.phone || '—'}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Domisili</span>
                <strong className="text-[#061a33]">
                  {registration.profile?.city}, {registration.profile?.province}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Peran / Jabatan</span>
                <strong className="text-[#061a33]">{registration.profile?.position || '—'}</strong>
              </div>
            </div>
          </div>

          {/* Usaha atau Organisasi */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
            <h2 className="text-base font-bold text-[#061a33] mb-4 pb-2 border-b border-[#f0f4f8]">
              Bagian B — Informasi Usaha / Organisasi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-[11px] text-[#718799] block">Nama Usaha / Lembaga</span>
                <strong className="text-[#061a33]">
                  {registration.organization?.legal_entity_name || '—'}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Nama Brand (Merek)</span>
                <strong className="text-[#0c416e] text-[14px]">
                  {registration.organization?.brand_name || '—'}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Bentuk Badan Usaha</span>
                <strong className="text-[#061a33]">{registration.organization?.entity_type || '—'}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Bidang Sektor</span>
                <strong className="text-[#061a33]">{registration.organization?.sector || '—'}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Tahun Mulai Beroperasi</span>
                <strong className="text-[#061a33]">
                  {registration.organization?.founded_year || '—'}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#718799] block">Skala Usaha</span>
                <strong className="text-[#061a33]">
                  {registration.organization?.annual_revenue || '—'}
                </strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[11px] text-[#718799] block">Website / Akun Media Sosial</span>
                <span className="text-[#0c508d] font-semibold">
                  {registration.organization?.website || '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Produk dan Tujuan */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
            <h2 className="text-base font-bold text-[#061a33] mb-4 pb-2 border-b border-[#f0f4f8]">
              Bagian C & D — Produk, Layanan, dan Tujuan Program
            </h2>
            <div className="space-y-4 text-[13px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-[#718799] block">Jenis Penawaran Utama</span>
                  <strong className="text-[#061a33]">
                    {registration.offering?.offering_type || '—'}
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-[#718799] block">Nama Produk / Program Unggulan</span>
                  <strong className="text-[#061a33]">
                    {registration.offering?.usp || '—'}
                  </strong>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#718799] block">Deskripsi Produk / Rencana Usaha</span>
                <p className="text-[#3b556e] mt-1 bg-[#f9fbfd] p-3 rounded-lg border border-[#eef3f7] leading-relaxed">
                  {registration.offering?.description || 'Tidak ada deskripsi.'}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-[#718799] block">Tujuan Mengikuti Program (Multi)</span>
                <p className="text-[#061a33] font-semibold mt-1">
                  {goals || '—'}
                </p>
              </div>

              {expectation && (
                <div>
                  <span className="text-[11px] text-[#718799] block">Harapan Pembelajaran / Pendampingan</span>
                  <p className="text-[#3b556e] mt-1 bg-[#f9fbfd] p-3 rounded-lg border border-[#eef3f7]">
                    {expectation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Persetujuan & Legalitas */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
            <h2 className="text-base font-bold text-[#061a33] mb-4 pb-2 border-b border-[#f0f4f8]">
              Bagian E — Rekam Persetujuan (Consents Audit)
            </h2>
            <div className="space-y-3 text-[12px]">
              {registration.consents?.map((c) => (
                <div key={c.id} className="p-3 bg-[#f8fafc] rounded-xl border border-[#e7edf3] flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-[11px] text-[#0c416e] block font-bold">
                      {c.consent_key}
                    </span>
                    <p className="text-[#597187] text-[11px] mt-0.5">{c.consent_text}</p>
                    <span className="text-[10px] text-[#8aa0b3] block mt-1">
                      Waktu: {c.consented_at} | Hash IP: {c.ip_hash.substring(0, 16)}...
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold flex-none ${
                      c.consented ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {c.consented ? 'Disetujui' : 'Tidak'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Status Transition & Status Logs */}
        <div className="space-y-6">
          {/* Update Status Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
            <h2 className="text-base font-bold text-[#061a33] mb-3">Pembaruan Status Pendaftar</h2>
            <form onSubmit={handleStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-[#1d3c58] mb-1.5">
                  Status Operasional
                </label>
                <select
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ccdbe7] text-[13px] bg-white focus:outline-none focus:border-[#1065a1]"
                >
                  <option value="submitted">Baru (Submitted)</option>
                  <option value="under_review">Dalam Pemeriksaan (Under Review)</option>
                  <option value="verified">Terverifikasi (Verified)</option>
                  <option value="scheduled_pitch">Jadwal Sesi Presentasi (Scheduled Pitch)</option>
                  <option value="accepted_stage2">Kandidat Tahap 2 (Accepted Stage 2)</option>
                  <option value="rejected">Ditolak / Tidak Memenuhi Syarat</option>
                  <option value="withdrawn">Dibatalkan / Mengundurkan Diri</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1d3c58] mb-1.5">
                  Catatan Internal Admin
                </label>
                <textarea
                  rows={3}
                  placeholder="Masukkan alasan atau catatan untuk audit log..."
                  value={data.note}
                  onChange={(e) => setData('note', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#ccdbe7] text-[13px] focus:outline-none focus:border-[#1065a1]"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-2.5 bg-[#0c355d] hover:bg-[#072442] text-white font-extrabold text-[12px] rounded-xl transition-colors shadow disabled:opacity-50"
              >
                {processing ? 'Menyimpan...' : 'Perbarui Status ✓'}
              </button>
            </form>
          </div>

          {/* Status History Logs */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2eaf0] shadow-sm">
            <h2 className="text-base font-bold text-[#061a33] mb-4">Riwayat Perubahan Status</h2>
            <div className="space-y-3">
              {registration.status_logs && registration.status_logs.length > 0 ? (
                registration.status_logs.map((log) => (
                  <div key={log.id} className="p-3 bg-[#f8fafc] rounded-xl border border-[#eaf0f6] text-[12px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#0c416e]">{log.to_status}</span>
                      <span className="text-[10px] text-[#8da1b2]">{log.created_at}</span>
                    </div>
                    {log.note && <p className="text-[#597187] text-[11px] mb-1">{log.note}</p>}
                    <span className="text-[10px] text-[#93a6b7] block">
                      Oleh: {log.actor?.name || 'Sistem Otomatis'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[#8da1b2] text-[12px]">Belum ada riwayat perubahan.</p>
              )}
            </div>
          </div>

          {/* Danger Zone: Hapus Pendaftar */}
          <div className="bg-red-50/60 p-6 rounded-2xl border border-red-200/80 shadow-sm">
            <h2 className="text-sm font-extrabold text-red-900 mb-1">Zona Bahaya (Danger Zone)</h2>
            <p className="text-[11.5px] text-red-700/90 mb-4 leading-relaxed">
              Hapus seluruh berkas pendaftaran ini secara permanen dari basis data sistem 500 Brand Global.
            </p>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[12px] rounded-xl transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>🗑️</span>
              <span>Hapus Data Pendaftar Ini</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mb-4">
              🗑️
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">
              Hapus Pendaftar {registration.registration_code}?
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Seluruh data profil pendaftar, organisasi/brand, jawaban formulir, berkas persetujuan, dan catatan audit log akan dihapus secara permanen dari server.
            </p>

            <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">No. Registrasi:</span>
                <span className="font-mono font-bold text-gray-900">{registration.registration_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Nama:</span>
                <span className="font-bold text-gray-900">{registration.profile?.full_name || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Brand:</span>
                <span className="font-bold text-gray-900">{registration.organization?.brand_name || '—'}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? (
                  <span>Menghapus...</span>
                ) : (
                  <>
                    <span>🗑️</span>
                    <span>Ya, Hapus Permanen</span>
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
