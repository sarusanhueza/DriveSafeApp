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

  //creamos coleccion basada en las propiedades sugeridas  ingregar del vehiculo
  coleccionVehiculos: Vehiculo[] = [];
  vehiculoSeleccionado!: Vehiculo;
   
  //formulario que se vincula con el HTML
  vehiculo = new FormGroup({
    nombre: new FormControl('',Validators.required),
    patente: new FormControl('',Validators.required),
    marca:  new FormControl('',Validators.required),
    combustible: new FormControl('',Validators.required),
  })

  constructor( 
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public router: Router,
    public servicioAuto: ServiceVehiculoService
  ) { }
  
  ngOnInit() {
    this.servicioAuto.obtenerVehiculo().subscribe(vehiculo => {
      this.coleccionVehiculos = vehiculo;
    })
  }

   async registrarVehiculo (){//validamos valores que se ingresan del vehiculo 
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
   mostrarEditar(vehiculoSeleccionado:Vehiculo){
    this.vehiculoSeleccionado = vehiculoSeleccionado;
        /* retomamos y enviamos los valores de ese producto 
    seleccionado, el ID no se vuelve a enviar porque 
    no se modifica */

    this.vehiculo.setValue({
      nombre: vehiculoSeleccionado.nombre,
      patente: vehiculoSeleccionado.patente,
      marca: vehiculoSeleccionado.marca,
      combustible: vehiculoSeleccionado.combustible
    })
  }

  editarVehiculo(){
    let datos: Vehiculo = {
      uidVehiculo: this.vehiculoSeleccionado.uidVehiculo,
      // signo de exclamación "!" -> puede recibir valores vacíos al inicializar
      nombre: this.vehiculo.value.nombre!,
      patente: this.vehiculo.value.patente!,
      marca: this.vehiculo.value.marca!,
      combustible: this.vehiculo.value.combustible!
    }

    this.servicioAuto.modificarVehiculo(this.vehiculoSeleccionado.uidVehiculo, datos)
    .then(vehiculo => {
      alert("La propiedad fue modificado con éxito :).");
    })
    .catch(error => {
      alert("No se pudo modificar el producto :( \n"+error);
    })
  }

  }
