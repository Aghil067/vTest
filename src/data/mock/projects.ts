import type { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'MAHA Integration Project',
    slug: 'maha',
    clientOrProjectName: 'MAHA',
    summary:
      'Integration of MAHA vehicle inspection equipment with Vetest\'s inspection management platform, enabling unified operations across a multi-lane testing facility.',
    description:
      'This project involved the technical integration of MAHA brake testers, headlight testers, and exhaust gas measurement equipment with the Vetest inspection management platform. The integration enables real-time data capture, automated result recording, and centralized operational control across multiple inspection lanes.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
        altText: 'Industrial test lane control system',
        caption: 'Test lane control and monitoring',
      },
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
        altText: 'Equipment integration hardware',
        caption: 'Hardware integration components',
      },
    ],
    status: 'PUBLISHED',
    businessContext:
      'The facility required integration of existing MAHA equipment with a modern inspection management platform to eliminate paper-based recording, reduce operator intervention, and enable centralized operational management.',
    problem:
      'MAHA equipment operated as isolated systems with proprietary interfaces, requiring manual data transfer between equipment and management records. This created operational inefficiency and data integrity risks.',
    vtestContribution:
      'Vetest developed protocol-level integration between MAHA equipment and the VetestIMS platform using the MAHA communication protocol, alongside custom hardware interfaces for real-time data capture. The VetestConnect platform was deployed to normalize equipment data and deliver it to the management layer.',
    technologies: ['VetestIMS', 'VetestConnect', 'VetestLane Controller', 'MAHA protocol integration', 'OPC-UA'],
    capabilities: [
      'Multi-equipment protocol integration',
      'Real-time data capture and normalization',
      'Centralized multi-lane management',
      'Automated inspection result recording',
    ],
    relatedSolutionId: 'sol-4',
    relatedProductIds: ['prod-sw-1', 'prod-sw-3', 'prod-hw-1'],
    seoTitle: 'MAHA Integration Project | Vetest Case Study',
    seoDescription:
      'Vetest MAHA equipment integration case study. Protocol-level integration of MAHA inspection equipment with VetestIMS management platform.',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'Navitsa Integration Project',
    slug: 'navitsa',
    clientOrProjectName: 'Navitsa',
    summary:
      'Technical integration of Navitsa vehicle inspection systems with Vetest software, enabling automated data exchange and unified inspection management.',
    description:
      'This project focused on the integration of Navitsa inspection systems with the Vetest inspection management platform. The project involved protocol analysis, custom integration development, and deployment of unified management capabilities across Navitsa-equipped inspection facilities.',
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
        altText: 'Vehicle inspection facility',
        caption: 'Integrated inspection facility',
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
        altText: 'Analytics dashboard',
        caption: 'Operational analytics and reporting',
      },
    ],
    status: 'PUBLISHED',
    businessContext:
      'Navitsa-equipped inspection facilities required a software management layer to orchestrate inspection workflows, capture equipment data automatically, and provide reporting capabilities beyond what the standalone Navitsa system offered.',
    problem:
      'Navitsa systems provided equipment-level control but lacked integrated workflow management, compliance reporting, and multi-site visibility. Facility operators required a unified management view across equipment and lanes.',
    vtestContribution:
      'Vetest integrated the Navitsa inspection system with VetestIMS through protocol-level communication, enabling automatic data capture from Navitsa equipment and centralized management through the Vetest platform. Custom workflow screens were developed to guide operators through the Navitsa-integrated inspection process.',
    technologies: ['VetestIMS', 'VetestConnect', 'Navitsa protocol integration', 'RESTful API'],
    capabilities: [
      'Navitsa system protocol integration',
      'Unified inspection workflow management',
      'Automated result capture and recording',
      'Compliance and operational reporting',
    ],
    relatedSolutionId: 'sol-1',
    relatedProductIds: ['prod-sw-1', 'prod-sw-3'],
    seoTitle: 'Navitsa Integration Project | Vetest Case Study',
    seoDescription:
      'Vetest Navitsa integration case study. Protocol integration of Navitsa inspection systems with VetestIMS for unified inspection management.',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-06-10T00:00:00Z',
  },
];
