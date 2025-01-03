import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session?.userId;

    const membership = this.prismaService.membership.findFirst({
      where: {
        user_id:userId,
        status: 'ACTIVE',
      },
    });
    if (!membership) {
      return false;
    }
    return true;
  }
}
