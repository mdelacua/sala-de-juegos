import { Component } from '@angular/core';
import { CartasService } from 'src/app/servicios/cartas.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css']
})
export class MayorOMenorComponent {

  mazoId:any
  carta:any = null
  carta2:any = null
  reiniciarJuego:boolean = false
  gano:number = 0

  observableMazo:any
  constructor(private servicioCartas:CartasService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.IniciarJuego()
  }
  IniciarJuego(){
    this.observableMazo = this.servicioCartas.TraerMazo().subscribe(async (resp:any) => {
      // display its headers
      //const keys = resp.headers.keys();
      console.log(resp)    

      this.mazoId =  resp['deck_id']
      this.TraerCarta(this.mazoId)
      
    });
    
  }
  TraerCarta(idMazo:string){
    var juegoObservable = this.servicioCartas.TraerCarta(idMazo).subscribe((resp:any) => {
      // display its headers
      //const keys = resp.headers.keys();
      console.log(resp)    
      this.carta = resp
     
      
      
    });
  }
  TraerCarta2(msj:any){
    var juegoObservable = this.servicioCartas.TraerCarta(this.mazoId).subscribe((resp:any) => {
      // display its headers
      //const keys = resp.headers.keys();
      console.log(resp)    
      this.carta2 = resp
      if(this.carta.cards[0].value == 'ACE') this.carta.cards[0].value = 1
      if(this.carta2.cards[0].value == 'ACE') this.carta2.cards[0].value = 1
      if(msj =='mayor'){

        if(parseInt(this.carta.cards[0].value) < parseInt(this.carta2.cards[0].value)){
          console.log('gano carta mayor')
          this.gano ++
        }
      }
      else{
        if(parseInt(this.carta.cards[0].value) > parseInt(this.carta2.cards[0].value)){
          console.log('gano carta menor')
          this.gano ++
        }
      }
     
      this.reiniciarJuego =true
      
    });
  }
  Reiniciar(){
    this.carta = null
    this.carta2 = null
    this.reiniciarJuego = false
    this.IniciarJuego()
  }
}
