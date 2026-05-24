import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, alertCircleOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from 'src/app/core/storage/token-storage.service';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonIcon, IonSpinner],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly tokenStorageService = inject(TokenStorageService);
  constructor() {
    addIcons({ eyeOutline, eyeOffOutline, alertCircleOutline });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      const response$ = await firstValueFrom(this.authService.login({ email, password }));

      await this.tokenStorageService.saveToken(response$.token);

      const decodedToken = jwtDecode(response$.token) as { role?: string };

      if (decodedToken.role === 'REQUESTER') {
        await this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        await this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      }
    } catch (error: any) {
      if (error?.status === 401) {
        this.errorMessage = 'Email ou senha incorretos';
      } else {
        this.errorMessage = 'Erro ao realizar login. Tente novamente.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  onForgotPassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }
  onRequestAccess(): void {
    this.router.navigateByUrl('/request-access');
  }
}
