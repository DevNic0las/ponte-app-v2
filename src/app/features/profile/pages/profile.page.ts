import { Component, OnInit, signal } from '@angular/core';
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
  IonBackButton,
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
  businessOutline,
} from 'ionicons/icons';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/profile.model';
import { AvatarStorageService } from '../storage/avatar-storage.service';
import { TokenStorageService } from 'src/app/core/storage/token-storage.service';
import { Router } from '@angular/router';
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
    IonButtons,
    BottomNavComponent,
    IonBackButton,
  ],
})
export class ProfilePage implements OnInit {
  profileService: ProfileService = inject(ProfileService);
  profile$!: Observable<UserProfile>;
  avatarStorage = inject(AvatarStorageService);
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);
  showAvatarPicker = signal(false);
  selectedAvatar = signal<string>('');

  mockAvatars = [
    '../../../assets/avatars/1.png',
    '../../../assets/avatars/2.png',
    '../../../assets/avatars/3.png',
    '../../../assets/avatars/4.png',
    '../../../assets/avatars/5.png',
    '../../../assets/avatars/6.png',
    '../../../assets/avatars/7.png',
    '../../../assets/avatars/8.png',
    '../../../assets/avatars/9.png',
    '../../../assets/avatars/11.png',
    '../../../assets/avatars/12.png',
    '../../../assets/avatars/13.png',
    '../../../assets/avatars/14.png',
    '../../../assets/avatars/15.png',
    '../../../assets/avatars/16.png',
    '../../../assets/avatars/17.png',
    '../../../assets/avatars/18.png',
    '../../../assets/avatars/19.png',
    '../../../assets/avatars/20.png',
  ];

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
      businessOutline,
    });
  }

  async ngOnInit(): Promise<void> {
    this.profile$ = this.profileService.getUserProfile();
    const avatar = await this.avatarStorage.getAvatar();
    if (avatar) this.selectedAvatar.set(avatar);
  }

  async selectAvatar(url: string): Promise<void> {
    this.selectedAvatar.set(url);
    this.showAvatarPicker.set(false);
    await this.avatarStorage.saveAvatar(url);
  }
  onNotifications() {
    console.log('Notifications clicked');
  }
  onPrivacy() {
    console.log('Privacy & Security clicked');
  }
  async onLogout() {
    await this.tokenStorage.removeToken();
    await this.router.navigateByUrl('/auth', { replaceUrl: true });
  }
}
