import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/services/prisma.service';


@Injectable()
export class MembershipService {
    constructor(private prismaService: PrismaService) {}

    async getMembership(userId: number) {
        const membership = await this.prismaService.membership.findFirst({
            where: {
                user_id: userId,
            },
        });
        return membership;
    }
}
