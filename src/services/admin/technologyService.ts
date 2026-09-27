import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const technologyService = {
  getTechnologies: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/technology', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getTechnologies();
      return { success: true, count: data.length, data };
    }
  },

  getTechnologyById: async (id: string) => {
    try {
      const res = await adminApi.get(`/admin/technology/${id}`);
      return res.data;
    } catch {
      const data = unifiedStore.getTechnologyByIdOrSlug(id);
      return { success: Boolean(data), data };
    }
  },

  createTechnology: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/technology', data);
      unifiedStore.saveTechnology(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveTechnology(data);
      return { success: true, data: created };
    }
  },

  updateTechnology: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/technology/${id}`, data);
      unifiedStore.saveTechnology(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveTechnology({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteTechnology: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/technology/${id}`);
      unifiedStore.deleteTechnology(id);
      return res.data;
    } catch {
      unifiedStore.deleteTechnology(id);
      return { success: true, message: 'Technology deleted' };
    }
  },
};
