import { Component, OnInit } from '@angular/core';
import { Combustible } from 'src/app/models/Mcombustible';
import { Gastos } from 'src/app/models/Mgastos';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recordatorio } from 'src/app/models/Mrecordatorio';


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

  constructor(
    public servicioCrud: CrudService
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerCombustible().subscribe(combustible => {
      this.coleccionCombustible = combustible;
    })

    this.servicioCrud.obtenerGastos().subscribe(gasto => {
      this.coleccionGastos = gasto;
    })

    this.servicioCrud.obtenerRecordatorio().subscribe(recordatorio => {
      this.coleccionRecordatorio = recordatorio;
    })

  }

 
  

  // public alertButtons =
  // [
    
  //   {
  //     text: 'No',
  //     cssClass: 'alert-button-cancel',
  //     confirm: false
  //   },
  //   {
  //     text: 'Si',
  //     cssClass: 'alert-button-confirm',
  //     handler:() =>{
       
        
  //     }

  //   }, {

  //   }

  // ]


  mostrarBorrar(uid: string) {
    // this.ModalVisibleCombustible = true;
    // this.combustibleSelec = combustibleSelec;
     this.servicioCrud.eliminarCombustible(uid)

  }

  
  mostrarBorrar1(uid: string) {
    // this.ModalVisibleCombustible = true;
    // this.combustibleSelec = combustibleSelec;
     

     this.servicioCrud.eliminarGastos(uid)
  }

  mostrarBorrar2(uid: string) {
    // this.ModalVisibleCombustible = true;
    // this.combustibleSelec = combustibleSelec;
     

     this.servicioCrud.eliminarRecordatorio(uid)
  }

  
  



  borrarCombustible() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid)

  }

  borrarGastos() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarGastos(this.gastoSelec.uid)

  }

  borrarRecordatorio() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarRecordatorio(this.recordatorioSelec.uid)

  }

  mostrarEditar(combustibleSelec: Combustible) {
    this.combustibleSelec = combustibleSelec;

    this.Mcombustible.setValue({
      titulo: combustibleSelec.titulo,
      fecha: combustibleSelec.fecha,
      litros: combustibleSelec.litros,
      tipo: combustibleSelec.tipo,
      gasto: combustibleSelec.gasto
    })

    // this.ModalVisibleCombustible = true;
  }

  mostrarEditar1(gastoSelec: Gastos) {
    this.gastoSelec = gastoSelec;

    this.Mgastos.setValue({
      titulo: gastoSelec.titulo,
      fecha: gastoSelec.fecha,
      nombreArticulo: gastoSelec.nombreArticulo,
      precio: gastoSelec.precio,
     
    })

    // this.ModalVisibleCombustible = true;
  }

  mostrarEditar2(recordatorioSelec: Recordatorio) {
    this.recordatorioSelec = recordatorioSelec;

    this.Mrecordatorio.setValue({
      titulo: recordatorioSelec.titulo,
      fecha: recordatorioSelec.fecha,
      hora: recordatorioSelec.hora,
      nombreEvento: recordatorioSelec.nombreEvento,
      
     
    })

    // this.ModalVisibleCombustible = true;
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




  

}
