import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const enquiryService = {
  getEnquiries: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/enquiries', { params });
      return res.data;
    } catch {
      const list = unifiedStore.getEnquiries({ search: params?.search, status: params?.status });
      const page = Number(params?.page) || 1;
      const limit = Number(params?.limit) || 10;
      const startIndex = (page - 1) * limit;
      const paginated = list.slice(startIndex, startIndex + limit);

      return {
        success: true,
        count: list.length,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(list.length / limit) || 1,
          totalEnquiries: list.length,
          hasPrevPage: page > 1,
          hasNextPage: startIndex + limit < list.length,
        },
        data: paginated,
      };
    }
  },

  updateEnquiry: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/enquiries/${id}`, data);
      unifiedStore.updateEnquiry(id, data);
      return res.data;
    } catch {
      const updated = unifiedStore.updateEnquiry(id, data);
      return { success: true, data: updated };
    }
  },

  deleteEnquiry: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/enquiries/${id}`);
      unifiedStore.deleteEnquiry(id);
      return res.data;
    } catch {
      unifiedStore.deleteEnquiry(id);
      return { success: true, message: 'Enquiry deleted' };
    }
  },
};
