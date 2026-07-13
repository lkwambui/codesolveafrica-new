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
import { ApplicationsService } from './applications.service';
import {
  CreateJobApplicationDto,
  UpdateJobApplicationDto,
  QueryJobApplicationDto,
} from './applications.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { CurrentUserPayload } from '@common/decorators/current-user.decorator';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a job application' })
  @ApiResponse({ status: 201, description: 'Application submitted' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  async create(
    @Body() dto: CreateJobApplicationDto,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.applicationsService.create(dto, user?.sub);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all applications (paginated)' })
  @ApiResponse({ status: 200, description: 'Applications retrieved' })
  async findAll(@Query() query: QueryJobApplicationDto) {
    return this.applicationsService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiResponse({ status: 200, description: 'Application found' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update application status' })
  @ApiResponse({ status: 200, description: 'Application updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateJobApplicationDto) {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete application' })
  @ApiResponse({ status: 200, description: 'Application deleted' })
  async remove(@Param('id') id: string) {
    await this.applicationsService.remove(id);
    return { message: 'Application deleted successfully' };
  }
}
