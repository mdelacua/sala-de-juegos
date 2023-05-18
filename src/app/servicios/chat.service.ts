import { Injectable } from '@angular/core';
//import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { doc, onSnapshot, setDoc,getFirestore, addDoc, collection, query, where, updateDoc, orderBy, limit, getDocs, arrayUnion, arrayRemove   } from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { firebaseConfig } from 'src/environments/environment';
import { getAuth } from 'firebase/auth';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private usuarioServices:UsuariosService) { }
  publicacion:any = 'msj-chat'
  
  async CrearMensaje( user:any,msj:any) {
    //this.messages = [];
    console.log('test servicio')

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);       

    //Crear datos en la tabla login
    try {
      var fecha =  new Date()
      var id = String( fecha.getTime()  )
      const docRef = await addDoc(collection(db, this.publicacion ), {
        user:user,       
        fecha: fecha,
        msj: msj
      });
      
      console.log("Document written with ID: ", docRef.id);      
      const usuarioCreado = doc(db, this.publicacion, docRef.id);
      await updateDoc(usuarioCreado, {
        id: docRef.id
      });

      return true;
      
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }

  }

  LeerMsjs(){
    
  
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);     
 

    const q = query(collection(db, this.publicacion),orderBy("fecha", 'asc'));
    return q;
   
  
  }
}
