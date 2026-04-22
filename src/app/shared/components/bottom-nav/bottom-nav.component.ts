import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  home,
  ticketOutline,
  ticket,
  barChartOutline,
  barChart,
  personOutline,
  person,
} from 'ionicons/icons';
import { NavItem } from '../../models/nav-item.model';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent {
  readonly navItems: NavItem[] = [
    { icon: 'home-outline', activeIcon: 'home', label: 'Início', route: '/home' },
    { icon: 'ticket-outline', activeIcon: 'ticket', label: 'Atendimento', route: '/tickets' },
    { icon: 'bar-chart-outline', activeIcon: 'bar-chart', label: 'Relatórios', route: '/reports' },
    { icon: 'person-outline', activeIcon: 'person', label: 'Perfil', route: '/profile' },
  ];

  constructor() {
    addIcons({
      homeOutline,
      home,
      ticketOutline,
      ticket,
      barChartOutline,
      barChart,
      personOutline,
      person,
    });
  }
}
