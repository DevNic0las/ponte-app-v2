import { Component, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, ticketOutline, chevronForwardOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.page.html',
  styleUrls: ['./my-tickets.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon],
})
export class MyTicketsPage implements OnInit {
  private navCtrl = inject(NavController);
  private readonly router = inject(Router);
  constructor() {
    addIcons({ arrowBackOutline, ticketOutline, chevronForwardOutline });
  }
  goBack(): void {
    this.navCtrl.back();
  }

  goToMyTickets(): void {
    this.router.navigate(['my-tickets']);
  }
  ngOnInit() {}
}
