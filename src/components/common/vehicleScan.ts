import {
  BufferGeometry, Float32BufferAttribute, Group, LineBasicMaterial, LineLoop,
  LineSegments, PerspectiveCamera, Points, PointsMaterial, Scene, Vector3, WebGLRenderer,
} from 'three';

/** Optional enhancement: one transparent canvas, six draw calls, no textures or postprocessing. */
export function mountVehicleScan(host: HTMLDivElement) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 30);
  camera.position.set(0, 2.2, 8);
  camera.lookAt(0, 0, 0);
  const rig = new Group();
  scene.add(rig);
  const lineMaterial = new LineBasicMaterial({ color: 0x6fe7a0, transparent: true, opacity: 0.18 });
  const scanMaterial = new LineBasicMaterial({ color: 0xa7ffca, transparent: true, opacity: 0.6 });
  const pointMaterial = new PointsMaterial({ color: 0x91eab5, size: 0.024, transparent: true, opacity: 0.5 });
  const geometries: BufferGeometry[] = [];
  const geometry = (coordinates: number[]) => {
    const result = new BufferGeometry();
    result.setAttribute('position', new Float32BufferAttribute(coordinates, 3));
    geometries.push(result);
    return result;
  };
  const floor: number[] = [];
  for (let i = -6; i <= 6; i++) {
    const x = i * 0.5;
    floor.push(x, -0.95, -1.4, x, -0.95, 1.4);
  }
  for (let i = -3; i <= 3; i++) {
    const z = i * 0.45;
    floor.push(-3, -0.95, z, 3, -0.95, z);
  }
  rig.add(new LineSegments(geometry(floor), lineMaterial));
  const ringPoints = Array.from({ length: 96 }, (_, i) => {
    const angle = (i / 96) * Math.PI * 2;
    return new Vector3(Math.cos(angle) * 3.25, -0.97, Math.sin(angle) * 1.65);
  });
  const ringGeometry = new BufferGeometry().setFromPoints(ringPoints);
  geometries.push(ringGeometry);
  rig.add(new LineLoop(ringGeometry, lineMaterial));
  const scan = new LineLoop(geometry([0, -0.9, -1.35, 0, 1.25, -1.35, 0, 1.25, 1.35, 0, -0.9, 1.35]), scanMaterial);
  rig.add(scan);
  const particles: number[] = [];
  for (let i = 0; i < 72; i++) {
    const angle = i * 2.39996;
    particles.push(Math.cos(angle) * (2.5 + (i % 5) * 0.2), (i % 9) * 0.3 - 1, Math.sin(angle) * 1.8);
  }
  const points = new Points(geometry(particles), pointMaterial);
  rig.add(points);
  let active = false;
  let disposed = false;
  let failed = false;
  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let expensiveFrames = 0;
  let targetX = 0;
  let targetY = 0;
  const preferences = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const stage = host.parentElement!;
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; };
  const fail = () => {
    failed = true;
    stop();
    host.hidden = true;
    stage.classList.remove('has-webgl');
  };
  const draw = (now: number) => {
    frame = 0;
    if (disposed || failed || !active || document.hidden || !preferences.matches) return;
    frame = requestAnimationFrame(draw);
    if (previous && now - previous < 1000 / 30) return;
    elapsed += previous ? Math.min((now - previous) / 1000, 0.1) : 0;
    previous = now;
    rig.rotation.y += (targetX * 0.1 - rig.rotation.y) * 0.08;
    rig.rotation.x += (targetY * 0.04 - rig.rotation.x) * 0.08;
    scan.position.x = Math.sin(elapsed * 0.55) * 2.7;
    scanMaterial.opacity = 0.2 + Math.cos(elapsed * 0.55) ** 2 * 0.35;
    points.rotation.y = elapsed * 0.018;
    const start = performance.now();
    try { renderer.render(scene, camera); } catch { fail(); return; }
    // If rendering itself consistently exceeds the frame budget, retain the photograph.
    expensiveFrames = performance.now() - start > 24 ? expensiveFrames + 1 : Math.max(0, expensiveFrames - 1);
    if (expensiveFrames >= 12) fail();
  };
  const sync = () => {
    host.hidden = failed || !preferences.matches;
    stage.classList.toggle('has-webgl', !host.hidden);
    if (active && !document.hidden && preferences.matches && !failed && !disposed) {
      if (!frame) frame = requestAnimationFrame(draw);
    } else stop();
  };
  const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; sync(); });
  observer.observe(host);
  const resize = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    if (!width || !height || disposed) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  resize.observe(host);
  const move = (event: PointerEvent) => {
    if (!pointer.matches || !active) return;
    const bounds = stage.getBoundingClientRect();
    targetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    targetY = (event.clientY - bounds.top) / bounds.height - 0.5;
  };
  const reset = () => { targetX = 0; targetY = 0; };
  const contextLost = (event: Event) => { event.preventDefault(); fail(); };
  stage.addEventListener('pointermove', move, { passive: true });
  stage.addEventListener('pointerleave', reset);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  document.addEventListener('visibilitychange', sync);
  preferences.addEventListener('change', sync);
  return () => {
    disposed = true;
    stop(); observer.disconnect(); resize.disconnect();
    document.removeEventListener('visibilitychange', sync);
    preferences.removeEventListener('change', sync);
    stage.removeEventListener('pointermove', move);
    stage.removeEventListener('pointerleave', reset);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    geometries.forEach((item) => item.dispose());
    lineMaterial.dispose(); scanMaterial.dispose(); pointMaterial.dispose();
    renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    stage.classList.remove('has-webgl');
  };
}
