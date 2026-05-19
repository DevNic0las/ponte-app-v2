import { Component, inject } from '@angular/core';
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
import { AuthService } from '../../../features/auth/services/extractRole.service';

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
  private authService = inject(AuthService);
  isTechnician$ = this.authService.isAdmin$;

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
