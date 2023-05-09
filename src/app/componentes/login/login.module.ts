import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class LoginModule { }
