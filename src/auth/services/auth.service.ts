import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/services';
import { RegisterDto } from '../dto/register.dto';
import { loginDto } from '../dto/login.dto';
import { PasswordService } from './password.service';


@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private passwordService:PasswordService) { }
    async register(user: RegisterDto) {
        const password = await this.passwordService.hashPassword(user.password);
        return this.prismaService.user.create({
            data: {
                email: user.email,
                password,
                f_name: user.firstName,
                l_name: user.lastName,
                gender: user.gender,
                address: user.address,
                phone: user.phone
            }
        });
    }
 
    
    async login(req:any,user: loginDto) {
        const foundUser = await this.prismaService.user.findUnique({
            where: {
            email: user.email
            }
        });

        if (!foundUser) {
            throw new HttpException(
                'User not found',
                HttpStatus.NOT_FOUND,
            );
        }

        const isPasswordValid = await this.passwordService.comparePassword(user.password, foundUser.password);

        if (!isPasswordValid) {
            throw new HttpException(
                'Invalid password',
                HttpStatus.UNAUTHORIZED,
            );
        }
        req.session.userId = foundUser.id;
        req.session.userRole = foundUser.role;
        await new Promise((resolve, reject) =>
            req.session.save((err: any) => {
              if (err) reject(err);
              resolve(true);
            }),
          );
          console.log('Session saved', req.session);
        return foundUser;
    }

    async me(req:any) {
        if (!req.session.userId) {
            throw new HttpException(
                'Unauthorized',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return this.prismaService.user.findUnique({
            where: {
                id: req.session.userId
            }
        });
        return req.session.userId;
    }

    async logout(req:any) {
        req.session.destroy();
        return 'Logged out';
    }
}
