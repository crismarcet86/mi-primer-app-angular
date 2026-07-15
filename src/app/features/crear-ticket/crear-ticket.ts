import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  ticketForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    prioridad: ['media', [Validators.required]],
    estado: ['abierto', [Validators.required]]
  });

  onSubmit() {
    if (this.ticketForm.valid) {
      const nuevoTicket = {
        id: Date.now(), // solución temporal simple: usa el timestamp como id único
        ...this.ticketForm.value
      };
      this.router.navigate(['/'], { state: { data: nuevoTicket } });
      this.snackBar.open('Ticket creado con éxito', 'Cerrar', { duration: 3000 });
    }
  }
}
