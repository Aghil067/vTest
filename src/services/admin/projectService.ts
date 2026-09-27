import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const projectService = {
  getProjects: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/projects', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getProjects();
      return { success: true, count: data.length, data };
    }
  },

  getProjectById: async (id: string) => {
    try {
      const res = await adminApi.get(`/admin/projects/${id}`);
      return res.data;
    } catch {
      const data = unifiedStore.getProjectByIdOrSlug(id);
      return { success: Boolean(data), data };
    }
  },

  createProject: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/projects', data);
      unifiedStore.saveProject(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveProject(data);
      return { success: true, data: created };
    }
  },

  updateProject: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/projects/${id}`, data);
      unifiedStore.saveProject(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveProject({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteProject: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/projects/${id}`);
      unifiedStore.deleteProject(id);
      return res.data;
    } catch {
      unifiedStore.deleteProject(id);
      return { success: true, message: 'Project deleted' };
    }
  },
};
