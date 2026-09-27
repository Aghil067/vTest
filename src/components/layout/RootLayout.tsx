import { useEffect, useRef } from 'react';
import { useMarketingMotion } from '@/hooks/useMarketingMotion';
import { Outlet, useLocation } from 'react-router-dom';
import { GlobalHeader } from './GlobalHeader';
import { GlobalFooter } from './GlobalFooter';
import '@/marketing.css';
import '@/motion.css';
import '@/cinematic.css';
import '@/site-theme.css';
import '@/editorial.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null);
  useMarketingMotion(mainRef);
  return (
    <div className="marketing-site min-h-screen flex flex-col selection:bg-[#2ECC71] selection:text-[#050A07]">
      <ScrollToTop />
      <GlobalHeader />
      <main ref={mainRef} className="flex-1">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
