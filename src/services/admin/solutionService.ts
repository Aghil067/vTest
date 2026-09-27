import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const solutionService = {
  getSolutions: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/solutions', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getSolutions();
      return { success: true, count: data.length, data };
    }
  },

  getSolutionById: async (id: string) => {
    try {
      const res = await adminApi.get(`/admin/solutions/${id}`);
      return res.data;
    } catch {
      const data = unifiedStore.getSolutionByIdOrSlug(id);
      return { success: Boolean(data), data };
    }
  },

  createSolution: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/solutions', data);
      unifiedStore.saveSolution(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveSolution(data);
      return { success: true, data: created };
    }
  },

  updateSolution: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/solutions/${id}`, data);
      unifiedStore.saveSolution(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveSolution({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteSolution: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/solutions/${id}`);
      unifiedStore.deleteSolution(id);
      return res.data;
    } catch {
      unifiedStore.deleteSolution(id);
      return { success: true, message: 'Solution deleted' };
    }
  },
};
