import React, { useState, useRef } from 'react';
import { mediaService } from '@/services/admin/mediaService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Upload, Loader2, X, FileText, Image as ImageIcon, ExternalLink, Link2 } from 'lucide-react';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = 'image/*',
  label = 'Upload Image or File',
}) => {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { isDark } = useTheme();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', file.name);

      const res = await mediaService.uploadMedia(formData);
      if (res.success && res.data) {
        const uploadedUrl = res.data.url;
        onChange(uploadedUrl);
        toast.success(`File "${file.name}" uploaded successfully!`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setCustomUrl('');
      setShowUrlInput(false);
      toast.success('File URL applied');
    }
  };

  const isImage =
    value &&
    (value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) ||
      value.startsWith('data:image/') ||
      (value.includes('http') && !value.toLowerCase().endsWith('.pdf')));

  const isPdf = value && value.toLowerCase().includes('.pdf');

  return (
    <div className="space-y-2">
      {label && (
        <label
          className={`block font-bold text-xs mb-1 ${
            isDark ? 'text-[var(--admin-copy)]' : 'text-slate-700'
          }`}
        >
          {label}
        </label>
      )}

      {/* File Upload Controls & Preview */}
      <div className="space-y-3">
        {value ? (
          <div
            className={`p-3 rounded-xl flex items-center justify-between gap-3 border ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1e3325]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {isImage ? (
                <div
                  className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-xs flex items-center justify-center border ${
                    isDark ? 'bg-black border-[#1e3325]' : 'bg-white border-slate-200'
                  }`}
                >
                  <img src={value} alt="Uploaded asset" className="w-full h-full object-contain" />
                </div>
              ) : isPdf ? (
                <div className="w-12 h-12 rounded-lg bg-red-950/20 border border-red-500/30 flex items-center justify-center shrink-0 text-red-500 font-bold text-xs">
                  <FileText className="w-6 h-6" />
                </div>
              ) : (
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border ${
                    isDark
                      ? 'bg-[#0F1812] border-[#2ECC71]/30 text-[#2ECC71]'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}
                >
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs font-bold truncate font-mono ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {value}
                </p>
                {!value.startsWith('data:') && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-600 hover:underline font-medium inline-flex items-center gap-1 mt-0.5"
                  >
                    <ExternalLink className="w-3 h-3" /> View in New Tab
                  </a>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-red-500 hover:bg-black/5 transition-colors cursor-pointer"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className={`px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer border ${
              isDark
                ? 'bg-[#0F1812] hover:bg-[#16251b] border-[#1e3325] hover:border-[#2ECC71]/40 text-white'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-xs'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                Uploading File...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-emerald-500" />
                {value ? 'Replace File' : 'Choose & Upload File'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className={`px-3 py-2 border rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isDark
                ? 'bg-transparent hover:bg-white/5 border-[#1e3325] text-[var(--admin-muted)] hover:text-white'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            {showUrlInput ? 'Cancel URL' : 'Paste Direct URL'}
          </button>
        </div>

        {showUrlInput && (
          <form onSubmit={handleUrlSubmit} className="flex items-center gap-2 pt-1">
            <input
              type="url"
              placeholder="https://example.com/asset.jpg"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className={`flex-1 px-3 py-2 rounded-xl text-xs focus:outline-none border ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1e3325] text-white placeholder-slate-500 focus:border-[#2ECC71]'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
              }`}
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#2ECC71] text-[#050A07] rounded-xl text-xs font-bold hover:brightness-110 cursor-pointer"
            >
              Apply
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

