import { Component } from '@angular/core';
import { Ahorcado } from 'src/app/clases/ahorcado';
import { AhorcadoService } from 'src/app/servicios/ahorcado.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  abecedario_qwerty1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  abecedario_qwerty2 = [ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  abecedario_qwerty3 = [ 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm']

  btnDeshabilitados :any = []
  errores: number = 0

  palabras:string[] = ['dormir', 'comer', 'usuario', 'reir', 'llorar', 'anillo', 'amor', 'raton', 'telefono', 'mantel', 'perro', 'caja', 'mano']
  palabra:any = 'usuario'
  indiceLetrasEncontradas: number[] = []
  respuestaParcial:any = ''
  palabraMostrada:any = ''
  gano:boolean = false
  ganoResp:number = 0;

  partidaAhorcado!:Ahorcado

  constructor(private ahorcadoService:AhorcadoService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.EscribirRespuestaTemporal()
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
Clickbtn(value: any, array:string) {

  if(array == 'uno') this.borrarElementos(value,this.abecedario_qwerty1)
  if(array == 'dos') this.borrarElementos(value,this.abecedario_qwerty2)
  if(array == 'tres') this.borrarElementos(value,this.abecedario_qwerty3)

  this.BuscarLetrasEnPalabra(value)
}

BuscarLetrasEnPalabra(letra:string){
  
  var encontroLetra = false
  for(var i=0; i<this.palabra.length;i++) {
      if (this.palabra[i] === letra){
        this.indiceLetrasEncontradas.push(i);
        encontroLetra = true
      } 
  }

  if(!encontroLetra){

    this.errores++
    if(this.errores ==5){
      this.ahorcadoService.CrearDatosAhorcado(this.partidaAhorcado)
      this.ErrorUsuario("Perdiste...");
    }
  }else{
    this.AgregarLetrasAPalabraMostrada()
  }

  console.log(this.indiceLetrasEncontradas)

}

EscribirRespuestaTemporal(){
  

  this.palabra = this.palabras[ Math.floor(Math.random() * this.palabras.length) ]//asignar palabra que se adivinara
  
  this.partidaAhorcado = new Ahorcado()
  this.partidaAhorcado.palabra = this.palabra

  console.log('Palabra que sera adivinada: ' + this.palabra )
  for (let i = 0; i < this.palabra.length; i++) {
    this.respuestaParcial += '_'    
  }
  this.MostrarRespuestaParcial()
  
}

AgregarLetrasAPalabraMostrada(){
  
  for (let i = 0; i < this.palabra.length; i++) {
    
    for (let j = 0; j < this.indiceLetrasEncontradas.length; j++) {
      if(this.indiceLetrasEncontradas[j] == i){
        this.respuestaParcial = this.replaceCharacter(this.respuestaParcial, i, this.palabra[i]);
        //this.respuestaParcial[i] = this.palabra[i]
      }
      
    }
     
  }
  this.MostrarRespuestaParcial()

  //verificar si gano
  if(!this.respuestaParcial.includes('_') ) {
    this.gano = true
    this.ganoResp ++
    this.partidaAhorcado.gano = this.gano
    this.ahorcadoService.CrearDatosAhorcado(this.partidaAhorcado)
    this.NotificaionInicioSesion('Ganaste!')  
  }

  
  

}

MostrarRespuestaParcial (){
  this.palabraMostrada = ''
  for (let i = 0; i < this.respuestaParcial.length; i++) {
    this.palabraMostrada += (' ' + this.respuestaParcial[i] )
    
  }
}

replaceCharacter(string:any, index:any, replacement:any) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}




borrarElementos(value:any, array:any){
  const index = array.indexOf(value);
  console.log(index); // 👉️ 1

  if (index !== -1) {
    array.splice(index, 1);
  }
  this.btnDeshabilitados.push(value)
}

 ReiniciarJuego(){
  this.abecedario_qwerty1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  this.abecedario_qwerty2 = [ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  this.abecedario_qwerty3 = [ 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
  this.btnDeshabilitados = []
  this.errores = 0
  this.gano = false
  this.palabraMostrada = ''
  this.respuestaParcial = ''
  this.indiceLetrasEncontradas = []

  
  this.EscribirRespuestaTemporal()
}

}
