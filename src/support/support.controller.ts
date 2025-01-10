import { Controller, UseGuards, Get, Post, Req,Body, Patch } from '@nestjs/common';
import { SupportService } from './support.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { StaffGuard } from 'src/core/guards/staff.guard';

@UseGuards(AuthGuard)
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('tickets')
  getTickets(@Req() req: any) {
    const userId = req.session.userId;
    const userRole = req.session.userRole;
    if (userRole == 'ADMIN' || userRole == 'STAFF') {
      return this.supportService.getTickets();
    }
    return this.supportService.getTickets(userId);
  }

  @Get('ticket/:ticketId')
  getTicket(@Req() req: any) {
    const userId = req.session.userId;
    const ticketId = req.params.ticketId;
    const userRole = req.session.userRole;
    if (userRole == 'ADMIN' || userRole == 'STAFF') {
      return this.supportService.getTicketById(null, +ticketId);
    }
    return this.supportService.getTicketById(userId, +ticketId);
  }

  @Post('ticket/:ticketId/reply')
  replyToTicket(@Req() req: any, @Body() body: CreateReplyDto) {
    const userId = req.session.userId;
    const ticketId = req.params.ticketId;
    return this.supportService.replyToTicket(userId, +ticketId, body.message);
  }

  @Post('ticket')
  getMembership(@Req() req: any, @Body() body: CreateTicketDto) {
    const userId = req.session.userId;
    return this.supportService.createTicket(userId, body);
  }

  @UseGuards(StaffGuard)
  @Patch('ticket/:ticketId')
  updateTicket(@Req() req: any, @Body() body: UpdateTicketDto) {
    const userId = req.session.userId;
    const ticketId = req.params.ticketId;
    return this.supportService.updateTicket(userId, +ticketId, body);
  }

}
