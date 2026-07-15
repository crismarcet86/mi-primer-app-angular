import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface Ticket {
  id: number;
  titulo: string;
  prioridad: string;
  estado: 'abierto' | 'cerrado';
}

export interface TicketState {
  tickets: Ticket[];
  filtro: 'todos' | 'abierto' | 'cerrado';
}

const estadoInicial: TicketState = {
  tickets: [
    { id: 1, titulo: 'Ticket #1', prioridad: 'alta', estado: 'abierto' },
    { id: 2, titulo: 'Ticket #2', prioridad: 'media', estado: 'cerrado' },
    { id: 3, titulo: 'Ticket #3', prioridad: 'media', estado: 'abierto' },
    { id: 4, titulo: 'Ticket #4', prioridad: 'baja', estado: 'cerrado' },
    { id: 5, titulo: 'Ticket #5', prioridad: 'baja', estado: 'abierto' },
    { id: 6, titulo: 'Ticket #6', prioridad: 'baja', estado: 'abierto' },
  ],
  filtro: 'todos',
};

export const TicketStore = signalStore(
  { providedIn: 'root' },

  withState(estadoInicial),

  withComputed(({ tickets, filtro }) => ({
    ticketsMostrados: computed(() => {
      if (filtro() === 'todos') return tickets();
      return tickets().filter(t => t.estado === filtro());
    }),
    totalAbiertos: computed(() => tickets().filter(t => t.estado === 'abierto').length),
    totalCerrados: computed(() => tickets().filter(t => t.estado === 'cerrado').length),
    hayTicketsAbiertos: computed(() => tickets().some(t => t.estado === 'abierto')),
  })),

  withMethods((store) => ({
    agregarTicket(ticket: Ticket) {
      patchState(store, { tickets: [...store.tickets(), ticket] });
    },
    cambiarEstado(id: number, nuevoEstado: 'abierto' | 'cerrado') {
      patchState(store, {
        tickets: store.tickets().map(t => t.id === id ? { ...t, estado: nuevoEstado } : t)
      });
    },
    setFiltro(filtro: TicketState['filtro']) {
      patchState(store, { filtro });
    },
    buscarPorId(id: number | null) {
      if (id === null) return null;
      return store.tickets().find(t => t.id === id) || null;
    },
  }))
);