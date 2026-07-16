import { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Custom Software Development",
        href: "/services/custom-software-development",
        description: "Tailored enterprise solutions built for scale",
      },
      {
        label: "Web & Mobile Applications",
        href: "/services/web-mobile-applications",
        description: "Cross-platform apps with exceptional UX",
      },
      {
        label: "Cloud Solutions",
        href: "/services/cloud-solutions",
        description: "Scalable cloud infrastructure and migration",
      },
      {
        label: "AI & Machine Learning",
        href: "/services/ai-machine-learning",
        description: "Intelligent automation and predictive analytics",
      },
      {
        label: "Cybersecurity",
        href: "/services/cybersecurity",
        description: "Enterprise-grade security solutions",
      },
      {
        label: "Data Analytics",
        href: "/services/data-analytics",
        description: "Transform data into actionable insights",
      },
      {
        label: "Enterprise IT Consulting",
        href: "/services/enterprise-it-consulting",
        description: "Strategic technology advisory",
      },
      {
        label: "DevOps & CI/CD",
        href: "/services/devops-cicd",
        description: "Streamlined deployment and operations",
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        description: "Human-centered design for digital products",
      },
      {
        label: "API Development & Integration",
        href: "/services/api-development-integration",
        description: "Seamless system connectivity",
      },
      {
        label: "Digital Transformation",
        href: "/services/digital-transformation",
        description: "End-to-end digital modernization",
      },
      {
        label: "Blockchain Solutions",
        href: "/services/blockchain-solutions",
        description: "Decentralized technology implementations",
      },
      {
        label: "IoT Solutions",
        href: "/services/iot-solutions",
        description: "Connected device ecosystems",
      },
      {
        label: "ERP Systems",
        href: "/services/erp-systems",
        description: "Integrated business management solutions",
      },
      {
        label: "Quality Assurance",
        href: "/services/quality-assurance",
        description: "Comprehensive testing and quality engineering",
      },
      {
        label: "M-Pesa Integration",
        href: "/services/mpesa-integration",
        description: "Seamless mobile money integration",
      },
      {
        label: "eTIMS Integration",
        href: "/services/etims-integration",
        description: "KRA compliance and tax invoicing",
      },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "Academy",
    href: "/academy",
    children: [
      {
        label: "All Courses",
        href: "/academy",
        description: "Browse our full course catalog",
      },
      {
        label: "Software Development",
        href: "/academy?category=software-development",
        description: "Master modern programming and engineering",
      },
      {
        label: "Data Science & AI",
        href: "/academy?category=data-science",
        description: "Specialize in data and artificial intelligence",
      },
      {
        label: "Cloud & DevOps",
        href: "/academy?category=cloud-devops",
        description: "Build expertise in cloud infrastructure",
      },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Our Story",
        href: "/about",
        description: "Learn about our mission and values",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join our team of innovators",
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Frequently asked questions",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
