import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    author: string;
}