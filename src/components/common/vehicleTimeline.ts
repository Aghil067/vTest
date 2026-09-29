export const inspectionScenes = [
  { start: 0, title: 'Vehicle overview', caption: 'Integrated software, hardware, and automation.' },
  { start: .15, title: 'A closer perspective', caption: 'Vehicle inspection technology.' },
  { start: .30, title: 'Precision measurement', caption: 'Equipment integration and automation.' },
  { start: .45, title: 'Engineering, revealed', caption: 'A controlled view of individual components.' },
  { start: .60, title: 'Equipment integration', caption: 'Connecting test equipment to inspection workflows.' },
  { start: .72, title: 'From measurement to insight', caption: 'Compliance reporting and operational analytics.' },
  { start: .84, title: 'One connected system', caption: 'Software intelligence. Precision hardware.' },
  { start: .94, title: 'Engineered for your operation', caption: 'Explore the Vetest technology ecosystem.' },
] as const;

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
export const segment = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));
export const smooth = (value: number) => value * value * (3 - 2 * value);
export const separationAt = (progress: number) => smooth(segment(progress, .45, .59)) * (1 - smooth(segment(progress, .84, .94)));
export const sceneAt = (progress: number) => {
  const next = inspectionScenes.findIndex(scene => progress < scene.start);
  return next < 0 ? inspectionScenes.length - 1 : Math.max(0, next - 1);
};

export type HotspotId = 'vehicle-inspection' | 'equipment-integration' | 'compliance-analytics';
export const hotspotSpecs: { id: HotspotId; mesh: string; label: string; short: string }[] = [
  { id: 'vehicle-inspection', mesh: 'body', label: 'Vehicle Inspection', short: 'Inspection' },
  { id: 'equipment-integration', mesh: 'wheel_fr', label: 'Equipment Integration', short: 'Equipment' },
  { id: 'compliance-analytics', mesh: 'glass', label: 'Compliance & Analytics', short: 'Analytics' },
];

export const cameraFrames = [
  { t: 0, p: [4.5, 2, -5], target: [0, .6, 0] },
  { t: .15, p: [4.5, 2, -5], target: [0, .6, 0] },
  { t: .30, p: [4.3, 1.9, -5.1], target: [0, .6, -.2] },
  { t: .45, p: [5.9, 2.7, -1.5], target: [0, .7, 0] },
  { t: .60, p: [5.7, 2.4, .8], target: [0, .8, 0] },
  { t: .72, p: [3.5, 1.3, -2.5], target: [.7, .45, -1.1] },
  { t: .84, p: [4.4, 3.8, -3.7], target: [0, .65, 0] },
  { t: .94, p: [4.5, 2, -5], target: [0, .6, 0] },
  { t: 1, p: [6.2, 5, -7], target: [0, .5, 0] },
];
