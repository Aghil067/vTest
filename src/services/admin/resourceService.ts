import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const resourceService = {
  getResources: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/resources', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getResources({ type: params?.type, status: params?.status });
      return { success: true, count: data.length, data };
    }
  },

  getResourceById: async (id: string) => {
    try {
      const res = await adminApi.get(`/admin/resources/${id}`);
      return res.data;
    } catch {
      const data = unifiedStore.getResourceByIdOrSlug(id);
      return { success: Boolean(data), data };
    }
  },

  createResource: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/resources', data);
      unifiedStore.saveResource(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveResource(data);
      return { success: true, data: created };
    }
  },

  updateResource: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/resources/${id}`, data);
      unifiedStore.saveResource(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveResource({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteResource: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/resources/${id}`);
      unifiedStore.deleteResource(id);
      return res.data;
    } catch {
      unifiedStore.deleteResource(id);
      return { success: true, message: 'Resource deleted' };
    }
  },
};
