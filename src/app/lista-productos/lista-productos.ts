import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ProductoService, Producto } from '../services/producto-service';
import { RouterLink } from "@angular/router";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports:  [ RouterLink ],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})

export class ListaProductos implements OnInit {

  private productoService = inject(ProductoService);

  productos = this.productoService.productos;
  cargando = this.productoService.cargando;
  error = this.productoService.error;
  
  terminoBusqueda = signal<string>('');
  private debounceTimer?: any;

  productosFiltrados = computed(() => {
    const productosOriginales = this.productoService.productos();
    const texto = this.terminoBusqueda().toLowerCase().trim();

    if (!texto) {
      return productosOriginales;
    }

    return productosOriginales.filter(p => 
      p.title.toLowerCase().includes(texto)
    );
  });

  ngOnInit() {
    this.productoService.cargarProductos();
  }

  onInputBusqueda(evento: Event) {
    const input = evento.target as HTMLInputElement;
    
    // Limpiamos el timer anterior si el usuario sigue escribiendo rápido
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    // Esperamos 300ms antes de aplicar el filtro en memoria
    this.debounceTimer = setTimeout(() => {
      this.terminoBusqueda.set(input.value);
    }, 300);
  }
}