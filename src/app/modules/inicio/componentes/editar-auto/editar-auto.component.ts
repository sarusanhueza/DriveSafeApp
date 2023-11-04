import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components'
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.component.html',
  styleUrls: ['./editar-auto.component.scss'],
})


export class EditarAutoComponent {
  @ViewChild(IonModal)
  modal!: IonModal;
  

  message = '';
  name: string | undefined;
  message1= '';
  name1: string | undefined;
    //confirmaciones o cancelaciones pertenecientes a NOMBRE
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
    
    //confirmaciones o cancelaciones pertenecientes a PATENTE

    cancel1() {
      this.modal.dismiss(null, 'cancel1');
    }
  
    confirm1() {
      this.modal.dismiss(this.name, 'confirm1');
    }

   //cambiar por cada propiedad
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = ` ${ev.detail.data}!`;
    }
  }
  

  onWillDismiss1(event1: Event) {
    const ev = event1 as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm1') {
      this.message1 = ` ${ev.detail.data}!`;
    }
  }
 

 

}
