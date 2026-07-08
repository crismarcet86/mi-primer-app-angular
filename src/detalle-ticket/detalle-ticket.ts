import { Component, inject, input, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Ticket {
  id: number;
  titulo: string;
  estado: 'abierto' | 'cerrado';
}

@Component({
  selector: 'app-detalle-ticket',
  standalone: true,
  imports: [],
  templateUrl: './detalle-ticket.html',
  styleUrl: './detalle-ticket.css',
})
export class DetalleTicket {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');

  tickets = signal<Ticket[]>( [
    { id: 1, titulo: 'Ticket #1', estado: 'abierto' },
    { id: 2, titulo: 'Ticket #2', estado: 'cerrado' },
    { id: 3, titulo: 'Ticket #3', estado: 'abierto' },
    { id: 4, titulo: 'Ticket #4', estado: 'cerrado' },
    { id: 5, titulo: 'Ticket #5', estado: 'abierto' },
    { id: 6, titulo: 'Ticket #6', estado: 'abierto' },
  ]);

  mostrarTicket = computed(() => {
    const idBuscado = this.id ? Number(this.id) : null;
    
    return this.tickets().find(t => t.id === idBuscado);
  });
}
