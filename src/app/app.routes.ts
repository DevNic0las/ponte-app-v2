import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/pages/auth.page').then((m) => m.LoginPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then((m) => m.ProfilePage),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    canActivate: [authGuard],
    data: { roles: ['TECHNICIAN'] },
  },
];
