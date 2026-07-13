export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  features: string[];
  techStack: string[];
  process: { step: number; title: string; description: string }[];
  caseStudies: { title: string; description: string }[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  currency: string;
  curriculum: { module: number; title: string; topics: string[] }[];
  instructor: { name: string; role: string; bio: string };
  learningOutcomes: string[];
  prerequisites: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  technologies: string[];
  testimonial?: { quote: string; author: string; role: string };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; role: string; avatar: string };
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
}

export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  salary: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { linkedin?: string; twitter?: string; github?: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface EnterpriseSolution {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
}

export interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  portfolio?: string;
  coverLetter: string;
  resume: FileList;
}
