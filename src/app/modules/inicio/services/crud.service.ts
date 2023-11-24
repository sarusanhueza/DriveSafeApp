import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Combustible } from 'src/app/models/Mcombustible';
import { map } from 'rxjs/operators';
import { find } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private combustibleColeccion : AngularFirestoreCollection <Combustible>


  constructor(private database : AngularFirestore) {
    this.combustibleColeccion = database.collection('Mcombustible');
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


      obtenerCombustible(){

        return this.combustibleColeccion.snapshotChanges().
        pipe (map(action => action.map(a => a.payload.doc.data())))
      }

       modificarCombustible(uid: string, nuevaData: Combustible){
        return this.database.collection('Mcombustible').doc(uid).update(nuevaData);
      }

      // editarForm(combustible: Combustible){
      //   let MatchLista = this.combustibleColeccion.find((combustibleItem)=> combustibleItem.uid == combustible.uid);
      //   MatchLista.fecha = combustible.fecha
      //   MatchLista.tipo = combustible.tipo
      //   MatchLista.litros = combustible.litros
      //   MatchLista.gasto = combustible.gasto
  
      //   this.guardar
      // }
       
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

