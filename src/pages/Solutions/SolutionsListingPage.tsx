import { PageArtwork } from '@/components/common/PageArtwork';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { solutionApi } from '@/services/api';
import { SolutionJourney } from '@/components/common/SolutionJourney';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SectionHeader, CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function SolutionsListingPage() {
  const { data: solutions, loading } = useApi(async () => {
    return solutionApi.getSolutions();
  });

  return (
    <div className="page page-solutions-listing-page catalog-page">
      <SEOHead
        title="Solutions | End-to-End Testing & Inspection Architecture | Vtest"
        description="Discover Vtest's turnkey solutions: Vehicle Inspection, End-of-Line Testing, Test Lane Management, Equipment Integration, Compliance & Analytics, and Service & Maintenance."
        canonical="/solutions"
      />

      {/* Hero */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-green-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Layers className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Turnkey Solutions
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Comprehensive Testing & Inspection <span className="gradient-text">Architectures</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              We engineer complete end-to-end operational systems tailored for national testing authorities,
              commercial fleet operators, automotive manufacturers, and service centers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/request-demo" className="btn-primary">
                Book Solutions Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-secondary">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
        <PageArtwork kind="network" />
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Industry Solutions"
            title="Engineered for Every Testing Requirement"
            subtitle="Explore our specialized solution areas uniting software automation, hardware interfaces, and data intelligence."
            centered
            className="mb-14"
          />

          {loading ? (
            <CardGridSkeleton count={3} />
          ) : solutions && solutions.length > 0 ? (
            <SolutionJourney solutions={solutions} />
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl p-12 text-center border border-[var(--stroke)]">
              <Layers className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-[var(--copy)]">No solutions available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* The Vtest Advantage Pillars */}
      <section className="py-20 bg-[var(--surface)] border-t border-[var(--stroke)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <div className="w-6 h-px bg-green-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                The Vtest Advantage
              </span>
              <div className="w-6 h-px bg-green-500" />
            </div>
            <h2 className="text-3xl font-black text-[var(--heading)] tracking-tight mb-4">
              Why Global Operators Choose Vtest Solutions
            </h2>
            <p className="text-[var(--copy)]">
              We bridge the gap between heavy physical test benches and modern cloud computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--stroke)' }}>
            {[
              {
                num: '01',
                title: 'Universal Bench Integration',
                desc: 'Connect roller brake testers, gas analyzers, opacity meters, sound level meters, and play detectors regardless of manufacturer into one synchronized screen.',
                stat: '50+',
                statLabel: 'Equipment types supported',
                tag: 'Multi-Protocol',
              },
              {
                num: '02',
                title: 'Tamper-Proof Data Integrity',
                desc: 'Automated direct capture from sensors eliminates manual re-keying and fraudulent passes, generating cryptographically verified government roadworthiness certificates.',
                stat: '100%',
                statLabel: 'Audit trail coverage',
                tag: 'Cryptographic',
              },
              {
                num: '03',
                title: 'Rapid Throughput Optimization',
                desc: 'Intelligent lane sequencing and driver guidance displays reduce cycle times by up to 35%, maximizing testing capacity without increasing physical real estate.',
                stat: '35%',
                statLabel: 'Faster cycle times',
                tag: 'AI-Optimized',
              },
            ].map((item, i) => (
              <div
                key={item.num}
                className="group relative p-8 transition-all duration-500"
                style={{
                  background: 'var(--site-bg)',
                  borderRight: i < 2 ? '1px solid var(--stroke)' : 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(180deg, rgba(46,204,113,0.04), var(--site-bg))';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--site-bg)';
                }}
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, #2ECC71, transparent)' }} />

                {/* Number + line */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em]" style={{ color: 'rgba(46,204,113,0.5)' }}>{item.num}</span>
                  <div className="flex-1 mx-4 h-px" style={{ background: 'var(--stroke)' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2ECC71', opacity: 0.4 }} />
                </div>

                {/* Stat highlight */}
                <div className="mb-6">
                  <div className="text-3xl font-black mb-1" style={{ color: 'var(--accent)' }}>{item.stat}</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] font-medium" style={{ color: 'var(--copy)', opacity: 0.7 }}>{item.statLabel}</div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--heading)] mb-3 leading-snug">{item.title}</h3>

                {/* Description */}
                <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'var(--copy)', lineHeight: '1.75' }}>{item.desc}</p>

                {/* Bottom tag */}
                <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid var(--stroke)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2ECC71', opacity: 0.5 }} />
                  <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: 'rgba(46,204,113,0.6)' }}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Ready to Modernize Your Testing Infrastructure?"
        subtitle="Let our solution architects review your lane schematics and provide a tailored deployment proposal."
        primaryAction={{ label: 'Schedule Consultation', href: '/contact' }}
        secondaryAction={{ label: 'Request a Demo', href: '/request-demo' }}
      />
    </div>
  );
}
