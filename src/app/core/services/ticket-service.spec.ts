import { TestBed } from '@angular/core/testing';
import { TicketService } from './ticket-service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketService);
  });

  it('debería cambiar el estado de un ticket existente', () => {
    service.cambiarEstado(1, 'cerrado');
    const ticket = service.buscarPorId(1);
    expect(ticket?.estado).toBe('cerrado');
  });

  it('no debería fallar al buscar un id inexistente', () => {
    const ticket = service.buscarPorId(9999);
    expect(ticket).toBeNull();
  });

  it('debería agregar un ticket nuevo a la lista', () => {
    const cantidadInicial = service.ticketsSignal().length;
    service.agregarTicket({ id: 100, titulo: 'Nuevo', prioridad: 'alta', estado: 'abierto' });
    expect(service.ticketsSignal().length).toBe(cantidadInicial + 1);
  });
});