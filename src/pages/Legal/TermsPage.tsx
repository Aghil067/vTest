import { FileText } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SEOHead } from '@/components/common/SEOHead';

export function TermsPage() {
  return (
    <div className="page page-terms-page legal-page">
      <SEOHead
        title="Terms of Service & Use | Vetest Corporate Website"
        description="Review the terms and conditions governing the access and use of the Vetest website, product specifications, software documentation, and enquiry portals."
        canonical="/terms"
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <FileText className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Legal Terms
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              Terms of <span className="gradient-text">Service & Use</span>
            </h1>
            <p className="text-[var(--copy)] text-sm">
              Last updated: September 2026 &bull; Governs access to all Vetest online platforms
            </p>
          </div>
        </div>
      </section>

      {/* Document Content */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-blue max-w-none text-[var(--heading)] leading-relaxed space-y-10">
            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">1. Agreement to Terms</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                By accessing, browsing, or utilizing the Vetest website, downloadable documentation, datasheets,
                or demonstration request mechanisms, you acknowledge that you have read, understood, and agree
                to be legally bound by these Terms of Service and applicable local, national, and international laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">2. Intellectual Property Rights</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                All contents, product designs, software architectures, user interfaces, logos, diagrams, and
                technical datasheets displayed on this website are the proprietary intellectual property of Vetest
                and its licensors, protected by international copyright and trademark conventions. No portion of
                this site may be reproduced or reverse engineered without explicit written authorization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">3. Product Specifications & Changes</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                While Vetest strives to maintain accurate and up-to-date technical specifications, hardware and
                software features are subject to continuous engineering enhancement. Technical metrics, physical
                dimensions, and interface protocols may be updated without prior public notification. Binding
                specifications are established solely in formal commercial contracts and sales orders.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">4. Commercial Software & Firmware Licenses</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                Use of Vetest proprietary software (such as VetestIMS, VetestLaneOS, and VetestAnalytics) and embedded
                firmware is governed exclusively by our Master Software License Agreement (EULA) executed at the time
                of procurement. Nothing on this website constitutes a license grant for software execution.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">5. Limitation of Liability</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                In no event shall Vetest or its officers, employees, or technical partners be liable for any indirect,
                punitive, or consequential damages resulting from the use or inability to use this website or
                reliance upon preliminary marketing or technical overviews provided herein.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--heading)] mb-4">6. Governing Law & Jurisdiction</h2>
              <p className="text-base text-[var(--copy)] leading-relaxed">
                These terms are governed by and construed in accordance with the laws of the jurisdiction of Vetest&apos;s
                corporate headquarters, without regard to conflicts of law provisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
