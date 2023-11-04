import { Injectable } from '@angular/core';
import { Nota } from 'src/app/models/nota';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; // mapea valores -> similar a la función de un arreglo

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private coleccionNota: AngularFirestoreCollection<Nota>

  constructor(private database: AngularFirestore) {
    this.coleccionNota = database.collection('nota')
  }

  // CRUD -> PRODUCTOS
  crearNota(nota: Nota){
    return new Promise(async(resolve, reject) =>{
      try{
        const idProducto = this.database.createId();
        nota.idProducto = idProducto;

        const resultado = await this.coleccionNota.doc(idNota).set(nota)

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }

  obtenerNota(){
    // snapshotChanges -> toma captura del estado de los datos
    // pipe -> funciona como tubería, retorna el nuevo arreglo
    // map -> "mapea" o recorre esa nueva información
    // a -> resguarda la nueva información y la envía
    return this.coleccionNota.snapshotChanges().
    pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // envíamos el ID del producto y la nueva información
  modificarNota(idNota: string, nuevaData: Nota){
    return this.database.collection('nota').doc(idNota).update(nuevaData);
  }

  // envíamos el ID del producto
  eliminarNota(idNota: string){
    return new Promise((resolve, reject) =>{
      try{
        const resp = this.coleccionNota.doc(idNota).delete()
        resolve (resp)
      }
      catch(error){
        reject (error)
      }
    })
  }
}

