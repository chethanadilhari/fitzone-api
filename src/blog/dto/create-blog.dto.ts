import { BlogStatus } from '@prisma/client';
import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

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
    featured_image: string;

    @IsEnum(BlogStatus)
    status: BlogStatus;

    @IsString()
    @IsNotEmpty()
    description: string;
}