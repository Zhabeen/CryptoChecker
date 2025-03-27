import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tradeVolume',
})
export class TradeVolumePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const numVal = parseFloat(value)
    if (isNaN(numVal)) {
      return value
    }
    
    // Округление в читабельном формате
    switch (true) {
      case numVal >= 1e9:
        return (numVal / 1e9).toFixed(1) + 'B'
      case numVal >= 1e6:
        return (numVal / 1e6).toFixed(1) + 'M'
      case numVal >= 1e3:
        return (numVal / 1e3).toFixed(1) + 'K'
      default:
        return numVal.toString();
    }
  }

}
