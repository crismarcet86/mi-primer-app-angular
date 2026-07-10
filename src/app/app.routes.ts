import { Routes } from '@angular/router';
import { DashboardTickets } from './dashboard-tickets/dashboard-tickets';
import { PaginaNoEncontrada } from './pagina-no-encontrada/pagina-no-encontrada';

export const routes: Routes = [
  { path: '', component: DashboardTickets },
  { path: 'tickets/:id', 
    loadComponent: () => import('./detalle-ticket/detalle-ticket').then(m => m.DetalleTicket) 
  },
  { path: 'nuevo-ticket', 
    loadComponent: () => import('./crear-ticket/crear-ticket').then(m => m.CrearTicket) 
  },
  { path: 'nuevo-usuario', 
    loadComponent: () => import('./registro-usuario/registro-usuario').then(m => m.RegistroUsuario) 
  },
  { path: 'lista-productos', 
    loadComponent: () => import('./lista-productos/lista-productos').then(m => m.ListaProductos) 
  },
  { path: 'productos/:id', 
    loadComponent: () => import('./detalle-producto/detalle-producto').then(m => m.DetalleProducto) 
  },
  { path: '**', component: PaginaNoEncontrada }, // siempre al final
];