import { Link } from 'react-router-dom';
import { Home, Layers } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';

export function NotFoundPage() {
  return (
    <div className="page page-not-found-page editorial-page">
      <SEOHead
        title="404 — Page Not Found | Vtest"
        description="The page you requested could not be located. Browse our testing software, hardware products, or return to the Vtest homepage."
      />

      <section className="page-hero min-h-[75vh] flex items-center justify-center bg-[var(--site-bg)] py-20 px-4">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="space-y-4">
            <span className="text-8xl font-black text-green-400 tracking-tighter">404</span>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--heading)] tracking-tight">
              Page Not Found
            </h1>
            <p className="text-[var(--copy)] text-base leading-relaxed max-w-md mx-auto">
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/products" className="btn-secondary">
              <Layers className="w-4 h-4" />
              Browse Products
            </Link>
          </div>

          <div className="pt-8 border-t border-[var(--stroke)]">
            <p className="text-xs uppercase font-bold text-[var(--muted)] tracking-wider mb-4">
              Popular Destinations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <Link
                to="/products/software"
                className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--stroke)] text-[var(--heading)] font-semibold hover:border-green-500 hover:text-green-400 transition-colors"
              >
                Software
              </Link>
              <Link
                to="/products/hardware"
                className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--stroke)] text-[var(--heading)] font-semibold hover:border-green-500 hover:text-green-400 transition-colors"
              >
                Hardware
              </Link>
              <Link
                to="/solutions"
                className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--stroke)] text-[var(--heading)] font-semibold hover:border-green-500 hover:text-green-400 transition-colors"
              >
                Solutions
              </Link>
              <Link
                to="/contact"
                className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--stroke)] text-[var(--heading)] font-semibold hover:border-green-500 hover:text-green-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
