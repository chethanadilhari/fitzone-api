import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReplyDto {
    @IsString()
    @IsNotEmpty()
    message: string;
}