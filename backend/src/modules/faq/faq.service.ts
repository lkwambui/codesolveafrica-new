import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  CreateFaqDto,
  UpdateFaqDto,
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
  QueryFaqDto,
} from './faq.dto';
import { parsePagination, buildPaginationMeta, generateSlug } from '@common/utils/helpers';

@Injectable()
export class FaqService {
  private readonly logger = new Logger(FaqService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createCategory(dto: CreateFaqCategoryDto) {
    const slug = generateSlug(dto.name);

    const category = await this.prisma.fAQCategory.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        sortOrder: dto.sortOrder || 0,
      },
    });

    this.logger.log(`FAQ category created: ${category.name}`);
    return category;
  }

  async findAllCategories() {
    return this.prisma.fAQCategory.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { faqs: true } } },
    });
  }

  async updateCategory(id: string, dto: UpdateFaqCategoryDto) {
    const category = await this.prisma.fAQCategory.findUnique({
      where: { id },
    });

    if (!category || category.deletedAt) {
      throw new NotFoundException('FAQ category not found');
    }

    return this.prisma.fAQCategory.update({
      where: { id },
      data: dto,
    });
  }

  async removeCategory(id: string): Promise<void> {
    const category = await this.prisma.fAQCategory.findUnique({
      where: { id },
    });

    if (!category || category.deletedAt) {
      throw new NotFoundException('FAQ category not found');
    }

    await this.prisma.fAQCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async createFaq(dto: CreateFaqDto) {
    const faq = await this.prisma.fAQ.create({
      data: {
        question: dto.question,
        answer: dto.answer,
        sortOrder: dto.sortOrder || 0,
        featured: dto.featured || false,
        categoryId: dto.categoryId,
      },
      include: { category: true },
    });

    this.logger.log(`FAQ created: ${faq.question}`);
    return faq;
  }

  async findAllFaqs(query: QueryFaqDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.featured !== undefined) where.featured = query.featured;

    if (search) {
      where.OR = [
        { question: { contains: search } },
        { answer: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.fAQ.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { sortOrder: 'asc' },
        include: { category: true },
      }),
      this.prisma.fAQ.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOneFaq(id: string) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!faq || faq.deletedAt) {
      throw new NotFoundException('FAQ not found');
    }

    return faq;
  }

  async updateFaq(id: string, dto: UpdateFaqDto) {
    const faq = await this.prisma.fAQ.findUnique({ where: { id } });

    if (!faq || faq.deletedAt) {
      throw new NotFoundException('FAQ not found');
    }

    return this.prisma.fAQ.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async removeFaq(id: string): Promise<void> {
    const faq = await this.prisma.fAQ.findUnique({ where: { id } });

    if (!faq || faq.deletedAt) {
      throw new NotFoundException('FAQ not found');
    }

    await this.prisma.fAQ.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
