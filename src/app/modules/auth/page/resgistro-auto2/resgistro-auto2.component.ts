import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ServiceVehiculoService } from '../../services/service-vehiculo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';


@Component({
  selector: 'app-resgistro-auto2',
  templateUrl: './resgistro-auto2.component.html',
  styleUrls: ['./resgistro-auto2.component.scss'],
})
export class ResgistroAuto2Component  implements OnInit {
  //creamos coleccion basada en las propiedades sugeridas  ingregar del vehiculo
  coleccionVehiculos: Vehiculo[] = [];
   
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
      //llamamos al servioAuto;  crearVehiculo; seteamos(subimos/ousheamos) el nuevoProducto o el registro del vehiculo
    await this.servicioAuto.crearVehiculo(nuevoVehiculo)
     
    .then(vehiculo =>{
      alert("Ha agregado un nuevo vehiculo con exito")
    })
    .catch(error=>{
      alert("Hubo un error al agregar un nuevo vehiculo")
    })

   }
  }
 

}
