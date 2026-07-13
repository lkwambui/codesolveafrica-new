import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Connected to database');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Disconnected from database');
  }

  async softDelete<T>(model: string, id: string): Promise<T> {
    return (this as any)[model].update({
      where: { id },
      data: { deletedAt: new Date() },
    }) as Promise<T>;
  }

  async softDeleteMany<T>(model: string, ids: string[]): Promise<T> {
    return (this as any)[model].updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date() },
    }) as Promise<T>;
  }

  async restore<T>(model: string, id: string): Promise<T> {
    return (this as any)[model].update({
      where: { id },
      data: { deletedAt: null },
    }) as Promise<T>;
  }

  private getModelName(model: string): string {
    return model.charAt(0).toLowerCase() + model.slice(1);
  }
}
