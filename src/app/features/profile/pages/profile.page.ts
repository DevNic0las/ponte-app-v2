import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BottomNavComponent } from 'src/app/shared/components/bottom-nav/bottom-nav.component';
import { inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonCard,
  IonCardContent,
  IonRippleEffect,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  mailOutline,
  notificationsOutline,
  lockClosedOutline,
  logOutOutline,
  chevronForwardOutline,
  createOutline,
  homeOutline,
  ticketOutline,
  barChartOutline,
  personOutline,
} from 'ionicons/icons';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonCard,
    IonCardContent,
    IonRippleEffect,
    IonButtons, // <-- E faltava adicionar ele aqui também
    BottomNavComponent,
  ],
})
export class ProfilePage implements OnInit {
  profileService: ProfileService = inject(ProfileService);
  profile$!: Observable<UserProfile>;

  constructor() {
    addIcons({
      menuOutline,
      mailOutline,
      notificationsOutline,
      lockClosedOutline,
      logOutOutline,
      chevronForwardOutline,
      createOutline,
      homeOutline,
      ticketOutline,
      barChartOutline,
      personOutline,
    });
  }
  ngOnInit(): void {
    this.profile$ = this.profileService.getUserProfile();
    console.log(this.profile$);
  }

  onEditProfile() {
    console.log('Edit profile clicked');
  }

  onNotifications() {
    console.log('Notifications clicked');
  }

  onPrivacy() {
    console.log('Privacy & Security clicked');
  }

  onLogout() {
    console.log('Logout clicked');
  }
}
