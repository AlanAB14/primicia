import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comercio } from 'src/app/interfaces/comercios.interface';
import { Comision } from 'src/app/interfaces/comision.interface';
import { CostoFinanciero } from 'src/app/interfaces/costoFinanciero.interface';
import { Tasa } from 'src/app/interfaces/tasas.interface';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent implements OnInit{
  hidePlusBtn: boolean = false;
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
  @Input() promocionValida!: any;
  @Input() tasas!: Tasa[];
  @Input() costoFinanciero!: CostoFinanciero[];
  @Input() tasasFecha!: string;
  @Input() comisiones!: Comision[];

  ngOnInit(): void {
    if (this.title === 'Tasas' || this.title === 'Comisiones y cargos' || this.title === 'info-usuario' || this.title === 'consulta-reclamo') {
      this.hidePlusBtn = true;
      this.closed = false;
    }
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
    if (this.promocionValida == promocionId) {
      return true
    }
    if (this.promocionValida === 'no' && !promocionId) {
      return true
    }

    return false;
  }

}
