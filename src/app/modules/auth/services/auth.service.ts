import { Injectable } from '@angular/core';
//importamos el servicio de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  ///perteneciente al login
  iniciarSesion(email: string, contrasena: string) {
    return this.auth.signInWithEmailAndPassword(email, contrasena);
  }


  constructor(public auth: AngularFireAuth) {}


    //perteneciente al registro
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

   ///////////
    /*registrarVehiculo( nombreAuto:string, patente: string  ){ 
     return this.auth.createUserAndPatent( nombreAuto, patente);
    }
    async getUser(){
      const user = await this.auth.currentUser;
        
      if(user == null){
        return null;
      }else{
        return user.uid
      }
    }*/


   


  }
