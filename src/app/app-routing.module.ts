import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    component: ClientLayoutComponent 
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
