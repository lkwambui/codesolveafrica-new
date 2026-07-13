import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import {
  CreateJobApplicationDto,
  UpdateJobApplicationDto,
  QueryJobApplicationDto,
} from './applications.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateJobApplicationDto, userId?: string) {
    const position = await this.prisma.jobPosition.findUnique({
      where: { id: dto.positionId },
    });

    if (!position || position.deletedAt) {
      throw new NotFoundException('Job position not found');
    }

    const application = await this.prisma.jobApplication.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        resume: dto.resume,
        coverLetter: dto.coverLetter,
        portfolio: dto.portfolio,
        linkedIn: dto.linkedIn,
        source: dto.source,
        positionId: dto.positionId,
        userId,
        metadata: dto.metadata as any,
      },
      include: { position: { include: { department: true } } },
    });

    this.logger.log(`Job application from: ${application.email}`);
    return application;
  }

  async findAll(query: QueryJobApplicationDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.status) where.status = query.status;
    if (query.positionId) where.positionId = query.positionId;

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.jobApplication.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
        include: { position: { include: { department: true } } },
      }),
      this.prisma.jobApplication.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: { position: { include: { department: true } } },
    });

    if (!application || application.deletedAt) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async update(id: string, dto: UpdateJobApplicationDto) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!application || application.deletedAt) {
      throw new NotFoundException('Application not found');
    }

    return this.prisma.jobApplication.update({
      where: { id },
      data: dto as any,
      include: { position: { include: { department: true } } },
    });
  }

  async remove(id: string): Promise<void> {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!application || application.deletedAt) {
      throw new NotFoundException('Application not found');
    }

    await this.prisma.jobApplication.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
