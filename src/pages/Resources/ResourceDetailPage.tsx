import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileText, Newspaper, Download, Calendar, User } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { resourceApi } from '@/services/api';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DetailPageSkeleton } from '@/components/common/LoadingSkeleton';
import { NotFoundState } from '@/components/common/StateComponents';
import { ResourceCard } from '@/components/common/Cards';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';

export function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: resource, loading } = useApi(async () => {
    if (!slug) return null;
    return resourceApi.getResourceBySlug(slug);
  });

  const { data: relatedResources } = useApi(async () => {
    const all = await resourceApi.getResources();
    return all.filter((r) => r.slug !== slug).slice(0, 3);
  });

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!resource) {
    return (
      <div className="py-20">
        <NotFoundState
          title="Resource Not Found"
          message="The requested document, datasheet, or article could not be found."
          actionText="View All Resources"
          actionHref="/resources"
        />
      </div>
    );
  }

  const isArticle = resource.type === 'ARTICLE';

  const targetUrl = resource?.fileUrl || resource?.file;

  const isWordDoc =
    Boolean(
      targetUrl &&
      (targetUrl.toLowerCase().includes('.doc') ||
        targetUrl.toLowerCase().includes('.docx') ||
        targetUrl.toLowerCase().includes('msword') ||
        targetUrl.toLowerCase().includes('wordprocessingml'))
    );

  const docTypeLabel = isWordDoc ? 'Word Document' : 'Document';

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!targetUrl) {
      alert('No document file has been uploaded for this resource. Please upload a file in Admin > Resources.');
      return;
    }

    let baseFileName = resource?.slug || 'publication-document';

    const resolveExtension = (mimeOrUrl: string) => {
      const target = mimeOrUrl.toLowerCase();
      if (target.includes('pdf')) return '.pdf';
      if (target.includes('wordprocessingml') || target.includes('.docx')) return '.docx';
      if (target.includes('msword') || target.includes('.doc')) return '.doc';
      if (target.includes('.png')) return '.png';
      if (target.includes('.jpg') || target.includes('.jpeg')) return '.jpeg';
      return '.pdf';
    };

    // 1. Handle Cloudinary Raw File URLs (Add fl_attachment flag so Cloudinary forces Content-Disposition header with filename & extension)
    if (targetUrl.includes('res.cloudinary.com') && targetUrl.includes('/raw/upload/')) {
      const ext = resolveExtension(targetUrl);
      const fileName = baseFileName.toLowerCase().endsWith(ext) ? baseFileName : `${baseFileName}${ext}`;
      let downloadUrl = targetUrl;
      if (!downloadUrl.includes('/fl_attachment')) {
        downloadUrl = downloadUrl.replace('/raw/upload/', `/raw/upload/fl_attachment:${encodeURIComponent(baseFileName)}/`);
      }
      if (!downloadUrl.toLowerCase().endsWith(ext)) {
        downloadUrl = `${downloadUrl}${ext}`;
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 2. Handle Data URLs (Base64 file upload from admin local store)
    if (targetUrl.startsWith('data:')) {
      try {
        const parts = targetUrl.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const ext = resolveExtension(mime);
        const fileName = baseFileName.toLowerCase().endsWith(ext) ? baseFileName : `${baseFileName}${ext}`;

        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      } catch {
        window.open(targetUrl, '_blank');
      }
      return;
    }

    // 3. Handle standard HTTP/HTTPS or local /uploads/ URLs via Blob Fetch
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Fetch failed');

      const contentType = response.headers.get('content-type') || '';
      const ext = resolveExtension(contentType || targetUrl);
      const fileName = baseFileName.toLowerCase().endsWith(ext) ? baseFileName : `${baseFileName}${ext}`;

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch {
      window.open(targetUrl, '_blank');
    }
  };

  return (
    <div className="page page-resource-detail-page detail-page">
      <SEOHead
        title={resource.seoTitle || `${resource.title} | Vetest Resources`}
        description={resource.seoDescription || resource.summary}
        canonical={`/resources/${resource.slug}`}
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: resource.title },
            ]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              {resource.type === 'BROCHURE' && <BookOpen className="w-3.5 h-3.5 text-green-400" />}
              {resource.type === 'DATASHEET' && <FileText className="w-3.5 h-3.5 text-green-400" />}
              {resource.type === 'ARTICLE' && <Newspaper className="w-3.5 h-3.5 text-green-400" />}
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                {resource.type}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
              {resource.title}
            </h1>

            <p className="text-lg text-[var(--copy)] leading-relaxed mb-6">
              {resource.summary}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--copy)]">
              {resource.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-400" />
                  <span>
                    {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {resource.authorName && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span>By {resource.authorName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-4xl">
          {isArticle && resource.content ? (
            /* Article Content */
            <div className="prose prose-lg prose-blue max-w-none text-[var(--heading)] leading-relaxed space-y-6">
              <div
                className="whitespace-pre-line text-base leading-relaxed text-[var(--heading)]"
                dangerouslySetInnerHTML={{
                  __html: resource.content
                    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black text-[var(--heading)] mt-8 mb-4">$1</h2>')
                    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[var(--heading)] mt-6 mb-3">$1</h3>')
                    .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
                    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>'),
                }}
              />
            </div>
          ) : (
            /* Document Download Card for Datasheet / Brochure */
            <div className="bg-[var(--surface)] border border-[var(--stroke)] rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-green-700 text-green-400 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="text-2xl font-black text-[var(--heading)]">Official Document Download</h3>
                <p className="text-[var(--copy)] text-sm leading-relaxed">
                  Download the complete high-resolution PDF including system requirements, wiring diagrams,
                  mechanical dimensions, and full specifications.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={resource.fileUrl || '#'}
                  onClick={handleDownload}
                  className="btn-primary w-full sm:w-auto cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download {docTypeLabel}
                </a>
                <Link to="/contact" className="btn-secondary w-full sm:w-auto">
                  Request Hard Copy
                </Link>
              </div>

              <div className="text-xs text-[var(--muted)]">
                Format: PDF &bull; File Size: ~2.4 MB &bull; Language: English
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources && relatedResources.length > 0 && (
        <section className="py-16 bg-[var(--surface)] border-t border-[var(--stroke)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-black text-[var(--heading)] mb-8 tracking-tight">
              Related Documentation & Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedResources.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <CTASection
        title="Have Questions About These Specifications?"
        subtitle="Our engineering support desk can help clarify technical standards, equipment compatibility, and integration protocols."
        primaryAction={{ label: 'Contact Support', href: '/contact' }}
        secondaryAction={{ label: 'Request a Demo', href: '/request-demo' }}
      />
    </div>
  );
}
