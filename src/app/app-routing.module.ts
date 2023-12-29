import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AdminLayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard]
  },
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
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollOffset: [0, 50],
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
