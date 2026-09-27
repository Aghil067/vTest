import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const userService = {
  getUsers: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/users', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getUsers();
      return { success: true, count: data.length, data };
    }
  },

  createUser: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/users', data);
      unifiedStore.saveUser(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveUser(data);
      return { success: true, data: created };
    }
  },

  updateUser: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/users/${id}`, data);
      unifiedStore.saveUser(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveUser({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteUser: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/users/${id}`);
      unifiedStore.deleteUser(id);
      return res.data;
    } catch {
      unifiedStore.deleteUser(id);
      return { success: true, message: 'User deleted' };
    }
  },
};
