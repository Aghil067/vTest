import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck, ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ContactForm } from '@/components/forms/Forms';
import { SEOHead } from '@/components/common/SEOHead';
import { config } from '@/config';

const contactInfo = [
  {
    icon: Mail,
    title: 'General Inquiries',
    detail: config.contactEmail,
    href: `mailto:${config.contactEmail}`,
  },
  {
    icon: Phone,
    title: 'Customer & Technical Support',
    detail: '+1 (800) 555-VTEST / +49 89 123456',
    href: 'tel:+18005558837',
  },
  {
    icon: MapPin,
    title: 'Engineering Headquarters',
    detail: 'Global Technology Park, Munich & Silicon Valley',
  },
  {
    icon: Clock,
    title: 'Support Hours',
    detail: 'Mon – Fri: 08:00 – 18:00 (CET / EST) • 24/7 SLA Hotline',
  },
];

const faqs = [
  {
    q: 'How quickly does Vtest respond to inquiries?',
    a: 'Our sales engineering and client support teams respond to all general inquiries within 1 business day. Mission-critical SLA subscribers have 24/7 emergency dispatch.',
  },
  {
    q: 'Can Vtest integrate with our existing third-party test hardware?',
    a: 'Yes. Vtest software is built around open communication standards (Modbus, CANopen, OPC-UA, REST) and integrates directly with MAHA, Bosch, and custom test benches.',
  },
  {
    q: 'Do you provide on-site installation and calibration?',
    a: 'Yes. We offer turnkey on-site deployment, hardware mounting, physical calibration traceable to national standards, and inspector certification training.',
  },
];

export function ContactPage() {
  return (
    <div className="page page-contact-page enquiry-page bg-[var(--site-bg)] text-[var(--copy)]">
      <SEOHead
        title="Contact Vtest | Sales, Engineering & Global Support"
        description="Get in touch with the Vtest engineering and sales team for vehicle inspection technology, hardware quotes, software demonstrations, or technical support."
        canonical="/contact"
      />

      {/* Hero */}
      <section className="page-hero relative py-20 lg:py-24 overflow-hidden border-b border-[var(--stroke)] bg-[var(--site-bg)]">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="hidden dark:block absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
            variant="dark"
            className="mb-8"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                We're Here to Help
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] mb-4 text-[var(--heading)]">
              Connect With Our{' '}
              <span className="text-[var(--accent)]">Testing Specialists</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--copy)] font-normal">
              Whether you are planning a new multi-lane inspection facility, modernizing legacy test benches,
              or requesting technical support, our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-[var(--site-bg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl p-6 sm:p-10 bg-[var(--surface)] border border-[var(--stroke)] shadow-sm">
                <h2 className="text-2xl font-black text-[var(--heading)] mb-1 tracking-tight">Send Us a Message</h2>
                <p className="text-sm mb-8 text-[var(--copy)]">
                  Fill out the form below and an applications specialist will review your request.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact details */}
              <div className="rounded-2xl p-6 sm:p-8 bg-[var(--surface)] border border-[var(--stroke)] shadow-sm space-y-6">
                <h3 className="text-lg font-black text-[var(--heading)] tracking-tight">Direct Channels</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, i) => {
                    const Icon = info.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-1 text-[var(--muted)]">
                            {info.title}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm font-semibold text-[var(--heading)] hover:text-[var(--accent)] transition-colors"
                            >
                              {info.detail}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-[var(--heading)]">{info.detail}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAQ Accordion / Quick Answers */}
              <div className="rounded-2xl p-6 sm:p-8 bg-[var(--surface)] border border-[var(--stroke)] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <div className="space-y-4 pt-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="space-y-1.5 pb-4 border-b border-[var(--stroke)] last:border-b-0 last:pb-0">
                      <h4 className="text-sm font-bold text-[var(--heading)]">{faq.q}</h4>
                      <p className="text-xs leading-relaxed text-[var(--copy)]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
