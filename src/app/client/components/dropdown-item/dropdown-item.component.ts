import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comercio } from 'src/app/interfaces/comercios.interface';

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
  @Input() numero: string = '';
  @Input() title: string = '';
  @Input() empresa: string = '';
  @Input() nombre: string = '';
  @Input() direccion: string = '';
  @Input() respuesta: string = '';
  @Input() concepto: boolean = false;

  ngOnInit(): void {
    console.log('first')
  }

}
