import { Component, signal, computed, inject } from '@angular/core';
import { TarjetaTicket } from '../tarjeta-ticket/tarjeta-ticket';
import { Router } from '@angular/router';
import { TicketService } from '../services/ticket-service';

interface Ticket {
  id: number;
  titulo: string;
  prioridad: string,
  estado: 'abierto' | 'cerrado';
}

@Component({
  selector: 'app-dashboard-tickets',
  standalone: true,
  imports: [TarjetaTicket],
  templateUrl: './dashboard-tickets.html',
  styleUrl: './dashboard-tickets.css',
})

export class DashboardTickets {

  private router = inject(Router);
  datosTicket: any;

  private ticketService = inject(TicketService);

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

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.datosTicket = navigation?.extras.state?.['data'];

    if (this.datosTicket) {
      this.ticketService.agregarTicket(this.datosTicket);
    }
  }
}
