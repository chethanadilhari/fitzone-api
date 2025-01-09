import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class SupportService {
    constructor(private prismaService: PrismaService) {}

    async createTicket(userId: number, createTicketDto: CreateTicketDto) {
        const result = await this.prismaService.ticket.create({
            data: {
                ...createTicketDto,
                user_id: userId
            }
        });
    }

    async getTickets(userId?: number) {
        return this.prismaService.ticket.findMany({
            where: userId ? { user_id: userId } : {},
            include: {
                user: {
                    select: {
                        f_name: true,
                        l_name: true
                    }
                },
            }
        });
    }

    async getTicketById(userId: number, ticketId: number) {
        const ticket = await this.prismaService.ticket.findFirst({
            where: {
            id: ticketId,
            // user_id: userId
            },
            include: {
            replies: {
                include: {
                user: {
                    select: {
                    f_name: true,
                    l_name: true
                    }
                }
                }
            }
            }
        });

    return ticket;
    }

    async replyToTicket(userId: number, ticketId: number, message: string) {
        const result = await this.prismaService.reply.create({
            data: {
                message,
                ticket_id: ticketId,
                user_id: userId
            }
        });
    }

    async updateTicket(userId: number, ticketId: number, updateTicketDto: UpdateTicketDto) {
        const result = await this.prismaService.ticket.update({
            where: {
                id: ticketId
            },
            data: updateTicketDto
        });
        return result;
    }
}
