import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  CreatePortfolioProjectDto,
  UpdatePortfolioProjectDto,
  QueryPortfolioProjectDto,
} from './portfolio.dto';
import { parsePagination, buildPaginationMeta, generateSlug } from '@common/utils/helpers';

@Injectable()
export class PortfolioService {
  private readonly logger = new Logger(PortfolioService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePortfolioProjectDto, authorId?: string) {
    const slug = generateSlug(dto.title);

    const project = await this.prisma.portfolioProject.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        client: dto.client,
        clientUrl: dto.clientUrl,
        projectUrl: dto.projectUrl,
        technologies: dto.technologies,
        category: dto.category,
        thumbnail: dto.thumbnail,
        featured: dto.featured || false,
        sortOrder: dto.sortOrder || 0,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        authorId,
        metadata: dto.metadata as any,
        ...(dto.images && dto.images.length > 0
          ? {
              images: {
                create: dto.images.map((img) => ({
                  url: img.url,
                  alt: img.alt,
                  sortOrder: img.sortOrder || 0,
                })),
              },
            }
          : {}),
      },
      include: { images: true },
    });

    this.logger.log(`Portfolio project created: ${project.title}`);
    return project;
  }

  async findAll(query: QueryPortfolioProjectDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.category) where.category = query.category;
    if (query.featured !== undefined) where.featured = query.featured;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.portfolioProject.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { sortOrder: 'asc' },
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      }),
      this.prisma.portfolioProject.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!project || project.deletedAt) {
      throw new NotFoundException('Portfolio project not found');
    }

    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { slug },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!project || project.deletedAt) {
      throw new NotFoundException('Portfolio project not found');
    }

    return project;
  }

  async update(id: string, dto: UpdatePortfolioProjectDto) {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { id },
    });

    if (!project || project.deletedAt) {
      throw new NotFoundException('Portfolio project not found');
    }

    if (dto.images) {
      await this.prisma.portfolioImage.deleteMany({ where: { projectId: id } });
    }

    const updated = await this.prisma.portfolioProject.update({
      where: { id },
      data: {
        ...dto as any,
        ...(dto.startDate ? { startDate: new Date(dto.startDate) } : {}),
        ...(dto.endDate ? { endDate: new Date(dto.endDate) } : {}),
        ...(dto.images && dto.images.length > 0
          ? {
              images: {
                create: dto.images.map((img) => ({
                  url: img.url,
                  alt: img.alt,
                  sortOrder: img.sortOrder || 0,
                })),
              },
            }
          : {}),
      },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });

    return updated;
  }

  async remove(id: string): Promise<void> {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { id },
    });

    if (!project || project.deletedAt) {
      throw new NotFoundException('Portfolio project not found');
    }

    await this.prisma.portfolioProject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
