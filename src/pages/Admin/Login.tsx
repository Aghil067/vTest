import '@/admin.css';
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

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

  const handleDevFill = () => {
    setEmail('admin@vtest.local');
    setPassword('ChangeMe123!');
    setError('');
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
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border p-2 mb-4 shadow-lg ${
              isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200'
            }`}
          >
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 14.5L10.5 21L24 7.5" stroke="#2ECC71" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Vtest <span className="text-[#2ECC71]">Admin CMS</span>
          </h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1 font-mono uppercase tracking-wider">
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
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-0.5 rounded border border-[#2ECC71]/20">
              <ShieldCheck className="w-3 h-3" /> Secure Access
            </span>
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
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-muted)] hover:text-white transition-colors cursor-pointer"
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
                'Sign In to CMS'
              )}
            </button>
          </form>

          {/* Quick Dev Fill helper */}
          <div className="mt-6 pt-5 border-t border-[#1E3325]/40 text-center">
            <button
              type="button"
              onClick={handleDevFill}
              className="text-xs text-[var(--admin-muted)] hover:text-[#2ECC71] transition-colors underline underline-offset-4 cursor-pointer"
            >
              Fill Default Admin Credentials (admin@vtest.local / ChangeMe123!)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
