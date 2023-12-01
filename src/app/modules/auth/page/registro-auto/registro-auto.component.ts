import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ServiceVehiculoService } from '../../services/service-vehiculo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-registro-auto',
  templateUrl: './registro-auto.component.html',
  styleUrls: ['./registro-auto.component.scss'],
})
export class RegistroAutoComponent  implements OnInit {

  //// collecionVehiculos va a recibir array Vehiculo  vacio (luego los datos seran mandados)
  coleccionVehiculos: Vehiculo[] = [];
  vehiculoSeleccionado!: Vehiculo; //! ->  recibe calores vacios
   
  //formulario que se vincula con el HTML
  vehiculo = new FormGroup({
    nombre: new FormControl('',Validators.required),
    patente: new FormControl('',Validators.required),
    marca:  new FormControl('',Validators.required),
    combustible: new FormControl('',Validators.required),
  })
  // defunimos de manera publica los cuatro servicios
  constructor( 
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public router: Router,
    public servicioAuto: ServiceVehiculoService
  ) { }
  //llamamos al servico y dentro de el ejecutamos "obtenerVehiculo()" y  cambia datos del vehiculo que estan en el HTML
  // y  luego llama a la "coleccionVehiculos" para guerdar los datos  del vehiculo en el
  ngOnInit() {
    this.servicioAuto.obtenerVehiculo().subscribe(vehiculo => {
      this.coleccionVehiculos = vehiculo;
    })
  }

  
   async registrarVehiculo (){//validamos valores que se ingresan del vehiculo en HTML (formulario) 
   if(this.vehiculo.valid){
    let nuevoVehiculo: Vehiculo ={
      uidVehiculo:'',
      nombre: this.vehiculo.value.nombre!,
      patente: this.vehiculo.value.patente!,
      marca: this.vehiculo.value.marca!,
      combustible: this.vehiculo.value.combustible!,
    }; 
      //llamamos al servioAuto;  crearVehiculo; seteamos(subimos/pusheamos) el nuevoVehiculo o el registro del vehiculo
    await this.servicioAuto.crearIdVehiculo(nuevoVehiculo)
      // then --> se da cuando el vehiculo se registra correstamnete en b.d(promesa se da correctamente) 
      // y sale cartel, hacemos click en aceptar y nos lleva a la page de menu
      // catch --> si promesa ees completada  hubo error (pero no se  registro vehiculo) = cartel
    .then(vehiculo =>{
      alert("Ha agregado un nuevo vehiculo con exito")
      console.log(vehiculo)

      this.router.navigate(["/menu/menucito"]);
    })
    .catch(error=>{
      alert("Hubo un error al agregar un nuevo vehiculo \n" + error)
    })

   }
  }

   
//    mostrarEditar(vehiculoSeleccionado:Vehiculo){
//     this.vehiculoSeleccionado = vehiculoSeleccionado;
//         /* retomamos y enviamos los valores de ese producto 
//     seleccionado, el ID no se vuelve a enviar porque 
//     no se modifica */

//     this.vehiculo.setValue({
//       nombre: vehiculoSeleccionado.nombre,
//       patente: vehiculoSeleccionado.patente,
//       marca: vehiculoSeleccionado.marca,
//       combustible: vehiculoSeleccionado.combustible
//     })
//   }

//  // declara los datos
//   editarVehiculo(){
//     let datos: Vehiculo = {
//       uidVehiculo: this.vehiculoSeleccionado.uidVehiculo,
//       // signo de exclamación "!" -> puede recibir valores vacíos al inicializar
//       nombre: this.vehiculo.value.nombre!,
//       patente: this.vehiculo.value.patente!,
//       marca: this.vehiculo.value.marca!,
//       combustible: this.vehiculo.value.combustible!
//     }

//     this.servicioAuto.modificarVehiculo(this.vehiculoSeleccionado.uidVehiculo, datos)
//     .then(vehiculo => {
//       alert("La propiedad fue modificado con éxito :).");
//     })
//     .catch(error => {
//       alert("No se pudo modificar el producto :( \n"+error);
//     })
//   }


  }
