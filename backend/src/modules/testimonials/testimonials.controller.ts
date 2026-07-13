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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from './testimonials.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { CurrentUserPayload } from '@common/decorators/current-user.decorator';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a testimonial' })
  @ApiResponse({ status: 201, description: 'Testimonial created' })
  async create(
    @Body() dto: CreateTestimonialDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.testimonialsService.create(dto, user.sub);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all testimonials (paginated)' })
  @ApiResponse({ status: 200, description: 'Testimonials retrieved' })
  async findAll(@Query() query: QueryTestimonialDto) {
    return this.testimonialsService.findAll(query);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get testimonial by ID' })
  @ApiResponse({ status: 200, description: 'Testimonial found' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  async findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial deleted' })
  async remove(@Param('id') id: string) {
    await this.testimonialsService.remove(id);
    return { message: 'Testimonial deleted successfully' };
  }
}
