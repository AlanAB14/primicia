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
      icon: 'fa fa-image'
    },
    {
      texto: 'Comercios',
      ruta: 'comercios',
      icon: 'fa fa-image'
    },
    {
      texto: 'Filiales',
      ruta: 'filiales',
      icon: 'fa fa-image'
    },
    {
      texto: 'Promociones',
      ruta: 'promociones',
      icon: 'fa fa-image'
    }
  ]
}
