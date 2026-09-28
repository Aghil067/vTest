import React, { useEffect, useState } from 'react';
import { productService } from '@/services/admin/productService';
import { categoryService } from '@/services/admin/categoryService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Pagination from '@/components/admin/Pagination';
import Skeleton from '@/components/admin/Skeleton';
import FileUpload from '@/components/admin/FileUpload';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // Filter state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewProduct, setViewProduct] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    productType: 'HARDWARE',
    category: '',
    heroImage: '',
    brochure: '',
    datasheet: '',
    status: 'PUBLISHED',
    featured: true,
    seoTitle: '',
    metaDescription: '',
  });

  const toast = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts({
        page,
        limit: 10,
        search,
        category: categoryFilter,
        status: statusFilter,
        productType: typeFilter,
      });
      if (res.success) {
        setProducts(res.data);
        setPagination(res.pagination);
      }
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    const handleStoreChange = () => fetchProducts();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, [page, search, categoryFilter, statusFilter, typeFilter]);

  const handleOpenModal = (prod: any = null) => {
    if (prod) {
      setSelectedProduct(prod);
      setFormData({
        name: prod.name || '',
        slug: prod.slug || '',
        shortDescription: prod.shortDescription || '',
        fullDescription: prod.fullDescription || prod.description || '',
        productType: prod.productType || prod.type || 'HARDWARE',
        category: prod.category?._id || prod.category?.name || prod.category || '',
        heroImage: prod.heroImage || prod.image || '',
        brochure: prod.brochure || prod.brochureUrl || '',
        datasheet: prod.datasheet || prod.datasheetUrl || '',
        status: prod.status || 'PUBLISHED',
        featured: prod.featured ?? true,
        seoTitle: prod.seoTitle || '',
        metaDescription: prod.metaDescription || '',
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        productType: 'HARDWARE',
        category: categories[0]?._id || '',
        heroImage: '/automotive-studio.jpg',
        brochure: '',
        datasheet: '',
        status: 'PUBLISHED',
        featured: true,
        seoTitle: '',
        metaDescription: '',
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
      slug: selectedProduct ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error('Product Name and Slug are required.');
      return;
    }

    try {
      setSubmitting(true);
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct._id || selectedProduct.id, formData);
        toast.success('Product updated successfully!');
      } else {
        await productService.createProduct(formData);
        toast.success('Product created successfully and published!');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productService.deleteProduct(id);
        toast.success(`Product "${name}" deleted`);
        fetchProducts();
      } catch {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleTogglePublish = async (prod: any) => {
    try {
      const id = prod._id || prod.id;
      if (prod.status === 'PUBLISHED') {
        await productService.unpublishProduct(id);
        toast.success(`Unpublished ${prod.name}`);
      } else {
        await productService.publishProduct(id);
        toast.success(`Published ${prod.name}`);
      }
      fetchProducts();
    } catch {
      toast.error('Failed to change publish status');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Product Catalog Management</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Create, update, and manage hardware sensors, PTI test benches, and software suites.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg shadow-[#2ECC71]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-2xl border transition-colors flex flex-col md:flex-row gap-3 ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="relative flex-1 flex items-center h-10">
          <Search className="w-4 h-4 text-[var(--admin-muted)] absolute left-3.5 pointer-events-none z-10 top-0 bottom-0 my-auto" />
          <input
            type="text"
            placeholder="Search products by title, model, or description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1E3325] text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className={`px-3 py-2 rounded-xl text-xs border focus:outline-none ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-copy)]'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="">All Categories</option>
            {categories.map((c: any) => (
              <option key={c._id || c.id} value={c._id || c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className={`px-3 py-2 rounded-xl text-xs border focus:outline-none ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-copy)]'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="">All Types</option>
            <option value="HARDWARE">Hardware Only</option>
            <option value="SOFTWARE">Software Only</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className={`px-3 py-2 rounded-xl text-xs border focus:outline-none ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-copy)]'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead
              className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-muted)]'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <tr>
                <th className="py-3.5 px-4 font-bold">Product</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Type</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3325]/40">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="p-4">
                      <Skeleton className="h-10 w-full" />
                    </td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                    <Package className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                    No products found matching filters
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const id = p._id || p.id;
                  const catName = p.category?.name || p.categoryId || 'General';
                  const prodType = p.productType || p.type || 'HARDWARE';

                  return (
                    <tr
                      key={id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-lg bg-black/40 border border-[#1E3325] overflow-hidden shrink-0 flex items-center justify-center">
                            {p.heroImage ? (
                              <img src={p.heroImage} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <Package className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{p.name}</p>
                            <p className="text-[11px] text-[var(--admin-muted)] font-mono mt-0.5 truncate">
                              /{p.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-[var(--admin-copy)]">
                        {catName}
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge status={prodType}>{prodType}</Badge>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className="cursor-pointer group flex items-center gap-1.5"
                          title="Click to toggle status"
                        >
                          <Badge status={p.status}>{p.status}</Badge>
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewProduct(p)}
                            title="Quick View"
                            className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenModal(p)}
                            title="Edit Product"
                            className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(id, p.name)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
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

        {pagination && (
          <Pagination
            currentPage={pagination.currentPage || page}
            totalPages={pagination.totalPages || 1}
            onPageChange={setPage}
            hasPrev={pagination.hasPrevPage}
            hasNext={pagination.hasNextPage}
          />
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProduct ? `Edit Product: ${selectedProduct.name}` : 'Add New Product'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. PTI-Pro Lane Controller"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
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
                placeholder="e.g. pti-pro-lane-controller"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Product Type *
              </label>
              <select
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="HARDWARE">Hardware Product</option>
                <option value="SOFTWARE">Software Product</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Publish Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="PUBLISHED">Published (Visible on site)</option>
                <option value="DRAFT">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Short Summary Description
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="High-level 1-2 sentence overview of product capabilities..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Full Technical Description
            </label>
            <textarea
              rows={4}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed technical specifications, architecture overview, OEM grade certifications..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Hero Image Upload */}
          <FileUpload
            label="Product Hero Image"
            value={formData.heroImage}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
            accept="image/*"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Brochure Download URL (PDF)
              </label>
              <input
                type="text"
                value={formData.brochure}
                onChange={(e) => setFormData({ ...formData, brochure: e.target.value })}
                placeholder="https://example.com/brochure.pdf"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Datasheet Download URL (PDF)
              </label>
              <input
                type="text"
                value={formData.datasheet}
                onChange={(e) => setFormData({ ...formData, datasheet: e.target.value })}
                placeholder="https://example.com/datasheet.pdf"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
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
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </>
              ) : selectedProduct ? (
                'Save Changes'
              ) : (
                'Create & Publish Product'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Quick View Modal */}
      {viewProduct && (
        <Modal
          isOpen={Boolean(viewProduct)}
          onClose={() => setViewProduct(null)}
          title={`Product: ${viewProduct.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="w-full h-48 rounded-xl bg-black/40 border border-[#1E3325] overflow-hidden flex items-center justify-center">
              {viewProduct.heroImage ? (
                <img
                  src={viewProduct.heroImage}
                  alt={viewProduct.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Package className="w-12 h-12 text-slate-600" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge status={viewProduct.productType || viewProduct.type}>
                {viewProduct.productType || viewProduct.type}
              </Badge>
              <Badge status={viewProduct.status}>{viewProduct.status}</Badge>
              <span className="text-xs text-[var(--admin-muted)] font-mono">Slug: /{viewProduct.slug}</span>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)] mb-1">
                Short Description
              </h4>
              <p className="text-sm text-[var(--admin-copy)] leading-relaxed">{viewProduct.shortDescription}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)] mb-1">
                Full Description
              </h4>
              <p className="text-xs text-[var(--admin-copy)] leading-relaxed whitespace-pre-line">
                {viewProduct.fullDescription || viewProduct.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1E3325] flex justify-between items-center">
              <a
                href={
                  viewProduct.productType === 'SOFTWARE' || viewProduct.type === 'SOFTWARE'
                    ? `/products/software/${viewProduct.slug}`
                    : `/products/hardware/${viewProduct.slug}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#2ECC71] hover:underline inline-flex items-center gap-1"
              >
                View on Public Site <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setViewProduct(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminProducts;
