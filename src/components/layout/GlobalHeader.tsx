import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Cpu,
  Monitor,
  LayoutGrid,
  Car,
  ClipboardCheck,
  Building2,
  Factory,
  Code2,
  Wifi,
  Brain,
  HardDrive,
  Zap,
  BookOpen,
  FileText,
  Newspaper,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/config';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const G = '#2ECC71';

const BG = '#0A0F0C';
const BORDER = 'var(--stroke)';

const iconMap: Record<string, React.ReactNode> = {
  'Software Products': <Monitor className="w-4 h-4" />,
  'Hardware Products': <HardDrive className="w-4 h-4" />,
  'Vehicle Inspection': <ClipboardCheck className="w-4 h-4" />,
  'End-of-Line Testing': <Cpu className="w-4 h-4" />,
  'Test Lane Management': <LayoutGrid className="w-4 h-4" />,
  'Equipment Integration': <Zap className="w-4 h-4" />,
  'Compliance & Analytics': <Brain className="w-4 h-4" />,
  'Service & Maintenance': <HardDrive className="w-4 h-4" />,
  Automotive: <Car className="w-4 h-4" />,
  'Vehicle Testing': <ClipboardCheck className="w-4 h-4" />,
  'Government / Transport': <Building2 className="w-4 h-4" />,
  Manufacturing: <Factory className="w-4 h-4" />,
  'Software Development': <Code2 className="w-4 h-4" />,
  IoT: <Wifi className="w-4 h-4" />,
  'AI & Analytics': <Brain className="w-4 h-4" />,
  'Hardware Integration': <Cpu className="w-4 h-4" />,
  Automation: <Zap className="w-4 h-4" />,
  MAHA: <ClipboardCheck className="w-4 h-4" />,
  Navitsa: <ClipboardCheck className="w-4 h-4" />,
  'Other Implementations': <BookOpen className="w-4 h-4" />,
  Brochures: <BookOpen className="w-4 h-4" />,
  Datasheets: <FileText className="w-4 h-4" />,
  Articles: <Newspaper className="w-4 h-4" />,
};

// ---- Logo ----
function VtestLogo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('flex items-center py-1 group shrink-0', className)} aria-label="Vtest — Home">
      <BrandLogo className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[210px] object-contain transition-transform duration-200 group-hover:scale-[1.03]" />
    </Link>
  );
}

// ---- Desktop Dropdown ----
interface DropdownMenuProps {
  items: { label: string; href: string }[];
  isOpen: boolean;
}

function DropdownMenu({ items, isOpen }: DropdownMenuProps) {
  const { isDark } = useTheme();
  return (
    <div
      inert={!isOpen}
      className={cn(
        'absolute top-full left-0 mt-2 overflow-hidden z-50 transition-all duration-200 min-w-[220px]',
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
      style={{
        background: isDark ? '#0D1510' : '#FFFFFF',
        border: `1px solid ${BORDER}`,
        borderRadius: '8px',
        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)'
      }}
    >
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 group"
            style={{ color: 'var(--heading)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = `${G}0D`;
              (e.currentTarget as HTMLAnchorElement).style.color = G;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--heading)';
            }}
          >
            {iconMap[item.label] && (
              <span className="flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
                {iconMap[item.label]}
              </span>
            )}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---- Desktop Nav Item ----
interface NavItemProps {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
}

function DesktopNavItem({ item, isActive }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setIsOpen(false), 150);
  };

  if (!item.children) {
    return (
      <Link
        to={item.href ?? '/'}
        aria-current={isActive ? 'page' : undefined}
        className="h-10 inline-flex items-center text-sm font-semibold px-2 py-1 transition-colors duration-200"
        style={{ color: isActive ? G : 'var(--heading)', letterSpacing: '0.02em' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isActive ? G : 'var(--heading)'; }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative flex items-center h-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false); }}
      onKeyDown={(event) => { if (event.key === 'Escape') setIsOpen(false); }}>
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setIsOpen(true); } }}
        className="h-10 inline-flex items-center gap-1.5 text-sm font-semibold px-2 py-1 transition-colors duration-200"
        style={{ color: isOpen || isActive ? G : 'var(--heading)', letterSpacing: '0.02em' }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn('w-3.5 h-3.5 transition-transform duration-200 opacity-70 group-hover:opacity-100', isOpen && 'rotate-180')}
        />
      </button>
      <DropdownMenu
        items={item.children as { label: string; href: string }[]}
        isOpen={isOpen}
      />
    </div>
  );
}

// ---- Mobile Nav Item ----
interface MobileNavItemProps {
  item: (typeof NAV_ITEMS)[number];
  onClose: () => void;
}

function MobileNavItem({ item, onClose }: MobileNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        to={item.href ?? '/'}
        onClick={onClose}
        className="flex items-center justify-between py-3 px-4 text-sm font-semibold rounded-lg transition-all"
        style={{ color: 'var(--heading)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; (e.currentTarget as HTMLAnchorElement).style.background = `${G}0D`; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--heading)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-3 px-4 text-sm font-semibold rounded-lg transition-all"
        style={{ color: 'var(--heading)' }}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronRight
          className={cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-90')}
          style={{ color: 'var(--accent)' }}
        />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 pl-4 space-y-1" style={{ borderLeft: `2px solid ${BORDER}` }}>
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              onClick={onClose}
              className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg transition-all"
              style={{ color: 'var(--heading)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--heading)'; }}
            >
              {iconMap[child.label] && (
                <span style={{ color: 'var(--accent)' }}>{iconMap[child.label]}</span>
              )}
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Global Header ----

export function GlobalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href?: string) => {
    if (!href || href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const { isDark } = useTheme();
  const headerBg = isDark
    ? (scrolled ? 'rgba(10,15,12,0.98)' : 'rgba(10,15,12,0.85)')
    : (scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)');

  return (
    <>
      <header
        className="site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: headerBg,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? BORDER : 'transparent'}`,
        }}
      >
        <div className="container mx-auto px-6 xl:px-12">
          <div className="flex items-center justify-between h-18 xl:h-20">
            {/* Logo */}
            <VtestLogo />

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <DesktopNavItem key={item.label} item={item} isActive={isActive(item.href)} />
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-2.5">
              <ThemeToggle />
              <Link
                to="/contact"
                className="h-10 inline-flex items-center px-3.5 text-sm font-semibold transition-colors hover:text-[#2ECC71]"
                style={{ color: 'var(--heading)' }}
              >
                Contact Us
              </Link>
              <Link
                to="/request-demo"
                id="header-request-demo"
                className="h-10 inline-flex items-center justify-center px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:brightness-105 active:scale-95"
                style={{ background: G, color: '#050A07', letterSpacing: '0.08em' }}
              >
                Request a Demo
              </Link>
              <Link
                to="/admin"
                className="h-10 inline-flex items-center gap-2 px-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 bg-[var(--surface)] border border-[var(--stroke)] text-[var(--heading)] hover:border-[#2ECC71] hover:text-[#2ECC71] hover:shadow-[0_0_15px_-2px_rgba(46,204,113,0.35)] shadow-sm"
                title="Admin CMS Portal"
              >
                <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
                <span>Admin</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="xl:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all"
                style={{ color: 'var(--heading)', border: `1px solid ${BORDER}` }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${G}40`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER; }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 xl:h-18" />

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          style={{ background: 'rgba(5,10,7,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs flex flex-col xl:hidden transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ background: '#0D1510', borderLeft: `1px solid ${BORDER}` }}
        aria-modal="true"
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <VtestLogo />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
            style={{ color: 'var(--heading)', border: `1px solid ${BORDER}` }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
          ))}
        </nav>

        {/* Mobile CTAs */}
        <div className="p-4 space-y-3" style={{ borderTop: `1px solid ${BORDER}` }}>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 text-sm font-bold uppercase transition-all"
            style={{ border: `1px solid ${G}40`, color: 'var(--accent)', borderRadius: '4px', letterSpacing: '0.08em' }}
          >
            Contact Us
          </Link>
          <Link
            to="/request-demo"
            onClick={() => setMobileOpen(false)}
            id="mobile-request-demo"
            className="flex items-center justify-center w-full py-3 text-sm font-bold uppercase transition-all hover:opacity-90"
            style={{ background: G, color: '#050A07', borderRadius: '4px', letterSpacing: '0.08em' }}
          >
            Request a Demo
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono font-bold uppercase transition-all rounded border border-[var(--stroke)] text-[var(--copy)] hover:text-[var(--heading)] hover:border-[#2ECC71]"
          >
            <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>

    </>
  );
}
