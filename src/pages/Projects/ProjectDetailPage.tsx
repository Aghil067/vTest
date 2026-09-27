import { useParams, Link } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building2,
  Calendar,
  Layers,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { projectApi, productApi } from '@/services/api';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ProductCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, loading } = useApi(async () => {
    if (!slug) return null;
    return projectApi.getProjectBySlug(slug);
  });

  const { data: relatedProducts } = useApi(async () => {
    if (!project?.relatedProductIds || project.relatedProductIds.length === 0) return [];
    const all = await productApi.getProducts();
    return all.filter((p) => project.relatedProductIds?.includes(p.id));
  });

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!project) {
    return (
      <div className="py-20">
        <NotFoundState
          title="Case Study Not Found"
          message="The requested implementation case study could not be found."
          actionText="View All Projects"
          actionHref="/projects"
        />
      </div>
    );
  }

  return (
    <div className="page page-project-detail-page detail-page">
      <SEOHead
        title={project.seoTitle || `${project.title} | Vtest Case Study`}
        description={project.seoDescription || project.summary}
        canonical={`/projects/${project.slug}`}
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: project.title },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1">
                <Briefcase className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                  Case Study &bull; {project.clientOrProjectName}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[var(--heading)]">
                {project.title}
              </h1>

              <p className="text-lg text-[var(--copy)] leading-relaxed max-w-2xl">
                {project.summary}
              </p>

              {/* Deployment Meta Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[var(--accent)]" />
                  <span>CLIENT: <strong className="text-[var(--heading)]">{project.clientOrProjectName}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                  <span>STATUS: <strong className="text-[var(--heading)]">DEPLOYED & OPERATIONAL</strong></span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/request-demo" className="btn-primary">
                  Request Similar Implementation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Talk to Project Lead
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[var(--stroke)] bg-[var(--site-surface-alt)] relative group">
                <img
                  src={project.heroImage || '/hero-bg.jpg'}
                  alt={project.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[var(--heading)] bg-[var(--surface)]/85 backdrop-blur-sm p-3 rounded-xl border border-[var(--stroke)]">
                  <span>FIELD INTEGRATION</span>
                  <span className="text-[var(--accent)]">{project.clientOrProjectName} TEST FACILITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Body */}
      <section className="py-20 bg-[var(--surface)] border-t border-[var(--stroke)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Primary Column */}
            <div className="lg:col-span-8 space-y-16">
              {/* Context & Description */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                  01 // OPERATIONAL CONTEXT
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight">
                  Connecting Technology. Modernizing Testing.
                </h2>
                <div className="prose text-[var(--copy)] leading-relaxed space-y-4 text-base">
                  <p>{project.description}</p>
                  {project.businessContext && (
                    <div className="p-6 rounded-xl bg-[var(--site-surface-alt)] border-l-4 border-[var(--accent)] space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                        THE STARTING POINT
                      </span>
                      <p className="text-sm text-[var(--copy)] leading-relaxed">{project.businessContext}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Challenge vs Solution Grid */}
              {(project.problem || project.vtestContribution) && (
                <div className="space-y-6 pt-6 border-t border-[var(--stroke)]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      02 // TRANSFORMATION ARCHITECTURE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                      The Challenge & The Vtest Engineering Solution
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.problem && (
                      <div className="p-6 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] space-y-3">
                        <div className="flex items-center gap-2 text-amber-500">
                          <AlertTriangle className="w-5 h-5 shrink-0" />
                          <h3 className="font-bold text-[var(--heading)] text-base">The Legacy Problem</h3>
                        </div>
                        <p className="text-sm text-[var(--copy)] leading-relaxed">{project.problem}</p>
                      </div>
                    )}

                    {project.vtestContribution && (
                      <div className="p-6 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 space-y-3">
                        <div className="flex items-center gap-2 text-[var(--accent)]">
                          <Lightbulb className="w-5 h-5 shrink-0" />
                          <h3 className="font-bold text-[var(--heading)] text-base">The Vtest Approach</h3>
                        </div>
                        <p className="text-sm text-[var(--copy)] leading-relaxed">{project.vtestContribution}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Delivered Capabilities */}
              {project.capabilities && project.capabilities.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-[var(--stroke)]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      03 // DELIVERED CAPABILITIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                      Engineered & Commissioned On-Site
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-5 rounded-xl bg-[var(--site-surface-alt)] border border-[var(--stroke)]"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-mono font-bold text-[var(--accent)] mb-0.5">CAPABILITY {String(i + 1).padStart(2, '0')}</span>
                          <span className="font-bold text-sm text-[var(--heading)]">{cap}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* In the Field Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-[var(--stroke)]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      04 // IN THE FIELD
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight mt-1">
                      Deployment Photography & System Inspection
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.images.map((img, i) => (
                      <figure
                        key={i}
                        className="rounded-2xl overflow-hidden border border-[var(--stroke)] bg-[var(--site-surface-alt)]"
                      >
                        <img
                          src={img.url}
                          alt={img.altText}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-56 object-cover"
                        />
                        {img.caption && (
                          <figcaption className="p-4 text-xs font-mono text-[var(--copy)] border-t border-[var(--stroke)] flex items-center gap-2">
                            <span className="text-[var(--accent)] font-bold">{String(i + 1).padStart(2, '0')}</span>
                            <span>{img.caption}</span>
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 p-8 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] shadow-sm space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-[var(--accent)] tracking-wider">
                    DEPLOYMENT OVERVIEW
                  </span>
                  <h3 className="text-xl font-bold text-[var(--heading)] mt-1">
                    {project.clientOrProjectName}
                  </h3>
                  <p className="text-xs text-[var(--copy)] leading-relaxed mt-2">
                    Turn-key hardware protocol adapter and cloud telemetry integration.
                  </p>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="pt-4 border-t border-[var(--stroke)] space-y-3">
                    <span className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider">Connected Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-[var(--surface)] text-[var(--heading)] border border-[var(--stroke)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[var(--stroke)] space-y-3">
                  <Link to="/request-demo" className="btn-primary w-full text-center">
                    Request Facility Walkthrough
                  </Link>
                  <Link to="/contact" className="btn-secondary w-full text-center">
                    Discuss Requirements
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-20 bg-[var(--site-bg)] border-t border-[var(--stroke)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] mb-8 tracking-tight">
              Products Deployed in this Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <CTASection
        title="Achieve Similar Operational Breakthroughs"
        subtitle="Our solutions team will work with your staff to evaluate lane configurations and deliver a high-ROI deployment plan."
        primaryAction={{ label: 'Start Your Project', href: '/contact' }}
        secondaryAction={{ label: 'View All Projects', href: '/projects' }}
      />
    </div>
  );
}
