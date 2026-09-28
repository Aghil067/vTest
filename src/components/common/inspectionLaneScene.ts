import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export interface InspectionLaneScene { setProgress(value: number): void; dispose(): void; }

function release(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => {
      materials.add(material);
      Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); });
    });
  });
  geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose()); textures.forEach(value => value.dispose());
}

/** An event-driven scene: no autonomous render loop, shadows or post-processing. */
export function mountInspectionLane(host: HTMLElement): InspectionLaneScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
  renderer.setClearColor(0x09120f, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.domElement.style.opacity = '0';
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x09120f, 12, 25);
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 40);
  const ambient = new THREE.HemisphereLight(0xd8ffe8, 0x1b3023, 3);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(4, 8, 5); scene.add(key);
  const edge = new THREE.DirectionalLight(0x61efb3, 2); edge.position.set(-5, 4, -4); scene.add(edge);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x1c3027, roughness: .78, metalness: .25 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x798a84, roughness: .4, metalness: .8 });
  const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x67efac });
  const floor = new THREE.Mesh(new THREE.BoxGeometry(7.8, .18, 4.3), baseMaterial);
  floor.position.y = -.12; scene.add(floor);
  const grid = new THREE.GridHelper(24, 32, 0x355847, 0x15271e); grid.position.y = -.23; scene.add(grid);
  for (const z of [-1.78, 1.78]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(7.3, .025, .035), lightMaterial); rail.position.set(0, 0, z); scene.add(rail);
  }
  const rollers: THREE.Mesh[] = [];
  const rollerGeometry = new THREE.CylinderGeometry(.14, .14, .68, 12);
  const stripeGeometry = new THREE.BoxGeometry(.045, .62, .015);
  for (const x of [-1.5, 1.5]) for (const z of [-.95, .95]) for (const offset of [-.22, .22]) {
    const roller = new THREE.Mesh(rollerGeometry, steel);
    const stripe = new THREE.Mesh(stripeGeometry, lightMaterial);
    stripe.position.z = .14; roller.add(stripe); rollers.push(roller);
    roller.rotation.x = Math.PI / 2; roller.position.set(x + offset, .025, z); scene.add(roller);
  }
  // Shared low-poly geometry keeps the additional equipment inexpensive to draw.
  const unitBox = new THREE.BoxGeometry(1, 1, 1);
  const housing = new THREE.MeshStandardMaterial({ color: 0x263c32, roughness: .55, metalness: .5 });
  const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x14372a });
  const box = (parent: THREE.Object3D, size: number[], position: number[], material: THREE.Material) => {
    const mesh = new THREE.Mesh(unitBox, material);
    mesh.scale.set(size[0], size[1], size[2]); mesh.position.set(position[0], position[1], position[2]);
    parent.add(mesh); return mesh;
  };
  const brakeBench = new THREE.Group(); scene.add(brakeBench);
  for (const x of [-1.5, 1.5]) for (const z of [-.95, .95]) {
    box(brakeBench, [1.05, .1, .9], [x, -.045, z], housing);
    box(brakeBench, [1.05, .025, .025], [x, .025, z + .46], lightMaterial);
  }
  const suspension = new THREE.Group(); scene.add(suspension);
  const plates: THREE.Group[] = [];
  for (const z of [-.95, .95]) {
    const plate = new THREE.Group(); plate.position.set(-1.5, .08, z); suspension.add(plate); plates.push(plate);
    box(plate, [.95, .075, .85], [0, 0, 0], steel);
    for (const x of [-.35, 0, .35]) box(plate, [.025, .015, .76], [x, .043, 0], lightMaterial);
  }
  const lighting = new THREE.Group(); scene.add(lighting);
  const lensGeometry = new THREE.CylinderGeometry(.17, .17, .05, 16);
  const beamMaterial = new THREE.MeshBasicMaterial({ color: 0xb8ffe1, transparent: true, opacity: .08, depthWrite: false, side: THREE.DoubleSide });
  const beamGeometry = new THREE.ConeGeometry(.32, .85, 16, 1, true);
  for (const z of [-.8, .8]) {
    box(lighting, [.65, .09, .48], [0, .025, z], housing);
    box(lighting, [.055, .9, .055], [-.15, .5, z], steel);
    box(lighting, [.38, .34, .4], [0, .85, z], housing);
    const lens = new THREE.Mesh(lensGeometry, lightMaterial);
    lens.rotation.z = Math.PI / 2; lens.position.set(.21, .85, z); lighting.add(lens);
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.rotation.z = Math.PI / 2; beam.position.set(.67, .85, z); lighting.add(beam);
  }
  const consoleStation = new THREE.Group(); consoleStation.position.set(2.65, 0, 1.65); scene.add(consoleStation);
  box(consoleStation, [.7, .12, .6], [0, .04, 0], housing);
  box(consoleStation, [.18, 1.1, .18], [0, .62, 0], steel);
  box(consoleStation, [.95, .65, .13], [0, 1.48, 0], housing);
  box(consoleStation, [.83, .52, .015], [0, 1.48, .075], screenMaterial);
  const readings: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) readings.push(box(consoleStation, [.1, .08, .018], [-.29 + i * .19, 1.35, .09], lightMaterial));
  const link = box(scene, [2.2, .016, .025], [1.3, .025, 1.5], lightMaterial);
  // The original lane expands into an open-sided testing centre as the user scrolls.
  // Keep the camera-facing side open so the equipment and vehicle stay visible.
  const centre = new THREE.Group(); scene.add(centre);
  const architecture = new THREE.MeshStandardMaterial({ color: 0x406050, roughness: .7, metalness: .35 });
  const caution = new THREE.MeshBasicMaterial({ color: 0xe7b85b });
  box(centre, [10.5, .16, 7], [0, -.28, 0], baseMaterial);
  box(centre, [10.5, .75, .16], [0, .12, -3.3], architecture);
  for (const x of [-4.8, 0, 4.8]) {
    box(centre, [.2, 3.8, .2], [x, 1.65, -3.2], steel);
    box(centre, [.055, 3.3, .025], [x, 1.65, -3.08], lightMaterial);
  }
  box(centre, [9.8, .2, .22], [0, 3.5, -3.2], steel);
  for (const x of [-4.8, 4.8]) {
    box(centre, [.16, .16, 4.8], [x, 3.5, -.9], steel);
    box(centre, [.07, .04, 4.3], [x, 3.39, -.9], lightMaterial);
  }
  for (const x of [-4.25, 4.25]) {
    box(centre, [.06, .018, 5.9], [x, -.18, 0], caution);
    for (let i = 0; i < 5; i++) box(centre, [.45, .02, .08], [x, -.17, -1.8 + i * .85], caution);
  }
  // Large rear results board, visible throughout the orbit from the open front.
  const resultsBoard = new THREE.Group(); resultsBoard.position.set(1.65, 2.25, -3.05); centre.add(resultsBoard);
  box(resultsBoard, [2.7, 1.3, .12], [0, 0, 0], housing);
  box(resultsBoard, [2.5, 1.12, .025], [0, 0, .08], screenMaterial);
  const resultBars: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    box(resultsBoard, [.16, .12, .03], [-1.05, .36 - i * .24, .105], lightMaterial);
    resultBars.push(box(resultsBoard, [.15, .085, .03], [-.8, .36 - i * .24, .105], lightMaterial));
  }
  const lift = new THREE.Group(); scene.add(lift);
  const liftDeck = new THREE.Group(); lift.add(liftDeck);
  for (const z of [-.95, .95]) {
    box(liftDeck, [5.6, .14, .72], [0, .015, z], steel);
    box(liftDeck, [5.6, .035, .055], [0, .095, z + .36], caution);
  }
  const liftPistons: THREE.Mesh[] = [];
  for (const x of [-1.85, 1.85]) for (const z of [-.95, .95]) {
    box(lift, [.5, .12, .5], [x, -.04, z], housing);
    liftPistons.push(box(lift, [.16, .1, .16], [x, .05, z], steel));
  }
  // A prominent side-mounted inspection arm sweeps a sensor beneath the raised car.
  const robot = new THREE.Group(); robot.position.set(-.4, 0, 2.65); scene.add(robot);
  box(robot, [.85, .2, .85], [0, -.05, 0], housing);
  box(robot, [.35, .7, .35], [0, .35, 0], architecture);
  const arm = new THREE.Group(); arm.position.y = .75; robot.add(arm);
  box(arm, [.16, .16, 1.8], [0, 0, -.8], steel);
  box(arm, [.42, .26, .38], [0, 0, -1.65], housing);
  box(arm, [.3, .02, .26], [0, .15, -1.65], lightMaterial);
  const sensorLight = new THREE.Mesh(new THREE.ConeGeometry(.38, .65, 12, 1, true), beamMaterial);
  sensorLight.rotation.z = Math.PI; sensorLight.position.set(0, .47, -1.65); arm.add(sensorLight);
  // An emissions analyser cabinet with a hose that deploys towards the exhaust.
  const analyser = new THREE.Group(); analyser.position.set(3.65, 0, -1.7); scene.add(analyser);
  box(analyser, [.8, 1.3, .7], [0, .6, 0], architecture);
  box(analyser, [.62, .42, .03], [0, .91, .37], screenMaterial);
  box(analyser, [.4, .05, .035], [0, .93, .39], lightMaterial);
  for (let i = 0; i < 4; i++) box(analyser, [.55, .025, .02], [0, .15 + i * .1, .37], housing);
  const hoseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.65, .6, -1.3), new THREE.Vector3(3.5, .2, -.5),
    new THREE.Vector3(2.9, .15, 0), new THREE.Vector3(2.35, .38, .35),
  ]);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(hoseCurve, 20, .045, 6, false), steel); scene.add(hose);
  const vehicleRig = new THREE.Group(); scene.add(vehicleRig);
  // Additional stations use the same geometry/material pool; no extra model downloads.
  const extraction = new THREE.Group(); scene.add(extraction);
  box(extraction, [.15, .15, 3.1], [3.45, 3.35, -1.7], steel);
  const duct = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, 1, 12), housing);
  duct.position.set(3.45, 2.7, -.25); extraction.add(duct);
  const hood = new THREE.Mesh(new THREE.CylinderGeometry(.13, .38, .35, 12, 1, true), steel);
  hood.position.set(3.45, 2, -.25); extraction.add(hood);
  const exhaustFlow = new THREE.Group(); extraction.add(exhaustFlow);
  const flowRings: THREE.Mesh[] = [];
  const flowGeometry = new THREE.TorusGeometry(.2, .018, 4, 16);
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(flowGeometry, lightMaterial);
    ring.rotation.x = Math.PI / 2; ring.position.set(3.45, 1.2 + i * .3, -.25);
    flowRings.push(ring); exhaustFlow.add(ring);
  }
  const alignment = new THREE.Group(); scene.add(alignment);
  const wheelTargets: THREE.Group[] = [];
  for (const x of [-1.5, 1.5]) for (const side of [-1, 1]) {
    const target = new THREE.Group(); target.position.set(x, .58, side * 2.3); alignment.add(target); wheelTargets.push(target);
    box(target, [.52, .52, .08], [0, 0, 0], steel);
    box(target, [.44, .44, .09], [0, 0, 0], screenMaterial);
    for (const dx of [-.12, .12]) for (const dy of [-.12, .12]) box(target, [.09, .09, .11], [dx, dy, 0], lightMaterial);
  }
  const alignmentHeads: THREE.Group[] = [];
  const opticalPaths: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const head = new THREE.Group(); head.position.set(-2.9, 0, side * 2.65); alignment.add(head); alignmentHeads.push(head);
    box(head, [.65, .12, .6], [0, 0, 0], housing);
    box(head, [.12, 1.65, .12], [0, .85, 0], steel);
    box(head, [.75, .28, .35], [0, 1.65, 0], architecture);
    box(head, [.16, .16, .38], [-.2, 1.65, 0], lightMaterial);
    const optical = box(alignment, [4.4, .018, .018], [-.65, .58, side * 1.42], lightMaterial);
    opticalPaths.push(optical);
  }
  // Four additional inspection stations extend the lane without adding model downloads.
  const underbodyScan = new THREE.Group(); scene.add(underbodyScan);
  for (const z of [-.7, .7]) box(underbodyScan, [5.1, .045, .055], [0, .12, z], steel);
  const underbodyHead = new THREE.Group(); underbodyHead.position.set(-2.5, .3, 0); underbodyScan.add(underbodyHead);
  box(underbodyHead, [.48, .14, 1.7], [0, 0, 0], housing);
  box(underbodyHead, [.3, .025, 1.35], [0, .085, 0], lightMaterial);
  const underbodyBeam = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 1.4), new THREE.MeshBasicMaterial({ color: 0x67efac, transparent: true, opacity: .12, side: THREE.DoubleSide, depthWrite: false }));
  underbodyBeam.rotation.x = -Math.PI / 2; underbodyBeam.position.y = .21; underbodyHead.add(underbodyBeam);

  const tyreScan = new THREE.Group(); scene.add(tyreScan);
  const tyreHeads: THREE.Mesh[] = [];
  for (const x of [-1.5, 1.5]) for (const side of [-1, 1]) {
    box(tyreScan, [.12, .82, .12], [x, .42, side * 1.72], steel);
    const head = box(tyreScan, [.38, .18, .22], [x, .72, side * 1.72], housing);
    box(head, [.26, .035, .025], [0, -.035, side * -.12], lightMaterial);
    tyreHeads.push(head);
  }

  const weighing = new THREE.Group(); scene.add(weighing);
  const weightPads: THREE.Mesh[] = [];
  for (const x of [-1.5, 1.5]) for (const z of [-.95, .95]) {
    const pad = box(weighing, [1.08, .08, .82], [x, -.015, z], housing); weightPads.push(pad);
    box(pad, [.86, .018, .62], [0, .52, 0], lightMaterial);
  }
  const weightDisplay = new THREE.Group(); weightDisplay.position.set(3.2, 0, 1.5); weighing.add(weightDisplay);
  box(weightDisplay, [.12, 1.3, .12], [0, .62, 0], steel);
  box(weightDisplay, [.95, .65, .14], [0, 1.48, 0], housing);
  box(weightDisplay, [.82, .5, .02], [0, 1.48, .085], screenMaterial);
  const weightBars: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) weightBars.push(box(weightDisplay, [.11, .08, .025], [-.25 + i * .17, 1.38, .105], lightMaterial));

  const adasTarget = new THREE.Group(); adasTarget.position.set(-3.25, 0, -2.45); scene.add(adasTarget);
  box(adasTarget, [.12, 2.2, .12], [0, 1.1, 0], steel);
  box(adasTarget, [.12, .12, .12], [0, 2.18, 0], housing);
  box(adasTarget, [1.15, 1.55, .1], [0, 2.1, -.02], housing);
  box(adasTarget, [1.02, 1.42, .025], [0, 2.1, .05], screenMaterial);
  box(adasTarget, [.78, .035, .04], [0, 2.1, .08], lightMaterial);
  box(adasTarget, [.035, .92, .04], [0, 2.1, .08], lightMaterial);
  const targetRing = new THREE.Mesh(new THREE.TorusGeometry(.28, .025, 6, 20), lightMaterial);
  targetRing.position.set(0, 2.1, .085); adasTarget.add(targetRing);
  const exitLane = new THREE.Group(); scene.add(exitLane);
  box(exitLane, [4.8, .16, 3.35], [-5.1, -.25, 0], baseMaterial);
  for (const z of [-1.5, 1.5]) box(exitLane, [4.8, .02, .045], [-5.1, -.155, z], caution);
  const gate = new THREE.Group(); gate.position.set(-4.6, 0, -1.65); exitLane.add(gate);
  box(gate, [.45, 1.05, .45], [0, .4, 0], housing);
  const barrier = new THREE.Group(); barrier.position.y = .9; gate.add(barrier);
  box(barrier, [.12, .12, 3.35], [0, 0, 1.6], steel);
  for (let i = 0; i < 7; i++) box(barrier, [.135, .135, .2], [0, 0, .2 + i * .46], caution);
  box(gate, [.08, 1, .08], [0, 1.25, 0], steel);
  const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xe7b85b });
  const signal = new THREE.Mesh(new THREE.SphereGeometry(.14, 12, 8), signalMaterial);
  signal.position.set(0, 1.85, 0); gate.add(signal);
  const gantry = new THREE.Group();
  for (const z of [-1.6, 1.6]) {
    const upright = new THREE.Mesh(new THREE.BoxGeometry(.07, 2.8, .07), lightMaterial);
    upright.position.set(0, 1.4, z); gantry.add(upright);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(.07, .07, 3.25), lightMaterial); top.position.y = 2.8; gantry.add(top);
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.8), new THREE.MeshBasicMaterial({ color: 0x59efa2, transparent: true, opacity: .045, side: THREE.DoubleSide, depthWrite: false }));
  scan.rotation.y = Math.PI / 2; scan.position.y = 1.4; gantry.add(scan); scene.add(gantry);
  const decoder = new DRACOLoader(); decoder.setDecoderPath('/draco/'); decoder.setWorkerLimit(1);
  const loader = new GLTFLoader(); loader.setDRACOLoader(decoder);
  let disposed = false;
  let current = 0;
  const render = () => { if (!disposed) renderer.render(scene, camera); };
  const ramp = (value: number, start: number, end: number) => {
    const t = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const reveal = (group: THREE.Group, amount: number) => {
    group.visible = amount > .001;
    group.scale.setScalar(Math.max(.001, amount));
  };
  const update = (progress: number) => {
    current = progress;
    // Keep the first four scenes, insert four new stations, then continue the existing sequence.
    const legacyProgress = progress <= 1 / 3 ? progress * 1.5 : progress < 2 / 3 ? .5 : .5 + (progress - 2 / 3) * 1.5;
    const value = Math.min(legacyProgress * 1.6, .8);
    const angle = .64 + progress * 1.8;
    const brake = ramp(value, .2, .38);
    const suspensionTime = THREE.MathUtils.clamp((value - .4) / .2, 0, 1);
    const suspensionReveal = ramp(value, .4, .44) * (1 - ramp(value, .56, .6));
    const lights = ramp(value, .6, .68);
    const connected = ramp(legacyProgress, .75, .82);
    const departure = ramp(legacyProgress, .94, 1);
    const retract = 1 - ramp(legacyProgress, .88, .93);
    const building = ramp(value, .04, .22);
    centre.visible = building > .001;
    centre.scale.y = Math.max(.001, building);
    const raised = ramp(value, .4, .48) * (1 - ramp(value, .57, .64));
    const liftHeight = raised * 1.15;
    reveal(lift, ramp(value, .38, .42));
    liftDeck.position.y = liftHeight;
    liftPistons.forEach(piston => { piston.scale.y = .1 + liftHeight; piston.position.y = liftHeight / 2; });
    vehicleRig.position.y = liftHeight - departure * .28;
    vehicleRig.position.x = -3.3 * departure;
    vehicleRig.rotation.x = Math.sin(suspensionTime * Math.PI * 10) * .018 * raised;
    reveal(robot, ramp(value, .39, .45));
    arm.rotation.y = Math.sin(suspensionTime * Math.PI * 2) * .65 + ramp(legacyProgress, .85, .92) * Math.PI / 2;
    arm.position.y = .75 + raised * .15;
    sensorLight.visible = raised > .3;
    const emissions = ramp(legacyProgress, .5, .55);
    reveal(analyser, emissions);
    hose.visible = emissions > 0 && retract > 0;
    hose.geometry.setDrawRange(0, Math.floor(ramp(legacyProgress, .53, .6) * retract * (hose.geometry.index?.count ?? 0) / 3) * 3);
    reveal(extraction, emissions);
    const extension = ramp(legacyProgress, .54, .6) * retract;
    duct.scale.y = .8 + extension * 1.2; duct.position.y = 3.35 - duct.scale.y / 2;
    hood.position.y = 3.35 - duct.scale.y - .15;
    exhaustFlow.visible = legacyProgress > .55 && legacyProgress < .625;
    flowRings.forEach((ring, i) => { ring.position.y = 1.15 + ((progress * 28 + i * .3) % 1.25); });
    const aligned = ramp(legacyProgress, .625, .675);
    reveal(alignment, aligned * retract);
    wheelTargets.forEach((target, i) => { target.position.z = (i % 2 === 0 ? -1 : 1) * (2.3 - aligned * .88); });
    alignmentHeads.forEach((head, i) => { head.rotation.y = (i === 0 ? 1 : -1) * (.35 + Math.sin(ramp(legacyProgress, .675, .75) * Math.PI) * .25); });
    opticalPaths.forEach(path => { path.scale.x = 4.4 * ramp(legacyProgress, .675, .72); });
    reveal(exitLane, ramp(legacyProgress, .84, .9));
    barrier.rotation.x = -ramp(legacyProgress, .89, .94) * Math.PI / 2;
    signalMaterial.color.setHex(legacyProgress >= .94 ? 0x67efac : 0xe7b85b);
    const underbody = ramp(progress, 1 / 3, 5 / 12) * (1 - ramp(progress, 5 / 12, .45));
    reveal(underbodyScan, underbody);
    underbodyHead.position.x = -2.5 + ramp(progress, 1 / 3, 5 / 12) * 5;
    const tyreCheck = ramp(progress, 5 / 12, .5) * (1 - ramp(progress, .5, 7 / 12));
    reveal(tyreScan, tyreCheck);
    tyreHeads.forEach((head, index) => { head.position.z = (index % 2 === 0 ? -1 : 1) * (1.72 - tyreCheck * .36); });
    const weighingProgress = ramp(progress, .5, 7 / 12);
    reveal(weighing, weighingProgress * (1 - ramp(progress, 7 / 12, 2 / 3)));
    weightPads.forEach((pad, index) => { pad.position.y = -.015 + weighingProgress * (.025 + index * .003); });
    weightBars.forEach((bar, index) => { bar.scale.y = .25 + weighingProgress * (.45 + index * .12); });
    const calibration = ramp(progress, 7 / 12, 2 / 3);
    reveal(adasTarget, calibration);
    targetRing.rotation.z = progress * Math.PI * 5;
    resultBars.forEach((bar, index) => {
      const width = .12 + ramp(legacyProgress, .14 + index * .2, .22 + index * .2) * (1.4 - index * .15);
      bar.scale.x = width; bar.position.x = -.8 + width / 2;
    });
    reveal(brakeBench, ramp(value, .18, .24));
    rollers.forEach(roller => { roller.rotation.y = brake * Math.PI * 12; });
    reveal(suspension, suspensionReveal);
    plates.forEach((plate, index) => { plate.position.y = .08 + liftHeight + Math.sin(suspensionTime * Math.PI * 12 + index * Math.PI) * .035 * suspensionReveal; });
    reveal(lighting, lights);
    lighting.scale.setScalar(1.25);
    lighting.position.x = -4.1 + lights * .95;
    lighting.position.z = ramp(legacyProgress, .82, .9) * 2.8;
    beamMaterial.opacity = .035 + .07 * Math.sin(ramp(value, .68, .8) * Math.PI);
    reveal(consoleStation, connected);
    consoleStation.scale.setScalar(1.35);
    readings.forEach((reading, index) => {
      const height = .06 + ramp(legacyProgress, .76 + index * .02, .81 + index * .02) * (.12 + index * .055);
      reading.scale.y = height; reading.position.y = 1.27 + height / 2;
    });
    link.visible = connected > .001; link.scale.x = 2.2 * connected;
    const radius = 9.8 + building * 3.2 + ramp(legacyProgress, .86, 1) * 2.2;
    camera.position.set(Math.cos(angle) * radius, 4.3 + building * 1.4 + raised * .5, Math.sin(angle) * radius);
    camera.lookAt(-departure, .65 + building * .25, 0); gantry.position.x = -3.05 + ramp(value, 0, .2) * 6.1; render();
  };
  const resize = () => {
    if (disposed) return;
    const width = Math.max(1, host.clientWidth), height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); render();
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize(); update(0);
  void loader.loadAsync('/models/inspection-car-mobile.glb').then(gltf => {
    if (disposed) { release(gltf.scene); return; }
    const car = gltf.scene;
    let bounds = new THREE.Box3().setFromObject(car);
    const size = bounds.getSize(new THREE.Vector3());
    if (size.z > size.x) car.rotation.y = Math.PI / 2;
    bounds = new THREE.Box3().setFromObject(car);
    const dimensions = bounds.getSize(new THREE.Vector3()), center = bounds.getCenter(new THREE.Vector3());
    const scale = 4.8 / Math.max(dimensions.x, dimensions.z);
    car.scale.setScalar(scale); car.position.set(-center.x * scale, .11 - bounds.min.y * scale, -center.z * scale);
    vehicleRig.add(car); update(current); renderer.domElement.style.opacity = '1'; host.classList.add('is-ready');
  }).catch(() => { /* Keep the photo visible when the model cannot load. */ });
  return { setProgress: value => { if (!disposed) update(value); }, dispose: () => {
    disposed = true; observer.disconnect(); decoder.dispose(); release(scene);
    grid.geometry.dispose(); (grid.material as THREE.Material).dispose();
    renderer.dispose(); renderer.domElement.remove(); host.classList.remove('is-ready');
  } };
}
