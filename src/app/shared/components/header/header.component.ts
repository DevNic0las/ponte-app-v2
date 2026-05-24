import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
