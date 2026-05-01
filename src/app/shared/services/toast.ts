import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(
    message: string,
    color: string = 'primary',
    duration: number = 2000,
    position: 'top' | 'middle' | 'bottom' = 'top',
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position,
    });

    await toast.present();
  }
  async success(message: string) {
    return this.showToast(message, 'success');
  }

  async error(message: string) {
    return this.showToast(message, 'danger', 3000);
  }

  async warning(message: string) {
    return this.showToast(message, 'warning');
  }
}
