import dayjs from 'dayjs';

// Centralised dummy data for the entire application
// This simulates a database and will be used across all services

export const employeesData = [
  { id: 1, name: 'John Doe', position: 'CEO & Founder', department: 'Management', active: true, image: null, createdAt: '2026-01-10T10:00:00Z' },
  { id: 2, name: 'Sarah Connor', position: 'Head of AI', department: 'Engineering', active: true, image: null, createdAt: '2026-02-15T10:00:00Z' },
  { id: 3, name: 'Peter Parker', position: 'Full Stack Developer', department: 'Engineering', active: true, image: null, createdAt: '2026-03-10T10:00:00Z' },
  { id: 4, name: 'Greta Gerwig', position: 'Lead UI/UX Designer', department: 'Design', active: true, image: null, createdAt: '2026-03-20T10:00:00Z' },
  { id: 5, name: 'Tony Stark', position: 'CTO', department: 'Management', active: false, image: null, createdAt: '2026-03-25T10:00:00Z' },
  { id: 6, name: 'Diana Prince', position: 'Product Manager', department: 'Product', active: true, image: null, createdAt: '2026-03-29T10:00:00Z' },
];

export const activeEmployeesData = [
  { id: 1, name: 'John Doe', position: 'CEO & Founder', department: 'Management', active: true, image: null, createdAt: '2026-01-10T10:00:00Z' },
  { id: 2, name: 'Sarah Connor', position: 'Head of AI', department: 'Engineering', active: true, image: null, createdAt: '2026-02-15T10:00:00Z' },
  { id: 3, name: 'Peter Parker', position: 'Full Stack Developer', department: 'Engineering', active: true, image: null, createdAt: '2026-03-10T10:00:00Z' },
  { id: 4, name: 'Greta Gerwig', position: 'Lead UI/UX Designer', department: 'Design', active: true, image: null, createdAt: '2026-03-20T10:00:00Z' },
  { id: 6, name: 'Diana Prince', position: 'Product Manager', department: 'Product', active: true, image: null, createdAt: '2026-03-29T10:00:00Z' },
];

export const inactiveEmployeesData = [
  { id: 5, name: 'Tony Stark', position: 'CTO', department: 'Management', active: false, image: null, createdAt: '2026-03-25T10:00:00Z' },
];

export const blogsData = [
  { id: 1, title: 'The Future of AI in Enterprise', category: 'AI & Machine Learning', author: 'Dr. Sarah Connor', status: 'PUBLISHED', createdAt: dayjs().subtract(2, 'hours').toISOString(), image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=100&h=100' },
  { id: 2, title: 'Mastering Modern Web Architecture', category: 'Web Development', author: 'Peter Parker', status: 'DRAFT', createdAt: dayjs().subtract(5, 'hours').toISOString(), image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&h=100' },
  { id: 3, title: 'Why Antigravity is the Future', category: 'UI/UX Design', author: 'Greta Gerwig', status: 'PUBLISHED', createdAt: dayjs().subtract(2, 'days').toISOString(), image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=100&h=100' },
  { id: 4, title: 'Ancient Web Archive', category: 'Web Development', author: 'Dr. Sarah Connor', status: 'PUBLISHED', createdAt: dayjs().subtract(10, 'days').toISOString(), image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&h=100' },
  { id: 5, title: 'Legacy Systems 101', category: 'DevOps', author: 'Peter Parker', status: 'PUBLISHED', createdAt: dayjs().subtract(15, 'days').toISOString(), image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=100&h=100' },
];

export const publishedBlogsData = [
  { id: 1, title: 'The Future of AI in Enterprise', category: 'AI & Machine Learning', author: 'Dr. Sarah Connor', status: 'PUBLISHED', createdAt: dayjs().subtract(2, 'hours').toISOString(), image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=100&h=100' },
  { id: 3, title: 'Why Antigravity is the Future', category: 'UI/UX Design', author: 'Greta Gerwig', status: 'PUBLISHED', createdAt: dayjs().subtract(2, 'days').toISOString(), image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=100&h=100' },
  { id: 4, title: 'Ancient Web Archive', category: 'Web Development', author: 'Dr. Sarah Connor', status: 'PUBLISHED', createdAt: dayjs().subtract(10, 'days').toISOString(), image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&h=100' },
  { id: 5, title: 'Legacy Systems 101', category: 'DevOps', author: 'Peter Parker', status: 'PUBLISHED', createdAt: dayjs().subtract(15, 'days').toISOString(), image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=100&h=100' },
];

export const draftBlogsData = [
  { id: 2, title: 'Mastering Modern Web Architecture', category: 'Web Development', author: 'Peter Parker', status: 'DRAFT', createdAt: dayjs().subtract(5, 'hours').toISOString(), image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&h=100' },
];

export const enquiriesData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', budgetLowerLimit: 5000, budgetUpperLimit: 10000, source: 'Contact Form', status: 'NEW', createdAt: '2026-03-28T10:00:00Z' },
  { id: 2, name: 'Alice Smith', email: 'alice@corp.com', phone: '+1 987 654 321', budgetLowerLimit: 20000, budgetUpperLimit: null, source: 'IdeaPopup', status: 'IN_PROGRESS', createdAt: '2026-03-27T10:00:00Z' },
  { id: 3, name: 'Bob Wilson', email: 'bob@tech.io', phone: '+44 20 7946 0958', budgetLowerLimit: 10000, budgetUpperLimit: 20000, source: 'Landing Page', status: 'COMPLETED', createdAt: '2026-03-25T10:00:00Z' },
  { id: 4, name: 'Sarah Connor', email: 'sarah@skynet.com', phone: '+1 555 0199', budgetLowerLimit: 0, budgetUpperLimit: null, source: 'Contact Form', status: 'REJECTED', createdAt: '2026-03-24T10:00:00Z' },
  { id: 5, name: 'Stale Enquiry', email: 'old@archive.org', phone: '+1 000 000 000', budgetLowerLimit: 1000, budgetUpperLimit: 3000, source: 'Direct', status: 'NEW', createdAt: '2026-03-01T10:00:00Z' },
];

export const newEnquiriesData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', budgetLowerLimit: 5000, budgetUpperLimit: 10000, source: 'Contact Form', status: 'NEW', createdAt: '2026-03-28T10:00:00Z' },
  { id: 5, name: 'Stale Enquiry', email: 'old@archive.org', phone: '+1 000 000 000', budgetLowerLimit: 1000, budgetUpperLimit: 3000, source: 'Direct', status: 'NEW', createdAt: '2026-03-01T10:00:00Z' },
];

export const inProgressEnquiriesData = [
  { id: 2, name: 'Alice Smith', email: 'alice@corp.com', phone: '+1 987 654 321', budgetLowerLimit: 20000, budgetUpperLimit: null, source: 'IdeaPopup', status: 'IN_PROGRESS', createdAt: '2026-03-27T10:00:00Z' },
];

export const completedEnquiriesData = [
  { id: 3, name: 'Bob Wilson', email: 'bob@tech.io', phone: '+44 20 7946 0958', budgetLowerLimit: 10000, budgetUpperLimit: 20000, source: 'Landing Page', status: 'COMPLETED', createdAt: '2026-03-25T10:00:00Z' },
];

export const rejectedEnquiriesData = [
  { id: 4, name: 'Sarah Connor', email: 'sarah@skynet.com', phone: '+1 555 0199', budgetLowerLimit: 0, budgetUpperLimit: null, source: 'Contact Form', status: 'REJECTED', createdAt: '2026-03-24T10:00:00Z' },
];

export const demoRequestsData = [
  { id: 1, name: 'Michael Bay', company: 'Explosion Inc', service: 'SaaS Platform', date: '2026-04-05', time: '14:30 PM', status: 'PENDING', submitted: '2026-03-29' },
  { id: 2, name: 'Christopher Nolan', company: 'Inception Tech', service: 'AI Platform', date: '2026-04-06', time: '10:00 AM', status: 'CONFIRMED', submitted: '2026-03-28' },
  { id: 3, name: 'Quentin Tarantino', company: 'Pulp Fiction Soft', service: 'Mobile App', date: '2026-03-31', time: '11:15 AM', status: 'COMPLETED', submitted: '2026-03-20' },
  { id: 4, name: 'Greta Gerwig', company: 'Dreamhouse UI', service: 'Web Application', date: '2026-04-02', time: '16:00 PM', status: 'CANCELLED', submitted: '2026-03-27' },
];

export const pendingDemoRequestsData = [
  { id: 1, name: 'Michael Bay', company: 'Explosion Inc', service: 'SaaS Platform', date: '2026-04-05', time: '14:30 PM', status: 'PENDING', submitted: '2026-03-29' },
];

export const confirmedDemoRequestsData = [
  { id: 2, name: 'Christopher Nolan', company: 'Inception Tech', service: 'AI Platform', date: '2026-04-06', time: '10:00 AM', status: 'CONFIRMED', submitted: '2026-03-28' },
];

export const completedDemoRequestsData = [
  { id: 3, name: 'Quentin Tarantino', company: 'Pulp Fiction Soft', service: 'Mobile App', date: '2026-03-31', time: '11:15 AM', status: 'COMPLETED', submitted: '2026-03-20' },
];

export const cancelledDemoRequestsData = [
  { id: 4, name: 'Greta Gerwig', company: 'Dreamhouse UI', service: 'Web Application', date: '2026-04-02', time: '16:00 PM', status: 'CANCELLED', submitted: '2026-03-27' },
];

export const productsData = [
  { id: 1, title: 'EMI Management Platform', category: 'FinTech', active: true, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&h=100', tags: ['React', 'Node.js'] },
  { id: 2, title: 'AI Content Suite', category: 'Generative AI', active: true, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=100&h=100', tags: ['Python', 'AWS'] },
  { id: 3, title: 'DeFi Wallet', category: 'Blockchain', active: false, image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=100&h=100', tags: ['Solidity'] },
];

export const portfolioProductsData = [
  { id: 1, title: 'OncyTech Corporate Website', category: 'Web Design', active: true, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&h=100', tags: ['Next.js', 'Tailwind'] },
  { id: 2, title: 'Global Logistics App', category: 'Mobile App', active: true, image: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&w=100&h=100', tags: ['React Native', 'Firebase'] },
  { id: 3, title: 'Automated Billing System', category: 'SaaS', active: true, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&h=100', tags: ['Python', 'Django'] },
];

export const jobApplicationsData = [
  { id: 1, name: 'Peter Parker', email: 'peter@web.net', role: 'Full-Stack Developer', portfolio: 'https://peterparker.com', resume: 'peter_resume.pdf', status: 'NEW', date: '2026-03-29' },
  { id: 2, name: 'Bruce Wayne', email: 'bruce@wayne.com', role: 'UI/UX Designer', portfolio: 'https://behance.net/bruce', resume: 'bruce_portfolio.pdf', status: 'REVIEWING', date: '2026-03-28' },
  { id: 3, name: 'Tony Stark', email: 'tony@stark.io', role: 'AI Platform Engineer', portfolio: 'https://github.com/tony', resume: 'tony_cv.pdf', status: 'INTERVIEW', date: '2026-03-25' },
  { id: 4, name: 'Diana Prince', email: 'diana@amazon.net', role: 'Mobile Developer', portfolio: 'https://diana.dev', resume: 'diana_resume.zip', status: 'REJECTED', date: '2026-03-24' },
];

export const newJobApplicationsData = [
  { id: 1, name: 'Peter Parker', email: 'peter@web.net', role: 'Full-Stack Developer', portfolio: 'https://peterparker.com', resume: 'peter_resume.pdf', status: 'NEW', date: '2026-03-29' },
];

export const reviewingJobApplicationsData = [
  { id: 2, name: 'Bruce Wayne', email: 'bruce@wayne.com', role: 'UI/UX Designer', portfolio: 'https://behance.net/bruce', resume: 'bruce_portfolio.pdf', status: 'REVIEWING', date: '2026-03-28' },
];

export const interviewJobApplicationsData = [
  { id: 3, name: 'Tony Stark', email: 'tony@stark.io', role: 'AI Platform Engineer', portfolio: 'https://github.com/tony', resume: 'tony_cv.pdf', status: 'INTERVIEW', date: '2026-03-25' },
];

export const hiredJobApplicationsData = [];

export const rejectedJobApplicationsData = [
  { id: 4, name: 'Diana Prince', email: 'diana@amazon.net', role: 'Mobile Developer', portfolio: 'https://diana.dev', resume: 'diana_resume.zip', status: 'REJECTED', date: '2026-03-24' },
];

export const newsletterSubscribersData = [
  { id: 1, email: 'clark.kent@dailyplanet.com', status: 'ACTIVE', date: '2026-03-29' },
  { id: 2, email: 'bruce.wayne@wayne.com', status: 'ACTIVE', date: '2026-03-28' },
  { id: 3, email: 'diana.prince@themyscira.gov', status: 'ACTIVE', date: '2026-03-27' },
  { id: 4, email: 'barry.allen@centralcity.pd', status: 'UNSUBSCRIBED', date: '2026-03-26' },
  { id: 5, email: 'arthur.curry@atlantis.marine', status: 'ACTIVE', date: '2026-03-25' },
  { id: 6, email: 'victor.stone@star-labs.tech', status: 'ACTIVE', date: '2026-03-24' },
];

export const adminsData = [
  { id: 1, name: 'Admin Account', email: 'admin@oncytech.com', role: 'Global Administrator', active: true, lastLogin: '2026-03-30T10:00:00Z', createdAt: '2026-01-01T10:00:00Z' },
  { id: 2, name: 'Sarah Connor', email: 'sarah@oncy.com', role: 'Admin', active: true, lastLogin: '2026-03-29T14:30:00Z', createdAt: '2026-02-01T10:00:00Z' },
  { id: 3, name: 'Peter Parker', email: 'peter@oncy.com', role: 'Editor', active: true, lastLogin: '2026-03-28T09:15:00Z', createdAt: '2026-02-15T10:00:00Z' },
  { id: 4, name: 'Tony Stark', email: 'tony@oncy.com', role: 'Admin', active: false, lastLogin: '2026-03-20T16:45:00Z', createdAt: '2026-03-01T10:00:00Z' },
];

export const activeAdminsData = [
  { id: 1, name: 'Admin Account', email: 'admin@oncytech.com', role: 'Global Administrator', active: true, lastLogin: '2026-03-30T10:00:00Z', createdAt: '2026-01-01T10:00:00Z' },
  { id: 2, name: 'Sarah Connor', email: 'sarah@oncy.com', role: 'Admin', active: true, lastLogin: '2026-03-29T14:30:00Z', createdAt: '2026-02-01T10:00:00Z' },
  { id: 3, name: 'Peter Parker', email: 'peter@oncy.com', role: 'Editor', active: true, lastLogin: '2026-03-28T09:15:00Z', createdAt: '2026-02-15T10:00:00Z' },
];

export const inactiveAdminsData = [
  { id: 4, name: 'Tony Stark', email: 'tony@oncy.com', role: 'Admin', active: false, lastLogin: '2026-03-20T16:45:00Z', createdAt: '2026-03-01T10:00:00Z' },
];

export const siteControlData = {
  headerLogo: {
    id: 'logo-1',
    url: '/ONCYTECHLOGO.png',
    type: 'image/png',
    alt: 'OncyTech Main Logo'
  },
  menuItems: [
    { id: '1', label: 'About', url: '/about' },
    { id: '2', label: 'Services', url: '/services' },
    { id: '3', label: 'Products', url: '/products' },
    { id: '4', label: 'Portfolio', url: '/portfolio' },
    { id: '5', label: 'Insights', url: '/insights' },
    { id: '6', label: 'Careers', url: '/careers' },
    { id: '7', label: 'Contact Us', url: '/contact' }
  ],
  footerText: "© 2026 OncyTech. All rights reserved.",
  titleMedia: [
    {
      id: 'tm-1',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400',
      type: 'image/jpeg',
      alt: 'OncyTech Laptop View'
    },
    {
      id: 'tm-2',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400',
      type: 'image/jpeg',
      alt: 'OncyTech Office Space'
    }
  ],
  galleryMedia: [
    { id: 'gm-1', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=300', type: 'image/jpeg', alt: 'Team Meeting' },
    { id: 'gm-2', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&h=300', type: 'image/jpeg', alt: 'Workshop' },
    { id: 'gm-3', url: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=400&h=300', type: 'image/jpeg', alt: 'Discussion' },
    { id: 'gm-4', url: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?auto=format&fit=crop&w=400&h=300', type: 'image/jpeg', alt: 'Conference' },
  ]
};
