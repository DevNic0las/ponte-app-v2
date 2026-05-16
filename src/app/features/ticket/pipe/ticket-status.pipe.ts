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
@Pipe({ name: 'ticketStatusColor', standalone: true })
export class TicketStatusColorPipe implements PipeTransform {
  transform(status: string | undefined): string {
    const map: Record<string, string> = {
      NOVO: 'success',
      EM_ABERTO: 'warning',
      EM_ANALISE: 'primary',
      FINALIZADO: 'medium',
    };
    return map[status ?? ''] ?? 'medium';
  }
}
