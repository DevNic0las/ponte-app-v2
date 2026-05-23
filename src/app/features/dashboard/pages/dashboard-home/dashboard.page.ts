import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActionCardComponent } from '../../../../shared/components/action-card/action-card.component';
import { TicketCardComponent } from '../../../../shared/components/ticket-card/ticket-card.component';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';

import { ActionCard } from '../../../../shared/models/action-card.model';
import { TicketCard } from '../../../../shared/models/ticket-card.model';
import { DashboardService } from '../../services/dashboard-service';

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
  private readonly router: Router = inject(Router);
  private readonly dashboardService = inject(DashboardService);

  readonly actionCards: ActionCard[] = [
    { icon: 'ticket-outline', label: 'Atendimento', route: '/tickets/list' },
    { icon: 'add-circle-outline', label: 'Criar Chamado', route: '/tickets/create' },
    { icon: 'person-outline', label: 'Perfil', route: '/profile' },
  ];

  ticketCards$: Observable<TicketCard[]> = this.dashboardService.countTicketsByStatus().pipe(
    map((counts) => [
      {
        icon: 'alert-circle-outline',
        title: 'Novos Chamados',
        subtitle: `${counts.open} abertos`,
        route: '/tickets/list',
        queryParams: {
          status: 'OPEN',
        },
      },
      {
        icon: 'time-outline',
        title: 'Chamados em Andamento',
        subtitle: `${counts.inProgress} andamento`,
        route: '/tickets/list',
        queryParams: {
          status: 'IN_PROGRESS',
        },
      },
      {
        icon: 'checkmark-circle-outline',
        title: 'Chamados Concluídos',
        subtitle: `${counts.resolved} concluídos`,
        route: '/tickets/list',
        queryParams: {
          status: 'RESOLVED',
        },
      },
      {
        icon: 'person-outline',
        title: 'Cadastro de usuários',
        subtitle: 'Registrar novos acessos',
        route: '/dashboard/new-user',
      },
    ]),
  );

  onActionCardClick(card: ActionCard): void {
    console.log(card.route);
    
    this.router.navigate([card.route]);
  }

  onTicketCardClick(ticket: TicketCard): void {
    this.router.navigate([ticket.route], {
      queryParams: ticket.queryParams,
    });
  }
}
