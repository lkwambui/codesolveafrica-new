import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@database/prisma.service';
import { QueryMediaDto } from './media.dto';
import { parsePagination, buildPaginationMeta } from '@common/utils/helpers';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
    }
  }

  async upload(
    file: Express.Multer.File,
    uploadedById?: string,
    folder?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    let cloudinaryResult: { url: string; publicId: string; width?: number; height?: number } | null = null;

    if (this.configService.get<string>('CLOUDINARY_CLOUD_NAME')) {
      try {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataUri = `data:${file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: folder || 'codesolveafrica',
          resource_type: 'auto',
        });

        cloudinaryResult = {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        };
      } catch (error) {
        this.logger.error(`Cloudinary upload failed: ${(error as Error).message}`);
      }
    }

    const media = await this.prisma.media.create({
      data: {
        filename: file.originalname,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: cloudinaryResult?.url || '',
        publicId: cloudinaryResult?.publicId || null,
        type: this.getMediaType(file.mimetype) as any,
        width: cloudinaryResult?.width || null,
        height: cloudinaryResult?.height || null,
        folder: folder || null,
        uploadedById,
      },
    });

    this.logger.log(`Media uploaded: ${media.originalName}`);
    return media;
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    uploadedById?: string,
    folder?: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploads = await Promise.all(
      files.map((file) => this.upload(file, uploadedById, folder)),
    );

    return uploads;
  }

  async findAll(query: QueryMediaDto) {
    const { skip, take, search, orderBy } = parsePagination(query);

    const where: Record<string, unknown> = { deletedAt: null };

    if (query.type) where.type = query.type;
    if (query.folder) where.folder = query.folder;
    if (query.mimeType) where.mimeType = query.mimeType;

    if (search) {
      where.OR = [
        { originalName: { contains: search } },
        { filename: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, query.page || 1, query.limit || 10),
    };
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media || media.deletedAt) {
      throw new NotFoundException('Media not found');
    }

    return media;
  }

  async remove(id: string): Promise<void> {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media || media.deletedAt) {
      throw new NotFoundException('Media not found');
    }

    if (media.publicId && this.configService.get<string>('CLOUDINARY_CLOUD_NAME')) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (error) {
        this.logger.error(`Cloudinary delete failed: ${(error as Error).message}`);
      }
    }

    await this.prisma.media.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async removeMultiple(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.remove(id)));
  }

  private getMediaType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'IMAGE';
    if (mimeType.startsWith('video/')) return 'VIDEO';
    if (mimeType.startsWith('audio/')) return 'AUDIO';
    if (
      mimeType === 'application/pdf' ||
      mimeType.startsWith('application/msword') ||
      mimeType.startsWith('application/vnd')
    ) {
      return 'DOCUMENT';
    }
    return 'OTHER';
  }
}
