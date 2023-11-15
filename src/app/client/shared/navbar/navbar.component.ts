import { Component } from '@angular/core';

interface ItemMenu {
  path: string;
  text: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isExpanded: boolean = false;


  items: ItemMenu[] = [
    {
      path: 'nosotros',
      text: 'Nosotros'
    },
    {
      path: 'comercios',
      text: 'Comercios'
    },
    {
      path: 'promociones',
      text: 'Promociones'
    },
    {
      path: 'ayuda',
      text: 'Ayuda y Seguridad'
    },
    {
      path: 'contacto',
      text: 'Contacto'
    }
  ];

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

}
