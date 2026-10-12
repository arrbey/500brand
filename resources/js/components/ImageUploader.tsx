import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  label: string;
  helperText?: string;
  value: string;
  onChange: (url: string) => void;
  existingImages?: string[];
  aspectRatio?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  helperText,
  value,
  onChange,
  existingImages = [],
  aspectRatio = 'aspect-[16/10]',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.ico')) {
      setErrorMsg('Format file harus berupa gambar (JPG, PNG, WebP, SVG, ICO).');
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal adalah 6 MB.');
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/admin/cms/upload-image', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': getCsrfToken(),
          Accept: 'application/json',
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onChange(result.url);
      } else {
        setErrorMsg(result.message || 'Gagal mengunggah gambar. Silakan coba lagi.');
      }
    } catch (err: any) {
      setErrorMsg('Terjadi kesalahan jaringan saat mengunggah gambar.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[12.5px] font-bold text-[#1b3652]">{label}</label>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[11px] text-[#0e6780] hover:underline font-semibold"
        >
          {showManualInput ? 'Sembunyikan Input Path' : 'Edit Path URL Manual'}
        </button>
      </div>

      {helperText && <p className="text-[11.5px] text-[#698299]">{helperText}</p>}

      {/* Preview and Upload Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-[#dbe6f0] bg-[#f9fbfd] flex flex-col gap-3.5">
        <div className="flex items-center gap-3.5">
          {/* Thumbnail Preview */}
          <div
            className={`w-32 sm:w-36 ${aspectRatio} rounded-xl overflow-hidden border border-[#cfdce8] bg-[#071c36] shadow-sm relative group flex-none`}
          >
            {value ? (
              <img
                src={value}
                alt="Pratinjau Gambar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/preview_img_1.jpeg';
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/50 text-[10px] p-2 text-center">
                <span>Belum ada gambar</span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-[#061a33]/80 backdrop-blur-xs flex flex-col items-center justify-center text-white text-[11px] font-bold gap-1.5">
                <span className="w-4 h-4 border-2 border-white/30 border-t-[#f3b641] rounded-full animate-spin"></span>
                <span>Mengunggah...</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="text-[11.5px] font-bold text-[#1b3652] truncate font-mono">
              {value ? value.split('/').pop() : 'Belum dipilih'}
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              {existingImages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(true)}
                  className="px-2.5 py-1 rounded-lg border border-[#c6d7e6] bg-white hover:bg-gray-50 text-[11px] font-bold text-[#1b3652] flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <span>🖼️</span>
                  <span>Pilih dari Galeri ({existingImages.length})</span>
                </button>
              )}

              {value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#0e6780] hover:underline"
                >
                  Lihat Full ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons & Drop Zone */}
        <div className="space-y-2 w-full">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#c6d7e6] hover:border-[#0e6780] rounded-xl p-2.5 sm:p-3 bg-white text-center transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/x-icon, image/vnd.microsoft.icon, .ico"
              className="hidden"
            />
            <div className="flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#0e4375] flex-wrap">
              <span>📁</span>
              <span>Klik untuk Upload File</span>
              <span className="text-[#889fb3] font-normal text-[10.5px]">(atau drag & drop)</span>
            </div>
            <span className="text-[10px] text-[#7d93a7] block mt-0.5">
              Mendukung JPG, PNG, WebP, SVG, ICO (Maks. 6 MB)
            </span>
          </div>

          {errorMsg && (
            <div className="text-[11.5px] text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">
              ⚠️ {errorMsg}
            </div>
          )}
        </div>
      </div>

      {/* Manual Input Field (Conditional) */}
      {showManualInput && (
        <div className="mt-2 animate-in fade-in duration-150">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Contoh: /images/preview_img_1.jpeg atau https://domain.com/foto.jpg"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[12.5px] font-mono bg-white"
          />
          <span className="text-[11px] text-[#758a9e] mt-1 block">
            Jalur file lokal dimulai dengan <code>/images/...</code> atau URL gambar lengkap.
          </span>
        </div>
      )}

      {/* Modal Galeri Foto */}
      {showGalleryModal && (
        <div
          className="fixed inset-0 z-50 bg-[#06182c]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowGalleryModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-white/20 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-[#071c36]">Koleksi Galeri Dokumentasi Web</h3>
                <p className="text-[12px] text-[#698299]">
                  Klik salah satu gambar di bawah untuk langsung menerapkannya.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold grid place-items-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto p-2 my-4">
              {existingImages.map((imgPath, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange(imgPath);
                    setShowGalleryModal(false);
                  }}
                  className={`aspect-[16/10] rounded-xl overflow-hidden border-2 cursor-pointer group relative transition-all ${
                    value === imgPath
                      ? 'border-[#0e6780] ring-3 ring-[#0e6780]/30 shadow-md'
                      : 'border-transparent hover:border-[#0e6780]/50'
                  }`}
                >
                  <img
                    src={imgPath}
                    alt={`Galeri ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/60 text-white text-[10px] font-mono truncate">
                    {imgPath.split('/').pop()}
                  </div>
                  {value === imgPath && (
                    <div className="absolute top-2 right-2 bg-[#0e6780] text-white w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold shadow">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[12.5px] font-bold text-gray-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
