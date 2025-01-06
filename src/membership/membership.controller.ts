import { Controller, Get, UseGuards, Req, Post, Body, Patch } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { SubscribeDto } from './dto/subscribe.dto';
import { get } from 'http';

@UseGuards(AuthGuard)
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  // Add controller methods here
  @Get('current')
  getMembership(@Req() req: any) {
    const userId = req.session.userId;
    return this.membershipService.getMembership(userId);
  }

  @Get('packages')
  async getPackages() {
    return await this.membershipService.getPackages();
  }

  @Post('subscribe')
  async subscribe(@Req() req: any,@Body() body: SubscribeDto) {
    const userId = req.session.userId;
    const { packageId } = body;
    return await this.membershipService.subscribe(userId, packageId);
  }

  @Post ('cancel')
  async cancel(@Req() req: any) {
    const userId = req.session.userId;
    return await this.membershipService.cancel(userId);

  
   
  }
}
