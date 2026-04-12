import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonIcon, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  ticketOutline,
  addCircleOutline,
  personOutline,
} from 'ionicons/icons';
import { ActionCard } from '../../models/action-card.model';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [IonIcon, IonRippleEffect],
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
  @Input({ required: true }) card!: ActionCard;
  @Output() cardClick = new EventEmitter<ActionCard>();

  constructor() {
    // registrar todos os ícones usados nos action cards
    addIcons({ ticketOutline, addCircleOutline, personOutline });
  }

  onCardClick(): void {
    this.cardClick.emit(this.card);
  }
}