import { Routes } from '@angular/router';
import { DashboardTickets } from '../dashboard-tickets/dashboard-tickets';
import { PaginaNoEncontrada } from '../pagina-no-encontrada/pagina-no-encontrada';

export const routes: Routes = [
  { path: '', component: DashboardTickets },
  { path: 'tickets/:id', 
    loadComponent: () => import('../detalle-ticket/detalle-ticket').then(m => m.DetalleTicket) 
  },
  { path: '**', component: PaginaNoEncontrada }, // siempre al final
];