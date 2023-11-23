import { Component, OnInit } from '@angular/core';
import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-menucito',
  templateUrl: './menucito.page.html',
  styleUrls: ['./menucito.page.scss'],
})
export class MenucitoPage implements OnInit {

  coleccionCombustible: Combustible[] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;

  Mcombustible = new FormGroup({
    titulo: new FormControl('Combustible'),
    fecha: new FormControl('', Validators.required),
    litros: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    gasto: new FormControl('$', Validators.required),
  })

  constructor(
    public servicioCrud: CrudService
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerCombustible().subscribe(combustible => {
      this.coleccionCombustible = combustible;
    })

  }

  public alertButtons =
  [
    
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      confirm: false
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler:() =>{
       
        
      }

    }, {

    }

  ]


  mostrarBorrar(uid: string) {
    // this.ModalVisibleCombustible = true;
    // this.combustibleSelec = combustibleSelec;
     this.servicioCrud.eliminarCombustible(uid)

     this.ModalVisibleCombustible = true;
  }
  



  borrarCombustible() { // boton para eliminar definitivamente
    this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid)

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




  

}
