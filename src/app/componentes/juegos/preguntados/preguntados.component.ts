import { Component } from '@angular/core';
import data1 from './preguntas.json';
import pjAnime from './anime.json';
import { Preguntados } from 'src/app/clases/preguntados';
import { PreguntadosService } from 'src/app/servicios/preguntados.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  preguntaActual:any = {}
  preguntas:any = data1
  
  deshabilitarBtn:boolean = false
  gano:number = 0

  partidaPreguntados:Preguntados = new Preguntados()

  constructor(private servicioPreguntados: PreguntadosService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(data1)
    //this.AsignarPregunta()
    //this.TraerPersonajesAnime()
  }

  /** PERSONAJES ANIME */
  personajesAnime!:any[]
  AdivinarElPj:any = []
  respSeleccionada:any
  respCorrecta:any

  ErrorUsuario(msj:any){
    Swal.fire({
      icon: 'error',
      title: msj,
      text: 'Presione Ok para continuar!',
    })
  }
  NotificaionInicioSesion(mensaje:string){
    Swal.fire(
      mensaje,
      'Presione Ok para continuar!',
      'success'
    )
  }
  TraerPersonajesAnime(){
    
    this.ReiniciarPregunta()   
    this.TraerPersonajeParaAdivinar()  
    
    this.servicioPreguntados.TraerImagenesPersonajes(this.AdivinarElPj.id).subscribe(resp => {
      if(resp){

        this.AdivinarElPj.img = resp
        console.log(resp)    
      }
      
    });
  }

  ReiniciarPregunta(){
    this.personajesAnime = []
    this.AdivinarElPj = new Array
    this.personajesAnime = pjAnime.slice(); //copiar solo los valores y no la referencia del array
    this.deshabilitarBtn = false
    if(this.respCorrecta) this.respCorrecta!.className ='btn btn-primary btn-lg btn-block'
    if(this.respSeleccionada) this.respSeleccionada!.className ='btn btn-primary btn-lg btn-block'

  }
  
  TraerPersonajeParaAdivinar(){

    var idPj = Math.floor(Math.random() * this.personajesAnime.length)
    console.log('asignar AdivinarElPj', this.AdivinarElPj)
    this.AdivinarElPj = this.personajesAnime[idPj]
    console.log('asignar AdivinarElPj', this.AdivinarElPj)
    this.personajesAnime.splice(idPj, 1)
    this.AdivinarElPj.respuestas = []
    this.AdivinarElPj.respuestas.push(this.AdivinarElPj.personaje)

    console.log(this.AdivinarElPj, this.personajesAnime )

    for (let i = 0; i < 3; i++) {
      this.BuscarRespuestasIncorrectas()      
    }

    this.OrdernarAleatoreamenteLasRespuestas()

    console.log(this.AdivinarElPj, this.personajesAnime )
  }

  BuscarRespuestasIncorrectas(){
    var idPj = Math.floor(Math.random() * this.personajesAnime.length)
    this.AdivinarElPj.respuestas.push( this.personajesAnime[idPj].personaje )
    this.personajesAnime.splice(idPj, 1)
  }
  VerficarRespuestaV2(nombre:any, indice:number){
    
    this.respSeleccionada = document.getElementById('btnResp'+indice)
    this.respCorrecta = document.getElementById('btnResp'+this.BuscarIndiceRspCorrecta())
    if( nombre == this.AdivinarElPj.personaje){
      console.log('resp correcta')
      this.respSeleccionada!.className = 'btn btn-success btn-lg btn-block' //TODO VERIFICAR
      this.partidaPreguntados.gano = true
      this.gano ++
      this.NotificaionInicioSesion('Ganaste!')  
    }
    else{
      this.respCorrecta!.className = 'btn btn-success btn-lg btn-block' //TODO VERIFICAR
      this.respSeleccionada!.className = 'btn btn-danger btn-lg btn-block' //TODO VERIFICAR
      console.log('resp incorrecta')      
      this.ErrorUsuario("Perdiste...");
      
    }

    this.servicioPreguntados.CrearDatosPreguntados(this.partidaPreguntados)

    this.deshabilitarBtn = true
  }

  BuscarIndiceRspCorrecta(){
    return this.AdivinarElPj.respuestas.indexOf(this.AdivinarElPj.personaje)
  }
  OrdernarAleatoreamenteLasRespuestas(){
    
    var aux  = this.AdivinarElPj.respuestas.sort((a:any, b:any) => 0.5 - Math.random()).slice();
    this.AdivinarElPj.respuestas = aux
  }
  /** PERSONAJES ANIME */
/*
  AsignarPregunta(){
    var idPregunta = Math.floor(Math.random() * this.preguntas.length)
    this.preguntaActual = this.preguntas[ idPregunta ]
    this.partidaPreguntados.idPregunta = idPregunta
    this.deshabilitarBtn = false
  }
  VerficarRespuesta(index:any){
    if( index == this.preguntaActual.respuesta_correcta){
      console.log('resp correcta')
      document.getElementById('btnResp'+index)!.className = 'btn btn-success btn-lg btn-block' //TODO VERIFICAR
      this.partidaPreguntados.gano = true
      this.gano ++
    }
    else{
      document.getElementById('btnResp'+this.preguntaActual.respuesta_correcta)!.className = 'btn btn-success btn-lg btn-block' //TODO VERIFICAR
      document.getElementById('btnResp'+index)!.className = 'btn btn-danger btn-lg btn-block' //TODO VERIFICAR
      console.log('resp incorrecta')

    }

    this.servicioPreguntados.CrearDatosPreguntados(this.partidaPreguntados)

    this.deshabilitarBtn = true
  }
*/

}
