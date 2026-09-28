import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { industryApi } from '@/services/api';
import { IndustryCard } from '@/components/common/Cards';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SectionHeader, CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function IndustriesListingPage() {
  const { data: industries, loading } = useApi(async () => {
    return industryApi.getIndustries();
  });

  return (
    <div className="page page-industries-listing-page catalog-page">
      <SEOHead
        title="Industries We Serve | Automotive, Government, Testing & Manufacturing | Vtest"
        description="Vtest delivers tailored vehicle testing, inspection, and automation technology across Automotive OEMs, Periodic Technical Inspection (PTI) Centers, Transport Authorities, and Heavy Manufacturing."
        canonical="/industries"
      />

      {/* Hero */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#2ECC71]/15 dark:bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Building2 className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Sectors & Verticals
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Domain-Specific Solutions for <span className="gradient-text">Critical Testing Sectors</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              Every vertical faces distinct compliance frameworks, throughput pressures, and hardware
              specifications. Vtest solutions are purposefully architected to meet those sector requirements.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/request-demo" className="btn-primary">
                Book Sector Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/solutions" className="btn-secondary">
                Explore All Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Industry Verticals"
            title="Tailored for Regulated & High-Volume Sectors"
            subtitle="Select your industry to discover our specific capabilities, integration methods, and case studies."
            centered
            className="mb-14"
          />

          {loading ? (
            <CardGridSkeleton count={2} columns={2} />
          ) : industries && industries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((ind) => (
                <IndustryCard key={ind.id} industry={ind} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl p-12 text-center border border-[var(--stroke)]">
              <Building2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-[var(--copy)]">No industries found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Operating in a Highly Regulated Testing Environment?"
        subtitle="Our domain architects have deep experience with transport ministries, OEM homologation labs, and national PTI networks."
        primaryAction={{ label: 'Consult Our Experts', href: '/contact' }}
        secondaryAction={{ label: 'Explore Products', href: '/products' }}
      />
    </div>
  );
}
