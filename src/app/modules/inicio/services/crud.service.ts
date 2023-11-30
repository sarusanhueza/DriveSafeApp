import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Combustible } from 'src/app/models/Mcombustible';
import { map } from 'rxjs/operators';
import { find } from 'rxjs/operators';
import { Gastos } from 'src/app/models/Mgastos';
import { Recordatorio } from 'src/app/models/Mrecordatorio';
import { Viaje } from 'src/app/models/Mviajes';
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  crearIdVehiculo(nuevoVehiculo: any) {
    throw new Error('Method not implemented.');
  }

  // las colecciones interactuan con la BD de Firestore
  private combustibleColeccion : AngularFirestoreCollection <Combustible>
  private gastosColeccion : AngularFirestoreCollection <Gastos>
  private recordatorioColeccion : AngularFirestoreCollection <Recordatorio>
  private viajeColeccion : AngularFirestoreCollection <Viaje>

  private usuarioColeccion : AngularFirestoreCollection <Usuario>

  private usuariosCollection : AngularFirestoreCollection <Usuario>

  constructor(private database : AngularFirestore) {
    // se inicializa las colecciones de AngularFirestore haciendo referencia a las diferentes colecciones de la BD
    this.combustibleColeccion = database.collection('Mcombustible'); // inicializa 'combustibleColeccion' para interacturar con 'Mcombustible'
    this.gastosColeccion = database.collection('Mgastos');
    this.recordatorioColeccion = database.collection('Mrecordatorio');
    this.viajeColeccion = database.collection('Mviajes');

    this.usuariosCollection = database.collection('usuarios')

    this.usuarioColeccion = database.collection('usuarios')
   }

      crearCombustible (combustible: Combustible){
        return new Promise (async (resolve, reject) =>{
          try {
            // genera identificador unico para combustible
            const uid = this.database.createId();
            combustible.uid = uid; // asigna el id unico al objeto

            const resultado  = await this.combustibleColeccion.doc(uid).set(combustible)//añade el objeto combustible como nuevo doc en la coleccion
            resolve(resultado); // resuelve la promesa con el resultado exitoso
          } catch (error){
            reject(error) // rechaza la promesa si surge un error
          }
        }
        )
      }

      crearGastos (gasto: Gastos){
        return new Promise (async (resolve, reject) =>{
          try {
            const uid = this.database.createId();
            gasto.uid = uid;

            const resultado  = await this.gastosColeccion.doc(uid).set(gasto)
            resolve(resultado);
          } catch (error){
            reject(error)
          }
        }
        )
      }

      crearRecordatorio (recordatorio: Recordatorio){
        return new Promise (async (resolve, reject) =>{
          try {
            const uid = this.database.createId();
            recordatorio.uid = uid;

            const resultado  = await this.recordatorioColeccion.doc(uid).set(recordatorio)
            resolve(resultado);
          } catch (error){
            reject(error)
          }
        }
        )
      }

      
      crearViaje (viaje: Viaje){
        return new Promise (async (resolve, reject) =>{
          try {
            const uid = this.database.createId();
            viaje.uid = uid;

            const resultado  = await this.viajeColeccion.doc(uid).set(viaje)
            resolve(resultado);
          } catch (error){
            reject(error)
          }
        }
        )
      }

      // funcion que retorna un observable que proporcion cambios en la coleccion
      obtenerUsuario(){
        return this.usuarioColeccion.snapshotChanges(). //observable emite cambios (añadir, actualizar y eliminar)
        pipe (map(action => action.map(a => a.payload.doc.data())))
        //transforma los cambios en los docs a los datos de los docs
        //map --> extraer los datos reales
      }

      // obtiene usuario desde su ID
      obtenerUsuarioById(uid:string){
        //accede al doc en la coleccion 'usuarios' con su 'uid'
        return this.database.collection('usuarios').doc(uid).get()// get ---> solicitud para obtener el contenido del doc
        // devolvera una promesa con los datos del doc
      }

      //modifica doc desde su ID y actualiza datos con 'nuevaData'
      modificarUsuario(uid: string, nuevaData: Usuario){
        //accede a la coleccion desde ID
        return this.database.collection('usuarios').doc(uid).update(nuevaData); // solicitud para actualizar los datos con la nueva info
      }

      //elimina un doc desde ID
      eliminarUsuario(uid: string){
        return new Promise ((resolve,reject) => { // promesa que encapsula la funcion de eliminar
          try{
            // elimina en la coleccion 'usuarios' con su ID unico
            const resp = this.usuarioColeccion.doc(uid).delete() // solicitud para eliminar

            // resuelve la promesa con la respuesta 
            resolve(resp)
          }
          catch (error){
            //rechaza la promesa si hubo algun error
            reject(error)
          }
        })
      }

    





      obtenerCombustible(){

        return this.combustibleColeccion.snapshotChanges().
        pipe (map(action => action.map(a => a.payload.doc.data())))
      }

      obtenerCombustibleById(uid: string){
        return this.database.collection('Mcombustible').doc(uid).get()
      }

      obtenerGastos(){

        return this.gastosColeccion.snapshotChanges().
        pipe (map(action => action.map(a => a.payload.doc.data())))
      }

      obtenerGastosById(uid: string){
        return this.database.collection('Mgastos').doc(uid).get()
      }

      obtenerRecordatorio(){

        return this.recordatorioColeccion.snapshotChanges().
        pipe (map(action => action.map(a => a.payload.doc.data())))
      }

      obtenerRecordatoriobyId(uid: string){
        return this.database.collection('Mrecordatorio').doc(uid).get()
      }

      obtenerViaje(){

        return this.viajeColeccion.snapshotChanges().
        pipe (map(action => action.map(a => a.payload.doc.data())))
      }

      obtenerViajeById(uid: string){
        return this.database.collection('Mviajes').doc(uid).get()
      }


       modificarCombustible(uid: string, nuevaData: Combustible){
        return this.database.collection('Mcombustible').doc(uid).update(nuevaData);
      }

      modificarGastos(uid: string, nuevaData: Gastos){
        return this.database.collection('Mgastos').doc(uid).update(nuevaData);
      }

      modificarRecordatorio(uid: string, nuevaData: Recordatorio){
        return this.database.collection('Mrecordatorio').doc(uid).update(nuevaData);
      }

      modificarViaje(uid: string, nuevaData: Viaje){
        return this.database.collection('Mviajes').doc(uid).update(nuevaData);
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

      eliminarGastos(uid: string){
        return new Promise ((resolve,reject) => {
          try{
            const resp = this.gastosColeccion.doc(uid).delete()
            resolve(resp)
          }
          catch (error){
            reject(error)
          }
        })
      }

      eliminarRecordatorio(uid: string){
        return new Promise ((resolve,reject) => {
          try{
            const resp = this.recordatorioColeccion.doc(uid).delete()
            resolve(resp)
          }
          catch (error){
            reject(error)
          }
        })
      }

      eliminarViaje(uid: string){
        return new Promise ((resolve,reject) => {
          try{
            const resp = this.viajeColeccion.doc(uid).delete()
            resolve(resp)
          }
          catch (error){
            reject(error)
          }
        })
      }
}

