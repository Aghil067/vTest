import { PageArtwork } from '@/components/common/PageArtwork';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Globe, Zap, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

const stats = [
  { value: '15+', label: 'Years of Engineering Excellence', icon: Award },
  { value: '500+', label: 'Testing Stations & Lanes Deployed', icon: Zap },
  { value: '30+', label: 'Countries Supported Worldwide', icon: Globe },
  { value: '99.9%', label: 'System Uptime & Reliability', icon: ShieldCheck },
];

export function AboutPage() {
  return (
    <div className="page page-about-page editorial-page bg-[var(--site-bg)] text-[var(--copy)]">
      <SEOHead
        title="About Vetest | Leaders in Vehicle Inspection & Test Automation"
        description="Learn about Vetest's history, leadership, mission, and cutting-edge software and hardware testing technology built for automotive OEMs, test lanes, and transport agencies."
        canonical="/about"
      />

      {/* Hero */}
      <section className="page-hero relative py-20 lg:py-24 overflow-hidden border-b border-[var(--stroke)] bg-[var(--site-bg)]">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="hidden dark:block absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
            variant="dark"
            className="mb-8"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Our Story &amp; Vision
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] mb-6 text-[var(--heading)]">
              Advancing Safety &amp; Quality Through{' '}
              <span className="text-[var(--accent)]">Intelligent Testing</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--copy)] font-normal">
              Vetest is a global technology leader providing turnkey software, hardware, and automation
              ecosystems that power vehicle inspection stations, OEM factory test lanes, and transport
              compliance programs worldwide.
            </p>
          </div>
        </div>
        <PageArtwork kind="facility" />
      </section>

      {/* Stats */}
      <section className="bg-[var(--site-surface-alt)] border-b border-[var(--stroke)] py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--heading)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] max-w-[180px]">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Architecture */}
      <section className="py-20 lg:py-24 bg-[var(--site-bg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                <span className="w-4 h-px bg-[var(--accent)]" />
                Who We Are
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--heading)] tracking-tight leading-tight">
                Bridging Physical Testing Hardware with Modern Software Architecture
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-[var(--copy)]">
                <p>
                  At Vetest, we recognize that reliable vehicle inspection and manufacturing quality
                  assurance cannot exist in siloes. Traditional testing setups suffer from proprietary
                  vendor lock-in, disconnected data streams, and manual human errors.
                </p>
                <p>
                  We build open, modular, and cloud-connected solutions that unify every piece of
                  testing equipment into a synchronized, audit-proof digital pipeline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)] text-sm font-semibold text-[var(--heading)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                  <span>Hardware Agnostic</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)] text-sm font-semibold text-[var(--heading)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                  <span>ISO 17025 Compliant</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)] text-sm font-semibold text-[var(--heading)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                  <span>Real-Time Edge Sync</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)] text-sm font-semibold text-[var(--heading)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                  <span>Turnkey Deployment</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/products"
                  className="btn-primary"
                >
                  Explore Products <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  to="/solutions"
                  className="btn-secondary"
                >
                  View Solutions
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden photo-surface border border-[var(--stroke)] shadow-2xl" style={{ aspectRatio: '4/3' }}>
                <img
                  src="/vehicle-testing-lab.jpg"
                  loading="lazy"
                  decoding="async"
                  alt="Vehicle on dynamometer test station with diagnostic displays"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true';
                      e.currentTarget.src = '/hero-bg.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[var(--black)]/30 to-transparent flex items-end p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 text-[var(--accent)]">
                      Engineering Excellence
                    </p>
                    <p className="text-lg font-black text-white">
                      Tested &amp; Proven Across 500+ Multi-Lane Deployments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Transform Your Testing Operations?"
        subtitle="Consult with our solutions engineering team to design a customized testing or inspection architecture."
        primaryAction={{ label: 'Schedule a Consultation', href: '/contact' }}
        secondaryAction={{ label: 'Request a Demo', href: '/request-demo' }}
      />
    </div>
  );
}
