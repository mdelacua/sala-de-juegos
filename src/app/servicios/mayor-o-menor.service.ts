import { Injectable } from '@angular/core';
import { AbmService } from './abm.service';
import { MayorOMenor } from '../clases/mayor-o-menor';

@Injectable({
  providedIn: 'root'
})
export class MayorOMenorService {

  tabla:string = 'mayor-o-menor'

  constructor(private abmServicio:AbmService) { }

  CrearDatosMayorOMenor(datos:MayorOMenor){
    this.abmServicio.CrearFirestore( {...datos}, this.tabla) 
  }
}
