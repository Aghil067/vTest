import React, { useEffect, useState } from 'react';
import { resourceService } from '@/services/admin/resourceService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Skeleton from '@/components/admin/Skeleton';
import FileUpload from '@/components/admin/FileUpload';
import { FileText, Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';

export const AdminResources: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'WHITEPAPER',
    description: '',
    fileUrl: '',
    author: 'Vetest Editorial Team',
    status: 'PUBLISHED',
  });

  const toast = useToast();

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await resourceService.getResources();
      if (res.success) setResources(res.data);
    } catch {
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    const handleStoreChange = () => fetchResources();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  const handleOpenModal = (r: any = null) => {
    if (r) {
      setSelectedResource(r);
      setFormData({
        title: r.title || '',
        slug: r.slug || '',
        type: r.type || 'WHITEPAPER',
        description: r.description || '',
        fileUrl: r.fileUrl || '',
        author: r.author || 'Vetest Editorial Team',
        status: r.status || 'PUBLISHED',
      });
    } else {
      setSelectedResource(null);
      setFormData({
        title: '',
        slug: '',
        type: 'WHITEPAPER',
        description: '',
        fileUrl: '',
        author: 'Vetest Editorial Team',
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
      title: val,
      slug: selectedResource ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error('Title and slug are required.');
      return;
    }

    try {
      setSubmitting(true);
      if (selectedResource) {
        await resourceService.updateResource(selectedResource._id || selectedResource.id, formData);
        toast.success('Resource updated!');
      } else {
        await resourceService.createResource(formData);
        toast.success('Resource created!');
      }
      setIsModalOpen(false);
      fetchResources();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete resource "${title}"?`)) {
      try {
        await resourceService.deleteResource(id);
        toast.success(`Resource "${title}" deleted`);
        fetchResources();
      } catch {
        toast.error('Failed to delete resource');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Technical Publications & Whitepapers</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Research papers, regulatory compliance guides, and hardware documentation.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Publication
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
              <th className="py-3.5 px-4 font-bold">Document Title</th>
              <th className="py-3.5 px-4 font-bold">Type</th>
              <th className="py-3.5 px-4 font-bold">Author</th>
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
            ) : resources.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                  No publications found
                </td>
              </tr>
            ) : (
              resources.map((r) => {
                const id = r._id || r.id;
                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-sm">
                      <div>
                        <p className="font-bold">{r.title}</p>
                        <p className="text-[11px] text-[var(--admin-muted)] truncate max-w-xs">{r.description}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={r.type}>{r.type}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-[var(--admin-copy)] font-mono text-[11px]">
                      {r.author || 'Vetest'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={r.status}>{r.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/resources/${r.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-white"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenModal(r)}
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(id, r.title)}
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

      {/* Add / Edit Resource Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedResource ? `Edit Resource: ${selectedResource.title}` : 'New Publication'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Publication Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleNameChange}
              placeholder="e.g. PTI Calibration Standard ISO 17020 Guide"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Document Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="WHITEPAPER">Whitepaper</option>
                <option value="BROCHURE">Product Brochure</option>
                <option value="DATASHEET">Datasheet</option>
                <option value="ARTICLE">Technical Article</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Summary Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <FileUpload
            label="Upload Document (PDF / Doc)"
            value={formData.fileUrl}
            onChange={(url) => setFormData({ ...formData, fileUrl: url })}
            accept=".pdf,.doc,.docx"
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
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Publication'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminResources;
