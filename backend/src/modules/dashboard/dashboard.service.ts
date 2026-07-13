import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers,
      newUsers,
      totalServices,
      totalCourses,
      publishedCourses,
      totalBlogPosts,
      publishedBlogPosts,
      totalPortfolio,
      totalContactSubmissions,
      unreadContactSubmissions,
      totalConsultations,
      pendingConsultations,
      totalNewsletterSubscribers,
      activeNewsletterSubscribers,
      totalJobPositions,
      activeJobPositions,
      totalApplications,
      pendingApplications,
      totalTestimonials,
      recentUsers,
      recentContacts,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.user.count({ where: { isActive: true, deletedAt: null } }),
      this.prisma.user.count({
        where: { deletedAt: null, createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.service.count({ where: { deletedAt: null } }),
      this.prisma.course.count({ where: { deletedAt: null } }),
      this.prisma.course.count({
        where: { status: 'PUBLISHED', deletedAt: null },
      }),
      this.prisma.blogPost.count({ where: { deletedAt: null } }),
      this.prisma.blogPost.count({
        where: { status: 'PUBLISHED', deletedAt: null },
      }),
      this.prisma.portfolioProject.count({ where: { deletedAt: null } }),
      this.prisma.contactSubmission.count({ where: { deletedAt: null } }),
      this.prisma.contactSubmission.count({
        where: { isRead: false, deletedAt: null },
      }),
      this.prisma.consultation.count({ where: { deletedAt: null } }),
      this.prisma.consultation.count({
        where: { status: 'PENDING', deletedAt: null },
      }),
      this.prisma.newsletterSubscriber.count({ where: { deletedAt: null } }),
      this.prisma.newsletterSubscriber.count({
        where: { isActive: true, deletedAt: null },
      }),
      this.prisma.jobPosition.count({ where: { deletedAt: null } }),
      this.prisma.jobPosition.count({
        where: { isActive: true, deletedAt: null },
      }),
      this.prisma.jobApplication.count({ where: { deletedAt: null } }),
      this.prisma.jobApplication.count({
        where: { status: 'PENDING', deletedAt: null },
      }),
      this.prisma.testimonial.count({ where: { deletedAt: null } }),
      this.prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      this.prisma.contactSubmission.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          isRead: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        newLast30Days: newUsers,
      },
      content: {
        services: totalServices,
        courses: { total: totalCourses, published: publishedCourses },
        blogPosts: { total: totalBlogPosts, published: publishedBlogPosts },
        portfolioProjects: totalPortfolio,
        testimonials: totalTestimonials,
      },
      communications: {
        contactSubmissions: {
          total: totalContactSubmissions,
          unread: unreadContactSubmissions,
        },
        consultations: {
          total: totalConsultations,
          pending: pendingConsultations,
        },
        newsletterSubscribers: {
          total: totalNewsletterSubscribers,
          active: activeNewsletterSubscribers,
        },
      },
      careers: {
        jobPositions: { total: totalJobPositions, active: activeJobPositions },
        applications: { total: totalApplications, pending: pendingApplications },
      },
      recent: {
        users: recentUsers,
        contacts: recentContacts,
      },
    };
  }

  async getUserGrowth(days: number = 30) {
    const data: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const startOfDay = new Date();
      startOfDay.setDate(startOfDay.getDate() - i);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const count = await this.prisma.user.count({
        where: {
          createdAt: { gte: startOfDay, lte: endOfDay },
          deletedAt: null,
        },
      });

      data.push({
        date: startOfDay.toISOString().split('T')[0],
        count,
      });
    }

    return data;
  }

  async getContentByCategory() {
    const servicesByCategory = await this.prisma.service.groupBy({
      by: ['categoryId'],
      _count: true,
      where: { deletedAt: null },
    });

    const coursesByCategory = await this.prisma.course.groupBy({
      by: ['categoryId'],
      _count: true,
      where: { deletedAt: null },
    });

    return {
      servicesByCategory,
      coursesByCategory,
    };
  }
}
