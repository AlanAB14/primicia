import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { FilialesComponent } from './pages/filiales/filiales.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'comercios',
    component: ComerciosComponent
  },
  {
    path: 'filiales',
    component: FilialesComponent
  },
  {
    path: 'promociones',
    component: PromocionesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
