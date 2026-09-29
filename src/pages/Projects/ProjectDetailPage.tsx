import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { projectApi, productApi } from '@/services/api';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ProductCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';
import { EngineeringHero, EngineeringHeading, EngineeringImage, EngineeringLink, EngineeringTags } from '@/components/common/EngineeringLayout';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, loading } = useApi(async () => slug ? projectApi.getProjectBySlug(slug) : null);
  const { data: relatedProducts } = useApi(async () => {
    if (!project?.relatedProductIds?.length) return [];
    return (await productApi.getProducts()).filter(p => project.relatedProductIds?.includes(p.id));
  });
  if (loading) return <DetailPageSkeleton />;
  if (!project) return <div className="py-20"><NotFoundState title="Case Study Not Found" message="The requested implementation case study could not be found." actionText="View All Projects" actionHref="/projects" /></div>;

  return <div className="page engineering-page engineering-detail projects-page">
    <SEOHead title={project.seoTitle || project.title + ' | Vetest Case Study'} description={project.seoDescription || project.summary} canonical={'/projects/' + project.slug} />
    <EngineeringHero section="Projects" title={project.title} summary={project.summary} image={project.heroImage} caption={project.clientOrProjectName || 'VETEST / PROJECT IMPLEMENTATION'} detail>
      <Link to="/request-demo" className="btn-primary">Plan a similar project <ArrowRight size={17} /></Link><EngineeringLink to="/contact">Talk to our team</EngineeringLink>
    </EngineeringHero>
    <section className="engineering-section">
      <div className="container">
        <div className="project-facts"><div><span className="section-kicker">CLIENT / PROJECT</span><strong>{project.clientOrProjectName}</strong></div><div><span className="section-kicker">TECHNOLOGIES</span><EngineeringTags items={project.technologies} />{!project.technologies?.length && <strong>Vetest engineering</strong>}</div></div>
        <div className="engineering-reading-layout">
          <nav className="engineering-outline" aria-label="On this page">
            <span className="section-kicker">THE PROJECT STORY</span>
            <a href="#project-overview">Overview <ArrowUpRight size={15} /></a>
            {(project.problem || project.vtestContribution) && <a href="#project-approach">Challenge & approach <ArrowUpRight size={15} /></a>}
            {!!project.capabilities?.length && <a href="#project-delivery">Delivered capabilities <ArrowUpRight size={15} /></a>}
            {!!project.images?.length && <a href="#project-gallery">In the field <ArrowUpRight size={15} /></a>}
            <EngineeringLink to="/contact">Discuss a project</EngineeringLink>
          </nav>
          <div className="engineering-reading-body">
            <section className="engineering-chapter" id="project-overview">
              <span className="section-kicker">01 / THE CONTEXT</span><h2>Where the project began.</h2>
              <div className="engineering-prose"><p>{project.description}</p>{project.businessContext && <div className="engineering-context"><h3>The operating environment</h3><p>{project.businessContext}</p></div>}</div>
            </section>
            {(project.problem || project.vtestContribution) && <section className="engineering-chapter" id="project-approach">
              <span className="section-kicker">02 / THE APPROACH</span><h2>From challenge to implementation.</h2>
              <div className="project-approach">{project.problem && <article><span className="engineering-number">THE CHALLENGE</span><h3>Understand the starting point.</h3><p>{project.problem}</p></article>}{project.vtestContribution && <article><span className="engineering-number">THE VETEST CONTRIBUTION</span><h3>Connect the solution.</h3><p>{project.vtestContribution}</p></article>}</div>
            </section>}
            {!!project.capabilities?.length && <section className="engineering-chapter" id="project-delivery">
              <span className="section-kicker">03 / DELIVERED WORK</span><h2>Capabilities brought together.</h2>
              <div className="engineering-capabilities">{project.capabilities.map((cap, i) => <article key={i} data-reveal="card"><span className="engineering-number">{String(i + 1).padStart(2, '0')}</span><h3>{cap}</h3></article>)}</div>
            </section>}
            {!!project.images?.length && <section className="engineering-chapter" id="project-gallery">
              <span className="section-kicker">04 / IN THE FIELD</span><h2>A closer look at the project.</h2>
              <div className="engineering-gallery">{project.images.map((image, i) => <EngineeringImage key={i} src={image.url} alt={image.altText || project.title} caption={image.caption} />)}</div>
            </section>}
          </div>
        </div>
      </div>
    </section>
    {!!relatedProducts?.length && <section className="engineering-section"><div className="container">
      <EngineeringHeading label="PART OF THE SOLUTION" title="Products behind the project." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{relatedProducts.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </div></section>}
    <CTASection title="Your facility. The next project." subtitle="Share your testing requirements and explore the right combination of equipment, software and integration." primaryAction={{ label: 'Start your project', href: '/contact' }} secondaryAction={{ label: 'View all projects', href: '/projects' }} />
  </div>;
}
