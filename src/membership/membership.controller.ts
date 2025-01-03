import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { AuthGuard } from '../core/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  // Add controller methods here
  @Get('current')
  getMembership(@Req() req: any) {
    const userId = req.user.id;
    return this.membershipService.getMembership(userId);
  }
}
