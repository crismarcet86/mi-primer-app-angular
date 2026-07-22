import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

export interface Ticket {
  id: number;
  titulo: string;
  prioridad: string;
  estado: 'Abierto' | 'Cerrado';
}

export interface TicketState {
  tickets: Ticket[];
  filtro: 'todos' | 'Abierto' | 'Cerrado';
  cargando: boolean;
}

export interface CrearTicketDto {
  titulo: string
}

const estadoInicial: TicketState = {
  tickets: [],
  filtro: 'todos',
  cargando: false,
};

// Definición de tus tipos locales
type EstadoTicket = 'Abierto' | 'Cerrado';

// De Angular (Texto) a .NET (Número)
const ESTADO_A_API: Record<EstadoTicket, number> = {
  'Abierto': 0,
  'Cerrado': 1
};

// De .NET (Número) a Angular (Texto)
const ESTADO_DESDE_API: Record<number, EstadoTicket> = {
  0: 'Abierto',
  1: 'Cerrado'
};

export const TicketStore = signalStore(
  { providedIn: 'root' },
  
  withState(estadoInicial),

  withComputed(({ tickets, filtro }) => ({
    ticketsMostrados: computed(() => {
      if (filtro() === 'todos') return tickets();
      return tickets().filter(t => t.estado === filtro());
    }),
    totalAbiertos: computed(() => tickets().filter(t => t.estado === 'Abierto').length),
    totalCerrados: computed(() => tickets().filter(t => t.estado === 'Cerrado').length),
    hayTicketsAbiertos: computed(() => tickets().some(t => t.estado === 'Abierto')),
  })),

  withMethods((store, http = inject(HttpClient)) => ({
    cargarTicket() {
      patchState(store, { cargando: true });

      http.get<Ticket[]>(`${environment.apiUrl}/tickets`).subscribe({
        next: (tickets) => patchState(store, { tickets, cargando: false }),
        error: () => patchState(store, { cargando: false }),
      });
    },
    agregarTicket(ticket: CrearTicketDto) {
      return http.post<Ticket>(`${environment.apiUrl}/tickets`, ticket).pipe(
        tap((ticketCreado) => {
          patchState(store, { tickets: [...store.tickets(), ticketCreado] });
        })
      );
    },
    cambiarEstado(id: number, nuevoEstado: 'Abierto' | 'Cerrado') {
      const estadoApi = ESTADO_A_API[nuevoEstado];

      return http.put(`${environment.apiUrl}/tickets/${id}`, estadoApi).pipe(
        tap(() => {
          patchState(store, {
            tickets: store.tickets().map(t => t.id === id ? { ...t, estado: nuevoEstado } : t)
          });
        })
      );
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