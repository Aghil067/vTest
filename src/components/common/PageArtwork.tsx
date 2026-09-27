import { Activity, Cpu, Layers, Network, FileText, Check, ArrowUpRight } from 'lucide-react';

type ArtworkKind = 'software' | 'hardware' | 'network' | 'resources' | 'facility' | 'vehicle';

/** Editorial artwork, not an interactive dashboard or a source of live metrics. */
export function PageArtwork({ kind }: { kind: ArtworkKind }) {
  if (kind === 'vehicle' || kind === 'facility') {
    return (
      <div className={`photo-surface page-artwork page-artwork--photo page-artwork--${kind}`} aria-hidden="true">
        <img src={kind === 'vehicle' ? '/automotive-studio.jpg' : '/hero-bg.jpg'} srcSet={kind === 'vehicle' ? '/automotive-studio-900.jpg 900w, /automotive-studio.jpg 1536w' : undefined} sizes="(max-width: 1023px) 90vw, 570px" alt="" width="1536" height="1024" decoding="async" />
        <div className="page-artwork__photo-shade" />
        <span className="artwork-caption">VTEST / ENGINEERED FOR PRECISION</span>
      </div>
    );
  }
  return (
    <div className={`photo-surface page-artwork page-artwork--${kind}`} aria-hidden="true">
      <div className="artwork-orbit" />
      {kind === 'software' && (
        <div className="software-art">
          <div className="art-panel__bar"><span className="art-dot" /> VTEST / INSPECTION INTELLIGENCE <Activity size={15} /></div>
          <div className="software-art__body">
            <div className="software-art__rail"><Layers /><Activity /><Network /></div>
            <div className="software-art__main">
              <span className="art-label">ONE CONNECTED PLATFORM</span>
              <strong>Every lane.<br />In sync.</strong>
              <svg viewBox="0 0 320 85" fill="none" focusable="false"><path d="M0 70H320M0 40H320M0 10H320" stroke="#ffffff0d" /><path className="art-wave" d="M0 65L35 65L49 42L65 58L94 58L116 13L136 70L157 42L180 42L197 25L221 48L243 37L270 37L290 17L320 17" stroke="#60df9a" strokeWidth="2" /></svg>
              <div className="software-art__tiles"><span><Check size={14} /> Inspect</span><span><Check size={14} /> Connect</span><span><Check size={14} /> Analyze</span></div>
            </div>
          </div>
          <div className="art-panel__footer">SOFTWARE + HARDWARE + AUTOMATION <ArrowUpRight size={14} /></div>
        </div>
      )}
      {kind === 'hardware' && (
        <div className="hardware-art">
          <div className="hardware-art__board"><div className="hardware-art__pins" /><div className="hardware-art__chip"><Cpu size={52} strokeWidth={1} /><strong>VTEST</strong><span>PRECISION AT THE EDGE</span></div><div className="hardware-art__ports">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div></div>
          <div className="artwork-caption">INDUSTRIAL CONTROL / CONNECTED BY DESIGN</div>
        </div>
      )}
      {kind === 'network' && (
        <div className="network-art">
          <div className="network-art__ring" /><div className="network-art__ring network-art__ring--inner" />
          <div className="network-art__core"><Network size={36} strokeWidth={1.2} /><strong>VTEST</strong></div>
          {['SOFTWARE', 'HARDWARE', 'ANALYTICS', 'AUTOMATION'].map((label, i) => <div className={`network-art__node network-art__node--${i}`} key={label}><span className="art-dot" />{label}</div>)}
          <div className="artwork-caption">ONE INTEGRATED TECHNOLOGY ECOSYSTEM</div>
        </div>
      )}
      {kind === 'resources' && (
        <div className="resources-art">
          <div className="resources-art__back" />
          <div className="resources-art__sheet"><span className="art-label">VTEST / KNOWLEDGE CENTER</span><FileText size={42} strokeWidth={1} /><strong>Engineering<br />in detail.</strong><i /><i /><i /><div className="art-panel__footer">GUIDES & TECHNICAL RESOURCES <ArrowUpRight size={18} /></div></div>
        </div>
      )}
    </div>
  );
}
