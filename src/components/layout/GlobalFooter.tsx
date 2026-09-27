import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { config } from '@/config';
import { BrandLogo } from '@/components/common/BrandLogo';

const G = '#2ECC71';
const BG = '#050A07';
const BORDER = 'var(--stroke)';

function FooterLogo() {
  return (
    <Link to="/" className="flex items-center group" aria-label="Vtest — Home">
      <BrandLogo className="h-10 sm:h-12 w-auto max-w-[190px] object-contain transition-opacity duration-200 group-hover:opacity-90" />
    </Link>
  );
}

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3
        className="text-xs font-bold uppercase mb-5"
        style={{ color: '#2ECC71', letterSpacing: '0.18em' }}
      >
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--copy)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--copy)'; }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useSettings } from '@/contexts/SettingsContext';

export function GlobalFooter() {
  const year = new Date().getFullYear();
  const { settings } = useSettings();

  const contactEmail = settings?.contact?.email || config.contactEmail;
  const contactPhone = settings?.contact?.phone || '+1 (800) 555-8378';
  const contactAddress = settings?.contact?.address || 'Vtest Technologies & Inspection Systems Inc.';
  const socialLinks = {
    linkedin: settings?.social?.linkedin || config.socialLinks.linkedin,
    twitter: settings?.social?.twitter || config.socialLinks.twitter,
    youtube: settings?.social?.youtube || config.socialLinks.youtube,
  };

  return (
    <footer className="bg-[var(--site-bg)] border-t border-[var(--stroke)]">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <FooterLogo />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--copy)' }}>
              Vtest delivers integrated software, hardware, and automation technology for vehicle
              inspection, end-of-line testing, and test lane management.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2.5 text-sm transition-colors"
                style={{ color: 'var(--copy)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--copy)'; }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                {contactEmail}
              </a>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--copy)' }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                {contactPhone}
              </div>
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--copy)' }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                {contactAddress}
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                {
                  href: socialLinks.linkedin,
                  label: 'LinkedIn',
                  path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
                },
                {
                  href: socialLinks.twitter,
                  label: 'Twitter / X',
                  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                },
                {
                  href: socialLinks.youtube,
                  label: 'YouTube',
                  path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{ border: `1px solid ${BORDER}`, color: 'var(--copy)' }}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${G}40`;
                    (e.currentTarget as HTMLAnchorElement).style.color = G;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER;
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--copy)';
                  }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <FooterLinkGroup
            title="Company"
            links={[
              { label: 'About Vtest', href: '/about' },
              { label: 'Products', href: '/products' },
              { label: 'Solutions', href: '/solutions' },
              { label: 'Industries', href: '/industries' },
              { label: 'Technology', href: '/technology' },
              { label: 'Projects', href: '/projects' },
              { label: 'Resources', href: '/resources' },
              { label: 'Contact', href: '/contact' },
            ]}
          />

          <FooterLinkGroup
            title="Products"
            links={[
              { label: 'Software Products', href: '/products/software' },
              { label: 'Hardware Products', href: '/products/hardware' },
              { label: 'VtestIMS', href: '/products/software/vtestims' },
              { label: 'VtestAnalytics', href: '/products/software/vtestanalytics' },
              { label: 'VtestConnect', href: '/products/software/vtestconnect' },
              { label: 'VtestLane Controller', href: '/products/hardware/vtestlane-controller' },
              { label: 'VtestSense Module', href: '/products/hardware/vtestsense-module' },
            ]}
          />

          <div className="space-y-8">
            <FooterLinkGroup
              title="Solutions"
              links={[
                { label: 'Vehicle Inspection', href: '/solutions/vehicle-inspection' },
                { label: 'End-of-Line Testing', href: '/solutions/end-of-line-testing' },
                { label: 'Test Lane Management', href: '/solutions/test-lane-management' },
                { label: 'Equipment Integration', href: '/solutions/equipment-integration' },
                { label: 'Compliance & Analytics', href: '/solutions/compliance-analytics' },
              ]}
            />

            {/* CTA Box */}
            <div
              className="p-5 rounded-lg"
              style={{ background: 'var(--surface)', border: `1px solid ${BORDER}` }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
                Ready to learn more?
              </p>
              <div className="space-y-3">
                <Link
                  to="/request-demo"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--heading)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--heading)'; }}
                >
                  Request a Demo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/request-quote"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--heading)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--heading)'; }}
                >
                  Request a Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--stroke)]">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--muted)' }}>
            <p>© {year} Vtest. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy-policy"
                className="transition-colors"
                style={{ color: 'var(--copy)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--copy)'; }}
              >
                Privacy Policy
              </Link>
              <span>·</span>
              <Link
                to="/terms"
                className="transition-colors"
                style={{ color: 'var(--copy)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--copy)'; }}
              >
                Terms & Conditions
              </Link>
              <span>·</span>
              <Link
                to="/admin"
                className="transition-colors font-mono font-medium"
                style={{ color: 'var(--copy)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--copy)'; }}
              >
                Admin CMS
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
