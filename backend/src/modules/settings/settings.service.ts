import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  CreateSettingDto,
  UpdateSettingDto,
  QuerySettingDto,
  UpdateSettingsBulkDto,
} from './settings.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSettingDto) {
    const existing = await this.prisma.setting.findUnique({
      where: { key: dto.key },
    });

    if (existing) {
      throw new ConflictException(`Setting with key '${dto.key}' already exists`);
    }

    const setting = await this.prisma.setting.create({ data: dto });

    this.logger.log(`Setting created: ${setting.key}`);
    return setting;
  }

  async findAll(query: QuerySettingDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.group) where.group = query.group;
    if (query.isPublic !== undefined) where.isPublic = query.isPublic;

    if (search) {
      where.OR = [
        { key: { contains: search } },
        { label: { contains: search } },
        { value: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.setting.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { sortOrder: 'asc' },
      }),
      this.prisma.setting.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { id },
    });

    if (!setting || setting.deletedAt) {
      throw new NotFoundException('Setting not found');
    }

    return setting;
  }

  async findByKey(key: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { key },
    });

    if (!setting || setting.deletedAt) {
      throw new NotFoundException(`Setting '${key}' not found`);
    }

    return setting;
  }

  async getPublicSettings() {
    return this.prisma.setting.findMany({
      where: { isPublic: true, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
      select: { key: true, value: true, type: true, label: true, description: true },
    });
  }

  async update(id: string, dto: UpdateSettingDto) {
    const setting = await this.prisma.setting.findUnique({
      where: { id },
    });

    if (!setting || setting.deletedAt) {
      throw new NotFoundException('Setting not found');
    }

    return this.prisma.setting.update({ where: { id }, data: dto });
  }

  async updateByKey(key: string, value: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { key },
    });

    if (!setting || setting.deletedAt) {
      throw new NotFoundException(`Setting '${key}' not found`);
    }

    return this.prisma.setting.update({
      where: { key },
      data: { value },
    });
  }

  async updateBulk(dto: UpdateSettingsBulkDto) {
    const results: Record<string, { key: string; value: string }> = {};

    for (const [key, value] of Object.entries(dto.settings)) {
      try {
        const setting = await this.updateByKey(key, value);
        results[key] = { key, value: setting.value };
      } catch (error) {
        this.logger.warn(`Failed to update setting '${key}': ${(error as Error).message}`);
      }
    }

    return results;
  }

  async remove(id: string): Promise<void> {
    const setting = await this.prisma.setting.findUnique({
      where: { id },
    });

    if (!setting || setting.deletedAt) {
      throw new NotFoundException('Setting not found');
    }

    await this.prisma.setting.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
