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
  //Declaracion de collecion de usuario y la de Vehiculo
  private usuariosCollection: AngularFirestoreCollection<Usuario>
  private vehiculoCollection: AngularFirestoreCollection<Vehiculo>

  //camino de la coleccion de (usuario) y su subcollecion (vehiculos)
  constructor(private database: AngularFirestore) {
    this.usuariosCollection = database.collection('usuarios'),
      this.vehiculoCollection = database.collection('usuarios').doc().collection('vehiculos')
  }
  
  vehiculos: Vehiculo = {
    uidVehiculo: '',
    nombre: '',
    patente: '',
    marca: '',
    combustible: '',
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
  crearIdVehiculo(vehiculo: Vehiculo) {
    return new Promise(async (resolve, reject) => {
      try {
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
  obtenerUsuario() {
    // snapshotChanges -> toma captura del estado de los datos
    // pipe -> funciona como tubería, retorna el nuevo arreglo
    // map -> "mapea" o recorre esa nueva información
    // a -> resguarda la nueva información y la envía
    return this.usuariosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  //obtenemos vehiculos con sus propiedades
  obtenerVehiculo() {
    return this.vehiculoCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  modificarVehiculo(uidVehiculo: string, nuevaData: Vehiculo) {
    return this.database.collection('vehiculos').doc(uidVehiculo).update(nuevaData)
  }
  // ngOnInit(){
  //   console.log(this.crearVehiculo())
  // }

  eliminarVehiculo(uidVehiculo: string) {
    return new Promise((resolve, reject) => {

      try {
        const respuesta = this.vehiculoCollection.doc(uidVehiculo).delete()
        resolve(respuesta)
      } catch (error) {
        reject(error)
      }
    })
  }


}