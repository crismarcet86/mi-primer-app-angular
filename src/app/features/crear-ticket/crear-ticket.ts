import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketStore } from '../../core/stores/ticket-store';

@Component({
  selector: 'app-crear-ticket',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './crear-ticket.html',
  styleUrl: './crear-ticket.css',
})

export class CrearTicket {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  ticketStore = inject(TicketStore);

  ticketForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit() {
    if (this.ticketForm.valid) {
      
      const nuevoTicket = {
        titulo: this.ticketForm.value.titulo ?? ''
      };

      this.ticketStore.agregarTicket(nuevoTicket).subscribe({
        next: (ticketCreado) => {
          this.router.navigate(['/']);
          this.snackBar.open('Ticket creado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error al guardar el ticket en el servidor', 'Cerrar', { duration: 3000 });
          console.error(err);
        }
      });
    }
  }
}
