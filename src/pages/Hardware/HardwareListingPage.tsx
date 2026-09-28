import { PageArtwork } from '@/components/common/PageArtwork';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HardDrive, Search, Layers, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { productApi } from '@/services/api';
import { ProductCard } from '@/components/common/Cards';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function HardwareListingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, loading } = useApi(async () => {
    return productApi.getHardwareProducts();
  });

  const filteredProducts = products?.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q);
  });

  return (
    <div className="page page-hardware-listing-page catalog-page">
      <SEOHead
        title="Hardware Products | Industrial Testing Equipment & Controllers | Vtest"
        description="Explore Vtest hardware products: precision lane controllers, sensor interfaces, machine vision inspection rigs, and industrial automation interfaces."
        canonical="/products/hardware"
      />

      {/* Hero */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-green-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Hardware Products' },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <HardDrive className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Precision Hardware
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Industrial-Grade Hardware for <span className="gradient-text">Harsh Testing Environments</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              Built to withstand relentless workshop vibration, temperature variations, and high vehicle
              throughput. Precision measurement hubs and ruggedized embedded controllers designed for metrological accuracy.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/request-quote" className="btn-primary">
                Request Hardware Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products/software" className="btn-secondary">
                View Software Ecosystem
              </Link>
            </div>
          </div>
        </div>
        <PageArtwork kind="hardware" />
      </section>

      {/* Hardware Reliability Benchmarks */}
      <section className="bg-[var(--site-bg)] border-b border-[var(--stroke)] text-[var(--heading)] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">IP65 Ruggedized Enclosures</p>
                <p className="text-xs text-[var(--copy)]">Protected against heavy dust, hydraulic fluids, and water spray</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Industrial Real-Time Buses</p>
                <p className="text-xs text-[var(--copy)]">Sub-millisecond latency on CANopen, EtherCAT, and Modbus TCP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Metrological Calibration</p>
                <p className="text-xs text-[var(--copy)]">Traceable to national weights and measures standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Catalog Grid */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight">
                Hardware Systems Lineup
              </h2>
              <p className="text-[var(--copy)] text-sm mt-1">
                Showing all industrial controllers, sensor hubs, and automated measurement rigs.
              </p>
            </div>

            {/* Search */}
            <div className="w-full sm:w-72 self-center">
              <div className="relative flex items-center h-11">
                <Search className="w-4 h-4 text-green-400 absolute left-3.5 pointer-events-none z-10 top-0 bottom-0 my-auto" />
                <input
                  type="text"
                  placeholder="Search hardware..."
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
              <h3 className="text-lg font-bold text-[var(--heading)] mb-1">No hardware products found</h3>
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
        title="Need Technical Datasheets or Hardware CAD Models?"
        subtitle="Our application engineers can assist with wiring schematics, mounting brackets, and bench integration."
        primaryAction={{ label: 'Request a Quote', href: '/request-quote' }}
        secondaryAction={{ label: 'Talk to Engineers', href: '/contact' }}
      />
    </div>
  );
}
