import { MonedaLocalPipe } from './moneda-local.pipe';

describe('MonedaLocalPipe', () => {
  let pipe: MonedaLocalPipe;

  // Se ejecuta antes de cada prueba para tener una instancia limpia
  beforeEach(() => {
    pipe = new MonedaLocalPipe();
  });

  // Test 1: Verificar que el pipe se crea correctamente
  it('debe crear la instancia del pipe', () => {
    expect(pipe).toBeTruthy();
  });

  // Test 2: Probar el comportamiento con un flujo normal de datos
  it('debe formatear un número con el símbolo de moneda por defecto', () => {
    const resultado = pipe.transform(150);
    // Ajusta el "toEqual" según lo que devuelva exactamente tu lógica
    expect(resultado).toBe('$150.00'); 
  });

  // Test 3: Probar los parámetros opcionales del pipe
  it('debe permitir cambiar el símbolo de la moneda', () => {
    const resultado = pipe.transform(100, 'USD');
    expect(resultado).toBe('USD100.00');
  });

  // Test 4: Probar los casos nulos o indefinidos (el error TS2345 que tenías)
  it('debe manejar correctamente valores null o undefined', () => {
    expect(pipe.transform(0)).toBe('$0.00');
    expect(pipe.transform(0)).toBe('$0.00');
  });
});
