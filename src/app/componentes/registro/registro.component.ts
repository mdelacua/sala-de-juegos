import { Component } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  user:any
  password:any
  repitePass:any
  mostraCrear:any = false
  btnFormulario:any = {"inciarSesion" : true,"registrarse": false }
  sesionUsuario: any;
  
  
  constructor(private servicioUsuario:UsuariosService,private router: Router,public readonly swalTargets: SwalPortalTargets){

  }
  ngOnInit() {
    this.sesionUsuario = this.servicioUsuario.VerificarSesionUsuario('home',null)
  }

  ngOnDestroy(){
    console.log('ngOnDestroy')
    //this.sesionUsuario.Unsubscribe()
  }
  
   CrearUsuario(){
        
    if(!this.user ){     
      this.ErrorUsuario('Por favor, Completar Correo Electrónico...')
      return;
    }
    
    if(!this.password || !this.repitePass ){     
      this.ErrorUsuario('Por favor, Completar Contraseña...')
     
      return;
    }
    if(this.password.length < 6  ){     
      this.ErrorUsuario('Contraseña debe tener mas de 6 caracteres...')
     
      return;
    }
    if(this.password != this.repitePass ){     
      this.ErrorUsuario("Contraseña no coincide")
      
      return;
    }     
   
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        
    if(!regex.test(this.user)){
      this.ErrorUsuario('Correo Electrónico inválido...')
      //this.presentToast("Correo Electrónico inválido");
      return;
    }
    

    var usuarioCreado =  this.servicioUsuario.CrearUsuarioAuth(this.user, this.password)
    usuarioCreado.then(async (userCredential) => {
      // Signed in
      console.log(userCredential)
      //this.NotificaionInicioSesion('Usuario '+ this.user +' creado correctamente...')

      var usuarioValido = await this.servicioUsuario.Autentificar(this.user,this.password)
      if(usuarioValido){

        this.NotificaionInicioSesion('Usuario "'+this.user+'" valido!')     
        this.servicioUsuario.CrearPublicacion(this.user , 'log-registro')
        this.router.navigate(['/home'])
      }else{      
        this.ErrorUsuario("Usuario inválido login...")
       
      }
      // ...
    })
    .catch((error) => {
      this.ErrorUsuario('Error al crear usuario...')
      console.log('error creacion auth')
      console.log(error)
      
     
      // ..
    });
    /******************** */    
    
    
   
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
