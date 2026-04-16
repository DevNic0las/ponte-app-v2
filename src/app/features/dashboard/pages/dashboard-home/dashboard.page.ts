import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

import { HeaderComponent }     from '../../../../shared/components/header/header.component';
import { ActionCardComponent }  from '../../../../shared/components/action-card/action-card.component';
import { TicketCardComponent }  from '../../../../shared/components/ticket-card/ticket-card.component';
import { BottomNavComponent }   from '../../../../shared/components/bottom-nav/bottom-nav.component';

import { ActionCard } from '../../../../shared/models/action-card.model';
import { TicketCard } from '../../../../shared/models/ticket-card.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    HeaderComponent,
    ActionCardComponent,
    TicketCardComponent,
    BottomNavComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardHomePage {
  readonly actionCards: ActionCard[] = [
    { icon: 'ticket-outline',      label: 'Atendimento',   route: '/tickets'     },
    { icon: 'add-circle-outline',  label: 'Criar Chamado', route: '/dashboard/new' },
    { icon: 'person-outline',      label: 'Perfil',        route: '/profile'     },
  ];

  readonly ticketCards: TicketCard[] = [
    { icon: 'alert-circle-outline',     title: 'Novos Chamados',        subtitle: '8 pendentes de revisão',  route: '/tickets/new'         },
    { icon: 'time-outline',             title: 'Chamados em Andamento', subtitle: '12 em processamento',     route: '/tickets/in-progress' },
    { icon: 'calendar-outline',         title: 'Chamados Planejados',   subtitle: '5 agendados para hoje',   route: '/tickets/planned'     },
    { icon: 'checkmark-circle-outline', title: 'Chamados Finalizados',  subtitle: '42 concluídos este mês', route: '/tickets/closed'      },
  ];

  private readonly router: Router = inject(Router);

  onActionCardClick(card: ActionCard): void {
    this.router.navigate([card.route]);
  }

  onTicketCardClick(ticket: TicketCard): void {
    this.router.navigate([ticket.route]);
  }
}