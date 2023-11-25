import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Gastos } from 'src/app/models/Mgastos';

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.page.html',
  styleUrls: ['./form-gastos.page.scss'],
})
export class FormGastosPage implements OnInit {

  coleccionGastos: Gastos[] = [];
  gastoSelec!: Gastos;


  Mgastos = new FormGroup({
    titulo: new FormControl('Gastos',Validators.required),
    fecha: new FormControl('', Validators.required),
    nombreArticulo: new FormControl('', Validators.required),
    precio: new FormControl('$', Validators.required),
  })

  col: any;

  constructor(
    public router: Router,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerGastos().subscribe (gasto =>{
      this.coleccionGastos = gasto;
    })
  }

  async agregarGastos (){
    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoGastos : Gastos = {
        uid: '',
        titulo: this.Mgastos.value.titulo!,
        fecha: this.Mgastos.value.fecha!,
        nombreArticulo: this.Mgastos.value.nombreArticulo!,
        precio: this.Mgastos.value.precio!,
       
      };
      console.log(nuevoGastos);
      const valor = await this.servicioCrud.crearGastos(nuevoGastos);
      console.log(valor)
  
      //}
      //else{
      //  console.log(this.Mcombustible)
     // }
    }

    mostrarEditar(gastoSelec: Gastos){
      this.gastoSelec = gastoSelec;

      this.Mgastos.setValue({
        titulo: gastoSelec.titulo,
        fecha: gastoSelec.fecha,
        nombreArticulo: gastoSelec.nombreArticulo,
        precio: gastoSelec.precio,
        
      })
    }

    editarGastos(){
      let datos: Gastos = {
        uid: this.gastoSelec.uid,

        titulo: this.Mgastos.value.titulo!,
        fecha: this.Mgastos.value.fecha!,
        nombreArticulo: this.Mgastos.value.nombreArticulo!,
        precio: this.Mgastos.value.nombreArticulo!,

      }


      this.servicioCrud.modificarGastos(this.gastoSelec.uid, datos)
    }

    mostrarBorrar(gastoSelecc: Gastos){
      //this.ModalVisibleCombustible = true;
      this.gastoSelec = gastoSelecc;
    }

    borrarGastos(){
      this.servicioCrud.eliminarGastos(this.gastoSelec.uid);

    }
}
