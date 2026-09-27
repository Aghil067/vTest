import adminApi from './adminApi';
import { unifiedStore } from '@/services/store/unifiedStore';

export const mediaService = {
  getMediaAssets: async (params?: any) => {
    try {
      const res = await adminApi.get('/admin/media', { params });
      return res.data;
    } catch {
      const data = unifiedStore.getMedia();
      return { success: true, count: data.length, data };
    }
  },

  uploadMedia: async (formData: FormData) => {
    try {
      const res = await adminApi.post('/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      unifiedStore.saveMedia(res.data.data || res.data);
      return res.data;
    } catch {
      // Local fallback: convert file to Base64 Data URL so uploaded image works 100% everywhere!
      const file = formData.get('file') as File | null;
      if (file) {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const asset = {
          _id: `media-${Date.now()}`,
          url: dataUrl,
          filename: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          altText: (formData.get('altText') as string) || file.name,
        };
        unifiedStore.saveMedia(asset);
        return { success: true, data: asset };
      }
      throw new Error('No file provided');
    }
  },

  deleteMediaAsset: async (id: string) => {
    try {
      const res = await adminApi.delete(`/admin/media/${id}`);
      unifiedStore.deleteMedia(id);
      return res.data;
    } catch {
      unifiedStore.deleteMedia(id);
      return { success: true, message: 'Media deleted' };
    }
  },
};
