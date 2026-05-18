import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu', 
  templateUrl: './user.menu.page.html', 
  styleUrls: ['./user.menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class UserMenuPage { 

  constructor(private router: Router) {}

  goToAnaliseTecnica() {
    this.router.navigate(['/analise-tecnica']);
  }

  goToMeusChamados() {
    this.router.navigate(['/meus-chamados']);
  }
}