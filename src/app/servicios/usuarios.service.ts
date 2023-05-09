import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc,getFirestore, addDoc, collection, query, where, updateDoc, orderBy, limit, getDocs, arrayUnion, arrayRemove   } from "firebase/firestore";

import { firebaseConfig } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  emailUsuario!: any;
  auth1: any

  constructor(private router: Router) { 
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
  }
  
  ngOnInit() {
   
  }
  
  CerrarSesionAuth(){
    this.auth1 = getAuth();
    this.auth1.signOut();

  }
  
  VerificarSesionUsuario(logeado:any, deslogeado:any){
    
    
    this.auth1 = getAuth();
    return onAuthStateChanged(this.auth1, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('logeado')
        console.log('onAuthStateChanged:')
        console.log(user)
        this.emailUsuario = user.email;
        const uid = user.uid;
       if(logeado) this.router.navigate(['/'+logeado])
        // ...
      } else {
        console.log('no logeado')
        if(deslogeado) this.router.navigate(['/'+deslogeado])
        //this.router.navigate(['/login'])
        // User is signed out
        // ...
      }
    });   
  }
 
  async VerificarUsuarioConectado( password: any){
    this.auth1 = getAuth();
    console.log(this.emailUsuario + password)
    return signInWithEmailAndPassword(this.auth1, this.emailUsuario, password)
  }
 
  async Autentificar(email: any, password: any){

    this.auth1 = getAuth();
    return signInWithEmailAndPassword(this.auth1, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('entro auth')
        console.log(user)

       

        return true;
        // ...
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });     
    }
     CrearUsuarioAuth(email:any, password:any) {
      this.auth1 = getAuth();
      return createUserWithEmailAndPassword(this.auth1, email, password)
      
  }

  
  
  async CrearPublicacion( user:any,publicacion:any) {
    //this.messages = [];
    console.log('test servicio')

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);       

    //Crear datos en la tabla login
    try {
      var fecha =  new Date()
      var id = String( fecha.getTime()  )
      const docRef = await addDoc(collection(db, publicacion ), {
        user:user,
        id: id,
        fecha: fecha
      });
      
      console.log("Document written with ID: ", docRef.id);      
      const usuarioCreado = doc(db, publicacion, docRef.id);
      await updateDoc(usuarioCreado, {
        id: docRef.id
      });

      return true;
      
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }

  }




 
}
