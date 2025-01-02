import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum, IsPhoneNumber, Matches } from 'class-validator';
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

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
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