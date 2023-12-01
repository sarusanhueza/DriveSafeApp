import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ServiceVehiculoService } from 'src/app/modules/auth/services/service-vehiculo.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.component.html',
  styleUrls: ['./editar-auto.component.scss'],
})
export class EditarAutoComponent  implements OnInit {


   // collecionVehiculos va a recibir array Vehiculo  vacio (luego los datos seran mandados)
   
  coleccionVehiculos: Vehiculo[] = [];

  vehiculoSeleccionado!: Vehiculo //! ->  recibe calores vacios

  //validamos valores del formulario que esta en HTML
  vehiculo = new FormGroup({
  nombre: new FormControl('',Validators.required),
   patente: new FormControl('',Validators.required),
   marca: new FormControl('',Validators.required),
   combustible: new FormControl('',Validators.required),
  })

  //definimos de forma publica los tres servicios 
  constructor(
    public servicioAuto: ServiceVehiculoService, //patentamos servico de manera local
    public router: Router,
    public alertController: AlertController
  ) { }
   
   //llamamos al servico y dentro de el ejecutamos "obtenerVehiculo()" y  cambia datos del vehiculo que estan en el HTML
  // y  luego llama a la "coleccionVehiculos" para guerdar los datos  del vehiculo en ella
  ngOnInit(): void{ 
    this.servicioAuto.obtenerVehiculo().subscribe(vehiculo => {
      this.coleccionVehiculos = vehiculo;
    })
   }
   
   
   async agregarVehiculo(){
   if(this.vehiculo.valid){// si llamamos a vehiculo para validarlo
   let nuevoVehiculo: Vehiculo ={// las poropiedades se guardaran en nuevoVehiculo
     uidVehiculo:'',
     nombre: '',
     patente: '',
     marca: '',
     combustible: ''
   }
    
   //espeamos  y llamamos a el servicioAuto para que cree un id al vehiculo y se agregue un vehiculo( junto a sus propiedades)
   await this.servicioAuto.crearIdVehiculo(nuevoVehiculo)
   //then --> ejecutado cuando vehiculo fue agregado con exito 
   .then(respuesta => {
      alert("Se ha agrego un vehiculo con exito :).");
      console.log(respuesta)

      this.router.navigate(["/menu"]); //CAMBIAR  LUEGOO
    }) 
    .catch(error => {//ejecutado cuando no se agrego vehiculo ya que hubo un error.
      alert("No se pudo agregar un vehiculo :( \n"+error);
    })
   }
  }
 //funcion para mostrar los datos de un   objeto para editarlos
  mostrarEditar(vehiculoSeleccionado: Vehiculo){
    //asigna el objeto  vehiculoSeleccionado  a la propiedad vehiculoSeleccionado
    this.vehiculoSeleccionado = this.vehiculoSeleccionado;
    /* retomamos y enviamos los valores de ese producto 
    seleccionado, el ID no se vuelve a enviar porque 
    no se modifica */

    //confirma el form vehiculo con los valores del objeto vehiculoSleccionado
    this.vehiculo.setValue({ // formulario que mostrara los valores del vehiculoSeleccionado
      nombre: vehiculoSeleccionado.nombre,
      patente: vehiculoSeleccionado.patente,
      marca: vehiculoSeleccionado.marca,
      combustible: vehiculoSeleccionado.combustible
     
    })
  }
 
  //vinculaos boton GUARDAR CAMBIOS
  //recopilalos datos deditados en el formulario con los valores del objeto vehiculoSelecionado
  editarVehiculo(){
    //asignamos a la variable datos con los valores ya editados del form "vehiculo"
    let datos: Vehiculo = {
      uidVehiculo: this.vehiculoSeleccionado.uidVehiculo,
      // signo de exclamación "!" -> puede recibir valores vacíos al inicializar
      nombre: this.vehiculo.value.nombre!,
      patente: this.vehiculo.value.patente!,
      marca: this.vehiculo.value.marca!,
      combustible: this.vehiculo.value.combustible!
    }
    //en el servicioAuto modificar las propiedades del vehiculo 
    this.servicioAuto.modificarVehiculo(this.vehiculoSeleccionado.uidVehiculo, datos)// pasa id modificado y datos ya actualizados
    .then(vehiculo => {
      alert("La propiedad fue modificada con éxito :).");
      console.log(vehiculo)

      this.router.navigate(["/menu"]);
    })
    .catch(error => {
      alert("No se pudo modificar la propiedad de vehiculo :( \n"+error);
    })
  }
   //mostramos alerta medinate un cartel
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Ups. Algo no salio bien',
      message: 'Esta acción se encuentra en mantenimiento. Disculpe las molestias.',
      buttons: ['Aceptar']
    });
  
    await alert.present();

    // this.router.navigate(['/menu/menucito']) //le damos al boton "aceptar" nos redirige a la page de menu
  }

}
