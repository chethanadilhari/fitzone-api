import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/services';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    async register(user: RegisterDto) {
        return this.prismaService.user.create({
            data: {
                email: user.email,
                password: user.password,
                f_name: user.firstName,
                l_name: user.lastName,
                gender: user.gender,
                address: user.address,
                phone: user.phone
            }
        });
    }
}
