import { Injectable } from '@angular/core';
//importamos el servicio de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;
  iniciarSesion(email: string, contrasena: string) {
    return this.auth.signInWithEmailAndPassword(email, contrasena);
  }

 
  constructor(public auth: AngularFireAuth) {}



  // retorna nueva informacion de register
  registrar(nombre: string, contrasena: string) {
    return this.auth.createUserWithEmailAndPassword(nombre, contrasena);
    }
  
    async getUid() {
    const user = await this.auth.currentUser;
  
    if(user == null){
      return null;
    }
    else{
      return user.uid;
    }
   }
  }
  