import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreatePageDto, UpdatePageDto, QueryPageDto } from './pages.dto';
import { parsePagination, buildPaginationMeta, generateSlug } from '@common/utils/helpers';

@Injectable()
export class PagesService {
  private readonly logger = new Logger(PagesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePageDto, authorId?: string) {
    const slug = generateSlug(dto.title);

    const page = await this.prisma.page.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        content: dto.content as any,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImage: dto.ogImage,
        isPublished: dto.isPublished || false,
        isHomepage: dto.isHomepage || false,
        sortOrder: dto.sortOrder || 0,
        template: dto.template,
        authorId,
        metadata: dto.metadata as any,
        ...(dto.sections && dto.sections.length > 0
          ? {
              sections: {
                create: dto.sections.map((section) => ({
                  type: section.type,
                  title: section.title,
                  content: section.content as any,
                  sortOrder: section.sortOrder || 0,
                  settings: section.settings as any,
                })),
              },
            }
          : {}),
      },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });

    this.logger.log(`Page created: ${page.title}`);
    return page;
  }

  async findAll(query: QueryPageDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.isPublished !== undefined) where.isPublished = query.isPublished;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.page.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { sortOrder: 'asc' },
        include: { sections: { orderBy: { sortOrder: 'asc' } } },
      }),
      this.prisma.page.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!page || page.deletedAt) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!page || page.deletedAt) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async getHomepage() {
    const page = await this.prisma.page.findFirst({
      where: { isHomepage: true, isPublished: true, deletedAt: null },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!page) {
      throw new NotFoundException('Homepage not configured');
    }

    return page;
  }

  async update(id: string, dto: UpdatePageDto) {
    const page = await this.prisma.page.findUnique({ where: { id } });

    if (!page || page.deletedAt) {
      throw new NotFoundException('Page not found');
    }

    if (dto.sections) {
      await this.prisma.pageSection.deleteMany({ where: { pageId: id } });
    }

    const updated = await this.prisma.page.update({
      where: { id },
      data: {
        ...dto as any,
        ...(dto.sections && dto.sections.length > 0
          ? {
              sections: {
                create: dto.sections.map((section) => ({
                  type: section.type,
                  title: section.title,
                  content: section.content as any,
                  sortOrder: section.sortOrder || 0,
                  settings: section.settings as any,
                })),
              },
            }
          : {}),
      },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });

    return updated;
  }

  async publish(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id } });

    if (!page || page.deletedAt) {
      throw new NotFoundException('Page not found');
    }

    return this.prisma.page.update({
      where: { id },
      data: { isPublished: true, publishedAt: new Date() },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async unpublish(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id } });

    if (!page || page.deletedAt) {
      throw new NotFoundException('Page not found');
    }

    return this.prisma.page.update({
      where: { id },
      data: { isPublished: false, publishedAt: null },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async remove(id: string): Promise<void> {
    const page = await this.prisma.page.findUnique({ where: { id } });

    if (!page || page.deletedAt) {
      throw new NotFoundException('Page not found');
    }

    await this.prisma.page.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
