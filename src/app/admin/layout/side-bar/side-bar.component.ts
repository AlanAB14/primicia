import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  public menuItems: any[] = [
    {
      texto: 'Categorías',
      ruta: 'categorias',
      icon: 'fa fa-tag'
    },
    {
      texto: 'Comercios',
      ruta: 'comercios',
      icon: 'fa fa-shopping-bag'
    },
    {
      texto: 'Filiales',
      ruta: 'filiales',
      icon: 'fa fa-building'
    },
    {
      texto: 'Promociones',
      ruta: 'promociones',
      icon: 'fa fa-dollar'
    },
    {
      texto: 'Solicitudes de Tarjeta',
      ruta: 'tarjeta',
      icon: 'fa fa-credit-card'
    },
    {
      texto: 'Solicitudes de Contacto',
      ruta: 'contacto',
      icon: 'fa fa-address-book-o'
    },
    {
      texto: 'Preguntas',
      ruta: 'preguntas',
      icon: 'fa fa-question'
    },
    {
      texto: 'Tasas',
      ruta: 'tasas',
      icon: 'fa fa-percent'
    },
    {
      texto: 'Comisiones',
      ruta: 'comisiones',
      icon: 'fa fa-percent'
    },
    {
      texto: 'Usuarios',
      ruta: 'usuarios',
      icon: 'fa fa-user'
    }
  ]
}
