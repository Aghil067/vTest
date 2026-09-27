// ==========================================
// VTEST Website — Application Configuration
// ==========================================

export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',

  // Site Configuration
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://vtest.com',
  siteName: 'Vtest',
  siteTagline: 'Engineering Smarter Testing & Inspection Solutions',
  siteDescription:
    'Vtest delivers advanced software, hardware, and integrated automation solutions for vehicle inspection, end-of-line testing, and test lane management across automotive, manufacturing, and government sectors.',

  // Analytics
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',

  // Contact (placeholder — replace with real Vtest details)
  contactEmail: 'info@vtest.com',
  contactPhone: '+[Contact Phone]',
  contactAddress: '[Vtest Office Address]',

  // Social (placeholder)
  socialLinks: {
    linkedin: '#',
    twitter: '#',
    youtube: '#',
  },

  // Pagination
  defaultPageSize: 12,
} as const;

// ==========================================
// Route Paths
// ==========================================

export const ROUTES = {
  home: '/',
  about: '/about',

  products: '/products',
  software: '/products/software',
  softwareDetail: '/products/software/:slug',
  hardware: '/products/hardware',
  hardwareDetail: '/products/hardware/:slug',

  solutions: '/solutions',
  solutionDetail: '/solutions/:slug',

  industries: '/industries',
  industryDetail: '/industries/:slug',

  technology: '/technology',
  technologyDetail: '/technology/:slug',

  projects: '/projects',
  projectDetail: '/projects/:slug',

  resources: '/resources',
  resourceDetail: '/resources/:slug',

  contact: '/contact',
  requestDemo: '/request-demo',
  requestQuote: '/request-quote',

  privacyPolicy: '/privacy-policy',
  terms: '/terms',
} as const;

// ==========================================
// Navigation Config
// ==========================================

export const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About', href: ROUTES.about },
  {
    label: 'Products',
    href: ROUTES.products,
    children: [
      { label: 'Software Products', href: ROUTES.software },
      { label: 'Hardware Products', href: ROUTES.hardware },
    ],
  },
  { label: 'Solutions', href: ROUTES.solutions },
  { label: 'Industries', href: ROUTES.industries },
  {
    label: 'Technology',
    href: ROUTES.technology,
    children: [
      { label: 'Software Development', href: '/technology/software-development' },
      { label: 'IoT', href: '/technology/iot' },
      { label: 'AI & Analytics', href: '/technology/ai-analytics' },
      { label: 'Hardware Integration', href: '/technology/hardware-integration' },
      { label: 'Automation', href: '/technology/automation' },
    ],
  },
  {
    label: 'Projects',
    href: ROUTES.projects,
    children: [
      { label: 'MAHA', href: '/projects/maha' },
      { label: 'Navitsa', href: '/projects/navitsa' },
      { label: 'Other Implementations', href: ROUTES.projects },
    ],
  },
  {
    label: 'Resources',
    href: ROUTES.resources,
    children: [
      { label: 'Brochures', href: '/resources?type=BROCHURE' },
      { label: 'Datasheets', href: '/resources?type=DATASHEET' },
      { label: 'Articles', href: '/resources?type=ARTICLE' },
    ],
  },
];
