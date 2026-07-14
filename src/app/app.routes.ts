import { Routes } from '@angular/router';
import { DashboardTickets } from './features/dashboard-tickets/dashboard-tickets';
import { PaginaNoEncontrada } from './features/pagina-no-encontrada/pagina-no-encontrada';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: DashboardTickets },
  { path: 'login', 
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },
  { path: 'tickets/:id', 
    loadComponent: () => import('./features/detalle-ticket/detalle-ticket').then(m => m.DetalleTicket) 
  },
  { path: 'nuevo-ticket', 
    loadComponent: () => import('./features/crear-ticket/crear-ticket').then(m => m.CrearTicket),
    canActivate: [authGuard] 
  },
  { path: 'lista-productos', 
    loadComponent: () => import('./features/lista-productos/lista-productos').then(m => m.ListaProductos) 
  },
  { path: 'productos/:id', 
    loadComponent: () => import('./features/detalle-producto/detalle-producto').then(m => m.DetalleProducto) 
  },
  { path: '**', component: PaginaNoEncontrada }, // siempre al final
];