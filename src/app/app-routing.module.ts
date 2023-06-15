import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { PaginasLogeadoGuard } from './guards/paginas-logeado.guard';

const routes: Routes = [
 { path: '', canActivate: [LoginGuard], loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule) },
  { path: 'login', canActivate: [LoginGuard], loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule) },
 { path: 'home', canActivate: [PaginasLogeadoGuard], loadChildren: () => import('./componentes/home/home.module').then(m => m.HomeModule) },
 { path: 'registro', loadChildren: () => import('./componentes/registro/registro.module').then(m => m.RegistroModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
