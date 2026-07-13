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
import { CareersService } from './careers.service';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  CreateJobPositionDto,
  UpdateJobPositionDto,
  QueryJobPositionDto,
} from './careers.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post('departments')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a department' })
  @ApiResponse({ status: 201, description: 'Department created' })
  async createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.careersService.createDepartment(dto);
  }

  @Public()
  @Get('departments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'Departments retrieved' })
  async findAllDepartments() {
    return this.careersService.findAllDepartments();
  }

  @Put('departments/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update department' })
  async updateDepartment(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.careersService.updateDepartment(id, dto);
  }

  @Delete('departments/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete department' })
  async removeDepartment(@Param('id') id: string) {
    await this.careersService.removeDepartment(id);
    return { message: 'Department deleted successfully' };
  }

  @Post('positions')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a job position' })
  @ApiResponse({ status: 201, description: 'Position created' })
  async createPosition(@Body() dto: CreateJobPositionDto) {
    return this.careersService.createPosition(dto);
  }

  @Public()
  @Get('positions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all job positions (paginated)' })
  @ApiResponse({ status: 200, description: 'Positions retrieved' })
  async findAllPositions(@Query() query: QueryJobPositionDto) {
    return this.careersService.findAllPositions(query);
  }

  @Public()
  @Get('positions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get job position by ID' })
  @ApiResponse({ status: 200, description: 'Position found' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  async findOnePosition(@Param('id') id: string) {
    return this.careersService.findOnePosition(id);
  }

  @Public()
  @Get('positions/slug/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get position by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.careersService.findBySlug(slug);
  }

  @Put('positions/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update job position' })
  @ApiResponse({ status: 200, description: 'Position updated' })
  async updatePosition(@Param('id') id: string, @Body() dto: UpdateJobPositionDto) {
    return this.careersService.updatePosition(id, dto);
  }

  @Delete('positions/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete job position' })
  @ApiResponse({ status: 200, description: 'Position deleted' })
  async removePosition(@Param('id') id: string) {
    await this.careersService.removePosition(id);
    return { message: 'Position deleted successfully' };
  }
}
