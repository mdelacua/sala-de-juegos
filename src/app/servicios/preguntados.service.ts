import { Injectable } from '@angular/core';
import { Preguntados } from '../clases/preguntados';
import { AbmService } from './abm.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  tabla:string = 'preguntados'

  constructor(private abmServicio:AbmService,private http: HttpClient) { }

  CrearDatosPreguntados(datos:Preguntados){
    this.abmServicio.CrearFirestore( {...datos}, this.tabla) 
  }

  TraerImagenesPersonajes(id:number){
    return this.http.get('https://api.jikan.moe/v4/characters/'+id+'/pictures');
  }
}
