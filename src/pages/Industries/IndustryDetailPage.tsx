import { ApplicationList } from '@/components/common/DetailLists';
import { CapabilityList } from '@/components/common/DetailLists';
import { useParams, Link } from 'react-router-dom';
import { Building2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { industryApi, solutionApi } from '@/services/api';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { SolutionCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: industry, loading } = useApi(async () => {
    if (!slug) return null;
    return industryApi.getIndustryBySlug(slug);
  });

  const { data: relatedSolutions } = useApi(async () => {
    const all = await solutionApi.getSolutions();
    return all.slice(0, 2);
  });

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!industry) {
    return (
      <div className="py-20">
        <NotFoundState
          title="Industry Not Found"
          message="The requested industry vertical could not be found."
          actionText="View All Industries"
          actionHref="/industries"
        />
      </div>
    );
  }

  return (
    <div className="page page-industry-detail-page detail-page">
      <SEOHead
        title={industry.seoTitle || `${industry.title} Testing Solutions | Vtest`}
        description={industry.seoDescription || industry.summary}
        canonical={`/industries/${industry.slug}`}
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Industries', href: '/industries' },
              { label: industry.title },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1">
                <Building2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                  Industry Focus
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {industry.title}
              </h1>

              <p className="text-lg text-[var(--copy)] leading-relaxed max-w-2xl">
                {industry.summary}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to={`/request-demo?industry=${encodeURIComponent(industry.title)}`}
                  className="btn-primary"
                >
                  Schedule Industry Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="btn-secondary"
                >
                  Explore Relevant Solutions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--stroke)] bg-[var(--site-bg)]">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-72 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="detail-content-layout grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left 2 Cols */}
            <div className="lg:col-span-2 space-y-14">
              {/* Detailed Description */}
              <div>
                <h2 className="text-2xl font-black text-[var(--heading)] mb-4 tracking-tight">
                  Sector Overview & Requirements
                </h2>
                <div className="prose prose-blue text-[var(--copy)] leading-relaxed text-base">
                  <p>{industry.description}</p>
                </div>
              </div>

              {/* Sector Challenges */}
              {industry.challenges && industry.challenges.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-[var(--heading)] mb-6 tracking-tight flex items-center gap-2.5">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                    Key Challenges in this Sector
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {industry.challenges.map((ch, i) => (
                      <div
                        key={i}
                        className="p-5 bg-amber-500/[0.05] border border-amber-500/25 rounded-2xl space-y-2"
                      >
                        <h4 className="font-bold text-[var(--heading)] text-base">{ch.title}</h4>
                        <p className="text-sm text-[var(--copy)] leading-relaxed">{ch.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vtest Capabilities */}
              {industry.vtestCapabilities && industry.vtestCapabilities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-[var(--heading)] mb-6 tracking-tight">
                    How Vtest Solves These Challenges
                  </h2>
                  <CapabilityList items={industry.vtestCapabilities} />
                </div>
              )}

              {/* Use Cases */}
              {industry.useCases && industry.useCases.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-[var(--heading)] mb-4 tracking-tight">
                    Primary Operational Use Cases
                  </h2>
                  <ApplicationList items={industry.useCases} />
                </div>
              )}
            </div>

            {/* Right Col */}
            <div className="space-y-6">
              <div className="detail-sidebar bg-[var(--surface)] border border-[var(--stroke)] rounded-2xl p-6 space-y-6 sticky top-28">
                <h3 className="text-lg font-black text-[var(--heading)]">Sector Technology</h3>

                {industry.technologies && industry.technologies.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-bold text-[var(--copy)] tracking-wider">
                      Recommended Tech
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {industry.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[var(--surface)] border border-[var(--stroke)] rounded-lg text-xs font-semibold text-[var(--copy)] shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 space-y-3">
                  <Link
                    to={`/request-demo?industry=${encodeURIComponent(industry.title)}`}
                    className="btn-primary w-full text-center"
                  >
                    Request Demo
                  </Link>
                  <Link
                    to={`/request-quote?industry=${encodeURIComponent(industry.title)}`}
                    className="btn-secondary w-full text-center"
                  >
                    Request Custom RFP
                  </Link>
                </div>

                <div className="p-4 bg-[var(--surface)] border border-[var(--stroke)] rounded-xl">
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    Global Mandates
                  </div>
                  <p className="text-xs text-green-400 leading-relaxed">
                    Designed to simplify compliance with regional transport regulations, PTI mandates,
                    and ISO/IEC quality standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Solutions */}
      {relatedSolutions && relatedSolutions.length > 0 && (
        <section className="py-16 bg-[var(--surface)] border-t border-[var(--stroke)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-black text-[var(--heading)] mb-8 tracking-tight">
              Relevant Solutions for {industry.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedSolutions.map((sol) => (
                <SolutionCard key={sol.id} solution={sol} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <CTASection
        title={`Scale Your ${industry.title} Operations with Confidence`}
        subtitle="Speak with our sector specialists to discover how Vtest optimizes throughput, data accuracy, and compliance."
        primaryAction={{ label: 'Contact Us', href: '/contact' }}
        secondaryAction={{ label: 'Request Demo', href: `/request-demo?industry=${encodeURIComponent(industry.title)}` }}
      />
    </div>
  );
}
