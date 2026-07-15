import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
// import { TicketService  } from '../../core/services/ticket-service';
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

  private router = inject(Router);
  // private ticketService = inject(TicketService);
  ticketStore = inject(TicketStore);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  datosTicket: any;
  tickets = this.ticketStore.tickets;
  // filtro = signal<'todos' | 'abierto' | 'cerrado'>('todos');
  // contador = signal(0);
  columnasVisibles = ['id', 'titulo', 'prioridad', 'estado', 'acciones'];

  // ticketsMostrados = computed(() => {
  //   if (this.filtro() === 'todos') return this.tickets();
  //   return this.tickets().filter(t => t.estado === this.filtro());
  // });

  // totalAbiertos = computed(() =>
  //   this.tickets().filter(t => t.estado === 'abierto').length
  // );

  // totalCerrados = computed(() =>
  //   this.tickets().filter(t => t.estado === 'cerrado').length
  // );

  // hayTicketsAbiertos = computed(() => 
  //   this.tickets().some(t => t.estado === 'abierto')
  // );

  ticketsMostrados = this.ticketStore.ticketsMostrados;
  totalAbiertos = this.ticketStore.totalAbiertos;
  totalCerrados = this.ticketStore.totalCerrados;
  hayTicketsAbiertos = this.ticketStore.hayTicketsAbiertos;

  cambiarEstadoTicket(idTicket: number) {
    this.ticketStore.cambiarEstado(idTicket, 'cerrado');
  }

  confirmarCierre(idTicket: number) {
    const ref = this.dialog.open(ConfirmarDialog);
    ref.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.cambiarEstadoTicket(idTicket);
        this.snackBar.open('Ticket cerrado con éxito', 'Cerrar', { duration: 3000 });
      }
    });
  }

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.datosTicket = navigation?.extras.state?.['data'];

    if (this.datosTicket) {
      this.ticketStore.agregarTicket(this.datosTicket);
    }
  }
}
