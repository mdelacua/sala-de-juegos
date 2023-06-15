import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { doc, onSnapshot, deleteDoc,setDoc,getFirestore, addDoc, collection, query, where, updateDoc, orderBy, limit, getDocs, arrayUnion, arrayRemove, DocumentData, DocumentReference   } from "firebase/firestore";
import { firebaseConfig } from 'src/environments/environment.development';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class AbmService {

  constructor(private usuarioService:UsuariosService) { }

  CrearFirestore(datos:any, tabla:string){
    //this.messages = [];
    console.log('CrearFirestore')
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);       

    //Crear datos en la tabla login
    try {            
      var docNuevo = doc(collection(db,tabla ))
      datos.id = docNuevo.id;
      datos.fecha = new Date()
      datos.usuario = this.usuarioService.emailUsuario
      return setDoc(docNuevo, datos);     
      
    } 
    catch (e){
      console.error("Error adding document: ", e);
      return false;
    }


  }
}
