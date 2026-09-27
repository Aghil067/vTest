import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Activity,
  FileCheck2,
  Workflow,
  Database,
  Network,
  Clock,
  Sparkles,
  PhoneCall,
  Check,
  ChevronRight,
  Boxes,
  BarChart3,
  Sliders,
  Wrench,
  Gauge,
  Zap,
  Lock,
  ArrowUpRight,
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { solutionApi, productApi } from '@/services/api';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ProductCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: solution, loading } = useApi(async () => {
    if (!slug) return null;
    return solutionApi.getSolutionBySlug(slug);
  });

  const { data: relatedProducts } = useApi(async () => {
    if (!solution?.relatedProductIds || solution.relatedProductIds.length === 0) {
      const all = await productApi.getProducts();
      return all.slice(0, 2);
    }
    const all = await productApi.getProducts();
    const filtered = all.filter((p) => solution.relatedProductIds?.includes(p.id));
    return filtered.length > 0 ? filtered : all.slice(0, 2);
  });

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!solution) {
    return (
      <div className="py-20 bg-[var(--site-bg)]">
        <NotFoundState
          title="Solution Not Found"
          message="The requested solution architecture could not be found."
          actionText="View All Solutions"
          actionHref="/solutions"
        />
      </div>
    );
  }

  // Curated capability icons mapped by index or content
  const capabilityIcons = [Cpu, Activity, Database, Workflow, FileCheck2, Network, Sliders, Boxes];

  return (
    <div className="page page-solution-detail-page detail-page bg-[var(--site-bg)] text-[var(--copy)]">
      <SEOHead
        title={solution.seoTitle || `${solution.title} Architecture | Vtest Turnkey Solutions`}
        description={solution.seoDescription || solution.summary}
        canonical={`/solutions/${solution.slug}`}
      />

      {/* ========================================================
          1. ARCHITECTURAL HERO
          ======================================================== */}
      <section className="page-hero relative pt-8 pb-16 lg:pb-24 border-b border-[var(--stroke)] overflow-hidden">
        {/* Subtle high-tech ambient background */}
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: solution.title },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Turnkey Architecture // Enterprise Spec
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[var(--heading)] tracking-tight leading-[1.1]">
                {solution.title}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[var(--copy)] leading-relaxed max-w-2xl font-normal">
                {solution.summary}
              </p>

              {/* Technical Spec Matrix Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)]">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] mb-0.5">Deployment</div>
                  <div className="text-xs font-bold text-[var(--heading)]">Turnkey On-Prem / Cloud</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)]">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] mb-0.5">Standard</div>
                  <div className="text-xs font-bold text-[var(--heading)]">ISO / IEC 17025 Ready</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--stroke)] col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] mb-0.5">Connectivity</div>
                  <div className="text-xs font-bold text-[var(--heading)]">CAN / Modbus / REST API</div>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to={`/request-demo?solution=${encodeURIComponent(solution.title)}`}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/25"
                >
                  Schedule Architecture Demo
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to={`/request-quote?solution=${encodeURIComponent(solution.title)}`}
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                >
                  Request Solution Quote
                </Link>
              </div>
            </div>

            {/* Right Showcase Card Column */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Glow aura */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[var(--accent)] to-emerald-600/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative rounded-2xl overflow-hidden border border-[var(--stroke)] bg-[var(--surface)] shadow-2xl">
                  {/* Top technical window bar */}
                  <div className="px-4 py-2.5 bg-[var(--site-surface-alt)] border-b border-[var(--stroke)] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                      <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                      <span className="text-[11px] tracking-wider uppercase font-semibold">SYS-SPEC // {solution.slug.toUpperCase()}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>

                  {/* Main Solution Visual */}
                  <div className="relative h-72 sm:h-80 overflow-hidden photo-surface">
                    <img
                      src={solution.image || '/hero-bg.jpg'}
                      alt={solution.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallback) {
                          e.currentTarget.dataset.fallback = 'true';
                          e.currentTarget.src = '/hero-bg.jpg';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--site-bg)] via-transparent to-transparent opacity-80" />

                    {/* Corner Reticle Brackets */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[var(--accent)] pointer-events-none opacity-80" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] pointer-events-none opacity-80" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[var(--accent)] pointer-events-none opacity-80" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[var(--accent)] pointer-events-none opacity-80" />

                    {/* Bottom floating badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-[var(--site-bg)] border border-[var(--stroke)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
                          <Gauge className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--heading)]">{solution.title}</div>
                          <div className="text-[10px] text-[var(--muted)]">Industrial Turnkey Deployment</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-md">
                        {solution.capabilities?.length || 5} Capabilities
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ARCHITECTURE KPI & ASSURANCE STRIP
          ======================================================== */}
      <section className="border-b border-[var(--stroke)] bg-[var(--site-surface-alt)] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[var(--heading)]">&lt; 45s</div>
                <div className="text-xs text-[var(--muted)] font-medium">Standard Test Cycle</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[var(--heading)]">99.98%</div>
                <div className="text-xs text-[var(--muted)] font-medium">System Availability</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[var(--heading)]">100%</div>
                <div className="text-xs text-[var(--muted)] font-medium">Audit Traceability</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[var(--heading)]">ISO / OIML</div>
                <div className="text-xs text-[var(--muted)] font-medium">Certified Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. MAIN CONTENT & DEPLOYMENT DESK LAYOUT
          ======================================================== */}
      <section className="py-16 lg:py-24 bg-[var(--site-bg)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left 8 Cols: Architectural Details */}
            <div className="lg:col-span-8 space-y-16">
              {/* Executive Architecture Overview */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                  <span className="w-4 h-px bg-[var(--accent)]" />
                  System Overview
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight">
                  Solution Architecture Overview
                </h2>
                <div className="p-6 sm:p-8 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] shadow-sm">
                  <p className="text-base sm:text-lg leading-relaxed text-[var(--copy)] font-normal">
                    {solution.description}
                  </p>
                </div>
              </div>

              {/* Business Challenge vs. Vtest Engineered Resolution */}
              {solution.businessContext && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                    <span className="w-4 h-px bg-[var(--accent)]" />
                    Problem &amp; Resolution
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight">
                    Operational Impact Analysis
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Challenge Card */}
                    <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        The Operational Challenge
                      </div>
                      <h3 className="text-lg font-bold text-[var(--heading)]">
                        Throughput &amp; Error Limitations
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--copy)]">
                        {solution.businessContext}
                      </p>
                    </div>

                    {/* Vtest Resolution Card */}
                    <div className="p-6 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        Vtest Engineered Resolution
                      </div>
                      <h3 className="text-lg font-bold text-[var(--heading)]">
                        Autonomous Automated Validation
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--copy)]">
                        By uniting calibrated hardware sensors, real-time edge processing, and standardized test logic,
                        Vtest eliminates manual subjectivity, accelerates turnaround time, and ensures 100% auditable quality records.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Technical Capabilities */}
              {solution.capabilities && solution.capabilities.length > 0 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                        <span className="w-4 h-px bg-[var(--accent)]" />
                        Core Modules
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight mt-1">
                        Key Technical Capabilities
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {solution.capabilities.length} Subsystems Validated
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solution.capabilities.map((cap, index) => {
                      const IconComponent = capabilityIcons[index % capabilityIcons.length];
                      return (
                        <div
                          key={cap}
                          className="group p-5 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="text-[11px] font-mono text-[var(--muted)] font-semibold">
                              SUBSYSTEM // {String(index + 1).padStart(2, '0')}
                            </div>
                            <h4 className="text-sm font-bold text-[var(--heading)] leading-snug">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Technologies Stack Included */}
              {solution.technologies && solution.technologies.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                      <span className="w-4 h-px bg-[var(--accent)]" />
                      Tech Framework
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight mt-1">
                      Integrated Technology Stack
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {solution.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="p-5 rounded-2xl border border-[var(--stroke)] bg-[var(--site-surface-alt)] flex items-center gap-3.5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--heading)]">{tech}</div>
                          <div className="text-[10px] text-[var(--muted)] font-mono">Core Subsystem</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operational Outcomes & Measurable ROI (Benefits) */}
              {solution.benefits && solution.benefits.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                      <span className="w-4 h-px bg-[var(--accent)]" />
                      Measurable Value
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight mt-1">
                      Operational Outcomes &amp; Business ROI
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solution.benefits.map((benefit, idx) => (
                      <div
                        key={benefit}
                        className="p-5 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] flex items-start gap-4"
                      >
                        <div className="w-7 h-7 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider font-semibold">
                            ROI Impact #{idx + 1}
                          </div>
                          <p className="text-sm font-semibold text-[var(--heading)] leading-snug">
                            {benefit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Applications & Deployments */}
              {solution.applications && solution.applications.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                      <span className="w-4 h-px bg-[var(--accent)]" />
                      Deployment Scope
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight mt-1">
                      Target Applications &amp; Environments
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {solution.applications.map((app) => (
                      <div
                        key={app}
                        className="p-4 rounded-xl border border-[var(--stroke)] bg-[var(--surface)] flex items-center gap-3 transition-colors hover:border-[var(--accent)]"
                      >
                        <div className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                        <span className="text-xs font-bold text-[var(--heading)] leading-snug">
                          {app}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Sticky Solution Deployment Desk */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              {/* Main Deployment Card */}
              <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] p-6 sm:p-7 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--stroke)]">
                  <div>
                    <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider">Deployment Desk</span>
                    <h3 className="text-lg font-black text-[var(--heading)] mt-0.5">Get This Solution</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]">
                    TURNKEY
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[var(--copy)]">
                  Deploy this verified architecture with custom calibration, lane integration, and direct hardware support.
                </p>

                <div className="space-y-3">
                  <Link
                    to={`/request-demo?solution=${encodeURIComponent(solution.title)}`}
                    className="btn-primary w-full text-center py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-md shadow-green-500/10"
                  >
                    Schedule Live Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/request-quote?solution=${encodeURIComponent(solution.title)}`}
                    className="btn-secondary w-full text-center py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2"
                  >
                    Request Custom Quote
                  </Link>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--heading)] transition-colors py-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[var(--accent)]" />
                    Speak with a Solutions Architect
                  </Link>
                </div>
              </div>

              {/* Turnkey Deployment Workflow Checklist Card */}
              <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[var(--accent)]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--heading)]">
                    Turnkey Implementation Flow
                  </h4>
                </div>

                <ol className="space-y-3 text-xs">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[var(--heading)] block font-semibold">Site Survey &amp; Lane Assessment</strong>
                      <span className="text-[var(--muted)] text-[11px]">Engineering review of space &amp; electrical layout</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[var(--heading)] block font-semibold">Hardware Calibrated &amp; Installed</strong>
                      <span className="text-[var(--muted)] text-[11px]">Industrial mounting and sensor calibration</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[var(--heading)] block font-semibold">Software &amp; ERP Integration</strong>
                      <span className="text-[var(--muted)] text-[11px]">Seamless API linkage to host management systems</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[var(--heading)] block font-semibold">Staff Certification Training</strong>
                      <span className="text-[var(--muted)] text-[11px]">Operator training and compliance sign-off</span>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Enterprise Guarantee Badge */}
              <div className="p-4 rounded-xl border border-[var(--stroke)] bg-[var(--site-surface-alt)] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                <div className="text-[11px] text-[var(--muted)] leading-tight">
                  <span className="font-bold text-[var(--heading)] block mb-0.5">Enterprise SLA &amp; Support</span>
                  Dedicated engineering response within 2 business hours for active tenders.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. INTEGRATED PRODUCTS & SYSTEMS
          ======================================================== */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-20 bg-[var(--site-surface-alt)] border-t border-[var(--stroke)]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)]">
                  <span className="w-4 h-px bg-[var(--accent)]" />
                  Hardware &amp; Software
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight mt-1">
                  Integrated Products &amp; Systems
                </h2>
                <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
                  Tested and verified components engineered to operate seamlessly with this architecture.
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline"
              >
                Browse All Products <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          5. BOTTOM CONVERSION CTA
          ======================================================== */}
      <CTASection
        title={`Deploy ${solution.title} in Your Testing Centers`}
        subtitle="Schedule a technical consultation with our systems engineering team to map your site requirements and timeline."
        primaryAction={{
          label: 'Schedule Architecture Demo',
          href: `/request-demo?solution=${encodeURIComponent(solution.title)}`,
        }}
        secondaryAction={{
          label: 'Request Custom Quote',
          href: `/request-quote?solution=${encodeURIComponent(solution.title)}`,
        }}
      />
    </div>
  );
}
