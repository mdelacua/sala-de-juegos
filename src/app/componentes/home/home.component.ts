import { Component } from '@angular/core';
import { NavigationEnd,  Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  btnInicio:any = true
  btnHeader:any = {"btnJuego1" : true,"btnJuego2": false,"btnCerrarSesion": false }

  constructor(private servicioUsuario:UsuariosService, private router: Router){
           
  router.events.subscribe((val) => {
      
    if (val instanceof NavigationEnd) {
        // val.url = url que cambio    
        switch (val.url) {
          case '/bienvenido':
            this.CambiarEstadoBotones('btnInicio'); 
            break;
          case '/login':
            this.CambiarEstadoBotones('btnLogin'); 
            break;            
          default:
            this.DesactivarEstadoBotones();
            break;
        }        
                       
    }       
});
}

ngOnInit() {
  this.servicioUsuario.VerificarSesionUsuario(null,'login')
}


CerrarSesion(){
 
  this.servicioUsuario.CerrarSesionAuth();  
  
}

BtnNavsetClicked(keyJson:string, redireccion:string){

  this.CambiarEstadoBotones(keyJson);

  //this.router.navigate(['/'+ redireccion]);

}

CambiarEstadoBotones(keyJson:any){
  Object.keys(this.btnHeader).forEach((key) =>{
    
    if(key == keyJson){
      this.btnHeader[key] = true
    }
    else{
      this.btnHeader[key] = false
    }
    
  });
}

DesactivarEstadoBotones(){
Object.keys(this.btnHeader).forEach((key) =>{
    this.btnHeader[key] = false
});
}
}
