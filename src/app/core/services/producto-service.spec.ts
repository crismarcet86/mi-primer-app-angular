import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductoService } from './producto-service';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // confirma que no quedaron peticiones sin resolver
  });

  it('debería cargar productos y actualizar el signal', () => {
    service.cargarProductos();

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    req.flush([{ id: 1, title: 'Producto Test', price: 10 }]); // respuesta simulada

    expect(service.productosSignal().length).toBe(1);
    expect(service.productosSignal()[0].title).toBe('Producto Test');
  });
});