import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '@/services/admin/dashboardService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Skeleton from '@/components/admin/Skeleton';
import {
  Package,
  FolderTree,
  Lightbulb,
  Building2,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Eye,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const toast = useToast();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getDashboardStats();
      if (res.success) {
        setData(res);
      }
    } catch {
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const handleStoreChange = () => fetchDashboard();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  const { stats, recentProducts = [], recentEnquiries = [] } = data || {};

  const statCards = [
    {
      label: 'Total Products',
      count: stats?.totalProducts || 0,
      sub: `${stats?.publishedProducts || 0} Published`,
      icon: Package,
      link: '/admin/products',
    },
    {
      label: 'Published Products',
      count: stats?.publishedProducts || 0,
      sub: `${stats?.draftProducts || 0} Drafts`,
      icon: CheckCircle2,
      link: '/admin/products',
    },
    {
      label: 'Categories',
      count: stats?.totalCategories || 0,
      sub: 'Taxonomy units',
      icon: FolderTree,
      link: '/admin/categories',
    },
    {
      label: 'Solutions',
      count: stats?.totalSolutions || 0,
      sub: 'Core systems',
      icon: Lightbulb,
      link: '/admin/solutions',
    },
    {
      label: 'Industries',
      count: stats?.totalIndustries || 0,
      sub: 'Market sectors',
      icon: Building2,
      link: '/admin/industries',
    },
    {
      label: 'Case Studies',
      count: stats?.totalProjects || 0,
      sub: 'Proven deployments',
      icon: Briefcase,
      link: '/admin/projects',
    },
    {
      label: 'New Enquiries',
      count: stats?.newEnquiries || 0,
      sub: `${stats?.openEnquiries || 0} active leads`,
      icon: MessageSquare,
      link: '/admin/enquiries',
    },
    {
      label: 'Media Assets',
      count: stats?.totalMediaAssets || 0,
      sub: 'Uploaded assets',
      icon: ImageIcon,
      link: '/admin/products',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div
        className={`p-6 lg:p-8 rounded-3xl border relative overflow-hidden shadow-xl transition-all ${
          isDark
            ? 'bg-gradient-to-r from-[#0F1812] via-[#111f16] to-[#0A1A0E] border-[#1E3325] text-white'
            : 'bg-gradient-to-r from-emerald-700 to-emerald-900 border-emerald-800 text-white'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#2ECC71] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Content Management Engine
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Vehicle Testing CMS Dashboard
            </h1>
            <p className="text-[var(--admin-copy)] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Manage vehicle testing hardware, software licenses, turnkey inspection solutions, and client enquiries. Any updates made here immediately sync to your live public website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Link>
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs backdrop-blur-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#2ECC71]" /> View Enquiries
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.link}
              className={`p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0F1812] border-[#1E3325] hover:border-[#2ECC71]/40 hover:shadow-lg hover:shadow-[#2ECC71]/5'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--admin-muted)] uppercase tracking-wider font-mono">
                    {card.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
                    {card.count}
                  </p>
                  <p className="text-[11px] text-[var(--admin-muted)] mt-1 font-mono">{card.sub}</p>
                </div>
                <div
                  className={`p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 ${
                    isDark
                      ? 'bg-[#2ECC71]/10 border-[#2ECC71]/30 text-[#2ECC71]'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Columns: Recent Products & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold tracking-tight">Recent Products</h2>
              <p className="text-xs text-[var(--admin-muted)]">Live products in catalog</p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-semibold text-[#2ECC71] hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <p className="text-xs text-[var(--admin-muted)] py-6 text-center">No products found</p>
            ) : (
              recentProducts.map((p: any) => (
                <div
                  key={p._id || p.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-[#0A0F0C] border-[#1E3325]/80' : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-black/40 border border-[#1E3325] overflow-hidden shrink-0 flex items-center justify-center">
                      {p.heroImage ? (
                        <img src={p.heroImage} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <Package className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{p.name}</p>
                      <p className="text-[11px] text-[var(--admin-muted)] truncate mt-0.5">{p.shortDescription}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge status={p.status}>{p.status}</Badge>
                    <Link
                      to="/admin/products"
                      className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71]"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div
          className={`p-6 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold tracking-tight">Recent Inquiries</h2>
              <p className="text-xs text-[var(--admin-muted)]">Demo & RFP submissions from site</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-[#2ECC71] hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.length === 0 ? (
              <p className="text-xs text-[var(--admin-muted)] py-6 text-center">No enquiries yet</p>
            ) : (
              recentEnquiries.map((enq: any) => (
                <div
                  key={enq._id || enq.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-[#0A0F0C] border-[#1E3325]/80' : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold truncate">{enq.fullName || enq.name}</p>
                      <span className="text-[10px] font-mono text-[var(--admin-muted)]">
                        ({enq.company || 'Private'})
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--admin-muted)] truncate mt-0.5">{enq.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge status={enq.status}>{enq.status}</Badge>
                    <Link
                      to="/admin/enquiries"
                      className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71]"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
