import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { rejects } from 'assert';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceVehiculoService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>
  private vehiculoCollection: AngularFirestoreCollection<Vehiculo>

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

  crearVehiculo(vehiculo: Vehiculo) { //genero el id del vehiculo y luego recibe al vehiculo con sus propiedades
    // let uidVehiculo =  this.vehiculos.uidVehiculo = '1'
    // return uidVehiculo
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

obtenerUsuario(){
  return this.usuariosCollection.snapshotChanges().
  pipe(map(action => action.map(a => a.payload.doc.data())))
}

obtenerVehiculo(){
  return this.vehiculoCollection.snapshotChanges().
  pipe(map(action => action.map(a => a.payload.doc.data())))
}

// ngOnInit(){
//   console.log(this.crearVehiculo())
// }


}



