import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent {
  closed: boolean = true;
  urlPlus: string = 'assets/imgs/plus-icon.png'
  urlMinus: string = 'assets/imgs/minus-icon.png'
}
