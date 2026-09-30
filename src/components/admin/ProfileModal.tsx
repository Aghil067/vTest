import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import { authService } from '@/services/admin/authService';
import Modal from '@/components/admin/Modal';
import Badge from '@/components/admin/Badge';
import { User, Lock, Save, KeyRound, Loader2, ShieldCheck } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const { isDark } = useTheme();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  // Profile Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user, isOpen]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Name and Email are required');
      return;
    }

    try {
      setSavingProfile(true);
      const res = await authService.updateProfile({ name, email });
      if (res.success) {
        toast.success(res.message || 'Profile updated successfully!');
        const updatedUser = res.user || { ...user, name, email };
        setUser(updatedUser);
        localStorage.setItem('vtest_user', JSON.stringify(updatedUser));
        onClose();
      } else {
        toast.error(res.message || 'Failed to update profile');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setSavingPassword(true);
      const res = await authService.changePassword({
        currentPassword,
        newPassword
      });

      if (res.success) {
        toast.success(res.message || 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        toast.error(res.message || 'Failed to update password');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admin Profile & Security Settings" maxWidth="max-w-xl">
      <div className="space-y-6">
        {/* Profile Info Header Banner */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0A0F0C] border border-[#1E3325]">
          <div className="w-14 h-14 rounded-2xl bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center font-bold text-[#2ECC71] text-2xl shadow-inner">
            {name ? name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">{name || 'Administrator'}</h3>
            <p className="text-xs text-[var(--admin-muted)] font-mono truncate">{email}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge status={user?.role || 'ADMIN'}>{user?.role || 'SUPER_ADMIN'}</Badge>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Account Active
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#1E3325]">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#2ECC71] text-[#2ECC71]'
                : 'border-transparent text-[var(--admin-muted)] hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Edit Profile Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'password'
                ? 'border-[#2ECC71] text-[#2ECC71]'
                : 'border-transparent text-[var(--admin-muted)] hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Change Password
          </button>
        </div>

        {/* Tab 1: Edit Profile Form */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                Full Name / Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                  isDark ? 'bg-[#0A0F0C] border-[#1E3325] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                  isDark ? 'bg-[#0A0F0C] border-[#1E3325] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E3325]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[var(--admin-surface)] border border-[var(--admin-border)] text-[var(--admin-heading)] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Change Password Form */}
        {activeTab === 'password' && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                  isDark ? 'bg-[#0A0F0C] border-[#1E3325] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                New Password (Min. 6 characters)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                  isDark ? 'bg-[#0A0F0C] border-[#1E3325] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
                  isDark ? 'bg-[#0A0F0C] border-[#1E3325] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E3325]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[var(--admin-surface)] border border-[var(--admin-border)] text-[var(--admin-heading)] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingPassword}
                className="px-5 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {savingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ProfileModal;
