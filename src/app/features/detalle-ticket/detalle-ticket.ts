import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TicketService } from '../../core/services/ticket-service';

@Component({
  selector: 'app-detalle-ticket',
  standalone: true,
  imports: [],
  templateUrl: './detalle-ticket.html',
  styleUrl: './detalle-ticket.css',
})

export class DetalleTicket {
  private route = inject(ActivatedRoute);
  private ticketService = inject(TicketService);

  id = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  mostrarTicket = computed(() => {
    const idBuscado = this.id() ? Number(this.id()) : null;
    return this.ticketService.buscarPorId(idBuscado);
  });
}
