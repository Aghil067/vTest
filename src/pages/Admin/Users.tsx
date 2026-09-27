import React, { useEffect, useState } from 'react';
import { userService } from '@/services/admin/userService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Skeleton from '@/components/admin/Skeleton';
import { Users as UsersIcon, Plus, Edit, Trash2, Loader2, Shield } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { user: currentUser } = useAuth();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
    status: 'ACTIVE',
  });

  const toast = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getUsers();
      if (res.success) setUsers(res.data);
    } catch {
      toast.error('Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const handleStoreChange = () => fetchUsers();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, []);

  const handleOpenModal = (u: any = null) => {
    if (u) {
      setSelectedUser(u);
      setFormData({
        name: u.name || '',
        email: u.email || '',
        password: '',
        role: u.role || 'ADMIN',
        status: u.status || 'ACTIVE',
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN',
        status: 'ACTIVE',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required.');
      return;
    }

    try {
      setSubmitting(true);
      if (selectedUser) {
        await userService.updateUser(selectedUser._id || selectedUser.id, formData);
        toast.success('Admin user updated!');
      } else {
        await userService.createUser(formData);
        toast.success('Admin user created!');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (id === currentUser?._id || id === currentUser?.id) {
      toast.error('You cannot delete your own account while logged in');
      return;
    }
    if (window.confirm(`Delete administrator "${name}"?`)) {
      try {
        await userService.deleteUser(id);
        toast.success(`User "${name}" removed`);
        fetchUsers();
      } catch {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Access Control & Administrators</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Manage authorized staff members, engineering roles, and CMS permissions.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Administrator
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
              <th className="py-3.5 px-4 font-bold">User Name</th>
              <th className="py-3.5 px-4 font-bold">Email Address</th>
              <th className="py-3.5 px-4 font-bold">Role Assignment</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E3325]/40">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="p-4">
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--admin-muted)]">
                  <UsersIcon className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                  No administrators configured
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const id = u._id || u.id;
                const isCurrent = id === currentUser?._id || id === currentUser?.id;
                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#2ECC71]/15 text-[#2ECC71] flex items-center justify-center font-bold text-xs">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <span>{u.name}</span>
                          {isCurrent && (
                            <span className="ml-2 text-[10px] font-mono text-[#2ECC71] bg-[#2ECC71]/10 px-1.5 py-0.5 rounded">
                              Current Session
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[var(--admin-copy)]">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <Badge status={u.role}>{u.role}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={u.status}>{u.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenModal(u)}
                          className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {!isCurrent && (
                          <button
                            onClick={() => handleDelete(id, u.name)}
                            className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? `Edit Administrator: ${selectedUser.name}` : 'New Administrator'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Marcus Thorne"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="m.thorne@vtest.local"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
              Password {selectedUser ? '(Leave empty to retain existing)' : '*'}
            </label>
            <input
              type="password"
              required={!selectedUser}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Role Assignment
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Full platform permissions)</option>
                <option value="ADMIN">ADMIN (Product and enquiry management)</option>
                <option value="EDITOR">EDITOR (Draft editing only)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Account Status
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
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
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
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Administrator'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUsers;
