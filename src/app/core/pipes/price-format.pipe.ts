import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const numVal = parseFloat(value)
    if (isNaN(numVal)) {
      return value
    }

    // Так как есть значения, которые при привидении к четырем знакам после запятой, превращаются в 0.0000, просто выводим такие числа, чтобы не было недопонимания
    if (numVal < 0.0001) {
      return value
    }

    return numVal.toFixed(4)
  }
}
