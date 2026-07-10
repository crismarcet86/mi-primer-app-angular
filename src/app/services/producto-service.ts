import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id: number;
  title: string;
  price: number;
}

@Injectable({ providedIn: 'root' })

export class ProductoService {

  private http = inject(HttpClient);
  productos = signal<Producto[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  productosSignal = this.productos.asReadonly();
  cargandoSignal = this.cargando.asReadonly();
  errorSignal = this.error.asReadonly();

  productoSeleccionado = signal<Producto | null>(null);

  cargarProductos() {
    this.cargando.set(true);
    this.error.set(null);

    this.http.get<Producto[]>('https://fakestoreapi.com/products').subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar los productos.');
        this.cargando.set(false);
      }
    });
  }

  obtenerPorId(id: string) {
    return this.http.get<Producto>(`https://fakestoreapi.com/products/${id}`);
  };

}