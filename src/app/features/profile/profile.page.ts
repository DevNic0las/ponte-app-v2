import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonAvatar, IonButton, IonIcon, IonLabel,
  IonItem, IonList, IonListHeader, IonNote,
  IonCard, IonCardContent, IonTabBar, IonTabButton,
  IonTabs, IonBadge, IonRippleEffect,
  IonButtons // <-- Faltava este aqui para o container de botões
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline, mailOutline, 
  notificationsOutline, lockClosedOutline,
  logOutOutline, chevronForwardOutline,
  createOutline, homeOutline, ticketOutline,
  barChartOutline, personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonAvatar, IonButton, IonIcon, IonLabel,
    IonItem, IonList, IonListHeader, IonNote,
    IonCard, IonCardContent, IonRippleEffect,
    IonTabBar, IonTabButton, IonTabs, IonBadge,
    IonButtons // <-- E faltava adicionar ele aqui também
  ],
})
export class ProfilePage {
  user = {
    name: 'Ricardo Mendonça',
    role: 'Analista de Sistemas Pleno',
    department: 'Tecnologia da Informação',
    email: 'ricardo.m@ponte.com.br',
    employeeId: '#PT-44820',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsJ99Tm8xKd3nQQ5l1G_I_TH3HYDRJUV-MMNewCf0rChkU36rplGIRFjiNZ3DCvoSBBCypR6LEB7adDUsyUfXmUd0O2ZfBvdLmmTgmoeAacbAkY31Ama8-xxnzJlCXEmLg5OGC_6MgQowqm5qSS2vEfL7OZTIR3eTpfqzV4ghc9B6-XSDAHzqxGZA2NNSr1VVP6a6p-y-GXvOPtytdGIwYASsgZDslraWwF7BeS-72SrqDXGqvtbJL0l9Z_SEpbaYDAZn2mb6IYQIN',
  };

  headerAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRPUxENy1uu-fxaBALLP4XBnmD1v3tLma24mwPu89W4qZNhida95PftaLD3GgzR5KcN_CGy137UcGaIwQcGYmDuhtAB7qJdsGGWqtVy0MH47dJq79P2gbnvY_O4mt1cmwfGUZ5l0q7RmEVcTU99N16IysLTAuhNZQq62bqSCMZs-xC9WafYda_Y9KSfik5jGyuPPW0xTa-CH1JL_CGAKdTHZiANeww0lV_N_36s4wvYzlSAi5weHPrd063h09I-5SRBAd1hT4iMf9E';

  constructor() {
    addIcons({
      menuOutline, mailOutline, 
      notificationsOutline, lockClosedOutline,
      logOutOutline, chevronForwardOutline,
      createOutline, homeOutline, ticketOutline,
      barChartOutline, personOutline
    });
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
