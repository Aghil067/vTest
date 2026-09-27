import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const settingService = {
  getSettings: async () => {
    try {
      const res = await adminApi.get('/admin/settings');
      return res.data;
    } catch {
      const data = unifiedStore.getSettings();
      return { success: true, data };
    }
  },

  updateSettings: async (data: any) => {
    try {
      const res = await adminApi.patch('/admin/settings', data);
      unifiedStore.updateSettings(res.data.data || data);
      return res.data;
    } catch {
      const updated = unifiedStore.updateSettings(data);
      return { success: true, data: updated };
    }
  },
};
