import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const industryService = {
  getIndustries: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/industries', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getIndustries();
      return { success: true, count: data.length, data };
    }
  },

  getIndustryById: async (id: string) => {
    try {
      const res = await adminApi.get(`/admin/industries/${id}`);
      return res.data;
    } catch {
      const data = unifiedStore.getIndustryByIdOrSlug(id);
      return { success: Boolean(data), data };
    }
  },

  createIndustry: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/industries', data);
      unifiedStore.saveIndustry(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveIndustry(data);
      return { success: true, data: created };
    }
  },

  updateIndustry: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/industries/${id}`, data);
      unifiedStore.saveIndustry(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveIndustry({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteIndustry: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/industries/${id}`);
      unifiedStore.deleteIndustry(id);
      return res.data;
    } catch {
      unifiedStore.deleteIndustry(id);
      return { success: true, message: 'Industry deleted' };
    }
  },
};
