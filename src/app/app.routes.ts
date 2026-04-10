import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.page').then(m => m.AuthPage)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.page').then(m => m.DashboardPage)
  }
];