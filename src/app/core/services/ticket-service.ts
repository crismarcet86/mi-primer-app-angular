import { Injectable, signal } from '@angular/core';

export interface Ticket {
  id: number;
  titulo: string;
  prioridad: string;
  estado: 'Abierto' | 'Cerrado';
}

@Injectable({
  providedIn: 'root' // una sola instancia compartida en toda la app
})

export class TicketService {
  
  private tickets = signal<Ticket[]>([]);

  // Exponemos el signal como solo-lectura hacia afuera
  ticketsSignal = this.tickets.asReadonly();

  agregarTicket(ticket: Ticket) {
    this.tickets.update(actuales => [...actuales, ticket]);
  }

  cambiarEstado(id: number, nuevoEstado: 'Abierto' | 'Cerrado') {
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