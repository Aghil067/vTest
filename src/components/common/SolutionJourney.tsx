import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Solution } from '@/types';

export function SolutionJourney({ solutions }: { solutions: Solution[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const rows = Array.from(element.querySelectorAll<HTMLElement>('.solution-story'));
    const images = Array.from(element.querySelectorAll<HTMLElement>('.solution-visual'));
    if (rows.length === 0) return;

    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const targetPoint = window.innerHeight * 0.45;

      let closestIndex = 0;
      let minDistance = Infinity;

      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        // Check vertical distance of row's reading zone from targetPoint
        const rowCenter = rect.top + rect.height * 0.4;
        const dist = Math.abs(rowCenter - targetPoint);

        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = i;
        }
      });

      rows.forEach((row, i) => row.classList.toggle('is-active', i === closestIndex));
      images.forEach((image, i) => image.classList.toggle('is-active', i === closestIndex));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check
    updateActive();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [solutions]);
  return <div ref={root} className="solution-journey">
    <div className="solution-visuals photo-surface" aria-hidden="true">
      {solutions.map((solution, i) => <div key={solution.id} className={`solution-visual ${i === 0 ? 'is-active' : ''}`}><img src={solution.image || "/hero-bg.jpg"} alt="" loading="lazy" decoding="async" onError={event => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "true"; event.currentTarget.src = "/hero-bg.jpg"; } }} /><div className="solution-crosshair" /><span className="solution-visual__number">{String(i + 1).padStart(2, '0')} <small>/ {String(solutions.length).padStart(2, '0')}</small></span><div className="solution-visual__caption">VTEST ENGINEERING <span>{solution.title}</span></div></div>)}
    </div>
    <div className="solution-stories">{solutions.map((solution, i) => <Link to={`/solutions/${solution.slug}`} key={solution.id} className={`solution-story ${i === 0 ? 'is-active' : ''}`}><span className="solution-story__index">{String(i + 1).padStart(2, '0')}</span><div><h3>{solution.title}</h3><p>{solution.summary}</p><span className="solution-story__link">Explore solution <ArrowUpRight size={17} /></span></div><img src={solution.image || "/hero-bg.jpg"} alt="" loading="lazy" decoding="async" onError={event => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "true"; event.currentTarget.src = "/hero-bg.jpg"; } }} className="solution-story__mobile-image" /></Link>)}</div>
  </div>;
}
