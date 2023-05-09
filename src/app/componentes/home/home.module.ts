import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PreguntadosComponent } from '../juegos/preguntados/preguntados.component';
import { AhorcadoComponent } from '../juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../juegos/mayor-o-menor/mayor-o-menor.component';


@NgModule({
  declarations: [
    HomeComponent,
    PreguntadosComponent,
    AhorcadoComponent,
    MayorOMenorComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,


  ]
})
export class HomeModule { }
