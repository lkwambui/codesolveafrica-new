import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto, QueryServiceDto } from './services.dto';
import { parsePagination, buildPaginationMeta, generateSlug } from '@common/utils/helpers';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    const slug = generateSlug(dto.title);

    const service = await this.prisma.service.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        icon: dto.icon,
        image: dto.image,
        price: dto.price,
        duration: dto.duration,
        includes: dto.includes,
        prerequisites: dto.prerequisites,
        learningOutcomes: dto.learningOutcomes,
        status: dto.status || 'ACTIVE',
        sortOrder: dto.sortOrder || 0,
        featured: dto.featured || false,
        categoryId: dto.categoryId,
        metadata: dto.metadata as any,
      },
      include: { category: true },
    });

    this.logger.log(`Service created: ${service.title}`);
    return service;
  }

  async findAll(query: QueryServiceDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.status) where.status = query.status;
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.featured !== undefined) where.featured = query.featured;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { sortOrder: 'asc' },
        include: { category: true },
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!service || service.deletedAt) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!service || service.deletedAt) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async update(id: string, dto: UpdateServiceDto) {
    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service || service.deletedAt) {
      throw new NotFoundException('Service not found');
    }

    const updated = await this.prisma.service.update({
      where: { id },
      data: dto as any,
      include: { category: true },
    });

    return updated;
  }

  async remove(id: string): Promise<void> {
    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service || service.deletedAt) {
      throw new NotFoundException('Service not found');
    }

    await this.prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
