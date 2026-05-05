import { Routes } from '@angular/router';
import { DashboardHomePage } from './pages/dashboard-home/dashboard.page';
import { authGuard } from 'src/app/core/guards/auth-guard';
export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomePage,
  },
  {
    path: 'ticket-create',
    loadComponent: () =>
      import('../ticket/ticket-create/ticket-create.page').then((m) => m.TicketCreatePage),
    canActivateChild: [authGuard],
  },
];
