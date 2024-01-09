import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { FilialesComponent } from './pages/filiales/filiales.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { TasasComponent } from './pages/tasas/tasas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


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
  {
    path: 'tarjeta',
    component: TarjetaComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'preguntas',
    component: PreguntasComponent
  },
  {
    path: 'tasas',
    component: TasasComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
