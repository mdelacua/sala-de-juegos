import { Component } from '@angular/core';
import { Punteria } from 'src/app/clases/punteria';
import { PunteriaService } from 'src/app/servicios/punteria.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-punteria',
  templateUrl: './punteria.component.html',
  styleUrls: ['./punteria.component.css']
})
export class PunteriaComponent {

  objetivosAleatorios: any = 'display:none;';
  comenzarJuego: string = 'display:block;';
  classObjetivo:string = '';

  objetivosJugados:number = 0

  myTimeout!: NodeJS.Timeout;
  timerValue:number = 3000

  botonesDificultad:any = {"facil" : true,"medio": false,"dificil": false }
  btnsDeshabilidatos:boolean = false

  partidaPunteria = new Punteria()

  gano:number = 0

  constructor(private servicioPunteria: PunteriaService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.partidaPunteria.intentosTotales = 5
    this.partidaPunteria.aciertos = 0
    this.partidaPunteria.dificultad = 'facil'
  }

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
  ClickEnObjetivo() {

    if(this.myTimeout)  clearTimeout(this.myTimeout);

    this.CrearObjetivoAleatoreo(this.partidaPunteria.dificultad, true);
  
  }
  ComenzarJuego() {
    
    this.ReiniciarJuego()
    this.CrearObjetivoAleatoreo(this.partidaPunteria.dificultad, false);
  }

  AsignarDificultad(dificultad:string){
    this.partidaPunteria.dificultad = dificultad
    this.CambiarEstadoBotones(dificultad)
    //document.getElementById(dificultad)!.className = 'btn btn-success btn-lg btn-block'
  }

  CambiarEstadoBotones(keyJson:any){
    Object.keys(this.botonesDificultad).forEach((key) =>{
      
      if(key == keyJson){
        this.botonesDificultad[key] = true
      }
      else{
        this.botonesDificultad[key] = false
      }
      
    });
  }

  ReiniciarJuego(){
    this.btnsDeshabilidatos =true;
    this.comenzarJuego = 'display:none;'
    this.objetivosAleatorios = 'display:block;';
    this.classObjetivo = this.partidaPunteria.dificultad
    this.objetivosJugados = 0
    this.partidaPunteria.aciertos = 0
  }

  CrearObjetivoAleatoreo(tipoDeJuego:string, acerto:boolean){
    
    if(acerto) this.partidaPunteria.aciertos ++
    if(this.partidaPunteria.aciertos == this.partidaPunteria.intentosTotales){
      this.gano ++
      this.NotificaionInicioSesion('Ganaste!')  
    }  
    
    
    if(this.ValidarIntentos()){
      switch (tipoDeJuego) {
        case 'facil':          
          this.timerValue = 5000
          this.DefinirLugarDelObjetivo(84, 88)
          break;
        case 'medio':           
          this.timerValue = 3000        
          this.DefinirLugarDelObjetivo(90, 95)
          break;
        case 'dificil':
          this.timerValue = 1000          
          this.DefinirLugarDelObjetivo(95, 97)
          break;  
        
      }
      this.myTimeout = setTimeout(  () =>{ 

        this.CrearObjetivoAleatoreo(this.partidaPunteria.dificultad, false) 
        if((this.objetivosJugados -1) == this.partidaPunteria.intentosTotales){
          this.ErrorUsuario("Perdiste...");
        }
      }, this.timerValue);
    }
    else{
      //Termino el juego
      this.TerminarJuego()
      clearTimeout(this.myTimeout);
    }
    this.objetivosJugados ++
    if((this.objetivosJugados -1) == this.partidaPunteria.intentosTotales && this.partidaPunteria.aciertos != this.partidaPunteria.intentosTotales){
      this.ErrorUsuario("Perdiste...");
    }
    
   
  }

  TerminarJuego(){
    this.btnsDeshabilidatos = false;
    this.comenzarJuego = 'display:block;'
    this.objetivosAleatorios = 'display:none;';
    this.classObjetivo = ''
    
    if(this.partidaPunteria.aciertos == this.partidaPunteria.intentosTotales) this.partidaPunteria.gano =true
    
    this.servicioPunteria.CrearDatosPunteria(this.partidaPunteria)   
  }

  ValidarIntentos(){
    return (this.partidaPunteria.intentosTotales > this.objetivosJugados) ? true : false
  }

  DefinirLugarDelObjetivo(top:number, left:number){
    this.objetivosAleatorios = 'display:block;'
    this.objetivosAleatorios += 'left:' + this.NumeroAleatoreo(left) + '%;'
    this.objetivosAleatorios += 'top:' + this.NumeroAleatoreo(top) + '%;'
  }

  NumeroAleatoreo(numMax:number){
   return  Math.floor(Math.random() * numMax) 
  }


}
