import { Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/components/layout/root-layout'
import { Providers } from '@/components/providers/providers'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import Portfolio from '@/pages/Portfolio'
import PortfolioDetail from '@/pages/PortfolioDetail'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Academy from '@/pages/Academy'
import CourseDetail from '@/pages/CourseDetail'
import Careers from '@/pages/Careers'
import CareerDetail from '@/pages/CareerDetail'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Providers>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="academy" element={<Academy />} />
          <Route path="academy/courses/:slug" element={<CourseDetail />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:slug" element={<CareerDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Providers>
  )
}
