import { IndustryCard, ProjectCard } from '@/components/common/Cards';
import { EngineeringHeading, EngineeringLink } from '@/components/common/EngineeringLayout';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, HardDrive, Cpu, Brain, Wifi, Zap, BarChart3 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { productApi, solutionApi, projectApi } from '@/services/api';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { SEOHead } from '@/components/common/SEOHead';
import { CTASection } from '@/components/common/SectionComponents';
import { InspectionExperience } from '@/components/common/InspectionExperience';
import { VehicleScene } from '@/components/common/VehicleScene';
import { useHomeChoreography } from '@/hooks/useHomeChoreography';

// Brand tokens
const GREEN = '#2ECC71';
const GREEN_DARK = '#1A9E50';
const BG_DARK = 'var(--site-bg)';
const BG_CARD = 'var(--surface)';
const BG_CARD2 = 'var(--surface)';
const BORDER = 'var(--stroke)';

// ==========================================
// HERO SECTION
// ==========================================

function HeroSection() {
  return (
    <section className="home-hero">
      <div className="container home-hero__layout">
        <div className="home-hero__copy">
          <div className="eyebrow"><span /> Vehicle Testing Technology</div>
          <h1>Engineering Smarter<br />Testing &amp; Inspection<br /><span>Solutions.</span></h1>
          <p>Integrated software, hardware, and automation technology for vehicle inspection,
            end-of-line testing, and test lane management.</p>
          <div className="home-hero__actions">
            <Link to="/request-demo" id="hero-request-demo" className="btn-primary-lg">Request a Demo <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/products" className="btn-secondary-lg">Explore Products <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="home-hero__disciplines"><span>Software</span><i /><span>Hardware</span><i /><span>Automation</span><i /><span>IoT</span></div>
        </div>
        <VehicleScene />
      </div>
      <div className="container">
        <div className="home-hero__stats">
          {[
            { value: '3+', label: 'Software Products' },
            { value: '2+', label: 'Hardware Products' },
            { value: '6', label: 'Solutions' },
            { value: '4', label: 'Industries Served' },
          ].map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}
// ==========================================
// ABOUT SECTION
// ==========================================

function AboutSection() {
  return (
    <section className="home-about py-24 lg:py-32" style={{ background: BG_DARK }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px" style={{ background: GREEN }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                About Vtest
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--heading)] leading-tight mb-6">
              Purpose-Built Technology for Vehicle Testing Professionals
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--copy)' }}>
              Vtest develops integrated technology solutions that power vehicle inspection stations,
              automotive testing facilities, and manufacturing end-of-line operations — combining
              software intelligence with precision hardware.
            </p>
            <div className="about-capabilities mb-10">
              {[
                'Custom software and hardware engineering',
                'Industrial IoT and equipment integration',
                'Multi-protocol communication and automation',
                'Analytics and compliance management',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              id="home-about-cta"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-3"
              style={{ color: 'var(--accent)' }}
            >
              Learn More About Vtest <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="about-inspection-visual">
            <figure className="about-inspection-photo photo-surface">
              <img src="/automobile-testing-product.jpg" width="1376" height="768" alt="Automobile testing and diagnostic product system" loading="lazy" decoding="async" />
              <figcaption>FROM THE TEST LANE TO THE CONTROL ROOM</figcaption>
            </figure>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'IoT', label: 'Industrial connectivity', accent: true },
              { value: '6', label: 'Technology domains', accent: false },
              { value: '100%', label: 'Custom-built solutions', accent: false },
              { value: 'OEM', label: 'Grade hardware', accent: true },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-lg p-6 flex flex-col justify-end"
                style={{
                  aspectRatio: '1',
                  background: card.accent
                    ? `linear-gradient(135deg, ${GREEN_DARK}22, ${GREEN}15)`
                    : BG_CARD,
                  border: `1px solid ${card.accent ? GREEN + '30' : BORDER}`,
                }}
              >
                <div className="text-4xl font-black mb-2" style={{ color: 'var(--accent)' }}>
                  {card.value}
                </div>
                <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CATEGORY CARDS
// ==========================================

function CategorySection() {
  const categories = [
    {
      type: 'Software',
      icon: <Monitor className="w-7 h-7" />,
      badge: '3 Products',
      headline: 'Intelligent Software Suite',
      description: 'Purpose-built inspection management, test lane software, and analytics platforms that streamline every stage of vehicle testing.',
      href: '/products/software',
      items: [
        { label: 'Inspection Management', detail: 'End-to-end workflow' },
        { label: 'Test Lane Control', detail: 'Real-time orchestration' },
        { label: 'Compliance Reporting', detail: 'Automated audits' },
        { label: 'Analytics Dashboard', detail: 'Live insights' },
      ],
      accentIcon: <Brain className="w-5 h-5" />,
    },
    {
      type: 'Hardware',
      icon: <HardDrive className="w-7 h-7" />,
      badge: '2 Products',
      headline: 'Precision Hardware Systems',
      description: 'Industrial-grade control units, sensors, and precision measurement devices engineered for demanding testing environments.',
      href: '/products/hardware',
      items: [
        { label: 'Control Units', detail: 'Industrial grade' },
        { label: 'Sensor Arrays', detail: 'Sub-mm accuracy' },
        { label: 'Display Systems', detail: 'Ruggedized' },
        { label: 'IoT Modules', detail: 'Edge computing' },
      ],
      accentIcon: <Cpu className="w-5 h-5" />,
    },
  ];

  return (
    <section className="home-categories py-24" style={{ background: BG_CARD }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: GREEN }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                Product Categories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--heading)] leading-tight">
              Software &amp; Hardware Solutions
            </h2>
          </div>
          <Link
            to="/products"
            id="home-products-all"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-3 flex-shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.type}
              to={cat.href}
              className="cat-card group block relative overflow-hidden transition-all duration-500"
              style={{ background: BG_DARK, border: `1px solid ${BORDER}`, borderRadius: '12px' }}
            >
              {/* Top accent line */}
              <div className="cat-card__accent" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`, opacity: 0, transition: 'opacity 0.5s' }} />

              <div className="p-8 pb-0">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ background: `${GREEN}15`, color: 'var(--accent)', boxShadow: `0 0 0 1px ${GREEN}20` }}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--heading)] leading-tight">{cat.type}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mt-0.5 block" style={{ color: 'var(--accent)', opacity: 0.7 }}>{cat.badge}</span>
                    </div>
                  </div>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-12"
                    style={{ background: `${GREEN}10`, color: 'var(--accent)' }}
                  >
                    {cat.accentIcon}
                  </div>
                </div>

                {/* Headline */}
                <p className="text-base font-semibold text-[var(--heading)] mb-2" style={{ opacity: 0.9 }}>{cat.headline}</p>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--copy)', maxWidth: '440px' }}>
                  {cat.description}
                </p>
              </div>

              {/* Feature grid */}
              <div className="px-8">
                <div className="grid grid-cols-2 gap-0" style={{ borderTop: `1px solid ${BORDER}` }}>
                  {cat.items.map((item, i) => (
                    <div
                      key={item.label}
                      className="py-4 pr-4"
                      style={{
                        borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none',
                        borderRight: i % 2 === 0 ? `1px solid ${BORDER}` : 'none',
                        paddingLeft: i % 2 === 1 ? '16px' : '0',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN, opacity: 0.6 }} />
                        <span className="text-xs font-semibold text-[var(--heading)]">{item.label}</span>
                      </div>
                      <span className="text-[11px] pl-3.5" style={{ color: 'var(--copy)', opacity: 0.7 }}>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-8 py-5 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Explore {cat.type} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1 h-1 rounded-full" style={{ background: GREEN }} />
                  <div className="w-1 h-1 rounded-full" style={{ background: GREEN, opacity: 0.5 }} />
                  <div className="w-1 h-1 rounded-full" style={{ background: GREEN, opacity: 0.25 }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FEATURED PRODUCTS
// ==========================================

function FeaturedProductsSection() {
  const { data: products, loading } = useApi(() => productApi.getFeaturedProducts());

  return (
    <section className="home-products py-24" style={{ background: BG_DARK }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: GREEN }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                Our Collection
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--heading)]">Featured Products</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-3 flex-shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <CardGridSkeleton count={3} columns={3} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(products ?? []).slice(0, 3).map((product) => {
              const href =
                product.type === 'SOFTWARE'
                  ? `/products/software/${product.slug}`
                  : `/products/hardware/${product.slug}`;
              return (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: BG_CARD2, border: `1px solid ${BORDER}`, borderRadius: '8px' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0F0C90, transparent)' }} />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded"
                        style={{
                          background: `${GREEN}22`,
                          color: 'var(--accent)',
                          border: `1px solid ${GREEN}30`,
                        }}
                      >
                        {product.type === 'SOFTWARE' ? 'Software' : 'Hardware'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-black text-[var(--heading)] mb-2 group-hover:text-green-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--copy)' }}>
                      {product.shortDescription}
                    </p>
                    <Link
                      to={href}
                      className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest"
                      style={{ color: 'var(--accent)' }}
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ==========================================
// SOLUTIONS OVERVIEW
// ==========================================

function SolutionsSection() {
  const { data: solutions, loading } = useApi(() => solutionApi.getSolutions());

  return (
    <section className="home-solutions py-24" style={{ background: BG_CARD }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: GREEN }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                Solutions Overview
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--heading)] leading-tight">
              Integrated Testing Solutions
            </h2>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-3 flex-shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            View All Solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <CardGridSkeleton count={6} columns={3} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(solutions ?? []).map((solution, index) => (
              <Link
                key={solution.id}
                to={`/solutions/${solution.slug}`}
                className="home-solution-card group block overflow-hidden rounded-xl transition-all duration-300"
                style={{ background: BG_DARK, border: `1px solid ${BORDER}` }}
              >
                <div className="home-solution-card__media">
                  <img
                    src={solution.image || '/automotive-studio-900.jpg'}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/automotive-studio-900.jpg'; }}
                  />
                  <span className="home-solution-card__index">VTEST / {String(index + 1).padStart(2, '0')}</span>
                  <span className="home-solution-card__corner" aria-hidden="true" />
                </div>
                <div className="home-solution-card__body">
                <h3 className="text-lg font-black text-[var(--heading)] mb-3 group-hover:text-green-400 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--copy)' }}>
                  {solution.summary}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent)' }}
                >
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ==========================================
// INDUSTRIES
// ==========================================

function IndustriesSection() {
  const { data: industries } = useApi(() =>
    import('@/services/api').then((m) => m.industryApi.getIndustries())
  );

  return (
    <section className="home-industries py-24" style={{ background: BG_DARK }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: GREEN }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                Industries
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--heading)] leading-tight">
              Sectors We Serve
            </h2>
          </div>
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-3 flex-shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            Explore Industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(industries ?? []).map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// TECHNOLOGY CAPABILITY
// ==========================================

function TechnologySection() {
  const disciplines = [
    { icon: Monitor, title: 'Software', text: 'Purpose-built inspection and management platforms.' },
    { icon: HardDrive, title: 'Hardware', text: 'Industrial control and measurement devices for the test lane.' },
    { icon: Wifi, title: 'IoT', text: 'Equipment connectivity and processing at the edge.' },
    { icon: Zap, title: 'Automation', text: 'Coordinated test sequences and operator workflows.' },
    { icon: Brain, title: 'Analytics', text: 'Inspection data translated into clear operational insight.' },
    { icon: BarChart3, title: 'Integration', text: 'Diverse equipment and systems, connected through one platform.' },
  ];
  return <section className="home-technology">
    <div className="container">
      <EngineeringHeading label="ENGINEERING EXPERTISE" title="Every part of the test lane, connected."><EngineeringLink to="/technology">Explore our technology</EngineeringLink></EngineeringHeading>
      <div className="home-technology-grid">{disciplines.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={25} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div>
  </section>;
}

function ProjectsSection() {
  const { data: projects, loading } = useApi(() => projectApi.getProjects());
  return <section className="home-projects">
    <div className="container">
      <EngineeringHeading label="IN THE FIELD" title="See the engineering in practice."><EngineeringLink to="/projects">Explore all projects</EngineeringLink></EngineeringHeading>
      {loading ? <CardGridSkeleton count={2} columns={2} /> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">{(projects ?? []).slice(0, 2).map(project => <ProjectCard key={project.id} project={project} />)}</div>}
    </div>
  </section>;
}

// ==========================================
// FINAL CTA SECTION
// ==========================================

function FinalCTASection() {
  return <CTASection className="home-final-cta" primaryId="home-final-demo" title="See your next testing system in action."
    subtitle="Explore how Vtest connects your equipment, inspection workflows and reporting in one tailored demonstration."
    primaryAction={{ label: 'Request a Demo', href: '/request-demo' }}
    secondaryAction={{ label: 'Contact Us', href: '/contact' }} />;
}

// ==========================================
// HOME PAGE ENTRY
// ==========================================

export function HomePage() {
  const motionRef = useHomeChoreography();
  return (
    <div ref={motionRef} className="page page-home-page editorial-page">
      <SEOHead />
      <HeroSection />
      <AboutSection />
      <InspectionExperience />
      <CategorySection />
      <FeaturedProductsSection />
      <SolutionsSection />
      <IndustriesSection />
      <TechnologySection />
      <ProjectsSection />
      <FinalCTASection />
    </div>
  );
}
