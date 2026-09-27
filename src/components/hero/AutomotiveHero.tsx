import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronDown, Plus, X } from 'lucide-react';
import { systems, hotspots, technicalFeatures, type HotspotId, type SystemId } from './heroContent';
import HoverVideo from './HoverVideo';
import AppearanceMenu from './AppearanceMenu';
import { appearanceOptions, baseExterior, canUseHotspot, type AppearanceMode } from './appearance';

type Phase = 'overview' | 'entering' | 'detail' | 'returning';
const ROOT_IMAGE = '/media/exterior-polished.png';

export function AutomotiveHero() {
  const [phase, setPhase] = useState<Phase>('overview');
  const [selected, setSelected] = useState<SystemId>('inspection');
  const [hovered, setHovered] = useState<HotspotId | null>(null);
  const [annotation, setAnnotation] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [reduced, setReduced] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [appearance, setAppearance] = useState<AppearanceMode | null>(null);
  const [appearancePinned, setAppearancePinned] = useState(false);
  const [appearanceClosing, setAppearanceClosing] = useState(false);
  const [optionId, setOptionId] = useState('green');
  const [appearanceImage, setAppearanceImage] = useState(baseExterior);
  const [neutral, setNeutral] = useState(true);
  const [loadedOptions, setLoadedOptions] = useState(() => new Set([baseExterior]));
  const [failedOptions, setFailedOptions] = useState<Set<string>>(() => new Set());
  const optionLoads = useRef(new Set<string>());
  const appearanceTimer = useRef<number | undefined>(undefined);
  const leaveTimer = useRef<number | undefined>(undefined);
  const appearanceButtons = useRef<Partial<Record<AppearanceMode, HTMLButtonElement | null>>>({});
  const suppressFocus = useRef(false);
  const lock = useRef(false);
  const request = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const revealTimer = useRef<number | undefined>(undefined);
  const heroRef = useRef<HTMLElement>(null);
  const [planeWidth, setPlaneWidth] = useState<number>(1200);
  const closeButton = useRef<HTMLButtonElement>(null);
  const entryButtons = useRef<Partial<Record<SystemId, HTMLButtonElement | null>>>({});
  const current = systems[selected];
  const busy = phase === 'entering' || phase === 'returning';

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      clearTimeout(timer.current);
      clearTimeout(revealTimer.current);
      clearTimeout(appearanceTimer.current);
      clearTimeout(leaveTimer.current);
      request.current++;
    };
  }, []);

  useEffect(() => {
    if (!appearance) return;
    let cancelled = false;
    const pending = appearanceOptions[appearance].filter((option) => !optionLoads.current.has(option.image));
    pending.forEach((option) => {
      optionLoads.current.add(option.image);
      const image = new Image();
      image.onload = () => {
        image
          .decode()
          .then(() => {
            if (!cancelled) {
              setLoadedOptions((previous) => new Set(previous).add(option.image));
              setFailedOptions((previous) => {
                const next = new Set(previous);
                next.delete(option.image);
                return next;
              });
            }
          })
          .catch(() => {
            if (!cancelled) setFailedOptions((previous) => new Set(previous).add(option.image));
          });
      };
      image.onerror = () => {
        if (!cancelled) setFailedOptions((previous) => new Set(previous).add(option.image));
      };
      image.src = option.image;
    });
    return () => {
      cancelled = true;
      pending.forEach((option) => optionLoads.current.delete(option.image));
    };
  }, [appearance]);

  function openAppearance(mode: AppearanceMode) {
    if (phase !== 'overview' || !canUseHotspot(appearance, mode, appearanceClosing)) return;
    clearTimeout(leaveTimer.current);
    setHovered(null);
    if (appearance === mode) return;
    setAppearance(mode);
    setAppearancePinned(false);
    setOptionId(appearanceOptions[mode][0].id);
    setAppearanceImage(baseExterior);
  }

  function closeAppearance(restoreFocus = true) {
    if (!appearance || appearanceClosing) return;
    const previousMode = appearance;
    clearTimeout(leaveTimer.current);
    setAppearanceClosing(true);
    setHovered(null);
    appearanceTimer.current = window.setTimeout(() => {
      setAppearance(null);
      setAppearancePinned(false);
      setAppearanceClosing(false);
      setAppearanceImage(baseExterior);
      if (restoreFocus) {
        suppressFocus.current = true;
        appearanceButtons.current[previousMode]?.focus({ preventScroll: true });
        suppressFocus.current = false;
      }
    }, reduced ? 0 : 260);
  }

  function chooseAppearance(id: string) {
    if (!appearance || appearanceClosing || !neutral) return;
    const option = appearanceOptions[appearance].find((item) => item.id === id);
    if (!option || !loadedOptions.has(option.image)) return;
    setAppearancePinned(true);
    setOptionId(id);
    setAppearanceImage(option.image);
  }

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const updateDimensions = () => {
      const { width } = el.getBoundingClientRect();
      const mobile = width <= 900;
      const gutter = mobile ? 20 : Math.min(64, Math.max(24, width * 0.04));
      // Max height available for car frame
      const availableHeight = Math.max(500, window.innerHeight - 280);
      const maxW = Math.min(width - 2 * gutter, availableHeight * (1672 / 941));
      setPlaneWidth(Math.round(maxW));
    };
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(el);
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      [ROOT_IMAGE, systems.inspection.image, systems.testing.image].map(
        (source) =>
          new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
              image.decode().then(resolve, resolve);
            };
            image.onerror = reject;
            image.src = source;
          })
      )
    )
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError('An inspection asset could not load. Reload to retry.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function finish(returning: boolean, id = selected) {
    clearTimeout(timer.current);
    setPhase(returning ? 'overview' : 'detail');
    setDetailVisible(!returning);
    lock.current = false;
    setTimeout(() => {
      if (returning) {
        entryButtons.current[id]?.focus({ preventScroll: true });
      } else {
        closeButton.current?.focus({ preventScroll: true });
      }
    }, 0);
  }

  function transition(id: SystemId, returning = false) {
    if (appearance || lock.current || !ready || (!returning && phase !== 'overview')) return;
    lock.current = true;
    const token = ++request.current;
    setSelected(id);
    setHovered(null);
    setAnnotation(null);
    setError('');
    setPhase(returning ? 'returning' : 'entering');

    revealTimer.current = window.setTimeout(
      () => {
        if (request.current === token) setDetailVisible(!returning);
      },
      reduced ? 0 : 350
    );
    timer.current = window.setTimeout(
      () => {
        if (request.current === token) finish(returning, id);
      },
      reduced ? 0 : 1250
    );
  }

  function returnToCar() {
    if (phase === 'detail') void transition(selected, true);
  }

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (appearance) closeAppearance();
        else returnToCar();
      }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  });

  const activeHover =
    !appearance && (hovered === 'inspection' || hovered === 'testing')
      ? hovered === 'inspection'
        ? 'drive'
        : 'battery'
      : null;

  return (
    <section
      ref={heroRef}
      className={`veyra-experience phase-${phase} ${reduced ? 'reduced' : ''}`}
      style={
        {
          '--scene-width': `${planeWidth}px`,
          '--scene-height': `${(planeWidth * 941) / 1672}px`,
        } as CSSProperties
      }
      aria-busy={busy}
      aria-label="Vtest Interactive Automotive Inspection"
    >
      {/* ── Intro Header: Cleanly sits ABOVE the vehicle plane ── */}
      <div className={`veyra-intro-container ${phase !== 'overview' ? 'hide' : ''}`} aria-hidden={phase !== 'overview'}>
        <div className="veyra-intro-content">
          <div className="veyra-headline-block">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#2ECC71] block mb-2">
              VTEST / AUTOMOTIVE TESTING &amp; INSPECTION
            </span>
            <h1 className="veyra-headline">
              Engineering Smarter<br />
              Testing &amp; Inspection <span className="text-[#2ECC71]">Solutions.</span>
            </h1>
          </div>

          <div className="veyra-intro-action">
            <p className="veyra-intro-description">
              Integrated software, hardware, and automation technology for vehicle inspection, end-of-line testing,
              and test lane management.
            </p>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-2 text-xs text-[#94A3B8] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                Select a hotspot to inspect
              </span>
              <Link to="/request-demo" id="hero-request-demo" className="veyra-btn-primary">
                Request a Demo <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Vehicle Stage with 1672:941 Image Plane ── */}
      <div className="veyra-stage-wrapper">
        {/* Back button visible during detail view */}
        {phase !== 'overview' && (
          <button
            ref={closeButton}
            className="veyra-back"
            onClick={returnToCar}
            disabled={busy}
            aria-label="Back to vehicle inspection overview"
          >
            <ArrowLeft size={16} />
            <span>{phase === 'returning' ? 'Returning to overview' : 'Back to vehicle overview'}</span>
            <kbd>Esc</kbd>
          </button>
        )}

        <div
          className="image-plane"
          style={
            {
              width: `${planeWidth}px`,
              height: `${(planeWidth * 941) / 1672}px`,
              '--focus-x': `${current.anchor.x}%`,
              '--focus-y': `${current.anchor.y}%`,
            } as CSSProperties
          }
        >
          {/* Framed Media Envelope */}
          <div className="media-envelope">
            <div className="exterior-envelope">
              <div className="car-visual">
                <img
                  className="car-image"
                  src={ROOT_IMAGE}
                  alt="Vtest vehicle inspection study"
                  draggable={false}
                />
                <HoverVideo
                  desired={activeHover}
                  mode={phase}
                  reduced={reduced}
                  onNeutral={setNeutral}
                />
                <div
                  className={`appearance-visual ${appearance && neutral && !appearanceClosing ? 'shown' : ''}`}
                  aria-hidden="true"
                >
                  <img src={appearanceImage} alt="" draggable={false} />
                </div>
              </div>
            </div>
            <div className={`detail-visual ${detailVisible ? 'shown' : ''}`}>
              <img
                className="detail-image"
                src={current.image}
                alt={`Technical cutaway of ${current.label}`}
                draggable={false}
              />
            </div>
          </div>

          {/* Hotspots */}
          {phase === 'overview' &&
            ready &&
            hotspots.map((item) => {
              const { id, target } = item;
              const enabled = canUseHotspot(appearance, id, appearanceClosing);

              if (id === 'paint' || id === 'wheels') {
                return (
                  <div
                    key={id}
                    className={`appearance-hotspot ${appearance === id ? 'expanded' : ''}`}
                    style={
                      {
                        '--anchor-x': `${item.anchor.x}%`,
                        '--anchor-y': `${item.anchor.y}%`,
                      } as CSSProperties
                    }
                    onPointerEnter={() => openAppearance(id)}
                    onPointerLeave={(event) => {
                      if (!appearancePinned && !event.currentTarget.contains(document.activeElement)) {
                        leaveTimer.current = window.setTimeout(() => closeAppearance(false), 140);
                      }
                    }}
                    onBlur={(event) => {
                      if (!appearancePinned && !event.currentTarget.contains(event.relatedTarget as Node)) {
                        closeAppearance(false);
                      }
                    }}
                  >
                    <button
                      ref={(node) => {
                        appearanceButtons.current[id] = node;
                      }}
                      className={`hotspot ${appearance === id ? 'active' : ''}`}
                      disabled={!enabled}
                      onFocus={() => {
                        if (!suppressFocus.current) openAppearance(id);
                      }}
                      onClick={() => {
                        if (appearance === id && appearancePinned) closeAppearance();
                        else {
                          openAppearance(id);
                          setAppearancePinned(true);
                        }
                      }}
                      aria-expanded={appearance === id && !appearanceClosing}
                      aria-controls={`appearance-${id}`}
                      aria-label={item.label}
                    >
                      <span className="hotspot-ring">
                        {appearance === id && appearancePinned ? (
                          <X size={14} strokeWidth={1.5} />
                        ) : (
                          <Plus size={14} strokeWidth={1.5} />
                        )}
                      </span>
                      <span className="hotspot-label">
                        {item.index} / {id === 'paint' ? 'Vehicle Finish' : 'Wheel System'}
                      </span>
                    </button>
                    {appearance === id && !appearanceClosing && <span className="menu-bridge" aria-hidden="true" />}
                    {appearance === id && !appearanceClosing && (
                      <AppearanceMenu
                        mode={id}
                        selected={optionId}
                        loaded={loadedOptions}
                        unavailable={failedOptions}
                        waiting={!neutral}
                        onSelect={chooseAppearance}
                        onClose={() => closeAppearance()}
                      />
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={id}
                  ref={(node) => {
                    if (target) entryButtons.current[target] = node;
                  }}
                  className={`hotspot ${hovered === id ? 'active' : ''}`}
                  style={{ left: `${item.anchor.x}%`, top: `${item.anchor.y}%` }}
                  disabled={!enabled}
                  onPointerEnter={() => {
                    if (enabled) setHovered(id);
                  }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => {
                    if (enabled) setHovered(id);
                  }}
                  onBlur={() => setHovered(null)}
                  onClick={target ? () => void transition(target) : undefined}
                  aria-label={target ? systems[target].short : item.label}
                >
                  <span className="hotspot-ring">
                    <Plus size={14} strokeWidth={1.5} />
                  </span>
                  <span className="hotspot-label">
                    {item.index} / {item.label}
                    {target && <ArrowUpRight size={13} />}
                  </span>
                </button>
              );
            })}

          {/* Technical Annotations in detail view */}
          {phase === 'detail' &&
            current.points.map((point, i) => (
              <button
                key={point.label}
                className={`annotation ${annotation === i ? 'open' : ''}`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                aria-label={point.label}
                aria-expanded={annotation === i}
                onClick={() => setAnnotation(annotation === i ? null : i)}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className="annotation-label">{point.label}</span>
              </button>
            ))}
        </div>

        {/* Technical Detail Aside */}
        <aside className={`veyra-detail-copy ${phase === 'detail' ? 'shown' : ''}`} aria-hidden={phase !== 'detail'}>
          <div className="detail-introduction">
            <p className="eyebrow">{current.category}</p>
            <h2>
              {current.title.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="system-description">{current.description}</p>
          </div>
          <div className="detail-components">
            <div className="part-list">
              {current.points.map((point, i) => (
                <button
                  key={point.label}
                  tabIndex={phase === 'detail' ? 0 : -1}
                  className={annotation === i ? 'selected' : ''}
                  onClick={() => setAnnotation(annotation === i ? null : i)}
                  aria-expanded={annotation === i}
                >
                  <span className="part-row">
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    {point.label}
                    <Plus size={14} />
                  </span>
                  {annotation === i && <span className="part-description">{point.text}</span>}
                </button>
              ))}
            </div>
            <div className="benefit">
              <span>Operational Advantage</span>
              <p>{current.benefit}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <Link to={`/solutions/${current.slug}`} className="veyra-solution-link">
                View Full {current.label} Architecture <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Status indicator during transition */}
        {(busy || !ready) && (
          <div className="transition-status">
            <span className="small-dot" />
            {!ready
              ? 'Initializing inspection views…'
              : phase === 'returning'
              ? 'Returning to exterior overview'
              : `Opening ${current.label} analysis…`}
          </div>
        )}
      </div>

      {/* ── 4-Column Technical Information Row ── */}
      <div className="veyra-scene-footer">
        <div className="feature-notes" aria-label="Inspection Capabilities">
          {technicalFeatures.map((feat) => (
            <div
              key={feat.index}
              className={`feature-note group cursor-pointer ${
                feat.target && phase === 'overview' ? 'hover:border-[#2ECC71]/50' : ''
              }`}
              onClick={() => {
                if (feat.target && phase === 'overview') {
                  void transition(feat.target);
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#2ECC71]">
                  {feat.index} — CAPABILITY
                </span>
                {feat.target && (
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 group-hover:opacity-100 text-[#2ECC71] transition-opacity"
                  />
                )}
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>

        <div className="footer-baseline">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">VTEST</span>
            <span>—</span>
            <span>Engineering Smarter Testing &amp; Inspection Solutions</span>
          </div>
          <div className="flex items-center gap-4 text-[#94A3B8]">
            <span>
              {phase === 'overview'
                ? 'Hover or select hotspots to inspect vehicle systems'
                : 'Technical detail mode — Press Esc to return'}
            </span>
            <span className="hidden sm:inline-block">•</span>
            <a
              href="#about-section"
              className="hidden sm:inline-flex items-center gap-1 text-[#2ECC71] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Scroll to explore <ChevronDown size={14} />
            </a>
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {busy
          ? `${phase === 'entering' ? 'Opening' : 'Closing'} ${current.label}`
          : phase === 'detail'
          ? `${current.label} inspection view. Press Escape to return.`
          : 'Vehicle inspection overview. Choose an inspection point.'}
      </p>

      {error && (
        <div className="error-message" role="alert">
          {error}
          <button onClick={() => setError('')} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

export default AutomotiveHero;
