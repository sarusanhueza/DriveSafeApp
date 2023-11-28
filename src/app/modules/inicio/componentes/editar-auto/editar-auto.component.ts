import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ServiceVehiculoService } from 'src/app/modules/auth/services/service-vehiculo.service';



@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.component.html',
  styleUrls: ['./editar-auto.component.scss'],
})
export class EditarAutoComponent  implements OnInit {

   
  coleccionVehiculos: Vehiculo[] = [];

  vehiculoSeleccionado!: Vehiculo //! ->  recibe calores vacios

  vehiculo = new FormGroup({
  nombre: new FormControl('',Validators.required),
   patente: new FormControl('',Validators.required),
   marca: new FormControl('',Validators.required),
   combustible: new FormControl('',Validators.required),
  })

 
  constructor(
    public servicioAuto: ServiceVehiculoService, //patentamos servico de manera local
    public router: Router
  ) { }

  ngOnInit(): void{ 
    this.servicioAuto.obtenerVehiculo().subscribe(vehiculo => {
      this.coleccionVehiculos = vehiculo;
    })
   }

   async agregarVehiculo(){
   if(this.vehiculo.valid){
   let nuevoVehiculo: Vehiculo ={
     uidVehiculo:'',
     nombre: '',
     patente: '',
     marca: '',
     combustible: ''
   }

   await this.servicioAuto.crearIdVehiculo(nuevoVehiculo)

   .then(respuesta => {
      alert("Se ha agrego un vehiculo con exito :).");
      console.log(respuesta)

      this.router.navigate(["/inicio"]); //CAMBIAR  LUEGOO
    })
    .catch(error => {
      alert("No se pudo agregar un vehiculo :( \n"+error);
    })
   }
  }

  mostrarEditar(vehiculoSeleccionado: Vehiculo){
    this.vehiculoSeleccionado = this.vehiculoSeleccionado;
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
 
  //vinculaos voton GUARDAR CAMBIOS
  //recibe propiedad nueva que ingresamos en el fomrmulario
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
      alert("La propiedad fue modificada con éxito :).");
      console.log(vehiculo)

      this.router.navigate(["/menu"]);
    })
    .catch(error => {
      alert("No se pudo modificar la propiedad de vehiculo :( \n"+error);
    })
  }

}
