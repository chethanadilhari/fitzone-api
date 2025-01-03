import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { MembershipModule } from './membership/membership.module';
import { MembershipGuard } from './core/guards/membership.guard';

@Module({
  imports: [BlogModule, AuthModule, MembershipModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MembershipGuard,
    },
    AppService],
})
export class AppModule {}
