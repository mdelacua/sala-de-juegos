import { Component } from '@angular/core';

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

Clickbtn(value: any, array:string) {
  if(array == 'uno') this.borrarElementos(value,this.abecedario_qwerty1)
  if(array == 'dos') this.borrarElementos(value,this.abecedario_qwerty2)
  if(array == 'tres') this.borrarElementos(value,this.abecedario_qwerty3)
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
}

}
