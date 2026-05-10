import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para o *ngFor
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardContent, IonIcon, IonTabBar, 
  IonTabButton, IonLabel 
} from '@ionic/angular/standalone'; // Imports dos componentes
import { addIcons } from 'ionicons'; // Para registrar os ícones
import { 
  buildOutline, warningOutline, ticketOutline, 
  home, barChartOutline, personOutline, chevronForwardOutline 
} from 'ionicons/icons'; // Ícones específicos

@Component({
  selector: 'app-user-menu',
  templateUrl: './user.menu.page.html',
  styleUrls: ['./user.menu.page.scss'],
  standalone: true, // Define como standalone
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardContent, IonIcon, IonTabBar, 
    IonTabButton, IonLabel
  ]
})
export class UserMenuPage {

  actions = [
    {
      icon: 'build-outline',
      title: 'Análise Técnica',
      description: 'Solicite suporte especializado para infraestrutura.',
      route: '/analise-tecnica',
    },
    {
      icon: 'warning-outline',
      title: 'Relatar um Problema',
      description: 'Informe bugs ou falhas críticas no sistema.',
      route: '/relatar-problema',
    },
    {
      icon: 'ticket-outline',
      title: 'Meus Chamados',
      description: 'Consulte o histórico e o status dos seus tickets.',
      route: '/meus-chamados',
    },
  ];

  constructor(private router: Router) {
    // É OBRIGATÓRIO registrar os ícones que você usa no HTML
    addIcons({ 
      'build-outline': buildOutline, 
      'warning-outline': warningOutline, 
      'ticket-outline': ticketOutline,
      'home': home,
      'bar-chart-outline': barChartOutline,
      'person-outline': personOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}