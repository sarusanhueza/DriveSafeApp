import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components'
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.component.html',
  styleUrls: ['./editar-auto.component.scss'],
})


export class EditarAutoComponent  implements OnInit {
  
  coleccionVehiculos: Vehiculo[] = [];

  vehiculoSeleccionado!: Vehiculo //! ->  recibe calores vacios

 
  constructor() { }

  ngOnInit() {}

}
