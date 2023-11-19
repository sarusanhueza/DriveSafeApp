import { Component, OnInit } from '@angular/core';

import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  

  coleccionCombustible: Combustible [] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;
  FormCombustible: any;
  


  
  constructor(
    public servicioCrud : CrudService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.servicioCrud.obtenerCombustible().subscribe (combustible =>{
      this.coleccionCombustible = combustible;
    })
  }

async agregarCombustible (){
  if(this.FormCombustible.valid){
    let nuevoCombustible : Combustible = {
      uid: ' ',
      titulo: this.FormCombustible.value.titulo!,
      fecha: this.FormCombustible.value.fecha!,
      litros: this.FormCombustible.value.litros!,
      tipo: this.FormCombustible.value.tipo!,
      gasto: this.FormCombustible.value.gasto!,
    };
    await this.servicioCrud.crearCombustible(nuevoCombustible)

    }
  }

    mostrarEditar(combustibleSelec: Combustible){
      this.combustibleSelec = combustibleSelec;

      this.FormCombustible.setValue({
        titulo: combustibleSelec.titulo,
        fecha: combustibleSelec.fecha,
        litros: combustibleSelec.litros,
        tipo: combustibleSelec.tipo,
        gasto: combustibleSelec.gasto
      })
    }

    editarCombustible(){
      let datos: Combustible = {
        uid: this.combustibleSelec.uid,

        titulo: this.FormCombustible.value.titulo!,
        fecha: this.FormCombustible.value.fecha!,
        litros: this.FormCombustible.value.litros!,
        tipo: this.FormCombustible.value.tipo!,
        gasto: this.FormCombustible.value.gasto!
      }


      this.servicioCrud.modificarCombustible(this.combustibleSelec.uid, datos)
    }

    mostrarBorrar(combustibleSelec: Combustible){
      this.ModalVisibleCombustible = true;
      this.combustibleSelec = combustibleSelec;
    }

    borrarCombustible(){
      this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid);

    }

    confirm(){

    }

    cancel(){

    }

    
    onWillDismiss(event){

    }


}



