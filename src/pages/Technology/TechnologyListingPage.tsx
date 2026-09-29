import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Network, Eye, Database } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { technologyApi } from '@/services/api';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';
import { EngineeringHero, EngineeringHeading, EngineeringImage, EngineeringLink, EngineeringTags } from '@/components/common/EngineeringLayout';

const layers = [
  { title: 'Sense & measure', name: 'Embedded engineering', description: 'Connect sensors and testing equipment to the inspection workflow. Embedded controllers handle measurement acquisition and equipment interfaces close to the vehicle.', icon: Cpu, protocols: ['CAN', 'RS-485 / Modbus', 'Sensor interfaces'] },
  { title: 'Control the lane', name: 'Edge connectivity', description: 'Coordinate equipment signals and lane operations through a common control layer. Keep the operator, measurement sequence and equipment working together.', icon: Network, protocols: ['OPC-UA', 'MQTT', 'Modbus-TCP'] },
  { title: 'See the details', name: 'Vision & automation', description: 'Bring optical inspection and automated workflows into the same environment, helping teams capture and interpret vehicle inspection information.', icon: Eye, protocols: ['Computer vision', 'Image processing', 'Equipment automation'] },
  { title: 'Connect the results', name: 'Software & data', description: 'Move inspection results into management platforms, reporting tools and connected business systems through a structured software layer.', icon: Database, protocols: ['APIs & integration', 'Data management', 'Inspection reporting'] },
];

export function TechnologyListingPage() {
  const { data: technologies, loading, error, refetch } = useApi(() => technologyApi.getTechnologies());
  const [activeLayer, setActiveLayer] = useState(0);
  const layer = layers[activeLayer];
  const Icon = layer.icon;
  return <div className="page engineering-page technology-page">
    <SEOHead title="Technology & Engineering | Vetest" description="Explore the software, hardware and integration expertise behind Vetest vehicle testing systems." canonical="/technology" />
    <EngineeringHero section="Technology" title="Engineering that connects the whole test lane." summary="Software, hardware and automation designed to work together. Explore the expertise behind a clearer, more connected inspection process." image={technologies?.[0]?.image} caption="SOFTWARE / HARDWARE / AUTOMATION">
      <Link to="/request-demo" className="btn-primary">Discuss your requirements <ArrowRight size={17} /></Link>
      <EngineeringLink to="/projects">See our work</EngineeringLink>
    </EngineeringHero>
    <section className="engineering-section">
      <div className="container">
        <EngineeringHeading label="01 / CONNECTED BY DESIGN" title="From the sensor to the decision."><p>Explore how each layer contributes to one coordinated testing environment.</p></EngineeringHeading>
        <div className="architecture-workbench">
          <div className="architecture-options" aria-label="Architecture layers">
            {layers.map((item, i) => <button key={item.name} type="button" aria-pressed={i === activeLayer} aria-controls="architecture-detail" onClick={() => setActiveLayer(i)}><span className="engineering-number">0{i + 1}</span><span><strong>{item.title}</strong><small>{item.name}</small></span><ArrowRight size={17} aria-hidden="true" /></button>)}
          </div>
          <div className="architecture-detail" id="architecture-detail">
            <div className="architecture-diagram" aria-hidden="true">{layers.map((item, i) => { const Node = item.icon; return <div key={item.name} className={i === activeLayer ? 'is-active' : ''}><Node size={25} strokeWidth={1.5} /><span>0{i + 1}</span></div>; })}</div>
            <div className="architecture-detail__copy" aria-live="polite"><Icon size={24} aria-hidden="true" /><h3>{layer.name}</h3><p>{layer.description}</p><EngineeringTags items={layer.protocols} /></div>
          </div>
        </div>
      </div>
    </section>
    <section className="engineering-section">
      <div className="container">
        <EngineeringHeading label="02 / OUR DISCIPLINES" title="Expertise with a practical purpose."><p>Discover the capabilities that bring your testing requirements to life.</p></EngineeringHeading>
        {loading ? <CardGridSkeleton count={4} columns={2} /> : error ? <div className="engineering-empty"><p>We couldn’t load the engineering disciplines.</p><button className="btn-secondary" onClick={refetch}>Try again</button></div> : technologies?.length ?
          <div className="discipline-index">{technologies.map((tech, i) => <article className="discipline-story" key={tech.id} data-reveal="card">
            <Link to={'/technology/' + tech.slug} aria-label={'Explore ' + tech.title} className="engineering-image-link"><EngineeringImage src={tech.image} alt={tech.title} /></Link>
            <div className="discipline-story__copy"><span className="engineering-number">DISCIPLINE / {String(i + 1).padStart(2, '0')}</span><h2><Link to={'/technology/' + tech.slug}>{tech.title}</Link></h2><p>{tech.summary}</p><EngineeringTags items={tech.concepts?.slice(0, 4)} /><EngineeringLink to={'/technology/' + tech.slug}>Explore this discipline</EngineeringLink></div>
          </article>)}</div> : <div className="engineering-empty"><p>Engineering disciplines will appear here as they are published.</p><EngineeringLink to="/contact">Talk to our team</EngineeringLink></div>}
      </div>
    </section>
    <CTASection title="Bring your next testing challenge to us." subtitle="Talk through equipment, software and integration requirements with the Vetest team." primaryAction={{ label: 'Contact engineering', href: '/contact' }} secondaryAction={{ label: 'Request a demo', href: '/request-demo' }} />
  </div>;
}
