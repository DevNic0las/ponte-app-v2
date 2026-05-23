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
    loadComponent: () => import('./features/home/pages/user.menu.page').then((m) => m.UserMenuPage),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/pages/auth.page').then((m) => m.LoginPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/pages/profile.page').then((m) => m.ProfilePage),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'tickets',
    loadChildren: () => import('./features/ticket/ticket.routes').then((m) => m.TICKET_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'new-user',
    loadComponent: () => import('./features/dashboard/pages/new-user/new-user.page').then((m) => m.NovoUsuarioPage),
  },
];
