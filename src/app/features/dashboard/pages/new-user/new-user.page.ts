import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonNote,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-novo-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonNote,
  ],
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NovoUsuarioPage {
  nomeCompleto = '';
  emailCorporativo = '';
  departamento = '';
  senhaProvisoria = '';
  mostrarSenha = signal(false);

  departamentos = [
    { value: 'it', label: 'Tecnologia da Informação' },
    { value: 'fin', label: 'Financeiro & Controladoria' },
    { value: 'ops', label: 'Operações Logísticas' },
    { value: 'hr', label: 'Recursos Humanos' },
  ];

  constructor(
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  toggleSenha() {
    this.mostrarSenha.update((v) => !v);
  }

  async cadastrar() {
    if (
      !this.nomeCompleto ||
      !this.emailCorporativo ||
      !this.departamento ||
      !this.senhaProvisoria
    ) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos obrigatórios.',
        duration: 2500,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: `Usuário ${this.nomeCompleto} cadastrado com sucesso!`,
      duration: 2500,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
    this.router.navigate(['/tabs/home']);
  }

  cancelar() {
    this.router.navigate(['/tabs/home']);
  }
}