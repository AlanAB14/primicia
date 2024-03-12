import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appNumberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): number | null {
    if (isNaN(value)) {
      return null;
    }else {
      return value;
    }
  }

}
