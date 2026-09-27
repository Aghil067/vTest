import { useState } from 'react';
import { PageArtwork } from '@/components/common/PageArtwork';
import { Link } from 'react-router-dom';
import {
  Cpu,
  ArrowRight,
  Terminal,
  Server,
  Lock,
  Zap,
  Activity,
  CheckCircle2,
  Layers,
  Network,
  Eye,
  Database
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { technologyApi } from '@/services/api';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SectionHeader, CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

const ARCHITECTURE_LAYERS = [
  {
    id: 'l1',
    layer: 'Layer 01',
    title: 'Embedded Firmware & Sensor Acquisition',
    description: 'High-frequency deterministic I/O controllers, analog-to-digital sampling, and hardware calibration routines at the physical wheel and roller level.',
    icon: Cpu,
    protocols: ['CAN FD', 'RS-485 / Modbus', 'SPI / I2C', 'Direct ADC Ingestion'],
    stat: '1,000 Hz',
    statLabel: 'Sensor Sampling Rate'
  },
  {
    id: 'l2',
    layer: 'Layer 02',
    title: 'Real-Time Edge Telemetry & Field Bus',
    description: 'Autonomous lane controllers that aggregate multi-equipment signals, validate parity, and buffer telemetry locally during WAN dropouts.',
    icon: Network,
    protocols: ['OPC-UA', 'MQTT-SN', 'Modbus-TCP', 'Deterministic FIFO'],
    stat: '< 8 ms',
    statLabel: 'Hardware-to-Engine Latency'
  },
  {
    id: 'l3',
    layer: 'Layer 03',
    title: 'Edge Computer Vision & AI Inference',
    description: 'Sub-second optical inspection pipelines running localized neural models for tire wear analysis, chassis rust segmentation, and license plate recognition.',
    icon: Eye,
    protocols: ['TensorRT', 'OpenCV', 'YOLOv8 Custom Rigs', 'GigE Vision'],
    stat: '99.94%',
    statLabel: 'Anomaly Classification'
  },
  {
    id: 'l4',
    layer: 'Layer 04',
    title: 'Enterprise Cloud & Regulatory Compliance',
    description: 'Distributed synchronization backbones that format raw inspection curves into cryptographically signed ISO 17025 conformity records.',
    icon: Database,
    protocols: ['GraphQL / REST APIs', 'PostgreSQL Timescale', 'SHA-256 Audit Signatures', 'TLS 1.3 mTLS'],
    stat: 'Zero',
    statLabel: 'Measurement Data Loss'
  }
];

export function TechnologyListingPage() {
  const { data: technologies, loading } = useApi(async () => {
    return technologyApi.getTechnologies();
  });

  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="page page-technology-listing-page catalog-page">
      <SEOHead
        title="Technology & Engineering Architecture | Vtest Automotive Inspection"
        description="Explore Vtest's full-stack automotive engineering platform: embedded hardware drivers, sub-10ms sensor telemetry, edge computer vision, and compliance backbones."
        canonical="/technology"
      />

      {/* Hero Section */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Technology' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Cpu className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Technical Stack & Disciplines
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Full-Stack Architecture Built for <span className="gradient-text">Zero-Defect Testing</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              From microsecond hardware decoders to edge vision models and cloud regulatory backbones,
              our unified engineering platform ensures testing precision in mission-critical facilities.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/request-demo" className="btn-primary">
                Schedule Technical Review
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link to="/projects" className="btn-secondary">
                View Field Deployments
              </Link>
            </div>
          </div>
        </div>
        <PageArtwork kind="hardware" />
      </section>

      {/* Engineering Benchmarks Banner */}
      <section className="bg-[var(--site-surface-alt)] border-y border-[var(--stroke)] text-[var(--heading)] py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">&lt; 10 ms</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Telemetry Latency</p>
            </div>
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">100+ Standards</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">CAN, Modbus, OPC-UA</p>
            </div>
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">Zero-Loss</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Offline FIFO Storage</p>
            </div>
            <div className="space-y-1">
              <p className="text-[var(--accent)] font-black text-2xl tracking-tight">ISO 17025</p>
              <p className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">Calibrated Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive System Architecture Pipeline */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="System Architecture"
            title="The 4-Layer Testing Pipeline"
            subtitle="Engineered with clean separation of concerns, ensuring local hardware autonomy and resilient data orchestration."
            centered
            className="mb-14"
          />

          <div className="max-w-5xl mx-auto">
            {/* Layer Selection Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {ARCHITECTURE_LAYERS.map((layer, idx) => {
                const Icon = layer.icon;
                const isActive = activeLayer === idx;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(idx)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-left border transition-all ${
                      isActive
                        ? 'bg-[var(--accent-soft)] border-[var(--accent)] shadow-sm'
                        : 'bg-[var(--site-surface-alt)] border-[var(--stroke)] hover:border-[var(--muted)]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface)] text-[var(--accent)]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">{layer.layer}</span>
                      <span className="block text-xs font-bold text-[var(--heading)] line-clamp-1">{layer.title.split(' ')[0]} {layer.title.split(' ')[1]}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Layer Detail Display */}
            {ARCHITECTURE_LAYERS[activeLayer] && (() => {
              const item = ARCHITECTURE_LAYERS[activeLayer];
              const Icon = item.icon;
              return (
                <div className="p-8 sm:p-10 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-xs font-mono font-semibold text-[var(--accent)]">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.layer} &bull; Execution Level</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[var(--copy)] leading-relaxed text-base">
                        {item.description}
                      </p>
                      <div className="pt-2">
                        <span className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-2">Supported Protocols & Technologies:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.protocols.map((proto) => (
                            <span
                              key={proto}
                              className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--surface)] border border-[var(--stroke)] text-[var(--heading)]"
                            >
                              {proto}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--surface)] border border-[var(--stroke)] text-center space-y-2">
                      <Activity className="w-8 h-8 text-[var(--accent)] mb-1" />
                      <span className="text-3xl sm:text-4xl font-black text-[var(--heading)]">{item.stat}</span>
                      <span className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">{item.statLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Core Engineering Disciplines Grid */}
      <section className="py-20 bg-[var(--site-bg)] border-t border-[var(--stroke)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Disciplines & Domains"
            title="Core Engineering Competencies"
            subtitle="Explore our specialized practices designed to deliver resilient, turn-key testing environments."
            centered
            className="mb-14"
          />

          {loading ? (
            <CardGridSkeleton count={4} columns={2} />
          ) : technologies && technologies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {technologies.map((tech, idx) => (
                <article
                  key={tech.id}
                  className="group rounded-2xl bg-[var(--surface)] border border-[var(--stroke)] overflow-hidden shadow-sm hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden bg-[var(--site-surface-alt)]">
                    <img
                      src={tech.image || '/hero-bg.jpg'}
                      alt={tech.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-lg bg-[var(--surface)]/90 backdrop-blur-sm text-[var(--accent)] border border-[var(--stroke)]">
                        {String(idx + 1).padStart(2, '0')} // DISCIPLINE
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--heading)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                        {tech.title}
                      </h3>
                      <p className="text-[var(--copy)] leading-relaxed text-sm mb-6">
                        {tech.summary}
                      </p>

                      {tech.capabilities && tech.capabilities.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {tech.capabilities.slice(0, 3).map((cap, capIdx) => (
                            <div key={capIdx} className="flex items-start gap-2.5 text-xs text-[var(--copy)]">
                              <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                              <span className="font-medium text-[var(--heading)]">{cap.title}: <span className="text-[var(--copy)] font-normal">{cap.description}</span></span>
                            </div>
                          ))}
                        </div>
                      )}

                      {tech.concepts && tech.concepts.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--stroke)]">
                          {tech.concepts.slice(0, 4).map((concept) => (
                            <span
                              key={concept}
                              className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-[var(--accent-soft)] text-[var(--accent)]"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[var(--stroke)]">
                      <Link
                        to={`/technology/${tech.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline group-hover:gap-3 transition-all"
                      >
                        Explore Technical Specifications
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl p-12 text-center border border-[var(--stroke)] max-w-md mx-auto">
              <Cpu className="w-12 h-12 text-[var(--accent)] mx-auto mb-3" />
              <p className="text-[var(--copy)]">No technology disciplines available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Architectural Philosophy Section */}
      <section className="py-20 bg-[var(--surface)] border-t border-[var(--stroke)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[var(--heading)] tracking-tight mb-4">
              Our Architectural Philosophy
            </h2>
            <p className="text-[var(--copy)] max-w-2xl mx-auto">
              We design every component with three immutable tenets: zero data loss, open interoperability,
              and fault-tolerant local autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--heading)] text-lg">Offline-First Edge Resilience</h3>
              <p className="text-sm text-[var(--copy)] leading-relaxed">
                If the WAN or cloud connection drops, local lane controllers buffer test sequences and continue
                inspections without stopping physical vehicles.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--heading)] text-lg">Driver-Agnostic Abstraction</h3>
              <p className="text-sm text-[var(--copy)] leading-relaxed">
                Our modular driver architecture isolates business logic from hardware nuances, allowing
                seamless upgrades of physical measurement sensors.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--site-surface-alt)] border border-[var(--stroke)] space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--heading)] text-lg">Cryptographic Audit Trails</h3>
              <p className="text-sm text-[var(--copy)] leading-relaxed">
                Raw sensor measurements are signed directly at ingestion, creating an immutable log
                immune to post-facto operator tampering or compliance fraud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Looking for Custom Testing Engineering or Integrations?"
        subtitle="Our software architects and embedded hardware engineers can co-develop custom solutions with your engineering teams."
        primaryAction={{ label: 'Contact Engineering', href: '/contact' }}
        secondaryAction={{ label: 'Request Demo', href: '/request-demo' }}
      />
    </div>
  );
}
