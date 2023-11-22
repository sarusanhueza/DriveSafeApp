import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private usuarioColeccion: AngularFirestoreCollection<Usuario>

  constructor( private database: AngularFirestore) {
    this.usuarioColeccion = database.collection('usuarios')
  }
}
