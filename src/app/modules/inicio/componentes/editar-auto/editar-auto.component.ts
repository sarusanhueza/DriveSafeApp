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



  //confirmaciones o cancelaciones pertenecientes a NOMBRE
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  //retornando confirmacion del NOMBRE 
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = ` ${ev.detail.data}!`;
    }
  }
  
  message1 = '';
  patente: string | undefined;
  //confirmaciones o cancelaciones pertenecientes a PATENTE

  cancel1() {
    this.modal.dismiss(null, 'cancel1');
  }

  confirm1() {
    this.modal.dismiss(this.patente, 'confirm1');
  }

  //retornando confirmacion de la PATENTE
  onWillDismiss1(event1: Event) {
    const ev = event1 as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm1') {
      this.message1 = ` ${ev.detail.data}!`;
    }
  }

   //MARCA
  message2 = '';
  marca: string | undefined;

  //confirmaciones o cancelaciones pertenecientes a MARCA

  cancel2() {
    this.modal.dismiss(null, 'cancel2');
  }

  confirm2() {
    this.modal.dismiss(this.marca, 'confirm2');
  }

  //retornando confirmacion de la MARCA
  onWillDismiss2(event2: Event) {
    const ev = event2 as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm2') {
      this.message2 = ` ${ev.detail.data}!`;
    }
  }

  //TIPO DE COMBUSTIBLE
  message3 = '';
  tipocombustible: string | undefined;

  //confirmaciones o cancelaciones pertenecientes a TIPO COMBUSTIBLE

  cancel3() {
    this.modal.dismiss(null, 'cancel3');
  }

  confirm3() {
    this.modal.dismiss(this.tipocombustible, 'confirm3');
  }


  //retornando confirmacion del TIPO DE COMBUSTIBLE
  onWillDismiss3(event3: Event) {
    const ev = event3 as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm3') {
      this.message3 = ` ${ev.detail.data}!`;
    }
  }



}
