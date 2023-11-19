import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-form-combustible',
  templateUrl: './form-combustible.page.html',
  styleUrls: ['./form-combustible.page.scss'],
})
export class FormCombustiblePage implements OnInit {

  coleccionCombustible: Combustible [] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;

  Mcombustible = new FormGroup({
    titulo: new FormControl('',Validators.required),
    fecha: new FormControl('',Validators.required),
    litros: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
    gasto: new FormControl(0,Validators.required),
  })


  constructor(
    public router: Router,
    public servicioCrud : CrudService,
  
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerCombustible().subscribe (combustible =>{
      this.coleccionCombustible = combustible;
    })
  }

  async agregarCombustible (){
    if(this.Mcombustible.valid){
      let nuevoCombustible : Combustible = {
        uid: ' ',
        titulo: this.Mcombustible.value.titulo!,
        fecha: this.Mcombustible.value.fecha!,
        litros: this.Mcombustible.value.litros!,
        tipo: this.Mcombustible.value.tipo!,
        gasto: this.Mcombustible.value.gasto!,
      };
      await this.servicioCrud.crearCombustible(nuevoCombustible)
  
      }
    }

    mostrarEditar(combustibleSelec: Combustible){
      this.combustibleSelec = combustibleSelec;

      this.Mcombustible.setValue({
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

        titulo: this.Mcombustible.value.titulo!,
        fecha: this.Mcombustible.value.fecha!,
        litros: this.Mcombustible.value.litros!,
        tipo: this.Mcombustible.value.tipo!,
        gasto: this.Mcombustible.value.gasto!
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


}
