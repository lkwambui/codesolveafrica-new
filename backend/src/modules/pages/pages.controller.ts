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
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto, QueryPageDto } from './pages.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { CurrentUserPayload } from '@common/decorators/current-user.decorator';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a page' })
  @ApiResponse({ status: 201, description: 'Page created' })
  async create(
    @Body() dto: CreatePageDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.pagesService.create(dto, user.sub);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all pages (paginated)' })
  @ApiResponse({ status: 200, description: 'Pages retrieved' })
  async findAll(@Query() query: QueryPageDto) {
    return this.pagesService.findAll(query);
  }

  @Public()
  @Get('homepage')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get homepage' })
  @ApiResponse({ status: 200, description: 'Homepage found' })
  @ApiResponse({ status: 404, description: 'Homepage not configured' })
  async getHomepage() {
    return this.pagesService.getHomepage();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get page by ID' })
  @ApiResponse({ status: 200, description: 'Page found' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Public()
  @Get('slug/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get page by slug' })
  @ApiResponse({ status: 200, description: 'Page found' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update page' })
  @ApiResponse({ status: 200, description: 'Page updated' })
  async update(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.pagesService.update(id, dto);
  }

  @Post(':id/publish')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Publish page' })
  @ApiResponse({ status: 200, description: 'Page published' })
  async publish(@Param('id') id: string) {
    return this.pagesService.publish(id);
  }

  @Post(':id/unpublish')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Unpublish page' })
  @ApiResponse({ status: 200, description: 'Page unpublished' })
  async unpublish(@Param('id') id: string) {
    return this.pagesService.unpublish(id);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete page' })
  @ApiResponse({ status: 200, description: 'Page deleted' })
  async remove(@Param('id') id: string) {
    await this.pagesService.remove(id);
    return { message: 'Page deleted successfully' };
  }
}
