import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum, IsPhoneNumber, Matches, IsStrongPassword } from 'class-validator';
import { Gender } from '@prisma/client';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsEnum(Gender, { message: 'Gender must be a valid one' })
    gender: Gender;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;
}