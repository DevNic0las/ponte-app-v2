// features/ticket/components/ticket-list-card/ticket-list-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRippleEffect } from '@ionic/angular/standalone';
import { TicketResponse } from '../../../features/ticket/models/ticket.model';
import { TICKET_STATUS_CONFIG } from '../../../features/ticket/models/ticket.model';

@Component({
  selector: 'app-ticket-list-card',
  standalone: true,
  imports: [CommonModule, IonRippleEffect],
  templateUrl: './ticket-list-card.component.html',
  styleUrls: ['./ticket-list-card.component.scss'],
})
export class TicketListCardComponent {
  @Input({ required: true }) ticket!: TicketResponse;
  @Output() ticketClick = new EventEmitter<TicketResponse>();

  // Expõe o config diretamente no componente — sem pipe necessário aqui
  // O pipe faz sentido em templates com muitas repetições; aqui é mais direto assim
  get statusConfig() {
    return TICKET_STATUS_CONFIG[this.ticket.status];
  }

  onCardClick(): void {
    this.ticketClick.emit(this.ticket);
  }
}
