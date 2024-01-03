import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comercio } from 'src/app/interfaces/comercios.interface';
import { Tasa } from 'src/app/interfaces/tasas.interface';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent implements OnInit{

  closed: boolean = true;
  urlPlus: string = 'assets/imgs/plus-icon.png'
  urlMinus: string = 'assets/imgs/minus-icon.png'

  @Input() comercios!: Comercio[];
  @Input() numero: number = 0;
  @Input() title: string = '';
  @Input() empresa: string = '';
  @Input() nombre: string = '';
  @Input() direccion: string = '';
  @Input() respuesta: string = '';
  @Input() concepto: boolean = false;
  @Input() promocionValida!: string;
  @Input() tasas!: Tasa[];

  ngOnInit(): void {
    
  }

  completarConCero(numero: number) {
    return numero.toString().padStart(2, '0');
  }

  reemplazaPuntoPorComa(numero: number) {
    return numero.toString().replace(/\./g, ',');
  }

  muestraPromocion(promocionId: number) {
    if (this.promocionValida === '' || this.promocionValida === 'Todas') {
      return true
    }
    if (this.promocionValida === 'si' && promocionId) {
      return true
    }
    if (this.promocionValida === 'no' && !promocionId) {
      return true
    }

    return false;
  }

}
