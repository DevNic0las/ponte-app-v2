import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { eyeOutline } from 'ionicons/icons';
import { eyeOffOutline } from 'ionicons/icons';
import { DashboardService } from '../../services/dashboard-service';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/features/ticket/services/ticket.service';
import { Sector } from 'src/app/features/ticket/models/ticket.model';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  ],
})
export class NewUserPage implements OnInit {
  private readonly toastController: ToastController = inject(ToastController);
  private readonly dashboardService = inject(DashboardService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);
  router = inject(Router);
  registerForm!: FormGroup;
  showPassword = signal(false);
  isLoading = false;
  errorMessage = '';
  sectors: Sector[] = [];
  constructor() {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      sector: ['', Validators.required],
    });
    this.ticketService.getSectors().subscribe((data) => {
      this.sectors = data;
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.dashboardService.registerUser(this.registerForm.value).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Usuário criado com sucesso!',
          duration: 3000,
          color: 'success',
        });
        await toast.present();
        await this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        this.isLoading = false;
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Erro ao criar usuário. Por favor, tente novamente.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
        this.isLoading = false;
      },
    });
  }
}
