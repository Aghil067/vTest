import {
  mockProducts,
  mockSolutions,
  mockIndustries,
  mockTechnologies,
  mockProjects,
  mockResources,
} from '@/data/mock';

const STORAGE_KEYS = {
  products: 'vtest_store_products',
  categories: 'vtest_store_categories',
  solutions: 'vtest_store_solutions',
  industries: 'vtest_store_industries',
  technologies: 'vtest_store_technologies',
  projects: 'vtest_store_projects',
  resources: 'vtest_store_resources',
  enquiries: 'vtest_store_enquiries',
  users: 'vtest_store_users',
  settings: 'vtest_store_settings',
  media: 'vtest_store_media',
  seeded: 'vtest_store_seeded_v1',
};

// Initial Seed Data
const initialCategories = [
  {
    _id: 'cat-1',
    id: 'cat-1',
    name: 'Automotive Inspection Lanes',
    slug: 'automotive-inspection-lanes',
    description: 'Turnkey periodic technical inspection (PTI) equipment and automated testing lanes.',
    status: 'PUBLISHED',
    displayOrder: 1,
  },
  {
    _id: 'cat-2',
    id: 'cat-2',
    name: 'Computer Vision & AI Systems',
    slug: 'computer-vision-ai-systems',
    description: 'Automated vehicle defect detection, tyre tread depth scanning, and ANPR cameras.',
    status: 'PUBLISHED',
    displayOrder: 2,
  },
  {
    _id: 'cat-3',
    id: 'cat-3',
    name: 'Testing Software & Lane Automation',
    slug: 'software-lane-automation',
    description: 'Enterprise test lane controllers, statutory compliance management, and telemetry dashboards.',
    status: 'PUBLISHED',
    displayOrder: 3,
  },
  {
    _id: 'cat-4',
    id: 'cat-4',
    name: 'Brake, Suspension & Emissions Hardware',
    slug: 'brake-suspension-emissions-hardware',
    description: 'Roller brake testers, suspension play detectors, and 5-gas exhaust emission benches.',
    status: 'PUBLISHED',
    displayOrder: 4,
  },
];

const initialUsers = [
  {
    _id: 'user-1',
    id: 'user-1',
    name: 'Vtest Lead Administrator',
    email: 'admin@vtest.local',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'user-2',
    id: 'user-2',
    name: 'Operations Manager',
    email: 'ops@vtest.local',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
];

const initialSettings = {
  general: {
    siteName: 'Vtest',
    logo: '',
    tagline: 'Engineering Smarter Testing & Inspection Solutions',
    copyrightText: '© 2026 Vtest Technologies Inc. All rights reserved.',
  },
  seo: {
    defaultSeoTitle: 'Vtest | Vehicle Testing & Inspection Technology',
    defaultMetaDescription:
      'Integrated software, hardware, and automation technology for vehicle inspection, end-of-line testing, and test lane management.',
    metaKeywords: 'vehicle inspection, automotive testing, PTI lane, brake tester, emissions testing',
  },
  contact: {
    email: 'info@vtest.com',
    phone: '+1 (800) 555-TEST',
    address: 'Vtest Global Innovation Campus, Suite 400',
    workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM EST',
  },
  socialMedia: {
    linkedin: 'https://linkedin.com/company/vtest',
    twitter: 'https://twitter.com/vtest',
    facebook: '',
    youtube: 'https://youtube.com/@vtest',
  },
  storage: {
    activeDriver: 'LOCAL',
    maxUploadSizeBytes: 10485760,
  },
};

const initialEnquiries = [
  {
    _id: 'enq-1',
    id: 'enq-1',
    fullName: 'David Sterling',
    name: 'David Sterling',
    email: 'd.sterling@nationalfleet.org',
    phone: '+44 20 7946 0912',
    company: 'National Fleet Transit Authority',
    enquiryType: 'DEMO',
    message: 'We are modernizing 14 periodic vehicle inspection stations across the eastern district. Interested in PTI-Pro software integration.',
    status: 'NEW',
    internalNotes: 'High priority tender prospect.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    _id: 'enq-2',
    id: 'enq-2',
    fullName: 'Elena Rostova',
    name: 'Elena Rostova',
    email: 'elena.r@nordictesting.se',
    phone: '+46 8 123 456',
    company: 'Nordic Test Lanes AB',
    enquiryType: 'QUOTE',
    message: 'Requesting formal quotation for 4 sets of RBT-9000 Heavy Duty Roller Brake Testers with automated play detectors.',
    status: 'IN_REVIEW',
    internalNotes: 'Commercial team preparing quotation.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

function normalizeProduct(p: any): any {
  return {
    ...p,
    _id: p._id || p.id,
    id: p.id || p._id,
    productType: p.productType || p.type || 'HARDWARE',
    type: p.type || p.productType || 'HARDWARE',
    fullDescription: p.fullDescription || p.description || '',
    description: p.description || p.fullDescription || '',
    heroImage: p.heroImage || p.image || '/automotive-studio.jpg',
    status: p.status || 'PUBLISHED',
    featured: p.featured ?? true,
    category: p.category || (p.categoryId ? { name: p.categoryId, slug: p.categoryId } : null),
    brochure: p.brochure || p.brochureUrl || '',
    brochureUrl: p.brochureUrl || p.brochure || '',
    datasheet: p.datasheet || p.datasheetUrl || '',
    datasheetUrl: p.datasheetUrl || p.datasheet || '',
  };
}

function normalizeSolution(s: any): any {
  return {
    ...s,
    _id: s._id || s.id,
    id: s.id || s._id,
    name: s.name || s.title || '',
    title: s.title || s.name || '',
    description: s.description || s.summary || '',
    summary: s.summary || s.description || '',
    heroImage: s.heroImage || s.image || '',
    image: s.image || s.heroImage || '',
    features: Array.isArray(s.features) ? s.features : (s.capabilities || []),
    capabilities: Array.isArray(s.capabilities) ? s.capabilities : (s.features || []),
    benefits: Array.isArray(s.benefits) ? s.benefits : [],
    status: s.status || 'PUBLISHED',
  };
}

function normalizeIndustry(ind: any): any {
  return {
    ...ind,
    _id: ind._id || ind.id,
    id: ind.id || ind._id,
    industryName: ind.industryName || ind.name || ind.title || '',
    name: ind.name || ind.industryName || ind.title || '',
    title: ind.title || ind.industryName || ind.name || '',
    description: ind.description || ind.summary || '',
    summary: ind.summary || ind.description || '',
    heroImage: ind.heroImage || ind.image || '',
    image: ind.image || ind.heroImage || '',
    challenges: ind.challenges || [],
    solutionsApplied: ind.solutionsApplied || [],
    status: ind.status || 'PUBLISHED',
  };
}

class UnifiedStore {
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized || typeof window === 'undefined') return;

    // Check if seeded
    const isSeeded = localStorage.getItem(STORAGE_KEYS.seeded);
    if (!isSeeded) {
      const normalizedProducts = mockProducts.map(normalizeProduct);
      const normalizedSolutions = mockSolutions.map(normalizeSolution);
      const normalizedIndustries = mockIndustries.map(normalizeIndustry);

      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(normalizedProducts));
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(initialCategories));
      localStorage.setItem(STORAGE_KEYS.solutions, JSON.stringify(normalizedSolutions));
      localStorage.setItem(STORAGE_KEYS.industries, JSON.stringify(normalizedIndustries));
      localStorage.setItem(STORAGE_KEYS.technologies, JSON.stringify(mockTechnologies));
      localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(mockProjects));
      localStorage.setItem(STORAGE_KEYS.resources, JSON.stringify(mockResources));
      localStorage.setItem(STORAGE_KEYS.enquiries, JSON.stringify(initialEnquiries));
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(initialUsers));
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(initialSettings));
      localStorage.setItem(STORAGE_KEYS.media, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.seeded, 'true');
    }
    this.initialized = true;
  }

  private notify(key: string) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vtest_store_change', { detail: { key } }));
    }
  }

  private getItems<T>(key: string): T[] {
    this.init();
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private setItems<T>(key: string, items: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(items));
      this.notify(key);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // --- PRODUCTS ---
  getProducts(filters?: { type?: string; search?: string; category?: string; status?: string; featured?: boolean }): any[] {
    let list = this.getItems<any>(STORAGE_KEYS.products);
    if (filters?.status) {
      list = list.filter((p) => p.status === filters.status);
    }
    if (filters?.type) {
      const t = filters.type.toUpperCase();
      list = list.filter((p) => p.type === t || p.productType === t);
    }
    if (filters?.category) {
      list = list.filter(
        (p) =>
          p.categoryId === filters.category ||
          p.category?._id === filters.category ||
          p.category?.name === filters.category ||
          p.category?.slug === filters.category
      );
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          (p.slug && p.slug.toLowerCase().includes(q))
      );
    }
    if (filters?.featured !== undefined) {
      list = list.filter((p) => Boolean(p.featured) === filters.featured);
    }
    return list;
  }

  getProductByIdOrSlug(idOrSlug: string): any | null {
    const list = this.getItems<any>(STORAGE_KEYS.products);
    return list.find((p) => p._id === idOrSlug || p.id === idOrSlug || p.slug === idOrSlug) || null;
  }

  saveProduct(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.products);
    const normalized = normalizeProduct({
      ...data,
      _id: data._id || data.id || `prod-${Date.now()}`,
      id: data.id || data._id || `prod-${Date.now()}`,
      updatedAt: new Date().toISOString(),
      createdAt: data.createdAt || new Date().toISOString(),
    });

    const index = list.findIndex((p) => p._id === normalized._id || p.id === normalized.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...normalized };
    } else {
      list.unshift(normalized);
    }
    this.setItems(STORAGE_KEYS.products, list);
    return normalized;
  }

  deleteProduct(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.products);
    const updated = list.filter((p) => p._id !== id && p.id !== id);
    this.setItems(STORAGE_KEYS.products, updated);
    return true;
  }

  setProductStatus(id: string, status: 'PUBLISHED' | 'DRAFT'): any {
    const list = this.getItems<any>(STORAGE_KEYS.products);
    const prod = list.find((p) => p._id === id || p.id === id);
    if (prod) {
      prod.status = status;
      prod.updatedAt = new Date().toISOString();
      this.setItems(STORAGE_KEYS.products, list);
    }
    return prod;
  }

  // --- CATEGORIES ---
  getCategories(): any[] {
    return this.getItems<any>(STORAGE_KEYS.categories);
  }

  saveCategory(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.categories);
    const item = {
      ...data,
      _id: data._id || data.id || `cat-${Date.now()}`,
      id: data.id || data._id || `cat-${Date.now()}`,
    };
    const index = list.findIndex((c) => c._id === item._id || c.id === item.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...item };
    } else {
      list.push(item);
    }
    this.setItems(STORAGE_KEYS.categories, list);
    return item;
  }

  deleteCategory(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.categories);
    this.setItems(
      STORAGE_KEYS.categories,
      list.filter((c) => c._id !== id && c.id !== id)
    );
    return true;
  }

  // --- SOLUTIONS ---
  getSolutions(status?: string): any[] {
    const list = this.getItems<any>(STORAGE_KEYS.solutions);
    if (status) return list.filter((s) => s.status === status);
    return list;
  }

  getSolutionByIdOrSlug(idOrSlug: string): any | null {
    const list = this.getItems<any>(STORAGE_KEYS.solutions);
    return list.find((s) => s._id === idOrSlug || s.id === idOrSlug || s.slug === idOrSlug) || null;
  }

  saveSolution(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.solutions);
    const normalized = normalizeSolution({
      ...data,
      _id: data._id || data.id || `sol-${Date.now()}`,
      id: data.id || data._id || `sol-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    });
    const index = list.findIndex((s) => s._id === normalized._id || s.id === normalized.id);
    if (index >= 0) list[index] = { ...list[index], ...normalized };
    else list.unshift(normalized);
    this.setItems(STORAGE_KEYS.solutions, list);
    return normalized;
  }

  deleteSolution(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.solutions);
    this.setItems(
      STORAGE_KEYS.solutions,
      list.filter((s) => s._id !== id && s.id !== id)
    );
    return true;
  }

  // --- INDUSTRIES ---
  getIndustries(status?: string): any[] {
    const list = this.getItems<any>(STORAGE_KEYS.industries);
    if (status) return list.filter((i) => i.status === status);
    return list;
  }

  getIndustryByIdOrSlug(idOrSlug: string): any | null {
    const list = this.getItems<any>(STORAGE_KEYS.industries);
    return list.find((i) => i._id === idOrSlug || i.id === idOrSlug || i.slug === idOrSlug) || null;
  }

  saveIndustry(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.industries);
    const normalized = normalizeIndustry({
      ...data,
      _id: data._id || data.id || `ind-${Date.now()}`,
      id: data.id || data._id || `ind-${Date.now()}`,
    });
    const index = list.findIndex((i) => i._id === normalized._id || i.id === normalized.id);
    if (index >= 0) list[index] = { ...list[index], ...normalized };
    else list.unshift(normalized);
    this.setItems(STORAGE_KEYS.industries, list);
    return normalized;
  }

  deleteIndustry(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.industries);
    this.setItems(
      STORAGE_KEYS.industries,
      list.filter((i) => i._id !== id && i.id !== id)
    );
    return true;
  }

  // --- TECHNOLOGY ---
  getTechnologies(status?: string): any[] {
    const list = this.getItems<any>(STORAGE_KEYS.technologies);
    if (status) return list.filter((t) => t.status === status);
    return list;
  }

  getTechnologyByIdOrSlug(idOrSlug: string): any | null {
    const list = this.getItems<any>(STORAGE_KEYS.technologies);
    return list.find((t) => t._id === idOrSlug || t.id === idOrSlug || t.slug === idOrSlug) || null;
  }

  saveTechnology(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.technologies);
    const item = {
      ...data,
      _id: data._id || data.id || `tech-${Date.now()}`,
      id: data.id || data._id || `tech-${Date.now()}`,
    };
    const index = list.findIndex((t) => t._id === item._id || t.id === item.id);
    if (index >= 0) list[index] = { ...list[index], ...item };
    else list.unshift(item);
    this.setItems(STORAGE_KEYS.technologies, list);
    return item;
  }

  deleteTechnology(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.technologies);
    this.setItems(
      STORAGE_KEYS.technologies,
      list.filter((t) => t._id !== id && t.id !== id)
    );
    return true;
  }

  // --- PROJECTS ---
  getProjects(status?: string): any[] {
    const list = this.getItems<any>(STORAGE_KEYS.projects);
    if (status) return list.filter((p) => p.status === status);
    return list;
  }

  getProjectByIdOrSlug(idOrSlug: string): any | null {
    const list = this.getItems<any>(STORAGE_KEYS.projects);
    return list.find((p) => p._id === idOrSlug || p.id === idOrSlug || p.slug === idOrSlug) || null;
  }

  saveProject(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.projects);
    const item = {
      ...data,
      _id: data._id || data.id || `proj-${Date.now()}`,
      id: data.id || data._id || `proj-${Date.now()}`,
      title: data.title || data.projectTitle || '',
      projectTitle: data.projectTitle || data.title || '',
    };
    const index = list.findIndex((p) => p._id === item._id || p.id === item.id);
    if (index >= 0) list[index] = { ...list[index], ...item };
    else list.unshift(item);
    this.setItems(STORAGE_KEYS.projects, list);
    return item;
  }

  deleteProject(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.projects);
    this.setItems(
      STORAGE_KEYS.projects,
      list.filter((p) => p._id !== id && p.id !== id)
    );
    return true;
  }

  // --- RESOURCES ---
  getResources(filters?: { type?: string; status?: string }): any[] {
    let list = this.getItems<any>(STORAGE_KEYS.resources);
    if (filters?.status) list = list.filter((r) => r.status === filters.status);
    if (filters?.type) list = list.filter((r) => r.type === filters.type);
    return list;
  }

  getResourceByIdOrSlug(idOrSlug: string): any | null {
    const list = this.getItems<any>(STORAGE_KEYS.resources);
    return list.find((r) => r._id === idOrSlug || r.id === idOrSlug || r.slug === idOrSlug) || null;
  }

  saveResource(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.resources);
    const item = {
      ...data,
      _id: data._id || data.id || `res-${Date.now()}`,
      id: data.id || data._id || `res-${Date.now()}`,
    };
    const index = list.findIndex((r) => r._id === item._id || r.id === item.id);
    if (index >= 0) list[index] = { ...list[index], ...item };
    else list.unshift(item);
    this.setItems(STORAGE_KEYS.resources, list);
    return item;
  }

  deleteResource(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.resources);
    this.setItems(
      STORAGE_KEYS.resources,
      list.filter((r) => r._id !== id && r.id !== id)
    );
    return true;
  }

  // --- ENQUIRIES ---
  getEnquiries(filters?: { search?: string; status?: string }): any[] {
    let list = this.getItems<any>(STORAGE_KEYS.enquiries);
    if (filters?.status) list = list.filter((e) => e.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (e) =>
          (e.fullName && e.fullName.toLowerCase().includes(q)) ||
          (e.name && e.name.toLowerCase().includes(q)) ||
          (e.email && e.email.toLowerCase().includes(q)) ||
          (e.company && e.company.toLowerCase().includes(q))
      );
    }
    return list;
  }

  saveEnquiry(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.enquiries);
    const item = {
      ...data,
      _id: data._id || data.id || `enq-${Date.now()}`,
      id: data.id || data._id || `enq-${Date.now()}`,
      status: data.status || 'NEW',
      createdAt: data.createdAt || new Date().toISOString(),
    };
    list.unshift(item);
    this.setItems(STORAGE_KEYS.enquiries, list);
    return item;
  }

  updateEnquiry(id: string, updates: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.enquiries);
    const index = list.findIndex((e) => e._id === id || e.id === id);
    if (index >= 0) {
      list[index] = { ...list[index], ...updates };
      this.setItems(STORAGE_KEYS.enquiries, list);
      return list[index];
    }
    return null;
  }

  deleteEnquiry(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.enquiries);
    this.setItems(
      STORAGE_KEYS.enquiries,
      list.filter((e) => e._id !== id && e.id !== id)
    );
    return true;
  }

  // --- USERS ---
  getUsers(): any[] {
    return this.getItems<any>(STORAGE_KEYS.users);
  }

  saveUser(data: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.users);
    const item = {
      ...data,
      _id: data._id || data.id || `user-${Date.now()}`,
      id: data.id || data._id || `user-${Date.now()}`,
      createdAt: data.createdAt || new Date().toISOString(),
    };
    const index = list.findIndex((u) => u._id === item._id || u.id === item.id || u.email === item.email);
    if (index >= 0) list[index] = { ...list[index], ...item };
    else list.push(item);
    this.setItems(STORAGE_KEYS.users, list);
    return item;
  }

  deleteUser(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.users);
    this.setItems(
      STORAGE_KEYS.users,
      list.filter((u) => u._id !== id && u.id !== id)
    );
    return true;
  }

  // --- SETTINGS ---
  getSettings(): any {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    return raw ? JSON.parse(raw) : initialSettings;
  }

  updateSettings(newSettings: any): any {
    const current = this.getSettings();
    const updated = {
      ...current,
      ...newSettings,
      general: { ...current.general, ...newSettings.general },
      seo: { ...current.seo, ...newSettings.seo },
      contact: { ...current.contact, ...newSettings.contact },
      socialMedia: { ...current.socialMedia, ...newSettings.socialMedia },
      storage: { ...current.storage, ...newSettings.storage },
    };
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(updated));
    this.notify(STORAGE_KEYS.settings);
    return updated;
  }

  // --- MEDIA ---
  getMedia(): any[] {
    return this.getItems<any>(STORAGE_KEYS.media);
  }

  saveMedia(asset: any): any {
    const list = this.getItems<any>(STORAGE_KEYS.media);
    const item = {
      ...asset,
      _id: asset._id || `media-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    list.unshift(item);
    this.setItems(STORAGE_KEYS.media, list);
    return item;
  }

  deleteMedia(id: string): boolean {
    const list = this.getItems<any>(STORAGE_KEYS.media);
    this.setItems(
      STORAGE_KEYS.media,
      list.filter((m) => m._id !== id)
    );
    return true;
  }

  // --- DASHBOARD STATS ---
  getDashboardStats(): any {
    const products = this.getItems<any>(STORAGE_KEYS.products);
    const categories = this.getItems<any>(STORAGE_KEYS.categories);
    const solutions = this.getItems<any>(STORAGE_KEYS.solutions);
    const industries = this.getItems<any>(STORAGE_KEYS.industries);
    const projects = this.getItems<any>(STORAGE_KEYS.projects);
    const enquiries = this.getItems<any>(STORAGE_KEYS.enquiries);
    const media = this.getItems<any>(STORAGE_KEYS.media);

    const publishedProducts = products.filter((p) => p.status === 'PUBLISHED').length;
    const draftProducts = products.filter((p) => p.status === 'DRAFT').length;
    const newEnquiries = enquiries.filter((e) => e.status === 'NEW').length;
    const openEnquiries = enquiries.filter((e) => e.status !== 'CLOSED').length;

    return {
      success: true,
      stats: {
        totalProducts: products.length,
        publishedProducts,
        draftProducts,
        totalCategories: categories.length,
        totalSolutions: solutions.length,
        totalIndustries: industries.length,
        totalProjects: projects.length,
        newEnquiries,
        openEnquiries,
        totalMediaAssets: media.length,
      },
      recentProducts: products.slice(0, 5),
      recentEnquiries: enquiries.slice(0, 5),
      recentActivity: [
        { action: 'Store initialized', entity: 'System', timestamp: new Date().toISOString() },
        { action: 'Admin session ready', entity: 'Auth', timestamp: new Date().toISOString() },
      ],
    };
  }
}

export const unifiedStore = new UnifiedStore();
