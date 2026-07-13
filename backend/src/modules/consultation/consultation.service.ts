import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import {
  CreateConsultationDto,
  UpdateConsultationDto,
  QueryConsultationDto,
} from './consultation.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';

@Injectable()
export class ConsultationService {
  private readonly logger = new Logger(ConsultationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateConsultationDto, userId?: string) {
    const consultation = await this.prisma.consultation.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        service: dto.service,
        message: dto.message,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : undefined,
        preferredTime: dto.preferredTime,
        userId,
      },
    });

    this.logger.log(`Consultation booked by: ${consultation.email}`);
    return consultation;
  }

  async findAll(query: QueryConsultationDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.status) where.status = query.status;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.consultation.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation || consultation.deletedAt) {
      throw new NotFoundException('Consultation not found');
    }

    return consultation;
  }

  async update(id: string, dto: UpdateConsultationDto) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation || consultation.deletedAt) {
      throw new NotFoundException('Consultation not found');
    }

    return this.prisma.consultation.update({
      where: { id },
      data: {
        ...dto as any,
        ...(dto.preferredDate
          ? { preferredDate: new Date(dto.preferredDate) }
          : {}),
      },
    });
  }

  async remove(id: string): Promise<void> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation || consultation.deletedAt) {
      throw new NotFoundException('Consultation not found');
    }

    await this.prisma.consultation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
