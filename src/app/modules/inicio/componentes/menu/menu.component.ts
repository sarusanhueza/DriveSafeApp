import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  coleccionCombustible: Combustible [] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;

  combustible = new FormGroup ({
    titulo: new FormControl (' ', Validators.required),
    fecha: new FormControl (' ', Validators.required),
    litros: new FormControl (' ', Validators.required),
    tipo: new FormControl (' ', Validators.required),
    gasto: new FormControl (0, Validators.required)

  })
  constructor(
    public servicioCrud : CrudService
  ) { }

  ngOnInit(): void {

    this.servicioCrud.obtenerCombustible.subscribe (combustible =>{
      this.coleccionCombustible = combustible;
    })
  }

async agregarCombustible (){
  if(this.combustible.valid){
    let nuevoCombustible : Combustible = {
      uid: ' ',
      titulo: this.combustible.value.titulo!,
      fecha: this.combustible.value.fecha!,
      litros: this.combustible.value.litros!,
      gasto: this.combustible.value.gasto!,
    };
    await this.servicioCrud.creaarCombustible(nuevoCombustible)

    }
  }
}



