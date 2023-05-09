import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    RegistroRoutingModule
  ]
})
export class RegistroModule { }
