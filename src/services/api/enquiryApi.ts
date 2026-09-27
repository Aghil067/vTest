import type { EnquiryPayload, EnquiryResponse } from '@/types';
import { unifiedStore } from '@/services/store/unifiedStore';
import { apiClient, simulateDelay, USE_MOCK } from './client';

export const enquiryApi = {
  async submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
    // Always persist to unified store so admin can view it immediately!
    const saved = unifiedStore.saveEnquiry({
      ...payload,
      fullName: (payload as any).fullName || (payload as any).name || 'Website Prospect',
      status: 'NEW',
    });

    if (USE_MOCK) {
      await simulateDelay(600);
      return {
        id: saved._id || saved.id,
        status: 'RECEIVED',
        createdAt: saved.createdAt,
      };
    }

    try {
      const { data } = await apiClient.post<EnquiryResponse>('/enquiries', payload);
      return data;
    } catch {
      return {
        id: saved._id || saved.id,
        status: 'RECEIVED',
        createdAt: saved.createdAt,
      };
    }
  },
};
