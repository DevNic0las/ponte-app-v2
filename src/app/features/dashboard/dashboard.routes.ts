import { Routes } from '@angular/router';
import { DashboardHomePage } from './pages/dashboard-home/dashboard.page';
import { TicketCreatePage } from './pages/ticket-create/ticket-create/ticket-create.page';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomePage,
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/ticket-create/ticket-create/ticket-create.page').then(
        (m) => m.TicketCreatePage,
      ),
  },
];
