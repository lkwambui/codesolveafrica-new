import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateBlogPostDto, UpdateBlogPostDto, QueryBlogPostDto } from './blog.dto';
import { parsePagination, buildPaginationMeta, generateSlug, generateUniqueSlug } from '@common/utils/helpers';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBlogPostDto, authorId?: string) {
    const slug = generateUniqueSlug(dto.title);

    const post = await this.prisma.blogPost.create({
      data: {
        title: dto.title,
        slug,
        content: dto.content,
        excerpt: dto.excerpt,
        coverImage: dto.coverImage,
        readingTime: Math.ceil(dto.content.split(/\s+/).length / 200),
        status: dto.status || 'DRAFT',
        featured: dto.featured || false,
        categoryId: dto.categoryId,
        authorId,
        metadata: dto.metadata as any,
        ...(dto.tagIds && dto.tagIds.length > 0
          ? {
              tags: {
                create: dto.tagIds.map((tagId) => ({ tagId })),
              },
            }
          : {}),
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    this.logger.log(`Blog post created: ${post.title}`);
    return post;
  }

  async findAll(query: QueryBlogPostDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.status) where.status = query.status;
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.featured !== undefined) where.featured = query.featured;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { publishedAt: 'desc' },
        include: {
          category: true,
          tags: { include: { tag: true } },
          author: {
            select: { id: true, firstName: true, lastName: true, avatar: true },
          },
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    if (!post || post.deletedAt) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    if (!post || post.deletedAt) {
      throw new NotFoundException('Blog post not found');
    }

    // Increment view count
    await this.prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    return post;
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });

    if (!post || post.deletedAt) {
      throw new NotFoundException('Blog post not found');
    }

    if (dto.tagIds) {
      await this.prisma.blogPostTag.deleteMany({ where: { postId: id } });
    }

    const updated = await this.prisma.blogPost.update({
      where: { id },
      data: {
        ...dto as any,
        ...(dto.content ? { readingTime: Math.ceil(dto.content.split(/\s+/).length / 200) } : {}),
        ...(dto.tagIds && dto.tagIds.length > 0
          ? {
              tags: {
                create: dto.tagIds.map((tagId) => ({ tagId })),
              },
            }
          : {}),
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    return updated;
  }

  async remove(id: string): Promise<void> {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });

    if (!post || post.deletedAt) {
      throw new NotFoundException('Blog post not found');
    }

    await this.prisma.blogPost.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async publish(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });

    if (!post || post.deletedAt) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.blogPost.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });
  }
}
