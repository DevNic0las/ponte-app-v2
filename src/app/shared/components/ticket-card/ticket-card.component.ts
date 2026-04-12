import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonIcon, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  timeOutline,
  calendarOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import { TicketCard } from '../../models/ticket-card.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [IonIcon, IonRippleEffect],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent {
  @Input({ required: true }) ticket!: TicketCard;
  @Output() ticketClick = new EventEmitter<TicketCard>();

  constructor() {
    addIcons({
      alertCircleOutline,
      timeOutline,
      calendarOutline,
      checkmarkCircleOutline,
      chevronForwardOutline,
    });
  }

  onTicketClick(): void {
    this.ticketClick.emit(this.ticket);
  }
}