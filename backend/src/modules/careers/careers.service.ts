import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  CreateJobPositionDto,
  UpdateJobPositionDto,
  QueryJobPositionDto,
} from './careers.dto';
import { parsePagination, buildPaginationMeta, generateSlug } from '@common/utils/helpers';

@Injectable()
export class CareersService {
  private readonly logger = new Logger(CareersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(dto: CreateDepartmentDto) {
    const slug = generateSlug(dto.name);

    const department = await this.prisma.department.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        sortOrder: dto.sortOrder || 0,
      },
    });

    this.logger.log(`Department created: ${department.name}`);
    return department;
  }

  async findAllDepartments() {
    return this.prisma.department.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { positions: true } } },
    });
  }

  async updateDepartment(id: string, dto: UpdateDepartmentDto) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department || department.deletedAt) {
      throw new NotFoundException('Department not found');
    }

    return this.prisma.department.update({ where: { id }, data: dto });
  }

  async removeDepartment(id: string): Promise<void> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department || department.deletedAt) {
      throw new NotFoundException('Department not found');
    }

    await this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async createPosition(dto: CreateJobPositionDto) {
    const slug = generateSlug(dto.title);

    const position = await this.prisma.jobPosition.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        requirements: dto.requirements,
        responsibilities: dto.responsibilities,
        location: dto.location,
        type: dto.type,
        minSalary: dto.minSalary,
        maxSalary: dto.maxSalary,
        currency: dto.currency || 'USD',
        isRemote: dto.isRemote || false,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
        isFeatured: dto.isFeatured || false,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
        departmentId: dto.departmentId,
        metadata: dto.metadata as any,
      },
      include: { department: true },
    });

    this.logger.log(`Job position created: ${position.title}`);
    return position;
  }

  async findAllPositions(query: QueryJobPositionDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.departmentId) where.departmentId = query.departmentId;
    if (query.type) where.type = query.type;
    if (query.isRemote !== undefined) where.isRemote = query.isRemote;
    if (query.isActive !== undefined) where.isActive = query.isActive;
    if (query.isFeatured !== undefined) where.isFeatured = query.isFeatured;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.jobPosition.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
        include: { department: true, _count: { select: { applications: true } } },
      }),
      this.prisma.jobPosition.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOnePosition(id: string) {
    const position = await this.prisma.jobPosition.findUnique({
      where: { id },
      include: { department: true },
    });

    if (!position || position.deletedAt) {
      throw new NotFoundException('Job position not found');
    }

    return position;
  }

  async findBySlug(slug: string) {
    const position = await this.prisma.jobPosition.findUnique({
      where: { slug },
      include: { department: true },
    });

    if (!position || position.deletedAt) {
      throw new NotFoundException('Job position not found');
    }

    return position;
  }

  async updatePosition(id: string, dto: UpdateJobPositionDto) {
    const position = await this.prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!position || position.deletedAt) {
      throw new NotFoundException('Job position not found');
    }

    return this.prisma.jobPosition.update({
      where: { id },
      data: {
        ...dto as any,
        ...(dto.expiresAt ? { expiresAt: new Date(dto.expiresAt) } : {}),
      },
      include: { department: true },
    });
  }

  async removePosition(id: string): Promise<void> {
    const position = await this.prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!position || position.deletedAt) {
      throw new NotFoundException('Job position not found');
    }

    await this.prisma.jobPosition.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
