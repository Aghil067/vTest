import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Transform-only scroll choreography, including cards arriving from the CMS. */
export function useHomeChoreography() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const seen = new WeakSet<Element>();
      const context = gsap.context(() => {}, root);
      let timer = 0;
      const refresh = () => { window.clearTimeout(timer); timer = window.setTimeout(() => ScrollTrigger.refresh(), 100); };
      const discover = () => {
        context.add(() => {
          const selectors = '.home-categories .grid > a,.home-solutions .grid > a,.home-products article,.home-projects article,.home-industries .grid > a,.home-technology .grid > div,.home-trust .grid > div';
          root.querySelectorAll<HTMLElement>(selectors).forEach((card, index) => {
            if (seen.has(card)) return;
            seen.add(card);
            gsap.fromTo(card,
              { y: 14 + (index % 3) * 3 },
              { y: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top 98%', end: 'top 58%', scrub: .2 } });
            const image = card.querySelector('img');
            if (image) gsap.fromTo(image, { scale: 1.035 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom 25%', scrub: .6 } });
          });
          root.querySelectorAll<HTMLElement>('section:not(.inspection-experience) h2').forEach(heading => {
            if (seen.has(heading)) return;
            seen.add(heading);
            gsap.fromTo(heading, { y: 10 }, { y: 0, ease: 'none', scrollTrigger: { trigger: heading, start: 'top 98%', end: 'top 75%', scrub: .2 } });
          });
        });
        refresh();
      };
      discover();
      const mutation = new MutationObserver(records => {
        if (records.some(record => Array.from(record.addedNodes).some(node => node.nodeType === Node.ELEMENT_NODE))) discover();
      });
      mutation.observe(root, { childList: true, subtree: true });
      const resize = new ResizeObserver(refresh); resize.observe(root);
      root.addEventListener('load', refresh, true);
      return () => {
        mutation.disconnect(); resize.disconnect(); window.clearTimeout(timer);
        root.removeEventListener('load', refresh, true); context.revert();
      };
    });
    return () => media.revert();
  }, []);
  return ref;
}

