export const COMPANY = {
  name: "CodeSolveAfrica",
  tagline: "Enterprise Technology, African Innovation",
  description:
    "We build world-class enterprise software solutions that drive digital transformation across Africa and beyond.",
  email: "hello@codesolveafrica.com",
  phone: "+254 700 123 456",
  address: "Nairobi, Kenya",
  socials: {
    linkedin: "https://linkedin.com/company/codesolveafrica",
    twitter: "https://twitter.com/codesolveafrica",
    github: "https://github.com/codesolveafrica",
    youtube: "https://youtube.com/@codesolveafrica",
  },
} as const;

export const ROUTES = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  academy: "/academy",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  faq: "/faq",
} as const;

export const SITE_CONFIG = {
  title: "CodeSolveAfrica - Enterprise Software Solutions",
  description:
    "Premier enterprise technology company building world-class software solutions. Custom development, cloud, AI, cybersecurity, and digital transformation services.",
  url: "https://codesolveafrica.com",
  ogImage: "/og-image.jpg",
} as const;
