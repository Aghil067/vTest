import { InspectionExperience } from '@/components/common/InspectionExperience';
import { PageArtwork } from '@/components/common/PageArtwork';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, HardDrive, ArrowRight, Layers, Search, Zap } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { productApi } from '@/services/api';
import { ProductCard } from '@/components/common/Cards';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SectionHeader, CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';
import type { ProductType } from '@/types';

export function ProductsLandingPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | ProductType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, loading } = useApi(async () => {
    return productApi.getProducts();
  });

  const filteredProducts = products?.filter((p) => {
    const matchesTab = activeTab === 'ALL' || p.type === activeTab;
    const matchesQuery =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const softwareCount = products?.filter((p) => p.type === 'SOFTWARE').length || 0;
  const hardwareCount = products?.filter((p) => p.type === 'HARDWARE').length || 0;

  return (
    <div className="page page-products-landing-page catalog-page">
      <SEOHead
        title="Products & Systems | Software and Hardware Testing Solutions | Vtest"
        description="Explore the complete Vtest product line: computerized inspection management software (VtestIMS, VtestAnalytics) and precision industrial testing hardware."
        canonical="/products"
      />

      {/* Hero Section */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-green-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Testing Product Ecosystem
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Modular Software & Hardware for <span className="gradient-text">Complete Test Automation</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              From enterprise lane orchestration software to industrial sensor controllers and precision
              instrumentation, our products work as standalone units or a unified testing suite.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products/software" className="btn-primary">
                <Monitor className="w-4 h-4" />
                Browse Software ({softwareCount})
              </Link>
              <Link to="/products/hardware" className="btn-secondary">
                <HardDrive className="w-4 h-4" />
                Browse Hardware ({hardwareCount})
              </Link>
            </div>
          </div>
        </div>
        <PageArtwork kind="network" />
      </section>

      {/* Dual Highlights: Software vs Hardware */}
      <section className="py-16 bg-[var(--surface)] border-b border-[var(--stroke)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Software card */}
            <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--stroke)] text-[var(--heading)] p-8 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
                  <Monitor className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Software Products</h3>
                <p className="text-[var(--copy)] text-base leading-relaxed">
                  Enterprise-grade platforms for inspection workflow control, multi-lane coordination,
                  real-time telemetry, regulatory compliance generation, and cloud analytics.
                </p>
                <ul className="product-highlight-list pt-2 text-sm text-[var(--copy)]">
                  <li>
                    <span>Inspection Management System (VtestIMS)</span>
                  </li>
                  <li>
                    <span>Real-time Lane Controller (VtestLaneOS)</span>
                  </li>
                  <li>
                    <span>Data Telemetry & Cloud Analytics Engine</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/products/software"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-bold hover:underline transition-colors group-hover:translate-x-1 duration-200"
                >
                  Explore Software Suite
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hardware card */}
            <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--stroke)] text-[var(--heading)] p-8 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
                  <HardDrive className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Hardware Products</h3>
                <p className="text-[var(--copy)] text-base leading-relaxed">
                  Ruggedized industrial controllers, multi-sensor interface hubs, automated vision
                  cameras, and high-precision transducers calibrated for harsh workshop environments.
                </p>
                <ul className="product-highlight-list pt-2 text-sm text-[var(--copy)]">
                  <li>
                    <span>Industrial Lane Control Units (VtestPLC)</span>
                  </li>
                  <li>
                    <span>High-Precision Multi-Channel Sensor Hubs</span>
                  </li>
                  <li>
                    <span>Optical & Machine Vision Inspection Rigs</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/products/hardware"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-bold hover:underline transition-colors group-hover:translate-x-1 duration-200"
                >
                  Explore Hardware Line
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Listing with Filter & Search */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Product Catalog"
            title="Browse All Systems"
            subtitle="Search and filter through our full lineup of testing software and hardware devices."
            centered
            className="mb-10"
          />

          {/* Controls Bar */}
          <div className="bg-[var(--surface)] rounded-2xl p-4 shadow-sm border border-[var(--stroke)] mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Type Filter Tabs */}
            <div className="flex items-center bg-[var(--site-bg)] p-1 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('ALL')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-1 sm:flex-initial ${
                  activeTab === 'ALL'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                All Products
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('SOFTWARE')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-1 sm:flex-initial ${
                  activeTab === 'SOFTWARE'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                Software ({softwareCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('HARDWARE')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-1 sm:flex-initial ${
                  activeTab === 'HARDWARE'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                Hardware ({hardwareCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-green-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[var(--stroke)] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <CardGridSkeleton count={6} />
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl p-12 text-center border border-[var(--stroke)]">
              <Layers className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[var(--heading)] mb-1">No products found</h3>
              <p className="text-sm text-[var(--copy)] mb-6">
                Try adjusting your search criteria or switching category tabs.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('ALL');
                  setSearchQuery('');
                }}
                className="btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Integration Callout */}
      <section className="py-16 bg-[var(--site-bg)] text-[var(--heading)]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Zap className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-4">Interoperable & Open Protocol Architecture</h2>
          <p className="text-[var(--copy)] text-base mb-8 leading-relaxed">
            All Vtest hardware and software interfaces are engineered using open industrial standards (Modbus,
            CAN bus, OPC-UA, REST, WebSocket). Integrate smoothly with your existing third-party test benches or
            OEM ERP platforms without replacing existing capital equipment.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/request-demo" className="btn-primary">
              Book Architecture Demo
            </Link>
            <Link to="/contact" className="btn-secondary">
              Talk to Engineering
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <InspectionExperience />
      <CTASection
        title="Need a Tailored System Configuration?"
        subtitle="Our engineering specialists can help design a custom combination of software modules and hardware interfaces for your exact specifications."
        primaryAction={{ label: 'Request a Quote', href: '/request-quote' }}
        secondaryAction={{ label: 'Contact Us', href: '/contact' }}
      />
    </div>
  );
}
