import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  buildOutline,
  warningOutline,
  ticketOutline,
  home,
  barChartOutline,
  personOutline,
  chevronForwardOutline,
} from 'ionicons/icons'; // Ícones específicos
import { BottomNavComponent } from 'src/app/shared/components/bottom-nav/bottom-nav.component';
import { AuthService } from '../../auth/services/extractRole.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user.menu.page.html',
  styleUrls: ['./user.menu.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonLabel,
    BottomNavComponent,
  ],
})
export class UserMenuPage {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  actions = [
    {
      icon: 'build-outline',
      title: 'Análise Técnica',
      description: 'Solicite suporte especializado para infraestrutura.',
      route: '/ticket-create',
    },
    {
      icon: 'ticket-outline',
      title: 'Meus Chamados',
      description: 'Consulte o histórico e o status dos seus tickets.',
      route: '/tickets/my-tickets',
    },
  ];

  constructor() {
    addIcons({
      'build-outline': buildOutline,
      'warning-outline': warningOutline,
      'ticket-outline': ticketOutline,
      home: home,
      'bar-chart-outline': barChartOutline,
      'person-outline': personOutline,
      'chevron-forward-outline': chevronForwardOutline,
    });
  }

  goToMyTickets() {
    this.router.navigate(['/tickets/my-tickets']);
  }

  goToTechnicalAnalysis() {
    this.router.navigate(['/tickets/create']);
  }

  async navigate(route: string) {
    if (route === '/tickets/my-tickets') {
      const isAdmin = await firstValueFrom(this.authService.isAdmin$);
      this.router.navigate([isAdmin ? '/tickets/list' : '/tickets/my-tickets']);
      return;
    }
    this.router.navigate([route]);
  }
}
