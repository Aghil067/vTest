import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { projectApi } from '@/services/api';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';
import { EngineeringHero, EngineeringHeading, EngineeringImage, EngineeringLink, EngineeringTags } from '@/components/common/EngineeringLayout';

const categories = ['All Deployments', 'Equipment Integration', 'PTI & Test Lanes', 'Enterprise Compliance'];

export function ProjectsListingPage() {
  const { data: projects, loading, error, refetch } = useApi(() => projectApi.getProjects());
  const [selectedCategory, setSelectedCategory] = useState('All Deployments');
  const filteredProjects = (projects || []).filter(p => {
    if (selectedCategory === 'All Deployments') return true;
    if (selectedCategory === 'Equipment Integration') return p.title.toLowerCase().includes('integration') || p.summary.toLowerCase().includes('equipment');
    if (selectedCategory === 'PTI & Test Lanes') return p.title.toLowerCase().includes('lane') || p.summary.toLowerCase().includes('inspection');
    return true;
  });
  return <div className="page engineering-page projects-page">
    <SEOHead title="Projects & Case Studies | Vetest" description="Explore Vetest vehicle inspection, testing and equipment integration projects." canonical="/projects" />
    <EngineeringHero section="Projects" title="Engineering, put into practice." summary="Explore the facilities, equipment and systems we help connect. Every project starts with an operational challenge and a clear path forward." image={projects?.[0]?.heroImage} caption="VETEST / PROJECTS & IMPLEMENTATIONS">
      <Link to="/request-demo" className="btn-primary">Discuss your deployment <ArrowRight size={17} /></Link><EngineeringLink to="/solutions">Explore solutions</EngineeringLink>
    </EngineeringHero>
    <section className="engineering-section">
      <div className="container">
        <EngineeringHeading label="01 / SELECTED WORK" title="Inside the implementation."><p>Discover the context, engineering approach and capabilities behind each project.</p></EngineeringHeading>
        <div className="project-browser">
          <div className="project-filters" aria-label="Filter projects">{categories.map(category => <button key={category} type="button" aria-pressed={category === selectedCategory} onClick={() => setSelectedCategory(category)}>{category}</button>)}</div>
          {!loading && !error && <span className="project-count" aria-live="polite">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</span>}
        </div>
        {loading ? <CardGridSkeleton count={2} columns={2} /> : error ? <div className="engineering-empty"><p>We couldn’t load the projects.</p><button className="btn-secondary" onClick={refetch}>Try again</button></div> : filteredProjects.length ?
          <div className="project-stories">{filteredProjects.map((project, i) => <article key={project.id} className={'project-story' + (selectedCategory === 'All Deployments' && i === 0 ? ' project-story--featured' : '')} data-reveal="card">
            <Link to={'/projects/' + project.slug} className="engineering-image-link" aria-label={'View ' + project.title}><EngineeringImage src={project.heroImage} alt={project.title} /></Link>
            <div className="project-story__copy"><span className="section-kicker">{project.clientOrProjectName || 'VETEST PROJECT'}</span><h2><Link to={'/projects/' + project.slug}>{project.title}</Link></h2><p>{project.summary}</p><EngineeringTags items={project.technologies?.slice(0, 4)} /><EngineeringLink to={'/projects/' + project.slug}>View the case study</EngineeringLink></div>
          </article>)}</div> : <div className="engineering-empty"><h3>No projects in this view yet.</h3><p>Explore all deployments or discuss your requirements with our team.</p><button className="btn-secondary" onClick={() => setSelectedCategory('All Deployments')}>View all deployments</button></div>}
      </div>
    </section>
    <section className="engineering-section"><div className="container">
      <EngineeringHeading label="02 / WORKING TOGETHER" title="A clear route from brief to testing." />
      <div className="engineering-principles">{[{ title: 'Understand the operation', text: 'Start with the equipment, site conditions and workflows that shape your facility.' }, { title: 'Connect the right systems', text: 'Bring software, hardware and integration requirements into a coordinated solution.' }, { title: 'Support the implementation', text: 'Work through deployment, operator handover and the ongoing needs of the testing environment.' }].map((step, i) => <article key={step.title} data-reveal="card"><span className="engineering-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </div></section>
    <CTASection title="What could your facility do next?" subtitle="Share your project requirements and explore an implementation with Vetest." primaryAction={{ label: 'Start a conversation', href: '/contact' }} secondaryAction={{ label: 'Request a demo', href: '/request-demo' }} />
  </div>;
}
