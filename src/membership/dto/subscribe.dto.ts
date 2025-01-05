import { IsInt, IsNotEmpty,  } from 'class-validator';

export class SubscribeDto {

@IsNotEmpty()
@IsInt()
packageId: number;

}