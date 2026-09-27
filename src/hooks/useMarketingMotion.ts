import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useLocation } from 'react-router-dom';

/** Subtle, one-time content reveals; the vehicle scenes own the 3D motion. */
export function useMarketingMotion(rootRef: RefObject<HTMLElement | null>) {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const observed = new Set<HTMLElement>();
    const revealed = new WeakSet<HTMLElement>();
    const counted = new WeakSet<HTMLElement>();
    const animations = new Set<Animation>();
    // ── Scroll reveal observer ───────────────────────────────────────────────
    const reveals = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        reveals.unobserve(element);
        observed.delete(element);
        revealed.add(element);

        if (reduced.matches || typeof element.animate !== 'function') {
          // Make sure element is visible even if animations are off
          element.style.opacity = '1';
          continue;
        }

        // Calculate stagger delay based on sibling position
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const order = Math.min(siblings.indexOf(element as Element), 5);
        const baseDelay = order >= 0 ? order * 35 : 0;

        const fromTransform = 'translate3d(0, 6px, 0)';

        const animation = element.animate(
          [
            { opacity: 0, transform: fromTransform },
            { opacity: 1, transform: 'translate3d(0,0,0)' },
          ],
          {
            duration: 320,
            delay: baseDelay,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'backwards',
          }
        );
        animations.add(animation);
        animation.onfinish = () => { animations.delete(animation); };
      }
    }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

    // ── Counter animation ────────────────────────────────────────────────────
    const counterObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        counterObserver.unobserve(el);
        if (reduced.matches) continue;

        const raw = el.dataset.countTo;
        if (!raw) continue;
        const target = parseFloat(raw);
        const isFloat = raw.includes('.');
        const suffix = el.dataset.countSuffix ?? '';
        const start = performance.now();
        const dur = 1800;

        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const val = target * ease;
          el.textContent = (isFloat ? val.toFixed(1) : Math.round(val).toString()) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    // ── Element discovery ────────────────────────────────────────────────────
    const discover = (scope: ParentNode) => {
      // Reveal targets — add every meaningful content block
      const revealSelectors = [
        '[data-reveal]',
        '.marketing-card',
        '.industry-card',
        '.home-categories .grid > a',
        '.home-solutions .grid > a',
        '.home-technology .grid > div',
        '.home-trust .grid > div',
        '.home-about .grid.grid-cols-2 > div',
        '.capability-list > li',
        '.outcome-list > li',
        '.application-list > li',
        '.product-highlight-list > li',
        '.category-feature-list > li',
        '.detail-page .detail-sidebar',
        '.solution-story',
        '.page-hero .page-artwork',
        '.detail-page .space-y-14 > div > h2',
        '.home-products article',
        '.home-projects article',
        '.home-industries .grid > a',
        // Section headings animate in
        '.page > section > .container > .text-center',
        '.page > section > .container > .flex.justify-between > div:first-child',
        '.page > section > .container > .flex.flex-col > div:first-child',
      ].join(',');

      scope.querySelectorAll<HTMLElement>(revealSelectors).forEach((element) => {
        if (element.closest('.page-home-page')) return;
        if (observed.has(element) || revealed.has(element) || !element.isConnected) return;
        observed.add(element);
        reveals.observe(element);
      });

      // Counter targets
      scope.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
        if (counted.has(el)) return;
        counted.add(el);
        counterObserver.observe(el);
      });
    };

    discover(root);
    // No motion-managed class — we don't want section gating
    root.classList.add('vtest-animated');

    // Observe DOM changes (API-backed grids arrive late)
    const mutations = new MutationObserver((records) => {
      const changed = new Set<ParentNode>();
      records.forEach((record) => {
        if (record.addedNodes.length) changed.add(record.target as ParentNode);
      });
      changed.forEach(discover);
      // Clean up disconnected elements
      observed.forEach((node) => {
        if (!node.isConnected) { reveals.unobserve(node); observed.delete(node); }
      });
    });
    mutations.observe(root, { childList: true, subtree: true });

    // ── Visibility change handling ───────────────────────────────────────────
    const updatePreferences = () => {
      if (reduced.matches) {
        animations.forEach((a) => a.cancel());
        animations.clear();
      } else {
        animations.forEach((a) => { if (document.hidden) a.pause(); else a.play(); });
      }
    };
    updatePreferences();

    document.addEventListener('visibilitychange', updatePreferences);
    reduced.addEventListener('change', updatePreferences);

    return () => {
      reveals.disconnect();
      counterObserver.disconnect();
      mutations.disconnect();
      animations.forEach((a) => a.cancel());
      root.classList.remove('vtest-animated');
      document.removeEventListener('visibilitychange', updatePreferences);
      reduced.removeEventListener('change', updatePreferences);
    };
  }, [pathname, rootRef]);
}
