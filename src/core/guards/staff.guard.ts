import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.session?.userRole;
    return userRole === 'ADMIN' || userRole === 'STAFF'; // Check if userRole is ADMIN or STAFF
  }
}
