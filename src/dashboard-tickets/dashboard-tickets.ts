import { Component, signal, computed } from '@angular/core';
import { TarjetaTicket } from '../tarjeta-ticket/tarjeta-ticket';

interface Ticket {
  id: number;
  titulo: string;
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

  tickets = signal<Ticket[]>( [
    { id: 1, titulo: 'Ticket #1', estado: 'abierto' },
    { id: 2, titulo: 'Ticket #2', estado: 'cerrado' },
    { id: 3, titulo: 'Ticket #3', estado: 'abierto' },
    { id: 4, titulo: 'Ticket #4', estado: 'cerrado' },
    { id: 5, titulo: 'Ticket #5', estado: 'abierto' },
    { id: 6, titulo: 'Ticket #6', estado: 'abierto' },
  ]);
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
    this.tickets.update(ticketsActuales => 
      ticketsActuales.map(ticket => 
        ticket.id === idTicket 
          ? { ...ticket, estado: 'cerrado' }
          : ticket
      )
    );
  }
}
