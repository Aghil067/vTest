import React, { useEffect, useState } from 'react';
import { categoryService } from '@/services/admin/categoryService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Skeleton from '@/components/admin/Skeleton';
import { FolderTree, Plus, Edit, Trash2, Loader2 } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'PUBLISHED',
    displayOrder: 1,
  });

  const toast = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getCategories();
      if (res.success) setCategories(res.data);
    } catch {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    const handleStoreChange = () => fetchCategories();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  const handleOpenModal = (cat: any = null) => {
    if (cat) {
      setSelectedCategory(cat);
      setFormData({
        name: cat.name || '',
        slug: cat.slug || '',
        description: cat.description || '',
        status: cat.status || 'PUBLISHED',
        displayOrder: cat.displayOrder ?? 1,
      });
    } else {
      setSelectedCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        status: 'PUBLISHED',
        displayOrder: categories.length + 1,
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
      slug: selectedCategory ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error('Name and Slug are required.');
      return;
    }

    try {
      setSubmitting(true);
      if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory._id || selectedCategory.id, formData);
        toast.success('Category updated!');
      } else {
        await categoryService.createCategory(formData);
        toast.success('Category created!');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      try {
        await categoryService.deleteCategory(id);
        toast.success(`Category "${name}" deleted`);
        fetchCategories();
      } catch {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Category Taxonomy</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Organize products and testing equipment into logical market clusters.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Category
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
              <th className="py-3.5 px-4 font-bold">Category Name</th>
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
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                  <FolderTree className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((c) => {
                const id = c._id || c.id;
                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-sm">{c.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[var(--admin-muted)]">/{c.slug}</td>
                    <td className="py-3.5 px-4 text-[var(--admin-copy)] max-w-xs truncate">
                      {c.description || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={c.status}>{c.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenModal(c)}
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(id, c.name)}
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

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCategory ? `Edit Category: ${selectedCategory.name}` : 'New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Category Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Brake & Suspension Testers"
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
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category overview..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
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
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
