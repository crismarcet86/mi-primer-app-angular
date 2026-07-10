import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {
  private fb = inject(FormBuilder);

  usuarioForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]],
    telefonos: this.fb.array([]), // arranca vacío
  });

  get telefonos() {
    return this.usuarioForm.get('telefonos') as FormArray;
  }

  agregarTelefono() {
    this.telefonos.push(this.fb.control('', Validators.required));
  }

  quitarTelefono(index: number) {
    this.telefonos.removeAt(index);
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      console.log(this.usuarioForm.value);
    }
  }
}
