import { useEffect, useRef } from 'react';

/** The photograph stays visible even when the optional Three.js layer is unavailable. */
export function VehicleScene() {
  const scanRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = scanRef.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!host || connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) return;
    if (!('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
    const eligible = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    let cancelled = false;
    let loading = false;
    let visible = false;
    let cleanup: (() => void) | undefined;
    const load = async () => {
      if (cancelled || loading || cleanup || !visible || !eligible.matches || document.hidden) return;
      loading = true;
      try {
        // Defer the optional download until the actual hero image has decoded.
        const photo = host.parentElement?.querySelector('img');
        if (photo) await photo.decode().catch(() => {});
        if (cancelled || !eligible.matches || !visible || document.hidden) return;
        const { mountVehicleScan } = await import('./vehicleScan');
        if (!cancelled && eligible.matches && visible && !document.hidden) cleanup = mountVehicleScan(host);
      } catch {
        // Unsupported WebGL or a failed chunk download keeps the CSS/photo presentation.
      } finally { loading = false; }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; void load(); });
    observer.observe(host);
    eligible.addEventListener('change', load);
    document.addEventListener('visibilitychange', load);
    return () => {
      cancelled = true; observer.disconnect(); cleanup?.();
      eligible.removeEventListener('change', load);
      document.removeEventListener('visibilitychange', load);
    };
  }, []);
  return (
    <div className="vehicle-stage photo-surface" data-tilt aria-hidden="true">
      <div className="vehicle-stage__image">
        <img src="/automotive-studio.jpg" srcSet="/automotive-studio-900.jpg 900w, /automotive-studio.jpg 1536w" sizes="(max-width: 1023px) 92vw, 650px" alt="" width="1536" height="1024" fetchPriority="high" decoding="async" />
      </div>
      <div className="vehicle-stage__shade" />
      <div ref={scanRef} className="vehicle-stage__webgl" />
      <div className="vehicle-stage__scan" />
      <div className="vehicle-stage__reticle vehicle-stage__reticle--front"><i /><span>Precision measurement</span></div>
      <div className="vehicle-stage__reticle vehicle-stage__reticle--rear"><i /><span>Connected intelligence</span></div>
      <div className="vehicle-stage__caption"><span /> VEHICLE INSPECTION TECHNOLOGY <b>01 / VETEST</b></div>
    </div>
  );
}
