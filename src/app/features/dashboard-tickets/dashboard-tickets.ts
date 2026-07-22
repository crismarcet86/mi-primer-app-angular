import { Component, signal, computed, inject } from '@angular/core';
import { TicketStore } from '../../core/stores/ticket-store';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialog } from '../confirmar-dialog/confirmar-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth-service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard-tickets',
  standalone: true,
  imports: [ 
    MatTableModule, 
    MatIconModule,
    MatButtonModule 
  ],
  templateUrl: './dashboard-tickets.html',
  styleUrl: './dashboard-tickets.css',
})

export class DashboardTickets {

  ticketStore = inject(TicketStore);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  datosTicket: any;
  tickets = this.ticketStore.tickets;
  columnasVisibles = ['id', 'titulo', 'estado', 'acciones'];

  ticketsMostrados = this.ticketStore.ticketsMostrados;
  totalAbiertos = this.ticketStore.totalAbiertos;
  totalCerrados = this.ticketStore.totalCerrados;
  hayTicketsAbiertos = this.ticketStore.hayTicketsAbiertos;

  ngOnInit() {
    this.ticketStore.cargarTicket();
  }

  cambiarEstadoTicket(idTicket: number) {
    this.ticketStore.cambiarEstado(idTicket, 'Cerrado').subscribe({
        next: (respuesta) => console.log('¡Enviado con éxito!', respuesta),
        error: (error) => console.error('Error real del backend:', error)
      })
  }

  confirmarCierre(idTicket: number) {
    const ref = this.dialog.open(ConfirmarDialog);
    ref.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.cambiarEstadoTicket(idTicket);
        this.snackBar.open('Ticket Cerrado con éxito', 'Cerrar', { duration: 3000 });
      }
    });
  }

}
