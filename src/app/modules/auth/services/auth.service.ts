import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
//importamos el servicio de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  //creacion de collecion de usuarios
  private usuarioColeccion : AngularFirestoreCollection <Usuario>

  
  constructor(public auth: AngularFireAuth, private database: AngularFirestore) {
    this.usuarioColeccion = database.collection('usuarios');
  }

  ///perteneciente al login
  iniciarSesion(email: string, contrasena: string) {
    return this.auth.signInWithEmailAndPassword(email, contrasena);
  }


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

   async obtenerUsuario(uid){
    return this.database.collection('usuarios').doc(uid).get() //get --> tomamos datos
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
   
    cerrarSesion(){
      //devuelve una promesa vacia
      return this.auth.signOut();
    }
  

   


  }
