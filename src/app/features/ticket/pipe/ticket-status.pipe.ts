// features/ticket/pipes/ticket-status.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { TicketStatus } from '../models/ticket.model';
import { TICKET_STATUS_CONFIG, TicketStatusConfig } from '../models/ticket.model';

@Pipe({ name: 'ticketStatus', standalone: true })
export class TicketStatusPipe implements PipeTransform {
  transform(status: TicketStatus): TicketStatusConfig {
    return TICKET_STATUS_CONFIG[status];
  }
}
