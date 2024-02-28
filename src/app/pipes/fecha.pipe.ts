import { Pipe, type PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appFecha',
  standalone: true,
})
export class FechaPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return moment(value).format('DD/MM/YYYY');
  }

}
