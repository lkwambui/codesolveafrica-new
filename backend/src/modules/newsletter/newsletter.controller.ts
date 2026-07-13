import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { NewsletterService } from './newsletter.service';
import { SubscribeNewsletterDto, QueryNewsletterSubscriberDto } from './newsletter.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Public()
  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  @ApiResponse({ status: 201, description: 'Subscribed successfully' })
  @ApiResponse({ status: 409, description: 'Already subscribed' })
  async subscribe(@Body() dto: SubscribeNewsletterDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Public()
  @Post('unsubscribe/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unsubscribe from newsletter' })
  @ApiResponse({ status: 200, description: 'Unsubscribed successfully' })
  @ApiResponse({ status: 404, description: 'Subscriber not found' })
  async unsubscribe(@Param('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all subscribers (paginated)' })
  @ApiResponse({ status: 200, description: 'Subscribers retrieved' })
  async findAll(@Query() query: QueryNewsletterSubscriberDto) {
    return this.newsletterService.findAll(query);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete subscriber' })
  @ApiResponse({ status: 200, description: 'Subscriber deleted' })
  async remove(@Param('id') id: string) {
    await this.newsletterService.remove(id);
    return { message: 'Subscriber deleted successfully' };
  }
}
