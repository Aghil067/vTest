import { useParams, Link } from 'react-router-dom';
import {
  Cpu,
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  Terminal,
  Server,
  Zap,
  ShieldCheck,
  FileCode2
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { technologyApi, projectApi } from '@/services/api';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ProjectCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function TechnologyDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: tech, loading } = useApi(async () => {
    if (!slug) return null;
    return technologyApi.getTechnologyBySlug(slug);
  });

  const { data: relatedProjects } = useApi(async () => {
    const all = await projectApi.getProjects();
    return all.slice(0, 2);
  });

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!tech) {
    return (
      <div className="py-20">
        <NotFoundState
          title="Technology Discipline Not Found"
          message="The requested engineering discipline could not be found."
          actionText="View All Technology"
          actionHref="/technology"
        />
      </div>
    );
  }

  return (
    <div className="page page-technology-detail-page detail-page">
      <SEOHead
        title={tech.seoTitle || `${tech.title} Engineering Capabilities | Vtest`}
        description={tech.seoDescription || tech.summary}
        canonical={`/technology/${tech.slug}`}
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Technology', href: '/technology' },
              { label: tech.title },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1">
                <Cpu className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                  Engineering Discipline
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[var(--heading)]">
                {tech.title}
              </h1>

              <p className="text-lg text-[var(--copy)] leading-relaxed max-w-2xl">
                {tech.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/request-demo" className="btn-primary">
                  Schedule Technical Review
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to="/projects" className="btn-secondary">
                  Explore Deployments
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[var(--stroke)] bg-[var(--site-surface-alt)] relative group">
                <img
                  src={tech.image || '/hero-bg.jpg'}
                  alt={tech.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[var(--heading)] bg-[var(--surface)]/85 backdrop-blur-sm p-3 rounded-xl border border-[var(--stroke)]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    STATUS: PRODUCTION-GRADE
                  </span>
                  <span className="text-[var(--accent)]">VTEST CORE ARCHITECTURE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-[var(--surface)] border-t border-[var(--stroke)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Primary Editorial Content */}
            <div className="lg:col-span-8 space-y-16">
              {/* Discipline Overview */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                  01 // ARCHITECTURAL SCOPE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight">
                  High-Performance Testing Engineering
                </h2>
                <div className="prose text-[var(--copy)] leading-relaxed space-y-4 text-base">
                  <p>{tech.description}</p>
                  {tech.overview && <p>{tech.overview}</p>}
                </div>
              </div>

              {/* Core Capabilities */}
              {tech.capabilities && tech.capabilities.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-[var(--stroke)]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      02 // TECHNICAL CAPABILITIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                      Engineered Capabilities in Practice
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tech.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] space-y-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0" />
                          <h3 className="font-bold text-[var(--heading)] text-base">{cap.title}</h3>
                        </div>
                        <p className="text-sm text-[var(--copy)] leading-relaxed">{cap.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported Protocols & Concepts */}
              {tech.concepts && tech.concepts.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-[var(--stroke)]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      03 // PROTOCOL REGISTER & STACK
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                      Supported Frameworks & Interfaces
                    </h2>
                    <p className="text-sm text-[var(--copy)] mt-1">
                      Tested against real equipment controllers and high-throughput production lines.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tech.concepts.map((concept, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3.5 rounded-lg bg-[var(--site-surface-alt)] border border-[var(--stroke)] text-xs font-mono font-medium text-[var(--heading)]"
                      >
                        <Terminal className="w-4 h-4 text-[var(--accent)] shrink-0" />
                        <span className="truncate">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Real World Applications */}
              {tech.applications && tech.applications.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-[var(--stroke)]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      04 // OPERATIONAL ENVIRONMENTS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                      Proven Field Deployments
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tech.applications.map((app, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-[var(--site-surface-alt)] border border-[var(--stroke)]"
                      >
                        <Zap className="w-4 h-4 text-[var(--accent)] shrink-0" />
                        <span className="font-semibold text-sm text-[var(--heading)]">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Implementation & Consultation Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 p-8 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] shadow-sm space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-[var(--accent)] tracking-wider">
                    TECHNICAL DEPLOYMENT
                  </span>
                  <h3 className="text-xl font-bold text-[var(--heading)] mt-1">
                    Engage Our Lead Architects
                  </h3>
                  <p className="text-xs text-[var(--copy)] leading-relaxed mt-2">
                    Whether co-developing custom firmware or integrating with an existing PTI facility, our systems team is ready.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--stroke)]">
                  <div className="flex items-center gap-3 text-xs text-[var(--copy)]">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>ISO 17025 Compliant Calibration</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--copy)]">
                    <Server className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>On-Premise or Cloud Hybrid Runtimes</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--copy)]">
                    <Activity className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>24/7 Telemetry & Health Monitoring</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--stroke)]">
                  <Link to="/contact" className="btn-primary w-full text-center">
                    Consult With Lead Architect
                  </Link>
                  <Link to="/request-demo" className="btn-secondary w-full text-center">
                    Request Live Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deployments */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-20 bg-[var(--site-bg)] border-t border-[var(--stroke)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                  CASE STUDIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                  Active Implementations
                </h2>
              </div>
              <Link to="/projects" className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline flex items-center gap-1.5">
                All Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <CTASection
        title={`Incorporate ${tech.title} Into Your Testing Roadmap`}
        subtitle="Schedule a technical deep-dive with our embedded software and hardware engineers."
        primaryAction={{ label: 'Contact Us', href: '/contact' }}
        secondaryAction={{ label: 'Request Demo', href: '/request-demo' }}
      />
    </div>
  );
}
