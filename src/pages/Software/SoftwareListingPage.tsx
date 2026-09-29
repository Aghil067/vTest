import { PageArtwork } from '@/components/common/PageArtwork';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Search, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { productApi } from '@/services/api';
import { ProductCard } from '@/components/common/Cards';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function SoftwareListingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, loading } = useApi(async () => {
    return productApi.getSoftwareProducts();
  });

  const filteredProducts = products?.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q);
  });

  return (
    <div className="page page-software-listing-page catalog-page">
      <SEOHead
        title="Software Products | Vehicle Inspection & Test Lane Software | Vetest"
        description="Discover Vetest's software suite: VetestIMS Inspection Management, VetestLaneOS, VetestAnalytics, and automated compliance tracking."
        canonical="/products/software"
      />

      {/* Hero */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-green-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Software Products' },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Monitor className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Digital Inspection Platforms
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Software Engineered for <span className="gradient-text">Zero-Defect Operations</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              Cloud-connected, real-time software systems that coordinate test equipment, standardize
              inspection checklists, automate regulatory certificates, and provide actionable analytics.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/request-demo" className="btn-primary">
                Request Software Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products/hardware" className="btn-secondary">
                View Hardware Integration
              </Link>
            </div>
          </div>
        </div>
        <PageArtwork kind="software" />
      </section>

      {/* Feature Highlights Banner */}
      <section className="bg-[var(--site-bg)] border-b border-[var(--stroke)] text-[var(--heading)] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Open Hardware Agnostic</p>
                <p className="text-xs text-[var(--copy)]">Connects to any brand of roller, brake, or emission bench</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Regulatory Proof</p>
                <p className="text-xs text-[var(--copy)]">Cryptographically signed inspection records and test receipts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Multi-Station Scalability</p>
                <p className="text-xs text-[var(--copy)]">Central cloud dashboard manages 1 to 500+ testing stations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Catalog Grid */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight">
                Software Solutions Catalog
              </h2>
              <p className="text-[var(--copy)] text-sm mt-1">
                Showing all specialized testing and inspection software packages.
              </p>
            </div>

            {/* Search */}
            <div className="w-full sm:w-72 self-center">
              <div className="relative flex items-center h-11">
                <Search className="w-4 h-4 text-green-400 absolute left-3.5 pointer-events-none z-10 top-0 bottom-0 my-auto" />
                <input
                  type="text"
                  placeholder="Search software..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-[var(--stroke)] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-[var(--surface)] text-[var(--heading)] placeholder:text-[var(--copy)]"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <CardGridSkeleton count={4} />
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl p-12 text-center border border-[var(--stroke)]">
              <Layers className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[var(--heading)] mb-1">No software products found</h3>
              <p className="text-sm text-[var(--copy)] mb-6">
                No matching items for &quot;{searchQuery}&quot;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="btn-secondary"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Experience Vetest Software in Action"
        subtitle="Schedule a 1-on-1 walkthrough with an inspection workflows specialist."
        primaryAction={{ label: 'Book Live Demo', href: '/request-demo' }}
        secondaryAction={{ label: 'Contact Sales', href: '/contact' }}
      />
    </div>
  );
}
