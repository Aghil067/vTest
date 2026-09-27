import { useState } from 'react';
import { PageArtwork } from '@/components/common/PageArtwork';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Gauge,
  Cpu
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { projectApi } from '@/services/api';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SectionHeader, CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

const PROJECT_CATEGORIES = ['All Deployments', 'Equipment Integration', 'PTI & Test Lanes', 'Enterprise Compliance'];

export function ProjectsListingPage() {
  const { data: projects, loading } = useApi(async () => {
    return projectApi.getProjects();
  });

  const [selectedCategory, setSelectedCategory] = useState('All Deployments');

  const filteredProjects = projects ? projects.filter((p) => {
    if (selectedCategory === 'All Deployments') return true;
    if (selectedCategory === 'Equipment Integration') {
      return p.title.toLowerCase().includes('integration') || p.summary.toLowerCase().includes('equipment');
    }
    if (selectedCategory === 'PTI & Test Lanes') {
      return p.title.toLowerCase().includes('lane') || p.summary.toLowerCase().includes('inspection');
    }
    return true;
  }) : [];

  const featuredProject = projects && projects.length > 0 ? projects[0] : null;
  const remainingProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <div className="page page-projects-listing-page catalog-page">
      <SEOHead
        title="Testing Deployments & Case Studies | Vtest"
        description="Explore real-world automotive inspection and equipment integration case studies: MAHA test rigs, Navitsa facilities, and multi-lane periodic technical inspection centers."
        canonical="/projects"
      />

      {/* Hero */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Briefcase className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Proven Implementations
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Proven Across the World&apos;s <span className="gradient-text">Demanding Test Facilities</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              Discover how leading testing equipment manufacturers, commercial vehicle test centers,
              and transport authorities deploy Vtest software and hardware to achieve unprecedented reliability.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/request-demo" className="btn-primary">
                Discuss Your Deployment
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link to="/solutions" className="btn-secondary">
                Explore Turnkey Solutions
              </Link>
            </div>
          </div>
        </div>
        <PageArtwork kind="facility" />
      </section>

      {/* Impact Benchmark Strip */}
      <section className="bg-[var(--site-surface-alt)] border-y border-[var(--stroke)] text-[var(--heading)] py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">500+ Lanes</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Automated & Connected</p>
            </div>
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">4.8M+</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Vehicles Tested Annually</p>
            </div>
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">+35%</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Average Throughput Lift</p>
            </div>
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">99.98%</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Mission-Critical Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeader
            label="Client Case Studies"
            title="Featured Engineering Deployments"
            subtitle="Deep-dive into real challenges, hardware integrations, and measurable operational outcomes."
            centered
            className="mb-10"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'bg-[var(--site-surface-alt)] text-[var(--copy)] border border-[var(--stroke)] hover:text-[var(--heading)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <CardGridSkeleton count={2} columns={2} />
          ) : (
            <div className="space-y-12">
              {/* Featured Spotlight Card */}
              {featuredProject && selectedCategory === 'All Deployments' && (
                <div className="rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] overflow-hidden shadow-sm hover:border-[var(--accent)] transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full bg-[var(--site-bg)]">
                      <img
                        src={featuredProject.heroImage || '/hero-bg.jpg'}
                        alt={featuredProject.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--site-surface-alt)]" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[var(--surface)] backdrop-blur-sm text-[var(--accent)] border border-[var(--stroke)]">
                          FEATURED SPOTLIGHT &bull; {featuredProject.clientOrProjectName}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                          {featuredProject.clientOrProjectName} CASE STUDY
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight">
                          {featuredProject.title}
                        </h2>
                        <p className="text-[var(--copy)] leading-relaxed text-sm">
                          {featuredProject.summary}
                        </p>

                        {/* Quantitative Highlights */}
                        <div className="grid grid-cols-2 gap-3 pt-3">
                          <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)]">
                            <span className="block text-lg font-black text-[var(--accent)]">+35%</span>
                            <span className="text-[11px] font-medium text-[var(--muted)]">Lane Throughput</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)]">
                            <span className="block text-lg font-black text-[var(--accent)]">100%</span>
                            <span className="text-[11px] font-medium text-[var(--muted)]">Digital Audit Trail</span>
                          </div>
                        </div>

                        {featuredProject.technologies && featuredProject.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {featuredProject.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-[var(--accent-soft)] text-[var(--accent)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[var(--stroke)]">
                        <Link
                          to={`/projects/${featuredProject.slug}`}
                          className="btn-primary w-full text-center"
                        >
                          Explore Full Case Study
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(selectedCategory === 'All Deployments' ? remainingProjects : filteredProjects).map((project, idx) => (
                  <article
                    key={project.id}
                    className="group rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] overflow-hidden shadow-sm hover:border-[var(--accent)] transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-60 overflow-hidden bg-[var(--site-bg)]">
                      <img
                        src={project.heroImage || '/hero-bg.jpg'}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-lg bg-[var(--surface)] backdrop-blur-sm text-[var(--accent)] border border-[var(--stroke)]">
                          {project.clientOrProjectName}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                          DEPLOYMENT {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-2xl font-bold text-[var(--heading)] group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[var(--copy)] leading-relaxed text-sm">
                          {project.summary}
                        </p>

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-[var(--surface)] text-[var(--copy)] border border-[var(--stroke)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[var(--stroke)]">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline group-hover:gap-3 transition-all"
                        >
                          View Implementation Architecture
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Deployment Guarantees */}
      <section className="py-20 bg-[var(--site-bg)] border-t border-[var(--stroke)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[var(--heading)] tracking-tight mb-4">
              Engineered for Zero Downtime
            </h2>
            <p className="text-[var(--copy)] max-w-2xl mx-auto">
              Our implementation methodology protects existing lane investments while bringing modern cloud connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--stroke)] space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--heading)] text-lg">Sub-10ms Hardware Ingestion</h3>
              <p className="text-sm text-[var(--copy)] leading-relaxed">
                Seamless real-time capture from roller brake testers, suspension benches, and emissions analyzers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--stroke)] space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--heading)] text-lg">ISO 17025 Conformity</h3>
              <p className="text-sm text-[var(--copy)] leading-relaxed">
                Automated calibration verification with cryptographic tamper-proofing on every vehicle test run.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--stroke)] space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--heading)] text-lg">Multi-Station Scalability</h3>
              <p className="text-sm text-[var(--copy)] leading-relaxed">
                Centralized cloud telemetry dashboard supporting single inspection centers up to nationwide networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Ready to Modernize Your Test Facility?"
        subtitle="Our solutions team will work with your staff to evaluate lane configurations and deliver a high-ROI deployment plan."
        primaryAction={{ label: 'Contact Implementation Team', href: '/contact' }}
        secondaryAction={{ label: 'Request Demo', href: '/request-demo' }}
      />
    </div>
  );
}
