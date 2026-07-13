# CodeSolveAfrica — Enterprise Technology Platform

**Engineering Intelligent Digital Solutions for Africa and Beyond**

A production-ready, enterprise-grade full-stack web platform for CodeSolveAfrica — a premier African technology company offering software engineering, AI automation, digital transformation, enterprise systems, UI/UX design, technical consulting, and technology education.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                 │
│  React 19 · TypeScript · Tailwind CSS · shadcn/ui       │
│  Framer Motion · TanStack Query · React Hook Form       │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────┐
│                    Backend (NestJS)                      │
│  TypeScript · Prisma ORM · JWT Auth · RBAC              │
│  Swagger · Rate Limiting · Pino Logger                  │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       MySQL 8       Redis       Cloudinary
      (Primary DB)  (Cache/Auth) (Media)
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | React framework with SSR, streaming, RSC |
| React 19 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui | Accessible React components |
| Framer Motion | Animation library |
| Lucide React | Icon library |
| React Hook Form + Zod | Form validation |
| TanStack Query | Server state management |
| React CountUp | Animated counters |
| Embla Carousel | Lightweight carousel |
| Recharts | Data visualization |
| Sonner | Toast notifications |

### Backend

| Technology | Purpose |
|---|---|
| NestJS 10 | Node.js framework (controllers, services, modules) |
| TypeScript 5 | Type safety |
| Prisma ORM 5 | Database ORM with migrations |
| MySQL 8 | Relational database |
| Redis | Caching, session store |
| JWT + Passport | Authentication |
| bcrypt | Password hashing |
| Cloudinary | Media management |
| Pino | Structured logging |
| Swagger/OpenAPI | API documentation |
| Helmet | Security headers |
| class-validator / class-transformer | DTO validation |
| Throttler | Rate limiting |
| BullMQ + Redis | Queue processing (architecture ready) |

---

## Project Structure

```
codesolveafrica-new/
├── backend/                          # NestJS API server
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema (31 models)
│   │   └── seed.ts                   # Database seed script
│   ├── src/
│   │   ├── main.ts                   # Entry point (Swagger, Helmet, CORS)
│   │   ├── app.module.ts             # Root module
│   │   ├── config/                   # Environment configuration
│   │   ├── prisma/                   # Prisma service
│   │   ├── common/                   # Shared infrastructure
│   │   │   ├── decorators/           # @Roles, @Public, @CurrentUser
│   │   │   ├── filters/              # Global exception filter
│   │   │   ├── guards/               # JWT auth, RBAC guards
│   │   │   ├── interceptors/         # Response transformation, logging
│   │   │   ├── middleware/           # Request logging
│   │   │   ├── pipes/                # Validation pipe
│   │   │   └── utils/                # Helpers (slugify, pagination)
│   │   ├── modules/                  # Feature modules (26 total)
│   │   │   ├── auth/                 # Auth (login, register, refresh, etc.)
│   │   │   ├── users/                # User CRUD
│   │   │   ├── roles/                # Role management
│   │   │   ├── permissions/          # Granular permissions
│   │   │   ├── services/             # Service offerings
│   │   │   ├── courses/              # Academy courses
│   │   │   ├── instructors/          # Course instructors
│   │   │   ├── academy/              # Academy management
│   │   │   ├── students/             # Student enrollments
│   │   │   ├── blog/                 # Blog posts
│   │   │   ├── categories/           # Categories (blog, courses)
│   │   │   ├── portfolio/            # Portfolio projects
│   │   │   ├── testimonials/         # Client testimonials
│   │   │   ├── faq/                  # FAQ management
│   │   │   ├── contact/              # Contact submissions
│   │   │   ├── consultation/         # Consultation bookings
│   │   │   ├── newsletter/           # Newsletter subscribers
│   │   │   ├── careers/              # Job positions
│   │   │   ├── applications/         # Job applications
│   │   │   ├── media/                # Media uploads (Cloudinary)
│   │   │   ├── dashboard/            # Admin dashboard analytics
│   │   │   ├── settings/             # Application settings
│   │   │   ├── pages/                # CMS page management
│   │   │   ├── analytics/            # Analytics data
│   │   │   ├── seo/                  # SEO metadata
│   │   │   └── audit/                # Audit logging
│   │   └── shared/                   # Shared DTOs, interfaces
│   ├── Dockerfile
│   ├── nest-cli.json
│   └── tsconfig.json
│
├── frontend/                         # Next.js client
│   ├── src/
│   │   ├── app/                      # App Router pages (14 pages)
│   │   │   ├── layout.tsx            # Root layout with fonts, metadata
│   │   │   ├── page.tsx              # Homepage (12 sections)
│   │   │   ├── (marketing)/          # Marketing pages
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   └── faq/
│   │   │   ├── services/             # Services listing + [slug]
│   │   │   ├── academy/              # Academy + courses/[slug]
│   │   │   ├── portfolio/            # Portfolio + [slug]
│   │   │   ├── blog/                 # Blog + [slug]
│   │   │   ├── careers/              # Careers + [slug]
│   │   │   ├── not-found.tsx         # 404 page
│   │   │   ├── error.tsx             # Error boundary
│   │   │   ├── loading.tsx           # Loading state
│   │   │   ├── robots.ts             # Robots.txt
│   │   │   └── sitemap.ts            # Sitemap.xml
│   │   ├── components/
│   │   │   ├── ui/                   # 15 reusable UI components
│   │   │   ├── layout/               # Navbar, Footer, MobileNav
│   │   │   ├── home/                 # 12 homepage sections
│   │   │   ├── features/             # 13 feature components + forms
│   │   │   └── providers/            # Query provider, theme provider
│   │   ├── data/                     # 13 data files (services, courses, etc.)
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/                      # Utilities, API client, constants
│   │   └── types/                    # TypeScript interfaces
│   ├── Dockerfile
│   └── next.config.ts
│
├── docker-compose.yml                # MySQL + Redis + Backend + Frontend
├── .env                              # Docker environment variables
└── README.md
```

---

## Features

### Frontend Pages

| Page | Route | Description |
|---|---|---|
| Homepage | `/` | Hero, stats, services, solutions, process, testimonials, blog, CTA |
| Services | `/services` | 15 premium service cards with detail pages |
| Service Detail | `/services/[slug]` | Features, benefits, tech stack, process, CTA |
| Academy | `/academy` | Course listing by category with filtering |
| Course Detail | `/academy/courses/[slug]` | Curriculum, instructor, pricing, enrollment |
| Portfolio | `/portfolio` | Project showcase with filtering |
| Project Detail | `/portfolio/[slug]` | Challenge, solution, results, tech stack |
| Blog | `/blog` | Article listing with categories |
| Blog Post | `/blog/[slug]` | Full article with prev/next navigation |
| Careers | `/careers` | Open positions listing |
| Job Detail | `/careers/[slug]` | Description, requirements, application form |
| About | `/about` | Company story, mission, values, leadership |
| Contact | `/contact` | Contact form + consultation booking + location |
| FAQ | `/faq` | Accordion with search |
| 404 | `/*` | Custom not-found page |

### Backend API Modules

| Module | Endpoints | Description |
|---|---|---|
| Auth | `POST /auth/login`, `/register`, `/refresh`, `/logout`, `/forgot-password`, `/reset-password`, `/change-password`, `/verify-email` | Full authentication with JWT + refresh tokens |
| Users | `GET/POST/PUT/DELETE /users` | User CRUD with role assignment |
| Roles | `.../roles` | Role management |
| Permissions | `.../permissions` | Granular permission system |
| Services | `.../services` | Full CMS for service offerings |
| Courses | `.../courses` | Academy course management |
| Instructors | `.../instructors` | Instructor profiles |
| Blog | `.../blog` | Professional blogging engine |
| Portfolio | `.../portfolio` | Project case studies |
| Testimonials | `.../testimonials` | Client testimonials |
| FAQ | `.../faq` | FAQ with categories |
| Contact | `.../contact` | Contact submission management |
| Consultation | `.../consultations` | Consultation booking with status workflow |
| Newsletter | `.../newsletter` | Subscribe/unsubscribe with verification |
| Careers | `.../careers` | Job positions and departments |
| Applications | `.../applications` | Job application with status workflow |
| Media | `.../media` | Cloudinary upload, delete, optimize |
| Dashboard | `.../dashboard` | Analytics, stats, charts data |
| Settings | `.../settings` | Application-wide settings (public/system) |
| Pages | `.../pages` | CMS page management with sections |

All endpoints support: **pagination · search · sorting · filtering · Swagger docs**

---

## Database Schema (31 Models)

Users, Roles, Permissions, RoleAssignments, Services, ServiceCategories, Courses, CourseCategories, Instructors, Students, BlogPosts, BlogCategories, BlogTags, BlogPostTags, PortfolioProjects, PortfolioImages, Testimonials, FAQs, FAQCategories, ContactSubmissions, Consultations, NewsletterSubscribers, Departments, JobPositions, JobApplications, Media, Pages, PageSections, Settings, AuditLogs, Notifications

All models feature:
- UUID primary keys
- Timestamps (`createdAt`, `updatedAt`)
- Soft deletes (`deletedAt`)
- Proper foreign key relationships
- Database indexes for query performance
- MySQL native column types (`@db.VarChar`, `@db.Text`, `@db.Json`)

---

## Authentication & Authorization

### Authentication
- JWT access tokens (short-lived)
- Refresh tokens (long-lived, httpOnly cookies)
- Password hashing with bcrypt
- Email verification flow
- Forgot/reset password flow
- Session management

### Authorization (RBAC)
**Roles:**
- `SUPER_ADMIN` — Full system access
- `ADMIN` — Administrative access
- `EDITOR` — Content management
- `AUTHOR` — Blog/content creation
- `MODERATOR` — Moderation capabilities
- `USER` — Standard user

**Permissions:** Granular action-based permissions per resource (`create`, `read`, `update`, `delete`, `manage`).

---

## Design System

### Brand Colors

| Token | Hex |
|---|---|
| Deep Navy | `#0F172A` |
| Primary Blue | `#2563EB` |
| Secondary Blue | `#3B82F6` |
| Accent (Cyan) | `#06B6D4` |
| Background | `#FFFFFF` |
| Surface | `#F8FAFC` |
| Border | `#E2E8F0` |
| Primary Text | `#111827` |
| Secondary Text | `#6B7280` |
| Success | `#16A34A` |
| Warning | `#D97706` |
| Danger | `#DC2626` |

### Typography

- **Headings:** Plus Jakarta Sans (weights: 600, 700, 800)
- **Body:** Inter (weights: 400, 500, 600)

### Design Principles
- Clean, minimal, enterprise aesthetic
- 8-point spacing system
- Generous whitespace
- Strong visual hierarchy through typography
- Subtle Framer Motion animations (fade-in, fade-up)
- Light mode only
- Lucide icons (no emojis)
- WCAG AA accessible
- Responsive across all devices

---

## Deployment

### Docker (Production)

```bash
docker-compose up -d
```

This starts:
- **MySQL 8** on port 3306
- **Redis 7** on port 6379
- **Backend** (NestJS) on port 4000
- **Frontend** (Next.js) on port 3000

### Manual Setup

**Prerequisites:**
- Node.js 20+
- MySQL 8
- Redis 7+

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The backend runs at `http://localhost:4000/api/v1` with Swagger docs at `/api/v1/docs`.

The frontend runs at `http://localhost:3000`.

---

## API Documentation

Swagger/OpenAPI documentation is automatically generated and available at:

```
http://localhost:4000/api/v1/docs
```

### Standard Response Format

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## Scripts

### Backend

| Script | Description |
|---|---|
| `npm run start:dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run test` | Jest unit tests |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed database |
| `npm run prisma:studio` | Open Prisma Studio |

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |

---

## Future Architecture Roadmap

The platform is designed to support future expansion without major architectural changes:

- **Student Portal** — Course enrollment, progress tracking
- **Instructor Dashboard** — Course management, analytics
- **Client Portal** — Project tracking, communication
- **Learning Management System** — Video lessons, quizzes, certificates
- **Payments** — M-Pesa, Stripe, Flutterwave integration
- **AI Chatbot** — Customer support automation
- **SaaS Multi-tenancy** — White-label platform offerings
- **Public API** — Third-party developer access
- **Mobile Apps** — React Native / Flutter companion apps

---

## License

Proprietary — CodeSolveAfrica. All rights reserved.

---

<p align="center">Built with ❤️ by CodeSolveAfrica</p>
