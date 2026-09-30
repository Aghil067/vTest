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
      // Local fallback: convert file to compressed WebP/JPEG Data URL so it never exceeds quota
      const file = formData.get('file') as File | null;
      if (file) {
        let dataUrl = '';
        try {
          if (file.type.startsWith('image/')) {
            dataUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                  const maxDim = 800;
                  let w = img.width;
                  let h = img.height;
                  if (w > maxDim || h > maxDim) {
                    if (w > h) {
                      h = Math.round((h * maxDim) / w);
                      w = maxDim;
                    } else {
                      w = Math.round((w * maxDim) / h);
                      h = maxDim;
                    }
                  }
                  const canvas = document.createElement('canvas');
                  canvas.width = w;
                  canvas.height = h;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(img, 0, 0, w, h);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                    return;
                  }
                  resolve((e.target?.result as string) || '');
                };
                img.onerror = () => resolve((e.target?.result as string) || '');
                img.src = (e.target?.result as string) || '';
              };
              reader.readAsDataURL(file);
            });
          } else {
            // PDF, DOC, DOCX or other documents: read directly
            dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve((e.target?.result as string) || '');
              reader.onerror = (err) => reject(err);
              reader.readAsDataURL(file);
            });
          }
        } catch {
          dataUrl = '';
        }

        const asset = {
          _id: `media-${Date.now()}`,
          url: dataUrl || '/automotive-studio.jpg',
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
