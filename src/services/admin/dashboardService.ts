import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const dashboardService = {
  getDashboardStats: async () => {
    try {
      const res = await adminApi.get('/admin/dashboard/stats');
      return res.data;
    } catch {
      return unifiedStore.getDashboardStats();
    }
  },
};
