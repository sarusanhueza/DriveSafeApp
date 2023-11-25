import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';
import { Gastos } from 'src/app/models/Mgastos';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {



  @ViewChild(IonModal) modal!: IonModal;


  constructor(
  ) { }



  ngOnInit() {
  }

  cerrarModal() {
    this.modal.dismiss(null, 'cancel');
  }


}



