import { Component } from '@angular/core';

@Component({
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  items: any[] = new Array(10).fill(null);
}
