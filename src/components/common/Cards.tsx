import { Link } from 'react-router-dom';
import { ArrowRight, Star, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product, Solution, Industry, Technology, Project, Resource } from '@/types';

const G = '#2ECC71';
const BORDER = 'var(--stroke)';
const BG = 'var(--surface)';
const BG2 = 'var(--surface)';

// ==========================================
// PRODUCT CARD
// ==========================================

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const href =
    product.type === 'SOFTWARE'
      ? `/products/software/${product.slug}`
      : `/products/hardware/${product.slug}`;

  return (
    <article
      className={cn('marketing-card group flex flex-col overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-lg', className)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-[var(--site-surface-alt)]">
        <img
          src={product.heroImage || '/automotive-studio-900.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/automotive-studio-900.jpg'; }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent"
        />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex gap-2">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-sm"
          >
            {product.type === 'SOFTWARE' ? 'Software' : 'Hardware'}
          </span>
          {product.featured && (
            <span
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30 backdrop-blur-sm"
            >
              <Star className="w-2.5 h-2.5 fill-amber-500" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="text-lg font-bold text-[var(--heading)] mb-2 transition-colors group-hover:text-[var(--accent)] line-clamp-1"
          style={{ lineHeight: '1.3' }}
        >
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-5 line-clamp-2 text-[var(--copy)]">
          {product.shortDescription}
        </p>
        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-[var(--accent)] group-hover:gap-2.5"
          aria-label={`View details for ${product.name}`}
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

// ==========================================
// SOLUTION CARD
// ==========================================

interface SolutionCardProps {
  solution: Solution;
  variant?: 'default' | 'compact';
  className?: string;
}

export function SolutionCard({ solution, variant = 'default', className }: SolutionCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        to={`/solutions/${solution.slug}`}
        className={cn('marketing-card group block p-5 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-lg', className)}
      >
        <h3 className="font-bold text-[var(--heading)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {solution.title}
        </h3>
        <p className="text-sm line-clamp-2 mb-3 text-[var(--copy)]">{solution.summary}</p>
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent)] group-hover:gap-2.5 transition-all">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    );
  }

  return (
    <article
      className={cn('marketing-card group overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-lg', className)}
    >
      <div className="relative h-48 overflow-hidden bg-[var(--site-surface-alt)]">
        <img
          src={solution.image || '/automotive-studio-900.jpg'}
          alt={solution.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/automotive-studio-900.jpg'; }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent"
        />
        <div className="absolute top-3.5 left-3.5">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-sm"
          >
            Solution
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-[var(--heading)] mb-2 text-lg group-hover:text-[var(--accent)] transition-colors line-clamp-1">
          {solution.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 line-clamp-2 text-[var(--copy)]">
          {solution.summary}
        </p>
        <Link
          to={`/solutions/${solution.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-[var(--accent)] group-hover:gap-2.5"
        >
          Learn More <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

// ==========================================
// INDUSTRY CARD
// ==========================================

interface IndustryCardProps {
  industry: Industry;
  className?: string;
}

export function IndustryCard({ industry, className }: IndustryCardProps) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className={cn('industry-card photo-surface group relative block overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-xl', className)}
      style={{ aspectRatio: '4/3' }}
    >
      <img
        src={industry.image || '/automotive-studio-900.jpg'}
        alt={industry.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/automotive-studio-900.jpg'; }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/90 via-[var(--black)]/40 50% to-transparent"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--accent)]/10"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-lg font-bold text-white mb-1.5">{industry.title}</h3>
        <p
          className="text-sm text-slate-200 opacity-90 line-clamp-2 mb-2 font-normal"
        >
          {industry.summary}
        </p>
        <div
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent)] transition-all duration-300 group-hover:gap-2.5"
        >
          Explore Industry <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

// ==========================================
// TECHNOLOGY CARD
// ==========================================

interface TechnologyCardProps {
  technology: Technology;
  className?: string;
}

export function TechnologyCard({ technology, className }: TechnologyCardProps) {
  return (
    <Link
      to={`/technology/${technology.slug}`}
      className={cn('marketing-card technology-card group block p-6 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-lg', className)}
    >
      <div className="technology-card__visual mb-5 rounded-xl overflow-hidden h-40 bg-[var(--site-surface-alt)]">
        <img src={technology.image || '/hero-bg.jpg'} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-[var(--accent-soft)] text-[var(--accent)]"
      >
        <Cpu className="w-5 h-5" aria-hidden="true" />
      </div>
      <h3 className="font-bold text-[var(--heading)] mb-2 text-lg group-hover:text-[var(--accent)] transition-colors line-clamp-1">
        {technology.title}
      </h3>
      <p className="text-sm leading-relaxed line-clamp-2 text-[var(--copy)] mb-4">
        {technology.summary}
      </p>
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent)] group-hover:gap-2.5 transition-all">
        <span>Explore Architecture</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

// ==========================================
// PROJECT CARD
// ==========================================

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn('marketing-card group overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-lg', className)}
    >
      <div className="relative h-52 overflow-hidden bg-[var(--site-surface-alt)]">
        <img
          src={project.heroImage || '/automotive-studio-900.jpg'}
          alt={project.clientOrProjectName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/automotive-studio-900.jpg'; }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 via-transparent to-transparent"
        />
        <div className="absolute top-3.5 left-3.5">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-sm"
          >
            Case Study
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1.5 text-[var(--accent)]">
          {project.clientOrProjectName}
        </div>
        <h3 className="font-bold text-[var(--heading)] mb-2 text-lg group-hover:text-[var(--accent)] transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2 text-[var(--copy)]">
          {project.summary}
        </p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[var(--site-surface-alt)] text-[var(--heading)] border border-[var(--stroke)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-[var(--accent)] group-hover:gap-2.5"
        >
          View Case Study <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

// ==========================================
// RESOURCE CARD
// ==========================================

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const typeLabel = { BROCHURE: 'Brochure', DATASHEET: 'Datasheet', ARTICLE: 'Article' }[resource.type];
  const actionLabel = resource.type === 'ARTICLE' ? 'Read Article' : 'View Resource';

  return (
    <article
      className={cn('marketing-card group flex flex-col overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] transition-all duration-300 hover:shadow-lg', className)}
    >
      <div className="h-44 overflow-hidden bg-[var(--site-surface-alt)] relative">
        <img
          src={resource.image || '/hero-bg.jpg'}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/hero-bg.jpg'; }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/70 via-transparent to-transparent"
        />
        <div className="absolute top-3.5 left-3.5">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-sm"
          >
            {typeLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        {resource.publishedAt && (
          <span className="text-[11px] font-mono text-[var(--muted)] mb-2">
            {new Date(resource.publishedAt).toLocaleDateString('en-GB', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        )}
        <h3 className="font-bold text-[var(--heading)] mb-2 text-lg group-hover:text-[var(--accent)] transition-colors line-clamp-1">
          {resource.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-5 line-clamp-2 text-[var(--copy)]">
          {resource.summary}
        </p>
        <Link
          to={`/resources/${resource.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-[var(--accent)] group-hover:gap-2.5"
        >
          {actionLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
