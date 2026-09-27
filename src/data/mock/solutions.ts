import type { Solution } from '@/types';

export const mockSolutions: Solution[] = [
  {
    id: 'sol-1',
    title: 'Vehicle Inspection',
    slug: 'vehicle-inspection',
    summary:
      'End-to-end software and hardware solutions for managing vehicle inspection workflows, compliance, and reporting.',
    description:
      'Vtest provides integrated technology solutions for vehicle inspection stations, combining inspection management software, hardware integration, and analytics to digitize and streamline the entire inspection process.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
    icon: 'ClipboardCheck',
    status: 'PUBLISHED',
    businessContext:
      'Vehicle inspection stations face increasing demands for operational efficiency, regulatory compliance, and data-driven management. Manual and paper-based processes create bottlenecks, compliance risks, and limited visibility into operational performance.',
    capabilities: [
      'Configurable digital inspection workflows',
      'Multi-lane operational management',
      'Equipment integration and automation',
      'Compliance and audit reporting',
      'Real-time operational dashboards',
      'Document and certificate management',
    ],
    technologies: ['VtestIMS', 'VtestConnect', 'VtestLane Controller', 'IoT integration'],
    benefits: [
      'Digitize and automate inspection workflows',
      'Improve lane throughput and operational efficiency',
      'Ensure regulatory compliance with audit trails',
      'Enable data-driven operational improvements',
    ],
    applications: [
      'Government vehicle inspection stations',
      'Private automotive testing centers',
      'Fleet inspection facilities',
      'Multi-site testing organizations',
    ],
    relatedProductIds: ['prod-sw-1', 'prod-hw-1'],
    relatedProjectIds: ['proj-1', 'proj-2'],
    seoTitle: 'Vehicle Inspection Solutions | Vtest',
    seoDescription:
      'Integrated vehicle inspection solutions combining management software, hardware integration, and analytics for efficient, compliant testing operations.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'sol-2',
    title: 'End-of-Line Testing',
    slug: 'end-of-line-testing',
    summary:
      'Automated end-of-line testing solutions for manufacturing facilities requiring precision measurement and data capture.',
    description:
      'Vtest delivers end-of-line testing technology for automotive and manufacturing environments. Our solutions integrate precision measurement hardware, automated test sequences, and real-time data capture to ensure product quality at the end of the production line.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80',
    icon: 'Gauge',
    status: 'PUBLISHED',
    businessContext:
      'Manufacturing facilities require reliable end-of-line quality assurance to ensure every vehicle or component meets specifications before leaving the production floor. Manual testing creates inconsistency and throughput limitations.',
    capabilities: [
      'Automated test sequence management',
      'Precision measurement data acquisition',
      'Pass/fail determination and reporting',
      'Integration with production MES/ERP systems',
      'Traceability and quality documentation',
    ],
    technologies: ['VtestSense Module', 'VtestConnect', 'VtestAnalytics'],
    benefits: [
      'Consistent, automated quality assurance',
      'High-speed testing without compromising accuracy',
      'Full traceability for every tested unit',
      'Integration with production management systems',
    ],
    applications: [
      'Automotive final assembly lines',
      'Component manufacturing facilities',
      'Contract manufacturing testing',
    ],
    relatedProductIds: ['prod-hw-2', 'prod-sw-3'],
    relatedProjectIds: [],
    seoTitle: 'End-of-Line Testing Solutions | Vtest',
    seoDescription:
      'Automated end-of-line testing technology for automotive and manufacturing. Precision measurement, automated test sequences, and quality traceability.',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-06-05T00:00:00Z',
  },
  {
    id: 'sol-3',
    title: 'Test Lane Management',
    slug: 'test-lane-management',
    summary:
      'Comprehensive test lane management combining hardware control, software orchestration, and real-time monitoring.',
    description:
      'Vtest provides an integrated approach to test lane management that combines industrial hardware control with intelligent software orchestration. Our solutions enable centralized control, monitoring, and optimization of single or multi-lane testing facilities.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    icon: 'LayoutGrid',
    status: 'PUBLISHED',
    businessContext:
      'Test lane facilities require reliable, coordinated management of physical equipment, digital workflows, and operational data. Fragmented systems create coordination challenges and reduce throughput.',
    capabilities: [
      'Centralized multi-lane control',
      'Hardware automation and signaling',
      'Workflow orchestration',
      'Queue and throughput management',
      'Equipment status monitoring',
      'Operator interface and guidance',
    ],
    technologies: ['VtestLane Controller', 'VtestIMS', 'VtestConnect'],
    benefits: [
      'Centralized control of all lane operations',
      'Improved lane throughput and utilization',
      'Reduced manual coordination requirements',
      'Real-time visibility into lane status',
    ],
    applications: [
      'Multi-lane vehicle testing stations',
      'Automotive inspection facilities',
      'Government testing authorities',
    ],
    relatedProductIds: ['prod-hw-1', 'prod-sw-1'],
    relatedProjectIds: ['proj-1'],
    seoTitle: 'Test Lane Management Solutions | Vtest',
    seoDescription:
      'Integrated test lane management combining hardware control, software orchestration, and real-time monitoring for efficient multi-lane testing operations.',
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-06-08T00:00:00Z',
  },
  {
    id: 'sol-4',
    title: 'Equipment Integration',
    slug: 'equipment-integration',
    summary:
      'Protocol-based integration of diverse test equipment from multiple manufacturers into unified inspection systems.',
    description:
      'Vtest specializes in integrating heterogeneous test equipment from leading manufacturers into cohesive inspection and management systems. Our equipment integration solutions eliminate data silos and enable centralized management of diverse equipment fleets.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    icon: 'Cpu',
    status: 'PUBLISHED',
    businessContext:
      'Testing facilities often operate equipment from multiple manufacturers using different communication protocols. Integrating these into a single operational picture is a significant technical challenge.',
    capabilities: [
      'Multi-protocol communication (OPC-UA, Modbus, RS-232)',
      'Unified data normalization and management',
      'Real-time equipment status monitoring',
      'Custom driver and protocol development',
      'Legacy equipment modernization',
    ],
    technologies: ['VtestConnect', 'VtestLane Controller', 'OPC-UA', 'Modbus', 'IoT'],
    benefits: [
      'Unified view of all equipment regardless of manufacturer',
      'Reduced integration complexity and cost',
      'Enable legacy equipment in modern systems',
      'Single source of truth for equipment data',
    ],
    applications: [
      'Facilities with mixed equipment fleets',
      'Modernization of existing test stations',
      'Large-scale multi-site deployments',
    ],
    relatedProductIds: ['prod-sw-3', 'prod-hw-1'],
    relatedProjectIds: ['proj-1', 'proj-2'],
    seoTitle: 'Equipment Integration Solutions | Vtest',
    seoDescription:
      'Connect and integrate diverse test equipment from multiple manufacturers. Multi-protocol support, unified data, real-time monitoring.',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-06-10T00:00:00Z',
  },
  {
    id: 'sol-5',
    title: 'Compliance & Analytics',
    slug: 'compliance-analytics',
    summary:
      'Data-driven compliance management and operational analytics for vehicle testing and inspection operations.',
    description:
      'Vtest delivers compliance management and analytics capabilities that transform inspection data into operational intelligence. Our solutions support regulatory reporting, trend analysis, and performance management for testing organizations.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    icon: 'BarChart3',
    status: 'PUBLISHED',
    businessContext:
      'Testing organizations face growing regulatory requirements and the need to demonstrate operational performance. Access to accurate, timely data is essential for compliance management and continuous improvement.',
    capabilities: [
      'Regulatory compliance reporting',
      'Operational KPI dashboards',
      'Trend analysis and forecasting',
      'Audit trail management',
      'Configurable report templates',
      'Data export and integration',
    ],
    technologies: ['VtestAnalytics', 'VtestIMS', 'BI integration'],
    benefits: [
      'Automated compliance reporting reduces manual effort',
      'Real-time visibility enables proactive management',
      'Data-driven insights support continuous improvement',
      'Audit-ready documentation always available',
    ],
    applications: [
      'Compliance-driven inspection authorities',
      'Performance management programs',
      'Multi-site testing organizations',
    ],
    relatedProductIds: ['prod-sw-2', 'prod-sw-1'],
    relatedProjectIds: [],
    seoTitle: 'Compliance & Analytics Solutions | Vtest',
    seoDescription:
      'Data-driven compliance management and operational analytics for vehicle inspection and testing. Automated reporting, KPI dashboards, audit trails.',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-06-12T00:00:00Z',
  },
  {
    id: 'sol-6',
    title: 'Service & Maintenance',
    slug: 'service-maintenance',
    summary:
      'Professional support, maintenance, and managed services for Vtest hardware and software deployments.',
    description:
      'Vtest provides professional service and maintenance support for all deployed hardware and software solutions. Our service capabilities ensure operational continuity, system performance, and long-term value from technology investments.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
    icon: 'Wrench',
    status: 'PUBLISHED',
    capabilities: [
      'Preventive maintenance programs',
      'Remote monitoring and diagnostics',
      'Software updates and upgrades',
      'Technical support and helpdesk',
      'On-site engineering services',
      'Training and knowledge transfer',
    ],
    technologies: ['Remote diagnostics', 'Monitoring systems', 'Support infrastructure'],
    benefits: [
      'Maximize system uptime and reliability',
      'Protect hardware and software investments',
      'Access to technical expertise when needed',
      'Planned maintenance reduces unplanned downtime',
    ],
    applications: [
      'All Vtest software deployments',
      'All Vtest hardware installations',
      'Multi-site managed services',
    ],
    relatedProductIds: ['prod-sw-1', 'prod-hw-1'],
    relatedProjectIds: [],
    seoTitle: 'Service & Maintenance | Vtest',
    seoDescription:
      'Professional service and maintenance for Vtest hardware and software. Preventive maintenance, remote monitoring, technical support, and managed services.',
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-06-14T00:00:00Z',
  },
];
