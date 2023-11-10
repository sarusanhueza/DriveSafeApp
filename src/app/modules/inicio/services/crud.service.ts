import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Combustible } from 'src/app/models/Mcombustible';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private combustibleColeccion : AngularFirestoreCollection <Combustible>

  constructor(private database : AngularFirestore) {
    this.combustibleColeccion = database.collection('combustibles');
   }

      crearCombustible (combustible: Combustible){
        return new Promise (async (resolve, reject) =>{
          try {
            const uid = this.database.createId();
            combustible.uid = uid;

            const resultado  = await this.combustibleColeccion.doc(uid).set(combustible)
            resolve(resultado);
          } catch (error){
            reject(error)
          }
        }
        )
      }


      obteenrCombustible(){

        return this.combustibleColeccion.snapshotChanges().
        pipe (map(action => action.map(a => a.payload.doc.data())))
      }
      modificarCombustible(uid: string, nuevaData: Combustible){
        return this.database.collection('combustibles').doc(uid).update(nuevaData);
      }

      eliminarCombustible(uid: string){
        return new Promise ((resolve,reject) => {
          try{
            const resp = this.combustibleColeccion.doc(uid).delete()
            resolve(resp)
          }
          catch (error){
            reject(error)
          }
        })
      }
}

