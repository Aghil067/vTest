import '@/admin.css';
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { settings } = useSettings();
  const { isDark } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        toast.success(`Welcome back, ${res.user?.name || 'Admin'}!`);
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`admin-login min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors ${
        isDark ? 'bg-[#050A07] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2ECC71]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar for Back Link and Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            isDark
              ? 'border-[#1E3325] text-[var(--admin-muted)] hover:text-white hover:bg-white/5'
              : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </Link>
        <ThemeToggle showLabel />
      </div>

      <div className="w-full max-w-md relative z-10 my-12">
        {/* Branding Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="mb-4 inline-block hover:opacity-90 transition-opacity">
            <BrandLogo className="h-12 sm:h-14 w-auto max-w-[220px] object-contain" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECC71]/10 border border-[#2ECC71]/25 text-[#2ECC71] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            Admin Portal
          </div>
          <p className="text-xs text-[var(--admin-muted)] font-mono uppercase tracking-wider">
            {settings?.general?.tagline || 'Automotive Inspection & Compliance Control Engine'}
          </p>
        </div>

        {/* Login Card */}
        <div
          className={`border rounded-3xl p-8 shadow-2xl backdrop-blur-xl transition-all ${
            isDark
              ? 'bg-[#0A0F0C]/90 border-[#1E3325]'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}
        >
          <div className="mb-6 pb-4 border-b border-[#1E3325]/40 flex items-center justify-between">
            <h2 className="text-base font-bold tracking-tight">Administrator Authentication</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-medium leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vtest.local"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                    isDark
                      ? 'bg-[#0F1812] border-[#1E3325] text-white placeholder-slate-600 focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#2ECC71]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                    isDark
                      ? 'bg-[#0F1812] border-[#1E3325] text-white placeholder-slate-600 focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#2ECC71]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--admin-muted)] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#2ECC71]/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
