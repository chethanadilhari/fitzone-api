import { TicketStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateTicketDto {
    @IsEnum(TicketStatus)
    status: TicketStatus;
}