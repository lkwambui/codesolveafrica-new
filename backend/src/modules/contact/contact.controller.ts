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
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto, QueryContactSubmissionDto } from './contact.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { CurrentUserPayload } from '@common/decorators/current-user.decorator';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a contact form' })
  @ApiResponse({ status: 201, description: 'Submission created' })
  async create(
    @Body() dto: CreateContactSubmissionDto,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.contactService.create(dto, user?.sub);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all contact submissions (paginated)' })
  @ApiResponse({ status: 200, description: 'Submissions retrieved' })
  async findAll(@Query() query: QueryContactSubmissionDto) {
    return this.contactService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get contact submission by ID' })
  @ApiResponse({ status: 200, description: 'Submission found' })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  async findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Post(':id/replied')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mark contact submission as replied' })
  @ApiResponse({ status: 200, description: 'Marked as replied' })
  async markAsReplied(@Param('id') id: string) {
    return this.contactService.markAsReplied(id);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete contact submission' })
  @ApiResponse({ status: 200, description: 'Submission deleted' })
  async remove(@Param('id') id: string) {
    await this.contactService.remove(id);
    return { message: 'Submission deleted successfully' };
  }
}
