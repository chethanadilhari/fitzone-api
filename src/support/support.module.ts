import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { PrismaService } from '../core/services';
import { SupportController } from './support.controller';

@Module({
  controllers: [SupportController],
  providers: [
    SupportService,
    PrismaService
  ],
})
export class SupportModule {}
