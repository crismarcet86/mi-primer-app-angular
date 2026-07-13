import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ticket',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-ticket.html',
  styleUrl: './crear-ticket.css',
})

export class CrearTicket {
  private fb = inject(FormBuilder);
  private router = inject(Router);

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
    }
  }
}
