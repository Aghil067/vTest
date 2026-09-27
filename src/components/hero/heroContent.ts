export type SystemId = 'inspection' | 'testing';

export const systems = {
  inspection: {
    index: '01',
    label: 'Vehicle Inspection',
    category: 'Powertrain & Mechanical Diagnostics',
    title: 'Precision Diagnostics,\nEngineered Inside & Out.',
    short: 'Inspect powertrain & diagnostic systems',
    description:
      'Vtest delivers comprehensive software and hardware solutions for managing vehicle inspection workflows, automated powertrain testing, emissions verification, and regulatory compliance.',
    benefit: 'Configurable digital inspection sequences eliminate paper bottlenecks and maximize lane throughput.',
    image: '/media/drive-blue.png',
    anchor: { x: 25, y: 48 },
    preview: 'drive' as const,
    slug: 'vehicle-inspection',
    points: [
      {
        label: 'Automated Diagnostic Sequence',
        text: 'Direct vehicle OBD-II and CAN bus communication to verify engine diagnostics and ECU status.',
        x: 32,
        y: 46,
      },
      {
        label: 'Emissions & Telemetry Array',
        text: 'Precision integration with smoke meters, gas analyzers, and particulate counters in real time.',
        x: 24,
        y: 49,
      },
      {
        label: 'Powertrain Performance Verification',
        text: 'Real-time torque, speed, and power delivery analytics measured against OEM and regulatory thresholds.',
        x: 48,
        y: 51,
      },
    ],
  },
  testing: {
    index: '02',
    label: 'Testing Systems',
    category: 'Chassis, Brake & Safety Architecture',
    title: 'Underbody & Chassis\nIntegrity Verification.',
    short: 'Inspect chassis and testing systems',
    description:
      'Industrial-grade automated test lane controls, roller brake testers, suspension diagnostic units, and wheel alignment systems integrated into a unified test station.',
    benefit: 'Coordinated physical testing ensures 100% vehicle safety compliance before sign-off.',
    image: '/media/battery-blue.png',
    anchor: { x: 64, y: 72 },
    preview: 'battery' as const,
    slug: 'end-of-line-testing',
    points: [
      {
        label: 'Roller Brake & Axle Testing',
        text: 'High-precision load cells and force transducers measure braking efficiency and axle weight distribution.',
        x: 31,
        y: 42,
      },
      {
        label: 'High-Voltage Safety Architecture',
        text: 'Automated insulation resistance testing, grounding integrity checks, and EV safety diagnostics.',
        x: 27,
        y: 55,
      },
      {
        label: 'Structural Integrity & Defect Logging',
        text: 'Physical undercarriage evaluation with automated visual recording and defect documentation.',
        x: 49,
        y: 49,
      },
    ],
  },
} as const;

export type HotspotId = 'inspection' | 'testing' | 'paint' | 'wheels';

export const hotspots: {
  id: HotspotId;
  index: string;
  label: string;
  anchor: { x: number; y: number };
  target: SystemId | null;
  hoverPreview: 'drive' | 'battery' | null;
}[] = [
  {
    id: 'inspection',
    index: '01',
    label: 'Vehicle Inspection',
    anchor: { x: 25, y: 48 },
    target: 'inspection',
    hoverPreview: 'drive',
  },
  {
    id: 'testing',
    index: '02',
    label: 'Testing Systems',
    anchor: { x: 64, y: 72 },
    target: 'testing',
    hoverPreview: 'battery',
  },
  {
    id: 'paint',
    index: '03',
    label: 'Vehicle Finish Spec',
    anchor: { x: 55, y: 51 },
    target: null,
    hoverPreview: null,
  },
  {
    id: 'wheels',
    index: '04',
    label: 'Wheel & Alignment',
    anchor: { x: 48, y: 71 },
    target: null,
    hoverPreview: null,
  },
];

export const technicalFeatures = [
  {
    index: '01',
    title: 'Vehicle Inspection',
    description: 'Lift the hood. Explore integrated software and hardware diagnostics for vehicle inspection.',
    target: 'inspection' as SystemId,
    link: '/solutions/vehicle-inspection',
  },
  {
    index: '02',
    title: 'Testing Systems',
    description: 'Inspect beneath the chassis. Discover automated roller brake testing and safety architecture.',
    target: 'testing' as SystemId,
    link: '/solutions/end-of-line-testing',
  },
  {
    index: '03',
    title: 'Software & Analytics',
    description: 'Real-time inspection intelligence. VtestIMS, analytics dashboards, and compliance reporting.',
    target: null,
    link: '/products/software',
  },
  {
    index: '04',
    title: 'Equipment Integration',
    description: 'Multi-protocol IoT connectivity. Connect diverse OEM test benches into unified lanes.',
    target: null,
    link: '/solutions/equipment-integration',
  },
];
