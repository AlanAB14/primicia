import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/layout.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    SideBarComponent,
    HeaderComponent,
    CategoriasComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
