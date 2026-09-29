import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, Video, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RequestDemoForm } from '@/components/forms/Forms';
import { SEOHead } from '@/components/common/SEOHead';

const demoHighlights = [
  'Live demonstration of VetestIMS inspection workflow automation',
  'Real-time equipment telemetry and lane controller integration preview',
  'Automated regulatory compliance certificates & anti-fraud audit logs',
  'Multi-lane supervision and central cloud operational analytics',
  'Customized Q&A tailored to your specific station or fleet requirements',
];

export function RequestDemoPage() {
  return (
    <div className="page page-request-demo-page enquiry-page">
      <SEOHead
        title="Schedule a Live Demo | Vehicle Inspection Platform | Vetest"
        description="Experience Vetest's automated vehicle inspection management and testing platform firsthand. Book a guided 1-on-1 demonstration with our technical specialists."
        canonical="/request-demo"
      />

      {/* Hero Banner */}
      <section className="page-hero bg-[var(--site-bg)] text-[var(--heading)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#2ECC71]/15 dark:bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Request a Demo' }]}
            variant="dark"
            className="mb-8"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-3.5 py-1 mb-6">
              <Video className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Interactive Session
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-[var(--heading)]">
              See Vetest in Action with a <span className="gradient-text">Tailored Demo</span>
            </h1>
            <p className="text-lg text-[var(--copy)] leading-relaxed">
              Discover how our integrated software and hardware platforms accelerate lane cycle times,
              prevent data tampering, and ensure complete regulatory conformity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20 bg-[var(--site-bg)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Cols: Form */}
            <div className="lg:col-span-7">
              <div className="relative bg-[var(--surface)]/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#2ECC71]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                <h2 className="relative text-2xl font-black text-[var(--heading)] mb-2">Book Your Session</h2>
                <p className="relative text-sm text-[var(--copy)] mb-8">
                  Complete the details below and we&apos;ll schedule a time that fits your calendar.
                </p>

                <div className="relative">
                  <RequestDemoForm />
                </div>
              </div>
            </div>

            {/* Right 5 Cols: What to Expect & Value */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--surface)]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] space-y-6">
                <h3 className="text-xl font-black text-[var(--heading)]">What to Expect During Your Demo</h3>

                <div className="space-y-4">
                  {demoHighlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[var(--heading)] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-[var(--site-bg)] border border-[var(--stroke)] rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase">
                    <Clock className="w-4 h-4 text-green-400" />
                    Session Format: 30-45 Minutes
                  </div>
                  <p className="text-xs text-[var(--copy)] leading-relaxed">
                    Delivered via video conference by a Senior Solutions Architect with hands-on
                    experience in testing lane workflows and equipment protocols.
                  </p>
                </div>
              </div>

              <div className="bg-[var(--surface)]/80 backdrop-blur-xl border border-white/10 dark:border-white/10 text-[var(--heading)] rounded-3xl p-8 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  Need Immediate Architecture Sizing?
                </div>
                <h4 className="text-lg font-bold text-[var(--heading)]">Have an Active RFP or Station Tender?</h4>
                <p className="text-xs text-[var(--copy)] leading-relaxed">
                  Our commercial bid team can prepare compliance matrices, budget estimates, and hardware bill-of-materials on accelerated timelines.
                </p>
                <Link
                  to="/request-quote"
                  className="inline-flex items-center gap-2 text-sm text-green-400 font-bold hover:text-green-300 transition-colors"
                >
                  Request a Formal Quote
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
