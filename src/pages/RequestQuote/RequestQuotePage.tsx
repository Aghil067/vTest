import { Link } from 'react-router-dom';
import { FileSpreadsheet, CheckCircle2, Building2, Clock, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RequestQuoteForm } from '@/components/forms/Forms';
import { SEOHead } from '@/components/common/SEOHead';

const quoteInclusions = [
  'Custom Bill-of-Materials (BOM) based on your lane equipment count',
  'Software licensing tiers (per-lane perpetual or cloud SaaS models)',
  'On-site installation, cabling, sensor calibration & testing options',
  '24/7 mission-critical SLA and maintenance support terms',
  'Full compliance documentation and ISO/IEC calibration certificates',
];

export function RequestQuotePage() {
  return (
    <div className="page page-request-quote-page enquiry-page">
      <SEOHead
        title="Request a Custom Quote | Commercial Pricing & RFPs | Vtest"
        description="Request enterprise pricing for Vtest inspection software licenses, testing hardware controllers, turnkey lane setups, or custom engineering integrations."
        canonical="/request-quote"
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#2ECC71]/15 dark:bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Request a Quote' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Commercial Pricing & Tenders
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-[var(--heading)]">
              Request a Tailored <span className="gradient-text">Commercial Proposal</span>
            </h1>
            <p className="text-lg text-[var(--copy)] leading-relaxed">
              Tell us about your testing volume, lane configurations, and integration timeline.
              Our commercial estimating team will formulate a competitive, comprehensive quote.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-[var(--site-bg)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Cols: Form */}
            <div className="lg:col-span-7">
              <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-10 border border-[var(--stroke)] shadow-sm">
                <h2 className="text-2xl font-black text-[var(--heading)] mb-2">Configure Your Quote</h2>
                <p className="text-sm text-[var(--copy)] mb-8">
                  Provide your facility details below to receive accurate pricing and technical specifications.
                </p>

                <RequestQuoteForm />
              </div>
            </div>

            {/* Right 5 Cols: Proposal Inclusions & SLA Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--surface)] rounded-3xl p-8 border border-[var(--stroke)] shadow-sm space-y-6">
                <h3 className="text-xl font-black text-[var(--heading)]">Every Proposal Includes:</h3>

                <div className="space-y-4">
                  {quoteInclusions.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[var(--heading)] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-[var(--site-bg)] border border-[var(--stroke)] rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase">
                    <Clock className="w-4 h-4 text-green-400" />
                    Rapid Turnaround
                  </div>
                  <p className="text-xs text-[var(--copy)] leading-relaxed">
                    Standard quotes delivered within 24 to 48 business hours. Detailed multi-site tender responses
                    coordinated with our engineering directorship.
                  </p>
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--stroke)] text-[var(--heading)] rounded-3xl p-8 space-y-4">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase">
                  <Building2 className="w-4 h-4" />
                  Government & Large Fleet Tenders
                </div>
                <h4 className="text-lg font-bold text-[var(--heading)]">Participating in a Public Procurement?</h4>
                <p className="text-xs text-[var(--copy)] leading-relaxed">
                  We frequently partner with prime contractors and system integrators on state and national
                  transport authority vehicle inspection concessions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm text-green-400 font-bold hover:text-green-300 transition-colors"
                >
                  Connect with Tender Desk
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
