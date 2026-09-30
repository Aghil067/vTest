import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import '@/admin.css';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { BrandLogo } from '@/components/common/BrandLogo';
import Badge from '@/components/admin/Badge';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Lightbulb,
  Building2,
  Cpu,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

import ProfileModal from '@/components/admin/ProfileModal';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { logoUrl, settings } = useSettings();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Solutions', path: '/admin/solutions', icon: Lightbulb },
    { name: 'Industries', path: '/admin/industries', icon: Building2 },
    { name: 'Technology', path: '/admin/technology', icon: Cpu },
    { name: 'Projects / Cases', path: '/admin/projects', icon: Briefcase },
    { name: 'Resources', path: '/admin/resources', icon: FileText },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Admin Users', path: '/admin/users', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  const currentPath = location.pathname.split('/').filter(Boolean);
  const breadcrumbText =
    currentPath.length > 1
      ? currentPath[1].charAt(0).toUpperCase() + currentPath[1].slice(1)
      : 'Dashboard';

  return (
    <div
      className={`admin-shell min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#050A07] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 border-r flex flex-col transform transition-transform duration-300 ease-in-out ${
          isDark
            ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div
          className={`h-20 px-6 flex items-center justify-between border-b ${
            isDark ? 'border-[#1E3325]' : 'border-slate-100'
          }`}
        >
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <BrandLogo className="h-9 w-auto max-w-[130px] object-contain" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
            className="md:hidden p-1.5 text-[var(--admin-muted)] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="px-3 mb-2 text-[10px] font-bold text-[var(--admin-muted)] uppercase tracking-widest font-mono">
            Platform Modules
          </div>

          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'bg-[#2ECC71]/15 text-[#2ECC71] font-bold border border-[#2ECC71]/30 shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-xs'
                      : isDark
                      ? 'text-[var(--admin-copy)] hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{item.name}</span>
              </NavLink>
            );
          })}


        </nav>

        {/* User Info Footer */}
        <div
          className={`p-4 border-t ${
            isDark ? 'border-[#1E3325] bg-[#070C09]' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div
            className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#0F1812] border-[#1E3325] hover:border-[#2ECC71]/40 hover:bg-[#2ECC71]/5'
                : 'bg-white border-slate-200 shadow-xs hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
          >
            <div
              onClick={() => setProfileModalOpen(true)}
              title="Click to view profile & settings"
              className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center font-bold text-[#2ECC71] text-sm group-hover:scale-105 transition-transform">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate group-hover:text-[#2ECC71] transition-colors">
                  {user?.name || 'Administrator'}
                </p>
                <div className="mt-0.5">
                  <Badge status={user?.role || 'ADMIN'}>{user?.role || 'SUPER_ADMIN'}</Badge>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header
          className={`h-20 px-6 backdrop-blur-md border-b flex items-center justify-between sticky top-0 z-30 transition-colors ${
            isDark
              ? 'bg-[#050A07]/90 border-[#1E3325]'
              : 'bg-white/90 border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              aria-expanded={sidebarOpen}
              className={`md:hidden p-2 rounded-xl border ${
                isDark ? 'border-[#1E3325] text-[var(--admin-copy)]' : 'border-slate-200 text-slate-600'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[var(--admin-muted)]">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className={`font-bold capitalize ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {breadcrumbText}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle showLabel />

            {/* Public Link */}
            <Link
              to="/"
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isDark
                  ? 'border-[#1E3325] bg-[#0F1812] text-[var(--admin-copy)] hover:text-white hover:border-[#2ECC71]/40'
                  : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-xs'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2ECC71]" />
              Public Site
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'border-[#1E3325] bg-[#0A0F0C] text-[var(--admin-copy)] hover:text-white hover:bg-white/5'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <LogOut className="w-3.5 h-3.5 text-[var(--admin-muted)]" />
              Logout
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Admin Profile & Security Settings Modal */}
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </div>
  );
};

export default AdminLayout;
