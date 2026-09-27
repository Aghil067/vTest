import React, { useEffect, useState } from 'react';
import { technologyService } from '@/services/admin/technologyService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Skeleton from '@/components/admin/Skeleton';
import { Cpu, Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';

export const AdminTechnology: React.FC = () => {
  const [techList, setTechList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    technologyName: '',
    slug: '',
    description: '',
    technologyCategory: 'Computer Vision',
    icon: 'Cpu',
    status: 'PUBLISHED',
  });

  const toast = useToast();

  const fetchTech = async () => {
    try {
      setLoading(true);
      const res = await technologyService.getTechnologies();
      if (res.success) setTechList(res.data);
    } catch {
      toast.error('Failed to load technology items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTech();
    const handleStoreChange = () => fetchTech();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  const handleOpenModal = (t: any = null) => {
    if (t) {
      setSelectedTech(t);
      setFormData({
        technologyName: t.technologyName || t.name || '',
        slug: t.slug || '',
        description: t.description || '',
        technologyCategory: t.technologyCategory || t.category || 'Computer Vision',
        icon: t.icon || 'Cpu',
        status: t.status || 'PUBLISHED',
      });
    } else {
      setSelectedTech(null);
      setFormData({
        technologyName: '',
        slug: '',
        description: '',
        technologyCategory: 'Computer Vision',
        icon: 'Cpu',
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
      technologyName: val,
      slug: selectedTech ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.technologyName || !formData.slug) {
      toast.error('Technology name and slug are required.');
      return;
    }

    const payload = {
      ...formData,
      name: formData.technologyName,
      title: formData.technologyName,
    };

    try {
      setSubmitting(true);
      if (selectedTech) {
        await technologyService.updateTechnology(selectedTech._id || selectedTech.id, payload);
        toast.success('Technology updated!');
      } else {
        await technologyService.createTechnology(payload);
        toast.success('Technology created!');
      }
      setIsModalOpen(false);
      fetchTech();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete technology "${name}"?`)) {
      try {
        await technologyService.deleteTechnology(id);
        toast.success(`Technology "${name}" deleted`);
        fetchTech();
      } catch {
        toast.error('Failed to delete technology');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Core Technologies</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Underlying engineering domains: AI Vision, Multi-bus IoT, Edge Robotics, and Cloud Compliance.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Technology
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
              <th className="py-3.5 px-4 font-bold">Technology</th>
              <th className="py-3.5 px-4 font-bold">Category</th>
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
            ) : techList.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                  <Cpu className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                  No technologies found
                </td>
              </tr>
            ) : (
              techList.map((t) => {
                const id = t._id || t.id;
                const name = t.technologyName || t.name;
                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#2ECC71]/10 border border-[#2ECC71]/30 flex items-center justify-center text-[#2ECC71] shrink-0">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold">{name}</p>
                          <p className="text-[10px] font-mono text-[var(--admin-muted)]">/{t.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[var(--admin-copy)] font-mono text-[11px]">
                      {t.technologyCategory || 'General'}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--admin-copy)] max-w-xs truncate">
                      {t.description || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={t.status}>{t.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/technology/${t.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-white"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenModal(t)}
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

      {/* Add / Edit Technology Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTech ? `Edit Technology: ${selectedTech.technologyName || selectedTech.name}` : 'New Technology'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Technology Name *
              </label>
              <input
                type="text"
                required
                value={formData.technologyName}
                onChange={handleNameChange}
                placeholder="e.g. Edge AI Defect Detection"
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
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Category
            </label>
            <input
              type="text"
              value={formData.technologyCategory}
              onChange={(e) => setFormData({ ...formData, technologyCategory: e.target.value })}
              placeholder="e.g. Computer Vision / Industrial IoT"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Technical description of the architecture and algorithm stack..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

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
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Technology'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTechnology;
