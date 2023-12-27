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
import { ServicioComponent } from './components/servicio/servicio.component';
import { PromocionesTemplateComponent } from './components/promociones/promociones.component';
import { PromocionBoxComponent } from './components/promocion-box/promocion-box.component';
import { ContactoTemplateComponent } from './components/contacto/contacto.component';
import { ContactoBoxComponent } from './components/contacto-box/contacto-box.component';
import { MaterialModule } from '../material/material.module';
import { DropdownItemComponent } from './components/dropdown-item/dropdown-item.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComerciosShowComponent } from './components/comercios-show/comercios-show.component';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    HomeComponent,
    NosotrosComponent,
    ComerciosComponent,
    PromocionesComponent,
    AyudaComponent,
    ContactoComponent,
    ServicioComponent,
    PromocionesTemplateComponent,
    PromocionBoxComponent,
    ContactoTemplateComponent,
    ContactoBoxComponent,
    DropdownItemComponent,
    ComerciosShowComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
