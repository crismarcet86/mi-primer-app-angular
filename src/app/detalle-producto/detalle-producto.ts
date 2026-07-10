import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductoService, Producto } from '../services/producto-service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
})

export class DetalleProducto {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);

  idProducto = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  producto = signal<Producto | null>(null);
  cargando = signal(false);

  constructor() {
    effect(() => {
      const idActual = this.idProducto();
      if (!idActual) return;

      this.cargando.set(true);
      this.productoService.obtenerPorId(idActual).subscribe({
        next: (data) => {
          this.producto.set(data);
          this.cargando.set(false);
        }
      });
    });
  }
}