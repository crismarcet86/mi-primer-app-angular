import { Injectable, signal } from '@angular/core';

export interface Ticket {
  id: number;
  titulo: string;
  prioridad: string;
  estado: 'abierto' | 'cerrado';
}

@Injectable({
  providedIn: 'root' // una sola instancia compartida en toda la app
})

export class TicketService {
  
  private tickets = signal<Ticket[]>([
    { id: 1, titulo: 'Ticket #1', prioridad: 'alta', estado: 'abierto' },
    { id: 2, titulo: 'Ticket #2', prioridad: 'media', estado: 'cerrado' },
    { id: 3, titulo: 'Ticket #3', prioridad: 'media', estado: 'abierto' },
    { id: 4, titulo: 'Ticket #4', prioridad: 'baja', estado: 'cerrado' },
    { id: 5, titulo: 'Ticket #5', prioridad: 'baja', estado: 'abierto' },
    { id: 6, titulo: 'Ticket #6', prioridad: 'baja', estado: 'abierto' },
  ]);

  // Exponemos el signal como solo-lectura hacia afuera
  ticketsSignal = this.tickets.asReadonly();

  agregarTicket(ticket: Ticket) {
    this.tickets.update(actuales => [...actuales, ticket]);
  }

  cambiarEstado(id: number, nuevoEstado: 'abierto' | 'cerrado') {
    this.tickets.update(actuales =>
      actuales.map(t => t.id === id ? { ...t, estado: nuevoEstado } : t)
    );
  }

  buscarPorId(id: number | null): any {
    if (id === null) 
      return null;
    
    return this.ticketsSignal().find(t => t.id === id) || null;
  }
}