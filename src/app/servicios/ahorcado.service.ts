import { Injectable } from '@angular/core';
import { AbmService } from './abm.service';
import { Ahorcado } from '../clases/ahorcado';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  tabla:string = 'ahorcado'

  constructor(private abmServicio:AbmService) { }

  CrearDatosAhorcado(datos:Ahorcado){
    this.abmServicio.CrearFirestore( {...datos}, this.tabla) 
  }
}
