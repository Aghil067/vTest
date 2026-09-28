import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function EngineeringImage({ src, alt, caption, eager = false }: { src?: string; alt: string; caption?: string; eager?: boolean }) {
  const [failedSource, setFailedSource] = useState<string>();
  const image = src || '/hero-bg.jpg';
  return <figure className="engineering-image">
    {failedSource === image ? <div className="engineering-image__placeholder"><ImageOff size={32} aria-hidden="true" /><span>{alt}</span></div> :
      <img src={image} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailedSource(image)} />}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

export function EngineeringHero({ section, title, summary, image, caption, children, detail = false }: {
  section: 'Technology' | 'Projects'; title: string; summary: string; image?: string; caption: string; children?: ReactNode; detail?: boolean;
}) {
  return <section className="engineering-hero">
    <div className="container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: section, ...(detail ? { href: `/${section.toLowerCase()}` } : {}) }, ...(detail ? [{ label: title }] : [])]} />
      <div className="engineering-hero__layout">
        <div className="engineering-hero__copy">
          <span className="section-kicker">VTEST / {section === 'Technology' ? 'ENGINEERING EXPERTISE' : 'IN THE FIELD'}</span>
          <h1>{title}</h1><p>{summary}</p>
          <div className="engineering-actions">{children}</div>
        </div>
        <EngineeringImage src={image} alt={detail ? title : 'Vehicle testing and inspection equipment'} caption={caption} eager />
      </div>
    </div>
  </section>;
}

export function EngineeringHeading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <div className="engineering-heading"><div><span className="section-kicker">{label}</span><h2>{title}</h2></div>{children && <div className="engineering-heading__aside">{children}</div>}</div>;
}

export function EngineeringLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="engineering-link" to={to}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}

export function EngineeringTags({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return <ul className="engineering-tags" aria-label="Technologies">{items.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</ul>;
}
