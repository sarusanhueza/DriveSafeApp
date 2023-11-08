import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components'
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
  patente: string | undefined;
  marca: string | undefined;
  tcombustible: string | undefined;


  //confirmaciones o cancelaciones pertenecientes a  propiedades
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name,'confirm'); 
    this.modal.dismiss(this.patente,'confirm'); 
    this.modal.dismiss(this.marca,'confirm'); 
    this.modal.dismiss(this.tcombustible,'confirm'); 
  }
  

  //retornando confirmacion de propiedades
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = ` ${ev.detail.data}`;
    }
  }
  



}
