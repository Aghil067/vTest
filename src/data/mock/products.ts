import type { Product, Category } from '@/types';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Inspection Management',
    type: 'SOFTWARE',
    slug: 'inspection-management',
    description: 'Software for managing vehicle inspection workflows',
  },
  {
    id: 'cat-2',
    name: 'Analytics & Reporting',
    type: 'SOFTWARE',
    slug: 'analytics-reporting',
    description: 'Data-driven analytics and reporting tools',
  },
  {
    id: 'cat-3',
    name: 'Lane Control Systems',
    type: 'HARDWARE',
    slug: 'lane-control-systems',
    description: 'Hardware systems for test lane control and automation',
  },
  {
    id: 'cat-4',
    name: 'Measurement Equipment',
    type: 'HARDWARE',
    slug: 'measurement-equipment',
    description: 'Precision measurement and sensing hardware',
  },
];

export const mockProducts: Product[] = [
  // ---- SOFTWARE PRODUCTS ----
  {
    id: 'prod-sw-1',
    name: 'VetestIMS',
    type: 'SOFTWARE',
    categoryId: 'cat-1',
    slug: 'vtestims',
    shortDescription:
      'A comprehensive Inspection Management System for streamlining vehicle testing workflows, compliance tracking, and operational reporting.',
    description:
      'VetestIMS is a robust, enterprise-grade Inspection Management System designed to centralize and digitize vehicle inspection operations. It provides configurable workflow automation, real-time status tracking, multi-lane management, and powerful compliance reporting for testing stations of all sizes.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    status: 'PUBLISHED',
    featured: true,
    seoTitle: 'VetestIMS — Vehicle Inspection Management System | Vetest',
    seoDescription:
      'Enterprise inspection management system for vehicle testing stations. Streamline workflows, ensure compliance, and gain real-time operational insights.',
    features: [
      {
        id: 'f-1',
        productId: 'prod-sw-1',
        title: 'Configurable Workflows',
        description:
          'Design and customize inspection workflows to match your operational requirements and regulatory standards.',
        sortOrder: 1,
      },
      {
        id: 'f-2',
        productId: 'prod-sw-1',
        title: 'Real-Time Status Tracking',
        description:
          'Monitor inspection progress across all lanes and stations from a unified dashboard.',
        sortOrder: 2,
      },
      {
        id: 'f-3',
        productId: 'prod-sw-1',
        title: 'Compliance Reporting',
        description:
          'Generate detailed compliance and audit reports with configurable templates and automated scheduling.',
        sortOrder: 3,
      },
      {
        id: 'f-4',
        productId: 'prod-sw-1',
        title: 'Multi-Lane Management',
        description:
          'Manage multiple inspection lanes simultaneously from a single centralized interface.',
        sortOrder: 4,
      },
      {
        id: 'f-5',
        productId: 'prod-sw-1',
        title: 'Hardware Integration',
        description:
          'Seamlessly integrate with test equipment, sensors, and measurement devices through standard protocols.',
        sortOrder: 5,
      },
      {
        id: 'f-6',
        productId: 'prod-sw-1',
        title: 'Role-Based Access',
        description:
          'Granular permission control with role-based access for operators, supervisors, and administrators.',
        sortOrder: 6,
      },
    ],
    specifications: [],
    modules: [
      {
        id: 'm-1',
        productId: 'prod-sw-1',
        name: 'Lane Operations Module',
        description: 'End-to-end management of test lane operations and vehicle queuing.',
        sortOrder: 1,
      },
      {
        id: 'm-2',
        productId: 'prod-sw-1',
        name: 'Compliance & Audit Module',
        description: 'Regulatory compliance tracking and audit-ready reporting.',
        sortOrder: 2,
      },
      {
        id: 'm-3',
        productId: 'prod-sw-1',
        name: 'Equipment Integration Module',
        description: 'Protocol-based integration with third-party test equipment.',
        sortOrder: 3,
      },
      {
        id: 'm-4',
        productId: 'prod-sw-1',
        name: 'Analytics Dashboard',
        description: 'KPIs, trends, and operational analytics visualization.',
        sortOrder: 4,
      },
    ],
    useCases: [
      'Vehicle testing stations seeking to digitize and automate inspection workflows',
      'Multi-lane inspection facilities requiring centralized operational control',
      'Organizations requiring regulatory compliance documentation and audit trails',
      'Testing authorities integrating with existing government or enterprise systems',
    ],
    benefits: [
      'Reduce manual data entry and paper-based processes',
      'Improve inspection throughput with streamlined workflows',
      'Ensure regulatory compliance through automated tracking',
      'Gain visibility into operational performance across all lanes',
    ],
    integrations: [
      'MAHA test equipment',
      'Navitsa inspection systems',
      'Custom hardware via OPC-UA / RS-232 / Modbus',
      'RESTful API for third-party system integration',
    ],
    technicalHighlights: [
      'Browser-based responsive interface',
      'Supports on-premise and private cloud deployment',
      'Standard protocol support (OPC-UA, Modbus, RS-232)',
      'Role-based access control (RBAC)',
      'Configurable reporting engine',
    ],
    relatedProductIds: ['prod-sw-2', 'prod-hw-1'],
    relatedSolutionIds: ['sol-1', 'sol-3'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'prod-sw-2',
    name: 'VetestAnalytics',
    type: 'SOFTWARE',
    categoryId: 'cat-2',
    slug: 'vtestanalytics',
    shortDescription:
      'Advanced analytics and business intelligence platform for vehicle inspection and testing operations data.',
    description:
      'VetestAnalytics transforms raw inspection and testing data into actionable insights. It provides configurable dashboards, trend analysis, equipment performance monitoring, and executive-level reporting to support data-driven decision-making across testing operations.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    status: 'PUBLISHED',
    featured: true,
    seoTitle: 'VetestAnalytics — Inspection Operations Analytics | Vetest',
    seoDescription:
      'Turn inspection data into business intelligence. Configurable dashboards, trend analysis, and operational reporting for testing facilities.',
    features: [
      {
        id: 'f-7',
        productId: 'prod-sw-2',
        title: 'Configurable Dashboards',
        description:
          'Build role-specific dashboards with drag-and-drop widgets and real-time data feeds.',
        sortOrder: 1,
      },
      {
        id: 'f-8',
        productId: 'prod-sw-2',
        title: 'Trend Analysis',
        description:
          'Identify patterns in inspection results, equipment performance, and throughput over time.',
        sortOrder: 2,
      },
      {
        id: 'f-9',
        productId: 'prod-sw-2',
        title: 'Equipment Performance Monitoring',
        description:
          'Track equipment utilization, downtime, and calibration status across the facility.',
        sortOrder: 3,
      },
      {
        id: 'f-10',
        productId: 'prod-sw-2',
        title: 'Scheduled Reporting',
        description:
          'Automate report generation and distribution on daily, weekly, or monthly schedules.',
        sortOrder: 4,
      },
    ],
    modules: [],
    useCases: [
      'Operations managers requiring real-time visibility into lane performance',
      'Compliance officers needing automated regulatory reports',
      'Technical teams monitoring equipment health and utilization',
    ],
    benefits: [
      'Data-driven operational improvements',
      'Reduced time spent on manual reporting',
      'Early identification of equipment issues',
      'Executive-level visibility into testing performance',
    ],
    integrations: [
      'VetestIMS (native integration)',
      'RESTful API for external BI tools',
      'Export to PDF, Excel, CSV',
    ],
    relatedProductIds: ['prod-sw-1'],
    relatedSolutionIds: ['sol-5'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-06-10T00:00:00Z',
  },
  {
    id: 'prod-sw-3',
    name: 'VetestConnect',
    type: 'SOFTWARE',
    categoryId: 'cat-1',
    slug: 'vtestconnect',
    shortDescription:
      'IoT-enabled equipment integration platform for connecting diverse test equipment to inspection management systems.',
    description:
      'VetestConnect is a purpose-built integration middleware that enables seamless communication between heterogeneous test equipment, sensors, and inspection management software. It supports multiple industrial protocols and provides a unified data model for inspection results.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    status: 'PUBLISHED',
    featured: false,
    seoTitle: 'VetestConnect — Equipment Integration Platform | Vetest',
    seoDescription:
      'Connect diverse test equipment to your inspection management system with VetestConnect. Multi-protocol support, real-time data, unified integration.',
    features: [
      {
        id: 'f-11',
        productId: 'prod-sw-3',
        title: 'Multi-Protocol Support',
        description: 'Native support for OPC-UA, Modbus, RS-232, RS-485, and custom protocols.',
        sortOrder: 1,
      },
      {
        id: 'f-12',
        productId: 'prod-sw-3',
        title: 'Real-Time Data Streaming',
        description: 'Low-latency data streaming from equipment to management systems.',
        sortOrder: 2,
      },
      {
        id: 'f-13',
        productId: 'prod-sw-3',
        title: 'Unified Data Model',
        description: 'Normalizes data from different equipment types into a consistent schema.',
        sortOrder: 3,
      },
    ],
    modules: [],
    useCases: [
      'Facilities with mixed equipment from multiple manufacturers',
      'Integrating legacy equipment with modern inspection management systems',
      'IoT-enabled test lane deployments',
    ],
    benefits: [
      'Eliminate data silos across equipment types',
      'Reduce custom integration development costs',
      'Enable centralized equipment monitoring',
    ],
    integrations: [
      'MAHA brake testers and equipment',
      'Navitsa inspection systems',
      'Custom equipment via driver development',
    ],
    relatedProductIds: ['prod-sw-1', 'prod-hw-1'],
    relatedSolutionIds: ['sol-4'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-06-15T00:00:00Z',
  },

  // ---- HARDWARE PRODUCTS ----
  {
    id: 'prod-hw-1',
    name: 'VetestLane Controller',
    type: 'HARDWARE',
    categoryId: 'cat-3',
    slug: 'vtestlane-controller',
    shortDescription:
      'Industrial-grade lane control unit designed for reliable operation in demanding vehicle testing environments.',
    description:
      'The VetestLane Controller is a ruggedized industrial computing and I/O control unit purpose-built for test lane automation. It provides real-time control of lane equipment, traffic signals, barriers, and measurement devices while communicating seamlessly with inspection management software.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
    status: 'PUBLISHED',
    featured: true,
    seoTitle: 'VetestLane Controller — Industrial Lane Control Unit | Vetest',
    seoDescription:
      'Ruggedized lane control hardware for vehicle test lanes. Real-time I/O control, multi-protocol communication, industrial-grade reliability.',
    features: [
      {
        id: 'f-14',
        productId: 'prod-hw-1',
        title: 'Ruggedized Industrial Design',
        description: 'Built for continuous operation in demanding workshop and testing environments.',
        sortOrder: 1,
      },
      {
        id: 'f-15',
        productId: 'prod-hw-1',
        title: 'Real-Time I/O Control',
        description: 'Low-latency control of signals, barriers, and measurement equipment.',
        sortOrder: 2,
      },
      {
        id: 'f-16',
        productId: 'prod-hw-1',
        title: 'Multi-Protocol Communication',
        description: 'Supports OPC-UA, Modbus, and Ethernet for software integration.',
        sortOrder: 3,
      },
      {
        id: 'f-17',
        productId: 'prod-hw-1',
        title: 'Expandable I/O',
        description: 'Modular I/O expansion for flexible lane configuration.',
        sortOrder: 4,
      },
    ],
    specifications: [
      {
        id: 's-1',
        productId: 'prod-hw-1',
        name: 'Operating Temperature',
        value: '0°C to 55°C',
        sortOrder: 1,
      },
      {
        id: 's-2',
        productId: 'prod-hw-1',
        name: 'Protection Rating',
        value: 'IP54',
        sortOrder: 2,
      },
      {
        id: 's-3',
        productId: 'prod-hw-1',
        name: 'Power Supply',
        value: '24V DC',
        sortOrder: 3,
      },
      {
        id: 's-4',
        productId: 'prod-hw-1',
        name: 'Communication Interfaces',
        value: 'Ethernet, RS-232, RS-485, USB',
        sortOrder: 4,
      },
      {
        id: 's-5',
        productId: 'prod-hw-1',
        name: 'Digital I/O',
        value: '16 DI / 16 DO (expandable)',
        sortOrder: 5,
      },
      {
        id: 's-6',
        productId: 'prod-hw-1',
        name: 'Mounting',
        value: 'DIN Rail or Panel Mount',
        sortOrder: 6,
      },
    ],
    useCases: [
      'Automated vehicle inspection test lanes',
      'End-of-line testing stations',
      'Multi-lane testing facilities requiring centralized control',
    ],
    benefits: [
      'Reliable operation in harsh industrial environments',
      'Flexible integration with diverse equipment',
      'Simplified cabling with centralized control',
    ],
    integrations: [
      'VetestIMS via OPC-UA',
      'VetestConnect integration platform',
      'MAHA and Navitsa equipment',
    ],
    relatedProductIds: ['prod-hw-2', 'prod-sw-1'],
    relatedSolutionIds: ['sol-3', 'sol-4'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-05-28T00:00:00Z',
  },
  {
    id: 'prod-hw-2',
    name: 'VetestSense Module',
    type: 'HARDWARE',
    categoryId: 'cat-4',
    slug: 'vtestsense-module',
    shortDescription:
      'Precision sensing and measurement module for real-time data acquisition in vehicle testing applications.',
    description:
      'The VetestSense Module is a compact, high-precision sensing and data acquisition unit for vehicle testing applications. It captures measurement data from various transducers and sensors and delivers it in real-time to connected inspection and analytics systems.',
    heroImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1200&q=80',
    status: 'PUBLISHED',
    featured: false,
    seoTitle: 'VetestSense Module — Precision Sensing for Vehicle Testing | Vetest',
    seoDescription:
      'High-precision sensing and data acquisition module for vehicle test lane measurements. Real-time data, multi-sensor support, compact industrial design.',
    features: [
      {
        id: 'f-18',
        productId: 'prod-hw-2',
        title: 'High-Precision Measurement',
        description: 'Accurate data acquisition for critical vehicle testing parameters.',
        sortOrder: 1,
      },
      {
        id: 'f-19',
        productId: 'prod-hw-2',
        title: 'Multi-Sensor Input',
        description: 'Supports connection of multiple sensor types on a single module.',
        sortOrder: 2,
      },
      {
        id: 'f-20',
        productId: 'prod-hw-2',
        title: 'Real-Time Data Streaming',
        description: 'Low-latency data output for time-critical inspection measurements.',
        sortOrder: 3,
      },
    ],
    specifications: [
      {
        id: 's-7',
        productId: 'prod-hw-2',
        name: 'Analog Inputs',
        value: '8 channels, 16-bit resolution',
        sortOrder: 1,
      },
      {
        id: 's-8',
        productId: 'prod-hw-2',
        name: 'Sampling Rate',
        value: 'Up to 10 kHz per channel',
        sortOrder: 2,
      },
      {
        id: 's-9',
        productId: 'prod-hw-2',
        name: 'Communication',
        value: 'Ethernet / EtherCAT',
        sortOrder: 3,
      },
      {
        id: 's-10',
        productId: 'prod-hw-2',
        name: 'Operating Temperature',
        value: '-10°C to 60°C',
        sortOrder: 4,
      },
      {
        id: 's-11',
        productId: 'prod-hw-2',
        name: 'Protection Rating',
        value: 'IP67',
        sortOrder: 5,
      },
    ],
    useCases: [
      'Brake force measurement in test lanes',
      'Emission measurement data acquisition',
      'Load and pressure sensing for end-of-line tests',
    ],
    benefits: [
      'High accuracy for reliable test results',
      'Compact form factor for easy integration',
      'Weatherproof for demanding environments',
    ],
    integrations: [
      'VetestLane Controller',
      'VetestConnect integration platform',
      'Third-party DAQ systems via Ethernet',
    ],
    relatedProductIds: ['prod-hw-1', 'prod-sw-3'],
    relatedSolutionIds: ['sol-2', 'sol-4'],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-06-05T00:00:00Z',
  },
];
