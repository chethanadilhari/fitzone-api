import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { PrismaService } from '../core/services';
import { MembershipController } from './membership.controller';

@Module({
  controllers: [MembershipController],
  providers: [
    MembershipService,
    PrismaService
  ],
})
export class MembershipModule {}
