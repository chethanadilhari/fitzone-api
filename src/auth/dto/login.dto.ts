import { IsString, IsNotEmpty, IsEmail } from 'class-validator';


export class loginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}