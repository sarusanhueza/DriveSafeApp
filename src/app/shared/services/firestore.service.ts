import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  //buscamos en la base de datos la coleccion de usuarios.
  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) { 
    this.usuariosCollection = this.database.collection<Usuario>('usuarios');
  }

agregarUsuario(usuario:Usuario, id:string) {
  return new Promise(async(resolve, reject)=> {
    //try condicion que debe cumplirse, sino tira error. Y el catch, toma ese error y lo muestra. 
    try {
      usuario.uid = id; 
      const resultado = await this.usuariosCollection.doc(id).set(usuario);

      resolve(resultado)
    }catch(error) {
      reject(error)
    }
  }
  )
}


  
}
