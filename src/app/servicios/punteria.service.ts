import { Injectable } from '@angular/core';
import { AbmService } from './abm.service';
import { Punteria } from '../clases/punteria';

@Injectable({
  providedIn: 'root'
})
export class PunteriaService {

  tabla:string = 'punteria'

  constructor(private abmServicio:AbmService) { }

  CrearDatosPunteria(datos:Punteria){
    this.abmServicio.CrearFirestore( {...datos}, this.tabla) 
  }
}
