import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monedaLocal',
  standalone: true
})
export class MonedaLocalPipe implements PipeTransform {
  transform(valor: number, simbolo: string = '$'): string {
    return `${simbolo}${valor.toFixed(2)}`;
  }
}