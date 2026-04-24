import { Routes } from '@angular/router';
import { DashboardHomePage } from './pages/dashboard-home/dashboard.page';
export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomePage,
  },
  {
    path: 'new',
    loadComponent: () =>
      import('../dashboard/pages/ticket-create/ticket-create.page').then((m) => m.TicketCreatePage),
  },
];
