import React, { useEffect, useState } from 'react';
import { solutionService } from '@/services/admin/solutionService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Skeleton from '@/components/admin/Skeleton';
import FileUpload from '@/components/admin/FileUpload';
import { Lightbulb, Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';

export const AdminSolutions: React.FC = () => {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    heroImage: '',
    featuresText: '',
    benefitsText: '',
    status: 'PUBLISHED',
  });

  const toast = useToast();

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const res = await solutionService.getSolutions();
      if (res.success) setSolutions(res.data);
    } catch {
      toast.error('Failed to load solutions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
    const handleStoreChange = () => fetchSolutions();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  const handleOpenModal = (sol: any = null) => {
    if (sol) {
      setSelectedSolution(sol);
      setFormData({
        name: sol.name || sol.title || '',
        slug: sol.slug || '',
        description: sol.description || sol.summary || '',
        heroImage: sol.heroImage || sol.image || '',
        featuresText: (sol.features || sol.capabilities || []).join('\n'),
        benefitsText: (sol.benefits || []).join('\n'),
        status: sol.status || 'PUBLISHED',
      });
    } else {
      setSelectedSolution(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        heroImage: '/automotive-studio.jpg',
        featuresText: '',
        benefitsText: '',
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
      slug: selectedSolution ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error('Solution name and slug are required.');
      return;
    }

    const payload = {
      ...formData,
      title: formData.name,
      features: formData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      capabilities: formData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      benefits: formData.benefitsText
        .split('\n')
        .map((b) => b.trim())
        .filter(Boolean),
    };

    try {
      setSubmitting(true);
      if (selectedSolution) {
        await solutionService.updateSolution(selectedSolution._id || selectedSolution.id, payload);
        toast.success('Solution updated!');
      } else {
        await solutionService.createSolution(payload);
        toast.success('Solution created & published!');
      }
      setIsModalOpen(false);
      fetchSolutions();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete solution "${name}"?`)) {
      try {
        await solutionService.deleteSolution(id);
        toast.success(`Solution "${name}" deleted`);
        fetchSolutions();
      } catch {
        toast.error('Failed to delete solution');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Turnkey Solutions Management</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Configure vehicle test lane automation packages and end-of-line integration solutions.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Solution
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
              <th className="py-3.5 px-4 font-bold">Solution Title</th>
              <th className="py-3.5 px-4 font-bold">Slug</th>
              <th className="py-3.5 px-4 font-bold">Key Capabilities</th>
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
            ) : solutions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                  No solutions found
                </td>
              </tr>
            ) : (
              solutions.map((s) => {
                const id = s._id || s.id;
                const features = s.features || s.capabilities || [];
                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-sm">
                      <div className="flex items-center gap-3">
                        {s.heroImage || s.image ? (
                          <div className="w-10 h-10 rounded-lg bg-black border border-[#1E3325] overflow-hidden shrink-0">
                            <img src={s.heroImage || s.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : null}
                        <div>
                          <p className="font-bold text-sm">{s.name || s.title}</p>
                          <p className="text-[11px] text-[var(--admin-muted)] truncate max-w-xs">{s.description || s.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[var(--admin-muted)]">/{s.slug}</td>
                    <td className="py-3.5 px-4 text-[var(--admin-copy)]">
                      <span className="text-[11px] font-mono bg-[#2ECC71]/10 text-[#2ECC71] px-2 py-0.5 rounded border border-[#2ECC71]/20">
                        {features.length} Features
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={s.status}>{s.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/solutions/${s.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-white"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenModal(s)}
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(id, s.name || s.title)}
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

      {/* Add / Edit Solution Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSolution ? `Edit Solution: ${selectedSolution.name || selectedSolution.title}` : 'New Solution'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Solution Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Automated PTI Test Lane"
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
              Solution Overview
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Comprehensive solution description..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <FileUpload
            label="Solution Cover Image"
            value={formData.heroImage}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Key Features (one per line)
              </label>
              <textarea
                rows={4}
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                placeholder="Automated lane sequence control&#10;Zero paper records&#10;Real-time brake balance"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Business Benefits (one per line)
              </label>
              <textarea
                rows={4}
                value={formData.benefitsText}
                onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
                placeholder="40% throughput increase&#10;ISO 17020 compliance&#10;Tamper-proof certificates"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
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
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Solution'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminSolutions;
