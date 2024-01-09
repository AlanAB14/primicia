import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/layout.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { LimitStringPipe } from '../pipes/limit-string.pipe';
import { DialogComercioComponent } from './components/dialog-comercio/dialog-comercio.component';
import { FilialesComponent } from './pages/filiales/filiales.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '../helpers/custom-date-adapter';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { TasasComponent } from './pages/tasas/tasas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    SideBarComponent,
    HeaderComponent,
    CategoriasComponent,
    ComerciosComponent,
    FilialesComponent,
    PromocionesComponent,
    TarjetaComponent,
    ContactoComponent,
    PreguntasComponent,
    TasasComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    LimitStringPipe,
    DialogComercioComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdminModule { }
