import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const productService = {
  getProducts: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/products', { params });
      return res.data;
    } catch {
      const list = unifiedStore.getProducts({
        search: params?.search,
        category: params?.category,
        status: params?.status,
        type: params?.productType,
      });
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
          totalProducts: list.length,
          hasPrevPage: page > 1,
          hasNextPage: startIndex + limit < list.length,
        },
        data: paginated,
      };
    }
  },

  getProductById: async (id: string) => {
    try {
      const res = await adminApi.get(`/admin/products/${id}`);
      return res.data;
    } catch {
      const product = unifiedStore.getProductByIdOrSlug(id);
      return { success: Boolean(product), data: product };
    }
  },

  createProduct: async (data: any) => {
    try {
      const res = await adminApi.post('/admin/products', data);
      unifiedStore.saveProduct(res.data.data || res.data);
      return res.data;
    } catch {
      const created = unifiedStore.saveProduct(data);
      return { success: true, data: created };
    }
  },

  updateProduct: async (id: string, data: any) => {
    try {
      const res = await adminApi.patch(`/admin/products/${id}`, data);
      unifiedStore.saveProduct(res.data.data || { ...data, _id: id, id });
      return res.data;
    } catch {
      const updated = unifiedStore.saveProduct({ ...data, _id: id, id });
      return { success: true, data: updated };
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/products/${id}`);
      unifiedStore.deleteProduct(id);
      return res.data;
    } catch {
      unifiedStore.deleteProduct(id);
      return { success: true, message: 'Product deleted' };
    }
  },

  publishProduct: async (id: string) => {
    try {
      const res = await adminApi.post(`/admin/products/${id}/publish`);
      unifiedStore.setProductStatus(id, 'PUBLISHED');
      return res.data;
    } catch {
      const prod = unifiedStore.setProductStatus(id, 'PUBLISHED');
      return { success: true, data: prod };
    }
  },

  unpublishProduct: async (id: string) => {
    try {
      const res = await adminApi.post(`/admin/products/${id}/unpublish`);
      unifiedStore.setProductStatus(id, 'DRAFT');
      return res.data;
    } catch {
      const prod = unifiedStore.setProductStatus(id, 'DRAFT');
      return { success: true, data: prod };
    }
  },
};
