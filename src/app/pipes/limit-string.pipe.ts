import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appLimitString',
  standalone: true,
})
export class LimitStringPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }

}
