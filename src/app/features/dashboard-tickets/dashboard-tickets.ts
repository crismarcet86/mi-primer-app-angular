import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService  } from '../../core/services/ticket-service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialog } from '../confirmar-dialog/confirmar-dialog';

@Component({
  selector: 'app-dashboard-tickets',
  standalone: true,
  imports: [ MatTableModule, MatIconModule ],
  templateUrl: './dashboard-tickets.html',
  styleUrl: './dashboard-tickets.css',
})

export class DashboardTickets {

  private router = inject(Router);
  datosTicket: any;

  private ticketService = inject(TicketService);
  private dialog = inject(MatDialog);

  tickets = this.ticketService.ticketsSignal;
  filtro = signal<'todos' | 'abierto' | 'cerrado'>('todos');
  contador = signal(0);

  ticketsMostrados = computed(() => {
    if (this.filtro() === 'todos') return this.tickets();
    return this.tickets().filter(t => t.estado === this.filtro());
  });

  totalAbiertos = computed(() =>
    this.tickets().filter(t => t.estado === 'abierto').length
  );

  totalCerrados = computed(() =>
    this.tickets().filter(t => t.estado === 'cerrado').length
  );

  hayTicketsAbiertos = computed(() => 
    this.tickets().some(t => t.estado === 'abierto')
  );

  cambiarEstadoTicket(idTicket: number) {
    this.ticketService.cambiarEstado(idTicket, 'cerrado');
  }

  confirmarCierre(idTicket: number) {
    const ref = this.dialog.open(ConfirmarDialog);
    ref.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.cambiarEstadoTicket(idTicket);
      }
    });
  }

  columnasVisibles = ['titulo', 'prioridad', 'estado', 'acciones'];

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.datosTicket = navigation?.extras.state?.['data'];

    if (this.datosTicket) {
      this.ticketService.agregarTicket(this.datosTicket);
    }
  }
}
