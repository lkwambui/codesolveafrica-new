import { PrismaClient, UserRole, ServiceStatus, CourseStatus, CourseLevel, BlogPostStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { slug: 'super-admin' },
      update: {},
      create: { name: 'Super Admin', slug: 'super-admin', description: 'Full system access', isSystem: true },
    }),
    prisma.role.upsert({
      where: { slug: 'admin' },
      update: {},
      create: { name: 'Admin', slug: 'admin', description: 'Administrative access', isSystem: true },
    }),
    prisma.role.upsert({
      where: { slug: 'editor' },
      update: {},
      create: { name: 'Editor', slug: 'editor', description: 'Content editor access', isSystem: true },
    }),
    prisma.role.upsert({
      where: { slug: 'author' },
      update: {},
      create: { name: 'Author', slug: 'author', description: 'Content author access', isSystem: true },
    }),
    prisma.role.upsert({
      where: { slug: 'moderator' },
      update: {},
      create: { name: 'Moderator', slug: 'moderator', description: 'Moderation access', isSystem: true },
    }),
    prisma.role.upsert({
      where: { slug: 'user' },
      update: {},
      create: { name: 'User', slug: 'user', description: 'Regular user access', isSystem: true },
    }),
  ]);

  // Create super admin user
  const passwordHash = await bcrypt.hash('SuperAdmin@2024!', 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@codesolveafrica.com' },
    update: {},
    create: {
      email: 'admin@codesolveafrica.com',
      firstName: 'Super',
      lastName: 'Admin',
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      isVerified: true,
    },
  });

  // Assign super admin role
  await prisma.roleAssignment.upsert({
    where: { userId_roleId: { userId: superAdmin.id, roleId: roles[0].id } },
    update: {},
    create: { userId: superAdmin.id, roleId: roles[0].id },
  });

  console.log('Admin user created:', superAdmin.email);

  // Create permissions for super admin
  const resources = ['users', 'services', 'courses', 'blog', 'portfolio', 'testimonials', 'faq', 'contact', 'consultation', 'newsletter', 'careers', 'applications', 'media', 'settings', 'pages', 'roles', 'permissions', 'dashboard'];
  const actions = ['CREATE', 'READ', 'UPDATE', 'DELETE', 'MANAGE'] as const;

  for (const resource of resources) {
    for (const action of actions) {
      await prisma.permission.upsert({
        where: { roleId_resource_action: { roleId: roles[0].id, resource, action } },
        update: {},
        create: { roleId: roles[0].id, resource, action },
      });
    }
  }

  // Create service categories
  const serviceCategories = await Promise.all([
    prisma.serviceCategory.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: { name: 'Web Development', slug: 'web-development', description: 'Full-stack web development services', icon: 'globe', sortOrder: 1 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: 'mobile-development' },
      update: {},
      create: { name: 'Mobile Development', slug: 'mobile-development', description: 'Mobile app development for iOS and Android', icon: 'smartphone', sortOrder: 2 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: 'ai-ml' },
      update: {},
      create: { name: 'AI & Machine Learning', slug: 'ai-ml', description: 'Artificial intelligence and machine learning solutions', icon: 'cpu', sortOrder: 3 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: 'cloud-devops' },
      update: {},
      create: { name: 'Cloud & DevOps', slug: 'cloud-devops', description: 'Cloud infrastructure and DevOps services', icon: 'cloud', sortOrder: 4 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: 'consulting' },
      update: {},
      create: { name: 'IT Consulting', slug: 'consulting', description: 'Technology consulting and strategy', icon: 'briefcase', sortOrder: 5 },
    }),
  ]);

  // Create sample services
  const services = [
    { title: 'Custom Web Application Development', description: 'End-to-end web application development using modern frameworks and best practices. We build scalable, performant, and secure web applications tailored to your business needs.', categoryId: serviceCategories[0].id, icon: 'code', featured: true, sortOrder: 1, includes: ['Requirements Analysis', 'UI/UX Design', 'Frontend Development', 'Backend Development', 'Database Design', 'API Integration', 'Testing & QA', 'Deployment & DevOps'] },
    { title: 'Mobile App Development', description: 'Native and cross-platform mobile applications for iOS and Android. Our team delivers exceptional mobile experiences that engage users and drive business growth.', categoryId: serviceCategories[1].id, icon: 'smartphone', featured: true, sortOrder: 2, includes: ['iOS Development', 'Android Development', 'Cross-Platform Development', 'UI/UX Design', 'App Store Deployment', 'Maintenance & Support'] },
    { title: 'AI & Machine Learning Solutions', description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent products.', categoryId: serviceCategories[2].id, icon: 'brain', featured: true, sortOrder: 3, includes: ['Data Analysis', 'Model Development', 'NLP Solutions', 'Computer Vision', 'Predictive Analytics', 'ML Pipeline Setup'] },
    { title: 'Cloud Infrastructure & DevOps', description: 'Design, implement, and manage cloud infrastructure with CI/CD pipelines, monitoring, and automation.', categoryId: serviceCategories[3].id, icon: 'server', sortOrder: 4, includes: ['Cloud Migration', 'Infrastructure as Code', 'CI/CD Pipeline Setup', 'Monitoring & Alerting', 'Security & Compliance', 'Cost Optimization'] },
    { title: 'IT Strategy & Consulting', description: 'Strategic technology consulting to help you make informed decisions and drive digital transformation.', categoryId: serviceCategories[4].id, icon: 'users', sortOrder: 5, includes: ['Technology Audit', 'Digital Strategy', 'Architecture Design', 'Technology Selection', 'Team Augmentation', 'Training & Workshops'] },
  ];

  for (const svc of services) {
    const slug = svc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await prisma.service.upsert({
      where: { slug },
      update: {},
      create: {
        title: svc.title,
        slug,
        description: svc.description,
        categoryId: svc.categoryId,
        icon: svc.icon,
        featured: svc.featured || false,
        sortOrder: svc.sortOrder,
        status: ServiceStatus.ACTIVE,
        includes: svc.includes,
      },
    });
  }

  // Create course categories
  const courseCategories = await Promise.all([
    prisma.courseCategory.upsert({ where: { slug: 'web-development' }, update: {}, create: { name: 'Web Development', slug: 'web-development', description: 'Web development courses', sortOrder: 1 } }),
    prisma.courseCategory.upsert({ where: { slug: 'data-science' }, update: {}, create: { name: 'Data Science', slug: 'data-science', description: 'Data science and analytics', sortOrder: 2 } }),
    prisma.courseCategory.upsert({ where: { slug: 'mobile-development' }, update: {}, create: { name: 'Mobile Development', slug: 'mobile-development', description: 'Mobile app development', sortOrder: 3 } }),
    prisma.courseCategory.upsert({ where: { slug: 'cloud-computing' }, update: {}, create: { name: 'Cloud Computing', slug: 'cloud-computing', description: 'Cloud computing courses', sortOrder: 4 } }),
    prisma.courseCategory.upsert({ where: { slug: 'soft-skills' }, update: {}, create: { name: 'Soft Skills', slug: 'soft-skills', description: 'Professional development and soft skills', sortOrder: 5 } }),
  ]);

  // Create instructor
  const instructor = await prisma.instructor.upsert({
    where: { email: 'instructor@codesolveafrica.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'instructor@codesolveafrica.com',
      bio: 'Senior software engineer with over 10 years of experience in full-stack development. Passionate about teaching and mentoring the next generation of African developers.',
      title: 'Senior Software Engineer',
      company: 'CodeSolveAfrica',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
      featured: true,
    },
  });

  // Create sample courses
  const courses = [
    { title: 'Full-Stack Web Development with React & Node.js', description: 'Master modern web development from frontend to backend. Build real-world applications using React, Node.js, TypeScript, and PostgreSQL.', shortDescription: 'Learn full-stack development with modern tools', categoryId: courseCategories[0].id, level: CourseLevel.BEGINNER, duration: '12 weeks', durationHours: 120, price: 499, featured: true, learningOutcomes: ['Build responsive UIs with React', 'Create REST APIs with Node.js', 'Work with databases', 'Deploy applications to the cloud'] },
    { title: 'Python for Data Science & Machine Learning', description: 'Dive into data science with Python. Learn pandas, numpy, scikit-learn, and build machine learning models.', shortDescription: 'Master data science with Python', categoryId: courseCategories[1].id, level: CourseLevel.INTERMEDIATE, duration: '10 weeks', durationHours: 100, price: 599, featured: true, learningOutcomes: ['Analyze data with pandas', 'Build ML models', 'Create visualizations', 'Deploy models to production'] },
    { title: 'Mobile App Development with Flutter', description: 'Build beautiful, natively compiled mobile applications for iOS and Android from a single codebase using Flutter.', shortDescription: 'Cross-platform mobile development', categoryId: courseCategories[2].id, level: CourseLevel.BEGINNER, duration: '8 weeks', durationHours: 80, price: 399, learningOutcomes: ['Build Flutter apps', 'State management', 'API integration', 'App Store deployment'] },
    { title: 'AWS Cloud Architecture', description: 'Learn to design and deploy scalable, highly available, and fault-tolerant systems on Amazon Web Services.', shortDescription: 'Cloud architecture on AWS', categoryId: courseCategories[3].id, level: CourseLevel.ADVANCED, duration: '6 weeks', durationHours: 60, price: 699, learningOutcomes: ['AWS services mastery', 'Architecture design', 'Security best practices', 'Cost optimization'] },
    { title: 'Leadership & Team Management', description: 'Develop essential leadership skills for managing technical teams and driving project success.', shortDescription: 'Essential leadership skills', categoryId: courseCategories[4].id, level: CourseLevel.BEGINNER, duration: '4 weeks', durationHours: 40, price: 299, learningOutcomes: ['Team leadership', 'Conflict resolution', 'Project management', 'Effective communication'] },
  ];

  for (const course of courses) {
    const slug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await prisma.course.upsert({
      where: { slug },
      update: {},
      create: {
        title: course.title,
        slug,
        description: course.description,
        shortDescription: course.shortDescription,
        categoryId: course.categoryId,
        level: course.level,
        duration: course.duration,
        durationHours: course.durationHours,
        price: course.price,
        instructorId: instructor.id,
        featured: course.featured || false,
        status: CourseStatus.PUBLISHED,
        publishedAt: new Date(),
        learningOutcomes: course.learningOutcomes,
      },
    });
  }

  // Create blog categories
  const blogCategories = await Promise.all([
    prisma.blogCategory.upsert({ where: { slug: 'technology' }, update: {}, create: { name: 'Technology', slug: 'technology', description: 'Latest technology trends and insights', sortOrder: 1 } }),
    prisma.blogCategory.upsert({ where: { slug: 'tutorials' }, update: {}, create: { name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step programming tutorials', sortOrder: 2 } }),
    prisma.blogCategory.upsert({ where: { slug: 'career-advice' }, update: {}, create: { name: 'Career Advice', slug: 'career-advice', description: 'Career tips for developers', sortOrder: 3 } }),
    prisma.blogCategory.upsert({ where: { slug: 'company-news' }, update: {}, create: { name: 'Company News', slug: 'company-news', description: 'Updates from CodeSolveAfrica', sortOrder: 4 } }),
    prisma.blogCategory.upsert({ where: { slug: 'africa-tech' }, update: {}, create: { name: 'Africa Tech', slug: 'africa-tech', description: 'Technology developments across Africa', sortOrder: 5 } }),
  ]);

  // Create blog tags
  const blogTags = await Promise.all([
    prisma.blogTag.upsert({ where: { slug: 'javascript' }, update: {}, create: { name: 'JavaScript', slug: 'javascript' } }),
    prisma.blogTag.upsert({ where: { slug: 'python' }, update: {}, create: { name: 'Python', slug: 'python' } }),
    prisma.blogTag.upsert({ where: { slug: 'react' }, update: {}, create: { name: 'React', slug: 'react' } }),
    prisma.blogTag.upsert({ where: { slug: 'nodejs' }, update: {}, create: { name: 'Node.js', slug: 'nodejs' } }),
    prisma.blogTag.upsert({ where: { slug: 'career' }, update: {}, create: { name: 'Career', slug: 'career' } }),
  ]);

  // Create sample blog posts
  const blogPosts = [
    { title: 'Getting Started with TypeScript in 2024', content: 'TypeScript has become an essential tool for modern JavaScript development. In this comprehensive guide, we explore why TypeScript matters and how to get started with it in your projects.\n\nTypeScript adds static type checking to JavaScript, helping catch errors early in the development process. With features like interfaces, generics, and advanced type inference, TypeScript makes your code more maintainable and self-documenting.', excerpt: 'A comprehensive guide to getting started with TypeScript in 2024', categoryId: blogCategories[0].id, featured: true, tags: [blogTags[0].id, blogTags[2].id] },
    { title: 'Building REST APIs with NestJS', content: 'NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Learn how to build production-ready REST APIs with NestJS.\n\nNestJS uses TypeScript by default and combines elements of OOP, FP, and FRP. It provides a modular architecture that makes it easy to organize your code and follows the SOLID principles.', excerpt: 'Learn to build production-ready REST APIs with NestJS framework', categoryId: blogCategories[1].id, featured: true, tags: [blogTags[0].id, blogTags[3].id] },
    { title: 'The State of Tech in Africa 2024', content: 'The African tech ecosystem continues to grow at an unprecedented pace. From fintech innovations in Nigeria to SaaS solutions in South Africa, the continent is becoming a global tech hub.\n\nInvestment in African tech startups reached new heights, with significant funding going into fintech, healthtech, and edtech sectors. Governments across the continent are also implementing policies to support digital transformation.', excerpt: 'An overview of the growing African tech ecosystem and opportunities', categoryId: blogCategories[4].id, featured: true, tags: [] },
    { title: 'How to Land Your First Developer Job', content: 'Breaking into the tech industry can be challenging, but with the right strategy and preparation, you can land your first developer job. Here are proven tips and strategies.\n\nFocus on building a strong portfolio of projects that demonstrate your skills. Contribute to open source projects to gain real-world experience and build your network. Prepare for technical interviews by practicing coding challenges and system design questions.', excerpt: 'Practical tips and strategies for landing your first software development job', categoryId: blogCategories[2].id, tags: [blogTags[4].id] },
    { title: 'Introduction to Machine Learning with Python', content: 'Machine learning is transforming industries across the globe. This beginner-friendly guide introduces the fundamental concepts of machine learning using Python.\n\nWe cover supervised and unsupervised learning, key algorithms like linear regression and decision trees, and practical examples using scikit-learn. You will learn how to prepare data, train models, and evaluate their performance.', excerpt: 'A beginner-friendly introduction to machine learning concepts using Python', categoryId: blogCategories[1].id, tags: [blogTags[1].id] },
  ];

  for (const post of blogPosts) {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const created = await prisma.blogPost.upsert({
      where: { slug },
      update: {},
      create: {
        title: post.title,
        slug,
        content: post.content,
        excerpt: post.excerpt,
        categoryId: post.categoryId,
        authorId: superAdmin.id,
        status: BlogPostStatus.PUBLISHED,
        publishedAt: new Date(),
        featured: post.featured || false,
        readingTime: Math.ceil(post.content.split(/\s+/).length / 200),
      },
    });

    for (const tagId of post.tags) {
      await prisma.blogPostTag.upsert({
        where: { postId_tagId: { postId: created.id, tagId } },
        update: {},
        create: { postId: created.id, tagId },
      });
    }
  }

  // Create sample portfolio projects
  const portfolioProjects = [
    { title: 'E-Commerce Platform for African Artisans', description: 'A full-featured e-commerce platform connecting African artisans with global buyers. Features include multi-vendor support, real-time inventory management, and integrated payment processing.', client: 'Artisan Connect', technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'], category: 'Web Development', featured: true },
    { title: 'Mobile Banking App', description: 'A secure and user-friendly mobile banking application serving unbanked populations across Africa. Includes biometric authentication, mobile money integration, and offline capabilities.', client: 'FinServe Africa', technologies: ['Flutter', 'Firebase', 'Python', 'Machine Learning'], category: 'Mobile Development', featured: true },
    { title: 'Healthcare Management System', description: 'A comprehensive healthcare management system for hospitals and clinics. Features include patient records management, appointment scheduling, telemedicine integration, and analytics dashboard.', client: 'HealthTech Solutions', technologies: ['Angular', 'Spring Boot', 'MySQL', 'Docker'], category: 'Web Development' },
  ];

  for (const project of portfolioProjects) {
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await prisma.portfolioProject.upsert({
      where: { slug },
      update: {},
      create: {
        title: project.title,
        slug,
        description: project.description,
        client: project.client,
        technologies: project.technologies,
        category: project.category,
        featured: project.featured || false,
      },
    });
  }

  // Create sample testimonials
  const testimonials = [
    { name: 'Sarah Johnson', title: 'CEO', company: 'TechStart Inc.', content: 'CodeSolveAfrica transformed our digital presence. Their team delivered a cutting-edge platform that exceeded our expectations. The attention to detail and commitment to quality was outstanding.', rating: 5, featured: true },
    { name: 'Michael Osei', title: 'CTO', company: 'FinTech Ghana', content: 'Working with CodeSolveAfrica was an incredible experience. Their expertise in mobile development helped us launch our product ahead of schedule. Highly recommended for any tech project.', rating: 5, featured: true },
    { name: 'Grace Mwangi', title: 'Product Manager', company: 'EduTech Kenya', content: 'The training programs offered by CodeSolveAfrica are world-class. Our team gained practical skills that immediately improved our development process. Exceptional value for money.', rating: 4, featured: true },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: {
        name: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        content: testimonial.content,
        rating: testimonial.rating,
        featured: testimonial.featured,
      },
    });
  }

  // Create FAQ categories
  const faqCategory = await prisma.fAQCategory.upsert({
    where: { slug: 'general' },
    update: {},
    create: { name: 'General', slug: 'general', description: 'General frequently asked questions', sortOrder: 1 },
  });

  // Create sample FAQs
  const faqs = [
    { question: 'What services does CodeSolveAfrica offer?', answer: 'CodeSolveAfrica offers a comprehensive range of technology services including web and mobile development, AI/ML solutions, cloud infrastructure, DevOps, and IT consulting. We also provide professional training programs in various technology domains.' },
    { question: 'How do I get started with a project?', answer: 'Getting started is easy! Simply reach out through our contact form or book a free consultation call. We will discuss your requirements, provide a project proposal, and get started once both parties agree on the scope and timeline.' },
    { question: 'What technologies does your team specialize in?', answer: 'Our team is proficient in a wide range of modern technologies including React, Angular, Vue.js, Node.js, Python, Java, Flutter, React Native, AWS, Azure, Google Cloud, and various AI/ML frameworks. We continuously update our skills to stay current with industry trends.' },
    { question: 'Do you offer post-launch support?', answer: 'Yes, we provide comprehensive post-launch support and maintenance services. We offer various support packages tailored to your needs, including bug fixes, feature updates, performance optimization, and 24/7 monitoring.' },
    { question: 'What is the typical timeline for a project?', answer: 'Project timelines vary depending on complexity and scope. A typical web application can take 8-16 weeks, while mobile apps may take 12-20 weeks. We provide detailed timelines during the proposal phase and keep you updated throughout development.' },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        categoryId: faqCategory.id,
        featured: true,
      },
    });
  }

  // Create sample settings
  const settings = [
    { key: 'site_name', value: 'CodeSolveAfrica', type: 'TEXT' as const, group: 'general', label: 'Site Name', isPublic: true, sortOrder: 1 },
    { key: 'site_description', value: 'Empowering African businesses through innovative technology solutions', type: 'TEXT' as const, group: 'general', label: 'Site Description', isPublic: true, sortOrder: 2 },
    { key: 'contact_email', value: 'hello@codesolveafrica.com', type: 'TEXT' as const, group: 'contact', label: 'Contact Email', isPublic: true, sortOrder: 3 },
    { key: 'contact_phone', value: '+233 50 000 0000', type: 'TEXT' as const, group: 'contact', label: 'Contact Phone', isPublic: true, sortOrder: 4 },
    { key: 'address', value: 'Accra, Ghana', type: 'TEXT' as const, group: 'contact', label: 'Address', isPublic: true, sortOrder: 5 },
    { key: 'social_twitter', value: 'https://twitter.com/codesolveafrica', type: 'TEXT' as const, group: 'social', label: 'Twitter URL', isPublic: true, sortOrder: 6 },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/codesolveafrica', type: 'TEXT' as const, group: 'social', label: 'LinkedIn URL', isPublic: true, sortOrder: 7 },
    { key: 'social_github', value: 'https://github.com/codesolveafrica', type: 'TEXT' as const, group: 'social', label: 'GitHub URL', isPublic: true, sortOrder: 8 },
    { key: 'maintenance_mode', value: 'false', type: 'BOOLEAN' as const, group: 'system', label: 'Maintenance Mode', isSystem: true, sortOrder: 9 },
    { key: 'registration_open', value: 'true', type: 'BOOLEAN' as const, group: 'system', label: 'Registration Open', isSystem: true, sortOrder: 10 },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  // Create homepage page
  const homepageSlug = 'home';
  const existingHomepage = await prisma.page.findUnique({ where: { slug: homepageSlug } });

  if (!existingHomepage) {
    await prisma.page.create({
      data: {
        title: 'Home',
        slug: homepageSlug,
        isPublished: true,
        isHomepage: true,
        publishedAt: new Date(),
        authorId: superAdmin.id,
        sections: {
          create: [
            { type: 'hero', title: 'Hero Section', content: { heading: 'Empowering Africa Through Technology', subheading: 'We build innovative software solutions that drive digital transformation across the continent' }, sortOrder: 1 },
            { type: 'services', title: 'Our Services', content: { heading: 'What We Do' }, sortOrder: 2 },
            { type: 'courses', title: 'Featured Courses', content: { heading: 'Learn With Us' }, sortOrder: 3 },
            { type: 'portfolio', title: 'Our Work', content: { heading: 'Recent Projects' }, sortOrder: 4 },
            { type: 'testimonials', title: 'Testimonials', content: { heading: 'What Our Clients Say' }, sortOrder: 5 },
            { type: 'cta', title: 'Call to Action', content: { heading: 'Ready to Get Started?', buttonText: 'Contact Us', buttonUrl: '/contact' }, sortOrder: 6 },
          ],
        },
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
