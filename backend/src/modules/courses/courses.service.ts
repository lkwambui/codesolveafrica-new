import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './courses.dto';
import { parsePagination, buildPaginationMeta, generateSlug } from '@common/utils/helpers';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCourseDto) {
    const slug = generateSlug(dto.title);

    const course = await this.prisma.course.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        shortDescription: dto.shortDescription,
        thumbnail: dto.thumbnail,
        price: dto.price,
        duration: dto.duration,
        durationHours: dto.durationHours,
        level: dto.level || 'BEGINNER',
        status: dto.status || 'DRAFT',
        syllabus: dto.syllabus as any,
        prerequisites: dto.prerequisites,
        learningOutcomes: dto.learningOutcomes,
        requirements: dto.requirements,
        featured: dto.featured || false,
        categoryId: dto.categoryId,
        instructorId: dto.instructorId,
        metadata: dto.metadata as any,
      },
      include: { category: true, instructor: true },
    });

    this.logger.log(`Course created: ${course.title}`);
    return course;
  }

  async findAll(query: QueryCourseDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.status) where.status = query.status;
    if (query.level) where.level = query.level;
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.instructorId) where.instructorId = query.instructorId;
    if (query.featured !== undefined) where.featured = query.featured;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
        include: { category: true, instructor: true },
      }),
      this.prisma.course.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { category: true, instructor: true },
    });

    if (!course || course.deletedAt) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async findBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: { category: true, instructor: true },
    });

    if (!course || course.deletedAt) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course || course.deletedAt) {
      throw new NotFoundException('Course not found');
    }

    const updated = await this.prisma.course.update({
      where: { id },
      data: dto as any,
      include: { category: true, instructor: true },
    });

    return updated;
  }

  async remove(id: string): Promise<void> {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course || course.deletedAt) {
      throw new NotFoundException('Course not found');
    }

    await this.prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
