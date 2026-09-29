import { Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SEOHead } from '@/components/common/SEOHead';

export function PrivacyPolicyPage() {
  return (
    <div className="page page-privacy-policy-page legal-page">
      <SEOHead
        title="Privacy Policy | Vetest Data Protection & Governance"
        description="Learn how Vetest collects, protects, processes, and respects enterprise and individual personal data across our websites, cloud services, and testing platforms."
        canonical="/privacy-policy"
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Shield className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Legal & Governance
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              Privacy Policy & <span className="gradient-text">Data Protection</span>
            </h1>
            <p className="text-[var(--copy)] text-sm">
              Last updated: September 2026 &bull; Effective immediately for all visitors and subscribers
            </p>
          </div>
        </div>
      </section>

      {/* Document Content */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-blue max-w-none text-[var(--heading)] leading-relaxed space-y-10">
            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">1. Introduction & Scope</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                Vetest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy and security of
                personal data and vehicle test telemetry. This Privacy Policy details our practices concerning
                the collection, use, retention, and disclosure of information gathered through our public website,
                marketing communications, demo request portals, and commercial software services (including VetestIMS
                Cloud and VetestAnalytics).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">2. Information We Collect</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed mb-4">
                We collect information directly from you when you interact with our forms, download documentation,
                request demonstrations, or communicate with our engineering teams:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[var(--copy)] text-base">
                <li>
                  <strong>Contact Information:</strong> Full name, professional email address, telephone number, job
                  title, and organization/company name.
                </li>
                <li>
                  <strong>Operational Requirements:</strong> Equipment models, number of inspection lanes, facility
                  location, and procurement timeline provided during RFP submissions.
                </li>
                <li>
                  <strong>Technical Browsing Data:</strong> Anonymized IP addresses, browser user-agent, operating
                  system details, and aggregated clickstream statistics collected through modern analytics tools.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">3. How We Use Collected Information</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed mb-4">
                Information gathered is processed solely for lawful commercial and operational purposes:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[var(--copy)] text-base">
                <li>To prepare technical proposals, cost estimates, and hardware bill-of-materials.</li>
                <li>To coordinate and host live software demonstration sessions.</li>
                <li>To deliver product updates, security advisories, and technical whitepapers requested by you.</li>
                <li>To comply with regulatory audit standards and export control laws governing industrial testing equipment.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">4. Data Security & Storage</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                Vetest employs industry-standard encryption protocols (TLS 1.3 in transit, AES-256 at rest) across
                all data repositories. Access to lead inquiries and operational records is strictly restricted to
                authorized technical personnel under signed non-disclosure agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">5. Third-Party Disclosures</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                We do not sell, rent, or trade your personal or business data to third-party advertisers. Data may
                only be shared with trusted infrastructure providers (cloud hosting, CRM systems) under strict
                data processing agreements compliant with GDPR and CCPA.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">6. Your Rights & Data Subject Requests</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                Depending on your jurisdiction (such as the European Union under GDPR), you have the right to access,
                rectify, erase, or restrict processing of your personal information. To submit a data inquiry, please
                reach out directly to our Data Protection Officer at{' '}
                <a href="mailto:privacy@vetest.com" className="text-green-400 font-bold underline">
                  privacy@vetest.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
