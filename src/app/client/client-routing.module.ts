import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DenunciaComponent } from './pages/denuncia/denuncia.component';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'comercios',
    component: ComerciosComponent
  },
  {
    path: 'promociones',
    component: PromocionesComponent
  },
  {
    path: 'ayuda',
    component: AyudaComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'denuncia',
    component: DenunciaComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
