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
import { SettingsService } from './settings.service';
import {
  CreateSettingDto,
  UpdateSettingDto,
  QuerySettingDto,
  UpdateSettingsBulkDto,
} from './settings.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a setting' })
  @ApiResponse({ status: 201, description: 'Setting created' })
  @ApiResponse({ status: 409, description: 'Setting key already exists' })
  async create(@Body() dto: CreateSettingDto) {
    return this.settingsService.create(dto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all settings (paginated)' })
  @ApiResponse({ status: 200, description: 'Settings retrieved' })
  async findAll(@Query() query: QuerySettingDto) {
    return this.settingsService.findAll(query);
  }

  @Public()
  @Get('public')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all public settings' })
  @ApiResponse({ status: 200, description: 'Settings retrieved' })
  async getPublicSettings() {
    return this.settingsService.getPublicSettings();
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get setting by ID' })
  @ApiResponse({ status: 200, description: 'Setting found' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  async findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Get('key/:key')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get setting by key' })
  @ApiResponse({ status: 200, description: 'Setting found' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  async findByKey(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update setting' })
  @ApiResponse({ status: 200, description: 'Setting updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateSettingDto) {
    return this.settingsService.update(id, dto);
  }

  @Put('key/:key')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update setting by key' })
  @ApiResponse({ status: 200, description: 'Setting updated' })
  async updateByKey(@Param('key') key: string, @Body('value') value: string) {
    return this.settingsService.updateByKey(key, value);
  }

  @Put('bulk')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Bulk update settings' })
  @ApiResponse({ status: 200, description: 'Settings updated' })
  async updateBulk(@Body() dto: UpdateSettingsBulkDto) {
    return this.settingsService.updateBulk(dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete setting' })
  @ApiResponse({ status: 200, description: 'Setting deleted' })
  async remove(@Param('id') id: string) {
    await this.settingsService.remove(id);
    return { message: 'Setting deleted successfully' };
  }
}
