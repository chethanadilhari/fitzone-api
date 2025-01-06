import { Controller,Req, Body, Post,Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Req() req: any, @Body() loginDto: loginDto) {
    return await this.authService.login(req,loginDto);
  }

  @Get('logout')
  async logout(@Req() req: any) {
    return await this.authService.logout(req);
  }

  @Get('session')
  async session(@Req() req: any) {
    if (!req.session || !req.session.userId) {
      return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return req.session.userId;
  }
}
