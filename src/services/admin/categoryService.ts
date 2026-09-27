import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const categoryService = {
  getCategories: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/categories', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getCategories();
      return { success: true, count: data.length, data };
    }
  },

  createCategory: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/categories', data);
      unifiedStore.saveCategory(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveCategory(data);
      return { success: true, data: created };
    }
  },

  updateCategory: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/categories/${id}`, data);
      unifiedStore.saveCategory(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveCategory({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/categories/${id}`);
      unifiedStore.deleteCategory(id);
      return res.data;
    } catch {
      unifiedStore.deleteCategory(id);
      return { success: true, message: 'Category deleted' };
    }
  },
};
