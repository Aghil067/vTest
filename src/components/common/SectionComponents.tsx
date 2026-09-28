import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---- Section Header ----

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('section-heading max-w-3xl', centered && 'mx-auto text-center', className)}>
      {label && (
        <div className={cn('flex items-center gap-2 mb-4', centered && 'justify-center')}>
          <div className="w-6 h-px" style={{ background: 'var(--accent)' }} />
          <span
            className="text-xs font-bold uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}
          >
            {label}
          </span>
          {centered && <div className="w-6 h-px" style={{ background: 'var(--accent)' }} />}
        </div>
      )}
      <h2
        className={cn('text-3xl sm:text-4xl font-black tracking-tight text-[var(--heading)]', titleClassName)}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--copy)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---- CTA Section ----

interface ActionItem {
  label: string;
  href: string;
}

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryId?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  primaryAction?: ActionItem;
  secondaryAction?: ActionItem;
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  primaryId,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  primaryAction,
  secondaryAction,
  className,
}: CTASectionProps) {
  const pLabel = primaryAction ? primaryAction.label : primaryLabel || 'Get Started';
  const pHref = primaryAction ? primaryAction.href : primaryHref || '/contact';
  const sLabel = secondaryAction ? secondaryAction.label : secondaryLabel;
  const sHref = secondaryAction ? secondaryAction.href : secondaryHref;

  return (
    <section className={cn('conversion-band', className)}>
      <div className="container conversion-layout">
        <div className="conversion-copy">
          <span className="section-kicker">LET'S BUILD YOUR NEXT TESTING SYSTEM</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          <div className="conversion-actions">
            <Link id={primaryId} to={pHref} className="btn-primary">{pLabel}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            {sLabel && sHref && <Link to={sHref} className="btn-secondary">{sLabel}</Link>}
          </div>
        </div>
        <figure className="conversion-visual photo-surface" data-reveal="card">
          <img src="/automobile-testing-product.jpg" width="1376" height="768" alt="Automobile testing and diagnostic workstation product" loading="lazy" decoding="async" />
          <figcaption><span>VTEST / TESTING PRODUCT SUITE</span><ArrowUpRight size={24} aria-hidden="true" /></figcaption>
        </figure>
      </div>
    </section>
  );
}
