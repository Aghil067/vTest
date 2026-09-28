const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const AdminUser = require('./models/AdminUser');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Solution = require('./models/Solution');
const Industry = require('./models/Industry');
const Technology = require('./models/Technology');
const Project = require('./models/Project');
const Resource = require('./models/Resource');
const Enquiry = require('./models/Enquiry');
const Page = require('./models/Page');
const SiteSetting = require('./models/SiteSetting');

// Import the rich mock data
const { mockSolutions } = require('./data_solutions');
const { mockIndustries } = require('./data_industries');
const { mockTechnologies } = require('./data_technologies');
const { mockProjects } = require('./data_projects');
const { mockProducts, mockCategories } = require('./data_products');
const { mockResources } = require('./data_resources');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not set in environment!');
      process.exit(1);
    }

    await mongoose.connect(mongoUri, { dbName: 'vtest_admin' });
    console.log('Connected to MongoDB Atlas for seeding...');

    // 1. Admin User
    const existingAdmin = await AdminUser.findOne({ email: 'admin@vtest.local' });
    if (!existingAdmin) {
      await AdminUser.create({
        name: 'Vtest Lead Administrator',
        email: 'admin@vtest.local',
        password: 'ChangeMe123!',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE'
      });
      console.log('✓ Created default dev admin: admin@vtest.local / ChangeMe123!');
    } else {
      console.log('- Default dev admin exists');
    }

    // 2. Categories
    console.log('Seeding categories...');
    await Category.deleteMany({});
    const categoryDocs = await Category.insertMany(
      mockCategories.map((cat, idx) => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        type: cat.type || 'HARDWARE',
        displayOrder: idx + 1,
        status: 'PUBLISHED'
      }))
    );
    console.log(`✓ Seeded ${categoryDocs.length} categories`);

    const catIdMap = {};
    mockCategories.forEach((cat, idx) => {
      catIdMap[cat.id] = categoryDocs[idx]._id;
      catIdMap[cat.slug] = categoryDocs[idx]._id;
    });

    // 3. Products
    console.log('Seeding products...');
    await Product.deleteMany({});
    const productDocs = await Product.insertMany(
      mockProducts.map((p) => {
        const catId = catIdMap[p.categoryId] || categoryDocs[0]._id;
        return {
          name: p.name,
          slug: p.slug,
          shortDescription: p.shortDescription,
          fullDescription: p.description,
          productType: p.type || 'HARDWARE',
          type: p.type || 'HARDWARE',
          category: catId,
          heroImage: p.heroImage,
          features: (p.features || []).map((f) => ({
            title: f.title,
            description: f.description,
            icon: f.icon || ''
          })),
          specifications: (p.specifications || []).map((s) => ({
            groupName: s.groupName || 'General',
            specKey: s.specKey || s.key,
            specValue: s.specValue || s.value,
            unit: s.unit || ''
          })),
          applications: p.applications || [],
          integrations: p.integrations || [],
          featured: Boolean(p.featured),
          status: 'PUBLISHED',
          seoTitle: p.seoTitle || p.name,
          metaDescription: p.seoDescription || p.shortDescription
        };
      })
    );
    console.log(`✓ Seeded ${productDocs.length} products`);

    // 4. Solutions (All 6)
    console.log('Seeding all 6 solutions...');
    await Solution.deleteMany({});
    const solutionDocs = await Solution.insertMany(
      mockSolutions.map((s) => ({
        name: s.title,
        title: s.title,
        slug: s.slug,
        summary: s.summary,
        description: s.description,
        heroImage: s.image,
        image: s.image,
        icon: s.icon || 'ClipboardCheck',
        capabilities: s.capabilities || [],
        features: s.capabilities || [],
        benefits: s.benefits || [],
        applications: s.applications || [],
        technologies: s.technologies || [],
        businessContext: s.businessContext || '',
        status: 'PUBLISHED',
        seoTitle: s.seoTitle || s.title,
        metaDescription: s.seoDescription || s.summary
      }))
    );
    console.log(`✓ Seeded ${solutionDocs.length} solutions`);

    // 5. Industries (All 4)
    console.log('Seeding all 4 industries...');
    await Industry.deleteMany({});
    const industryDocs = await Industry.insertMany(
      mockIndustries.map((ind) => ({
        industryName: ind.title,
        title: ind.title,
        slug: ind.slug,
        summary: ind.summary,
        description: ind.description,
        heroImage: ind.image,
        image: ind.image,
        icon: ind.icon || 'Building2',
        challenges: ind.challenges || [],
        vtestCapabilities: ind.vtestCapabilities || [],
        benefits: ind.vtestCapabilities || [],
        useCases: ind.useCases || [],
        applications: ind.useCases || [],
        technologies: ind.technologies || [],
        status: 'PUBLISHED',
        seoTitle: ind.seoTitle || ind.title,
        metaDescription: ind.seoDescription || ind.summary
      }))
    );
    console.log(`✓ Seeded ${industryDocs.length} industries`);

    // 6. Technologies (All 5)
    console.log('Seeding technologies...');
    await Technology.deleteMany({});
    const techDocs = await Technology.insertMany(
      mockTechnologies.map((t, idx) => ({
        technologyName: t.title,
        title: t.title,
        slug: t.slug,
        summary: t.summary,
        description: t.description,
        image: t.image,
        heroImage: t.image,
        icon: t.icon || 'Cpu',
        overview: t.overview || '',
        capabilities: t.capabilities || [],
        concepts: t.concepts || [],
        features: (t.capabilities || []).map((c) => (typeof c === 'string' ? c : c.title)),
        applications: t.applications || [],
        displayOrder: idx + 1,
        status: 'PUBLISHED',
        seoTitle: t.seoTitle || t.title,
        metaDescription: t.seoDescription || t.summary
      }))
    );
    console.log(`✓ Seeded ${techDocs.length} technologies`);

    // 7. Projects (Case Studies)
    console.log('Seeding projects...');
    await Project.deleteMany({});
    const projectDocs = await Project.insertMany(
      mockProjects.map((p) => ({
        projectTitle: p.title,
        title: p.title,
        clientName: p.clientOrProjectName,
        clientOrProjectName: p.clientOrProjectName,
        slug: p.slug,
        summary: p.summary,
        description: p.description,
        heroImage: p.heroImage,
        image: p.heroImage,
        images: p.images || [],
        problem: p.problem || p.businessContext || '',
        challenge: p.problem || p.businessContext || '',
        solution: p.vtestContribution || '',
        vtestContribution: p.vtestContribution || '',
        technologies: p.technologies || [],
        capabilities: p.capabilities || [],
        status: 'PUBLISHED'
      }))
    );
    console.log(`✓ Seeded ${projectDocs.length} projects`);

    // 8. Resources
    console.log('Seeding resources...');
    await Resource.deleteMany({});
    const resourceDocs = await Resource.insertMany(
      mockResources.map((r) => ({
        title: r.title,
        slug: r.slug,
        type: r.type || 'WHITEPAPER',
        description: r.description,
        content: r.description,
        author: 'Vtest Engineering Team',
        status: 'PUBLISHED',
        featured: true
      }))
    );
    console.log(`✓ Seeded ${resourceDocs.length} resources`);

    // 9. Default CMS Pages
    const pageCount = await Page.countDocuments();
    if (pageCount === 0) {
      await Page.insertMany([
        {
          pageName: 'About Vtest Technologies',
          slug: 'about-us',
          title: 'Smart Vehicle Inspection & Compliance Platform',
          subtitle: 'Leading the global transition towards intelligent, automated, and error-free vehicle safety testing.',
          content: 'Vtest Vehicle Inspection Management System is a centralized solution that facilitates connecting to governmental vehicle licensing databases to retrieve registration information and captures all vehicle inspection details in order to manage end-to-end vehicle inspection in compliance with road transport policies.',
          status: 'PUBLISHED'
        },
        {
          pageName: 'Privacy Policy',
          slug: 'privacy-policy',
          title: 'Vtest Data Privacy Policy',
          subtitle: 'How we collect, protect, and process diagnostic telemetry and administrative user data.',
          content: 'At Vtest Technologies, we take data privacy and regulatory security with utmost seriousness. All telemetry transmission is encrypted using TLS 1.3...',
          status: 'PUBLISHED'
        }
      ]);
      console.log('✓ Seeded CMS pages');
    }

    // 10. Site Settings
    let settings = await SiteSetting.findOne({ key: 'global_settings' });
    if (!settings) {
      await SiteSetting.create({ key: 'global_settings' });
      console.log('✓ Created default site settings');
    }

    console.log('\n==================================================');
    console.log('🎉 Seed process completed successfully with ALL data!');
    console.log(`- Categories: ${categoryDocs.length}`);
    console.log(`- Products: ${productDocs.length}`);
    console.log(`- Solutions: ${solutionDocs.length} (all 6 solutions active)`);
    console.log(`- Industries: ${industryDocs.length} (all 4 industries active)`);
    console.log(`- Technologies: ${techDocs.length}`);
    console.log(`- Projects: ${projectDocs.length}`);
    console.log(`- Resources: ${resourceDocs.length}`);
    console.log('==================================================');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
