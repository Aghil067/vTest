import type { Solution, Industry, Technology, Project, Resource } from '@/types';
import { unifiedStore } from '@/services/store/unifiedStore';
import { apiClient, simulateDelay, USE_MOCK } from './client';

function normalizeSolution(s: any): Solution {
  if (!s) return s;
  return {
    ...s,
    id: s.id || s._id || s.slug,
    title: s.title || s.name || 'Solution',
    summary: s.summary || s.description || '',
    description: s.description || s.summary || '',
    image: s.image || s.heroImage || '/hero-bg.jpg',
    icon: s.icon || 'ClipboardCheck',
    status: s.status || 'PUBLISHED',
  };
}

function normalizeIndustry(i: any): Industry {
  if (!i) return i;
  return {
    ...i,
    id: i.id || i._id || i.slug,
    title: i.title || i.industryName || 'Industry',
    summary: i.summary || i.description || '',
    description: i.description || i.summary || '',
    image: i.image || i.heroImage || '/automotive-studio-900.jpg',
    icon: i.icon || 'Building2',
    status: i.status || 'PUBLISHED',
  };
}

export const solutionApi = {
  async getSolutions(): Promise<Solution[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return (unifiedStore.getSolutions('PUBLISHED') as Solution[]).map(normalizeSolution);
    }
    try {
      const { data } = await apiClient.get<any>('/solutions');
      const list = (data?.data || data) as any[];
      return Array.isArray(list) ? list.map(normalizeSolution) : [];
    } catch {
      return (unifiedStore.getSolutions('PUBLISHED') as Solution[]).map(normalizeSolution);
    }
  },

  async getSolutionBySlug(slug: string): Promise<Solution | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const sol = unifiedStore.getSolutionByIdOrSlug(slug);
      if (sol && sol.status === 'PUBLISHED') return normalizeSolution(sol);
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/solutions/${slug}`);
      const sol = data?.data || data;
      return sol ? normalizeSolution(sol) : null;
    } catch {
      const sol = unifiedStore.getSolutionByIdOrSlug(slug);
      if (sol && sol.status === 'PUBLISHED') return normalizeSolution(sol);
      return null;
    }
  },
};

export const industryApi = {
  async getIndustries(): Promise<Industry[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return (unifiedStore.getIndustries('PUBLISHED') as Industry[]).map(normalizeIndustry);
    }
    try {
      const { data } = await apiClient.get<any>('/industries');
      const list = (data?.data || data) as any[];
      return Array.isArray(list) ? list.map(normalizeIndustry) : [];
    } catch {
      return (unifiedStore.getIndustries('PUBLISHED') as Industry[]).map(normalizeIndustry);
    }
  },

  async getIndustryBySlug(slug: string): Promise<Industry | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const ind = unifiedStore.getIndustryByIdOrSlug(slug);
      if (ind && ind.status === 'PUBLISHED') return normalizeIndustry(ind);
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/industries/${slug}`);
      const ind = data?.data || data;
      return ind ? normalizeIndustry(ind) : null;
    } catch {
      const ind = unifiedStore.getIndustryByIdOrSlug(slug);
      if (ind && ind.status === 'PUBLISHED') return normalizeIndustry(ind);
      return null;
    }
  },
};

function normalizeTechnology(t: any): Technology {
  if (!t) return t;
  return {
    ...t,
    id: t.id || t._id || t.slug,
    title: t.title || t.technologyName || 'Technology',
    summary: t.summary || t.description || '',
    description: t.description || t.summary || '',
    image: t.image || t.heroImage || '/hero-bg.jpg',
    icon: t.icon || 'Cpu',
    status: t.status || 'PUBLISHED',
  };
}

function normalizeProject(p: any): Project {
  if (!p) return p;
  return {
    ...p,
    id: p.id || p._id || p.slug,
    title: p.title || p.projectTitle || 'Project',
    clientOrProjectName: p.clientOrProjectName || p.clientName || p.title || p.projectTitle || 'Confidential Client',
    summary: p.summary || p.description || '',
    description: p.description || p.summary || '',
    heroImage: p.heroImage || p.image || '/automotive-studio-900.jpg',
    status: p.status || 'PUBLISHED',
  };
}

function normalizeResource(r: any): Resource {
  if (!r) return r;
  return {
    ...r,
    id: r.id || r._id || r.slug,
    title: r.title || 'Resource',
    summary: r.summary || r.description || '',
    description: r.description || r.summary || '',
    status: r.status || 'PUBLISHED',
  };
}

export const technologyApi = {
  async getTechnologies(): Promise<Technology[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return (unifiedStore.getTechnologies('PUBLISHED') as Technology[]).map(normalizeTechnology);
    }
    try {
      const { data } = await apiClient.get<any>('/technology');
      const list = (data?.data || data) as any[];
      return Array.isArray(list) ? list.map(normalizeTechnology) : [];
    } catch {
      return (unifiedStore.getTechnologies('PUBLISHED') as Technology[]).map(normalizeTechnology);
    }
  },

  async getTechnologyBySlug(slug: string): Promise<Technology | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const tech = unifiedStore.getTechnologyByIdOrSlug(slug);
      if (tech && tech.status === 'PUBLISHED') return normalizeTechnology(tech);
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/technology/${slug}`);
      const tech = data?.data || data;
      return tech ? normalizeTechnology(tech) : null;
    } catch {
      const tech = unifiedStore.getTechnologyByIdOrSlug(slug);
      if (tech && tech.status === 'PUBLISHED') return normalizeTechnology(tech);
      return null;
    }
  },
};

export const projectApi = {
  async getProjects(): Promise<Project[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return (unifiedStore.getProjects('PUBLISHED') as Project[]).map(normalizeProject);
    }
    try {
      const { data } = await apiClient.get<any>('/projects');
      const list = (data?.data || data) as any[];
      return Array.isArray(list) ? list.map(normalizeProject) : [];
    } catch {
      return (unifiedStore.getProjects('PUBLISHED') as Project[]).map(normalizeProject);
    }
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const proj = unifiedStore.getProjectByIdOrSlug(slug);
      if (proj && proj.status === 'PUBLISHED') return normalizeProject(proj);
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/projects/${slug}`);
      const proj = data?.data || data;
      return proj ? normalizeProject(proj) : null;
    } catch {
      const proj = unifiedStore.getProjectByIdOrSlug(slug);
      if (proj && proj.status === 'PUBLISHED') return normalizeProject(proj);
      return null;
    }
  },
};

export const resourceApi = {
  async getResources(type?: string): Promise<Resource[]> {
    if (USE_MOCK) {
      await simulateDelay(100);
      return (unifiedStore.getResources({ type, status: 'PUBLISHED' }) as Resource[]).map(normalizeResource);
    }
    try {
      const { data } = await apiClient.get<any>(`/resources${type ? `?type=${type}` : ''}`);
      const list = (data?.data || data) as any[];
      return Array.isArray(list) ? list.map(normalizeResource) : [];
    } catch {
      return (unifiedStore.getResources({ type, status: 'PUBLISHED' }) as Resource[]).map(normalizeResource);
    }
  },

  async getResourceBySlug(slug: string): Promise<Resource | null> {
    if (USE_MOCK) {
      await simulateDelay(100);
      const res = unifiedStore.getResourceByIdOrSlug(slug);
      if (res && res.status === 'PUBLISHED') return normalizeResource(res);
      return null;
    }
    try {
      const { data } = await apiClient.get<any>(`/resources/${slug}`);
      const res = data?.data || data;
      return res ? normalizeResource(res) : null;
    } catch {
      const res = unifiedStore.getResourceByIdOrSlug(slug);
      if (res && res.status === 'PUBLISHED') return normalizeResource(res);
      return null;
    }
  },
};
