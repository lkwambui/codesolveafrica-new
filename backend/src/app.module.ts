import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/services/services.module';
import { CoursesModule } from './modules/courses/courses.module';
import { BlogModule } from './modules/blog/blog.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { FaqModule } from './modules/faq/faq.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { CareersModule } from './modules/careers/careers.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { MediaModule } from './modules/media/media.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SettingsModule } from './modules/settings/settings.module';
import { PagesModule } from './modules/pages/pages.module';
import { validateEnv } from './config';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL', 60) * 1000,
          limit: config.get<number>('THROTTLE_LIMIT', 100),
        },
      ],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 1000,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    ServicesModule,
    CoursesModule,
    BlogModule,
    PortfolioModule,
    TestimonialsModule,
    FaqModule,
    ContactModule,
    ConsultationModule,
    NewsletterModule,
    CareersModule,
    ApplicationsModule,
    MediaModule,
    DashboardModule,
    SettingsModule,
    PagesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
