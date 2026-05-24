import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth-guard';

export const TICKET_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/ticket-create/ticket-create.page').then((m) => m.TicketCreatePage),
    canActivateChild: [authGuard],
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/ticket-list/ticket-list.page').then((m) => m.TicketListPage),
    canActivateChild: [authGuard],
  },
  {
    path: 'find/:publicId',
    loadComponent: () =>
      import('./pages/ticket-find/ticket-find.page').then((m) => m.TicketFindPage),
    canActivateChild: [authGuard],
  },
  {
    path: 'my-tickets',
    loadComponent: () => import('./pages/my-tickets/my-tickets.page').then((m) => m.MyTicketsPage),
    canActivateChild: [authGuard],
  },
];
