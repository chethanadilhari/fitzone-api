import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/services/prisma.service';



@Injectable()
export class MembershipService {
    constructor(private prismaService: PrismaService) {}

    async getMembership(userId: number) {
        const membership = await this.prismaService.membership.findFirst({
            where: {
            user_id: userId,
            },
            include: {
            package: true,
            },
        });
        if (!membership) {
            throw new HttpException('Membership not found',HttpStatus.NOT_FOUND);
        }
        return membership;
    }

    async getPackages() {
        return await this.prismaService.package.findMany();
    };

    async subscribe(userId: number, packageId: number) {
        const membership = await this.prismaService.membership.findFirst({
            where: {
                user_id: userId,
                status: 'ACTIVE'
            },
        });
        if (membership) {
            throw new HttpException('Membership already exists',HttpStatus.BAD_REQUEST);
        }
        return await this.prismaService.membership.create({
            data: {
                user_id: userId,
                status: 'ACTIVE',
                package_id: packageId
            },
        });
       
    }

    async cancel(userId: number) {
        const membership = await this.prismaService.membership.findFirst({
            where: {
                user_id: userId,
                // status: 'ACTIVE'
            },
        });
        if (!membership) {
            throw new HttpException('Membership not found',HttpStatus.NOT_FOUND);
        }
        return await this.prismaService.membership.update({
            where: {
                id: membership.id
            },
            include: {
                package: true,
                },
            data: {
                status: 'CANCELLED'
            },
        });
    }

    async getAllMemberships(userId: number) {
        return await this.prismaService.membership.findMany({
            where: {
                user_id: userId
            },
            include: {
                package: true,
            },
        });
    }
}
