import React, { useEffect, useState } from 'react';
import { industryService } from '@/services/admin/industryService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Skeleton from '@/components/admin/Skeleton';
import FileUpload from '@/components/admin/FileUpload';
import { Building2, Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';

export const AdminIndustries: React.FC = () => {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    heroImage: '',
    status: 'PUBLISHED',
  });

  const toast = useToast();

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const res = await industryService.getIndustries();
      if (res.success) setIndustries(res.data);
    } catch {
      toast.error('Failed to load industries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
    const handleStoreChange = () => fetchIndustries();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  const handleOpenModal = (ind: any = null) => {
    if (ind) {
      setSelectedIndustry(ind);
      setFormData({
        name: ind.name || ind.industryName || ind.title || '',
        slug: ind.slug || '',
        description: ind.description || ind.summary || '',
        heroImage: ind.heroImage || ind.image || '',
        status: ind.status || 'PUBLISHED',
      });
    } else {
      setSelectedIndustry(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        heroImage: '/automotive-studio.jpg',
        status: 'PUBLISHED',
      });
    }
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: selectedIndustry ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error('Industry name and slug are required.');
      return;
    }

    const payload = {
      ...formData,
      industryName: formData.name,
      title: formData.name,
    };

    try {
      setSubmitting(true);
      if (selectedIndustry) {
        await industryService.updateIndustry(selectedIndustry._id || selectedIndustry.id, payload);
        toast.success('Industry updated!');
      } else {
        await industryService.createIndustry(payload);
        toast.success('Industry created!');
      }
      setIsModalOpen(false);
      fetchIndustries();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete industry "${name}"?`)) {
      try {
        await industryService.deleteIndustry(id);
        toast.success(`Industry "${name}" deleted`);
        fetchIndustries();
      } catch {
        toast.error('Failed to delete industry');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Target Industries</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Sectors served including PTI stations, OEM assembly lines, and commercial transport fleets.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Industry
        </button>
      </div>

      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <table className="w-full text-left text-xs">
          <thead
            className={`border-b text-[11px] font-mono uppercase tracking-wider ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-muted)]'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <tr>
              <th className="py-3.5 px-4 font-bold">Industry Sector</th>
              <th className="py-3.5 px-4 font-bold">Slug</th>
              <th className="py-3.5 px-4 font-bold">Description</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E3325]/40">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="p-4">
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ))
            ) : industries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                  No industries found
                </td>
              </tr>
            ) : (
              industries.map((ind) => {
                const id = ind._id || ind.id;
                const name = ind.name || ind.industryName || ind.title;
                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-sm">
                      <div className="flex items-center gap-3">
                        {ind.heroImage || ind.image ? (
                          <div className="w-10 h-10 rounded-lg bg-black border border-[#1E3325] overflow-hidden shrink-0">
                            <img src={ind.heroImage || ind.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : null}
                        <span>{name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[var(--admin-muted)]">/{ind.slug}</td>
                    <td className="py-3.5 px-4 text-[var(--admin-copy)] max-w-xs truncate">
                      {ind.description || ind.summary || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={ind.status}>{ind.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/industries/${ind.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-white"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenModal(ind)}
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(id, name)}
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Industry Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedIndustry ? `Edit Industry: ${selectedIndustry.name || selectedIndustry.industryName}` : 'New Industry'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Industry Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Periodic Technical Inspection"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Industry Overview
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Sector overview and market requirements..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <FileUpload
            label="Industry Banner Image"
            value={formData.heroImage}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E3325]/40">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-[#1E3325] text-[var(--admin-copy)] text-xs font-semibold hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Industry'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminIndustries;
