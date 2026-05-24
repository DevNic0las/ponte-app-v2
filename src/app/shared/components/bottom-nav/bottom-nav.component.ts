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
import { combineLatest, map } from 'rxjs';

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
  isReady$ = this.authService.isReady$;
  isTechnician$ = this.authService.isAdmin$;

  ticketRoute$ = combineLatest([this.authService.isReady$, this.authService.isAdmin$]).pipe(
    map(([isReady, isAdmin]) => {
      if (!isReady) return null;
      return {
        commands: ['/tickets/list'],
        queryParams: isAdmin ? {} : { mode: 'my' },
      };
    }),
  );
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
