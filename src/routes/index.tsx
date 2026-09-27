import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

// Public Pages
import { HomePage } from '@/pages/Home/HomePage';
import { AboutPage } from '@/pages/About/AboutPage';
import { ProductsLandingPage } from '@/pages/Products/ProductsLandingPage';
import { SoftwareListingPage } from '@/pages/Software/SoftwareListingPage';
import { SoftwareDetailPage } from '@/pages/Software/SoftwareDetailPage';
import { HardwareListingPage } from '@/pages/Hardware/HardwareListingPage';
import { HardwareDetailPage } from '@/pages/Hardware/HardwareDetailPage';
import { SolutionsListingPage } from '@/pages/Solutions/SolutionsListingPage';
import { SolutionDetailPage } from '@/pages/Solutions/SolutionDetailPage';
import { IndustriesListingPage } from '@/pages/Industries/IndustriesListingPage';
import { IndustryDetailPage } from '@/pages/Industries/IndustryDetailPage';
import { TechnologyListingPage } from '@/pages/Technology/TechnologyListingPage';
import { TechnologyDetailPage } from '@/pages/Technology/TechnologyDetailPage';
import { ProjectsListingPage } from '@/pages/Projects/ProjectsListingPage';
import { ProjectDetailPage } from '@/pages/Projects/ProjectDetailPage';
import { ResourcesListingPage } from '@/pages/Resources/ResourcesListingPage';
import { ResourceDetailPage } from '@/pages/Resources/ResourceDetailPage';
import { ContactPage } from '@/pages/Contact/ContactPage';
import { RequestDemoPage } from '@/pages/RequestDemo/RequestDemoPage';
import { RequestQuotePage } from '@/pages/RequestQuote/RequestQuotePage';
import { PrivacyPolicyPage } from '@/pages/Legal/PrivacyPolicyPage';
import { TermsPage } from '@/pages/Legal/TermsPage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

// Admin Pages
import AdminLogin from '@/pages/Admin/Login';
import AdminDashboard from '@/pages/Admin/Dashboard';
import AdminProducts from '@/pages/Admin/Products';
import AdminCategories from '@/pages/Admin/Categories';
import AdminSolutions from '@/pages/Admin/Solutions';
import AdminIndustries from '@/pages/Admin/Industries';
import AdminTechnology from '@/pages/Admin/Technology';
import AdminProjects from '@/pages/Admin/Projects';
import AdminResources from '@/pages/Admin/Resources';
import AdminEnquiries from '@/pages/Admin/Enquiries';
import AdminUsers from '@/pages/Admin/Users';
import AdminSettings from '@/pages/Admin/Settings';

export const router = createBrowserRouter([
  // Public Website Routes
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },

      // Products
      { path: 'products', element: <ProductsLandingPage /> },
      { path: 'products/software', element: <SoftwareListingPage /> },
      { path: 'products/software/:slug', element: <SoftwareDetailPage /> },
      { path: 'products/hardware', element: <HardwareListingPage /> },
      { path: 'products/hardware/:slug', element: <HardwareDetailPage /> },

      // Solutions
      { path: 'solutions', element: <SolutionsListingPage /> },
      { path: 'solutions/:slug', element: <SolutionDetailPage /> },

      // Industries
      { path: 'industries', element: <IndustriesListingPage /> },
      { path: 'industries/:slug', element: <IndustryDetailPage /> },

      // Technology
      { path: 'technology', element: <TechnologyListingPage /> },
      { path: 'technology/:slug', element: <TechnologyDetailPage /> },

      // Projects
      { path: 'projects', element: <ProjectsListingPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },

      // Resources
      { path: 'resources', element: <ResourcesListingPage /> },
      { path: 'resources/:slug', element: <ResourceDetailPage /> },

      // Forms & Inquiries
      { path: 'contact', element: <ContactPage /> },
      { path: 'request-demo', element: <RequestDemoPage /> },
      { path: 'request-quote', element: <RequestQuotePage /> },

      // Legal
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsPage /> },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Admin Routes
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'categories', element: <AdminCategories /> },
      { path: 'solutions', element: <AdminSolutions /> },
      { path: 'industries', element: <AdminIndustries /> },
      { path: 'technology', element: <AdminTechnology /> },
      { path: 'projects', element: <AdminProjects /> },
      { path: 'resources', element: <AdminResources /> },
      { path: 'enquiries', element: <AdminEnquiries /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'settings', element: <AdminSettings /> },
      { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },
]);

