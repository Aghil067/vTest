import type { Technology } from '@/types';

export const mockTechnologies: Technology[] = [
  {
    id: 'tech-1',
    title: 'Software Development',
    slug: 'software-development',
    summary:
      'Custom enterprise software development for inspection management, workflow automation, and operational systems.',
    description:
      'Vetest develops purpose-built software solutions for vehicle testing and inspection operations. Our software engineering capabilities span from web-based management platforms to embedded system software, designed for reliability, scalability, and long-term maintainability.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    icon: 'Code2',
    status: 'PUBLISHED',
    overview:
      'Our software development practice focuses on building robust, configurable applications that meet the specific operational requirements of vehicle testing and inspection environments.',
    capabilities: [
      {
        title: 'Web Application Development',
        description:
          'Browser-based management interfaces designed for operational environments.',
      },
      {
        title: 'Backend API Development',
        description: 'RESTful and real-time APIs for data exchange and system integration.',
      },
      {
        title: 'Embedded Software',
        description: 'Software for industrial controllers and embedded computing systems.',
      },
      {
        title: 'Database Design',
        description: 'Scalable data models for inspection, testing, and operational data.',
      },
    ],
    concepts: [
      'TypeScript / Node.js',
      'React',
      'NestJS',
      'PostgreSQL',
      'RESTful API design',
      'Real-time data processing',
      'Industrial protocol integration',
    ],
    applications: [
      'Inspection management systems',
      'Operational dashboards',
      'Reporting and analytics platforms',
      'Equipment control interfaces',
    ],
    relatedSolutionIds: ['sol-1', 'sol-3'],
    relatedProjectIds: ['proj-1', 'proj-2'],
    seoTitle: 'Software Development Capabilities | Vetest',
    seoDescription:
      'Enterprise software development for vehicle inspection and testing. Web applications, APIs, embedded software, and database design.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'tech-2',
    title: 'IoT',
    slug: 'iot',
    summary:
      'Industrial IoT integration connecting test equipment, sensors, and management systems for real-time operational visibility.',
    description:
      'Vetest applies Industrial IoT principles to connect physical test equipment, sensors, and control systems with digital management platforms. Our IoT capabilities enable real-time data capture, remote monitoring, and intelligent automation across testing facilities.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    icon: 'Wifi',
    status: 'PUBLISHED',
    overview:
      'Industrial IoT is central to Vetest\'s approach to connecting the physical and digital dimensions of testing operations.',
    capabilities: [
      {
        title: 'Protocol Integration',
        description:
          'Multi-protocol connectivity including OPC-UA, Modbus, RS-232, and Ethernet.',
      },
      {
        title: 'Edge Computing',
        description: 'On-premise data processing for low-latency, reliable operation.',
      },
      {
        title: 'Remote Monitoring',
        description: 'Real-time equipment and system monitoring from centralized dashboards.',
      },
      {
        title: 'Data Pipeline Design',
        description:
          'Reliable data pipelines from equipment sensors to management systems.',
      },
    ],
    concepts: [
      'OPC-UA',
      'Modbus',
      'MQTT',
      'Edge computing',
      'Real-time data streaming',
      'Industrial Ethernet',
      'Sensor integration',
    ],
    applications: [
      'Test lane equipment connectivity',
      'Remote diagnostic capabilities',
      'Real-time measurement data capture',
      'Equipment health monitoring',
    ],
    relatedSolutionIds: ['sol-4', 'sol-3'],
    relatedProjectIds: ['proj-1'],
    seoTitle: 'IoT Technology | Vetest',
    seoDescription:
      'Industrial IoT integration for vehicle testing and inspection. Multi-protocol equipment connectivity, edge computing, real-time monitoring.',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-06-05T00:00:00Z',
  },
  {
    id: 'tech-3',
    title: 'AI & Analytics',
    slug: 'ai-analytics',
    summary:
      'Data analytics and AI-assisted capabilities for operational insights, trend detection, and performance management.',
    description:
      'Vetest integrates analytics and AI-assisted capabilities into inspection and testing operations to transform raw data into actionable intelligence. Our analytics capabilities support operational performance management, compliance reporting, and continuous improvement.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    icon: 'Brain',
    status: 'PUBLISHED',
    overview:
      'Analytics is a core component of the Vetest technology stack, enabling organizations to extract maximum value from inspection and testing data.',
    capabilities: [
      {
        title: 'Operational Analytics',
        description:
          'KPI dashboards and performance metrics for testing operations management.',
      },
      {
        title: 'Trend Analysis',
        description: 'Pattern recognition in inspection and testing data over time.',
      },
      {
        title: 'Predictive Indicators',
        description:
          'Data-driven indicators for equipment performance and maintenance planning.',
      },
      {
        title: 'Regulatory Reporting',
        description: 'Automated report generation for compliance and audit requirements.',
      },
    ],
    concepts: [
      'Business intelligence',
      'Data visualization',
      'Statistical analysis',
      'Report automation',
      'Data-driven operations',
      'Performance management',
    ],
    applications: [
      'Operational performance dashboards',
      'Compliance and regulatory reporting',
      'Equipment performance monitoring',
      'Quality trend analysis',
    ],
    relatedSolutionIds: ['sol-5', 'sol-1'],
    relatedProjectIds: [],
    seoTitle: 'AI & Analytics Technology | Vetest',
    seoDescription:
      'Analytics and AI-assisted capabilities for inspection and testing operations. Operational dashboards, trend analysis, compliance reporting.',
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-06-08T00:00:00Z',
  },
  {
    id: 'tech-4',
    title: 'Hardware Integration',
    slug: 'hardware-integration',
    summary:
      'Design, integration, and deployment of industrial hardware systems for vehicle testing and inspection environments.',
    description:
      'Vetest\'s hardware integration capabilities encompass the selection, design, integration, and deployment of industrial computing and control hardware for testing environments. We bridge the gap between physical equipment and digital management systems.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    icon: 'HardDrive',
    status: 'PUBLISHED',
    overview:
      'Hardware integration is a core Vetest capability that enables the creation of complete, end-to-end testing solutions.',
    capabilities: [
      {
        title: 'Industrial System Design',
        description:
          'Design of ruggedized control and computing systems for industrial environments.',
      },
      {
        title: 'Equipment Commissioning',
        description:
          'Professional installation, configuration, and commissioning of hardware systems.',
      },
      {
        title: 'Protocol Development',
        description: 'Custom driver and protocol development for non-standard equipment.',
      },
      {
        title: 'System Validation',
        description: 'Comprehensive testing and validation of integrated hardware systems.',
      },
    ],
    concepts: [
      'Industrial PLC / IPC',
      'I/O systems',
      'DIN rail installation',
      'Signal conditioning',
      'Fieldbus protocols',
      'Panel building',
      'CE compliance',
    ],
    applications: [
      'Test lane control panels',
      'Equipment integration projects',
      'System modernization',
      'Bespoke testing rigs',
    ],
    relatedSolutionIds: ['sol-4', 'sol-3'],
    relatedProjectIds: ['proj-1', 'proj-2'],
    seoTitle: 'Hardware Integration Technology | Vetest',
    seoDescription:
      'Industrial hardware integration for vehicle testing. System design, equipment commissioning, protocol development, and system validation.',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-06-10T00:00:00Z',
  },
  {
    id: 'tech-5',
    title: 'Automation',
    slug: 'automation',
    summary:
      'Test process automation combining hardware control, software orchestration, and intelligent workflow management.',
    description:
      'Automation is at the core of what Vetest delivers — combining hardware control, software logic, and workflow intelligence to reduce manual intervention, improve consistency, and increase throughput in testing and inspection operations.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    icon: 'Zap',
    status: 'PUBLISHED',
    overview:
      'Vetest\'s automation capabilities span from individual test step automation to end-to-end test lane orchestration.',
    capabilities: [
      {
        title: 'Test Sequence Automation',
        description:
          'Configurable automated test sequences for consistent, repeatable operations.',
      },
      {
        title: 'Equipment Control Automation',
        description:
          'Automated control of physical equipment including signals, barriers, and actuators.',
      },
      {
        title: 'Workflow Orchestration',
        description: 'Software-driven orchestration of multi-step inspection workflows.',
      },
      {
        title: 'Event-Driven Processing',
        description:
          'Reactive automation triggered by equipment states, measurements, and operator actions.',
      },
    ],
    concepts: [
      'State machine design',
      'Event-driven architecture',
      'PLC automation',
      'Workflow engines',
      'SCADA principles',
      'Automated testing',
    ],
    applications: [
      'Automated test lane operation',
      'Quality gate automation',
      'Equipment lifecycle automation',
      'Data capture and processing automation',
    ],
    relatedSolutionIds: ['sol-2', 'sol-3'],
    relatedProjectIds: ['proj-1'],
    seoTitle: 'Automation Technology | Vetest',
    seoDescription:
      'Test and inspection process automation. Test sequence automation, equipment control, workflow orchestration, and event-driven processing.',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-06-12T00:00:00Z',
  },
];
