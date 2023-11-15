import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    HomeComponent,
    NosotrosComponent,
    ComerciosComponent,
    PromocionesComponent,
    AyudaComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
