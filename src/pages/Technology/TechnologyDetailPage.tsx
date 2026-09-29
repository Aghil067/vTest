import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { technologyApi, projectApi } from '@/services/api';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ProjectCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';
import { EngineeringHero, EngineeringHeading, EngineeringLink, EngineeringTags } from '@/components/common/EngineeringLayout';

export function TechnologyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: tech, loading } = useApi(async () => slug ? technologyApi.getTechnologyBySlug(slug) : null);
  const { data: relatedProjects } = useApi(async () => (await projectApi.getProjects()).slice(0, 2));
  if (loading) return <DetailPageSkeleton />;
  if (!tech) return <div className="py-20"><NotFoundState title="Technology Discipline Not Found" message="The requested engineering discipline could not be found." actionText="View All Technology" actionHref="/technology" /></div>;

  return <div className="page engineering-page engineering-detail technology-page">
    <SEOHead title={tech.seoTitle || tech.title + ' | Vetest Technology'} description={tech.seoDescription || tech.summary} canonical={'/technology/' + tech.slug} />
    <EngineeringHero section="Technology" title={tech.title} summary={tech.summary} image={tech.image} caption="VETEST / ENGINEERING DISCIPLINE" detail>
      <Link to="/request-demo" className="btn-primary">Schedule a technical review <ArrowRight size={17} /></Link><EngineeringLink to="/projects">Explore deployments</EngineeringLink>
    </EngineeringHero>
    <section className="engineering-section">
      <div className="container engineering-reading-layout">
        <nav className="engineering-outline" aria-label="On this page">
          <span className="section-kicker">EXPLORE THE DISCIPLINE</span>
          <a href="#technology-overview">Overview <ArrowUpRight size={15} /></a>
          {!!tech.capabilities?.length && <a href="#technology-capabilities">Capabilities <ArrowUpRight size={15} /></a>}
          {!!tech.concepts?.length && <a href="#technology-stack">Technology stack <ArrowUpRight size={15} /></a>}
          {!!tech.applications?.length && <a href="#technology-applications">Applications <ArrowUpRight size={15} /></a>}
          <EngineeringLink to="/contact">Talk to an engineer</EngineeringLink>
        </nav>
        <div className="engineering-reading-body">
          <section className="engineering-chapter" id="technology-overview">
            <span className="section-kicker">01 / THE DISCIPLINE</span><h2>Built around the way you test.</h2>
            <div className="engineering-prose"><p>{tech.description}</p>{tech.overview && <p>{tech.overview}</p>}</div>
          </section>
          {!!tech.capabilities?.length && <section className="engineering-chapter" id="technology-capabilities">
            <span className="section-kicker">02 / CAPABILITIES</span><h2>What it makes possible.</h2>
            <div className="engineering-capabilities">{tech.capabilities.map((cap, i) => <article key={i} data-reveal="card"><span className="engineering-number">{String(i + 1).padStart(2, '0')}</span><h3>{cap.title}</h3><p>{cap.description}</p></article>)}</div>
          </section>}
          {!!tech.concepts?.length && <section className="engineering-chapter" id="technology-stack">
            <span className="section-kicker">03 / CONNECTED TECHNOLOGIES</span><h2>The tools behind the work.</h2><EngineeringTags items={tech.concepts} />
          </section>}
          {!!tech.applications?.length && <section className="engineering-chapter" id="technology-applications">
            <span className="section-kicker">04 / IN PRACTICE</span><h2>Where it fits.</h2>
            <ol className="engineering-applications">{tech.applications.map((app, i) => <li key={i}><span className="engineering-number">{String(i + 1).padStart(2, '0')}</span><span>{app}</span></li>)}</ol>
          </section>}
        </div>
      </div>
    </section>
    {!!relatedProjects?.length && <section className="engineering-section"><div className="container">
      <EngineeringHeading label="IN THE FIELD" title="Explore the implementation."><EngineeringLink to="/projects">All projects</EngineeringLink></EngineeringHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{relatedProjects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
    </div></section>}
    <CTASection title="Let’s connect this expertise to your facility." subtitle="Discuss your equipment, workflow and integration requirements with our engineering team." primaryAction={{ label: 'Contact engineering', href: '/contact' }} secondaryAction={{ label: 'Request a demo', href: '/request-demo' }} />
  </div>;
}
