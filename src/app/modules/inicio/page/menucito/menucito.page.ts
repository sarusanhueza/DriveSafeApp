import { Component, OnInit } from '@angular/core';
import { Combustible } from 'src/app/models/Mcombustible';
import { Gastos } from 'src/app/models/Mgastos';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recordatorio } from 'src/app/models/Mrecordatorio';
import { Viaje } from 'src/app/models/Mviajes';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service';



@Component({
  selector: 'app-menucito',
  templateUrl: './menucito.page.html',
  styleUrls: ['./menucito.page.scss'],
})
export class MenucitoPage implements OnInit {

  coleccionCombustible: Combustible[] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;

  coleccionGastos: Gastos[] = [];
  gastoSelec!: Gastos

  coleccionRecordatorio: Recordatorio[] = [];
  recordatorioSelec!: Recordatorio

  coleccionViaje: Viaje[] = [];
  viajeSelec!: Viaje

  coleccionEventos: any[] = [];
  eventoSelec!: any

  userId: any = '';


  Mcombustible = new FormGroup({
    titulo: new FormControl('Combustible',Validators.required),
    fecha: new FormControl('', Validators.required),
    litros: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    gasto: new FormControl('$', Validators.required),
  })

  Mgastos = new FormGroup({
    titulo: new FormControl('Gastos',Validators.required),
    fecha: new FormControl('', Validators.required),
    nombreArticulo: new FormControl('', Validators.required),
    precio: new FormControl('$', Validators.required),
  })

  Mrecordatorio = new FormGroup({
    titulo: new FormControl('Recordatorio',Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    nombreEvento: new FormControl('', Validators.required),
    
  })

  Mviaje = new FormGroup({
    titulo: new FormControl('Viaje',Validators.required),
    fecha: new FormControl('',Validators.required),
    nombreEvento: new FormControl('', Validators.required),
    lugarSalida: new FormControl('', Validators.required),
    lugarDestino: new FormControl('', Validators.required),
    
    
  })


  constructor(
    public servicioCrud: CrudService,
    public servicioAuth: AuthService,
   
  ) { }

  async ngOnInit() {

    //proporcionado por un servicio de autenticacion. 
    this.userId = await this.servicioAuth.getUid(); // devuelve el uid del usuario autenticado
    // await ---> esperar promesa devuelta por 'getUid' sea resuelta antes de que el codigo siga ejecutandose
    // luego de que la promesa se resuelva, el valor queda asignado en 'userId'


    //servicio para la obtencion de datos del combustible
    this.servicioCrud.obtenerCombustible().subscribe(combustible => { // subscribe---> estar atento a los cambios en la coleccion
    this.coleccionCombustible = combustible; // asigna datos de la coleccion de combustibles a la propiedad 'coleccionCombustible' y de ahi se actualiza
    //a los datos mas recientes

    this.servicioCrud.obtenerGastos().subscribe(gasto => {
    this.coleccionGastos = gasto;

    this.servicioCrud.obtenerRecordatorio().subscribe(recordatorio => {
    this.coleccionRecordatorio = recordatorio;

    this.servicioCrud.obtenerViaje().subscribe(viaje => {
    this.coleccionViaje = viaje;

    this.coleccionEventos = [...this.coleccionCombustible, ...this.coleccionGastos, 
    ...this.coleccionRecordatorio, ...this.coleccionViaje]

    //acomoda los objetos (notas) desde el mas reciente al mas antiguo
    this.coleccionEventos = this.coleccionEventos.sort(
    (objA, objB) => Number(new Date(objB.fecha)) - Number(new Date(objA.fecha)),
            );

          })
        })
         
      })  
    })

    this.servicioCrud.obtenerGastos().subscribe(gasto => {
      this.coleccionGastos = gasto;
    })

    this.servicioCrud.obtenerRecordatorio().subscribe(recordatorio => {
      this.coleccionRecordatorio = recordatorio;
    })

    this.servicioCrud.obtenerViaje().subscribe(viaje => {
      this.coleccionViaje = viaje;
    })

  }

  //invoca funcion eliminar combustible de servicioCrud
  mostrarBorrar(uid: string) {
    
    this.servicioCrud.eliminarCombustible(uid)

  }

  
  mostrarBorrar1(uid: string) {
    
     this.servicioCrud.eliminarGastos(uid)
  }

  mostrarBorrar2(uid: string) {
    
     this.servicioCrud.eliminarRecordatorio(uid)
  }

  mostrarBorrar3(uid: string) {
   
     this.servicioCrud.eliminarViaje(uid)
  }


  
  borrarCombustible() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid)// realiza la funcion eliminarCombustible desde su uid

  }

  borrarGastos() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarGastos(this.gastoSelec.uid)

  }

  borrarRecordatorio() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarRecordatorio(this.recordatorioSelec.uid)

    

  }

  borrarViaje() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarViaje(this.viajeSelec.uid)

  }

  //el formulario 'Mcombustible' con los datos de una nota seleccionada para editar
  mostrarEditarCombustible(combustibleSelec: Combustible) {

    this.combustibleSelec = combustibleSelec; // almacena 'combustibleSelec' en la propiedad 'combustibleSelec'
    //servira  para edicion de datos

    this.Mcombustible.setValue({ //mostra los valores existentes en el formulario
      titulo: combustibleSelec.titulo,
      fecha: combustibleSelec.fecha,
      litros: combustibleSelec.litros,
      tipo: combustibleSelec.tipo,
      gasto: combustibleSelec.gasto
    })

  }

  mostrarEditar1(gastoSelec: Gastos) {
    this.gastoSelec = gastoSelec;

    this.Mgastos.setValue({
      titulo: gastoSelec.titulo,
      fecha: gastoSelec.fecha,
      nombreArticulo: gastoSelec.nombreArticulo,
      precio: gastoSelec.precio,
     
    })

  }

  mostrarEditar2(recordatorioSelec: Recordatorio) {
    this.recordatorioSelec = recordatorioSelec;

    this.Mrecordatorio.setValue({
      titulo: recordatorioSelec.titulo,
      fecha: recordatorioSelec.fecha,
      hora: recordatorioSelec.hora,
      nombreEvento: recordatorioSelec.nombreEvento,
      
     
    })

  }

  mostrarEditar3(viajeSelec: Viaje) {
    this.viajeSelec = viajeSelec;

    this.Mviaje.setValue({
      titulo: viajeSelec.titulo,
      fecha: viajeSelec.fecha,
      nombreEvento: viajeSelec.nombreEvento,
      lugarSalida: viajeSelec.lugarSalida,
      lugarDestino: viajeSelec.lugarDestino,
      
      
     
    })

  }

  // recibir los valores nuevos que ingresemos en el formulario
  // ! --> recibe valores vacios al inicializar

  editarCombustible() {
    let datos: Combustible = {
      uid: this.combustibleSelec.uid,

      titulo: this.Mcombustible.value.titulo!,
      fecha: this.Mcombustible.value.fecha!,
      litros: this.Mcombustible.value.litros!,
      tipo: this.Mcombustible.value.tipo!,
      gasto: this.Mcombustible.value.gasto!
    }


    this.servicioCrud.modificarCombustible(this.combustibleSelec.uid, datos)
  }

  editarGastos() {
    let datos: Gastos = {
      uid: this.gastoSelec.uid,

      titulo: this.Mgastos.value.titulo!,
      fecha: this.Mgastos.value.fecha!,
      nombreArticulo: this.Mgastos.value.nombreArticulo!,
      precio: this.Mgastos.value.precio!,
      
    }


    this.servicioCrud.modificarGastos(this.gastoSelec.uid, datos)
  }

  editarRecordatorio() {
    let datos: Recordatorio = {
      uid: this.recordatorioSelec.uid,

      titulo: this.Mrecordatorio.value.titulo!,
      fecha: this.Mrecordatorio.value.fecha!,
      hora: this.Mrecordatorio.value.hora!,
      nombreEvento: this.Mrecordatorio.value.nombreEvento!,
      
      
    }


    this.servicioCrud.modificarRecordatorio(this.recordatorioSelec.uid, datos)
  }

  editarViaje() {
    let datos: Viaje = {
      uid: this.viajeSelec.uid,

      titulo: this.Mviaje.value.titulo!,
      fecha: this.Mviaje.value.fecha!,
      nombreEvento: this.Mviaje.value.nombreEvento!,
      lugarSalida: this.Mviaje.value.lugarSalida!,
      lugarDestino: this.Mviaje.value.lugarDestino!,
      
      
      
    }


    this.servicioCrud.modificarViaje(this.viajeSelec.uid, datos)
  }




  

}
