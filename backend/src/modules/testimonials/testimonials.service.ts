import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from './testimonials.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';

@Injectable()
export class TestimonialsService {
  private readonly logger = new Logger(TestimonialsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTestimonialDto, authorId?: string) {
    const testimonial = await this.prisma.testimonial.create({
      data: {
        name: dto.name,
        content: dto.content,
        title: dto.title,
        company: dto.company,
        avatar: dto.avatar,
        rating: dto.rating || 5,
        featured: dto.featured || false,
        sortOrder: dto.sortOrder || 0,
        authorId,
        metadata: dto.metadata as any,
      },
    });

    this.logger.log(`Testimonial created from: ${testimonial.name}`);
    return testimonial;
  }

  async findAll(query: QueryTestimonialDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.featured !== undefined) where.featured = query.featured;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { content: { contains: search } },
        { company: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.testimonial.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { sortOrder: 'asc' },
      }),
      this.prisma.testimonial.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial || testimonial.deletedAt) {
      throw new NotFoundException('Testimonial not found');
    }

    return testimonial;
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial || testimonial.deletedAt) {
      throw new NotFoundException('Testimonial not found');
    }

    return this.prisma.testimonial.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: string): Promise<void> {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial || testimonial.deletedAt) {
      throw new NotFoundException('Testimonial not found');
    }

    await this.prisma.testimonial.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
