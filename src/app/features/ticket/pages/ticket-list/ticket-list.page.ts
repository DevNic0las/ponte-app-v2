// features/ticket/pages/ticket-list/ticket-list.page.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, search, home, ticket, barChart, person } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';

import { TicketService } from '../../services/ticket.service';
import { TicketResponse } from '../../models/ticket.model';
import { TicketListCardComponent } from '../../../../shared/components/ticket-list-card/ticket-list-card.component';
import { BottomNavComponent } from 'src/app/shared/components/bottom-nav/bottom-nav.component';
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonSpinner,
    TicketListCardComponent,
    BottomNavComponent,
  ],
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
})
export class TicketListPage implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly routerLink = inject(Router);
  tickets = signal<TicketResponse[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    addIcons({ arrowBack, search, home, ticket, barChart, person });
  }

  ngOnInit(): void {
    this.ticketService.listTickets().subscribe({
      next: (data) => console.log('status do primeiro ticket:', data[0]?.status),
    });
    this.loadTickets();
  }

  public loadTickets(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.ticketService.listTickets().subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar chamados:', err);
        this.error.set('Não foi possível carregar os chamados. Tente novamente.');
        this.isLoading.set(false);
      },
    });
  }

  trackByTicketId(_index: number, ticket: TicketResponse): string {
    return ticket.publicId;
  }
  onTicketSelected(ticket: TicketResponse): void {
    this.routerLink.navigate(['/tickets/find', ticket.publicId]);
  }
}
