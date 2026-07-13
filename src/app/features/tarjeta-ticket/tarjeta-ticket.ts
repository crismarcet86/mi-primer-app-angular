import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tarjeta-ticket',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './tarjeta-ticket.html',
  styleUrl: './tarjeta-ticket.css'
})

export class TarjetaTicket {

  id = input.required<number>();
  titulo = input.required<string>();
  estado = input.required<'abierto' | 'cerrado'>();
  
  cerrar = output<number>(); // evento que este componente puede emitir

  onCerrarClick(idTicket: number) {
    this.cerrar.emit(idTicket);
  }

}
