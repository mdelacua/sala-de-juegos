import { Component } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:any
  password:any
  mostraCrear:any = false
  btnFormulario:any = {"inciarSesion" : true,"registrarse": false }
  sesionUsuario:any
  
  constructor(private servicioUsuario:UsuariosService,  private route: ActivatedRoute,private router: Router,public readonly swalTargets: SwalPortalTargets, private SweetAlert2Module:SweetAlert2Module ){

  }

  ngOnInit() {
    //this.sesionUsuario = this.servicioUsuario.VerificarSesionUsuario('home',null) //HACK COMENTADO
  }

  ngOnDestroy(){
    console.log('ngOnDestroy')
    //this.sesionUsuario.Unsubscribe()
  }

  async VerificarUsuario(){
        
    if(!this.user ){     
      this.ErrorUsuario('Por favor, Completar Correo Electrónico...')
      return;
    }
    if(!this.password ){     
      
      this.ErrorUsuario('Por favor, Completar Contraseña...')
      return;
    }
    
   
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        
    if(!regex.test(this.user)){
      this.ErrorUsuario('Correo Electrónico inválido...')
      //this.presentToast("Correo Electrónico inválido");
      return;
    }
    
    
    var usuarioValido = await this.servicioUsuario.Autentificar(this.user,this.password)
   
    
    if(usuarioValido){

      this.NotificaionInicioSesion('Usuario "'+this.user+'" valido!')     
      this.servicioUsuario.CrearPublicacion(this.user , 'log-registro')

      this.router.navigate(['/home']) //HACK COMENTADO
    }else{      
      this.ErrorUsuario("Usuario inválido...")
     
    }
    
   
  }
  
  ErrorUsuario(msj:any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msj
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
