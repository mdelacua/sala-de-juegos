import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PreguntadosComponent } from '../juegos/preguntados/preguntados.component';
import { AhorcadoComponent } from '../juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../juegos/mayor-o-menor/mayor-o-menor.component';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { ChatComponent } from '../chat/chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({ 
  declarations: [
    HomeComponent,
    PreguntadosComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    QuienSoyComponent,
    ChatComponent,
    

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,

  ]
})
export class HomeModule { }
