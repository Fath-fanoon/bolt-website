export const company = {
  name: 'Infonet Technologies',
  tagline: 'Technology that moves your business forward.',
  email: 'info@infonettechnologies.com',
  phone: '+971 4 123 4567',
  address: 'Dubai, United Arab Emirates',
  hours: 'Sun – Thu, 9:00 AM – 6:00 PM',
};

export const solutions = [
  {
    id: 'business-software',
    title: 'Business Software',
    icon: 'LayoutGrid',
    description: 'Comprehensive software suites tailored to streamline operations, manage finances, and drive growth across every department.',
  },
  {
    id: 'erp',
    title: 'ERP',
    icon: 'Boxes',
    description: 'Enterprise resource planning systems that unify your business processes — from procurement to production to delivery.',
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    icon: 'Code2',
    description: 'Bespoke software built from the ground up to match your exact operational requirements and industry workflows.',
  },
  {
    id: 'web',
    title: 'Web',
    icon: 'Globe',
    description: 'High-performance websites and web applications engineered for speed, scalability, and conversion.',
  },
  {
    id: 'mobile',
    title: 'Mobile',
    icon: 'Smartphone',
    description: 'Native and cross-platform mobile apps that put your business in your customers\' pockets.',
  },
  {
    id: 'it-infrastructure',
    title: 'IT Infrastructure',
    icon: 'Server',
    description: 'Robust IT foundations — servers, storage, virtualization, and cloud architecture designed for reliability.',
  },
  {
    id: 'networking',
    title: 'Networking',
    icon: 'Network',
    description: 'Network design, installation, and management ensuring seamless connectivity across your entire organization.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: 'ShieldCheck',
    description: 'Multi-layered security strategies protecting your data, systems, and operations from evolving threats.',
  },
  {
    id: 'cctv',
    title: 'CCTV',
    icon: 'Cctv',
    description: 'Advanced surveillance systems with remote monitoring, intelligent analytics, and centralized management.',
  },
  {
    id: 'pos',
    title: 'POS',
    icon: 'CreditCard',
    description: 'Point-of-sale systems that integrate sales, inventory, and customer data into one seamless workflow.',
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    icon: 'Workflow',
    description: 'Intelligent automation that eliminates repetitive tasks, reduces errors, and accelerates throughput.',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    icon: 'Calculator',
    description: 'Automated payroll management handling calculations, compliance, and reporting with precision.',
  },
  {
    id: 'it-support',
    title: 'IT Support',
    icon: 'Headset',
    description: 'Responsive technical support and managed IT services keeping your systems running without interruption.',
  },
];

export const products = [
  {
    id: 'erp',
    name: 'Infonet ERP',
    category: 'Enterprise Resource Planning',
    description: 'A complete ERP platform integrating finance, inventory, sales, procurement, and HR into a single unified system. Real-time dashboards, automated workflows, and comprehensive reporting give you total visibility across your operation.',
    features: ['Financial Management', 'Inventory Control', 'Procurement', 'Sales & CRM', 'HR & Payroll', 'Real-time Reporting'],
    accent: '#E60000',
  },
  {
    id: 'retail',
    name: 'Infonet Retail',
    category: 'Retail Management',
    description: 'Omnichannel retail management software designed for modern stores. Handle sales, stock, customer loyalty, and supplier relationships from one intuitive interface with barcode integration and real-time sync.',
    features: ['Point of Sale', 'Stock Management', 'Customer Loyalty', 'Supplier Management', 'Barcode Integration', 'Multi-Store Sync'],
    accent: '#FF3838',
  },
  {
    id: 'restaurant',
    name: 'Infonet Restaurant',
    category: 'Restaurant Management',
    description: 'A full restaurant management system covering table orders, kitchen display, menu engineering, and inventory. Built for speed of service with integrated POS, staff management, and real-time sales analytics.',
    features: ['Table Management', 'Kitchen Display', 'Menu Engineering', 'POS Integration', 'Staff Scheduling', 'Sales Analytics'],
    accent: '#FFB84D',
  },
  {
    id: 'healthcare',
    name: 'Infonet Healthcare',
    category: 'Healthcare Management',
    description: 'Healthcare management software for clinics and medical facilities. Patient records, appointment scheduling, billing, and electronic prescriptions in a HIPAA-compliant, secure environment built for medical professionals.',
    features: ['Patient Records', 'Appointment Scheduling', 'Medical Billing', 'E-Prescriptions', 'Lab Integration', 'Compliance & Security'],
    accent: '#FF8A8A',
  },
  {
    id: 'business-mgmt',
    name: 'Infonet Business Management',
    category: 'Business Management Suite',
    description: 'An all-in-one business management suite combining project management, document control, task tracking, and team collaboration. Designed to unify operations for growing businesses across every department.',
    features: ['Project Management', 'Document Control', 'Task Tracking', 'Team Collaboration', 'Workflow Automation', 'Performance Analytics'],
    accent: '#FF5C5C',
  },
];

export const industries = [
  { name: 'RETAIL', description: 'Omnichannel POS, inventory, and customer engagement systems for retail chains and independent stores.' },
  { name: 'RESTAURANTS', description: 'End-to-end restaurant management from table orders to kitchen display and staff scheduling.' },
  { name: 'HEALTHCARE', description: 'Secure patient management, electronic records, and medical billing for clinics and facilities.' },
  { name: 'ENTERPRISE', description: 'Scalable ERP and infrastructure solutions for large-scale enterprise operations and multi-site management.' },
  { name: 'CONSTRUCTION', description: 'Project tracking, procurement, and resource management built for the construction industry.' },
];

export const securityNodes = [
  { id: 'network', label: 'NETWORK', icon: 'Network', description: 'Designed, installed, and managed network infrastructure ensuring seamless connectivity across your organization.' },
  { id: 'server', label: 'SERVER', icon: 'Server', description: 'Enterprise-grade server architecture with virtualization, storage, and cloud integration for maximum uptime.' },
  { id: 'firewall', label: 'FIREWALL', icon: 'ShieldCheck', description: 'Advanced firewall protection with intrusion detection and prevention, filtering traffic at every layer.' },
  { id: 'vpn', label: 'VPN', icon: 'Lock', description: 'Secure encrypted VPN tunnels connecting remote offices and field workers to your central infrastructure.' },
  { id: 'cctv', label: 'CCTV', icon: 'Cctv', description: 'IP surveillance systems with remote monitoring, intelligent analytics, and centralized video management.' },
  { id: 'security', label: 'SECURITY', icon: 'ShieldAlert', description: 'Multi-layered cybersecurity strategies protecting data, systems, and operations from evolving threats.' },
  { id: 'support', label: 'SUPPORT', icon: 'Headset', description: 'Responsive IT support and managed services keeping your infrastructure secure and operational.' },
];

export const processSteps = [
  { number: '01', title: 'Understand', description: 'We dive deep into your business, mapping your workflows, pain points, and goals to build a complete picture of what you need.' },
  { number: '02', title: 'Plan', description: 'A detailed roadmap is crafted — architecture, timelines, resources, and milestones — aligned to your operational reality.' },
  { number: '03', title: 'Build', description: 'Our engineers develop your solution with rigorous standards, iterative reviews, and continuous integration at every stage.' },
  { number: '04', title: 'Deploy', description: 'We roll out your solution with minimal disruption — testing, migration, training, and go-live support included.' },
  { number: '05', title: 'Support', description: 'Ongoing maintenance, updates, and responsive IT support ensure your systems perform long after deployment.' },
];

export const testimonials = [
  {
    quote: 'Infonet Technologies transformed our entire retail operation. Their ERP system unified six stores into one dashboard. We cut inventory discrepancies by 80% in the first quarter.',
    author: 'Omar Al Rashid',
    role: 'Operations Director',
    company: 'Al Rashid Retail Group',
  },
  {
    quote: 'The restaurant management system paid for itself in three months. Order speed doubled, and the kitchen display eliminated ticket errors entirely. Best technology investment we have made.',
    author: 'Sarah Chen',
    role: 'Owner',
    company: 'Saffron Hospitality',
  },
  {
    quote: 'Their IT infrastructure team rebuilt our network from the ground up. We went from weekly outages to 99.9% uptime. Their support team responds within minutes, not hours.',
    author: 'Khalid Mansoor',
    role: 'IT Manager',
    company: 'Gulf Medical Center',
  },
];

export const stats = [
  { value: '50+', label: 'Enterprise Clients' },
  { value: '15+', label: 'Years of Experience' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '24/7', label: 'Support Coverage' },
];

export const navLinks = [
  { label: 'About', target: 'company' },
  { label: 'Solutions', target: 'solutions' },
  { label: 'Products', target: 'products' },
  { label: 'Industries', target: 'industries' },
  { label: 'IT & Security', target: 'security' },
  { label: 'Why Infonet', target: 'why' },
  { label: 'Contact', target: 'contact' },
];
