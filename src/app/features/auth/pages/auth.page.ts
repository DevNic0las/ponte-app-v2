import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, alertCircleOutline } from 'ionicons/icons';

// Caso queira integrar um AuthService real, descomente e injete abaixo.
// import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService, // descomente quando tiver o serviço
  ) {
    addIcons({ eyeOutline, eyeOffOutline, alertCircleOutline });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Verifica se o campo foi tocado e é inválido
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Alterna visibilidade da senha
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Submissão do formulário
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      // ---- Substitua este bloco pela chamada real ao seu AuthService ----
      await this.simulateLogin(email, password);
      // -------------------------------------------------------------------

      // Redireciona após login bem-sucedido
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error: any) {
      this.errorMessage = error?.message ?? 'Erro ao realizar login. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  // Simulação de login — REMOVA ao integrar o AuthService real
  private simulateLogin(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve();
        } else {
          reject({ message: 'Credenciais inválidas.' });
        }
      }, 1500);
    });
  }

  // Navega para recuperação de senha
  onForgotPassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }

  // Navega para solicitação de acesso
  onRequestAccess(): void {
    this.router.navigateByUrl('/request-access');
  }
}
