import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  light?: boolean;
  variant?: 'light' | 'dark';
}

export function Breadcrumbs({ items, className, light = false, variant }: BreadcrumbsProps) {
  const isLight = light || variant === 'dark'; // on dark backgrounds, we want light breadcrumbs text

  // Avoid duplicate Home if caller already passed Home as first item
  const allItems: BreadcrumbItem[] =
    items.length > 0 && items[0].label.toLowerCase() === 'home'
      ? items
      : [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-sm', className)}
    >
      <ol className="flex items-center gap-1 flex-wrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && (
                <Home
                  className="w-3.5 h-3.5 mr-0.5 text-green-400"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  className="font-medium text-[var(--heading)]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="hover:underline transition-colors text-[var(--copy)] hover:text-[var(--heading)]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--copy)]">
                      {item.label}
                    </span>
                  )}
                  <ChevronRight
                    className="w-3.5 h-3.5 flex-shrink-0 text-green-400/70"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
