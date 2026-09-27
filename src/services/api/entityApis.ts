import type { Solution, Industry, Technology, Project, Resource } from '@/types';
import { unifiedStore } from '@/services/store/unifiedStore';
import { apiClient, simulateDelay, USE_MOCK } from './client';

export const solutionApi = {
  async getSolutions(): Promise<Solution[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return unifiedStore.getSolutions('PUBLISHED') as Solution[];
    }
    try {
      const { data } = await apiClient.get<any>('/solutions');
      return (data?.data || data) as Solution[];
    } catch {
      return unifiedStore.getSolutions('PUBLISHED') as Solution[];
    }
  },

  async getSolutionBySlug(slug: string): Promise<Solution | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const sol = unifiedStore.getSolutionByIdOrSlug(slug);
      if (sol && sol.status === 'PUBLISHED') return sol as Solution;
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/solutions/${slug}`);
      return (data?.data || data) as Solution;
    } catch {
      const sol = unifiedStore.getSolutionByIdOrSlug(slug);
      if (sol && sol.status === 'PUBLISHED') return sol as Solution;
      return null;
    }
  },
};

export const industryApi = {
  async getIndustries(): Promise<Industry[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return unifiedStore.getIndustries('PUBLISHED') as Industry[];
    }
    try {
      const { data } = await apiClient.get<any>('/industries');
      return (data?.data || data) as Industry[];
    } catch {
      return unifiedStore.getIndustries('PUBLISHED') as Industry[];
    }
  },

  async getIndustryBySlug(slug: string): Promise<Industry | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const ind = unifiedStore.getIndustryByIdOrSlug(slug);
      if (ind && ind.status === 'PUBLISHED') return ind as Industry;
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/industries/${slug}`);
      return (data?.data || data) as Industry;
    } catch {
      const ind = unifiedStore.getIndustryByIdOrSlug(slug);
      if (ind && ind.status === 'PUBLISHED') return ind as Industry;
      return null;
    }
  },
};

export const technologyApi = {
  async getTechnologies(): Promise<Technology[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return unifiedStore.getTechnologies('PUBLISHED') as Technology[];
    }
    try {
      const { data } = await apiClient.get<any>('/technology');
      return (data?.data || data) as Technology[];
    } catch {
      return unifiedStore.getTechnologies('PUBLISHED') as Technology[];
    }
  },

  async getTechnologyBySlug(slug: string): Promise<Technology | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const tech = unifiedStore.getTechnologyByIdOrSlug(slug);
      if (tech && tech.status === 'PUBLISHED') return tech as Technology;
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/technology/${slug}`);
      return (data?.data || data) as Technology;
    } catch {
      const tech = unifiedStore.getTechnologyByIdOrSlug(slug);
      if (tech && tech.status === 'PUBLISHED') return tech as Technology;
      return null;
    }
  },
};

export const projectApi = {
  async getProjects(): Promise<Project[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return unifiedStore.getProjects('PUBLISHED') as Project[];
    }
    try {
      const { data } = await apiClient.get<any>('/projects');
      return (data?.data || data) as Project[];
    } catch {
      return unifiedStore.getProjects('PUBLISHED') as Project[];
    }
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const proj = unifiedStore.getProjectByIdOrSlug(slug);
      if (proj && proj.status === 'PUBLISHED') return proj as Project;
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/projects/${slug}`);
      return (data?.data || data) as Project;
    } catch {
      const proj = unifiedStore.getProjectByIdOrSlug(slug);
      if (proj && proj.status === 'PUBLISHED') return proj as Project;
      return null;
    }
  },
};

export const resourceApi = {
  async getResources(type?: string): Promise<Resource[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return unifiedStore.getResources({ type, status: 'PUBLISHED' }) as Resource[];
    }
    try {
      const { data } = await apiClient.get<any>(`/resources${type ? `?type=${type}` : ''}`);
      return (data?.data || data) as Resource[];
    } catch {
      return unifiedStore.getResources({ type, status: 'PUBLISHED' }) as Resource[];
    }
  },

  async getResourceBySlug(slug: string): Promise<Resource | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const res = unifiedStore.getResourceByIdOrSlug(slug);
      if (res && res.status === 'PUBLISHED') return res as Resource;
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/resources/${slug}`);
      return (data?.data || data) as Resource;
    } catch {
      const res = unifiedStore.getResourceByIdOrSlug(slug);
      if (res && res.status === 'PUBLISHED') return res as Resource;
      return null;
    }
  },
};
