import { Component, OnInit } from '@angular/core';
import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-menucito',
  templateUrl: './menucito.page.html',
  styleUrls: ['./menucito.page.scss'],
})
export class MenucitoPage implements OnInit {

  coleccionCombustible: Combustible [] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;
  constructor(
    public servicioCrud: CrudService
  ){}

  ngOnInit(): void {
    this.servicioCrud.obtenerCombustible().subscribe (combustible =>{
      this.coleccionCombustible = combustible;
    })

  }

  mostrarBorrar(uid: string){
    // this.ModalVisibleCombustible = true;
    // this.combustibleSelec = combustibleSelec;

    this.servicioCrud.eliminarCombustible(uid)
    .then(respuesta => {
      alert("El producto se ha eliminado correctamente.");
    })
    .catch(error => {
      alert("No se ha podido eliminar el producto: \n"+error);
    })
  }

  borrarCombustible(){ // boton para eliminar definitivamente
    this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid)
    .then(respuesta => {
      alert("El producto se ha eliminado correctamente.");
    })
    .catch(error => {
      alert("No se ha podido eliminar el producto: \n"+error);
    })
  }


}
