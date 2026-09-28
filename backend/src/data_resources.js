"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResources = void 0;
exports.mockResources = [
    {
        id: 'res-1',
        title: 'VtestIMS Product Brochure',
        slug: 'vtestims-product-brochure',
        type: 'BROCHURE',
        summary: 'Overview brochure for the VtestIMS Inspection Management System covering key capabilities, deployment options, and integration features.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        status: 'PUBLISHED',
        publishedAt: '2024-03-01T00:00:00Z',
        seoTitle: 'VtestIMS Brochure — Inspection Management System | Vtest',
        seoDescription: 'Download the VtestIMS product brochure. Overview of capabilities, deployment options, and integration features for vehicle inspection management.',
        createdAt: '2024-03-01T00:00:00Z',
        updatedAt: '2024-03-01T00:00:00Z',
    },
    {
        id: 'res-2',
        title: 'VtestLane Controller Datasheet',
        slug: 'vtestlane-controller-datasheet',
        type: 'DATASHEET',
        summary: 'Technical datasheet for the VtestLane Controller including specifications, interfaces, environmental ratings, and installation requirements.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
        status: 'PUBLISHED',
        publishedAt: '2024-03-15T00:00:00Z',
        seoTitle: 'VtestLane Controller Datasheet | Vtest',
        seoDescription: 'Technical datasheet for the VtestLane Controller. Specifications, interfaces, environmental ratings, and installation requirements.',
        createdAt: '2024-03-15T00:00:00Z',
        updatedAt: '2024-03-15T00:00:00Z',
    },
    {
        id: 'res-3',
        title: 'VtestSense Module Datasheet',
        slug: 'vtestsense-module-datasheet',
        type: 'DATASHEET',
        summary: 'Technical datasheet for the VtestSense precision sensing module including measurement specifications, channel configurations, and connectivity options.',
        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
        status: 'PUBLISHED',
        publishedAt: '2024-04-01T00:00:00Z',
        seoTitle: 'VtestSense Module Datasheet | Vtest',
        seoDescription: 'Technical specifications for the VtestSense precision sensing module. Measurement channels, accuracy, connectivity, and environmental ratings.',
        createdAt: '2024-04-01T00:00:00Z',
        updatedAt: '2024-04-01T00:00:00Z',
    },
    {
        id: 'res-4',
        title: 'Digitizing Vehicle Inspection Operations: A Technology Guide',
        slug: 'digitizing-vehicle-inspection-operations',
        type: 'ARTICLE',
        summary: 'A practical guide to the key technology considerations when transitioning vehicle inspection operations from paper-based to fully digital workflows.',
        content: `## Digitizing Vehicle Inspection Operations

The transition from paper-based to digital inspection operations is a significant undertaking that requires careful planning across technology, process, and people dimensions.

### Key Technology Considerations

**1. Inspection Management Software**

The foundation of digital inspection operations is a capable management system that can handle workflow configuration, real-time status tracking, and compliance reporting. Look for systems that offer configurable workflows to match your specific inspection types and regulatory requirements.

**2. Equipment Integration**

Existing test equipment typically communicates through proprietary or standard industrial protocols. Ensuring your chosen management system can integrate with your equipment — or that appropriate middleware is available — is critical to avoiding manual data re-entry.

**3. Data Architecture**

Digital inspection systems generate significant volumes of structured data. Consider how this data will be stored, backed up, and accessed. A well-designed data architecture enables both operational use and analytical reporting.

**4. User Interface Design**

Inspection workflows are time-sensitive and often performed in non-office environments. The software interface must be designed for the operational context — clear, fast, and usable by operators with varying technical backgrounds.

**5. Compliance and Audit**

Regulatory requirements vary by jurisdiction, but most vehicle inspection regimes require documented evidence of each inspection's conduct and results. Ensure your digital system provides the audit trail required by your regulatory framework.

### Implementation Approach

A phased implementation approach is typically most effective:

- **Phase 1**: Pilot with a single lane or inspection type to validate the technology and process fit
- **Phase 2**: Expand to full facility with lessons learned from the pilot
- **Phase 3**: Enable advanced capabilities such as analytics, reporting automation, and multi-site management

### Conclusion

Digitizing vehicle inspection operations delivers operational efficiency, improved compliance management, and better data-driven decision making. The technology selection and implementation approach are critical success factors.

*This article provides general guidance on inspection technology considerations. Contact Vtest to discuss your specific requirements.*`,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        status: 'PUBLISHED',
        authorName: 'Vtest Editorial Team',
        publishedAt: '2024-04-15T00:00:00Z',
        seoTitle: 'Digitizing Vehicle Inspection Operations: A Technology Guide | Vtest',
        seoDescription: 'Practical guide to transitioning vehicle inspection operations to digital. Key technology considerations for inspection management, equipment integration, and compliance.',
        createdAt: '2024-04-15T00:00:00Z',
        updatedAt: '2024-04-15T00:00:00Z',
    },
    {
        id: 'res-5',
        title: 'Understanding Industrial IoT for Test Lane Automation',
        slug: 'industrial-iot-test-lane-automation',
        type: 'ARTICLE',
        summary: 'An introduction to how Industrial IoT principles are applied to connect test equipment, sensors, and management systems in modern vehicle testing facilities.',
        content: `## Understanding Industrial IoT for Test Lane Automation

Industrial IoT (IIoT) is transforming how vehicle testing facilities connect their physical equipment with digital management systems. This article introduces the key concepts and practical applications of IIoT in test lane environments.

### What is Industrial IoT in the Context of Testing?

In test lane environments, Industrial IoT refers to the networking of physical test equipment — brake testers, headlight testers, emission analyzers, lane signals — with software systems that manage, monitor, and record inspection activities.

The core value proposition is straightforward: instead of manual data transfer between equipment and records, IIoT enables automatic, real-time data flow from measurement to management.

### Key Protocols in Test Lane IoT

**OPC-UA**: An open, platform-independent communication standard increasingly used for industrial equipment. OPC-UA supports structured data exchange and is suitable for most modern test equipment.

**Modbus**: A long-established industrial protocol still widely used in control systems and older equipment. Modbus is reliable and simple, making it a common integration target.

**RS-232 / RS-485**: Serial communication standards used by many test equipment manufacturers for data output. Still prevalent in existing equipment.

**Custom Protocols**: Many equipment manufacturers implement proprietary communication protocols. Integration with these requires protocol analysis and custom driver development.

### Architecture Patterns

A typical IIoT architecture for a test lane includes:
- Physical equipment with communication interfaces
- Edge device or gateway for protocol translation
- Integration middleware for data normalization
- Management platform consuming normalized data
- Analytics and reporting layer

### Benefits of IIoT Integration

- Elimination of manual data re-entry
- Real-time visibility into equipment and lane status
- Reduced data entry errors
- Foundation for analytics and optimization

*Contact Vtest to learn about IIoT integration capabilities for your testing facility.*`,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        status: 'PUBLISHED',
        authorName: 'Vtest Editorial Team',
        publishedAt: '2024-05-01T00:00:00Z',
        seoTitle: 'Industrial IoT for Test Lane Automation | Vtest',
        seoDescription: 'Introduction to Industrial IoT principles for vehicle test lane automation. Equipment connectivity, protocols, architecture patterns, and integration benefits.',
        createdAt: '2024-05-01T00:00:00Z',
        updatedAt: '2024-05-01T00:00:00Z',
    },
    {
        id: 'res-6',
        title: 'Vtest Solutions Overview Brochure',
        slug: 'vtest-solutions-overview-brochure',
        type: 'BROCHURE',
        summary: 'Company overview brochure covering Vtest\'s complete range of software, hardware, and integration solutions for vehicle testing and inspection.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        status: 'PUBLISHED',
        publishedAt: '2024-02-01T00:00:00Z',
        seoTitle: 'Vtest Solutions Overview Brochure',
        seoDescription: 'Download the Vtest solutions overview brochure. Software, hardware, and integration solutions for vehicle testing and inspection operations.',
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z',
    },
];
