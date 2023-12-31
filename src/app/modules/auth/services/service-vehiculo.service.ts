import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { rejects } from 'assert';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { map } from 'rxjs';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ServiceVehiculoService {

    //creamos coleccion de vehiculo y usuarios
  private vehiculoCollection: AngularFirestoreCollection <Vehiculo>

  private usuariosCollection: AngularFirestoreCollection<Usuario>

   
//camino de la coleccion de (usuario) y su subcollecion (vehiculos)
  constructor(private database: AngularFirestore) {
    this.usuariosCollection = database.collection('usuarios'),
      this.vehiculoCollection = database.collection('usuarios').doc().collection('vehiculos')
  }


//   crearVehiculo(vehiculo: Vehiculo) { //genero el id del vehiculo y luego recibe al vehiculo con sus propiedades
//     // let uidVehiculo =  this.vehiculos.uidVehiculo = '1'
//     // return uidVehiculo
//     return new Promise(async (resolve, reject) => {
//       try {
//         // const uidVehiculo = this.database.createId();
//         // vehiculo.uidVehiculo = uidVehiculo

//         const muestro = await this.vehiculoCollection.doc().set(vehiculo)
//         resolve(muestro);

//       } catch (error) {
//         reject(error)
//       }
//     })
// }

//propiedad/nombreInterfaz      
crearIdVehiculo(vehiculo: Vehiculo ){
  return new Promise(async(resolve, reject) =>{
    try{
      const uidVehiculo = this.database.createId();
      vehiculo.uidVehiculo = uidVehiculo

      const muestro = await this.vehiculoCollection.doc(uidVehiculo).set(vehiculo)
      resolve(muestro);

    } catch (error) {
      reject(error)
    }
  })
}

//obtenemos al usuario con sus datos
obtenerUsuario(){
  // snapshotChanges -> toma captura del estado de los datos
    // pipe ->  tubería, retorna el nuevo arreglo
    // map -> "mapea" o recorre esa nueva información
    // a -> resguarda la nueva información y la envía
  return this.usuariosCollection.snapshotChanges().
  pipe(map(action => action.map(a => a.payload.doc.data())))
}
//obtenemos vehiculos con sus propiedades
obtenerVehiculo(){
  return this.vehiculoCollection.snapshotChanges().
  pipe(map(action => action.map(a => a.payload.doc.data())))
}
  // envíamos el ID del vehiculo y la nueva información de las propiedades
  // modificamos al vehiculo con los datos  que se ingresaron al momento de registrarlo
modificarVehiculo(uidVehiculo: string, nuevaData: Vehiculo){
  return this.database.collection('vehiculos').doc(uidVehiculo).update(nuevaData)
}

  // envíamos el ID del producto
eliminarVehiculo(uidVehiculo: string){
  return new Promise((resolve, reject) => {
     // resolve retorna  el resultado que lance el try( si la promesa se cumple corretamente)
    try{
      const respuesta= this.vehiculoCollection.doc(uidVehiculo).delete()
      resolve( respuesta)
    }catch(error){ // reject retorna la respuesta del catch( si promesa se comple de manera incorrecta)
       reject(error)
    }
   })
  }

}