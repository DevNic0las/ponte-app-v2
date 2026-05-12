import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth-guard';

export const TICKET_ROUTES: Routes = [
  {
    path: 'ticket-create',
    loadComponent: () =>
      import('./pages/ticket-create/ticket-create.page').then((m) => m.TicketCreatePage),
    canActivateChild: [authGuard],
  },
  {
    path: 'ticket-list',
    loadComponent: () =>
      import('./pages/ticket-list/ticket-list.page').then((m) => m.TicketListPage),
    canActivateChild: [authGuard],
  },
];
