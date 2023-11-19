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
  constructor(
    public servicioCrud: CrudService
  ){}

  ngOnInit(): void {
    this.servicioCrud.obtenerCombustible().subscribe (combustible =>{
      this.coleccionCombustible = combustible;
    })
  }


  eliminar(){
    
  }
}
