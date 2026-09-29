import { ApplicationList } from '@/components/common/DetailLists';
import { useParams, Link } from 'react-router-dom';
import { HardDrive, CheckCircle2, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { productApi } from '@/services/api';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ProductCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function HardwareDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, loading } = useApi(async () => {
    if (!slug) return null;
    return productApi.getProductBySlug(slug);
  });

  const { data: relatedProducts } = useApi(async () => {
    const all = await productApi.getHardwareProducts();
    return all.filter((p) => p.slug !== slug).slice(0, 3);
  });

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!product) {
    return (
      <div className="py-20">
        <NotFoundState
          title="Hardware Product Not Found"
          message="The requested hardware unit or model could not be found or may have been superseded."
          actionText="Browse Hardware Products"
          actionHref="/products/hardware"
        />
      </div>
    );
  }

  return (
    <div className="page page-hardware-detail-page detail-page">
      <SEOHead
        title={product.seoTitle || `${product.name} | Vetest Hardware`}
        description={product.seoDescription || product.shortDescription}
        canonical={`/products/hardware/${product.slug}`}
      />

      {/* Header Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Hardware', href: '/products/hardware' },
              { label: product.name },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1">
                <HardDrive className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                  Industrial Hardware
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-lg text-[var(--copy)] leading-relaxed max-w-2xl">
                {product.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to={`/request-quote?product=${encodeURIComponent(product.name)}`}
                  className="btn-primary"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={`/request-demo?product=${encodeURIComponent(product.name)}`}
                  className="btn-secondary"
                >
                  Schedule Demo
                </Link>
                {product.datasheetUrl && (
                  <a
                    href={product.datasheetUrl}
                    download
                    className="btn-white-outline"
                  >
                    <Download className="w-4 h-4" />
                    Download Datasheet
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--stroke)] bg-[var(--site-bg)]">
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-72 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="detail-content-layout grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left 2 Cols: Description, Specs, Features, Industrial Certs */}
            <div className="lg:col-span-2 space-y-14">
              {/* Detailed Description */}
              <div>
                <h2 className="text-2xl font-black text-[var(--heading)] mb-4 tracking-tight">
                  Product Overview & Engineering
                </h2>
                <div className="prose prose-blue text-[var(--copy)] leading-relaxed text-base">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Technical Specifications Table */}
              {product.specifications && product.specifications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-[var(--heading)] mb-4 tracking-tight">
                    Technical Specifications
                  </h2>
                  <div className="border border-[var(--stroke)] rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[var(--surface)] border-b border-[var(--stroke)] text-[var(--heading)] font-bold">
                        <tr>
                          <th className="py-3 px-4">Parameter / Metric</th>
                          <th className="py-3 px-4">Value / Tolerance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--stroke)]">
                        {product.specifications.map((spec) => (
                          <tr key={spec.id} className="hover:bg-[var(--surface)]">
                            <td className="py-3 px-4 font-medium text-[var(--heading)]">{spec.name}</td>
                            <td className="py-3 px-4 text-[var(--copy)] font-mono text-xs">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-[var(--heading)] mb-6 tracking-tight">
                    Hardware Capabilities & Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {product.features.map((feature) => (
                      <div
                        key={feature.id}
                        className="bg-[var(--surface)] border border-[var(--stroke)] rounded-2xl p-5 hover:border-[var(--accent)] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm mb-3">
                          <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <h3 className="font-bold text-[var(--heading)] text-base mb-1.5">{feature.title}</h3>
                        <p className="text-sm text-[var(--copy)] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases & Applications */}
              {product.useCases && product.useCases.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-[var(--heading)] mb-4 tracking-tight">
                    Recommended Applications
                  </h2>
                  <ApplicationList items={product.useCases} />
                </div>
              )}
            </div>

            {/* Right Col: Quick Specs Card, Downloads, Quote Form Prompt */}
            <div className="space-y-6">
              <div className="detail-sidebar bg-[var(--surface)] border border-[var(--stroke)] rounded-2xl p-6 space-y-6 sticky top-28">
                <h3 className="text-lg font-black text-[var(--heading)]">Unit Specifications</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-[var(--stroke)]">
                    <span className="text-[var(--copy)]">Classification:</span>
                    <span className="font-semibold text-[var(--heading)]">
                      {product.category?.name || 'Testing Hardware'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--stroke)]">
                    <span className="text-[var(--copy)]">Form Factor:</span>
                    <span className="font-semibold text-[var(--heading)]">DIN Rail / 19&quot; Rack</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--stroke)]">
                    <span className="text-[var(--copy)]">Protection:</span>
                    <span className="font-semibold text-[var(--heading)]">IP65 Industrial</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--stroke)]">
                    <span className="text-[var(--copy)]">Warranty:</span>
                    <span className="font-semibold text-[var(--heading)]">3 Years Standard</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Link
                    to={`/request-quote?product=${encodeURIComponent(product.name)}`}
                    className="btn-primary w-full text-center"
                  >
                    Request Pricing & Availability
                  </Link>
                  <Link
                    to={`/request-demo?product=${encodeURIComponent(product.name)}`}
                    className="btn-secondary w-full text-center"
                  >
                    Request Technical Demo
                  </Link>
                </div>

                <div className="p-4 bg-[var(--accent-soft)] border border-[var(--accent)] rounded-xl">
                  <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xs uppercase mb-1">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                    Factory Calibrated
                  </div>
                  <p className="text-xs text-[var(--copy)] leading-relaxed">
                    Each unit is individually tested and delivered with an ISO-traceable calibration certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16 bg-[var(--surface)] border-t border-[var(--stroke)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-black text-[var(--heading)] mb-8 tracking-tight">
              Complementary Hardware Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <CTASection
        title={`Integrate ${product.name} Into Your Test Lanes`}
        subtitle="Contact our hardware engineering group for wiring drawings, pinouts, and SDK drivers."
        primaryAction={{ label: 'Request Quote', href: `/request-quote?product=${encodeURIComponent(product.name)}` }}
        secondaryAction={{ label: 'Contact Us', href: '/contact' }}
      />
    </div>
  );
}
