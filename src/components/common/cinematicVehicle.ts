import { ACESFilmicToneMapping, Box3, BufferGeometry, CanvasTexture, DirectionalLight, Float32BufferAttribute, Fog, GridHelper, Group, HemisphereLight, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PMREMGenerator, Quaternion, Scene, Vector3, WebGLRenderer, DoubleSide, type Material, type Object3D, type Texture } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { cameraFrames, clamp01, hotspotSpecs, segment, separationAt, smooth, type HotspotId } from './vehicleTimeline';

type Options = {
  mobile: boolean;
  reduced: boolean;
  onReady: (ready: boolean) => void;
  onProject: (id: HotspotId, x: number, y: number, visible: boolean) => void;
};

/** Scroll and focus blend through one camera owner. No continuously running render loop. */
export function createCinematicVehicle(host: HTMLElement, options: Options) {
  const low = options.mobile || (navigator.hardwareConcurrency || 8) <= 4;
  const renderer = new WebGLRenderer({ alpha: true, antialias: !low && devicePixelRatio < 2, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, low ? 1 : 1.5));
  renderer.setClearColor(0x0b1712, 1);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = .9;
  host.appendChild(renderer.domElement);
  const scene = new Scene();
  scene.fog = new Fog(0x0b1712, 9, 22);
  const camera = new PerspectiveCamera(36, 1, .05, 50);
  const room = new RoomEnvironment();
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(room, .05, .1, 30, { size: low ? 64 : 128 });
  scene.environment = env.texture;
  scene.environmentIntensity = .75;
  room.dispose(); pmrem.dispose();
  scene.add(new HemisphereLight(0xe0eee7, 0x15281d, .8));
  const key = new DirectionalLight(0xf1fff7, 2); key.position.set(3, 5, -3); scene.add(key);
  const rim = new DirectionalLight(0x60e69b, 1.3); rim.position.set(-4, 3, 2); scene.add(rim);
  const grid = new GridHelper(24, low ? 24 : 48, 0x244b37, 0x1b3529);
  grid.position.y = -.015;
  const gridMaterial = grid.material as Material;
  gridMaterial.transparent = true; gridMaterial.opacity = .10;
  scene.add(grid);
  const floor = new Mesh(new PlaneGeometry(28, 28), new MeshBasicMaterial({ color: 0x0b1712 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.03; scene.add(floor);
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64,64,12,64,64,64); gradient.addColorStop(0,'rgba(0,0,0,.8)'); gradient.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = gradient; ctx.fillRect(0,0,128,128);
  const shadowTexture = new CanvasTexture(shadowCanvas);
  const shadow = new Mesh(new PlaneGeometry(3.5,6),new MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));
  shadow.rotation.x = -Math.PI/2; shadow.position.y = -.005; scene.add(shadow);
  const scanMaterial = new MeshBasicMaterial({ color: 0x69e59b, transparent: true, opacity: .055, side: DoubleSide, depthWrite: false });
  const scan = new Mesh(new PlaneGeometry(3.4, 2.2), scanMaterial); scan.position.y = 1; scene.add(scan);
  const guideGeometry = new BufferGeometry(); const guidePositions = new Float32Array(24);
  guideGeometry.setAttribute('position', new Float32BufferAttribute(guidePositions,3));
  const guideMaterial = new LineBasicMaterial({color:0x69e59b,transparent:true,opacity:0});
  const guides = new LineSegments(guideGeometry,guideMaterial); guides.frustumCulled = false; scene.add(guides);
  const car = new Group(); scene.add(car);
  const draco = new DRACOLoader().setDecoderPath('/draco/').setWorkerLimit(1);
  const loader = new GLTFLoader().setDRACOLoader(draco);
  const materials = new Set<Material>();
  const scanUniform = {value:-3}; const scanStrength = {value:0};
  const body = new MeshPhysicalMaterial({color:0x66786d,metalness:.8,roughness:.32,clearcoat:1,clearcoatRoughness:.15});
  body.onBeforeCompile = shader => {
    shader.uniforms.inspectionPlane = scanUniform; shader.uniforms.inspectionStrength = scanStrength;
    shader.vertexShader = shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 inspectionPosition;').replace('#include <project_vertex>','#include <project_vertex>\ninspectionPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 inspectionPosition; uniform float inspectionPlane; uniform float inspectionStrength;').replace('#include <dithering_fragment>','#include <dithering_fragment>\nfloat band = exp(-pow((inspectionPosition.z-inspectionPlane)*18.0,2.0)); gl_FragColor.rgb += vec3(0.12,0.55,0.28)*band*inspectionStrength;');
  };
  const glass = new MeshPhysicalMaterial({color:0x172723,metalness:.35,roughness:.16,clearcoat:1});
  const rubber = new MeshStandardMaterial({color:0x0c0e0d,roughness:.92});
  const metal = new MeshStandardMaterial({color:0x8b9893,metalness:.95,roughness:.3});
  const interior = new MeshStandardMaterial({color:0x17201c,roughness:.85});
  [body,glass,rubber,metal,interior].forEach(m=>materials.add(m));
  let disposed=false,visible=true,frame=0,progress=0,loaded=false,contextFailed=false,width=1,height=1;
  let focusId: HotspotId|null=null, focusProgress=0;
  const focus = {blend:0};
  let focusTween: gsap.core.Tween|undefined;
  const components: {node:Object3D; base:Vector3; offset:Vector3; origin:Vector3}[]=[];
  const anchors = new Map<HotspotId,{node:Object3D; local:Vector3}>();
  const target = new Vector3(), world = new Vector3(), projected = new Vector3();
  const fail = () => {contextFailed=true;host.classList.remove('is-loaded');options.onReady(false);};
  const render = () => {
    frame=0;
    if(disposed||contextFailed||!visible||document.hidden)return;
    const p=options.reduced?0:progress*(1-focus.blend)+focusProgress*focus.blend;
    const exploded = options.reduced ? 0 : separationAt(p) * (options.mobile ? .35 : 1);
    for(const part of components)part.node.position.copy(part.base).addScaledVector(part.offset,exploded);
    car.rotation.y=options.mobile?0:Math.sin(p*Math.PI)*.06;
    car.updateMatrixWorld(true);
    const pathProgress=options.reduced?0:p;
    let i=cameraFrames.findIndex(pose=>pose.t>=pathProgress);i=Math.max(1,i<0?cameraFrames.length-1:i);
    const a=cameraFrames[i-1],b=cameraFrames[i];const t=smooth(segment(pathProgress,a.t,b.t));
    camera.position.fromArray(a.p).lerp(world.fromArray(b.p),t);target.fromArray(a.target).lerp(world.fromArray(b.target),t);
    if(options.mobile){camera.position.lerp(world.set(5.6,2.8,-6.7),.7);target.lerp(world.set(0,.6,0),.7);}
    // Fit the full car in portrait frames; focus uses a shorter, mobile-specific approach.
    if(camera.aspect<1.3)camera.position.sub(target).multiplyScalar(1.3/Math.max(camera.aspect,.65)).add(target);
    if(focusId&&anchors.has(focusId)){
      const anchor=anchors.get(focusId)!;world.copy(anchor.local);anchor.node.localToWorld(world);
      const focusTarget=world.clone();const distance=options.mobile?4:2.5;
      const focusPosition=world.clone().add(new Vector3(distance,1,-distance*.65));
      camera.position.lerp(focusPosition,focus.blend);target.lerp(focusTarget,focus.blend);
    }
    camera.fov = options.mobile ? 34 : 28 + Math.sin(p * Math.PI) * 8; camera.updateProjectionMatrix();
    camera.lookAt(target);camera.updateMatrixWorld();
    scan.position.z=-2.4+segment(p,.30,.45)*4.8;
    scan.visible=p>=.30&&p<=.45&&!options.reduced;
    scanUniform.value=scan.position.z;scanStrength.value=scan.visible?1:0;
    rim.intensity=1.1+Math.sin(p*Math.PI)*.35;
    const guideAttribute=guideGeometry.getAttribute('position');
    components.filter(part=>part.node.name.startsWith('wheel_')).forEach((part,index)=>{
      const end=part.node.getWorldPosition(world);guideAttribute.setXYZ(index*2,part.origin.x,part.origin.y,part.origin.z);guideAttribute.setXYZ(index*2+1,end.x,end.y,end.z);
    });guideAttribute.needsUpdate=true;guideMaterial.opacity=exploded*.45;
    const start=performance.now();
    try{renderer.render(scene,camera);}catch{fail();return;}
    if(performance.now()-start>32&&renderer.getPixelRatio()>1)renderer.setPixelRatio(1);
    if(loaded){host.classList.add('is-loaded');}
    for(const [id,anchor] of anchors){
      projected.copy(anchor.local);anchor.node.localToWorld(projected);projected.project(camera);
      const x=(projected.x*.5+.5)*width,y=(-projected.y*.5+.5)*height;
      options.onProject(id,x,y,loaded&&!focusId&&projected.z>-1&&projected.z<1&&x>24&&x<width-24&&y>24&&y<height-24&&p<.94);
    }
    host.dataset.progress=p.toFixed(4);host.dataset.separation=exploded.toFixed(4);
  };
  const invalidate=()=>{if(!disposed&&!contextFailed&&!frame&&visible&&!document.hidden)frame=requestAnimationFrame(render);};
  const disposeObject=(object:Object3D)=>object.traverse(node=>{if(node instanceof Mesh){node.geometry.dispose();(Array.isArray(node.material)?node.material:[node.material]).forEach(m=>materials.add(m));}});
  loader.load(low?'/models/inspection-car-mobile.glb':'/models/inspection-car.glb',gltf=>{
    if(disposed){disposeObject(gltf.scene);materials.forEach(m=>m.dispose());return;}
    gltf.scene.traverse(node=>{
      if(!(node instanceof Mesh))return;
      (Array.isArray(node.material)?node.material:[node.material]).forEach(m=>materials.add(m));
      if(node.name==='body')node.material=body;
      else if(node.name==='glass')node.material=glass;
      else if(/tire|grill|plastic|carbon|carpet/.test(node.name))node.material=rubber;
      else if(/rim_|chrome|metal|brake|nuts|centre/.test(node.name))node.material=metal;
      else if(/leather|interior/.test(node.name))node.material=interior;
    });
    const box=new Box3().setFromObject(gltf.scene);const center=box.getCenter(new Vector3());
    gltf.scene.position.set(-center.x,-box.min.y,-center.z);car.add(gltf.scene);car.updateMatrixWorld(true);
    for(const name of ['body','wheel_fl','wheel_fr','wheel_rl','wheel_rr']){
      const node=car.getObjectByName(name);if(!node||!node.parent)continue;
      const origin=node.getWorldPosition(new Vector3());
      const desired=name==='body'?new Vector3(0,.22,0):new Vector3(Math.sign(origin.x)*.24,0,0);
      const offset=desired.applyQuaternion(node.parent.getWorldQuaternion(new Quaternion()).invert());
      components.push({node,base:node.position.clone(),offset,origin});
    }
    for(const spec of hotspotSpecs){
      const node=car.getObjectByName(spec.mesh);if(!node)continue;
      const center=new Box3().setFromObject(node).getCenter(new Vector3());
      if(spec.mesh==='body')center.z-=1;
      anchors.set(spec.id,{node,local:node.worldToLocal(center)});
    }
    loaded=true;options.onReady(true);invalidate();
  },undefined,()=>fail());
  const resize=new ResizeObserver(([entry])=>{width=entry.contentRect.width;height=entry.contentRect.height;if(!width||!height||disposed)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();invalidate();});resize.observe(host);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;invalidate();});observer.observe(host);
  const lost=(event:Event)=>{event.preventDefault();fail();};renderer.domElement.addEventListener('webglcontextlost',lost);
  document.addEventListener('visibilitychange',invalidate);
  return {
    setProgress(value:number){progress=clamp01(value);invalidate();},
    focus(id:HotspotId|null){
      focusTween?.kill();
      if(id){focusId=id;focusProgress=progress;}
      focusTween=gsap.to(focus,{blend:id?1:0,duration:options.reduced?0:.7,ease:'power2.inOut',onUpdate:invalidate,onComplete:()=>{if(!id)focusId=null;invalidate();}});
      invalidate();
    },
    dispose(){
      disposed=true;focusTween?.kill();cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();draco.dispose();
      document.removeEventListener('visibilitychange',invalidate);renderer.domElement.removeEventListener('webglcontextlost',lost);
      disposeObject(car);materials.forEach(material=>{Object.values(material).forEach(value=>{if((value as Texture)?.isTexture)(value as Texture).dispose();});material.dispose();});
      grid.geometry.dispose();gridMaterial.dispose();floor.geometry.dispose();floor.material.dispose();shadow.geometry.dispose();shadow.material.dispose();shadowTexture.dispose();
      scan.geometry.dispose();scanMaterial.dispose();guideGeometry.dispose();guideMaterial.dispose();env.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();host.classList.remove('is-loaded');
    },
  };
}
