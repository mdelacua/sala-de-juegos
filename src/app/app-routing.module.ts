import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule) },
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule) },
 { path: 'home', loadChildren: () => import('./componentes/home/home.module').then(m => m.HomeModule) },
 { path: 'registro', loadChildren: () => import('./componentes/registro/registro.module').then(m => m.RegistroModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
