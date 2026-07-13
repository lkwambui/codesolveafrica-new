import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { ConsultationService } from './consultation.service';
import {
  CreateConsultationDto,
  UpdateConsultationDto,
  QueryConsultationDto,
} from './consultation.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { CurrentUserPayload } from '@common/decorators/current-user.decorator';

@ApiTags('Consultation')
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Book a consultation' })
  @ApiResponse({ status: 201, description: 'Consultation booked' })
  async create(
    @Body() dto: CreateConsultationDto,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.consultationService.create(dto, user?.sub);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all consultations (paginated)' })
  @ApiResponse({ status: 200, description: 'Consultations retrieved' })
  async findAll(@Query() query: QueryConsultationDto) {
    return this.consultationService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get consultation by ID' })
  @ApiResponse({ status: 200, description: 'Consultation found' })
  @ApiResponse({ status: 404, description: 'Consultation not found' })
  async findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update consultation status' })
  @ApiResponse({ status: 200, description: 'Consultation updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateConsultationDto) {
    return this.consultationService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete consultation' })
  @ApiResponse({ status: 200, description: 'Consultation deleted' })
  async remove(@Param('id') id: string) {
    await this.consultationService.remove(id);
    return { message: 'Consultation deleted successfully' };
  }
}
