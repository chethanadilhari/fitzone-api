import { Module, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './core/guards/auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/services/prisma.service';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { MembershipModule } from './membership/membership.module';
import { MembershipGuard } from './core/guards/membership.guard';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [BlogModule, AuthModule, MembershipModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: 'AuthGuard',
      useClass: AuthGuard,
    },
    {
      provide: 'MembershipGuard',
      useClass: MembershipGuard,
    },
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
