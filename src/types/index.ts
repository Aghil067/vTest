// ==========================================
// VTEST Website — TypeScript Type Definitions
// ==========================================

// ---- Enums ----

export type ProductType = 'SOFTWARE' | 'HARDWARE';
export type ResourceType = 'BROCHURE' | 'DATASHEET' | 'ARTICLE';
export type EnquiryType = 'CONTACT' | 'DEMO' | 'QUOTE';
export type PublishStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

// ---- Category ----

export interface Category {
  id: string;
  name: string;
  type: ProductType;
  slug: string;
  description?: string;
}

// ---- Product ----

export interface ProductFeature {
  id: string;
  productId: string;
  title: string;
  description: string;
  icon?: string;
  sortOrder: number;
}

export interface ProductSpecification {
  id: string;
  productId: string;
  name: string;
  value: string;
  sortOrder: number;
}

export interface ProductMedia {
  id: string;
  productId: string;
  fileUrl: string;
  altText: string;
  sortOrder: number;
}

export interface ProductModule {
  id: string;
  productId: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  categoryId?: string;
  category?: Category;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  status: PublishStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  features?: ProductFeature[];
  specifications?: ProductSpecification[];
  media?: ProductMedia[];
  modules?: ProductModule[];
  useCases?: string[];
  benefits?: string[];
  integrations?: string[];
  technicalHighlights?: string[];
  relatedProductIds?: string[];
  relatedSolutionIds?: string[];
  brochureUrl?: string;
  datasheetUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Solution ----

export interface Solution {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  icon?: string;
  status: PublishStatus;
  businessContext?: string;
  capabilities?: string[];
  technologies?: string[];
  benefits?: string[];
  applications?: string[];
  relatedProductIds?: string[];
  relatedProjectIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Industry ----

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface Industry {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  icon?: string;
  status: PublishStatus;
  challenges?: IndustryChallenge[];
  vtestCapabilities?: string[];
  useCases?: string[];
  relatedSolutionIds?: string[];
  relatedProductIds?: string[];
  technologies?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Technology ----

export interface TechnologyCapability {
  title: string;
  description: string;
}

export interface Technology {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  icon?: string;
  status: PublishStatus;
  overview?: string;
  capabilities?: TechnologyCapability[];
  concepts?: string[];
  applications?: string[];
  relatedSolutionIds?: string[];
  relatedProjectIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Project (Case Study) ----

export interface ProjectImage {
  url: string;
  altText: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientOrProjectName: string;
  summary: string;
  description: string;
  heroImage: string;
  images?: ProjectImage[];
  status: PublishStatus;
  businessContext?: string;
  problem?: string;
  vtestContribution?: string;
  technologies?: string[];
  capabilities?: string[];
  relatedSolutionId?: string;
  relatedProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Resource ----

export interface Resource {
  id: string;
  title: string;
  slug: string;
  type: ResourceType;
  summary: string;
  content?: string;
  image?: string;
  fileUrl?: string;
  file?: string;
  authorName?: string;
  status: PublishStatus;
  publishedAt?: string;
  relatedResourceIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Enquiry ----

export interface EnquiryPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  enquiryType: EnquiryType;
  productOfInterest?: string;
  quantity?: string;
}

export interface EnquiryResponse {
  id: string;
  status: 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

// ---- API Response Wrappers ----

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ---- Filter / Query Types ----

export interface ProductFilters {
  type?: ProductType;
  search?: string;
  categoryId?: string;
  featured?: boolean;
}

export interface ResourceFilters {
  type?: ResourceType;
  search?: string;
}

// ---- Navigation Types ----

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

// ---- SEO Types ----

export interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}
