import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateContactSubmissionDto, QueryContactSubmissionDto } from './contact.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactSubmissionDto, userId?: string) {
    const submission = await this.prisma.contactSubmission.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        subject: dto.subject,
        message: dto.message,
        userId,
      },
    });

    this.logger.log(`Contact submission from: ${submission.email}`);
    return submission;
  }

  async findAll(query: QueryContactSubmissionDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.isRead !== undefined) where.isRead = query.isRead;
    if (query.isReplied !== undefined) where.isReplied = query.isReplied;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.contactSubmission.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.contactSubmission.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const submission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission || submission.deletedAt) {
      throw new NotFoundException('Contact submission not found');
    }

    // Mark as read
    if (!submission.isRead) {
      await this.prisma.contactSubmission.update({
        where: { id },
        data: { isRead: true },
      });
    }

    return submission;
  }

  async markAsReplied(id: string) {
    const submission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission || submission.deletedAt) {
      throw new NotFoundException('Contact submission not found');
    }

    return this.prisma.contactSubmission.update({
      where: { id },
      data: { isReplied: true, repliedAt: new Date() },
    });
  }

  async remove(id: string): Promise<void> {
    const submission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission || submission.deletedAt) {
      throw new NotFoundException('Contact submission not found');
    }

    await this.prisma.contactSubmission.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
