import type { Product, ProductFilters } from '@/types';
import { unifiedStore } from '@/services/store/unifiedStore';
import { apiClient, simulateDelay, USE_MOCK } from './client';

function normalizeProduct(p: any): Product {
  if (!p) return p;
  return {
    ...p,
    id: p.id || p._id || p.slug,
    name: p.name || p.title || 'Product',
    shortDescription: p.shortDescription || p.description || '',
    description: p.fullDescription || p.description || p.shortDescription || '',
    heroImage: p.heroImage || p.image || '/automotive-studio-900.jpg',
    status: p.status || 'PUBLISHED',
  };
}

export const productApi = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    if (USE_MOCK) {
      await simulateDelay(150);
      let products = unifiedStore.getProducts({
        type: filters?.type,
        search: filters?.search,
        featured: filters?.featured,
        status: 'PUBLISHED',
      });
      return (products as Product[]).map(normalizeProduct);
    }

    try {
      const f = filters || {};
      const params = new URLSearchParams();
      if (f.type) params.set('type', String(f.type));
      if (f.search) params.set('search', String(f.search));
      if (f.featured !== undefined) params.set('featured', String(f.featured));

      const { data } = await apiClient.get<any>(`/products?${params.toString()}`);
      const list = data?.data || data;
      return Array.isArray(list) ? list.map(normalizeProduct) : [];
    } catch {
      return (unifiedStore.getProducts({
        type: filters?.type,
        search: filters?.search,
        featured: filters?.featured,
        status: 'PUBLISHED',
      }) as Product[]).map(normalizeProduct);
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (USE_MOCK) {
      await simulateDelay(150);
      const prod = unifiedStore.getProductByIdOrSlug(slug);
      if (prod && prod.status === 'PUBLISHED') return normalizeProduct(prod);
      return null;
    }

    try {
      const { data } = await apiClient.get<any>(`/products/${slug}`);
      const prod = data?.data || data;
      return prod ? normalizeProduct(prod) : null;
    } catch {
      const prod = unifiedStore.getProductByIdOrSlug(slug);
      if (prod && prod.status === 'PUBLISHED') return normalizeProduct(prod);
      return null;
    }
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return productApi.getProducts({ featured: true });
  },

  async getSoftwareProducts(): Promise<Product[]> {
    return productApi.getProducts({ type: 'SOFTWARE' });
  },

  async getHardwareProducts(): Promise<Product[]> {
    return productApi.getProducts({ type: 'HARDWARE' });
  },
};
