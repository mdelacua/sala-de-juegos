import { Component } from '@angular/core';
import { onSnapshot } from '@firebase/firestore';
import { ChatService } from 'src/app/servicios/chat.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private servicioChat:ChatService, private servicioUsuario:UsuariosService){}
  msjNuevo: any;
  msjs:any = []
  NuevoMsj() {
    console.log(this.msjNuevo)
    this.servicioChat.CrearMensaje(this.servicioUsuario.emailUsuario, this.msjNuevo)
    this.msjNuevo = ''
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var queryDatosPublicacion = this.servicioChat.LeerMsjs()

    
    const unsubscribe = onSnapshot( await queryDatosPublicacion, async (querySnapshot: any) => {
      this.msjs = []
      

      querySnapshot.forEach(async (doc: any) => {
      
        this.msjs.push(doc.data());
      }); 
    
    });
  }
} 
