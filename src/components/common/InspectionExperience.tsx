import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { InspectionLaneScene } from './inspectionLaneScene';
import '@/inspection-experience.css';

const chapters = [
  { title: 'See the complete vehicle.', shortTitle: 'Vehicle inspection', text: 'Bring the vehicle, testing equipment and operator workflow into one coordinated inspection lane.', label: '01 / INSPECT' },
  { title: 'Put braking to the test.', shortTitle: 'Brake performance', text: 'Explore the roller brake test bench, where controlled wheel movement supports braking force and balance measurements.', label: '02 / BRAKES' },
  { title: 'Read the road response.', shortTitle: 'Suspension response', text: 'Suspension test plates introduce controlled movement beneath the wheels to help assess vehicle response.', label: '03 / SUSPENSION' },
  { title: 'Bring lighting into focus.', shortTitle: 'Headlamp alignment', text: 'Headlamp alignment equipment moves into position to illustrate beam direction and lighting checks.', label: '04 / LIGHTING' },
  { title: 'Follow the emissions check.', shortTitle: 'Emissions analysis', text: 'Watch the analyser connect to the vehicle as the extraction system moves into position for an emissions inspection.', label: '05 / EMISSIONS' },
  { title: 'See every wheel in line.', shortTitle: 'Wheel alignment', text: 'Wheel targets and optical measuring heads move into place, illustrating a coordinated alignment inspection.', label: '06 / ALIGNMENT' },
  { title: 'Connect every result.', shortTitle: 'Connected results', text: 'Bring equipment readings together at the operator console, connecting the inspection lane to traceable reports.', label: '07 / CONNECT' },
  { title: 'Ready for the next journey.', shortTitle: 'Lane release', text: 'The equipment retracts, the exit signal changes and the barrier rises to release the vehicle from the testing lane.', label: '08 / RELEASE' },
];

export function InspectionExperience() {
  const track = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const chapterRail = useRef<HTMLOListElement>(null);
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    const rail = chapterRail.current;
    if (rail && matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) {
      rail.scrollTo({ left: Math.max(0, chapter - 2) * rail.clientWidth / 4, behavior: 'instant' });
    }
  }, [chapter]);
  useEffect(() => {
    const element = track.current;
    const canvasHost = host.current;
    if (!element || !canvasHost || !('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
    const eligible = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let scene: InspectionLaneScene | undefined;
    let dead = false;
    let pending = false;
    let visible = false;
    let frame = 0;
    let active = 0;
    let progress = 0;
    const draw = () => {
      frame = 0;
      if (!visible || document.hidden || !eligible.matches) return;
      const bounds = element.getBoundingClientRect();
      const sticky = element.firstElementChild as HTMLElement | null;
      const stickyTop = sticky ? parseFloat(getComputedStyle(sticky).top) || 0 : 100;
      const travel = bounds.height - (sticky?.offsetHeight ?? innerHeight - 120);
      progress = Math.max(0, Math.min(1, (stickyTop - bounds.top) / Math.max(1, travel)));
      const next = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      if (next !== active) { active = next; setChapter(next); }
      if (bar.current) bar.current.style.transform = 'scaleX(' + progress + ')';
      scene?.setProgress(progress);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden && eligible.matches) frame = requestAnimationFrame(draw);
    };
    const load = async () => {
      if (dead || pending || scene || !visible || !eligible.matches || connection?.saveData || document.hidden) return;
      pending = true;
      try {
        const { mountInspectionLane } = await import('./inspectionLaneScene');
        if (!dead && visible && !document.hidden && eligible.matches) { scene = mountInspectionLane(canvasHost); scene.setProgress(progress); }
      } catch { /* The local automotive photograph remains the baseline. */ }
      finally { pending = false; }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { void load(); schedule(); }
    }, { rootMargin: '100px' });
    observer.observe(element);
    const preferences = () => {
      if (!eligible.matches) { scene?.dispose(); scene = undefined; active = 0; setChapter(0); }
      else { void load(); schedule(); }
    };
    const visibility = () => { if (!document.hidden) { void load(); schedule(); } };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    eligible.addEventListener('change', preferences);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      dead = true; observer.disconnect(); cancelAnimationFrame(frame); scene?.dispose();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      eligible.removeEventListener('change', preferences); document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return <section className="inspection-experience">
    <div className="container inspection-intro">
      <div><span className="section-kicker">THE CONNECTED TEST LANE</span><h2>One vehicle.<br />A complete picture.</h2></div>
      <p>Follow the inspection journey. From physical measurement to connected intelligence.</p>
    </div>
    <div className="inspection-track" ref={track}>
      <div className="container inspection-sticky">
        <div className="inspection-stage photo-surface">
          <img className="inspection-photo" src="/automotive-studio-900.jpg" width="900" height="600" alt="Automotive inspection concept" loading="lazy" decoding="async" />
          <div className="inspection-canvas" ref={host} aria-hidden="true" />
          <div className="inspection-copy">
            <span className="section-kicker">{chapters[chapter].label}</span>
            <h3>{chapters[chapter].title}</h3>
            <p>{chapters[chapter].text}</p>
            <Link to="/solutions">Explore solutions <ArrowUpRight size={17} /></Link>
          </div>
          <span className="inspection-scroll-hint">SCROLL TO EXPLORE ↓</span>
          <ol className="inspection-chapters" ref={chapterRail}>
            {chapters.map((item, index) => <li key={item.label} className={index === chapter ? 'is-active' : ''}>
              <span>{item.label}</span><strong>{item.shortTitle}</strong><p>{item.text}</p>
            </li>)}
          </ol>
          <div className="inspection-progress" aria-hidden="true"><div ref={bar} /></div>
        </div>
      </div>
    </div>
  </section>;
}
