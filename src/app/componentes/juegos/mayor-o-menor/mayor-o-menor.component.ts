import { Component } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { MayorOMenor } from 'src/app/clases/mayor-o-menor';
import { CartasService } from 'src/app/servicios/cartas.service';
import { MayorOMenorService } from 'src/app/servicios/mayor-o-menor.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css'],
  
})
export class MayorOMenorComponent {

  mazoId:any
  carta:any = null
  carta2:any = null
  reiniciarJuego:boolean = false
  gano:number = 0

  observableMazo:any

  partidaMayorOMenor!: MayorOMenor

  constructor(private servicioCartas:CartasService, private servicioMayorOMenor:MayorOMenorService,
    public readonly swalTargets: SwalPortalTargets, private SweetAlert2Module:SweetAlert2Module){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.IniciarJuego()
  }
  IniciarJuego(){

    this.partidaMayorOMenor = new MayorOMenor()

    this.observableMazo = this.servicioCartas.TraerMazo().subscribe(async (resp:any) => {
     
      this.mazoId =  resp['deck_id']
      this.TraerCarta(this.mazoId)
      
    });
    
  }
  TraerCarta(idMazo:string){
    var juegoObservable = this.servicioCartas.TraerCarta(idMazo).subscribe((resp:any) => {
     
      this.carta = resp
      
    });
  }
  TraerCarta2(msj:any){
    var juegoObservable = this.servicioCartas.TraerCarta(this.mazoId).subscribe((resp:any) => {
     
      this.carta2 = resp
      if(this.carta.cards[0].value == 'ACE') this.carta.cards[0].value = 1
      if(this.carta2.cards[0].value == 'ACE') this.carta2.cards[0].value = 1

      this.partidaMayorOMenor.cartaUno = this.carta.cards[0].value
      this.partidaMayorOMenor.cartaDos = this.carta2.cards[0].value;

      if(msj =='mayor'){

        this.partidaMayorOMenor.apuesta = 'mayor'
        if(parseInt(this.carta.cards[0].value) < parseInt(this.carta2.cards[0].value)){
          console.log('gano carta mayor')
          this.gano ++
          this.NotificaionInicioSesion('Ganaste!')  
          this.partidaMayorOMenor.gano = true
        }
        else{
          this.ErrorUsuario("Perdiste...");
        }
      }
      else{
        if(parseInt(this.carta.cards[0].value) > parseInt(this.carta2.cards[0].value)){
          console.log('gano carta menor')
          this.gano ++
          this.NotificaionInicioSesion('Ganaste!')  
          this.partidaMayorOMenor.gano = true
        }
        else{
          this.ErrorUsuario("Perdiste...");
        }
      }

      this.servicioMayorOMenor.CrearDatosMayorOMenor(this.partidaMayorOMenor)
     
      this.reiniciarJuego =true
      
    });
  }
  Reiniciar(){
    this.carta = null
    this.carta2 = null
    this.reiniciarJuego = false
    this.IniciarJuego()
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
}
