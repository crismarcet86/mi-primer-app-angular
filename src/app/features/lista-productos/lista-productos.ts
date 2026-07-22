import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ProductoService } from '../../core/services/producto-service';
import { RouterLink } from "@angular/router";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MonedaLocalPipe } from '../../shared/pipes/moneda-local.pipe';
import { ResaltarDirective } from '../../shared/directives/resaltar.directive';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports:  [ RouterLink, MonedaLocalPipe, ResaltarDirective ],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})

export class ListaProductos implements OnInit {

  private productoService = inject(ProductoService);

  productos = this.productoService.productos;
  cargando = this.productoService.cargando;
  error = this.productoService.error;
  
  terminoBusqueda = signal<string>('');
  private busquedaInput = new Subject<string>();

  productosFiltrados = computed(() => {
    const productosOriginales = this.productoService.productos();
    const texto = this.terminoBusqueda().toLowerCase().trim();

    if (!texto) {
      return productosOriginales;
    }

    return productosOriginales.filter(p => 
      p.nombre.toLowerCase().includes(texto)
    );
  });

  ngOnInit() {
    this.productoService.cargarProductos();
  }

  constructor() {
    this.busquedaInput.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(texto => this.terminoBusqueda.set(texto));
  }

  onInputBusqueda(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaInput.next(input.value);
  }

}