import { PageArtwork } from '@/components/common/PageArtwork';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Search, Download } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { resourceApi } from '@/services/api';
import { ResourceCard } from '@/components/common/Cards';
import { CardGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CTASection } from '@/components/common/SectionComponents';
import { SEOHead } from '@/components/common/SEOHead';
import type { ResourceType } from '@/types';

export function ResourcesListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as ResourceType | null;

  const [activeTab, setActiveTab] = useState<'ALL' | ResourceType>(
    typeParam && ['BROCHURE', 'DATASHEET', 'ARTICLE'].includes(typeParam) ? typeParam : 'ALL'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize state with URL query param if it changes
  useEffect(() => {
    if (typeParam && ['BROCHURE', 'DATASHEET', 'ARTICLE'].includes(typeParam)) {
      setActiveTab(typeParam);
    } else if (!typeParam) {
      setActiveTab('ALL');
    }
  }, [typeParam]);

  const { data: resources, loading } = useApi(async () => {
    return resourceApi.getResources();
  });

  const handleTabChange = (tab: 'ALL' | ResourceType) => {
    setActiveTab(tab);
    if (tab === 'ALL') {
      searchParams.delete('type');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type: tab });
    }
  };

  const filteredResources = resources?.filter((r) => {
    const matchesTab = activeTab === 'ALL' || r.type === activeTab;
    const matchesQuery =
      !searchQuery.trim() ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const brochureCount = resources?.filter((r) => r.type === 'BROCHURE').length || 0;
  const datasheetCount = resources?.filter((r) => r.type === 'DATASHEET').length || 0;
  const articleCount = resources?.filter((r) => r.type === 'ARTICLE').length || 0;

  return (
    <div className="page page-resources-listing-page catalog-page">
      <SEOHead
        title="Knowledge Center & Resources | Brochures, Datasheets, Articles | Vtest"
        description="Access technical whitepapers, hardware datasheets, software brochures, and best practice guides for vehicle inspection and testing."
        canonical="/resources"
      />

      {/* Hero */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-green-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <BookOpen className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Documentation & Knowledge Base
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Technical Resources & <span className="gradient-text">Testing Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--copy)] leading-relaxed mb-8">
              Download complete product brochures, engineering datasheets, wiring schematics, and read
              in-depth technical guides authored by Vtest engineers.
            </p>
          </div>
        </div>
        <PageArtwork kind="resources" />
      </section>

      {/* Listing Content */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="bg-[var(--surface)] rounded-2xl p-4 shadow-sm border border-[var(--stroke)] mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center bg-[var(--site-bg)] p-1 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleTabChange('ALL')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                All Resources
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('BROCHURE')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'BROCHURE'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                Brochures ({brochureCount})
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('DATASHEET')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'DATASHEET'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                Datasheets ({datasheetCount})
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('ARTICLE')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'ARTICLE'
                    ? 'bg-[var(--surface)] text-[var(--heading)] shadow-sm'
                    : 'text-[var(--copy)] hover:text-[var(--heading)]'
                }`}
              >
                Articles ({articleCount})
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-green-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[var(--stroke)] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <CardGridSkeleton count={6} />
          ) : filteredResources && filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl p-12 text-center border border-[var(--stroke)]">
              <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[var(--heading)] mb-1">No resources found</h3>
              <p className="text-sm text-[var(--copy)] mb-6">
                Try changing your search term or switching the resource filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleTabChange('ALL');
                  setSearchQuery('');
                }}
                className="btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Need Technical Documentation for an RFP or Tender?"
        subtitle="Our engineering office can supply complete compliance matrices, CAD envelopes, and system architecture diagrams."
        primaryAction={{ label: 'Contact Us', href: '/contact' }}
        secondaryAction={{ label: 'Request Demo', href: '/request-demo' }}
      />
    </div>
  );
}
