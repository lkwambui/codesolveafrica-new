import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { SubscribeNewsletterDto, QueryNewsletterSubscriberDto } from './newsletter.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(private readonly prisma: PrismaService) {}

  async subscribe(dto: SubscribeNewsletterDto) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: dto.email },
    });

    if (existing && existing.isActive) {
      throw new ConflictException('Email already subscribed');
    }

    if (existing && !existing.isActive) {
      const subscriber = await this.prisma.newsletterSubscriber.update({
        where: { email: dto.email },
        data: {
          isActive: true,
          name: dto.name || existing.name,
          unsubscribedAt: null,
          subscribedAt: new Date(),
        },
      });

      this.logger.log(`Newsletter subscriber re-activated: ${subscriber.email}`);
      return subscriber;
    }

    const subscriber = await this.prisma.newsletterSubscriber.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });

    this.logger.log(`Newsletter subscriber: ${subscriber.email}`);
    return subscriber;
  }

  async findAll(query: QueryNewsletterSubscriberDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.isActive !== undefined) where.isActive = query.isActive;

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.newsletterSubscriber.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async unsubscribe(email: string) {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    await this.prisma.newsletterSubscriber.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

    this.logger.log(`Newsletter unsubscribed: ${email}`);
    return { message: 'Unsubscribed successfully' };
  }

  async remove(id: string): Promise<void> {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { id },
    });

    if (!subscriber || subscriber.deletedAt) {
      throw new NotFoundException('Subscriber not found');
    }

    await this.prisma.newsletterSubscriber.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
